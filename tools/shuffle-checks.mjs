// Re-orders the options of every lesson check question with a seeded shuffle (reproducible) so the
// correct answer's position carries no pattern; keeps `answer` pointing at the same option. Run once after editing checks.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const R = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const hash = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
const rng = (seed) => () => ((seed = Math.imul(seed ^ (seed >>> 15), 2246822507) ^ Math.imul(seed ^ (seed >>> 13), 3266489909)) >>> 0) / 4294967296;
const count = [0, 0, 0, 0];
for (const f of ['course-m0.js', 'course-m1-3.js', 'course-m4-7.js']) {
  const fp = path.join(R, 'data', f), src = fs.readFileSync(fp, 'utf8'); globalThis.window = {}; new Function(src)();
  for (const t of window.AB620_COURSE) {
    const orig = (t.check || []).map((c) => ({ options: c.options, answer: c.answer }));
    for (let v = 1; v < 50; v++) {   // new salt until the topic's answers are not all in the same position
      const out = orig.map((c, i) => { const r = rng(hash(t.id + '#' + i + '#v' + v)), idx = c.options.map((_, k) => k);
        for (let k = idx.length - 1; k > 0; k--) { const j = Math.floor(r() * (k + 1)); [idx[k], idx[j]] = [idx[j], idx[k]]; }
        return { options: idx.map((k) => c.options[k]), answer: idx.indexOf(c.answer) }; });
      if (out.length < 2 || new Set(out.map((c) => c.answer)).size > 1) { out.forEach((c, i) => { t.check[i].options = c.options; t.check[i].answer = c.answer; count[c.answer]++; }); break; }
    }
  }
  fs.writeFileSync(fp, src.slice(0, src.indexOf('window.AB620_COURSE.push(')) + 'window.AB620_COURSE.push(\n' + window.AB620_COURSE.map((t) => JSON.stringify(t, null, 1)).join(',\n') + '\n);\n');
}
console.log('answer positions A/B/C/D:', count.join(' / '));
