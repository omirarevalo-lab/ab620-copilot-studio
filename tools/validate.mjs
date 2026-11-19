// Validates data/questions.js and data/flashcards.js. Usage: node validate.mjs [--urls]
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, '..', 'data');
const checkUrls = process.argv.includes('--urls');

const SKILLS = [
  '1.1a','1.1b','1.1c','1.1d','1.1e','1.1f','1.1g',
  '1.2a','1.2b','1.2c','1.2d','1.2e','1.2f',
  '1.3a','1.3b','1.3c','1.3d','1.3e','1.3f','1.3g','1.3h','1.3i',
  '2.1a','2.1b','2.1c','2.2a','2.2b','2.2c','2.2d','2.3a','2.3b','2.3c','2.3d','2.3e','2.4a','2.4b','2.4c',
  '3.1a','3.1b','3.1c','3.2a','3.2b','3.2c','3.2d',
];
// SPEC lists 37 skill IDs; sanity check our list matches that count
const domainOf = s => 'D' + s[0];
let errors = 0;
const err = m => { errors++; console.log('ERROR:', m); };

function load(file, global) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8');
  if (/<\/script/i.test(src)) err(`${file}: contains raw </script`);
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(src, ctx, { filename: file });
  const v = ctx.window[global];
  if (!Array.isArray(v)) { err(`${file}: window.${global} is not an array`); return []; }
  return v;
}

const Q = load('questions.js', 'AB620_QUESTIONS');
const C = load('flashcards.js', 'AB620_CARDS');

console.log(`skill IDs in validator: ${SKILLS.length}`);
if (SKILLS.length !== 44) err('validator skill list is not 44');
console.log('NOTE: SPEC section 1 says "37 skills" but lists 44 IDs (22 in D1 + 15 in D2 + 7 in D3); validating against the 44 listed IDs.');

/* ---------- questions ---------- */
if (Q.length !== 130) err(`questions count ${Q.length} != 130`);
const qIds = new Set();
const nonEmpty = v => typeof v === 'string' && v.trim().length > 0;
const srcOk = u => typeof u === 'string' && (u.startsWith('https://learn.microsoft.com/') || u.startsWith('https://adaptivecards.io/'));
const wordsToNum = { dos: 2, tres: 3, cuatro: 4 };
for (const q of Q) {
  if (qIds.has(q.id)) err(`dup question id ${q.id}`);
  qIds.add(q.id);
  if (!/^q-\d\.\d[a-i]-\d{2}$/.test(q.id)) err(`${q.id}: id format`);
  if (!q.id.startsWith(`q-${q.skill}-`)) err(`${q.id}: id does not match skill ${q.skill}`);
  if (!SKILLS.includes(q.skill)) err(`${q.id}: unknown skill ${q.skill}`);
  if (q.domain !== domainOf(q.skill)) err(`${q.id}: domain ${q.domain} != ${domainOf(q.skill)}`);
  if (!['single', 'multi'].includes(q.type)) err(`${q.id}: bad type`);
  if (![1, 2, 3].includes(q.difficulty)) err(`${q.id}: bad difficulty`);
  if (!nonEmpty(q.stem)) err(`${q.id}: empty stem`);
  if (!nonEmpty(q.explanation)) err(`${q.id}: empty explanation`);
  if (!Array.isArray(q.options) || q.options.length < 4 || q.options.length > 5) err(`${q.id}: options length ${q.options && q.options.length}`);
  else {
    q.options.forEach((o, i) => { if (!nonEmpty(o)) err(`${q.id}: empty option ${i}`); });
    if (new Set(q.options).size !== q.options.length) err(`${q.id}: duplicate options`);
  }
  if (!Array.isArray(q.answer) || !q.answer.length) err(`${q.id}: empty answer`);
  else {
    if (new Set(q.answer).size !== q.answer.length) err(`${q.id}: duplicate answer indices`);
    for (const a of q.answer) if (!Number.isInteger(a) || a < 0 || a >= q.options.length) err(`${q.id}: answer index ${a} out of range`);
    if (q.type === 'single' && q.answer.length !== 1) err(`${q.id}: single must have 1 answer`);
    if (q.type === 'multi') {
      if (q.answer.length < 2) err(`${q.id}: multi needs >=2 answers`);
      const m = q.stem.match(/Elige (dos|tres|cuatro)/i);
      if (!m) err(`${q.id}: multi stem does not say 'Elige dos/tres'`);
      else if (wordsToNum[m[1].toLowerCase()] !== q.answer.length) err(`${q.id}: stem says ${m[1]} but answer has ${q.answer.length}`);
      if (q.answer.length >= q.options.length) err(`${q.id}: all options correct`);
    } else if (/Elige (dos|tres|cuatro)/i.test(q.stem)) err(`${q.id}: single question stem says 'Elige N'`);
  }
  if (!srcOk(q.source)) err(`${q.id}: bad source ${q.source}`);
  if (typeof q.preview !== 'boolean') err(`${q.id}: preview must be boolean`);
  const sentences = (q.explanation.match(/[.!?](\s|$)/g) || []).length;
  if (sentences < 2 || sentences > 5) console.log(`  note: ${q.id} explanation has ${sentences} sentences`);
}

