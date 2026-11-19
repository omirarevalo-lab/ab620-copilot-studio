// Video kit: builds a HyperFrames composition (static HTML + GSAP timeline) from a short scene spec.
// Spec: video/<id>/scenes.json = { "brand": "AB-620 · Basics · Lesson 2", "scenes": [ { "type": "...", ... }, ... ] }
// One spec scene per narration scene (beats.json). Any element with "at" appears when that phrase is spoken:
//   "at": "knowledge"        -> first match at/after the previous cue in this scene (cues move forward in time)
//   "at": "2:knowledge"      -> search sentence 2 of the scene
//   "at": "#2"               -> start of sentence 2;   "at": "start" -> scene start
// Optional "lag" (seconds) shifts a cue. "hi": true highlights a card when it appears (and un-highlights the previous one).
// Scene types: split, flow, hub, chat, compare, roadmap, stats, bars, path, terms (see README in PRODUCT.md).
// Style v2 (spec "style": "v2"): overlapping push/blur transitions between scenes, chapter bar, no uppercase kickers, larger type,
// arrows that draw in, and three more scene types: code (code window, a highlight moves to lines on cue + side notes),
// pipeline (stages with a travelling message and an optional bracket such as a database transaction), trap (exam question:
// options appear, then the trap is struck through and the right answer confirmed).

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ic = (name) => (name ? `<i class="ic" data-i="${esc(name)}"></i>` : '');
const tile = (name, cls) => (name ? `<div class="tile${cls ? ' ' + cls : ''}">${ic(name)}</div>` : '');

// tiny syntax colouring for code scenes (C#, JS/TS, JSON, XML, shell): comments, strings, numbers, keywords, Types, <tags>
const KW = new Set('using namespace public private protected internal class interface void var new return if else for foreach while try catch finally throw this base null true false static readonly async await const let function import export from of in is as get set out ref string int bool object'.split(' '));
function hl(line) {
  const re = /(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)|(\b\d+\b)|(<\/?[\w:.-]+|\/?>)|(\b[A-Za-z_]\w*\b)/g;
  let out = '', last = 0, m;
  while ((m = re.exec(line))) {
    out += esc(line.slice(last, m.index)); last = re.lastIndex;
    const t = m[0];
    out += m[1] ? '<span class="c-cm">' + esc(t) + '</span>' : m[2] ? '<span class="c-st">' + esc(t) + '</span>' : m[3] ? '<span class="c-nu">' + esc(t) + '</span>'
      : m[4] ? '<span class="c-tg">' + esc(t) + '</span>' : KW.has(m[5]) ? '<span class="c-kw">' + esc(t) + '</span>' : /^[A-Z]/.test(m[5]) ? '<span class="c-ty">' + esc(t) + '</span>' : esc(t);
  }
  return out + esc(line.slice(last));
}

