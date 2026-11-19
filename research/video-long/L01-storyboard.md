# L01 storyboard: world style (spec for the composition)

Narration `research/video-long/L01-script.json` (12 scenes, ~6.4 min before the exam silences, ~6.6 min with them), timings `video/L01/beats.json`. **Intermediate lesson, opens module 1:** steady pace, one image per idea. Build on the world library `tools/video/world/` (closest siblings: `video/F08/composition.html`, `video/F05/composition.html`, `video/L37/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Sentences per scene (0-based cues s0…): 0:7 1:9 2:5 3:8 4:11 5:5 6:7 7:11 8:7 9:11 10:7 11:7 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson (F08 rules + F08 review fixes, all mandatory)
- **Lint first:** `node tools/video/lint-layout.mjs L01` must show **no BLOQUEANTE** before any full render (BORDE-CORTADO, SOLAPE, VACIO, DOBLE-EXPOSICION).
- **Margins:** every subject, label, panel and chip >= 120 px from every frame edge at 1080p, bottom edge included, in every shot (pans and zooms too: never cut a sign at the edge while resting).
- **Text size: ALL text >= 32 px at 1080p**, no exceptions: labels, sub-labels, card sub-lines, gauge ends, UI rows, reveal text, proof chips. If it does not fit, cut words or zoom; never shrink.
- **Full frames from the first second:** every shot fills width and height (scene 0 and the close included); no empty band > 20 %; characters large (Valeria and Nexo >= 300 px tall in close shots). No empty placeholder boxes: a frame/slot is drawn only with its content.
- **Names on screen, exact:** when the voice names a bridge, system or button, its label (exact words of this storyboard) is on screen in its own slot.
- **Reserved slots, no covering:** cards and chips enter only in slots reserved for them; nothing covers another object; moving objects follow a free path.
- **No ghosts, no double exposures:** in any crossfade or swap on the same spot, the old element reaches opacity 0 **before** the new one starts (sequential, ≤ 0.25 s each), never overlapped.
- **State matches the story;** dimmed items #5b6578 on #e7eaf1. **UI windows** fill ~80 % of the frame with no empty half (rows sized to content). **Dialogs opaque** from their first frame.
- **Transitions:** no empty or grey frame > 0.5 s. Something happens on every sentence; the close moves until the 3 s tail, in a close shot.
- **Pills:** at most 2 on screen, reserved slots (top-left / bottom-centre); none longer than ~15 s. Chip texts exactly as written here.
- **Exam rooms:** question card **and** all three options enter **together** at s0 ("Your turn."), dim, full-width rows (~75 % width, ring at right); each option brightens on its own sentence. On-screen options drop the spoken "Or" and the "?". After "Decide before I answer." the fixer inserts **3.5 s of silence**; the 3-2-1 ring starts when that sentence ENDS; nothing moves in the silence. **Reveal exactly at `S(i, 8)`**. Trap red, struck, "Trap" pill; right green with check; other at 50 %. Option rows shrink with an eased tween **>= 0.8 s**; explanation (right) and proof panels (below) enter **after** the rows finish; proof panels sized to their content and filled.
- **Colour code (whole lesson, fixed, one per bridge, reused in exams and close):** Connector = amber #d98a00 travel adapter (F05); Custom connector = amber dashed outline with spanner; REST API tool = navy #1f2a44 plug with "{ }" badge; MCP server = purple #8a5cd6 hub tower with several cables; Agent flow = teal #0f7b8a chain of numbered steps; Computer use = blue #2f5bd3 eye over a screen with a cursor. Correct = green #1e7f4f only; trap = red #c4392f. Nexo = blue robot; Valeria = F08 developer (purple top). No SFX.
- **Continuity:** Valeria's lab desk from F08 (now she builds), Nexo, Contoso people. **No repeats:** no theatre, no business park, no service city, no trail map, no library wing.

## World layout (3840x2160) — "The river of systems"
- **Nexo's bank** (left, x 200-1100): Valeria at her lab desk with laptop, Nexo standing at the river edge with an empty toolbelt.
- **River** (x 1100-2500): a wide blue river; bridges are built across it in reserved lanes (six lanes, one per bridge type, each >= 260 px apart).
- **Systems bank** (right, x 2500-3640), three buildings, each with its door type visible: "Invoice program" (old beige desktop PC with a screen only, no door socket), "Inventory system" (building with a socket plate labelled "OpenAPI"), "Other AI clients" (three small robots in different colours waiting at a purple hub spot).
- Maker laptop for UI mode (scene 10): generic grey-blue window "Copilot Studio · Nexo", no logos.

## 0 Three systems, three bridges (s0-6) — world (both banks, filled from frame 1)
s0 frame opens already full: Valeria at her desk (large, left), Nexo at the river edge, the three buildings on the far bank; title "Module 1" (top-left). s1 three job cards fly from a Contoso envelope to Valeria's pinboard, one per sentence, each in its own slot: s1 "Invoices · old desktop program · no API" (the "Invoice program" building lights). s2 "Inventory · OpenAPI file" (the "Inventory system" lights). s3 "Share tools · other AI clients" (the three robots light). s4 the river between them glows; tag "three different doors" (bottom-centre). s5-6 kinetic title "Pick the right bridge" (104 px) over the river, then shrinks to a pill top-left.

## 1 The bridges (s0-8) — world (river, six lanes)
s0 Nexo stands at the bank with an empty toolbelt, a phone with a dead screen and a desk with no computer: chip "chats only". s1 a hand icon lights on Nexo's toolbelt: chip "read · create · update". s2 label "six bridges" over the river. s3-8 one bridge builds per sentence in its lane, each with its colour and exact sign: "Power Platform connectors" · "Custom connectors" · "REST API tool" · "MCP servers" · "Agent flows" · "Computer use". On "Tools" (s8) a toolbelt pocket labelled "Tools" on Nexo collects all six small icons.

## 2 The question that sorts everything (s0-4) — world (far bank, a signpost)
s0 a big signpost at the river centre: "Does it expose an API?" (kinetic, then sign). s1 arrow to a building with a ready socket: "connector exists → use it" (amber adapter). s2 arrow to a building with an OpenAPI scroll: "OpenAPI → REST API tool or custom connector" (navy plug + dashed amber). s3 arrow to a building with a purple hub plate: "speaks MCP → MCP server". s4 arrow to the old invoice PC (screen only, no socket): "screen only → computer use" (blue eye). Each branch is a free lane; branch labels >= 32 px, one row each.

## 3 The order to choose (s0-7) — world → a numbered ladder beside the river
s0 a five-rung ladder appears on the bank, labelled "order of choice". s1 rung 1 lights "Prebuilt connector" + chip "no development"; s2 a slow hourglass chip "large results slow it". s3 rung 2 "Custom connector" + three small agents sharing one dashed amber bridge: chip "several agents, one API". s4-5 rung 3 "REST API tool" + chips "preview" · "Copilot Studio only". s6 rung 4 "Agent flow" + a teal chain with a human approval stamp: chip "ordered steps + approval". s7 rung 5 "MCP server" + a purple hub with many cables: chip "shared tool server".

## 4 EXAM: the shared inventory API (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso's inventory system has an OpenAPI file, but no ready connector. Three different agents need it, and a Power Automate flow needs it too. Which bridge do they build?"
- A "A REST API tool inside each agent" (trap) · B "A custom connector they all share" (right) · C "A Send HTTP request node per topic".
- Why: "**Many agents** share one **custom connector**, and it also works in **Power Automate**. The **REST API tool** lives **only inside Copilot Studio**."
- Proof (after the rows shrink, filled): left panel "Custom connector": one dashed amber bridge feeding three agent icons and a "Power Automate" icon (green); right panel "REST API tool": three separate navy plugs, the "Power Automate" icon crossed red, chip "Copilot Studio only".

## 5 Every bridge has a price (s0-4) — world (four price tags on four bridges)
s0 label "every bridge has a price". s1 the teal agent-flow bridge gets a price tag with four lines lighting per word group: "rate limits" · "error paths" · "response size" · "Copilot Credits". s2 the purple MCP bridge tag: "generative only" · "not from topics" · "descriptions on the server". s3 a small rope bridge "Send HTTP request" (one topic only): tag "quick · not shareable". s4 an old stone bridge "Bot Framework skills": tag "C# · Azure costs · outside Power Platform ALM". Tags in reserved slots above each bridge, never on another bridge.

## 6 MCP and computer use (s0-6) — world (MCP hub close-up → invoice PC close-up)
s0 camera to the purple MCP hub tower. s1 cables from the hub to Nexo and to the three other AI robots: chip "open protocol · many AI clients". s2 a cable plug labelled "Streamable HTTP" clicks in (green). s3 an old plug labelled "SSE" is rejected (red cross): chip "SSE no longer supported". s4 camera moves (free path) to the old invoice PC: the blue eye scans the screen, a cursor clicks fields: label "computer use: vision + reasoning". s5 both icons (hub, eye) get one shared badge "generative orchestration required". s6 a coin chip "5 credits per step (standard models)" beside the eye.

## 7 EXAM: the silent MCP tools (pause s7, reveal s8) — exam room
- Q (visible from s0): "A maker connects an MCP server to an agent that still uses classic orchestration. They want a topic to call its tools, but the tools never run. What must change?"
- A "Call the MCP tools from inside a topic" (trap) · B "Switch the server transport to SSE" · C "Switch to generative orchestration" (right).
- Why: "**MCP** only works when the agent **plans for itself**. **Topics cannot call it**, and **SSE** is **no longer supported**."
- Proof (after the rows shrink, filled): left panel "Generative": the planner path (purple) picks the MCP hub and the tool runs (green tick); right panel "Classic + topic": a topic card with a "Call tool" node trying the hub, red cross, chip "topics can't call MCP".

## 8 Doing, answering, describing (s0-6) — world (Nexo's bank, two shelves + a tool card)
s0 two signs side by side: "Tools: do" (wrench) · "Knowledge: answer" (book). s1-2 the knowledge side shows "Unstructured data": OneDrive and SharePoint files sliding into a Dataverse drum with a small vector grid: chip "synced · vector-indexed in Dataverse"; then third-party article cards arriving over a connector: chip "KB articles via connectors". s3 the tool side: Nexo looks at a tool card with fields "Name" and "Description". s4 a vague description "Does stuff" → Nexo picks the wrong tool (red) and then none (grey). s5-6 the description rewritten "Checks live stock for a product code" → Nexo picks it (green); chip "write it for a new teammate".

## 9 EXAM: the old invoice program (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso records invoices in an old desktop program. It has no API and nobody can reach its database, but Nexo must type each new invoice into it. Which bridge fits?"
- A "Computer use, working its screen" (right) · B "A custom connector to the program" (trap) · C "An MCP server running on the program".
- Why: "There is **only a screen**, so Nexo works it with **vision**. A **connector** and **MCP** both **assume an API**."
- Proof (after the rows shrink, filled): left panel "Computer use": the blue eye over the invoice form, fields filling (green); right panel "Connector / MCP": an amber adapter and a purple plug with nothing to plug into (no socket), chip "needs an API".

## 10 Add a tool in the studio (s0-6) — UI (maker laptop), window ~80 % of frame
s0 camera enters Valeria's laptop; window "Copilot Studio · Nexo" arrives with its content, "Tools" tab lit, list with two existing tools. s1 cursor on "Add a tool": a picker (opaque) with five category tiles lighting per word: "Connectors" · "MCP" · "REST API" · "Flows" · "Computer use". s2 tooltip under the tiles: "pick the bridge that fits". s3 cursor picks "REST API": upload field shows "inventory-openapi.json" (green check). s4 fields fill: Name "Check inventory" · Description "Checks live stock for a product code". s5 connection row "Inventory API" → "Connected"; button "Add to agent" clicked; the tool appears in the list. s6 test pane: "Do we have laptops in stock?" → reply with an activity strip "Check inventory" (green). Window shrinks back into the laptop at scene end. All UI text >= 32 px.

## 11 Every system, its bridge (s0-6) — world, close shot, motion on every sentence
s0 close shot on the river centre (Valeria and Nexo large on the left bank, the three buildings large on the right, filling the frame); title "Back at Contoso" (top-left); recap board slot top-right reserved. s1 a blue computer-use bridge reaches the "Invoice program"; an invoice card travels across and the PC screen fills it. s2 a navy REST API bridge reaches "Inventory system"; a stock card returns "Laptops: 12 in stock". s3 a purple MCP hub rises next to the inventory building; cables run to the three other AI robots, who each get the same tool icon. s4 recap board lights line 1: "Does it have an API?". s5 line 2: "Then follow the order". s6 Nexo walks to a door ahead marked with a badge icon: tag "next: identity and authentication" (bottom-centre). Motion continues (cards still travelling) until the 3 s tail (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 4, 7 and 9 with pauseSentence 7, 7, 7 (0-based). Right 1, 2, 0; trap 0, 0, 1. Questions and options exactly as above.
