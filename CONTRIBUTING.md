# Contributing

Thanks for helping. Every question you fix or add helps the next person who studies for the exam.

## Ground rules

- Write in plain English (B1-B2): short sentences, simple words, one concrete example.
- Questions must be original. Never paste real exam questions or anything from an exam dump. Pull requests that do are closed.
- Every fact needs a source URL from the official Microsoft docs (`source` field). Facts about Copilot Studio change often, so say which page you used.
- Keep changes small and focused: one topic, one skill or one bug per pull request.

## Add or fix a practice question

1. Open `data/questions.js` (AB-620) or `data/ab400/questions.js` (AB-400).
2. Copy a question next to the same `skill`. Fields: `id` (`q-<skill>-<nn>`, next free number), `skill`, `domain`, `type` (`single` or `multi`), `difficulty` (1-3), `stem`, `options`, `answer` (zero-based indexes), `explanation` (why the right option is right and why the others are not), `source`, `preview`.
3. Run `node tools/validate.mjs`, then `node tools/qmap.mjs` (rebuilds the question to video-chapter map), then `node build.mjs && node tools/smoke.mjs`.

Flashcards are in `data/flashcards.js`: one fact per card (`front`, `back`, `source`).

## Add or fix a lesson topic

Topics live in `data/course-m*.js`; the schema is in `COURSE-SCHEMA.md`. Run `node tools/validate-course.mjs` after every edit. `node tools/digest.mjs topics` and `node tools/digest.mjs topic <ID>` print compact summaries, so you do not need to open the big data files.

## Run it locally

```bash
npm install
node build.mjs
node tools/serve.mjs      # http://localhost:4620
node tools/smoke.mjs
```

## Good first issues

- Add 3 questions to the skill with the fewest questions (`node tools/digest.mjs count` shows the numbers).
- Proofread one lesson and fix unclear sentences or wrong facts (cite the Microsoft page).
- Add keyboard shortcuts help to the Settings screen.
- Translate the UI strings of one screen to your language (strings are in `src/app.js`) and propose an easy way to switch language.
- Write a Playwright test for a flow that has none (see `tests/e2e/`).
- Check that the dark theme has enough contrast on one screen and fix any problems.

## Report a wrong answer

Open an issue with the question id, what you think is right and a link to the Microsoft documentation. Corrections with a source are merged fast.
