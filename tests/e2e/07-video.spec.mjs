// Lesson video (MP4 from tools/video): F01 plays in the same player as narrated audio.
import { test, expect, openApp, openFromLearn, lsGet, audioState, waitMeta, expectNoOverflow, expectTapTargets } from './helpers.mjs';

const ID = 'F01';
async function openVideo(page) {
  await openApp(page);
  expect(await page.evaluate((i) => !!(window.AB620_VIDEO && window.AB620_VIDEO[i]), ID)).toBe(true);
  await openFromLearn(page, ID); await waitMeta(page);
}

test('07-1 F01 shows the lesson video (not the scene stage) and plays it', async ({ page }, ti) => {
  await openVideo(page);
  await expect(page.locator('.pl-stage.video video.pl-video')).toBeVisible();
  await expect(page.locator('.pl-stage .pl-sc')).toBeHidden();
  const s0 = await audioState(page);
  expect(s0.src).toMatch(/video\/F01\.mp4$/);
  const poster = await page.locator('video.pl-video').getAttribute('poster'); expect(poster).toMatch(/\.jpg$/);
  expect((await page.request.get(new URL(poster, page.url()).href)).status(), 'poster served').toBe(200);
  await page.locator('.pl-play').click();
  await page.waitForFunction(() => { const v = document.querySelector('video.pl-video'); return v && !v.paused && v.currentTime > 1; }, null, { timeout: 15000 });
  await expect(page.locator('.pl-play')).toContainText('Pause');
  await expectNoOverflow(page); await expectTapTargets(page, ti, 'video player');
});

test('07-2 chapters seek to the video scene starts; speed changes without reloading', async ({ page }) => {
  await openVideo(page);
  const starts = await page.evaluate((i) => window.AB620_VIDEO[i].scenes.map((s) => s.start), ID);
  await page.locator('.chrow').nth(2).click();
  await page.waitForFunction((t) => { const v = document.querySelector('video.pl-video'); return v && v.currentTime >= t - 0.5 && !v.paused; }, starts[2], { timeout: 15000 });
  await expect(page.locator('.chrow').nth(2)).toHaveClass(/cur/);
  const before = await audioState(page);
  await page.locator('.pl-speed').click(); await page.locator('.pl-mi', { hasText: '1.5×' }).click();
  const after = await audioState(page);
  expect(after.rate).toBe(1.5); expect(after.src).toBe(before.src);
  expect(Math.abs(after.t - before.t)).toBeLessThan(3);
  expect(await page.evaluate(() => window.__audios.length), 'one media element, never recreated').toBe(1);
});

test('07-3 captions button shows the current sentence over the video and is remembered', async ({ page }) => {
  await openVideo(page);
  const cc = page.locator('.pl-vb[aria-label="CC captions"]');
  await expect(cc).toHaveAttribute('aria-pressed', 'false');
  await cc.click();
  await expect(cc).toHaveAttribute('aria-pressed', 'true');
  await page.evaluate(() => { const v = document.querySelector('video.pl-video'); v.currentTime = 10; });
  await expect(page.locator('.pl-ccbox')).toBeVisible();
  const want = await page.evaluate(() => window.AB620_VIDEO.F01.cues.find((c) => 10 >= c[0] && 10 < c[1])[2]);
  await expect(page.locator('.pl-ccbox')).toHaveText(want);
  await page.locator('.pl-vb[aria-label="CC captions"]').click();
  await expect(page.locator('.pl-ccbox')).toBeHidden();
  expect((await lsGet(page, 'settings')).cc).toBe(false);
});

test('07-4 watched (green) when the video passes 90 %', async ({ page }) => {
  await openVideo(page);
  await page.evaluate(() => { const v = document.querySelector('video.pl-video'); v.currentTime = v.duration * 0.93; });
  await page.locator('.pl-play').click();
  await page.waitForFunction(() => !!JSON.parse(localStorage.getItem('ab620.v1.sessions') || '{}').watched?.F01, null, { timeout: 15000 });
  await expect(page.locator('.chrow.watched').first()).toBeVisible();
});