export function buildComposition(spec, beats) {
  const V2 = spec.style === 'v2';
  const T = [];          // timeline statements
  const sections = [];
  const n = beats.scenes.length;
  if (spec.scenes.length !== n) throw new Error(`spec has ${spec.scenes.length} scenes, narration has ${n}`);

  spec.scenes.forEach((sc, i) => {
    const bs = beats.scenes[i], a = i ? bs.start - 0.45 : 0, z = i < n - 1 ? beats.scenes[i + 1].start - 0.45 : beats.duration;
    let k = 0, cur = { j: 0, pos: 0, t: bs.start }, lastHi = null; const later = [];   // cues resolved after the scene's main order (badges, dims)
    const id = () => `s${i}-${k++}`;
    // resolve a cue to seconds
    const at = (cue, lag) => {
      let t;
      if (cue == null || cue === 'start') t = Math.max(a + 0.25, bs.start - 0.15);
      else if (typeof cue === 'number') t = cue;
      else if (/^#\d+$/.test(cue)) { const j = +cue.slice(1); t = bs.sentences[j].start - 0.1; cur = { j, pos: 0, t }; }
      else {
        let j0 = cur.j, word = cue, p0 = cur.pos; const m = /^(\d+):(.*)$/.exec(cue); if (m) { j0 = +m[1]; word = m[2]; p0 = 0; }
        let found = null;
        for (let j = j0; j < bs.sentences.length && !found; j++) {
          const s = bs.sentences[j], idx = s.text.toLowerCase().indexOf(word.toLowerCase(), j === j0 ? p0 : 0);
          if (idx > -1) found = { j, pos: idx + 1, t: s.start + (s.end - s.start) * idx / s.text.length };
        }
        if (!found) throw new Error(`scene ${i}: cue "${cue}" not found in narration`);
        cur = found; t = found.t;
      }
      return +(Math.min(z - 0.6, Math.max(a + 0.2, t + (lag || 0)))).toFixed(3);
    };
    const show = (el, sel, kind) => {   // schedule an element's entrance (+ optional highlight)
      const t = at(el.at, el.lag);
      T.push(`${kind || 'IN'}('#${sel}', ${t});`);
      if (el.hi) { if (lastHi) T.push(`LO('#${lastHi}', ${t});`); T.push(`HI('#${sel}', ${t});`); lastHi = sel; }
      return t;
    };
    const hdr = (h) => h ? (() => { const s = id(); T.push(`IN('#${s}', ${at(h.at ?? 'start')});`); return `<div class="hdr" id="${s}">${h.kicker && !V2 ? `<div class="kicker">${esc(h.kicker)}</div>` : ''}<h2 class="h2">${esc(h.title)}</h2>${h.sub ? `<p class="sub">${esc(h.sub)}</p>` : ''}</div>`; })() : '';
    const card = (c, cls) => { const s = id(); show(c, s);
      if (c.badge) later.push(() => T.push(`POP('#${s}b', ${at(c.badge.at)});`));
      if (c.dimAt) later.push(() => T.push(`DIM('#${s}', ${at(c.dimAt)});`));
      if (c.hiAt) later.push(() => T.push(`HI('#${s}', ${at(c.hiAt)});`));
      return `<div class="card ${cls}${c.accent ? ' accent' : ''}" id="${s}">${tile(c.icon, c.solid ? 'solid' : '')}<div class="tx"><b>${esc(c.title)}</b>${c.desc ? `<span>${esc(c.desc)}</span>` : ''}</div>${c.badge ? `<span class="pill solid badge" id="${s}b">${esc(c.badge.text)}</span>` : ''}</div>`; };
    let body = '';

    switch (sc.type) {
      case 'split': {   // left: kicker/title/sub/pill · right: window | rows | grid (+ optional chain above)
        const L = sc.left, s0 = id();
        T.push(`IN('#${s0}', ${at(L.at ?? 'start')});`);
        let left = `<div class="sp-left" id="${s0}">${L.kicker && !V2 ? `<div class="kicker">${esc(L.kicker)}</div>` : ''}<h1 class="h1">${esc(L.title)}</h1>${L.sub ? `<p class="sub">${esc(L.sub)}</p>` : ''}`;
        if (L.pill) { const s = id(); later.push(() => T.push(`IN('#${s}', ${at(L.pill.at, L.pill.lag)});`)); left += `<div class="lowcode" id="${s}"><span class="pill">${esc(L.pill.text)}</span>${L.pill.note ? `<span class="sub2">${esc(L.pill.note)}</span>` : ''}</div>`; }
        left += '</div>';
        let right = '';
        if (sc.chain) {
          right += '<div class="chain">' + sc.chain.map((c, x) => { const s = id(); show(c, s, c.accent ? 'POP' : 'IN'); return (x ? '<div class="arr"></div>' : '') + `<div class="node card${c.accent ? ' accent' : ''}" id="${s}">${tile(c.icon, c.accent ? 'solid' : '')}<b>${esc(c.title)}</b></div>`; }).join('') + '</div>';
        }
        const items = sc.window ? sc.window.cards : sc.rows || sc.grid || [];
        const ws = sc.window ? id() : null; if (sc.window) T.push(`IN('#${ws}', ${at(sc.window.at ?? 'start', 0.3)}, { y: 60 }, 0.8);`);   // window first: its cue comes before its cards
        const cards = items.map((c) => card(c, sc.grid ? 'gcard' : 'row')).join('');
        if (sc.window) { const s = ws; right += `<div class="win card sp-win" id="${s}"><div class="chrome"><i></i><i></i><i></i><span>${esc(sc.window.title)}</span></div><div class="rail">${(sc.window.rail || ['apps', 'bot', 'flow', 'toolbox', 'data_bar_vertical']).map((r, x) => `<i class="ic${x === 1 ? ' on' : ''}" data-i="${r}"></i>`).join('')}</div><div class="build">${sc.window.heading ? `<h4>${esc(sc.window.heading)}</h4>` : ''}${cards}</div></div>`; }
        else right += `<div class="${sc.grid ? 'grid2' : 'rows'}">${cards}</div>`;
        body = `<div class="sp">${left}<div class="sp-right">${right}</div></div>`;
        break;
      }
      case 'flow': {    // header · horizontal nodes with arrows · optional chips below and a struck-through note
        body = hdr(sc.header);
        body += '<div class="flowrow">' + sc.nodes.map((c, x) => { const s = id(), ts = show(c, s, c.accent ? 'POP' : 'IN'); let ar = ''; if (x) { if (V2) { const r = id(); T.push(`tl.fromTo('#${r}', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, ${Math.max(a + 0.2, ts - 0.35).toFixed(3)});`); ar = `<div class="farr" id="${r}"></div>`; } else ar = '<div class="farr"></div>'; } return ar + `<div class="fnode card${c.accent ? ' accent' : ''}" id="${s}">${tile(c.icon, c.accent ? 'solid big' : '')}<b>${esc(c.title)}</b>${c.sub ? `<span>${esc(c.sub)}</span>` : ''}</div>`; }).join('') + '</div>';
        if (sc.below) body += '<div class="chiprow">' + sc.below.map((c) => { const s = id(); if (c.strike) { const ts = show(c, s); T.push(`tl.fromTo('#${s} i', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, ${(ts + 0.8).toFixed(3)});`); return `<span class="strike" id="${s}">${esc(c.text)}<i></i></span>`; } show(c, s, 'POP'); return `<span class="pill lg${c.solid ? ' solid' : ''}" id="${s}">${ic(c.icon)}${esc(c.text)}</span>`; }).join('') + '</div>';
        break;
      }
      case 'hub': {     // header · top tiles · center node · bottom tiles
        body = hdr(sc.header);
        const row = (list, cls, label) => (label ? `<div class="hlabel">${esc(label)}</div>` : '') + `<div class="hrow ${cls}">` + list.map((c) => card(c, cls === 'top' ? 'htile' : 'hop')).join('') + '</div>';
        const s = id(); T.push(`POP('#${s}', ${at(sc.center.at ?? 'start')});`);
        body += `<div class="hub-wrap">${row(sc.top, 'top', sc.topLabel)}<div class="hcenter card accent" id="${s}">${tile(sc.center.icon, 'solid')}<b>${esc(sc.center.title)}</b></div>${sc.bottom ? row(sc.bottom, 'bot', sc.bottomLabel) : ''}</div>`;
        break;
      }
      case 'chat': {    // chat window (messages appear on cue, auto-scroll) · side cards · closing line
        const w = id(); T.push(`IN('#${w}', ${at(sc.window.at ?? 'start')}, { y: 50 }, 0.7);`);
        const sc_ = id();
        const msgs = sc.messages.map((m) => { const s = id(); const tm = show(m, s);
          let inner = esc(m.text);
          if (m.list) inner += `<ol>${m.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`;
          if (m.cite) inner += `<span class="cite">${ic('book_open')}${esc(m.cite)}</span>`;
          if (m.tool) inner += `<div class="toolcard"><div class="tile sm">${ic(m.tool.icon || 'ticket_diagonal')}</div><div><b>${esc(m.tool.title)}</b> ${esc(m.tool.result || '')}</div>${ic('checkmark_circle').replace('class="ic"', 'class="ic okc"')}</div>`;
          T.push(`SCROLL('#${sc_}', '#${s}', ${(tm - 0.05).toFixed(3)});`);
          return `<div class="m ${m.from === 'u' ? 'u' : 'a'}" id="${s}">${inner}</div>`; }).join('');
        body = `<div class="win card chatwin" id="${w}"><div class="chrome"><i></i><i></i><i></i><span>${esc(sc.window.title)}</span></div><div class="msgs"><div class="scroll" id="${sc_}">${msgs}</div></div></div>`;
        if (sc.side) { const h = id(); T.push(`IN('#${h}', ${at(sc.side.at ?? 'start')});`); body += `<div class="side"><h4 id="${h}">${esc(sc.side.heading)}</h4>${sc.side.cards.map((c) => card(c, 'used')).join('')}</div>`; }
        if (sc.close) { const s = id(); T.push(`POP('#${s}', ${at(sc.close.at)});`); body += `<div class="closeline" id="${s}">${sc.close.html.replace(/\*([^*]+)\*/g, '<em>$1</em>')}</div>`; }
        break;
      }
      case 'compare': { // header · two columns with items appearing on cue · optional verdict
        body = hdr(sc.header);
        body += '<div class="cmp">' + sc.cols.map((col) => { const s = id(); show(col, s); return `<div class="cmp-col card${col.accent ? ' accent' : ''}${col.tone ? ' ' + col.tone : ''}" id="${s}"><div class="cmp-h">${tile(col.icon, col.accent ? 'solid' : '')}<div><b>${esc(col.title)}</b>${col.sub ? `<span>${esc(col.sub)}</span>` : ''}</div></div><ul>${(col.items || []).map((it) => { const q = id(); show(it, q); return `<li id="${q}">${esc(it.text)}</li>`; }).join('')}</ul></div>`; }).join('') + '</div>';
        if (sc.verdict) { const s = id(); T.push(`POP('#${s}', ${at(sc.verdict.at)});`); body += `<div class="verdict"><span class="pill solid lg" id="${s}">${ic(sc.verdict.icon)}${esc(sc.verdict.text)}</span></div>`; }
        break;
      }
      case 'roadmap': { // header · stops along a line · notes · next card
        body = hdr(sc.header);
        const N = sc.stops.length, r = id(); let t0 = null;
        body += `<div class="road"><i id="${r}"></i></div><div class="stops">` + sc.stops.map((c) => { const s = id(); const ts = show(c, s, 'POP'); if (t0 == null) t0 = Math.max(a + 0.2, ts - 0.6); return `<div class="stop" id="${s}"><div class="tile">${ic(c.icon)}</div><b>${esc(c.title)}</b>${c.sub ? `<span>${esc(c.sub)}</span>` : ''}</div>`; }).join('') + '</div>';
        T.push(`tl.fromTo('#${r}', { scaleX: 0 }, { scaleX: 1, duration: ${Math.max(1.5, N * 0.7).toFixed(2)}, ease: 'power1.inOut' }, ${t0.toFixed(3)});`);
        if (sc.notes) body += '<div class="notes">' + sc.notes.map((c) => { const s = id(); show(c, s); return `<span class="pill lg" id="${s}">${ic(c.icon)}${esc(c.text)}</span>`; }).join('') + '</div>';
        if (sc.next) { const s = id(); T.push(`POP('#${s}', ${at(sc.next.at)});`); body += `<div class="next card accent" id="${s}"><div class="tile solid">${ic(sc.next.icon || 'map')}</div><div><span>${esc(sc.next.label || 'Next lesson')}</span><b>${esc(sc.next.title)}</b></div></div>`; }
        break;
      }
      case 'stats': {   // header · big number tiles · optional warning note
        body = hdr(sc.header);
        body += '<div class="stats">' + sc.items.map((c) => { const s = id(); show(c, s, 'POP'); return `<div class="stat card${c.accent ? ' accent' : ''}" id="${s}">${tile(c.icon)}<div class="sv">${esc(c.value)}</div><div class="sl">${esc(c.label)}</div></div>`; }).join('') + '</div>';
        if (sc.note) { const s = id(); show(sc.note, s); body += `<div class="note card warn" id="${s}">${ic(sc.note.icon || 'flag')}<span>${esc(sc.note.text)}</span></div>`; }
        break;
      }
      case 'bars': {    // header · horizontal percentage bars that grow on cue
        body = hdr(sc.header);
        body += '<div class="bars">' + sc.items.map((c) => { const s = id(), t = show(c, s); T.push(`tl.fromTo('#${s} .fill', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.out' }, ${(t + 0.2).toFixed(3)});`); return `<div class="barrow card" id="${s}"><div class="bl"><b>${esc(c.label)}</b>${c.sub ? `<span>${esc(c.sub)}</span>` : ''}</div><div class="track"><i class="fill" style="width:${Math.round(c.value)}%"></i></div><div class="bv">${esc(c.range)}</div></div>`; }).join('') + '</div>';
        break;
      }
      case 'path': {    // header · breadcrumb path of UI places (Settings › Generative AI › ...) · optional cards below
        body = hdr(sc.header);
        body += '<div class="crumbs">' + sc.crumbs.map((c, x) => { const s = id(); show(c, s, 'POP'); return (x ? '<span class="sep">›</span>' : '') + `<span class="crumb${c.accent ? ' accent' : ''}" id="${s}">${ic(c.icon)}${esc(c.text)}</span>`; }).join('') + '</div>';
        if (sc.cards) body += '<div class="rows wide">' + sc.cards.map((c) => card(c, 'row')).join('') + '</div>';
        break;
      }
      case 'terms': {   // header · grid of term cards appearing as they are spoken
        body = hdr(sc.header);
        body += `<div class="terms"${sc.cols ? ` style="grid-template-columns: repeat(${sc.cols}, 1fr)"` : ''}>` + '' + sc.items.map((c) => { const s = id(); show(c, s, 'POP'); return `<div class="term card" id="${s}">${tile(c.icon, 'sm')}<div><b>${esc(c.term)}</b><span>${esc(c.def)}</span></div></div>`; }).join('') + '</div>';
        break;
      }
      case 'code': {    // v2 · header · code window (lines) · a highlight bar that moves to lines on cue · notes on the right
        body = hdr(sc.header);
        const LH = 54, PT = 28, w = id(), bar = id();
        sc.lines.forEach((ln, k) => { if (ln.length > 50) throw new Error('scene ' + i + ': code line ' + (k + 1) + ' has ' + ln.length + ' characters (max 50 fit the window): ' + ln); });
        T.push(`IN('#${w}', ${at(sc.window && sc.window.at != null ? sc.window.at : 'start')}, { y: 50 }, 0.7);`);
        let first = true;
        const notes = (sc.marks || []).map((mk) => {
          const t = at(mk.at, mk.lag), y = PT + (mk.line - 1) * LH;
          if (first) { T.push(`tl.set('#${bar}', { y: ${y} }, ${(t - 0.01).toFixed(3)}); tl.fromTo('#${bar}', { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' }, ${t});`); first = false; }
          else T.push(`tl.to('#${bar}', { y: ${y}, duration: 0.45, ease: 'power3.inOut' }, ${t});`);
          if (!mk.note) return '';
          const s = id(); T.push(`IN('#${s}', ${t}, { x: 30, y: 0 });`);
          return '<div class="cnote card" id="' + s + '">' + tile(mk.icon, 'sm') + '<div class="tx"><b>' + esc(mk.note) + '</b>' + (mk.desc ? '<span>' + esc(mk.desc) + '</span>' : '') + '</div></div>';
        }).join('');
        const lines = sc.lines.map((ln, k) => '<div class="cl"><i>' + (k + 1) + '</i><code>' + hl(ln) + '</code></div>').join('');
        body += '<div class="code-wrap' + (notes ? '' : ' solo') + '"><div class="win card codewin" id="' + w + '"><div class="chrome"><i></i><i></i><i></i><span>' + esc((sc.window && sc.window.title) || '') + '</span></div><div class="cbody"><div class="cbar" id="' + bar + '"></div>' + lines + '</div></div>' + (notes ? '<div class="cnotes">' + notes + '</div>' : '') + '</div>';
        break;
      }
      case 'pipeline': { // v2 · header · stages left to right · a message token travels to each stage as it appears · optional bracket over a span of stages
        body = hdr(sc.header);
        const N = sc.stages.length, GAP = 36, W = Math.floor((1680 - (N - 1) * GAP) / N), tok = sc.token ? id() : null;
        const xs = sc.stages.map((_, k) => k * (W + GAP) + W / 2);
        const stops = sc.stages.some((c) => c.stop); let tokFirst = true;   // stage.stop: the token only goes to those stages (else to every stage as it appears)
        const stages = sc.stages.map((c, k) => { const s = id(), t = show(c, s, c.accent ? 'POP' : 'IN');
          if (tok && (!stops || c.stop)) { const tt = c.stop && c.stopAt ? at(c.stopAt) : t; const first = tokFirst; tokFirst = false; T.push(first ? `tl.set('#${tok}', { x: ${xs[k]}, xPercent: -50 }, ${(tt - 0.01).toFixed(3)}); tl.fromTo('#${tok}', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, ${tt});`
            : `tl.to('#${tok}', { x: ${xs[k]}, duration: 0.6, ease: 'power3.inOut' }, ${tt});`); }
          return '<div class="stage card' + (c.accent ? ' accent' : '') + (c.tone ? ' ' + c.tone : '') + '" id="' + s + '" style="width:' + W + 'px">' + (c.tag ? '<span class="stag">' + esc(c.tag) + '</span>' : '') + tile(c.icon, 'sm') + '<b>' + esc(c.title) + '</b>' + (c.desc ? '<span>' + esc(c.desc) + '</span>' : '') + '</div>'; }).join('');
        let br = '';
        if (sc.bracket) { const b = sc.bracket, s = id(), L = b.from * (W + GAP), BW = (b.to - b.from + 1) * W + (b.to - b.from) * GAP, t = at(b.at, b.lag);
          T.push(`tl.fromTo('#${s} i', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, ${t}); tl.fromTo('#${s} span', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, ${(t + 0.35).toFixed(3)});`);
          br = '<div class="pbracket" id="' + s + '" style="left:' + L + 'px;width:' + BW + 'px"><span>' + esc(b.label) + '</span><i></i></div>'; }
        body += '<div class="pipe">' + br + '<div class="prow">' + stages + '</div>' + (tok ? '<div class="ptrack"><span class="ptoken pill solid" id="' + tok + '">' + ic(sc.token.icon || 'mail') + esc(sc.token.text) + '</span></div>' : '') + '</div>';
        if (sc.note) { const s = id(); show(sc.note, s); body += '<div class="note card warn pnote" id="' + s + '">' + ic(sc.note.icon || 'flag') + '<span>' + esc(sc.note.text) + '</span></div>'; }
        break;
      }
      case 'trap': {    // v2 · exam question · options appear · at "reveal" the trap is struck and the right answer confirmed · "why" line
        const q = id(); T.push(`IN('#${q}', ${at(sc.question.at ?? 'start')});`);
        body = '<div class="tq" id="' + q + '"><span class="tq-l">Exam question</span><p>' + esc(sc.question.text) + '</p></div><div class="topts">';
        const opts = sc.options.map((o, k) => { const s = id(); show(o, s);
          return { o, s, html: '<div class="topt card' + (o.kind === 'trap' ? ' istrap' : '') + '" id="' + s + '"><span class="olet">' + 'ABCDE'[k] + '</span><span class="ot">' + esc(o.text) + (o.kind === 'trap' ? '<i class="ostrike"></i>' : '') + '</span>' + (o.kind === 'right' ? '<span class="tok">' + ic('checkmark_circle') + '</span>' : '') + (o.kind === 'trap' ? '<span class="ttag pill">Trap</span>' : '') + '</div>' }; });
        const rv = sc.reveal ? at(sc.reveal.at, sc.reveal.lag) : null;
        if (rv != null) opts.forEach(({ o, s }) => {
          if (o.kind === 'right') T.push(`tl.to('#${s}', { borderColor: '#1e7f4f', backgroundColor: '#f1f8f4', duration: 0.4 }, ${rv}); POP('#${s} .tok', ${(rv + 0.15).toFixed(3)});`);
          else { T.push(`DIM('#${s} .ot', ${rv}, 0.45);`); if (o.kind === 'trap') T.push(`tl.fromTo('#${s} .ostrike', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, ${rv}); POP('#${s} .ttag', ${(rv + 0.3).toFixed(3)});`); }
        });
        body += opts.map((x) => x.html).join('') + '</div>';
        if (sc.why) { const s = id(); T.push(`IN('#${s}', ${at(sc.why.at, sc.why.lag)});`); body += '<div class="twhy" id="' + s + '">' + sc.why.html.replace(/\*([^*]+)\*/g, '<em>$1</em>') + '</div>'; }
        break;
      }
      default: throw new Error('unknown scene type ' + sc.type);
    }
    later.forEach((f) => f());
    if (V2) {   // scenes overlap by ~0.6 s on alternating tracks: the outgoing scene slides left and blurs while the next one slides in
      const end = i < n - 1 ? z + 0.6 : z;
      sections.push('<section class="clip scene s' + i + ' t-' + sc.type + '" data-start="' + a.toFixed(3) + '" data-duration="' + (end - a).toFixed(3) + '" data-track-index="' + (i % 2 ? 3 : 0) + '">' + body + '</section>');
      T.push(i ? "tl.fromTo('.s" + i + "', { opacity: 0, x: 160, filter: 'blur(10px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }, " + (a + 0.05).toFixed(3) + ');'
        : "tl.fromTo('.s0', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 0);");
      if (i < n - 1) T.push("tl.to('.s" + i + "', { opacity: 0, x: -160, filter: 'blur(10px)', duration: 0.5, ease: 'power2.in' }, " + z.toFixed(3) + ');');
      T.push("tl.fromTo('.chbar i:nth-child(" + (i + 1) + ") b', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, " + (a + 0.1).toFixed(3) + ');');
    } else {
    sections.push(`<section class="clip scene s${i} t-${sc.type}" data-start="${a.toFixed(3)}" data-duration="${(z - a).toFixed(3)}" data-track-index="0">${body}</section>`);
    T.push(`tl.fromTo('.s${i}', { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power1.out' }, ${a.toFixed(3)});`);
    T.push(`tl.to('.s${i}', { opacity: 0, duration: 0.35, ease: 'power1.in' }, ${(z - 0.36).toFixed(3)});`);
    }
  });

  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1920, height=1080" />
<title>${esc(beats.title)}</title><script src="gsap.min.js"></script><link rel="stylesheet" href="style.css" /></head>
<body><div id="root"${V2 ? ' class="v2"' : ''} data-composition-id="main" data-start="0" data-width="1920" data-height="1080" data-duration="${beats.duration.toFixed(3)}">
<section class="clip" data-start="0" data-duration="${beats.duration.toFixed(3)}" data-track-index="2"><div class="frame-top"><span class="brand">${esc(spec.brand || '')}</span>${V2 ? '<span class="chbar">' + '<i><b></b></i>'.repeat(n) + '</span>' : ''}</div></section>
${sections.join('\n')}
<audio id="narr" src="narration.mp3" data-start="0" data-duration="${beats.duration.toFixed(3)}" data-track-index="1" data-volume="1"></audio>
</div>
<script src="anim.js"></script>
<script>
${T.join('\n')}
window.__timelines = window.__timelines || {}; window.__timelines['main'] = tl;
</script></body></html>`;
}
