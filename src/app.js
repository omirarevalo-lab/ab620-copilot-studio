/* AB-620 Workshop — study center: Today · Learn · Exam · Progress (+ Settings).
   Curso por temas con modo video (voz del navegador o mp3), comprobación, práctica de examen y repaso. */
(function () {
  'use strict';

  // The active certification comes from src/cert.js (window.TALLER); without it (logic tests) the app is AB-620. cert === null: nothing chosen yet, the picker shows.
  var TALLER = window.TALLER || { cert: 'ab620', certs: [], choose: function () { return false; } };
  var CERT = TALLER.cert;
  var META = window.AB620_META || { defaults: { examDate: '2026-12-02' }, domains: [], groups: [], skills: [] };
  var PLAN = META;
  // Exam-specific text and question splits come from the exam's meta.js.
  var EXAM = META.exam || { code: '', title: '', app: 'Exam Workshop', subject: 'the exam topics' };
  var QUESTIONS = Array.isArray(window.AB620_QUESTIONS) ? window.AB620_QUESTIONS : [];
  var CARDS = Array.isArray(window.AB620_CARDS) ? window.AB620_CARDS : [];
  var DAY = 86400000;
  var HAS_DOM = typeof document !== 'undefined';

  /* ───────── utilidades ───────── */
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseISO(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function todayISO() { return iso(new Date()); }
  function daysBetween(a, b) { return Math.round((b - a) / DAY); }
  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(s) { var d = typeof s === 'string' ? parseISO(s) : s; return d ? DOW[d.getDay()] + ', ' + MES[d.getMonth()] + ' ' + d.getDate() : ''; }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }
  function jparse(s, d) { try { var v = JSON.parse(s); return v == null ? d : v; } catch (e) { return d; } }
  function byId(list) { var m = {}; list.forEach(function (x) { m[x.id] = x; }); return m; }
  function norm(s) { s = String(s || '').toLowerCase(); return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function words(s) { var m = String(s || '').trim().match(/\S+/g); return m ? m.length : 0; }

  /* ───────── curso ───────── */
  var COURSE_RAW = Array.isArray(window.AB620_COURSE) ? window.AB620_COURSE : [];
  var TOPICS = COURSE_RAW.map(function (t, i) { return { t: t, i: i }; })
    .sort(function (a, b) { return (a.t.module - b.t.module) || (a.i - b.i); }).map(function (x) { return x.t; });
  var TBYID = byId(TOPICS);
  var DEFAULT_MODULES = ['Fundamentals', 'Plan the solution', 'Advanced topics', 'Agent flows', 'Knowledge and tools', 'MCP and multi-agent', 'Azure and monitoring', 'Evaluation and ALM'];
  var MODULES = (Array.isArray(window.AB620_MODULES) && window.AB620_MODULES.length ? window.AB620_MODULES : uniq(TOPICS.map(function (t) { return t.module; })).map(function (n) { return { n: n, title: DEFAULT_MODULES[n] || 'Module ' + n }; }))
    .slice().sort(function (a, b) { return a.n - b.n; });
  function modTopics(n) { return TOPICS.filter(function (t) { return t.module === n; }); }
  function modTitle(n) { for (var i = 0; i < MODULES.length; i++) if (MODULES[i].n === n) return MODULES[i].title; return 'Module ' + n; }

  var SKILL = byId(PLAN.skills), DOM = byId(PLAN.domains);
  var QBYSKILL = {}, QBYDOM = {}, QBYID = byId(QUESTIONS);
  QUESTIONS.forEach(function (q) { (QBYSKILL[q.skill] = QBYSKILL[q.skill] || []).push(q); (QBYDOM[q.domain] = QBYDOM[q.domain] || []).push(q); });
  var CBYID = byId(CARDS);

  /* ───────── puntuación y estadísticas ───────── */
  function qAcc(st) { var h = st && st.h; if (!h) return null; var c = 0; for (var i = 0; i < h.length; i++) if (h[i] === '1') c++; return c / h.length; }
  function groupAcc(list, stats) {
    var sum = 0, n = 0;
    (list || []).forEach(function (q) { var a = qAcc(stats[q.id]); if (a != null) { sum += a; n++; } });
    return { acc: n ? sum / n : null, n: n, total: (list || []).length };
  }
  // Estimate only when enough of the course has been practiced: >= 30 % of the skills with >= 3 answers (bank questions only, not topic checks).
  // Then the accuracy is weighted by that coverage: skills without data count as a 30 % guess, so a few lessons cannot give a pass-level score.
  var EST_MIN_COVER = 0.3, EST_MIN_ANS = 3, EST_GUESS = 0.3;
  function skillCoverage(stats) {
    var covered = 0, total = PLAN.skills.length;
    PLAN.skills.forEach(function (sk) { var n = 0; (QBYSKILL[sk.id] || []).forEach(function (q) { var st = stats[q.id]; if (st) n += st.seen || 0; }); if (n >= EST_MIN_ANS) covered++; });
    return { covered: covered, total: total, cover: total ? covered / total : 0 };
  }
  function projectedFrom(stats) {
    var sw = 0, s = 0, have = 0;
    PLAN.domains.forEach(function (dm) {
      var m = (dm.weight[0] + dm.weight[1]) / 2, a = groupAcc(QBYDOM[dm.id], stats);
      if (a.acc != null) { s += m * a.acc; sw += m; have++; }
    });
    if (!sw) return null;
    var acc = s / sw, cv = skillCoverage(stats), enough = cv.cover >= EST_MIN_COVER, eff = clamp(acc, 0, 1) * cv.cover + EST_GUESS * (1 - cv.cover);
    return { score: enough ? Math.round(eff * 1000) : null, enough: enough, acc: acc, have: have, partial: have < PLAN.domains.length, cover: cv.cover, covered: cv.covered, skillTotal: cv.total, needSkills: Math.ceil(EST_MIN_COVER * cv.total) };
  }
  // sure: true = "Sure", false = "Not sure", undefined = no confidence asked (exam modes, old data).
  // Per question: sn/so = Sure answered/correct, un/uo = Not sure answered/correct. hc = 1: wrong while Sure (hypercorrection flag).
  // Start of the local calendar day n days after `now`: "tomorrow" means the next calendar day, not 24 hours later.
  function dayStart(now, n) { var d = new Date(now); return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n).getTime(); }
  function recordInto(stats, q, ok, force, sure) {
    var now = Date.now(), st = stats[q.id] || (stats[q.id] = { seen: 0, correct: 0, h: '' });
    var INT = [1, 3, 7];
    st.seen++; if (ok) st.correct++;
    if (sure === true || sure === false) { var k = sure ? 's' : 'u'; st[k + 'n'] = (st[k + 'n'] || 0) + 1; if (ok) st[k + 'o'] = (st[k + 'o'] || 0) + 1; }
    if (ok) delete st.hc; else if (sure === true) st.hc = 1;
    st.h = (st.h + (ok ? '1' : '0')).slice(-3);
    if (!ok) { st.lastWrongAt = now; st.box = 1; st.nextAt = dayStart(now, INT[0]); }
    else if (st.box && (force || now >= (st.nextAt || 0))) {
      if (st.box >= 3) { st.box = 0; delete st.nextAt; } else { st.box++; st.nextAt = dayStart(now, INT[st.box - 1]); }
    }
    return st;
  }

  /* ───────── selección de preguntas ───────── */
  function rank(qs, stats) {
    return qs.map(function (q) { var a = qAcc(stats[q.id]); return { q: q, k: (a == null ? 0.45 : a) + Math.random() * 0.35 }; })
      .sort(function (x, y) { return x.k - y.k; }).map(function (x) { return x.q; });
  }
  function pickN(pool, n, stats) { return rank(uniq(pool), stats).slice(0, n); }
  function skillPool(skills) { var pool = []; (skills || []).forEach(function (s) { pool = pool.concat(QBYSKILL[s] || []); }); return uniq(pool); }
  function pickSkills(skills, n, stats) {
    var out = pickN(skillPool(skills), n, stats);
    if (out.length < n) {
      var grp = uniq(skills.map(function (s) { return s.slice(0, 3); }));
      var more = QUESTIONS.filter(function (q) { return grp.indexOf(q.skill.slice(0, 3)) > -1 && out.indexOf(q) < 0; });
      out = out.concat(pickN(more, n - out.length, stats));
    }
    if (out.length < n) out = out.concat(pickN(QUESTIONS.filter(function (q) { return out.indexOf(q) < 0; }), n - out.length, stats));
    return out;
  }
  function pickMixed(skills, n, stats) {
    var sk = shuffle(skills.filter(function (s) { return (QBYSKILL[s] || []).length; })), out = [], pools = {};
    sk.forEach(function (s) { pools[s] = rank(QBYSKILL[s], stats); });
    var guard = 0;
    while (out.length < n && guard++ < 500) {
      var any = false;
      for (var i = 0; i < sk.length && out.length < n; i++) { var p = pools[sk[i]]; if (p.length) { out.push(p.shift()); any = true; } }
      if (!any) break;
    }
    return out;
  }
  // skillsOk (optional): only questions of those skills (a map skill -> 1); fewer than the total if the pool is small.
  function pickSplit(split, stats, skillsOk) {
    var out = [], total = 0, ok = function (q) { return !skillsOk || skillsOk[q.skill]; };
    Object.keys(split).forEach(function (d) { total += split[d]; out = out.concat(pickN((QBYDOM[d] || []).filter(ok), split[d], stats)); });
    if (out.length < total) out = out.concat(pickN(QUESTIONS.filter(function (q) { return ok(q) && out.indexOf(q) < 0; }), total - out.length, stats));
    return shuffle(out);
  }
  // Questions per domain for the mock exam ('mock') and the short sets ('short': diagnostic, mixed review). From META.splits; without it, proportional to the domain weights (50 / 20 questions).
  function examSplit(kind) {
    var s = META.splits && META.splits[kind];
    if (s && typeof s === 'object' && Object.keys(s).length) return s;
    var total = kind === 'mock' ? 50 : 20, ds = PLAN.domains || [], out = {}, left = total, sumW = 0, fr = [];
    ds.forEach(function (d) { sumW += (d.weight[0] + d.weight[1]) / 2; });
    ds.forEach(function (d) { var x = sumW ? total * ((d.weight[0] + d.weight[1]) / 2) / sumW : 0; out[d.id] = Math.floor(x); left -= out[d.id]; fr.push({ id: d.id, f: x - out[d.id] }); });
    fr.sort(function (a, b) { return b.f - a.f; });
    for (var i = 0; left > 0 && fr.length; i++, left--) out[fr[i % fr.length].id]++;
    return out;
  }
  function splitTotal(split) { var n = 0; Object.keys(split).forEach(function (d) { n += split[d]; }); return n; }
  // Per-certification storage: AB-620 keeps its original keys and doc ids (existing learners keep everything); other exams get their own.
  function storagePrefix(id) { return (id && id !== 'ab620' ? id : 'ab620') + '.v1.'; }
  function docKey(id, n) { return id && id !== 'ab620' ? id + '-' + n : n; }   // artifact database: progress/<n> or progress/<id>-<n>
  function certCode(id) { var c = (TALLER.certs || []).filter(function (x) { return x.id === id; })[0]; return c ? c.code : String(id || '').toUpperCase(); }
  // A backup only restores into the exam it was made for (old backups have no `cert`: they are AB-620). Returns '' when it can be restored, else a plain message.
  function backupProblem(o, id) {
    if (!o || typeof o !== 'object' || o.app !== 'taller-ab620') return 'That text is not a backup from this app.';
    var from = typeof o.cert === 'string' && o.cert ? o.cert : 'ab620';
    return from === (id || 'ab620') ? '' : 'That backup belongs to ' + certCode(from) + ', not ' + certCode(id) + '. Switch to ' + certCode(from) + ' first, then restore it.';
  }
  // Questions to repeat: wrong answers that are due, flagged ones (wrong while Sure) first. Topic check questions only come back when flagged.
  function errorQueue(stats, includeFuture) {
    var now = Date.now(), due = function (s) { return includeFuture || (s.nextAt || 0) <= now; };
    var out = QUESTIONS.filter(function (q) { var s = stats[q.id]; return s && s.box > 0 && due(s); });
    Object.keys(stats).forEach(function (id) { var s = stats[id], q = id.indexOf('#c') > 0 && s && s.hc && due(s) ? qById(id) : null; if (q) out.push(q); });
    return out.sort(function (a, b) { var x = stats[a.id], y = stats[b.id]; return ((y.hc ? 1 : 0) - (x.hc ? 1 : 0)) || ((x.nextAt || 0) - (y.nextAt || 0)); });
  }
  // All flagged questions (bank + topic checks), regardless of when they are due.
  function hcList(stats) {
    var out = []; Object.keys(stats || {}).forEach(function (id) { var q = stats[id] && stats[id].hc ? qById(id) : null; if (q) out.push(q); });
    return out.sort(function (a, b) { return (stats[a.id].lastWrongAt || 0) - (stats[b.id].lastWrongAt || 0); });
  }
  // Calibration: how often you are right when you say Sure / Not sure, and how many confident mistakes are pending.
  function calibration(stats) {
    var c = { sureN: 0, sureOk: 0, unsureN: 0, unsureOk: 0, hc: hcList(stats).length };
    Object.keys(stats || {}).forEach(function (id) { var s = stats[id]; if (!s) return; c.sureN += s.sn || 0; c.sureOk += s.so || 0; c.unsureN += s.un || 0; c.unsureOk += s.uo || 0; });
    c.n = c.sureN + c.unsureN; return c;
  }
  function makeItems(qs) {
    return qs.map(function (q) { return { id: q.id, order: shuffle(q.options.map(function (_, i) { return i; })), sel: [], checked: false, flagged: false }; });
  }
  // A review item for any question: bank question or topic check question.
  function itemFor(q) {
    if (q.tid) return { k: 'c', tid: q.tid, ci: q.ci, order: shuffle(q.options.map(function (_, i) { return i; })), sel: [], checked: false };
    return makeItems([q])[0];
  }
  function isCorrect(q, sel) {
    var a = (q.answer || []).slice().sort().join(','), b = sel.slice().sort().join(',');
    return a === b;
  }

  /* Preguntas de comprobación del tema: viven en el curso, no en el banco. */
  function checkQ(topic, ci) {
    var c = topic && topic.check && topic.check[ci]; if (!c) return null;
    return { id: topic.id + '#c' + ci, tid: topic.id, ci: ci, stem: c.stem, options: c.options, answer: [c.answer], explanation: c.explanation, type: 'single' };
  }
  function makeCheckItems(topic) {
    return (topic.check || []).map(function (c, ci) { return { k: 'c', tid: topic.id, ci: ci, order: shuffle(c.options.map(function (_, i) { return i; })), sel: [], checked: false }; });
  }
  function qOf(it) { return it.k === 'c' ? checkQ(TBYID[it.tid], it.ci) : QBYID[it.id]; }
  // Any question by id: bank id, or "<topic>#c<n>" for a topic check question.
  function qById(id) { if (QBYID[id]) return QBYID[id]; var m = /^(.+)#c(\d+)$/.exec(id); return m && TBYID[m[1]] ? checkQ(TBYID[m[1]], +m[2]) : null; }

  /* ───────── tarjetas (FSRS, ts-fsrs) ───────── */
  // docs.cards[id] = { due, r, last_review (YYYY-MM-DD), stability, difficulty, elapsed_days, scheduled_days, learning_steps, reps, lapses, state }.
  // Old Leitner entries { box, due, r } are converted by migrateCard (same due date).
  var BOX_INT = [0, 1, 3, 7, 14];   // Leitner intervals: only used to migrate old cards
  var RATINGS = { again: 1, hard: 2, good: 3, easy: 4, no: 1, ok: 3 };
  function cardDue(c, state, today) { var s = state[c.id]; return !s || (s.due || '') <= today; }
  function noon(iso0) { var d = parseISO(iso0); return d ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12) : null; }
  // Leitner { box, due, r } -> FSRS Review card with the same due date; FSRS cards come back unchanged.
  function migrateCard(s) {
    if (!s || typeof s !== 'object' || s.stability != null || !s.box) return s;
    var box = Math.max(1, Math.min(5, Math.round(+s.box) || 1)), ivl = BOX_INT[box - 1];
    var o = { due: s.due, r: s.r, stability: Math.max(1, ivl), difficulty: 5, elapsed_days: 0, scheduled_days: ivl, learning_steps: 0, reps: box, lapses: 0, state: 2 };
    var lr = parseISO(s.r) ? s.r : parseISO(s.due) ? iso(addDays(parseISO(s.due), -ivl)) : null;
    if (lr) o.last_review = lr;
    return o;
  }
  // Rate a card (grade: again | hard | good | easy; old 'no' / 'ok' still work). examISO: no card is scheduled after the exam (only while the exam is still ahead). opt.fuzz: false for deterministic tests.
  function gradeCard(s, grade, today, examISO, opt) {
    var now = noon(today), rating = RATINGS[grade] || 3;
    var exam = parseISO(examISO), left = exam ? daysBetween(parseISO(today), exam) : 0, maxIv = left >= 1 ? left : null;   // no exam date, today or in the past: no cap (FSRS default maximum)
    var f = new FSRS.FSRS(FSRS.generatorParameters(Object.assign({ request_retention: 0.9, enable_fuzz: !(opt && opt.fuzz === false), enable_short_term: false }, maxIv ? { maximum_interval: maxIv } : {})));
    s = migrateCard(s);
    var card;
    if (s && s.stability != null && s.state) {
      card = { due: noon(s.due) || now, stability: +s.stability || 1, difficulty: +s.difficulty || 5, elapsed_days: s.elapsed_days || 0, scheduled_days: s.scheduled_days || 0, learning_steps: s.learning_steps || 0, reps: s.reps || 0, lapses: s.lapses || 0, state: s.state, last_review: noon(s.last_review) || undefined };
      if (card.last_review && card.last_review > now) card.last_review = now;   // clock went back: never a negative elapsed time
    } else card = FSRS.createEmptyCard(now);
    var c = f.next(card, now, rating).card, days = Math.max(1, c.scheduled_days || 1);
    if (maxIv) days = Math.min(days, maxIv);   // ts-fsrs may overshoot the maximum by a day when it separates Hard / Good / Easy
    return { due: iso(addDays(parseISO(today), days)), r: today, last_review: today, stability: c.stability, difficulty: c.difficulty, elapsed_days: c.elapsed_days, scheduled_days: days, learning_steps: c.learning_steps, reps: c.reps, lapses: c.lapses, state: c.state };
  }

  /* ───────── plan: the next lesson, any day of the week ───────── */
  function nextTopic(done) { for (var i = 0; i < TOPICS.length; i++) if (!done || !done[TOPICS[i].id]) return TOPICS[i]; return null; }
  // What is next: the first lesson not done yet (days you skip do not exist), or a mixed review when every lesson is done. The date is not used: every day is the same.
  function planFor(dateISO, done) { var t = nextTopic(done); return t ? { kind: 'lesson', lesson: t, topic: t } : { kind: 'review' }; }
  function countDone(done) { var n = 0; TOPICS.forEach(function (t) { if (done && done[t.id]) n++; }); return n; }
  // Studied = the video was watched (>= 90 %), the check was passed, or the lesson was completed (also old data without `watched`).
  // Merely opening a topic (sessions.seen) does not count. Returns a map topicId -> 1.
  function studiedMap(S) {
    var m = {}; S = S || {};
    TOPICS.forEach(function (t) { if ((S.watched && S.watched[t.id]) || (S.lessonsDone && S.lessonsDone[t.id]) || isPassed(S.checks && S.checks[t.id])) m[t.id] = 1; });
    return m;
  }
  function studiedSkills(studied, extra) {
    var o = {}; TOPICS.forEach(function (t) { if (studied && studied[t.id]) (t.skills || []).forEach(function (k) { o[k] = 1; }); });
    (extra || []).forEach(function (k) { o[k] = 1; }); return o;
  }
  function isStudied(id, studied) { return !!(studied && studied[id]); }
  function modSeenCount(n, studied) { return modTopics(n).filter(function (t) { return isStudied(t.id, studied); }).length; }
  function modulePool(n) { var sk = []; modTopics(n).forEach(function (t) { sk = sk.concat(t.skills || []); }); return skillPool(sk); }
  // Módulos con al menos un tema estudiado y con preguntas para practicar.
  function practicableModules(studied) {
    return MODULES.filter(function (m) { return modSeenCount(m.n, studied) > 0 && modulePool(m.n).length > 0; });
  }
  function topicAcc(t, stats) { return (t.skills || []).length ? groupAcc(skillPool(t.skills), stats) : { acc: null, n: 0 }; }
  function weakTopics(stats, k) {
    return TOPICS.map(function (t) { var a = topicAcc(t, stats); return { id: t.id, title: t.title, module: t.module, acc: a.acc, n: a.n }; })
      .filter(function (x) { return x.acc != null; }).sort(function (a, b) { return (a.acc - b.acc) || (b.n - a.n); }).slice(0, k);
  }
  // Práctica de examen de un tema: 2–3 preguntas; vacía si el tema no tiene habilidades (Módulo 0).
  // The pretest guess of a topic: a single-answer bank question of its skills, difficulty <= 2, the same one every time (never a check question, never the re-check's practice question).
  function pretestQ(t) {
    var pool = skillPool(t.skills || []).filter(function (q) { return q.type !== 'multi' && (q.answer || []).length === 1 && (q.difficulty || 3) <= 2; });
    pool.sort(function (a, b) { return ((a.difficulty || 3) - (b.difficulty || 3)) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0); });
    return pool[0] || null;
  }
  function pickTopicPractice(t, n, stats) {
    if (!(t.skills || []).length) return [];
    var pq = pretestQ(t), qs = pickSkills(t.skills, n + 1, stats).filter(function (q) { return !pq || q.id !== pq.id; });   // do not repeat the pretest guess in today's practice
    return qs.slice(0, n);
  }
  // Repaso del día: hasta 3 errores vencidos + tarjetas, n elementos en total (sin contar los re-checks). Las tarjetas son solo de temas estudiados (studied: mapa de studiedMap;
  // sin studied no se filtra) y de la clase de hoy (skills). Siempre entran hasta 3 tarjetas nuevas, tras las vencidas (la más atrasada primero): las vencidas no las dejan fuera.
  // checks (optional): topic check records; due re-checks (max 2 topics, 2 questions each) go first and do not count toward n.
  var REVIEW_MAX = 8, NEW_CARDS = 3;
  function pickReview(stats, cstate, today, skills, exclude, n, checks, studied) {
    var out = [], ex = (exclude || []).slice(), rc = checks ? pickRechecks(checks, today, stats, ex) : [];
    rc.forEach(function (r) { ex.push(r.k === 'c' ? r.tid + '#c' + r.ci : r.id); });
    n = n == null ? REVIEW_MAX : n;
    errorQueue(stats, false).filter(function (q) { return ex.indexOf(q.id) < 0; }).slice(0, Math.min(3, n)).forEach(function (q) { var r = itemFor(q); r.t = 'q'; out.push(r); });
    var sk = studied ? studiedSkills(studied, skills) : null, okSkill = function (c) { return !sk || sk[c.skill]; };
    var rel = function (c) { return (skills || []).indexOf(c.skill) > -1 ? 0 : 1; };
    var due = CARDS.filter(function (c) { return cstate[c.id] && cardDue(c, cstate, today) && okSkill(c); })
      .sort(function (a, b) { return String(cstate[a.id].due) < String(cstate[b.id].due) ? -1 : String(cstate[a.id].due) > String(cstate[b.id].due) ? 1 : 0; });
    var fresh = shuffle(CARDS.filter(function (c) { return !cstate[c.id] && okSkill(c); })).sort(function (a, b) { return rel(a) - rel(b); });
    var room = Math.max(0, n - out.length), nNew = Math.min(NEW_CARDS, fresh.length, room);
    due.slice(0, room - nNew).concat(fresh.slice(0, nNew)).forEach(function (c) { out.push({ t: 'c', id: c.id, shown: false }); });
    return rc.concat(out);
  }
  // Glosario agregado de todo el curso (sin duplicar términos).
  function allGlossary() {
    var seen = {}, out = [];
    TOPICS.forEach(function (t) {
      ((t.theory && t.theory.glossary) || []).forEach(function (g) {
        var k = norm(g.term); if (!g.term || seen[k]) return; seen[k] = 1; out.push({ term: g.term, def: g.def, tid: t.id });
      });
    });
    return out.sort(function (a, b) { return a.term.localeCompare(b.term, 'en-US', { sensitivity: 'base' }); });
  }
  function searchGlossary(list, q) { var n = norm(q).trim(); if (!n) return list; return list.filter(function (g) { return norm(g.term).indexOf(n) > -1 || norm(g.def).indexOf(n) > -1; }); }
  // Player helpers (pure). Scenes carry {start} in seconds.
  function fmtTime(s) { s = Math.max(0, Math.floor(+s || 0)); var hh = Math.floor(s / 3600), mm = Math.floor(s % 3600 / 60); return (hh ? hh + ':' + pad(mm) : '' + mm) + ':' + pad(s % 60); }
  function sceneAtTime(scenes, t) { var i = 0; for (var k = 0; k < (scenes || []).length; k++) if ((+scenes[k].start || 0) <= t) i = k; return i; }
  function isWatched(pos, dur) { return dur > 0 && pos >= dur * 0.9; }
  function resumePos(pos, dur) { pos = +pos || 0; return pos >= 1 && dur > 0 && pos < dur - 5 ? pos : 0; }
  // Chapter to jump to: next = i+1; previous = start of the current chapter, or the one before it if we are already near its start.
  function chapterTarget(scenes, t, dir) { var i = sceneAtTime(scenes, t), n = (scenes || []).length; if (!n) return 0; if (dir > 0) return Math.min(n - 1, i + 1); return t - (+scenes[i].start || 0) > 3 ? i : Math.max(0, i - 1); }
  // Passed = all check questions right. Mastered = passed AND a re-check (1 check + 1 practice question) answered right at least 1 day later.
  // A record is { ok, n, at } plus, once passed: due (ISO day the re-check opens) until m = 1 (mastered). Passed records without `due` or `m` are old data: they stay Mastered.
  function isPassed(rec) { return !!(rec && rec.n > 0 && rec.ok >= rec.n); }
  function isMastered(rec) { return isPassed(rec) && (!!rec.m || rec.due == null); }
  function recheckDue(rec, today) { return isPassed(rec) && !isMastered(rec) && String(rec.due) <= today; }
  function passRec(ok, n, today) { var r = { ok: ok, n: n, at: Date.now() }; if (n > 0 && ok >= n) r.due = iso(addDays(parseISO(today), 1)); return r; }
  // Re-check result: right -> Mastered; wrong -> still Passed, next re-check in 2 days.
  function applyRecheck(rec, good, today) {
    var r = Object.assign({}, rec); if (!isPassed(r) || r.m) return r;
    if (good) { delete r.due; r.m = 1; r.mAt = Date.now(); } else r.due = iso(addDays(parseISO(today), 2));
    return r;
  }
  // The two questions of a re-check: one check question + one practice question of the topic's skills (a second check question if the topic has no skills).
  function recheckItems(t, stats, ex) {
    var n = (t.check || []).length, out = []; if (!n) return out;
    var ci = Math.floor(Math.random() * n), tag = function (q) { var r = itemFor(q); r.t = 'q'; r.rc = t.id; return r; };
    out.push(tag(checkQ(t, ci)));
    var pt = pretestQ(t), skip = (ex || []).concat(pt ? [pt.id] : []);
    var pq = pickN(skillPool(t.skills || []), 4, stats).filter(function (q) { return skip.indexOf(q.id) < 0; })[0];
    if (pq) out.push(tag(pq)); else if (n > 1) out.push(tag(checkQ(t, (ci + 1) % n)));
    return out;
  }
  // Re-checks due today, oldest first, at most 2 topics.
  function pickRechecks(checks, today, stats, exclude) {
    var due = TOPICS.filter(function (t) { return recheckDue(checks && checks[t.id], today); });
    due.sort(function (a, b) { var x = checks[a.id], y = checks[b.id]; return String(x.due) < String(y.due) ? -1 : String(x.due) > String(y.due) ? 1 : (x.at || 0) - (y.at || 0); });
    var out = []; due.slice(0, 2).forEach(function (t) { out = out.concat(recheckItems(t, stats, exclude)); });
    return out;
  }
  // Days in a row with Today's review done. A day without it breaks the streak, except today itself while it is still open.
  function reviewStreak(rev, today) {
    var keys = Object.keys(rev || {}).filter(function (k) { return rev[k] && parseISO(k); }).sort(), d = parseISO(today), n = 0;
    if (!keys.length || !d) return 0;
    var first = parseISO(keys[0]);
    for (var i = 0; i < 800 && d >= first; i++, d = addDays(d, -1)) {
      var k = iso(d);
      if (rev[k]) n++; else if (i === 0) continue; else break;
    }
    return n;
  }
  // Groups of easily confused skills: mixed practice trains telling them apart.
  // Skill ids repeat across exams, so these AB-620 groups only apply to AB-620 (another exam can define META.clusters).
  var CLUSTERS = META.clusters || (CERT === 'ab620' ? [
    { id: 'integration', title: 'Which integration?', skills: ['1.1a', '1.3f', '2.2a', '2.2b', '2.2c', '2.2d', '2.3e'] },
    { id: 'knowledge', title: 'Which knowledge source?', skills: ['1.3e', '1.3g', '2.1a', '2.1b', '2.1c', '2.4a'] },
    { id: 'building', title: 'Topic, tool, flow or prompt?', skills: ['1.2a', '1.2e', '1.3a', '1.3b', '1.3c', '1.3d', '1.3h', '2.4b'] },
    { id: 'multiagent', title: 'Which multi-agent option?', skills: ['1.1f', '2.3a', '2.3b', '2.3c', '2.3d', '2.3e'] },
    { id: 'security', title: 'Identity, security and channels', skills: ['1.1b', '1.1c', '1.1d', '1.1e', '1.1g'] },
    { id: 'flows', title: 'Flows in production', skills: ['1.2b', '1.2c', '1.2d', '1.2f', '2.4c'] },
    { id: 'alm', title: 'Test and ship (ALM)', skills: ['1.3i', '3.1a', '3.1b', '3.1c', '3.2a', '3.2b', '3.2c', '3.2d'] }
  ] : []);
  // What a cluster offers now: studied topics, their cluster skills, whether practice is open (>= 2 seen topics and >= 2 skills), and what to watch first if not.
  function clusterInfo(cl, studied) {
    var inCl = function (s) { return cl.skills.indexOf(s) > -1; };
    var ts = TOPICS.filter(function (t) { return (t.skills || []).some(inCl); }), have = [], sk = [];
    ts.forEach(function (t) { if (isStudied(t.id, studied)) { have.push(t); (t.skills || []).filter(inCl).forEach(function (s) { if (sk.indexOf(s) < 0) sk.push(s); }); } });
    var ok = have.length >= 2 && sk.length >= 2, need = Math.max(2 - have.length, 2 - sk.length, 1);
    var watch = ok ? [] : ts.filter(function (t) { return !isStudied(t.id, studied) && (t.skills || []).some(function (s) { return inCl(s) && sk.indexOf(s) < 0; }); }).slice(0, need);
    return { topics: have, skills: sk, ok: ok, watch: watch, n: Math.min(10, skillPool(sk).length) };
  }
  // The next k lessons after the one Today offers, in order (no dates: it is a sequence, not a calendar).
  function upcoming(done, k) {
    var out = [], cur = nextTopic(done), sim = Object.assign({}, done || {});
    if (!cur) return out;
    sim[cur.id] = 1;
    for (var n = 0; n < k; n++) { var t = nextTopic(sim); if (!t) break; sim[t.id] = 1; out.push({ topic: t }); }
    return out;
  }
  function estDur(scene, rate) { return Math.max(3, words(scene.say || scene.caption) / (2.6 * (rate || 1))); }
  // Best English voice: "Natural" first, then "Online", then others; locale en-US > en-GB > en-AU > en-CA > any en-*.
  function voiceScore(v) {
    var n = String(v.name || ''), l = String(v.lang || '').toLowerCase().replace('_', '-');
    if (!/^en(-|$)/.test(l)) return 999;
    var q = /natural/i.test(n) ? 0 : /online/i.test(n) ? 1 : 2, i = ['en-us', 'en-gb', 'en-au', 'en-ca'].indexOf(l);
    return q * 10 + (i > -1 ? i : 4);
  }
  function bestVoice(voices) { var best = null; (voices || []).forEach(function (v) { if (voiceScore(v) < 999 && (!best || voiceScore(v) < voiceScore(best))) best = v; }); return best; }

  var PHASES = { day: ['class', 'practice', 'review'], sat: ['practice', 'review'], cards: ['review'], practice: ['practice'] };
  var LOGIC = { studiedMap: studiedMap, studiedSkills: studiedSkills, pretestQ: pretestQ, skillCoverage: skillCoverage, upgradeVisual: upgradeVisual, nextLesson: nextTopic, nextTopic: nextTopic, planFor: planFor, countDone: countDone, weakTopics: weakTopics, pickReview: pickReview, projectedFrom: projectedFrom, recordInto: recordInto, calibration: calibration, hcList: hcList, qById: qById, itemFor: itemFor,
    pickSplit: pickSplit, pickMixed: pickMixed, pickSkills: pickSkills, isCorrect: isCorrect, gradeCard: gradeCard, migrateCard: migrateCard, groupAcc: groupAcc, errorQueue: errorQueue, makeItems: makeItems,
    makeCheckItems: makeCheckItems, qOf: qOf, checkQ: checkQ, modulePool: modulePool, practicableModules: practicableModules, modSeenCount: modSeenCount, pickTopicPractice: pickTopicPractice,
    allGlossary: allGlossary, searchGlossary: searchGlossary, fmtTime: fmtTime, sceneAtTime: sceneAtTime, isWatched: isWatched, resumePos: resumePos, chapterTarget: chapterTarget, isMastered: isMastered, isPassed: isPassed, recheckDue: recheckDue, passRec: passRec, applyRecheck: applyRecheck, recheckItems: recheckItems, pickRechecks: pickRechecks, reviewStreak: reviewStreak, clusters: CLUSTERS, clusterInfo: clusterInfo, upcoming: upcoming, estDur: estDur, bestVoice: bestVoice, repairFlow: repairFlow, mergeDoc: mergeDoc, topics: function () { return TOPICS; }, modules: function () { return MODULES; } };
  Object.assign(LOGIC, { examSplit: examSplit, splitTotal: splitTotal, storagePrefix: storagePrefix, docKey: docKey, backupProblem: backupProblem, cert: function () { return CERT; } });
  window.AB620_LOGIC = LOGIC;
  if (!HAS_DOM) return;

  /* ───────── almacenamiento: espejo local + db ───────── */
  var NAMES = ['settings', 'sessions', 'quiz', 'cards'];
  var PFX = storagePrefix(CERT);
  function defaults(n) {
    var d = { settings: { examDate: window.__PAGES ? '' : PLAN.defaults.examDate, theme: 'auto', voiceRate: 1, voiceURI: '' },
      sessions: { lessonsDone: {}, seen: {}, checks: {}, days: {}, watched: {}, pos: {}, pretest: {}, rev: {} }, quiz: { stats: {}, attempts: [] }, cards: {} }[n];
    d.updatedAt = 0; return d;
  }
  var docs = {}, dirty = {};
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  // Merge a saved doc over the defaults; old sessions docs may lack `watched` / `pos`.
  // Every known key keeps the default's shape (null / wrong type -> default); unknown keys are kept as they are.
  function sameShape(v, dv) { return Array.isArray(dv) ? Array.isArray(v) : dv && typeof dv === 'object' ? !!v && typeof v === 'object' && !Array.isArray(v) : typeof v === typeof dv && (typeof v !== 'number' || isFinite(v)); }
  function mergeDoc(n, o) {
    var def = defaults(n), d = defaults(n);
    if (n === 'cards') d = Object.assign(d, o && typeof o === 'object' && !Array.isArray(o) ? o : {});
    else if (o && typeof o === 'object' && !Array.isArray(o)) Object.keys(o).forEach(function (k) { if (!(k in def) || sameShape(o[k], def[k])) d[k] = o[k]; });
    if (typeof d.updatedAt !== 'number' || !isFinite(d.updatedAt)) d.updatedAt = 0;
    if (n === 'quiz') {
      d.attempts = d.attempts.filter(function (a) { return a && typeof a === 'object'; });
      Object.keys(d.stats).forEach(function (k) { if (!d.stats[k] || typeof d.stats[k] !== 'object') delete d.stats[k]; });
    }
    if (n === 'cards') Object.keys(d).forEach(function (k) { if (k !== 'updatedAt' && (!d[k] || typeof d[k] !== 'object')) delete d[k]; });
    return d;
  }
  NAMES.forEach(function (n) { var d = jparse(lsGet(PFX + n), null); docs[n] = d && typeof d === 'object' ? mergeDoc(n, d) : defaults(n); });
  Object.keys(docs.cards).forEach(function (k) { docs.cards[k] = migrateCard(docs.cards[k]); });   // old Leitner cards -> FSRS (same due date)
  dirty = jparse(lsGet(PFX + 'dirty'), {});

  var sync = { state: 'local', db: null, readOnly: false, timers: {}, inflight: {}, pending: {}, err: '' };
  function setChip() {
    var ok = sync.db && !sync.readOnly, cls = 'sync-chip chip ' + (sync.state === 'busy' ? 'busy' : ok ? 'ok' : 'local');
    var txt = sync.state === 'busy' ? 'Syncing…' : ok ? 'Synced' : 'This browser only';
    var title = ok ? 'Your progress is also saved in the artifact database.' : 'Your progress is saved only in this browser.' + (sync.err ? ' (' + sync.err + ')' : '');
    Array.prototype.forEach.call(document.querySelectorAll('.sync-chip'), function (chip) {
      chip.className = cls; chip.title = title; var t = chip.querySelector('.sync-text'); if (t) t.textContent = txt;
    });
  }
  function saveLocal(n) { lsSet(PFX + n, JSON.stringify(docs[n])); lsSet(PFX + 'dirty', JSON.stringify(dirty)); }
  function touch(n) { docs[n].updatedAt = Date.now(); dirty[n] = true; saveLocal(n); schedule(n); }
  function schedule(n) {
    if (!sync.db || sync.readOnly) return;
    clearTimeout(sync.timers[n]); sync.timers[n] = setTimeout(function () { flush(n); }, 1500);
  }
  function trimDoc(n) {
    var d = docs[n];
    if (n === 'quiz' && JSON.stringify(d).length > 230000) d.attempts = d.attempts.slice(-20);
  }
  function flush(n, retried) {
    if (!sync.db || sync.readOnly) return;
    if (sync.inflight[n]) { sync.pending[n] = true; return; }
    trimDoc(n); sync.inflight[n] = true; sync.state = 'busy'; setChip();
    var snapshot = JSON.parse(JSON.stringify(docs[n])), stamp = snapshot.updatedAt;
    var p; try { p = sync.db.doc('progress/' + docKey(CERT, n)).set(snapshot); } catch (e) { p = Promise.reject({ code: 'invalid_argument', message: String(e) }); }
    p.then(function () {
      if (docs[n].updatedAt === stamp) { delete dirty[n]; saveLocal(n); }
      sync.err = '';
    }).catch(function (e) {
      var code = e && e.code || 'unavailable'; sync.err = code;
      if (code === 'unavailable' && !retried) { setTimeout(function () { flush(n, true); }, 2000 + Math.random() * 2000); }
      else if (code === 'not_granted' || code === 'invalid_argument' || code === 'revoked' || code === 'capability_disabled' || code === 'capability_removed') sync.readOnly = true;
    }).then(function () {
      sync.inflight[n] = false;
      var busy = NAMES.some(function (x) { return sync.inflight[x]; });
      sync.state = busy ? 'busy' : 'idle'; setChip();
      if (sync.pending[n]) { sync.pending[n] = false; schedule(n); }
    });
  }
  function adopt(n, remote) {
    docs[n] = mergeDoc(n, remote); delete dirty[n]; saveLocal(n);
  }
  var tutor = { fn: null, off: false, coolUntil: 0 };

  function initCapabilities() {
    var use = window.claude && typeof window.claude.use === 'function' ? window.claude.use.bind(window.claude) : null;
    if (!use) { setChip(); return; }
    var safe = function (name) { try { return Promise.resolve(use(name)).catch(function () { return null; }); } catch (e) { return Promise.resolve(null); } };
    safe('sample').then(function (s) { if (typeof s === 'function') { tutor.fn = s; if (UI.rendered && !UI.busy()) renderView(); } });
    Promise.all([safe('db'), safe('user')]).then(function (r) {
      var db = r[0], user = r[1];
      if (!db) { setChip(); return; }
      var owner = user && user.isOwner ? user.isOwner() : Promise.resolve(true);
      Promise.resolve(owner).catch(function () { return true; }).then(function (isOwner) {
        sync.db = db; sync.readOnly = isOwner === false; if (sync.readOnly) sync.err = 'read-only'; setChip();
        if (sync.readOnly) return;
        return Promise.all(NAMES.map(function (n) {
          return db.doc('progress/' + docKey(CERT, n)).get().then(function (snap) {
            var remote = snap && snap.exists ? snap.data() : null;
            if (remote && (remote.updatedAt || 0) > (docs[n].updatedAt || 0)) adopt(n, remote);
            else if (dirty[n]) schedule(n);
          }).catch(function (e) { sync.err = e && e.code || 'error'; });
        })).then(function () {
          setChip(); applyTheme(); if (!UI.busy()) renderView();
          NAMES.forEach(function (n) {
            try {
              db.doc('progress/' + docKey(CERT, n)).onSnapshot(function (snap) {
                var rem = snap && snap.exists ? snap.data() : null;
                if (rem && (rem.updatedAt || 0) > (docs[n].updatedAt || 0)) { adopt(n, rem); if (!UI.busy()) renderView(); }
              }, function () { });
            } catch (e) { /* sin suscripción */ }
          });
        });
      });
    });
  }

  /* ───────── estado de UI ───────── */
  var Pl = null; // reproductor de video activo
  var UI = { picker: false, pickerMsg: '', tab: 'hoy', topic: null, flow: null, practice: null, cur: null, dir: 0, quiz: null, quizTimer: null, navOpen: false, rendered: false, settingsMsg: '', resetStep: 0, keys: {},
    learn: { v: 'list', id: null, q: '', back: 'aprender' }, search: { q: '', term: null }, open: {},
    busy: function () { var a = document.activeElement; return !!Pl || !!UI.topic || !!UI.cur || !!(UI.quiz && !UI.quiz.finished) || !!(a && /^(TEXTAREA|INPUT|SELECT)$/.test(a.tagName)); } };
  function applyTheme() {
    var t = docs.settings.theme, r = document.documentElement;
    if (t === 'light' || t === 'dark') r.setAttribute('data-theme', t); else r.removeAttribute('data-theme');
  }
  function examDays() { var e = parseISO(docs.settings.examDate); var n = e ? daysBetween(parseISO(todayISO()), e) : null; return window.__PAGES && n != null && n < 0 ? null : n; }   // Pages demo: no preset exam date, and no negative countdown
  function countdownText() {
    var n = examDays(); if (n == null) return '';
    return n > 1 ? 'Exam in ' + n + ' days' : n === 1 ? 'Exam tomorrow' : n === 0 ? 'Exam is today' : 'Exam date has passed';
  }
  function markSeen(id) { if (!id || !TBYID[id] || docs.sessions.seen[id]) return; docs.sessions.seen[id] = Date.now(); touch('sessions'); }

  /* ───────── DOM helpers ───────── */
  function add(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(el, x); }); return; }
    el.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
  }
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k]; if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k === 'value' || k === 'checked' || k === 'disabled' || k === 'hidden') el[k] = v;
      else el.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  var toastT;
  function toast(msg) {
    var t = document.getElementById('toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  // Focus: renderView() rebuilds the DOM, so the focused control would be lost. We note which control it was (tag + role + name + n-th of its kind) and focus its twin afterwards.
  var FOCUSABLE = 'button,a[href],input,select,textarea,summary,[tabindex]';
  function fsig(el) {
    var tx = el.querySelector && el.querySelector('.otx');
    return { tag: el.tagName, role: el.getAttribute('role') || '', name: (el.getAttribute('aria-label') || el.id || el.getAttribute('placeholder') || (tx || el).textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30) };
  }
  function fpool(root, s) { return [].filter.call(root.querySelectorAll(FOCUSABLE), function (e) { var g = fsig(e); return g.tag === s.tag && g.role === s.role && g.name === s.name; }); }
  function focusCapture(root) {
    var ae = document.activeElement; if (!root || !ae || ae === root || !root.contains(ae)) return null;
    var sg = fsig(ae); sg.idx = fpool(root, sg).indexOf(ae); return sg.idx < 0 ? null : sg;
  }
  function focusEl(el) { if (!el) return false; try { el.focus({ preventScroll: true }); } catch (e) { return false; } return document.activeElement === el; }
  function focusRestore(root, sg, fallback) {
    var pool = sg ? fpool(root, sg) : [], el = pool.length ? pool[Math.min(sg.idx, pool.length - 1)] : null;
    return focusEl(el) || (fallback ? focusEl(root.querySelector(fallback)) : false);
  }
  function focusHeading(root) {
    var hd = root.querySelector('h1') || root.querySelector('h2'); if (!hd) return false;
    hd.setAttribute('tabindex', '-1'); return focusEl(hd);
  }
  // After an answer, scroll just enough to see the whole feedback above the sticky action bar (or the tab bar), without pushing its start out of view.
  function revealFb(fb) {
    if (!fb || !fb.getBoundingClientRect) return;
    var act = document.querySelector('.view .actions:not(.static)'), bar = document.getElementById('bar'), r = fb.getBoundingClientRect();
    var limit = (act ? act.getBoundingClientRect().top : window.innerHeight - (bar ? bar.offsetHeight : 0)) - 12, delta = Math.min(r.bottom - limit, r.top - 12);
    if (delta > 0) window.scrollBy({ top: delta, behavior: reduceMotion() ? 'auto' : 'smooth' });
  }
  // Radio pattern: one tab stop (the selected option, else the first); arrows move the focus (and pick, when pick is given). Left/Right stay free where they mean "other question".
  function rovingRadios(btns, pick) {
    var cur = 0; btns.forEach(function (b, i) { if (b.getAttribute('aria-checked') === 'true') cur = i; });
    btns.forEach(function (b, i) {
      b.tabIndex = i === cur ? 0 : -1;
      b.addEventListener('keydown', function (ev) {
        var k = ev.key, d = k === 'ArrowDown' || (k === 'ArrowRight' && !UI.keys.arrowright) ? 1 : k === 'ArrowUp' || (k === 'ArrowLeft' && !UI.keys.arrowleft) ? -1 : 0;
        if (!d) return;
        ev.preventDefault(); var n = (i + d + btns.length) % btns.length; btns.forEach(function (x, j) { x.tabIndex = j === n ? 0 : -1; });
        btns[n].focus(); if (pick) pick(n);
      });
    });
  }
  function modName(m) { return m.n === 0 ? m.title : 'Module ' + m.n + ' · ' + m.title; }
  function copyText(text, fallbackHost) {
    var done = function () { toast('Copied'); };
    var fb = function () {
      if (fallbackHost) {
        fallbackHost.innerHTML = '';
        var ta = h('textarea', { 'class': 'mono', readonly: true, rows: 8, value: text });
        fallbackHost.appendChild(h('p', { 'class': 'small muted', text: 'Your browser blocked the clipboard. Select the text and copy it with Ctrl+C.' }));
        fallbackHost.appendChild(ta); ta.focus(); ta.select();
      } else toast('Could not copy');
    };
    try { navigator.clipboard.writeText(text).then(done, fb); } catch (e) { fb(); }
  }
  var NS = 'http://www.w3.org/2000/svg';
  function icon(path, size) { var s = document.createElementNS(NS, 'svg'); s.setAttribute('width', size || '24'); s.setAttribute('height', size || '24'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true'); path.split('|').forEach(function (d) { var p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.setAttribute('stroke', 'currentColor'); p.setAttribute('stroke-width', '1.8'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round'); s.appendChild(p); }); return s; }
  var SEARCH_ICO = 'M10.5 4a6.5 6.5 0 015.2 10.4l4.4 4.4-1.4 1.4-4.4-4.4A6.5 6.5 0 1110.5 4zm0 2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z';
  var NAVICO = { hoy: 'M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z', aprender: 'M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z', examen: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5', progreso: 'M5 20V11M12 20V4M19 20V8',
    gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z' };
  function scoreBar(p) {
    var v = p ? p.score : 0, col = !p ? 'var(--line)' : v >= 700 ? 'var(--good)' : v >= 500 ? 'var(--warn)' : 'var(--bad)';
    return h('div', { 'class': 'score' },
      h('div', { 'class': 'score-n' }, h('b', { text: p ? String(v) : '—' }), h('span', { 'class': 'muted', text: ' of 1000' })),
      h('div', { 'class': 'meter', role: 'img', 'aria-label': p ? 'Estimated score ' + v + ' of 1000' : 'Not enough data to estimate' }, h('i', { style: { transform: 'scaleX(' + (v / 1000) + ')', background: col } }), h('b', { style: { left: '70%' } })),
      h('div', { 'class': 'scale small muted' }, h('span', { text: '0' }), h('span', { 'class': 'm700', style: { left: '70%' }, text: '700 to pass' }), h('span', { text: '1000' })));
  }
  function domainBars(by) {
    return h('div', { 'class': 'dbars' }, PLAN.domains.map(function (d) {
      var v = by[d.id] || [0, 0], p = v[1] ? Math.round(v[0] / v[1] * 100) : null;
      return h('div', { 'class': 'drow' }, h('div', { 'class': 'dtop' }, h('span', { 'class': 'lbl', text: d.name }), h('span', { 'class': 'val', text: p == null ? '—' : p + '%' })),
        h('div', { 'class': 'bar' }, h('i', { style: { transform: 'scaleX(' + ((p || 0) / 100) + ')' } }), h('b', { style: { left: '70%' } })));
    }));
  }
  function metaLine(t) { return [t.module === 0 ? 'Fundamentals' : 'Module ' + t.module + ' · ' + modTitle(t.module), t.minutes ? t.minutes + ' min' : '', t.level].filter(Boolean).join(' · '); }

  /* ───────── Tutor ───────── */
  function tutorUsable() { return !!tutor.fn && !tutor.off; }
  function askTutor(prompt, out, btn, stopBtn) {
    if (Date.now() < tutor.coolUntil) { out.textContent = 'The tutor is paused because of the usage limit. Try again in a minute.'; return; }
    var ctl = new AbortController(); out.textContent = 'Thinking…'; btn.disabled = true; stopBtn.hidden = false;
    stopBtn.onclick = function () { ctl.abort(); };
    return Promise.resolve().then(function () { return tutor.fn(prompt, { signal: ctl.signal, onText: function (u) { out.textContent = u.text; } }); })
      .then(function (r) { if (r && r.truncated) out.textContent += '\n\n(Answer cut off; ask for less at a time.)'; })
      .catch(function (e) {
        var c = e && e.code; if (e && e.text) out.textContent = e.text; else out.textContent = '';
        if (c === 'cancelled') return;
        if (['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'].indexOf(c) > -1) { tutor.off = true; out.textContent = 'The tutor is not available in this view.'; return; }
        if (c === 'rate_limited') { tutor.coolUntil = Date.now() + 60000; out.textContent += '\nToo many requests. Wait a minute before asking again.'; return; }
        out.textContent += (out.textContent ? '\n\n' : '') + 'The answer could not be completed. You can try again.';
      }).then(function () { btn.disabled = false; stopBtn.hidden = true; });
  }
  function tutorQBlock(q, it) {
    var opts = q.options.map(function (o, i) { return String.fromCharCode(65 + i) + ') ' + o; }).join('\n');
    var corr = (q.answer || []).map(function (i) { return String.fromCharCode(65 + i); }).join(', ');
    return 'Question: ' + q.stem + '\n' + opts + '\nCorrect answer: ' + corr + '\nBase explanation: ' + (q.explanation || '') + '\n' +
      (it && it.sel && it.sel.length ? 'The student chose: ' + it.sel.map(function (i) { return String.fromCharCode(65 + i); }).join(', ') + '\n' : '');
  }
  function tutorPromptQuestion(q, it) {
    return 'Act as a tutor for the Microsoft ' + EXAM.code + ' exam (' + EXAM.subject + '). Answer in English, in simple language, for a beginner. Explain why the correct answer is correct.\n\n' + tutorQBlock(q, it) +
      '\nGive a short explanation (10 lines at most, in English) with one simple analogy and a practical 10-minute micro-exercise in ' + EXAM.subject + ' to lock in the concept.';
  }

  // Self-explanation after a mistake: the tutor judges the learner's one-sentence reason (2-3 sentences back).
  function tutorPromptSelf(q, it, text) {
    return 'Act as a tutor for the Microsoft ' + EXAM.code + ' exam (' + EXAM.subject + '). Answer in English, in simple language, for a beginner. The student answered the question below wrongly and now tries to explain in one sentence why the correct answer is right.\n\n' + tutorQBlock(q, it) +
      'Student sentence: "' + text + '"\n\nJudge the sentence against the correct answer and the base explanation. Reply in 2 or 3 short sentences: start with the verdict (Right, Partly right or Wrong), then give the key point the student should keep. No analogies, no exercises.';
  }

  /* ───────── voz del navegador ───────── */
  function hasSpeech() { try { return 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function'; } catch (e) { return false; } }
  function allVoices() { try { return hasSpeech() ? (speechSynthesis.getVoices() || []) : []; } catch (e) { return []; } }
  function enVoices() { return allVoices().filter(function (v) { return voiceScore(v) < 999; }).sort(function (a, b) { return voiceScore(a) - voiceScore(b) || String(a.name).localeCompare(String(b.name)); }); }
  function pickVoice() {
    var vs = allVoices(), want = docs.settings.voiceURI;
    if (want) for (var i = 0; i < vs.length; i++) if (vs[i].voiceURI === want || vs[i].name === want) return vs[i];
    return bestVoice(vs);
  }
  function stopSpeech() { if (hasSpeech()) { try { speechSynthesis.cancel(); } catch (e) { /* nada */ } } }
  var sampleTk = 0;
  function speakSample() {
    stopSpeech(); var v = pickVoice(); if (!v) { toast('No English voice found in this browser'); return; }
    var tk = ++sampleTk; var u = new SpeechSynthesisUtterance('This is how the video lessons sound.');
    u.voice = v; u.lang = v.lang; u.rate = +docs.settings.voiceRate || 1; u.onerror = function () { if (tk === sampleTk) toast('Could not play the voice'); };
    try { speechSynthesis.resume(); } catch (e) { /* nada */ } speechSynthesis.speak(u);
  }
  if (hasSpeech()) {
    try { speechSynthesis.addEventListener('voiceschanged', function () { if (UI.tab === 'ajustes' && UI.rendered && !Pl) { var a = document.activeElement; if (!a || a.tagName !== 'SELECT') renderView(); } }); } catch (e) { /* nada */ }
  }

  /* ───────── class player: narrated audio (AB620_AUDIO) or device voice ───────── */
  var SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2];
  function reduceMotion() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function nearestSpeed(r) { r = +r || 1; var best = 1, d = 99; SPEEDS.forEach(function (s) { if (Math.abs(s - r) < d) { d = Math.abs(s - r); best = s; } }); return best; }
  function topicAudio(t) {
    var n = (t.scenes || []).length, ok = function (m) { return m && m.src && m.duration > 0 && m.scenes && m.scenes.length === n; };
    var v = (window.AB620_VIDEO || {})[t.id];
    if (window.__PAGES && ok(v)) { var yt = (window.__YT || {})[t.id]; if (!yt) return null; return { video: true, yt: String(yt), src: v.src, poster: v.poster, cues: [], duration: v.duration, scenes: v.scenes, quiz: null }; }   // GitHub Pages demo: no mp4, the lesson plays from YouTube (or shows a coming-soon card)
    if (ok(v)) return { video: true, src: v.src, poster: v.poster, cues: v.cues || [], duration: v.duration, scenes: v.scenes, quiz: v.quiz || null };   // designed lesson video (tools/video)
    var a = (window.AB620_AUDIO || {})[t.id]; return ok(a) ? a : null;
  }
  function plDur() { var P = Pl, a = P.audio; if (P.mode === 'yt') return P.total; return P.mode === 'audio' && a && a.duration > 0 && isFinite(a.duration) ? a.duration : P.total; }
  function plTime() {
    var P = Pl;
    if (P.mode === 'yt') return P.seekT;
    if (P.mode === 'audio') { var a = P.audio; return a && a.readyState >= 1 ? (a.currentTime || 0) : P.seekT; }
    return P.marks[P.cs].start + Math.min(P.el, estDur(P.scenes[P.cs], 1));
  }
  function plNote(msg) { if (Pl) { Pl.el$.note.textContent = msg || ''; Pl.endNote = false; } }
  function plClearEndNote() { if (Pl && Pl.endNote) plNote(''); }   // "You reached the end" must not stay on screen once the video plays again
  function plMarks() {
    var P = Pl, acc = 0;
    if (P.mode === 'audio' || P.mode === 'yt') { P.marks = P.entry.scenes.map(function (s) { return { start: +s.start || 0 }; }); P.total = P.entry.duration; }
    else { P.marks = P.scenes.map(function (s) { var m = { start: acc }; acc += estDur(s, 1); return m; }); P.total = acc; }
  }
  function plDrawMarks() {
    var P = Pl, e = P.el$, d = plDur(); e.marks.innerHTML = '';
    P.marks.forEach(function (m, i) { if (i > 0 && d > 0) e.marks.appendChild(h('b', { style: { left: (m.start / d * 100) + '%' } })); });
    e.rows.forEach(function (r, i) { r.time.textContent = fmtTime(P.marks[i].start); });
    e.seek.setAttribute('aria-valuemax', String(Math.floor(d)));
  }
  function plChapters() {
    var P = Pl, e = P.el$, w = !!docs.sessions.watched[P.topic.id];
    e.rows.forEach(function (r, i) {
      r.el.className = 'chrow ' + (w ? 'watched' : i < P.i ? 'past' : 'todo') + (i === P.i ? ' cur' : '');
      if (i === P.i) r.el.setAttribute('aria-current', 'true'); else r.el.removeAttribute('aria-current');
    });
    var c = e.chBox, r = e.rows[P.i] && e.rows[P.i].el;
    if (r && c.scrollHeight > c.clientHeight + 1) { var top = r.offsetTop, bot = top + r.offsetHeight; if (top < c.scrollTop) c.scrollTop = top; else if (bot > c.scrollTop + c.clientHeight) c.scrollTop = bot - c.clientHeight; }
  }
  function plShow(i) {
    var P = Pl, e = P.el$, s = P.scenes[i]; P.i = i;
    e.title.textContent = s.title || ''; e.vis.innerHTML = s.visual ? upgradeVisual(s.visual) : ''; e.vis.hidden = !s.visual; e.cap.textContent = s.caption || '';
    e.chap.textContent = 'Chapter ' + (i + 1) + ' of ' + P.scenes.length; e.stage.classList.toggle('novis', !s.visual);
    if (!reduceMotion()) { e.sc.classList.remove('in'); void e.sc.offsetWidth; e.sc.classList.add('in'); }
    plChapters();
  }
  function plSetBtn(label, ic, short) {   // short: a shorter label the CSS swaps in on very narrow screens (no truncated text)
    var P = Pl, e = P.el$; if (P.btnLabel === label) return; P.btnLabel = label;
    var k = label.indexOf(' from ');   // "Resume from 1:36": the time part hides on narrow screens (the time is shown under the bar)
    e.play.innerHTML = ''; e.play.appendChild(icon(ic, '22'));
    e.play.appendChild(k > 0 ? h('span', {}, label.slice(0, k), h('span', { 'class': 'pl-more', text: label.slice(k) })) : short ? h('span', {}, h('span', { 'class': 'pl-long', text: label }), h('span', { 'class': 'pl-short', text: short })) : h('span', { text: label }));
  }
  function plRefresh() {
    var P = Pl, e = P.el$, d = plDur(), t = P.drag ? P.dragT : plTime(), f = d > 0 ? clamp(t / d, 0, 1) : 0;
    var i = P.mode === 'speech' && !P.drag ? P.cs : sceneAtTime(P.marks, t);
    e.fill.style.width = (f * 100) + '%'; e.thumb.style.left = (f * 100) + '%';
    e.cur.textContent = fmtTime(t); e.tot.textContent = fmtTime(d);
    var sec = Math.floor(t);
    if (sec !== P.lastSec || i !== P.i) { P.lastSec = sec; e.seek.setAttribute('aria-valuenow', String(sec)); e.seek.setAttribute('aria-valuetext', fmtTime(t) + ' of ' + fmtTime(d) + ', chapter ' + (i + 1) + ': ' + (P.scenes[i].title || '')); }
    if (i !== P.i) plShow(i);
    if (P.ended) plSetBtn('Watch again', 'M4 12a8 8 0 1 0 3-6.2|M4 4v5h5', 'Replay');
    else if (P.playing) plSetBtn('Pause', 'M8 5v14|M16 5v14');
    else if (plTime() >= 1) plSetBtn('Resume from ' + fmtTime(plTime()), 'M7 4.5v15l12-7.5z');
    else plSetBtn('Play', 'M7 4.5v15l12-7.5z');
    e.play.setAttribute('aria-label', P.btnLabel);
    e.play.classList.toggle('ended', !!P.ended);
  }
  function plRefreshRate() {
    var P = Pl, e = P.el$; e.speed.textContent = P.rate + '×'; e.speed.setAttribute('aria-label', 'Playback speed ' + P.rate + ' times');
    e.items.forEach(function (b) { b.setAttribute('aria-checked', String(+b.getAttribute('data-r') === P.rate)); });
  }
  function markWatched(id) {
    if (docs.sessions.watched[id]) { if (Pl && Pl.topic.id === id) Pl.watchedMarked = true; return; }
    docs.sessions.watched[id] = Date.now(); touch('sessions');
    if (Pl && Pl.topic.id === id) { Pl.watchedMarked = true; plChapters(); }
    if (UI.topic && UI.topic.id === id && UI.topic.badges) UI.topic.badges();
  }
  function plWatchCheck() { var P = Pl; if (!P || P.watchedMarked || P.mode !== 'audio') return; if (isWatched(plTime(), plDur())) markWatched(P.topic.id); }
  function plSavePos(force) {
    var P = Pl; if (!P || P.ended || P.explain) return;   // P.explain: a clip opened from "Watch the explanation" never overwrites the topic's resume position
    if (!force && Date.now() - P.lastSave < 5000) return;
    P.lastSave = Date.now();
    var t = Math.floor(plTime()), p = docs.sessions.pos, id = P.topic.id;
    if (t < 1) { if (p[id] == null) return; delete p[id]; } else { if (p[id] === t) return; p[id] = t; }
    touch('sessions');
  }
  function plLoop() { var P = Pl; if (!P) return; P.raf = 0; if (!P.playing || P.mode !== 'audio') return; plQuizCheck(); if (!P.playing) return; plRefresh(); plWatchCheck(); P.raf = requestAnimationFrame(plLoop); }
  /* exam-room questions inside the video: entry.quiz = [{ at, question, options, right, trap }]. The video pauses when playback crosses "at" (never after a seek). */
  function qzIdx(v, n) { if (typeof v === 'number') return v; var i = 'ABCDEFGH'.indexOf(String(v == null ? '' : v).trim().toUpperCase().charAt(0)); return i < n ? i : -1; }
  function plQuizCheck() {
    var P = Pl; if (!P || P.mode !== 'audio' || !P.audio || !P.entry || !P.entry.quiz || !P.entry.quiz.length) return;
    var t = P.audio.currentTime || 0, prev = P.qzPrev; P.qzPrev = t;
    if (P.qzOpen || P.audio.seeking || !P.playing || prev == null) return;
    for (var i = 0; i < P.entry.quiz.length; i++) {
      var q = P.entry.quiz[i];
      if (!P.qzSeen[i] && prev < q.at && t >= q.at && t - prev < 2) { P.qzSeen[i] = true; plQuizOpen(i); return; }
    }
  }
  function plQuizClose(resume, answerAt) {
    var P = Pl; if (!P || !P.qzOpen) return;
    clearTimeout(P.qzTimer); P.qzTimer = 0; P.qzOpen = null; P.el$.qz.hidden = true; P.el$.qz.innerHTML = ''; P.el$.stage.classList.remove('qzon');
    if (resume) { P.qzPrev = null; if (typeof answerAt === 'number' && answerAt > plTime()) plSeekTo(answerAt); plPlay(); }   // jump over "Decide before I answer", the silence and the countdown
    try { P.el$.play.focus({ preventScroll: true }); } catch (e) { /* nothing */ }
  }
  function plQuizOpen(i) {
    var P = Pl, e = P.el$, q = P.entry.quiz[i], opts = q.options || [], right = qzIdx(q.right, opts.length), trap = qzIdx(q.trap, opts.length), done = false;
    plPause(); P.qzOpen = { i: i }; var tid = P.topic.id;
    var fb = h('p', { 'class': 'pl-qz-fb', 'aria-live': 'polite', role: 'status' }), btns = [];
    function pick(k) {
      if (done || Pl !== P) return; done = true;
      var ok = k === right; btns.forEach(function (b, j) { b.disabled = true; if (j === right) b.classList.add('right'); else if (j === k) b.classList.add('wrong'); });
      fb.className = 'pl-qz-fb ' + (ok ? 'ok' : 'bad'); fb.textContent = ok ? 'Correct' : (k === trap ? "That's the trap" : 'Not quite') + '. The answer is ' + String.fromCharCode(65 + right) + '.';
      var skill = (P.topic.skills || [])[0] || '';
      P.qzTimer = setTimeout(function () { if (Pl === P && P.qzOpen) plQuizClose(true, q.answerAt); }, 1200);
      try { recordInto(docs.quiz.stats, { id: 'vq-' + tid + '-' + i, skill: skill }, ok, false); touch('quiz'); } catch (e) { /* a failed save must never leave the video paused */ }
    }
    opts.forEach(function (o, k) {
      btns.push(h('button', { 'class': 'pl-qz-opt', type: 'button', 'data-k': String(k), onclick: function () { pick(k); } }, h('b', { text: String.fromCharCode(65 + k) }), h('span', { text: String(o).replace(/^[A-Ca-c][.)]s+/, '') })));
    });
    var skip = h('button', { 'class': 'pl-qz-skip', type: 'button', onclick: function () { if (!done) { done = true; plQuizClose(true, q.answerAt); } } }, 'Skip');
    e.qz.innerHTML = ''; e.qz.appendChild(h('div', { 'class': 'pl-qz-in' }, h('p', { 'class': 'pl-qz-q', id: 'pl-qz-q', text: q.question || '' }), h('div', { 'class': 'pl-qz-opts' }, btns), fb, skip));
    e.qz.setAttribute('aria-labelledby', 'pl-qz-q'); e.qz.hidden = false; e.stage.classList.add('qzon');
    e.qz.onkeydown = function (ev) {
      var k = ev.key, n = -1; if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      if (k === 'Escape') { ev.preventDefault(); ev.stopPropagation(); if (!done) { done = true; plQuizClose(true, q.answerAt); } return; }
      if (/^[1-9]$/.test(k)) n = +k - 1; else if (/^[a-hA-H]$/.test(k)) n = k.toUpperCase().charCodeAt(0) - 65;
      if (n > -1 && n < btns.length) { ev.preventDefault(); ev.stopPropagation(); pick(n); }
    };
    try { if (btns[0]) btns[0].focus({ preventScroll: true }); } catch (x) { /* nothing */ }
  }
  function plStartLoop() { if (Pl && !Pl.raf && Pl.mode === 'audio') Pl.raf = requestAnimationFrame(plLoop); }

  /* device voice, scene by scene */
  function plSpeechStop() { clearInterval(Pl.tick); Pl.tick = null; Pl.tk++; stopSpeech(); }
  function plSpeechStart(i) {
    var P = Pl; plSpeechStop(); var tk = P.tk;
    P.cs = i; P.el = 0; P.playing = true; P.ended = false;
    var s = P.scenes[i], text = s.say || s.caption || '', v = hasSpeech() ? pickVoice() : null, d1 = estDur(s, 1);
    P.usingSpeech = false;
    if (v && text) {
      try {
        var u = new SpeechSynthesisUtterance(text); u.voice = v; u.lang = v.lang; u.rate = P.rate;
        u.onend = function () { if (Pl && tk === Pl.tk && Pl.playing) plSpeechNext(); };
        u.onerror = function (ev) { if (Pl && tk === Pl.tk && ev && ev.error !== 'interrupted' && ev.error !== 'canceled') Pl.usingSpeech = false; };
        speechSynthesis.cancel(); try { speechSynthesis.resume(); } catch (e2) { /* nothing */ }
        speechSynthesis.speak(u); P.usingSpeech = true; plNote('');
      } catch (e3) { P.usingSpeech = false; }
    }
    if (!P.usingSpeech) plNote(hasSpeech() ? 'No English voice in this browser: playing with captions only.' : 'This browser has no speech voice: playing with captions only.');
    P.tick = setInterval(function () {
      var Q = Pl; if (!Q || tk !== Q.tk || !Q.playing) return;
      Q.el += 0.1 * Q.rate; plRefresh(); plSavePos(false);
      if (Q.usingSpeech ? Q.el > d1 * 1.7 + 5 * Q.rate : Q.el >= d1) plSpeechNext();
    }, 100);
    plRefresh();
  }
  function plSpeechNext() { var P = Pl; if (!P) return; if (P.cs < P.scenes.length - 1) plSpeechStart(P.cs + 1); else plFinish(); }

  function plFallback(msg) {
    var P = Pl; if (!P || P.mode !== 'audio') return;
    var was = P.playing, a = P.audio; P.audio = null; P.mode = 'speech'; P.playing = false;
    if (a) { try { a.pause(); a.removeAttribute('src'); a.load(); } catch (e) { /* nothing */ } if (a.parentNode) a.parentNode.removeChild(a); }
    P.el$.stage.classList.remove('video'); if (P.el$.vbtns) P.el$.vbtns.hidden = true;
    plMarks(); plDrawMarks(); P.cs = P.i; P.el = 0; P.el$.badge.hidden = false; P.lastSec = -1; plNote(msg || '');
    if (was) plSpeechStart(P.cs); else plRefresh();
  }
  function plPlay() {
    var P = Pl; if (P.mode === 'yt') return; P.ended = false; plClearEndNote();
    if (P.mode === 'audio') {
      var pr; try { pr = P.audio.play(); } catch (e) { plFallback('The audio could not be played. Using your device voice.'); return; }
      if (pr && pr.catch) pr.catch(function (err) {
        if (!Pl || Pl !== P || P.mode !== 'audio') return; var n = err && err.name;
        if (n === 'AbortError') return;
        if (n === 'NotAllowedError') { plNote('Press play again to start the audio.'); return; }
        plFallback('The audio could not be played. Using your device voice.');
      });
    } else plSpeechStart(P.cs);
  }
  function plPause() {
    var P = Pl; if (P.mode === 'yt') return;
    if (P.mode === 'audio') { try { P.audio.pause(); } catch (e) { /* nothing */ } }
    else { plSpeechStop(); P.playing = false; plSavePos(true); plRefresh(); }
  }
  function plToggle() {
    var P = Pl;
    if (P.qzOpen) { try { var b0 = P.el$.qz.querySelector('button:not([disabled])'); if (b0) b0.focus(); } catch (e0) { /* nothing */ } return; }
    if (P.ended) { plSeekTo(0); plPlay(); return; }
    if (P.playing) plPause(); else plPlay();
  }
  function plYtLoad(start, auto) {   // Pages demo: the YouTube embed has no API here, so a chapter jump reloads it with ?start=
    var P = Pl; if (!P || !P.ytFrame) return; P.ytFrame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(P.entry.yt) + '?rel=0&start=' + (start || 0) + (auto ? '&autoplay=1' : '');
  }
  function plSeekTo(t) {
    var P = Pl, d = plDur(); t = clamp(t, 0, Math.max(0, d - 0.05)); P.ended = false; plClearEndNote(); if (P.qzOpen) plQuizClose(false); P.qzPrev = null;
    if (P.mode === 'yt') { P.seekT = t; plYtLoad(Math.floor(t), true); }
    else if (P.mode === 'audio') { P.seekT = t; try { P.audio.currentTime = t; } catch (e) { /* nothing */ } }
    else { var i = sceneAtTime(P.marks, t); if (P.playing) plSpeechStart(i); else { P.cs = i; P.el = 0; } }
    P.lastSec = -1; plRefresh(); plSavePos(true);
  }
  function plSkip(sec) {
    var P = Pl, t = plTime() + sec;
    if (P.mode === 'speech') {
      var i = sceneAtTime(P.marks, t);
      if (i === P.cs) i = sec < 0 ? P.cs : Math.min(P.scenes.length - 1, P.cs + 1);
      t = P.marks[i].start;
    }
    plSeekTo(t);
  }
  function plChapter(dir) { var P = Pl; plSeekTo(P.marks[chapterTarget(P.marks, plTime(), dir)].start); }
  function plGoChapter(i) { var P = Pl; plSeekTo(P.marks[i].start); if (!P.playing) plPlay(); }
  function plSetRate(r) {
    var P = Pl; P.rate = r; docs.settings.voiceRate = r; touch('settings');
    if (P.audio) { P.audio.playbackRate = r; P.audio.defaultPlaybackRate = r; }   // never reload or seek; device voice: applies from the next scene
    plRefreshRate();
  }
  function plFinish() {
    var P = Pl; if (!P) return; plSpeechStop(); P.playing = false; P.ended = true;
    if (P.audio) { try { P.audio.pause(); } catch (e) { /* nothing */ } }
    var p = docs.sessions.pos; if (!P.explain && p[P.topic.id] != null) { delete p[P.topic.id]; touch('sessions'); }
    markWatched(P.topic.id); plRefresh(); plNote('You reached the end of the class video.'); P.endNote = true; if (UI.topic && UI.topic.nextUpd) UI.topic.nextUpd(); if (UI.topic && UI.topic.preUpd) UI.topic.preUpd(true);
  }
  function plKey(ev) {
    var P = Pl; if (!P || P.mode === 'yt' || ev.defaultPrevented || ev.metaKey || ev.ctrlKey || ev.altKey) return;
    var tg = ev.target, tag = tg && tg.tagName;
    if (tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'INPUT' || (tg && tg.isContentEditable)) return;
    var k = ev.key, onBtn = (tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY') && !(tg.closest && tg.closest('.chrow, .pl-skip'));   // chapter rows and skip buttons: Space still toggles playback
    if (k === 'Escape') {
      if (!P.el$.menu.hidden) { ev.preventDefault(); P.closeMenu(); try { P.el$.speed.focus(); } catch (e) { /* nothing */ } }
      else if (P.fs) { ev.preventDefault(); plExitFs(false); }
      return;
    }
    if (k === ' ' || k === 'Spacebar') { if (onBtn) return; ev.preventDefault(); plToggle(); }
    else if (k === 'ArrowLeft' && !(tg && tg.closest && tg.closest('.pl-menu'))) { ev.preventDefault(); plSkip(-10); }
    else if (k === 'ArrowRight' && !(tg && tg.closest && tg.closest('.pl-menu'))) { ev.preventDefault(); plSkip(10); }
    else if (k === ',') { ev.preventDefault(); plChapter(-1); }
    else if (k === '.') { ev.preventDefault(); plChapter(1); }
    else if (tg === P.el$.seek && k === 'Home') { ev.preventDefault(); plSeekTo(0); }
    else if (tg === P.el$.seek && k === 'End') { ev.preventDefault(); plSeekTo(plDur() - 6); }
  }
  function plTip(t, x) {
    var P = Pl, e = P.el$, w = e.seek.clientWidth, i = sceneAtTime(P.marks, t);
    e.tip.hidden = false; e.tip.textContent = fmtTime(t) + ' · ' + (P.scenes[i].title || '');
    var tw = e.tip.offsetWidth; e.tip.style.left = clamp(x, tw / 2, Math.max(tw / 2, w - tw / 2)) + 'px';
  }
  /* full screen: an in-app layer that never depends on the Fullscreen API (blocked inside an artifact iframe, missing on iPhone).
     The player block covers the screen; on a portrait phone it is turned 90 degrees so the 16:9 video fills it. The API is only an extra. */
  function plFsSet(on) {
    var e = Pl.el$; e.fs.innerHTML = ''; e.fs.setAttribute('aria-label', on ? 'Exit full screen' : 'Full screen'); e.fs.title = on ? 'Exit full screen (Esc)' : 'Full screen'; e.fs.setAttribute('aria-pressed', String(on));
    e.fs.appendChild(icon(on ? 'M9 4v5H4|M15 4v5h5|M9 20v-5H4|M15 20v-5h5' : 'M4 9V4h5|M20 9V4h-5|M4 15v5h5|M20 15v5h-5', '20'));
    if (on) e.fs.appendChild(h('span', { 'class': 'pl-vb-t', text: 'Exit' }));
  }
  function plFsLayout() {   // portrait + touch screen = phone held upright: turn the player
    var P = Pl; if (!P || !P.fs) return; var rot = false;
    try { rot = window.innerHeight > window.innerWidth && window.matchMedia('(pointer: coarse)').matches; } catch (e) { rot = false; }
    P.el$.root.classList.toggle('rot', rot);
  }
  function plFsInert(on) {   // while it is open, nothing behind the layer takes focus
    var P = Pl, n = P.el$.root, list = P.inerted || [];
    if (on) { while (n && n !== document.body) { var p = n.parentNode; if (p && p.children) Array.prototype.forEach.call(p.children, function (c) { if (c !== n && !c.inert && c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE') { c.inert = true; list.push(c); } }); n = p; } P.inerted = list; }
    else { list.forEach(function (c) { c.inert = false; }); P.inerted = null; }
  }
  function plEnterFs() {
    var P = Pl, e = P.el$, r = e.root; if (!P || P.fs) return;
    P.fs = true; r.classList.add('fs'); document.documentElement.classList.add('pl-fs-open');
    r.setAttribute('role', 'dialog'); r.setAttribute('aria-modal', 'true'); plFsSet(true); plFsLayout(); plFsInert(true);
    P.fsOn = { resize: plFsLayout, pop: function () { plExitFs(true); }, fsc: function () { if (Pl && Pl.fs && Pl.fsNative && !document.fullscreenElement) plExitFs(false); } };
    window.addEventListener('resize', P.fsOn.resize); window.addEventListener('orientationchange', P.fsOn.resize); window.addEventListener('popstate', P.fsOn.pop); document.addEventListener('fullscreenchange', P.fsOn.fsc);
    try { history.pushState({ plfs: 1 }, ''); P.fsHist = true; } catch (x) { P.fsHist = false; }   // the phone's Back button leaves full screen, not the topic
    var coarse = false; try { coarse = window.matchMedia('(pointer: coarse)').matches; } catch (x2) { /* nothing */ }
    try {   // enhancement only: the same in-app layout stays inside the browser's own full screen
      if (document.fullscreenEnabled && r.requestFullscreen) {
        var pr = r.requestFullscreen(); if (pr && pr.then) pr.then(function () { if (Pl === P && P.fs) { P.fsNative = true; } else { try { document.exitFullscreen(); } catch (x3) { /* nothing */ } } }, function () { /* refused: the in-app layer is enough */ });
      }
    } catch (x4) { /* nothing */ }
    try { if (coarse && screen.orientation && screen.orientation.lock) { var lp = screen.orientation.lock('landscape'); if (lp && lp.catch) lp.catch(function () { /* not allowed here */ }); } } catch (x5) { /* nothing */ }
    try { e.fs.focus({ preventScroll: true }); } catch (x6) { /* nothing */ }
  }
  function plExitFs(fromPop) {
    var P = Pl; if (!P || !P.fs) return; var e = P.el$;
    P.fs = false; e.root.classList.remove('fs', 'rot'); document.documentElement.classList.remove('pl-fs-open');
    e.root.setAttribute('role', 'group'); e.root.removeAttribute('aria-modal'); plFsSet(false); plFsInert(false);
    if (P.fsOn) { window.removeEventListener('resize', P.fsOn.resize); window.removeEventListener('orientationchange', P.fsOn.resize); window.removeEventListener('popstate', P.fsOn.pop); document.removeEventListener('fullscreenchange', P.fsOn.fsc); P.fsOn = null; }
    try { if (P.fsNative && document.fullscreenElement) document.exitFullscreen().catch(function () { /* nothing */ }); } catch (x) { /* nothing */ }
    try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (x2) { /* nothing */ }
    P.fsNative = false;
    if (!fromPop && P.fsHist) { try { history.back(); } catch (x3) { /* nothing */ } }
    P.fsHist = false;
    if (Pl === P) { try { e.fs.focus({ preventScroll: true }); } catch (x4) { /* nothing */ } }
  }
  function makePlayer(t) {
    var scenes = t.scenes || [], entry = topicAudio(t), P = { topic: t, scenes: scenes, entry: entry, mode: entry ? (entry.yt ? 'yt' : 'audio') : 'speech', audio: null, marks: [], total: 0, i: -1, cs: 0, el: 0, seekT: 0,
      playing: false, ended: false, drag: false, dragT: 0, raf: 0, tick: null, tk: 0, lastSave: 0, lastSec: -1, btnLabel: '', usingSpeech: false, watchedMarked: !!docs.sessions.watched[t.id],
      qzSeen: {}, qzOpen: null, qzPrev: null, qzTimer: 0, rate: nearestSpeed(docs.settings.voiceRate), el$: { rows: [] }, closeMenu: function () { } };
    Pl = P; var e = P.el$; plMarks();
    e.chap = h('span', { 'class': 'pl-chap' }); e.badge = h('span', { 'class': 'pl-badge', text: 'Device voice', title: 'Narrated audio is not available for this class: your device reads it aloud.', hidden: P.mode !== 'speech' });
    e.title = h('h2', { 'class': 'pl-title' }); e.vis = h('div', { 'class': 'pl-visual' }); e.cap = h('p', { 'class': 'pl-cap' });
    e.sc = h('div', { 'class': 'pl-sc' }, e.title, e.vis, e.cap);
    e.stage = h('div', { 'class': 'pl-stage' }, h('div', { 'class': 'pl-sh' }, e.chap, e.badge), e.sc);
    e.fill = h('i'); e.marks = h('span', { 'class': 'pl-marks' }); e.thumb = h('span', { 'class': 'pl-thumb' }); e.tip = h('div', { 'class': 'pl-tip', hidden: true, 'aria-hidden': 'true' });
    e.seek = h('div', { 'class': 'pl-seek', role: 'slider', tabindex: '0', 'aria-label': 'Seek', 'aria-valuemin': '0', 'aria-valuenow': '0' }, h('div', { 'class': 'pl-track' }, e.fill, e.marks), e.thumb, e.tip);
    e.cur = h('span', { 'class': 'pl-time', text: '0:00' }); e.tot = h('span', { 'class': 'pl-time', text: fmtTime(P.total) });
    e.play = h('button', { 'class': 'pl-play', type: 'button', onclick: plToggle });
    function skip(sec) {
      var left = sec < 0, b = h('button', { 'class': 'pl-skip', type: 'button', 'aria-label': (left ? 'Back ' : 'Forward ') + '10 seconds', title: (left ? 'Back 10 s' : 'Forward 10 s') + ' (' + (left ? 'Left' : 'Right') + ' arrow)', onclick: function () { plSkip(sec); } },
        icon(left ? 'M3.5 12a8.5 8.5 0 1 0 2.6-6.1|M3.5 4v5h5' : 'M20.5 12a8.5 8.5 0 1 1-2.6-6.1|M20.5 4v5h-5', '24'), h('span', { text: '10' }));
      return b;
    }
    e.items = SPEEDS.map(function (r) { return h('button', { 'class': 'pl-mi', type: 'button', role: 'menuitemradio', 'data-r': String(r), 'aria-checked': 'false', text: r + '×', onclick: function () { plSetRate(r); P.closeMenu(); try { e.speed.focus(); } catch (x) { /* nothing */ } } }); });
    e.menu = h('div', { 'class': 'pl-menu', role: 'menu', 'aria-label': 'Playback speed', hidden: true }, e.items);
    e.speed = h('button', { 'class': 'pl-speed', type: 'button', 'aria-haspopup': 'menu', 'aria-expanded': 'false' });
    e.speedWrap = h('div', { 'class': 'pl-sw' }, e.speed, e.menu);
    function outside(ev) { if (!e.speedWrap.contains(ev.target)) P.closeMenu(); }
    P.closeMenu = function () { e.menu.hidden = true; e.speed.setAttribute('aria-expanded', 'false'); document.removeEventListener('pointerdown', outside, true); };
    e.speed.onclick = function () {
      if (!e.menu.hidden) { P.closeMenu(); return; }
      e.menu.hidden = false; e.speed.setAttribute('aria-expanded', 'true'); document.addEventListener('pointerdown', outside, true);
      var on = e.items.filter(function (b) { return b.getAttribute('aria-checked') === 'true'; })[0]; if (on) { try { on.focus({ preventScroll: true }); } catch (x) { /* nothing */ } }
    };
    e.menu.addEventListener('keydown', function (ev) {
      var k = ev.key, i = e.items.indexOf(document.activeElement);
      if (k === 'ArrowDown' || k === 'ArrowUp') { ev.preventDefault(); e.items[(i + (k === 'ArrowDown' ? 1 : -1) + e.items.length) % e.items.length].focus(); }
    });
    e.cc = h('button', { 'class': 'pl-vb', type: 'button', 'aria-pressed': 'false', 'aria-label': 'CC captions', title: 'Captions' }, h('span', { text: 'CC' }));
    e.fs = h('button', { 'class': 'pl-vb', type: 'button' }); plFsSet(false);
    e.vbtns = h('div', { 'class': 'pl-vbs', hidden: true }, e.cc, e.fs);
    e.ccBox = h('div', { 'class': 'pl-ccbox', 'aria-live': 'off', hidden: true });
    e.qz = h('div', { 'class': 'pl-qz', role: 'dialog', 'aria-label': 'Question', hidden: true });
    e.note = h('p', { 'class': 'pl-note small muted', 'aria-live': 'polite' }); e.next = h('div', { 'class': 'pl-next', hidden: true });
    e.root = h('div', { 'class': 'pl', id: 'player', role: 'group', 'aria-label': 'Class video' }, e.stage,
      h('div', { 'class': 'pl-seekrow' }, e.seek, h('div', { 'class': 'pl-times' }, e.cur, e.tot)),
      h('div', { 'class': 'pl-ctl' }, e.play, skip(-10), skip(10), h('span', { 'class': 'grow' }), e.speedWrap), e.note, e.next);
    e.chBox = h('div', { 'class': 'chbox' }, h('ul', { 'class': 'chlist' }, scenes.map(function (s, i) {
      var time = h('span', { 'class': 'ch-t', text: '' });
      var b = h('button', { 'class': 'chrow todo', type: 'button', onclick: function () { plGoChapter(i); } },
        h('span', { 'class': 'cdot', 'aria-hidden': 'true' }, h('span', { 'class': 'cn', text: String(i + 1) }), icon('M5 12.5l4.5 4.5L19 7.5', '14')), h('span', { 'class': 'ch-x', text: s.title || ('Chapter ' + (i + 1)) }), time);
      e.rows.push({ el: b, time: time }); return h('li', {}, b);
    })));
    if (window.__PAGES && !entry && (window.AB620_VIDEO || {})[t.id]) e.root.insertBefore(h('div', { 'class': 'pl-soon', role: 'note' }, h('b', { text: 'Video coming soon on YouTube.' }), h('span', { text: ' For now, press play and your device reads the class aloud. ' }), h('a', { href: window.__YT_CHANNEL || '#', target: '_blank', rel: 'noopener', text: 'Visit the YouTube channel' })), e.root.firstChild);
    e.chapters = h('aside', { 'class': 'chapters', 'aria-label': 'Chapters' }, h('div', { 'class': 'ch-in' }, h('h2', { text: 'Chapters' }), e.chBox));

    /* seek bar: pointer drag (mouse + touch), hover tooltip, keyboard handled by plKey */
    function rotated() { return P.fs && e.root.classList.contains('rot'); }   // full screen turned 90 degrees on a portrait phone: the bar runs down the screen
    function tOf(ev) { var r = e.seek.getBoundingClientRect(); return clamp((rotated() ? (ev.clientY - r.top) / Math.max(1, r.height) : (ev.clientX - r.left) / Math.max(1, r.width)), 0, 1) * plDur(); }
    function xOf(ev) { var r = e.seek.getBoundingClientRect(); return rotated() ? ev.clientY - r.top : ev.clientX - r.left; }
    e.seek.addEventListener('pointerdown', function (ev) {
      if (ev.button > 0 || Pl !== P) return; ev.preventDefault(); try { e.seek.setPointerCapture(ev.pointerId); } catch (x) { /* nothing */ } try { e.seek.focus({ preventScroll: true }); } catch (x2) { /* nothing */ }
      P.drag = true; P.dragT = tOf(ev); plTip(P.dragT, xOf(ev)); plRefresh();
    });
    e.seek.addEventListener('pointermove', function (ev) {
      if (Pl !== P) return;
      if (P.drag) { P.dragT = tOf(ev); plTip(P.dragT, xOf(ev)); plRefresh(); }
      else if (ev.pointerType === 'mouse') plTip(tOf(ev), xOf(ev));
    });
    function endDrag(ev, commit) {
      if (Pl !== P || !P.drag) return; P.drag = false; var t = P.dragT; if (ev && ev.type === 'pointerup') t = tOf(ev);
      if (ev && ev.pointerType !== 'mouse') e.tip.hidden = true;
      if (commit) plSeekTo(t); else plRefresh();
    }
    e.seek.addEventListener('pointerup', function (ev) { endDrag(ev, true); });
    e.seek.addEventListener('pointercancel', function (ev) { endDrag(ev, false); e.tip.hidden = true; });
    e.seek.addEventListener('pointerleave', function () { if (!P.drag) e.tip.hidden = true; });
    e.seek.addEventListener('blur', function () { if (!P.drag) e.tip.hidden = true; });

    var resume = 0;
    if (entry && entry.yt) {
      resume = resumePos(docs.sessions.pos[t.id], entry.duration); P.seekT = resume;
      var fr = document.createElement('iframe'); P.ytFrame = fr; fr.className = 'pl-video pl-yt'; fr.title = 'Class video: ' + t.title; fr.setAttribute('allow', 'accelerometer; encrypted-media; picture-in-picture; fullscreen'); fr.setAttribute('allowfullscreen', ''); fr.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin'); fr.style.border = '0'; fr.style.cursor = 'auto';
      e.stage.classList.add('video'); e.stage.insertBefore(fr, e.stage.firstChild);
      Array.prototype.forEach.call(e.root.querySelectorAll('.pl-seekrow, .pl-ctl'), function (n) { n.style.display = 'none'; });
      plYtLoad(Math.floor(resume), false);
    } else if (entry) {
      var a = entry.video ? document.createElement('video') : new Audio(); a.preload = 'metadata'; a.playbackRate = P.rate; a.defaultPlaybackRate = P.rate; P.audio = a;
      if (entry.video) {
        a.className = 'pl-video'; a.playsInline = true; a.setAttribute('playsinline', ''); a.setAttribute('aria-label', 'Class video: ' + t.title);
        if (entry.poster) a.poster = entry.poster;
        a.addEventListener('click', function () { if (Pl === P) plToggle(); });
        e.stage.classList.add('video'); e.stage.insertBefore(a, e.stage.firstChild); e.stage.appendChild(e.ccBox); e.stage.appendChild(e.vbtns); e.stage.appendChild(e.qz);   // CC + full screen sit on the video's corner
        var cues = entry.cues, ccOn = false;
        P.ccUpd = function () {   // captions are drawn by the app from the sentence timings (no .vtt file needed)
          var tx = ''; if (ccOn) { var t0 = a.currentTime || 0; for (var ci = 0; ci < cues.length; ci++) if (t0 >= cues[ci][0] && t0 < cues[ci][1]) { tx = cues[ci][2]; break; } }
          if (e.ccBox.textContent !== tx) e.ccBox.textContent = tx; e.ccBox.hidden = !tx;
        };
        var setCc = function (on) { ccOn = !!on; e.cc.setAttribute('aria-pressed', String(ccOn)); P.ccUpd(); };
        e.cc.onclick = function () { var on = e.cc.getAttribute('aria-pressed') !== 'true'; docs.settings.cc = on; touch('settings'); setCc(on); };
        a.addEventListener('timeupdate', function () { if (Pl === P) P.ccUpd(); }); a.addEventListener('seeked', function () { if (Pl === P) P.ccUpd(); });
        e.fs.onclick = function () { if (Pl !== P) return; if (P.fs) plExitFs(false); else plEnterFs(); };
        e.vbtns.hidden = false; e.cc.hidden = !cues.length; setCc(!!docs.settings.cc);
      }
      resume = resumePos(docs.sessions.pos[t.id], entry.duration); P.seekT = resume;
      var live = function () { return Pl === P && P.audio === a; };
      a.addEventListener('loadedmetadata', function () { if (!live()) return; if (P.seekT > 0) { try { a.currentTime = P.seekT; } catch (x) { /* nothing */ } } plDrawMarks(); plRefresh(); });
      a.addEventListener('play', function () { if (!live()) return; P.playing = true; P.ended = false; plStartLoop(); plRefresh(); });
      a.addEventListener('pause', function () { if (!live()) return; P.playing = false; if (!a.ended) plSavePos(true); plRefresh(); });
      a.addEventListener('seeking', function () { if (live()) P.qzPrev = null; });
      a.addEventListener('timeupdate', function () { if (!live()) return; plQuizCheck(); plWatchCheck(); plSavePos(false); if (!P.playing || !P.raf) plRefresh(); });
      a.addEventListener('ended', function () { if (live()) plFinish(); });
      a.addEventListener('error', function () { if (live()) plFallback('The narrated audio could not be loaded. Using your device voice.'); });
      a.src = entry.src;
    } else {
      resume = resumePos(docs.sessions.pos[t.id], P.total); if (resume) P.cs = sceneAtTime(P.marks, resume);
    }
    plDrawMarks(); plRefreshRate(); plShow(P.mode === 'speech' ? P.cs : sceneAtTime(P.marks, resume)); plRefresh();
    document.addEventListener('keydown', plKey);
    return P;
  }
  function closePlayer() {
    var P = Pl; if (!P) return;
    try { plSavePos(true); } catch (e0) { /* nothing */ }
    P.closeMenu(); if (P.fs) plExitFs(false); document.removeEventListener('keydown', plKey); clearTimeout(P.qzTimer); Pl = null;
    if (P.raf) cancelAnimationFrame(P.raf); clearInterval(P.tick); P.tk++; stopSpeech();
    if (P.audio) { var a = P.audio; P.audio = null; try { a.pause(); a.removeAttribute('src'); a.load(); } catch (e) { /* nothing */ } }
  }
  window.addEventListener('pagehide', function () { if (Pl) { try { plSavePos(true); } catch (e) { /* nothing */ } } stopSpeech(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden && Pl) { try { plSavePos(true); } catch (e) { /* nothing */ } } });

  /* ───────── figuras: upgradeVisual(html) convierte los dibujos antiguos (SVG de cajas, tablas, chips) en componentes nuevos ───────── */
  // Reconoce por geometría/estructura; si no reconoce el patrón o algo falla, devuelve el html original sin cambios.
  // Los textos se insertan siempre con textContent; nunca se reutiliza el markup viejo.
  var VZ_ICON_RULES = [
    [/\b(flows?|workflows?|power automate)\b/, 'flow'],
    [/\b(generative|copilot)\b/, 'sparkle'],
    [/\b(connectors?|mcp|bridge|wrapper|plug)\b/, 'plug_connected'],
    [/\b(tools?|toolbox)\b/, 'toolbox'],
    [/\b(computer|machine|desktop|cloud pc)\b/, 'window_dev_tools'],
    [/\b(api|http|endpoint|rest|website|web|browser|url)\b/, 'globe'],
    [/\b(oauth|token|secret|sign-in|credentials?|password)\b/, 'key'],
    [/\b(admin|administrator|security|policy|policies|dlp|governance|entra|authenticat\w*)\b/, 'shield_checkmark'],
    [/\b(analytics|metrics?|score|report|dashboard|usage|telemetry|monitor\w*)\b/, 'data_bar_vertical'],
    [/\b(evaluations?|tests?|testing|checks?)\b/, 'clipboard_task_list_ltr'],
    [/\b(models?|ai|llm|gpt)\b/, 'brain_circuit'],
    [/\b(ticket|incident)\b/, 'ticket_diagonal'],
    [/\b(publish\w*|deploy\w*|release|send|export)\b/, 'send'],
    [/\b(settings?|harness|configuration|configure)\b/, 'settings'],
    [/\b(branch|condition|decision)\b/, 'branch_fork'],
    [/\b(solutions?|components?|package|collection)\b/, 'cube_tree'],
    [/\b(topics?|trigger|routing|orchestrator)\b/, 'arrow_routing'],
    [/\b(knowledge|guide|sources?)\b/, 'book_open'],
    [/\b(documents?|files?|instructions?|sharepoint)\b/, 'document_text'],
    [/\b(channels?|teams|chat|conversation|messages?|whatsapp|slack|telegram|facebook)\b/, 'chat'],
    [/\b(mobile|phone|sms)\b/, 'phone'],
    [/\b(environments?|cloud|azure|tenant|sandbox|production|prod|dev)\b/, 'cloud'],
    [/\b(users?|employees?|customers?|makers?|person|ana|luis)\b/, 'person'],
    [/\b(agents?|bot|nexo)\b/, 'bot'],
    [/\b(error|fix|troubleshoot\w*)\b/, 'wrench'],
    [/\b(apps?)\b/, 'apps']
  ];
  function vzIcon(label) {
    var ic = (typeof window !== 'undefined' && window.AB620_ICONS) || {}, l = String(label || '').toLowerCase();
    if (l.split(/s+/).length > 4) return '';   // long sentences get no icon
    for (var i = 0; i < VZ_ICON_RULES.length; i++) if (VZ_ICON_RULES[i][0].test(l) && ic[VZ_ICON_RULES[i][1]]) return ic[VZ_ICON_RULES[i][1]];
    return '';
  }
  var VZ_CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  function vk(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function vzArrow(cls) { var a = vk('span', cls); a.setAttribute('aria-hidden', 'true'); a.innerHTML = VZ_CHEV; return a; }
  function vzNum(el, a) { var v = parseFloat(el.getAttribute(a)); return isFinite(v) ? v : 0; }
  function vzAttrs(el) { return (el.getAttribute('fill') || '') + ' ' + (el.getAttribute('stroke') || '') + ' ' + (el.getAttribute('style') || ''); }
  function vzParseSvg(svg) {
    var vb = (svg.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
    if (vb.length !== 4 || vb.some(isNaN)) return null;
    var M = { W: vb[2], H: vb[3], rects: [], free: [], lines: [], polys: 0 }, all = svg.querySelectorAll('*'), texts = [];
    for (var i = 0; i < all.length; i++) {
      var el = all[i], tag = el.tagName.toLowerCase();
      if (el.hasAttribute('transform')) return null;
      if (tag === 'rect') {
        var f = el.getAttribute('fill') || '';
        if (/accent|ink|muted/.test(f) || el.hasAttribute('opacity')) return null;       // barras/rellenos: no es una caja
        var st = el.getAttribute('style') || '';
        M.rects.push({ x: vzNum(el, 'x'), y: vzNum(el, 'y'), w: vzNum(el, 'width'), h: vzNum(el, 'height'), hl: /stroke:\s*var\(--accent\)/.test(st) || /var\(--accent\)/.test(el.getAttribute('stroke') || ''), dash: el.hasAttribute('stroke-dasharray'), t: [], notes: [] });
      } else if (tag === 'text') {
        var s = (el.textContent || '').replace(/\s+/g, ' ').trim(); if (!s) continue;
        var fw = el.getAttribute('font-weight') || '';
        texts.push({ x: vzNum(el, 'x'), y: vzNum(el, 'y'), bold: /bold|[6-9]00/.test(fw), muted: /var\(--muted\)/.test(vzAttrs(el)), txt: s });
      } else if (tag === 'line') {
        M.lines.push({ x1: vzNum(el, 'x1'), y1: vzNum(el, 'y1'), x2: vzNum(el, 'x2'), y2: vzNum(el, 'y2'), thin: el.hasAttribute('stroke-width') && parseFloat(el.getAttribute('stroke-width')) <= 1 });
      } else if (tag === 'polygon') M.polys++;
      else if (tag === 'svg' || tag === 'defs' || tag === 'marker' || tag === 'title' || tag === 'desc' || tag === 'tspan' || (tag === 'path' && el.closest('marker'))) continue;
      else return null;
    }
    M.rects = M.rects.filter(function (r, i) {   // a frame around other boxes is a group: its own text becomes the title
      return M.rects.filter(function (q, j) { return j !== i && q.x >= r.x - 1 && q.y >= r.y - 1 && q.x + q.w <= r.x + r.w + 1 && q.y + q.h <= r.y + r.h + 1; }).length < 2;
    });
    if (!M.rects.length) { M.texts = texts; return M; }
    texts.forEach(function (t) {
      var best = null;
      M.rects.forEach(function (r) { if (t.x >= r.x - 1 && t.x <= r.x + r.w + 1 && t.y >= r.y && t.y <= r.y + r.h + 3 && (!best || r.w * r.h < best.w * best.h)) best = r; });
      if (best) best.t.push(t); else M.free.push(t);
    });
    for (var k = 0; k < M.rects.length; k++) if (!M.rects[k].t.length) return null;
    M.rects.forEach(function (r) { r.t.sort(function (a, b) { return a.y - b.y; }); });
    // free texts: title (above everything), caption (centered / orphan), notes (under a box)
    var minY = Math.min.apply(null, M.rects.map(function (r) { return r.y; })), title = [], cap = [];
    M.free.sort(function (a, b) { return a.y - b.y; }).forEach(function (t) {
      var mid = Math.abs(t.x - M.W / 2) <= M.W * 0.08;
      if (t.y < minY) { title.push(t.txt); return; }
      var host = null;
      if (!mid) M.rects.forEach(function (r) { if (t.x >= r.x && t.x <= r.x + r.w && r.y + r.h <= t.y + 2 && (!host || r.y + r.h > host.y + host.h)) host = r; });
      if (host) host.notes.push(t.txt); else cap.push(t.txt);
    });
    M.title = title.join(' '); M.cap = cap.join(' ');
    return M;
  }
  function vzLayout(M) {
    var rs = M.rects.slice().sort(function (a, b) { return a.y - b.y || a.x - b.x; }), bands = [];
    rs.forEach(function (r) {
      var b = null;
      for (var i = 0; i < bands.length && !b; i++) { var ov = Math.min(bands[i].y2, r.y + r.h) - Math.max(bands[i].y1, r.y); if (ov >= 0.2 * Math.min(bands[i].minH, r.h)) b = bands[i]; }
      if (b) { b.items.push(r); b.y1 = Math.min(b.y1, r.y); b.y2 = Math.max(b.y2, r.y + r.h); b.minH = Math.min(b.minH, r.h); }
      else bands.push({ items: [r], y1: r.y, y2: r.y + r.h, minH: r.h });
    });
    bands.sort(function (a, b) { return a.y1 - b.y1; });
    bands.forEach(function (b) {
      var cols = [];
      b.items.sort(function (p, q) { return p.x - q.x || p.y - q.y; }).forEach(function (r) {
        var c = cols[cols.length - 1];
        if (c && Math.min(c.x2, r.x + r.w) - Math.max(c.x1, r.x) >= 0.5 * Math.min(c.x2 - c.x1, r.w)) { c.items.push(r); c.x1 = Math.min(c.x1, r.x); c.x2 = Math.max(c.x2, r.x + r.w); }
        else cols.push({ items: [r], x1: r.x, x2: r.x + r.w });
      });
      cols.forEach(function (c) { c.items.sort(function (p, q) { return p.y - q.y; }); });
      b.cols = cols;
    });
    return bands;
  }
  function vzNodeInfo(r) {   // label + sub lines for a flow node
    var t = r.t.map(function (x) { return x.txt; }), label, sub = [];
    if (r.t.length > 1 && (r.t[0].bold || r.t[1].muted)) { label = t[0]; sub = t.slice(1); }
    else if (t.length > 1 && t.slice(1).every(function (s) { return /^[a-z(d]/.test(s); })) label = t.join(' ');   // a wrapped label
    else { label = t[0]; sub = t.slice(1); }
    return { label: label, sub: sub.concat(r.notes) };
  }
  function vzNode(r, pad) {   // pad: other nodes have icons, so keep a blank tile (shown only in the stacked layout) to align the labels
    var n = vzNodeInfo(r), d = vk('div', 'vz-node' + (r.hl ? ' hl' : '') + (r.dash ? ' dash' : '')), ic = vzIcon(n.label);
    if (ic || pad) { var i = vk('span', 'vz-ic' + (ic ? '' : ' none')); i.setAttribute('aria-hidden', 'true'); if (ic) i.innerHTML = ic; d.appendChild(i); }
    var t = vk('span', 'vz-t'); t.appendChild(vk('strong', '', n.label));
    n.sub.forEach(function (s) { t.appendChild(vk('small', '', s)); });
    d.appendChild(t); return d;
  }
  function vzCard(r) {
    var c = vk('div', 'vz-card' + (r.hl ? ' hl' : '') + (r.dash ? ' dash' : '')), tx = r.t.map(function (x) { return x.txt; });
    c.appendChild(vk('strong', 'vz-ct', tx[0]));
    var rest = tx.slice(1).concat(r.notes);
    if (rest.length) { var u = vk('ul', 'vz-bl'); rest.forEach(function (s) { u.appendChild(vk('li', '', s)); }); c.appendChild(u); }
    return c;
  }
  function vzLinkH(M, a, b, band) {
    return M.lines.some(function (l) { var lo = Math.min(l.x1, l.x2), hi = Math.max(l.x1, l.x2); return !l.thin && hi - lo >= 4 && lo >= a.x2 - 8 && hi <= b.x1 + 8 && Math.min(l.y1, l.y2) >= band.y1 - 8 && Math.max(l.y1, l.y2) <= band.y2 + 8; });
  }
  function vzLinkV(M, a, b) {
    return M.lines.some(function (l) { var lo = Math.min(l.y1, l.y2), hi = Math.max(l.y1, l.y2); return !l.thin && hi - lo >= 8 && lo >= a.y2 - 8 && hi <= b.y1 + 8; });
  }
  function vzFromTextTable(M) {   // old SVG tables: text on a grid, separated by thin lines
    if (M.polys || M.lines.some(function (l) { return !l.thin; }) || M.texts.length < 4) return null;
    var ts = M.texts.slice().sort(function (p, q) { return p.y - q.y || p.x - q.x; }), rows = [];
    ts.forEach(function (t) { var r = rows[rows.length - 1]; if (r && Math.abs(r.y - t.y) <= 3) r.c.push(t); else rows.push({ y: t.y, c: [t] }); });
    var xs = ts.map(function (t) { return t.x; }).sort(function (p, q) { return p - q; }), cl = [];
    xs.forEach(function (x) { if (cl.length && x - cl[cl.length - 1] <= 14) return; cl.push(x); });
    var n = cl.length; if (rows.length < 2 || n < 2 || n > 4) return null;
    function ci(x) { var b = 0; cl.forEach(function (c, i) { if (Math.abs(c - x) < Math.abs(cl[b] - x)) b = i; }); return b; }
    rows.forEach(function (r) { r.cells = []; r.c.forEach(function (t) { var i = ci(t.x); if (r.cells[i]) r.cells[i].txt += ' ' + t.txt; else r.cells[i] = { txt: t.txt, bold: t.bold }; }); });
    var root = vk('div', 'vz'), stage = vk('div', 'vz-stage');
    if (n === 2 && rows.every(function (r) { return r.cells[0] && r.cells[1]; })) {
      root.classList.add('vz-table'); var dl = vk('dl', 'vz-kv');
      rows.forEach(function (r) { var row = vk('div', 'vz-row'); row.appendChild(vk('dt', '', r.cells[0].txt)); row.appendChild(vk('dd', '', r.cells[1].txt)); dl.appendChild(row); });
      stage.appendChild(dl);
    } else {
      root.classList.add('vz-matrix'); var tb = vk('table', 'vz-mx'), head = !rows[0].cells[0] || rows[0].cells.every(function (c) { return c && c.bold; });
      rows.forEach(function (r, ri) {
        var tr = vk('tr'), th = head && ri === 0;
        for (var i = 0; i < n; i++) { var c = r.cells[i], cell = vk(th || i === 0 ? 'th' : 'td', '', c ? c.txt : ''); if (th) cell.setAttribute('scope', 'col'); else if (i === 0) cell.setAttribute('scope', 'row'); tr.appendChild(cell); }
        (th ? (tb.tHead || tb.createTHead()) : (tb.tBodies[0] || tb.appendChild(vk('tbody')))).appendChild(tr);
      });
      stage.appendChild(tb);
    }
    root.appendChild(stage); return root;
  }
  function vzFromSvg(svg) {
    var M = vzParseSvg(svg); if (!M) return null;
    if (!M.rects.length) return vzFromTextTable(M);
    var bands = vzLayout(M), root = vk('div', 'vz'), stage = vk('div', 'vz-stage'), type;
    var arrows = M.polys > 0 || M.lines.some(function (l) { return !l.thin; }), n = M.rects.length;
    var wide = M.rects.every(function (r) { return r.w >= M.W * 0.85; });
    var perBand = bands.map(function (b) { return b.cols.length; });
    if (!arrows && n >= 2 && wide && bands.every(function (b) { return b.items.length === 1; })) type = 'list';
    else if (!arrows && bands.length === 1 && perBand[0] === 2 && n === 2) type = 'cmp';
    else if (!arrows && n >= 3 && perBand.every(function (c) { return c === perBand[0] && c >= 2 && c <= 3; }) && bands.every(function (b) { return b.items.length === b.cols.length; })) type = 'grid';
    else type = 'flow';
    root.classList.add('vz-' + type);
    if (M.title) root.appendChild(vk('p', 'vz-title', M.title));
    if (type === 'list') {
      var ol = vk('ol', 'vz-list');
      bands.forEach(function (b, i) {
        var r = b.items[0], n2 = vzNodeInfo(r), li = vk('li', 'vz-item' + (r.hl ? ' hl' : '') + (r.dash ? ' dash' : ''));
        li.appendChild(vk('span', 'vz-n', String(i + 1)));
        var t = vk('span', 'vz-t'); t.appendChild(vk('strong', '', n2.label)); n2.sub.forEach(function (s) { t.appendChild(vk('small', '', s)); });
        li.appendChild(t); ol.appendChild(li);
      });
      stage.appendChild(ol);
    } else if (type === 'cmp' || type === 'grid') {
      var g = vk('div', 'vz-cards'); g.style.setProperty('--cols', String(type === 'cmp' ? 2 : perBand[0]));
      bands.forEach(function (b) { b.cols.forEach(function (c) { g.appendChild(vzCard(c.items[0])); }); });
      stage.appendChild(g);
    } else {
      var pad = M.rects.some(function (r) { return vzIcon(vzNodeInfo(r).label); });
      bands.forEach(function (b, bi) {
        if (bi && vzLinkV(M, bands[bi - 1], b)) stage.appendChild(vzArrow('vz-vdown'));
        var row = vk('div', 'vz-band' + (b.cols.length > 4 ? ' many' : ''));
        b.cols.forEach(function (c, ci) {
          if (ci && vzLinkH(M, b.cols[ci - 1], c, b)) row.appendChild(vzArrow('vz-arr'));
          var col = vk('div', 'vz-col'); c.items.forEach(function (r) { col.appendChild(vzNode(r, pad)); }); row.appendChild(col);
        });
        stage.appendChild(row);
      });
    }
    root.appendChild(stage);
    if (M.cap) root.appendChild(vk('p', 'vz-cap', M.cap));
    return root;
  }
  function vzFromDiv(div) {
    if (!/border:\s*1px solid var\(--muted\)/.test(div.getAttribute('style') || '')) return null;
    var kids = div.children, root = vk('div', 'vz'), stage = vk('div', 'vz-stage'), kinds = {}, cur = null, curKind = '', title = '';
    if (div.childNodes.length !== kids.length || !kids.length) return null;
    function open(kind) {
      if (curKind === kind) return; curKind = kind; kinds[kind] = 1;
      cur = kind === 'chips' ? vk('div', 'vz-chips') : kind === 'kv' ? vk('dl', 'vz-kv') : vk('ul', 'vz-lines'); stage.appendChild(cur);
    }
    for (var i = 0; i < kids.length; i++) {
      var k = kids[i], st = k.getAttribute('style') || '', tag = k.tagName.toLowerCase();
      if (i === 0 && tag === 'div' && /font-size:\s*1[12]px/.test(st) && /var\(--muted\)/.test(st) && !k.children.length) { title = (k.textContent || '').trim(); continue; }
      if (tag === 'span' && /inline-block/.test(st) && !k.children.length) {
        open('chips'); cur.appendChild(vk('span', 'vz-chip' + (/var\(--accent\)/.test(st) ? ' hl' : ''), (k.textContent || '').trim()));
      } else if (tag === 'div' && /display:\s*flex/.test(st) && /space-between/.test(st) && k.children.length === 2 && k.children[0].tagName === 'SPAN' && k.children[1].tagName === 'SPAN') {
        open('kv'); var row = vk('div', 'vz-row'); row.appendChild(vk('dt', '', (k.children[0].textContent || '').trim())); row.appendChild(vk('dd', '', (k.children[1].textContent || '').trim())); cur.appendChild(row);
      } else if (tag === 'div' && !k.children.length && /padding:\s*2px 0/.test(st)) {
        open('lines'); cur.appendChild(vk('li', '', (k.textContent || '').trim()));
      } else return null;
    }
    var names = Object.keys(kinds); if (!names.length) return null;
    root.className = 'vz vz-' + (names.length > 1 ? 'mixed' : names[0] === 'kv' ? 'table' : names[0]);
    if (title) root.insertBefore(vk('p', 'vz-title', title), root.firstChild);
    root.appendChild(stage); return root;
  }
  function upgradeVisual(html) {
    try {
      var s = String(html == null ? '' : html).trim(); if (!s) return html;
      var body = new DOMParser().parseFromString(s, 'text/html').body, root = body.firstElementChild;
      if (!root || body.childNodes.length !== 1) return html;
      var tag = root.tagName.toLowerCase(), el = tag === 'svg' ? vzFromSvg(root) : tag === 'div' ? vzFromDiv(root) : null;
      if (!el) return html;
      var box = document.createElement('div'); box.appendChild(el); return box.innerHTML;
    } catch (e) { return html; }
  }

  /* ───────── teoría (página del tema y modo lectura) ───────── */
  function para(txt) { return String(txt || '').split(/\n\s*\n/).filter(function (x) { return x.trim(); }).map(function (p) { return h('p', { text: p.trim() }); }); }
  // Figure block: white card with the (upgraded) visual; the caption sits under the card.
  function figureFor(visual) {
    var fig = h('figure', { 'class': 'fig' }), card = h('div', { 'class': 'fig-card' });
    card.innerHTML = upgradeVisual(visual);
    var cap = card.querySelector(':scope > .vz > .vz-cap');
    fig.appendChild(card);
    if (cap) { var fc = h('figcaption', { 'class': 'fig-cap', text: cap.textContent }); cap.parentNode.removeChild(cap); fig.appendChild(fc); }
    return fig;
  }
  /* ───────── fx: designed lesson figures described as data (section.figure) and code samples (section.code) ─────────
     figure.type: pipeline {stages:[{tag,title,desc}], active, bracket:{from,to,label}, token} · flow {nodes:[{title,desc}], active}
     compare {cols:[{title,tone:'good'|'bad',items:[]}]} · layers {layers:[{title,desc,tone:'top'|'base'}]} · matrix {cols:[], rows:[{label,cells:[]}]}
     + caption. Elements enter with a short stagger the first time the figure scrolls into view (none with reduced motion). */
  var FX_KW = /^(using|namespace|public|private|protected|internal|class|interface|void|var|new|return|if|else|for|foreach|while|try|catch|finally|throw|this|base|null|true|false|static|readonly|async|await|const|let|function|import|export|from|of|in|is|as|out|ref|string|int|bool|object|typeof)$/;
  function codeLine(line) {
    var out = [], re = /(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\b)|(<\/?[\w:.-]+|\/?>)|(\b[A-Za-z_]\w*\b)/g, last = 0, m;
    while ((m = re.exec(line))) {
      if (m.index > last) out.push(document.createTextNode(line.slice(last, m.index)));
      last = re.lastIndex;
      var cls = m[1] ? 'cm' : m[2] ? 'st' : m[3] ? 'nu' : m[4] ? 'tg' : FX_KW.test(m[5]) ? 'kw' : /^[A-Z]/.test(m[5]) ? 'ty' : '';
      out.push(cls ? h('span', { 'class': 'c-' + cls, text: m[0] }) : document.createTextNode(m[0]));
    }
    if (last < line.length) out.push(document.createTextNode(line.slice(last)));
    return out;
  }
  // code: { lang, text, title?, highlight:[line numbers], notes:[{line, text}] }
  function codeBlock(c) {
    var lines = String(c.text || '').replace(/\s+$/, '').split('\n'), hl = c.highlight || [], notes = c.notes || [], noteAt = {};
    notes.forEach(function (n, i) { noteAt[n.line] = i + 1; });
    var pre = h('div', { 'class': 'fx-code-body', role: 'region', 'aria-label': (c.title || c.lang || 'Code') + ' sample', tabindex: '0' }, lines.map(function (ln, i) {
      var n = i + 1;
      return h('div', { 'class': 'fx-cl' + (hl.indexOf(n) > -1 || noteAt[n] ? ' on' : '') }, h('span', { 'class': 'fx-ln', 'aria-hidden': 'true', text: String(n) }),
        h('code', {}, codeLine(ln)), noteAt[n] ? h('span', { 'class': 'fx-mark', 'aria-label': 'Note ' + noteAt[n], text: String(noteAt[n]) }) : null);
    }));
    var head = h('div', { 'class': 'fx-code-hd' }, h('span', { text: c.title || '' }), h('span', { 'class': 'fx-lang', text: { csharp: 'C#', javascript: 'JavaScript', typescript: 'TypeScript', xml: 'XML', json: 'JSON', bash: 'Terminal' }[c.lang] || c.lang || '' }));
    var fig = h('figure', { 'class': 'fx fx-code' }, h('div', { 'class': 'fx-code-card' }, head, pre));
    if (notes.length) fig.appendChild(h('ol', { 'class': 'fx-notes' }, notes.map(function (n) { return h('li', { text: n.text }); })));
    if (c.caption) fig.appendChild(h('figcaption', { 'class': 'fx-cap', text: c.caption }));
    fxWatch(fig); return fig;
  }
  function fxFigure(f) {
    var body, type = f.type, list = function (a) { return Array.isArray(a) ? a : []; };
    if (type === 'pipeline') {
      var st = list(f.stages), act = [].concat(f.active == null ? [] : f.active), br = f.bracket;
      body = h('div', { 'class': 'fx-pipe' + (br ? ' hasbr' : ''), style: '--n:' + st.length },
        br ? h('div', { 'class': 'fx-bracket', style: '--bc:' + (br.from + 1) + ' / ' + (br.to + 2) }, h('span', { text: br.label })) : null,
        h('ol', { 'class': 'fx-stages' }, st.map(function (s, i) {
          return h('li', { 'class': 'fx-stage fx-i' + (act.indexOf(i) > -1 ? ' on' : '') + (br && i >= br.from && i <= br.to ? ' inbr' : '') + (s.tone ? ' ' + s.tone : ''), style: '--i:' + i },
            s.tag ? h('span', { 'class': 'fx-tag', text: s.tag }) : null, h('b', { text: s.title }), s.desc ? h('span', { 'class': 'fx-desc', text: s.desc }) : null);
        })),
        f.token ? h('div', { 'class': 'fx-track', 'aria-hidden': 'true' }, h('span', { 'class': 'fx-token', style: '--to:' + (act.length ? act[act.length - 1] : st.length - 1), text: f.token })) : null);
    } else if (type === 'flow') {
      var nd = list(f.nodes), fa = [].concat(f.active == null ? [] : f.active);
      body = h('ol', { 'class': 'fx-flow', style: '--n:' + nd.length }, nd.map(function (s, i) {
        return h('li', { 'class': 'fx-node fx-i' + (fa.indexOf(i) > -1 ? ' on' : ''), style: '--i:' + i }, h('b', { text: s.title }), s.desc ? h('span', { 'class': 'fx-desc', text: s.desc }) : null);
      }));
    } else if (type === 'compare') {
      body = h('div', { 'class': 'fx-cmp' }, list(f.cols).map(function (c, i) {
        return h('div', { 'class': 'fx-col fx-i' + (c.tone ? ' ' + c.tone : ''), style: '--i:' + i }, h('b', { 'class': 'fx-col-t', text: c.title }), c.sub ? h('span', { 'class': 'fx-desc', text: c.sub }) : null,
          h('ul', {}, list(c.items).map(function (x) { return h('li', { text: x }); })));
      }));
    } else if (type === 'layers') {
      var ly = list(f.layers);
      body = h('ol', { 'class': 'fx-layers' }, ly.map(function (l, i) {
        return h('li', { 'class': 'fx-layer fx-i' + (l.tone ? ' ' + l.tone : ''), style: '--i:' + i + ';--d:' + (ly.length - 1 - i) }, h('b', { text: l.title }), l.desc ? h('span', { 'class': 'fx-desc', text: l.desc }) : null);
      }));
    } else if (type === 'matrix') {
      var cols = list(f.cols);
      body = h('div', { 'class': 'fx-mx-wrap', tabindex: '0', role: 'region', 'aria-label': f.caption || 'Table' }, h('table', { 'class': 'fx-mx' },
        h('thead', {}, h('tr', {}, [h('th', { scope: 'col', text: f.corner || '' })].concat(cols.map(function (c) { return h('th', { scope: 'col', text: c }); })))),
        h('tbody', {}, list(f.rows).map(function (r, i) {
          return h('tr', { 'class': 'fx-i', style: '--i:' + i }, [h('th', { scope: 'row', text: r.label })].concat(list(r.cells).map(function (v) {
            return h('td', { 'class': v === true ? 'yes' : v === false ? 'no' : '' }, v === true ? h('span', { 'class': 'fx-yes', 'aria-label': 'Yes' }, icon('M5 12.5l4.5 4.5L19 7.5', '16')) : v === false ? h('span', { 'class': 'fx-no', 'aria-label': 'No', text: '–' }) : h('span', { text: String(v) }));
          })));
        }))));
    } else return null;
    var fig = h('figure', { 'class': 'fx fx-' + type }, h('div', { 'class': 'fx-card' }, f.title ? h('p', { 'class': 'fx-title', text: f.title }) : null, body));
    if (f.caption) fig.appendChild(h('figcaption', { 'class': 'fx-cap', text: f.caption }));
    fxWatch(fig); return fig;
  }
  // First time a figure is half visible it gets .in (CSS runs the stagger and the token travel). Without IntersectionObserver: shown at once.
  var fxIO = null;
  function fxWatch(el) {
    if (!HAS_DOM || reduceMotion() || typeof IntersectionObserver === 'undefined') { el.classList.add('in', 'still'); return; }
    if (!fxIO) fxIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); fxIO.unobserve(e.target); } }); }, { threshold: 0.45 });
    el.classList.add('fx-wait'); fxIO.observe(el);
  }
  function theoryView(t) {
    var th = t.theory || {}, root = h('article', { 'class': 'theory', id: 'theory' });
    if (th.intro) root.appendChild(h('p', { 'class': 'lead', text: th.intro }));
    (th.sections || []).forEach(function (s, i) {
      var sec = h('section', { 'class': 'tsec', id: 'sec-' + i }, h('header', { 'class': 'tsec-hd' }, h('span', { 'class': 'tsec-n', text: pad(i + 1) }), h('h3', { text: s.heading })), para(s.body));
      var fx = s.figure ? fxFigure(s.figure) : null;
      if (fx) sec.appendChild(fx); else if (s.visual) sec.appendChild(figureFor(s.visual));
      if (s.code) sec.appendChild(codeBlock(s.code));
      root.appendChild(sec);
    });
    if ((th.steps || []).length) root.appendChild(h('section', { 'class': 'tsec' }, h('header', { 'class': 'tsec-hd' }, h('h3', { text: (META.exam && META.exam.howTo) || 'How to do it' })), h('ol', { 'class': 'steps' }, th.steps.map(function (s) { return h('li', { text: String(s).replace(/^Step\s*\d+\s*[:.\-–—]\s*/i, '') }); }))));
    if (th.example) root.appendChild(h('section', { 'class': 'tcard example' }, h('p', { 'class': 'tlabel', text: 'Example' }), h('p', { text: th.example })));
    if ((th.examTips || []).length) root.appendChild(h('section', { 'class': 'tcard exam' }, h('p', { 'class': 'tlabel', text: 'On the exam' }), h('ul', { 'class': 'tips' }, th.examTips.map(function (s) {
      var trap = /\btrap\b/i.test(String(s).slice(0, 40));
      return h('li', { 'class': trap ? 'trap' : 'ok' }, h('span', { 'class': 'tip-ic', 'aria-hidden': 'true' }, trap ? icon('M12 4.5l8.5 15h-17z|M12 10v4.5|M12 17.2v.01', '18') : icon('M5 12.5l4.5 4.5L19 7.5', '18')), h('span', { text: s }));
    }))));
    if ((th.glossary || []).length) root.appendChild(h('section', { 'class': 'tsec' }, h('header', { 'class': 'tsec-hd' }, h('h3', { text: 'Glossary' })), h('dl', { 'class': 'gl' }, th.glossary.map(function (g) { return h('div', { 'class': 'gl-item' }, h('dt', { text: g.term }), h('dd', { text: g.def })); }))));
    return root;
  }

  /* ───────── Hoy: flujo de la clase ───────── */
  function curTopic(F) { return F && F.topicId ? TBYID[F.topicId] : null; }
  function saveFlow() { if (UI.cur && UI.cur === UI.flow) lsSet(PFX + 'flow', JSON.stringify(UI.flow)); }
  function saveMain() { if (UI.flow) lsSet(PFX + 'flow', JSON.stringify(UI.flow)); }
  function dropFlow() { UI.flow = null; lsSet(PFX + 'flow', ''); }
  function itemOk(it) { return it.k === 'c' ? !!(TBYID[it.tid] && checkQ(TBYID[it.tid], it.ci)) : it.t === 'c' ? !!CBYID[it.id] : !!QBYID[it.id]; }
  function loadFlow() {
    var f = jparse(lsGet(PFX + 'flow'), null);
    if (!f || f.date !== todayISO() || !f.phase || f.phase === 'done') return null;
    if (f.topicId && !TBYID[f.topicId]) return null;
    f.ck = []; if (f.phase === 'check') f.phase = 'practice';
    f.qs = (Array.isArray(f.qs) ? f.qs : []).filter(function (it) { return it && typeof it === 'object' && itemOk(it); });
    f.rv = (Array.isArray(f.rv) ? f.rv : []).filter(function (it) { return it && typeof it === 'object' && itemOk(it); });
    return repairFlow(f);
  }
  // A saved flow whose items changed (renamed / removed after a republish): clamp the position so there is always something to show or a way out.
  function repairFlow(f) {
    if (!f || !PHASES[f.kind] || PHASES[f.kind].indexOf(f.phase) < 0) return null;
    var n = phaseItems(f, f.phase).length, i = +f.i;
    if (!(i >= 0 && i < n)) { f.i = 0; if (!n) f.phase = nextPhase(f); }
    return f.phase === 'done' ? null : f;
  }
  function phaseItems(F, ph) { return ph === 'class' ? [1] : ph === 'check' ? F.ck : ph === 'practice' ? F.qs : ph === 'review' ? F.rv : []; }
  function nextPhase(F) {
    var seq = PHASES[F.kind] || [], k = seq.indexOf(F.phase);
    for (var i = k + 1; i < seq.length; i++) if (phaseItems(F, seq[i]).length) return seq[i];
    return 'done';
  }
  function newFlow(kind, topic, qs, skills) {
    var st = docs.quiz.stats, ids = qs.map(function (q) { return q.id; });
    var F = { kind: kind, date: todayISO(), topicId: topic ? topic.id : null, mode: null, phase: '', i: 0, ck: [], qs: makeItems(qs), rv: [], ok: 0, okC: 0, recorded: false };
    if (kind === 'day') F.rv = pickReview(st, docs.cards, todayISO(), skills, ids, REVIEW_MAX, docs.sessions.checks, studiedMap(docs.sessions));
    if (kind === 'sat') F.rv = pickRechecks(docs.sessions.checks, todayISO(), st, ids);   // Mixed review: up to 20 questions on what you studied, plus the re-checks that are due
    if (kind === 'cards') F.rv = pickReview({}, docs.cards, todayISO(), null, [], REVIEW_MAX, null, studiedMap(docs.sessions));
    F.phase = (PHASES[kind] || []).filter(function (p) { return phaseItems(F, p).length; })[0] || 'done';
    return F;
  }
  function openFlow(F, isMain, from) {
    F.from = from || 'hoy';
    if (isMain) { UI.flow = F; UI.practice = null; UI.cur = F; saveFlow(); } else { UI.practice = F; UI.cur = F; }
    UI.dir = 1; go('hoy');
  }
  function makeDayFlow(topic) {
    var F = newFlow('day', topic, pickTopicPractice(topic, 3, docs.quiz.stats), topic.skills);
    UI.flow = F; UI.practice = null; UI.cur = null; saveMain(); return F;
  }
  function startDayClass(topic) { makeDayFlow(topic); openTopic(topic.id, 'hoy', 'today'); }
  // Today's steps: jump straight to the practice or review phase (creating today's flow if it has not started).
  function startPhase(ph) {
    var F = UI.flow;
    if (!F) { var p = planFor(todayISO(), docs.sessions.lessonsDone); if (p.kind !== 'lesson') return; F = makeDayFlow(p.topic); }
    if (!phaseItems(F, ph).length) { toast(ph === 'practice' ? 'No practice questions for this class' : 'Nothing to review right now'); return; }
    if (F.phase !== ph) { F.phase = ph; F.i = 0; F.mode = null; }
    UI.cur = F; UI.dir = 1; saveFlow(); renderView(); window.scrollTo(0, 0);
  }
  // Mixed review: 20 questions (6 + 9 + 5 by domain) only from the skills of the topics you have studied; fewer if that pool is small.
  function satPool() { var sk = studiedSkills(studiedMap(docs.sessions)); return QUESTIONS.filter(function (q) { return sk[q.skill]; }); }
  function satQuestions() { return pickSplit(examSplit('short'), docs.quiz.stats, studiedSkills(studiedMap(docs.sessions))); }
  function startToday() {
    if (UI.flow) {
      var F0 = UI.flow;
      if (F0.phase === 'class' && F0.topicId && TBYID[F0.topicId]) { openTopic(F0.topicId, 'hoy', 'today'); return; }
      UI.cur = UI.flow; UI.dir = 1; renderView(); window.scrollTo(0, 0); return;
    }
    var p = planFor(todayISO(), docs.sessions.lessonsDone);
    if (p.kind === 'lesson') startDayClass(p.topic); else startMixedReview();
  }
  // Mixed review, any day: up to 20 questions on what you have studied, plus the re-checks that are due.
  function startMixedReview() {
    if (UI.flow) { startToday(); return; }
    var SF = newFlow('sat', null, satQuestions(), null);
    if (SF.phase === 'done') { toast('Nothing to review yet: study a few topics first'); return; }
    openFlow(SF, true);
  }
  function startWeakPractice() {
    var st = docs.quiz.stats, weak = weakTopics(st, 3), sk = [];
    weak.forEach(function (w) { sk = sk.concat(TBYID[w.id].skills || []); });
    var qs = pickN(skillPool(uniq(sk)), 10, st);
    if (!qs.length) { toast('Answer some questions first to find your weak topics'); return; }
    var F = newFlow('practice', null, qs, null); F.title = 'Weak topics'; openFlow(F, false, 'hoy');
  }
  function startCards() { var F = newFlow('cards', null, [], null); if (!F.rv.length) { toast('No cards to review'); return; } openFlow(F, true); }
  // Mixed practice: 10 questions round-robin over the skills of a cluster of easily confused topics you have already seen.
  function startMixed(cl) {
    var info = clusterInfo(cl, studiedMap(docs.sessions)), qs = info.ok ? pickMixed(info.skills, 10, docs.quiz.stats) : [];
    if (!qs.length) { toast('Study a couple more topics first'); return; }
    var F = newFlow('practice', null, qs, null); F.title = 'Mixed · ' + cl.title; openFlow(F, false, 'examen');
  }
  function startModulePractice(m) {
    var qs = pickN(modulePool(m.n), 10, docs.quiz.stats);
    if (!qs.length) { toast('No questions for this module'); return; }
    var F = newFlow('practice', null, qs, null); F.title = modName(m); openFlow(F, false, 'examen');
  }
  // Short review of the questions you got wrong while sure (up to 5, oldest first).
  function startHcReview() {
    var qs = hcList(docs.quiz.stats).slice(0, 5);
    if (!qs.length) { toast('No confident mistakes to review'); return; }
    var F = newFlow('practice', null, [], null); F.qs = qs.map(itemFor); F.phase = 'practice'; F.title = 'Confident mistakes'; openFlow(F, false, 'progreso');
  }
  function exitFlow() { var from = UI.cur && UI.cur.from; if (UI.cur === UI.practice) UI.practice = null; UI.cur = null; UI.dir = 0; if (from && from !== 'hoy') UI.tab = from; renderView(); window.scrollTo(0, 0); }
  function toPhase(ph) { var F = UI.cur; F.phase = ph; F.i = 0; F.mode = null; if (ph === 'done') finishFlow(F); }
  function finishFlow(F) {
    if (F.recorded) return; F.recorded = true;
    F.ok = F.qs.filter(function (it) { var q = qOf(it); return q && isCorrect(q, it.sel); }).length;
    var t = todayISO();
    if (F.kind === 'day') {
      docs.sessions.lessonsDone[F.topicId] = { at: Date.now() }; docs.sessions.seen[F.topicId] = docs.sessions.seen[F.topicId] || Date.now(); docs.sessions.days[t] = F.topicId;
      touch('sessions');
    } else if (F.kind === 'sat') { docs.sessions.days[t] = 'review'; touch('sessions'); }
    if (F.kind === 'day' || F.kind === 'sat' || F.kind === 'cards') { docs.sessions.rev[t] = 1; touch('sessions'); }   // Today's review is done: the review streak counts this day
    if (F === UI.flow) { UI.flow = null; lsSet(PFX + 'flow', ''); }
  }
  function step(dir) {
    var F = UI.cur; UI.dir = dir; var arr = phaseItems(F, F.phase);
    if (F.phase === 'class') { if (curTopic(F)) markSeen(F.topicId); toPhase(nextPhase(F)); }
    else if (F.i < arr.length - 1) F.i++;
    else toPhase(nextPhase(F));
    saveFlow(); renderView(); window.scrollTo(0, 0);
  }
  function flowSteps(F) {
    var seq = PHASES[F.kind] || [], total = 0, pos = 0, before = true;
    seq.forEach(function (p) { var n = phaseItems(F, p).length; total += n; if (p === F.phase) { pos += F.i; before = false; } else if (before) pos += n; });
    if (F.phase === 'done') pos = total;
    var cur = F.phase === 'check' ? F.ck[F.i] : F.phase === 'practice' ? F.qs[F.i] : F.phase === 'review' ? F.rv[F.i] : null;
    if (cur && (cur.checked || cur.shown)) pos += 0.6;
    return { total: Math.max(1, total), pos: pos };
  }

  /* ───────── pregunta con feedback inmediato ───────── */
  // sure: true = "Sure", false = "Not sure". Records the answer with its confidence (topic check questions too).
  function checkFlowItem(it, force, sure) {
    var q = qOf(it); if (it.checked || !it.sel.length || !q) return;
    it.checked = true; it.sure = sure; recordInto(docs.quiz.stats, q, isCorrect(q, it.sel), !!force, sure); touch('quiz');
    if (it.rc) recheckAfter(it);
    saveFlow(); UI.scrollFb = true; renderView();
  }
  // A re-check is two review items with the same rc (topic id). When both are answered: both right = Mastered, else it stays Passed and comes back in 2 days.
  function recheckAfter(it) {
    var F = UI.cur, pair = F ? (F.rv || []).filter(function (x) { return x.rc === it.rc; }) : [];
    if (!pair.length || !pair.every(function (x) { return x.checked; }) || !docs.sessions.checks[it.rc]) return;
    var good = pair.every(function (x) { var q = qOf(x); return q && isCorrect(q, x.sel); });
    docs.sessions.checks[it.rc] = applyRecheck(docs.sessions.checks[it.rc], good, todayISO()); touch('sessions');
    it.rcRes = good ? 'm' : 'f'; if (good) celebrate(it.rc);
  }
  // Rare, earned moment: toast plus a short pop on the Mastered badge (UI.pop is read once by the badges that render next).
  function celebrate(id) { UI.pop = id; toast('Topic mastered'); setTimeout(function () { if (UI.pop === id) UI.pop = null; }, 800); }
  // "Sure" / "Not sure" buttons that replace a plain submit. Shown once an answer is selected. keys: also bind S / N.
  function confButtons(onPick, keys) {
    if (keys) { UI.keys.s = function () { onPick(true); }; UI.keys.n = function () { onPick(false); }; }
    return h('div', { 'class': 'conf' },
      h('button', { 'class': 'btn primary big sure', type: 'button', onclick: function () { onPick(true); } }, h('span', { text: 'Sure' }), keys ? h('kbd', { text: 'S' }) : null),
      h('button', { 'class': 'btn big unsure', type: 'button', onclick: function () { onPick(false); } }, h('span', { text: 'Not sure' }), keys ? h('kbd', { text: 'N' }) : null));
  }
  // One-line reason for asking; only until the first answer with confidence has been recorded.
  function confWhy() { return calibration(docs.quiz.stats).n ? null : h('p', { 'class': 'small muted conf-why', text: 'Saying how sure you are helps you spot the topics you only think you know.' }); }
  function optionRows(it, q, locked, onPick, nokeys) {
    var multi = q.type === 'multi', btns = [];
    var grp = h('div', { 'class': 'opts', role: multi ? 'group' : 'radiogroup', 'aria-label': 'Answers' }, it.order.map(function (oi, pos) {
      var on = it.sel.indexOf(oi) > -1, cls = 'opt' + (on ? ' sel' : '') + (locked ? ' locked' : ''), mark = null;
      if (locked) { var isAns = q.answer.indexOf(oi) > -1; if (isAns) { cls += ' right'; mark = 'Correct'; } else if (on) { cls += ' wrong'; mark = 'Your answer'; } }
      if (!nokeys) UI.keys[String(pos + 1)] = UI.keys[String.fromCharCode(97 + pos)] = function () { onPick(oi); };
      var b = h('button', { 'class': cls, type: 'button', role: multi ? 'checkbox' : 'radio', 'aria-checked': on ? 'true' : 'false', 'aria-disabled': locked ? 'true' : null, onclick: function () { onPick(oi); } },
        h('span', { 'class': 'ind' + (multi ? ' sq' : ''), 'aria-hidden': 'true' }), h('span', { 'class': 'otx', text: q.options[oi] }), mark ? h('span', { 'class': 'omark', text: mark }) : null);
      btns.push(b); return b;
    }));
    if (!multi) rovingRadios(btns, locked ? null : function (n) { onPick(it.order[n]); });
    return grp;
  }
  function feedbackBox(it, q) {
    var right = isCorrect(q, it.sel), fb = h('div', { 'class': 'fb ' + (right ? 'ok' : 'ko'), role: 'status' }, h('h3', { text: right ? 'Correct' : 'Incorrect' }), h('p', { text: q.explanation || '' }));
    if (!right && it.sure === true) fb.appendChild(h('p', { 'class': 'hcnote', text: "You were sure — this is a trap worth remembering. It comes back in tomorrow's review." }));
    if (it.rcRes === 'm') fb.appendChild(h('p', { 'class': 'rcnote' }, masteredMark('Mastered', UI.pop === it.rc), ' ' + (TBYID[it.rc] ? TBYID[it.rc].title + ' is mastered.' : 'Topic mastered.')));
    else if (it.rcRes === 'f') fb.appendChild(h('p', { 'class': 'rcnote' }, passedMark(), ' Not mastered yet. The topic stays Passed and the re-check comes back in 2 days.'));
    var watch = right ? null : watchBtn(q);
    if (tutorUsable()) {
      var out = h('div', { 'class': 'tutor-out', 'aria-live': 'polite', hidden: true }), stop = h('button', { 'class': 'btn small', type: 'button', text: 'Stop', hidden: true });
      var ask = h('button', { 'class': 'btn small', type: 'button', text: 'Explain it to me' });
      ask.onclick = function () { out.hidden = false; askTutor(tutorPromptQuestion(q, it), out, ask, stop); };
      fb.appendChild(h('div', { 'class': 'row' }, watch, ask, stop)); fb.appendChild(out);
    } else if (watch) fb.appendChild(h('div', { 'class': 'row' }, watch));
    if (!right) fb.appendChild(selfExplain(it, q));
    return fb;
  }
  // "Watch the explanation · L14 1:02": the lesson chapter that covers this question (data/qmap.js), only if that topic has a video.
  function explainSpot(q) {
    var m = (window.AB620_QMAP || {})[q.id], t = m && TBYID[m[0]], v = t && topicAudio(t);
    return v && v.video && v.scenes[m[1]] ? { tid: t.id, start: +v.scenes[m[1]].start || 0 } : null;
  }
  function watchBtn(q) {
    var sp = explainSpot(q); if (!sp) return null;
    return h('button', { 'class': 'btn small watch', type: 'button', onclick: function () { watchExplain(sp); } }, icon('M8 5v14l11-7z', '16'), h('span', { text: 'Watch the explanation · ' + sp.tid + ' ' + fmtTime(sp.start) }));
  }
  // Opens the topic on its video at that chapter; the back link returns to the results list or the question flow, at the same scroll.
  function watchExplain(sp) {
    var y = window.pageYOffset || 0, back = UI.cur ? 'Question' : UI.quiz ? 'Results' : null, el;
    if (UI.topic && UI.topic.id === sp.tid && Pl && Pl.topic.id === sp.tid) { el = document.getElementById('player'); if (el) el.scrollIntoView({ block: 'start' }); Pl.explain = true; plSeekTo(sp.start); plPlay(); return; }   // the check of this very topic
    openTopic(sp.tid, null, 'learn', false, { retY: y, retLabel: back });
    if (Pl && Pl.topic.id === sp.tid) { Pl.explain = true; plSeekTo(sp.start); plPlay(); }
    el = document.getElementById('player'); if (el) el.scrollIntoView({ block: 'start' });
  }
  // After a mistake: one sentence on why the right answer is right (optional, never blocks "Next"). it.se = { t: text, cmp: 1 when compared }.
  function selfExplain(it, q) {
    var se = it.se || (it.se = { t: '', cmp: 0 }), box = h('div', { 'class': 'selfx' }), usable = tutorUsable();
    function keep() { saveFlow(); }
    function draw() {
      box.innerHTML = '';
      if (se.cmp) {
        add(box, [h('p', { 'class': 'clabel', text: 'Your sentence' }), h('p', { 'class': 'selfx-me', text: se.t }),
          h('p', { 'class': 'clabel', text: 'The explanation says' }), h('p', { 'class': 'selfx-off', text: q.explanation || '' }),
          h('button', { 'class': 'link small', type: 'button', text: 'Edit my sentence', onclick: function () { se.cmp = 0; keep(); draw(); } })]);
        return;
      }
      var ta = h('textarea', { 'class': 'ctext', rows: 2, maxlength: 400, placeholder: 'Write one sentence…', value: se.t });
      var out = h('div', { 'class': 'tutor-out', 'aria-live': 'polite', hidden: true }), stop = h('button', { 'class': 'btn small', type: 'button', text: 'Stop', hidden: true });
      var go = h('button', { 'class': 'btn small', type: 'button', text: usable ? 'Check my reasoning' : 'Compare', disabled: !se.t.trim() });
      ta.addEventListener('input', function () { se.t = ta.value; go.disabled = !ta.value.trim(); keep(); });
      go.onclick = function () {
        if (!usable || !tutorUsable()) { se.cmp = 1; keep(); draw(); return; }
        out.hidden = false;
        Promise.resolve(askTutor(tutorPromptSelf(q, it, se.t.trim()), out, go, stop)).then(function () { if (!tutorUsable()) { se.cmp = 1; keep(); draw(); } });
      };
      add(box, [h('label', { 'class': 'ctype' }, h('span', { 'class': 'clabel', text: 'In one sentence: why is the right answer right? (optional)' }), ta), h('div', { 'class': 'row' }, go, stop), out]);
    }
    draw();
    return box;
  }
  // Devuelve { main, actions } para una pregunta dentro del flujo.
  function questionScreen(it, force, nextLabel, kicker) {
    var q = qOf(it), multi = q.type === 'multi', need = (q.answer || []).length, locked = !!it.checked;
    function pick(oi) {
      if (it.checked) return;
      if (multi) { var i = it.sel.indexOf(oi); if (i > -1) it.sel.splice(i, 1); else it.sel.push(oi); }
      else it.sel = [oi];
      saveFlow(); renderView();
    }
    function submit(sure) { checkFlowItem(it, force, sure); }
    var main = [kicker ? h('p', { 'class': 'kicker', text: kicker }) : null, h('p', { 'class': 'qstem', text: q.stem })];
    if (multi) main.push(h('p', { 'class': 'hint', text: 'Choose ' + need + '.' }));
    main.push(optionRows(it, q, locked, pick));
    var actions;
    if (!locked && it.sel.length) main.push(confWhy());
    if (locked) { main.push(feedbackBox(it, q)); actions = [h('button', { 'class': 'btn primary big', type: 'button', text: nextLabel, onclick: function () { step(1); } })]; UI.keys.enter = function () { step(1); }; }
    else if (it.sel.length) actions = [confButtons(submit, true)];
    else actions = [h('p', { 'class': 'hint center', text: multi ? 'Tap your answers, then say how sure you are' : 'Tap an answer' })];
    return { main: main, actions: actions };
  }
  // first: this is the first card of the session (shows the "How cards work" note).
  function cardScreen(r, first) {
    var c = CBYID[r.id], typed = String(r.typed || '').trim();
    function grade(g) { docs.cards[c.id] = gradeCard(docs.cards[c.id], g, todayISO(), docs.settings.examDate); touch('cards'); step(1); }
    function flip() { if (r.shown) return; r.shown = true; UI.dir = 0; saveFlow(); renderView(); }
    var kids = [h('p', { 'class': 'kicker', text: 'Card' }), h('p', { 'class': 'cfront', text: c.front })];
    if (!r.shown) {
      var ta = h('textarea', { 'class': 'ctext', id: 'ctext', rows: 2, maxlength: 800, placeholder: 'Type what you remember…', value: r.typed || '' });
      var grow = function () { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight + 2, 200) + 'px'; };
      ta.addEventListener('input', function () { r.typed = ta.value; saveFlow(); grow(); });
      ta.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) { ev.preventDefault(); flip(); } });   // plain Enter = new line; the global shortcuts ignore textareas
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(grow);
      kids.push(h('p', { 'class': 'chint', text: 'Answer it in your head (or type it below), then reveal the answer and rate yourself.' }));
      kids.push(h('div', { 'class': 'ctype', onclick: function (ev) { ev.stopPropagation(); } }, h('label', { 'class': 'clabel', 'for': 'ctext', text: 'Your answer (optional)' }), ta));
    } else {
      if (typed) kids.push(h('div', { 'class': 'cmine' }, h('p', { 'class': 'clabel', text: 'Your answer' }), h('p', { 'class': 'cmine-t', text: typed })));
      kids.push(h('div', { 'class': 'cback' }, typed ? h('p', { 'class': 'clabel', text: 'Correct answer' }) : null, h('p', { text: c.back })));
    }
    var card = h('div', { 'class': 'fcard' + (r.shown ? ' open' : ''), onclick: flip }, kids);
    var help = null;
    if (first) {
      help = h('details', { 'class': 'chelp' }, h('summary', { text: 'How cards work' }),
        h('p', { text: 'Trying to recall an answer before you see it makes it stick far better than rereading. After you reveal it, rate yourself honestly (Again, Hard, Good or Easy): the schedule only works if the rating is true. The app then picks the next review date for each card: cards you know come back later and later, cards you miss come back sooner, and nothing is scheduled after your exam day.' }));
      help.open = !!UI.cardHelp; help.addEventListener('toggle', function () { UI.cardHelp = help.open; });
    }
    var acts;
    if (r.shown) {
      var gb = function (key, label, cls, g) { UI.keys[key] = function () { grade(g); }; return h('button', { 'class': 'btn big ' + cls, type: 'button', onclick: function () { grade(g); } }, h('span', { text: label }), h('kbd', { text: key })); };
      acts = [h('p', { 'class': 'fhint small muted center', text: 'Missed cards come back in your next review. Hard, Good and Easy push the next review date further out each time (Easy the most).' }),
        h('div', { 'class': 'fgrade' }, gb('1', 'Again', 'g1', 'again'), gb('2', 'Hard', 'g2', 'hard'), gb('3', 'Good', 'g3', 'good'), gb('4', 'Easy', 'g4', 'easy'))];
    } else {
      UI.keys.enter = flip; UI.keys[' '] = flip;
      acts = h('div', { 'class': 'fgrade one' }, h('button', { 'class': 'btn primary big', type: 'button', onclick: flip }, h('span', { text: 'Show answer' }), h('kbd', { text: 'Space' })));
    }
    return { main: [h('div', { 'class': 'fwrap' }, help, card, acts)], actions: [], inline: true, center: true };
  }
  // Titles (up to 3) of the topics behind the questions answered wrong in this flow.
  function missedTopics(F) {
    var out = [];
    (F.qs || []).concat((F.rv || []).filter(function (x) { return x.t === 'q' || x.k === 'c'; })).forEach(function (it) {
      var q = qOf(it); if (!q || !it.checked || isCorrect(q, it.sel)) return;
      var tp = it.k === 'c' ? TBYID[it.tid] : it.rc ? TBYID[it.rc] : TOPICS.filter(function (t) { return (t.skills || []).indexOf(q.skill) > -1; })[0];
      if (tp && out.indexOf(tp.title) < 0) out.push(tp.title);
    });
    return out.slice(0, 3);
  }
  function doneScreen(F) {
    var t = todayISO(), done = docs.sessions.lessonsDone, big, sub, lines = [], btn, rec = F.topicId ? docs.sessions.checks[F.topicId] : null, nx = nextTopic(done);
    var nextSub = nx ? 'Next lesson: ' + nx.title + '.' : 'You have finished every lesson.';
    if (F.kind === 'day') { big = 'Lesson ' + countDone(done) + ' complete'; sub = nextSub; }
    else if (F.kind === 'sat') { big = 'Review complete'; sub = nextSub; }
    else if (F.kind === 'practice') { big = 'Practice finished'; sub = 'Keep it up.'; }
    else { big = 'Cards reviewed'; sub = nextSub; }
    if (rec && F.kind === 'day') lines.push('Check: ' + rec.ok + ' of ' + rec.n + (isPassed(rec) ? '' : ' · still open, retry it from Today'));
    if (F.qs.length) lines.push((F.kind === 'day' ? 'Exam practice: ' : 'Correct answers: ') + F.ok + ' of ' + F.qs.length);
    var nCards = (F.rv || []).filter(function (x) { return x.t === 'c'; }).length, nQ = (F.rv || []).filter(function (x) { return x.t === 'q'; }).length;
    if (nCards) lines.push('Cards rated: ' + nCards);
    if (nQ) lines.push((F.kind === 'sat' ? 'Re-check questions: ' : 'Review questions: ') + nQ + ' · ' + (F.rv || []).filter(function (x) { var q = x.t === 'q' ? qOf(x) : null; return q && isCorrect(q, x.sel); }).length + ' right');
    var miss = missedTopics(F);
    if (miss.length) lines.push('Worth another look: ' + miss.join(', '));
    var sk = F.kind !== 'practice' ? reviewStreak(docs.sessions.rev, t) : 0;
    if (sk) lines.push(streakText(sk));
    var back = (F.kind === 'practice' || F.from === 'buscar') && F.from !== 'hoy' ? F.from : 'hoy';
    btn = h('button', { 'class': 'btn primary big', type: 'button', text: back === 'examen' ? 'Back to Exam' : back === 'progreso' ? 'Back to Progress' : back === 'buscar' ? 'Back to Search' : 'Back to Today', onclick: function () { if (F === UI.practice) UI.practice = null; else dropFlow(); UI.cur = null; go(back); } });
    UI.keys.enter = function () { btn.click(); };
    return { main: [h('div', { 'class': 'done' }, h('h1', { text: big }), h('p', { 'class': 'sub', text: sub }), lines.map(function (l) { return h('p', { 'class': 'doneline', text: l }); }),
      miss.length ? h('button', { 'class': 'link', type: 'button', text: 'See my weakest topics', onclick: function () { if (F === UI.practice) UI.practice = null; else dropFlow(); UI.cur = null; go('progreso'); } }) : null)], actions: [btn], inline: true };
  }
  function flowView() {
    var F = UI.cur, ph = F.phase, S, label;
    if ((ph === 'practice' || ph === 'review') && !phaseItems(F, ph)[F.i]) {   // position outside the list (items changed): restart the phase, or move on if it is empty
      F.i = 0; if (!phaseItems(F, ph).length) { toPhase(nextPhase(F)); ph = F.phase; } saveFlow();
    }
    if (ph === 'practice') { S = questionScreen(F.qs[F.i], false, F.i === F.qs.length - 1 && nextPhase(F) === 'done' ? 'Finish' : 'Next', F.kind === 'day' ? 'Exam practice' : F.title || null); label = 'Question ' + (F.i + 1) + ' of ' + F.qs.length; }
    else if (ph === 'review') {
      var r = F.rv[F.i]; S = r.t === 'q' ? questionScreen(r, true, F.i === F.rv.length - 1 ? 'Finish' : 'Next', r.rc && TBYID[r.rc] ? 'Re-check · ' + TBYID[r.rc].title : 'Review') : cardScreen(r, F.rv.slice(0, F.i).every(function (x) { return x.t === 'q'; }));
      label = 'Review ' + (F.i + 1) + ' of ' + F.rv.length;
    }
    else { S = doneScreen(F); label = ''; }
    var root = h('div', { 'class': 'flow' + (S.center ? ' fcenter' : '') });
    if (ph !== 'done') root.appendChild(h('h1', { 'class': 'sr', text: (F.kind === 'day' ? 'Today' : F.title || (F.kind === 'sat' ? 'Review' : 'Cards')) + ' · ' + label }));
    root.appendChild(h('div', { 'class': 'ftop' }, ph === 'done' ? h('span') : h('button', { 'class': 'link', type: 'button', text: '‹ Exit', onclick: exitFlow }), h('span', { 'class': 'flabel', text: label }), h('span')));
    if (ph !== 'done') { var sp = flowSteps(F); root.appendChild(h('div', { 'class': 'pbar', 'aria-hidden': 'true' }, h('i', { style: { transform: 'scaleX(' + Math.min(1, sp.pos / sp.total) + ')' } }))); }
    var main = h('div', { 'class': 'fmain' + (S.inline ? ' inline' : '') + (UI.dir ? (UI.dir > 0 ? ' enter-next' : ' enter-prev') : '') }, S.main);
    root.appendChild(main);
    if (S.inline) { if (S.actions && S.actions.length) main.appendChild(h('div', { 'class': 'actions static' }, S.actions)); }
    else root.appendChild(h('div', { 'class': 'actions' + (S.col ? ' col' : '') }, S.actions));
    UI.dir = 0;
    return root;
  }

  /* ───────── status marks: watched (green check) and mastered (filled badge) ───────── */
  var CHECK = 'M5 12.5l4.5 4.5L19 7.5';
  var FLAME = 'M12 3c.5 3.5 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2 1-3.5 2.2-4.6.1 1.6.8 2.6 1.8 2.9C10.6 8.6 11 5.6 12 3z';
  function watchedMark(withText) { return h('span', { 'class': 'wchk' + (withText ? ' txt' : ''), role: 'img', 'aria-label': 'Watched', title: 'Watched' }, icon(CHECK, '14'), withText ? h('span', { text: 'Watched' }) : null); }
  function masteredMark(label, pop) { return h('span', { 'class': 'mpill' + (pop ? ' pop' : ''), title: 'You passed the check and, a day or more later, the re-check', text: label || 'Mastered' }); }
  function passedMark(label) { return h('span', { 'class': 'mpill passed', title: 'You passed the check questions. Pass the re-check a day or more later to master the topic.', text: label || 'Passed' }); }
  function marksFor(id, withText) {
    var out = [], rec = docs.sessions.checks[id]; if (isWatchedTopic(id)) out.push(watchedMark(withText));
    if (isMastered(rec)) out.push(masteredMark(null, UI.pop === id)); else if (isPassed(rec)) out.push(passedMark());
    return out;
  }
  function passedCount() { var n = 0; TOPICS.forEach(function (t) { var r = docs.sessions.checks[t.id]; if (isPassed(r) && !isMastered(r)) n++; }); return n; }
  // Watched = the video was watched, or the lesson was completed (old data has completed lessons without `watched`).
  function isWatchedTopic(id) { return !!(docs.sessions.watched[id] || docs.sessions.lessonsDone[id]); }
  function watchedCount() { var n = 0; TOPICS.forEach(function (t) { if (isWatchedTopic(t.id)) n++; }); return n; }
  function masteredCount() { var n = 0; TOPICS.forEach(function (t) { if (isMastered(docs.sessions.checks[t.id])) n++; }); return n; }
  function modWatched(n) { return modTopics(n).filter(function (t) { return isWatchedTopic(t.id); }).length; }
  function modMastered(n) { return modTopics(n).filter(function (t) { return isMastered(docs.sessions.checks[t.id]); }).length; }

  /* ───────── Today ───────── */
  function dayRows(topic, F, finished) {
    var S = docs.sessions, rec = S.checks[topic.id], w = isWatchedTopic(topic.id), ph = F ? F.phase : '', post = finished || (F && ph !== 'class'), rows = [];
    // go: what the row opens. Practice / Review need today's flow, so they are not clickable once the day is finished or when the phase has no items.
    rows.push({ k: 'Class', go: 'class', st: post || w ? 'done' : S.seen[topic.id] ? 'doing' : 'todo', tx: w ? 'Watched' : post ? 'Done' : S.seen[topic.id] ? 'Started' : 'To do' });
    if ((topic.check || []).length) rows.push(rec ? { k: 'Check', go: 'check', st: isPassed(rec) ? 'done' : 'doing', tx: isMastered(rec) ? 'Mastered' : isPassed(rec) ? 'Passed' : rec.ok + ' of ' + rec.n + ' correct · still open' } : post ? { k: 'Check', go: 'check', st: 'skipped', tx: 'Skipped' } : { k: 'Check', go: 'check', st: 'todo', tx: 'To do' });
    if (F ? F.qs.length : (topic.skills || []).length) { var pd = finished || ph === 'review' || ph === 'done'; rows.push({ k: 'Practice', go: finished ? null : 'practice', st: pd ? 'done' : ph === 'practice' ? 'doing' : 'todo', tx: pd ? 'Done' : ph === 'practice' ? 'In progress' : 'To do' }); }
    // Before Start there is no flow yet: preview the review the day would get (day 1 has nothing due).
    var rd = finished || ph === 'done', none = F ? !F.rv.length : !finished && !pickReview(docs.quiz.stats, docs.cards, todayISO(), topic.skills, [], REVIEW_MAX, S.checks, studiedMap(S)).length;
    rows.push(none && !rd ? { k: 'Review', go: null, st: 'none', tx: 'Nothing due' } : { k: 'Review', go: finished ? null : 'review', st: rd ? 'done' : ph === 'review' ? 'doing' : 'todo', tx: rd ? 'Done' : ph === 'review' ? 'In progress' : 'To do' });
    return rows;
  }
  // Course line: days to the exam, lessons watched, and one tick per lesson grouped by module (watched / check passed / today's lesson). Opens Progress.
  function heroStats(now) {
    var nT = TOPICS.length, nW = watchedCount(), nP = 0, days = countdownText();
    var ticks = h('span', { 'class': 'ticks', 'aria-hidden': 'true' }, MODULES.map(function (m) {
      var ts = modTopics(m.n);
      return ts.length ? h('span', { 'class': 'tk-g', style: 'flex-grow:' + ts.length }, ts.map(function (t) {
        var rec = docs.sessions.checks[t.id], ok = isPassed(rec); if (ok) nP++;
        return h('span', { 'class': 'tk' + (now && t.id === now.id ? ' now' : ok ? ' ok' : isWatchedTopic(t.id) ? ' w' : '') });
      })) : null;
    }));
    var label = (days ? days + '. ' : '') + nW + ' of ' + nT + ' lessons watched, ' + nP + (nP === 1 ? ' check' : ' checks') + ' passed. Open Progress.';
    return h('button', { 'class': 'hstats', type: 'button', 'aria-label': label, onclick: function () { go('progreso'); } },
      h('span', { 'class': 'hs-row' }, days ? h('b', { 'class': 'hs-days', text: days }) : null, h('span', { 'class': 'hs-n', text: nW + ' of ' + nT + ' watched' })), ticks);
  }
  function homeView() {
    var t = todayISO(), done = docs.sessions.lessonsDone, M = TOPICS.length, plan = planFor(t, done), doneT = docs.sessions.days[t], F = UI.flow;
    // What you just finished today (older versions stored 'review' or a topic id here). It never stops the day: the next lesson is always offered.
    var doneTopic = !F && doneT && TBYID[doneT] ? TBYID[doneT] : null, justReview = !F && doneT === 'review';
    var lessonTopic = F ? (F.topicId && TBYID[F.topicId] ? TBYID[F.topicId] : null) : (plan.kind === 'lesson' ? plan.topic : null);
    var n = clamp(countDone(done) + (lessonTopic && !done[lessonTopic.id] ? 1 : 0), 1, Math.max(1, M));
    var root = h('div', { 'class': 'home' });
    root.appendChild(h('header', { 'class': 'hd' }, h('h1', { text: 'Today' }), h('p', { 'class': 'muted hd-date', text: fmtDate(t) })));
    if (M) root.appendChild(heroStats(lessonTopic));
    var card = h('section', { 'class': 'hero', 'aria-label': lessonTopic ? 'Lesson ' + n + ' of ' + M : 'Today' }), resume = !!F;
    var satMax = splitTotal(examSplit('short')), nSat = M && !resume ? Math.min(satMax, satPool().length) : 0, weak = M && !resume ? weakTopics(docs.quiz.stats, 3) : [];
    var drec = doneTopic ? docs.sessions.checks[doneTopic.id] : null;
    var checkLink = doneTopic && (doneTopic.check || []).length && !isPassed(drec) ? h('button', { 'class': 'link', type: 'button', text: drec ? 'Retry the check' : 'Do the check', onclick: function () { openTopic(doneTopic.id, 'hoy', 'today', true); } }) : null;
    var summary = doneTopic ? 'Class complete · ' + doneTopic.title + (drec ? ' · check ' + drec.ok + ' of ' + drec.n + (isPassed(drec) ? '' : ' (still open)') : '') : justReview ? 'Review complete' : '';
    // Secondary actions, any day: mixed review, cards, weak topics (not while a flow is open: Continue is the only way on).
    function secondary(acts, withMixed) {
      if (resume) return;
      if (withMixed) acts.appendChild(h('button', { 'class': 'btn big', type: 'button', text: 'Mixed review', disabled: !nSat, title: nSat ? '' : 'Study a few topics first and this unlocks', onclick: startMixedReview }));
      acts.appendChild(h('button', { 'class': 'btn big', type: 'button', text: 'Review cards', onclick: startCards }));
      if (weak.length) acts.appendChild(h('button', { 'class': 'btn big', type: 'button', text: 'Practice weak topics', onclick: startWeakPractice }));
    }
    if (!M) {
      card.appendChild(h('h2', { text: prepText() }));
      card.appendChild(h('p', { 'class': 'muted', text: 'You can switch to another exam at any time. Each exam keeps its own progress.' }));
      card.appendChild(h('button', { 'class': 'btn big', type: 'button', id: 'switch-exam', text: 'Change exam', onclick: openPicker }));
    } else if (lessonTopic) {
      if (summary) card.appendChild(h('p', { 'class': 'muted small hero-done' }, summary, checkLink ? ' ' : null, checkLink));
      card.appendChild(h('h2', { text: lessonTopic.title }));
      card.appendChild(h('p', { 'class': 'muted hero-meta', text: [lessonTopic.module === 0 ? 'Fundamentals' : 'Module ' + lessonTopic.module + ' · ' + modTitle(lessonTopic.module), lessonTopic.minutes ? lessonTopic.minutes + ' min' : ''].filter(Boolean).join(' · ') }));
      var mk = marksFor(lessonTopic.id, true); if (mk.length) card.appendChild(h('div', { 'class': 'tbadges' }, mk));
      var acts = h('div', { 'class': 'hero-acts' });
      acts.appendChild(h('button', { 'class': 'btn primary big', type: 'button', text: resume ? 'Continue' : summary ? 'Start next lesson' : 'Start', onclick: startToday }));
      secondary(acts, true); card.appendChild(acts);
      if (!resume) card.appendChild(h('p', { 'class': 'small muted', text: nSat ? 'Mixed review: up to ' + satMax + ' questions on what you have studied.' : 'Mixed review unlocks once you have studied a topic.' }));
    } else if (resume) {
      card.appendChild(h('h2', { text: F.kind === 'cards' ? 'Card review' : 'Mixed review' }));
      card.appendChild(h('p', { 'class': 'muted', text: 'In progress.' }));
      card.appendChild(h('button', { 'class': 'btn primary big', type: 'button', text: 'Continue', onclick: startToday }));
    } else {
      // every lesson is done
      if (summary) card.appendChild(h('p', { 'class': 'muted small hero-done' }, summary, checkLink ? ' ' : null, checkLink));
      card.appendChild(h('h2', { text: 'Mixed review' }));
      card.appendChild(h('p', { 'class': 'muted', text: nSat >= satMax ? satMax + ' mixed questions on what you have studied.' : nSat ? nSat + ' mixed questions on what you have studied so far.' : 'Nothing to review yet: you have not studied any topic with exam questions.' }));
      var acts2 = h('div', { 'class': 'hero-acts' });
      acts2.appendChild(h('button', { 'class': 'btn primary big', type: 'button', text: 'Start', disabled: !nSat, onclick: startMixedReview }));
      acts2.appendChild(h('button', { 'class': 'btn big', type: 'button', text: 'Mock exam', onclick: function () { go('examen'); } }));
      secondary(acts2, false); card.appendChild(acts2);
    }
    root.appendChild(card);
    if (!M) return root;
    var cols = h('div', { 'class': 'home-cols' }), stepTopic = lessonTopic;
    if (stepTopic) {
      var go = { 'class': function () { openTopic(stepTopic.id, 'hoy', 'today'); }, check: function () { openTopic(stepTopic.id, 'hoy', 'today', true); }, practice: function () { startPhase('practice'); }, review: function () { startPhase('review'); } };
      cols.appendChild(h('section', { 'class': 'panel' }, h('h2', { text: 'Steps' }), h('ul', { 'class': 'srows' }, dayRows(stepTopic, F && F.topicId === stepTopic.id ? F : null, false).map(function (r) {
        var inner = [h('span', { 'class': 'sdot', 'aria-hidden': 'true' }, icon(CHECK, '14')), h('span', { 'class': 'sk', text: r.k }), h('span', { 'class': 'sv', text: r.st === 'todo' ? '' : r.tx })];   // "To do" is what the empty circle already says
        return h('li', { 'class': 'srow ' + r.st }, r.go ? h('button', { 'class': 'srow-b', type: 'button', onclick: go[r.go] }, inner) : h('div', { 'class': 'srow-b' }, inner));
      }))));
    }
    var up = upcoming(done, 3);
    if (up.length) cols.appendChild(h('section', { 'class': 'panel' }, h('h2', { text: 'Coming up' }), h('ul', { 'class': 'upl' }, up.map(function (u) {
      return h('li', {}, h('button', { 'class': 'uprow', type: 'button', onclick: function () { openTopic(u.topic.id, 'hoy', 'learn'); } }, h('span', { 'class': 'up-t', text: u.topic.title }), u.topic.minutes ? h('span', { 'class': 'up-d muted small', text: u.topic.minutes + ' min' }) : null));
    }))));
    if (cols.childNodes.length) root.appendChild(cols);
    return root;
  }
  function viewHoy() { return UI.cur && UI.cur.phase !== 'class' ? flowView() : homeView(); }

  /* ───────── Topic screen (shared by Today and Learn): player + chapters + theory + check ───────── */
  function openTopic(id, tab, ctx, goCheck, extra) {
    if (!TBYID[id]) return;
    closePlayer(); if (UI.topic && UI.topic.io) { try { UI.topic.io.disconnect(); } catch (e) { /* nothing */ } }
    UI.topic = { id: id, ctx: ctx || 'learn', ret: { tab: UI.tab, learn: UI.learn }, ck: null, cki: 0, cdone: false, csum: false, badges: null, nextUpd: null, goCheck: !!goCheck };
    if (extra) Object.keys(extra).forEach(function (k) { UI.topic[k] = extra[k]; });   // retLabel / retY: where the back link goes
    if (tab) UI.tab = tab;
    markSeen(id); renderView(); window.scrollTo(0, 0); if (goCheck) toCheck();
  }
  function toCheck() {
    if (UI.topic && UI.topic.preUpd) UI.topic.preUpd(true);
    var c = document.getElementById('check'); if (!c) return;
    c.scrollIntoView({ block: 'start', behavior: reduceMotion() ? 'auto' : 'smooth' });
    var f = c.querySelector('.opt, .btn'); if (f) { try { f.focus({ preventScroll: true }); } catch (e) { /* nothing */ } }
  }
  function leaveTopic() { if (!UI.topic) return; if (UI.topic.io) { try { UI.topic.io.disconnect(); } catch (e) { /* nothing */ } } closePlayer(); UI.topic = null; }
  function scrollToId(id) { var el = document.getElementById(id); if (el) el.scrollIntoView({ block: 'start', behavior: reduceMotion() ? 'auto' : 'smooth' }); }
  // Sticky section nav: Video · Lesson · Check. Highlights the section in view (IntersectionObserver, optional).
  function topicNav(t, T) {
    var items = [['player', 'Video'], ['theory', 'Lesson']], links = {}, chk = null, nav = h('nav', { 'class': 'tnav', 'aria-label': 'Sections of this topic' });
    if ((t.check || []).length) items.push(['check', 'Check']);
    function setOn(id) { Object.keys(links).forEach(function (k) { if (k === id) links[k].setAttribute('aria-current', 'true'); else links[k].removeAttribute('aria-current'); }); }
    items.forEach(function (it) {
      var a = h('a', { 'class': 'tnav-a', href: '#' + it[0], onclick: function (ev) { ev.preventDefault(); setOn(it[0]); if (it[0] === 'check') toCheck(); else scrollToId(it[0]); } }, h('span', { text: it[1] }));
      links[it[0]] = a; nav.appendChild(a);
    });
    if (links.check) { chk = h('span', { 'class': 'tnav-n' }); links.check.appendChild(chk); }
    setOn('player');
    T.navUpd = function () {
      if (!chk) return;
      var rec = docs.sessions.checks[t.id], m = isMastered(rec), p = isPassed(rec), n = (t.check || []).length, d = T.ck && !T.rc ? T.ck.filter(function (it) { return it.checked; }).length + (T.carry || 0) : 0;
      chk.textContent = m ? 'Mastered' : p ? (recheckDue(rec, todayISO()) ? 'Re-check' : 'Passed') : d + '/' + n; chk.className = 'tnav-n' + (p ? ' ok' : '');
    };
    T.navUpd();
    T.navWatch = function (els) {
      if (T.io) { try { T.io.disconnect(); } catch (e) { /* nothing */ } T.io = null; }
      if (typeof IntersectionObserver !== 'function') return;
      try {
        var vis = {}, io = new IntersectionObserver(function (es) {
          es.forEach(function (en) { vis[en.target.id] = en.isIntersecting; });
          for (var i = 0; i < items.length; i++) if (vis[items[i][0]]) { setOn(items[i][0]); return; }
        }, { rootMargin: '-80px 0px -45% 0px' });
        items.forEach(function (it) { if (els[it[0]]) io.observe(els[it[0]]); });
        T.io = io;
      } catch (e) { /* the nav still works without highlighting */ }
    };
    return nav;
  }
  function backFromTopic() {
    var T = UI.topic; leaveTopic();
    if (T && T.ret) { UI.tab = T.ret.tab; UI.learn = T.ret.learn; }
    renderView(); window.scrollTo(0, T && T.retY || 0);
  }
  function continueFromTopic() {
    var F = UI.flow; if (!F) return;
    var t = TBYID[F.topicId]; if (t && (t.check || []).length && !isPassed(docs.sessions.checks[t.id])) toast('The check is still open; you can do it later from Today.');
    leaveTopic(); UI.cur = F; step(1);
  }
  function checkSection(t, T) {
    var qs = t.check || [], sec = h('section', { 'class': 'tsec tcheck', id: 'check' });
    if (!qs.length) return null;
    // fresh(true) = retry: only the questions answered wrong; the ones already right are kept in T.carry.
    function fresh(wrongOnly) {
      var cis = null, keep = 0;
      if (wrongOnly && T.ck && !T.rc) { cis = []; T.ck.forEach(function (it) { var q = qOf(it); if (q && isCorrect(q, it.sel)) keep++; else cis.push(it.ci); }); keep += T.carry || 0; }
      T.carry = cis ? keep : 0;
      T.ck = cis ? makeCheckItems(t).filter(function (it) { return cis.indexOf(it.ci) > -1; }) : makeCheckItems(t);
      T.cki = 0; T.cdone = false; T.rc = false;
    }
    function startRc() { T.ck = recheckItems(t, docs.quiz.stats); T.carry = 0; T.cki = 0; T.cdone = false; T.rc = true; }
    if (!T.ck) { fresh(); T.csum = isPassed(docs.sessions.checks[t.id]); }
    function finish() {
      var ok = T.ck.filter(function (it) { var q = qOf(it); return q && isCorrect(q, it.sel); }).length + (T.rc ? 0 : T.carry || 0), total = T.rc ? T.ck.length : qs.length, prev = docs.sessions.checks[t.id];
      if (T.rc) {   // re-check: both right = Mastered; otherwise it stays Passed and comes back in 2 days
        if (prev) { docs.sessions.checks[t.id] = applyRecheck(prev, ok === T.ck.length, todayISO()); touch('sessions'); }
        if (ok === T.ck.length) celebrate(t.id);
      } else if (!prev || ok > prev.ok) { docs.sessions.checks[t.id] = passRec(ok, total, todayISO()); touch('sessions'); }
      T.cdone = true; draw(); if (T.badges) T.badges();
    }
    function draw() { var fs = focusCapture(sec); paint(); if (fs) focusRestore(sec, fs, '.btn.primary'); }
    function paint() {
      sec.innerHTML = ''; if (T.navUpd) T.navUpd();
      sec.appendChild(h('h3', { text: 'Check your understanding' }));
      if (T.csum) {
        var rec = docs.sessions.checks[t.id], today = todayISO();
        if (isMastered(rec)) sec.appendChild(h('p', {}, masteredMark(null, UI.pop === t.id), ' ' + rec.ok + ' of ' + rec.n + (rec.m ? ' correct, and you passed the re-check. This topic is mastered.' : ' correct. You completed this topic before re-checks existed, so it counts as mastered.')));
        else if (recheckDue(rec, today)) {
          sec.appendChild(h('p', {}, passedMark(), ' ' + rec.ok + ' of ' + rec.n + ' correct. ', h('b', { text: 'Re-check due.' })));
          sec.appendChild(h('p', { 'class': 'small muted', text: 'Two quick questions, a day or more after you passed, show whether it really stuck. Get both right to master this topic.' }));
          sec.appendChild(h('button', { 'class': 'btn primary', type: 'button', text: 'Start re-check', onclick: function () { startRc(); T.csum = false; draw(); } }));
        } else sec.appendChild(h('p', {}, passedMark(), ' ' + rec.ok + ' of ' + rec.n + ' correct. You passed this check. Come back to re-check it on ' + fmtDate(rec.due) + ' or later to master it.'));
        sec.appendChild(h('button', { 'class': 'btn', type: 'button', text: 'Take it again', onclick: function () { fresh(); T.csum = false; draw(); } }));
        return;
      }
      if (T.cdone) {
        var okN = T.ck.filter(function (it) { var q = qOf(it); return q && isCorrect(q, it.sel); }).length + (T.rc ? 0 : T.carry || 0), tot = T.rc ? T.ck.length : qs.length, all = okN === tot;
        var msg = T.rc ? (all ? 'Topic mastered. Well done.' : 'Not mastered yet. The topic stays Passed; the re-check opens again in 2 days.')
          : all ? 'Check passed. Come back tomorrow for a two-question re-check: passing it masters the topic.' : 'Get all of them right to pass this check. Read the explanations, then retry only the ones you missed.';
        sec.appendChild(h('div', { 'class': 'fb ' + (all ? 'ok' : 'ko'), role: 'status' }, h('h3', { text: okN + ' of ' + tot + ' correct' }), h('p', { text: msg })));
        if (!all && !T.rc) sec.appendChild(h('button', { 'class': 'btn primary', type: 'button', text: tot - okN === 1 ? 'Try again: the question you missed' : 'Try again: the ' + (tot - okN) + ' questions you missed', onclick: function () { fresh(true); draw(); } }));
        return;
      }
      var it = T.ck[T.cki], q = qOf(it), last = T.cki === T.ck.length - 1;
      sec.appendChild(h('p', { 'class': 'hint', text: T.rc ? 'Re-check: question ' + (T.cki + 1) + ' of ' + T.ck.length + '. Get both right to master this topic.' : T.carry ? 'Retry: question ' + (T.cki + 1) + ' of ' + T.ck.length + '. You already got ' + T.carry + ' right.' : 'Question ' + (T.cki + 1) + ' of ' + T.ck.length + '. Get them all right to pass the check.' }));
      sec.appendChild(h('p', { 'class': 'qstem', text: q.stem }));
      if (q.type === 'multi') sec.appendChild(h('p', { 'class': 'hint', text: 'Choose ' + (q.answer || []).length + '.' }));
      sec.appendChild(optionRows(it, q, !!it.checked, function (oi) {
        if (it.checked) return;
        if (q.type === 'multi') { var k = it.sel.indexOf(oi); if (k > -1) it.sel.splice(k, 1); else it.sel.push(oi); } else it.sel = [oi];
        draw();
      }, true));
      if (!it.checked && it.sel.length) { add(sec, confWhy()); sec.appendChild(confButtons(function (sure) {
        it.checked = true; it.sure = sure; recordInto(docs.quiz.stats, q, isCorrect(q, it.sel), false, sure); touch('quiz'); draw();
        revealFb(sec.querySelector('.fb'));
      }, false)); }
      if (it.checked) {
        sec.appendChild(feedbackBox(it, q));
        sec.appendChild(h('button', { 'class': 'btn primary', type: 'button', text: last ? 'See result' : 'Next question', onclick: function () { if (last) finish(); else { T.cki++; draw(); } } }));
      }
    }
    draw();
    return sec;
  }
  // Pretest: before the first watch, a guess at a bank question of the topic (pretestQ: not a check question, not the re-check's). Never on a topic already studied or passed.
  // Stored in docs.sessions.pretest[id] = { qid, pick } (pick = option index), { qid, skip: 1 } if skipped; shown: 1 once the result was shown. Old records (no qid) refer to the first check question.
  function pretestCard(t, T) {
    var rec0 = docs.sessions.pretest[t.id], q = null;   // read docs.sessions each time: adopt() can replace the doc while the topic is open
    if (rec0 && rec0.qid) { var bq = QBYID[rec0.qid]; q = bq || null; } else if (rec0) q = checkQ(t, 0);
    else if (!isWatchedTopic(t.id) && !isPassed(docs.sessions.checks[t.id])) q = pretestQ(t);
    if (!q) return null;
    var box = h('section', { 'class': 'tcard pretest', 'aria-label': 'Before you watch' });
    function save(r) { docs.sessions.pretest[t.id] = r; touch('sessions'); }
    function head() { return h('p', { 'class': 'tlabel', text: 'Before you watch: take a guess' }); }
    function answerText(oi) { return q.options[oi]; }
    T.preUpd = function (reveal) {
      var rec = docs.sessions.pretest[t.id], watched = isWatchedTopic(t.id) || !!(Pl && Pl.topic.id === t.id && Pl.ended);
      box.innerHTML = '';
      if (T.preRes && rec) {   // result stays on screen for this visit
        var good = rec.pick === q.answer[0];
        box.hidden = false;
        add(box, [head(), h('p', { 'class': 'pre-stem', text: q.stem }),
          h('p', { 'class': 'pre-res', role: 'status' }, h('b', { text: 'Your guess: ' }), answerText(rec.pick) + ' — ' + (good ? 'right.' : 'not quite.') + ' ', h('b', { text: 'Answer: ' }), answerText(q.answer[0]) + '.'),
          h('button', { 'class': 'link small', type: 'button', text: 'Got it', onclick: function () { T.preRes = false; T.preUpd(); } })]);
        return;
      }
      if (rec && rec.pick != null && !rec.shown) {
        if (reveal || watched) { rec.shown = 1; touch('sessions'); T.preRes = true; T.preUpd(); return; }
        box.hidden = false;
        add(box, [head(), h('p', { 'class': 'pre-stem', text: q.stem }), h('p', { 'class': 'pre-kept', role: 'status' }, h('b', { text: 'Your guess: ' }), answerText(rec.pick)), h('p', { text: 'Keep your guess in mind: the video answers it.' })]);
        return;
      }
      if (rec || watched) { box.hidden = true; return; }
      box.hidden = false;
      var order = shuffle(q.options.map(function (_, i) { return i; }));
      add(box, [head(), h('p', { 'class': 'pre-stem', text: q.stem }),
        (function () {
          var pb = order.map(function (oi) {
            return h('button', { 'class': 'opt', type: 'button', role: 'radio', 'aria-checked': 'false', onclick: function () { save({ qid: q.id, pick: oi, at: Date.now() }); T.preUpd(); } },
              h('span', { 'class': 'ind', 'aria-hidden': 'true' }), h('span', { 'class': 'otx', text: q.options[oi] }));
          });
          rovingRadios(pb, null);
          return h('div', { 'class': 'opts', role: 'radiogroup', 'aria-label': 'Your guess' }, pb);
        })(),
        h('p', { 'class': 'small muted', text: 'Guessing first makes the lesson stick better, even if you guess wrong.' }),
        h('button', { 'class': 'link small', type: 'button', text: 'Skip', onclick: function () { save({ qid: q.id, skip: 1 }); T.preUpd(); } })]);
    };
    T.preUpd();
    return box;
  }
  function topicView() {
    var T = UI.topic, t = TBYID[T.id];
    if (!t) { UI.topic = null; return viewAprender(); }
    if (!Pl || Pl.topic.id !== t.id) { closePlayer(); makePlayer(t); }
    var E = Pl.el$, root = h('div', { 'class': 'topic' }), ret = T.ret || {}, lbl = T.retLabel || (ret.tab === 'hoy' ? 'Today' : ret.tab === 'progreso' ? 'Progress' : ret.tab === 'examen' ? 'Exam' : ret.tab === 'buscar' ? 'Search' : ret.learn && ret.learn.v === 'gloss' ? 'Glossary' : 'Learn');
    var F = UI.flow, inFlow = T.ctx === 'today' && F && F.topicId === t.id && F.phase === 'class';
    root.appendChild(h('button', { 'class': 'link backlink', type: 'button', text: '‹ ' + lbl, onclick: backFromTopic }));
    var badges = h('div', { 'class': 'tbadges' });
    T.badges = function () { badges.innerHTML = ''; add(badges, marksFor(t.id, true)); if (T.nextUpd) T.nextUpd(); };
    add(badges, marksFor(t.id, true));   // what the topic already has (watched / passed / mastered) is visible on opening
    root.appendChild(h('header', { 'class': 'hd' }, h('p', { 'class': 'muted small tmeta', text: metaLine(t) }), h('h1', { text: t.title }), badges));
    root.appendChild(topicNav(t, T));
    var inFlowNext = inFlow;
    T.nextUpd = function () {
      var P = Pl; if (!P || P.topic.id !== t.id) return;
      var box = P.el$.next, show = !!(docs.sessions.watched[t.id] || P.ended), btns = [];
      box.innerHTML = '';
      var crec = docs.sessions.checks[t.id], cdue = recheckDue(crec, todayISO());
      var hasChk = show && (t.check || []).length && (!isPassed(crec) || cdue);
      if (hasChk) btns.push(h('button', { 'class': 'btn primary', type: 'button', text: cdue ? 'Re-check due: take it now' : 'Next: check your understanding', onclick: toCheck }));
      // one next step: the check. Leaving without it is a quiet text link, clearly not the same kind of button.
      if (show && inFlowNext) btns.push(hasChk ? h('button', { 'class': 'link skip-check', type: 'button', text: F.qs.length ? 'Skip the check and continue to practice' : 'Skip the check and continue to review', onclick: continueFromTopic })
        : h('button', { 'class': 'btn primary', type: 'button', text: F.qs.length ? 'Continue to practice' : 'Continue to review', onclick: continueFromTopic }));
      add(box, btns); box.hidden = !btns.length;
    };
    var pre = pretestCard(t, T); if (pre) root.appendChild(pre);
    root.appendChild(h('div', { 'class': 'tp-top' }, E.root, E.chapters));
    var body = h('div', { 'class': 'tp-body' });
    var th = theoryView(t); body.appendChild(th);
    if (t.reto && t.reto.text) body.appendChild(h('section', { 'class': 'tcard challenge' }, h('p', { 'class': 'tlabel', text: 'Hands-on challenge · ' + (t.reto.minutes || 15) + ' min' }), h('p', { 'class': 'pre', text: t.reto.text })));
    var ck = checkSection(t, T); if (ck) body.appendChild(ck);
    T.navWatch({ player: E.root, theory: th, check: ck });
    T.nextUpd();
    if (t.source) body.appendChild(h('p', { 'class': 'small muted source' }, 'Source: ', h('a', { 'class': 'srclink', href: t.source, target: '_blank', rel: 'noopener', text: 'Microsoft Learn' })));
    if (inFlow) body.appendChild(h('div', { 'class': 'actions static' }, h('button', { 'class': 'btn primary big', type: 'button', text: F.qs.length ? 'Continue to practice' : 'Continue to review', onclick: continueFromTopic })));
    else if (T.ctx === 'today') body.appendChild(h('div', { 'class': 'actions static' }, h('button', { 'class': 'btn big', type: 'button', text: 'Back to Today', onclick: backFromTopic })));
    root.appendChild(body);
    return root;
  }

  /* ───────── Learn: modules, topics and glossary ───────── */
  function viewAprender() {
    var L = UI.learn;
    if (L.v === 'gloss') return glossaryView();
    var root = h('div', { 'class': 'learn' }), nx = nextTopic(docs.sessions.lessonsDone);
    root.appendChild(h('header', { 'class': 'hd' }, h('h1', { text: 'Learn' }), h('p', { 'class': 'muted', text: 'The whole course, at your pace. Open a topic to watch the class and read the theory.' })));
    if (!TOPICS.length) { root.appendChild(h('p', { 'class': 'muted', text: prepText() })); return root; }
    root.appendChild(h('div', { 'class': 'sx-bar sx-learn' }, icon(SEARCH_ICO, '20'), h('input', { type: 'search', 'class': 'sx-in', id: 'learn-search', placeholder: 'Search a concept, a setting, a class…', 'aria-label': 'Search the course', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false',
      oninput: function (ev) { if (ev.target.value.trim()) openSearch(ev.target.value); } })));
    root.appendChild(h('p', { 'class': 'legend2 small muted' }, watchedMark(false), ' Watched', h('span', { 'class': 'sep', text: '·' }), passedMark(), ' Check passed', h('span', { 'class': 'sep', text: '·' }), masteredMark(), ' Passed again a day later'));
    var nGl = allGlossary().length;
    if (nGl) root.appendChild(h('button', { 'class': 'rowcard', type: 'button', onclick: function () { UI.learn = { v: 'gloss', id: null, q: '', back: 'aprender' }; renderView(); window.scrollTo(0, 0); } }, h('span', { 'class': 'rc-t', text: 'Glossary' }), h('span', { 'class': 'muted small', text: nGl + (nGl === 1 ? ' term' : ' terms') }), icon('M9 5l7 7-7 7', '20')));
    var list = h('div', { 'class': 'mods' });
    MODULES.forEach(function (m) {
      var ts = modTopics(m.n); if (!ts.length) return;
      var c = modWatched(m.n), open = UI.open[m.n] != null ? UI.open[m.n] : !!(nx && nx.module === m.n);
      var d = h('details', { 'class': 'mod' }, h('summary', { 'class': m.n === 0 ? 'nomn' : null }, m.n === 0 ? null : h('span', { 'class': 'mod-n', text: 'Module ' + m.n }), h('span', { 'class': 'mod-t', text: m.title }), h('span', { 'class': 'mod-c', title: c + ' of ' + ts.length + ' watched', text: c + '/' + ts.length })),
        h('ul', { 'class': 'tl' }, ts.map(function (t) {
          return h('li', {}, h('button', { 'class': 'trow', type: 'button', onclick: function () { openTopic(t.id, 'aprender', 'learn'); } }, h('span', { 'class': 'tr-main' }, h('span', { 'class': 'tr-t', text: t.title }), h('span', { 'class': 'tr-m muted small', text: [t.minutes ? t.minutes + ' min' : '', t.level].filter(Boolean).join(' · ') })), h('span', { 'class': 'tr-s' }, marksFor(t.id, false))));
        })));
      d.open = !!open; d.addEventListener('toggle', function () { UI.open[m.n] = d.open; });
      list.appendChild(d);
    });
    root.appendChild(list);
    return root;
  }
  /* ───────── Search + connection map (src/search.js) ───────── */
  var SIX = null;   // one index per page load; each exam has its own data, and choosing another exam reloads the page
  function searchIndex() { return SIX || (SIX = TALLER_SEARCH.index({ topics: TOPICS, questions: QUESTIONS, cards: CARDS, video: window.AB620_VIDEO, meta: META })); }
  function openSearch(q) {
    var wasSearch = UI.tab === 'buscar' && !UI.topic;
    UI.search = { q: q || '', term: null };
    if (!wasSearch) go('buscar'); else renderView();
    var inp = document.getElementById('sx-in'); if (inp) { try { inp.focus({ preventScroll: true }); inp.setSelectionRange(inp.value.length, inp.value.length); } catch (e) { /* nothing */ } }
  }
  function viewBuscar() {
    var api = { h: h, icon: icon, fmtTime: fmtTime, ix: searchIndex(), state: UI.search, watch: fxWatch,
      set: function (st) { UI.search = st; renderView(); window.scrollTo(0, 0); var i = document.getElementById('sx-in'); if (i && !st.term) { try { i.focus({ preventScroll: true }); } catch (e) { /* nothing */ } } },
      openSection: function (id, i) { openTopic(id, 'aprender', 'learn', false, { retLabel: 'Search' }); if (i >= 0) scrollToId('sec-' + i); },
      playAt: function (id, t) { watchExplain({ tid: id, start: t }); },
      practice: function (ids, title) { var qs = ids.map(function (id) { return QBYID[id]; }).filter(Boolean); if (!qs.length) { toast('No questions available'); return; } var F = newFlow('practice', null, qs, null); F.title = title; openFlow(F, false, 'buscar'); },
      cards: function (ids) { var rv = ids.filter(function (id) { return CBYID[id]; }).map(function (id) { return { t: 'c', id: id, shown: false }; }); if (!rv.length) { toast('No cards to review'); return; } var F = newFlow('cards', null, [], null); F.rv = rv; F.phase = 'review'; F.title = 'Cards'; openFlow(F, false, 'buscar'); },
      topicTitle: function (id) { return TBYID[id] ? TBYID[id].title : id; } };
    var v = TALLER_SEARCH.view(api);
    return h('div', { 'class': 'search' }, h('h1', { 'class': 'sr', text: 'Search' }), v.el);
  }

  function glossaryView() {
    var root = h('div', { 'class': 'gloss' }), all = allGlossary(), L = UI.learn;
    root.appendChild(h('button', { 'class': 'link backlink', type: 'button', text: '‹ Learn', onclick: function () { UI.learn = { v: 'list', id: null, q: '', back: 'aprender' }; renderView(); window.scrollTo(0, 0); } }));
    root.appendChild(h('header', { 'class': 'hd' }, h('h1', { text: 'Glossary' }), h('p', { 'class': 'muted', text: all.length + (all.length === 1 ? ' term' : ' terms') + ' from the whole course.' })));
    var inp = h('input', { type: 'search', 'class': 'search', placeholder: 'Search for a term', 'aria-label': 'Search the glossary', value: L.q || '', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
    var out = h('ul', { 'class': 'gl-list' }), cnt = h('p', { 'class': 'small muted', 'aria-live': 'polite' });
    function fill() {
      var r = searchGlossary(all, inp.value); out.innerHTML = '';
      cnt.textContent = inp.value.trim() ? r.length + (r.length === 1 ? ' result' : ' results') : '';
      if (!r.length) out.appendChild(h('li', { 'class': 'muted', text: 'No matching terms.' }));
      r.forEach(function (g) {
        out.appendChild(h('li', {}, h('p', { 'class': 'g-t', text: g.term }), h('p', { 'class': 'g-d', text: g.def }), TBYID[g.tid] ? h('button', { 'class': 'link small', type: 'button', text: 'View topic: ' + TBYID[g.tid].title, onclick: function () { openTopic(g.tid, 'aprender', 'learn'); } }) : null));
      });
    }
    inp.addEventListener('input', function () { L.q = inp.value; fill(); });
    root.appendChild(inp); root.appendChild(cnt); root.appendChild(out); fill();
    return root;
  }

  /* ───────── Examen: simulacro / diagnóstico / práctica por módulo ───────── */
  function saveRun() {
    var q = UI.quiz; if (!q || q.finished) { lsSet(PFX + 'run', ''); return; }
    lsSet(PFX + 'run', JSON.stringify({ kind: q.kind, title: q.title, items: q.items, idx: q.idx, startedAt: q.startedAt, endsAt: q.endsAt }));
  }
  function startQuiz(o) {
    if (!o.qs || !o.qs.length) { toast('No questions available'); return; }
    stopTimer();
    UI.quiz = { kind: o.kind, title: o.title, items: makeItems(o.qs), idx: 0, startedAt: Date.now(), endsAt: o.minutes ? Date.now() + o.minutes * 60000 : 0, finished: false, result: null, confirm: false };
    UI.navOpen = false; saveRun(); go('examen');
  }
  function startMock() { startQuiz({ kind: 'mock', title: 'Mock exam', qs: pickSplit(examSplit('mock'), docs.quiz.stats), minutes: 100 }); }
  function startDiag() { startQuiz({ kind: 'diag', title: 'Diagnostic', qs: pickSplit(examSplit('short'), docs.quiz.stats) }); }
  function stopTimer() { clearInterval(UI.quizTimer); UI.quizTimer = null; }
  function fmtClock(ms) { var s = Math.max(0, Math.round(ms / 1000)); return pad(Math.floor(s / 60)) + ':' + pad(s % 60); }
  function finishQuiz() {
    var Q = UI.quiz; if (!Q || Q.finished) return; stopTimer();
    var by = {}, ok = 0, ans = 0;
    PLAN.domains.forEach(function (d) { by[d.id] = [0, 0]; });
    Q.items.forEach(function (it) {
      var q = QBYID[it.id]; if (!q) return; var good = isCorrect(q, it.sel); if (it.sel.length) ans++;
      if (Q.kind === 'diag' && !it.sel.length) return;   // the diagnostic only scores what you answered
      (by[q.domain] = by[q.domain] || [0, 0])[1]++; if (good) { ok++; by[q.domain][0]++; }
      if (it.sel.length) recordInto(docs.quiz.stats, q, good, false);
    });
    var secs = Math.round((Date.now() - Q.startedAt) / 1000), total = Q.items.length, n = Q.kind === 'diag' && ans ? ans : total;
    docs.quiz.attempts.push({ at: Date.now(), mode: Q.kind, n: n, correct: ok, pct: n ? Math.round(ok / n * 100) : 0, by: by, secs: secs });
    docs.quiz.attempts = docs.quiz.attempts.slice(-60); touch('quiz');
    Q.finished = true; Q.result = { ok: ok, n: n, by: by, secs: secs, answered: ans, unans: total - ans, total: total }; saveRun(); renderView();
  }
  function quizTick() {
    var Q = UI.quiz, t = document.getElementById('qtimer'); if (!Q || Q.finished || !Q.endsAt || !t) return;
    var left = Q.endsAt - Date.now(); t.textContent = fmtClock(left); t.classList.toggle('low', left < 600000);
    if (left <= 0) { toast('Time is up'); finishQuiz(); }
  }
  function examResult() {
    var Q = UI.quiz, R = Q.result, pct = R.n ? Math.round(R.ok / R.n * 100) : 0, root = h('div', { 'class': 'result' });
    root.appendChild(h('header', { 'class': 'hd' }, h('h1', { text: pct + '% correct' }), h('p', { 'class': 'muted', text: R.ok + ' of ' + R.n + (R.unans ? (Q.kind === 'diag' ? ' answered' : '') : '') + ' · ' + fmtClock(R.secs * 1000) + ' · ' + Q.title })));
    if (R.unans) root.appendChild(h('p', { 'class': 'notice unans', text: R.unans + (R.unans === 1 ? ' question was' : ' questions were') + ' not answered' + (Q.kind === 'diag' ? ' and ' + (R.unans === 1 ? 'is' : 'are') + ' not counted.' : ' and count as wrong, as on the real exam.') }));
    root.appendChild(h('section', { 'class': 'panel' }, h('h2', { text: 'By domain' }), domainBars(R.by),
      R.answered * 2 < R.total ? h('p', { 'class': 'small muted', text: 'Answer at least half of the questions to get a rough score reference.' })
        : h('p', { 'class': 'small muted', text: 'Rough reference: about ' + pct * 10 + ' of 1000 if the real exam went like this. The real exam uses a scaled score: 700 of 1000 passes, which is not the same as 70% correct.' })));
    var miss = Q.items.filter(function (it) { var q = QBYID[it.id]; return q && it.sel.length && !isCorrect(q, it.sel); });
    if (miss.length) root.appendChild(h('section', { 'class': 'panel' }, h('h2', { text: 'To review (' + miss.length + ')' }), h('ul', { 'class': 'review' }, miss.map(function (it) {
      var q = QBYID[it.id]; return h('li', {}, h('p', { text: q.stem.slice(0, 160) + (q.stem.length > 160 ? '…' : '') }), h('p', { 'class': 'small muted', text: 'Correct: ' + (q.answer || []).map(function (i) { return q.options[i]; }).join(' · ') }), watchBtn(q));
    }))));
    root.appendChild(h('div', { 'class': 'actions static' }, h('button', { 'class': 'btn primary big', type: 'button', text: 'Done', onclick: function () { UI.quiz = null; renderView(); window.scrollTo(0, 0); } })));
    return root;
  }
  function examQuestion() {
    var Q = UI.quiz, it = Q.items[Q.idx], q = QBYID[it.id], root = h('div', { 'class': 'exam' });
    if (!q) { Q.items.splice(Q.idx, 1); if (!Q.items.length) { UI.quiz = null; return h('div'); } Q.idx = Math.min(Q.idx, Q.items.length - 1); return examQuestion(); }
    var multi = q.type === 'multi', need = (q.answer || []).length, last = Q.idx === Q.items.length - 1;
    function pick(oi) { if (multi) { var i = it.sel.indexOf(oi); if (i > -1) it.sel.splice(i, 1); else it.sel.push(oi); } else it.sel = [oi]; saveRun(); renderView(); }
    function go2(i) { Q.idx = clamp(i, 0, Q.items.length - 1); Q.confirm = false; saveRun(); renderView(); window.scrollTo(0, 0); }
    var main = h('div', { 'class': 'qmain' });
    main.appendChild(h('h1', { 'class': 'sr', text: Q.title + ' · question ' + (Q.idx + 1) + ' of ' + Q.items.length }));
    main.appendChild(h('div', { 'class': 'ftop between' }, h('span', { 'class': 'flabel', text: 'Question ' + (Q.idx + 1) + ' of ' + Q.items.length }), Q.endsAt ? h('span', { 'class': 'timer', id: 'qtimer', text: fmtClock(Q.endsAt - Date.now()) }) : h('span')));
    main.appendChild(h('div', { 'class': 'pbar', 'aria-hidden': 'true' }, h('i', { style: { transform: 'scaleX(' + ((Q.idx + 1) / Q.items.length) + ')' } })));
    main.appendChild(h('div', { 'class': 'fmain' }, h('p', { 'class': 'qstem', text: q.stem }), multi ? h('p', { 'class': 'hint', text: 'Choose ' + need + '.' }) : null, optionRows(it, q, false, pick)));
    UI.keys.arrowright = function () { go2(Q.idx + 1); }; UI.keys.arrowleft = function () { go2(Q.idx - 1); };
    main.appendChild(h('div', { 'class': 'actions' },
      h('button', { 'class': 'btn big back', type: 'button', text: 'Previous', disabled: Q.idx === 0, onclick: function () { go2(Q.idx - 1); } }),
      h('button', { 'class': 'btn big flag' + (it.flagged ? ' on' : ''), type: 'button', 'aria-pressed': String(!!it.flagged), text: it.flagged ? 'Flagged' : 'Flag', onclick: function () { it.flagged = !it.flagged; saveRun(); renderView(); } }),
      last ? h('button', { 'class': 'btn primary big', type: 'button', text: 'Review', onclick: function () { UI.navOpen = true; Q.confirm = true; renderView(); var n = document.getElementById('qnav'); if (n) n.scrollIntoView({ block: 'start' }); } })
        : h('button', { 'class': 'btn primary big', type: 'button', text: 'Next', onclick: function () { go2(Q.idx + 1); } })));
    root.appendChild(main);
    var un = Q.items.filter(function (x) { return !x.sel.length; }).length, wide = window.matchMedia && window.matchMedia('(min-width: 860px)').matches;
    var det = h('details', { 'class': 'qside', id: 'qnav' }, h('summary', { text: 'All questions · ' + (Q.items.length - un) + ' of ' + Q.items.length + ' answered' }),
      h('div', { 'class': 'qnav' }, Q.items.map(function (x, i) {
        return h('button', { 'class': 'qn' + (x.sel.length ? ' ans' : '') + (i === Q.idx ? ' cur' : '') + (x.flagged ? ' flag' : ''), type: 'button', text: String(i + 1), 'aria-label': 'Question ' + (i + 1) + (x.flagged ? ', flagged' : x.sel.length ? ', answered' : ', unanswered'), 'aria-current': i === Q.idx ? 'true' : null, onclick: function () { go2(i); } });
      })),
      h('p', { 'class': 'small muted legend' }, 'Filled = answered · dot = flagged · empty = unanswered'),
      !Q.confirm ? h('button', { 'class': 'btn big', type: 'button', text: 'Finish exam', onclick: function () { Q.confirm = true; UI.navOpen = true; renderView(); } })
        : h('div', { 'class': 'confirm' }, h('p', { text: un ? 'You have ' + un + ' unanswered. Finish now?' : 'Finish and see your results?' }),
          h('div', { 'class': 'row2' }, h('button', { 'class': 'btn primary', type: 'button', text: 'Yes, finish', onclick: finishQuiz }), h('button', { 'class': 'btn', type: 'button', text: 'Keep going', onclick: function () { Q.confirm = false; renderView(); } }))));
    if (UI.navOpen || wide) det.open = true;
    det.addEventListener('toggle', function () { if (!wide) UI.navOpen = det.open; });
    root.appendChild(det);
    if (Q.endsAt) { stopTimer(); UI.quizTimer = setInterval(quizTick, 1000); }
    return root;
  }
  function viewExamen() {
    if (UI.quiz) return UI.quiz.finished ? examResult() : examQuestion();
    stopTimer();
    var root = h('div', { 'class': 'home' }), first = !docs.quiz.attempts.length;
    root.appendChild(h('header', { 'class': 'hd' }, h('h1', { text: 'Exam' }), h('p', { 'class': 'muted', text: 'Practice with the real format. Answers are shown at the end.' })));
    var none = !QUESTIONS.length;   // an exam without a question bank yet: everything is shown, disabled, with the reason
    if (none) root.appendChild(h('p', { 'class': 'muted', id: 'exam-why', text: 'Questions for ' + (EXAM.code || 'this exam') + ' are in preparation. Practice and mock exams unlock when they are ready.' }));
    var run = none ? null : jparse(lsGet(PFX + 'run'), null);
    if (run && run.items && run.items.length) root.appendChild(h('section', { 'class': 'hero' }, h('p', { 'class': 'kicker', text: 'In progress' }), h('h2', { text: run.kind === 'mock' ? 'Unfinished mock exam' : 'Unfinished diagnostic' }),
      h('button', { 'class': 'btn primary big', type: 'button', text: 'Continue', onclick: function () { UI.quiz = { kind: run.kind, title: run.title, items: run.items.filter(function (x) { return QBYID[x.id]; }), idx: Math.min(run.idx || 0, run.items.length - 1), startedAt: run.startedAt, endsAt: run.endsAt, finished: false, confirm: false }; renderView(); } }),
      h('button', { 'class': 'btn big', type: 'button', text: 'Discard', onclick: function () { lsSet(PFX + 'run', ''); renderView(); } })));
    var diag = h('section', { 'class': 'hero' }, h('p', { 'class': 'kicker', text: first ? 'To start' : 'Quick' }), h('h2', { text: splitTotal(examSplit('short')) + '-question diagnostic' }), h('p', { 'class': 'muted', text: 'Measure your starting point in about 25 minutes.' }),
      h('button', { 'class': 'btn big' + (first ? ' primary' : ''), type: 'button', text: 'Start diagnostic', disabled: none, 'aria-describedby': none ? 'exam-why' : null, onclick: startDiag }));
    var mock = h('section', { 'class': 'hero' }, h('p', { 'class': 'kicker', text: 'Full' }), h('h2', { text: splitTotal(examSplit('mock')) + '-question mock exam' }), h('p', { 'class': 'muted', text: '100 minutes with a timer, like the real exam.' }),
      h('button', { 'class': 'btn big' + (first ? '' : ' primary'), type: 'button', text: 'Start mock exam', disabled: none, 'aria-describedby': none ? 'exam-why' : null, onclick: startMock }));
    if (first) { root.appendChild(diag); root.appendChild(mock); } else { root.appendChild(mock); root.appendChild(diag); }
    // Mixed practice: open clusters as rows; the ones still locked collapse into one line that names what to study next.
    var studied = studiedMap(docs.sessions), infos = CLUSTERS.map(function (cl) { return { cl: cl, info: clusterInfo(cl, studied) }; });
    var openC = infos.filter(function (x) { return x.info.ok; }), lockedC = infos.filter(function (x) { return !x.info.ok; });
    var mix = h('section', { 'class': 'panel', id: 'mixed' }, h('h2', { text: 'Mixed practice' }), h('p', { 'class': 'small muted mixwhy', text: 'Mixing similar topics trains you to tell them apart, which is what the exam asks.' }),
      openC.length ? h('ul', { 'class': 'weak' }, openC.map(function (x) {
        return h('li', { 'class': 'mixrow' }, h('div', { 'class': 'wt' }, h('span', { 'class': 'wn', text: x.cl.title }), h('span', { 'class': 'muted small', text: x.info.n + ' questions · mixed' })),
          h('button', { 'class': 'btn', type: 'button', text: 'Practice', onclick: function () { startMixed(x.cl); } }));
      })) : null);
    if (lockedC.length) {
      var nextL = uniq(lockedC.reduce(function (a, x) { return a.concat(x.info.watch.map(function (t) { return t.title; })); }, [])).slice(0, 2);
      mix.appendChild(h('p', { 'class': 'small muted mixlocked' }, lockedC.length + (openC.length ? ' more ' : lockedC.length === 1 ? ' set ' : ' sets ') + (lockedC.length === 1 ? 'unlocks' : 'unlock') + ' as you study' + (nextL.length ? ': ' : '.'),
        nextL.length ? h('b', { text: nextL.map(function (n) { return '“' + n + '”'; }).join(' and ') }) : null, nextL.length ? '.' : null));
    }
    if (CLUSTERS.length) root.appendChild(mix);
    var pm = practicableModules(studied), box = h('section', { 'class': 'panel' }, h('h2', { text: 'Practice by module' }));
    if (!pm.length) box.appendChild(h('p', { 'class': 'muted', text: 'Appears after you study your first module that has exam questions.' }));
    else box.appendChild(h('ul', { 'class': 'weak' }, pm.map(function (m) {
      return h('li', {}, h('div', { 'class': 'wt' }, h('span', { 'class': 'wn', text: modName(m) }), h('span', { 'class': 'muted small', text: Math.min(10, modulePool(m.n).length) + ' questions with instant feedback' })),
        h('button', { 'class': 'btn', type: 'button', text: 'Practice', onclick: function () { startModulePractice(m); } }));
    })));
    root.appendChild(box);
    return root;
  }

  /* ───────── Progreso ───────── */
  function calibrationCard(st) {
    var c = calibration(st), card = h('section', { 'class': 'panel calib' }, h('h2', { text: 'Do you know what you know?' }));
    if (c.n < 5) {
      card.appendChild(h('p', { 'class': 'muted', text: 'After each practice, review or topic check question you say “Sure” or “Not sure”. Once you have answered 5 this way, you will see how often you are right when you feel sure.' + (c.n ? ' So far: ' + c.n + ' of 5.' : '') }));
      card.appendChild(h('button', { 'class': 'btn', type: 'button', text: 'Go to Today', onclick: function () { go('hoy'); } }));
      return card;
    }
    function row(label, n, ok, good) {
      var pct = n ? Math.round(ok / n * 100) : 0;
      return h('div', { 'class': 'drow' }, h('div', { 'class': 'dtop' }, h('span', { 'class': 'lbl', text: label }), h('span', { 'class': 'val', text: n ? pct + '% correct' : 'No answers yet' })),
        h('div', { 'class': 'bar ' + good, role: 'img', 'aria-label': label + ': ' + ok + ' of ' + n + ' correct' }, h('i', { style: { transform: 'scaleX(' + (n ? ok / n : 0) + ')' } })),
        h('p', { 'class': 'small muted', text: ok + ' of ' + n + ' answers' }));
    }
    card.appendChild(h('div', { 'class': 'dbars' }, row('When you said Sure', c.sureN, c.sureOk, 'good'), row('When you said Not sure', c.unsureN, c.unsureOk, '')));
    card.appendChild(h('div', { 'class': 'cm' }, h('div', { 'class': 'wt' }, h('span', { 'class': 'wn', text: 'Confident mistakes: ' + c.hc }),
      h('span', { 'class': 'muted small', text: c.hc ? 'Questions you got wrong while sure. They are the best ones to review.' : 'None pending. Keep saying how sure you are.' })),
      c.hc ? h('button', { 'class': 'btn', type: 'button', text: 'Review', onclick: startHcReview }) : null));
    return card;
  }
  function streakText(n) { return n + '-day review streak'; }
  function streakCard() {
    var n = reviewStreak(docs.sessions.rev, todayISO()), card = h('section', { 'class': 'panel streak' }, h('h2', { text: 'Review streak' }));
    card.appendChild(n ? h('p', { 'class': 'streak-n' }, icon(FLAME, '22'), h('b', { text: streakText(n) })) : h('p', { 'class': 'muted', text: 'Do today’s review to start a streak.' }));
    card.appendChild(h('p', { 'class': 'small muted', text: 'Days in a row you finished the review step of Today. Today does not break it while it is still open.' }));
    if (!docs.sessions.rev[todayISO()]) card.appendChild(h('button', { 'class': 'btn', type: 'button', text: 'Go to Today', onclick: function () { go('hoy'); } }));
    return card;
  }
  function viewProgreso() {
    var root = h('div', { 'class': 'prog' }), st = docs.quiz.stats, pj = projectedFrom(st);
    root.appendChild(h('header', { 'class': 'hd' }, h('h1', { text: 'Progress' }), h('p', { 'class': 'muted', text: countdownText() + (docs.settings.examDate ? ' · ' + fmtDate(docs.settings.examDate) : '') })));
    var mods = h('div', { 'class': 'dbars' }), nW = watchedCount(), nM = masteredCount(), nP = passedCount(), nT = TOPICS.length;
    MODULES.forEach(function (m) {
      var ts = modTopics(m.n); if (!ts.length) return; var c = modWatched(m.n), mm = modMastered(m.n);
      mods.appendChild(h('div', { 'class': 'drow' }, h('div', { 'class': 'dtop' }, h('span', { 'class': 'lbl', text: modName(m) }), h('span', { 'class': 'val' }, c > 0 ? watchedMark(false) : null, ' ' + c + '/' + ts.length)),
        h('div', { 'class': 'bar good', role: 'img', 'aria-label': c + ' of ' + ts.length + ' topics watched, ' + mm + ' mastered' }, h('i', { style: { transform: 'scaleX(' + (c / ts.length) + ')' } })),
        mm ? h('p', { 'class': 'small muted', text: mm + (mm === 1 ? ' topic' : ' topics') + ' mastered' }) : null));
    });
    root.appendChild(h('section', { 'class': 'panel' }, h('h2', { text: 'Course progress' }),
      TOPICS.length ? h('p', { 'class': 'pcount' }, watchedMark(false), h('b', { text: ' Watched ' + nW + '/' + nT }), masteredMark('Mastered ' + nM + '/' + nT), nP ? passedMark('Passed ' + nP) : null) : null,
      TOPICS.length ? h('p', { 'class': 'small muted pnote', text: 'Passed: you answered every check question right. Mastered: you also passed a two-question re-check a day or more later.' }) : null,
      TOPICS.length ? mods : h('p', { 'class': 'muted', text: prepText() })));
    root.appendChild(streakCard());
    var est = pj && pj.enough ? pj : null;
    root.appendChild(h('section', { 'class': 'panel' }, h('h2', { text: 'Estimated score' }), scoreBar(est),
      est ? h('p', { 'class': 'small muted', text: 'An estimate from the ' + est.covered + ' of ' + est.skillTotal + ' skills you have practiced; skills you have not practiced count as a guess. The real exam uses a scaled score.' })
        : h('p', { 'class': 'small muted', text: 'Not enough data yet. The estimate appears once you have answered at least 3 exam questions on each of ' + (pj ? pj.needSkills : Math.ceil(EST_MIN_COVER * PLAN.skills.length)) + ' skills' + (pj ? ' (so far ' + pj.covered + ')' : '') + '. Daily practice and mixed practice count.' }),
      est ? null : h('button', { 'class': 'btn', type: 'button', text: 'Go to Today', onclick: function () { go('hoy'); } })));
    root.appendChild(calibrationCard(st));
    var weak = weakTopics(st, 3), box = h('section', { 'class': 'panel' }, h('h2', { text: 'Your 3 weakest topics' }));
    if (!weak.length) box.appendChild(h('p', { 'class': 'muted', text: 'They will appear after you answer some questions.' }));
    else box.appendChild(h('ul', { 'class': 'weak' }, weak.map(function (w) {
      return h('li', {}, h('div', { 'class': 'wt' }, h('span', { 'class': 'wn', text: w.title }), h('span', { 'class': 'muted small', text: Math.round(w.acc * 100) + '% correct' })),
        h('button', { 'class': 'btn', type: 'button', text: 'Review', onclick: function () { openTopic(w.id, 'progreso', 'learn'); } }));
    })));
    root.appendChild(box);
    return root;
  }

  /* ───────── Certification picker: "What are you studying?" ───────── */
  function prepText() { return 'Lessons for ' + (EXAM.code || 'this exam') + ' are in preparation.'; }
  // One muted line per exam, built from that exam's own saved data (its storage prefix), never from the active one's.
  function certStatus(c) {
    if (!c.topics) return 'Content in preparation';
    var P = storagePrefix(c.id), S = jparse(lsGet(P + 'sessions'), null) || {}, Z = jparse(lsGet(P + 'settings'), null), Q = jparse(lsGet(P + 'quiz'), null) || {}, w = 0;
    c.topicIds.forEach(function (id) { if ((S.watched && S.watched[id]) || (S.lessonsDone && S.lessonsDone[id])) w++; });
    var started = w > 0 || Object.keys(S.seen || {}).length > 0 || Object.keys(S.checks || {}).length > 0 || Object.keys(Q.stats || {}).length > 0 || (Q.attempts || []).length > 0;
    if (!started) return 'Not started';
    var date = Z && typeof Z.examDate === 'string' ? Z.examDate : c.examDate;
    return w + ' of ' + c.topics + (c.topics === 1 ? ' lesson' : ' lessons') + ' watched' + (fmtDate(date) ? ' · exam ' + fmtDate(date) : '');
  }
  function openPicker() { leaveTopic(); UI.picker = true; UI.pickerMsg = ''; renderView(); window.scrollTo(0, 0); focusHeading(document.getElementById('view')); }
  function closePicker() { UI.picker = false; renderView(); window.scrollTo(0, 0); focusHeading(document.getElementById('view')); }
  function pickCert(id) {
    if (id === CERT) { closePicker(); return; }
    if (!TALLER.choose(id)) { UI.pickerMsg = 'Your choice could not be saved because this browser blocks storage.'; renderView(); return; }
    try { window.location.reload(); } catch (e) { /* nothing */ }
  }
  function pickerView() {
    var root = h('div', { 'class': 'picker' });
    if (CERT) root.appendChild(h('button', { 'class': 'link backlink', type: 'button', text: '‹ Back', onclick: closePicker }));
    root.appendChild(h('header', { 'class': 'hd' }, h('h1', { text: 'What are you studying?' }),
      h('p', { 'class': 'muted', text: CERT ? 'Each exam keeps its own progress, cards and exam date. Switching does not delete anything.' : 'Pick an exam. Each one keeps its own progress, cards and exam date.' })));
    root.appendChild(h('ul', { 'class': 'certs' }, (TALLER.certs || []).map(function (c) {
      var cur = c.id === CERT;
      return h('li', {}, h('button', { 'class': 'certrow', type: 'button', 'aria-current': cur ? 'true' : null, onclick: function () { pickCert(c.id); } },
        h('span', { 'class': 'cr-main' }, h('span', { 'class': 'cr-t' }, h('b', { text: c.code }), c.title ? ' · ' + c.title : ''), h('span', { 'class': 'cr-s muted small', text: certStatus(c) })),
        cur ? h('span', { 'class': 'cr-cur small muted', text: 'Current' }) : icon('M9 6l6 6-6 6', '18')));
    })));
    root.appendChild(h('p', { 'class': 'small', role: 'alert', text: UI.pickerMsg || '' }));
    if (CERT) UI.keys.escape = closePicker;
    return root;
  }
  function renderBrand() {
    var name = CERT ? EXAM.app : 'Exam Workshop';
    ['brand', 'brand-m'].forEach(function (id) {
      var el = document.getElementById(id); if (!el) return; el.textContent = '';
      if (!CERT) { el.textContent = name; return; }
      el.appendChild(h('button', { 'class': 'brand-b', type: 'button', 'aria-label': name + ', change exam', onclick: openPicker }, h('span', { text: name }), icon('M6 9l6 6 6-6', '16')));
    });
    try { document.title = name; } catch (e) { /* nothing */ }
  }

  /* ───────── Ajustes ───────── */
  function backupObj() { var o = { app: 'taller-ab620', cert: CERT, v: 3, at: new Date().toISOString() }; NAMES.forEach(function (n) { o[n] = docs[n]; }); return o; }
  function viewAjustes() {
    var root = h('div', { 'class': 'sett' }), S = docs.settings, msg = h('p', { 'class': 'small', 'aria-live': 'polite', text: UI.settingsMsg });
    root.appendChild(h('header', { 'class': 'hd' }, h('h1', { text: 'Settings' })));
    root.appendChild(h('section', { 'class': 'panel stack' }, h('h2', { text: 'Certification' }), h('p', { 'class': 'small muted', text: [EXAM.title, 'Progress, cards and exam date are kept separately for each exam.'].filter(Boolean).join('. ') }),
      h('button', { 'class': 'btn', type: 'button', id: 'cert-change', text: EXAM.code + ' · Change', onclick: openPicker })));
    var date = h('input', { type: 'date', id: 'f-date', value: S.examDate });
    date.addEventListener('change', function () {
      if (date.value === '') { S.examDate = ''; touch('settings'); toast('Exam date cleared'); return; }   // no exam date: cards use the default maximum interval
      if (!parseISO(date.value)) return; S.examDate = date.value; touch('settings'); toast('Saved');
    });
    var theme = h('select', { id: 'f-theme' }, [['auto', 'System'], ['light', 'Light'], ['dark', 'Dark']].map(function (t) { return h('option', { value: t[0], text: t[1], selected: S.theme === t[0] }); }));
    theme.addEventListener('change', function () { S.theme = theme.value; touch('settings'); applyTheme(); });
    root.appendChild(h('section', { 'class': 'panel stack' }, h('div', { 'class': 'field' }, h('label', { 'for': 'f-date', text: 'Exam date' }), h('div', { 'class': 'row2' }, date, S.examDate ? h('button', { 'class': 'btn', type: 'button', text: 'Clear', onclick: function () { S.examDate = ''; touch('settings'); toast('Exam date cleared'); renderView(); } }) : null)), h('div', { 'class': 'field' }, h('label', { 'for': 'f-theme', text: 'Theme' }), theme)));

    var vbox = h('section', { 'class': 'panel stack' }, h('h2', { text: 'Voice for video lessons' }));
    if (!hasSpeech()) vbox.appendChild(h('p', { 'class': 'small muted', text: 'This browser has no speech synthesis. Videos play with captions only.' }));
    else {
      var vs = enVoices(), best = bestVoice(vs);
      var vsel = h('select', { id: 'f-voice' }, [h('option', { value: '', text: best ? 'Automatic · ' + best.name : 'Automatic' })].concat(vs.map(function (v) { return h('option', { value: v.voiceURI, text: v.name + ' (' + v.lang + ')', selected: S.voiceURI === v.voiceURI }); })));
      vsel.addEventListener('change', function () { S.voiceURI = vsel.value; touch('settings'); });
      var rate = h('select', { id: 'f-rate' }, SPEEDS.map(function (r) { return h('option', { value: String(r), text: r + '×' + (r === 1 ? ' (normal)' : ''), selected: nearestSpeed(S.voiceRate) === r }); }));
      rate.addEventListener('change', function () { S.voiceRate = +rate.value; touch('settings'); });
      vbox.appendChild(h('div', { 'class': 'field' }, h('label', { 'for': 'f-voice', text: 'Voice' }), vsel));
      vbox.appendChild(h('div', { 'class': 'field' }, h('label', { 'for': 'f-rate', text: 'Speed' }), h('div', { 'class': 'row2' }, rate, h('button', { 'class': 'btn', type: 'button', text: 'Test', onclick: speakSample }))));
      if (!vs.length) vbox.appendChild(h('p', { 'class': 'small muted', text: 'No English voice found in this browser. Videos will play with captions only.' }));
    }
    vbox.appendChild(h('p', { 'class': 'small muted', text: 'For more natural voices, open the app in Microsoft Edge.' }));
    root.appendChild(vbox);

    var bk = h('div'), ta = h('textarea', { 'class': 'mono', rows: 5, placeholder: 'Paste the backup here to restore it', 'aria-label': 'Backup to restore' });
    root.appendChild(h('section', { 'class': 'panel stack' }, h('h2', { text: 'Backup' }),
      h('div', { 'class': 'row2' }, h('button', { 'class': 'btn', type: 'button', text: 'Copy backup', onclick: function () { copyText(JSON.stringify(backupObj()), bk); } })), bk, ta,
      h('div', { 'class': 'row2' }, h('button', { 'class': 'btn', type: 'button', text: 'Restore backup', onclick: function () {
        var o = jparse(ta.value, null);
        var prob = backupProblem(o, CERT);
        if (prob) { UI.settingsMsg = prob; msg.textContent = UI.settingsMsg; return; }
        NAMES.forEach(function (n) { if (o[n] && typeof o[n] === 'object') { docs[n] = mergeDoc(n, o[n]); touch(n); } });
        dropFlow(); UI.cur = null; applyTheme(); UI.settingsMsg = 'Backup restored.'; renderView(); toast('Backup restored');
      } })), msg));
    var step1 = UI.resetStep;
    function cancelReset() { UI.resetStep = 0; renderView(); focusEl(document.getElementById('reset-open')); }
    root.appendChild(h('section', { 'class': 'panel stack' }, h('h2', { text: 'Start over' }), h('p', { 'class': 'small muted', text: 'This deletes your progress, answers and cards. It cannot be undone.' }),
      step1 === 0 ? h('button', { 'class': 'btn danger', type: 'button', id: 'reset-open', text: 'Reset progress…', onclick: function () { UI.resetStep = 1; renderView(); focusEl(document.getElementById('reset-cancel')); } })
        : h('div', { 'class': 'confirm', role: 'alertdialog', 'aria-labelledby': 'reset-q' }, h('p', { id: 'reset-q', text: 'Are you sure? All your progress will be lost.' }), h('div', { 'class': 'row2' }, h('button', { 'class': 'btn danger solid', type: 'button', text: 'Yes, delete everything', onclick: function () {
          var keep = { examDate: S.examDate, theme: S.theme, voiceRate: S.voiceRate, voiceURI: S.voiceURI };
          NAMES.forEach(function (n) { docs[n] = defaults(n); touch(n); });
          Object.assign(docs.settings, keep); touch('settings'); lsSet(PFX + 'run', ''); dropFlow(); UI.quiz = null; UI.cur = null; UI.practice = null; UI.resetStep = 0; renderView(); toast('Progress reset');
        } }), h('button', { 'class': 'btn', type: 'button', id: 'reset-cancel', text: 'Cancel', onclick: cancelReset })))));
    if (step1) UI.keys.escape = cancelReset;   // the safe button gets the focus when the question opens; Escape cancels and returns to "Reset progress…"
    root.appendChild(h('p', { 'class': 'small muted syncline' }, h('span', { 'class': 'sync-chip chip local' }, h('i', { 'class': 'dot' }), h('span', { 'class': 'sync-text', text: 'This browser only' })), ' Progress storage'));
    return root;
  }

  /* ───────── navegación ───────── */
  var TABS = [['hoy', 'Today'], ['aprender', 'Learn'], ['examen', 'Exam'], ['progreso', 'Progress']];
  function go(tab) { UI.picker = false; leaveTopic(); if (tab !== 'examen' && UI.quiz && !UI.quiz.finished) { saveRun(); UI.quiz = null; stopTimer(); } /* an unfinished exam stays saved: the Exam tab offers Continue / Discard */ if (UI.cur && UI.cur.phase === 'done' && tab !== 'hoy') { if (UI.cur === UI.practice) UI.practice = null; UI.cur = null; } if (tab === 'aprender' && UI.tab !== 'aprender' && UI.learn.v !== 'list') UI.learn = { v: 'list', id: null, q: '', back: 'aprender' }; UI.tab = tab; renderView(); window.scrollTo(0, 0); }
  function renderTabs() {
    var side = document.getElementById('tabs'), bar = document.getElementById('bar'), gear = document.getElementById('gear'), sbtn = document.getElementById('sbtn'); side.innerHTML = ''; bar.innerHTML = '';
    side.hidden = bar.hidden = !CERT; if (gear) gear.hidden = !CERT; if (sbtn) sbtn.hidden = !CERT;   // nothing to navigate until an exam is chosen
    if (!CERT) return;
    TABS.forEach(function (t) {
      side.appendChild(h('button', { 'class': 'nav-i', type: 'button', id: 'tab-' + t[0], 'aria-current': UI.tab === t[0] ? 'page' : null, onclick: function () { go(t[0]); } }, icon(NAVICO[t[0]]), h('span', { text: t[1] })));
      bar.appendChild(h('button', { 'class': 'bar-i', type: 'button', 'aria-current': UI.tab === t[0] ? 'page' : null, onclick: function () { go(t[0]); } }, icon(NAVICO[t[0]]), h('span', { text: t[1] })));
    });
    side.appendChild(h('button', { 'class': 'nav-i nav-search', type: 'button', id: 'tab-buscar', 'aria-current': UI.tab === 'buscar' ? 'page' : null, onclick: function () { openSearch(''); } }, icon(SEARCH_ICO), h('span', { text: 'Search' }), h('kbd', { 'class': 'sx-key', 'aria-hidden': 'true', text: '/' })));
    // Desktop: Settings sits at the foot of the sidebar (the top bar with the gear is phone-only).
    side.appendChild(h('button', { 'class': 'nav-i nav-set', type: 'button', id: 'tab-ajustes', 'aria-current': UI.tab === 'ajustes' ? 'page' : null, onclick: function () { go('ajustes'); } }, icon(NAVICO.gear), h('span', { text: 'Settings' })));
    if (sbtn) { sbtn.innerHTML = ''; sbtn.appendChild(icon(SEARCH_ICO, '24')); sbtn.setAttribute('aria-current', UI.tab === 'buscar' ? 'page' : 'false'); sbtn.onclick = function () { openSearch(''); }; }
    if (gear) { gear.innerHTML = ''; gear.appendChild(icon(NAVICO.gear, '24')); gear.setAttribute('aria-current', UI.tab === 'ajustes' ? 'page' : 'false'); gear.onclick = function () { go('ajustes'); }; }
  }
  function screenKey() { var T = UI.topic, C = UI.cur, Q = UI.quiz; return [UI.picker ? 'pick' : '', UI.tab, T ? T.id : '', C ? C.kind + C.phase + C.i : '', Q ? (Q.finished ? 'r' : Q.idx) : '', UI.learn ? UI.learn.v : ''].join('|'); }
  function renderView() {
    var v = document.getElementById('view'); if (!v) return;
    var fc = null; ['view', 'bar', 'tabs', 'top'].some(function (id) { var sg = focusCapture(document.getElementById(id)); if (sg) fc = { id: id, sg: sg }; return !!sg; });
    renderTabs(); UI.rendered = true; UI.keys = {};
    var f = UI.picker || !CERT ? pickerView : UI.topic ? topicView : { hoy: viewHoy, aprender: viewAprender, examen: viewExamen, progreso: viewProgreso, ajustes: viewAjustes, buscar: viewBuscar }[UI.tab] || viewHoy;
    if (UI.tab !== 'examen') stopTimer();
    var immersive = !UI.picker && CERT && !UI.topic && ((UI.tab === 'hoy' && UI.cur) || (UI.tab === 'examen' && UI.quiz && !UI.quiz.finished));
    var top = document.getElementById('top'); if (top) top.hidden = !!immersive;
    v.innerHTML = '';
    try { v.appendChild(f()); } catch (e) { v.appendChild(h('div', { 'class': 'notice', text: 'This section could not be displayed: ' + e.message })); if (window.console) console.error(e); }
    setChip();
    var key = screenKey(), changed = UI.screenKey != null && key !== UI.screenKey; UI.screenKey = key;
    if (fc) {   // keyboard users keep their place: same control if it is still there, else the new screen's heading
      var root = document.getElementById(fc.id), ok = focusRestore(root, fc.sg, fc.id === 'view' && !changed ? '.actions .btn.primary' : null);
      if (!ok && fc.id !== 'view' && !changed) ok = true;
      if (!ok) focusHeading(v);
    }
    if (UI.scrollFb) { UI.scrollFb = false; revealFb(v.querySelector('.fb')); }
  }

  /* ───────── arranque ───────── */
  function boot() {
    try {   // the page is a fragment inside a host document: make sure it declares its language and a mobile viewport
      document.documentElement.setAttribute('lang', 'en');
      if (!document.querySelector('meta[name="viewport"]')) { var mv = document.createElement('meta'); mv.name = 'viewport'; mv.content = 'width=device-width, initial-scale=1, viewport-fit=cover'; document.head.appendChild(mv); }
    } catch (e) { /* nothing */ }
    applyTheme(); UI.flow = CERT ? loadFlow() : null; renderBrand();
    document.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
      var t = e.target, tag = t && t.tagName;
      if (tag === 'TEXTAREA' || tag === 'SELECT' || (tag === 'INPUT' && t.type !== 'radio' && t.type !== 'checkbox') || (t && t.isContentEditable)) return;
      var k = e.key.toLowerCase();
      if (k === '/' && CERT && !UI.picker && !UI.cur && !(UI.quiz && !UI.quiz.finished) && window.matchMedia && window.matchMedia('(min-width: 860px)').matches) { e.preventDefault(); openSearch(''); return; }   // desktop only; not inside a question or an exam
      if ((k === ' ' || k === 'enter') && (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'SUMMARY')) return;
      var fn = UI.keys && UI.keys[k]; if (fn) { e.preventDefault(); fn(); }
    });
    setChip(); renderView(); if (CERT) initCapabilities();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
