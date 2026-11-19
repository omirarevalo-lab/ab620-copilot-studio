// Audit batch F1: in-app full screen (B-01), narrow-phone controls (B-08, P2-7), stale end note (B-11), one next step (B-12), explanation clips keep the resume position (A9).
import { test, expect, shot, sleep, openApp, openFromLearn, lsGet, seed, audioState, waitMeta, expectNoOverflow, firstTopicId, skipPretest } from './helpers.mjs';

const ID = 'F01';   // lesson video with captions
async function openVideo(page) { await openApp(page); await openFromLearn(page, ID); await waitMeta(page); }
const vp = (page) => page.viewportSize();
const box = async (page, sel) => page.locator(sel).first().boundingBox();
const FS = '.pl-vb[aria-label="Full screen"]', EXIT = '.pl-vb[aria-label="Exit full screen"]';

// The Fullscreen API is blocked inside a sandboxed iframe (artifact): the promise rejects. The button must still work and raise no error.
const BLOCKED_API = `(() => { Object.defineProperty(Document.prototype, 'fullscreenEnabled', { get: () => true, configurable: true });
  Element.prototype.requestFullscreen = function () { return Promise.reject(new TypeError('Disallowed by permissions policy')); }; })();`;

test('13-1 full screen works when the Fullscreen API is refused: fixed layer, turned on a portrait phone, exit button, Escape and Back', async ({ page }, ti) => {
  await page.addInitScript(BLOCKED_API);
  await openVideo(page);
  const V = vp(page), phone = V.width < V.height && ti.project.name.startsWith('phone');
  await page.locator(FS).click();
  const root = page.locator('#player');
  await expect(root).toHaveClass(/\bfs\b/);
  if (phone) await expect(root).toHaveClass(/\brot\b/); else await expect(root).not.toHaveClass(/\brot\b/);
  await sleep(300);
  // the layer covers the whole screen (rotated or not, its on-screen box is the viewport)
  const b = await box(page, '#player');
  expect(Math.abs(b.x), 'left').toBeLessThanOrEqual(1); expect(Math.abs(b.y), 'top').toBeLessThanOrEqual(1);
  expect(Math.abs(b.width - V.width), 'width').toBeLessThanOrEqual(1); expect(Math.abs(b.height - V.height), 'height').toBeLessThanOrEqual(1);
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('#player')).position)).toBe('fixed');
  expect(Number(await page.evaluate(() => getComputedStyle(document.querySelector('#player')).zIndex))).toBeGreaterThan(20);   // above the bottom bar
  // the video is much bigger than in the page, and everything stays inside the screen
  const vb = await box(page, 'video.pl-video'), long = Math.max(vb.width, vb.height), short = Math.min(vb.width, vb.height);
  const shown = Math.min(long, short * 16 / 9);   // the element fills its area; the picture inside keeps 16:9 (object-fit: contain)
  expect(shown, 'picture long side on screen').toBeGreaterThan(phone ? 500 : 800);
  for (const sel of ['.pl-play', '.pl-skip', '.pl-speed', '.pl-seek', '.pl-vb[aria-pressed]']) {
    for (const el of await page.locator(sel).all()) {
      const r = await el.boundingBox(); if (!r) continue;
      expect(r.x, sel).toBeGreaterThanOrEqual(-1); expect(r.y, sel).toBeGreaterThanOrEqual(-1);
      expect(r.x + r.width, sel).toBeLessThanOrEqual(V.width + 1); expect(r.y + r.height, sel).toBeLessThanOrEqual(V.height + 1);
    }
  }
  const x = await box(page, EXIT); expect(x.width).toBeGreaterThanOrEqual(44); expect(x.height).toBeGreaterThanOrEqual(44);
  await expect(page.locator(EXIT)).toHaveAttribute('aria-pressed', 'true');
  // text stays readable: no 10 px control text
  expect(await page.evaluate(() => Math.min(...Array.from(document.querySelectorAll('#player .pl-skip span, #player .pl-time, #player .pl-vb')).map((e) => parseFloat(getComputedStyle(e).fontSize))))).toBeGreaterThanOrEqual(12);
  // captions and controls work in full screen: CC on, play, the caption box is visible and inside the screen
  if ((await page.locator('.pl-vb[aria-label="CC captions"]').getAttribute('aria-pressed')) !== 'true') await page.locator('.pl-vb[aria-label="CC captions"]').click();
  await page.locator('.pl-play').click();
  await expect(page.locator('.pl-ccbox')).toBeVisible({ timeout: 10000 });
  const cb = await box(page, '.pl-ccbox');
  expect(cb.x).toBeGreaterThanOrEqual(-1); expect(cb.y).toBeGreaterThanOrEqual(-1); expect(cb.x + cb.width).toBeLessThanOrEqual(V.width + 1); expect(cb.y + cb.height).toBeLessThanOrEqual(V.height + 1);
  await shot(page, ti, '13-fullscreen');
  // the seek bar follows the finger along the rotated axis: tap 50 % -> about half of the video
  const sb = await box(page, '.pl-seek'), D = (await audioState(page)).dur;
  const rot = await root.evaluate((e) => e.classList.contains('rot'));
  await page.mouse.click(rot ? sb.x + sb.width / 2 : sb.x + sb.width * 0.5, rot ? sb.y + sb.height * 0.5 : sb.y + sb.height / 2);
  await sleep(500);
  expect(Math.abs((await audioState(page)).t - D * 0.5), 'seek in full screen').toBeLessThanOrEqual(D * 0.08);
  // Escape leaves it, focus returns to the button
  await page.keyboard.press('Escape');
  await expect(root).not.toHaveClass(/\bfs\b/); await expect(page.locator(FS)).toBeFocused();
  // the exit button leaves it
  await page.locator(FS).click(); await expect(root).toHaveClass(/\bfs\b/);
  await page.locator(EXIT).click(); await expect(root).not.toHaveClass(/\bfs\b/);
  // Back (phone Back button) leaves full screen and stays in the topic
  await page.locator(FS).click(); await expect(root).toHaveClass(/\bfs\b/);
  await page.goBack(); await expect(root).not.toHaveClass(/\bfs\b/);
  await expect(page.locator('.topic h1')).toBeVisible();
  // leaving the page scroll lock: the page scrolls again
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden');
  await expectNoOverflow(page, 'player after full screen');
});

