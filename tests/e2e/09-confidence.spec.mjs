// B2: confidence (Sure / Not sure) with hypercorrection, the calibration card in Progress, and the pretest before the first watch.
import { test, expect, shot, openApp, openFromLearn, tab, seed, lsGet, answerCurrentQuestion, audioIds, waitMeta, expectNoOverflow, expectTapTargets, firstTopicId, sleep } from './helpers.mjs';

const ck = (page, id, ci) => page.evaluate(([i, k]) => { const c = window.AB620_COURSE.find((t) => t.id === i).check[k]; return { stem: c.stem, right: c.options[c.answer], wrong: c.options.find((_, j) => j !== c.answer), n: c.options.length }; }, [id, ci]);
// The pretest guess of a topic is a bank question of its skills (not a check question): { stem, right, wrong, n }.
const pq = (page, id) => page.evaluate((i) => { const L = window.AB620_LOGIC, c = L.pretestQ(L.topics().find((t) => t.id === i)); return { stem: c.stem, right: c.options[c.answer[0]], wrong: c.options.find((_, j) => j !== c.answer[0]), n: c.options.length }; }, id);
const FB_HC = 'You were sure — this is a trap worth remembering. It comes back in tomorrow\'s review.';

test('b2-1 check questions: Sure/Not sure buttons, strong note on a confident mistake, calibration card and its Review', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b2-' + n, f);
  await openApp(page);
  const id = await firstTopicId(page);
  await openFromLearn(page, id);
  await expect(page.locator('.pretest'), 'F01 has no exam skills: no pretest').toHaveCount(0);
  const q0 = await ck(page, id, 0), q1 = await ck(page, id, 1);

  // an option alone does not submit: it reveals "Sure" / "Not sure"
  await expect(page.locator('#check .conf')).toHaveCount(0);
  await page.locator('#check .opt .otx').getByText(q0.wrong, { exact: true }).first().click();
  await expect(page.locator('#check .fb')).toHaveCount(0);
  await expect(page.locator('#check .conf .sure')).toHaveText('Sure'); await expect(page.locator('#check .conf .unsure')).toHaveText('Not sure');
  await expect(page.locator('#check .conf-why')).toHaveText('Saying how sure you are helps you spot the topics you only think you know.');
  await expectNoOverflow(page, 'check with confidence buttons'); await expectTapTargets(page, ti, 'check with confidence buttons'); await S('check-confidence');
  // the choice can still be changed before confirming
  await page.locator('#check .opt .otx').getByText(q0.right, { exact: true }).first().click();
  await page.locator('#check .opt .otx').getByText(q0.wrong, { exact: true }).first().click();
  await page.locator('#check .conf .sure').click();
  await expect(page.locator('#check .fb.ko .hcnote')).toHaveText(FB_HC); await S('check-hypercorrection');
  let st = (await lsGet(page, 'quiz')).stats[id + '#c0'];
  expect(st.sn).toBe(1); expect(st.so).toBeUndefined(); expect(st.hc).toBe(1);
  // Not sure + right: counted, no flag, no strong note, and the explanation about why we ask is gone
  await page.locator('#check .btn.primary').click();
  await page.locator('#check .opt .otx').getByText(q1.right, { exact: true }).first().click();
  await expect(page.locator('#check .conf-why')).toHaveCount(0);
  await page.locator('#check .conf .unsure').click();
  await expect(page.locator('#check .fb.ok')).toBeVisible(); await expect(page.locator('#check .hcnote')).toHaveCount(0);
  st = (await lsGet(page, 'quiz')).stats[id + '#c1']; expect(st.un).toBe(1); expect(st.uo).toBe(1); expect(st.hc).toBeUndefined();

  // Progress: fewer than 5 answers -> empty state that says what will appear and how to fill it
  await page.locator('.backlink').click(); await tab(page, 'Progress').click();
  const card = page.locator('.calib');
  await expect(card.locator('h2')).toHaveText('Do you know what you know?');
  await expect(card).toContainText('Once you have answered 5 this way'); await expect(card).toContainText('So far: 2 of 5');
  await card.getByRole('button', { name: 'Go to Today' }).click(); await page.waitForSelector('.hero');   // actionable
  await tab(page, 'Progress').click();
  // add more answers with confidence (bank questions) -> numbers appear
  const stats = (await lsGet(page, 'quiz')).stats;
  const qs = await page.evaluate(() => window.AB620_QUESTIONS.slice(0, 2).map((q) => q.id));
  stats[qs[0]] = { seen: 3, correct: 3, h: '111', sn: 3, so: 3 }; stats[qs[1]] = { seen: 2, correct: 1, h: '10', un: 2, uo: 1 };
  await seed(page, { quiz: { stats, attempts: [] } }); await tab(page, 'Progress').click();
  await expect(card).toContainText('When you said Sure'); await expect(card.locator('.drow').nth(0)).toContainText('75% correct'); await expect(card.locator('.drow').nth(0)).toContainText('3 of 4 answers');
  await expect(card.locator('.drow').nth(1)).toContainText('67% correct'); await expect(card.locator('.drow').nth(1)).toContainText('2 of 3 answers');
  await expect(card).toContainText('Confident mistakes: 1');
  await expectNoOverflow(page, 'calibration card'); await expectTapTargets(page, ti, 'calibration card'); await S('calibration-card', true);

  // Review: the flagged check question comes back; answering it right clears the flag
  await card.getByRole('button', { name: 'Review' }).click(); await page.waitForSelector('.flow .qstem');
  await expect(page.locator('.kicker')).toHaveText('Confident mistakes'); await expect(page.locator('.flabel')).toHaveText('Question 1 of 1');
  await expect(page.locator('.qstem')).toHaveText(q0.stem);
  await page.locator('.opts .opt .otx').getByText(q0.right, { exact: true }).first().click();
  await page.locator('.actions .conf .sure').click();
  await expect(page.locator('.fb.ok')).toBeVisible(); await S('hc-review-right');
  expect((await lsGet(page, 'quiz')).stats[id + '#c0'].hc).toBeUndefined();
  await page.locator('.actions .btn.primary').click(); await page.waitForSelector('.done');
  await page.getByRole('button', { name: 'Back to Progress' }).click(); await page.waitForSelector('.calib');
  await expect(page.locator('.calib')).toContainText('Confident mistakes: 0'); await expect(page.locator('.calib').getByRole('button', { name: 'Review' })).toHaveCount(0);
});

