// F2 (audit 2026-10-09): learning logic. Review cards only from studied topics, mixed review, pretest, estimated score, failed-check retry,
// "studied" (not just opened) unlocks practice, collapsed locked clusters, exam date can be cleared, legacy data.
import { test, expect, shot, openApp, openFromLearn, tab, seed, lsGet, answerCheck, expectNoOverflow, topicInfo } from './helpers.mjs';

const SAT = '2026-10-10', FRI = '2026-10-09';
const firstIds = (page, n) => page.evaluate((k) => window.AB620_LOGIC.topics().slice(0, k).map((t) => t.id), n);
const mapOf = (ids, v) => Object.fromEntries(ids.map((i) => [i, v]));
const flowOf = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('ab620.v1.flow') || 'null'));

test('f2-1 Today: the review has only cards of studied topics, on day 1 none (F01 has no skills); new cards come in every day, at most 8', async ({ page }) => {
  await openApp(page);
  await page.locator('.hero .btn.primary').click(); await page.waitForSelector('.topic .pl');
  let f = await flowOf(page);
  expect(f.topicId).toBe('F01');
  expect(f.rv.filter((r) => r.t === 'c'), 'day 1: no flashcards of topics nobody has taught').toHaveLength(0);
  // six topics studied (not F01..): a due backlog must not push the new cards out
  const ids = await firstIds(page, 7);
  const info = await page.evaluate((i) => {
    const T = window.AB620_LOGIC.topics(), studied = T.filter((t) => i.indexOf(t.id) > -1), sk = new Set(studied.flatMap((t) => t.skills || []));
    const pool = window.AB620_CARDS.filter((c) => sk.has(c.skill));
    return { sk: [...sk], pool: pool.map((c) => c.id), next: T[i.length].id };
  }, ids);
  const dueIds = info.pool.slice(0, info.pool.length - 4);
  const cards = Object.fromEntries(dueIds.map((id, k) => [id, { due: '2026-10-0' + (1 + (k % 5)), r: '2026-09-28', last_review: '2026-09-28', stability: 3, difficulty: 5, elapsed_days: 3, scheduled_days: 3, learning_steps: 0, reps: 2, lapses: 0, state: 2 }]));
  await page.evaluate(() => localStorage.removeItem('ab620.v1.flow'));
  await seed(page, { sessions: { lessonsDone: mapOf(ids, { at: 1 }) }, cards });
  await page.locator('.hero .btn.primary').click(); await page.waitForSelector('.topic .pl');
  f = await flowOf(page);
  const rvCards = f.rv.filter((r) => r.t === 'c');
  const skillOf = await page.evaluate((rs) => rs.map((r) => window.AB620_CARDS.find((c) => c.id === r.id).skill), rvCards);
  const topicSk = await page.evaluate((id) => window.AB620_LOGIC.topics().find((t) => t.id === id).skills || [], info.next);
  expect(rvCards.length).toBeGreaterThan(0); expect(rvCards.length).toBeLessThanOrEqual(8);
  expect(skillOf.every((s) => info.sk.indexOf(s) > -1 || topicSk.indexOf(s) > -1), 'cards only of studied skills or of today\'s class').toBe(true);
  expect(rvCards.filter((r) => !cards[r.id]).length, 'three new cards in spite of the due backlog').toBe(3);
});

test('f2-2 Mixed review (any day): only what you studied, and the text says how many; with nothing studied it is locked and the lesson is the way on', async ({ page }, ti) => {
  await openApp(page, SAT);
  await expect(page.locator('.hero .btn.primary')).toHaveText('Start');
  await expect(page.getByRole('button', { name: 'Mixed review' })).toBeDisabled();
  await expect(page.locator('.hero')).toContainText('Mixed review unlocks once you have studied a topic');
  await page.locator('.hero .btn.primary').click(); await page.waitForSelector('.topic .pl');   // actionable: it starts the next lesson
  await page.evaluate(() => localStorage.removeItem('ab620.v1.flow'));
  const ids = await firstIds(page, 5);
  await seed(page, { sessions: { lessonsDone: mapOf(ids, { at: 1 }) } });
  await page.goto('/?now=' + SAT); await page.waitForSelector('.hero');
  const n = await page.evaluate(() => { const L = window.AB620_LOGIC, sk = L.studiedSkills(L.studiedMap(JSON.parse(localStorage.getItem('ab620.v1.sessions')))); return window.AB620_QUESTIONS.filter((q) => sk[q.skill]).length; });
  await expect(page.locator('.hero')).toContainText('Mixed review: up to 20 questions on what you have studied.');
  await expectNoOverflow(page, 'Mixed review hero'); await shot(page, ti, 'f2-mixed-review', true);
  await page.getByRole('button', { name: 'Mixed review' }).click(); await page.waitForSelector('.flow .qstem');
  const f = await flowOf(page);
  expect(f.qs.length).toBe(Math.min(20, n));
  const ok = await page.evaluate((qs) => { const L = window.AB620_LOGIC, sk = L.studiedSkills(L.studiedMap(JSON.parse(localStorage.getItem('ab620.v1.sessions')))); return qs.every((it) => sk[window.AB620_QUESTIONS.find((q) => q.id === it.id).skill]); }, f.qs);
  expect(ok, 'every mixed-review question belongs to a studied topic').toBe(true);
});

