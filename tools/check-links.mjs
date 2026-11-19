// Verifica que cada URL de data/plan.js responda 200 tras redirecciones (HEAD y, si falla, GET).
// Uso: node tools/check-links.mjs [--json salida.json]
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'data', 'plan.js'), 'utf8'), ctx);
const plan = ctx.window.AB620_PLAN;

// Recolecta URLs de todos los strings del plan (campos url/link y menciones en texto).
// URLs que no son enlaces navegables: plantillas, localhost y endpoints solo POST.
const IGNORE = [/127\.0\.0\.1/, /localhost/, /TU-RECURSO/i, /directline\.botframework\.com\/v3\/directline\/tokens/, /\*$/];
const urls = new Map();
function add(u, where) {
  u = u.replace(/[)\].,;:'"»]+$/, '');
  if (IGNORE.some(rx => rx.test(u))) return;
  if (!urls.has(u)) urls.set(u, []);
  urls.get(u).push(where);
}
(function walk(v, p) {
  if (typeof v === 'string') {
    for (const m of v.matchAll(/https?:\/\/[^\s"'<>`]+/g)) {
      if (/<[^>]+>|\{|\}/.test(m[0])) continue; // plantillas con marcadores
      add(m[0], p);
    }
  } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, p + '[' + i + ']'));
  else if (v && typeof v === 'object') for (const k of Object.keys(v)) walk(v[k], p + '.' + k);
})(plan, 'plan');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
async function check(u) {
  const out = { url: u, status: 0, final: u, method: '' };
  for (const method of ['HEAD', 'GET']) {
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 25000);
      const r = await fetch(u, { method, redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': UA, accept: 'text/html,*/*' } });
      clearTimeout(t);
      out.status = r.status; out.final = r.url; out.method = method;
      if (r.status === 200) return out;
    } catch (e) { out.status = 'ERR ' + (e.cause?.code || e.message); out.method = method; }
  }
  return out;
}

const list = [...urls.keys()];
const results = [];
let i = 0;
await Promise.all(Array.from({ length: 8 }, async () => {
  while (i < list.length) { const u = list[i++]; results.push(await check(u)); }
}));
results.sort((a, b) => a.url.localeCompare(b.url));
const bad = results.filter(r => r.status !== 200);
for (const r of results) {
  const flag = r.status === 200 ? 'OK ' : 'BAD';
  const moved = r.final !== r.url ? '  -> ' + r.final : '';
  console.log(flag, r.status, r.method, r.url + moved);
}
console.log('\nVerificadas: ' + results.length + ' · OK: ' + (results.length - bad.length) + ' · con problema: ' + bad.length);
if (bad.length) { console.log('\nPROBLEMAS:'); for (const r of bad) console.log(' ', r.status, r.url, '\n    en', urls.get(r.url).slice(0, 3).join(', ')); }
const j = process.argv.indexOf('--json');
if (j > -1) fs.writeFileSync(process.argv[j + 1], JSON.stringify(results, null, 1));
process.exit(bad.length ? 1 : 0);
