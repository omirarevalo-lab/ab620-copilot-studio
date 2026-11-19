// B4: "Watch the explanation" (question -> video chapter) and self-explanation after a mistake.
import { test, expect, shot, sleep, openApp, openFromLearn, tab, seed, answerCurrentQuestion, audioState, waitMeta, expectNoOverflow, expectTapTargets, firstTopicId, skipPretest } from './helpers.mjs';

// Where the app should send a wrong answer: the topic, chapter index and start time from data/qmap.js + data/video-index.js.
const spot = (page, stem) => page.evaluate((s) => {
  const q = window.AB620_QUESTIONS.find((x) => x.stem === s), m = window.AB620_QMAP[q.id], v = window.AB620_VIDEO[m[0]];
  const t = window.AB620_COURSE.find((x) => x.id === m[0]), sec = Math.floor(v.scenes[m[1]].start);
  return { id: m[0], scene: m[1], start: v.scenes[m[1]].start, title: t.title, label: 'Watch the explanation · ' + m[0] + ' ' + Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0') };
}, stem);

async function startPractice(page) {
  await openApp(page);
  const id = await page.evaluate(() => window.AB620_LOGIC.topics().find((t) => t.module === 1).id);
  await seed(page, { sessions: { watched: { [id]: Date.now() } } });
  await tab(page, 'Exam').click();
  await page.locator('.panel').filter({ hasText: 'Practice by module' }).locator('.weak li').first().getByRole('button', { name: 'Practice' }).click();
  await page.waitForSelector('.flow .qstem');
}

test('b4-1 practice: a wrong answer offers the video chapter; the topic opens at that time and Back returns to the question', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b4-' + n, f);
  await startPractice(page);
  const stem = (await page.locator('.qstem').first().innerText()).trim();
  const sp = await spot(page, stem);
  // right answer: no button and no self-explanation box
  await answerCurrentQuestion(page, true);
  await expect(page.locator('.fb.ok')).toBeVisible(); await expect(page.locator('.fb .watch')).toHaveCount(0); await expect(page.locator('.selfx')).toHaveCount(0);
  await page.locator('.actions .btn.primary').click(); await page.waitForSelector('.flow .qstem');
  const stem2 = (await page.locator('.qstem').first().innerText()).trim(), sp2 = await spot(page, stem2);
  expect(await answerCurrentQuestion(page, false)).toBe(true);
  await expect(page.locator('.fb.ko')).toBeVisible();
  const watch = page.locator('.fb .watch');
  await expect(watch).toHaveText(sp2.label);
  await expectNoOverflow(page, 'wrong answer with the watch button'); await expectTapTargets(page, ti, 'wrong answer with the watch button'); await sleep(500); await page.locator('.fb .selfx').scrollIntoViewIfNeeded(); await sleep(300); await S('practice-wrong');
  await watch.click(); await page.waitForSelector('.topic .pl'); await waitMeta(page);
  await expect(page.locator('.topic h1')).toHaveText(sp2.title);
  await expect(page.locator('.backlink')).toHaveText('‹ Question');
  await expect(page.locator('.chrow').nth(sp2.scene)).toHaveClass(/cur/);
  const st = await audioState(page); expect(st.t).toBeGreaterThanOrEqual(sp2.start - 0.5); expect(st.t).toBeLessThan(sp2.start + 8);
  await expectNoOverflow(page, 'topic opened at the chapter'); await S('topic-at-chapter');
  // Back returns to the same question with its feedback
  await page.locator('.backlink').click();
  await page.waitForSelector('.flow .fb.ko'); await expect(page.locator('.qstem').first()).toHaveText(stem2);
  await expect(page.locator('.fb .watch')).toHaveText(sp2.label);
  void sp;
});

// Skipped in the public copy: needs local narration audio or local video timings, or is timing-sensitive.
test.skip('b4-2 mock exam results: the review list has the button for wrong answers and Back returns to the list', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b4-' + n, f);
  await openApp(page);
  await tab(page, 'Exam').click(); await page.waitForSelector('.home');
  await page.getByRole('button', { name: 'Start mock exam' }).click(); await page.waitForSelector('.exam .opt');
  const stem = (await page.locator('.exam .qstem').innerText()).trim();
  const q = await page.evaluate((s) => { const x = window.AB620_QUESTIONS.find((y) => y.stem === s); return { ans: x.answer.map((i) => x.options[i]), wrong: x.options.find((o) => !x.answer.map((i) => x.options[i]).includes(o)) }; }, stem);
  await page.locator('.exam .opts .opt .otx').getByText(q.wrong, { exact: true }).first().click();
  if (!(await page.locator('#qnav').evaluate((d) => d.open))) await page.locator('#qnav summary').click();
  await page.locator('#qnav .btn', { hasText: 'Finish exam' }).click();
  await page.locator('#qnav .btn', { hasText: 'Yes, finish' }).click(); await page.waitForSelector('.result');
  const sp = await spot(page, stem);
  const item = page.locator('.review li').first();
  await expect(item.locator('.watch')).toHaveText(sp.label);
  await expectNoOverflow(page, 'results with watch button'); await expectTapTargets(page, ti, 'results with watch button'); await S('mock-results');
  await item.locator('.watch').click(); await page.waitForSelector('.topic .pl'); await waitMeta(page);
  await expect(page.locator('.topic h1')).toHaveText(sp.title); await expect(page.locator('.backlink')).toHaveText('‹ Results');
  await expect(page.locator('.chrow').nth(sp.scene)).toHaveClass(/cur/);
  const st = await audioState(page); expect(st.t).toBeGreaterThanOrEqual(sp.start - 0.5);
  await page.locator('.backlink').click(); await page.waitForSelector('.result');
  await expect(page.locator('.review li').first().locator('.watch')).toHaveText(sp.label);
  await expect(page.locator('.result h1')).toHaveText(/\d+% correct/);
});

