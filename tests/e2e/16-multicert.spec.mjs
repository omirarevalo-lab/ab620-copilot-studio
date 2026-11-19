// Two exams in one app (AB-620 + AB-400): picker, separate storage, empty AB-400, backup guard, layout.
// These tests start with NO stored choice (the shared helper presets AB-620 for every other spec).
import { test, expect, tab, openApp, seedStudied, expectNoOverflow, expectTapTargets, shot } from './helpers.mjs';

test.use({ presetCert: false });

const PREP = 'Lessons for AB-400 are in preparation.';
// AB-400 now has content, so the empty-exam states (m3) are tested by emptying its data right after the data scripts and before the registry (src/cert.js) reads it.
async function emptyAb400(page) {
  await page.route((u) => u.pathname === '/', async (route) => {
    const resp = await route.fetch(), marker = '<script>\n/* Certification registry';
    let body = await resp.text();
    if (body.indexOf(marker) < 0) throw new Error('cert.js marker not found in dist');
    body = body.replace(marker, () => '<script>(function () { var d = window.__CERTS.ab400; d.AB620_COURSE = []; d.AB620_QUESTIONS = []; d.AB620_CARDS = []; d.AB620_QMAP = {}; d.AB620_VIDEO = {}; d.AB620_AUDIO = {}; })();</script>\n' + marker);
    const headers = { ...resp.headers() }; delete headers['content-length'];
    await route.fulfill({ status: resp.status(), headers, body });
  });
}
const pickerHeading = (page) => page.getByRole('heading', { name: 'What are you studying?' });
const row = (page, code) => page.locator('.certrow').filter({ hasText: code });
// Click a picker row; choosing another exam reloads the page.
async function choose(page, code) {
  await Promise.all([page.waitForEvent('load'), row(page, code).click()]);
  await page.waitForSelector('#view > *');
}
const keys = (page, prefix) => page.evaluate((p) => Object.keys(localStorage).filter((k) => k.indexOf(p) === 0).sort(), prefix);
const snapshot = (page, prefix) => page.evaluate((p) => Object.fromEntries(Object.keys(localStorage).filter((k) => k.indexOf(p) === 0).sort().map((k) => [k, localStorage.getItem(k)])), prefix);
const openSettings = (page) => page.locator('#gear:visible, #tab-ajustes:visible').first().click();
async function openPickerFromSettings(page) {
  await openSettings(page);
  await page.getByRole('button', { name: /^AB-\d+ · Change$/ }).click();
  await expect(pickerHeading(page)).toBeVisible();
}
async function backupText(page) {
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
  await page.getByRole('button', { name: 'Copy backup' }).click();
  await page.waitForTimeout(250);
  return page.evaluate(async () => { const ta = document.querySelector('textarea[readonly]'); return ta ? ta.value : navigator.clipboard.readText(); });
}
async function restore(page, text) {
  await page.getByLabel('Backup to restore').fill(text);
  await page.getByRole('button', { name: 'Restore backup' }).click();
}

test('m1 first run: the picker comes first, with one row per exam and an honest status for each', async ({ page }, ti) => {
  await openApp(page);
  await expect(pickerHeading(page)).toBeVisible();
  await expect(page.locator('.certrow')).toHaveCount(2);
  await expect(row(page, 'AB-620')).toContainText('AI Agent Builder Associate');
  await expect(row(page, 'AB-620')).toContainText('Not started');
  await expect(row(page, 'AB-400')).toContainText('Extending Microsoft Power Platform Solutions with Code and AI');
  await expect(row(page, 'AB-400')).toContainText('Not started');
  await expect(page.locator('.certrow[aria-current="true"]')).toHaveCount(0);
  // nothing to navigate yet: no tabs, no settings gear; neutral brand and title
  await expect(page.locator('#bar')).toBeHidden(); await expect(page.locator('#tabs')).toBeHidden(); await expect(page.locator('#gear')).toBeHidden();
  await expect(page.locator('#brand-m, #brand').locator('visible=true').first()).toHaveText('Exam Workshop');
  expect(await page.title()).toBe('Exam Workshop');
  expect(await keys(page, 'ab620.v1.')).toEqual([]); expect(await keys(page, 'ab400.v1.')).toEqual([]);   // looking at the picker writes no progress
  for (const b of await page.locator('.certrow').all()) expect((await b.boundingBox()).height).toBeGreaterThanOrEqual(44);
  await expectNoOverflow(page, 'picker'); await expectTapTargets(page, ti, 'picker'); await shot(page, ti, 'm1-picker');
});

