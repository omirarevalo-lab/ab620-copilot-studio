/* World library (tools/video/world/world.js). Injected inline by tools/video/render.mjs where composition.html has the marker @world in an HTML comment
   (world.css goes into <head>, this script at the marker; put the marker right BEFORE your own <script>, after <div id="stage"></div>).
   Defines globals (do not redeclare them): B (beats), tl (the one paused GSAP timeline; the composition must set
   window.__timelines = { main: tl } at the end of its own script, see L41), and:

   TIME   S(i,j) sentence start · E(i,j) sentence end · W(i,j,'word',lag) moment a word is spoken (scene i, sentence j)
   FX     ON/OFF(sel,t,d) fade · POP/POPX(sel,t) pop in · TAG(sel,t) pill rises · SLIDE(sel,t) · SWAP(from,to,t) · PC(sel) screen centre [x,y] (call before tweens)
   CAMERA CAM(x,y,scale,t,dur,ease) centres world point (x,y) · CUR(x,y,t,d) moves the cursor · CLICK(x,y,t) click ring
   UI     uiWindow(id,{title,nav:[..],on,body,bar}) -> html for ADDU · UIIN(sel,t) / UIOUT(sel,t) window opens/closes (scale from the laptop) · NAV(sel,k,t) highlights nav item k
   STAGE  The library creates in #stage: #world (wall+floor 3840x2160), #uiBack, #uiL (windows), #exams, #clickRing, #cur, #ovL (overlays + #vign).
          ADD(html) into the world · ADDU(html) into the UI layer · ADDS(html) overlay layer (kinetic text, chk, rcard, cap)
   BUILD  (all return html; id goes on the outer element; x,y = world px, top-left)
          maker(id,x,y) desk+laptop · agent(id,x,y,{folder:'HR',lock:true}) robot (#id_e eyes, #id_fold folder, #id_lc/#id_lo lock) · admin(id,x,y) tower+monitor
          crowd(id,x,y,color) person · fleetBot(id,x,y) mini bot · disc(id,x,y,icon,label) capability disc · gate(id,x,y) door+barrier · alarm(id,x,y) (#id_body,#id_glow,.ring)
          pill(id,x,y,text,cls) tag pill (cls blue|red|amber|green|purple|navy; font via style) · say(id,x,y,html,cls) speech bubble (cls ''|green|blue)
          chip(id,x,y,icon,text,cls) card chip · cable(id,d,color,w,dash) svg path (put paths inside an <svg class="w"> that you own) · IC(name,style) inline icon · person(color) / miniBot(w) raw svg
   EXAM   mkExam(id,{q,opts:[3],why,proof}) -> html for EXAMS(html..) ; EXAM(id,i,{pause,reveal,trap,right,q,opt:[t,t,t],end,start}) timeline: options visible before the pause sentence,
          3 s ring from the pause sentence, nothing moves until the reveal sentence (trap red + "Trap", right green, why, proof .xp).
   Colours: blue #2f5bd3 agent/allowed · green #1e7f4f correct · red #c4392f blocked · amber #d98a00 warning · purple #8a5cd6 · navy #1f2a44 */
