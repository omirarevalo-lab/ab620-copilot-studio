# F02 storyboard: world style (spec for the composition)

Narration `research/video-long/F02-script.json` (10 scenes, ~5 min before the exam silences, ~5.2 min with them), timings `video/F02/beats.json`. **Basic lesson:** calm pace, one image per idea, few labels. Build on the world library `tools/video/world/` (closest siblings: `video/F01/composition.html`, `video/L37/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Same global rules as `F01-storyboard.md`. Sentences per scene (0-based cues s0…): 0:7 1:7 2:7 3:7 4:11 5:7 6:10 7:7 8:10 9:8 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson (F01 rules + layout lint)
- **Lint first:** `node tools/video/lint-layout.mjs F02` must show **no BLOQUEANTE** before any full render (BORDE-CORTADO, SOLAPE, VACIO > 1 s, DOBLE-EXPOSICION). Every label has its own free slot (never on another label, pill or panel title); nothing within 120 px of the frame edge at 1080p; no panel/window shown before its first line; previous layer fully faded out before the next one fades in. Nothing is born on top of another object or crosses one; every animated object has a clear destination inside the current camera frame.
- **Text size:** world labels >= 60 px on the 3840x2160 canvas (>= 30 px at 1080p in the widest shot that shows them, wide shots and the close included); UI text >= 30 px at 1080p. A label that would be < 30 px in a wide shot is hidden there and shown only in the close-up.
- **Margins:** every subject >= 120 px (1080p) from the edges; the closing shot fills the frame (no empty third, no empty floor band).
- **Pills:** at most 2 on screen, each in a reserved slot (top-left / bottom-centre); no pill longer than ~15 s.
- **Panels and UI windows:** never empty or half-filled at rest; a window arrives with its content; list rows present as dim placeholders with text, then lit on their words.
- **Exam rooms:** question card visible from s0 ("Your turn.") and for the whole scene; options in rows across the full width (~75 % with the ring at right, as F01), appearing on their sentences; full fade-out before fade-in, both ways. After "Decide before I answer." the fixer inserts **3.5 s of silence** (`narration.mp3` + `beats.json`); the 3-2-1 ring starts when that sentence ENDS, nothing moves or changes shade in the silence (no option highlighted before the reveal), the answer reveals on the reveal sentence. On-screen options drop the spoken "Or" and the "?". Reveal: explanation on the right + proof mini-scene below, so no half of the frame is empty after the reveal.
- **Piece colour code (whole lesson, fixed; reuse in exams and close):** Instructions = blue-grey sheet (#5a6b8c), Knowledge = teal book / SharePoint folder (#0f7b8a), Tools = amber wrench (#d98a00), Topics = purple script cards joined as a node chain (#8a5cd6). Nexo = F01 blue robot with antenna. Green = correct only. No SFX.
- **Continuity with F01:** same Contoso IT floor, same four IT people, same Nexo robot and Teams door. **No repeats of F01:** no workshop/assembly arm, no engine room, no control room, no harness talk.

## World layout (3840x2160) — "Nexo's office"
- **Teams door + inbox** (far left, x 200-700): the Teams door from F01; employee message bubbles arrive here.
- **Nexo's desk** (x 800-1500): Nexo at a small desk as the new employee; a pinboard behind it for the job description sheet (Instructions).
- **Library shelf** (x 1650-2250): four labelled shelves "Websites" · "Files" · "SharePoint" · "Dataverse" (Knowledge, teal).
- **Systems wall** (x 2400-3000): six amber sockets in a 2x3 grid "Connector" · "Agent flow" · "Prompt" · "REST API" · "MCP server" · "Computer use"; a server box "Help desk" beside it (Tools).
- **Script cabinet** (x 3100-3640): a purple cabinet with script cards; the open card shows a node chain (Topics).
- Maker desk with laptop for UI mode (scene 7): grey-blue generic window "Copilot Studio", no logos.

## 0 Nexo's second week (s0-6) — world
Wide on Teams door + Nexo's desk. s0 title "Two weeks later" (top-left slot). s1 a bubble "My VPN won't connect" comes through the Teams door; Nexo answers with a green "Steps from the guide" card (both then fade). s2 tag "new requests" (bottom-centre). s3 bubble "Status of my ticket?" → Nexo shows a grey "?" card; tag "can't see it". s4 bubble "Server outage!" → Nexo's reply card has an empty dashed line "which system?" in red. s5 camera pulls back across the whole office (desk, shelf, wall, cabinet visible, unlabelled); tag "a different piece each time". s6 Nexo's outline opens like a cutaway: four empty slots inside (sheet, book, wrench, script card silhouettes). Bubbles fade fully before the camera move.

## 1 The new employee (s0-6) — world (Nexo's desk)
s0 four slot silhouettes over Nexo, dim, with labels dim: "Instructions" · "Knowledge" · "Tools" · "Topics" (equal gaps, one row above the desk). s1 Nexo wears a small "new hire" badge. s2 a job-description sheet lands on the pinboard → slot "Instructions" lights (blue-grey). s3 a document folder lands on the desk → "Knowledge" lights (teal). s4 a keycard is handed over → "Tools" lights (amber). s5 a small stack of script cards → "Topics" lights (purple). s6 pill "which piece fits?" (bottom-centre); all four slots stay lit to scene end, then fade fully.

## 2 Instructions: the job description (s0-6) — world → close-up on the pinboard
s0 camera to the pinboard; the sheet grows into a readable card "Instructions" (blue-grey header). s1 tag "plain language · Overview page" (own slot under the card). s2 three dim rows inside the card light one per word: "who it is" · "how it talks" · "what it must not do". s3-5 the card's body types Nexo's text, one line per sentence: "You are Nexo, the Contoso IT assistant." · "Answer briefly." · "If you don't know, offer to open a ticket." s6 two contradicting sticky notes ("Always answer in detail" vs "Answer briefly") appear beside the card, the first one gets struck in red and falls away; tag "no contradictions".

## 3 Knowing and doing (s0-6) — world (shelf + systems wall, split frame)
s0 camera frames shelf (left half) and systems wall (right half); kinetic split title "KNOW" over the shelf, "DO" over the wall (104 px, then shrink to labels). s1 the four shelves light one per word: "Websites" · "Files" · "SharePoint" · "Dataverse". s2 an answer card with a book icon leaves the shelf toward Nexo (destination: Nexo's slot icon at frame edge, inside margins). s3 the six sockets light one per word: "Connector" · "Agent flow" · "Prompt" · "REST API" · "MCP server" · "Computer use". s4 a live-data arrow runs from the "Help desk" box through "Connector" (two-way arrow, amber). s5-6 rule board under both halves (own row, fills the lower third): "written in a document → knowledge" (teal, lights on s5) · "query a system or change something → tool" (amber, lights on s6).

## 4 EXAM: ticket status (pause s7, reveal s8) — exam room
- Q (visible from s0): "An employee asks Nexo for the current status of their ticket. That status lives in the help desk system and changes all day. Which piece do they add?"
- A "Knowledge, with the help desk guides" (trap) · B "A topic, with fixed ticket questions" · C "A tool that queries the help desk" (right).
- Why: "The status is **live data** in a **system**, so Nexo must **query** it. Knowledge only reads what is **already written**."
- Proof (built with the reveal): the teal shelf "Help desk guides" dimmed with a small "written yesterday" chip; the amber wrench linked by a two-way arrow to the "Help desk" box, chip "status: In progress" lit green.

## 5 Topics: scripts made of nodes (s0-6) — world (script cabinet)
s0 camera to the purple cabinet; one script card slides out and grows (title "Topic"). s1 tag "a conversation you design". s2 the first node "Trigger" lights at the top of the card. s3 the chain builds down one node per word, each in its own row: "Message" · "Question" · "Condition" · "Call a tool" (connector lines drawn after each node lands, never through a node). s4 a small lock chip "exact order" beside the chain (own slot). s5 three use chips on the right, one per word: "validate a value" · "fixed process" · "exact result". s6 the card slides back; the shelf (teal) and wall (amber) light softly behind, tag "everything else: knowledge + tools".

## 6 EXAM: serious incidents (pause s6, reveal s7) — exam room
- Q (visible from s0): "For every serious incident, IT always needs the same data, asked in the same order: the affected system, then the urgency. How should Nexo collect it?"
- A "A topic with fixed questions in order" (right) · B "An instruction that asks for both details" (trap) · C "A knowledge file listing the questions".
- Why: "An **exact, repeatable process** is designed **step by step**. An instruction only **guides** the model, so a question **can be skipped**."
- Proof: a purple mini topic "Report serious incident": Trigger → Question "Affected system?" → Question "Urgency?" lit in order with green ticks; beside it the blue-grey instruction sheet with one red dashed skipped line.

## 7 Find each piece in the studio (s0-6) — UI (maker laptop)
s0 camera enters the maker laptop; window "Copilot Studio · Nexo" arrives with its content (dim tabs "Overview · Knowledge · Tools · Topics" present from the start). s1 "Overview" lit: an "Instructions" box with Nexo's three lines (text >= 30 px). s2 "Knowledge" lit: button "Add knowledge" clicked; a source list with two dim rows "Public website" · "File" lighting. s3 "Tools" lit: cursor on "Add a tool"; a picker panel arrives filled with four connector rows. s4 "Topics" lit: two groups "System" and "Custom" with rows; the cursor opens "Report serious incident" and its node chain shows (purple, as scene 5). s5-6 right panel "Test": typed "How do I reset my password?" → answer bubble; then a small chip under the answer, coloured by piece: "Answered from: Knowledge" (teal). Window shrinks back into the laptop at scene end.

## 8 EXAM: the ignored tool (pause s6, reveal s7) — exam room
- Q (visible from s0): "Nexo has a ticket tool, but it rarely chooses it, even though the instructions talk about tickets. What should the maker improve?"
- A "Stricter rules in the instructions" (trap) · B "A clear description of the tool" (right) · C "More ticket guides as knowledge".
- Why: "The agent reads the **descriptions** of tools and topics to **choose** what to use. Instructions set **role and tone**; they don't replace a good description."
- Proof: a tool card "Tickets" with its description field: a vague line "Does ticket stuff" struck red → replaced by "Creates and checks help desk tickets" in green; an arrow from Nexo now picks this card.

## 9 Every piece in its place (s0-7) — world, fills the frame
s0 wide callback across the whole office (Teams door left → cabinet right, inside margins, no empty floor band: the four IT people stand behind the desk row as in F01). s1 the instructions sheet on the pinboard shows "Answer briefly". s2 the shelf "SharePoint · IT guides" lights. s3 a new amber socket "Ticket status" plugs into the "Help desk" box. s4 the purple card "Report serious incident" with "Affected system → Urgency". s5-6 recap board (top-right, own area, big text, one line per idea, lights per word group): "Documents → knowledge" (teal) · "Live systems → tools" (amber) · "Exact processes → topics" (purple). s7 three bubbles from scene 0 come through the Teams door and each flies to its piece (VPN → shelf, ticket status → socket, outage → cabinet) with green ticks; tag "next: how Nexo decides". Hold >= 3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 4, 6, 8 with pauseSentence 7, 6, 6 (0-based). Right 2, 0, 1; trap 0, 1, 0. Questions and options exactly as above.
