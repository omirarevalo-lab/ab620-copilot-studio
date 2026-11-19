// Validates data/course-*.js against COURSE-SCHEMA.md. Usage: node tools/validate-course.mjs   (CERT=ab400 node tools/validate-course.mjs for data/ab400/)
// AB-620 keeps its fixed lesson/module map; other certifications get the generic checks (skills from their own meta.js) and pass with "no topics yet" while empty.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { CERT, DATA_DIR, courseFiles } from './cert.mjs';

const LEGACY = CERT === 'ab620';
const FILES = LEGACY ? ['course-m0.js', 'course-m1-3.js', 'course-m4-7.js'] : courseFiles();
const SKILLS = !LEGACY ? (() => { const c = { window: {} }; vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(DATA_DIR, 'meta.js'), 'utf8'), c); return c.window.AB620_META.skills.map(s => s.id); })() : [
  '1.1a','1.1b','1.1c','1.1d','1.1e','1.1f','1.1g',
  '1.2a','1.2b','1.2c','1.2d','1.2e','1.2f',
  '1.3a','1.3b','1.3c','1.3d','1.3e','1.3f','1.3g','1.3h','1.3i',
  '2.1a','2.1b','2.1c','2.2a','2.2b','2.2c','2.2d','2.3a','2.3b','2.3c','2.3d','2.3e','2.4a','2.4b','2.4c',
  '3.1a','3.1b','3.1c','3.2a','3.2b','3.2c','3.2d',
];
const MODULES = [
  [0, 'Fundamentals'], [1, 'Plan the solution'], [2, 'Advanced topics'], [3, 'Agent flows'],
  [4, 'Knowledge and tools'], [5, 'MCP and multi-agent'], [6, 'Azure and monitoring'], [7, 'Evaluation and ALM'],
];
const LEVELS = ['basic', 'intermediate', 'exam'];
const TOPIC_KEYS = ['id', 'module', 'title', 'level', 'minutes', 'skills', 'theory', 'scenes', 'check', 'reto', 'source'];
const REQUIRED = ['id', 'module', 'title', 'level', 'minutes', 'skills', 'theory', 'scenes', 'check', 'source'];

let errors = 0, warns = 0;
const err = m => { errors++; console.log('ERROR:', m); };
const warn = m => { warns++; console.log('WARN: ', m); };
const words = s => s.trim().split(/\s+/).filter(Boolean).length;
const isStr = s => typeof s === 'string' && s.trim().length > 0;

function lessonModule(id) {
  const n = +id.slice(1);
  if (n >= 1 && n <= 7) return 1;
  if (n <= 16) return 2;
  if (n <= 21) return 3;
  if (n <= 26) return 4;
  if (n <= 32) return 5;
  if (n <= 34) return 6;
  if (n <= 40) return 7;
  if (n === 41) return 4;   // added 2026-10-11 (Microsoft IQ), after the original numbering
  return -1;
}
const FILE_IDS = {
  'course-m0.js': id => /^F0[1-8]$/.test(id),
  'course-m1-3.js': id => /^L\d\d$/.test(id) && +id.slice(1) >= 1 && +id.slice(1) <= 21,
  'course-m4-7.js': id => /^L\d\d$/.test(id) && +id.slice(1) >= 22 && +id.slice(1) <= 41,
};

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
const COLOR_OK = /^(none|currentColor|var\([^)]*\)|inherit|transparent|url\(#[\w-]+\))$/;
const NAMED = /^(black|white|red|green|blue|gray|grey|yellow|orange|purple|pink|brown|cyan|magenta|teal|navy|silver|gold|lime|maroon|olive|aqua|fuchsia)$/i;

function checkVisual(where, v) {
  if (typeof v !== 'string' || !v.trim()) return err(`${where}: visual must be a non-empty string`);
  const tc = tagCheck(v);
  if (tc) err(`${where}: ${tc}`);
  if (/#[0-9a-fA-F]{3,8}\b/.test(v) || /\b(?:rgba?|hsla?)\(/i.test(v)) err(`${where}: hard-coded color`);
  if (/<script|on\w+\s*=|javascript:/i.test(v)) err(`${where}: script/handler not allowed`);
  if (/https?:|www\./i.test(v.replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, ''))) err(`${where}: URL in visual`);
  for (const m of v.matchAll(/\b(?:fill|stroke|stop-color)="([^"]*)"/g)) {
    const c = m[1].trim();
    if (!COLOR_OK.test(c) || NAMED.test(c)) err(`${where}: color attr "${c}"`);
  }
  for (const m of v.matchAll(/(?:^|[;\s"])(?:fill|stroke|color|background(?:-color)?|border(?:-color)?)\s*:\s*([^;"]+)/g)) {
    const toks = m[1].trim().match(/var\([^)]*\)|\S+/g) || [];
    for (const c of toks) {
      if (/^\d|^(solid|dashed|dotted|none|0)$/.test(c)) continue;
      if (!COLOR_OK.test(c) || NAMED.test(c)) err(`${where}: color value "${c}"`);
    }
  }
  if (/^\s*<svg/.test(v)) {
    const vb = v.match(/viewBox="\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*"/);
    if (!vb) err(`${where}: svg without viewBox`);
    else {
      if (+vb[3] > 360 || +vb[4] > 220) err(`${where}: viewBox ${vb[3]}x${vb[4]} exceeds 360x220`);
      for (const r of v.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        if (+r[1] + +r[3] > +vb[3] + 0.5 || +r[2] + +r[4] > +vb[4] + 0.5) err(`${where}: rect outside viewBox`);
      for (const r of v.matchAll(/<text x="([\d.]+)" y="([\d.]+)"/g))
        if (+r[1] > +vb[3] || +r[2] > +vb[4]) err(`${where}: text outside viewBox`);
    }
    for (const m of v.matchAll(/font-size="([\d.]+)"/g)) if (+m[1] < 12) err(`${where}: font-size ${m[1]} < 12`);
    if (!/<text/.test(v)) warn(`${where}: svg without labels`);
  } else if (!/^\s*<div/.test(v)) err(`${where}: visual must start with <svg or <div`);
}

