// Genera src/icons.js (window.AB620_ICONS) a partir de video/assets/icons/*.svg (Fluent UI System Icons, MIT).
// Uso: node tools/visuals/icons.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const dir = path.join(root, 'video', 'assets', 'icons');
const map = {};
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.svg')).sort()) {
  const svg = fs.readFileSync(path.join(dir, f), 'utf8').trim();
  const d = [...svg.matchAll(/<path\b[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
  if (!d.length) { console.warn('sin <path>:', f); continue; }
  map[f.replace(/\.svg$/, '')] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">'
    + d.map((p) => '<path d="' + p + '"/>').join('') + '</svg>';
}
const out = '/* Generado por tools/visuals/icons.mjs: Fluent UI System Icons (MIT). No editar a mano. */\nwindow.AB620_ICONS = ' + JSON.stringify(map, null, 1) + ';\n';
fs.writeFileSync(path.join(root, 'src', 'icons.js'), out);
console.log('src/icons.js:', Object.keys(map).length, 'iconos,', (out.length / 1024).toFixed(0) + ' KB');