test('f2-3 pretest: a bank question that is not a check question; none on a topic already studied or passed, none without skills', async ({ page }) => {
  await openApp(page);
  const F = await page.evaluate(() => { const L = window.AB620_LOGIC, T = L.topics(), t = T.find((x) => (x.skills || []).length && L.pretestQ(x)); return { id: t.id, stem: L.pretestQ(t).stem, checks: t.check.map((c) => c.stem) }; });
  await openFromLearn(page, 'F01'); await expect(page.locator('.pretest')).toHaveCount(0);   // Fundamentals topic without skills
  await page.locator('.backlink').click();
  await openFromLearn(page, F.id);
  await expect(page.locator('.pretest .pre-stem')).toHaveText(F.stem);
  expect(F.checks).not.toContain(F.stem);
  await page.locator('.pretest .opt').first().click();   // guess, then jump to the check
  await page.locator('.tnav-a').filter({ hasText: 'Check' }).click();
  await expect(page.locator('.pretest .pre-res')).toContainText('Answer: ');
  const firstCheck = await page.locator('#check .qstem').innerText();
  expect(firstCheck.trim(), 'the check does not repeat the pretest question').not.toBe(F.stem);
  const rec = (await lsGet(page, 'sessions')).pretest[F.id]; expect(rec.qid).toBeTruthy();
  // studied or passed topics: no pretest
  await page.locator('.backlink').click();
  await seed(page, { sessions: { lessonsDone: { [F.id]: { at: 1 } }, pretest: {} } });
  await openFromLearn(page, F.id); await expect(page.locator('.pretest')).toHaveCount(0);
  await page.locator('.backlink').click();
  const other = await page.evaluate((id) => window.AB620_LOGIC.topics().find((x) => x.id !== id && (x.skills || []).length && window.AB620_LOGIC.pretestQ(x)).id, F.id);
  await seed(page, { sessions: { checks: { [other]: { ok: 4, n: 4, at: 1, due: '2026-10-08' } } } });
  await openFromLearn(page, other); await expect(page.locator('.pretest')).toHaveCount(0);
});

test('f2-4 Estimated score: "not enough data" until 30 % of the skills have 3 answers, then weighted by coverage', async ({ page }, ti) => {
  await openApp(page);
  const mk = (n) => page.evaluate((k) => Object.fromEntries(window.AB620_META.skills.slice(0, k).map((s) => [window.AB620_QUESTIONS.find((q) => q.skill === s.id).id, { seen: 3, correct: 3, h: '111' }])), n);
  await seed(page, { quiz: { attempts: [], stats: await mk(6) } }); await tab(page, 'Progress').click();
  const panel = page.locator('.panel').filter({ has: page.locator('h2', { hasText: 'Estimated score' }) });
  await expect(panel.locator('.score-n b')).toHaveText('—');
  await expect(panel).toContainText('Not enough data yet'); await expect(panel).toContainText('so far 6');
  await panel.getByRole('button', { name: 'Go to Today' }).click(); await page.waitForSelector('.hero');   // says what to do, and it is actionable
  await seed(page, { quiz: { attempts: [], stats: await mk(14) } }); await tab(page, 'Progress').click();
  const v = +(await panel.locator('.score-n b').innerText());
  expect(v, 'everything right on 14 of 44 skills is far from 740').toBeGreaterThan(400); expect(v).toBeLessThan(650);
  await expect(panel).toContainText('14 of 44 skills'); await expectNoOverflow(page, 'Progress score'); await shot(page, ti, 'f2-score', true);
});

