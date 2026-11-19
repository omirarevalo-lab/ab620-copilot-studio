// v6 UX fixes: clickable Today steps, sticky section nav on the Topic screen, flashcard typed answer.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect, openApp, seed, completeDay, lsGet, expectNoOverflow, expectTapTargets, sleep, seedStudied, openFromLearn } from './helpers.mjs';

const V6 = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'shots', 'v6');
async function shot(page, ti, name, full) {
  const dir = path.join(V6, ti.project.name); fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, name + '.png'), fullPage: !!full });
}
const rowBtn = (page, k) => page.locator('.srow').filter({ has: page.locator('.sk', { hasText: new RegExp('^' + k + '$') }) });

test('v6-1 Today steps: every row is a >=44px button (no chevrons, no "To do" text); each one does its job', async ({ page }, ti) => {
  await openApp(page);
  // module 0 topics have no exam practice: start with the first topic that has skills so all four steps exist
  const done = await page.evaluate(() => { const T = window.AB620_LOGIC.topics(), o = {}; for (let i = 0; i < T.length && !(T[i].skills || []).length; i++) o[T[i].id] = { at: 1 }; return o; });
  await seed(page, { sessions: { lessonsDone: done } });
  await expect(page.locator('.srow')).toHaveCount(4);
  const info = await page.locator('.srow').evaluateAll((rs) => rs.map((r) => { const b = r.querySelector('button.srow-b'); return { k: r.querySelector('.sk').textContent, btn: !!b, h: b ? b.getBoundingClientRect().height : 0, chev: !!r.querySelector('.chev svg') }; }));
  expect(info.map((x) => x.k)).toEqual(['Class', 'Check', 'Practice', 'Review']);
  for (const x of info) { expect(x.btn, x.k + ' is a button').toBe(true); expect(x.h, x.k + ' height').toBeGreaterThanOrEqual(44); expect(x.chev, x.k + ' chevron').toBe(false); }
  await shot(page, ti, 'today-steps');
  const id = await page.evaluate(() => window.AB620_LOGIC.nextTopic(JSON.parse(localStorage.getItem('ab620.v1.sessions')).lessonsDone).id);

  // Class -> Topic screen (player at the top)
  await rowBtn(page, 'Class').locator('button').click();
  await expect(page.locator('.topic .pl')).toBeVisible();
  await page.locator('.backlink').click(); await page.waitForSelector('.hero');

  // Check -> Topic screen, scrolled to the check section
  await rowBtn(page, 'Check').locator('button').click();
  await page.waitForSelector('.topic .tcheck'); await sleep(700);
  await expect(page.locator('#check')).toBeInViewport({ ratio: 0.2 });
  await page.locator('.backlink').click(); await page.waitForSelector('.hero');

  // Practice -> straight to the practice questions, and it is remembered
  await rowBtn(page, 'Practice').locator('button').click();
  await expect(page.locator('.flabel')).toHaveText(/Question 1 of/);
  expect((await lsGet(page, 'flow')).phase).toBe('practice');
  await page.locator('.ftop .link').click(); await page.waitForSelector('.hero');
  await expect(rowBtn(page, 'Practice').locator('.sv')).toHaveText('In progress');

  // Review -> straight to the review items
  await rowBtn(page, 'Review').locator('button').click();
  await expect(page.locator('.flabel')).toHaveText(/Review 1 of/);
  expect((await lsGet(page, 'flow')).phase).toBe('review');
  expect((await lsGet(page, 'flow')).topicId).toBe(id);
  await page.locator('.ftop .link').click(); await page.waitForSelector('.hero');
  await expect(rowBtn(page, 'Review').locator('.sv')).toHaveText('In progress');
  await expectNoOverflow(page, 'Today steps'); await expectTapTargets(page, ti, 'Today steps');
});

