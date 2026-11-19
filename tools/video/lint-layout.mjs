// Layout lint for class videos (composition.html + GSAP timeline). Finds framing defects WITHOUT rendering the video.
//   node tools/video/lint-layout.mjs L35 [--step 1] [--from s] [--to s] [--scene N] [--no-build] [--png] [--margin 120]
//                                       [--inject-css "<css>"] [--inject-js "<js>"]   (inject = for mutation tests only)
// Builds video/<id>/_build via `render.mjs <id> --frames 0` (skip with --no-build), then seeks window.__timelines.main in Playwright
// (1920x1080) at every --step seconds + around each scene boundary (start-0.45) + after each sentence start, and checks the DOM:
//   BORDE-CORTADO   visible content cut by the frame edge, or text clipped by an overflow:hidden ancestor      (BLOQUEANTE)
//   BORDE-PEGADO    visible text/label/figure closer than 48 px to a frame edge (incl. figure heads touching the top)   (BLOQUEANTE)
//   BORDE-MARGEN    visible content between 48 px and --margin (120 px) from a frame edge, not cut             (MENOR)
//   TAPADO          text/label whose area is > 40 % covered by an opaque card/panel drawn on top of it            (BLOQUEANTE)
//   TEXTO-TAPADO    text partly (8-90 %) hidden by an opaque element painted above it, by real paint order (hit-testing)  (BLOQUEANTE)
//   DESBORDE        text spilling out of its own chip/card/pill (nearest ancestor with a background or border)      (BLOQUEANTE)
//   SOLAPE          two labels/pills/text units overlap > 10 % of the smaller (not ancestor/descendant)        (BLOQUEANTE)
//   VACIO           card/panel/window (.uw .pnl .rc .rcard .card .rm .tile [data-lint=card]) with no text, < 25 % of a 6x4 grid
//                   occupied; any opaque card that holds text but is nearly empty or has its whole lower half empty;
//                   or the whole frame nearly empty (4x3 grid)                                              (BLOQUEANTE if > 1 s, else MENOR)
//   --strict adds (video/<id>/lint-layout-strict.txt, cues.json):
//   PLANO-VACIO      > 50 % of a 24x14 grid with no visible non-background content (text, svg shapes < 12 % of the frame, img, small cards) for > 0.5 s
//                    (sampled every --empty-step 0.25 s; big opaque windows/floors do not count as content; skipped while an .exam room is shown)
//   CARTEL-AUSENTE   a label/UI name whose exact text is in ONE spoken sentence (beats.json) is not on screen (in frame, opacity > 0.5) for the whole
//                    sentence, or never; also Title-Case / verb-led UI names spoken ("Select Add node") that appear nowhere on screen   (BLOQ)
//   CUE-TARDIO       such a label appears > 1 s after its word (word time ~ proportional position in the sentence): > 1 s BLOQ (1-2 s too); shown > 0.4 s before the sentence: MENOR
//   FUENTE           judged by BASE size: computed font-size < 32 px AND never >= 32 px on screen at any sample (POP/transform animation never counts)
//   CARTEL-CORTADO-ENTRANDO, DECORADO-SOLAPADO as before. --cues-only: only the cue checks (used by frames-table to get the offsets).
//   DOBLE-EXPOSICION text of two layers/scenes (data-scene, or world/window/overlay layers) visible at once and overlapping > 30 % (BLOQUEANTE)
// Exempt: data-lint="ignore" / class lint-ignore (and descendants), full-screen backgrounds (>= 90 % of the frame), #cur #clickRing #vign.
// Elements hidden under a near-opaque full-screen veil (e.g. #uiBack, .exam, .ovb) later in document order are treated as not visible.
// Output: table to stdout + video/<id>/lint-layout.txt; --png saves a frame per blocking defect in video/<id>/_lint/. Exit 1 if any BLOQUEANTE.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..', '..');
const args = process.argv.slice(2), id = args[0];
if (!id || id.startsWith('--')) { console.error('usage: node tools/video/lint-layout.mjs <id> [--step 1] [--from s] [--to s] [--scene N] [--no-build] [--png] [--margin 120]'); process.exit(2); }
const opt = (k, d) => { const i = args.indexOf('--' + k); return i > -1 ? args[i + 1] : d; };
const STEP = +opt('step', 1), MARGIN = +opt('margin', 120), STRICT = args.includes('--strict') || args.includes('--cues-only'), CUES_ONLY = args.includes('--cues-only'), ESTEP = +opt('empty-step', 0.25);   // --strict: FUENTE, PLANO-VACIO, DECORADO-SOLAPADO, CUE-TARDE, CARTEL-CORTADO-ENTRANDO (default run unchanged)
const DIR = path.join(ROOT, 'video', id), BUILD = path.join(DIR, '_build');
const beats = JSON.parse(fs.readFileSync(path.join(DIR, 'beats.json'), 'utf8'));
const compo = fs.existsSync(path.join(DIR, 'composition.html')) ? fs.readFileSync(path.join(DIR, 'composition.html'), 'utf8') : '';
const TAIL = +((/<!--\s*TAIL\s+([\d.]+)\s*-->/.exec(compo) || [])[1] || 0), DUR = beats.duration + TAIL;
const sceneStart = (i) => (i ? beats.scenes[i].start - 0.45 : 0);
const sceneAt = (t) => { let k = 0; for (let i = 0; i < beats.scenes.length; i++) if (t >= sceneStart(i) - 1e-6) k = i; return k; };
const T0 = Date.now();

if (!args.includes('--no-build')) {
  const r = spawnSync(process.execPath, [path.join(ROOT, 'tools', 'video', 'render.mjs'), id, '--frames', '0'], { encoding: 'utf8' });
  if (r.status) { console.error((r.stdout || '') + (r.stderr || '')); process.exit(2); }
}
if (!fs.existsSync(path.join(BUILD, 'index.html'))) { console.error('no _build/index.html (run without --no-build)'); process.exit(2); }

// ---- sample instants
const set = new Set(), add = (t) => { if (t >= 0 && t <= DUR - 0.03) set.add(+t.toFixed(3)); };
for (let t = 0; t < DUR; t += STEP) add(t);
if (STRICT) for (let t = 0; t < DUR; t += 1) add(t);   // strict: at least every second
add(DUR - 0.05);
beats.scenes.forEach((s, i) => {
  if (i) for (const d of [-1, -0.6, -0.3, -0.15, 0.15, 0.3, 0.6, 1]) add(sceneStart(i) + d);
  s.sentences.forEach((q) => add(q.start + 1.0));   // at rest after each entrance
});
let times = [...set].sort((a, b) => a - b);
const from = opt('from'), to = opt('to'), sc = opt('scene');
if (from != null) times = times.filter((t) => t >= +from);
if (to != null) times = times.filter((t) => t <= +to);
if (sc != null) times = times.filter((t) => sceneAt(t) === +sc);

