// Cases 7 and 8: Learn (modules, topic screen, glossary) and Exam (diagnostic, practice by module, mock).
import { test, expect, shot, openApp, openAll, tab, seed, lsGet, answerCurrentQuestion, expectNoOverflow, expectTapTargets, sleep } from './helpers.mjs';

test('07 Learn: modules list, topic opens the same Topic screen as Today, glossary search with and without accents', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, '07-' + n, f);
  await openApp(page);
  await tab(page, 'Learn').click(); await page.waitForSelector('.learn');
  const nMods = await page.evaluate(() => window.AB620_LOGIC.modules().length);
  await expect(page.locator('details.mod')).toHaveCount(nMods);
  await expect(page.locator('.legend2')).toContainText('Watched'); await expect(page.locator('.legend2')).toContainText('Check passed');
  await openAll(page); await expectNoOverflow(page, 'Learn'); await expectTapTargets(page, ti, 'Learn'); await S('list');
  await expect(page.locator('.trow')).toHaveCount(49);
  // same Topic screen as Today
  await page.locator('.trow').nth(3).click(); await page.waitForSelector('.topic .pl');
  for (const sel of ['.pl', '.chapters', '.chrow', '.theory', '.tcheck', '.pl-seek', '.pl-speed']) await expect(page.locator(sel).first(), sel).toBeVisible();
  await expect(page.locator('.backlink')).toHaveText('‹ Learn');
  await expect(page.locator('.tp-body .actions')).toHaveCount(0);        // no "Continue/Back to Today" outside Today context
  await expectNoOverflow(page, 'Learn topic'); await S('topic');
  await page.locator('.backlink').click(); await page.waitForSelector('.learn');
  // glossary
  await page.locator('.rowcard').click(); await page.waitForSelector('.gloss');
  const terms = await page.evaluate(() => window.AB620_LOGIC.allGlossary().map((g) => g.term));
  expect(terms.length).toBeGreaterThan(40);
  const items = () => page.locator('.gl-list > li');
  await expect(items()).toHaveCount(terms.length);
  const word = (terms.find((t) => /^[A-Za-z]{5,}$/.test(t)) || terms[0]).toLowerCase();
  const input = page.locator('.gloss input.search');
  await input.fill(word); const plain = await items().count(); expect(plain).toBeGreaterThan(0);
  await expect(page.locator('.gl-list .g-t').first()).toBeVisible(); await S('glossary-search');
  await input.fill(word.toUpperCase()); expect(await items().count()).toBe(plain);
  const accented = word.replace(/[aeiou]/, (c) => ({ a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' })[c]);
  expect(accented).not.toBe(word);
  await input.fill(accented); expect(await items().count(), 'accented query "' + accented + '"').toBe(plain);
  await input.fill('zzzqqq'); await expect(page.locator('.gl-list')).toContainText('No matching terms');
  await expectNoOverflow(page, 'Glossary');
  // "View topic" from a glossary entry opens the Topic screen and goes back to the glossary
  await input.fill(word); await page.locator('.gl-list .link').first().click(); await page.waitForSelector('.topic .pl');
  await expect(page.locator('.backlink')).toHaveText('‹ Glossary');
});

async function finishExam(page) {
  if (!(await page.locator('#qnav').evaluate((d) => d.open))) await page.locator('#qnav summary').click();
  const fin = page.locator('#qnav .btn', { hasText: 'Finish exam' });
  if (await fin.count()) await fin.click();
  await page.locator('#qnav .btn', { hasText: 'Yes, finish' }).click();
  await page.waitForSelector('.result');
}
async function answerExamQuestion(page) {
  const stem = (await page.locator('.exam .qstem').innerText()).trim();
  const q = await page.evaluate((s) => { const x = window.AB620_QUESTIONS.find((y) => y.stem === s); return x ? { multi: x.type === 'multi', n: x.answer.length } : null; }, stem);
  const multiUi = (await page.locator('.exam .opt[role=checkbox]').count()) > 0;
  expect(multiUi, 'multi-answer UI matches the data').toBe(!!(q && q.multi));
  if (multiUi) {
    await expect(page.locator('.exam .hint')).toHaveText('Choose ' + q.n + '.');
    for (let i = 0; i < q.n; i++) await page.locator('.exam .opt').nth(i).click();
  } else await page.locator('.exam .opt').first().click();
  return multiUi;
}

test('08a Exam: diagnostic of 20 questions, "Choose N" on multi-answer questions, results with domain bars', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, '08a-' + n, f);
  await openApp(page);
  await tab(page, 'Exam').click(); await page.waitForSelector('.home');
  await expectNoOverflow(page, 'Exam home'); await expectTapTargets(page, ti, 'Exam home'); await S('home');
  await page.getByRole('button', { name: 'Start diagnostic' }).click(); await page.waitForSelector('.exam');
  await expect(page.locator('.flabel')).toHaveText('Question 1 of 20');
  let multis = 0;
  for (let i = 0; i < 20; i++) {
    await expect(page.locator('.flabel')).toHaveText('Question ' + (i + 1) + ' of 20');
    if (await answerExamQuestion(page)) { multis++; if (multis === 1) { await S('multi-choose-n'); await expectNoOverflow(page, 'multi question'); } }
    if (i === 0) { await expectNoOverflow(page, 'exam question'); await expectTapTargets(page, ti, 'exam question'); await S('question'); }
    if (i < 19) await page.locator('.actions .btn.primary').click();
  }
  await page.locator('.actions .btn.primary').click();                     // "Review"
  await page.locator('#qnav .btn', { hasText: 'Yes, finish' }).click(); await page.waitForSelector('.result');
  await expect(page.locator('.result h1')).toHaveText(/\d+% correct/);
  await expect(page.locator('.result .dbars .drow')).toHaveCount(3);
  await expectNoOverflow(page, 'results'); await S('results');
  const att = (await lsGet(page, 'quiz')).attempts; expect(att.length).toBe(1); expect(att[0].n).toBe(20);
  await page.getByRole('button', { name: 'Done' }).click(); await page.waitForSelector('.home');
});

