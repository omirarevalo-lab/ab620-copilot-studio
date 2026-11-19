// Cases 9, 10 and 11: Progress + Settings, device-voice fallback player, layout at every viewport.
import { test, expect, shot, openApp, openFromLearn, openAll, tab, seed, seedQuiz, lsGet, topicInfo, stubSpeech, injectBeforeApp, curChapterIndex, seekVal, seekMax,
  expectNoOverflow, expectTapTargets, layoutProblems, sleep, seedStudied } from './helpers.mjs';

const lum = (rgb) => { const m = rgb.match(/[\d.]+/g).map(Number); return m[0] + m[1] + m[2]; };

test('09a Progress renders with data', async ({ page }, ti) => {
  await openApp(page);
  await seed(page, { sessions: { watched: { F01: 1, F02: 2, F03: 3 }, checks: { F01: { ok: 3, n: 3, at: 1 }, F02: { ok: 1, n: 3, at: 1 } }, lessonsDone: { F01: { at: 1 } } } });
  await seedQuiz(page, 100);   // 20 skills answered: enough for the estimate (>= 30 % of the skills)
  await tab(page, 'Progress').click(); await page.waitForSelector('.prog');
  await expect(page.locator('.pcount')).toContainText('Watched 3/49'); await expect(page.locator('.pcount')).toContainText('Mastered 1/49');
  await expect(page.locator('.prog .dbars .drow').first()).toBeVisible();
  const modRows = await page.evaluate(() => window.AB620_LOGIC.modules().length);
  await expect(page.locator('.panel').filter({ hasText: 'Course progress' }).locator('.drow')).toHaveCount(modRows);
  await expect(page.locator('.score-n b')).toHaveText(/^\d+$/);
  await expect(page.locator('.weak li')).toHaveCount(3);
  if (ti.project.name.startsWith('phone')) { const bb = await page.locator('.weak li .btn').first().boundingBox(); expect(bb.height, 'Review label stays on one line').toBeLessThanOrEqual(48); }
  await expectNoOverflow(page, 'Progress'); await expectTapTargets(page, ti, 'Progress'); await shot(page, ti, '09a-progress', true);
  await page.locator('.weak li').first().getByRole('button', { name: 'Review' }).click(); await page.waitForSelector('.topic .pl');
  await expect(page.locator('.backlink')).toHaveText('‹ Progress');
});

test('09b Settings: theme switch (light / dark / auto), exam date reflected in Today, voice select, reset with in-app confirmation', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, '09b-' + n, f);
  await stubSpeech(page, 1000);
  await openApp(page);
  await page.locator('#gear:visible, #tab-ajustes:visible').first().click(); await page.waitForSelector('.sett');
  await expectNoOverflow(page, 'Settings'); await expectTapTargets(page, ti, 'Settings'); await S('settings');
  const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const attr = () => page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const theme = page.locator('#f-theme');
  await theme.selectOption('light'); expect(await attr()).toBe('light'); const light = lum(await bg());
  await theme.selectOption('dark'); expect(await attr()).toBe('dark'); const dark = lum(await bg());
  expect(light).toBeGreaterThan(dark + 300); await S('dark-theme');
  expect((await lsGet(page, 'settings')).theme).toBe('dark');
  await theme.selectOption('auto'); expect(await attr()).toBeNull();
  const auto = lum(await bg()); const projDark = ti.project.name.endsWith('dark');
  expect(projDark ? auto < light - 300 : auto > dark + 300, 'auto follows the system scheme').toBe(true);
  // exam date -> Today countdown
  await page.locator('#f-date').fill('2026-11-06');
  expect((await lsGet(page, 'settings')).examDate).toBe('2026-11-06');
  await tab(page, 'Today').click(); await page.waitForSelector('.hero');
  await expect(page.locator('.hstats')).toContainText('Exam in 30 days'); await S('today-countdown');
  await page.locator('#gear:visible, #tab-ajustes:visible').first().click();
  // voice select (stubbed voices)
  const opts = await page.locator('#f-voice option').allInnerTexts();
  expect(opts.length).toBeGreaterThanOrEqual(3); expect(opts[0]).toMatch(/Automatic/); expect(opts.join('|')).toContain('Stub Voice');
  await page.locator('#f-voice').selectOption('stub-gb'); expect((await lsGet(page, 'settings')).voiceURI).toBe('stub-gb');
  await expect(page.locator('#f-rate')).toBeVisible();
  // reset with in-app confirmation (Cancel first, then confirm)
  await seed(page, { sessions: { watched: { F01: 1 }, lessonsDone: { F01: { at: 1 } } } });
  await page.locator('#gear:visible, #tab-ajustes:visible').first().click();
  await page.getByRole('button', { name: 'Reset progress…' }).click();
  await expect(page.locator('.confirm')).toContainText('Are you sure'); await S('reset-confirm');
  await page.getByRole('button', { name: 'Cancel' }).click(); await expect(page.getByRole('button', { name: 'Reset progress…' })).toBeVisible();
  expect(Object.keys((await lsGet(page, 'sessions')).watched)).toContain('F01');
  await page.getByRole('button', { name: 'Reset progress…' }).click();
  await page.getByRole('button', { name: 'Yes, delete everything' }).click();
  await expect(page.locator('#toast')).toContainText('Progress reset');
  const s = await lsGet(page, 'sessions'); expect(s.watched).toEqual({}); expect(s.lessonsDone).toEqual({});
  expect((await lsGet(page, 'settings')).examDate, 'exam date is kept').toBe('2026-11-06');
  await tab(page, 'Progress').click(); await expect(page.locator('.pcount')).toContainText('Watched 0/49');
  await tab(page, 'Today').click(); await expect(page.locator('.hero .btn.primary')).toHaveText('Start');
});

