# L37 storyboard: world style (spec for the composition)

Narration `research/video-long/L37-script.json` (16 scenes, ~6.7 min before the exam silences, ~7 min with them), timings `video/L37/beats.json`. Build on the world library `tools/video/world/` (closest siblings: `video/L36/composition.html`, `video/L35/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Same global rules as `L05-storyboard.md`. Sentences per scene (0-based cues s0…): 0:6 1:8 2:6 3:11 4:4 5:6 6:5 7:10 8:7 9:9 10:12 11:5 12:7 13:10 14:5 15:10 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson (L36 rules + layout lint)
- **Lint first:** `node tools/video/lint-layout.mjs L37` must show **no BLOQUEANTE** before any full render (BORDE-CORTADO, SOLAPE, VACIO > 1 s, DOBLE-EXPOSICION). Every label has its own free slot (never on another label, pill or panel title), nothing within 120 px of the frame edge at 1080p, no panel/window shown before its first line, previous layer fully faded out before the next one fades in.
- **Text size:** world labels >= 60 px on the 3840x2160 canvas (>= 30 px at 1080p in the widest shot that shows them); UI text >= 30 px at 1080p, table cells included. If a label would be under 30 px in a wide shot, hide it there and show it only in the close-up.
- **Margins:** every subject >= 120 px (1080p) from left and right edges; the closing shot fills the frame (no empty third).
- **Pills:** at most 2 on screen, each in a reserved slot (top-left / bottom-centre); no long pill more than ~15 s; alias pill "formerly GitHub Copilot harness" ~4 s at its one mention (scene 8 s1) only.
- **Panels and UI windows:** never empty or half-filled at rest; a window arrives with its content; rows build only inside an already-sized table whose rows are present as dim placeholders with text.
- **Exam rooms:** question card visible from s0 ("Your turn."); options appear on their sentences; full fade-out before fade-in, both ways. After "Decide before I answer." the fixer inserts **3.5 s of silence** (`narration.mp3` + `beats.json`); the 3-2-1 ring starts when that sentence ENDS, nothing moves in the silence, the answer reveals on the reveal sentence. On-screen options drop the spoken "Or" and the "?"; "C S V" is written "CSV" on screen.
- **Two harnesses, never mixed on screen:** scenes 0-7 = standard harness (grey-blue, brick accent as in L35/L36); scenes 8-14 = Microsoft Copilot harness (glass tower, purple accent). Scene 15 shows both, each in its own half. No SFX.
- **Result colour code (whole lesson, fixed):** Pass = green, Fail = red, Invalid = grey (dashed border), Error = dark charcoal with a broken-gear icon. Arrows in Compare with: green up = failing → passing, red down = passing → failing. Reuse in exams and close.
- **No repeats of L35/L36:** do not redraw the L36 grader desks or the L35 binder build; the test set appears only as a closed binder "Test set" prop.

## World layout (3840x2160) — "Contoso review room"
- **Intake** (left, x 200-900): Nexo (L05 robot, label "Nexo · IT agent") beside the maker at a laptop desk (label "Maker"); a closed binder "Test set" on the desk.
- **Results wall** (centre, x 1100-2500, y 400-1500): a board with case slips in a grid (4 columns x 4 rows, 16 slips "Case 1…16", >= 60 px text in close-up only). Under it, **four trays** in one row (y ~1650, >= 340 px apart): "Pass" (green), "Fail" (red), "Invalid" (grey dashed), "Error" (charcoal, broken gear).
- **Lens stand** (right of the wall, x ~2700): a big magnifier labelled "Show activity map".
- **Two easels** (x 2700-3600, behind the lens, used only in scene 5): "Run 1" and "Run 2" boards of the same test set.
- **Archive cabinet** (far right, x ~3500): a calendar "89 days" on the door and a box "CSV export".
- **Harness district** (scenes 8-14, separate set reached by a camera move right/out; the review room dims fully before it): the **Microsoft Copilot harness** glass tower (purple). Ground floor: UI window "Evaluate · Preview". First floor: three doors "Evaluation setup" · "Agent configuration" · "Platform limitation", each with its owner figure (crowd character, distinct colour) and a small plate "Evaluation author" · "Agent builder" · "Platform team". Second floor: a triage line with four numbered slots. A meter pair beside the tower: "Estimate" (Evaluate/Preview) and "Final" (Monitor tab).
- Maker desk with laptop for UI mode (standard UI = grey-blue window "Evaluation › Results"; harness UI = purple window "Evaluate · Preview").

## 0 Twelve red cases (s0-5) — world
Wide on intake + results wall. s0 title "Monday at Contoso" (top-left slot). s1 the maker types; a sheet "Instructions v2" slides into Nexo; the binder "Test set" opens a thin flow of slips to the wall. s2 the wall fills: 12 of 16 slips turn red, counter chip "12 red" (own slot, top-right of the wall). s3 a thought bubble from the maker "rewrite the instructions again?" (sheet "Instructions v3" hovering). s4 a red question mark over the bubble; tag "the cause is not here" points at the instructions sheet (own slot). s5 pill "read before you change" (bottom-centre).

## 1 Read the graded exam (s0-7) — world
s0 camera to the results wall; one slip enlarges like a graded exam paper with a mark in the corner. s1 tag "a graded exam". s2 the mark is circled: "not only the score". s3-5 three question chips pop one per sentence, stacked on the right (equal gaps): "What result?" · "Why?" · "Did it improve?". s6 tag "one tool per question". s7 each chip gets its tool icon in the same row: "result" (four coloured dots) · "Show activity map" (lens) · "Compare with" (two boards + arrow). Chips stay until scene end, then fade fully.

## 2 Four results (s0-5) — world close-up on the trays
s0 the four trays framed in one row, labels "Pass" "Fail" "Invalid" "Error". s1 slips drop into Pass and Fail; a small stamp "graded" over both (one slot above the pair). s2 a slip missing its answer key (grey chip "no expected response") slides into "Invalid"; tag "missing what the method needs" under the tray. s3 a slip with a broken gear drops into "Error"; tag "execution failure · no grade". s4 a bracket over Pass + Fail: "about the answer". s5 a bracket over Invalid + Error: "check the run first". Brackets in their own row above the tray labels, never touching them.

## 3 EXAM: the demanding bar (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso raises the Compare meaning pass score to 95. Cases that have an expected response now score below that bar. What result do those cases get?"
- A "Invalid, because the bar is too demanding" (trap) · B "Error, because the method could not decide" · C "Fail, because they scored below the bar" (right).
- Why: "The case had **everything the method needs**, so it was graded. **Invalid** is only for **missing material**."
- Proof (built with the reveal, never empty): a score bar "pass score 95" with the needle at "71" in red, slip landing in the red "Fail" tray; the grey "Invalid" tray beside it stays empty.

## 4 Why did it do that? (s0-3) — world → UI
s0 the lens "Show activity map" swings over one red slip "Case 7". s1 UI window (standard, fully filled) "Activity map · Case 7": a left-to-right node path "User: How do I reconnect the VPN?" → "Topic: Password reset" → "Response". s2 the "Topic: Password reset" node pulses amber; tag "went to the wrong topic first" below it (own slot). s3 tag "know why, don't guess"; the window holds, then fades fully.

## 5 Did the change help? (s0-5) — world
s0 the two easels "Run 1" and "Run 2" side by side, each with the same 8 case rows (dim placeholders with text, already sized); header chip "same test set" above both. s1 rows fill: Run 1 mostly red, Run 2 mixed. s2 arrows appear in a narrow column between the boards: green up on cases that went failing → passing, red down on the one that got worse; legend under the column: "▲ failing → passing · ▼ passing → failing". s3 small sheet "Instructions edited" slides between the easels' feet. s4 counters "5 ▲" (green) and "1 ▼" (red) in their own slots under each side. s5 the red-arrow row highlights; tag "open this one next"; pill "same test set only" (bottom-centre).

## 6 Eighty-nine days (s0-4) — world → UI
s0 camera to the archive cabinet; calendar flips to "89 days"; old slips fade on the shelf (tag "then gone"). s1 tag "results kept 89 days". s2 the box "CSV export" opens and a sheet slides out. s3 UI table (standard, fully sized, header + 2 rows with text): columns "Question · Expected response · Method · Score · Agent response · Result · Analysis" (split across two header lines if needed to keep >= 30 px; never shrink). s4 the sheet files into a folder "Audit history"; tag "for audits and later comparisons".

## 7 EXAM: a full year (pause s6, reveal s7) — exam room
- Q (visible from s0): "Contoso's auditors want this quarter's evaluation results available for a full year. What should the maker do?"
- A "Export the results to CSV after each run" (right) · B "Ask an admin to extend the result retention" (trap) · C "Use Compare with to merge the older runs".
- Why: "Results stay **89 days**; **exporting** is how you keep them longer. Compare with only puts **two runs side by side**."
- Proof: the scene-6 calendar "89 days" beside the CSV sheet filed in "Audit history".

## 8 The Evaluate tab (s0-6) — world → UI (harness)
s0 the review room dims fully; label "Standard harness" fades with it; camera moves to the glass tower. s1 label "Microsoft Copilot harness" + alias pill "formerly GitHub Copilot harness" ~4 s; UI window (purple, filled) "Evaluate · Preview". s2 a "Recent results" list with three run rows "Run 1 · Run 2 · Run 3", tag "each run saved separately". s3 cursor: "Recent results" → button "Evaluate test set again" highlights. s4 the summary card (fully filled, two columns): "Score 82%" · "Duration 6 min" · "Test cases 16" · "Data type: Conversation" · "User profile: IT tester" · "Credits used 40". s5 the "Duration" cell circles; tag "whole run". s6 a small stopwatch chip "latency → Preview" beside the card (own slot, not over the card).

## 9 Who broke it? (s0-8) — world (tower, first floor)
s0 camera up to the three doors with owners. s1 door "Evaluation setup" lights + plate "Evaluation author". s2 door "Agent configuration" + "Agent builder". s3 door "Platform limitation" + "Platform team". s4 a big "1" badge lands on the setup door; tag "check first". s5-7 three checklist lines build inside the setup door's card, one per sentence: "Dependencies healthy?" · "Auth valid for the user profile?" · "Right environment?". s8 the agent door lights only after all three get green ticks; tag "only then blame the agent".

## 10 EXAM: Monday morning (pause s8, reveal s9) — exam room (purple accent)
- Q (visible from s0): "Twelve cases fail overnight. All of them call the Create Ticket tool, and the user profile's connection expired yesterday. What should the maker do first?"
- A "Rewrite the instructions and run the set again" (trap) · B "Restore the connection and rerun the same set" (right) · C "Improve the Create Ticket tool description".
- Why: "An **expired connection** is a **setup issue**. Restore it, rerun, and **leave the instructions alone**."
- Proof: the scene-9 setup door with "Auth valid for the user profile?" turning from red ✗ to green ✓, and a connection plug reconnecting.

## 11 Symptom, then fix (s0-4) — world → UI (tower)
s0 a two-column board "Symptom → Fix" (already sized, 3 rows as dim text). s1 row "Low General quality → Instructions" lights. s2 row "Missing or incorrect tool use → Tool descriptions" lights. s3 row "Incorrect information → Knowledge sources" lights. s4 tag "change one thing · same set · Compare with" under the board; small two-board icon from scene 5 in purple.

## 12 Which failure first? (s0-6) — world (tower, second floor)
s0 a pile of red slips; tag "you need an order". s1-4 the triage line fills one slot per sentence: "1 Safety and compliance" · "2 Core business scenarios" · "3 Lowest-scoring evaluation" · "4 Recurring failures" (equal gaps, all labels inside margins). s5 a slip "Cafeteria menu · low score" waits near slot 3, tag "can wait". s6 a slip "Privacy rule broken" jumps to slot 1, red outline; tag "cannot wait".

## 13 EXAM: three failures (pause s7, reveal s8) — exam room (purple accent)
- Q (visible from s0): "After a run, Nexo has three failures: a vague answer about the cafeteria menu, a wrong order status, and an answer that shares an employee's home address. Which one do you triage first?"
- A "The wrong order status in a core scenario" (trap) · B "The vague menu answer with the lowest score" · C "The answer sharing an employee's address" (right).
- Why: "**Safety and compliance** come first, then **core scenarios**, then the lowest score."
- Proof: the scene-12 triage line with the address slip in slot 1, order status in slot 2, menu in slot 3.

## 14 Estimate or final (s0-4) — world (tower)
s0 the meter pair beside the tower; coin chip "Copilot Credits". s1 tag "evaluation runs use credits". s2 meter "Estimate · Evaluate / Preview" moves live (needle wobble), tag "near real time". s3 meter "Final · Monitor tab" with a clock "within a few hours" fills and locks; tag "accurate". s4 tag "real number → Monitor, later" (own slot under the Final meter).

## 15 Read before you fix (s0-9) — world, fills the frame
s0 wide callback to scene 0 across the whole width: left half the review room, right half the tower (inside margins). s1 the maker pushes the "Instructions v3" sheet away; the setup door's plug reconnects. s2 the results wall flips: the 12 red slips turn green, green ▲ arrows on each; chip "12 ▲". s3 title "Remember for the exam" (top-centre). s4-9 a recap board (two columns, one line per sentence, big text, in its own area, no line over a label): "Pass · Fail · Invalid · Error" (four coloured dots) · "High pass score → Fail, not Invalid" · "Activity map = why one case" · "Compare with = effect of a change" · "89 days → export CSV" · purple line "Setup first · triage safety first". Hold >= 3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 3, 7, 10, 13 with pauseSentence 7, 6, 8, 7 (0-based). Right 2, 0, 1, 2; trap 0, 1, 0, 0. Questions and options exactly as above.
