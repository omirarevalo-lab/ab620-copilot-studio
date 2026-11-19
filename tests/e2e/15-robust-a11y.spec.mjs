// F3 (audit 2026-10-09): robustness (stale saved flow, bad saved docs, sync adopt) and accessibility / mobile polish
// (focus after re-render, reset dialog, roving radios, contrast, tap targets, lang + viewport, feedback above the Next bar, diagnostic with
// unanswered questions, unfinished mock, richer done screens, toast placement, module 0 name).
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, openApp, openFromLearn, tab, seed, seedStudied, lsGet, injectBeforeApp, answerCurrentQuestion, finishFlow, expectNoOverflow, sleep } from './helpers.mjs';

const NOW = '2026-10-07', SAT = '2026-10-10', SUN = '2026-10-11';
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));

// Starts a 10-question module/mixed practice flow from the Exam tab (needs studied topics).
async function startPractice(page, single) {
  await seedStudied(page, 8);
  for (let i = 0; i < 12; i++) {
    await tab(page, 'Exam').click();
    const btn = page.locator('#mixed .btn, .panel li .btn').filter({ hasText: 'Practice' }).first();
    await btn.click(); await page.waitForSelector('.flow .opt');
    if (!single || !(await page.locator('.flow .qstem ~ .hint').count())) return;   // "Choose N." = a multiple-choice question (checkboxes, no radio group)
    await page.locator('.flow .ftop .link').click();
  }
  throw new Error('no single-answer question found');
}

test('f3-1 A1: a saved flow whose items no longer exist is repaired, never a dead screen', async ({ page }) => {
  await openApp(page);
  const mk = async (flow) => {
    await page.evaluate((f) => {
      const L = window.AB620_LOGIC, qs = window.AB620_QUESTIONS, item = (q) => L.makeItems([q])[0];
      const bogus = (i) => ({ id: 'q-gone-' + i, order: [0, 1, 2, 3], sel: [], checked: false });
      const F = Object.assign({ kind: 'day', date: '2026-10-07', topicId: 'F01', mode: null, ck: [], ok: 0, okC: 0, recorded: false, from: 'hoy' }, f.base);
      F.qs = f.qs.map((x) => (x === 'ok' ? item(qs[0]) : bogus(1))); F.rv = f.rv.map((x) => Object.assign(x === 'ok' ? item(qs[1]) : bogus(2), { t: 'q' }));
      localStorage.setItem('ab620.v1.flow', JSON.stringify(F));
    }, flow);
    await page.reload(); await page.waitForSelector('#view > *');
  };
  // 1) review position past the end after 3 of 4 items disappeared
  await mk({ base: { phase: 'review', i: 2 }, qs: ['ok'], rv: ['ok', 'x', 'x', 'x'] });
  await page.locator('.hero .btn.primary').click();
  await expect(page.locator('.flow .ftop .link')).toHaveText('‹ Exit');
  await expect(page.locator('.flow .qstem')).toBeVisible(); await expect(page.locator('.notice')).toHaveCount(0);
  await expect(page.locator('.flabel')).toHaveText('Review 1 of 1');
  // 2) the whole practice phase vanished: it moves on to the review
  await page.locator('.flow .ftop .link').click();
  await mk({ base: { phase: 'practice', i: 1 }, qs: ['x', 'x'], rv: ['ok'] });
  await page.locator('.hero .btn.primary').click();
  await expect(page.locator('.flabel')).toHaveText('Review 1 of 1'); await expect(page.locator('.notice')).toHaveCount(0);
  // 3) nothing left at all: no flow, Today is normal
  await page.locator('.flow .ftop .link').click();
  await mk({ base: { phase: 'practice', i: 0 }, qs: ['x'], rv: ['x'] });
  await expect(page.locator('.hero h2').first()).toBeVisible(); await expect(page.locator('.notice')).toHaveCount(0);
});

