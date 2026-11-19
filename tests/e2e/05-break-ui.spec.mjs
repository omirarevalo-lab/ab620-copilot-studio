// break-ui pass: worst-case data injected by the TEST (see break-data.mjs). The app is not changed for users.
import { test, expect, shot, openApp, openAll, tab, seed, lsGet, topicInfo, stubSpeech, injectBeforeApp, answerCheck, finishFlow, expectNoOverflow, expectTapTargets, sleep } from './helpers.mjs';
import { BREAK_JS } from './break-data.mjs';

async function worst(page) { await stubSpeech(page, 500); await injectBeforeApp(page, BREAK_JS); }
async function makeWorstToday(page) {   // every real topic done -> today's class is the worst-case topic ZZ1
  await openApp(page);
  const done = await page.evaluate(() => Object.fromEntries(window.AB620_LOGIC.topics().filter((t) => t.id.indexOf('ZZ') !== 0).map((t) => [t.id, { at: 1 }])));
  await seed(page, { sessions: { lessonsDone: done } });
}

test('B1 worst-case class as today: long titles, unbreakable words, 12 scenes, wide SVG, long options; full day flow', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'B1-' + n, f);
  await worst(page); await makeWorstToday(page);
  await expect(page.locator('.hero h2')).toContainText('Supercalifragilistic');
  await expectNoOverflow(page, 'Today (worst)'); await expectTapTargets(page, ti, 'Today (worst)'); await S('today', true);
  await page.locator('.hero .btn.primary').click(); await page.waitForSelector('.topic .pl');
  await expectNoOverflow(page, 'Topic (worst)'); await expectTapTargets(page, ti, 'Topic (worst)'); await S('topic', true);
  const n = (await topicInfo(page, 'ZZ1')).n; expect(n).toBe(12);
  for (let i = 0; i < n; i += 1) {
    await page.locator('.chrow').nth(i).click(); await sleep(120);
    await expectNoOverflow(page, 'scene ' + (i + 1));
    if (i === 0 || i === 1 || i === 3) await S('scene-' + (i + 1));
  }
  await page.locator('.pl-play').click();
  await page.locator('.pl-speed').click(); await expectNoOverflow(page, 'speed menu'); await page.locator('.pl-mi', { hasText: '2' }).first().click();
  await answerCheck(page, 'ZZ1');
  await expectNoOverflow(page, 'after check'); await S('check-done', true);
  await page.locator('.tp-body .actions .btn.primary').click(); await page.waitForSelector('.flow');
  await expectNoOverflow(page, 'flow');
  const r = await finishFlow(page, async (nme) => { await expectNoOverflow(page, nme); await S(nme); });
  expect(r.cards, 'review cards (worst-case cards) were shown').toBeGreaterThan(0);
  await expectNoOverflow(page, 'done'); await page.locator('.actions .btn.primary').first().click(); await page.waitForSelector('.hero');
  await expectNoOverflow(page, 'Today after'); await S('today-after', true);
});

test('B2 Learn + glossary with long module title, long topic titles and a long unbreakable term', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'B2-' + n, f);
  await worst(page); await openApp(page);
  await tab(page, 'Learn').click(); await openAll(page);
  await expectNoOverflow(page, 'Learn (worst)'); await expectTapTargets(page, ti, 'Learn (worst)'); await S('learn', true);
  const mod = page.locator('details.mod').last(); await expect(mod.locator('.trow')).toHaveCount(3);
  await mod.locator('.trow').nth(1).click(); await page.waitForSelector('.topic');                // ZZ2: no audio entry? (has one? no) -> device voice, empty theory, no check
  await expectNoOverflow(page, 'ZZ2'); await S('zz2');
  await page.locator('.backlink').click(); await page.waitForSelector('.learn');
  await page.locator('.rowcard').click(); await page.waitForSelector('.gloss');
  await expectNoOverflow(page, 'Glossary (worst)'); await S('glossary', true);
  await page.locator('.gloss input.search').fill('Supercalifragilistic'); await expect(page.locator('.gl-list > li')).toHaveCount(1);
  await expectNoOverflow(page, 'Glossary search (worst)'); await S('glossary-search');
});

test('B3 Exam with worst-case questions: long stems/options, 8 options choose 5, 1-char stem, results with long text', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'B3-' + n, f);
  await worst(page); await openApp(page);
  await tab(page, 'Exam').click();
  await page.getByRole('button', { name: 'Start diagnostic' }).click(); await page.waitForSelector('.exam');
  const total = +((await page.locator('.flabel').innerText()).match(/of (\d+)/)[1]); expect(total).toBe(9);
  for (let i = 0; i < total; i++) {
    const multi = (await page.locator('.exam .opt[role=checkbox]').count()) > 0;
    await expectNoOverflow(page, 'question ' + (i + 1)); await expectTapTargets(page, ti, 'question ' + (i + 1));
    if (multi) await expect(page.locator('.exam .hint')).toHaveText(/^Choose \d+\.$/);
    await S('q' + (i + 1));
    await page.locator('.exam .opt').first().click();                                 // mostly wrong on purpose
    if (i < total - 1) await page.locator('.actions .btn.primary').click();
  }
  await page.locator('.actions .btn.primary').click(); await page.locator('#qnav .btn', { hasText: 'Yes, finish' }).click(); await page.waitForSelector('.result');
  await expectNoOverflow(page, 'results (worst)'); await S('results', true);
  await expect(page.locator('.result .dbars .drow')).toHaveCount(3);
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByRole('button', { name: 'Start mock exam' }).click(); await page.waitForSelector('.exam');
  const mt = +((await page.locator('.flabel').innerText()).match(/of (\d+)/)[1]); expect(mt).toBeGreaterThan(0);
  await expectNoOverflow(page, 'mock (worst)'); await S('mock');
});

