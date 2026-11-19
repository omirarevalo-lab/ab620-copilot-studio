# Course data schema (v5, English) — shared contract for all agents

Learner: Spanish speaker, beginner in Copilot Studio (built 1–2 simple agents), who will take the AB-620 exam **in English**. All content is written in plain English (B1–B2): short sentences, simple words, one analogy per idea, one concrete Contoso example. Use the exact product UI names and exam terminology (Topics, Tools, Knowledge, Agent flows, Adaptive Cards…) exactly as they appear in Copilot Studio and on the exam. No Spanish glosses or translations anywhere.

## Files (each is a plain script that pushes into a global array)
```js
window.AB620_COURSE = window.AB620_COURSE || [];
window.AB620_COURSE.push( /* topic objects */ );
```
- `data/course-m0.js` — Module 0 Fundamentals, ids F01–F08
- `data/course-m1-3.js` — modules 1–3, ids L01–L21
- `data/course-m4-7.js` — modules 4–7, ids L22–L40
Build order: m0, m1-3, m4-7. App sorts by `module`, then array order.

## Modules
```js
window.AB620_MODULES = [ // defined in course-m0.js
 {n:0,title:'Fundamentals'},{n:1,title:'Plan the solution'},{n:2,title:'Advanced topics'},
 {n:3,title:'Agent flows'},{n:4,title:'Knowledge and tools'},{n:5,title:'MCP and multi-agent'},
 {n:6,title:'Azure and monitoring'},{n:7,title:'Evaluation and ALM'}];
```
Lesson → module: L01–L07 → 1 · L08–L16 → 2 · L17–L21 → 3 · L22–L26 → 4 · L27–L32 → 5 · L33–L34 → 6 · L35–L40 → 7.

## Topic object
```js
{
  id: 'F01' | 'L12',
  module: 0..7,
  title: 'Adaptive Cards',
  level: 'basic' | 'intermediate' | 'exam',     // M0 = basic
  minutes: 10,                                   // reading/watching time
  skills: ['1.3h'],                              // AB-620 skill IDs; M0 may use [] or related ones
  theory: {
    intro: '2–3 sentences: what it is and why it matters, with an analogy',
    sections: [ { heading, body, visual? } ],   // 3–5 sections; body = 1–3 paragraphs separated by \n\n, each ≤120 words
    steps: ['Open … ', …],                       // "How to do it on screen": 4–8 concrete UI steps in Copilot Studio (or Azure/Power Platform); no "Step 1:" prefix
    example: 'Contoso example, 60–120 words',
    examTips: ['what the exam asks / typical trap', …], // 2–4 items (M0: basics, may be 1–2)
    glossary: [ {term, def} ]                     // 2–6 terms, def ≤30 words
  },
  scenes: [ { title, visual?, caption, say } ],  // VIDEO MODE: 5–8 scenes. caption ≤ 25 words (subtitle shown on screen). say = 40–90 words spoken naturally (see TTS rules below)
  check: [ { stem, options:[4], answer: index, explanation } ], // 3–4 EASY comprehension questions answerable from THIS topic's theory; explanation 1–2 sentences
  reto: { text: '3 short lines', minutes: 15 },  // optional hands-on challenge
  source: 'https://learn.microsoft.com/…'        // one, shown discreetly
}
```
There is **no `audio` field**: recorded audio, if any, will come from a separate index later.

## TTS rules for `say` (browser English voice reads it aloud)
- 40–90 words for every scene, natural spoken English, contractions allowed.
- No digits, symbols, URLs, markup or code: write numbers as words ("three", "twenty twenty-six", "one hundred").
- Spell acronyms with spaces so they are read letter by letter: "M C P", "A P I", "A L M", "R A G", "S S O". Well-known words that are read as words stay as they are ("Azure", "Copilot").
- Product names stay in English as on the screen; avoid long lists and parentheses.

## Visuals
Inline SVG or tiny HTML string, theme-neutral: use `currentColor`, `var(--accent)`, `var(--muted)`, `var(--surface)`, `var(--line)` only — no hard-coded colors. SVG viewBox ≤ 360×220, readable English labels (font-size ≥ 12). At least half the scenes have a visual; every topic has ≥ 2 visuals in theory or scenes. Diagrams must be technically correct.

## Rules
- Accuracy: only facts from `FACTS.md`, the existing course/questions explanations, or official pages you fetch now. If unsure, leave it out.
- No links besides `source`. Escape any `</script` as `<\/script`.
- Every one of the 44 skill IDs (SPEC.md §1) must appear in at least one topic of modules 1–7.
- Validate with `node tools/validate-course.mjs`.
