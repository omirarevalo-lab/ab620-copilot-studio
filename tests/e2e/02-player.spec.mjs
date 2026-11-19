// Cases 2-5: speed without restart, seek, resume, green when finished.
import { test, expect, shot, openApp, openFromLearn, tab, openAll, lsGet, audioIds, topicInfo, seekVal, seekMax, audioState, waitMeta, dragSeek, playAndWait, curChapterIndex, answerCheck, sleep } from './helpers.mjs';

const ID = 'F02';   // narrated-audio topic (F01 has a lesson video: see 07-video.spec.mjs)
async function openNarrated(page, id) {
  await openApp(page);
  expect(await audioIds(page)).toContain(id);
  await openFromLearn(page, id); await waitMeta(page);
}

// Skipped in the public copy: needs local narration audio or local video timings, or is timing-sensitive.
test.skip('02 speed change does not restart: stays near 40 s, keeps playing, same src, rate 1.5', async ({ page }, ti) => {
  await openNarrated(page, ID);
  const D = await seekMax(page); expect(D).toBeGreaterThan(60);
  await playAndWait(page);
  await dragSeek(page, 40 / D); await sleep(500);
  const a0 = await audioState(page); expect(Math.abs(a0.t - 40)).toBeLessThanOrEqual(3); expect(a0.paused).toBe(false);
  await page.locator('.pl-speed').click(); await shot(page, ti, '02-speed-menu');
  await page.locator('.pl-mi', { hasText: '1.5' }).click();
  const a1 = await audioState(page);
  expect(Math.abs(a1.t - a0.t), 'time right after the speed change').toBeLessThanOrEqual(2);
  expect(a1.rate).toBe(1.5); expect(a1.paused).toBe(false); expect(a1.src).toBe(a0.src);
  await sleep(1500);
  const a2 = await audioState(page);
  expect(a2.t).toBeGreaterThan(a1.t + 0.8); expect(a2.t).toBeLessThan(a1.t + 5);
  expect(a2.src).toBe(a0.src); expect(a2.rate).toBe(1.5);
  await expect(page.locator('.pl-speed')).toContainText('1.5');
  expect(await page.evaluate(() => window.__audios.length), 'one audio element, never recreated').toBe(1);
  expect((await lsGet(page, 'settings')).voiceRate).toBe(1.5);
  await shot(page, ti, '02-after-speed');
});

// Skipped in the public copy: needs local narration audio or local video timings, or is timing-sensitive.
test.skip('03 seek: +/-10 s buttons, arrow keys, chapter keys, drag to 50 %, chapter rows', async ({ page }, ti) => {
  await openNarrated(page, ID);
  const info = await topicInfo(page, ID), scenes = await page.evaluate((i) => window.AB620_AUDIO[i].scenes, ID), D = await seekMax(page);
  const near = (a, b, tol) => expect(Math.abs(a - b), a + ' vs ' + b).toBeLessThanOrEqual(tol);
  const t = async () => (await audioState(page)).t;
  await dragSeek(page, 0.3); await sleep(300);
  const t0 = await t(); near(t0, D * 0.3, D * 0.04);
  await page.locator('.pl-skip').nth(1).click(); await sleep(250); near(await t(), t0 + 10, 1);
  await page.locator('.pl-skip').nth(0).click(); await sleep(250); near(await t(), t0, 1);
  await page.locator('h1').click(); const t1 = await t();
  await page.keyboard.press('ArrowRight'); await sleep(250); near(await t(), t1 + 10, 1);
  await page.keyboard.press('ArrowLeft'); await sleep(250); near(await t(), t1, 1);
  // chapter keys
  const ci = await curChapterIndex(page);
  await page.keyboard.press('.'); await sleep(250); near(await t(), scenes[Math.min(scenes.length - 1, ci + 1)].start, 1);
  await page.keyboard.press(','); await sleep(250); expect(await curChapterIndex(page)).toBeLessThanOrEqual(ci + 1);
  // drag to 50 %: time, stage title, highlighted row all match the scene table
  await dragSeek(page, 0.5); await sleep(400);
  const tt = await t(); near(tt, D * 0.5, D * 0.04);
  const idx = scenes.filter((s) => s.start <= tt).length - 1;
  await expect(page.locator('.pl-title')).toHaveText(info.scenes[idx]);
  expect(await curChapterIndex(page)).toBe(idx);
  await expect(page.locator('.chrow.cur .ch-x')).toHaveText(info.scenes[idx]);
  await expect(page.locator('.pl-chap')).toHaveText('Chapter ' + (idx + 1) + ' of ' + info.n);
  await shot(page, ti, '03-after-drag');
  // click a chapter row -> jumps to its start
  const target = Math.min(info.n - 1, 2);
  await page.locator('.chrow').nth(target).click(); await sleep(500);
  near(await t(), scenes[target].start, 2);
  await expect(page.locator('.pl-title')).toHaveText(info.scenes[target]);
  expect(await curChapterIndex(page)).toBe(target);
  await shot(page, ti, '03-chapter-click');
});

