// Build and render a topic video.
//   node tools/video/render.mjs F01                 -> video/F01/F01.mp4 (+ F01.vtt, chapters) via HyperFrames
//   node tools/video/render.mjs F01 --index-only    -> only regenerate the index entry (cues/scenes/quiz) and .vtt from beats.json + quiz.json + the existing mp4
//   node tools/video/render.mjs F01 --frames 5,30   -> only build + PNG previews at those seconds (fast, no render)
//   node tools/video/render.mjs F01 --quality draft
// Inputs: video/<id>/composition.html (hand-designed), video/<id>/beats.json + narration.mp3 (tools/video/narrate.py),
//         video/assets/style.css, video/assets/icons/*.svg (Fluent UI icons, MIT).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import { makePoster } from './posters.mjs';
import { DATA_DIR } from '../cert.mjs';   // CERT=ab400 writes the video index to data/ab400/ (video folders stay video/<id>/)
import { encodeDelivery, captionCues, writeVtt } from './deliver.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..', '..');
const args = process.argv.slice(2);
const id = args[0];
if (!id) { console.error('usage: node tools/video/render.mjs <id> [--frames 5,30] [--quality draft|looks|delivery]'); process.exit(1); }
const opt = (k, d) => { const i = args.indexOf('--' + k); return i > -1 ? args[i + 1] : d; };
const DIR = path.join(ROOT, 'video', id), BUILD = path.join(DIR, '_build'), ASSETS = path.join(ROOT, 'video', 'assets');
const GSAP = path.join(os.homedir(), '.claude', 'skills', 'text-to-video', 'gsap.min.js');
const NPX = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const beats = JSON.parse(fs.readFileSync(path.join(DIR, 'beats.json'), 'utf8'));
// optional silent tail after the narration: <!-- TAIL 2.6 --> in composition.html (seconds)
const TAIL = +((/<!--\s*TAIL\s+([\d.]+)\s*-->/.exec(fs.existsSync(path.join(DIR, 'composition.html')) ? fs.readFileSync(path.join(DIR, 'composition.html'), 'utf8') : '') || [])[1] || 0), DUR = beats.duration + TAIL;
if (args.includes('--index-only')) {
  if (!fs.existsSync(path.join(DIR, id + '.mp4'))) throw new Error('no mp4 yet');
  writeVtt(path.join(DIR, id + '.vtt'), captionCues(beats)); writeIndex(); process.exit(0);
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
// hand-designed composition.html wins; otherwise the kit builds it from scenes.json
const compoFile = path.join(DIR, 'composition.html');
let html = fs.existsSync(compoFile) ? fs.readFileSync(compoFile, 'utf8')
  : (await import('./kit.mjs')).buildComposition(JSON.parse(fs.readFileSync(path.join(DIR, 'scenes.json'), 'utf8')), beats);

// optional silent tail after the narration: <!-- TAIL 2.6 --> in composition.html (seconds)
// world library: <!-- @world --> in composition.html inlines tools/video/world/world.css (into </head>), world.js and an icon library (#icLib) at the marker
const WMARK = /<!--\s*@world\s*-->/;
if (WMARK.test(html)) {
  const WD = path.join(ROOT, 'tools', 'video', 'world'), ID = path.join(ASSETS, 'icons');
  const lib = fs.readdirSync(ID).filter((f) => f.endsWith('.svg')).map((f) => `<span data-n="${f.slice(0, -4)}">${fs.readFileSync(path.join(ID, f), 'utf8').replace('<svg ', '<svg fill="currentColor" aria-hidden="true" ')}</span>`).join('');
  html = html.replace(WMARK, () => `<div id="icLib" style="display:none">${lib}</div>\n<script>\n${fs.readFileSync(path.join(WD, 'world.js'), 'utf8')}</script>`)   // marker first, so a marker mentioned in the css cannot be hit
    .replace('</head>', () => `<style>\n${fs.readFileSync(path.join(WD, 'world.css'), 'utf8')}</style>\n</head>`)
;
}
// scene clips get their timing from the narration beats
html = html.replace(/data-scene="(\d+)"/g, (_, n) => {
  const i = +n, s = beats.scenes[i], a = i ? s.start - 0.45 : 0, z = i < beats.scenes.length - 1 ? beats.scenes[i + 1].start - 0.45 : DUR;
  return `data-start="${a.toFixed(3)}" data-duration="${(z - a).toFixed(3)}"`;
});
html = html.replaceAll('{{DURATION}}', DUR.toFixed(3))
  .replace('{{BEATS}}', JSON.stringify(beats))
  .replace('{{CHAPTER_LABELS}}', beats.scenes.map((s, i) => `<span class="chap" id="chap${i}"><b>${i + 1} / ${beats.scenes.length}</b>${esc(s.title)}</span>`).join(''));
// inline icons: <i class="ic" data-i="bot"></i> -> inline SVG using currentColor
html = html.replace(/(<i class="ic[^"]*" data-i="([a-z_]+)"[^>]*>)<\/i>/g, (m, open, name) => {
  const f = path.join(ASSETS, 'icons', name + '.svg');
  if (!fs.existsSync(f)) throw new Error('missing icon ' + name);
  return open + fs.readFileSync(f, 'utf8').replace('<svg ', '<svg fill="currentColor" aria-hidden="true" ') + '</i>';
});
if (/\{\{[A-Z_]+\}\}/.test(html)) throw new Error('unfilled placeholder');