test('b4-3 self-explanation after a mistake without the tutor: optional box, Compare shows the sentence next to the official explanation, Next never blocked', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b4-' + n, f);
  await startPractice(page);
  const sentence = 'Because it is the only option that fits the scenario.';
  expect(await answerCurrentQuestion(page, false)).toBe(true);
  const box = page.locator('.fb .selfx');
  await expect(box).toBeVisible(); await expect(box).toContainText('In one sentence: why is the right answer right?');
  const go = box.getByRole('button', { name: 'Compare' });
  await expect(go).toBeDisabled();
  await expect(page.locator('.actions .btn.primary')).toBeEnabled();                          // never blocks Next
  await expectNoOverflow(page, 'self-explanation box'); await S('selfx-box');
  await box.locator('textarea').fill(sentence); await expect(go).toBeEnabled();
  await go.click();
  const expl = await page.evaluate(() => { const s = document.querySelector('.qstem').textContent; return window.AB620_QUESTIONS.find((q) => q.stem === s).explanation; });
  await expect(box.locator('.selfx-me')).toHaveText(sentence); await expect(box.locator('.selfx-off')).toHaveText(expl);
  await expectNoOverflow(page, 'self-explanation compare'); await expectTapTargets(page, ti, 'self-explanation compare'); await S('selfx-compare');
  await box.getByRole('button', { name: 'Edit my sentence' }).click(); await expect(box.locator('textarea')).toHaveValue(sentence);
  await page.locator('.actions .btn.primary').click(); await page.waitForSelector('.flow .qstem');   // moves on without any answer needed
  // a right answer shows no box
  await answerCurrentQuestion(page, true); await expect(page.locator('.fb.ok')).toBeVisible(); await expect(page.locator('.selfx')).toHaveCount(0);
});

test('b4-4 topic check: wrong answer shows the box and a watch button that seeks the player on the same page; diagnostic/mock have no box', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, 'b4-' + n, f);
  await openApp(page);
  const id = await firstTopicId(page);
  await openFromLearn(page, id); await waitMeta(page);
  await skipPretest(page);
  const c = await page.evaluate((i) => { const t = window.AB620_COURSE.find((x) => x.id === i), c = t.check[0], m = window.AB620_QMAP[i + '#c0'], v = window.AB620_VIDEO[i]; return { wrong: c.options.find((_, j) => j !== c.answer), start: v.scenes[m[1]].start, scene: m[1] }; }, id);
  await page.locator('#check .opt .otx').getByText(c.wrong, { exact: true }).first().click();
  await page.locator('#check .conf .unsure').click();
  await expect(page.locator('#check .fb.ko')).toBeVisible();
  await expect(page.locator('#check .selfx')).toBeVisible(); await expect(page.locator('#check .fb .watch')).toContainText('Watch the explanation · ' + id);
  await S('check-wrong');
  await page.locator('#check .fb .watch').click();
  await expect(page.locator('.chrow').nth(c.scene)).toHaveClass(/cur/);
  const st = await audioState(page); expect(st.t).toBeGreaterThanOrEqual(c.start - 0.5);
  await expect(page.locator('.topic h1')).toHaveText(await page.evaluate((i) => window.AB620_COURSE.find((x) => x.id === i).title, id));   // still the same page
  // the diagnostic imitates the exam: no explanations, no box
  await page.locator('.backlink').click(); await tab(page, 'Exam').click(); await page.waitForSelector('.home');
  await page.getByRole('button', { name: 'Start diagnostic' }).click(); await page.waitForSelector('.exam .opt');
  await page.locator('.exam .opt').first().click();
  await expect(page.locator('.exam .selfx')).toHaveCount(0); await expect(page.locator('.exam .watch')).toHaveCount(0);
});

test('b4-5 self-explanation with the tutor: "Check my reasoning" sends question, answer and the sentence to the tutor', async ({ page }) => {
  await page.addInitScript(() => {
    window.__prompts = [];
    window.claude = { use: async (name) => name === 'sample' ? async (prompt, o) => { window.__prompts.push(prompt); o.onText({ text: 'Partly right. Keep the key point.' }); return {}; } : null };
  });
  await startPractice(page);
  const sentence = 'The right option is the one that matches the scenario.';
  expect(await answerCurrentQuestion(page, false)).toBe(true);
  const box = page.locator('.fb .selfx');
  await box.locator('textarea').fill(sentence);
  await box.getByRole('button', { name: 'Check my reasoning' }).click();
  await expect(box.locator('.tutor-out')).toContainText('Partly right.');
  const p = await page.evaluate(() => window.__prompts[window.__prompts.length - 1]);
  expect(p).toContain(sentence); expect(p).toContain('Correct answer:'); expect(p).toContain('Question: ');
  await expect(page.locator('.actions .btn.primary')).toBeEnabled();
});
