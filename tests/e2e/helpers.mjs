// Shared fixtures and helpers for the AB-620 Workshop E2E suite.
import { test as base, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export { expect };
export const NOW = '2026-10-07';           // a Wednesday: today's class is the first topic
export const URL = '/?now=' + NOW;
const here = path.dirname(fileURLToPath(import.meta.url));
export const SHOTS = path.resolve(here, '..', 'shots', 'qa');

// Records every `new Audio()` so tests can read currentTime / playbackRate / paused (the app keeps the element out of the DOM).
// Lesson videos are created with document.createElement('video'); they are recorded too.
const AUDIO_SPY = `(() => { const A = window.Audio; window.__audios = []; function Spy(...a) { const x = new A(...a); window.__audios.push(x); return x; } Spy.prototype = A.prototype; window.Audio = Spy;
  const ce = Document.prototype.createElement; Document.prototype.createElement = function (tag, o) { const el = ce.call(this, tag, o); if (String(tag).toLowerCase() === 'video') window.__audios.push(el); return el; }; })();`;

// Without a stored choice the app opens the exam picker, so every test starts on AB-620 unless it sets `test.use({ presetCert: false })` (16-multicert).
const PRESET_CERT = `try { if (!localStorage.getItem('taller.cert')) localStorage.setItem('taller.cert', 'ab620'); } catch (e) { /* storage blocked */ }`;

export const test = base.extend({
  presetCert: [true, { option: true }],
  // Fails the test on any console error or uncaught page error. Tests that cause an expected network error call page.__allow(/regex/).
  page: async ({ page, presetCert }, use) => {
    const errors = [], allow = [];
    page.__allow = (re) => allow.push(re);
    page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    await page.addInitScript(AUDIO_SPY);
    if (presetCert) await page.addInitScript(PRESET_CERT);
    await use(page);
    const bad = errors.filter((e) => !allow.some((re) => re.test(e)));
    expect(bad, 'console / page errors').toEqual([]);
  },
});

export async function shot(page, testInfo, name, full) {
  const dir = path.join(SHOTS, testInfo.project.name);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, name + '.png'), fullPage: !!full });
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- navigation ---------------- */
export const tab = (page, name) => page.locator('#bar .bar-i, #tabs .nav-i').filter({ hasText: name }).locator('visible=true').first();
export async function openApp(page, qs) { await page.goto('/?now=' + (qs || NOW)); await page.waitForSelector('#view > *'); }
export async function openAll(page) { await page.evaluate(() => document.querySelectorAll('details.mod').forEach((d) => { d.open = true; })); }
export const topicInfo = (page, id) => page.evaluate((i) => { const t = window.AB620_COURSE.find((x) => x.id === i); return { id: t.id, title: t.title, scenes: t.scenes.map((s) => s.title), n: t.scenes.length, check: t.check.length, module: t.module }; }, id);
export async function openFromLearn(page, id) {
  await tab(page, 'Learn').click();
  await openAll(page);
  const { title } = await topicInfo(page, id);
  await page.locator('.trow').filter({ hasText: title }).first().click();
  await page.waitForSelector('.topic .pl');
}
export const audioIds = (page) => page.evaluate(() => Object.keys(window.AB620_AUDIO || {}));
export const firstTopicId = (page) => page.evaluate(() => window.AB620_LOGIC.topics()[0].id);

/* ---------------- storage ---------------- */
export const lsGet = (page, key) => page.evaluate((k) => JSON.parse(localStorage.getItem('ab620.v1.' + k) || 'null'), key);
export async function seed(page, docs) {   // docs: { sessions: {...partial}, quiz: {...}, cards: {...}, settings: {...} } written to localStorage, then reload
  await page.evaluate((d) => {
    Object.keys(d).forEach((n) => {
      const cur = JSON.parse(localStorage.getItem('ab620.v1.' + n) || 'null') || {};
      const v = Object.assign({}, cur, d[n]); v.updatedAt = Date.now() + 5;
      localStorage.setItem('ab620.v1.' + n, JSON.stringify(v));
    });
  }, docs);
  await page.reload(); await page.waitForSelector('#view > *');
}
// Marks the first n topics as completed lessons: their skills are "studied", so the review has cards and the Saturday review has questions.
export async function seedStudied(page, n) {
  const ids = await page.evaluate((k) => window.AB620_LOGIC.topics().slice(0, k || 6).map((t) => t.id), n);
  await seed(page, { sessions: { lessonsDone: Object.fromEntries(ids.map((i) => [i, { at: 1 }])) } });
}
export async function seedQuiz(page, n) {
  const stats = await page.evaluate((k) => Object.fromEntries(window.AB620_QUESTIONS.slice(0, k).map((q, i) => [q.id, { seen: 2, correct: i % 3 ? 1 : 0, h: i % 3 ? '11' : '00' }])), n || 30);
  await seed(page, { quiz: { attempts: [], stats } });
}

