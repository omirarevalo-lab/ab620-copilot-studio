// Logic smoke tests (no DOM): daily calendar, lesson flow, check questions, review, module practice, glossary, voice/scenes, score, questions,
// plus certification isolation (storage prefixes, db doc ids, backup guard, splits, cert.js choice).
// Usage: node tools/smoke.mjs   (CERT=ab400 node tools/smoke.mjs: the same chain with that certification active; an empty one runs the isolation checks only)
import fs from 'node:fs'; import vm from 'node:vm'; import assert from 'node:assert/strict'; import path from 'node:path';
import { ROOT as root, CERT, DATA_REL, courseFiles as listCourse } from './cert.mjs';

// The app's data chain as build.mjs inlines it: every certification's files wrapped into window.__CERTS.<id>, then src/cert.js, then the app.
const REG = [{ id: 'ab620', dir: 'data' }, { id: 'ab400', dir: 'data/ab400' }];
const DATA = ['audio-index.js', 'video-index.js', 'qmap.js', 'meta.js', 'questions.js', 'flashcards.js'];
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
function makeStore(init) { const m = new Map(Object.entries(init || {})); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, _m: m }; }
function boot(store, opts) {   // returns a vm context with cert.js (and, unless opts.noApp, the app logic) loaded on top of the wrapped data
  const c = { window: {}, console }; vm.createContext(c); c.window.localStorage = store;
  vm.runInContext('window.__CERTS = {};', c);
  for (const r of REG) {
    const dir = path.join(root, ...r.dir.split('/')); if (!fs.existsSync(dir)) continue;
    const files = [...DATA, ...fs.readdirSync(dir).filter((f) => /^course-m[\w-]*\.js$/.test(f)).sort()].filter((f) => fs.existsSync(path.join(dir, f)));
    vm.runInContext('window.__CERTS.' + r.id + ' = {};', c);
    for (const f of files) vm.runInContext('(function (window) {\n' + fs.readFileSync(path.join(dir, f), 'utf8') + '\n})(window.__CERTS.' + r.id + ');', c, { filename: r.dir + '/' + f });
  }
  vm.runInContext(read('src/cert.js'), c, { filename: 'src/cert.js' });
  if (!opts || !opts.noApp) for (const f of ['src/vendor/ts-fsrs.js', 'src/app.js']) vm.runInContext(read(f), c, { filename: f });
  return c;
}
const ctx = boot(makeStore({ 'taller.cert': CERT }));
const courseFiles = listCourse().map((f) => DATA_REL + '/' + f);
const M = ctx.window.AB620_META, L = ctx.window.AB620_LOGIC, Q = ctx.window.AB620_QUESTIONS, C = ctx.window.AB620_CARDS;
const TS = L.topics(), MODS = L.modules();
let n = 0; const ok = (c, m) => { assert.ok(c, m); n++; };