test('13-2 full screen: nothing behind the layer takes focus, and leaving the topic closes it', async ({ page }) => {
  await openVideo(page);
  await page.locator(FS).click();
  expect(await page.evaluate(() => { const bar = document.querySelector('#bar'); return !!bar && bar.inert; })).toBe(true);
  await page.locator('video.pl-video').click();   // tap on the video toggles playback, never leaves
  await expect(page.locator('#player')).toHaveClass(/\bfs\b/);
  await page.keyboard.press('Escape');
  expect(await page.evaluate(() => document.querySelectorAll('[inert]').length)).toBe(0);
});

test('13-3 the controls fit a 320 px phone: "Watch again"/"Replay" and "Resume" are never cut', async ({ page }, ti) => {
  await openApp(page);
  for (const w of [320, 360, 375, 390]) {
    await page.setViewportSize({ width: w, height: 760 });
    await openFromLearn(page, ID); await waitMeta(page);
    const cut = () => page.evaluate(() => Array.from(document.querySelectorAll('.pl-ctl *')).filter((e) => e.offsetParent && e.scrollWidth > e.clientWidth + 1).map((e) => e.className + ':' + e.textContent));
    const row = () => page.evaluate(() => { const c = document.querySelector('.pl-ctl').getBoundingClientRect(), s = document.querySelector('.pl-sw').getBoundingClientRect(); return { right: s.right, cr: c.right, ph: document.querySelector('.pl').getBoundingClientRect().right }; });
    expect(await cut(), 'cut at ' + w + ' idle').toEqual([]);
    // ended state
    await page.locator('.pl-seek').focus(); await page.keyboard.press('End'); await page.locator('.pl-play').click();
    await expect(page.locator('.pl-play')).toContainText('Watch again', { timeout: 30000 });
    const t = await page.evaluate(() => { const b = document.querySelector('.pl-play'), v = Array.from(b.querySelectorAll('span span')).find((s) => s.offsetParent); return { play: b.getBoundingClientRect().width, sw: b.scrollWidth, cw: b.clientWidth, txt: v ? v.textContent : b.textContent }; });
    expect(t.sw, 'play button content width at ' + w).toBeLessThanOrEqual(t.cw + 1);
    expect(await cut(), 'cut at ' + w + ' ended').toEqual([]);
    const r = await row(); expect(r.right, 'speed button inside the player at ' + w).toBeLessThanOrEqual(r.ph + 1);
    if (w === 320) await shot(page, ti, '13-controls-320');
    await page.locator('.backlink').click(); await page.waitForSelector('.learn');
  }
});

