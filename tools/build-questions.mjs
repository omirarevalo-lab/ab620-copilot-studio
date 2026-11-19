// Builds data/questions.js from the authored files (q-d1/q-d2/q-d3). Deterministic option shuffle.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Q } from './qlib.mjs';
import './q-d1.mjs';
import './q-d2.mjs';
import './q-d3.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'data', 'questions.js');

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(620);
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// balanced target positions for single-answer questions (4 options)
const singles = Q.filter(x => x.correct.length === 1);
let targets = [];
while (targets.length < singles.length) targets = targets.concat(shuffle([0, 1, 2, 3]));
targets = targets.slice(0, singles.length);
let si = 0;

// difficulty calibration (authoring default is kept unless overridden here)
const DIFF = {
  'q-1.1c-01': 1, 'q-1.2c-02': 1, 'q-1.2f-02': 1, 'q-1.3c-01': 1, 'q-1.3h-01': 1, 'q-2.2a-03': 1,
  'q-2.2b-01': 1, 'q-2.3a-01': 1, 'q-2.3e-01': 1, 'q-2.3e-02': 1, 'q-2.3b-03': 1, 'q-2.4b-01': 1,
  'q-2.4c-03': 1, 'q-3.1c-03': 1, 'q-3.2b-02': 1, 'q-3.2a-01': 1, 'q-2.3d-01': 1,
  'q-1.1b-02': 2, 'q-1.1c-02': 2, 'q-1.1e-02': 2, 'q-1.3e-02': 2, 'q-1.3d-02': 2, 'q-2.1a-02': 2,
  'q-2.2c-03': 2, 'q-2.3b-02': 2, 'q-2.3c-03': 2, 'q-2.3d-02': 2, 'q-3.1a-03': 2, 'q-3.1a-04': 2,
};
const counters = {};
const out = [];
for (const item of Q) {
  const n = (counters[item.skill] = (counters[item.skill] || 0) + 1);
  const id = `q-${item.skill}-${String(n).padStart(2, '0')}`;
  const type = item.correct.length > 1 ? 'multi' : 'single';
  const total = item.correct.length + item.wrong.length;
  let options, answer;
  if (type === 'single') {
    if (item.wrong.length !== 3) throw new Error(`${id}: single needs 3 distractors`);
    const t = targets[si++];
    const w = shuffle(item.wrong);
    options = [];
    let wi = 0;
    for (let i = 0; i < total; i++) options.push(i === t ? item.correct[0] : w[wi++]);
    answer = [t];
  } else {
    const tagged = shuffle([
      ...item.correct.map(text => ({ text, ok: true })),
      ...item.wrong.map(text => ({ text, ok: false })),
    ]);
    options = tagged.map(x => x.text);
    answer = tagged.map((x, i) => (x.ok ? i : -1)).filter(i => i >= 0);
  }
  out.push({
    id,
    skill: item.skill,
    domain: 'D' + item.skill[0],
    type,
    difficulty: DIFF[id] || item.diff,
    stem: item.stem,
    options,
    answer,
    explanation: item.explanation,
    source: item.source,
    preview: !!item.preview,
  });
}

let json = JSON.stringify(out, null, 2).replace(/<\/script/gi, '<\\/script');
const header =
  '// AB-620 practice question bank (130 original scenario-based questions, Spanish).\n' +
  '// Generated from tools/q-d*.mjs by tools/build-questions.mjs. Schema: SPEC §6.\n';
fs.writeFileSync(OUT, header + 'window.AB620_QUESTIONS = ' + json + ';\n', 'utf8');
console.log('wrote', OUT, out.length, 'questions');