test('m2 an existing AB-620 learner (progress but no stored choice) goes straight to AB-620', async ({ page }) => {
  await page.addInitScript(() => { try { if (!localStorage.getItem('ab620.v1.sessions')) localStorage.setItem('ab620.v1.sessions', JSON.stringify({ lessonsDone: {}, seen: {}, checks: {}, days: {}, watched: {}, pos: {}, pretest: {}, rev: {}, updatedAt: 1 })); } catch (e) { /* nothing */ } });
  await openApp(page);
  await expect(pickerHeading(page)).toHaveCount(0);
  await expect(page.locator('.hero h2')).not.toHaveText(PREP);
  await expect(page.locator('.brand-b:visible').first()).toContainText('AB-620 Workshop');
  expect(await page.title()).toBe('AB-620 Workshop');
  expect(await page.evaluate(() => localStorage.getItem('taller.cert'))).toBeNull();   // the silent choice is not written
});

test('m3 an exam with no content yet (AB-400 emptied for the test): every tab renders an honest empty state, nothing throws', async ({ page }, ti) => {
  await emptyAb400(page);
  await openApp(page);
  await expect(row(page, 'AB-400')).toContainText('Content in preparation');
  await choose(page, 'AB-400');
  expect(await page.evaluate(() => localStorage.getItem('taller.cert'))).toBe('ab400');
  await expect(pickerHeading(page)).toHaveCount(0);
  expect(await page.title()).toBe('AB-400 Workshop');
  await expect(page.locator('.brand-b:visible').first()).toContainText('AB-400 Workshop');
  // Today: the message plus a way to switch exam
  await expect(page.locator('.hero h2')).toHaveText(PREP);
  await expect(page.getByRole('button', { name: 'Change exam', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start', exact: true })).toHaveCount(0);
  await expectNoOverflow(page, 'ab400 today'); await expectTapTargets(page, ti, 'ab400 today'); await shot(page, ti, 'm3-today-empty');
  // Learn
  await tab(page, 'Learn').click();
  await expect(page.locator('.learn')).toContainText(PREP); await expectNoOverflow(page, 'ab400 learn');
  // Exam: reason shown, every start button disabled
  await tab(page, 'Exam').click();
  await expect(page.locator('#exam-why')).toContainText('Questions for AB-400 are in preparation');
  await expect(page.getByRole('button', { name: 'Start diagnostic' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Start mock exam' })).toBeDisabled();
  await expect(page.locator('.home h2').filter({ hasText: '20-question diagnostic' })).toHaveCount(1);   // totals come from AB-400's own splits
  await expect(page.locator('.home h2').filter({ hasText: '50-question mock exam' })).toHaveCount(1);
  await expect(page.locator('#mixed')).toHaveCount(0);   // the AB-620 mixed-practice sets do not apply to another exam
  await expectNoOverflow(page, 'ab400 exam'); await shot(page, ti, 'm3-exam-empty');
  // Progress
  await tab(page, 'Progress').click();
  await expect(page.locator('.prog')).toContainText(PREP); await expect(page.locator('.prog')).toContainText('Estimated score');
  await expectNoOverflow(page, 'ab400 progress'); await shot(page, ti, 'm3-progress-empty');
  // Settings
  await openSettings(page);
  await expect(page.getByRole('heading', { name: 'Certification' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'AB-400 · Change' })).toBeVisible();
  await expectNoOverflow(page, 'ab400 settings');
});

test('m4 progress is separate: AB-620 is untouched after visiting AB-400 and back; storage keys never mix', async ({ page }) => {
  await openApp(page);
  await choose(page, 'AB-620');
  await seedStudied(page, 3);
  const before = await snapshot(page, 'ab620.v1.');
  expect(Object.keys(before).length).toBeGreaterThan(0);
  expect(await keys(page, 'ab400.v1.')).toEqual([]);
  // the picker shows AB-620's own numbers
  await openPickerFromSettings(page);
  await expect(row(page, 'AB-620')).toContainText('3 of 49 lessons watched');
  await expect(row(page, 'AB-620')).toContainText('exam Wed, Dec 2');
  await expect(row(page, 'AB-620')).toHaveAttribute('aria-current', 'true');
  await expect(row(page, 'AB-400')).not.toHaveAttribute('aria-current', 'true');
  await expect(row(page, 'AB-400')).toContainText('Not started');
  // work inside AB-400: change its exam date (writes AB-400 settings only)
  await choose(page, 'AB-400');
  await openSettings(page);
  await page.locator('#f-date').fill('2026-12-18');
  await expect(page.locator('#toast')).toContainText('Saved');
  const k400 = await keys(page, 'ab400.v1.');
  expect(k400).toContain('ab400.v1.settings');
  expect(k400.every((k) => k.indexOf('ab400.v1.') === 0)).toBe(true);
  expect(await snapshot(page, 'ab620.v1.')).toEqual(before);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ab400.v1.settings')).examDate)).toBe('2026-12-18');
  // back to AB-620: same progress, same exam date
  await openPickerFromSettings(page);
  await choose(page, 'AB-620');
  expect(await snapshot(page, 'ab620.v1.')).toEqual(before);
  await expect(page.locator('.hstats')).toContainText('3 of 49 watched');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ab620.v1.settings') || '{}').examDate)).not.toBe('2026-12-18');
  // and AB-620 progress is not visible from AB-400
  await openPickerFromSettings(page);
  await choose(page, 'AB-400');
  await expect(page.locator('.hstats')).toContainText('0 of 6 watched');
  await expect(page.locator('.hero h2')).not.toHaveText(PREP);
});

test('m5 the picker opens from Settings and from the brand; choosing the active exam just closes it', async ({ page }) => {
  await openApp(page);
  await choose(page, 'AB-620');
  // from the brand
  await page.locator('.brand-b:visible').first().click();
  await expect(pickerHeading(page)).toBeFocused();
  await expect(row(page, 'AB-620')).toHaveAttribute('aria-current', 'true');
  const loads = []; page.on('load', () => loads.push(1));
  await row(page, 'AB-620').click();   // already active: no reload
  await expect(pickerHeading(page)).toHaveCount(0); await expect(page.locator('.hero')).toBeVisible();
  // from Settings
  await openPickerFromSettings(page);
  await expect(pickerHeading(page)).toBeFocused();
  await page.keyboard.press('Escape');   // Escape and the back link also close it
  await expect(pickerHeading(page)).toHaveCount(0);
  await openPickerFromSettings(page);
  await page.getByRole('button', { name: '‹ Back' }).click();
  await expect(pickerHeading(page)).toHaveCount(0);
  expect(loads.length).toBe(0);
  // leaving through a tab also closes it
  await page.locator('.brand-b:visible').first().click();
  await tab(page, 'Progress').click();
  await expect(pickerHeading(page)).toHaveCount(0); await expect(page.locator('.prog')).toBeVisible();
});

test('m6 a backup only restores into the exam it belongs to', async ({ page }) => {
  await openApp(page);
  await choose(page, 'AB-620');
  await seedStudied(page, 2);
  await openSettings(page);
  const b620 = await backupText(page);
  expect(JSON.parse(b620)).toMatchObject({ app: 'taller-ab620', cert: 'ab620' });
  // into AB-400: refused, in plain words, and nothing is written
  await openPickerFromSettings(page);
  await choose(page, 'AB-400');
  await openSettings(page);
  await restore(page, '{"hello": 1}');   // not a backup at all
  await expect(page.getByText('That text is not a backup from this app.')).toBeVisible();
  await restore(page, b620);
  await expect(page.getByText(/That backup belongs to AB-620, not AB-400/)).toBeVisible();
  await expect(page.getByText('That text is not a backup from this app.')).toHaveCount(0);
  expect(await keys(page, 'ab400.v1.')).toEqual([]);
  // an old backup (no `cert` field) counts as AB-620 too
  const old = JSON.parse(b620); delete old.cert;
  await restore(page, '{"hello": 1}');
  await restore(page, JSON.stringify(old));
  await expect(page.getByText(/That backup belongs to AB-620, not AB-400/)).toBeVisible();
  expect(await keys(page, 'ab400.v1.')).toEqual([]);
  // an AB-400 backup restores into AB-400 ...
  await page.locator('#f-date').fill('2026-12-20');
  const b400 = await backupText(page);
  expect(JSON.parse(b400)).toMatchObject({ app: 'taller-ab620', cert: 'ab400' });
  await restore(page, b400);
  await expect(page.getByText('Backup restored.')).toBeVisible();
  // ... but not into AB-620
  await openPickerFromSettings(page);
  await choose(page, 'AB-620');
  const before = await snapshot(page, 'ab620.v1.');
  await openSettings(page);
  await restore(page, b400);
  await expect(page.getByText(/That backup belongs to AB-400, not AB-620/)).toBeVisible();
  expect(await snapshot(page, 'ab620.v1.')).toEqual(before);
  // an AB-620 backup (new or old format) still restores into AB-620
  await restore(page, JSON.stringify(old));
  await expect(page.getByText('Backup restored.')).toBeVisible();
});

test('m7 the artifact database keeps one doc per exam and name: progress/<n> for AB-620, progress/ab400-<n> for AB-400', async ({ page }) => {
  await page.addInitScript(() => {
    window.__docs = {};
    const db = { doc: (p) => ({ set: async (d) => { window.__docs[p] = d; }, get: async () => ({ exists: false, data: () => null }), onSnapshot: () => () => {} }) };
    window.claude = { use: async (n) => (n === 'db' ? db : n === 'user' ? { isOwner: async () => true } : null) };
  });
  await openApp(page);
  await choose(page, 'AB-620');
  await openSettings(page);
  await page.locator('#f-date').fill('2026-12-10');
  await page.waitForFunction(() => Object.keys(window.__docs).length > 0, null, { timeout: 8000 });
  expect(await page.evaluate(() => Object.keys(window.__docs).sort())).toEqual(['progress/settings']);
  await openPickerFromSettings(page);
  await choose(page, 'AB-400');
  await openSettings(page);
  await page.locator('#f-date').fill('2026-12-19');
  await page.waitForFunction(() => Object.keys(window.__docs).length > 0, null, { timeout: 8000 });
  expect(await page.evaluate(() => Object.keys(window.__docs).sort())).toEqual(['progress/ab400-settings']);
});

test('m8 layout: the picker, the brand button and the Settings section fit and are easy to tap', async ({ page }, ti) => {
  await openApp(page);
  await choose(page, 'AB-620');
  const brand = page.locator('.brand-b:visible').first();
  await expect(brand).toBeVisible();
  expect((await brand.boundingBox()).height).toBeGreaterThanOrEqual(43.5);
  await expectNoOverflow(page, 'today with brand button');
  await openSettings(page);
  expect((await page.locator('#cert-change').boundingBox()).height).toBeGreaterThanOrEqual(43.5);
  await expectNoOverflow(page, 'settings with certification'); await shot(page, ti, 'm8-settings');
  await brand.click();
  await expectNoOverflow(page, 'picker from the app'); await expectTapTargets(page, ti, 'picker from the app');
  for (const b of await page.locator('.certrow').all()) expect((await b.boundingBox()).height).toBeGreaterThanOrEqual(43.5);
  await shot(page, ti, 'm8-picker');
});
