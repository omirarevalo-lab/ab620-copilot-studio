// Validates data/lessons.js. Usage: node tools/validate-lessons.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, '..', 'data', 'lessons.js');

const SKILLS = [
  '1.1a','1.1b','1.1c','1.1d','1.1e','1.1f','1.1g',
  '1.2a','1.2b','1.2c','1.2d','1.2e','1.2f',
  '1.3a','1.3b','1.3c','1.3d','1.3e','1.3f','1.3g','1.3h','1.3i',
  '2.1a','2.1b','2.1c','2.2a','2.2b','2.2c','2.2d','2.3a','2.3b','2.3c','2.3d','2.3e','2.4a','2.4b','2.4c',
  '3.1a','3.1b','3.1c','3.2a','3.2b','3.2c','3.2d',
];
const KINDS = ['idea', 'como', 'examen', 'recuerda'];
let errors = 0, warns = 0;
const err = m => { errors++; console.log('ERROR:', m); };
const warn = m => { warns++; console.log('WARN: ', m); };
const words = s => s.trim().split(/\s+/).filter(Boolean).length;

const src = fs.readFileSync(FILE, 'utf8');
if (/<\/script/i.test(src)) err('file contains raw </script (escape as <\\/script)');
const ctx = { window: {} };
vm.createContext(ctx);
try { vm.runInContext(src, ctx, { filename: 'lessons.js' }); } catch (e) { err('cannot load: ' + e.message); }
const lessons = ctx.window.AB620_LESSONS;
if (!Array.isArray(lessons)) { err('window.AB620_LESSONS is not an array'); process.exit(1); }

// XML-ish tag balance (SVG and HTML mocks). Returns error string or null.
function tagCheck(s) {
  const re = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;
  const stack = [];
  let m, pos = 0;
  while ((m = re.exec(s))) {
    const between = s.slice(pos, m.index);
    if (/[<>]/.test(between)) return `stray angle bracket near "${between.slice(0, 20)}"`;
    pos = re.lastIndex;
    const [, close, name, , self] = m;
    if (self) continue;
    if (close) {
      const top = stack.pop();
      if (top !== name) return `closing </${name}> does not match <${top || 'none'}>`;
    } else stack.push(name);
  }
  if (/[<>]/.test(s.slice(pos))) return 'stray angle bracket at end';
  if (stack.length) return `unclosed <${stack[stack.length - 1]}>`;
  return null;
}
const COLOR_OK = /^(none|currentColor|var\([^)]*\)|inherit|transparent)$/;

