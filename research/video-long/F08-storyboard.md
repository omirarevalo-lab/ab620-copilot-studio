# F08 storyboard: world style (spec for the composition)

Narration `research/video-long/F08-script.json` (10 scenes, ~4.9 min before the exam silences, ~5 min with them), timings `video/F08/beats.json`. **Basic lesson, closes module 0:** calm pace, one image per idea, look back at F01-F07 and forward to modules 1+. Build on the world library `tools/video/world/` (closest siblings: `video/F07/composition.html`, `video/F06/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Sentences per scene (0-based cues s0…): 0:7 1:5 2:6 3:11 4:9 5:11 6:6 7:8 8:7 9:7 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson (F07 rules + F07 review fixes, all mandatory)
- **Lint first:** `node tools/video/lint-layout.mjs F08` must show **no BLOQUEANTE** before any full render (BORDE-CORTADO, SOLAPE, VACIO, DOBLE-EXPOSICION).
- **Margins:** every subject, label, panel and chip >= 120 px from every frame edge at 1080p, bottom edge included, in every shot (zoom shots too: frame the subject with margin, never cut it at the edge).
- **Text size: ALL text >= 32 px at 1080p**, no exceptions. If it does not fit, cut words or zoom; never shrink.
- **Full frames:** every resting shot fills width and height; no group leaning to one side, no empty band > 20 % (scene 0 and the close included). No empty placeholders: lanes, slots or rows are drawn only when they have content, and content lights **on the word that names it** (never a dim empty frame waiting > 2 s).
- **Names on screen:** when the voice names a thing (a domain, a module, a glossary word), its label is on screen at that moment, in its own slot.
- **Reserved slots, no covering:** every card or chip has a free slot reserved before it appears; nothing covers another object; moving objects follow a free path (no crossing over other objects).
- **State matches the story;** dimmed items use #5b6578 text on #e7eaf1; no ghosts (a faded element is at opacity 0 before anything else uses its place).
- **Dialogs and overlays are opaque from their first frame** (no transparency over other elements).
- **Transitions:** no empty or grey frame > 0.5 s; crossfade ≤ 0.5 s. Something happens on every sentence; the close moves until the 3 s tail.
- **Pills:** at most 2 on screen, reserved slots (top-left / bottom-centre); none longer than ~15 s. Chip texts exactly as written here.
- **Exam rooms:** question card **and** all three options enter **together** at s0 ("Your turn."), dim, full-width rows (~75 % width, ring at right); each option brightens on its own sentence. On-screen options drop the spoken "Or" and the "?". After "Decide before I answer." the fixer inserts **3.5 s of silence**; the 3-2-1 ring starts when that sentence ENDS; nothing moves in the silence. **Reveal exactly at `S(i, 8)`** (start of the reveal sentence, never earlier). Trap red, struck, "Trap" pill; right green with check; other at 50 %. Option rows shrink with an eased tween **>= 0.6 s**; explanation (right) and proof panels (below) enter **after** the rows finish; proof panels sized to their content and filled.
- **Colour code (whole lesson, fixed):** D1 Plan and configure = blue #2f5bd3; D2 Integrate and extend = teal #0f7b8a; D3 Test and manage = amber #d98a00; correct = green #1e7f4f only; trap = red #c4392f. Nexo = F01-F07 blue robot; Valeria = new character (developer, purple top, dark hair, laptop). No SFX.
- **Continuity / look back:** the glossary scenes reuse small icons from F01-F07 (Nexo robot, topic node chain, amber wrench, travel adapter, teal book, environment buildings, moving box, data-policy gate, theatre doors). **No repeats of earlier exams.**

## World layout (3840x2160) — "The trail map"
- **Trailhead** (left, x 200-900): Valeria at a signpost with a backpack and a laptop; a big unrolled paper "Skills measured" scroll.
- **Trail** (x 900-3600): a hiking path across three hills, one per domain, height = weight: hill "D1 Plan and configure" (blue, medium), hill "D2 Integrate and extend" (teal, tallest), hill "D3 Test and manage" (amber, smallest). Small module flags along the path: "M0" at the trailhead, "M1" "M2" "M3" on hill D1, "M4" "M5" "M6" on hill D2, "M7" on hill D3. Summit badge "AI Agent Builder Associate".
- **Exam hall** (scene 1-2 close-up, a building at the summit): a desk with a clock "120 min", a proctor figure, a screen.
- **Glossary backpack** (scenes 7-8): Valeria's backpack opens into a shelf of word cards, each card with its icon from earlier lessons.

## 0 Where do I start? (s0-6) — world (trailhead + trail, frame filled)
s0 Valeria walks in to the trailhead (left), Nexo waves from a small screen on her laptop; label "Valeria · Contoso developer". s1 a row of seven small thumbnails above her, one per earlier class, lighting left to right: "F01" … "F07" (labels >= 32 px; each a tiny icon from that lesson); chip "seven classes". s2 a calendar chip "two months". s3 the "Skills measured" scroll unrolls downward beside her (long list, text rows readable at least for the top three: "Plan and configure…", "Integrate and extend…", "Test and manage…"); tag "long list". s4 a question mark over Valeria: "where to start?". s5 camera pulls back to reveal the trail across three hills (still unlabelled, hills full height so the frame is filled); chip "check each stretch". s6 kinetic title "Exam map + glossary" (104 px, then fades).

## 1 The exam in a few lines (s0-4) — world → exam hall at the summit
s0 camera flies to the summit building; a banner "AB-620" and sub-title "Designing and Building Integrated AI Solutions in Copilot Studio". s1 a badge lands on the banner: "Microsoft Certified: AI Agent Builder Associate". s2 three chips in one row under the banner, one per word group: "120 minutes" · "proctored" · "interactive parts" (with a clock, a proctor, a drag-and-drop icon). s3 a score gauge 0-1000 with a line at "700" and label "pass". s4 a small tag "scaled score" hangs on the line with an amber outline; chip "matters more than it seems".

## 2 The rules of the room (s0-5) — world (exam hall interior)
s0 inside the hall: a desk, screen and proctor; label "rules of the room". s1 a language sign "English" with a second sign "Spanish" arriving later along a track with a chip "about eight weeks later". s2 a calendar with a return arrow: chip "retake after 24 hours". s3 the screen opens "Microsoft Learn" with three crossed tabs "Q&A" · "Practice assessments" · "Profile" (red cross on each, on its word). s4 a key-cap "Ctrl + F" lights over the page. s5 the clock "120 min" ticks visibly; chip "quick checks only".

## 3 EXAM: seventy percent (pause s7, reveal s8) — exam room
- Q (visible from s0): "In her practice sessions, Valeria answers about seventy percent of the questions correctly. She thinks: seven hundred out of a thousand, so seventy percent is enough. Is she right?"
- A "No, seven hundred is a scaled score" (right) · B "Yes, seven hundred means seventy percent" (trap) · C "Only if each domain reaches seventy".
- Why: "**Seven hundred** is a **scaled score**, not **seventy percent** correct. Aim **well above** the line."
- Proof (after the rows shrink, filled): left panel "Percent correct": a bar at "70 %" with an amber "?" chip "not the same scale"; right panel "Scaled score": the 0-1000 gauge with "700 pass" line and a green arrow pointing well above it, chip "aim higher".

## 4 Three domains, three weights (s0-8) — world (trail, all three hills in frame, filled)
s0 camera on the three hills; label "the map". s1-2 hill D1 lights blue with its sign "D1 Plan and configure" and a weight plaque "30–35 %"; then three small chips on its slope: "planning" · "agent flows" · "topics". s3-4 hill D2 lights teal, sign "D2 Integrate and extend", plaque "40–45 %"; chips: "knowledge" · "tools" · "multi-agent" · "Azure services" (two rows of two, reserved slots). s5-6 hill D3 lights amber, sign "D3 Test and manage", plaque "20–25 %"; chips "evaluation" · "ALM". s7-8 each plaque wobbles between its two numbers (e.g. 30↔35): tag "ranges: every exam varies" (bottom-centre).

## 5 EXAM: where the weeks go (pause s7, reveal s8) — exam room
- Q (visible from s0): "Valeria has eight weeks before her exam date. She wants to spend most of them where the exam weighs the most. Where should most of her study time go?"
- A "Plan and configure: planning and topics" (trap) · B "Test and manage: evaluation and ALM" · C "Integrate and extend: knowledge, tools" (right).
- Why: "**Integrate and extend** weighs **forty to forty-five percent**, almost **half**. But **all three count**: no domain is skipped."
- Proof (after the rows shrink, filled): an eight-week bar under the explanation, week blocks coloured: four teal "D2", two blue "D1", two amber "D3" (each block labelled), chip "most weeks on D2"; small green check.

## 6 How this course follows the map (s0-5) — world (trail with module flags)
s0 camera to the trailhead flag "M0 Fundamentals" with a green tick: chip "you are here, finishing". s1 flags "M1" "M2" "M3" light on hill D1 (blue) one by one, each with its sub-label: "planning" · "advanced topics" · "agent flows". s2 flags "M4" "M5" "M6" light on hill D2 (teal): "knowledge and tools" · "MCP and multi-agent" · "Azure and monitoring". s3 flag "M7" lights on hill D3 (amber): "evaluation and ALM". s4-5 a topic card opens at Valeria's feet with four icons lighting on their words: "theory" · "video" · "questions" · "challenge".

## 7 Words so far: the agent (s0-7) — world (glossary backpack, close-up)
s0 Valeria opens the backpack; a shelf of word cards slides out, all dim with their words readable (#5b6578 on #e7eaf1), 7 cards in two rows. s1-7 one card lights per sentence, each with its icon from the earlier class and a one-line meaning (>= 32 px): "Agent · chats and acts" (Nexo) · "Topic · conversation with nodes" (purple node chain) · "Tool · something it runs" (amber wrench) · "Connector · wraps an API" (travel adapter) · "Knowledge · sources it looks up" (teal book) · "Orchestration · decides what to use" (purple activity path) · "Harness · the engine" (engine block). Cards stay lit.

## 8 Words so far: where it lives (s0-6) — world (backpack, second shelf)
s0 the first shelf slides up out of frame (fully gone) and a second shelf with 6 dim cards slides in; label "where Nexo lives". s1-6 one card lights per sentence with icon and meaning: "Environment · a separate building" (business park building) · "Solution · the moving box" (box) · "Dataverse · the database" (teal drum) · "DLP · admin data policies" (red gate) · "Channel · where users chat" (theatre door) · "Copilot Credits · billing unit" (coin stack).

## 9 Valeria's plan (s0-6) — world, filled, motion on every sentence
s0 wide trail callback: Valeria at the trailhead with the map, the three hills behind, title "Valeria's plan" (top-left), recap board slot top-right reserved. s1 she opens "Study guide" (a scroll) and a calendar pin "Pearson VUE" lands on a date. s2 the eight-week bar from scene 5 lays out along the trail: teal blocks on hill D2, a blue block each week on D1, amber blocks at the end on D3. s3 her laptop shows "Lab environment ready" (green) and a mini Nexo assembling piece by piece (instructions sheet, book, wrench, topic card). s4 one week before: the backpack glossary opens and a "My mistakes" list ticks off. s5-6 the "M0" flag gets a big green tick: chip "Module 0 done"; Valeria walks up the path to the "M1" flag (moving until the tail): tag "next: module 1 · planning the solution" (bottom-centre). Recap board (top-right, lights on s5-6): "Study by weight: D2 first" · "700 is scaled" · "Build after every topic". Hold >= 3 s with Valeria walking (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 3 and 5 with pauseSentence 7 and 7 (0-based). Right 0, 2; trap 1, 0. Questions and options exactly as above.