// Skipped in the public copy: needs local narration audio or local video timings, or is timing-sensitive.
test.skip('10a Fallback player: audio request fails -> device voice, chapters advance, speed change does not restart the scene', async ({ page }, ti) => {
  const S = (n, f) => shot(page, ti, '10a-' + n, f);
  page.__allow(/Failed to load resource|ERR_FAILED|net::/);
  await stubSpeech(page, 4000);   // long enough that a chapter does not auto-advance between the screenshot and the '.' key
  await injectBeforeApp(page, 'delete window.AB620_VIDEO.L08;');   // audio-only topic, whatever has a video
  await page.route('**/audio/L08.mp3', (r) => r.abort());
  await openApp(page);
  await openFromLearn(page, 'L08');
  const info = await topicInfo(page, 'L08');
  await expect(page.locator('.pl-badge')).toBeVisible(); await expect(page.locator('.pl-badge')).toHaveText('Device voice');
  await expect(page.locator('.pl-note')).toContainText('could not be loaded');
  await expectNoOverflow(page, 'fallback'); await S('badge');
  await page.locator('.pl-play').click();
  await expect.poll(() => page.evaluate(() => window.__speech.length)).toBe(1);
  expect(await curChapterIndex(page)).toBe(0);
  const scenes = await page.evaluate(() => window.AB620_COURSE.find((t) => t.id === 'L08').scenes.map((s) => s.say));
  expect(await page.evaluate(() => window.__speech[0].text)).toBe(scenes[0]);
  // speed change: no new utterance, same chapter
  await page.locator('.pl-speed').click(); await page.locator('.pl-mi', { hasText: '1.5' }).click(); await sleep(150);
  expect(await page.evaluate(() => window.__speech.length), 'speed change must not restart the scene').toBe(1);
  expect(await curChapterIndex(page)).toBe(0);
  await expect(page.locator('.pl-speed')).toContainText('1.5');
  // the scene ends -> the next chapter starts, at the new speed
  await expect.poll(() => curChapterIndex(page), { timeout: 6000 }).toBe(1);
  await expect.poll(() => page.evaluate(() => window.__speech.length)).toBe(2);
  expect(await page.evaluate(() => window.__speech[1].rate)).toBe(1.5);
  await S('advanced');
  // next-chapter key and chapter row
  await page.locator('h1').click(); await page.keyboard.press('.'); await expect.poll(() => curChapterIndex(page)).toBe(2);
  await page.locator('.chrow').nth(info.n - 1).click(); await expect.poll(() => curChapterIndex(page)).toBe(info.n - 1);
  expect(await page.evaluate((i) => window.__speech[window.__speech.length - 1].text, 0)).toBe(scenes[info.n - 1]);
  await page.locator('.pl-play').click(); await expect(page.locator('.pl-play')).toContainText(/Resume|Play/);   // paused
});

test('10b Fallback player: a topic with no audio entry plays with the device voice and finishes -> watched', async ({ page }, ti) => {
  await stubSpeech(page, 250);
  await injectBeforeApp(page, 'delete window.AB620_VIDEO.L09; delete window.AB620_AUDIO.L09;');
  await openApp(page);
  await openFromLearn(page, 'L09');
  const info = await topicInfo(page, 'L09');
  await expect(page.locator('.pl-badge')).toBeVisible(); await expect(page.locator('.pl-note')).toHaveText('');
  expect(await page.evaluate(() => window.__audios.length), 'no <audio> element for a topic without an audio entry').toBe(0);
  await shot(page, ti, '10b-no-entry');
  await page.locator('.pl-play').click();
  await expect(page.locator('.pl-play')).toContainText('Watch again', { timeout: 20000 });
  await expect(page.locator('.chrow.watched')).toHaveCount(info.n);
  expect((await lsGet(page, 'sessions')).watched.L09).toBeTruthy();
  await expect(page.locator('.pl-next')).toBeVisible();
});

