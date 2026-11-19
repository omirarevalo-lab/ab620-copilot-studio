// Usage: node urlcheck.mjs url1 url2 ...   OR   node urlcheck.mjs --file urls.txt
import fs from 'node:fs';
const args = process.argv.slice(2);
let urls = [];
if (args[0] === '--file') urls = fs.readFileSync(args[1], 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
else urls = args;

async function check(u) {
  const opts = { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (AB620 validator)' } };
  try {
    let r = await fetch(u, { ...opts, method: 'HEAD' });
    if (r.status === 200) return { u, status: 200, final: r.url };
    r = await fetch(u, { ...opts, method: 'GET' });
    return { u, status: r.status, final: r.url };
  } catch (e) {
    try {
      const r = await fetch(u, { ...opts, method: 'GET' });
      return { u, status: r.status, final: r.url };
    } catch (e2) {
      return { u, status: 'ERR ' + e2.message, final: '' };
    }
  }
}
const CONC = 6;
const results = [];
let i = 0;
async function worker() {
  while (i < urls.length) {
    const idx = i++;
    results[idx] = await check(urls[idx]);
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
for (const r of results) console.log(r.status, r.u, r.final && r.final !== r.u ? '-> ' + r.final : '');