// Skipped in the public copy: needs local narration audio or local video timings, or is timing-sensitive.
test.skip('04 resume: position restored after leaving the screen and after reload, with "Resume" label', async ({ page }, ti) => {
  await openNarrated(page, ID);
  const D = await seekMax(page);
  await dragSeek(page, 30 / D); await sleep(300);
  await playAndWait(page);
  await page.locator('.pl-play').click(); await sleep(300);          // pause -> saves position
  const saved = (await audioState(page)).t; expect(Math.abs(saved - 31)).toBeLessThanOrEqual(5);
  expect((await lsGet(page, 'sessions')).pos[ID]).toBeGreaterThan(25);
  await page.locator('.backlink').click(); await page.waitForSelector('.learn');
  await openFromLearn(page, ID); await sleep(500);
  expect(Math.abs((await seekVal(page)) - saved)).toBeLessThanOrEqual(2);
  await expect(page.locator('.pl-play')).toContainText('Resume from'); await shot(page, ti, '04-resume-after-leave');
  await page.reload(); await page.waitForSelector('#view > *');
  await openFromLearn(page, ID); await sleep(500);
  expect(Math.abs((await seekVal(page)) - saved)).toBeLessThanOrEqual(2);
  await expect(page.locator('.pl-play')).toContainText('Resume from'); await shot(page, ti, '04-resume-after-reload');
  const a = await audioState(page); expect(Math.abs(a.t - saved)).toBeLessThanOrEqual(2);
});

// Skipped in the public copy: needs local narration audio or local video timings, or is timing-sensitive.
test.skip('05 green when finished (ends): chapters, badge, Learn counter and row, Progress; mastered only after the check; next step under the player (R2, R5)', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, '05-' + n, f);
  await openNarrated(page, ID);
  const info = await topicInfo(page, ID);
  await expect(page.locator('.pl-next')).toBeHidden();                       // nothing to push before watching
  await page.locator('.pl-seek').focus(); await page.keyboard.press('End'); await page.locator('.pl-play').click();
  await expect(page.locator('.pl-play')).toContainText('Watch again', { timeout: 30000 });
  await expect(page.locator('.chrow.watched')).toHaveCount(info.n);
  await expect(page.locator('.tbadges .wchk')).toHaveCount(1); await expect(page.locator('.tbadges .mpill')).toHaveCount(0);
  // R2: a clear next action under the player
  const next = page.locator('.pl-next .btn', { hasText: 'Next: check your understanding' });
  await expect(next).toBeVisible(); await S('ended-next-step');
  await next.click(); await sleep(700);
  await expect(page.locator('#check')).toBeInViewport({ ratio: 0.3 });
  await expect(page.locator('#check .opt').first()).toBeFocused(); await S('after-next-step');
  // watched is not mastered
  expect((await lsGet(page, 'sessions')).watched[ID]).toBeTruthy();
  await answerCheck(page, ID);
  await expect(page.locator('.tbadges .mpill')).toHaveText('Passed');
  await expect(page.locator('.pl-next')).toBeHidden();                       // check passed (re-check not due yet): nothing left to push
  // R5: Learn shows the green check + module counter
  await page.locator('.backlink').click(); await page.waitForSelector('.learn'); await openAll(page);
  const row = page.locator('.trow').filter({ hasText: info.title });
  await expect(row.locator('.wchk')).toHaveCount(1); await expect(row.locator('.mpill')).toHaveCount(1);
  const mod = page.locator('details.mod').first();
  await expect(mod.locator('.mod-c')).toHaveText('1/8'); await S('learn-after-watch');
  // Progress counts
  await tab(page, 'Progress').click(); await page.waitForSelector('.prog');
  await expect(page.locator('.pcount')).toContainText('Watched 1/49'); await expect(page.locator('.pcount')).toContainText('Passed 1');
  await expect(page.locator('.pcount')).toContainText('Mastered 0/49');
  await S('progress');
});

// Skipped in the public copy: needs local narration audio or local video timings, or is timing-sensitive.
test.skip('05b watched also when playback passes 90 % (without reaching the end); not mastered', async ({ page }, ti) => {
  await openNarrated(page, ID);
  const info = await topicInfo(page, ID), D = await seekMax(page);
  await dragSeek(page, 0.92); await sleep(300);
  await page.locator('.pl-play').click();
  await expect(page.locator('.chrow.watched')).toHaveCount(info.n, { timeout: 10000 });
  const a = await audioState(page); expect(a.ended).toBe(false);
  expect(a.t / D).toBeLessThan(1);
  await page.locator('.pl-play').click();
  expect((await lsGet(page, 'sessions')).watched[ID]).toBeTruthy();
  await expect(page.locator('.tbadges .mpill')).toHaveCount(0);
  await shot(page, ti, '05b-watched-at-90');
});
