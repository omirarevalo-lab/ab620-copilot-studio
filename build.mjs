// Inserta CSS y scripts locales en un único archivo: dist/taller-ab620.html
// Each certification's data (data/ for AB-620, data/ab400/ for AB-400) is wrapped so the legacy global names do not collide:
//   (function (window) { …data file… })(window.__CERTS.<id> = window.__CERTS.<id> || {});
// src/cert.js (after the data) picks the active certification and copies its globals onto the real window.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(root, 'src');
let html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');

// Certification registry: one entry per exam the app can hold. Order = order in the picker.
const CERTS = [{ id: 'ab620', dir: 'data' }, { id: 'ab400', dir: 'data/ab400' }];
// Data files of a certification, in load order. Missing optional ones are skipped quietly; the course files are found by name.
const DATA_FILES = ['audio-index.js', 'video-index.js', 'qmap.js', 'meta.js', 'questions.js', 'flashcards.js'];
const COURSE_RE = /^course-m[\w-]*\.js$/;

// Evita que el contenido inline cierre la etiqueta <script> o <style>.
const safeJs = (s) => s.replace(/<\/script/gi, '<\/script').replace(/<!--/g, '<\!--');
const safeCss = (s) => s.replace(/<\/style/gi, '<\/style');
const script = (js) => '<script>\n' + safeJs(js) + '\n</script>';

function certScripts() {
  const out = [script('window.__CERTS = window.__CERTS || {};\n' + CERTS.map((c) => `window.__CERTS.${c.id} = window.__CERTS.${c.id} || {};`).join('\n'))];
  for (const c of CERTS) {
    const dir = path.join(root, ...c.dir.split('/'));
    if (!fs.existsSync(dir)) { console.warn('Certificación sin carpeta de datos:', c.dir); continue; }
    let course = fs.readdirSync(dir).filter((f) => COURSE_RE.test(f)).sort();
    if (!course.length && c.id === 'ab620') { console.warn('Sin data/course-m*.js: usando data/course.sample.js'); course = ['course.sample.js']; }
    else console.log('Curso ' + c.id + ':', course.join(', ') || '(vacío)');
    const files = [...DATA_FILES.map((f) => path.join(dir, f)), ...course.map((f) => path.join(dir, f))];
    for (const p of files) {
      if (!fs.existsSync(p)) continue;
      out.push(script(`(function (window) {\n${fs.readFileSync(p, 'utf8')}\n})(window.__CERTS.${c.id} = window.__CERTS.${c.id} || {});`));
    }
  }
  return out.join('\n');
}

html = html.replace('<!-- @certs -->', () => certScripts());
html = html.replace(/<link\s+rel="stylesheet"\s+href="([^"]+\.css)"\s*\/?>/g, (m, href) => {
  const p = path.resolve(srcDir, href);
  if (!fs.existsSync(p)) { console.warn('CSS no encontrado:', href); return ''; }
  return '<style>\n' + safeCss(fs.readFileSync(p, 'utf8')) + '\n</style>';
});
html = html.replace(/<script\s+src="([^"]+)"\s*><\/script>/g, (m, src) => {
  const p = path.resolve(srcDir, src);
  if (!fs.existsSync(p)) { console.warn('Script omitido (no existe):', src); return ''; }
  return script(fs.readFileSync(p, 'utf8'));
});

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
const out = path.join(root, 'dist', 'taller-ab620.html');
fs.writeFileSync(out, html);
console.log('Escrito', out, (Buffer.byteLength(html) / 1024).toFixed(0) + ' KB');