// ── certification isolation ──
{
  ok(ctx.window.TALLER && ctx.window.TALLER.cert === CERT && L.cert() === CERT, 'cert.js activated ' + CERT);
  const certs = ctx.window.TALLER.certs; ok(certs.map((c) => c.id).join() === 'ab620,ab400', 'registry order');
  const code = { ab620: 'AB-620', ab400: 'AB-400' };
  certs.forEach((c) => ok(c.code === code[c.id] && c.title && c.app === code[c.id] + ' Workshop' && Number.isInteger(c.topics) && Array.isArray(c.topicIds), c.id + ' summary'));
  ok(M.exam && M.exam.code === code[CERT] && M.exam.title && M.exam.app && M.exam.subject, 'META.exam of the active exam');
  // every exam: splits come from its META, cover its domains and add up to 50 (mock) and 20 (short)
  for (const r of REG) {
    const meta = ctx.window.__CERTS[r.id].AB620_META, ids = meta.domains.map((d) => d.id).sort().join();
    ['mock', 'short'].forEach((k) => { const sp = meta.splits[k]; ok(Object.keys(sp).sort().join() === ids, r.id + ' ' + k + ' split covers its domains'); ok(Object.values(sp).reduce((a, b) => a + b, 0) === (k === 'mock' ? 50 : 20), r.id + ' ' + k + ' split sum'); });
  }
  ok(M.domains.length === (CERT === 'ab400' ? 4 : 3), 'domain count of ' + CERT);
  ok(JSON.stringify(L.examSplit('mock')) === JSON.stringify(M.splits.mock) && JSON.stringify(L.examSplit('short')) === JSON.stringify(M.splits.short), 'app uses META splits');
  ok(L.splitTotal(L.examSplit('mock')) === 50 && L.splitTotal(L.examSplit('short')) === 20, 'split totals');
  // without META.splits the app derives a split from the domain weights (4 domains too)
  for (const r of REG) {
    const c2 = boot(makeStore({ 'taller.cert': r.id }), { noApp: true }); const meta = c2.window.AB620_META; delete meta.splits;
    for (const f of ['src/vendor/ts-fsrs.js', 'src/app.js']) vm.runInContext(read(f), c2);
    const L2 = c2.window.AB620_LOGIC; ok(L2.splitTotal(L2.examSplit('mock')) === 50 && L2.splitTotal(L2.examSplit('short')) === 20 && Object.keys(L2.examSplit('mock')).length === meta.domains.length, r.id + ': fallback split from weights');
  }
  // storage prefixes and database doc ids
  ok(L.storagePrefix('ab620') === 'ab620.v1.' && L.storagePrefix('ab400') === 'ab400.v1.' && L.storagePrefix(null) === 'ab620.v1.', 'storage prefixes');
  const names = ['settings', 'sessions', 'quiz', 'cards'];
  ok(names.every((nm) => L.docKey('ab620', nm) === nm && L.docKey('ab400', nm) === 'ab400-' + nm), 'db doc ids: progress/<n> for ab620, progress/ab400-<n> for others');
  ok(new Set(names.flatMap((nm) => [L.storagePrefix('ab620') + nm, L.storagePrefix('ab400') + nm, L.docKey('ab620', nm), L.docKey('ab400', nm)])).size === 16, 'no key or doc id is shared between exams');
  // backups: only into the exam they belong to (old backups without `cert` are AB-620)
  const bk = (cert) => Object.assign({ app: 'taller-ab620', v: 3 }, cert ? { cert } : {});
  ok(L.backupProblem(bk('ab620'), 'ab620') === '' && L.backupProblem(bk(), 'ab620') === '' && L.backupProblem(bk('ab400'), 'ab400') === '', 'backup of the same exam is accepted');
  ok(/AB-620/.test(L.backupProblem(bk(), 'ab400')) && /AB-400/.test(L.backupProblem(bk(), 'ab400')), 'old backup into AB-400 is refused and names both exams');
  ok(/AB-400/.test(L.backupProblem(bk('ab400'), 'ab620')) && /AB-620/.test(L.backupProblem(bk('ab400'), 'ab620')), 'AB-400 backup into AB-620 is refused');
  ok(L.backupProblem({ app: 'other' }, 'ab620') !== '' && L.backupProblem(null, 'ab620') !== '' && L.backupProblem('x', 'ab620') !== '', 'not a backup');
  // cert.js: choice rules
  const st = (init) => boot(makeStore(init), { noApp: true }).window;
  let w = st({}); ok(w.TALLER.cert === null && w.AB620_META === undefined && w.AB620_QUESTIONS === undefined, 'first run: no exam chosen, no data exposed');
  w = st({ 'ab620.v1.sessions': '{}' }); ok(w.TALLER.cert === 'ab620' && w.AB620_META.exam.code === 'AB-620', 'existing AB-620 learner: AB-620 silently');
  ok(!w.localStorage.getItem('taller.cert'), 'the silent choice is not written');
  w = st({ 'taller.cert': 'ab400' }); ok(w.TALLER.cert === 'ab400' && w.AB620_META.exam.code === 'AB-400' && Array.isArray(w.AB620_COURSE) && w.AB620_COURSE.every((t) => /^P/.test(t.id)) && Array.isArray(w.AB620_QUESTIONS), 'AB-400 chosen: AB-400 globals (only P* topics)');
  w = st({ 'taller.cert': 'ab400', 'ab620.v1.sessions': '{}' }); ok(w.TALLER.cert === 'ab400', 'stored choice wins over AB-620 progress');
  w = st({ 'taller.cert': 'zzz' }); ok(w.TALLER.cert === null, 'unknown stored id = no choice');
  w = st({ 'taller.cert': 'zzz', 'ab620.v1.sessions': '{}' }); ok(w.TALLER.cert === 'ab620', 'unknown stored id with AB-620 progress = AB-620');
  w = st({}); ok(w.TALLER.choose('nope') === false && !w.localStorage.getItem('taller.cert') && w.TALLER.choose('ab400') === true && w.localStorage.getItem('taller.cert') === 'ab400', 'choose() stores only known ids');
  w = boot({ getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } }, { noApp: true }).window; ok(w.TALLER.cert === null && w.TALLER.choose('ab400') === false, 'blocked storage: no crash, choice not saved');
  // globals of the other exam never leak into the active one
  const other = ctx.window.__CERTS[CERT === 'ab620' ? 'ab400' : 'ab620'];
  ok(ctx.window.AB620_META !== other.AB620_META && ctx.window.AB620_QUESTIONS !== other.AB620_QUESTIONS, 'the active exam does not use the other exam\'s data');
}
if (CERT !== 'ab620') {   // an exam whose content is still being written: structure + generic topic checks (the long chain below is AB-620's)
  ok(M.domains.length > 0 && M.skills.length > 0 && M.groups.length > 0, 'meta structure');
  const sk0 = new Set(M.skills.map((s) => s.id)); ok(M.skills.every((s) => M.domains.some((d) => d.id === s.domain)) && M.groups.every((g) => M.domains.some((d) => d.id === g.domain)), 'skills and groups point at domains');
  ok(Q.every((q) => sk0.has(q.skill)) && C.every((c) => sk0.has(c.skill)), 'questions and cards point at skills');
  const TT = L.topics(), FIG = ['pipeline', 'flow', 'compare', 'layers', 'matrix'];
  TT.forEach((t) => {
    ok((t.skills || []).every((k) => sk0.has(k)), t.id + ': skills exist in meta');
    (t.theory.sections || []).forEach((sec, i) => { if (sec.figure) ok(FIG.includes(sec.figure.type), t.id + ' section ' + i + ': known figure type'); if (sec.code) ok(typeof sec.code.text === 'string' && sec.code.text.length > 0 && !!sec.code.lang, t.id + ' section ' + i + ': code has lang and text'); });
    ok((t.check || []).every((c) => c.options.length === 4 && c.answer >= 0 && c.answer < 4), t.id + ': checks have 4 options and a valid answer');
  });
  console.log('Tests OK:', n, '· ' + CERT + ': topics', TT.length, '· questions', Q.length, '· cards', C.length, '(isolation + generic checks)');
  process.exit(0);
}
ok(M.domains.length === 3 && M.skills.length === 44 && M.groups.length === 9, 'meta structure');
const sk = new Set(M.skills.map(s => s.id));
Q.forEach(q => { ok(sk.has(q.skill), 'question ' + q.id + ' skill'); ok(q.answer.every(i => i >= 0 && i < q.options.length), q.id + ' answer'); });
C.forEach(c => ok(sk.has(c.skill), 'card ' + c.id));

// course: minimal schema and order (module 0 first, then 1–7)
ok(TS.length >= 3 && MODS.length === 8, 'course loaded (' + courseFiles.join(', ') + ')');
const ids = new Set();
TS.forEach((t, i) => {
  ok(t.id && !ids.has(t.id), 'unique id ' + t.id); ids.add(t.id);
  ok(Number.isInteger(t.module) && t.module >= 0 && t.module <= 7 && (i === 0 || TS[i - 1].module <= t.module), t.id + ' module order');
  ok(t.title && Array.isArray(t.skills) && t.skills.every(s => sk.has(s)), t.id + ' skills');
  ok(t.theory && t.theory.intro && Array.isArray(t.theory.sections) && t.theory.sections.length >= 1, t.id + ' theory');
  ok(Array.isArray(t.scenes) && t.scenes.length >= 3 && t.scenes.every(s => s.title && s.caption && s.say), t.id + ' scenes');
  ok(Array.isArray(t.check) && t.check.length >= 3 && t.check.every(c => c.options.length === 4 && c.answer >= 0 && c.answer < 4 && c.explanation && c.stem), t.id + ' check questions');
});
ok(TS[0].module === Math.min(...TS.map(t => t.module)), 'first topic = lowest module');

// no weekday rule: the plan is the next lesson on any day of the week (Mon 5 ... Sun 11 Oct 2026)
ok(L.dayKind === undefined && L.tomorrowLabel === undefined, 'no weekday logic is exposed');
let done = {}; let p;
for (const d of ['2026-10-05', '2026-10-09', '2026-10-10', '2026-10-11']) { p = L.planFor(d, done); ok(p.kind === 'lesson' && p.topic.id === TS[0].id, d + ': the first topic'); }
done = { [TS[0].id]: { at: 1 } };
for (const d of ['2026-10-08', '2026-10-10', '2026-10-11', '2026-10-20']) { p = L.planFor(d, done); ok(p.kind === 'lesson' && p.topic.id === TS[1].id, d + ': continues with topic 2'); }
ok(L.countDone(done) === 1, 'counts completed lessons');
const all = {}; TS.forEach(t => all[t.id] = { at: 1 }); ok(L.planFor('2026-10-07', all).kind === 'review' && L.planFor('2026-10-11', all).kind === 'review', 'no lessons left: mixed review, any day');
// modules are completed in order even if some topics were done out of order
const mid = { [TS[0].id]: 1, [TS[2].id]: 1 }; ok(L.planFor('2026-10-06', mid).topic.id === TS[1].id, 'the first gap comes first');

