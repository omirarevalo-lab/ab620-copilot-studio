// B5: flashcards scheduled with FSRS (ts-fsrs): Again / Hard / Good / Easy, keys 1-4, next due date saved, exam-date clamp, Leitner migration.
import { test, expect, shot, openApp, seed, seedStudied, lsGet, expectNoOverflow, expectTapTargets } from './helpers.mjs';

const SUN = '2026-10-11';   // a Sunday: cards are available like on any day

test('b5-1 card rating: four buttons that do not wrap, keys 1-3 work, FSRS schedule saved', async ({ page }, ti) => {
  await openApp(page, SUN);
  await seedStudied(page);
  // the review is one due card (oldest first) + 3 new cards a day: 4 cards to rate
  const dueId = await page.evaluate(() => { const L = window.AB620_LOGIC, sk = L.studiedSkills(L.studiedMap(JSON.parse(localStorage.getItem('ab620.v1.sessions')))); return window.AB620_CARDS.find((c) => sk[c.skill]).id; });
  await seed(page, { cards: { [dueId]: { box: 2, due: '2026-10-10', r: '2026-10-07' } } });
  await page.getByRole('button', { name: /Review cards/ }).click(); await page.waitForSelector('.fcard');
  await page.getByRole('button', { name: /Show answer/ }).click(); await page.waitForSelector('.fgrade .g3');
  const btns = page.locator('.fgrade .btn');
  await expect(btns).toHaveCount(4);
  await expect(btns.locator('span')).toHaveText(['Again', 'Hard', 'Good', 'Easy']);
  await expect(page.locator('details.chelp')).toContainText('next review date');
  // no label wraps: every label is a single text line, and the row fits inside the viewport
  const wrap = await page.locator('.fgrade .btn span').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(), lh = parseFloat(getComputedStyle(e).lineHeight) || r.height; return { h: r.height, lh, sw: e.scrollWidth <= e.clientWidth + 1 }; }));
  wrap.forEach((w) => { expect(w.h).toBeLessThan(w.lh * 1.6); expect(w.sw).toBe(true); });
  const row = await page.locator('.fgrade').evaluate((e) => { const r = e.getBoundingClientRect(); return { r: r.right, l: r.left, vw: innerWidth, sw: e.scrollWidth, cw: e.clientWidth }; });
  expect(row.r).toBeLessThanOrEqual(row.vw); expect(row.sw).toBeLessThanOrEqual(row.cw + 1);
  await expectNoOverflow(page, 'card rating'); await expectTapTargets(page, ti, 'card rating'); await shot(page, ti, 'b5-card-rating');
  const id1 = await page.evaluate(() => window.AB620_LOGIC && JSON.parse(localStorage.getItem('ab620.v1.flow') || 'null').rv[0].id);

  // key 3 = Good
  await page.keyboard.press('3');
  await expect(page.locator('.flabel')).toHaveText(/Review 2 of/);
  const cards = (await lsGet(page, 'cards')) || {};
  const c1 = cards[id1];
  expect(c1.state).toBe(2); expect(c1.reps).toBeGreaterThanOrEqual(1); expect(c1.stability).toBeGreaterThan(0); expect(c1.difficulty).toBeGreaterThan(0);
  expect(c1.r).toBe(SUN); expect(c1.last_review).toBe(SUN); expect(c1.due).toMatch(/^\d{4}-\d{2}-\d{2}$/); expect(c1.due > SUN).toBe(true);
  expect(c1.box).toBeUndefined();
  // key 1 = Again: back tomorrow
  const id2 = await page.evaluate(() => JSON.parse(localStorage.getItem('ab620.v1.flow')).rv[1].id);
  await page.getByRole('button', { name: /Show answer/ }).click(); await page.waitForSelector('.fgrade .g3');
  await page.keyboard.press('1');
  const c2 = (await lsGet(page, 'cards'))[id2];
  expect(c2.due).toBe('2026-10-12'); expect(c2.lapses).toBe(0);
  // key 2 = Hard, key 4 = Easy (Easy waits longer than Good)
  const id3 = await page.evaluate(() => JSON.parse(localStorage.getItem('ab620.v1.flow')).rv[2].id);
  await page.getByRole('button', { name: /Show answer/ }).click(); await page.waitForSelector('.fgrade .g3');
  await page.keyboard.press('2');
  const id4 = await page.evaluate(() => JSON.parse(localStorage.getItem('ab620.v1.flow')).rv[3].id);
  await page.getByRole('button', { name: /Show answer/ }).click(); await page.waitForSelector('.fgrade .g3');
  await page.locator('.fgrade .g4').click();
  const all = await lsGet(page, 'cards');
  expect(all[id3].due > '2026-10-11').toBe(true); expect(all[id4].due > all[id3].due, 'Easy waits longer than Hard (both new cards)').toBe(true);
});

test('b5-2 the exam date caps the schedule; legacy Leitner cards keep their due date', async ({ page }) => {
  await openApp(page, SUN);
  await seed(page, { sessions: { lessonsDone: Object.fromEntries(['F01', 'F02', 'F03', 'F04', 'F05', 'F06'].map((i) => [i, { at: 1 }])) }, settings: { examDate: '2026-10-16' }, cards: { x1: { box: 3, due: '2026-10-09', r: '2026-10-06' } } });
  const mig = await page.evaluate(() => window.AB620_LOGIC.migrateCard({ box: 4, due: '2026-10-20', r: '2026-10-13' }));
  expect(mig.due).toBe('2026-10-20'); expect(mig.state).toBe(2); expect(mig.reps).toBe(4); expect(mig.difficulty).toBe(5); expect(mig.stability).toBe(7);
  await page.getByRole('button', { name: /Review cards/ }).click(); await page.waitForSelector('.fcard');
  for (let i = 0; i < 3; i++) { await page.getByRole('button', { name: /Show answer/ }).click(); await page.waitForSelector('.fgrade .g3'); await page.locator('.fgrade .g4').click(); }
  const cards = await lsGet(page, 'cards');
  const graded = Object.values(cards).filter((c) => c.last_review === SUN);
  expect(graded.length).toBe(3);
  graded.forEach((c) => expect(c.due <= '2026-10-16').toBe(true));   // Easy would be far later without the exam date
  // the untouched Leitner card was converted on load: FSRS Review card, same due date
  expect(cards.x1.due).toBe('2026-10-09'); expect(cards.x1.state).toBe(2); expect(cards.x1.reps).toBe(3); expect(cards.x1.box).toBeUndefined();
});