test('v6-1b Today steps after finishing: Class and Check still open, Practice / Review are plain rows', async ({ page }) => {
  await openApp(page);
  await completeDay(page);
  await expect(rowBtn(page, 'Class').locator('button')).toHaveCount(1);
  await expect(rowBtn(page, 'Check').locator('button')).toHaveCount(1);
  await expect(rowBtn(page, 'Review').locator('button')).toHaveCount(0);
  await rowBtn(page, 'Check').locator('button').click();
  await page.waitForSelector('.topic .tcheck'); await sleep(700);
  await expect(page.locator('#check')).toBeInViewport({ ratio: 0.2 });
});

test('v6-2 Topic nav: Video / Lesson / Check scroll to their sections, stays sticky, highlights the section in view', async ({ page }, ti) => {
  await openApp(page);
  await page.locator('.hero .btn.primary').click(); await page.waitForSelector('.topic .pl');
  const nav = page.locator('.tnav'), link = (n) => nav.getByRole('link', { name: new RegExp('^' + n) });
  await expect(nav).toBeVisible();
  await expect(nav.locator('a')).toHaveCount(3);
  await expect(link('Check')).toContainText('0/');
  await expect(link('Video')).toHaveAttribute('aria-current', 'true');
  expect(await page.locator('#player').count()).toBe(1); expect(await page.locator('#theory').count()).toBe(1);
  await expectNoOverflow(page, 'Topic nav'); await expectTapTargets(page, ti, 'Topic nav');
  const heights = await nav.locator('a').evaluateAll((as) => as.map((a) => a.getBoundingClientRect().height));
  for (const h of heights) expect(h).toBeGreaterThanOrEqual(44);
  await shot(page, ti, 'topic-top');

  // Lesson
  await link('Lesson').click();
  await expect.poll(async () => Math.round((await page.locator('#theory').boundingBox()).y), { timeout: 5000 }).toBeLessThan(140);
  await expect(link('Lesson')).toHaveAttribute('aria-current', 'true');
  // sticky: the nav is still pinned to the top of the viewport
  expect(Math.round((await nav.boundingBox()).y)).toBeLessThanOrEqual(1);
  await shot(page, ti, 'topic-lesson-sticky');
  await expectNoOverflow(page, 'Topic nav scrolled');

  // Check
  await link('Check').click();
  await expect.poll(async () => Math.round((await page.locator('#check').boundingBox()).y), { timeout: 5000 }).toBeLessThan(260);   // the check is at the end of the page, so it cannot always reach the very top
  await expect(page.locator('#check')).toBeInViewport({ ratio: 0.5 });
  await expect(link('Check')).toHaveAttribute('aria-current', 'true');
  await expect(page.locator('#check .opt').first()).toBeFocused();
  expect(Math.round((await nav.boundingBox()).y)).toBeLessThanOrEqual(1);
  await shot(page, ti, 'topic-check-sticky');

  // answering updates the nav counter
  await page.locator('#check .opt').first().click(); await page.locator('#check .conf .sure').click();
  await expect(link('Check')).toContainText('1/');

  // Video: back at the top; highlight follows the scroll position too (IntersectionObserver)
  await link('Video').click();
  await expect(link('Video')).toHaveAttribute('aria-current', 'true');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await sleep(150);
  await page.evaluate(() => { const t = document.getElementById('theory'); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY + t.offsetHeight * 0.5 - 300, behavior: 'instant' }); });
  await expect(link('Lesson')).toHaveAttribute('aria-current', 'true');
});

test('v6-2b Topic nav: a passed check shows "Passed" (Mastered needs the re-check)', async ({ page }) => {
  await openApp(page);
  const { id } = await completeDay(page);
  await openFromLearn(page, id);
  await expect(page.locator('.tnav').getByRole('link', { name: /^Check/ })).toContainText('Passed');
  expect(id).toBeTruthy();
});

