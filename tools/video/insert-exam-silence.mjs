// node tools/video/insert-exam-silence.mjs <id> [seconds=3.5]
// After each quiz.json pauseSentence, inserts silence into narration.mp3 and shifts beats.json. Backs up originals in video/<id>/_orig/. Run once, right after narrate.py.
import fs from 'fs'; import path from 'path'; import { execFileSync } from 'child_process';
const id = process.argv[2], GAP = +(process.argv[3] || 3.5), D = path.join('video', id);
const orig = path.join(D, '_orig'); fs.mkdirSync(orig, { recursive: true });
if (fs.existsSync(path.join(orig, 'beats.json'))) { console.error('already applied (_orig exists)'); process.exit(1); }
fs.copyFileSync(path.join(D, 'narration.mp3'), path.join(orig, 'narration.mp3')); fs.copyFileSync(path.join(D, 'beats.json'), path.join(orig, 'beats.json'));
const beats = JSON.parse(fs.readFileSync(path.join(D, 'beats.json'), 'utf8')), quiz = JSON.parse(fs.readFileSync(path.join(D, 'quiz.json'), 'utf8'));
const cuts = quiz.map(q => beats.scenes[q.scene].sentences[q.pauseSentence].end).sort((a, b) => a - b);
const shift = t => t + GAP * cuts.filter(c => t >= c - 1e-6).length;
const segs = []; let prev = 0; cuts.forEach(c => { segs.push([prev, c]); prev = c; }); segs.push([prev, null]);
let f = '', ins = ''; segs.forEach((s, i) => { f += `[0:a]atrim=start=${s[0]}${s[1] != null ? ':end=' + s[1] : ''},asetpts=PTS-STARTPTS[a${i}];`; ins += `[a${i}]` + (i < segs.length - 1 ? `[s${i}]` : ''); });
let list = ''; segs.forEach((s, i) => { list += `[a${i}]` + (i < segs.length - 1 ? `aevalsrc=0:d=${GAP}:s=24000[s${i}];[s${i}]` : ''); });
const order = segs.map((s, i) => `[a${i}]` + (i < segs.length - 1 ? `[s${i}]` : '')).join('');
const sil = segs.slice(0, -1).map((s, i) => `aevalsrc=0:d=${GAP}:s=24000[s${i}];`).join('');
const graph = f + sil + order + `concat=n=${segs.length * 2 - 1}:v=0:a=1[out]`;
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(orig, 'narration.mp3'), '-filter_complex', graph, '-map', '[out]', '-ar', '24000', '-ac', '1', '-b:a', '64k', path.join(D, 'narration.mp3')]);
beats.duration = +shift(beats.duration + 1e-3).toFixed(3);
beats.scenes.forEach((sc, si) => { sc.start = +shift(sc.start).toFixed(3); sc.end = +shift(sc.end).toFixed(3); sc.sentences.forEach(s => { s.start = +shift(s.start).toFixed(3); s.end = +shift(s.end - 1e-3).toFixed(3) ; }); });
fs.writeFileSync(path.join(D, 'beats.json'), JSON.stringify(beats, null, 1)); console.log('duration', beats.duration);