// ---- load -------------------------------------------------------------
const ctx = { window: {} };
vm.createContext(ctx);
const loaded = [];
for (const f of FILES) {
  const p = path.join(DATA_DIR, f);
  if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, 'utf8');
  if (/<\/script/i.test(src)) err(`${f}: contains raw </script (escape as <\\/script)`);
  const before = (ctx.window.AB620_COURSE || []).length;
  try { vm.runInContext(src, ctx, { filename: f }); } catch (e) { err(`${f}: cannot load: ${e.message}`); continue; }
  const after = (ctx.window.AB620_COURSE || []).length;
  loaded.push({ f, from: before, to: after });
}
const course = ctx.window.AB620_COURSE;
if (!Array.isArray(course)) { err('window.AB620_COURSE missing'); console.log('FAILED'); process.exit(1); }

// ---- modules ----------------------------------------------------------
const mods = ctx.window.AB620_MODULES;
if (!Array.isArray(mods)) err('window.AB620_MODULES missing');
else if (LEGACY) {
  if (mods.length !== MODULES.length) err(`AB620_MODULES length ${mods.length} (need ${MODULES.length})`);
  MODULES.forEach(([n, t], i) => {
    const m = mods[i];
    if (!m || m.n !== n || m.title !== t) err(`AB620_MODULES[${i}] must be {n:${n},title:'${t}'}`);
    else if (Object.keys(m).sort().join() !== 'n,title') err(`AB620_MODULES[${i}] has extra keys`);
  });
}

