// Servidor estático mínimo para probar dist/ en el navegador: node tools/serve.mjs [puerto]
// Extra para pruebas: ?now=YYYY-MM-DD simula esa fecha (p. ej. un sábado) sin tocar el reloj del sistema.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist'), port = +process.argv[2] || 4620;
const shimFor = (d) => `<script>(function(){var R=Date,off=new R('${d}T10:00:00').getTime()-R.now();
function D(){var a=arguments;if(!a.length)return new R(R.now()+off);return new (Function.prototype.bind.apply(R,[null].concat([].slice.call(a))))}
D.prototype=R.prototype;D.now=function(){return R.now()+off};D.parse=R.parse;D.UTC=R.UTC;window.Date=D;})()</script>`;
http.createServer((req, res) => {
  const p = req.url.split('?')[0];
  if (p === '/favicon.ico') { res.writeHead(204); res.end(); return; }   // browsers (Edge) ask for it; the artifact has none
  // /video/F01.mp4 and /video/F01.vtt are served from video/F01/ (same published paths as the artifact)
  { const v = /^\/video\/([\w-]+)\.(mp4|vtt|jpg)$/.exec(p); if (v) { const f = path.join(dist, '..', 'video', v[1], v[1] + '.' + v[2]); if (fs.existsSync(f)) { const b = fs.readFileSync(f), ct = { mp4: 'video/mp4', vtt: 'text/vtt', jpg: 'image/jpeg' }[v[2]]; const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || ''); if (m) { const s0 = +m[1] || 0, e0 = m[2] ? +m[2] : b.length - 1; res.writeHead(206, { 'content-type': ct, 'accept-ranges': 'bytes', 'content-range': 'bytes ' + s0 + '-' + e0 + '/' + b.length }); res.end(b.subarray(s0, e0 + 1)); } else { res.writeHead(200, { 'content-type': ct, 'accept-ranges': 'bytes' }); res.end(b); } return; } } }
  if (/^\/audio\/[\w-]+\.mp3$/.test(p)) { const a = path.join(dist, '..', p); if (fs.existsSync(a)) { const b = fs.readFileSync(a); const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || ''); if (m) { const s0 = +m[1] || 0, e0 = m[2] ? +m[2] : b.length - 1; res.writeHead(206, { 'content-type': 'audio/mpeg', 'accept-ranges': 'bytes', 'content-range': 'bytes ' + s0 + '-' + e0 + '/' + b.length }); res.end(b.subarray(s0, e0 + 1)); } else { res.writeHead(200, { 'content-type': 'audio/mpeg', 'accept-ranges': 'bytes' }); res.end(b); } return; } }
  const f = path.join(dist, p === '/' ? 'taller-ab620.html' : p);
  if (!f.startsWith(dist) || !fs.existsSync(f)) { res.writeHead(404); res.end('no'); return; }
  const m = /[?&]now=(\d{4}-\d{2}-\d{2})/.exec(req.url);
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>' + (m ? shimFor(m[1]) : '') + fs.readFileSync(f, 'utf8') + '</body></html>');
}).listen(port, () => console.log('http://localhost:' + port));
