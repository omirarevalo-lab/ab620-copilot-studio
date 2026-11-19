// B3: mixed practice, Passed -> Mastered after a delayed re-check, review streak, Today ring, mastery celebration.
import { test, expect, shot, openApp, openFromLearn, tab, seed, lsGet, answerCurrentQuestion, completeDay, answerCheck, expectNoOverflow, expectTapTargets, topicInfo, sleep } from './helpers.mjs';

const NEXT = '2026-10-08';   // the day after helpers.NOW (2026-10-07)

// Answer the question on screen (bank question or topic check question). wrong: pick a wrong option. Always "Sure".
async function answerAny(page, wrong) {
  const stem = (await page.locator('.qstem').first().innerText()).trim();
  const q = await page.evaluate((s) => {
    const x = window.AB620_QUESTIONS.find((y) => y.stem === s);
    if (x) return { ans: x.answer.map((i) => x.options[i]), all: x.options };
    for (const t of window.AB620_COURSE) for (const c of t.check) if (c.stem === s) return { ans: [c.options[c.answer]], all: c.options };
    return null;
  }, stem);
  expect(q, 'question found: ' + stem).toBeTruthy();
  const picks = wrong ? [q.all.find((o) => !q.ans.includes(o))] : q.ans;
  for (const t of picks) await page.locator('.opts .opt .otx').getByText(t, { exact: true }).first().click();
  await page.locator('.conf .sure').click();
}
const passedF01 = (due) => ({ sessions: { watched: { F01: 1 }, seen: { F01: 1 }, checks: { F01: { ok: 3, n: 3, at: 1, due } } } });

test('b3-1 Mixed practice: sets stay closed (one collapsed line) until 2 topics of the cluster are studied, then a 10-question mixed session with Sure / Not sure', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b3-' + n, f);
  await openApp(page);
  await tab(page, 'Exam').click();
  const mix = page.locator('#mixed');
  await expect(mix.locator('h2')).toHaveText('Mixed practice');
  await expect(mix).toContainText('Mixing similar topics trains you to tell them apart, which is what the exam asks.');
  await expect(mix.locator('.mixrow')).toHaveCount(0);   // locked sets collapse into one line instead of 7 disabled rows
  await expect(mix.locator('.mixlocked')).toContainText('7 sets unlock as you study: “');   // and it says what to study first
  // the block sits above "Practice by module"
  const order = await page.evaluate(() => [...document.querySelectorAll('.panel h2')].map((h) => h.textContent));
  expect(order.indexOf('Mixed practice')).toBeLessThan(order.indexOf('Practice by module'));
  await expectNoOverflow(page, 'Exam mixed (closed)'); await expectTapTargets(page, ti, 'Exam mixed (closed)'); await S('exam-mixed-closed', true);
  // opening topics is not studying them; one studied topic of the cluster is not enough
  await seed(page, { sessions: { seen: { L01: Date.now(), L14: Date.now() } } }); await tab(page, 'Exam').click();
  await expect(mix.locator('.mixrow')).toHaveCount(0);
  await seed(page, { sessions: { watched: { L01: Date.now() } } }); await tab(page, 'Exam').click();
  await expect(mix.locator('.mixrow')).toHaveCount(0);
  // two topics (L01 integration with enterprise systems, L14 Power Platform connectors): "Which integration?" opens
  await seed(page, { sessions: { watched: { L01: Date.now(), L14: Date.now() } } }); await tab(page, 'Exam').click();
  const row = mix.locator('.mixrow').filter({ hasText: 'Which integration?' });
  await expect(mix.locator('.mixrow .btn:enabled')).toHaveCount(1);
  await expect(row).toContainText('10 questions · mixed');
  await expectNoOverflow(page, 'Exam mixed (open)'); await S('exam-mixed-open', true);
  await row.getByRole('button', { name: 'Practice' }).click(); await page.waitForSelector('.flow .qstem');
  await expect(page.locator('.kicker')).toHaveText('Mixed · Which integration?'); await expect(page.locator('.flabel')).toHaveText('Question 1 of 10');
  const skills = await page.evaluate(() => window.AB620_LOGIC.clusters.find((c) => c.id === 'integration').skills);
  const stem = (await page.locator('.qstem').first().innerText()).trim();
  expect(await page.evaluate(([s, sk]) => sk.includes(window.AB620_QUESTIONS.find((q) => q.stem === s).skill), [stem, skills])).toBe(true);
  await page.locator('.opts .opt').first().click();
  await expect(page.locator('.actions .conf .sure')).toBeVisible(); await expect(page.locator('.actions .conf .unsure')).toBeVisible();
  await expectNoOverflow(page, 'mixed question'); await S('mixed-question');
  await page.locator('.actions .conf .unsure').click(); await expect(page.locator('.fb')).toBeVisible();
  await page.locator('.ftop .link').click(); await page.waitForSelector('.home'); await expect(page.locator('h1')).toHaveText('Exam');
});

