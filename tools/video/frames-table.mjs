// Full-size frames table for visual audits (no human input).
//   node tools/video/frames-table.mjs L13 [--no-build]
// Builds video/<id>/_build (render.mjs <id> --frames 0, skip with --no-build), seeks window.__timelines.main in Playwright (1920x1080) and saves
// video/<id>/_frames/ft_<seconds>.png at: start+1, middle and end-1 of every scene (beats.json); for every exam question in quiz.json: the pause
// sentence start (question) and the reveal (+1.5 s and +4.2 s after the pause sentence end).
// Writes video/<id>/_frames/INDEX.md (time | scene | kind | file) and _frames/.stamp.json {sha256, mtime} of composition.html (the gate checks it).
// INDEX.md also gets a section "Cues vs voice": for every label/UI name found in one narration sentence, the offset (s) between when it becomes visible
// and its word (positive = late, negative = early), read from video/<id>/cues.json (written by lint-layout.mjs --strict; regenerated here with
// `lint-layout.mjs <id> --strict --cues-only --no-build` when missing or stale).
// Only files named ft_*.png are replaced; other files in _frames/ are left alone.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..', '..');
const args = process.argv.slice(2), id = args[0];
if (!id || id.startsWith('--')) { console.error('usage: node tools/video/frames-table.mjs <id> [--no-build]'); process.exit(2); }
const DIR = path.join(ROOT, 'video', id), BUILD = path.join(DIR, '_build'), OUT = path.join(DIR, '_frames');
const beats = JSON.parse(fs.readFileSync(path.join(DIR, 'beats.json'), 'utf8'));
const srcFile = fs.existsSync(path.join(DIR, 'composition.html')) ? 'composition.html' : 'scenes.json';
const srcBuf = fs.readFileSync(path.join(DIR, srcFile));
const compo = srcFile === 'composition.html' ? srcBuf.toString('utf8') : '';
const TAIL = +((/<!--\s*TAIL\s+([\d.]+)\s*-->/.exec(compo) || [])[1] || 0), DUR = beats.duration + TAIL;
const sha = crypto.createHash('sha256').update(srcBuf).digest('hex'), mtime = fs.statSync(path.join(DIR, srcFile)).mtimeMs;

if (!args.includes('--no-build')) {
  const r = spawnSync(process.execPath, [path.join(ROOT, 'tools', 'video', 'render.mjs'), id, '--frames', '0'], { encoding: 'utf8' });
  if (r.status) { console.error((r.stdout || '') + (r.stderr || '')); process.exit(2); }
}
if (!fs.existsSync(path.join(BUILD, 'index.html'))) { console.error('no _build/index.html (run without --no-build)'); process.exit(2); }

// ---- instants
const want = [], clamp = (t) => Math.max(0, Math.min(DUR - 0.05, t));
const add = (t, scene, kind) => want.push({ t: +clamp(t).toFixed(2), scene, kind });
beats.scenes.forEach((s, i) => {
  add(s.start + 1, i, 'inicio+1');
  add((s.start + s.end) / 2, i, 'mitad');
  add(s.end - 1, i, 'fin-1');
});
const qf = path.join(DIR, 'quiz.json');
if (fs.existsSync(qf)) JSON.parse(fs.readFileSync(qf, 'utf8')).forEach((q, n) => {
  const sn = beats.scenes[q.scene].sentences[q.pauseSentence];
  add(sn.start, q.scene, `pregunta ${n + 1}`);
  add(sn.end + 1.5, q.scene, `reveal ${n + 1} (+1.5)`);
  add(sn.end + 4.2, q.scene, `reveal ${n + 1} (+4.2)`);
});
want.sort((a, b) => a.t - b.t);
const sceneOf = (t) => { let k = 0; beats.scenes.forEach((s, i) => { if (t >= (i ? s.start - 0.45 : 0)) k = i; }); return k; };

// ---- shoot
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (/^ft_.*\.png$/.test(f)) fs.rmSync(path.join(OUT, f));
const { chromium } = await import('playwright');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', (e) => console.log('page error:', e.message));
await p.goto('file:///' + path.join(BUILD, 'index.html').replace(/\\/g, '/'));
await p.waitForFunction(() => !!(window.__timelines && window.__timelines.main), null, { polling: 100 });
const rows = [];
for (const w of want) {
  await p.evaluate((t) => { window.__timelines.main.seek(t, false); }, w.t);
  await p.waitForTimeout(80);
  const file = `ft_${w.t.toFixed(2).padStart(7, '0')}.png`;
  await p.screenshot({ path: path.join(OUT, file) });
  rows.push({ ...w, file });
}
await b.close();

// ---- cues vs voice (offsets from lint-layout --strict)
let cues = null;
const cf = path.join(DIR, 'cues.json'), cfresh = () => { try { const c = JSON.parse(fs.readFileSync(cf, 'utf8')); return c.sha256 === sha ? c : null; } catch (e) { return null; } };
cues = cfresh();
if (!cues && srcFile === 'composition.html') { spawnSync(process.execPath, [path.join(ROOT, 'tools', 'video', 'lint-layout.mjs'), id, '--strict', '--cues-only', '--no-build'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); cues = cfresh(); }

const mmss = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, '0')}`;
const md = [`# Frames ${id} (1920x1080)`, '', `Generated from ${srcFile} sha256 ${sha.slice(0, 16)}. Look at each file at full size.`, '',
  '| time | scene | kind | file |', '|---|---|---|---|',
  ...rows.map((r) => `| ${mmss(r.t)} (${r.t.toFixed(2)} s) | E${r.scene + 1} ${beats.scenes[r.scene].title} | ${r.kind} | ${r.file} |`)];
if (cues) {
  const fmt = (c) => (c.delta == null ? (c.status === 'otro momento' ? 'n/a (mostrado en otro momento)' : c.status === 'ausente' ? 'NUNCA VISIBLE' : 'visible desde antes') : (c.delta > 0 ? '+' : '') + c.delta.toFixed(2));
  md.push('', '## Cues vs voice (offset s: positive = late, negative = early)', '', 'Word time = proportional position in its sentence (beats.json); visible = inside the frame and opacity > 0.5. Limits: > +1 s MENOR, > +2 s or absent for the whole sentence BLOQ.', '',
    '| word at | scene | label | sentence | appears at | offset (s) | status |', '|---|---|---|---|---|---|---|',
    ...cues.cues.map((c) => `| ${mmss(c.wordT)} (${c.wordT.toFixed(2)} s) | E${c.scene} | ${c.label} | ${c.sentStart.toFixed(1)}-${c.sentEnd.toFixed(1)} | ${c.appears == null ? '-' : c.appears.toFixed(2)} | ${fmt(c)} | ${c.status} |`));
} else md.push('', '## Cues vs voice', '', '(cues.json not available: run node tools/video/lint-layout.mjs ' + id + ' --strict)');
fs.writeFileSync(path.join(OUT, 'INDEX.md'), md.join('\n') + '\n');
fs.writeFileSync(path.join(OUT, '.stamp.json'), JSON.stringify({ id, source: srcFile, sha256: sha, mtimeMs: mtime, frames: rows.length, generated: new Date().toISOString() }, null, 1));
console.log(`frames-table ${id}: ${rows.length} frames in ${OUT} (INDEX.md, .stamp.json)`);
