// Search + connection map: global search (Learn field, Search item / phone button, "/" on desktop), the concept page with its map,
// results that open the lesson section, practice / cards from a concept, phone lists without overflow, and the second exam (AB-400).
import { test, expect, tab, openApp, expectNoOverflow, expectTapTargets, shot } from './helpers.mjs';

const isPhone = (ti) => ti.project.name.startsWith('phone');
const isDesktop = (ti) => ti.project.name.startsWith('desktop');

async function searchFor(page, text) {
  await tab(page, 'Learn').click();
  await page.locator('#learn-search').fill(text);   // typing in the Learn field opens the Search screen with the text
  await page.waitForSelector('.search .sx-results .sx-row');
}
async function openConcept(page, text) {
  await searchFor(page, text);
  await page.locator('.sx-row.concept').first().click();
  await page.waitForSelector('.sx-concept h1');
}

test('18-1 The Learn field opens Search; a known term gives its concept first, then lesson sections', async ({ page }, ti) => {
  await openApp(page);
  await searchFor(page, 'connector');
  await expect(page.locator('.search .sx-in')).toHaveValue('connector');
  await expect(page.locator('.search .sx-in')).toBeFocused();
  await expect(page.locator('.sx-row').first()).toHaveClass(/concept/);
  await expect(page.locator('.sx-row.concept').first()).toContainText(/connector/i);
  await expect(page.locator('.sx-sec h2').first()).toHaveText('In the lessons');
  await expectNoOverflow(page, 'search results'); await expectTapTargets(page, ti, 'search results');
  // nothing found: a calm message
  await page.locator('.search .sx-in').fill('zzqxjk');
  await expect(page.locator('.sx-hint')).toContainText('Nothing found');
});

test('18-2 The concept page: definition, connection map (lists on a phone), where it is taught and said', async ({ page }, ti) => {
  await openApp(page);
  await openConcept(page, 'connector');
  await expect(page.locator('.sx-concept h1')).toHaveText('Connector');
  await expect(page.locator('.sx-concept .lead')).not.toBeEmpty();
  await expect(page.locator('.mx')).toBeVisible();
  if (isPhone(ti)) {
    await expect(page.locator('.mx-svg')).toBeHidden();
    await expect(page.locator('.mx-lists .chip').first()).toBeVisible();
  } else {
    await expect(page.locator('.mx-svg')).toBeVisible();
    await expect(page.locator('.mx-n.center')).toBeVisible();
    expect(await page.locator('.mx-n.topic').count()).toBeGreaterThan(0);
  }
  await expect(page.getByRole('heading', { name: /Where it is taught/ })).toBeVisible();
  await expectNoOverflow(page, 'concept page'); await expectTapTargets(page, ti, 'concept page');
  await page.waitForTimeout(1000);   // let the map finish drawing before the picture
  await shot(page, ti, '18-concept-map', true);
});

test('18-3 Clicking a map node follows the thread: a related concept changes the page, a topic opens the lesson', async ({ page }, ti) => {
  await openApp(page);
  await openConcept(page, 'connector');
  const rel = isPhone(ti) ? page.locator('.mx-lists .chip').filter({ hasNot: page.locator('b') }).first() : page.locator('.mx-n.rel').first();
  if (await rel.count()) {
    await rel.scrollIntoViewIfNeeded(); await rel.click();
    await expect(page.locator('.sx-concept h1')).not.toHaveText('Connector');
    await page.locator('#tab-buscar, #sbtn').locator('visible=true').first().click();   // back to a fresh search
    await page.locator('.search .sx-in').fill('connector');
    await page.locator('.sx-row.concept').first().click();
  }
  const node = isPhone(ti) ? page.locator('.mx-lists .chip').filter({ has: page.locator('b') }).first() : page.locator('.mx-n.topic').first();
  await node.scrollIntoViewIfNeeded(); await node.click();
  await page.waitForSelector('.topic .pl');
  await expect(page.locator('.topic')).toBeVisible();
  await expect(page.locator('.backlink, .tback, .topic .link').filter({ hasText: 'Search' }).first()).toBeVisible();
});