test('b3-2 Check tab: Passed today, re-check due the next day, Mastered after it (with the celebration)', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b3-' + n, f);
  await openApp(page);
  await seed(page, { sessions: { watched: { F01: 1 }, seen: { F01: 1 } } });
  await openFromLearn(page, 'F01');
  await answerCheck(page, 'F01');
  await expect(page.locator('.tbadges .mpill')).toHaveText('Passed');
  let rec = (await lsGet(page, 'sessions')).checks.F01; expect(rec.due).toBe(NEXT); expect(rec.m).toBeUndefined();
  await expect(page.locator('#check .fb.ok')).toContainText('Come back tomorrow'); await S('check-passed');
  // same day: Passed, no re-check yet (the page shows when it opens)
  await page.locator('.backlink').click(); await openFromLearn(page, 'F01');
  await expect(page.locator('#check')).toContainText('Passed'); await expect(page.locator('#check')).not.toContainText('Re-check due'); await expect(page.locator('.tnav').getByRole('link', { name: /^Check/ })).toContainText('Passed');
  await expect(page.locator('#check').getByRole('button', { name: 'Start re-check' })).toHaveCount(0);
  // next day: re-check due
  await openApp(page, NEXT); await openFromLearn(page, 'F01');
  await expect(page.locator('.tnav').getByRole('link', { name: /^Check/ })).toContainText('Re-check');
  await expect(page.locator('#check')).toContainText('Re-check due'); await expect(page.locator('.tbadges .mpill')).toHaveText('Passed');
  await expectNoOverflow(page, 're-check due'); await expectTapTargets(page, ti, 're-check due'); await S('recheck-due');
  await page.locator('#check').getByRole('button', { name: 'Start re-check' }).click();
  await expect(page.locator('#check .hint').first()).toContainText('Re-check: question 1 of 2');
  await answerAny(page, false); await expect(page.locator('#check .fb.ok')).toBeVisible(); await page.locator('#check .btn.primary').click();
  await expect(page.locator('#check .hint').first()).toContainText('question 2 of 2');
  await answerAny(page, false); await expect(page.locator('#check .fb.ok')).toBeVisible(); await page.locator('#check .btn.primary').click();
  await expect(page.locator('#check .fb.ok')).toContainText('Topic mastered');
  const pill = page.locator('.tbadges .mpill'); await expect(pill).toHaveText('Mastered');
  await expect(page.locator('#toast')).toHaveText('Topic mastered'); await expect(page.locator('#toast')).toHaveClass(/show/);
  // celebration: short ease-out pop (scale from .95 + opacity), under 400 ms
  const anim = await pill.evaluate((el) => { const c = getComputedStyle(el); return { n: c.animationName, d: parseFloat(c.animationDuration) * 1000, f: c.animationTimingFunction }; });
  expect(anim.n).toBe('mpop'); expect(anim.d).toBeLessThanOrEqual(400); expect(anim.f).toContain('cubic-bezier(0.23, 1, 0.32, 1)');
  await S('mastered');
  rec = (await lsGet(page, 'sessions')).checks.F01; expect(rec.m).toBe(1); expect(rec.due).toBeUndefined();
  await expect(page.locator('.tnav').getByRole('link', { name: /^Check/ })).toContainText('Mastered');
  // Learn and Progress use the new meaning
  await page.locator('.backlink').click(); await page.waitForSelector('.learn');
  await expect(page.locator('.legend2')).toContainText('Check passed'); await expect(page.locator('.legend2')).toContainText('Passed again a day later');
  await tab(page, 'Progress').click(); await page.waitForSelector('.prog');
  await expect(page.locator('.pcount')).toContainText('Mastered 1/49'); await expect(page.locator('.pcount')).not.toContainText('Passed ');
  await expectNoOverflow(page, 'Progress mastered'); await S('progress-mastered', true);
});