test('b2-2 practice and review: tap + confirm, S / N keys, confident mistake flagged and strong note; the diagnostic has no confidence', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b2-' + n, f);
  await openApp(page);
  const id = await page.evaluate(() => window.AB620_LOGIC.topics().find((t) => t.module === 1).id);
  await seed(page, { sessions: { watched: { [id]: Date.now() } } });
  await tab(page, 'Exam').click();
  await page.locator('.panel').filter({ hasText: 'Practice by module' }).locator('.weak li').first().getByRole('button', { name: 'Practice' }).click(); await page.waitForSelector('.flow .qstem');
  // Q1: select -> still no feedback; the buttons appear; key N answers "Not sure"
  await expect(page.locator('.flow .conf')).toHaveCount(0);
  await page.locator('.opts .opt').first().click();
  await expect(page.locator('.fb')).toHaveCount(0); await expect(page.locator('.flow .conf .sure')).toBeVisible();
  await expectNoOverflow(page, 'practice with confidence'); await expectTapTargets(page, ti, 'practice with confidence'); await S('practice-confidence');
  await page.keyboard.press('n');
  await expect(page.locator('.fb')).toBeVisible();
  const qid = async () => page.evaluate(() => { const s = document.querySelector('.qstem').textContent; return window.AB620_QUESTIONS.find((q) => q.stem === s).id; });
  let stats = (await lsGet(page, 'quiz')).stats; const first = Object.keys(stats)[0]; expect(stats[first].un).toBe(1); expect(stats[first].sn).toBeUndefined();
  await page.locator('.actions .btn.primary').click();
  // Q2: wrong on purpose + key S -> flagged, strong note, and it is first in the next review
  await page.waitForSelector('.flow .qstem');
  expect(await answerCurrentQuestion(page, false, true)).toBe(true);
  await expect(page.locator('.fb.ko .hcnote')).toHaveText(FB_HC); await S('practice-hypercorrection');
  stats = (await lsGet(page, 'quiz')).stats; const flagged = Object.keys(stats).filter((k) => stats[k].hc); expect(flagged.length).toBe(1);
  expect(stats[flagged[0]].sn).toBe(1);
  const top = await page.evaluate((s) => { const L = window.AB620_LOGIC; return L.pickReview(s, {}, '2026-10-07', null, [], 5)[0]; }, Object.fromEntries(Object.entries(stats).map(([k, v]) => [k, { ...v, nextAt: 1 }])));
  expect(top.id).toBe(flagged[0]);
  // the keyboard shortcut also works on a second pass with the other order of keys (S on an unselected question does nothing)
  await page.locator('.ftop .link').click(); await page.waitForSelector('.home');
  // The diagnostic imitates the exam: no confidence buttons
  await page.getByRole('button', { name: 'Start diagnostic' }).click(); await page.waitForSelector('.exam .opt');
  await page.locator('.exam .opt').first().click();
  await expect(page.locator('.exam .conf')).toHaveCount(0); await expect(page.locator('.exam')).not.toContainText('Not sure');
});