/* ---------------- layout checks ---------------- */
export function layoutProblems(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth, out = [];
    if (document.documentElement.scrollWidth > vw + 0.5) out.push('document scrollWidth ' + document.documentElement.scrollWidth + ' > ' + vw);
    const clippedByAncestor = (el) => {
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (/(hidden|auto|scroll|clip)/.test(cs.overflowX)) { const pr = p.getBoundingClientRect(); if (pr.right <= vw + 1 && pr.left >= -1) return true; }
      }
      return false;
    };
    document.querySelectorAll('body *').forEach((el) => {
      if (el.closest('[hidden], #toast, svg')) return;
      const r = el.getBoundingClientRect(); if (!r.width && !r.height) return;
      // text / content spilling out of its own box (visible overflow) -- e.g. an unbreakable word
      if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0 && getComputedStyle(el).overflowX === 'visible' && el.children.length === 0 && (el.textContent || '').trim()) out.push('text spills out of ' + el.tagName.toLowerCase() + '.' + (typeof el.className === 'string' ? el.className.trim().split(/\s+/).join('.') : '') + ' (' + el.scrollWidth + ' > ' + el.clientWidth + ') ' + (el.textContent || '').trim().slice(0, 30));
      if (getComputedStyle(el).position === 'fixed' && r.bottom < 0) return;
      if ((r.right > vw + 1 || r.left < -1) && !clippedByAncestor(el)) out.push((el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '')) + ' [' + Math.round(r.left) + ',' + Math.round(r.right) + '] ' + (el.textContent || '').trim().slice(0, 30));
    });
    return out.slice(0, 8);
  });
}
export async function expectNoOverflow(page, label) { expect(await layoutProblems(page), 'overflow at ' + (label || 'page')).toEqual([]); }
export async function expectTapTargets(page, testInfo, label) {
  if (testInfo.project.name.indexOf('phone') !== 0) return;
  const small = await page.evaluate(() => [...document.querySelectorAll('.btn.primary, .btn.big, .pl-play, .pl-skip, .pl-speed, .bar-i, .chrow, .opt')]
    .filter((b) => b.offsetParent !== null && !b.closest('[hidden]')).map((b) => ({ c: b.className, h: b.getBoundingClientRect().height })).filter((x) => x.h < 43.5).map((x) => x.c + ' ' + Math.round(x.h)));
  expect(small, 'tap targets < 44px at ' + (label || 'page')).toEqual([]);
}

// The pretest card only exists on topics with exam skills (not F01, F02, F08) and not on studied ones: skip it when it is there.
export async function skipPretest(page) { const b = page.locator('.pretest').getByRole('button', { name: 'Skip' }); if (await b.count()) await b.click(); }

/* ---------------- player ---------------- */
export const seekVal = async (page) => +(await page.locator('.pl-seek').getAttribute('aria-valuenow'));
export const seekMax = async (page) => +(await page.locator('.pl-seek').getAttribute('aria-valuemax'));
export const audioState = (page) => page.evaluate(() => {
  const a = window.__audios && window.__audios[window.__audios.length - 1];
  return a ? { t: a.currentTime, rate: a.playbackRate, paused: a.paused, ended: a.ended, src: a.currentSrc || a.getAttribute('src') || '', dur: a.duration, ready: a.readyState } : null;
});
export async function waitMeta(page) { await page.waitForFunction(() => { const a = window.__audios && window.__audios[window.__audios.length - 1]; return a && a.readyState >= 1 && a.duration > 1; }); }
export async function dragSeek(page, frac) {
  await page.locator('.pl-seek').scrollIntoViewIfNeeded();   // the pretest card can push the player below the fold
  const b = await page.locator('.pl-seek').boundingBox(), y = b.y + b.height / 2;
  await page.mouse.move(b.x + b.width * 0.2, y); await page.mouse.down();
  await page.mouse.move(b.x + b.width * ((0.2 + frac) / 2), y, { steps: 4 }); await page.mouse.move(b.x + b.width * frac, y, { steps: 4 });
  await page.mouse.up();
}
export async function playAndWait(page, secs) {
  await page.locator('.pl-play').click();
  const from = (await audioState(page)).t;
  await page.waitForFunction((f) => { const a = window.__audios[window.__audios.length - 1]; return !a.paused && a.currentTime >= f + 1; }, from + (secs || 0), { timeout: 15000 });
}
export const curChapterIndex = (page) => page.locator('.chrow').evaluateAll((rs) => rs.findIndex((r) => r.classList.contains('cur')));

