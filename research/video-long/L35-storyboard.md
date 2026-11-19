# L35 storyboard: world style (spec for the composition)

Narration `research/video-long/L35-script.json`, timings `video/L35/beats.json` (16 scenes, 6:47 before the exam silences). Build on the world library `tools/video/world/` (examples: `video/L41/composition.html`, `video/L21/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Same global rules as `L05-storyboard.md`. Sentences per scene: 0:7 1:6 2:4 3:5 4:6 5:11 6:4 7:4 8:5 9:9 10:6 11:5 12:5 13:6 14:9 15:6.

## Global rules for this lesson (same as `L34-storyboard.md`, from `video/L21/qc.md`)
- **Text size:** world labels >= 60 px on the 3840x2160 canvas (>= 30 px at 1080p in the widest shot that shows them); UI text >= 30 px at 1080p, table cells included.
- **Margins:** every subject >= 120 px (1080p) from the left and right edges; the closing shot fills the frame (no empty third).
- **Pills:** no long pill on screen more than ~15 s; alias pill "formerly GitHub Copilot harness" ~4 s at its one mention (scene 10 s1) only.
- **Panels:** never empty; content arrives with the panel or the panel arrives on its first line's cue.
- **Exam rooms:** question card visible from s0 ("Your turn."); options on their sentences; full fade-out before fade-in, both ways. After "Decide before I answer." the fixer inserts **3.5 s of silence** (`narration.mp3` + `beats.json`); the 3-2-1 ring starts when the sentence ENDS, nothing moves in the silence, the answer reveals on the reveal sentence. On-screen options drop the spoken "Or" and the "?".
- **Two harnesses, never mixed on screen:** scenes 1-9 = standard harness (brick building colour, grey-blue); scenes 10-14 = Microsoft Copilot harness (glass tower, purple accent). Every limit pill carries the colour of its harness. No SFX.

## World layout (3840x2160)
- **Exam hall** (centre, x 1300-2500): Nexo (L05 robot, label "Nexo · IT agent") sits at a school desk as the student. A teacher (`crowd`, navy) holds a paper exam titled "Test set". A **scoreboard** on the wall with two columns "Before" | "After" (empty until scene 15; hidden, not shown empty).
- **Team corner** (left of the hall): two makers (`maker`) arguing with bubbles "worse!" / "better!" in scene 0.
- **Case shelf** (left, x 150-1150): a binder "Test set" with case cards; two card styles: **single response** (one Q card + one A card stapled) and **conversation** (a stack of 3 alternating chat cards). An "answer key" red folder.
- **Sources** (bottom left): a small library shelf with file icons (text, Word, Excel, PDF, SharePoint) for generate-from-knowledge.
- **ID door** (bottom centre-right): a `gate` with a badge reader "Who can take the exam" and three agent robots queueing with badges.
- **Harness district** (right, x 2700-3700, scenes 10-14): the standard brick building (small, faded) and the **Microsoft Copilot harness** glass tower with a classroom window labelled "Evaluate · Preview".
- Maker desk with laptop (UI mode).

## 0 Better or worse? (s0-6) — world
Wide. s0 title "Monday at Contoso". s1 a calendar flips Fri; a note "new instructions" slides into Nexo's head. s2 left maker bubble "worse!" (red). s3 right maker bubble "better!" (green). s4 a big "?" and a struck chart labelled "no before measurement". s5 both bubbles shake: "guessing". s6 the teacher steps in with the exam paper "Test set"; pill "measure, don't guess".

## 1 The same exam, every time (s0-5) — world
s0 camera into the exam hall. s1 Nexo at the desk receives the paper "Test set = the exam". s2 paper zooms: a question line "Where do I reset my password?" and, under it, the red folder "Expected response = answer key". s3 the paper gets a stamp "SAME EXAM" and is handed again after a "change" gear spins on Nexo. s4 score "62%" → "81%" on the same paper: green "improved". s5 a different paper swaps in each time, scores jumping randomly with grey "says nothing".

## 2 Two kinds of case (s0-3) — world
s0 camera to the case shelf. s1 a **single response** card pair: "Where do I reset my password?" → "Use the self-service reset page" (stapled). s2 a **conversation** stack builds turn by turn: "I need a laptop" → "Which model?" → "The 14-inch" → "When is delivery?". s3 two labels under them: "facts" | "context across turns".

## 3 Import from a file (s0-4) — UI
s0 Copilot Studio (standard harness) window: agent → nav "Evaluation" → "New test set". s1 file picker with "support.csv" and the two headers shown as a small table "Question | Expected response". s2 tag "limits". s3 two limit pills (standard colour): "≤ 100 questions per file" · "≤ 1,000 characters per question". s4 world: the team exports "40 real questions" from a ticket pile, a hand writes answers next to each, the binder fills with 40 cards in one sweep.

## 4 When the answer key matters (s0-5) — world + UI
s0 pill "the exam loves this". s1 import dialog: "Expected response" column shown as "optional". s2 green check "file accepted" with that column empty. s3 three method chips light: "Compare meaning" · "Text similarity" · "Exact match", each with a small arrow to the red answer-key folder. s4 the folder opens empty; the three chips go grey with "nothing to compare". s5 a fourth chip "General quality" stays bright: "grades without a key".

## 5 EXAM: the missing column (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso imported a CSV with only the Question column. Now they want to use Exact match. What must they fix first?"
- A "Split the file into two smaller TXT files" (trap) · B "Change each case into a conversation case" · C "Fill an Expected response for each row" (right).
- Why: "**Exact match** compares with the **answer key**. File size and case type are not the problem."
- Proof (built with the reveal, never empty): the CSV table with the "Expected response" column filling in row by row and the Exact match chip turning green.

## 6 Let the tool write questions (s0-3) — UI + world
s0 menu "Add cases" opens. s1 "Quick question set" → ten cards fan out of Nexo's description card; tag "10 · first draft". s2 world: the sources shelf; file icons Text, Word, Excel, PDF, SharePoint light; pills "≤ 5 MB each" · a folder icon struck "no folders". s3 lines from the files to new cards: "tests its sources, not only its wording".

## 7 From real traffic (s0-3) — UI + world
s0 world: employees' real bubbles flow toward the binder. s1 UI: Monitor page ("Preview" tag), a "Topics" list ("Password reset", "VPN", "New laptop"), cursor clicks "Evaluate" on one → cases appear. s2 the exam paper now shows "Monday morning" questions; struck thought bubble "makers' imagination". s3 pill "real traffic · coverage over polish".

## 8 Who can be evaluated (s0-4) — world
s0 camera to the ID door. s1 badge reader shows two green badges: "No authentication" · "Authenticate with Microsoft". s2 a robot with a "signed-in user" badge gets a lanyard "Test user profile" and passes. s3 a robot labelled "Fabric data agent" is stopped by the barrier (red "cannot be evaluated"). s4 checklist pill "check before building cases".

## 9 EXAM: which one can take the exam (pause s6, reveal s7) — exam room
- Q (visible from s0): "Contoso has three agents and wants to evaluate one of them today. Which one can take the exam?"
- A "The one using Authenticate with Microsoft" (right) · B "The one where makers Authenticate manually" (trap) · C "The Fabric data agent of the finance team".
- Why: "**Authenticate with Microsoft** works, with a **test user profile**. Manual auth is **not supported**; **Fabric data agents** cannot be evaluated."
- Proof: the scene-8 door: first robot passes green, the other two stopped red.

## 10 The Evaluate tab (s0-5) — world → UI
s0 a sign "Standard harness" on the brick building dims; camera moves right to the glass tower. s1 label "Microsoft Copilot harness" + alias pill "formerly GitHub Copilot harness" ~4 s; UI window of the tower: nav "Evaluate" + "Preview" tag. s2 a circular loop diagram appears whole (no empty ring). s3 its five steps light one by one on cue: "Create test set" → "Configure & run" → "Review results" → "Change the agent" → "Run the same set". s4 two result bars side by side, same set name: "comparable". s5 the "SAME EXAM" stamp from scene 1 lands on the loop.

## 11 The words on that tab (s0-4) — UI glossary
A glossary card with three rows built on cue (purple accent, big text): s1 "Test set = collection of conversations (test cases)". s2 "Conversation = user messages + optional expected agent response". s3 "Evaluation = test set + test method". s4 the third row zooms into two chips "which exam" + "how it is graded".

## 12 Three ways to add conversations (s0-4) — UI
s0 "Add conversations" menu with three items. s1 "Upload CSV" → pill "≤ 5 MB" (purple) + a "Template" download link icon. s2 "Generate with AI → Quick conversation set" → ten conversation stacks; small source chips "description · instructions · topics". s3 after a "First run ✓" marker, the menu shows "Generate 25" · "Generate 50". s4 "Write your own" → a hand types a tricky edge-case question; tag "edge cases".

## 13 Credits and identity (s0-5) — UI
s0 pill "two details". s1 a "Run" button with the badge "Uses Copilot Credits". s2 auth chips: "No authentication" ✓ · "Authenticate with Microsoft" ✓ · "Authenticate manually" ✗. s3 setting "User profile" with tooltip "runs the evaluation and invokes the tools". s4 its value "Signed-in user (default)". s5 a divider between a brick-coloured card "100 · 1,000" and a purple card "5 MB · 10 · 25/50": "don't mix".

## 14 EXAM: which limit applies (pause s6, reveal s7) — exam room
- Q (visible from s0): "Nexo now runs on the Microsoft Copilot harness. Contoso wants to upload a file of real questions to the Evaluate tab. Which limit applies?"
- A "One hundred questions of one thousand characters" (trap) · B "A single CSV file up to five megabytes in size" (right) · C "Twenty five conversations until the first run".
- Why: "Evaluate tab: **CSV ≤ 5 MB**. **100 questions** is the standard harness; **25** is a generate option."
- Proof: the two limit cards from scene 13, purple one highlighted, brick one dimmed.

## 15 Monday, measured (s0-5) — world, fills the frame
s0 wide callback to scene 0 framed across the whole width (team corner, exam hall, binder). s1 the scoreboard appears with content: "Before 74%" | "After 86%", same "Test set" name on both; the makers' bubbles shrink and disappear. s2 title "Remember for the exam". s3-5 a recap column builds one line per sentence (brick colour, then purple): "Standard: CSV/TXT · 100 questions · 1,000 characters · expected responses for Exact match" · "Only No auth or Authenticate with Microsoft · no Fabric data agents" · "Evaluate tab: 5 MB · 10 conversations · then 25 / 50". Hold >= 3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 5, 9, 14 with pauseSentence 7, 6, 6 (0-based). Right 2, 0, 1; trap 0, 1, 0. Questions and options exactly as above.