// topic check: scored correctly
const t0 = TS[0], cks = L.makeCheckItems(t0);
ok(cks.length === t0.check.length && cks.every(it => it.k === 'c' && [...it.order].sort().join() === t0.check[0].options.map((_, i) => i).join()), 'check items');
cks.forEach((it, i) => { const q = L.qOf(it); ok(q && q.answer[0] === t0.check[i].answer && q.options === t0.check[i].options, 'qOf check'); ok(L.isCorrect(q, [t0.check[i].answer]), 'correct answer scores'); ok(!L.isCorrect(q, [(t0.check[i].answer + 1) % 4]), 'wrong answer does not score'); ok(!L.isCorrect(q, []), 'empty is incorrect'); });
// topic exam practice: topics without skills (e.g. Module 0) are skipped
ok(L.pickTopicPractice({ skills: [] }, 3, {}).length === 0, 'no skills: no practice');
const withSk = TS.find(t => t.skills.length); const tp = L.pickTopicPractice(withSk, 3, {});
ok(tp.length === 3 && new Set(tp.map(q => q.id)).size === 3, '3 unique questions for the topic');
ok(tp.filter(q => withSk.skills.includes(q.skill)).length >= Math.min(3, Q.filter(q => withSk.skills.includes(q.skill)).length), 'questions match the topic');

// module practice: only studied modules with questions whose skills belong to the module (studied = watched, check passed or lesson done; opening a topic does not count)
ok(L.practicableModules({}).length === 0, 'nothing studied: no practice');
const m1 = TS.find(t => t.module >= 1 && t.skills.length), seenOnly = { [m1.id]: 1 };
const pm = L.practicableModules(seenOnly);
ok(pm.length === 1 && pm[0].n === m1.module, 'only the studied module');
ok(L.practicableModules(L.studiedMap({ lessonsDone: { [m1.id]: { at: 1 } } })).length === 1, 'a completed lesson counts as studied');
ok(L.practicableModules(L.studiedMap({ seen: { [m1.id]: 1, [TS[0].id]: 1 } })).length === 0, 'only opening topics (seen) unlocks nothing');
const pool = L.modulePool(m1.module), modSk = new Set(TS.filter(t => t.module === m1.module).flatMap(t => t.skills));
ok(pool.length > 0 && pool.every(q => modSk.has(q.skill)), 'module questions belong to its topics');
const m0 = TS.find(t => t.module === 0);
if (m0) ok(L.practicableModules({ [m0.id]: 1 }).length === (L.modulePool(0).length ? 1 : 0), 'Module 0: practice only if it has questions');
ok(L.modSeenCount(m1.module, seenOnly) === 1, 'studied/total count');

// review: due mistakes (max 3) + cards, up to 5, without repeating the day's questions
const stats = {}; const old = Date.now() - 86400000 * 2;
Q.slice(0, 6).forEach(q => { L.recordInto(stats, q, false); stats[q.id].nextAt = old; });
const rv = L.pickReview(stats, {}, '2026-10-06', t0.skills, [Q[0].id], 5);
ok(rv.length === 5, 'review of 5'); ok(rv.filter(r => r.t === 'q').length === 3 && !rv.some(r => r.id === Q[0].id), 'max 3 mistakes and no duplicates');
ok(rv.filter(r => r.t === 'c').length === 2 && rv.every(r => r.t === 'q' || C.some(c => c.id === r.id)), 'filled up with cards');
ok(L.pickReview({}, {}, '2026-10-06', null, [], 5).length === 3, 'review with cards only: 3 new cards a day');
// weak topics (by course topic)
const wst = {}; Q.filter(q => withSk.skills.includes(q.skill)).forEach(q => { wst[q.id] = { seen: 1, correct: 0, h: '0' }; });
const other = TS.find(t => t.skills.length && !t.skills.some(s => withSk.skills.includes(s)));
Q.filter(q => other.skills.includes(q.skill)).forEach(q => { wst[q.id] = { seen: 1, correct: 1, h: '1' }; });
const wk = L.weakTopics(wst, 3); ok(wk.length >= 2 && wk.length <= 3 && wk[0].acc === 0 && wk[wk.length - 1].acc >= wk[0].acc, 'weak topics sorted');
ok(TS.find(t => t.id === wk[0].id).skills.some(s => withSk.skills.includes(s)), 'the weakest is the topic with no correct answers');
ok(L.weakTopics({}, 3).length === 0, 'no data: no topics');

// glossary
const gl = L.allGlossary(); ok(gl.length >= 3 && new Set(gl.map(g => g.term.toLowerCase())).size === gl.length, 'glossary without duplicates');
ok(gl.every((g, i) => i === 0 || gl[i - 1].term.localeCompare(g.term, 'en-US', { sensitivity: 'base' }) <= 0), 'glossary sorted');
ok(L.searchGlossary(gl, '').length === gl.length, 'no search: everything');
ok(L.searchGlossary(gl, gl[0].term.toUpperCase()).some(g => g.term === gl[0].term), 'search by term (uppercase)');
ok(L.searchGlossary(gl, 'zzzxqj').length === 0, 'search with no results');
ok(L.searchGlossary([{ term: 'Café', def: 'x' }], 'cafe').length === 1, 'accent-insensitive search');

