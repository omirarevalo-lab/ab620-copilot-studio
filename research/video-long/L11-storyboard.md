# L11 storyboard: world style (spec for the composition)

Narration `research/video-long/L11-script.json` (11 scenes, ~4 min before the exam silences), timings `video/L11/beats.json` (regenerate: the old L11 narration does not match). **Basic lesson, module 2 (skill 1.3e, Custom data):** calm pace, one image per idea. Build on the world library `tools/video/world/` (closest siblings: `video/L10/composition.html`, `video/L09/composition.html`; exam helper `EXAMX` as in `video/L09/composition.html`). Sentences per scene (0-based cues s0…): 0:5 1:6 2:4 3:4 4:5 5:11 6:4 7:11 8:6 9:11 10:7 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson
**Every rule in the section "Global rules for this lesson" of `research/video-long/L10-storyboard.md` applies unchanged** (which in turn inherits L09's: lint first with no BLOQUEANTE, margins >= 120 px, all text >= 32 px at 1080p, full frames, no empty boxes, no world-edge bands, names on screen exact, no ghosts, opaque dialogs, transitions, pills, exam-room timing with 3.5 s silence + 3-2-1 ring, reveal exactly at `S(i, 8)`, rows shrink >= 0.8 s, proof panels complete from their first frame, no SFX, no brand logos). Only the colour code, the exact names and the continuity list below are specific to L11.

- **Names on screen, exact:** "Custom data", "Classic data", "Generative answers", "Search only selected sources", "Web search", "Allow the AI to use its own general knowledge", "Properties", "Table", "Content", "ContentLocation", "Title", "citation".
- **Colour code (whole lesson, fixed, reused in exams and close):** **Tray = a steel serving tray with a navy #1f2a44 rim and three numbered slots (1, 2, 3)**; **Table = a pale-blue #dbe8fb grid card with the three column headers Content (solid border, tag "required"), ContentLocation, Title (dashed borders, tag "optional")**; **Content = amber #e0a21e text strip; ContentLocation = teal #0f7b8a link chip; Title = violet #7b5cd6 label**. **Incident flow = a grey conveyor belt with a filter funnel and a sorting arm**; rows are small white tickets. **Source switch "Search only selected sources" = a big toggle with a navy frame** (Off = grey knob left, On = navy knob right with a check); **"Web search" and "Allow the AI to use its own general knowledge" = two small toggles, grey when Off**. **Answer = cream paper #f4ead2 bubble** (written by Nexo), citation = a small white chip with a link icon. Correct = green #1e7f4f only; trap = red #c4392f only. Nexo = blue robot, here wearing a white chef's hat (the cook); Valeria = L01 developer (purple top); user = Marta (coral #e07a5f top, laptop); the service manager appears only if the storyboard of a scene says so. No SFX. No brand logos.
- **Continuity:** Valeria's lab desk from L01, Marta from L03/L07/L08/L09/L10. **No repeats:** none of the worlds already used (business park, grading hall, IT floor and workshop, review room, house of topic rooms, library, office, toolbelt and service city, staff door/public desk/back room, help desk counter, records archive, theatre, print shop and newsstand street, river of systems, trail map). This kitchen is NOT a records room: no racks on rails, no colour-tagged department shelves, no books.

## World layout (3840x2160) — "The Contoso dispatch kitchen"
A bright industrial kitchen with a stainless pass (serving hatch) running left to right; everything is food-service, never an archive.
- **Pantry wall** (back, x 300-1500, y 500-1500): open shelves of jars labelled "files" and "websites" (the ordinary sources), dimmed when a scene says so.
- **Flow conveyor** (centre-left, x 300-2200, y 1100-1700): the incident flow as a belt from a crate "Incident database" through a filter funnel and a sorting arm, ending at the tray station; tickets (rows) ride on it.
- **Tray station** (centre, x 1900-2900, y 900-1500): Nexo the cook (chef's hat) behind the stainless tray; the three-slot tray sits on the pass.
- **Serving hatch** (right, x 2800-3600, y 500-1300): Marta's hatch with her laptop; her question bubbles appear on the screen above the hatch (x 800-2800, y 150-480); the answer bubble and citation chip leave through it.
- **Control panel** (front-right, x 2500-3500, y 1400-1950): a wall panel with the navy toggle "Search only selected sources" and the two small toggles "Web search" and "Allow the AI to use its own general knowledge".
- **Valeria's desk** (front-left, from L01) for UI mode (scene 8): generic grey-blue window "Copilot Studio · support agent", no logos.
- The floor and back wall extend at least 10 % beyond every camera framing.

## 0 Answers from our own articles (s0-4) — world, filled from frame 1
s0 full shot of the kitchen; Marta at the hatch: bubble "My printer shows a fault. What now?"; title "Module 2" (top-left). s1 Nexo serves a generic cream answer from the pantry jars "files" and "websites" (no numbers): chip "a general answer". s2 Valeria enters from the left and points to the conveyor: three tickets with link chips ride to the tray: chip "only the articles her flow picks". s3 a link chip glows under the answer: chip "a link to each". s4 kinetic title "Custom data" (104 px), then shrinks to a pill top-left.

## 1 A tray for the cook (s0-5) — world (close on Nexo + tray)
s0 the pass lights up, Nexo with the chef's hat: label "the cook". s1 Nexo reaches for the pantry jars, which glow softly: label "usually: pantry shelves". s2 a tray slides in from the conveyor; the pantry jars dim: label "Custom data: a tray". s3 two small cards beside the pantry: "not in a file", "not on a website" (neutral, no red): chip "not a file or a website". s4 a mini belt "flow or query" feeds the tray: chip "you calculate it". s5 the cook serves one cream answer from the tray only: label "serves only what is on the tray".

## 2 Where the option is (s0-3) — world (control panel + tray station)
s0 the camera moves to a node tag "Generative answers" pinned on the wall; inside its properties a section card "Classic data" opens with a row "Custom data": chip "Classic data". s1 a pale-blue grid card labelled "Table" drops into the row "Custom data": chip "a Table variable". s2 two icons beside it, "private API" (plug) and "flow result" (belt): chip "use it for a private API or a flow result". s3 on the left, a no-entry sign is NOT used; instead a small note "not a public site, not a file" in neutral grey, and the belt delivers the table: chip "at Contoso: from a flow".

## 3 The shape of the table (s0-3) — world (table close-up)
s0 close on the pale-blue Table with three columns; the column "Content" is highlighted with the tag "required": chip "required". s1 under Content an amber text strip "article text" fills in. s2 ContentLocation (dashed border, tag "optional") gets a teal link chip; Title (dashed, "optional") gets a violet label. s3 a citation chip with a link icon forms under Nexo's cream answer at the hatch, linked to the teal ContentLocation cell: chip "cite each link".

## 4 Only three records (s0-4) — world (belt + tray)
s0 the tray station with three numbered slots 1, 2, 3; chip "the limit". s1 tickets 1, 2, 3 settle into the slots and are marked "used"; later tickets fall behind a neutral grey line: chip "only the first three". s2 a pile of tickets (stack, no digit count shown) on the belt: label "hundreds of rows" with a neutral "not read" note, no red. s3 the funnel and the sorting arm reorder the tickets, the best ones to the top: chip "filter and sort first". s4 Contoso's belt delivers exactly three tickets into the three slots: chip "three articles".

## 5 EXAM: hundreds of rows (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso's incident flow finds hundreds of matching articles. Valeria must pass them to Custom data. What should she do with the table first?"
- A "Send every row and let the node read them all" (trap) · B "Filter and sort first, best rows on top" (right) · C "Pass the first three rows as they come".
- Why: "Only the first three records are used, so the best rows must be **on top**. More rows **do not raise the limit**, and unsorted rows **can miss the best**."
- Proof (after the rows shrink, each panel complete from its first frame): left panel "Filter and sort first": the belt with funnel and sorting arm, three best tickets in the three slots, chip "three best rows"; right panel "Send every row": a heap of tickets, only slots 1-3 filled and the rest stacked behind a grey line crossed in red, chip "not all are read".

## 6 Only with your data (s0-3) — world (control panel)
s0 the camera slides to the control panel; the big navy toggle "Search only selected sources" turns On and a tick appears; the source list beside it is empty (drawn text "no sources selected"): chip "on, with no sources". s1 the variable chip "TableVar" (generic name) is dropped into the row "Custom data": chip "your variable". s2 the two small toggles "Web search" and "Allow the AI to use its own general knowledge" slide to Off: chip "web and general knowledge off". s3 the cook serves a cream answer from the three tickets with three link chips: chip "only from the three articles".

## 7 EXAM: answer only from the table (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso's flow returns a table of three articles, already in Custom data. The agent must answer only from that table. What should Valeria do with Search only selected sources?"
- A "Turn it on and select no sources" (right) · B "Turn it on and select all sources" (trap) · C "Leave it off and let the agent decide".
- Why: "Then the node searches **no knowledge sources**, so only your table is left. Selecting all sources **brings them back in**."
- Proof (after the rows shrink, each panel complete from its first frame): left panel "On, no sources": navy toggle On, empty source list ("none"), the pantry jars dimmed, only the tray lit, chip "only your table"; right panel "On, all sources selected": toggle On, the source list full ("all"), the pantry jars lit again beside the tray, crossed in red, chip "sources are back in".

## 8 Set it up in the studio (s0-5) — UI (maker laptop), window ~80 % of the frame
s0 camera enters Valeria's laptop; window "Copilot Studio · support agent" arrives with its content (a topic canvas with a node "Generative answers"). s1 cursor on the node's menu → "Properties"; panel opens (opaque). s2 toggle "Search only selected sources" turns On; the source list stays empty. s3 under "Classic data", the field "Custom data" receives the variable chip. s4 two toggles "Web search" and "Allow the AI to use its own general knowledge" go Off. s5 right-side test chat: Marta's question, a cream answer and a citation chip: label "check: the citation uses ContentLocation". Window shrinks back into the laptop at scene end. All UI text >= 32 px.

## 9 EXAM: the required field (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso is checking the table its flow returns before sending it to Custom data. Valeria wants to know which field no row can be missing. Which field is it?"
- A "ContentLocation, because it holds the link" (trap) · B "Title, because the answer needs a heading" · C "Content, because it holds the text" (right).
- Why: "Content is the **only required field**. ContentLocation and Title are **optional**, so a row can leave them out."
- Proof (after the rows shrink, each panel complete from its first frame): left panel "Content present": a row with a solid Content cell (text) and the two dashed cells empty-but-labelled "optional", green check, chip "valid row"; right panel "Content missing": a row with ContentLocation and Title filled but the Content cell showing the drawn text "missing", red outline, chip "required field absent".

## 10 Three rules to remember (s0-6) — world, close shot, motion on every sentence
s0 close on the pass in the kitchen with Valeria and Marta; title "Back in the kitchen" (top-left); recap board slot top-right reserved. s1 Nexo serves the cream answer with three link chips from the three-slot tray. s2 recap board appears **with its header and three dim lines, all text drawn**: header "Remember: three rules". s3 line 1 brightens: "Content is the only required field" (amber chip). s4 line 2: "Only the first three records count · filter and sort first" (tray chip). s5 line 3: "Answer only from your data · Search only selected sources, no sources" (navy toggle chip). s6 the camera slides toward a sign over a side window "Adaptive Cards": tag "next lesson" (bottom-centre). Motion continues (belt running, Nexo moving) until the 3 s tail (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 5, 7 and 9 with pauseSentence 7, 7, 7 (0-based). Right 1, 0, 2 (B, A, C); trap 0, 1, 0. Questions and options exactly as above (on-screen options drop the spoken "Or" and the "?").

## Fact notes (checked)
- Custom data: option of the Generative answers node, inside Classic data; takes a Table variable; use for a private API or the result of a flow, not a public site or a file — theory L11.
- Table fields: Content required (text), ContentLocation optional (citation URL), Title optional; only the first three records are used; filter and sort first — theory L11.
- Answer only from your data: Search only selected sources on with no sources, variable in Custom data, Web search and Allow the AI to use its own general knowledge off; test that the citation uses ContentLocation — theory L11 steps.
- Contoso example: flow looks up related incident articles, filters, returns three rows with Content, ContentLocation and Title — theory L11 example.
- Scene 0 "general answer" is only story colour; no number, limit or product behaviour beyond the theory is stated. Scene 1 kitchen is a metaphor (the theory calls it a "tray").
- Do NOT invent what the node does when the table is empty; do not name other Classic data options.