test('18-4 A lesson result opens that section of the lesson (scrolled into view) and Back returns to the results', async ({ page }, ti) => {
  await openApp(page);
  await searchFor(page, 'connector');
  const row = page.locator('.sx-sec .sx-row').first();
  const id = (await row.locator('.sx-k').innerText()).trim();
  await row.click();
  await page.waitForSelector('.topic .pl');
  await page.waitForFunction(() => { const s = [...document.querySelectorAll('.tsec[id^="sec-"]')]; return s.some((e) => { const r = e.getBoundingClientRect(); return r.top >= -2 && r.top < window.innerHeight * 0.5; }); });
  const t = await page.evaluate((i) => window.AB620_COURSE.find((x) => x.id === i).title, id);
  await expect(page.locator('.topic')).toContainText(t);
  await page.locator('.topic .link').filter({ hasText: 'Search' }).first().click();
  await page.waitForSelector('.search .sx-results .sx-row');
  await expect(page.locator('.search .sx-in')).toHaveValue('connector');
});

test('18-5 "/" opens Search on a desktop (not while typing); a phone has the Search button in the top bar', async ({ page }, ti) => {
  await openApp(page);
  if (isDesktop(ti)) {
    await expect(page.locator('#tab-buscar')).toBeVisible();
    await page.keyboard.press('/');
    await expect(page.locator('.search .sx-in')).toBeFocused();
    await expect(page.locator('#tab-buscar')).toHaveAttribute('aria-current', 'page');
    await page.keyboard.type('a/b');   // typing in the field keeps the slash
    await expect(page.locator('.search .sx-in')).toHaveValue('a/b');
  } else {
    await expect(page.locator('#sbtn')).toBeVisible();
    await page.keyboard.press('/');
    await expect(page.locator('.search')).toHaveCount(0);   // no shortcut on a phone
    await page.locator('#sbtn').click();
    await expect(page.locator('.search .sx-in')).toBeFocused();
    await expectTapTargets(page, ti, 'phone top bar');
  }
  await expectNoOverflow(page, 'search empty');
});

test('18-6 From a concept: Practice starts those questions and Back returns to Search; Review cards opens the cards', async ({ page }, ti) => {
  await openApp(page);
  await openConcept(page, 'connector');
  const practice = page.getByRole('button', { name: /^Practice \d+ question/ });
  await expect(practice, 'a concept with questions offers practice').toHaveCount(1);
  {
    await practice.click(); await page.waitForSelector('.flow .qstem');
    await page.locator('.ftop .link').click();
    await page.waitForSelector('.search .sx-concept');
  }
  const cards = page.getByRole('button', { name: /^Review \d+ card/ });
  if (await cards.count()) {
    await cards.click(); await page.waitForSelector('.flow');
    await expect(page.locator('.flow')).toBeVisible();
    await expect(page.locator('.flow .fcard')).toBeVisible();
    await page.getByRole('button', { name: /Show answer/ }).click();
    await expect(page.getByRole('button', { name: /Good/ })).toBeVisible();
  }
});

test.describe('AB-400', () => {
  test.use({ presetCert: false });
  test('18-7 Search works on the second exam, with its own data', async ({ page }, ti) => {
    await page.addInitScript(() => { try { localStorage.setItem('taller.cert', 'ab400'); } catch (e) { /* nothing */ } });
    await openApp(page);
    await searchFor(page, 'stateless');
    await page.locator('.sx-row.concept').first().click();
    await page.waitForSelector('.sx-concept h1');
    await expect(page.locator('.sx-concept h1')).toHaveText(/stateless/i);
    await expect(page.locator('.mx')).toBeVisible();
    await expectNoOverflow(page, 'ab400 concept'); await expectTapTargets(page, ti, 'ab400 concept');
    // the other exam's terms are not in this index
    await page.locator('#tab-buscar, #sbtn').locator('visible=true').first().click();
    await page.locator('.search .sx-in').fill('activity map');
    await expect(page.locator('.sx-hint')).toContainText('Nothing found');
  });
});