test('b3-3 celebration respects reduced motion: opacity only', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openApp(page, NEXT);
  await seed(page, passedF01('2026-10-07'));
  await openFromLearn(page, 'F01');
  await page.locator('#check').getByRole('button', { name: 'Start re-check' }).click();
  for (let i = 0; i < 2; i++) { await answerAny(page, false); await page.locator('#check .btn.primary').click(); }
  const n = await page.locator('.tbadges .mpill').evaluate((el) => getComputedStyle(el).animationName);
  expect(n).toBe('mfade');
});

test('b3-4 Today review: the due re-check comes first; both right = Mastered, a miss keeps Passed and moves it 2 days', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b3-' + n, f);
  await openApp(page);
  // F01 passed yesterday and its lesson is done: Today teaches F02 and the Review step starts with F01's re-check
  await seed(page, { sessions: { watched: { F01: 1, F03: 1, F04: 1, F05: 1 }, seen: { F01: 1 }, lessonsDone: { F01: { at: 1 } }, checks: { F01: { ok: 3, n: 3, at: 1, due: '2026-10-06' } } } });   // F03..F05 watched: their cards enter the review
  const info = await topicInfo(page, 'F01');
  await page.locator('.srow').filter({ hasText: 'Review' }).locator('button').click(); await page.waitForSelector('.flow .qstem');
  await expect(page.locator('.kicker')).toHaveText('Re-check · ' + info.title);
  const total = +(/of (\d+)/.exec(await page.locator('.flabel').innerText())[1]); expect(total).toBeGreaterThanOrEqual(4);   // 2 re-check questions + the usual review
  await expectNoOverflow(page, 're-check in review'); await S('review-recheck');
  await answerAny(page, true);   // first one wrong
  await expect(page.locator('.fb.ko')).toBeVisible(); await expect(page.locator('.rcnote')).toHaveCount(0);   // verdict only after both
  await page.locator('.actions .btn.primary').click();
  await expect(page.locator('.kicker')).toHaveText('Re-check · ' + info.title);
  await answerAny(page, false);
  await expect(page.locator('.fb .rcnote')).toContainText('Not mastered yet'); await expect(page.locator('.fb .rcnote .mpill')).toHaveText('Passed'); await S('review-recheck-failed');
  let rec = (await lsGet(page, 'sessions')).checks.F01; expect(rec.m).toBeUndefined(); expect(rec.due).toBe('2026-10-09');
  // not due again today, but due in 2 days: a new Review on that day asks again, both right -> Mastered
  await page.reload(); await page.waitForSelector('.hero');
  await openApp(page, '2026-10-09');
  await page.locator('.srow').filter({ hasText: 'Review' }).locator('button').click(); await page.waitForSelector('.flow .qstem');
  await expect(page.locator('.kicker')).toHaveText('Re-check · ' + info.title);
  await answerAny(page, false); await page.locator('.actions .btn.primary').click();
  await answerAny(page, false);
  await expect(page.locator('.fb .rcnote')).toContainText('is mastered'); await expect(page.locator('.fb .rcnote .mpill')).toHaveText('Mastered');
  await expect(page.locator('#toast')).toHaveText('Topic mastered'); await S('review-mastered');
  rec = (await lsGet(page, 'sessions')).checks.F01; expect(rec.m).toBe(1); expect(rec.due).toBeUndefined();
  await page.locator('.ftop .link').click(); await page.waitForSelector('.hero');
  await tab(page, 'Learn').click(); await page.evaluate(() => document.querySelectorAll('details.mod').forEach((d) => { d.open = true; }));
  await expect(page.locator('.trow').filter({ hasText: info.title }).locator('.mpill')).toHaveText('Mastered');
});