test('08b Exam: practice by module (instant feedback)', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, '08b-' + n, f);
  await openApp(page);
  await tab(page, 'Exam').click();
  await expect(page.locator('.panel').filter({ hasText: 'Practice by module' })).toContainText('Appears after you study');
  await S('practice-empty');
  const id = await page.evaluate(() => window.AB620_LOGIC.topics().find((t) => t.module === 1).id);
  await seed(page, { sessions: { seen: { [id]: Date.now() } } });   // opening a topic is not enough
  await tab(page, 'Exam').click();
  await expect(page.locator('.panel').filter({ hasText: 'Practice by module' })).toContainText('Appears after you study');
  await seed(page, { sessions: { watched: { [id]: Date.now() } } });
  await tab(page, 'Exam').click();
  const btn = page.locator('.panel').filter({ hasText: 'Practice by module' }).locator('.weak li').first().getByRole('button', { name: 'Practice' });
  await expect(btn).toBeVisible(); await S('practice-list');
  await btn.click(); await page.waitForSelector('.flow .qstem');
  await expect(page.locator('.flabel')).toHaveText(/Question 1 of \d+/);
  expect(await answerCurrentQuestion(page, true)).toBe(true);
  await expect(page.locator('.fb.ok')).toBeVisible(); await expectNoOverflow(page, 'practice feedback'); await S('feedback');
  await page.locator('.ftop .link').click(); await page.waitForSelector('.home');
  await expect(page.locator('h1')).toHaveText('Exam');
});

test('08c Exam: mock exam starts with a timer, answer a few, finish -> results with domain bars', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, '08c-' + n, f);
  await openApp(page);
  await tab(page, 'Exam').click();
  await page.getByRole('button', { name: 'Start mock exam' }).click(); await page.waitForSelector('.exam');
  await expect(page.locator('.flabel')).toHaveText('Question 1 of 50');
  const timer = page.locator('#qtimer'); await expect(timer).toHaveText(/^(100|99):\d\d$/);
  const t1 = await timer.innerText(); await sleep(2200); const t2 = await timer.innerText(); expect(t2).not.toBe(t1);
  for (let i = 0; i < 3; i++) { await answerExamQuestion(page); await page.locator('.actions .btn.primary').click(); }
  await page.locator('.actions .btn.flag').click(); await expect(page.locator('.actions .btn.flag')).toHaveText('Flagged');
  await expectNoOverflow(page, 'mock question'); await S('question');
  await page.locator('#qnav').evaluate((d) => { d.open = true; }); await S('navigator');
  await finishExam(page);
  await expect(page.locator('.result h1')).toHaveText(/\d+% correct/);
  await expect(page.locator('.result .dbars .drow')).toHaveCount(3);
  await expect(page.locator('.result')).toContainText('Mock exam'); await expectNoOverflow(page, 'mock results'); await S('results');
});