function checkVisual(id, i, v) {
  const where = `${id} screen ${i + 1} visual`;
  const tc = tagCheck(v);
  if (tc) err(`${where}: ${tc}`);
  if (/#[0-9a-fA-F]{3,8}\b/.test(v) || /\brgba?\(|\bhsla?\(/i.test(v)) err(`${where}: hard-coded color`);
  if (/<script|on\w+\s*=|javascript:/i.test(v)) err(`${where}: script/handler not allowed`);
  // fill/stroke attribute values and style color props must be theme-neutral
  for (const m of v.matchAll(/\b(?:fill|stroke|stop-color)="([^"]*)"/g)) if (!COLOR_OK.test(m[1].trim())) err(`${where}: color attr "${m[1]}"`);
  for (const m of v.matchAll(/(?:^|[;\s"])(?:fill|stroke|color|background(?:-color)?|border(?:-color)?)\s*:\s*([^;"]+)/g)) {
    const val = m[1].trim();
    // allow shorthand borders such as "1px solid var(--muted)"
    const colorish = val.split(/\s+/).filter(x => !/^(\d|solid|dashed|dotted|none$|0)/.test(x) || /^none$/.test(x));
    for (const c of colorish) if (!(COLOR_OK.test(c) || /^var\(/.test(c) || /^\d/.test(c))) err(`${where}: color value "${c}"`);
  }
  if (/^\s*<svg/.test(v)) {
    const vb = v.match(/viewBox="\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*"/);
    if (!vb) err(`${where}: svg without viewBox`);
    else if (+vb[3] > 360 || +vb[4] > 200) err(`${where}: viewBox ${vb[3]}x${vb[4]} exceeds 360x200`);
    else {
      // rough bounds check on rect/text coordinates
      for (const r of v.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        if (+r[1] + +r[3] > +vb[3] + 0.5 || +r[2] + +r[4] > +vb[4] + 0.5) err(`${where}: rect outside viewBox`);
      for (const r of v.matchAll(/<text x="([\d.]+)" y="([\d.]+)"/g))
        if (+r[1] > +vb[3] || +r[2] > +vb[4]) err(`${where}: text outside viewBox`);
    }
    if (!/<text/.test(v)) warn(`${where}: svg without labels`);
  } else if (!/^\s*<div/.test(v)) err(`${where}: visual must start with <svg or <div`);
}

const ids = new Set(), covered = new Set();
let premium = 0, screensTotal = 0, visuals = 0;
const URL_RE = /https?:|www\.|learn\.microsoft|\.com\b|\.net\b|\.org\b/i;

for (const l of lessons) {
  const id = l && l.id;
  if (!/^L\d\d$/.test(id || '')) err(`bad id ${id}`);
  if (ids.has(id)) err(`duplicate id ${id}`); ids.add(id);
  if (!Array.isArray(l.skills) || !l.skills.length) err(`${id}: skills missing`);
  else l.skills.forEach(s => { if (!SKILLS.includes(s)) err(`${id}: unknown skill ${s}`); covered.add(s); });
  if (typeof l.title !== 'string' || !l.title.trim()) err(`${id}: title`);
  if (typeof l.premium !== 'boolean') err(`${id}: premium must be boolean`);
  if (l.premium) premium++;

  if (!Array.isArray(l.screens) || l.screens.length < 3 || l.screens.length > 5) err(`${id}: needs 3-5 screens`);
  const kinds = new Set();
  (l.screens || []).forEach((s, i) => {
    screensTotal++;
    if (!KINDS.includes(s.kind)) err(`${id} screen ${i + 1}: bad kind ${s.kind}`);
    kinds.add(s.kind);
    if (typeof s.heading !== 'string' || !s.heading.trim()) err(`${id} screen ${i + 1}: heading`);
    if (typeof s.body !== 'string' || !s.body.trim()) err(`${id} screen ${i + 1}: body`);
    else {
      const w = words(s.body);
      if (w > 70) err(`${id} screen ${i + 1}: body ${w} words (>70)`);
      if (/[<>]/.test(s.body)) err(`${id} screen ${i + 1}: body contains markup`);
    }
    if (s.visual !== undefined) { visuals++; if (typeof s.visual !== 'string') err(`${id} screen ${i + 1}: visual not string`); else checkVisual(id, i, s.visual); }
    for (const k of Object.keys(s)) if (!['kind', 'heading', 'body', 'visual'].includes(k)) err(`${id} screen ${i + 1}: unknown key ${k}`);
  });
  for (const k of ['examen', 'recuerda']) if (!kinds.has(k)) err(`${id}: missing '${k}' screen`);

  if (typeof l.narration !== 'string') err(`${id}: narration`);
  else {
    const w = words(l.narration);
    if (w < 150 || w > 200) err(`${id}: narration ${w} words (need 150-200)`);
    if (l.premium && l.narration.length > 1200) err(`${id}: premium narration ${l.narration.length} chars (>1200)`);
    if (/[\d\/\\%$#*<>=_@\[\]{}|+~^&]/.test(l.narration)) err(`${id}: narration has digits/symbols: ${(l.narration.match(/[\d\/\\%$#*<>=_@\[\]{}|+~^&]/g) || []).join('')}`);
    if (URL_RE.test(l.narration)) err(`${id}: narration contains a URL`);
  }

  if (!l.reto || typeof l.reto.text !== 'string' || typeof l.reto.minutes !== 'number') err(`${id}: reto {text, minutes}`);
  else {
    if (l.reto.text.split('\n').length !== 3) err(`${id}: reto must be 3 lines`);
    if (l.reto.minutes < 15 || l.reto.minutes > 20) err(`${id}: reto minutes ${l.reto.minutes} (15-20)`);
  }
  if (typeof l.source !== 'string' || !/^https:\/\/learn\.microsoft\.com\/[\w\-./]+$/.test(l.source)) err(`${id}: source must be a learn.microsoft.com URL`);

  // no URLs anywhere except `source`
  const { source, ...rest } = l;
  const text = JSON.stringify(rest);
  if (URL_RE.test(text.replace(/\/\.well-known\/agent\.json/g, ''))) err(`${id}: URL-like text outside source: ${(text.match(URL_RE) || [])[0]}`);
  for (const k of Object.keys(l)) if (!['id', 'skills', 'title', 'premium', 'screens', 'narration', 'reto', 'source', 'audio'].includes(k)) err(`${id}: unknown key ${k}`);
}

for (const s of SKILLS) if (!covered.has(s)) err(`skill ${s} not covered`);
if (premium !== 4) err(`premium lessons: ${premium} (need exactly 4)`);
if (lessons.length < 36 || lessons.length > 46) warn(`lesson count ${lessons.length} (expected ~40)`);
const ratio = visuals / screensTotal;
if (ratio < 0.35 || ratio > 0.7) warn(`visual ratio ${(ratio * 100).toFixed(0)}% (target ~50%)`);

console.log(`\nlessons: ${lessons.length} | screens: ${screensTotal} | visuals: ${visuals} (${(ratio * 100).toFixed(0)}%) | skills covered: ${covered.size}/${SKILLS.length} | premium: ${premium}`);
console.log(errors ? `FAILED: ${errors} error(s), ${warns} warning(s)` : `OK (${warns} warning(s))`);
process.exit(errors ? 1 : 0);
