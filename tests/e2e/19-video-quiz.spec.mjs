// Exam-room questions inside the lesson video: the player pauses at quiz[i].at, shows A/B/C buttons, records the answer, resumes.
import { test, expect, openApp, openFromLearn, lsGet, audioState, waitMeta, expectNoOverflow } from './helpers.mjs';

const ID = 'F01', AT = 3;
const ANS = 9;
const QUIZ = [{ at: AT, answerAt: ANS, question: 'Which tool lets you build an agent without code?', options: ['Power Automate desktop', 'Copilot Studio', 'Azure DevOps'], right: 1, trap: 0 }];
const INJECT = `(() => { var v; Object.defineProperty(window, 'AB620_VIDEO', { configurable: true, get: () => v,
  set: (x) => { v = x; if (x && x.F01) x.F01.quiz = ${JSON.stringify(QUIZ)}; } }); })();`;

async function openVideo(page) {
  await page.addInitScript(INJECT);
  await openApp(page);
  await openFromLearn(page, ID); await waitMeta(page);
}
const setT = (page, t) => page.evaluate((x) => { window.__audios[window.__audios.length - 1].currentTime = x; }, t);
const vid = (page) => page.locator('.pl-qz');
async function playToQuiz(page) { await setT(page, AT - 1.2); await page.locator('.pl-play').click(); await expect(vid(page)).toBeVisible({ timeout: 15000 }); }
const stats = async (page) => ((await lsGet(page, 'quiz')) || {}).stats || {};
async function tapSizes(page) { return page.evaluate(() => [...document.querySelectorAll('.pl-qz button')].map((b) => Math.round(b.getBoundingClientRect().height))); }

test('19-1 pauses at the question, shows A/B/C and Skip with 44px targets, no overflow', async ({ page }) => {
  await openVideo(page);
  await playToQuiz(page);
  const s = await audioState(page);
  expect(s.paused).toBe(true); expect(s.t).toBeGreaterThanOrEqual(AT); expect(s.t).toBeLessThan(AT + 1.5);
  await expect(page.locator('.pl-qz-opt')).toHaveCount(3);
  await expect(page.locator('.pl-qz-opt').nth(1)).toContainText('Copilot Studio');
  await expect(page.locator('.pl-qz-skip')).toBeVisible();
  await expect(vid(page)).toHaveAttribute('role', 'dialog');
  await expect(page.locator('.pl-qz-opt').first()).toBeFocused();
  await expect(page.locator('.pl-qz-fb')).toHaveAttribute('aria-live', 'polite');
  for (const h of await tapSizes(page)) expect(h).toBeGreaterThanOrEqual(44);
  await expectNoOverflow(page);
  const b = await vid(page).boundingBox(), v = await page.locator('.pl-stage').boundingBox();
  expect(b.x).toBeGreaterThanOrEqual(v.x - 1); expect(b.x + b.width).toBeLessThanOrEqual(v.x + v.width + 1);
});

test('19-2 correct answer: green feedback, recorded, closes and the video resumes', async ({ page }) => {
  await openVideo(page); await playToQuiz(page);
  await page.locator('.pl-qz-opt').nth(1).click();
  await expect(page.locator('.pl-qz-fb')).toHaveText('Correct');
  await expect(page.locator('.pl-qz-fb')).toHaveClass(/\bok\b/);
  await expect(page.locator('.pl-qz-opt').nth(1)).toHaveClass(/\bright\b/);
  const st = (await stats(page))['vq-F01-0']; expect(st.seen).toBe(1); expect(st.correct).toBe(1);
  await expect(vid(page)).toBeHidden({ timeout: 4000 });
  await page.waitForFunction((t) => { const a = window.__audios[window.__audios.length - 1]; return !a.paused && a.currentTime > t + 0.5; }, AT, { timeout: 10000 });
});

test('19-3 the trap: red feedback marks the right option, recorded as wrong', async ({ page }) => {
  await openVideo(page); await playToQuiz(page);
  await page.locator('.pl-qz-opt').nth(0).click();
  await expect(page.locator('.pl-qz-fb')).toContainText("That's the trap");
  await expect(page.locator('.pl-qz-fb')).toHaveClass(/\bbad\b/);
  await expect(page.locator('.pl-qz-opt').nth(1)).toHaveClass(/\bright\b/);
  await expect(page.locator('.pl-qz-opt').nth(0)).toHaveClass(/\bwrong\b/);
  const st = (await stats(page))['vq-F01-0']; expect(st.seen).toBe(1); expect(st.correct).toBe(0);
  await expect(vid(page)).toBeHidden({ timeout: 4000 });
});