fs.rmSync(BUILD, { recursive: true, force: true });
fs.mkdirSync(BUILD, { recursive: true });
fs.writeFileSync(path.join(BUILD, 'index.html'), html);
fs.copyFileSync(path.join(ASSETS, 'style.css'), path.join(BUILD, 'style.css'));
fs.copyFileSync(GSAP, path.join(BUILD, 'gsap.min.js'));
fs.copyFileSync(path.join(ASSETS, 'anim.js'), path.join(BUILD, 'anim.js'));
fs.copyFileSync(path.join(DIR, 'narration.mp3'), path.join(BUILD, 'narration.mp3'));
fs.writeFileSync(path.join(BUILD, 'hyperframes.json'), JSON.stringify({ $schema: 'https://hyperframes.heygen.com/schema/hyperframes.json' }));
console.log('built', BUILD, beats.duration + 's');

// subtitles (WebVTT; long sentences split into <= 2 lines, acronyms shown as written): deliver.mjs
writeVtt(path.join(DIR, id + '.vtt'), captionCues(beats));

// data/video-index.js: window.AB620_VIDEO = { F01: { src, duration, scenes: [{start}], cues: [[start, end, text]] } } — the app plays these MP4s
// instant where the narrator's answer starts (sentence after the pause sentence, or the next scene); the app jumps there once the learner answers
function answerAt(q) { const sc = beats.scenes[q.scene], n = sc.sentences[q.pauseSentence + 1] || (beats.scenes[q.scene + 1] || {}).sentences?.[0]; return n ? +n.start.toFixed(3) : undefined; }
function writeIndex() {
  const f = path.join(DATA_DIR, 'video-index.js');
  let idx = {};
  if (fs.existsSync(f)) { const m = /window\.AB620_VIDEO = (\{[\s\S]*\});/.exec(fs.readFileSync(f, 'utf8')); if (m) idx = JSON.parse(m[1]); }
  idx[id] = { src: `video/${id}.mp4`, duration: +DUR.toFixed(3), scenes: beats.scenes.map((s, i) => ({ start: i ? +(s.start - 0.45).toFixed(3) : 0 })),
    cues: captionCues(beats) };   // captions drawn by the app (artifacts don't serve .vtt)
  const qf = path.join(DIR, 'quiz.json');   // exam-room pauses: [{ scene, pauseSentence, question, options, right, trap }]
  if (fs.existsSync(qf)) idx[id].quiz = JSON.parse(fs.readFileSync(qf, 'utf8')).map((q) => ({ at: +beats.scenes[q.scene].sentences[q.pauseSentence].start.toFixed(3), answerAt: answerAt(q), question: q.question, options: q.options, right: q.right, trap: q.trap }));
  idx[id].poster = makePoster(id, idx[id]);   // frame at the end of scene 0, shown before the video plays
  fs.writeFileSync(f, '// Topic videos (MP4 + WebVTT). Built by tools/video/render.mjs; do not edit.\nwindow.AB620_VIDEO = ' + JSON.stringify(idx) + ';\n');
  console.log('index', f, Object.keys(idx).join(','));
}

const frames = opt('frames');
if (frames) {
  // fast preview: open the composition in Playwright, seek the GSAP timeline, screenshot
  const { chromium } = await import('playwright');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', (e) => console.log('page error:', e.message));
  await p.goto('file:///' + path.join(BUILD, 'index.html').replace(/\\/g, '/'));
  await p.waitForFunction(() => !!(window.__timelines && window.__timelines.main), null, { polling: 100 });
  const out = path.join(DIR, '_frames'); fs.mkdirSync(out, { recursive: true });
  for (const t of frames.split(',').map(Number)) {
    await p.evaluate((t) => { window.__timelines.main.seek(t, false); }, t);
    await p.waitForTimeout(60);
    const f = path.join(out, `t${String(t).padStart(5, '0')}.png`);
    await p.screenshot({ path: f });
    console.log('frame', f);
  }
  await b.close();
  process.exit(0);
}

const lint = spawnSync(NPX, ['--yes', 'hyperframes', 'lint'], { cwd: BUILD, encoding: 'utf8', shell: true });
if (lint.status) console.log((lint.stdout || '').slice(-1500), (lint.stderr || '').slice(-800));
const raw = path.join(BUILD, 'raw.mp4');
console.log('rendering…');
execFileSync(NPX, ['--yes', 'hyperframes', 'render', '--quality', opt('quality', 'looks'), '--output', raw].concat(args.includes('--cpu') ? [] : ['--gpu'], opt('workers') ? ['--workers', opt('workers')] : [], opt('fps') ? ['--fps', opt('fps')] : []), { cwd: BUILD, stdio: 'inherit', shell: true });

const mp4 = path.join(DIR, id + '.mp4');
// web delivery (1080p, keyframes at chapters, -16 LUFS mono narration, chapters): deliver.mjs
encodeDelivery(raw, mp4, beats);
console.log('done', mp4, (fs.statSync(mp4).size / 1e6).toFixed(1) + ' MB');
writeIndex();
