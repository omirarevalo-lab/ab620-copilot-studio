// Cases 1 and 6: complete day, state persistence, and Today after finishing.
import { test, expect, shot, openApp, seed, completeDay, finishFlow, answerCheck, lsGet, seedQuiz, expectNoOverflow, expectTapTargets, firstTopicId, topicInfo, sleep } from './helpers.mjs';

test('01 complete day: Today -> class -> chapters -> theory -> check -> practice -> review -> done; persists after reload', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, '01-' + n, f);
  await openApp(page);
  // F01..F03 are done, so today's class (F04) has exam practice and a review with cards of what was studied (day 1, F01, has neither: no skills)
  await seed(page, { sessions: { lessonsDone: { F01: { at: 1 }, F02: { at: 1 }, F03: { at: 1 } } } });
  await expect(page.locator('.hero')).toBeVisible();
  await expectNoOverflow(page, 'Today'); await expectTapTargets(page, ti, 'Today'); await S('today-before');
  const id = 'F04', info = await topicInfo(page, id);
  await expect(page.locator('.hero h2')).toHaveText(info.title);
  await page.locator('.hero .btn.primary').click();
  await expect(page.locator('.topic .pl')).toBeVisible();
  await expect(page.locator('.pl-play')).toBeVisible();
  await expect(page.locator('.chrow')).toHaveCount(info.n);
  await expect(page.locator('.theory')).toBeVisible();
  await expect(page.locator('.tcheck')).toBeVisible();
  await expectNoOverflow(page, 'Topic'); await expectTapTargets(page, ti, 'Topic'); await S('topic');
  // check questions: all correct -> mastered
  const answers = await page.evaluate((i) => window.AB620_COURSE.find((t) => t.id === i).check.map((c) => c.options[c.answer]), id);
  for (let k = 0; k < answers.length; k++) {
    await page.locator('.tcheck .opt .otx').getByText(answers[k], { exact: true }).first().click();
    await page.locator('.tcheck .conf .sure').click();
    await expect(page.locator('.tcheck .fb.ok')).toBeVisible();
    if (k === 0) await S('check-feedback');
    await page.locator('.tcheck .btn.primary').click();
  }
  await expect(page.locator('.tbadges .mpill')).toHaveText('Passed'); await S('check-passed');   // Mastered needs the re-check a day later (10-mastery)
  expect((await lsGet(page, 'sessions')).checks[id].ok).toBe(answers.length);
  await page.locator('.tp-body .actions .btn.primary').click(); await page.waitForSelector('.flow');
  // practice + review
  const r = await finishFlow(page, (n) => S(n));
  expect(r.cards + r.qs, 'something to practise or review').toBeGreaterThan(0);
  await expectNoOverflow(page, 'Done screen'); await S('done-screen');
  await page.locator('.actions .btn.primary').first().click(); await page.waitForSelector('.hero');
  expect(Object.keys((await lsGet(page, 'sessions')).lessonsDone)).toContain(id);
  await expect(page.locator('.hero-done')).toContainText('Class complete'); await S('today-after');
  // reload: persisted
  await page.reload(); await page.waitForSelector('.hero');
  await expect(page.locator('.hero-done')).toContainText('Class complete');
  expect(Object.keys((await lsGet(page, 'sessions')).lessonsDone)).toContain(id);
  expect((await lsGet(page, 'sessions')).checks[id].ok).toBe(answers.length);
});

test('06 Today after finishing: summary line, the next lesson as the primary action, secondary actions; steps are the next lesson\'s (R3)', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, '06-' + n, f);
  await openApp(page);
  const { id } = await completeDay(page);
  const title = (await topicInfo(page, id)).title;
  await expect(page.locator('.hero-done')).toContainText('Class complete · ' + title);
  const next = await page.evaluate(() => window.AB620_LOGIC.nextTopic(JSON.parse(localStorage.getItem('ab620.v1.sessions')).lessonsDone).title);
  await expect(page.locator('.hero h2')).toHaveText(next);
  const labels = await page.locator('.hero-acts .btn').allInnerTexts();
  expect(labels[0]).toMatch(/Start next lesson/); expect(labels).toContain('Mixed review'); expect(labels).toContain('Review cards');
  await expect(page.locator('.hero-acts .btn').first()).toHaveClass(/primary/);
  await expect(page.locator('.hero')).not.toContainText(/Done for today|Tomorrow|See you tomorrow|Rest day/);
  await expectNoOverflow(page, 'Today after'); await expectTapTargets(page, ti, 'Today after');
  // R3: the steps belong to the lesson in the hero and have not started
  const rows = await page.locator('.srow').evaluateAll((rs) => rs.map((r) => ({ k: r.querySelector('.sk').textContent, st: r.className.replace('srow ', '') })));
  expect(rows.map((r) => r.k)).toEqual(expect.arrayContaining(['Class', 'Check', 'Review']));
  expect(rows.every((r) => !/done/.test(r.st)), JSON.stringify(rows)).toBe(true);
  await expect(page.locator('.upl .uprow').first()).toBeVisible(); await S('today-after');
  // weak topics appear only once there is quiz data
  await expect(page.getByRole('button', { name: 'Practice weak topics' })).toHaveCount(0);
  await seedQuiz(page, 30); await expect(page.getByRole('button', { name: 'Practice weak topics' })).toBeEnabled();
  // weak practice
  await page.getByRole('button', { name: 'Practice weak topics' }).click(); await page.waitForSelector('.flow .qstem'); await S('weak-practice');
  await page.locator('.ftop .link').click(); await page.waitForSelector('.hero-acts');
  // start next lesson
  await page.locator('.hero-acts .btn.primary').click(); await page.waitForSelector('.topic .pl');
  await expect(page.locator('h1')).toHaveText(next); await S('next-class');
  await page.locator('.backlink').click(); await page.waitForSelector('.hero');
  await expect(page.locator('.hero .btn.primary')).toHaveText('Continue');
  await expect(page.locator('.hero h2')).toHaveText(next);
});

test('06b R3: continuing without the check shows "Skipped"; the whole Check row opens the check section', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, '06b-' + n, f);
  await openApp(page);
  const { id } = await completeDay(page, { check: false });
  await expect(page.locator('.hero-done')).toContainText('Class complete'); await S('today-skipped');
  const steps = await page.locator('.srow .sk').allInnerTexts();
  expect(steps).toEqual(['Class', 'Check', ...(steps.includes('Practice') ? ['Practice'] : []), 'Review']);   // the next lesson's steps
  await page.locator('.hero-done').getByRole('button', { name: 'Do the check' }).click();   // the skipped check of the lesson just finished
  await page.waitForSelector('.topic .tcheck');
  await sleep(600);
  await expect(page.locator('#check')).toBeInViewport({ ratio: 0.2 });
  await S('do-it-check');
  await expect(page.locator('#check .opt').first()).toBeFocused();
  // answer it -> Today shows it as done
  await answerCheck(page, id);
  await page.locator('.tp-body .actions .btn').first().click();   // "Back to Today"
  await page.waitForSelector('.hero');
  await expect(page.locator('.hero-done')).toContainText('check'); await expect(page.locator('.hero-done').getByRole('button')).toHaveCount(0);   // passed: no link any more
});