// Skipped in the public copy: needs local narration audio or local video timings, or is timing-sensitive.
test.skip('b2-3 pretest: guess before the first watch, stored, result once after the video, never again', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b2-' + n, f);
  const ID = 'F03';
  await openApp(page);
  expect(await audioIds(page)).toContain(ID);
  await openFromLearn(page, ID); await waitMeta(page);
  const q = await pq(page, ID);
  const pre = page.locator('.pretest');
  await expect(pre).toBeVisible(); await expect(pre).toContainText('Before you watch: take a guess'); await expect(pre.locator('.pre-stem')).toHaveText(q.stem);
  await expect(pre.locator('.opt')).toHaveCount(q.n);
  await expect(pre).toContainText('Guessing first makes the lesson stick better, even if you guess wrong.');
  // it sits above the player
  const yPre = (await pre.boundingBox()).y, yPl = (await page.locator('.topic .pl').boundingBox()).y; expect(yPre).toBeLessThan(yPl);
  await expectNoOverflow(page, 'pretest'); await expectTapTargets(page, ti, 'pretest'); await S('pretest-ask');
  // playing never waits for it
  await page.locator('.pl-play').click(); await expect.poll(async () => (await page.evaluate(() => window.__audios[window.__audios.length - 1].paused))).toBe(false);
  await page.locator('.pl-play').click();
  // pick a wrong option: stored, no verdict yet
  await pre.locator('.opt .otx').getByText(q.wrong, { exact: true }).click();
  await expect(pre).toContainText('Keep your guess in mind: the video answers it.'); await expect(pre).not.toContainText('not quite'); await expect(pre).not.toContainText('Answer:');
  const rec = (await lsGet(page, 'sessions')).pretest[ID]; expect(rec.qid).toBeTruthy(); expect(rec.pick).toBeGreaterThanOrEqual(0);
  await S('pretest-kept');
  // finishing the video shows the result once
  await page.locator('.pl-seek').focus(); await page.keyboard.press('End'); await page.locator('.pl-play').click();
  await expect(page.locator('.pl-play')).toContainText('Watch again', { timeout: 30000 });
  await expect(pre.locator('.pre-res')).toContainText('Your guess: ' + q.wrong + ' — not quite.'); await expect(pre.locator('.pre-res')).toContainText('Answer: ' + q.right + '.');
  await expectNoOverflow(page, 'pretest result'); await S('pretest-result');
  expect((await lsGet(page, 'sessions')).pretest[ID].shown).toBe(1);
  // next visit: gone for good
  await page.reload(); await page.waitForSelector('#view > *');
  await openFromLearn(page, ID);
  await expect(page.locator('.pretest')).toBeHidden();
});

test('b2-4 pretest: result also shows when opening Check; Skip hides it; never on a watched topic', async ({ page }, ti) => {
  await openApp(page);
  const T = await page.evaluate(() => window.AB620_LOGIC.topics().filter((t) => window.AB620_LOGIC.pretestQ(t)).slice(0, 3).map((t) => t.id));
  // pick -> open the Check tab -> result
  await openFromLearn(page, T[0]);
  const q = await pq(page, T[0]);
  await page.locator('.pretest .opt .otx').getByText(q.right, { exact: true }).click();
  await page.locator('.tnav-a', { hasText: 'Check' }).click();
  await expect(page.locator('.pretest .pre-res')).toContainText('Your guess: ' + q.right + ' — right.');
  await page.locator('.pretest').getByRole('button', { name: 'Got it' }).click(); await expect(page.locator('.pretest')).toBeHidden();
  // skip -> hidden now and on the next visit
  await page.locator('.backlink').click(); await openFromLearn(page, T[1]);
  await page.locator('.pretest').getByRole('button', { name: 'Skip' }).click(); await expect(page.locator('.pretest')).toBeHidden();
  expect((await lsGet(page, 'sessions')).pretest[T[1]].skip).toBe(1);
  await page.locator('.backlink').click(); await openFromLearn(page, T[1]); await expect(page.locator('.pretest')).toBeHidden();
  // a topic already watched never shows it
  await page.locator('.backlink').click();
  await seed(page, { sessions: { watched: { [T[2]]: Date.now() } } });
  await openFromLearn(page, T[2]); await expect(page.locator('.pretest')).toBeHidden();
});