test('b3-5 Old saved progress: topics already passed stay Mastered, nothing asks for a re-check', async ({ page }) => {
  await openApp(page);
  await seed(page, { sessions: { watched: { F01: 1 }, seen: { F01: 1 }, checks: { F01: { ok: 3, n: 3, at: 1 } } } });
  await openFromLearn(page, 'F01');
  await expect(page.locator('.tbadges .mpill')).toHaveText('Mastered'); await expect(page.locator('#check')).not.toContainText('Re-check due');
  await tab(page, 'Progress').click(); await expect(page.locator('.pcount')).toContainText('Mastered 1/49');
});

test('b3-6 Today: course line (exam days, lessons watched, one tick per lesson) opens Progress; the review streak lives in Progress only', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b3-' + n, f);
  await openApp(page);
  const hs = page.locator('.hstats');
  await expect(hs).toBeVisible(); await expect(hs).toContainText('Exam in'); await expect(hs).toContainText('0 of 49 watched');
  await expect(hs.locator('.tk')).toHaveCount(49); await expect(hs.locator('.tk.now')).toHaveCount(1);
  await expect(page.locator('.home')).not.toContainText('streak'); await expect(page.locator('.home .kicker')).toHaveCount(0);
  expect((await hs.boundingBox()).height).toBeGreaterThanOrEqual(44);
  await expectNoOverflow(page, 'Today course line (empty)'); await expectTapTargets(page, ti, 'Today course line (empty)'); await S('today-line-empty');
  // some progress: 12 watched, 3 passed; two review days (Mon, Tue) before today (Wed, still open): the streak is kept
  const ids = await page.evaluate(() => window.AB620_LOGIC.topics().slice(0, 12).map((t) => t.id));
  await seed(page, { sessions: { watched: Object.fromEntries(ids.map((i) => [i, 1])), checks: Object.fromEntries(ids.slice(0, 3).map((i) => [i, { ok: 3, n: 3, at: 1 }])), rev: { '2026-10-05': 1, '2026-10-06': 1 } } });
  await expect(hs).toContainText('12 of 49 watched'); await expect(hs.locator('.tk.ok')).toHaveCount(2);   // the third passed topic is today's lesson (no lesson completed yet): its tick is .now await expect(hs.locator('.tk.w')).toHaveCount(9);
  await expect(hs).toHaveAttribute('aria-label', /12 of 49 lessons watched, 3 checks passed/);
  await expectNoOverflow(page, 'Today course line'); await expectTapTargets(page, ti, 'Today course line'); await S('today-line');
  await hs.click(); await page.waitForSelector('.prog');
  const card = page.locator('.streak'); await expect(card.locator('h2')).toHaveText('Review streak'); await expect(card).toContainText('2-day review streak');
  await expect(card).not.toContainText('Sunday'); await expectNoOverflow(page, 'Progress streak'); await S('progress-streak', true);
  await card.getByRole('button', { name: 'Go to Today' }).click(); await page.waitForSelector('.hstats');
  // a Sunday is a day like any other: Fri + Sat, then Sunday morning (still open) keeps it; Monday morning with Sunday missed breaks it
  await openApp(page, '2026-10-11');
  await seed(page, { sessions: { rev: { '2026-10-09': 1, '2026-10-10': 1 } } });
  await tab(page, 'Progress').click(); await expect(page.locator('.streak')).toContainText('2-day review streak');
  await openApp(page, '2026-10-12'); await tab(page, 'Progress').click(); await expect(page.locator('.streak')).not.toContainText('review streak:');
  await expect(page.locator('.streak .streak-n')).toHaveCount(0);
  // a missed weekday breaks it
  await openApp(page, '2026-10-14'); await tab(page, 'Progress').click(); await expect(page.locator('.streak')).not.toContainText('2-day review streak');
});

test('b3-7 Finishing Today\'s review starts the streak', async ({ page }, ti) => {
  await openApp(page);
  await completeDay(page);
  expect((await lsGet(page, 'sessions')).rev['2026-10-07']).toBe(1);
  await expectNoOverflow(page, 'Today done'); await shot(page, ti, 'b3-today-done');
  await page.reload(); await page.waitForSelector('.hstats');
  await tab(page, 'Progress').click(); await expect(page.locator('.streak')).toContainText('1-day review streak');
});