test('19-4 Skip and Escape resume without recording; keys 1-3 answer', async ({ page }) => {
  await openVideo(page); await playToQuiz(page);
  await page.locator('.pl-qz-skip').click();
  await expect(vid(page)).toBeHidden();
  await page.waitForFunction(() => !window.__audios[window.__audios.length - 1].paused, null, { timeout: 10000 });
  expect(Object.keys(await stats(page))).not.toContain('vq-F01-0');
  // new session: reload, Escape skips
  await page.reload(); await page.waitForSelector('#view > *'); await openFromLearn(page, ID); await waitMeta(page); await playToQuiz(page);
  await page.keyboard.press('Escape');
  await expect(vid(page)).toBeHidden();
  expect(Object.keys(await stats(page))).not.toContain('vq-F01-0');
  await page.reload(); await page.waitForSelector('#view > *'); await openFromLearn(page, ID); await waitMeta(page); await playToQuiz(page);
  await page.keyboard.press('2');
  await expect(page.locator('.pl-qz-fb')).toHaveText('Correct');
  expect((await stats(page))['vq-F01-0'].correct).toBe(1);
});

test('19-5 offered once per session; seeking past or back does not pause again', async ({ page }) => {
  await openVideo(page); await playToQuiz(page);
  await page.locator('.pl-qz-skip').click(); await expect(vid(page)).toBeHidden();
  await setT(page, AT - 1.2);
  await page.waitForFunction((t) => { const a = window.__audios[window.__audios.length - 1]; return !a.paused && a.currentTime > t + 1; }, AT, { timeout: 10000 });
  await expect(vid(page)).toBeHidden();
});

test('19-6 seeking beyond the question does not pause', async ({ page }) => {
  await openVideo(page);
  await setT(page, AT + 4);
  await page.locator('.pl-play').click();
  await page.waitForFunction((t) => { const a = window.__audios[window.__audios.length - 1]; return !a.paused && a.currentTime > t + 2; }, AT + 4, { timeout: 10000 });
  await expect(vid(page)).toBeHidden();
});

test('19-7 works in full screen (turned on a phone) with targets inside the screen', async ({ page }) => {
  await openVideo(page);
  await page.locator('.pl-vb[aria-label="Full screen"]').click();
  await expect(page.locator('#player')).toHaveClass(/\bfs\b/);
  await playToQuiz(page);
  for (const h of await tapSizes(page)) expect(h).toBeGreaterThanOrEqual(44);
  const p = await page.locator('#player').boundingBox();
  for (const sel of ['.pl-qz-opt', '.pl-qz-skip']) {
    const n = await page.locator(sel).count();
    for (let i = 0; i < n; i++) {
      const b = await page.locator(sel).nth(i).boundingBox();
      expect(b.x).toBeGreaterThanOrEqual(p.x - 1); expect(b.y).toBeGreaterThanOrEqual(p.y - 1);
      expect(b.x + b.width).toBeLessThanOrEqual(p.x + p.width + 1); expect(b.y + b.height).toBeLessThanOrEqual(p.y + p.height + 1);
    }
  }
  await page.locator('.pl-qz-opt').nth(1).click();
  await expect(page.locator('.pl-qz-fb')).toHaveText('Correct');
  await expect(vid(page)).toBeHidden({ timeout: 4000 });
  await expect(page.locator('#player')).toHaveClass(/\bfs\b/);   // Escape inside the panel never leaves full screen
});

test('19-8 after answering, playback jumps to answerAt (skips the Decide sentence and silence)', async ({ page }) => {
  await openVideo(page); await playToQuiz(page);
  await page.locator('.pl-qz-opt').nth(1).click();
  await expect(vid(page)).toBeHidden({ timeout: 4000 });
  await page.waitForFunction((t) => { const a = window.__audios[window.__audios.length - 1]; return !a.paused && a.currentTime >= t - 0.05; }, ANS, { timeout: 10000 });
});