// video: proportional audio split, estimated duration, voice choice
// player helpers: time format, scene at a time, watched threshold, resume position, chapter jumps, mastered, upcoming classes
ok(L.fmtTime(0) === '0:00' && L.fmtTime(9.9) === '0:09' && L.fmtTime(75) === '1:15' && L.fmtTime(600) === '10:00' && L.fmtTime(3725) === '1:02:05' && L.fmtTime(-5) === '0:00' && L.fmtTime(NaN) === '0:00', 'fmtTime m:ss');
const scs = [{ start: 0 }, { start: 23 }, { start: 41.7 }, { start: 80 }];
ok(L.sceneAtTime(scs, 0) === 0 && L.sceneAtTime(scs, 22.9) === 0 && L.sceneAtTime(scs, 23) === 1 && L.sceneAtTime(scs, 79.99) === 2 && L.sceneAtTime(scs, 500) === 3 && L.sceneAtTime(scs, -3) === 0 && L.sceneAtTime([], 5) === 0, 'scene at time = last scene whose start <= t');
ok(L.isWatched(90, 100) && L.isWatched(100, 100) && !L.isWatched(89.9, 100) && !L.isWatched(5, 0) && !L.isWatched(0, 0), 'watched at 90%');
ok(L.resumePos(40, 150) === 40 && L.resumePos(0.5, 150) === 0 && L.resumePos(undefined, 150) === 0 && L.resumePos(146, 150) === 0 && L.resumePos(144.9, 150) === 144.9 && L.resumePos(40, 0) === 0, 'resume position rules');
ok(L.chapterTarget(scs, 50, 1) === 3 && L.chapterTarget(scs, 90, 1) === 3 && L.chapterTarget(scs, 50, -1) === 2 && L.chapterTarget(scs, 42, -1) === 1 && L.chapterTarget(scs, 0, -1) === 0 && L.chapterTarget(scs, 5, 1) === 1, 'chapter jumps');
ok(L.isPassed({ ok: 3, n: 3 }) && !L.isPassed({ ok: 2, n: 3 }) && !L.isPassed(null) && !L.isPassed({ ok: 0, n: 0 }), 'passed = all check questions correct');
ok(!L.isMastered({ ok: 2, n: 3 }) && !L.isMastered(null) && !L.isMastered({ ok: 0, n: 0 }), 'not passed is never mastered');
let up = L.upcoming({}, 3); // today offers TS[0]; coming up = the next three, in order, no dates
ok(up.length === 3 && up[0].topic.id === TS[1].id && up[1].topic.id === TS[2].id && up[2].topic.id === TS[3].id && up.every(u => u.date === undefined), 'upcoming: next lessons in order, without dates');
up = L.upcoming({ [TS[0].id]: 1 }, 2); ok(up.length === 2 && up[0].topic.id === TS[2].id, 'upcoming after the first lesson is done: skips the one Today offers');
ok(L.upcoming(Object.fromEntries(TS.map(t => [t.id, 1])), 3).length === 0, 'nothing left: no upcoming');
ok(L.upcoming({ [TS[0].id]: 1, [TS[2].id]: 1 }, 1)[0].topic.id === TS[3].id, 'upcoming follows the order after the first gap');
// optional narration index: each entry matches the topic's scenes
const AU = ctx.window.AB620_AUDIO || {};
for (const [id, e] of Object.entries(AU)) { const t = TS.find(x => x.id === id); ok(t && e.src === 'audio/' + id + '.mp3' && e.duration > 0 && e.scenes.length === t.scenes.length && e.scenes.every((s, i) => s.end > s.start && (i === 0 ? s.start === 0 : s.start >= e.scenes[i - 1].end) && s.end <= e.duration + 0.5), 'audio index ' + id); }
ok(Math.abs(L.estDur({ say: new Array(52).fill('x').join(' ') }, 1) - 20) < 1e-6, 'about 2.6 words/s'); ok(L.estDur({ say: 'hello' }, 1) === 3, 'minimum 3 s'); ok(L.estDur({ say: new Array(52).fill('x').join(' ') }, 2) < 11, 'speed shortens it');
const aria = { name: 'Microsoft Aria Online (Natural) - English (United States)', lang: 'en-US' }, david = { name: 'Microsoft David', lang: 'en-US' }, uk = { name: 'Google UK English Female', lang: 'en-GB' }, au = { name: 'Some Voice', lang: 'en-AU' }, es = { name: 'Microsoft Sabina', lang: 'es-MX' };
ok(L.bestVoice([es, david, uk, aria]).name.includes('Aria'), 'prefers Natural/Online');
ok(L.bestVoice([es, uk, david]).name === 'Microsoft David', 'en-US before en-GB');
ok(L.bestVoice([es, au, uk]).name === uk.name, 'en-GB before en-AU');
ok(L.bestVoice([es, { name: 'Online voice', lang: 'en_IN' }, au]).name === 'Online voice', 'Online before plain, any en-*');
ok(L.bestVoice([es]) === null && L.bestVoice([es, { name: 'Microsoft Helena', lang: 'es-ES' }]) === null && L.bestVoice([]) === null, 'no English voice: null');

// daily questions, mock exam and mixed review
const st0 = {}; const sat = L.pickSplit({ D1: 6, D2: 9, D3: 5 }, st0); ok(sat.length === 20 && new Set(sat.map(q => q.id)).size === 20, 'Mixed review: 20 unique');
// score, Leitner, mock exam (shared logic)
ok(L.projectedFrom({}) === null, 'no data');
const a = {}; Q.forEach(q => a[q.id] = { seen: 1, correct: 1, h: '1' }); let pj = L.projectedFrom(a); ok(pj.score === 1000, 'all correct');
Q.forEach(q => a[q.id] = { seen: 1, correct: 0, h: '0' }); pj = L.projectedFrom(a); ok(pj.score === 0, 'all wrong');
Q.forEach((q, i) => a[q.id] = { seen: 1, correct: i % 2, h: String(i % 2) }); pj = L.projectedFrom(a); ok(pj.score > 300 && pj.score < 700, 'mixed ' + pj.score);
const st = {}; L.recordInto(st, Q[0], false); ok(st[Q[0].id].box === 1 && st[Q[0].id].h === '0', 'mistake goes to box 1');
L.recordInto(st, Q[0], true, true); ok(st[Q[0].id].box === 2, 'advances'); L.recordInto(st, Q[0], true, true); L.recordInto(st, Q[0], true, true); ok(st[Q[0].id].box === 0, 'mastered');
const split = L.pickSplit({ D1: 16, D2: 22, D3: 12 }, {}); ok(split.length === 50 && new Set(split.map(q => q.id)).size === 50, 'mock 50 unique');
ok(split.filter(q => q.domain === 'D2').length === 22, 'mock weights D2');
const it = L.makeItems([Q[0]])[0]; ok([...it.order].sort().join() === Q[0].options.map((_, i) => i).join(), 'valid shuffle');
ok(L.isCorrect(Q[0], Q[0].answer.slice().reverse()), 'scoring independent of order'); ok(!L.isCorrect(Q[0], []), 'empty is incorrect');
// cards: FSRS (ts-fsrs). Fuzz off so the numbers are deterministic.
{
  const T = '2026-10-06', nf = { fuzz: false }, days = (c) => Math.round((new Date(c.due) - new Date(T)) / 864e5);
  const ag = L.gradeCard(undefined, 'again', T, null, nf), gd = L.gradeCard(undefined, 'good', T, null, nf), ez = L.gradeCard(undefined, 'easy', T, null, nf), hd = L.gradeCard(undefined, 'hard', T, null, nf);
  ok(days(ag) <= 1 && days(ag) >= 1, 'Again = back tomorrow'); ok(days(ag) <= days(hd) && days(hd) <= days(gd) && days(gd) < days(ez), 'Again <= Hard <= Good < Easy (' + [ag, hd, gd, ez].map(days) + ')');
  ok(gd.state === 2 && gd.reps === 1 && gd.r === T && gd.last_review === T && gd.stability > 0 && gd.difficulty > 0, 'FSRS fields stored');
  let c = gd, t = T, prev = days(gd), seq = [prev];
  for (let i = 0; i < 4; i++) { t = c.due; c = L.gradeCard(c, 'good', t, null, nf); const d = Math.round((new Date(c.due) - new Date(t)) / 864e5); ok(d > prev, 'Good intervals grow (' + seq + ',' + d + ')'); prev = d; seq.push(d); }
  const lap = L.gradeCard(c, 'again', c.due, null, nf); ok(Math.round((new Date(lap.due) - new Date(c.due)) / 864e5) < prev && lap.lapses === 1, 'Again after a long interval = short interval, lapse counted');
  // old grade names still work; fuzz on does not break
  ok(L.gradeCard(undefined, 'ok', T, null, nf).due === gd.due && L.gradeCard(undefined, 'no', T, null, nf).due === ag.due, 'old grade names');
  ok(L.gradeCard(c, 'good', c.due).due > c.due, 'fuzz on works');
  // maximum_interval = days until the exam (never later than the exam; at least 1 day)
  const rv = { due: '2026-10-10', r: '2026-09-01', last_review: '2026-09-01', stability: 40, difficulty: 5, elapsed_days: 0, scheduled_days: 40, learning_steps: 0, reps: 5, lapses: 0, state: 2 };
  const ex = L.gradeCard(rv, 'easy', '2026-10-10', '2026-10-20', nf), free = L.gradeCard(rv, 'easy', '2026-10-10', undefined, nf);
  ok(ex.due <= '2026-10-20' && free.due > '2026-10-20', 'clamped to exam date ' + ex.due + ' vs ' + free.due); ok(L.gradeCard(rv, 'easy', '2026-10-10', '2026-10-10', nf).due === free.due, 'exam today = no cap');
  ok(L.gradeCard(rv, 'easy', '2026-10-10', '2026-10-01', nf).due === free.due && L.gradeCard(rv, 'easy', '2026-10-10', '', nf).due === free.due, 'past or blank exam date = default maximum, not 1 day');
  ok(L.gradeCard(rv, 'easy', '2026-10-10', '2026-10-11', nf).due === '2026-10-11', 'exam tomorrow = 1 day');
  ok(L.gradeCard(c, 'good', '2026-10-01', null, nf).due > '2026-10-01', 'review dated before last_review does not throw');
  ok(L.gradeCard(undefined, 'easy', T, '2026-10-09', nf).due <= '2026-10-09', 'new card clamped'); 
  // migration: Leitner { box, due, r } -> FSRS Review card, same due
  for (const box of [1, 2, 3, 4, 5]) { const m = L.migrateCard({ box, due: '2026-11-03', r: '2026-10-30' }); ok(m.due === '2026-11-03' && m.r === '2026-10-30' && m.state === 2 && m.reps === box && m.difficulty === 5 && m.stability >= 1 && m.box === undefined, 'migrate box ' + box); }
  ok(L.migrateCard({ box: 3, due: '2026-11-03', r: '2026-10-30' }).stability === 3 && L.migrateCard({ box: 5, due: 'x' }).stability === 14, 'stability = box interval');
  const mg = L.gradeCard({ box: 3, due: '2026-10-06', r: '2026-10-03' }, 'good', '2026-10-06', null, nf); ok(mg.reps === 4 && mg.state === 2 && mg.due > '2026-10-06', 'legacy card is graded as FSRS');
  ok(L.migrateCard(c) === c && L.migrateCard(undefined) === undefined, 'FSRS cards are not migrated again');
}
// upgradeVisual: exposed; never throws; unknown markup comes back unchanged (structural checks on real visuals: tests/e2e/08-visuals.spec.mjs, they need a DOM)
ok(typeof L.upgradeVisual === 'function', 'upgradeVisual exposed');
for (const bad of ['', '<p>x</p>', '<img src=x onerror=alert(1)>', '<svg viewBox="0 0 10 10"><circle r="3"/></svg>', '<div style="color:red">other</div>', null]) ok(L.upgradeVisual(bad) === bad, 'upgradeVisual leaves unknown markup unchanged');