/* ---------- cards ---------- */
if (C.length !== 100) err(`cards count ${C.length} != 100`);
const cIds = new Set();
const cardSkills = {};
for (const c of C) {
  if (cIds.has(c.id)) err(`dup card id ${c.id}`);
  cIds.add(c.id);
  if (!c.id.startsWith(`c-${c.skill}-`)) err(`${c.id}: id/skill mismatch`);
  if (!SKILLS.includes(c.skill)) err(`${c.id}: unknown skill ${c.skill}`);
  if (!nonEmpty(c.front) || !nonEmpty(c.back)) err(`${c.id}: empty front/back`);
  const words = c.back.trim().split(/\s+/).length;
  if (words > 40) err(`${c.id}: back has ${words} words (>40)`);
  if (!srcOk(c.source)) err(`${c.id}: bad source ${c.source}`);
  cardSkills[c.skill] = (cardSkills[c.skill] || 0) + 1;
}
for (const s of SKILLS) if (!cardSkills[s]) err(`no flashcard for skill ${s}`);

/* ---------- coverage ---------- */
const perSkill = {}, perDomain = {};
for (const q of Q) { perSkill[q.skill] = (perSkill[q.skill] || 0) + 1; perDomain[q.domain] = (perDomain[q.domain] || 0) + 1; }
for (const s of SKILLS) {
  const n = perSkill[s] || 0;
  const min = s[0] === '1' ? 2 : s[0] === '2' ? 3 : 3;
  if (n < min) err(`skill ${s} has ${n} questions (< ${min})`);
}

console.log('\n== Questions per domain ==', perDomain);
console.log('== Questions per skill ==');
console.log(SKILLS.map(s => `${s}:${perSkill[s] || 0}`).join('  '));
const cardDomain = {};
for (const c of C) cardDomain['D' + c.skill[0]] = (cardDomain['D' + c.skill[0]] || 0) + 1;
console.log('\n== Cards per domain ==', cardDomain);
console.log('== Cards per skill ==');
console.log(SKILLS.map(s => `${s}:${cardSkills[s] || 0}`).join('  '));

const multi = Q.filter(q => q.type === 'multi').length;
console.log(`\nmulti-select: ${multi}/${Q.length} (${(100 * multi / Q.length).toFixed(1)}%)`);
console.log('preview=true:', Q.filter(q => q.preview).length);
const diff = { 1: 0, 2: 0, 3: 0 }; Q.forEach(q => diff[q.difficulty]++);
console.log('difficulty distribution:', diff);
const posSingle = [0, 0, 0, 0], posAll = [0, 0, 0, 0, 0];
Q.forEach(q => { if (q.type === 'single') posSingle[q.answer[0]]++; q.answer.forEach(a => posAll[a]++); });
console.log('correct position (single only, idx 0..3):', posSingle);
console.log('correct position (all correct options, idx 0..4):', posAll);
let sl = 0, sn = 0;
Q.forEach(q => { if (q.type === 'single') { sn++; const L = q.options.map(o => o.length); if (L[q.answer[0]] >= Math.max(...L)) sl++; } });
console.log(`single questions where the correct option is the longest: ${sl}/${sn} (${(100 * sl / sn).toFixed(0)}%)`);

/* ---------- URLs ---------- */
const urls = [...new Set([...Q.map(q => q.source), ...C.map(c => c.source)])].sort();
console.log(`\ndistinct source URLs: ${urls.length}`);
if (checkUrls) {
  const opts = { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (AB620 validator)' } };
  async function check(u) {
    try {
      let r = await fetch(u, { ...opts, method: 'HEAD' });
      if (r.status !== 200) r = await fetch(u, { ...opts, method: 'GET' });
      return { u, status: r.status, final: r.url };
    } catch (e) {
      try { const r = await fetch(u, { ...opts, method: 'GET' }); return { u, status: r.status, final: r.url }; }
      catch (e2) { return { u, status: 'ERR ' + e2.message, final: '' }; }
    }
  }
  const res = new Array(urls.length);
  let i = 0;
  await Promise.all(Array.from({ length: 6 }, async () => { while (i < urls.length) { const k = i++; res[k] = await check(urls[k]); } }));
  let bad = 0;
  for (const r of res) {
    const redirected = r.final && r.final !== r.u;
    if (r.status !== 200) { bad++; err(`URL ${r.status}: ${r.u}`); }
    else if (redirected) console.log(`  200 (redirect) ${r.u} -> ${r.final}`);
  }
  console.log(`URL check: ${urls.length - bad}/${urls.length} return HTTP 200`);
} else {
  console.log('(run with --urls to check HTTP status)');
}

console.log(errors ? `\nFAILED with ${errors} error(s)` : '\nALL CHECKS PASSED');
process.exit(errors ? 1 : 0);