/* ---------------- speech stub (deterministic device voice) ---------------- */
export function stubSpeech(page, sceneMs) {
  return page.addInitScript((ms) => {
    const voices = [{ name: 'Stub Natural', lang: 'en-US', voiceURI: 'stub-natural', default: true, localService: true }, { name: 'Stub Voice', lang: 'en-GB', voiceURI: 'stub-gb', default: false, localService: true }];
    const log = [], timers = [];
    window.__speech = log;
    const stub = {
      speaking: false, pending: false, paused: false,
      getVoices: () => voices,
      speak(u) { log.push({ text: u.text, rate: u.rate }); const id = setTimeout(() => { if (typeof u.onend === 'function') u.onend({}); }, ms || 1200); timers.push(id); },
      cancel() { timers.splice(0).forEach(clearTimeout); },
      resume() {}, pause() {}, addEventListener() {}, removeEventListener() {},
    };
    Object.defineProperty(window, 'speechSynthesis', { value: stub, configurable: true });
    window.SpeechSynthesisUtterance = function (t) { this.text = t; this.rate = 1; };
  }, sceneMs);
}

/* ---------------- day flow ---------------- */
export async function answerCheck(page, topicId) {   // all check questions right
  const answers = await page.evaluate((i) => window.AB620_COURSE.find((t) => t.id === i).check.map((c) => c.options[c.answer]), topicId);
  for (let i = 0; i < answers.length; i++) {
    await page.locator('.tcheck .opt .otx').getByText(answers[i], { exact: true }).first().click();
    await page.locator('.tcheck .conf .sure').click();   // answers carry a confidence: Sure / Not sure
    await page.locator('.tcheck .btn.primary').click();
  }
}
export async function answerCurrentQuestion(page, right, sure) {   // right === false: pick a wrong option; sure === false: press "Not sure" (default: Sure)
  const stem = (await page.locator('.qstem').first().innerText()).trim();
  const q = await page.evaluate((s) => { const x = window.AB620_QUESTIONS.find((y) => y.stem === s); return x ? { multi: x.type === 'multi', ans: x.answer.map((i) => x.options[i]), all: x.options } : null; }, stem);
  if (!q) { await page.locator('.opt').first().click(); await page.locator('.actions .conf .sure').click(); return false; }
  const wrong = q.all.find((o) => !q.ans.includes(o));
  const pickN = right === false ? [wrong] : q.multi ? q.ans : [q.ans[0]];
  for (const t of pickN) await page.locator('.opts .opt .otx').getByText(t, { exact: true }).first().click();
  await page.locator('.actions .conf ' + (sure === false ? '.unsure' : '.sure')).click();
  return true;
}
// From the open Topic screen in Today context: continue and finish practice + review. Returns counters.
export async function finishFlow(page, shots) {
  let guard = 0, cards = 0, qs = 0;
  while (guard++ < 60) {
    if (await page.locator('.done').count()) break;
    if (await page.locator('.fcard').count()) {
      if (shots && !cards) await shots('flashcard-front');
      await page.locator('.fgrade .btn.primary').click(); await page.waitForSelector('.fgrade .g3');
      if (shots && !cards) { await sleep(250); await shots('flashcard-back'); }
      cards++; await page.keyboard.press('3'); await sleep(200); continue;
    }
    if (await page.locator('.opt').count()) {
      if (shots && !qs) await shots('practice-question');
      qs++; await answerCurrentQuestion(page, true);
      await page.waitForSelector('.fb'); await page.locator('.actions .btn.primary').click(); await sleep(120); continue;
    }
    await sleep(120);
  }
  await page.waitForSelector('.done');
  return { cards, qs };
}
export async function completeDay(page, opts) {
  opts = opts || {};
  await page.locator('.hero .btn.primary').click(); await page.waitForSelector('.topic .pl');
  const id = await page.evaluate(() => { const t = window.AB620_LOGIC.topics(); return JSON.parse(localStorage.getItem('ab620.v1.flow')).topicId; });
  if (opts.shots) await opts.shots('topic');
  if (opts.check !== false) { await answerCheck(page, id); }
  await page.locator('.tp-body .actions .btn.primary').click(); await page.waitForSelector('.flow');
  const r = await finishFlow(page, opts.shots);
  if (opts.shots) await opts.shots('done-screen');
  await page.locator('.done ~ .actions .btn, .actions .btn.primary').first().click(); await page.waitForSelector('.hero');
  return { id, ...r };
}

/* ---------------- test-only HTML injection (break-ui, missing audio entry) ---------------- */
// Places `js` in its own <script> right before app.js runs. The app and data files are not modified.
export async function injectBeforeApp(page, js) {
  await page.route((u) => u.pathname === '/', async (route) => {
    const resp = await route.fetch();
    let body = await resp.text();
    const marker = '<script>\n/* AB-620 Workshop';
    if (body.indexOf(marker) < 0) throw new Error('app.js marker not found in dist');
    body = body.replace(marker, () => '<script>' + js + '</script>\n' + marker);
    const headers = { ...resp.headers() }; delete headers['content-length'];
    await route.fulfill({ status: resp.status(), headers, body });
  });
}