// confidence (Sure / Not sure), hypercorrection, calibration
{
  const cs = {}, qa = Q[10], qb = Q[11];
  L.recordInto(cs, qa, true, false, true); L.recordInto(cs, qa, false, false, true); L.recordInto(cs, qb, true, false, false); L.recordInto(cs, qb, false, false, false); L.recordInto(cs, Q[12], true);
  ok(cs[qa.id].sn === 2 && cs[qa.id].so === 1 && cs[qb.id].un === 2 && cs[qb.id].uo === 1 && cs[Q[12].id].sn === undefined, 'confidence counters per question; no confidence = nothing recorded');
  ok(cs[qa.id].hc === 1 && !cs[qb.id].hc, 'wrong while Sure sets the flag; wrong while Not sure does not');
  let cal = L.calibration(cs); ok(cal.sureN === 2 && cal.sureOk === 1 && cal.unsureN === 2 && cal.unsureOk === 1 && cal.n === 4 && cal.hc === 1, 'calibration aggregate');
  ok(L.hcList(cs).length === 1 && L.hcList(cs)[0].id === qa.id, 'flagged list');
  L.recordInto(cs, qa, true, false, false); ok(!cs[qa.id].hc && L.calibration(cs).hc === 0, 'answering it right clears the flag');
  ok(L.calibration({}).n === 0 && L.calibration({}).hc === 0, 'empty calibration');
  // flagged questions come first in the review queue (even if another mistake is older)
  const rs = {}, past = Date.now() - 86400000 * 2;
  Q.slice(20, 25).forEach((q) => { L.recordInto(rs, q, false, false, false); rs[q.id].nextAt = past; });
  L.recordInto(rs, Q[26], false, false, true); rs[Q[26].id].nextAt = past + 5000;
  ok(L.errorQueue(rs, false)[0].id === Q[26].id, 'flagged mistake first in errorQueue');
  ok(L.pickReview(rs, {}, '2026-10-06', null, [], 5)[0].id === Q[26].id, 'flagged mistake first in the review');
  // topic check questions: flagged ones are recorded under "<topic>#c<n>" and come back in the review; unflagged ones do not
  const ck = L.checkQ(t0, 0), cst = {}; L.recordInto(cst, ck, false, false, true); cst[ck.id].nextAt = past;
  ok(L.qById(ck.id).stem === ck.stem && L.qById(Q[0].id).id === Q[0].id && L.qById('zz#c9') === null, 'qById resolves bank and check questions');
  const crv = L.pickReview(cst, {}, '2026-10-06', null, [], 5);
  ok(crv[0].t === 'q' && crv[0].k === 'c' && crv[0].tid === t0.id && L.qOf(crv[0]).stem === ck.stem, 'flagged check question comes back as a review item');
  const ck2 = L.checkQ(t0, 1); L.recordInto(cst, ck2, false, false, false); cst[ck2.id].nextAt = past;
  ok(L.errorQueue(cst, true).length === 1, 'unflagged check mistakes are not queued');
  ok(L.calibration(cst).hc === 1, 'calibration counts flagged check questions');
}
// mixed practice clusters: only real skills, a question pool for each, pickMixed round-robins the cluster's skills
{
  const CL = L.clusters; ok(CL.length === 7 && new Set(CL.map(c => c.id)).size === 7 && CL.every(c => c.title && c.skills.length >= 5), 'clusters defined');
  CL.forEach(c => { ok(c.skills.every(s => sk.has(s)) && new Set(c.skills).size === c.skills.length, c.id + ': only real skills, no repeats'); ok(c.skills.every(s => Q.some(q => q.skill === s)), c.id + ': every skill has questions'); });
  CL.forEach(c => {
    const mx = L.pickMixed(c.skills, 10, {}); ok(mx.length === 10 && new Set(mx.map(q => q.id)).size === 10, c.id + ': 10 unique mixed questions');
    ok(mx.every(q => c.skills.includes(q.skill)) && new Set(mx.map(q => q.skill)).size >= Math.min(c.skills.length, 5), c.id + ': spread over the cluster skills');
  });
  // availability: >= 2 seen topics and >= 2 skills; otherwise it says what to watch
  const c0 = CL[0], inC = TS.filter(t => t.skills.some(s => c0.skills.includes(s)));
  let ci = L.clusterInfo(c0, {}); ok(!ci.ok && ci.topics.length === 0 && ci.watch.length === 2 && ci.watch.every(t => inC.includes(t)), 'nothing seen: closed, two topics to watch');
  ci = L.clusterInfo(c0, { [inC[0].id]: 1 }); ok(!ci.ok && ci.topics.length === 1 && ci.watch.length >= 1 && !ci.watch.includes(inC[0]), 'one topic seen: still closed');
  ci = L.clusterInfo(c0, L.studiedMap({ watched: { [inC[0].id]: 1 }, lessonsDone: { [inC[1].id]: { at: 1 } } })); ok(ci.ok && ci.topics.length === 2 && ci.skills.length >= 2 && ci.skills.every(s => c0.skills.includes(s)) && ci.watch.length === 0 && ci.n === 10, 'two topics studied (a finished lesson counts): open with the seen skills only');
  const cb = CL.find(c => c.id === 'building'), same = TS.filter(t => t.skills.length === 1 && t.skills[0] === '1.3c');
  if (cb && same.length >= 2) { ci = L.clusterInfo(cb, { [same[0].id]: 1, [same[1].id]: 1 }); ok(!ci.ok && ci.skills.length === 1 && ci.watch.length === 1, 'two topics with the same single skill do not make a mix yet'); }
}

