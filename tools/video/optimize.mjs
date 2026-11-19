// Re-deliver existing topic videos without re-rendering: node tools/video/optimize.mjs L01 [L02 …] | --all
// Source: video/<id>/_build/raw.mp4 (the 1920x1080 render); if it is missing, the current MP4 (kept at its size).
// Writes video/<id>/<id>.mp4 (see deliver.mjs), the poster, <id>.vtt and the AB620_VIDEO entry (captions split to <= 2 lines).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { encodeDelivery, captionCues, writeVtt, sceneStart } from './deliver.mjs';
import { makePoster, readIndex, writeIndex } from './posters.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
let ids = process.argv.slice(2);
if (ids[0] === '--all') ids = Object.keys(readIndex()).sort();
if (!ids.length) { console.error('usage: node tools/video/optimize.mjs <id>… | --all'); process.exit(1); }
for (const id of ids) {
  const DIR = path.join(ROOT, 'video', id), mp4 = path.join(DIR, id + '.mp4'), raw = path.join(DIR, '_build', 'raw.mp4');
  const beats = JSON.parse(fs.readFileSync(path.join(DIR, 'beats.json'), 'utf8'));
  let src = raw;
  if (!fs.existsSync(raw)) { src = path.join(DIR, '_src.mp4'); fs.copyFileSync(mp4, src); }
  const t0 = Date.now(), r = encodeDelivery(src, mp4, beats);
  if (src !== raw) fs.rmSync(src, { force: true });
  const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp4], { encoding: 'utf8' });
  if (Math.abs(dur - beats.duration) > 0.15) throw new Error(`${id}: duration ${dur} vs beats ${beats.duration}`);
  const idx = readIndex(), cues = captionCues(beats);
  idx[id] = { src: `video/${id}.mp4`, duration: beats.duration, scenes: beats.scenes.map((s, i) => ({ start: +sceneStart(beats, i).toFixed(3) })), cues };
  idx[id].poster = makePoster(id, idx[id]);
  writeIndex(idx); writeVtt(path.join(DIR, id + '.vtt'), cues);
  console.log(`${id}: ${(fs.statSync(mp4).size / 1e6).toFixed(2)} MB · ${dur.toFixed(2)} s · was ${r.inputLufs} LUFS / ${r.inputTp} dBTP · ${cues.length} cues · ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}