// ---- in-page analysis (one evaluate per instant)
function snap(O) {
  const FW = 1920, FH = 1080, M = O.margin, FA = FW * FH;
  const stage = document.getElementById('stage') || document.body;
  const FR = { l: 0, t: 0, r: FW, b: FH }, ZERO = { l: 0, t: 0, r: 0, b: 0 };
  const I = (a, b) => { if (!a || !b) return null; const l = Math.max(a.l, b.l), t = Math.max(a.t, b.t), r = Math.min(a.r, b.r), bt = Math.min(a.b, b.b); return r > l && bt > t ? { l, t, r, b: bt } : null; };
  const CI = (a, b) => (!a ? b : !b ? a : I(a, b) || ZERO);
  const A = (r) => (r ? (r.r - r.l) * (r.b - r.t) : 0);
  const R = (rc) => ({ l: rc.left, t: rc.top, r: rc.right, b: rc.bottom });
  const U = (a, b) => (!a ? b : { l: Math.min(a.l, b.l), t: Math.min(a.t, b.t), r: Math.max(a.r, b.r), b: Math.max(a.b, b.b) });
  const IGN_ID = new Set(['cur', 'clickRing', 'vign', 'icLib']);
  const LABEL = '.cp,.tag,.pill,.sb,.lab,.chip,.chk,.capi,.xc,.btn,.kin small';
  const CONT = '.uw,.pnl,.rc,.rcard,.card,.rm,.tile,[data-lint="card"]';
  const colA = (c) => { const m = /rgba?\(([^)]+)\)/.exec(c); if (!m) return 0; const p = m[1].split(',').map(parseFloat); return p.length > 3 ? p[3] : 1; };
  const txt = (s) => s.replace(/\s+/g, ' ').trim();
  const ss = (e) => { if (e.id) return '#' + e.id; const c = [...e.classList].slice(0, 2).join('.'), s = e.tagName.toLowerCase() + (c ? '.' + c : ''); for (let a = e.parentElement, n = 0; a && a !== stage && n < 4; a = a.parentElement, n++) if (a.id) return '#' + a.id + ' ' + s; return s; };

  // painted extent of an svg (its drawing, not the padded viewport box)
  const svgBox = (e) => {   // union of the rects of its visible painted children (null if nothing visible)
    let u = null;
    for (const q of e.querySelectorAll('path,rect,circle,ellipse,line,polyline,polygon,text,image')) {
      const d = D.get(q); if (!d || d.skip || !d.vis || d.op <= 0.3) continue;
      const r = q.getBoundingClientRect(); if (r.width > 0 && r.height > 0) u = U(u, R(r));
    }
    return u;
  };
  const D = new Map(), els = [...stage.querySelectorAll('*')];
  const root = { op: 1, clChild: null, ign: false, skip: false };
  for (const e of els) {
    const P = e.parentElement === stage ? root : D.get(e.parentElement);
    const cs = getComputedStyle(e);
    const own = { cs, rect: null, op: 0, clChild: null, ign: false, skip: false };
    own.ign = P.ign || IGN_ID.has(e.id) || e.getAttribute('data-lint') === 'ignore' || e.classList.contains('lint-ignore');
    own.cl = P.clChild;
    if (cs.display === 'none' || P.skip) { own.skip = true; D.set(e, own); continue; }
    own.op = P.op * parseFloat(cs.opacity);
    own.vis = cs.visibility === 'visible';
    own.rect = R(e.getBoundingClientRect());
    own.svgIn = (P.svgIn || e.tagName.toLowerCase() === 'svg') && e.tagName.toLowerCase() !== 'svg';
    const clips = cs.overflowX !== 'visible' || cs.overflowY !== 'visible';
    own.clChild = clips ? CI(P.clChild, own.rect) : P.clChild;
    own.bgA = colA(cs.backgroundColor);
    D.set(e, own);
  }
  // veils: full-screen near-opaque boxes; whatever precedes them in document order is covered
  const veils = [];
  for (const e of els) {
    const d = D.get(e); if (d.skip || !d.vis || d.svgIn) continue;
    if (d.bgA > 0.5 && A(I(d.rect, FR)) >= 0.9 * FA) { const s = Math.min(1, d.op * d.bgA); if (s > 0.02) veils.push({ e, s }); }
  }
  const occl = [];   // opaque non-label cards: cover earlier elements lying (>= 80 %) inside them
  for (const e of els) {
    const d = D.get(e); if (d.skip || d.svgIn || !d.vis || d.ign) continue;
    if (d.bgA >= 0.95 && d.op >= 0.95 && A(d.rect) >= 60000 && A(I(d.rect, FR)) < 0.9 * FA && !e.matches(LABEL)) occl.push({ e, r: d.rect });
  }
  const eff = (e) => {
    const d = D.get(e); if (d.skip || !d.vis) return 0;
    let m = d.op;
    const er = d.rect;
    if (!(parseInt(d.cs.zIndex) > 0)) for (const o of occl) if (o.e !== e && !o.e.contains(e) && !e.contains(o.e) && (e.compareDocumentPosition(o.e) & Node.DOCUMENT_POSITION_FOLLOWING) && er && A(er) > 0 && A(I(er, o.r)) >= 0.8 * A(er)) return 0;
    for (const v of veils) if (v.e !== e && !v.e.contains(e) && !e.contains(v.e) && (e.compareDocumentPosition(v.e) & Node.DOCUMENT_POSITION_FOLLOWING)) m *= 1 - v.s;
    return m;
  };

  const effV = (e) => { const d = D.get(e); if (d.skip || !d.vis) return 0; let m = d.op; for (const v of veils) if (v.e !== e && !v.e.contains(e) && !e.contains(v.e) && (e.compareDocumentPosition(v.e) & Node.DOCUMENT_POSITION_FOLLOWING)) m *= 1 - v.s; return m; };

  // candidates
  const C = new Map();   // el -> {el, kind, r0 (rect), tr (text rect), text, label}
  const TX = [];   // every element with own text: {e, tr, rl (line rects), t}
  const put = (el, o) => { const c = C.get(el) || { el, kind: o.kind }; Object.assign(c, o); C.set(el, c); return c; };
  for (const e of els) {
    const d = D.get(e); if (d.skip || d.ign || d.svgIn) continue;
    const tag = e.tagName.toLowerCase();
    if (tag === 'svg' && ![...e.querySelectorAll('*')].some((q) => { const f = getComputedStyle(q).fill; return f && f !== 'none' && f !== 'rgba(0, 0, 0, 0)' && !/^(path|line|polyline)$/.test(q.tagName.toLowerCase()) ? true : (/^(path|polyline)$/.test(q.tagName.toLowerCase()) && f !== 'none' && q.getAttribute('fill') !== 'none' && q.getAttribute('stroke') == null); })) continue;   // stroke-only line art (cables) is decor
    if (tag === 'svg' || tag === 'img') { if (A(d.rect) >= 400 && (tag !== 'svg' || svgBox(e))) put(e, { kind: 'img', r0: tag === 'svg' ? svgBox(e) : d.rect, text: tag === 'img' ? (e.alt || 'img') : '' }); continue; }
    if (tag === 'script' || tag === 'style' || tag === 'audio') continue;
    let tr = null, t = '', rl = [];
    for (const n of e.childNodes) if (n.nodeType === 3 && n.nodeValue.trim()) {
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const q of rg.getClientRects()) if (q.width > 0 && q.height > 0) { tr = U(tr, R(q)); rl.push(R(q)); }
      t += ' ' + n.nodeValue;
    }
    if (tr) TX.push({ e, tr, rl, t: txt(t).slice(0, 40) });
    const lc = e.closest(LABEL);
    if (tr && lc && stage.contains(lc) && !D.get(lc).skip && !D.get(lc).ign) {
      const o = C.get(lc) || put(lc, { kind: 'unit', label: true, r0: D.get(lc).rect, tr: null, text: '' });
      o.tr = U(o.tr, tr);
    } else if (tr) {
      put(e, { kind: 'unit', label: false, r0: tr, tr, rl, text: txt(t) });
    }
    const cl = e.classList;
    if (!(cl.contains('wall') || cl.contains('floor')) && A(d.rect) >= 3000 && (d.bgA > 0.3 || ['Top', 'Left', 'Right', 'Bottom'].some((s) => parseFloat(d.cs['border' + s + 'Width']) > 0 && d.cs['border' + s + 'Style'] !== 'none' && colA(d.cs['border' + s + 'Color']) > 0.3)) && !C.has(e))
      put(e, { kind: 'box', r0: d.rect, text: '' });
  }
  for (const c of C.values()) {
    if (c.kind === 'unit' && c.label) c.text = txt(c.el.textContent);
    c.text = c.text.slice(0, 40);
    c.d = D.get(c.el); c.vis = eff(c.el); c.sel = ss(c.el);
    c.cl = c.d.cl; c.vr = CI(c.r0, c.cl);
    if (c.kind === 'unit' && !c.label) c.clSelf = CI(c.cl, (c.d.cs.overflowX !== 'visible' || c.d.cs.overflowY !== 'visible') ? c.d.rect : null);
    else if (c.kind === 'unit') c.clSelf = c.cl;
  }
  const tap = [];
  for (const c of C.values()) {   // text/labels mostly covered by an opaque card drawn later (children of the card excluded)
    if (c.kind !== 'unit' || !c.text || c.d.ign || effV(c.el) <= 0.5 || parseInt(c.d.cs.zIndex) > 0) continue;
    const tr = I(c.tr || c.r0, FR); if (!tr || A(tr) < 200) continue;
    let best = 0, who = '';
    for (const o of occl) if (o.e !== c.el && !o.e.contains(c.el) && !c.el.contains(o.e) && (c.el.compareDocumentPosition(o.e) & Node.DOCUMENT_POSITION_FOLLOWING)) { const f = A(I(tr, o.r)) / A(tr); if (f > best) { best = f; who = ss(o.e); } }
    if (best > 0.4) tap.push({ ty: 'TAPADO', sel: c.sel + ' <- ' + who, text: c.text, d: Math.round(best * 100) + ' % cubierto' });
  }
  // text partly hidden by something painted above it (real paint order), and text spilling out of its own chip/card
  const edge = (d) => d.bgA > 0.3 || ['Top', 'Left', 'Right', 'Bottom'].some((s) => parseFloat(d.cs['border' + s + 'Width']) > 0 && d.cs['border' + s + 'Style'] !== 'none' && colA(d.cs['border' + s + 'Color']) > 0.3);
  const solid = (h, d) => d.op * d.bgA >= 0.6 || h.tagName.toLowerCase() === 'img' || (d.svgIn && d.op >= 0.6 && !/^(none|rgba(0, 0, 0, 0))$/.test(d.cs.fill) && parseFloat(d.cs.fillOpacity) >= 0.6);
  for (const x of TX) {
    const d = D.get(x.e); if (d.ign || !x.t || effV(x.e) <= 0.5 || !I(x.tr, FR)) continue;
    let n = 0, cov = 0, run = 0, maxRun = 0, who = null, veiled = false;
    for (const r of x.rl) {
      const y = (r.t + r.b) / 2; if (y < 0 || y >= FH) continue;
      for (let px = r.l + 4; px <= r.r - 4 && !veiled; px += 8) {
        if (px < 0 || px >= FW) continue;
        let c = null;
        for (const h of document.elementsFromPoint(px, y)) {
          if (h === x.e || x.e.contains(h) || h.contains(x.e)) break;
          const hd = D.get(h); if (!hd) break;
          if (hd.skip || hd.ign || !hd.vis || hd.op < 0.5 || !solid(h, hd)) continue;
          if (A(I(hd.rect, FR)) >= 0.9 * FA) veiled = true; else c = h;
          break;
        }
        n++; if (c) { cov++; run++; who = c; if (run > maxRun) maxRun = run; } else run = 0;
      }
    }
    if (!veiled && n >= 4 && maxRun >= 2 && cov / n >= 0.08 && cov / n <= 0.9) tap.push({ ty: 'TEXTO-TAPADO', sel: ss(x.e) + ' <- ' + ss(who), text: x.t, d: Math.round(cov / n * 100) + ' % del texto tapado' });
    let a = x.e; while (a && a !== stage && !edge(D.get(a))) a = a.parentElement;
    if (!a || a === stage) continue;
    const br = D.get(a).rect; if (D.get(a).ign || A(br) >= 0.5 * FA || !I(x.tr, br)) continue;
    const o = Math.max(br.l - x.tr.l, x.tr.r - br.r, br.t - x.tr.t, x.tr.b - br.b), f = 1 - A(I(x.tr, br)) / A(x.tr);
    if (o > 8 && f >= 0.1) tap.push({ ty: 'DESBORDE', sel: ss(x.e) + ' en ' + ss(a), text: x.t, d: 'el texto se sale de su caja ' + Math.round(o) + ' px (' + Math.round(f * 100) + ' %)' });
  }
  const TXS = new Set(TX.map((x) => x.e));
  const cands = [...C.values()].filter((c) => c.vr && A(c.vr) > 0 && c.vis > 0.02);
  const hasAnc = (list, c) => list.some((o) => o !== c && o.el.contains(c.el));
  const out = { bor: [], sol: [], vac: [], dob: [] };

  // a) borders / clipping
  const bor = [];
  for (const c of cands) {
    if (c.vis <= 0.5 || A(c.r0) >= 0.9 * FA || c.kind === 'box') continue;   // boxes are containers: their text/svg children are checked instead
    const vr = c.vr;
    if (!I(vr, FR) || A(vr) < 100) continue;
    if (c.kind !== 'unit' && !c.el.textContent.trim() && (vr.r - vr.l) / Math.max(1, vr.b - vr.t) >= 6) continue;   // long thin decor (plank, shelf) may run off-frame
    if (c.kind === 'box' && c.el.matches('#world,#uiL,#exams,#ovL,.exam,.ovb')) continue;
    const sides = [], tx = c.kind === 'unit' ? 3 : 8, ty = c.kind === 'unit' ? Math.max(3, 0.12 * (vr.b - vr.t)) : 8;
    if (vr.l < -tx) sides.push('izq ' + Math.round(-vr.l)); if (vr.t < -ty) sides.push('arr ' + Math.round(-vr.t));
    if (vr.r > FW + tx) sides.push('der ' + Math.round(vr.r - FW)); if (vr.b > FH + ty) sides.push('abj ' + Math.round(vr.b - FH));
    let k = null, dd = '';
    const outF = 1 - A(I(vr, FR)) / A(vr);
    if (sides.length && c.kind !== 'unit' && outF < 0.05) sides.length = 0;   // drawings (people, robots): cut when >= 5 % outside
    if (sides.length) { k = 'BORDE-CORTADO'; dd = 'fuera del encuadre: ' + sides.join(', ') + ' px'; }
    else if (c.kind === 'unit' && c.tr && c.clSelf) {
      const tr = c.tr, cl = c.clSelf;
      if (I(tr, cl) && (tr.l < cl.l - 8 || tr.r > cl.r + 8 || tr.t < cl.t - 8 || tr.b > cl.b + 8)) {
        const f = Math.round((1 - A(I(tr, cl)) / A(tr)) * 100);
        if (f >= 5 && f < 90) { k = 'BORDE-CORTADO'; dd = 'texto recortado por overflow (' + f + ' % fuera)'; }
      }
    }
    if (!k) {
      const m = Math.min(vr.l, vr.t, FW - vr.r, FH - vr.b);
      if (m < 48) { k = 'BORDE-PEGADO'; dd = 'margen ' + Math.round(m) + ' px (<48)'; }
      else if (m < M - 1) { k = 'BORDE-MARGEN'; dd = 'margen ' + Math.round(m) + ' px (<' + M + ')'; }
    }
    if (k) bor.push({ c, k, dd });
  }
  for (const b of bor) if (!bor.some((o) => o !== b && o.k === b.k && o.c.el.contains(b.c.el))) out.bor.push({ ty: b.k, sel: b.c.sel, text: b.c.text, d: b.dd });

  // b) overlapping labels
  const labs = cands.filter((c) => c.kind === 'unit' && c.vis > 0.5 && c.text.length > 0 && c.text.length <= 80 && I(c.vr, FR) && A(c.vr) > 200);
  const lrs = (c) => (c.label || !c.rl ? [c.vr] : c.rl.map((r) => CI(r, c.clSelf))).map((r) => I(r, FR)).filter(Boolean);
  const ovl = (a, b) => { const ra = lrs(a), rb = lrs(b); let x = 0; for (const p of ra) for (const q of rb) x += A(I(p, q)); const m = Math.min(ra.reduce((s, r) => s + A(r), 0), rb.reduce((s, r) => s + A(r), 0)); return m > 0 ? x / m : 0; };
  for (let i = 0; i < labs.length; i++) for (let j = i + 1; j < labs.length; j++) {
    const a = labs[i], b = labs[j];
    if (a.el.contains(b.el) || b.el.contains(a.el) || (a.text && a.text === b.text)) continue;   // same text stacked = deliberate pile
    const f = ovl(a, b);
    if (f > ((a.label || b.label) ? 0.1 : 0.3)) out.sol.push({ ty: 'SOLAPE', sel: a.sel + ' + ' + b.sel, text: '"' + a.text + '" x "' + b.text + '"', d: Math.round(f * 100) + ' % del menor' });
  }

  // c) empty containers
  const items = cands.filter((c) => (c.kind === 'unit' || c.kind === 'img') && c.vis > 0.3);
  for (const c of cands) {
    if (c.kind !== 'box' || c.vis < 0.9) continue;
    const known = c.el.matches(CONT);   // any other opaque card counts only if it holds text (boxes without text are decor: desks, shelves)
    if (!known && !(c.d.bgA >= 0.9 && A(c.r0) <= 0.5 * FA)) continue;
    const reg = I(c.r0, FR); if (!reg || A(reg) <= 80000) continue;
    const inside = items.filter((o) => c.el.contains(o.el));
    const texts = inside.filter((o) => o.kind === 'unit' && o.text.length);
    if (!known && !texts.length) continue;
    const gw = (reg.r - reg.l) / 6, gh = (reg.b - reg.t) / 4, occ = Array.from({ length: 4 }, () => Array(6).fill(0));
    if (!known) {   // generic card: a cell is occupied when anything is painted over the card there (real paint order)
      const top = (x, y) => { for (const h of document.elementsFromPoint(x, y)) { const hd = D.get(h); if (!hd) return null; if (hd.skip || hd.ign || !hd.vis || hd.op < 0.3) continue; if (h === c.el || edge(hd) || hd.svgIn || TXS.has(h) || h.tagName.toLowerCase() === 'img') return h; } return null; };
      for (let r = 0; r < 4; r++) for (let q = 0; q < 6; q++) for (const [fx, fy] of [[0.5, 0.5], [0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]]) { const h = top(reg.l + (q + fx) * gw, reg.t + (r + fy) * gh); if (h && h !== c.el) { occ[r][q] = 1; break; } }
    } else for (const o of inside) {
      const rr = I(o.kind === 'unit' && o.tr ? o.tr : o.vr, reg); if (!rr) continue;
      for (let r = 0; r < 4; r++) for (let q = 0; q < 6; q++) if (A(I(rr, { l: reg.l + q * gw, t: reg.t + r * gh, r: reg.l + (q + 1) * gw, b: reg.t + (r + 1) * gh })) > 400) occ[r][q] = 1;
    }
    const n = occ.flat().reduce((s, v) => s + v, 0), sum = (r0, r1, c0, c1) => { let s = 0; for (let r = r0; r < r1; r++) for (let q = c0; q < c1; q++) s += occ[r][q]; return s; };
    let w = '';
    if (!inside.length) w = 'sin contenido visible';
    else if (!texts.length && n / 24 < 0.25) w = 'sin texto y casi vacio';
    else if (n / 24 < 0.15) w = 'casi vacio (' + n + '/24 celdas)';
    else if (!known && reg.b - reg.t >= 240 && reg.r - reg.l >= 240 && !c.el.closest('.uw') && sum(2, 4, 0, 6) === 0) w = 'mitad inferior vacia';
    if (w) out.vac.push({ ty: 'VACIO', sel: c.sel, text: c.text || '(sin texto)', d: w });
  }
  // c2) whole frame
  const fc = cands.filter((c) => c.vis > 0.15 && (c.kind !== 'box' || !c.el.matches('#world,#uiL,#exams,#ovL,.exam,.ovb,.ov')));
  const fg = Array.from({ length: 3 }, () => Array(4).fill(0));
  for (const c of fc) {
    if (A(c.r0) >= 0.9 * FA || A(c.vr) < 400) continue;
    const rr = I(c.kind === 'unit' && c.tr ? c.tr : c.vr, FR); if (!rr) continue;
    for (let r = 0; r < 3; r++) for (let q = 0; q < 4; q++) if (A(I(rr, { l: q * 480, t: r * 360, r: (q + 1) * 480, b: (r + 1) * 360 })) > 3000) fg[r][q] = 1;
  }
  const fn = fg.flat().reduce((s, v) => s + v, 0), low = fg[1].reduce((s, v) => s + v, 0) + fg[2].reduce((s, v) => s + v, 0);
  const inExam = els.some((e) => e.matches('.exam') && eff(e) > 0.5);   // exam room reveals its options in stages
  if (inExam || veils.some((v) => v.s > 0.5)) { /* exam room / title or closing card over a veil: staged reveal by design */ } else if (fn <= 3) out.vac.push({ ty: 'VACIO', sel: '(encuadre)', text: '', d: 'contenido en ' + fn + '/12 celdas' });
  else if (low <= 1) out.vac.push({ ty: 'VACIO', sel: '(encuadre)', text: '', d: 'mitad inferior vacia (' + low + '/8 celdas)' });

  // d) double exposure
  const layer = (el) => {
    const sc = el.closest('[data-scene]'); if (sc) return { s: sc.getAttribute('data-scene'), k: 's' + sc.getAttribute('data-scene') };
    let a = el; while (a.parentElement && a.parentElement !== stage) a = a.parentElement;
    if (['uiL', 'ovL', 'exams'].includes(a.id)) { let b = el; while (b.parentElement && b.parentElement !== a) b = b.parentElement; return { s: null, k: b.id || b.className || a.id }; }
    return { s: null, k: a.id || a.className || 'root' };
  };
  const tx = cands.filter((c) => c.kind === 'unit' && c.vis > 0.25 && c.text.length && I(c.vr, FR)).map((c) => Object.assign(c, { ly: layer(c.el) }));
  const scs = [...new Set(tx.filter((c) => c.ly.s != null).map((c) => c.ly.s))];
  if (scs.length >= 2) out.dob.push({ ty: 'DOBLE-EXPOSICION', sel: 'escenas ' + scs.join('+'), text: tx.filter((c) => c.ly.s != null).slice(0, 3).map((c) => '"' + c.text + '"').join(' / '), d: 'texto de varias escenas a la vez' });
  for (let i = 0; i < tx.length; i++) for (let j = i + 1; j < tx.length; j++) {
    const a = tx[i], b = tx[j]; if (a.ly.k === b.ly.k || a.el.contains(b.el) || b.el.contains(a.el)) continue;
    const f = ovl(a, b);
    if (f > 0.3) out.dob.push({ ty: 'DOBLE-EXPOSICION', sel: a.ly.k + ' + ' + b.ly.k, text: '"' + a.text + '" x "' + b.text + '"', d: Math.round(f * 100) + ' % solape, vis ' + a.vis.toFixed(2) + '/' + b.vis.toFixed(2) });
  }
  return [...out.bor, ...out.sol, ...out.vac, ...out.dob, ...tap];
}