// ---- topics -----------------------------------------------------------
const seen = new Set(), covered = new Set(), perModule = {};
let topics = 0;
for (const { f, from, to } of loaded) {
  for (let k = from; k < to; k++) {
    const t = course[k];
    const id = t && t.id;
    topics++;
    if (!isStr(id)) { err(`${f}[${k - from}]: missing id`); continue; }
    if (seen.has(id)) err(`duplicate id ${id}`); seen.add(id);
    if (LEGACY && !FILE_IDS[f](id)) err(`${id}: id not allowed in ${f}`);
    for (const key of Object.keys(t)) if (!TOPIC_KEYS.includes(key)) err(`${id}: unknown key ${key}`);
    for (const key of REQUIRED) if (t[key] === undefined) err(`${id}: missing ${key}`);

    const expMod = id[0] === 'F' ? 0 : lessonModule(id);
    if (LEGACY && t.module !== expMod) err(`${id}: module ${t.module} (expected ${expMod})`);
    if (!Number.isInteger(t.module) || t.module < 0 || (LEGACY && t.module > 7)) err(`${id}: module out of range` + (LEGACY ? ' 0..7' : ''));
    perModule[t.module] = (perModule[t.module] || 0) + 1;
    if (!isStr(t.title)) err(`${id}: title`);
    if (!LEVELS.includes(t.level)) err(`${id}: bad level ${t.level}`);
    if (t.module === 0 && t.level !== 'basic') err(`${id}: module 0 must be level 'basic'`);
    if (typeof t.minutes !== 'number' || t.minutes <= 0) err(`${id}: minutes`);

    if (!Array.isArray(t.skills)) err(`${id}: skills must be array`);
    else {
      if (t.module >= 1 && !t.skills.length) err(`${id}: skills empty`);
      t.skills.forEach(s => { if (!SKILLS.includes(s)) err(`${id}: unknown skill ${s}`); else if (t.module >= 1) covered.add(s); });
    }

    let visuals = 0;
    // theory
    const th = t.theory;
    if (!th || typeof th !== 'object') err(`${id}: theory missing`);
    else {
      for (const key of Object.keys(th)) if (!['intro', 'sections', 'steps', 'example', 'examTips', 'glossary'].includes(key)) err(`${id}: theory unknown key ${key}`);
      if (!isStr(th.intro)) err(`${id}: theory.intro`);
      else {
        const sentences = th.intro.split(/(?<=[.!?…])\s+/).filter(Boolean).length;
        if (sentences < 2 || sentences > 3) err(`${id}: intro has ${sentences} sentences (2-3)`);
      }
      if (!Array.isArray(th.sections) || th.sections.length < 3 || th.sections.length > 7) err(`${id}: sections must be 3-7`);   // 7 since the 2026-10-11 harness update
      (th.sections || []).forEach((s, i) => {
        const w = `${id} section ${i + 1}`;
        if (!isStr(s.heading)) err(`${w}: heading`);
        if (!isStr(s.body)) err(`${w}: body`);
        else {
          const paras = s.body.split('\n\n');
          if (paras.length > 3) err(`${w}: ${paras.length} paragraphs (max 3)`);
          paras.forEach(p => { const n = words(p); if (n > 120) err(`${w}: paragraph ${n} words (>120)`); });
          if (/[<>]/.test(s.body)) err(`${w}: body contains markup`);
        }
        if (s.visual !== undefined) { visuals++; checkVisual(`${w} visual`, s.visual); }
        if (s.figure) visuals++;   // designed figure (rendered by the app from data)
        for (const key of Object.keys(s)) if (!['heading', 'body', 'visual', 'figure', 'code'].includes(key)) err(`${w}: unknown key ${key}`);
      });
      if (!Array.isArray(th.steps) || th.steps.length < 4 || th.steps.length > 8) err(`${id}: steps must be 4-8`);
      else th.steps.forEach((s, i) => { if (!isStr(s)) err(`${id}: step ${i + 1} empty`); });
      if (!isStr(th.example)) err(`${id}: example`);
      else { const n = words(th.example); if (n < 60 || n > 120) err(`${id}: example ${n} words (60-120)`); }
      const minTips = t.module === 0 ? 1 : 2;
      if (!Array.isArray(th.examTips) || th.examTips.length < minTips || th.examTips.length > 6) err(`${id}: examTips must be ${minTips}-6`);   // 6 since the 2026-10-11 harness update
      else th.examTips.forEach((s, i) => { if (!isStr(s)) err(`${id}: examTip ${i + 1} empty`); });
      if (!Array.isArray(th.glossary) || th.glossary.length < 2 || th.glossary.length > 6) err(`${id}: glossary must be 2-6`);
      (th.glossary || []).forEach((g, i) => {
        if (!isStr(g.term) || !isStr(g.def)) err(`${id}: glossary ${i + 1} needs term/def`);
        else if (words(g.def) > 30) err(`${id}: glossary "${g.term}" def ${words(g.def)} words (>30)`);
      });
    }

    // scenes
    if (!Array.isArray(t.scenes) || t.scenes.length < 5 || t.scenes.length > 18) err(`${id}: scenes must be 5-18`);
    let sceneVis = 0;
    (t.scenes || []).forEach((s, i) => {
      const w = `${id} scene ${i + 1}`;
      if (!isStr(s.title)) err(`${w}: title`);
      if (!isStr(s.caption)) err(`${w}: caption`);
      else if (words(s.caption) > 25) err(`${w}: caption ${words(s.caption)} words (>25)`);
      if (!isStr(s.say)) err(`${w}: say`);
      else {
        const n = words(s.say);
        if (n < 40 || n > 90) err(`${w}: say ${n} words (40-90)`);
        if (/[\d\/\\%$#*<>=_@\[\]{}|+~^&]/.test(s.say)) err(`${w}: say has digits/symbols: ${(s.say.match(/[\d\/\\%$#*<>=_@\[\]{}|+~^&]/g) || []).join('')}`);
        if (/https?:|www\.|\.com\b|\.net\b|\.org\b/i.test(s.say)) err(`${w}: say contains a URL`);
      }
      if (s.visual !== undefined) { visuals++; sceneVis++; checkVisual(`${w} visual`, s.visual); }
      for (const key of Object.keys(s)) if (!['title', 'visual', 'caption', 'say'].includes(key)) err(`${w}: unknown key ${key}`);
    });
    if (LEGACY && Array.isArray(t.scenes) && sceneVis * 2 < t.scenes.length) err(`${id}: only ${sceneVis}/${t.scenes.length} scenes have a visual (need at least half)`);
    if (visuals < 2) err(`${id}: needs >= 2 visuals (has ${visuals})`);

    // check
    if (!Array.isArray(t.check) || t.check.length < 3 || t.check.length > 4) err(`${id}: check must be 3-4`);
    (t.check || []).forEach((q, i) => {
      const w = `${id} check ${i + 1}`;
      if (!isStr(q.stem)) err(`${w}: stem`);
      if (!Array.isArray(q.options) || q.options.length !== 4 || !q.options.every(isStr)) err(`${w}: needs 4 non-empty options`);
      else if (new Set(q.options).size !== 4) err(`${w}: duplicate options`);
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) err(`${w}: answer must be index 0-3`);
      if (!isStr(q.explanation)) err(`${w}: explanation`);
      else if (q.explanation.split(/(?<=[.!?])\s+/).filter(Boolean).length > 3) warn(`${w}: explanation longer than 1-2 sentences`);
      for (const key of Object.keys(q)) if (!['stem', 'options', 'answer', 'explanation'].includes(key)) err(`${w}: unknown key ${key}`);
    });
    const ans = (t.check || []).map(q => q.answer);
    if (ans.length >= 3 && new Set(ans).size === 1) warn(`${id}: all check answers share the same index`);

    // reto, source
    if (t.reto !== undefined) {
      if (!t.reto || !isStr(t.reto.text) || typeof t.reto.minutes !== 'number') err(`${id}: reto {text, minutes}`);
      else if (t.reto.text.split('\n').length !== 3) err(`${id}: reto must be 3 lines`);
    }
    if (!isStr(t.source) || !/^https:\/\/learn\.microsoft\.com\/[\w\-./#?=%]+$/.test(t.source)) err(`${id}: source must be a learn.microsoft.com URL`);
    // no URLs outside source
    const { source, ...rest } = t;
    const text = JSON.stringify(rest).replace(/\/\.well-known\/agent\.json/g, '').replace(/xmlns=\\"http:\/\/www\.w3\.org\/2000\/svg\\"/g, '');
    const um = text.match(/https?:\/\/|www\.|learn\.microsoft|\b[\w-]+\.(?:com|net|org|io)\b/i);
    if (um) err(`${id}: URL-like text outside source: ${um[0]}`);
  }
}

// ---- skill coverage (only when modules 1-7 are fully present) ---------
const haveFull = !LEGACY ? process.env.FULL === '1' :   // AB-400 is written module by module: FULL=1 checks coverage once every module exists
  loaded.some(x => x.f === 'course-m1-3.js') && loaded.some(x => x.f === 'course-m4-7.js');
let coverage = 'n/a';
if (haveFull) {
  const missing = SKILLS.filter(s => !covered.has(s));
  missing.forEach(s => err(`skill ${s} not covered by modules 1-7`));
  coverage = `${SKILLS.length - missing.length}/${SKILLS.length}`;
} else coverage = `${covered.size}/${SKILLS.length} (check skipped: ${LEGACY ? 'needs m1-3 and m4-7' : 'set FULL=1 when every module exists'})`;

if (!topics && !LEGACY) { console.log(`${CERT.toUpperCase()}: no topics yet (nothing to validate)`); console.log(errors ? `FAILED (${errors} errors)` : 'OK'); process.exit(errors ? 1 : 0); }
const modSummary = Object.keys(perModule).sort().map(m => `M${m}:${perModule[m]}`).join(' ') || 'none';
console.log(`topics: ${topics} | modules: ${modSummary} | skills covered: ${coverage}`);
if (warns) console.log(`warnings: ${warns}`);
console.log(errors ? `FAILED (${errors} errors)` : 'OK');
process.exit(errors ? 1 : 0);
