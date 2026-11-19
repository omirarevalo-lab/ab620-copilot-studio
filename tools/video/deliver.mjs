// Web delivery for topic videos, shared by render.mjs (new renders) and optimize.mjs (existing ones).
//   encodeDelivery(src, out, beats): 1920x1080 H.264 with a keyframe at every chapter start, narration at -16 LUFS, true peak <= -1.5 dBTP
//     (two-pass loudnorm), mono AAC 64k, chapters + title metadata, faststart.
//   captionCues(beats): one cue per sentence, long sentences split into chunks of <= 2 caption lines, timed in proportion to their length.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

export const LOUD = { I: -16, TP: -1.5, LRA: 11 };
export const sceneStart = (beats, i) => (i ? beats.scenes[i].start - 0.45 : 0);   // same marks as the composition and AB620_VIDEO.scenes

function measureLoudness(src) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', src, '-map', '0:a', '-af', `aformat=channel_layouts=mono,loudnorm=I=${LOUD.I}:TP=${LOUD.TP}:LRA=${LOUD.LRA}:print_format=json`, '-f', 'null', '-'], { encoding: 'utf8', maxBuffer: 32 << 20 });
  const m = /\{[^{}]*"input_i"[^{}]*\}/.exec(r.stderr); if (!m) throw new Error('loudnorm measure failed for ' + src);
  return JSON.parse(m[0]);
}

export function encodeDelivery(src, out, beats) {
  const dir = path.dirname(out), meta = path.join(dir, '_meta.txt');
  fs.writeFileSync(meta, ';FFMETADATA1\ntitle=' + beats.title + '\n' + beats.scenes.map((s, i) => {
    const a = sceneStart(beats, i), z = i < beats.scenes.length - 1 ? sceneStart(beats, i + 1) : beats.duration;
    return `[CHAPTER]\nTIMEBASE=1/1000\nSTART=${Math.round(a * 1000)}\nEND=${Math.round(z * 1000)}\ntitle=${s.title}\n`;
  }).join(''));
  const m = measureLoudness(src);
  // mono first (the voice is mono), linear gain to the target, then a true-peak-safe limiter (linear loudnorm does not limit; AAC adds ~0.5 dB overshoot)
  const af = `aformat=channel_layouts=mono,loudnorm=I=${LOUD.I}:TP=${LOUD.TP}:LRA=${LOUD.LRA}:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true,aresample=192000,alimiter=limit=0.708:attack=2:release=60:level=disabled,aresample=48000`;
  const keys = beats.scenes.map((_, i) => sceneStart(beats, i).toFixed(3)).join(',');
  const tmp = out.replace(/\.mp4$/, '.tmp.mp4');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', src, '-i', meta, '-map', '0:v', '-map', '0:a', '-map_metadata', '1', '-map_chapters', '1',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-tune', 'animation', '-force_key_frames', keys, '-pix_fmt', 'yuv420p',
    '-af', af, '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', tmp], { stdio: 'inherit' });
  fs.renameSync(tmp, out); fs.rmSync(meta, { force: true });
  return { inputLufs: +m.input_i, inputTp: +m.input_tp };
}

// Caption chunks: <= MAX characters (2 lines of ~42). Prefer a break where both halves fit, right after punctuation, near the middle,
// and never right after a short function word ("the", "a", "with"…).
const MAX = 84, WEAK = /\s(the|a|an|to|of|and|or|in|on|for|with|by|at|is|are|your|its|their|that|this|no)$/i;
function chunks(text) {
  if (text.length <= MAX) return [text];
  const mid = text.length / 2; let best = -1, score = Infinity;
  for (let i = 1; i < text.length - 1; i++) {
    if (text[i] !== ' ') continue;
    const left = text.slice(0, i), fits = i <= MAX && text.length - i - 1 <= MAX ? 0 : 1;
    const s = fits * 10 + Math.abs(i - mid) / text.length + (/[,;:—–)]$/.test(left) ? 0 : 0.18) + (WEAK.test(left) ? 0.5 : 0);
    if (s < score) { score = s; best = i; }
  }
  if (best < 0) return [text];
  return chunks(text.slice(0, best).trim()).concat(chunks(text.slice(best + 1).trim()));
}
// The narration spells acronyms for the voice ("A P I", "M C P"); captions show them as written ("API", "MCP").
const display = (t) => t.replace(/(?<!\w)[A-Z](?: [A-Z](?!\w))+/g, (m) => m.replace(/ /g, '')).replace(/\b([A-Z]{2,}) ([A-Z])s\b/g, '$1$2s').replace(/\bPower FX\b/g, 'Power Fx');
export function captionCues(beats) {
  const out = [];
  beats.scenes.flatMap((s) => s.sentences).forEach((x) => {
    const parts = chunks(display(x.text)), total = parts.reduce((n, p) => n + p.length, 0), span = x.end - x.start; let before = 0;
    parts.forEach((p, k) => {
      const a = x.start + span * before / total; before += p.length;
      const z = k === parts.length - 1 ? x.end + 0.2 : x.start + span * before / total;
      out.push([+a.toFixed(3), +z.toFixed(3), p]);
    });
  });
  return out;
}
export function writeVtt(file, cues) {
  const vt = (t) => { const h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = (t % 60).toFixed(3).padStart(6, '0'); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${s}`; };
  fs.writeFileSync(file, 'WEBVTT\n\n' + cues.map((c, k) => `${k + 1}\n${vt(c[0])} --> ${vt(c[1])}\n${c[2]}\n`).join('\n'));
}