test('f2-5 check: Try again repeats only the missed questions; skipping a failed check keeps it open', async ({ page }) => {
  await openApp(page);
  const t = await topicInfo(page, 'F03');
  const qs = await page.evaluate(() => window.AB620_COURSE.find((x) => x.id === 'F03').check.map((c) => ({ right: c.options[c.answer], wrong: c.options.find((_, j) => j !== c.answer) })));
  expect(qs.length).toBe(t.check);
  await openFromLearn(page, 'F03');
  const pre = page.locator('.pretest'); if (await pre.count()) await pre.getByRole('button', { name: 'Skip' }).click();
  for (let i = 0; i < qs.length; i++) {
    await page.locator('#check .opt .otx').getByText(i === 1 ? qs[i].wrong : qs[i].right, { exact: true }).first().click();
    await page.locator('#check .conf .unsure').click();
    await page.locator('#check .btn.primary').click();
  }
  await expect(page.locator('#check .fb h3')).toHaveText((qs.length - 1) + ' of ' + qs.length + ' correct');
  const retry = page.locator('#check .btn.primary');
  await expect(retry).toHaveText('Try again: the question you missed');
  await retry.click();
  await expect(page.locator('#check .hint')).toContainText('Retry: question 1 of 1');
  await expect(page.locator('#check .qstem')).toHaveText(await page.evaluate(() => window.AB620_COURSE.find((x) => x.id === 'F03').check[1].stem));
  await page.locator('#check .opt .otx').getByText(qs[1].right, { exact: true }).first().click();
  await page.locator('#check .conf .unsure').click();
  await page.locator('#check .btn.primary').click();   // See result
  await expect(page.locator('#check .fb h3')).toHaveText(qs.length + ' of ' + qs.length + ' correct');
  const rec = (await lsGet(page, 'sessions')).checks.F03; expect(rec.ok).toBe(qs.length); expect(rec.n).toBe(qs.length); expect(rec.due).toBeTruthy();
});

test('f2-6 Today: leaving a failed check says it is still open and the Check step stays open', async ({ page }) => {
  await openApp(page);
  const q = await page.evaluate(() => { const c = window.AB620_COURSE.find((x) => x.id === 'F01').check; return c.map((x) => ({ right: x.options[x.answer], wrong: x.options.find((_, j) => j !== x.answer) })); });
  await page.locator('.hero .btn.primary').click(); await page.waitForSelector('.topic .pl');
  for (let i = 0; i < q.length; i++) {
    await page.locator('#check .opt .otx').getByText(i === 0 ? q[i].wrong : q[i].right, { exact: true }).first().click();
    await page.locator('#check .conf .sure').click(); await page.locator('#check .btn.primary').click();
  }
  await expect(page.locator('#check .fb h3')).toHaveText((q.length - 1) + ' of ' + q.length + ' correct');
  await page.locator('.tp-body .actions .btn.primary').click(); await page.waitForSelector('.flow, .done');
  await expect(page.locator('#toast')).toContainText('The check is still open');
  expect((await lsGet(page, 'sessions')).checks.F01.ok).toBe(q.length - 1);
  // F01 has no practice and no cards on day 1: the flow is finished; the Check row is open, not "done"
  await page.waitForSelector('.done', { timeout: 5000 }).catch(() => {});
  if (await page.locator('.done').count()) { await expect(page.locator('.doneline').first()).toContainText('still open'); await page.locator('.done ~ .actions .btn, .actions .btn.primary').first().click(); }
  await page.waitForSelector('.hero');
  await expect(page.locator('.hero-done')).toContainText('still open');
  await page.locator('.hero-done').getByRole('button', { name: 'Retry the check' }).click(); await expect(page.locator('#check')).toBeVisible();
});

