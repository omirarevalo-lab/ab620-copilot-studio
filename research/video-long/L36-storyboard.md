# L36 storyboard: world style (spec for the composition)

Narration `research/video-long/L36-script.json` (17 scenes, ~7.7 min before the exam silences), timings `video/L36/beats.json`. Build on the world library `tools/video/world/` (examples: `video/L35/composition.html` = closest sibling, `video/L34/composition.html`, `video/L41/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Same global rules as `L05-storyboard.md`. Sentences per scene (0-based cues s0…): 0:9 1:7 2:5 3:6 4:5 5:10 6:5 7:6 8:5 9:6 10:11 11:7 12:4 13:4 14:5 15:10 16:10.

## Global rules for this lesson (L34/L35 rules + the new layout lint)
- **Lint first:** `node tools/video/lint-layout.mjs L36` must show **no BLOQUEANTE** before any full render (BORDE-CORTADO, SOLAPE, VACIO > 1 s, DOBLE-EXPOSICION). Design so it passes: every label has its own free slot (no label on top of another label, pill or panel title), nothing within 120 px of the frame edge at 1080p, no panel/window shown before its first line, and the previous layer fully faded out before the next one fades in.
- **Text size:** world labels >= 60 px on the 3840x2160 canvas (>= 30 px at 1080p in the widest shot that shows them); UI text >= 30 px at 1080p, table cells included. If a label would be under 30 px in a wide shot, hide it in that shot and show it only in the close-up.
- **Margins:** every subject >= 120 px (1080p) from the left and right edges; the closing shot fills the frame (no empty third).
- **Pills:** at most 2 pills on screen at once, each in a reserved slot (top-left / bottom-centre, never over a desk label); no long pill on screen more than ~15 s; alias pill "formerly GitHub Copilot harness" ~4 s at its one mention (scene 12 s1) only.
- **Panels and UI windows:** never empty or half-filled at rest; a window arrives with its content, rows build only inside an already-sized table whose rows are all present as dim placeholders with text (not blank boxes).
- **Exam rooms:** question card visible from s0 ("Your turn."); options on their sentences; full fade-out before fade-in, both ways. After "Decide before I answer." the fixer inserts **3.5 s of silence** (`narration.mp3` + `beats.json`); the 3-2-1 ring starts when that sentence ENDS, nothing moves in the silence, the answer reveals on the reveal sentence. On-screen options drop the spoken "Or" and the "?".
- **Two harnesses, never mixed on screen:** scenes 0-11 = standard harness (grey-blue, brick accent as in L35); scenes 12-15 = Microsoft Copilot harness (glass tower, purple accent). No SFX.
- **Score vs Pass/Fail colour code (whole lesson):** graders that give a **score** carry a small dial icon and a teal tag "score"; graders that give **Pass/Fail** carry a two-light icon (green/red) and an amber tag "Pass / Fail". Keep it consistent; the exam and close reuse it.

## World layout (3840x2160) — "Contoso grading hall"
- **Intake** (left, x 200-900): Nexo (L05 robot, label "Nexo · IT agent") drops answer papers into a conveyor belt that runs left → right along the floor (y ~1700). A tray "Test set" (binder from L35, same look) sits next to it, with a red "answer key" folder.
- **Grader row** (x 1000-3600, two rows of desks so labels never collide; row A y ~700, row B y ~1250; >= 380 px between desk centres): each desk = one grader character (`crowd`, distinct colour) + a nameplate (>= 60 px) + its tool + its score/pass-fail icon:
  - Row A: **General quality** (robot judge with a "/100" board and an "ON" switch), **Compare meaning** (grader with a lens that shows two different sentences joined by an "=" of intent), **Text similarity** (grader with a ruler "0 … 1"), **Exact match** (grader with a stencil that only fits one exact code).
  - Row B: **Keyword match** (highlighter, toggle "Any | All"), **Tool use** (checklist with a tool lamp), **Content safety** (inspector with a dial 0-7 and four small gauges), **Custom** (empty rubric desk with two label stamps).
  - In wide shots only nameplates are shown (no tool captions); tool details appear in the close-up of each desk.
- **Invalid bin** (right of row B, x ~3500): a grey tray "Invalid" for papers the grader cannot grade.
- **Harness district** (scenes 12-15, separate set reached by a camera move right/out): the **Microsoft Copilot harness** glass tower (purple), inside it ONE desk "General quality" with two lights "Pass" / "Fail". The standard grader hall stays behind, dimmed, never overlapping the tower labels.
- **Evidence room** (scene 14-15, inside the tower, lower floor): three doors "Activity trace (Preview tab)", "Conversation history", "Monitor tab".
- Maker desk with laptop for UI mode (standard harness UI = grey-blue window "Evaluation › Test methods"; harness UI = purple window "Evaluate · Preview").

## 0 Green, but wrong (s0-8) — world
Wide on intake + first desks. s0 title "Tuesday at Contoso" (top-left slot). s1 Nexo at the intake with a ticket bubble "Where is my order?". s2 the answer key card slides in: "Expected: CT-4471" (big mono). s3 Nexo's paper: "Nexo: CT-4417" (big mono, under the key card, own slot; the swapped digits "17" in red). s4 camera to the **Compare meaning** desk: the paper passes the lens, a big green "PASS" stamp. s5 small tag under the desk: "graded the meaning". s6 cut-in: a parcel labelled "wrong order" drops in front of a customer silhouette. s7 tag "test set ✓" (green) over the binder. s8 tag "grading rule ✗" (red) over the Compare meaning nameplate area (own slot, not over the nameplate); pill "pick the right rule".

## 1 First what, then how (s0-6) — world
s0 camera pulls back to the whole grader hall (nameplates only). s1 an exam paper flies onto an easel centre-left "the exam". s2 four question chips pop around it one per word on cue: "meaning" · "exact words" · "a tool" · "safety" (2x2 grid, equal gaps). s3 a hand picks a grader: the chip "exact words" draws a line to the Exact match desk. s4 the **score** legend appears (dial icon, teal "score", "+ pass mark"). s5 the **Pass / Fail** legend appears beside it (two-light icon, amber). Both legends stay small in the top-right slot until scene 4 ends. s6 one paper is graded by three desks at once (three thin lines), tag "several methods per test set"; one wrong line flashes red "misleading".

## 2 General quality, the default judge (s0-4) — world close-up
s0 camera to the General quality desk; its "ON" switch is already lit (tag "on every test set"). s1 tag "default". s2 the robot judge writes "86 / 100" on its board; four criteria tiles build one per word (2x2): "Relevance" · "Groundedness" · "Completeness" · "Abstention". s3 the red answer-key folder slides toward the desk and is waved away: tag "no expected response needed". s4 board subtitle "quality, not exact facts" (dial icon, teal "score").

## 3 Meaning or wording (s0-5) — world close-ups (two desks)
s0 both desks framed side by side, each pulling a card from the red answer-key folder (tag "need the answer key"). s1 Compare meaning lens: left sentence "Reset it on the self-service page" and right sentence "Use the self-service reset page", an "≈ same intent" bar fills green. s2 dial on the desk shows "pass score 50 (default)". s3 camera moves to Text similarity. s4 the ruler measures the same two sentences word by word: needle stops at "0.62", scale labelled "cosine 0 … 1". s5 two tags under the desks (own slots): "policy in your own words → meaning" · "phrasing matters → similarity".

## 4 Exact words, key words (s0-4) — world close-ups
s0 camera to Exact match + Keyword match desks (row A right, row B left; framed so both nameplates are inside margins). s1 the stencil "CT-4471" lets "CT-4471" through (green light) and blocks "CT-4417" (red light); small chips "codes · prices · numbers". s2 Keyword match: a reply "Restart the VPN client and sign in again" with two highlighted keywords "VPN" "sign in"; the toggle shows "Any | All". s3 toggle switches to "All": one keyword missing in a second reply → red light; tag "All = every word must appear". s4 both desks show the two-light icon, amber tag "no score · Pass / Fail".

## 5 EXAM: the order code (pause s6, reveal s7) — exam room
- Q (visible from s0): "Contoso wants to be sure Nexo returns the order code with every character in the right place. Which method should they add?"
- A "Compare meaning with its default pass score of fifty" (trap) · B "Exact match with the code as expected response" (right) · C "General quality, which is turned on by default".
- Why: "**Codes** must match **character by character**. Compare meaning tolerates near misses; General quality needs no answer key."
- Proof (built with the reveal, never empty): the stencil from scene 4 blocking "CT-4417" with a red light, beside a green light for "CT-4471".

## 6 Did it use the tool? (s0-4) — world + UI
s0 camera to the Tool use desk. s1 a user bubble "My laptop screen is broken" reaches Nexo; Nexo's paper says only "Sorry about that!" (tag "no action"). s2 the checklist shows "Expected tool: Create Ticket" with an unlit lamp → red light; then a second paper where the lamp lights "Create Ticket ✓" → green light. s3 UI (standard harness window, fully sized, all fields filled): test case row "My laptop screen is broken" with a field "Expected tools or topics: Create Ticket"; cursor points at it. s4 amber tag "Pass / Fail · no score".

## 7 The safety inspector (s0-5) — world close-up
s0 camera to the Content safety desk. s1 four gauges light one per word: "Hate" · "Sexual" · "Violence" · "Self-harm" (2x2, equal gaps). s2 the dial shows the scale "0 … 7". s3 the needle at 0 with tag "strictest"; then at 7 with tag "most permissive" (tags in fixed slots left and right of the dial, never overlapping the gauges). s4 amber two-light icon "Pass / Fail". s5 the single inspector splits into four inspectors, one per gauge; tag "one method per content type → 4 methods".

## 8 Your own rule (s0-4) — world → UI
s0 camera to the empty Custom desk; tag "write your own". s1 the rubric sheet shows two section headers "1 Instructions" · "2 Labels". s2 instructions text types in (big, max 2 lines): "Check that Nexo follows the HR privacy policy." s3 two label stamps appear: "Compliant → Pass" (green) and "Non-compliant → Fail" (red); tag "at least two labels". s4 UI (standard harness, window fully filled): "Custom method" form with the same instructions and the two labels with Pass / Fail selectors; cursor confirms.

## 9 The correct refusal (s0-5) — world
s0 pill "the trap" (top-left slot). s1 a user bubble "What does my manager earn?"; Nexo answers "I can't share salary information." s2 green tick "right answer". s3 the paper goes to the General quality desk: board shows "Needs improvement" (amber), tag "correct refusal flagged". s4 the paper is rerouted along the belt to the Custom desk. s5 stamp "Compliant → Pass" lands on it; tag "expected refusals → Custom".

## 10 EXAM: the salary question (pause s7, reveal s8) — exam room
- Q (visible from s0): "Nexo must refuse every question about salaries, and it does. General quality keeps marking those refusals as needing improvement. What should Contoso do?"
- A "Set the Content safety threshold to zero" (trap) · B "Add Keyword match with the All option" · C "Create a Custom method with two labels" (right).
- Why: "**Expected refusals** need **your own rule**. Content safety and keywords do not judge a correct refusal."
- Proof: the scene-8 rubric with "Compliant → Pass" / "Non-compliant → Fail" and the refusal paper stamped Pass.

## 11 Nothing to grade (s0-6) — world + UI
s0 camera to the Invalid bin. s1 three papers arrive at Compare meaning, Keyword match and Tool use, each missing its material: no answer key / no keywords / no expected tool (small grey chips on each paper). s2 the graders hold up empty hands (no stamp). s3 the papers drop into the grey bin; big label "Invalid" (not red "Fail"). s4 UI (standard harness, full table, all rows with text): two set types as column headers "Single response" | "Conversation". s5 rows: "Compare meaning ✓ | ✗", "Text similarity ✓ | ✗", "Exact match ✓ | ✗", "Tool use ✓ | ✗" (build row by row inside the already-sized table; rows present as dim text first). s6 rows "Keyword match ✓ | ✓", "Custom ✓ | ✓" light; then a results column with one "Invalid" badge highlighted: tag "after a run, look for Invalid".

## 12 One grader on the harness (s0-3) — world → UI
s0 the grader hall dims to the left (fully out before the next layer); camera moves to the glass tower; label "Standard harness" fades with the hall. s1 label "Microsoft Copilot harness" + alias pill "formerly GitHub Copilot harness" ~4 s; UI window (purple): "Evaluate · Preview" › "Test method: General quality" (single option, the other method names absent). s2 inside the tower one desk "General quality" with two lights "Pass" / "Fail", tags "AI-based" · "relevance · completeness". s3 a ghost list of the other method names ("Compare meaning · Exact match · Tool use · …") sits under a small brick sign "standard harness only", outside the tower, never overlapping the purple labels.

## 13 Same case, another run (s0-3) — world (tower)
s0 the same paper "laptop case" goes through the General quality desk twice: run 1 → green "Pass", run 2 → red "Fail" (two result slips side by side, labelled "Run 1" · "Run 2"). Tags "agent: AI" · "grader: AI". s1 tag "not a broken test". s2 tag "how AI systems behave". s3 the slips multiply to "Run 1 · Run 2 · Run 3" for an "Important scenario" label; pill "run important scenarios more than once · same test set".

## 14 What a Pass does not show (s0-4) — world → UI
s0 pill "one more limit". s1 a "Pass" slip with two question marks attached: "which knowledge?" · "did a tool run?". s2 the paper reads well but the tool lamp (from scene 6, purple version) stays dark: tag "could skip the tool". s3 camera down to the evidence room; door "Activity trace · Preview tab" opens to a UI window (fully filled) with a vertical trace: "User message → Knowledge: IT policies.pdf → Tool: Create Ticket → Response"; the Knowledge and Tool nodes highlighted. s4 the two other doors open in turn: "Conversation history → model used" · "Monitor tab → credits" (each a small filled card, side by side, no overlap with the trace window).

## 15 EXAM: proof of the tool (pause s7, reveal s8) — exam room (purple accent)
- Q (visible from s0): "On the Microsoft Copilot harness, Nexo passes General quality. The manager wants proof the Create Ticket tool ran. Where do you look?"
- A "The Tool node in the Preview activity trace" (right) · B "A Tool use method added to the Evaluate tab" (trap) · C "A second evaluation run that also shows Pass".
- Why: "The **Evaluate tab** offers **only General quality**, and a second Pass proves nothing about tools. Evidence = **Tool node** in the activity trace."
- Proof: the scene-14 trace window with the "Tool: Create Ticket" node highlighted.

## 16 The right grader (s0-9) — world, fills the frame
s0 wide callback to scene 0 across the whole width (intake, belt, grader hall; tower at the far right edge, inside margins). s1 Exact match stencil blocks "CT-4417": red "Fail" + tag "as it should". s2 title "Remember for the exam" (top-centre). s3-9 a recap board (two columns, filled one line per sentence, big text, each line linked by a thin line to its desk): "Codes, numbers → Exact match" · "Same idea, other words → Compare meaning" · "Tool call → Tool use" · "Expected refusals → Custom" · "Missing material → Invalid" · "Content safety: 0 = strictest" · purple line "Microsoft Copilot harness → General quality only · Pass / Fail". The recap board sits in its own area (no line overlaps a nameplate); hold >= 3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 5, 10, 15 with pauseSentence 6, 7, 7 (0-based). Right 1, 2, 0; trap 0, 0, 1. Questions and options exactly as above.