test('f3-2 A7 + B-18: saved docs with null / wrong-typed fields do not break Exam, Progress or the diagnostic; unanswered questions are reported', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => {
    localStorage.setItem('ab620.v1.quiz', JSON.stringify({ stats: null, attempts: 'nope', updatedAt: 5 }));
    localStorage.setItem('ab620.v1.sessions', JSON.stringify({ lessonsDone: null, seen: [], checks: 7, updatedAt: 5 }));
    localStorage.setItem('ab620.v1.settings', JSON.stringify({ examDate: null, theme: 3, updatedAt: 5 }));
    localStorage.setItem('ab620.v1.cards', JSON.stringify([1, 2]));
  });
  await page.reload(); await page.waitForSelector('#view > *');
  await tab(page, 'Progress').click(); await expect(page.locator('#view h1')).toHaveText('Progress'); await expect(page.locator('.notice')).toHaveCount(0);
  await tab(page, 'Exam').click(); await expect(page.locator('#view h1')).toHaveText('Exam'); await expect(page.locator('.notice')).toHaveCount(0);
  await page.getByRole('button', { name: 'Start diagnostic' }).click(); await page.waitForSelector('.exam');
  // answer three questions, leave 17
  for (let i = 0; i < 3; i++) { await page.locator('.exam .opt').first().click(); await page.getByRole('button', { name: /Next|Review/ }).first().click(); }
  const det = page.locator('details.qside'); if (!(await det.evaluate((d) => d.open))) await det.locator('summary').click();
  await page.getByRole('button', { name: 'Finish exam' }).click(); await page.getByRole('button', { name: 'Yes, finish' }).click();
  await expect(page.locator('.result h1')).toHaveText(/\d+% correct/);
  await expect(page.locator('.result .unans')).toContainText('17 questions were not answered and are not counted');
  await expect(page.locator('.result header p')).toContainText('of 3 answered');
  await expect(page.locator('.result')).toContainText('Answer at least half');   // 3 of 20 answered: no score reference
  const q = await lsGet(page, 'quiz'); expect(q.attempts).toHaveLength(1); expect(q.attempts[0].n).toBe(3);
});

test('f3-3 A10: a progress doc adopted from sync while a topic is open does not lose the pretest guess', async ({ page }) => {
  await injectBeforeApp(page, `window.__snaps = {}; window.claude = { use: function (name) {
    if (name === 'db') return Promise.resolve({ doc: function (p) { var n = p.split('/')[1]; return { get: function () { return Promise.resolve({ exists: false }); }, set: function () { return Promise.resolve(); }, onSnapshot: function (cb) { window.__snaps[n] = cb; } }; } });
    if (name === 'user') return Promise.resolve({ isOwner: function () { return true; } });
    return Promise.resolve(null); } };`);
  await openApp(page);
  const tid = await page.evaluate(() => { const L = window.AB620_LOGIC; return L.topics().find((t) => (t.skills || []).length && L.pretestQ(t)).id; });
  await openFromLearn(page, tid);
  await expect(page.locator('.pretest .opt').first()).toBeVisible();
  await page.waitForFunction(() => window.__snaps && window.__snaps.sessions);
  await page.evaluate(() => window.__snaps.sessions({ exists: true, data: () => ({ lessonsDone: {}, seen: { x: 1 }, updatedAt: Date.now() + 100000 }) }));
  await page.locator('.pretest .opt').first().click();
  await expect.poll(async () => ((await lsGet(page, 'sessions')).pretest || {})[tid] ? 1 : 0).toBe(1);
});

