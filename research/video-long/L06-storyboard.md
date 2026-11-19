# L06 storyboard: world style (spec for the composition)

Narration `research/video-long/L06-script.json`, timings `video/L06/beats.json` (18 scenes, 7:56). Build on the world library `tools/video/world/`. Same global rules as `L05-storyboard.md`. Sentences per scene: 0:7 1:5 2:11 3:5 4:7 5:9 6:7 7:9 8:6 9:4 10:7 11:11 12:4 13:5 14:11 15:5 16:9 17:5.

## World layout (3840x2160)
- Three agent desks in a row: **IT agent** (robot with headset), **HR agent** (yellow folder), **Sales agent** (robot with a chart badge). Each desk has a slot for pieces.
- **The Lego box** ("Component collection: Greeting and escalation") on a shelf in the middle top: a transparent box with coloured blocks; block types are icons: topic (chat bubble), tool (wrench), knowledge (book), flow (arrows), entity (tag), child agent (mini robot), MCP (plug). A small padlock on the lid with three key holders: "Creator", "System customizer", "Administrator".
- **Solution truck** (bottom right): a delivery truck labelled "Solution" that drives from a "Development" building to a "Production" building.
- **Skills library** (left): a shelf of Markdown scroll cards for the Microsoft Copilot harness section, each scroll with a header "name / description" and a body of lines.
- Maker desk with laptop (UI mode). Colour code as L05.

## 0 Three copies (s0-6)
Wide. s0 title "Three agents at Contoso". s1 the three desks light up. s2-3 the maker photocopies a "Greeting" block three times (copy icon), one per desk. s4 a calendar flips "a month later". s5 a wrench fixes the IT block (turns green); s6 HR and Sales blocks stay red with a "bug" tag → label "three versions".

## 1 Lego box (s0-4)
Camera to the box. s1 blocks snap in. s2 the three desks plug into the same box via thin cables. s3 one block in the box is fixed → all three desks flash green together. s4 label "fix once, everyone gets it".

## 2 What goes in the box (s0-10)
Each block type drops into the box on its word (topics, tools, knowledge, flows, entities, child agents, MCP), with a 34 px label. s7-10: the Contoso box shows "Greeting", "Escalate to a human" (topics) + "Create ticket" (tool); three agents add the box.

## 3 Use, but do not touch (s0-4)
An HR author tries to bend a block: the padlock flashes red ("use ✓, change ✗"). s2-3 the three key holders glow: Creator, System customizer, Administrator. s4 "box stays clean".

## 4 Why not copy and paste (s0-6)
Three crossed-out options as cards: "Copy and paste → out of sync" (s1-2 recall the red copies), "Child agent → not shared" (a mini robot tied to one desk only), "Export whole agent → too much" (a huge crate for 3 small blocks). s6 the Lego box gets a green check.

## 5 EXAM: share without breaking (pause s6, reveal s7)
- Q: "Contoso wants the same topics and tool in its IT, HR and Sales agents, and their authors must not change them. What should the maker use?"
- A "Copy the topics by hand into each agent" (trap) · B "A component collection" (right) · C "Export the whole IT agent and import it three times".
- Proof: the box with three cables and the padlock.

## 6 Heavy boxes travel in a solution (s0-6)
The box gains two heavy blocks: "Connector" (plug) and "Environment variable" ({x}). s2 the box is loaded into the **Solution truck** in Development; s3-4 the truck drives to Production and unloads (export → import labels on the road). s5-6 a small side path: "Export collection directly → managed, simpler cases" with a light box on a bicycle.

## 7 EXAM: the trip to production (pause s6, reveal s7)
- Q: "The collection now includes connectors and environment variables and must move to production. What is recommended?"
- A "Export the collection directly" (trap) · B "Add the collection to a solution, then export and import the solution" (right) · C "Rebuild the components by hand in production".
- Proof: the truck arriving at Production.

## 8 Skills (s0-5)
Camera to the skills library. Harness chip "Microsoft Copilot harness (formerly GitHub Copilot harness)". A scroll unrolls with three parts on cue: name · description · Markdown instructions. s3 a user request bubble matches the description (green line) and the orchestrator (a small router node) activates the scroll. s4 paper clips = supporting files. s5 the scroll is copied into several agents and shared as a file/package icon.

## 9 Writing and adding a skill (s0-3)
s0 the description line glows with a pill "for the model: routing". s1 name chip "refund-requests" with rules ticked: lowercase · numbers · hyphens · no hyphen at start or end · unique in the agent (a bad name "-Refunds_" gets struck). s2-3 UI mode: Build tab → Skills → Add; two upload options: "Markdown + YAML front matter (name, description)" and "ZIP: SKILL.md + supporting files".

## 10 Skill, or something else? (s0-6)
A decision board with 5 rows filled on cue: "Repeatable, consistent, reused → Skill" · "One-off → Agent instructions" · "Single external action → Tool" · "Fixed sequence, defined inputs/outputs → Workflow" (a rail track with stations, pill "enforces order") · "Own owner and life cycle → Connected agent" (second robot with its own badge).

## 11 EXAM: the strict sequence (pause s7, reveal s8)
- Q: "Five steps must always run in the same order, with defined inputs and outputs, and the order must be enforced. What should the maker use?"
- A "A skill, because it runs consistently" (trap) · B "A workflow" (right) · C "A single tool".
- Proof: rail track with 5 stations, a train cannot skip a station.

## 12 Portable instructions (s0-3)
A scroll travels from the HR desk to the Sales desk. Inside it: "tone, audience, policy" lines restated (green). A line "use the HR lookup tool" turns red when it lands at Sales (no such tool there) → pill "don't hard-code tools or data".

## 13 Fixing a skill (s0-4)
Three-row troubleshooting card filled on cue: "Upload fails → front matter / name / description" (a scroll with an empty name field, red) · "Fires wrongly → refine description" · "Wrong output → refine instructions". s4 UI: edit source → "Replace" button clicked.

## 14 EXAM: the eager skill (pause s7, reveal s8)
- Q: "A refunds skill keeps activating for questions about shipping times. Its output for real refund requests is perfect. What should the maker refine?"
- A "The instructions inside the skill" (trap) · B "The description" (right) · C "The name, so it sounds more specific".
- Proof: shipping bubble now passes the refunds scroll (description line sharpened), refund bubble still matches.

## 15 Memory, per user (s0-4)
Preview pill. A toggle "Memory" per agent (s1). Two users each get their own locker (s2-3); a note from user A never appears in user B's locker (red strike on a crossing arrow). s4 "a locker per user, not a noticeboard".

## 16 The steps (s0-8)
UI mode cursor run-through: Settings → Component collections → New collection "Greeting and escalation" → add Greeting topic + Create ticket tool → Save → open another agent → add collection → try to edit a component: read-only lock.

## 17 One box, three agents (s0-4)
Callback to scene 0: the three desks share the box; one fix flashes green on all three. The solution truck parked at Production. A skill scroll on the harness side. s4 recap row: "Consumers can't edit" · "Solutions carry heavy collections" · "Fires wrongly → description". Hold ≥3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 5, 7, 11, 14 with pauseSentence 6, 6, 7, 7 (0-based) and the questions/options above (right/trap 0-based).