// ---- --strict checks (in-page library, injected only with --strict)
function STRICT_LIB() {
  const FW = 1920, FH = 1080, FA = FW * FH, stage = document.getElementById('stage') || document.body;
  const FR = { l: 0, t: 0, r: FW, b: FH }, ZERO = { l: 0, t: 0, r: 0, b: 0 };
  const I = (a, b) => { if (!a || !b) return null; const l = Math.max(a.l, b.l), t = Math.max(a.t, b.t), r = Math.min(a.r, b.r), bt = Math.min(a.b, b.b); return r > l && bt > t ? { l, t, r, b: bt } : null; };
  const CI = (a, b) => (!a ? b : !b ? a : I(a, b) || ZERO);
  const A = (r) => (r ? (r.r - r.l) * (r.b - r.t) : 0);
  const R = (rc) => ({ l: rc.left, t: rc.top, r: rc.right, b: rc.bottom });
  const colA = (c) => { const m = /rgba?\(([^)]+)\)/.exec(c); if (!m) return 0; const p = m[1].split(',').map(parseFloat); return p.length > 3 ? p[3] : 1; };
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const IGN_ID = new Set(['cur', 'clickRing', 'vign', 'icLib']);
  const SKIPTAG = /^(script|style|title|desc|defs|audio|noscript|metadata|lineargradient|radialgradient|clippath|mask|pattern|filter|symbol)$/i;
  const reg = [], regMap = new WeakMap();
  const ss = (e) => { const t = e.tagName.toLowerCase(); if (e.id) return '#' + e.id; const c = [...e.classList].slice(0, 2).join('.'); let n = 0; if (e.parentElement) n = [...e.parentElement.children].indexOf(e); const s = t + (c ? '.' + c : '') + ':' + n; for (let a = e.parentElement, k = 0; a && a !== stage && k < 3; a = a.parentElement, k++) if (a.id) return '#' + a.id + ' ' + s; return s; };
  const scl = (tf) => { if (!tf || tf === 'none') return 1; try { const m = new DOMMatrix(tf); return Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)) || 1; } catch (er) { return 1; } };
  function ctx() {
    const els = [...stage.querySelectorAll('*')], D = new Map(), root = { op: 1, cl: null, ign: false, skip: false, sc: 1 };
    for (const e of els) {
      const P = e.parentElement === stage ? root : D.get(e.parentElement) || root, cs = getComputedStyle(e);
      const o = { cs, skip: false, op: 0, vis: false, rect: null, cl: P.cl, bgA: 0, sc: P.sc, ign: P.ign || IGN_ID.has(e.id) || e.getAttribute('data-lint') === 'ignore' || e.classList.contains('lint-ignore') };
      if (cs.display === 'none' || P.skip || SKIPTAG.test(e.tagName)) { o.skip = true; D.set(e, o); continue; }
      o.op = P.op * parseFloat(cs.opacity); o.vis = cs.visibility === 'visible'; o.rect = R(e.getBoundingClientRect()); o.bgA = colA(cs.backgroundColor);
      const tg = e.tagName.toLowerCase();
      if (!(e instanceof SVGElement)) o.sc = P.sc * scl(cs.transform);
      else if (tg === 'text' || tg === 'tspan') { try { const bb = e.getBBox(), w = o.rect.r - o.rect.l; o.sc = bb.width > 0 && w > 0 ? w / bb.width : 1; } catch (er) { o.sc = 1; } }
      else o.sc = P.sc;
      if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') o.cl = CI(P.cl, o.rect);
      D.set(e, o);
    }
    const veils = [];
    for (const e of els) { const d = D.get(e); if (d.skip || !d.vis || e instanceof SVGElement) continue; if (d.bgA > 0.5 && A(I(d.rect, FR)) >= 0.9 * FA) { const s = Math.min(1, d.op * d.bgA); if (s > 0.02) veils.push({ e, s }); } }
    const eff = (e) => { const d = D.get(e); if (!d || d.skip || !d.vis) return 0; let m = d.op; for (const v of veils) if (v.e !== e && !v.e.contains(e) && !e.contains(v.e) && (e.compareDocumentPosition(v.e) & Node.DOCUMENT_POSITION_FOLLOWING)) m *= 1 - v.s; return m; };
    return { els, D, veils, eff };
  }
  function textInfo(c, e) {
    const d = c.D.get(e); if (!d || d.skip || d.ign) return null;
    let t = ''; const rl = [];
    for (const n of e.childNodes) if (n.nodeType === 3 && n.nodeValue.trim()) {
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const q of rg.getClientRects()) if (q.width > 0 && q.height > 0) rl.push(R(q));
      t += ' ' + n.nodeValue;
    }
    t = norm(t); if (!t || !rl.length || !/[\p{L}\p{N}]/u.test(t)) return null;
    const lines = rl.map((r) => CI(r, d.cl)).filter((r) => A(r) > 0), fv = lines.filter((r) => A(I(r, FR)) > 0);
    let tot = 0, ins = 0; for (const r of lines) { tot += A(r); ins += A(I(r, FR)); }
    return { e, t, lines, fv, eff: c.eff(e), fs: parseFloat(d.cs.fontSize) || 0, sc: d.sc, svg: e instanceof SVGElement, inF: tot > 0 ? ins / tot : 0 };
  }
  const ridx = (e) => { if (!regMap.has(e)) { regMap.set(e, reg.length); reg.push(e); } return regMap.get(e); };
  function emptyFrac(c, tx) {
    const GX = 24, GY = 14, cw = FW / GX, ch = FH / GY, occ = new Uint8Array(GX * GY);
    const mark = (r) => { const q = I(r, FR); if (!q || A(q) < 200) return; for (let y = Math.floor(q.t / ch); y <= Math.min(GY - 1, Math.floor((q.b - 0.01) / ch)); y++) for (let x = Math.floor(q.l / cw); x <= Math.min(GX - 1, Math.floor((q.r - 0.01) / cw)); x++) if (A(I(q, { l: x * cw, t: y * ch, r: (x + 1) * cw, b: (y + 1) * ch })) > 200) occ[y * GX + x] = 1; };
    for (const x of tx) if (x.eff > 0.15) for (const r of x.fv) mark(r);
    for (const e of c.els) {
      const d = c.D.get(e); if (d.skip || d.ign || !d.vis) continue;
      const tg = e.tagName.toLowerCase();
      if (c.eff(e) <= 0.15 || !d.rect || A(d.rect) <= 0 || A(d.rect) >= 0.9 * FA) continue;
      const rr = CI(d.rect, d.cl);
      if (e instanceof SVGElement) {
        if (!/^(path|rect|circle|ellipse|line|polyline|polygon|image)$/.test(tg)) continue;
        const f = d.cs.fill, st = d.cs.stroke; if ((f === 'none' || colA(f) < 0.2) && (st === 'none' || colA(st) < 0.2) && tg !== 'image') continue;
        if (e.closest('defs,clipPath,mask,pattern')) continue;
        mark(rr);
      } else if (tg === 'img') mark(rr);
      else if (!(e.classList.contains('wall') || e.classList.contains('floor')) && !(A(rr) >= 0.12 * FA && e.matches('.uw,.pnl,.rc,.rcard,.card,.rm,.tile,[data-lint="card"]')) && (d.bgA > 0.3 || ['Top', 'Left', 'Right', 'Bottom'].some((sd) => parseFloat(d.cs['border' + sd + 'Width']) > 0 && d.cs['border' + sd + 'Style'] !== 'none' && colA(d.cs['border' + sd + 'Color']) > 0.3))) mark(rr);
    }
    let n = 0; for (const v of occ) n += v;
    let n2 = 0; for (let y = 0; y < GY; y += 2) for (let x = 0; x < GX; x += 2) if (occ[y * GX + x] || occ[y * GX + x + 1] || occ[(y + 1) * GX + x] || occ[(y + 1) * GX + x + 1]) n2++;   // coarse 12x7 grid
    return [1 - n / (GX * GY), 1 - n2 / ((GX / 2) * (GY / 2))];
  }
  window.LS = {
    visibleAny(ids) { const c = ctx(); return ids.some((i) => { const x = textInfo(c, reg[i]); return !!x && x.eff > 0.5 && x.inF >= 0.5; }); },
    texts() { return reg.map((e, i) => [i, norm(e.textContent || '')]); },
    empty() {
      const c = ctx(), tx = [];
      for (const e of c.els) { const x = textInfo(c, e); if (x) tx.push(x); }
      if (c.els.some((e) => e.matches('.exam') && c.eff(e) > 0.5)) return [0, 0, 0];   // exam silences: the exam panel is already full
      const [f24, f12] = emptyFrac(c, tx);
      return [f24, c.els.some((e) => e.matches('.uw') && c.eff(e) > 0.5) ? 1 : 0, f12];
    },
    snap() {
      const c = ctx(), rows = [], vis = [], tx = [];
      for (const e of c.els) { const x = textInfo(c, e); if (x) tx.push(x); }
      // a) effective font size, e) text cut by the frame, cue candidates
      for (const x of tx) {
        if (x.eff <= 0.05 || !x.fv.length) continue;
        const size = x.fs * x.sc, sel = ss(x.e), text = x.t.slice(0, 40);
        if (x.fs > 0 && size < 32 && x.eff > 0.3 && (x.svg || x.fs < 32)) rows.push({ ty: 'FUENTE', sel, text, d: 'texto de ' + size.toFixed(1) + ' px en pantalla (<32); base ' + x.fs.toFixed(1) + ' px', v: size });
        let worst = 0; for (const r of x.fv) worst = Math.max(worst, 1 - A(I(r, FR)) / A(r));
        if (worst > 0.08) rows.push({ ty: 'CARTEL-CORTADO-ENTRANDO', sel, text, d: 'texto cortado por el encuadre (' + Math.round(worst * 100) + ' % fuera), opacidad ' + x.eff.toFixed(2), v: worst });
        if (x.eff > 0.5 && x.inF >= 0.5) { vis.push([ridx(x.e), x.t]); }
      }
      for (const x of tx) ridx(x.e);
      // c) overlapping decor of the same kind (same class, neither contains the other)
      const groups = new Map();
      for (const e of c.els) {
        const d = c.D.get(e); if (d.skip || d.ign || !d.vis || !d.rect) continue;
        const k = e.getAttribute('class'); if (!k || /lint-ignore|\bic\b/.test(k)) continue;
        const rr = I(CI(d.rect, d.cl), FR); if (!rr || A(d.rect) < 6000 || A(d.rect) >= 0.5 * FA || c.eff(e) < 0.3) continue;
        if (!groups.has(k)) groups.set(k, []);
        groups.get(k).push({ e, vr: rr, ar: A(d.rect), tg: e.tagName });
      }
      const has = (p, o) => p.l <= o.l + 2 && p.t <= o.t + 2 && p.r >= o.r - 2 && p.b >= o.b - 2;
      for (const [k, g] of groups) {
        if (g.length < 2 || g.length > 80) continue;
        for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) {
          const a = g[i], b = g[j]; if (a.e.contains(b.e) || b.e.contains(a.e)) continue;
          if (a.tg !== b.tg || a.ar / b.ar > 1.67 || a.ar / b.ar < 0.6) continue;   // same-looking blocks only (generic classes like .w mix everything)
          const q = I(a.vr, b.vr); if (!q || has(a.vr, b.vr) || has(b.vr, a.vr)) continue;
          const f = A(q) / Math.min(A(a.vr), A(b.vr));
          if (f > 0.15) rows.push({ ty: 'DECORADO-SOLAPADO', sel: ss(a.e) + ' + ' + ss(b.e), text: '(' + k.split(' ')[0] + ')', d: 'mismo tipo de decorado, solape ' + Math.round(f * 100) + ' % del menor', v: f });
        }
      }
      return { rows, vis };
    },
  };
}