test('11 Layout: no horizontal scroll, nothing overflows the viewport, tap targets >= 44 px on phone, on every screen', async ({ page }, ti) => {
  await stubSpeech(page, 1000);
  await openApp(page);
  const check = async (label) => { await expectNoOverflow(page, label); await expectTapTargets(page, ti, label); };
  await seed(page, { sessions: { watched: { F01: 1, F02: 2 }, checks: { F01: { ok: 3, n: 3, at: 1 } }, seen: { L01: 1 } } });
  await seedQuiz(page, 40);
  await check('Today');
  await tab(page, 'Learn').click(); await openAll(page); await check('Learn');
  await page.locator('.rowcard').click(); await check('Glossary'); await page.locator('.gl-list .link').first().click();
  await page.waitForSelector('.topic .pl'); await check('Topic (narrated)'); await shot(page, ti, '11-topic', true);
  await tab(page, 'Exam').click(); await check('Exam home'); await shot(page, ti, '11-exam-home', true);
  await page.getByRole('button', { name: 'Start diagnostic' }).click(); await page.waitForSelector('.exam'); await check('Exam question');
  await page.locator('.exam .opt').first().click(); await check('Exam question answered');
  await tab(page, 'Progress').click(); await page.waitForSelector('.prog'); await check('Progress');
  await page.locator('#gear:visible, #tab-ajustes:visible').first().click(); await page.waitForSelector('.sett'); await check('Settings');
  await tab(page, 'Today').click(); await page.waitForSelector('.hero'); await check('Today');
  // flashcards (Review cards, any day) and mixed review
  await page.goto('/?now=2026-10-11'); await page.waitForSelector('.hero'); await seedStudied(page);   // cards and mixed-review questions come from studied topics only
  await page.getByRole('button', { name: /Review cards/ }).click(); await page.waitForSelector('.fcard'); await check('Flashcard front'); await shot(page, ti, '11-flashcard-front');
  await page.locator('.fgrade .btn.primary').click(); await page.waitForSelector('.fgrade .g3'); await check('Flashcard back'); await shot(page, ti, '11-flashcard-back');
  // R4: card text is fully opaque once shown and the card is not vertically centred in a huge gap
  const cf = await page.evaluate(() => { const e = document.querySelector('.cfront'); let o = 1; for (let n = e; n; n = n.parentElement) o *= +getComputedStyle(n).opacity; const r = document.querySelector('.fcard').getBoundingClientRect(); return { o, top: r.top, vh: innerHeight }; });
  expect(cf.o).toBe(1); expect(cf.top, 'card sits near the top, not centred').toBeLessThan(cf.vh * 0.3);
  await page.goto('/?now=2026-10-10'); await page.waitForSelector('.hero');
  await page.getByRole('button', { name: 'Mixed review' }).click(); await page.waitForSelector('.flow .qstem'); await check('Mixed review question'); await shot(page, ti, '11-mixed-review');
  // viewport-specific structure
  const phone = ti.project.name.startsWith('phone');
  await page.goto('/?now=2026-10-07'); await page.waitForSelector('.hero');
  await expect(page.locator('#bar')).toBeVisible({ visible: phone }); await expect(page.locator('#tabs')).toBeVisible({ visible: !phone });
});

test('11b R1/R4: the player stage is sized by its content (no empty gap), and the flashcard text is not dimmed', async ({ page }, ti) => {
  await openApp(page);
  await openFromLearn(page, 'F01');
  // stage content stacks from the top: the gap between the chapter label and the scene title is small, in every scene
  const gaps = [];
  const n = (await topicInfo(page, 'F01')).n;
  for (let i = 0; i < n; i++) {
    await page.locator('.chrow').nth(i).click(); await sleep(300);
    gaps.push(await page.evaluate(() => {
      const a = document.querySelector('.pl-sh').getBoundingClientRect(), t = document.querySelector('.pl-title').getBoundingClientRect(), c = document.querySelector('.pl-cap').getBoundingClientRect(), st = document.querySelector('.pl-stage').getBoundingClientRect();
      return { head: Math.round(t.top - a.bottom), under: Math.round(st.bottom - c.bottom), stage: Math.round(st.height) };
    }));
  }
  for (const g of gaps) expect(g.head, JSON.stringify(g)).toBeLessThanOrEqual(24);
  const heights = gaps.map((g) => g.stage); const spread = Math.max(...heights) - Math.min(...heights);
  expect(spread, 'stage height barely changes between scenes (controls do not jump): ' + heights.join(',')).toBeLessThan(140);
  await page.locator('.chrow').nth(1).click(); await sleep(300); await page.evaluate(() => window.scrollTo(0, 0)); await sleep(100);
  await shot(page, ti, '11b-stage');
});
