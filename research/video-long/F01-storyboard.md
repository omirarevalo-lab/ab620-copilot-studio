# F01 storyboard: world style (spec for the composition)

Narration `research/video-long/F01-script.json` (11 scenes, ~5 min before the exam silences, ~5.3 min with them), timings `video/F01/beats.json`. **Basic lesson:** calm pace, one image per idea, few labels. Build on the world library `tools/video/world/` (closest siblings: `video/L37/composition.html`, `video/L41/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Same global rules as `L05-storyboard.md`. Sentences per scene (0-based cues s0…): 0:8 1:5 2:6 3:10 4:7 5:5 6:5 7:11 8:5 9:11 10:6 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson (L37 rules + layout lint)
- **Lint first:** `node tools/video/lint-layout.mjs F01` must show **no BLOQUEANTE** before any full render (BORDE-CORTADO, SOLAPE, VACIO > 1 s, DOBLE-EXPOSICION). Every label has its own free slot (never on another label, pill or panel title); nothing within 120 px of the frame edge at 1080p; no panel/window shown before its first line; previous layer fully faded out before the next one fades in.
- **Text size:** world labels >= 60 px on the 3840x2160 canvas (>= 30 px at 1080p in the widest shot that shows them); UI text >= 30 px at 1080p. A label that would be < 30 px in a wide shot is hidden there and shown only in the close-up.
- **Margins:** every subject >= 120 px (1080p) from the edges; the closing shot fills the frame (no empty third).
- **Pills:** at most 2 on screen, each in a reserved slot (top-left / bottom-centre); no pill longer than ~15 s. Alias pill "formerly GitHub Copilot harness" ~4 s at its one mention (scene 5 s3) only.
- **Panels and UI windows:** never empty or half-filled at rest; a window arrives with its content; list rows present as dim placeholders with text, then lit on their words.
- **Exam rooms:** question card visible from s0 ("Your turn."); options appear on their sentences; full fade-out before fade-in, both ways. After "Decide before I answer." the fixer inserts **3.5 s of silence** (`narration.mp3` + `beats.json`); the 3-2-1 ring starts when that sentence ENDS, nothing moves in the silence, the answer reveals on the reveal sentence. On-screen options drop the spoken "Or" and the "?". Reveal panels: explanation on the right + proof mini-scene below, so no half of the frame is empty after the reveal.
- **Piece colour code (whole lesson, fixed):** Agent = blue (Nexo robot), Workflow = teal (drag-and-drop blocks), Agent flow = amber (chain of steps). Parts: Instructions = sheet, Knowledge = book/SharePoint folder, Tools = wrench. Harnesses: standard = grey-blue with brick accent (as L35-L37), Microsoft Copilot = purple glass tower, Copilot chat = speech-bubble kiosk (navy). No SFX.
- **No repeats of L37:** no results wall, no trays, no case slips.

## World layout (3840x2160) — "Contoso IT floor and the workshop"
- **IT desk** (left, x 200-1100): four IT people (crowd characters, distinct colours) at one long desk, phone and chat bubbles above them. Label "Contoso IT" (own slot above the desk).
- **Workshop** (centre, x 1300-2600): a workbench with three part bins "Instructions" (sheet), "Knowledge" (book), "Tools" (wrench); an assembly arm; output conveyor to the right. Big sign "Copilot Studio" over the bench (only in the wide shot, >= 60 px).
- **Channel doors** (right, x 2800-3600): a row of doors "Teams" · "Microsoft Copilot" · "Website" · "Mobile app" (one free slot "and more" chip).
- **Engine room** (below the workshop, reached by a camera tilt down; scene 5 only): three engines side by side, >= 360 px apart: "Standard" (grey-blue block, brick accent), "Microsoft Copilot" (purple glass tower), "Copilot chat" (navy kiosk with a speech bubble).
- **Control room** (far right, behind the doors, scene 8): three screens "Analytics" · "Evaluations" · "Administration".
- Maker desk with laptop for UI mode: grey-blue window "Copilot Studio" (generic, no logos).

## 0 Same questions all day (s0-7) — world
Wide on the IT desk. s0 title "Monday at Contoso" (top-left slot). s1 the four IT people, label "Contoso IT · four people". s2-4 one chat bubble per sentence pops above the desk, each in its own slot (left to right, equal gaps): "My VPN won't connect" · "Forgot my password" · "Printer offline again". s5 a shelf "IT guides" lights up behind them; tag "the answer is already written". s6 a dashed outline of a robot appears inside a Teams window on the desk monitor; tag "an assistant in Teams?" s7 camera pulls to the workshop sign: kinetic title "Copilot Studio" (104 px). Bubbles fade fully before the camera move.

## 1 An assembly workshop (s0-4) — world (workshop)
s0 tag "build AI agents · very little code" (bottom-centre pill). s1 the workbench framed; the three bins light. s2 one part per word (`W`): "instructions" → sheet slides to the arm, "knowledge" → book, "tools" → wrench; each bin label stays readable. s3 the arm assembles them into Nexo (blue robot, no name yet: label "agent"); the robot rides the conveyor to the channel doors (doors visible, unlabelled in this wide shot). s4 a browser frame closes around the whole workshop, tag "web app · nothing to install" (own slot, top-right inside margins).

## 2 Three things you build (s0-5) — world (workshop, three stands)
s0 three stands on the bench, equal gaps, labels dim with text: "Agent" · "Workflow" · "Agent flow". s1 "Agent" lights: the blue robot with a chat bubble and a check. s2 three thin cables to the agent: sheet · book · wrench icons (no new labels). s3 "Workflow" lights: teal blocks snap together on a canvas, tag "drag and drop". s4 "Agent flow" lights: amber step chain, tag "like Power Automate". s5 the amber chain detaches once (runs alone, small play icon), then plugs into the agent's wrench socket; tag "or as a tool". All three stands stay lit to scene end, then fade fully.

## 3 EXAM: which piece? (pause s6, reveal s7) — exam room
- Q (visible from s0): "Contoso wants an assistant that chats with employees, answers from the IT guides, and opens a ticket when the steps fail. Which piece do they build?"
- A "A workflow from the drag and drop designer" · B "An agent that chats and completes tasks" (right) · C "A classic agent flow that runs on its own" (trap).
- Why: "An agent **chats**, uses **knowledge** and calls a **tool**. A flow can be **one of its tools**."
- Proof (built with the reveal): the blue agent with a chat bubble, a book and a wrench socket; the amber flow "Open ticket" plugged into the socket.

## 4 Your first agent (s0-6) — UI (maker laptop)
s0 camera enters the maker laptop; window "Copilot Studio" arrives with its content (dim). s1 sign-in card "Work or school account" with cursor click, then it fades fully. s2 Home page: left nav "Home" lit, a list "Your agents" (two dim rows) and a big box "Describe your agent". s3 cursor types in the box: "Answer IT questions from our guides" and clicks "Create". s4 top bar right: chip "Environment: Contoso Dev" pulses (cursor hover). s5 the agent page: tabs lit one per word: "Overview" · "Knowledge" · "Tools" · "Topics" · "Settings" (all present dim from s5 start). s6 right panel "Test your agent": typed "My VPN won't connect" and a short reply bubble "Here are the steps…". UI text >= 30 px; the window shrinks back into the laptop at scene end.

## 5 The engine underneath (s0-4) — world (engine room)
s0 camera tilts below the workshop floor; label "harness = the engine". s1 three gauges over the engine room, one per word: "reasoning" · "complexity" · "billing". s2 "Standard" engine lights: a rule card with a fixed path of three steps; tag "rules · repeatable". s3 "Microsoft Copilot" tower lights (purple): a branching path of many steps; tag "multi-step reasoning"; alias pill "formerly GitHub Copilot harness" ~4 s (bottom-centre). s4 "Copilot chat" kiosk lights: a Copilot Chat bubble plus a small book; tag "extends Copilot Chat". Each tag in its own slot under its engine; previous tag stays dim, never overlapping the next.

## 6 How a standard agent answers (s0-4) — world (standard engine close-up)
s0 the purple and navy engines dim fully; a badge "This course" on the standard engine. s1 a user question bubble enters Nexo; three topic cards fan out ("VPN help" · "Password reset" · "Printer"), the best one ("VPN help") lifts with a green outline. s2 the lifted card opens into a mini flow: "step · question · condition" icons; tag "you design it". s3 a second question "What's the lunch menu?" finds no card; it drops to a book "Knowledge" and an answer bubble returns; tag "outside topics → knowledge". s4 a SharePoint folder snaps to the book; clock chip "minute one"; Nexo answers at once.

## 7 EXAM: which harness? (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso builds an HR agent for leave requests. Every conversation follows the same rules and the same questions, in the same order. Which harness fits?"
- A "The standard harness, for structured rules" (right) · B "The Microsoft Copilot harness, for reasoning" (trap) · C "The Copilot chat harness, for Copilot Chat".
- Why: "**Rules** and **repeatable conversations** are the standard harness's job. The **Microsoft Copilot harness** is for multi-step reasoning, **billed differently**."
- Proof: the scene-5 engines in miniature: the fixed three-step path on "Standard" lit green; the purple tower with its branching path dimmed, tag "billed differently".

## 8 Publish and operate (s0-4) — world (doors → control room)
s0 the robot rides the conveyor to the channel doors; doors light one per word: "Teams" · "Microsoft Copilot" · "Website" · "Mobile app", chip "and more". s1 camera moves through the doors into the control room; label "in production". s2 screen "Analytics" lights: a line chart and "sessions". s3 screen "Evaluations" lights: a short test list with green checks. s4 screen "Administration" lights: three icons "inventory · security · costs". Screens are equal width, inside margins; each label inside its screen frame, >= 30 px.

## 9 EXAM: which area? (pause s7, reveal s8) — exam room
- Q (visible from s0): "Nexo is live in Teams. Before each change, the IT lead wants to measure answer quality with a set of test questions. Which area do they open?"
- A "Analytics, for performance and sessions" (trap) · B "Administration, for inventory and costs" · C "Evaluations, for test sets and quality" (right).
- Why: "**Evaluations**: test sets **measure quality**. Analytics shows **real sessions**; Administration covers inventory, security and costs."
- Proof: the three control-room screens in miniature: "Evaluations" with green checks lit, the other two dimmed.

## 10 Nexo goes live (s0-5) — world, fills the frame
s0 wide callback to scene 0 across the whole width: IT desk left, workshop centre, Teams door right (inside margins). s1 the robot gets its name label "Nexo · IT agent". s2 parts snap in one per word: sheet "instructions", SharePoint folder "IT guides", wrench "open ticket"; Nexo passes through the "Teams" door. s3 an employee bubble "My VPN won't connect" on the Teams door. s4 Nexo answers with a "Steps from the guide" card; a ticket "Ticket opened" slides out after "fails". s5 the three repeat bubbles from scene 0 fly to Nexo; the IT people turn to one big red folder "hard cases". Final recap board (top-right, big text, own area, one line per idea, appears over s5): "Agent = instructions + knowledge + tools" · "Standard harness: topics, then knowledge" · "Publish → channels · operate → Analytics, Evaluations, Administration". Hold >= 3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 3, 7, 9 with pauseSentence 6, 7, 7 (0-based). Right 1, 0, 2; trap 2, 1, 0. Questions and options exactly as above.