// ---- run
const { chromium } = await import('playwright');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', (e) => console.log('page error:', e.message));
await p.goto('file:///' + path.join(BUILD, 'index.html').replace(/\\/g, '/'));
await p.waitForFunction(() => !!(window.__timelines && window.__timelines.main), null, { polling: 100 });
await p.addStyleTag({ content: '*{pointer-events:auto!important}' });   // TEXTO-TAPADO hit-tests the real paint order
if (opt('inject-css')) await p.addStyleTag({ content: opt('inject-css') });
if (opt('inject-js')) await p.evaluate((js) => (0, eval)(js), opt('inject-js'));
const seek = async (t) => { await p.evaluate((t) => { window.__timelines.main.seek(t, false); }, t); await p.waitForTimeout(60); };
const samples = [];
const ssamples = [];
if (STRICT) await p.evaluate(STRICT_LIB);
for (const t of times) { await seek(t); if (!CUES_ONLY) samples.push(await p.evaluate(snap, { margin: MARGIN })); if (STRICT) ssamples.push(await p.evaluate(() => window.LS.snap())); }
if (CUES_ONLY) samples.push(...times.map(() => []));

// ---- strict aggregation
const strictRows = [], cuesOut = [];
const f1 = (t) => t.toFixed(1);
if (STRICT) {
  const raw = [];
  // FUENTE by BASE size: computed font-size < 32 and the text was never seen >= 32 px on screen (POP/transform animation does not count)
  const fr = new Map();
  ssamples.forEach((o, i) => { for (const d of o.rows) if (d.ty === 'FUENTE') { const k = d.sel + '|' + d.text; if (!fr.has(k)) fr.set(k, { d, idx: [], v: [] }); fr.get(k).idx.push(i); fr.get(k).v.push(d.v); } });
  for (const { d, idx, v } of fr.values()) {
    const t0 = times[idx[0]], t1 = times[idx[idx.length - 1]], mx = Math.max(...v);
    const nVisible = ssamples.reduce((n, o) => n + (o.vis.some(([, t]) => t.slice(0, 40) === d.text) ? 1 : 0), 0);   // samples where it is visible and NOT flagged are >= 32 px
    if (nVisible > idx.length) continue;
    raw.push({ t0, t1, dur: t1 - t0 + STEP, ty: 'FUENTE', sev: 'BLOQ', sel: d.sel, text: d.text, det: d.d.replace(/[\d.]+ px en pantalla/, mx.toFixed(1) + ' px en pantalla'), scene: sceneAt(t0) + 1 });
  }
  const sr = new Map();
  ssamples.forEach((o, i) => { const seen = new Set(); for (const d of o.rows) { if (d.ty === 'FUENTE') continue; const key = d.ty + '|' + d.sel + '|' + d.text; if (seen.has(key)) continue; seen.add(key); if (!sr.has(key)) sr.set(key, { d, idx: [], v: [] }); const g = sr.get(key); g.idx.push(i); g.v.push(d.v); } });
  for (const { d, idx, v } of sr.values()) {
    let s = 0;
    for (let k = 1; k <= idx.length; k++) if (k === idx.length || idx[k] !== idx[k - 1] + 1) {
      const a = idx[s], z = idx[k - 1], t0 = times[a], t1 = times[z], dur = (times[z + 1] ?? t1 + STEP) - t0, vv = v.slice(s, k);
      const m = Math.max(...vv); raw.push({ t0, t1, dur, ty: d.ty, sev: z === a ? 'MENOR' : 'BLOQ', sel: d.sel, text: d.text, det: d.d.replace(/\d+ %/, Math.round(m * 100) + ' %'), scene: sceneAt(t0) + 1 });
      s = k;
    }
  }
  const mg = new Map();
  for (const r of raw) { const k = r.ty + '|' + r.sel + '|' + r.text + '|' + r.scene, m = mg.get(k); if (!m) mg.set(k, r); else { m.t0 = Math.min(m.t0, r.t0); m.t1 = Math.max(m.t1, r.t1); m.dur = Math.max(m.dur, r.dur); if (r.sev === 'BLOQ') m.sev = 'BLOQ'; } }
  strictRows.push(...mg.values());

  // PLANO-VACIO: > 50 % of the frame empty for > 0.5 s, sampled every ESTEP (exam rooms exempt inside LS.empty)
  if (!CUES_ONLY) {
    const ev = [];
    for (let t = 0; t < DUR - 0.03; t += ESTEP) { if ((from != null && t < +from) || (to != null && t > +to)) continue; await seek(t); ev.push([t, await p.evaluate(() => window.LS.empty())]); }
    let s = -1;
    for (let k = 0; k <= ev.length; k++) {
      const bad = k < ev.length && ev[k][1][0] > 0.5;
      if (bad && s < 0) s = k;
      if (!bad && s >= 0) {
        const run = ev.slice(s, k), n = run.length, t0 = run[0][0], t1 = run[n - 1][0], mx = Math.max(...run.map((e) => e[1][0])), win = run.every((e) => e[1][1]);
        // BLOQ only for >= 3 consecutive samples with the coarse 12x7 grid > 50 % empty, or > 70 % of the 24x14 grid with a product-UI window on screen (white by nature); sparse but composed shots are MENOR
        let c65 = 0, m65 = 0; for (const e of run) { c65 = (e[1][1] ? e[1][0] > 0.7 : e[1][2] > 0.5) ? c65 + 1 : 0; m65 = Math.max(m65, c65); }
        const mx12 = Math.max(...run.map((e) => e[1][2]));
        if (n >= 3) strictRows.push({ t0, t1, dur: n * ESTEP, ty: 'PLANO-VACIO', sev: 'BLOQ', sel: '(encuadre)', text: '', det: `${Math.round(mx * 100)} % de celdas sin contenido (24x14), ${Math.round(mx12 * 100)} % en rejilla 12x7, durante ~${(n * ESTEP).toFixed(2)} s (limite 0.5)${win ? '' : ''}`, scene: sceneAt(t0) + 1 });
        s = -1;
      }
    }
  }

  // CARTEL-AUSENTE / CUE-TARDIO: on-screen text found verbatim in exactly one narration sentence vs the voice (word time ~ proportional position)
  const nw = (s) => s.toLowerCase().replace(/['’]s\b/g, '').replace(/[^\p{L}\p{N}\s']/gu, ' ').split(/\s+/).filter(Boolean);
  const sents = [];
  beats.scenes.forEach((sc, si) => sc.sentences.forEach((q) => sents.push({ w: nw(q.text), raw: q.text, start: q.start, end: q.end, scene: si })));
  const hasAt = (w, v) => { for (let i = 0; i + v.length <= w.length; i++) if (v.every((x, j) => w[i + j] === x)) return i; return -1; };
  const groups = new Map();   // normalised text -> reg ids
  const addText = (i, t) => { const k = nw(t).join(' '); if (!k) return; if (!groups.has(k)) groups.set(k, new Set()); groups.get(k).add(i); };
  for (const [i, t] of await p.evaluate(() => window.LS.texts())) addText(i, t.slice(0, 80));
  ssamples.forEach((o) => o.vis.forEach(([i, t]) => addText(i, t)));
  const STOP = new Set(['the', 'and', 'for', 'you', 'not', 'with', 'this', 'that', 'are', 'was', 'can', 'off', 'on', 'yes', 'no', 'ok']);
  const cue = (ty, sev, at, det, q, label) => { strictRows.push({ t0: at, t1: at, dur: 0, ty, sev, sel: '"' + label.slice(0, 40) + '"', text: '', det, scene: q.scene + 1 }); };
  const tm = (q, i, n) => q.start + (q.end - q.start) * (n ? i / n : 0);
  for (const [label, ids] of groups) {
    const w = label.split(' '); if (w.length < 2 && (label.length < 5 || STOP.has(label))) continue; if (label.length < 4) continue;
    const m = sents.map((q) => ({ q, i: hasAt(q.w, w) })).filter((x) => x.i >= 0); if (!m.length) continue;
    for (const { q, i: wi } of m) {
    if ((from != null && q.start < +from) || (to != null && q.end > +to)) continue;   // --from/--to: only sentences inside the window
    const wt = tm(q, wi, q.w.length), idl = [...ids], ser = ssamples.map((o) => o.vis.some(([j]) => ids.has(j)));
    const R = { label, scene: q.scene + 1, sentStart: +q.start.toFixed(2), sentEnd: +q.end.toFixed(2), wordT: +wt.toFixed(2), appears: null, delta: null, status: 'ok' };
    await seek(wt); const atWord = await p.evaluate((n) => window.LS.visibleAny(n), idl);
    const refine = async (i) => { let lo = i ? times[i - 1] : times[0], hi = times[i]; if (i) for (let k = 0; k < 7; k++) { const mid = (lo + hi) / 2; await seek(mid); if (await p.evaluate((n) => window.LS.visibleAny(n), idl)) hi = mid; else lo = mid; } return hi; };
    if (atWord) {
      let at = null;   // latest rising edge before the word
      for (let i = 0; i < times.length; i++) if (ser[i] && (i === 0 || !ser[i - 1]) && times[i] <= wt + 0.01) at = i;
      if (at != null) { const hi = await refine(at); R.appears = +hi.toFixed(2); R.delta = +(hi - wt).toFixed(2); const dl = hi - q.start; if (m.length === 1 && dl < -0.4 && dl >= -6) cue('CUE-TARDIO', 'MENOR', hi, `aparece ${(-dl).toFixed(1)} s ANTES de que empiece su frase (${f1(q.start)} s; limite -0.4)`, q, label); }
      else if (ser[0]) R.appears = 0;
    } else {
      let at = -1; for (let i = 0; i < times.length; i++) if (times[i] > wt && ser[i]) { at = i; break; }
      let hi = null;
      if (at >= 0 && times[at] <= wt + 8) hi = await refine(at);
      else {   // short flashes fall between the 1 s samples: fine scan up to 8 s after the word
        let prev = wt;
        for (let t = wt + 0.3; t <= wt + 8 && hi == null; t += 0.3) { await seek(t); if (await p.evaluate((n) => window.LS.visibleAny(n), idl)) { let lo = prev, h2 = t; for (let k = 0; k < 6; k++) { const mid = (lo + h2) / 2; await seek(mid); if (await p.evaluate((n) => window.LS.visibleAny(n), idl)) h2 = mid; else lo = mid; } hi = h2; } else prev = t; }
      }
      if (hi == null) {
        if (!ser.some(Boolean) && m.length === 1) { R.status = 'ausente'; cue('CARTEL-AUSENTE', 'BLOQ', wt, `dicho a ${f1(wt)} s (frase ${f1(q.start)}-${f1(q.end)} s) y nunca visible en pantalla (dentro del encuadre, opacidad > 0.5)`, q, label); }
        else R.status = 'otro momento';   // (also when the text is said in several sentences and is not shown within 8 s) text shown elsewhere in the video (> 8 s away): treated as a coincidence, not this cue
      } else {
        const dl = hi - wt; R.appears = +hi.toFixed(2); R.delta = +dl.toFixed(2);
        if (hi > q.end && m.length > 1) R.status = 'otro momento';
        else if (hi > q.end) { R.status = 'ausente'; cue('CARTEL-AUSENTE', 'BLOQ', wt, `no se ve durante toda la frase (${f1(q.start)}-${f1(q.end)} s); aparece a ${f1(hi)} s (+${dl.toFixed(1)} s de la palabra)`, q, label); }
        else if (dl > 2) { R.status = 'tarde'; cue('CUE-TARDIO', 'BLOQ', hi, `aparece ${dl.toFixed(1)} s DESPUES de su palabra (${f1(wt)} s; limite +2)`, q, label); }
        else if (dl > 1) { R.status = 'tarde'; cue('CUE-TARDIO', 'BLOQ', hi, `aparece ${dl.toFixed(1)} s DESPUES de su palabra (${f1(wt)} s; limite +1)`, q, label); }
      }
    }
    cuesOut.push(R);
    }
  }
  // UI names spoken but absent from the DOM text: Title-Case runs (>= 2 words, not sentence-initial) and verb-led names ("Select Add node")
  {
    const PREP = new Set(['under', 'in', 'on', 'at', 'to', 'from', 'the', 'a', 'an', 'and', 'or', 'of', 'for', 'with', 'by', 'next', 'then', 'is', 'are', 'that', 'you', 'it', 'inside', 'after', 'before', 'again', 'so', 'if', 'when']);
    const VERB = /^(select|click|choose|open|press|tap|add|pick)$/i;
    const cap = (x) => /^[A-Z][A-Za-z]/.test(x) && !/^(I|I'm|I'll)$/.test(x);
    for (const q of sents) {
      const tk = q.raw.split(/\s+/).filter(Boolean), found = new Set();
      const end = (x) => /[.,;:!?)]$/.test(x), clean = (x) => x.replace(/^["(]+|["),.;:!?]+$/g, '').replace(/['’]s$/, '');
      for (let i = 0; i < tk.length; i++) {
        if (i > 0 && cap(tk[i]) && !end(tk[i]) && i + 1 < tk.length && cap(tk[i + 1])) { let j = i + 1; while (!end(tk[j]) && j + 1 < tk.length && cap(tk[j + 1])) j++; found.add(tk.slice(i, j + 1).map(clean).join(' ')); i = j; }
        else if (VERB.test(clean(tk[i])) && !end(tk[i]) && i + 1 < tk.length && cap(tk[i + 1])) { let j = i + 1; if (!end(tk[j]) && j + 1 < tk.length && !PREP.has(clean(tk[j + 1]).toLowerCase()) && !cap(tk[j + 1])) j++; found.add(tk.slice(i + 1, j + 1).map(clean).join(' ')); }
      }
      for (const nm of found) {
        const w = nw(nm); if (w.length < 2 || w.some((x) => x.length < 2)) continue;   // spelled-out acronyms (H T T P) are not UI names
        const cmp = (x) => x.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ''), cn = cmp(nm);
        if (groups.has(w.join(' '))) continue;   // exact label exists in the DOM: handled above
        const wi = hasAt(q.w, w); if (wi < 0) continue;
        if ((from != null && q.start < +from) || (to != null && q.end > +to)) continue;
        const inS = times.map((t, i) => [t, i]).filter(([t]) => t >= q.start - 0.5 && t <= q.end + 0.2);
        if (!inS.length) continue;
        const seenHere = inS.some(([, i]) => ssamples[i].vis.some(([, t]) => hasAt(nw(t), w) >= 0 || cmp(t).includes(cn)));   // also matches identifiers drawn without spaces (Topic.StatusCode)
        const wt = tm(q, wi, q.w.length);
        if (!seenHere) { cue('CARTEL-AUSENTE', 'BLOQ', wt, `nombre de la interfaz dicho (frase ${f1(q.start)}-${f1(q.end)} s) y su texto no se ve en pantalla (solo icono o nada)`, q, nm); cuesOut.push({ label: nm, scene: q.scene + 1, sentStart: +q.start.toFixed(2), sentEnd: +q.end.toFixed(2), wordT: +wt.toFixed(2), appears: null, delta: null, status: 'ausente' }); }
      }
    }
  }
  fs.writeFileSync(path.join(DIR, 'cues.json'), JSON.stringify({ id, sha256: compo ? crypto.createHash('sha256').update(fs.readFileSync(path.join(DIR, 'composition.html'))).digest('hex') : '', generated: new Date().toISOString(), cues: cuesOut.sort((x, y) => x.wordT - y.wordT) }, null, 1));
}

