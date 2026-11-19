// Question -> video chapter map: writes data/qmap.js (data/ab400/qmap.js with CERT=ab400) (window.AB620_QMAP = { qid: [topicId, sceneIndex] }).
// Method: candidate topics = topics whose skills include the question's skill; score word overlap between
// (stem + correct options + explanation) and (scene title + say). Re-run whenever questions or scenes change.
// A match needs at least 2 shared words, otherwise the question gets no video link.
// An L-topic wins over an F-topic of the same skill when its score is within 20 % of the best.
// Usage: node tools/qmap.mjs
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import { ROOT as root, DATA_REL, courseFiles as listCourse } from './cert.mjs';   // CERT=ab400 reads and writes data/ab400/
const ctx = { window: {}, console }; vm.createContext(ctx);
const courseFiles = listCourse();
for (const f of [DATA_REL + '/questions.js', ...courseFiles.map((f) => DATA_REL + '/' + f)])
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const Q = ctx.window.AB620_QUESTIONS, T = ctx.window.AB620_COURSE;

const STOP = new Set(('a an and are as at be been but by can do does for from has have how if in into is it its not of on or so such than that the their then there these they this to was were what when where which who why will with without you your ' +
  'use used using should would could also any all more most only other some each per via about after before between during over under up out one two').split(' '));
const COMMON = new Set('agent agents copilot studio microsoft'.split(' '));
const words = (s) => { const out = new Set(); for (const w of String(s || '').toLowerCase().split(/[^a-z0-9]+/)) if (w.length > 2 && !STOP.has(w) && !COMMON.has(w)) out.add(w); return out; };

// Bank questions (candidates = topics sharing the skill) plus each topic's own check questions ("<topic>#c<n>", candidates = that topic).
const items = Q.map((q) => ({ q, cands: T.filter((t) => (t.skills || []).includes(q.skill) && (t.scenes || []).length) }));
T.forEach((t) => (t.check || []).forEach((c, i) => { if ((t.scenes || []).length) items.push({ q: { id: t.id + '#c' + i, stem: c.stem, options: c.options, answer: [c.answer], explanation: c.explanation }, cands: [t] }); }));
const entries = {}, report = [];
let total = 0, mapped = 0;
for (const { q, cands } of items) {
  total++;
  if (!cands.length) continue;
  const correct = (q.answer || []).map((i) => q.options[i]).join(' ');
  const qw = words([q.stem, correct, q.explanation].join(' '));
  let best = null, bestL = null;
  for (const t of cands) t.scenes.forEach((sc, i) => {
    const sw = words((sc.title || '') + ' ' + (sc.say || ''));
    let s = 0; qw.forEach((w) => { if (sw.has(w)) s++; });
    if (!best || s > best.s) best = { s, t, i, sc };   // ties keep the earlier (topic order, scene order)
    if (t.id[0] === 'L' && (!bestL || s > bestL.s)) bestL = { s, t, i, sc };
  });
  // Prefer the dedicated L-topic over a Fundamentals (F) topic when it teaches the same skill and scores within ~20 % of the best.
  if (best && best.t.id[0] !== 'L' && bestL && bestL.s >= 2 && bestL.s >= 0.8 * best.s) best = bestL;
  entries[q.id] = [best.t.id, best.i];
  if (best.s < 2) { delete entries[q.id]; continue; }
  mapped++; report.push(q.id + ' -> ' + best.t.id + ' · scene ' + (best.i + 1) + " '" + best.sc.title + "' (" + best.s + ')');
}
const body = Object.keys(entries).length ? '{\n' + Object.keys(entries).map((k) => ' ' + JSON.stringify(k) + ':' + JSON.stringify(entries[k])).join(',\n') + '\n}' : '{}';
fs.writeFileSync(path.join(root, ...DATA_REL.split('/'), 'qmap.js'), '// Question -> [topic id, scene index] for "Watch the explanation". Built by tools/qmap.mjs; do not edit.\nwindow.AB620_QMAP = ' + body + ';\n');
console.log('Mapped ' + mapped + '/' + total + ' questions, bank + topic checks (' + Math.round(100 * (total ? mapped / total : 0)) + '%) -> ' + DATA_REL + '/qmap.js');
const seen = new Set(); let n = 0;
while (n < Math.min(10, report.length)) { const i = Math.floor(Math.random() * report.length); if (!seen.has(i)) { seen.add(i); console.log('  ' + report[i]); n++; } }