const B = {{BEATS}};
const tl = gsap.timeline({ paused: true });
const S = (i, j) => B.scenes[i].sentences[j || 0].start;
const E = (i, j) => B.scenes[i].sentences[j || 0].end;
const W = (i, j, word, lag) => { const s = B.scenes[i].sentences[j], k = s.text.toLowerCase().indexOf(word.toLowerCase()); if (k < 0) console.warn('W: word not found', i, j, word); return (k < 0 ? s.start : s.start + (s.end - s.start) * k / s.text.length) + (lag || 0); };
const ON = (sel, t, d) => tl.to(sel, { opacity: 1, duration: d || 0.4 }, t);
const OFF = (sel, t, d) => tl.to(sel, { opacity: 0, duration: d || 0.4 }, t);
const POP = (sel, t) => tl.fromTo(sel, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, t);
const TAG = (sel, t) => tl.fromTo(sel, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(2)' }, t);
const POPX = (sel, t) => tl.fromTo(sel, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, t);
const SLIDE = (sel, t) => tl.fromTo(sel, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.45, ease: 'back.out(1.6)' }, t);
const SWAP = (from, to, t) => { OFF(from, t, 0.25); tl.fromTo(to, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, t + 0.1); };
const CAM = (x, y, s, t, d, ease) => tl.to('#world', { x: 960 - x * s, y: 540 - y * s, scale: s, duration: d == null ? 1.6 : d, ease: ease || 'power3.inOut' }, t);
const CUR = (x, y, t, d) => tl.to('#cur', { x: x, y: y, duration: d || 0.9, ease: 'power2.inOut' }, t);
const CLICK = (x, y, t) => { tl.fromTo('#clickRing', { left: x, top: y, opacity: 0.9, scale: 0.3 }, { opacity: 0, scale: 1.4, duration: 0.5, ease: 'power2.out', immediateRender: false }, t); tl.to('#cur', { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, t); };
const PC = (sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

/* inline icons: render.mjs injects #icLib with every svg in video/assets/icons */
const IC = (n, style) => { const e = document.querySelector(`#icLib [data-n="${n}"]`); if (!e) throw new Error('missing icon ' + n); return `<i class="ic"${style ? ` style="${style}"` : ''}>${e.innerHTML}</i>`; };

/* stage layers */
(function () {
  const st = document.getElementById('stage');
  st.insertAdjacentHTML('beforeend', '<div id="world"><div class="wall"></div><div class="floor"></div></div><div id="uiBack"></div><div id="uiL"></div><div id="exams"></div><div id="clickRing"></div>' +
    '<svg id="cur" viewBox="0 0 46 60"><path d="M4 4 L4 48 L16 37 L25 56 L33 52 L24 34 L40 34 Z" fill="#141821" stroke="#fff" stroke-width="3"/></svg><div id="ovL"><div id="vign"></div></div>');
  gsap.set('#cur', { x: 960, y: 900 });
})();
const ADD = (h) => document.getElementById('world').insertAdjacentHTML('beforeend', h);
const ADDU = (h) => document.getElementById('uiL').insertAdjacentHTML('beforeend', h);
const ADDS = (h) => document.getElementById('ovL').insertAdjacentHTML('beforeend', h);
const at = (x, y) => `left:${x}px;top:${y}px`;

/* characters and objects (original simple SVG) */
const person = (c) => `<svg width="90" height="200" viewBox="0 0 90 200"><circle cx="45" cy="34" r="28" fill="#f2c9a6"/><path d="M8 196 Q8 76 45 70 Q82 76 82 196 Z" fill="${c}"/></svg>`;
const miniBot = (w) => `<svg width="${w || 64}" height="${(w || 64) * 70 / 64}" viewBox="0 0 64 70"><rect x="6" y="8" width="52" height="40" rx="14" fill="#2f5bd3"/><circle cx="24" cy="28" r="5" fill="#fff"/><circle cx="40" cy="28" r="5" fill="#fff"/><rect x="16" y="50" width="32" height="18" rx="8" fill="#2f5bd3"/></svg>`;
const crowd = (id, x, y, c) => `<div class="w" id="${id}" style="${at(x, y)}">${person(c)}</div>`;
const fleetBot = (id, x, y) => `<div class="w" id="${id}" style="${at(x, y)}">${miniBot()}</div>`;
const maker = (id, x, y) => `<svg class="w" id="${id}" style="${at(x, y)}" width="900" height="520" viewBox="0 0 900 520">
  <rect x="230" y="340" width="600" height="26" rx="8" fill="#c9ced8"/><rect x="270" y="366" width="18" height="120" fill="#c9ced8"/><rect x="770" y="366" width="18" height="120" fill="#c9ced8"/>
  <g id="${id}_p"><circle cx="140" cy="200" r="46" fill="#f2c9a6"/><path d="M86 470 Q86 270 140 262 Q194 270 194 470 Z" fill="#2f5bd3"/><path d="M178 320 L300 330" stroke="#2f5bd3" stroke-width="26" stroke-linecap="round"/></g>
  <rect x="370" y="110" width="320" height="230" rx="16" fill="#1f2a44"/><rect x="386" y="126" width="288" height="198" rx="8" fill="#fff"/><rect x="340" y="336" width="380" height="14" rx="6" fill="#8a93a6"/>
  <rect x="386" y="126" width="288" height="34" fill="#1f2a44"/><rect x="386" y="160" width="70" height="164" fill="#f3f5f9"/><rect x="474" y="180" width="170" height="22" rx="6" fill="#c9d8f7"/><rect x="474" y="218" width="130" height="22" rx="6" fill="#e2e5eb"/><rect x="474" y="256" width="150" height="22" rx="6" fill="#e2e5eb"/></svg>`;
const agent = (id, x, y, o) => { o = o || {}; const f = o.folder === undefined ? 'HR' : o.folder; return `<svg class="w" id="${id}" style="${at(x, y)}" width="360" height="500" viewBox="0 0 360 500">
  <line x1="180" y1="40" x2="180" y2="90" stroke="#2f5bd3" stroke-width="10"/><circle cx="180" cy="34" r="16" fill="#2f5bd3"/>
  <rect x="60" y="90" width="240" height="190" rx="54" fill="#2f5bd3"/><rect x="92" y="130" width="176" height="104" rx="40" fill="#e6ecfb"/>
  <g id="${id}_e"><circle cx="145" cy="182" r="16" fill="#141821"/><circle cx="215" cy="182" r="16" fill="#141821"/></g>
  <rect x="96" y="300" width="168" height="170" rx="40" fill="#2f5bd3"/>
  ${f ? `<g id="${id}_fold"><rect x="250" y="330" width="96" height="120" rx="10" fill="#ffd166"/><text x="298" y="400" font-size="34" font-weight="800" fill="#7a4d00" text-anchor="middle">${f}</text></g>` : ''}
  ${o.lock ? `<g id="${id}_lc"><rect x="20" y="210" width="56" height="46" rx="10" fill="#1e7f4f"/><path d="M32 210 v-14 a16 16 0 0 1 32 0 v14" fill="none" stroke="#1e7f4f" stroke-width="9"/></g><g id="${id}_lo" opacity="0"><rect x="20" y="210" width="56" height="46" rx="10" fill="#d98a00"/><path d="M32 210 v-14 a16 16 0 0 1 32 0 v-6" fill="none" stroke="#d98a00" stroke-width="9" transform="rotate(-25 32 210)"/></g>` : ''}</svg>`; };
const admin = (id, x, y) => `<svg class="w" id="${id}" style="${at(x, y)}" width="460" height="560" viewBox="0 0 460 560">
  <rect x="40" y="300" width="380" height="240" rx="24" fill="#1f2a44"/><rect x="70" y="330" width="320" height="180" rx="14" fill="#2d3a5c"/>
  <circle cx="230" cy="160" r="54" fill="#f2c9a6"/><path d="M160 300 Q160 222 230 214 Q300 222 300 300 Z" fill="#1e7f4f"/><path d="M196 380 l34 -26 l34 26 v40 q0 30 -34 46 q-34 -16 -34 -46 Z" fill="#c4392f"/></svg>`;
const disc = (id, x, y, icon, label) => `<div class="capi" id="${id}" style="${at(x, y)}"><div class="disc">${IC(icon)}</div><b>${label}</b></div>`;
const gate = (id, x, y) => `<svg class="w" id="${id}" style="${at(x, y)}" width="420" height="560" viewBox="0 0 420 560"><rect x="120" y="20" width="200" height="520" rx="10" fill="#d3d9e4"/><rect x="140" y="40" width="160" height="500" fill="#f8f9fb"/>
  <g id="${id}_bar" style="transform-origin: 40px 330px"><rect x="30" y="320" width="20" height="200" rx="6" fill="#141821"/><rect x="40" y="310" width="360" height="36" rx="18" fill="#c4392f"/><rect x="100" y="310" width="40" height="36" fill="#fff"/><rect x="200" y="310" width="40" height="36" fill="#fff"/><rect x="300" y="310" width="40" height="36" fill="#fff"/></g></svg>`;
const alarm = (id, x, y) => `<div class="w" id="${id}" style="${at(x, y)};width:200px;height:200px"><svg width="200" height="200" viewBox="0 0 200 200" style="position:absolute;left:0;top:0;overflow:visible">
  ${[0, 1, 2].map(() => '<circle class="ring" cx="100" cy="100" r="90" fill="none" stroke="#d98a00" stroke-width="8" opacity="0"/>').join('')}
  <g id="${id}_body"><circle cx="100" cy="100" r="78" fill="#d98a00"/><circle id="${id}_glow" cx="100" cy="100" r="50" fill="#ffd166"/><path d="M100 64 L100 108" stroke="#7a4d00" stroke-width="12" stroke-linecap="round"/><circle cx="100" cy="132" r="8" fill="#7a4d00"/></g></svg></div>`;
const pill = (id, x, y, text, cls) => `<div class="tag ${cls || 'blue'}" id="${id}" style="${at(x, y)}">${text}</div>`;
const say = (id, x, y, html, cls) => `<div class="sb ${cls || ''}" id="${id}" style="${at(x, y)}">${html}</div>`;
const chip = (id, x, y, icon, text, cls) => `<div class="chip ${cls || ''}" id="${id}" style="${at(x, y)}">${icon ? IC(icon) : ''}<span>${text}</span></div>`;
const cable = (id, d, color, w, dash) => `<path id="${id}" d="${d}" fill="none" stroke="${color || '#2f5bd3'}" stroke-width="${w || 12}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''} opacity="0"/>`;

/* UI windows (generic product screen). nav: array of labels; on: index highlighted; body: inner html of .main; bar: extra html at the right of the top bar */
const uiWindow = (id, o) => `<div class="uw" id="${id}"><div class="bar"><i class="dot"></i><i class="dot"></i><i class="dot"></i><span class="t">${o.title}</span>${o.bar || ''}</div>
  <div class="nav">${(o.nav || []).map((n, k) => `<div id="${id}_nv${k}"${k === o.on ? ' class="on"' : ''}>${n}</div>`).join('')}</div><div class="main">${o.body || ''}</div></div>`;
const UIIN = (sel, t, x, y) => { ON('#uiBack', t, 0.5); tl.fromTo(sel, { opacity: 0, scale: 0.28 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, t + 0.1); };
const UIOUT = (sel, t) => { tl.to(sel, { opacity: 0, scale: 0.28, duration: 0.7, ease: 'power3.in' }, t); OFF('#uiBack', t + 0.3, 0.5); };
const NAV = (sel, k, t, n) => { for (let i = 0; i < n; i++) { const on = i === k; tl.to(`${sel}_nv${i}`, { backgroundColor: on ? '#ffffff' : '#f3f5f9', color: on ? '#2f5bd3' : '#5d6472', fontWeight: on ? 700 : 400, borderLeftColor: on ? '#2f5bd3' : 'rgba(47,91,211,0)', duration: 0.15 }, t); } };

/* exam room */
const mkExam = (id, c) => {
  const opts = c.opts.map((o, k) => `<div class="xo" id="${id}_o${k}" style="top:${410 + k * 138}px"><b class="k">${'ABC'[k]}</b><span class="tx">${o}</span><em class="trap">Trap</em>${IC('checkmark_circle').replace('class="ic"', 'class="ic ok"')}</div>`).join('');
  return `<div class="exam" id="${id}"><div class="xl">EXAM QUESTION</div><div class="xq" id="${id}_q">${c.q}</div><div class="xg" id="${id}_g">${opts}</div>
   <svg class="xring" id="${id}_ring" width="260" height="260" viewBox="0 0 260 260"><circle cx="130" cy="130" r="110" fill="none" stroke="#2d3a5c" stroke-width="18"/><circle id="${id}_arc" cx="130" cy="130" r="110" fill="none" stroke="#ffd166" stroke-width="18" stroke-linecap="round" stroke-dasharray="691.2" stroke-dashoffset="0" transform="rotate(-90 130 130)"/>
   <text id="${id}_n3" x="130" y="162" text-anchor="middle" font-size="96" font-weight="800" fill="#fff">3</text><text id="${id}_n2" x="130" y="162" text-anchor="middle" font-size="96" font-weight="800" fill="#fff" opacity="0">2</text><text id="${id}_n1" x="130" y="162" text-anchor="middle" font-size="96" font-weight="800" fill="#fff" opacity="0">1</text></svg>
   <div class="xwhy" id="${id}_why">${c.why || ''}</div><div class="xp" id="${id}_p">${c.proof || ''}</div></div>`;
};
const EXAMS = (...hs) => { document.getElementById('exams').insertAdjacentHTML('beforeend', hs.join('')); gsap.set('#exams [id$="_n2"],#exams [id$="_n1"]', { opacity: 0 }); };
const EXAM = (id, i, o) => {
  const X = '#' + id, R = S(i, o.reveal), Pz = S(i, o.pause);
  ON(X, o.start == null ? S(i, 0) - 0.3 : o.start, 0.5);
  tl.fromTo(X + '_q', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, o.q);
  o.opt.forEach((t, k) => tl.fromTo(`${X}_o${k}`, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, t));
  ON(X + '_ring', Pz, 0.15);
  tl.fromTo(X + '_arc', { strokeDashoffset: 0 }, { strokeDashoffset: 691.2, duration: 3, ease: 'none' }, Pz);
  tl.set(X + '_n3', { opacity: 0 }, Pz + 1); tl.set(X + '_n2', { opacity: 1 }, Pz + 1);
  tl.set(X + '_n2', { opacity: 0 }, Pz + 2); tl.set(X + '_n1', { opacity: 1 }, Pz + 2);
  OFF(X + '_ring', R, 0.2);
  const T = `${X}_o${o.trap}`, G = `${X}_o${o.right}`, O = [0, 1, 2].filter((k) => k !== o.trap && k !== o.right).map((k) => `${X}_o${k}`);
  tl.to(T, { backgroundColor: '#fde8e6', borderColor: '#c4392f', color: '#c4392f', duration: 0.3 }, R);
  tl.set(T + ' .tx', { textDecoration: 'line-through' }, R);
  ON(T + ' .trap', R + 0.1, 0.3);
  tl.to(G, { backgroundColor: '#e3f4ea', borderColor: '#1e7f4f', color: '#1e7f4f', duration: 0.3 }, R);
  ON(G + ' .ok', R + 0.1, 0.3);
  tl.to(O, { opacity: 0.5, duration: 0.4 }, R);
  OFF(X + '_q', R + 1.0, 0.4);
  tl.to(X + '_g', { y: -290, duration: 0.6, ease: 'power2.inOut' }, R + 1.0);
  OFF(X, o.end, 0.4);
};