// ---- aggregate: same defect in consecutive samples -> one row with time range
const runs = new Map();
samples.forEach((list, i) => { const seen = new Set(); for (const d of list) { const key = d.ty + '|' + d.sel + '|' + d.text; if (seen.has(key)) continue; seen.add(key); if (!runs.has(key)) runs.set(key, { d, idx: [] }); runs.get(key).idx.push(i); } });
const rows = [];
for (const { d, idx } of runs.values()) {
  let s = 0;
  for (let k = 1; k <= idx.length; k++) if (k === idx.length || idx[k] !== idx[k - 1] + 1) {
    const a = idx[s], z = idx[k - 1], t0 = times[a], t1 = times[z], dur = (times[z + 1] ?? t1 + STEP) - t0;
    // transient (one sample, e.g. camera mid-move or a crossfade) -> MENOR; blocking needs >= 2 consecutive samples
    const sev = d.ty === 'BORDE-MARGEN' || (z === a && d.ty !== 'VACIO' && d.ty !== 'BORDE-CORTADO') ? 'MENOR' : d.ty === 'VACIO' ? (t1 - t0 >= (d.sel === '(encuadre)' ? 2 : /^mitad inferior/.test(d.d) ? 3 : 1) ? 'BLOQ' : 'MENOR') : 'BLOQ';
    rows.push({ t0, t1, dur, ty: d.ty, sev, sel: d.sel, text: d.text, det: d.d, scene: sceneAt(t0) + 1 });
    s = k;
  }
}
// same defect re-appearing in the same scene (flicker, repeated entrances) -> one row
const merged = new Map();
for (const r of rows) { const k = r.ty + '|' + r.sel + '|' + r.text + '|' + r.scene, m = merged.get(k); if (!m) merged.set(k, r); else { m.t0 = Math.min(m.t0, r.t0); m.t1 = Math.max(m.t1, r.t1); if (r.sev === 'BLOQ') m.sev = 'BLOQ'; } }
// several objects cut the same way at the same time (e.g. a row of people) -> one row listing them
const grp = new Map();
for (const r of merged.values()) { const k = r.ty === 'BORDE-CORTADO' && !r.text ? r.ty + '|' + r.scene + '|' + r.t0 + '|' + r.t1 + '|' + r.det : Math.random(); const g = grp.get(k); if (!g) grp.set(k, r); else g.sel += ' ' + r.sel; }
const rep2 = new Map();   // a static object cut the same way in several scenes -> first occurrence + count; a SOLAPE already reported as DOBLE-EXPOSICION is dropped
for (const r of [...grp.values()].sort((x, y) => x.t0 - y.t0)) {
  if (r.ty === 'SOLAPE' && [...grp.values()].some((o) => o.ty === 'DOBLE-EXPOSICION' && o.t0 === r.t0 && o.text === r.text)) continue;
  const k = (r.ty === 'BORDE-CORTADO' && !r.text) || r.ty === 'BORDE-PEGADO' ? r.ty + '|' + r.sel + '|' + r.text + '|' + r.det.replace(/\d+ px/, '') : Math.random(), g = rep2.get(k);
  if (!g) { rep2.set(k, r); r.n = 1; } else { g.n++; if (g.sev !== 'BLOQ' && r.sev === 'BLOQ') { g.sev = 'BLOQ'; } }
}
for (const r of rep2.values()) if (r.n > 1) r.det += ` (en ${r.n} escenas)`;
rows.length = 0; rows.push(...rep2.values());
if (STRICT) rows.push(...strictRows);
rows.sort((x, y) => x.t0 - y.t0 || x.ty.localeCompare(y.ty));
const lines = rows.map((r) => `${f1(r.t0)}-${f1(r.t1)} s`.padEnd(15) + ('E' + r.scene).padEnd(4) + r.sev.padEnd(6) + r.ty.padEnd(17) + `${r.sel}  ${r.text}  [${r.det}]`);
const cnt = {}; for (const r of rows) { const k = r.ty + ' ' + r.sev; cnt[k] = (cnt[k] || 0) + 1; }
const nb = rows.filter((r) => r.sev === 'BLOQ').length;
const head = `lint-layout${STRICT ? ' --strict' : ''} ${id}: ${times.length} instantes, ${rows.length} defectos (${nb} bloqueantes, ${rows.length - nb} menores)`;
const summary = Object.entries(cnt).map(([k, v]) => `${k}: ${v}`).join(' | ');
const report = [head, summary, '', ...lines].join('\n');
console.log(report);
if (!CUES_ONLY) fs.writeFileSync(path.join(DIR, STRICT ? 'lint-layout-strict.txt' : 'lint-layout.txt'), report + '\n');

if (args.includes('--png')) {
  const od = path.join(DIR, '_lint'); fs.rmSync(od, { recursive: true, force: true }); fs.mkdirSync(od, { recursive: true });
  let n = 0;
  for (const r of rows.filter((x) => x.sev === 'BLOQ').slice(0, 40)) {
    await seek(r.t0); const f = path.join(od, `${String(++n).padStart(2, '0')}-${r.ty}-t${r.t0.toFixed(1)}.png`); await p.screenshot({ path: f });
  }
  console.log(`png: ${n} en ${od}`);
}
await b.close();
console.log(`(${((Date.now() - T0) / 1000).toFixed(0)} s)`);
process.exit(nb ? 1 : 0);
