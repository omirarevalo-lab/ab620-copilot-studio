// Poster frame per topic video: the frame at the end of scene 0 (the first frame is nearly empty).
//   node tools/video/posters.mjs            -> all topics in data/video-index.js (CERT=ab400: data/ab400/)
//   node tools/video/posters.mjs F01        -> one topic
// Writes video/<id>/<id>.jpg and adds `poster` to the index entry (render.mjs calls makePoster too).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { DATA_DIR } from '../cert.mjs';   // CERT=ab400 reads and writes data/ab400/video-index.js

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const INDEX = path.join(DATA_DIR, 'video-index.js');

export function readIndex() {
  const m = /window\.AB620_VIDEO = (\{[\s\S]*\});/.exec(fs.readFileSync(INDEX, 'utf8'));
  return m ? JSON.parse(m[1]) : {};
}
export function writeIndex(idx) {
  fs.writeFileSync(INDEX, '// Topic videos (MP4 + WebVTT). Built by tools/video/render.mjs; do not edit.\nwindow.AB620_VIDEO = ' + JSON.stringify(idx) + ';\n');
}

// entry: { duration, scenes: [{start}] } as written in the index; returns the poster path ("video/<id>.jpg")
export function makePoster(id, entry) {
  const sc = entry.scenes || [];
  const t = sc.length > 1 ? sc[1].start - 0.6 : entry.duration - 1;
  const out = path.join(ROOT, 'video', id, id + '.jpg');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', Math.max(0, t).toFixed(3), '-i', path.join(ROOT, 'video', id, id + '.mp4'), '-frames:v', '1',
    '-vf', 'scale=960:-2', '-q:v', '5', out], { stdio: 'inherit' });
  return 'video/' + id + '.jpg';
}

// CLI
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const only = process.argv[2];
  const idx = readIndex();
  const ids = only ? [only] : Object.keys(idx);
  for (const id of ids) {
    if (!idx[id]) throw new Error('not in index: ' + id);
    idx[id].poster = makePoster(id, idx[id]);
    console.log(id, idx[id].poster, (fs.statSync(path.join(ROOT, 'video', id, id + '.jpg')).size / 1024).toFixed(0) + ' KB');
  }
  writeIndex(idx);
}