// mastery: Passed -> (re-check at least 1 day later) -> Mastered
{
  const TODAY = '2026-10-07', pr = L.passRec(3, 3, TODAY);
  ok(L.isPassed(pr) && !L.isMastered(pr) && pr.due === '2026-10-08', 'passing the check gives Passed, re-check due the next day');
  ok(!L.recheckDue(pr, TODAY) && L.recheckDue(pr, '2026-10-08') && L.recheckDue(pr, '2026-10-20'), 're-check opens one day later and stays open');
  const f = L.applyRecheck(pr, false, '2026-10-08'); ok(L.isPassed(f) && !L.isMastered(f) && f.due === '2026-10-10' && !L.recheckDue(f, '2026-10-09') && L.recheckDue(f, '2026-10-10'), 'failed re-check: still Passed, another re-check in 2 days');
  const m = L.applyRecheck(f, true, '2026-10-10'); ok(L.isMastered(m) && m.due === undefined && !L.recheckDue(m, '2030-01-01'), 'passed re-check: Mastered');
  ok(L.isMastered(L.applyRecheck(m, false, '2026-10-11')), 'a Mastered topic is never demoted');
  const miss = L.passRec(2, 3, TODAY); ok(!L.isPassed(miss) && !L.isMastered(miss) && miss.due === undefined && !L.recheckDue(miss, '2027-01-01'), 'not passed: no re-check');
  const legacy = { ok: 3, n: 3, at: 1 }; ok(L.isMastered(legacy) && L.isPassed(legacy) && !L.recheckDue(legacy, '2027-01-01'), 'old saved data: already-passed topics stay Mastered');
  // due re-checks go into the review: oldest first, max 2 topics, 2 questions each (check + practice), before errors and cards
  const ck = {}; [TS[1], TS[2], TS[3]].forEach((t, i) => { ck[t.id] = { ok: 3, n: 3, at: 10 + i, due: ['2026-10-05', '2026-10-03', '2026-10-04'][i] }; });
  ck[TS[4].id] = L.passRec(3, 3, '2026-10-07');   // not due yet
  const pr2 = L.pickRechecks(ck, TODAY, {}, []); ok(pr2.length === 4 && pr2.every(r => r.t === 'q' && r.rc), 'max 2 topics x 2 questions');
  ok(pr2[0].rc === TS[2].id && pr2[2].rc === TS[3].id && pr2.slice(0, 2).every(r => r.rc === TS[2].id), 'oldest re-check first; a topic not due yet is left out');
  ok(L.qOf(pr2[0]).tid === TS[2].id, 'a re-check starts with one of the topic check questions');
  if (TS[2].skills.length) ok(!pr2[1].k && TS[2].skills.includes(L.qOf(pr2[1]).skill), 'second question is a practice question of the topic skills');
  const rvw = L.pickReview({}, {}, TODAY, null, [], 5, ck); ok(rvw.length === 7 && rvw.slice(0, 4).every(r => r.rc) && rvw.slice(4).every(r => !r.rc), 're-checks come first and do not take review places');
  ok(L.pickReview({}, {}, TODAY, null, [], 5, {}).length === 3 && L.pickReview({}, {}, TODAY, null, [], 5).length === 3, 'no re-checks due: review unchanged');
  const nsk = TS.find(t => !t.skills.length); if (nsk) { const it2 = L.recheckItems(nsk, {}, []); ok(it2.length === 2 && it2.every(r => r.k === 'c' && r.tid === nsk.id) && it2[0].ci !== it2[1].ci, 'topic without skills: two different check questions'); }
}