test('f2-7 practice unlocks only with studied topics (not opened), and the locked mixed sets collapse into one line', async ({ page }, ti) => {
  await openApp(page);
  await openFromLearn(page, 'L01'); await page.locator('.backlink').click();
  await openFromLearn(page, 'L14'); await page.locator('.backlink').click();   // opening two topics is not studying them
  await tab(page, 'Exam').click();
  const mix = page.locator('#mixed');
  await expect(mix.locator('.mixrow')).toHaveCount(0);
  await expect(mix.locator('.mixlocked')).toContainText('7 sets unlock as you study'); await expect(mix.locator('.mixlocked')).toContainText('“');
  await expect(page.getByText('Practice by module')).toBeVisible(); await expect(page.locator('.panel').filter({ hasText: 'Practice by module' })).toContainText('Appears after you study');
  await expectNoOverflow(page, 'Exam locked mixed'); await shot(page, ti, 'f2-mixed-locked', true);
  await seed(page, { sessions: { watched: { L01: 1 }, checks: { L14: { ok: 4, n: 4, at: 1, due: '2026-10-08' } } } }); await tab(page, 'Exam').click();
  await expect(mix.locator('.mixrow')).toHaveCount(1); await expect(mix.locator('.mixrow')).toContainText('Which integration?');
  await expect(mix.locator('.mixlocked')).toContainText('6 more unlock as you study');
  await expect(page.locator('.panel').filter({ hasText: 'Practice by module' }).locator('.btn')).not.toHaveCount(0);
  await shot(page, ti, 'f2-mixed-open', true);
});

test('f2-8 Settings: the exam date can be cleared (no date, no countdown) and the clear survives a reload', async ({ page }) => {
  await openApp(page);
  await page.locator('#gear:visible, #tab-ajustes:visible').first().click(); await page.waitForSelector('.sett');
  await expect(page.locator('#f-date')).toHaveValue('2026-12-02');
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(page.locator('#f-date')).toHaveValue(''); await expect(page.getByRole('button', { name: 'Clear' })).toHaveCount(0);
  expect((await lsGet(page, 'settings')).examDate).toBe('');
  await page.reload(); await page.waitForSelector('#view > *');
  await tab(page, 'Progress').click(); await expect(page.locator('.prog .hd p')).toHaveText('');
  expect((await lsGet(page, 'settings')).examDate).toBe('');
  // typing a date again works; a past date is accepted and cards are then not capped at one day (unit-tested in smoke)
  await page.locator('#gear:visible, #tab-ajustes:visible').first().click(); await page.locator('#f-date').fill('2026-10-01');
  expect((await lsGet(page, 'settings')).examDate).toBe('2026-10-01');
});

test('f2-9 a mistake made while sure is due the next calendar day, and the note says so on any weekday', async ({ page }) => {
  await openApp(page, FRI);
  const c = await page.evaluate(() => { const x = window.AB620_COURSE.find((t) => t.id === 'F01').check[0]; return { wrong: x.options.find((_, j) => j !== x.answer) }; });
  await openFromLearn(page, 'F01');
  await page.locator('#check .opt .otx').getByText(c.wrong, { exact: true }).first().click();
  await page.locator('#check .conf .sure').click();
  await expect(page.locator('#check .hcnote')).toContainText('It comes back in tomorrow\'s review.');
  const st = (await lsGet(page, 'quiz')).stats['F01#c0'];
  const mid = await page.evaluate(() => new Date(2026, 9, 10).getTime());   // Saturday 00:00 local
  expect(st.nextAt).toBe(mid);
  await openApp(page);   // Wednesday: tomorrow is a class day
  await openFromLearn(page, 'F01');
  await page.locator('#check .opt .otx').getByText(c.wrong, { exact: true }).first().click();
  await page.locator('#check .conf .sure').click();
  await expect(page.locator('#check .hcnote')).toContainText('It comes back in tomorrow\'s review.');
});

test('f2-10 old data: completed lessons count as watched, and a legacy Mastered topic says so honestly', async ({ page }) => {
  await openApp(page);
  const ids = await firstIds(page, 3);
  await seed(page, { sessions: { lessonsDone: mapOf(ids, { at: 1 }), checks: { [ids[0]]: { ok: 3, n: 3, at: 1 } } } });
  await expect(page.locator('.hstats')).toContainText('3 of 49 watched'); await expect(page.locator('.hstats')).toHaveAttribute('aria-label', /1 check passed/);
  await tab(page, 'Learn').click(); await expect(page.locator('details.mod').first().locator('.mod-c')).toHaveText('3/8');
  await openFromLearn(page, ids[0]);
  await expect(page.locator('#check')).toContainText('counts as mastered');
  await expect(page.locator('#check')).not.toContainText('you passed the re-check');
});
