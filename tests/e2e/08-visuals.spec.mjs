// upgradeVisual: old figures (SVG boxes, div tables, chips) become the new components; unknown markup is returned unchanged.
import { test, expect, openApp } from './helpers.mjs';

// real visuals from the data, found by their structure
const pick = (page, re) => page.evaluate((src) => { const re = new RegExp(src); for (const t of window.AB620_LOGIC.topics()) for (const s of (t.theory.sections || [])) if (s.visual && re.test(s.visual)) return s.visual; return null; }, re.source);

test('v7-1 flow -> step cards joined by chevrons, accent node, caption', async ({ page }) => {
  await openApp(page);
  const v = await pick(page, /^<svg[^>]*aria-label="Agent → Bridge/);
  const r = await page.evaluate((v) => { const d = document.createElement('div'); d.innerHTML = window.AB620_LOGIC.upgradeVisual(v); return { flow: !!d.querySelector('.vz.vz-flow'), nodes: [...d.querySelectorAll('.vz-node strong')].map((e) => e.textContent), hl: [...d.querySelectorAll('.vz-node.hl strong')].map((e) => e.textContent), arrows: d.querySelectorAll('.vz-arr').length, cap: (d.querySelector('.vz-cap') || {}).textContent, svgBoxes: d.querySelectorAll('rect,text').length, icons: d.querySelectorAll('.vz-ic svg').length }; }, v);
  expect(r).toMatchObject({ flow: true, nodes: ['Agent', 'Bridge (tool)', 'Contoso system'], hl: ['Bridge (tool)'], arrows: 2, cap: 'Without a bridge, the agent only chats', svgBoxes: 0 });
  expect(r.icons).toBeGreaterThan(0);
});

test('v7-2 compare -> two cards, accent side, title + bullets', async ({ page }) => {
  await openApp(page);
  const v = await pick(page, /aria-label="Highest versus Lowest"/);
  const r = await page.evaluate((v) => { const d = document.createElement('div'); d.innerHTML = window.AB620_LOGIC.upgradeVisual(v); return { cmp: !!d.querySelector('.vz.vz-cmp'), titles: [...d.querySelectorAll('.vz-ct')].map((e) => e.textContent), hl: d.querySelectorAll('.vz-card.hl').length, bullets: d.querySelectorAll('.vz-bl li').length }; }, v);
  expect(r).toEqual({ cmp: true, titles: ['Highest', 'Lowest'], hl: 1, bullets: 4 });
});

test('v7-3 table -> key/value rows with a header caption', async ({ page }) => {
  await openApp(page);
  const v = await pick(page, /Which tool do I choose/);
  const r = await page.evaluate((v) => { const d = document.createElement('div'); d.innerHTML = window.AB620_LOGIC.upgradeVisual(v); return { table: !!d.querySelector('.vz.vz-table'), title: (d.querySelector('.vz-title') || {}).textContent, keys: [...d.querySelectorAll('.vz-row dt')].map((e) => e.textContent), vals: [...d.querySelectorAll('.vz-row dd')].map((e) => e.textContent) }; }, v);
  expect(r.table).toBe(true); expect(r.title).toBe('Which tool do I choose');
  expect(r.keys).toHaveLength(4); expect(r.keys[0]).toBe('A connector exists'); expect(r.vals[3]).toBe('Computer use');
});

test('v7-4 chips -> pills, accent pill kept; text is inserted as text; unknown markup unchanged', async ({ page }) => {
  await openApp(page);
  const r = await page.evaluate(() => {
    const U = window.AB620_LOGIC.upgradeVisual, c = '<div style="border:1px solid var(--muted);border-radius:10px;padding:10px 12px"><div style="font-size:11px;color:var(--muted)">T</div><span style="display:inline-block;border:1px solid var(--accent);color:var(--accent)">A &lt;b&gt;x&lt;/b&gt;</span><span style="display:inline-block;border:1px solid var(--muted)">B</span></div>';
    const d = document.createElement('div'); d.innerHTML = U(c);
    const unknown = ['<p>hello</p>', '<svg viewBox="0 0 10 10"><circle r="3"/></svg>', '<div style="border:1px solid var(--muted)"><div style="font-weight:600">New ticket</div></div>', '<img src=x onerror="window.__x=1">'];
    return { chips: [...d.querySelectorAll('.vz-chip')].map((e) => e.textContent + (e.classList.contains('hl') ? '*' : '')), injected: d.querySelectorAll('b').length, same: unknown.every((u) => U(u) === u), x: window.__x || 0 };
  });
  expect(r).toEqual({ chips: ['A <b>x</b>*', 'B'], injected: 0, same: true, x: 0 });
});

test('v7-5 every visual in the course converts or comes back unchanged (never throws); >=95% convert', async ({ page }) => {
  await openApp(page);
  const r = await page.evaluate(() => { let n = 0, conv = 0; for (const t of window.AB620_LOGIC.topics()) for (const s of [...(t.theory.sections || []), ...(t.scenes || [])]) if (s.visual) { n++; const o = window.AB620_LOGIC.upgradeVisual(s.visual); if (o !== s.visual && /class="vz /.test(o)) conv++; } return { n, conv }; });
  expect(r.n).toBeGreaterThan(300); expect(r.conv / r.n).toBeGreaterThan(0.95);
});
