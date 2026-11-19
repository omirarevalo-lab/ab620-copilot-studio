// Study whenever you want: no weekday rule. Every day is the same: Today is the next lesson, several lessons fit in one sitting,
// mixed review and cards are one tap away, and "Coming up" is an order, not a calendar. (Spec: specs/flexible-study-spec.md)
import { test, expect, shot, openApp, tab, seed, seedStudied, completeDay, expectNoOverflow, expectTapTargets, lsGet } from './helpers.mjs';

const SAT = '2026-10-10', SUN = '2026-10-11', WED = '2026-10-07';
const OLD_TEXT = /Rest day|Saturday|Done for today|See you tomorrow|Tomorrow|On Monday/;
const nextTitle = (page, n) => page.evaluate((k) => { const L = window.AB620_LOGIC, done = JSON.parse(localStorage.getItem('ab620.v1.sessions') || '{"lessonsDone":{}}').lessonsDone || {}, sim = { ...done }; let t = null; for (let i = 0; i <= k; i++) { t = L.nextTopic(sim); if (t) sim[t.id] = 1; } return t && t.title; }, n || 0);

for (const [name, day] of [['Saturday', SAT], ['Sunday', SUN]]) {
  test(`17-1 ${name}: Today offers a lesson to start; after one is done the next one is the primary action and a second fits the same day`, async ({ page }, ti) => {
    await openApp(page, day);
    await expect(page.locator('.hero h2')).toHaveText(await nextTitle(page, 0));
    await expect(page.locator('.hero .btn.primary')).toHaveText('Start');
    await expect(page.locator('.home')).not.toContainText(OLD_TEXT);
    await expectNoOverflow(page, name + ' today'); await expectTapTargets(page, ti, name + ' today'); await shot(page, ti, '17-' + name.toLowerCase() + '-start');
    // first lesson
    const first = await completeDay(page);
    await expect(page.locator('.hero-done')).toContainText('Class complete · ');
    await expect(page.locator('.hero h2')).toHaveText(await nextTitle(page, 0));
    await expect(page.locator('.hero .btn.primary')).toHaveText('Start next lesson');
    await expect(page.locator('.home')).not.toContainText(OLD_TEXT);
    await expectNoOverflow(page, name + ' after one'); await expectTapTargets(page, ti, name + ' after one'); await shot(page, ti, '17-' + name.toLowerCase() + '-after-one');
    // second lesson, same day
    const second = await completeDay(page);
    expect(second.id).not.toBe(first.id);
    const S = await lsGet(page, 'sessions');
    expect(Object.keys(S.lessonsDone)).toEqual(expect.arrayContaining([first.id, second.id]));
    expect(S.days[day]).toBe(second.id);
    await expect(page.locator('.hero-done')).toContainText('Class complete');
    await expect(page.locator('.hero .btn.primary')).toHaveText('Start next lesson');
    await expect(page.locator('.home')).not.toContainText(OLD_TEXT);
    await expectNoOverflow(page, name + ' after two');
  });
}

test('17-2 Mixed review is reachable on a weekday (and says what it is); it starts a review of what you studied', async ({ page }, ti) => {
  await openApp(page, WED);
  await expect(page.getByRole('button', { name: 'Mixed review' })).toBeDisabled();   // nothing studied yet
  await seedStudied(page, 5);
  await expect(page.locator('.hero')).toContainText('Mixed review: up to 20 questions on what you have studied.');
  await expectNoOverflow(page, 'weekday today'); await expectTapTargets(page, ti, 'weekday today');
  await page.getByRole('button', { name: 'Mixed review' }).click(); await page.waitForSelector('.flow .qstem');
  expect((await page.evaluate(() => JSON.parse(localStorage.getItem('ab620.v1.flow')))).kind).toBe('sat');
  await page.locator('.ftop .link').click(); await page.waitForSelector('.hero');
  await expect(page.locator('.hero .btn.primary')).toHaveText('Continue');   // the review in progress is resumed, not lost
});

test('17-3 Coming up lists the next three lessons in order, without dates', async ({ page }, ti) => {
  await openApp(page, SAT);
  const rows = page.locator('.upl .uprow');
  await expect(rows).toHaveCount(3);
  for (let i = 0; i < 3; i++) await expect(rows.nth(i).locator('.up-t')).toHaveText(await nextTitle(page, i + 1));
  const meta = await rows.locator('.up-d').allInnerTexts();
  expect(meta.every((m) => /^\d+ min$/.test(m)), JSON.stringify(meta)).toBe(true);
  await expect(page.locator('.upl')).not.toContainText(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/);
  await expectNoOverflow(page, 'coming up'); await expectTapTargets(page, ti, 'coming up');
});

test('17-4 Older saved days still work: a stored "review" or a topic id for today never blocks the next lesson', async ({ page }) => {
  await openApp(page, SUN);
  await seed(page, { sessions: { days: { [SUN]: 'review' } } });
  await expect(page.locator('.hero-done')).toHaveText('Review complete');
  await expect(page.locator('.hero .btn.primary')).toHaveText('Start next lesson');
  await seed(page, { sessions: { days: { [SUN]: 'not-a-topic' } } });
  await expect(page.locator('.hero .btn.primary')).toHaveText('Start');
  await expect(page.locator('.hero-done')).toHaveCount(0);
});

test('17-5 AB-400 Today also shows its next lesson on a Sunday', async ({ page }, ti) => {
  await page.addInitScript(() => { try { localStorage.setItem('taller.cert', 'ab400'); } catch (e) { /* storage blocked */ } });
  await openApp(page, SUN);
  const first = await page.evaluate(() => window.AB620_LOGIC.nextTopic({}).title);
  await expect(page.locator('.hero h2')).toHaveText(first);
  await expect(page.locator('.hero .btn.primary')).toHaveText('Start');
  await expect(page.locator('.home')).not.toContainText(OLD_TEXT);
  await expectNoOverflow(page, 'ab400 sunday'); await expectTapTargets(page, ti, 'ab400 sunday'); await shot(page, ti, '17-ab400-sunday');
  await tab(page, 'Learn').click(); await tab(page, 'Today').click();
  await expect(page.locator('.hero h2')).toHaveText(first);
});