test('v6-3 Flashcards: instruction, optional typed answer (no shortcuts while typing), shown next to the real answer', async ({ page }, ti) => {
  await openApp(page, '2026-10-11');   // Sunday: cards are one tap away like any day
  await seedStudied(page);
  await page.getByRole('button', { name: /Review cards/ }).click(); await page.waitForSelector('.fcard');
  await expect(page.locator('.chint')).toHaveText('Answer it in your head (or type it below), then reveal the answer and rate yourself.');
  await expect(page.getByText('Your answer (optional)')).toBeVisible();
  const ta = page.locator('textarea.ctext');
  await expect(ta).toBeVisible();
  expect(await ta.getAttribute('rows')).toBe('2');
  const help = page.locator('details.chelp');
  await expect(help).toBeVisible(); await expect(help.locator('summary')).toHaveText('How cards work');
  await expectNoOverflow(page, 'card front'); await expectTapTargets(page, ti, 'card front');
  await shot(page, ti, 'card-front');

  // typing: Space / Enter / 1 / 2 / 3 must not reveal or grade the card
  await ta.click();
  await page.keyboard.type('the 1st idea 2 and 3');
  await page.keyboard.press('Enter'); await page.keyboard.type('second line');
  await page.keyboard.press('1'); await page.keyboard.press('2'); await page.keyboard.press('3'); await page.keyboard.press('Space');
  await expect(page.locator('.cback')).toHaveCount(0);
  await expect(page.locator('.fgrade .g3')).toHaveCount(0);
  await expect(ta).toHaveValue(/the 1st idea 2 and 3\nsecond line123 /);
  await expect(page.locator('.flabel')).toHaveText(/Review 1 of/);
  expect((await lsGet(page, 'flow')).rv[0].typed).toContain('second line');
  // clicking inside the textarea does not flip the card either
  await ta.click(); await expect(page.locator('.cback')).toHaveCount(0);
  await shot(page, ti, 'card-front-typed');

  // Ctrl+Enter reveals; the typed answer is shown above the correct one
  await page.keyboard.press('Control+Enter');
  await expect(page.locator('.cback')).toBeVisible();
  await expect(page.locator('.cmine')).toContainText('Your answer');
  await expect(page.locator('.cmine')).toContainText('the 1st idea 2 and 3');
  await expect(page.locator('.cmine')).toContainText('second line');
  const order = await page.locator('.fcard').evaluate((c) => [...c.children].map((e) => e.className.split(' ')[0]));
  expect(order.indexOf('cmine')).toBeGreaterThan(order.indexOf('cfront')); expect(order.indexOf('cmine')).toBeLessThan(order.indexOf('cback'));
  await expect(page.locator('.fhint')).toContainText('Hard, Good and Easy');
  await expect(page.locator('.fhint')).toContainText('next review');
  await expect(page.locator('.fgrade .btn')).toHaveCount(4);
  await expectNoOverflow(page, 'card back'); await expectTapTargets(page, ti, 'card back');
  await shot(page, ti, 'card-back-typed');

  // grade with the keyboard; the next card has no "How cards work" and no leftover typed text
  await page.keyboard.press('3');
  await expect(page.locator('.flabel')).toHaveText(/Review 2 of/);
  await expect(page.locator('details.chelp')).toHaveCount(0);
  await expect(page.locator('textarea.ctext')).toHaveValue('');
  // a card revealed without typing shows no "Your answer" box
  await page.getByRole('button', { name: /Show answer/ }).click();
  await expect(page.locator('.cback')).toBeVisible(); await expect(page.locator('.cmine')).toHaveCount(0);
  await shot(page, ti, 'card-back');
});

test('v6-3b Flashcards: typed text survives a reload; Space/Enter/1/2/3 still work when not typing', async ({ page }) => {
  await openApp(page, '2026-10-11');
  await seedStudied(page);
  await page.getByRole('button', { name: /Review cards/ }).click(); await page.waitForSelector('.fcard');
  await page.locator('textarea.ctext').fill('half-remembered');
  await page.reload(); await page.waitForSelector('.hero');
  await page.getByRole('button', { name: /Continue/ }).click(); await page.waitForSelector('.fcard');
  await expect(page.locator('textarea.ctext')).toHaveValue('half-remembered');
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await page.keyboard.press('Space');
  await expect(page.locator('.cmine')).toContainText('half-remembered');
  await page.keyboard.press('2');
  await expect(page.locator('.flabel')).toHaveText(/Review 2 of/);
});