test('B4 empty states: fresh progress, no weak topics, no practicable modules, 0 due cards -> helpful text, no crash', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'B4-' + n, f);
  await openApp(page);
  await expect(page.locator('.hero')).toBeVisible();
  await tab(page, 'Progress').click(); await page.waitForSelector('.prog');
  await expect(page.locator('.prog')).toContainText('Not enough data yet');
  await expect(page.locator('.prog')).toContainText('They will appear after you answer some questions');
  await expect(page.locator('.pcount')).toContainText('Watched 0/49');
  await expectNoOverflow(page, 'Progress (empty)'); await S('progress', true);
  await tab(page, 'Exam').click();
  await expect(page.locator('.home')).toContainText('Appears after you study your first module'); await S('exam');
  // finished lesson with no quiz data: no weak-topic action (nothing to practise yet), and no dead button
  await seed(page, { sessions: { days: { '2026-10-07': 'F01' }, lessonsDone: { F01: { at: 1 } } } });
  await expect(page.locator('.hero-done')).toContainText('Class complete');
  await expect(page.getByRole('button', { name: 'Practice weak topics' })).toHaveCount(0); await S('today-no-weak');
  // a Sunday with every card scheduled in the future: 0 due cards
  const cards = await page.evaluate(() => Object.fromEntries(window.AB620_CARDS.map((c) => [c.id, { box: 2, due: '2099-01-01', r: '2026-10-01' }])));
  await seed(page, { cards });
  await page.goto('/?now=2026-10-11'); await page.waitForSelector('.hero');
  await expect(page.locator('.hero')).not.toContainText(/Rest day/);
  await page.getByRole('button', { name: /Review cards/ }).click();
  await expect(page.locator('#toast')).toContainText('No cards to review'); await S('no-cards');
  await expectNoOverflow(page, 'Sunday');
});

test('B5 huge counts and broken saved data: still loads, every tab renders, no overflow', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'B5-' + n, f);
  await openApp(page);
  const attempts = []; for (let i = 0; i < 60; i++) attempts.push({ at: 1, mode: 'mock', n: 999999, correct: 999999, pct: 100, by: { D1: [999999, 999999], D2: [0, 0], D3: [1, 3] }, secs: 99999999 });
  const stats = await page.evaluate(() => Object.fromEntries(window.AB620_QUESTIONS.map((q) => [q.id, { seen: 1e9, correct: 1e9, h: '111', box: 3, nextAt: 9e15 }])));
  await seed(page, {
    settings: { examDate: '2099-12-31', voiceRate: 99, voiceURI: 'x'.repeat(500) },
    sessions: { pos: { F01: -5, F02: 1e12, F03: 'abc', NOPE: 4 }, watched: Object.fromEntries(Array.from({ length: 48 }, (_, i) => ['F0' + i, 1]).concat([['NOPE', 1]])), seen: { NOPE: 1 }, checks: { F01: { ok: 99999, n: 99999, at: 1 } }, days: { '2026-10-07': 'NOPE' } },
    quiz: { stats, attempts },
  });
  for (const t of ['Today', 'Learn', 'Exam', 'Progress']) {
    await tab(page, t).click(); if (t === 'Learn') await openAll(page);
    await expect(page.locator('.notice')).toHaveCount(0);
    await expectNoOverflow(page, t + ' (huge)'); await S(t.toLowerCase(), true);
  }
  await page.locator('#gear:visible, #tab-ajustes:visible').first().click(); await page.waitForSelector('.sett'); await expectNoOverflow(page, 'Settings (huge)');
  // the countdown to a far-away date
  await tab(page, 'Today').click(); await expect(page.locator('.hstats')).toContainText(/Exam in \d+ days/);
  // corrupt JSON in every key
  await page.evaluate(() => { ['settings', 'sessions', 'quiz', 'cards', 'flow', 'run', 'dirty'].forEach((k) => localStorage.setItem('ab620.v1.' + k, k === 'sessions' ? '{"lessonsDone":"x","watched":5,"pos":[1,2],"checks":null' : '{{not json')); });
  await page.reload(); await page.waitForSelector('#view > *');
  await expect(page.locator('.hero')).toBeVisible(); await expect(page.locator('.notice')).toHaveCount(0);
  await tab(page, 'Progress').click(); await expect(page.locator('.prog')).toBeVisible(); await expectNoOverflow(page, 'Progress (corrupt storage)');
});

test('B6 topic with no audio, no visuals and no theory / check: renders, plays with the device voice, finishes', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'B6-' + n, f);
  await worst(page); await openApp(page);
  await tab(page, 'Learn').click(); await openAll(page);
  await page.locator('details.mod').last().locator('.trow').nth(1).click(); await page.waitForSelector('.topic .pl');   // ZZ2
  await expect(page.locator('h1')).toHaveText('X');
  await expect(page.locator('.pl-badge')).toBeVisible(); await expect(page.locator('.tcheck')).toHaveCount(0);
  await expectNoOverflow(page, 'ZZ2'); await S('zz2', true);
  await page.locator('.pl-play').click(); await expect(page.locator('.pl-play')).toContainText('Watch again', { timeout: 20000 });
  await expect(page.locator('.chrow.watched')).toHaveCount(1);
  await expect(page.locator('.pl-next')).toBeHidden();                       // nothing to push: no check, not in a day flow
  await page.locator('.backlink').click(); await page.waitForSelector('.learn');
  await page.locator('details.mod').last().locator('.trow').nth(2).click(); await page.waitForSelector('.topic .pl');   // ZZ3
  await expectNoOverflow(page, 'ZZ3'); await S('zz3', true);
});