// review streak: consecutive days with the review done; every day counts the same; an open today does not break it either
{
  const rv = (...d) => Object.fromEntries(d.map(x => [x, 1]));
  ok(L.reviewStreak({}, '2026-10-07') === 0 && L.reviewStreak(null, '2026-10-07') === 0, 'no reviews: streak 0');
  ok(L.reviewStreak(rv('2026-10-07'), '2026-10-07') === 1, 'today counts');
  ok(L.reviewStreak(rv('2026-10-05', '2026-10-06'), '2026-10-07') === 2, 'today still open: the streak is kept');
  ok(L.reviewStreak(rv('2026-10-05', '2026-10-07'), '2026-10-07') === 1 && L.reviewStreak(rv('2026-10-05', '2026-10-07'), '2026-10-08') === 1, 'a missed weekday breaks it (Tue 6 missing)');
  ok(L.reviewStreak(rv('2026-10-09', '2026-10-10', '2026-10-12', '2026-10-13'), '2026-10-13') === 2, 'Fri, Sat, (Sun missed), Mon, Tue = 2: Sunday is a day like any other');
  ok(L.reviewStreak(rv('2026-10-09', '2026-10-10', '2026-10-11', '2026-10-12', '2026-10-13'), '2026-10-13') === 5, 'Fri to Tue, weekend included = 5');
  ok(L.reviewStreak(rv('2026-10-09', '2026-10-10', '2026-10-12'), '2026-10-11') === 2 && L.reviewStreak(rv('2026-10-09', '2026-10-10', '2026-10-12'), '2026-10-12') === 1, 'a skipped Sunday breaks it; an open today does not');
  ok(L.reviewStreak(rv('2026-10-01'), '2026-10-12') === 0, 'old streak is gone');
}
// question -> video chapter map (data/qmap.js, built by tools/qmap.mjs): covers >= 90% of the bank, every entry points at an existing topic and scene
{
  const QM = ctx.window.AB620_QMAP, V = ctx.window.AB620_VIDEO, byId = Object.fromEntries(TS.map(t => [t.id, t]));
  ok(QM && typeof QM === 'object', 'AB620_QMAP loaded');
  ok(Q.filter(q => QM[q.id]).length >= 0.9 * Q.length, 'qmap covers at least 90% of the questions');
  Object.entries(QM).forEach(([id, [tid, si]]) => {
    const t = byId[tid]; ok(t && Number.isInteger(si) && si >= 0 && si < t.scenes.length, 'qmap ' + id + ' -> existing topic/scene');
    const m = /^(.+)#c(\d+)$/.exec(id); if (m) ok(m[1] === tid && t.check[+m[2]], 'qmap ' + id + ' -> its own topic check question'); else ok(Q.some(q => q.id === id), 'qmap ' + id + ' is a bank question');
    if (V[tid]) ok(V[tid].scenes.length === t.scenes.length, 'video chapters match scenes for ' + tid);
  });
}
// no answer cues: the correct option must not tend to be the longest, and a topic's checks must not share one position
const longestShare = (items) => items.filter(({ o, a }) => { const L = o.map((x) => x.length), m = Math.max(...L); return L[a] === m && L.filter((x) => x === m).length === 1; }).length / items.length;
const bankLong = longestShare(Q.filter((q) => q.type === 'single').map((q) => ({ o: q.options, a: q.answer[0] })));
const checkLong = longestShare([].concat(...TS.map((t) => (t.check || []).map((c) => ({ o: c.options, a: c.answer })))));
ok(bankLong <= 0.3, 'bank: correct option is the longest in ' + Math.round(bankLong * 100) + '% (max 30%)');
ok(checkLong <= 0.32, 'checks: correct option is the longest in ' + Math.round(checkLong * 100) + '% (max 32%)');
TS.forEach((t) => { const a = (t.check || []).map((c) => c.answer); if (a.length > 1) ok(new Set(a).size > 1, t.id + ' check answers not all in the same position'); });

// ── F2: learning logic (audit 2026-10-09) ──
{
  const TODAY = '2026-10-07', cardsOf = (skills) => C.filter(c => skills.includes(c.skill));
  const six = TS.filter(t => t.skills.length).slice(0, 6), t1 = { id: six[0].id, skills: [...new Set(six.flatMap(t => t.skills))] }, t2 = TS.find(t => t.skills.length && !t.skills.some(s => t1.skills.includes(s)));
  const studied = L.studiedMap({ watched: Object.fromEntries(six.map(t => [t.id, 1])) });
  // A2 + B-02: only cards of studied topics (and today's class); new cards always get in; at most 8; oldest due first
  const rv0 = L.pickReview({}, {}, TODAY, null, [], 8, null, {});
  ok(rv0.length === 0, 'nothing studied: no cards in the review');
  const rvd1 = L.pickReview({}, {}, TODAY, six[0].skills, [], 8, null, {});
  ok(rvd1.length > 0 && rvd1.every(r => six[0].skills.includes(C.find(c => c.id === r.id).skill)), 'day 1: only cards of today\'s class skills');
  const cs = {}, pool1 = C.filter(c => t1.skills.includes(c.skill)), dueCards = pool1.slice(0, pool1.length - 5);
  dueCards.forEach((c, i) => { cs[c.id] = { due: '2026-10-0' + (1 + (i % 5)), stability: 3, difficulty: 5, state: 2, reps: 2, lapses: 0, scheduled_days: 3, last_review: '2026-09-28' }; });
  const fresh1 = cardsOf(t1.skills).filter(c => !cs[c.id]).length;
  const rv1 = L.pickReview({}, cs, TODAY, null, [], 8, null, studied);
  ok(rv1.length <= 8 && rv1.every(r => t1.skills.includes(C.find(c => c.id === r.id).skill)), 'review: at most 8, only studied skills');
  const newN = rv1.filter(r => !cs[r.id]).length;
  ok(newN === Math.min(3, fresh1), 'new cards are never starved by the due ones (' + newN + ')');
  const dueIds = rv1.filter(r => cs[r.id]).map(r => cs[r.id].due);
  ok(dueIds.length === rv1.length - newN && dueIds.every((d, i) => i === 0 || dueIds[i - 1] <= d) && dueIds[0] === '2026-10-01', 'due cards: the most overdue first');
  if (t2) ok(!rv1.some(r => t2.skills.includes(C.find(c => c.id === r.id).skill) && !t1.skills.includes(C.find(c => c.id === r.id).skill)), 'cards of an unstudied topic never appear');
  const errs = {}; Q.slice(0, 5).forEach(q => { L.recordInto(errs, q, false); errs[q.id].nextAt = 1; });
  const rv2 = L.pickReview(errs, cs, TODAY, null, [], 8, null, studied);
  ok(rv2.length <= 8 && rv2.filter(r => r.t === 'q').length === 3 && rv2.filter(r => r.t === 'c' && !cs[r.id]).length === 3, 'with 3 mistakes: still 3 new cards, total <= 8');

  // B-03: mixed review only from the skills of studied topics
  const sk1 = L.studiedSkills(studied), pool = Q.filter(q => sk1[q.skill]);
  const sat1 = L.pickSplit({ D1: 6, D2: 9, D3: 5 }, {}, sk1);
  ok(sat1.length === Math.min(20, pool.length) && sat1.every(q => sk1[q.skill]) && new Set(sat1.map(q => q.id)).size === sat1.length, 'Mixed review: only questions of studied skills (' + sat1.length + ')');
  ok(L.pickSplit({ D1: 6, D2: 9, D3: 5 }, {}, {}).length === 0, 'Mixed review with nothing studied: no questions');

  // A3: the next review is the next calendar day (local), not 24 h later
  const D = vm.runInContext('Date', ctx), realNow = D.now;
  try {
    const at = (y, m, d, h, mi) => new Date(y, m, d, h, mi).getTime();
    D.now = () => at(2026, 9, 8, 20, 0);   // Thursday evening
    const e = {}; L.recordInto(e, Q[3], false, false, true);
    ok(e[Q[3].id].nextAt === at(2026, 9, 9, 0, 0), 'a mistake made Thursday evening is due from Friday 00:00');
    D.now = () => at(2026, 9, 8, 23, 59); ok(L.errorQueue(e, false).length === 0, 'not due the same evening');
    D.now = () => at(2026, 9, 9, 9, 0); ok(L.errorQueue(e, false).length === 1, 'due on Friday morning');
    L.recordInto(e, Q[3], true, false, true); ok(e[Q[3].id].box === 2 && e[Q[3].id].nextAt === at(2026, 9, 12, 0, 0), 'next step: 3 calendar days later at 00:00');
  } finally { D.now = realNow; }

  // B-05 + A5: the pretest question is a bank question, never a check question, never in the re-check or the day practice
  TS.filter(t => t.skills.length).forEach(t => {
    const pq = L.pretestQ(t); if (!pq) return;
    ok(Q.includes(pq) && pq.id.indexOf('#c') < 0 && pq.type !== 'multi' && pq.answer.length === 1 && pq.difficulty <= 2 && t.skills.includes(pq.skill), t.id + ': pretest is a single-answer easy bank question of its skills');
    ok(L.pretestQ(t) === pq, t.id + ': pretest question is stable');
    ok(!(t.check || []).some(c => c.stem === pq.stem), t.id + ': pretest is not one of the check questions');
    for (let i = 0; i < 6; i++) { ok(!L.recheckItems(t, {}, []).some(r => r.id === pq.id), t.id + ': re-check never reuses the pretest question'); ok(!L.pickTopicPractice(t, 3, {}).some(q => q.id === pq.id), t.id + ': day practice never reuses it'); }
  });
  ok(TS.filter(t => t.skills.length).filter(t => L.pretestQ(t)).length >= TS.filter(t => t.skills.length).length * 0.8, 'most topics with skills have a pretest question');
  ok(TS.filter(t => !t.skills.length).every(t => L.pretestQ(t) === null), 'topics without skills: no pretest');

  // B-06: no estimate until >= 30 % of the skills have >= 3 answers; then weighted by coverage
  const est = (nSkills, right) => { const st = {}; M.skills.slice(0, nSkills).forEach(sk => { const q = Q.find(x => x.skill === sk.id); st[q.id] = { seen: 3, correct: right ? 3 : 0, h: right ? '111' : '000' }; }); return L.projectedFrom(st); };
  let p = est(5, true); ok(p && p.enough === false && p.score === null && p.covered === 5 && p.needSkills === 14, 'few skills: "not enough data", no score');
  p = est(13, true); ok(!p.enough, '13 of 44 skills: still not enough');
  p = est(14, true); ok(p.enough && p.score > 450 && p.score < 600, '30 % coverage with everything right: a modest score (' + p.score + ')');
  p = est(44, true); ok(p.enough && p.score === 1000, 'full coverage, all right: 1000'); p = est(44, false); ok(p.score === 0, 'full coverage, all wrong: 0');
  p = est(22, true); ok(p.score > est(14, true).score && p.score < 800, 'more coverage, higher score (' + p.score + ')');

  // A8 / B-15: only watched, a passed check or a completed lesson count as studied
  ok(Object.keys(L.studiedMap({ seen: { [TS[0].id]: 1 }, checks: { [TS[1].id]: L.passRec(2, 4, TODAY) } })).length === 0, 'opened or failed topics are not studied');
  ok(Object.keys(L.studiedMap({ checks: { [TS[1].id]: L.passRec(4, 4, TODAY) }, watched: { [TS[2].id]: 1 }, lessonsDone: { [TS[3].id]: { at: 1 } } })).length === 3, 'passed check, watched and completed lessons are studied');
}