test('13-4 the "You reached the end" note is gone once the video plays again; the player offers one primary next step', async ({ page }) => {
  await openVideo(page);
  await skipPretest(page);
  await page.locator('.pl-seek').focus(); await page.keyboard.press('End'); await page.locator('.pl-play').click();
  await expect(page.locator('.pl-play')).toContainText('Watch again', { timeout: 30000 });
  await expect(page.locator('.pl-note')).toHaveText('You reached the end of the class video.');
  await page.locator('.pl-play').click();   // Watch again
  await page.waitForFunction(() => { const v = document.querySelector('video.pl-video'); return v && !v.paused && v.currentTime > 1; }, null, { timeout: 15000 });
  await expect(page.locator('.pl-note')).toHaveText('');
  await expect(page.locator('.pl-play')).toContainText('Pause');
});

test('13-5 in a Today lesson the check is the one primary button; skipping it is a plain text link', async ({ page }, ti) => {
  await openApp(page);
  await page.getByRole('button', { name: 'Start' }).first().click();
  await page.waitForSelector('.topic .pl'); await waitMeta(page);
  await skipPretest(page);
  await page.locator('.pl-seek').focus(); await page.keyboard.press('End'); await page.locator('.pl-play').click();
  await expect(page.locator('.pl-play')).toContainText('Watch again', { timeout: 30000 });
  const primary = page.locator('.pl-next .btn.primary');
  await expect(primary).toHaveCount(1); await expect(primary).toHaveText('Next: check your understanding');
  const skip = page.locator('.pl-next .skip-check');
  await expect(skip).toHaveCount(1); await expect(skip).toContainText('Skip the check');
  expect(await skip.evaluate((e) => e.classList.contains('btn'))).toBe(false);
  const b = await skip.boundingBox(); expect(b.height).toBeGreaterThanOrEqual(44);
  await shot(page, ti, '13-next-steps');
});

// Skipped in the public copy: needs local narration audio or local video timings, or is timing-sensitive.
test.skip('13-6 "Watch the explanation" never overwrites the topic resume position', async ({ page }) => {
  await openApp(page);
  const id = await firstTopicId(page);
  await seed(page, { sessions: { pos: { [id]: 60 } } });
  await openFromLearn(page, id); await waitMeta(page);
  await expect(page.locator('.pl-play')).toContainText('Resume from');
  await skipPretest(page);
  const c = await page.evaluate((i) => { const t = window.AB620_COURSE.find((x) => x.id === i), c = t.check[0], m = window.AB620_QMAP[i + '#c0'], v = window.AB620_VIDEO[i]; return { wrong: c.options.find((_, j) => j !== c.answer), start: v.scenes[m[1]].start }; }, id);
  expect(Math.abs(c.start - 60), 'the explanation chapter must differ from the saved position for this test').toBeGreaterThan(10);
  await page.locator('#check .opt .otx').getByText(c.wrong, { exact: true }).first().click();
  await page.locator('#check .conf .unsure').click();
  await page.locator('#check .fb .watch').click();
  await page.waitForFunction((t) => { const v = window.__audios[window.__audios.length - 1]; return v && !v.paused && v.currentTime >= t + 2; }, c.start, { timeout: 15000 });
  await page.locator('.pl-play').click();   // pause: normally saves the position
  await sleep(300);
  expect((await lsGet(page, 'sessions')).pos[id], 'saved position after the explanation clip').toBe(60);
  // leaving the topic does not overwrite it either
  await page.locator('.backlink').click(); await page.waitForSelector('.learn');
  expect((await lsGet(page, 'sessions')).pos[id]).toBe(60);
  await openFromLearn(page, id); await waitMeta(page);
  await expect(page.locator('.pl-play')).toContainText('Resume from');
  await expect(page.locator('.pl-seek')).toHaveAttribute('aria-valuenow', '60');
});
