/* Search + connection map: logic only (no DOM). Built per exam from the data already loaded (course, glossary, exam tips,
   video captions, questions, cards). window.TALLER_SEARCH = { index(data), search(ix, q), concept(ix, q) }.
   - index(): one "unit" per searchable piece (lesson section, exam tip, glossary term, video chapter, question, card).
   - search(): units whose words start with every query word; phrase matches and titles rank first.
   - concept(): everything about one term (definition, where it is taught, where it is said in a video, traps, questions,
     cards) plus a small graph: the term in the centre, the topics that use it, and the glossary terms that appear next to it. */
(function () {
  'use strict';
  var STOP = { a: 1, an: 1, the: 1, of: 1, to: 1, in: 1, on: 1, for: 1, and: 1, or: 1, is: 1, it: 1, by: 1, with: 1, at: 1, as: 1, be: 1, do: 1, how: 1, what: 1, when: 1, which: 1 };
  function norm(s) { s = String(s || '').toLowerCase(); if (s.normalize) s = s.normalize('NFD').replace(/[̀-ͯ]/g, ''); return s; }
  function words(s) { return norm(s).match(/[a-z0-9]+/g) || []; }
  function qwords(q) { return words(q).filter(function (w) { return w.length > 1 && !STOP[w]; }); }
  // phrase match on word boundaries over normalised text with single spaces
  function flat(s) { return ' ' + words(s).join(' ') + ' '; }
  function hasPhrase(ft, fq) { return fq.length > 2 && ft.indexOf(fq) > -1; }
  function snippet(text, q, len) {
    var t = String(text || '').replace(/\s+/g, ' ').trim(), n = norm(t), w = qwords(q), i = -1;
    for (var k = 0; k < w.length && i < 0; k++) i = n.indexOf(w[k]);
    len = len || 160; if (t.length <= len) return t;
    var a = Math.max(0, i - 50), b = Math.min(t.length, a + len);
    return (a > 0 ? '…' : '') + t.slice(a, b).trim() + (b < t.length ? '…' : '');
  }
  var KIND_W = { term: 6, section: 4, tip: 4, chapter: 3, question: 2, card: 2, intro: 2, example: 1 };

  function index(d) {
    var units = [], terms = {}, topics = d.topics || [], byTopic = {};
    function add(u) { u.f = flat(u.title + ' ' + u.text); u.w = words(u.title + ' ' + u.text); units.push(u); return u; }
    topics.forEach(function (t) {
      var th = t.theory || {}; byTopic[t.id] = t;
      if (th.intro) add({ kind: 'intro', topic: t.id, title: t.title, text: th.intro });
      (th.sections || []).forEach(function (s, i) { add({ kind: 'section', topic: t.id, sec: i, title: s.heading, text: s.body || '' }); });
      (th.examTips || []).forEach(function (s, i) { add({ kind: 'tip', topic: t.id, tip: i, title: t.title, text: s }); });
      if (th.example) add({ kind: 'example', topic: t.id, title: t.title, text: th.example });
      (th.glossary || []).forEach(function (g) {
        add({ kind: 'term', topic: t.id, title: g.term, text: g.def });
        var k = flat(g.term).trim(); if (!k) return;
        if (!terms[k]) terms[k] = { term: g.term, def: g.def, topics: [] };
        if (terms[k].topics.indexOf(t.id) < 0) terms[k].topics.push(t.id);
      });
    });
    // video chapters: the captions said during each scene, with the start time of the first matching cue found later
    Object.keys(d.video || {}).forEach(function (id) {
      var v = d.video[id], t = byTopic[id]; if (!t || !v || !v.cues) return;
      var sc = (v.scenes || [{ start: 0 }]).map(function (s) { return s.start; });
      sc.forEach(function (s0, i) {
        var s1 = i + 1 < sc.length ? sc[i + 1] : 1e9, cues = v.cues.filter(function (c) { return c[0] >= s0 && c[0] < s1; });
        if (!cues.length) return;
        var title = (t.scenes && t.scenes[i] && t.scenes[i].title) || ('Chapter ' + (i + 1));
        add({ kind: 'chapter', topic: id, scene: i, start: s0, cues: cues, title: title, text: cues.map(function (c) { return c[2]; }).join(' ') });
      });
    });
    (d.questions || []).forEach(function (q) { add({ kind: 'question', id: q.id, skill: q.skill, title: q.stem, text: (q.options || []).join(' ') + ' ' + (q.explanation || '') }); });
    (d.cards || []).forEach(function (c) { add({ kind: 'card', id: c.id, skill: c.skill, title: c.front, text: c.back }); });
    var ctxU = units.filter(function (u) { return u.kind === 'section' || u.kind === 'tip' || u.kind === 'chapter' || u.kind === 'intro'; });
    var tlist = Object.keys(terms).map(function (k) { var x = terms[k]; x.f = ' ' + k + ' '; x.df = ctxU.filter(function (u) { return hasPhrase(u.f, x.f); }).length; return x; });
    // generic terms (in many places) say little about a neighbourhood: weight co-occurrence by inverse frequency
    tlist.forEach(function (x) { x.idf = Math.log((ctxU.length + 1) / (x.df + 1)); });
    return { units: units, terms: tlist, topics: byTopic, skills: (d.meta && d.meta.skills) || [] };
  }

  function search(ix, q, limit) {
    var w = qwords(q), fq = flat(q); if (!w.length) return [];
    var out = [];
    ix.units.forEach(function (u) {
      var all = w.every(function (x) { for (var i = 0; i < u.w.length; i++) if (u.w[i].lastIndexOf(x, 0) === 0) return true; return false; });
      if (!all) return;
      var s = KIND_W[u.kind] || 1;
      if (hasPhrase(u.f, fq)) s += 6;
      if (hasPhrase(flat(u.title), fq)) s += 8;
      if (u.kind === 'term' && flat(u.title).trim() === fq.trim()) s += 20;
      out.push({ u: u, s: s });
    });
    out.sort(function (a, b) { return b.s - a.s; });
    return out.slice(0, limit || 60).map(function (x) { return x.u; });
  }

  // Everything about one term, and its neighbourhood.
  function concept(ix, q) {
    var fq = flat(q), key = fq.trim(); if (!key) return null;
    var hits = ix.units.filter(function (u) { return hasPhrase(u.f, fq); });
    if (!hits.length) { var w = qwords(q); hits = w.length ? search(ix, q, 40) : []; }
    if (!hits.length) return null;
    var term = null; ix.terms.forEach(function (t) { if (t.f.trim() === key) term = t; });
    var pick = function (k) { return hits.filter(function (u) { return u.kind === k; }); };
    var sections = pick('section'), tips = pick('tip'), chapters = pick('chapter'), questions = pick('question'), cards = pick('card');
    var def = term ? term.def : '';
    if (!def) { var s0 = sections[0] || pick('intro')[0]; if (s0) { var sent = String(s0.text).split(/(?<=[.!?])\s+/).filter(function (x) { return hasPhrase(flat(x), fq); })[0]; def = sent || ''; } }
    // chapters: the exact second where the term is said
    chapters = chapters.map(function (c) { var at = c.start; for (var i = 0; i < c.cues.length; i++) if (hasPhrase(flat(c.cues[i][2]), fq)) { at = c.cues[i][0]; break; } return { u: c, at: at }; });
    // topics that use the term, weighted by how many places mention it
    var tw = {}; hits.forEach(function (u) { if (u.topic) tw[u.topic] = (tw[u.topic] || 0) + (u.kind === 'section' ? 2 : 1); });
    if (term) term.topics.forEach(function (id) { tw[id] = (tw[id] || 0) + 2; });
    var topics = Object.keys(tw).sort(function (a, b) { return tw[b] - tw[a]; }).map(function (id) { return { id: id, w: tw[id], t: ix.topics[id] }; }).filter(function (x) { return x.t; });
    // related terms: glossary terms that appear in the same lesson sections, tips and chapters
    var ctx = hits.filter(function (u) { return u.kind === 'section' || u.kind === 'tip' || u.kind === 'chapter' || u.kind === 'intro'; }), rel = [];
    ix.terms.forEach(function (t) {
      if (t.f.trim() === key || t.f.indexOf(fq) > -1 || fq.indexOf(t.f) > -1) return;
      var n = 0, inT = {}; ctx.forEach(function (u) { if (hasPhrase(u.f, t.f)) { n++; if (u.topic) inT[u.topic] = 1; } });
      if (n) rel.push({ term: t.term, def: t.def, n: n, s: n * t.idf, topics: Object.keys(inT) });
    });
    rel = rel.filter(function (r) { return r.s > 0; }); rel.sort(function (a, b) { return b.s - a.s || a.term.length - b.term.length; });
    var T6 = topics.slice(0, 6), R8 = rel.slice(0, 8), edges = [];
    T6.forEach(function (x) { edges.push({ a: 'q', b: 't:' + x.id, w: x.w }); });
    R8.forEach(function (r) { edges.push({ a: 'q', b: 'r:' + r.term, w: r.n }); T6.forEach(function (x) { if (r.topics.indexOf(x.id) > -1) edges.push({ a: 'r:' + r.term, b: 't:' + x.id, w: 1 }); }); });
    return { q: q, term: term ? term.term : q, def: def, sections: sections, tips: tips, chapters: chapters, questions: questions, cards: cards, topics: topics, related: rel,
      map: { center: term ? term.term : q, topics: T6, related: R8, edges: edges } };
  }

  /* ───────── UI (DOM). api = { h, icon, fmtTime, ix, state:{q, term}, set(state), openSection(topicId, i), playAt(topicId, sec),
     practice(questionIds, title), cards(cardIds), topicTitle(id) } ───────── */
  var NS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs, kids) { var e = document.createElementNS(NS, tag); Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); }); (kids || []).forEach(function (c) { if (c) e.appendChild(c); }); return e; }
  function clip(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1).trim() + '…' : s; }

  // Connection map: topics on the left, the concept in the centre, related concepts on the right. Lines: concept–topic (weight),
  // concept–related, and faint related–topic links (where they meet). Hover / focus a node: its links light up. Click: navigate.
  function mapView(api, c) {
    var h = api.h, M = c.map, L = M.topics.length, R = M.related.length, rows = Math.max(L, R, 1), RH = 46, W = 720, H = Math.max(rows * RH + 24, 150);
    var xL = 12, wL = 230, xR = W - 12 - 210, wR = 210, cx = W / 2, cy = H / 2, cw = Math.min(200, 26 + M.center.length * 9);
    var yOf = function (i, n) { var top = (H - n * RH) / 2; return top + i * RH + RH / 2; };
    var pos = { q: { x: cx, y: cy, l: cx - cw / 2, r: cx + cw / 2 } };
    M.topics.forEach(function (x, i) { pos['t:' + x.id] = { x: xL + wL, y: yOf(i, L), l: xL, r: xL + wL }; });
    M.related.forEach(function (r, i) { pos['r:' + r.term] = { x: xR, y: yOf(i, R), l: xR, r: xR + wR }; });
    var maxW = 1; M.edges.forEach(function (e) { if (e.a === 'q') maxW = Math.max(maxW, e.w); });
    var gE = svg('g', { 'class': 'mx-edges' }), gN = svg('g', { 'class': 'mx-nodes' });
    M.edges.forEach(function (e, k) {
      var A = pos[e.a], B = pos[e.b]; if (!A || !B) return;
      var faint = e.a !== 'q', x1, x2;
      if (faint) { x1 = A.l; x2 = B.r; } else if (e.b.charAt(0) === 't') { x1 = A.l; x2 = B.r; } else { x1 = A.r; x2 = B.l; }
      var mx = (x1 + x2) / 2, d = 'M' + x1 + ',' + A.y + ' C' + mx + ',' + A.y + ' ' + mx + ',' + B.y + ' ' + x2 + ',' + B.y;
      gE.appendChild(svg('path', { d: d, 'class': 'mx-e' + (faint ? ' faint' : ''), 'data-a': e.a, 'data-b': e.b, style: '--i:' + k + ';stroke-width:' + (faint ? 1 : (1 + 2 * e.w / maxW).toFixed(2)) }));
    });
    function node(key, label, sub, cls, onAct, i) {
      var p = pos[key], w = p.r - p.l, g = svg('g', { 'class': 'mx-n ' + cls, 'data-k': key, tabindex: '0', role: 'button', 'aria-label': label + (sub ? ', ' + sub : ''), style: '--i:' + i, transform: 'translate(' + p.l + ',' + (p.y - 17) + ')' });
      g.appendChild(svg('rect', { width: w, height: 34, rx: 9 }));
      var t = svg('text', { x: cls === 'center' ? w / 2 : 12, y: 21, 'text-anchor': cls === 'center' ? 'middle' : 'start' }); t.textContent = clip(label, cls === 'center' ? 22 : 26); g.appendChild(t);
      if (sub) { var s = svg('text', { x: w - 10, y: 21, 'text-anchor': 'end', 'class': 'mx-sub' }); s.textContent = sub; g.appendChild(s); }
      var hot = function (on) { root.classList.toggle('hot', on); [].forEach.call(gE.childNodes, function (e) { var m = e.getAttribute('data-a') === key || e.getAttribute('data-b') === key; e.classList.toggle('on', on && m); }); g.classList.toggle('on', on); };
      g.addEventListener('mouseenter', function () { hot(true); }); g.addEventListener('mouseleave', function () { hot(false); });
      g.addEventListener('focus', function () { hot(true); }); g.addEventListener('blur', function () { hot(false); });
      g.addEventListener('click', onAct); g.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onAct(); } });
      gN.appendChild(g);
    }
    node('q', M.center, '', 'center', function () {}, 0);
    M.topics.forEach(function (x, i) { node('t:' + x.id, x.t.title, x.id, 'topic', function () { api.openSection(x.id, -1); }, i + 1); });
    M.related.forEach(function (r, i) { node('r:' + r.term, r.term, '', 'rel', function () { api.set({ q: r.term, term: r.term }); }, i + 1); });
    var root = svg('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'mx-svg', role: 'group', 'aria-label': 'Connections of ' + M.center }, [gE, gN]);
    // narrow screens: the same information as two short lists
    var lists = h('div', { 'class': 'mx-lists' },
      M.topics.length ? h('div', {}, h('p', { 'class': 'mx-h', text: 'Taught in' }), h('div', { 'class': 'mx-chips' }, M.topics.map(function (x) { return h('button', { 'class': 'chip', type: 'button', onclick: function () { api.openSection(x.id, -1); } }, h('b', { text: x.id }), ' ' + clip(x.t.title, 34)); }))) : null,
      M.related.length ? h('div', {}, h('p', { 'class': 'mx-h', text: 'Connected concepts' }), h('div', { 'class': 'mx-chips' }, M.related.map(function (r) { return h('button', { 'class': 'chip', type: 'button', onclick: function () { api.set({ q: r.term, term: r.term }); } }, r.term); }))) : null);
    var box = h('figure', { 'class': 'fx mx' }, h('div', { 'class': 'fx-card' }, root, lists), h('figcaption', { 'class': 'fx-cap', text: 'Left: the lessons that teach it. Right: concepts that appear next to it. Select one to follow the thread.' }));
    if (api.watch) api.watch(box);
    return box;
  }

  function conceptView(api, c) {
    var h = api.h, root = h('div', { 'class': 'sx-concept' });
    root.appendChild(h('header', { 'class': 'hd' }, h('h1', { text: c.term }), c.def ? h('p', { 'class': 'lead', text: c.def }) : null));
    if (c.map.topics.length || c.map.related.length) root.appendChild(mapView(api, c));
    var put = function (x) { if (x) root.appendChild(x); };   // a section with nothing in it is null
    var sec = function (title, n, kids) { return n ? h('section', { 'class': 'sx-sec' }, h('h2', {}, title, h('span', { 'class': 'sx-n', text: String(n) })), kids) : null; };
    var seen = {};
    put(sec('Where it is taught', c.sections.length, h('ul', { 'class': 'sx-list' }, c.sections.slice(0, 8).map(function (u) {
      return h('li', {}, h('button', { 'class': 'sx-row', type: 'button', onclick: function () { api.openSection(u.topic, u.sec); } }, h('span', { 'class': 'sx-k', text: u.topic }), h('span', { 'class': 'sx-t' }, h('b', { text: u.title }), h('span', { 'class': 'sx-s', text: snippet(u.text, c.q, 150) }))));
    }))));
    put(sec('Where it is said in a video', c.chapters.length, h('ul', { 'class': 'sx-list' }, c.chapters.filter(function (x) { var k = x.u.topic + x.u.scene; if (seen[k]) return false; seen[k] = 1; return true; }).slice(0, 8).map(function (x) {
      return h('li', {}, h('button', { 'class': 'sx-row', type: 'button', onclick: function () { api.playAt(x.u.topic, x.at); } }, h('span', { 'class': 'sx-k play' }, api.icon('M8 5v14l11-7z', '14'), api.fmtTime(x.at)), h('span', { 'class': 'sx-t' }, h('b', { text: x.u.title }), h('span', { 'class': 'sx-s', text: api.topicTitle(x.u.topic) }))));
    }))));
    put(sec('Exam traps', c.tips.length, h('ul', { 'class': 'sx-tips' }, c.tips.slice(0, 6).map(function (u) { return h('li', {}, h('span', { 'class': 'sx-k', text: u.topic }), h('span', { text: u.text })); }))));
    var qn = c.questions.length, cn = c.cards.length;
    if (qn || cn) root.appendChild(h('section', { 'class': 'sx-sec' }, h('h2', { text: 'Test yourself' }), h('div', { 'class': 'sx-acts' },
      qn ? h('button', { 'class': 'btn primary', type: 'button', onclick: function () { api.practice(c.questions.slice(0, 10).map(function (u) { return u.id; }), c.term); } }, 'Practice ' + Math.min(10, qn) + (Math.min(10, qn) === 1 ? ' question' : ' questions')) : null,
      cn ? h('button', { 'class': 'btn', type: 'button', onclick: function () { api.cards(c.cards.map(function (u) { return u.id; })); } }, 'Review ' + cn + (cn === 1 ? ' card' : ' cards')) : null)));
    return root;
  }

  function view(api) {
    var h = api.h, st = api.state || {}, root = h('div', { 'class': 'sx' });
    var inp = h('input', { type: 'search', 'class': 'sx-in', id: 'sx-in', placeholder: 'Search a concept, a setting, a class…', value: st.q || '', 'aria-label': 'Search the course', autocomplete: 'off' });
    var list = h('div', { 'class': 'sx-results', 'aria-live': 'polite' }), timer = null;
    function results(q) {
      list.innerHTML = '';
      var w = qwords(q); if (!w.length) { list.appendChild(h('p', { 'class': 'muted sx-hint', text: 'Type a word from the course: a stage, a setting, a class name, an error code.' })); return; }
      var hits = search(api.ix, q, 80), fq = flat(q).trim();
      var terms = api.ix.terms.filter(function (t) { return w.every(function (x) { return t.f.indexOf(' ' + x) > -1; }); }).slice(0, 6);
      if (!terms.some(function (t) { return t.f.trim() === fq; }) && hits.length) terms.unshift({ term: q.trim(), def: '' });
      if (!hits.length && !terms.length) { list.appendChild(h('p', { 'class': 'muted sx-hint', text: 'Nothing found for “' + q.trim() + '”. Try a shorter word.' })); return; }
      list.appendChild(h('ul', { 'class': 'sx-list' }, terms.map(function (t) {
        return h('li', {}, h('button', { 'class': 'sx-row concept', type: 'button', onclick: function () { api.set({ q: t.term, term: t.term }); } }, h('span', { 'class': 'sx-k', text: 'Concept' }), h('span', { 'class': 'sx-t' }, h('b', { text: t.term }), t.def ? h('span', { 'class': 'sx-s', text: clip(t.def, 120) }) : h('span', { 'class': 'sx-s', text: 'See everything about it, and what it connects to' }))));
      })));
      var secs = hits.filter(function (u) { return u.kind === 'section'; }).slice(0, 6);
      if (secs.length) list.appendChild(h('section', { 'class': 'sx-sec' }, h('h2', { text: 'In the lessons' }), h('ul', { 'class': 'sx-list' }, secs.map(function (u) {
        return h('li', {}, h('button', { 'class': 'sx-row', type: 'button', onclick: function () { api.openSection(u.topic, u.sec); } }, h('span', { 'class': 'sx-k', text: u.topic }), h('span', { 'class': 'sx-t' }, h('b', { text: u.title }), h('span', { 'class': 'sx-s', text: snippet(u.text, q, 140) }))));
      }))));
    }
    inp.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { st.q = inp.value; st.term = null; results(inp.value); }, 120); });
    inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && inp.value.trim()) { ev.preventDefault(); api.set({ q: inp.value.trim(), term: inp.value.trim() }); } });
    root.appendChild(h('div', { 'class': 'sx-bar' }, api.icon('M10.5 4a6.5 6.5 0 015.2 10.4l4.4 4.4-1.4 1.4-4.4-4.4A6.5 6.5 0 1110.5 4zm0 2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z', '20'), inp));
    if (st.term) {
      var c = concept(api.ix, st.term);
      root.appendChild(c ? conceptView(api, c) : h('p', { 'class': 'muted sx-hint', text: 'Nothing found for “' + st.term + '”.' }));
    } else { root.appendChild(list); results(st.q || ''); }
    return { el: root, input: inp };
  }

  window.TALLER_SEARCH = { index: index, search: search, concept: concept, snippet: snippet, norm: norm, view: view };
})();
