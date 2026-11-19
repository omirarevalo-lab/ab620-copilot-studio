// node tools/video/check-script.mjs <ID>
// Deterministic validator for research/video-long/<ID>-script.json + -cards.json + video/<ID>/quiz.json.
// Exit 0 = OK, exit 1 = prints the list of problems (the pipeline feeds them back to the lead).
import fs from 'node:fs';
const id = process.argv[2];
if (!id) { console.error('usage: check-script.mjs <ID>'); process.exit(2); }
const rd = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const err = [];
const sp = `research/video-long/${id}-script.json`, cp = `research/video-long/${id}-cards.json`, qp = `video/${id}/quiz.json`, sbp = `research/video-long/${id}-storyboard.md`;
for (const p of [sp, qp, sbp]) if (!fs.existsSync(p)) err.push('missing file ' + p);
if (err.length) { console.log(err.join('\n')); process.exit(1); }
let S, Q, C = {};
try { S = rd(sp); } catch (e) { err.push('script JSON invalid: ' + e.message); }
try { Q = rd(qp); } catch (e) { err.push('quiz JSON invalid: ' + e.message); }
if (fs.existsSync(cp)) { try { C = rd(cp); } catch (e) { err.push('cards JSON invalid: ' + e.message); } }
if (err.length) { console.log(err.join('\n')); process.exit(1); }
const sents = (t) => t.match(/[^.?!]+[.?!]+/g)?.map((x) => x.trim()) || [];
const words = (t) => t.trim().split(/\s+/).length;
if (!Array.isArray(S) || S.length < 8 || S.length > 20) err.push('script must be an array of 8-20 scenes, has ' + (S?.length));
let total = 0;
S.forEach((s, i) => {
  for (const k of ['title', 'caption', 'say']) if (typeof s[k] !== 'string' || !s[k].trim()) err.push(`scene ${i}: missing ${k}`);
  if (typeof s.say !== 'string') return;
  total += words(s.say);
  if (/\d/.test(s.say)) err.push(`scene ${i}: say contains digits (write numbers as words)`);
  if (/[#*_`<>{}\[\]\\\/|@%&=+~^]/.test(s.say)) err.push(`scene ${i}: say contains symbols the narrator cannot read`);
  if (words(s.caption || '') > 25) err.push(`scene ${i}: caption has more than 25 words`);
  if (words(s.say) > 90) err.push(`scene ${i}: say has ${words(s.say)} words (max 90)`);
  if (words(s.say) < 40) err.push(`scene ${i}: say has only ${words(s.say)} words (min 40)`);
});
const minutes = total / 150;
if (minutes > 8.2) err.push(`script is ${minutes.toFixed(1)} min (cap 8)`);
if (minutes < 2.5) err.push(`script is only ${minutes.toFixed(1)} min (min 2.5)`);
if (!Array.isArray(Q) || Q.length < 2 || Q.length > 4) err.push('quiz must have 2-4 exams, has ' + (Q?.length));
const scenes = new Set();
(Q || []).forEach((q, k) => {
  const s = S[q.scene];
  if (!s) { err.push(`exam ${k}: scene ${q.scene} does not exist`); return; }
  scenes.add(q.scene);
  const ss = sents(s.say);
  if (q.pauseSentence !== 7) err.push(`exam ${k}: pauseSentence must be 7`);
  if (ss.length !== 11) err.push(`exam ${k} (scene ${q.scene}): must have exactly 11 sentences, has ${ss.length}`);
  if (ss[0] !== 'Your turn.') err.push(`exam ${k}: sentence 0 must be exactly "Your turn."`);
  if (ss[7] !== 'Decide before I answer.') err.push(`exam ${k}: sentence 7 must be exactly "Decide before I answer."`);
  if (!Array.isArray(q.options) || q.options.length !== 3) { err.push(`exam ${k}: needs 3 options`); return; }
  q.options.forEach((o, j) => {
    const spoken = (ss[4 + j] || '').replace(/^Or\s+/i, '').replace(/\?$/, '').trim().toLowerCase();
    if (spoken !== o.trim().toLowerCase()) err.push(`exam ${k}: option ${'ABC'[j]} "${o}" differs from spoken sentence ${4 + j} "${ss[4 + j]}" (only a leading "Or" and the final "?" may be dropped)`);
  });
  if (!ss[4]?.endsWith('?') || !ss[5]?.endsWith('?') || !ss[6]?.endsWith('?')) err.push(`exam ${k}: sentences 4-6 must end with "?"`);
  if (!ss[6]?.startsWith('Or ')) err.push(`exam ${k}: sentence 6 must start with "Or "`);
  const L = q.options.map((o) => o.length), mean = L.reduce((a, b) => a + b, 0) / 3;
  if (L.some((l) => Math.abs(l - mean) / mean > 0.15)) err.push(`exam ${k}: option lengths ${L.join('/')} are not within +-15% of their mean`);
  if (L[q.right] === Math.max(...L)) err.push(`exam ${k}: the right option must never be the longest`);
  if (!(q.right >= 0 && q.right <= 2) || !(q.trap >= 0 && q.trap <= 2) || q.right === q.trap) err.push(`exam ${k}: right/trap must be different indexes 0-2`);
  if (!/\?/.test(q.question) && !/\.$/.test(q.question)) err.push(`exam ${k}: question text looks wrong`);
});
const idx = [...scenes].sort((a, b) => a - b);
for (let i = 1; i < idx.length; i++) if (idx[i] - idx[i - 1] < 2) err.push(`exams in scenes ${idx[i - 1]} and ${idx[i]} are adjacent (leave at least one teaching scene between them)`);
if (idx.length && idx[0] < 3) err.push('first exam is too early (before scene 3): teach before you ask');
const rights = (Q || []).map((q) => q.right);
if (rights.length >= 3 && new Set(rights).size < 2) err.push('the right letter must vary across the exams');
if (rights.length >= 3 && new Set(rights).size === 2 && rights.filter((r) => r === rights[0]).length === 3) err.push('right letters must vary');
const last = S[S.length - 1]?.say || '';
if (!/next/i.test(last)) err.push('last scene should end by announcing the next lesson ("Next, ...")');
Object.keys(C).forEach((k) => { if (!S[+k]) err.push(`cards: key ${k} is not a scene`); else if (scenes.has(+k)) err.push(`cards: scene ${k} is an exam scene (no card)`); });
const sb = fs.readFileSync(sbp, 'utf8');
if (!/World layout/i.test(sb)) err.push('storyboard has no "World layout" section');
if (!/quiz\.json/i.test(sb)) err.push('storyboard has no quiz.json section');
if (sb.split(/\n## \d+ /).length - 1 !== S.length) err.push(`storyboard has ${sb.split(/\n## \d+ /).length - 1} numbered scene sections, script has ${S.length}`);
if (err.length) { console.log(err.join('\n')); process.exit(1); }
console.log(`OK ${id}: ${S.length} scenes, ${minutes.toFixed(1)} min, exams at ${idx.join(',')}, right ${rights.join(',')}`);