test('f3-4 B-17: leaving an unfinished exam and coming back offers Continue / Discard; Continue restores the answers', async ({ page }) => {
  await openApp(page);
  await tab(page, 'Exam').click(); await page.getByRole('button', { name: 'Start mock exam' }).click(); await page.waitForSelector('.exam');
  await page.locator('.exam .opt').nth(1).click();
  await tab(page, 'Today').click(); await tab(page, 'Exam').click();
  await expect(page.locator('.hero').filter({ hasText: 'Unfinished mock exam' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Discard' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click(); await page.waitForSelector('.exam');
  await expect(page.locator('.exam .opt.sel')).toHaveCount(1);
  await tab(page, 'Today').click(); await tab(page, 'Exam').click();
  await page.getByRole('button', { name: 'Discard' }).click();
  await expect(page.locator('.hero').filter({ hasText: 'Unfinished mock exam' })).toHaveCount(0);
});

test('f3-5 P1-1 + P1-6: keyboard focus survives re-renders; options are one tab stop with arrow keys; screens have a heading', async ({ page }) => {
  await openApp(page);
  // tab bar: the activated tab keeps the focus
  const learn = tab(page, 'Learn'); await learn.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#view h1')).toHaveText('Learn'); await expect(learn).toBeFocused();
  // practice question
  await tab(page, 'Today').click();
  await startPractice(page, true);
  await expect(page.locator('.flow h1.sr')).toHaveText(/Question 1 of/);
  expect(await page.locator('.flow .opt[tabindex="0"]').count(), 'one tab stop in the radio group').toBe(1);
  const first = page.locator('.flow .opt').first(); await first.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('.flow .opt').nth(1)).toBeFocused(); await expect(page.locator('.flow .opt').nth(1)).toHaveAttribute('aria-checked', 'true');
  expect(await page.locator('.flow .opt[tabindex="0"]').count()).toBe(1);
  await page.keyboard.press('ArrowUp'); await page.keyboard.press('ArrowUp');   // wraps to the last
  await expect(page.locator('.flow .opt').last()).toBeFocused();
  // answering with the keyboard: the chosen option keeps the focus, then Next gets it, then the next screen's heading
  await expect(page.locator('.flow .opt.sel')).toBeFocused();
  await page.locator('.actions .conf .sure').focus(); await page.keyboard.press('Enter');
  await page.waitForSelector('.fb');
  await expect(page.locator('.actions .btn.primary')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('.flow h1.sr')).toHaveText(/Question 2 of/); await expect(page.locator('.flow h1.sr')).toBeFocused();
});

test('f3-6 P1-2: reset confirmation is an alert dialog: focus goes to Cancel, Escape cancels and focus returns', async ({ page }) => {
  await openApp(page);
  await tab(page, 'Today').click(); await page.locator('#gear:visible, #tab-ajustes:visible').first().click(); await page.waitForSelector('.sett');
  const open = page.getByRole('button', { name: 'Reset progress…' });
  await open.focus(); await page.keyboard.press('Enter');
  const dlg = page.getByRole('alertdialog'); await expect(dlg).toBeVisible();
  await expect(dlg).toContainText('Are you sure?'); await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dlg).toHaveCount(0); await expect(open).toBeFocused();
  await open.click(); await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(dlg).toHaveCount(0); await expect(open).toBeFocused();
});

test('f3-7 P1-3: the danger button text has >= 4.5:1 contrast (light and dark)', async ({ page }) => {
  await openApp(page);
  await tab(page, 'Today').click(); await page.locator('#gear:visible, #tab-ajustes:visible').first().click(); await page.getByRole('button', { name: 'Reset progress…' }).click();
  const ratio = await page.evaluate(() => {
    const b = document.querySelector('.btn.danger.solid'), cs = getComputedStyle(b);
    const rgb = (s) => s.match(/[\d.]+/g).slice(0, 3).map(Number);
    const lum = (c) => { const [r, g, bl] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * r + 0.7152 * g + 0.0722 * bl; };
    const a = lum(rgb(cs.color)), z = lum(rgb(cs.backgroundColor)); return (Math.max(a, z) + 0.05) / (Math.min(a, z) + 0.05);
  });
  expect(ratio).toBeGreaterThanOrEqual(4.5);
});

test('f3-8 P1-4 + P1-5 + B-09: lang and viewport are declared; Microsoft Learn link and small buttons are >= 44px', async ({ page }, ti) => {
  await openApp(page);
  expect(await page.evaluate(() => document.documentElement.lang)).toBe('en');
  expect(await page.evaluate(() => !!document.querySelector('meta[name="viewport"]'))).toBe(true);
  const dist = fs.readFileSync(path.resolve(here, '..', '..', 'dist', 'taller-ab620.html'), 'utf8');
  expect(dist, 'the published fragment carries its viewport meta').toContain('<meta name="viewport"');
  await openFromLearn(page, 'L02');
  const link = await page.locator('a.srclink').boundingBox(); expect(link.height).toBeGreaterThanOrEqual(43.5);
  const skip = page.locator('.pretest .link').filter({ hasText: 'Skip' });
  if (await skip.count()) { const b = await skip.boundingBox(); expect(b.width).toBeGreaterThanOrEqual(43.5); expect(b.height).toBeGreaterThanOrEqual(43.5); }
});

test('f3-9 B-09 + B-10: after a wrong answer the feedback is above the Next bar and its buttons are >= 44px', async ({ page }) => {
  await openApp(page);
  await startPractice(page);
  await answerCurrentQuestion(page, false);
  await page.waitForSelector('.fb');
  await expect.poll(async () => page.evaluate(() => {
    const fb = document.querySelector('.fb').getBoundingClientRect(), a = document.querySelector('.actions').getBoundingClientRect();
    return fb.top >= -1 && (fb.bottom <= a.top + 1 || fb.top <= 24);   // whole feedback above the bar, or (when it is taller than the space) its start at the top
  }), { timeout: 5000 }).toBe(true);
  const hs = await page.evaluate(() => [...document.querySelectorAll('.fb .btn.small')].filter((b) => b.offsetParent).map((b) => b.getBoundingClientRect().height));
  hs.forEach((h) => expect(h).toBeGreaterThanOrEqual(43.5));
});

test('f3-10 B-13 + B-14: Progress counts have no stray separators and Module 0 is just "Fundamentals" everywhere', async ({ page }) => {
  await openApp(page);
  await tab(page, 'Progress').click();
  await expect(page.locator('.pcount')).not.toContainText('·');
  expect(await page.locator('.pnote').evaluate((e) => parseFloat(getComputedStyle(e).marginBottom))).toBeGreaterThanOrEqual(16);
  await expect(page.locator('.dbars .lbl').first()).toHaveText('Fundamentals');
  await tab(page, 'Learn').click();
  await expect(page.locator('.mod summary').first()).toContainText('Fundamentals'); await expect(page.locator('.mod summary').first()).not.toContainText(/Basics|Module 0/);
  const txt = await page.locator('#view').innerText(); expect(txt).not.toMatch(/Basics|Module 0/);
  await page.setViewportSize({ width: 320, height: 640 }); await tab(page, 'Progress').click(); await expectNoOverflow(page, 'progress at 320');
});

test('f3-11 B-19: the done screens say what you did and what comes next', async ({ page }) => {
  await openApp(page, SAT);
  await seedStudied(page, 8);
  await page.getByRole('button', { name: 'Mixed review' }).click(); await page.waitForSelector('.flow .opt');
  for (let i = 0; i < 60 && !(await page.locator('.done').count()); i++) {   // answer wrong on purpose
    if (await page.locator('.flow .opt').count()) { await answerCurrentQuestion(page, false); await page.waitForSelector('.fb'); await page.locator('.actions .btn.primary').click(); await sleep(100); } else await sleep(100);
  }
  await page.waitForSelector('.done');
  await expect(page.locator('.done')).toContainText('Correct answers: 0 of');
  await expect(page.locator('.done')).toContainText('Worth another look:');
  await page.getByRole('button', { name: 'See my weakest topics' }).click();
  await expect(page.locator('#view h1')).toHaveText('Progress');
  // Sunday: cards (a day like any other)
  await openApp(page, SUN);
  await page.getByRole('button', { name: 'Review cards' }).click(); {   if (await page.locator('.fcard').count()) { await finishFlow(page); await expect(page.locator('.done')).toContainText('Cards rated:'); } }
});

test('f3-12 B-20 + B-21: no keyboard hints on touch screens; the toast sits at the top, away from the buttons', async ({ page }, ti) => {
  await openApp(page);
  await startPractice(page);
  await page.locator('.flow .opt').first().click();
  const kbd = await page.locator('.actions kbd').first().isVisible().catch(() => false);
  if (ti.project.name.indexOf('phone') === 0) expect(kbd, 'no S / N hints on a phone').toBe(false); else expect(kbd).toBe(true);
  await page.locator('.flow .ftop .link').click();
  await page.locator('#gear:visible, #tab-ajustes:visible').first().click();
  await page.getByRole('button', { name: 'Copy backup' }).click();
  await expect(page.locator('#toast.show')).toBeVisible();
  const r = await page.locator('#toast').boundingBox(); expect(r.y).toBeLessThan(80);
});