// F3 / A7: mergeDoc keeps every doc in its default shape (null / wrong types / arrays never reach the screens)
{
  const bad = { quiz: { stats: null, attempts: 'nope', updatedAt: 'x' }, sessions: { lessonsDone: null, seen: [], checks: 5, rev: { a: 1 } }, settings: { examDate: null, theme: 7, voiceRate: 'fast' }, cards: [1, 2] };
  const q = L.mergeDoc('quiz', bad.quiz); ok(q.stats && typeof q.stats === 'object' && !Array.isArray(q.stats) && Array.isArray(q.attempts) && q.updatedAt === 0, 'A7: quiz doc with null stats / non-array attempts falls back to the defaults');
  const se = L.mergeDoc('sessions', bad.sessions); ok(['lessonsDone', 'seen', 'checks', 'days', 'watched', 'pos', 'pretest', 'rev'].every(k => se[k] && typeof se[k] === 'object' && !Array.isArray(se[k])) && se.rev.a === 1, 'A7: sessions doc: bad sub-objects replaced, good ones kept');
  const st = L.mergeDoc('settings', bad.settings); ok(typeof st.examDate === 'string' && st.theme === 'auto' && st.voiceRate === 1, 'A7: settings with wrong types fall back');
  ok(L.mergeDoc('settings', { examDate: '' }).examDate === '' && L.mergeDoc('settings', { cc: true }).cc === true, 'A7: a cleared exam date and unknown keys are kept');
  const cd = L.mergeDoc('cards', bad.cards); ok(cd && typeof cd === 'object' && !Array.isArray(cd) && Object.keys(cd).join() === 'updatedAt', 'A7: cards doc given as an array becomes an empty doc');
  const cd2 = L.mergeDoc('cards', { c1: { due: '2026-10-10' }, c2: null, c3: 'x' }); ok(cd2.c1 && !('c2' in cd2) && !('c3' in cd2), 'A7: card entries that are not objects are dropped');
  const q2 = L.mergeDoc('quiz', { stats: { a: { h: '1' }, b: null }, attempts: [null, { at: 1 }] }); ok(q2.stats.a && !('b' in q2.stats) && q2.attempts.length === 1, 'A7: null stats entries / attempts are dropped');
  ok(L.mergeDoc('quiz', null).attempts.length === 0 && L.mergeDoc('sessions', 'text').seen, 'A7: a doc that is not an object gives the defaults');
}
// F3 / A1: a saved flow whose items changed is repaired (position clamped, phase moved on, or dropped) so there is always a way out
{
  const mk = (kind, phase, i, qs, rv) => ({ kind, phase, i, qs: qs || [], rv: rv || [], ck: [] });
  const it = { id: 'x', sel: [] };
  let f = L.repairFlow(mk('day', 'review', 2, [it], [it])); ok(f && f.phase === 'review' && f.i === 0, 'A1: index past the end of the list goes back to 0');
  f = L.repairFlow(mk('day', 'practice', 1, [], [it])); ok(f && f.phase === 'review' && f.i === 0, 'A1: an empty phase moves on to the next one that has items');
  ok(L.repairFlow(mk('day', 'review', 1, [it], [])) === null, 'A1: nothing left in the last phase: no flow');
  ok(L.repairFlow(mk('day', 'practice', 0, [], [])) === null, 'A1: nothing left to do: no flow (Today shows its normal state)');
  ok(L.repairFlow(mk('sat', 'class', 0, [it], [])) === null, 'A1: a phase that does not belong to the flow kind: dropped');
  ok(L.repairFlow(mk('weird', 'practice', 0, [it], [])) === null && L.repairFlow(null) === null, 'A1: unknown kind / null: dropped');
  f = L.repairFlow(mk('day', 'class', 7, [], [])); ok(f && f.phase === 'class' && f.i === 0, 'A1: class phase keeps a valid position');
  f = L.repairFlow(mk('practice', 'practice', -3, [it, it], [])); ok(f && f.i === 0, 'A1: negative index');
  f = L.repairFlow(mk('practice', 'practice', 1, [it, it], [])); ok(f && f.i === 1, 'A1: a valid position is untouched');
}
console.log('Tests OK:', n, '· topics', TS.length, '(' + courseFiles.join(', ') + ') · questions', Q.length, '· cards', C.length);
