# L04 storyboard: world style (spec for the composition)

Narration `research/video-long/L04-script.json`, timings `video/L04/beats.json` (17 scenes, 7:22). Build on the world library `tools/video/world/`. Same global rules as `L05-storyboard.md` (keywords only, ≥26 px, GSAP only, no blur, no SFX, no blank frames, mode change every 20-40 s). Sentences per scene: 0:7 1:6 2:6 3:5 4:6 5:11 6:5 7:5 8:10 9:6 10:7 11:10 12:5 13:10 14:5 15:7 16:5.

## World layout (3840x2160)
- **HR office** (centre): the HR agent (L05 robot with yellow "HR" folder) behind a counter. Three employees queue at the counter (they return in scenes 0 and 16).
- **The tap** (left of the agent): a big stylised water tap that the agent's answers flow out of as speech-bubble "drops". On the tap: a **filter cartridge** with a dial (moderation level). Under it a second **valve** labelled "Grounding" connected to **pipes** that come from a "Sources" tank (documents) and a "Tools" box. When grounding is required, only drops coming through those pipes can exit.
- **Checkpoints**: two small gates on the path in (user message) and the path out (agent answer), each with a scanner light.
- **Control room** (right, top): a monitor wall for "Transcripts" and "Application Insights" (scene 7).
- **Maker** desk with laptop (UI mode). Colour code as in L05: red = blocked, amber = warning, blue = agent, green = correct.

## 0 Three bad answers (s0-6)
Wide. s0 title "Friday at Contoso". s1-2 employee 1 sends an offensive bubble (shown as a red jagged bubble with "#!*" glyphs, no real words). s3 employee 2 asks about a policy; the agent answers with a bubble marked "invented" (dashed outline). s4 employee 3 asks "Ana's leave balance?" and receives a number card (amber). s5-6 three numbered tags appear over the three bubbles: "harm", "made up", "policy".

## 1 The filter on the tap (s0-5)
Camera to the tap. s1 drops (bubbles) flow out. s2 "Responsible AI = controls" pill. s3 the filter cartridge glows; dial turns from coarse to fine on "how fine". s4 the grounding valve glows; only drops arriving through the Sources/Tools pipes pass. s5 two labels "Moderation · filters harm" and "Grounding · requires sources".

## 2 Two checkpoints (s0-5)
The in-gate scans a user bubble (s1), the out-gate scans an agent bubble (s2). s3 a harmful bubble turns red at the in-gate and stops. s4 a red banner (UI style) "The content was filtered due to Responsible AI restrictions". s5 a code chip "ContentFiltered" pins to the banner and slides to a corner (it returns in scene 7).

## 3 Standard harness levels (s0-4)
UI mode (maker laptop): three panels stacked: "Agent" dial, "Generative answers node" dial (inside a topic canvas), "Prompt" dial. s3-4 two dials disagree (agent: Low, node: High); at runtime an arrow shows the topic's node winning → pill "topic's level wins".

## 4 Highest filters more (s0-5)
World: the filter dial labelled Lowest ↔ Highest. Turning to Highest: few drops come out (s1-2). Turning to Lowest: many drops, some red ones slip through (s3). s4 a crossed-out myth card "Highest = more answers". s5 back at the tap: finer filter → less water.

## 5 EXAM: the most answers (pause s7, reveal s8)
- Q: "A maker wants the content moderation level that generates the most responses and accepts more risk. Which one?"
- A "Highest, it unlocks the most answers" (trap) · B "Lowest" (right) · C "Medium, it balances answers and safety".
- Proof: the tap at Lowest, many drops, a couple red.

## 6 One dial on the Microsoft Copilot harness (s0-4)
UI mode: agent settings with a harness chip "Microsoft Copilot harness (formerly GitHub Copilot harness)". Cursor opens tab "AI & behavior"; a single slider "Moderation level" with 5 stops Minimum · Low · Medium · High · Maximum. s3 cursor clicks Save, then Publish (pill "active after save + publish"). s4 world: one dial wired to several task boxes; lowering it dims all of them together.

## 7 The silent filter (s0-4)
World: a generative answers node box receives a question; output pipe returns nothing (empty bubble outline, no error) s1-2. s3 camera to the control room monitors "Transcripts" and "Application Insights"; a search field types "ContentFiltered" and one row highlights red. s4 pill "the filter, not a bug".

## 8 EXAM: one creative task (pause s7, reveal s8)
- Q: "On the Microsoft Copilot harness, a maker lowers the moderation level to help one creative task. What is the effect?"
- A "Only that task's node uses the lower level" (trap) · B "Every task of the agent uses the lower level, after save and publish" (right) · C "Nothing changes until an admin approves it".
- Proof: the one-dial wiring from scene 6, all task boxes dim together.

## 9 No source, no answer (s0-5)
Grounding valve close-up. A drop arriving through the Sources pipe passes (s1). A drop from nowhere (no pipe) hits the closed valve when "Allow ungrounded responses: Off" toggles (s2-3); it turns into a grey "fallback" bubble "Sorry, I can't answer that from my sources" (s4). s5 label "no making things up".

## 10 One job each (s0-6)
Three switch cards on a wall: "Allow ungrounded responses", "Temperature", "Content moderation". On "does not filter harmful content" the first two get a small red "not harm" stamp; moderation gets "harm"; grounding gets "requires sources" (s3-4). s5-6 two mismatched fixes are crossed out: "moderation → invented answers ✗", "ungrounded off → offensive content ✗".

## 11 EXAM: the invented policy (pause s6, reveal s7)
- Q: "The HR agent invents answers about policies that are not in its sources. What fixes it?"
- A "Raise content moderation to Highest" (trap) · B "Turn off Allow ungrounded responses" (right) · C "Lower the temperature".
- Proof: invented drop blocked at the grounding valve, fallback bubble appears.

## 12 Moderation is not policy (s0-4)
Employee 3's request "Ana's leave balance?" passes both checkpoints green (not harmful) s1. s2 pill "moderation = harm only". s3-4 four controls snap in around the agent as small shields: "Instructions", "Knowledge scope", "Tools", "Permissions"; the leave card now bounces.

## 13 EXAM: the leave balance (pause s6, reveal s7)
- Q: "Any employee can ask the HR agent for a coworker's leave balance, and it answers. Which controls should stop this?"
- A "Raise content moderation to Maximum" (trap) · B "Instructions, knowledge scope, tools and permissions" (right) · C "Turn off Allow ungrounded responses".
- Proof: the four shields from scene 12, the request bounces, each user reaches only their own card.

## 14 Say it is an AI (s0-4)
UI mode: topic list → "Conversation Start" topic; a message node types "I am an artificial intelligence assistant, and my answers are generated." World: an employee reads the notice on a chat bubble and nods.

## 15 The steps (s0-6)
UI mode cursor run-through, one step per sentence: Settings → Generative AI → Content moderation dropdown "Highest" → toggle "Allow ungrounded responses" Off → Save → test panel with two test questions → Conversation Start notice.

## 16 Friday, fixed (s0-4)
Callback to scene 0: the three bubbles again, each now stopped by its control (s1 checkpoint red, s2 grounding valve + fallback, s3 policy shields). s4 recap row: "Highest filters more" · "Topic level wins (standard)" · "One dial (Microsoft Copilot harness)". Hold ≥3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 5, 8, 11, 13 with pauseSentence 7, 7, 6, 6 (0-based) and the questions/options above (right/trap 0-based).
