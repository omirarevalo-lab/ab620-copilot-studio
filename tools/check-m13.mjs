// Local validator for data/course-m1-3.js (schema v4). Usage: node tools/check-m13.mjs [file]
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = process.argv[2] || path.join(root, 'data/course-m1-3.js');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(file, 'utf8'), ctx);
const flat = (ctx.window.AB620_COURSE || []).flat();
const errs = [], rows = [];
const wc = s => (String(s).match(/[\p{L}\p{N}][\p{L}\p{N}'.\-]*/gu) || []).length;
const modOf = n => (n <= 7 ? 1 : n <= 16 ? 2 : 3);
const colorRe = /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|\b(red|blue|green|black|white|gray|grey|orange|yellow|purple|pink)\b\s*[;"')]/i;
const urlRe = /https?:\/\/|www\./i;
const seen = new Set();
for (const t of flat) {
  const e = m => errs.push(`${t.id}: ${m}`);
  const n = parseInt(t.id.slice(1), 10);
  if (seen.has(t.id)) e('id duplicado'); seen.add(t.id);
  if (!/^L\d\d$/.test(t.id)) e('id inválido');
  if (t.module !== modOf(n)) e('module ' + t.module);
  if (!['básico', 'intermedio', 'examen'].includes(t.level)) e('level');
  if (!(t.minutes > 0)) e('minutes');
  if (!Array.isArray(t.skills) || !t.skills.length) e('skills');
  const th = t.theory || {};
  if (!th.intro) e('intro');
  if (!(th.sections && th.sections.length >= 3 && th.sections.length <= 5)) e('sections 3-5: ' + (th.sections || []).length);
  (th.sections || []).forEach((s, i) => {
    if (!s.heading || !s.body) e('section ' + i);
    String(s.body).split('\n\n').forEach(p => { if (wc(p) > 120) e(`section ${i} párrafo >120 palabras`); });
  });
  if (!(th.steps && th.steps.length >= 4 && th.steps.length <= 8)) e('steps 4-8');
  const ew = wc(th.example || ''); if (ew < 60 || ew > 120) e('example words ' + ew);
  if (!(th.examTips && th.examTips.length >= 2 && th.examTips.length <= 4)) e('examTips 2-4');
  if (!(th.glossary && th.glossary.length >= 2 && th.glossary.length <= 6)) e('glossary 2-6');
  (th.glossary || []).forEach(g => { if (!g.term || !g.def || wc(g.def) > 30) e('glossary def ' + g.term); });
  const words = wc(th.intro) + (th.sections || []).reduce((a, s) => a + wc(s.heading) + wc(s.body), 0) + (th.steps || []).reduce((a, s) => a + wc(s), 0) + ew +
    (th.examTips || []).reduce((a, s) => a + wc(s), 0) + (th.glossary || []).reduce((a, g) => a + wc(g.term) + wc(g.def), 0);
  if (words < 300 || words > 600) e('theory words ' + words);
  const sc = t.scenes || [];
  if (sc.length < 5 || sc.length > 8) e('scenes ' + sc.length);
  let vis = 0;
  sc.forEach((s, i) => {
    if (!s.title || !s.caption || !s.say) e('scene ' + i + ' incompleta');
    if (wc(s.caption) > 25) e(`scene ${i} caption ${wc(s.caption)}`);
    const w = wc(s.say); if (w < 40 || w > 90) e(`scene ${i} say ${w} palabras`);
    if (/[0-9]/.test(s.say)) e(`scene ${i} say con dígitos`);
    if (/[\/\\:@#%&+=_*<>{}()\[\]"]|https?|\.[a-z]{2,}/i.test(s.say.replace(/\.\s/g, ' '))) e(`scene ${i} say con símbolos: ` + s.say.match(/[\/\\:@#%&+=_*<>{}()\[\]"]/)?.[0]);
    if (/\b[A-Z]{2,}\b/.test(s.say)) e(`scene ${i} say con siglas: ` + s.say.match(/\b[A-Z]{2,}\b/)[0]);
    if (s.visual) vis++;
  });
  if (vis * 2 < sc.length) e(`visuales en escenas ${vis}/${sc.length} (<mitad)`);
  const tv = (th.sections || []).filter(s => s.visual).length;
  if (tv + vis < 2) e('menos de 2 visuales');
  const ck = t.check || [];
  if (ck.length < 3 || ck.length > 4) e('check ' + ck.length);
  const ans = new Set();
  ck.forEach((q, i) => {
    if (!q.stem || !q.explanation) e('check ' + i);
    if (!Array.isArray(q.options) || q.options.length !== 4) e(`check ${i} options`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) e(`check ${i} answer`);
    if (new Set(q.options).size !== 4) e(`check ${i} opciones repetidas`);
    ans.add(q.answer);
  });
  if (ck.length >= 3 && ans.size < 2) e('todas las respuestas en el mismo índice');
  if (!t.reto || !t.reto.text || !t.reto.minutes) e('reto');
  if (!/^https:\/\/learn\.microsoft\.com\//.test(t.source || '')) e('source');
  // visuals: colores, tamaño, urls
  const visuals = [...(th.sections || []).map(s => s.visual), ...sc.map(s => s.visual)].filter(Boolean);
  visuals.forEach((v, i) => {
    if (colorRe.test(v)) e(`visual ${i} con color fijo`);
    if (urlRe.test(v)) e(`visual ${i} con URL`);
    const vb = v.match(/viewBox="0 0 (\d+) (\d+)"/); if (vb && (+vb[1] > 360 || +vb[2] > 220)) e(`visual ${i} viewBox ${vb[1]}x${vb[2]}`);
    for (const m of v.matchAll(/font-size[:=]"?(\d+)/g)) if (+m[1] < 12 && !v.includes('font-size:11px;color:var(--muted)')) e(`visual ${i} font-size ${m[1]}`);
  });
  const nonSrc = JSON.stringify({ ...t, source: undefined });
  if (urlRe.test(nonSrc)) e('URL fuera de source');
  if (nonSrc.includes('</script')) e('</script sin escapar');
  rows.push(`${t.id} | ${t.title} | ${words} pal | ${sc.length} escenas | ${ck.length} checks | vis ${tv}+${vis}`);
}
console.log(rows.join('\n'));
console.log(errs.length ? `\n${errs.length} ERRORES:\n` + errs.join('\n') : `\nOK: ${flat.length} topics`);
process.exit(errs.length ? 1 : 0);
