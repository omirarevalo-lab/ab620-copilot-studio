# F06 storyboard: world style (spec for the composition)

Narration `research/video-long/F06-script.json` (9 scenes, ~4.4 min before the exam silences, ~4.6 min with them), timings `video/F06/beats.json`. **Basic lesson:** calm pace, one image per idea, few labels. Build on the world library `tools/video/world/` (closest siblings: `video/F05/composition.html`, `video/F04/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Sentences per scene (0-based cues s0…): 0:6 1:6 2:7 3:9 4:11 5:6 6:11 7:6 8:7 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson (F05 rules + F05 review fixes, all mandatory)
- **Lint first:** `node tools/video/lint-layout.mjs F06` must show **no BLOQUEANTE** before any full render (BORDE-CORTADO, SOLAPE, VACIO, DOBLE-EXPOSICION).
- **Margins:** every subject, label, panel and chip >= 120 px from every frame edge at 1080p, bottom edge included, in every shot.
- **Text size: ALL text >= 32 px at 1080p**, no exceptions: world labels, sub-labels, UI rows, field values, reveal text, proof chips, bubbles, tags. Measure in the shot where it is seen. If it does not fit at 32 px, cut the text or zoom the camera; never shrink.
- **Full frames:** every resting shot fills width and height: no group leaning to one side, no empty band (top, bottom, road or floor) > 20 % of the frame. Roads and floors always carry content (a moving box in transit, people, signs). Scene 0 and the close included. UI windows fill ~80 % of the frame.
- **Chips never cramped:** each chip has its own slot with >= 24 px of air around it; never stacked on a panel header or on another chip. Max 3 chips in one row.
- **Cards, windows and reveal proof panels fit their content and are full:** no blank half at rest; rows exist as dim placeholders with text, then light on their words.
- **Objects have a visible owner and a destination:** a box, key or document is always carried by someone or travels along a visible path to a visible target. Nothing appears on top of another object or crosses one.
- **UI matches the voice:** every picker, list and status shows what the narration says at that moment.
- **Chip and label texts are exactly as written here** (no paraphrase, no shortening).
- **Motion in every scene:** something happens on every sentence (the close too: no static hold > 6 s except the final 3 s tail).
- **Transitions:** no empty or grey frame > 0.5 s; the next scene's first object enters while the previous one leaves (crossfade ≤ 0.5 s).
- **Pills:** at most 2 on screen, reserved slots (top-left / bottom-centre, >= 120 px from edges); none longer than ~15 s.
- **Exam rooms:** question card **and** all three options enter **together** at s0 ("Your turn."), dim, in full-width rows (~75 % of the width, ring at right); each option brightens on its own sentence. On-screen options drop the spoken "Or" and the "?". After "Decide before I answer." the fixer inserts **3.5 s of silence**; the 3-2-1 ring starts when that sentence ENDS; nothing moves or changes shade in the silence. Reveal on the reveal sentence: trap red, struck, "Trap" pill; right green with check; other at 50 %. Option rows shrink with an eased tween **>= 0.5 s** (never a jump) and keep text >= 32 px; explanation on the right + proof mini-scene below, sized to fill the lower half.
- **Colour code (whole lesson, fixed):** Dev = blue #2f5bd3 building, Test = amber #d98a00 building, Prod = green-grey #1e7f4f building only after Prod is named (green also = correct); Default = light grey shared building; Dataverse = teal #0f7b8a database drum in each building's basement; solution = brown cardboard moving box (#a8743a), unmanaged = open box with a pencil, managed = sealed box with a seal; data policy = red #c4392f gate (F05 style). Nexo = F01-F05 blue robot. No SFX.
- **Continuity:** same Contoso people, Nexo robot, Teams door. **No repeats:** no adapter board, no service city, no library wing, no settings console.

## World layout (3840x2160) — "Contoso business park"
- **Street** (bottom third, full width, y 1500-1900): a road with lane marks; a moving van and walking people use it (it is never empty in a resting shot).
- **Default building** (x 200-800): low grey shared building, many small windows with different people, sign "Default".
- **Dev building** (x 1000-1700): blue, sign "Nexo Dev", workbench inside with the maker and Nexo under construction.
- **Test building** (x 1900-2600): amber, sign "Nexo Test", a tester with a clipboard.
- **Prod building** (x 2800-3600): green-grey, sign "Nexo Prod", Teams door at its entrance with employees.
- **Basements:** each building has a cut-away basement with a teal Dataverse drum "Dataverse" (labels shown only in close-ups).
- **Tenant fence:** a thin blue fence around the whole park with a sign "Contoso tenant · Europe" (scene 1 only).
- Maker desk with laptop for UI mode (scene 7): generic grey-blue windows "Copilot Studio", "Power Platform admin center", "Power Apps · Solutions", no logos.

## 0 Changes on the live agent (s0-5) — world (Prod building interior + street)
Shot framed on one building cut-away (Nexo at its Teams door, employees in a queue, the maker at a laptop inside the same room) with the street below carrying people (fills width and height). s0 title "Week five" (top-left). s1 the maker's laptop sends a half-built purple topic card straight to Nexo; employees' bubbles show "Which system? …" with the second half dashed; tag "half-finished questions" (bottom-centre). s2 a colleague walks in from the street with a laptop showing an agent list without Nexo: "Nexo? not here". s3 both problems get a red outline; s4 a dashed question mark over the whole room: "where does Nexo live?" s5 camera pulls back: the room becomes one of four buildings of the business park (Default, Dev, Test, Prod) and the kinetic title "Environments · Dataverse · Solutions" (104 px, then fades).

## 1 Separate office buildings (s0-5) — world (business park wide, all four buildings fill the width)
s0 the four buildings light one by one, signs >= 32 px. s1 labels under the three Nexo buildings: "development" · "testing" · "production". s2 the maker builds a new card inside "Nexo Dev"; it stays there (the other buildings stay empty of it): chip "stays until you move it". s3 the colleague from scene 0 stands in "Nexo Test" with an agent list missing Nexo; then a small arrow to "Nexo Dev" where Nexo is: chip "that's why". s4 the tenant fence draws around the park with sign "Contoso tenant · Europe". s5 inside "Nexo Dev", Nexo's cable plugs only into its own building's socket and drum; a cable stretching to the Test building snaps back red: chip "own environment only".

## 2 Types of environment (s0-6) — world (park, camera moves building to building)
s0 kinetic "Types" (top-left). s1 camera on "Default": many people from different teams inside; chips "one per tenant" · "shared · experiments" (two chips in one row, own slots). s2 "Nexo Prod" lights: chip "real work". s3 "Nexo Dev" turns into a sandbox look (sand-coloured floor) with two buttons that act: "Copy" (a ghost copy slides to the side, then fades) · "Reset" (the room clears). s4 a small personal cabin appears on the street side, label "Developer" with a person and chip "Developer Plan". s5 a tent "Trial" with a countdown sign "30 days" that empties, tent fades. s6 two badges handed by an admin figure: "Environment Admin" (to the admin) · "Environment Maker" (to the maker). Street keeps walking people in every shot.

## 3 Dataverse: the database (s0-8) — world → basement close-up of "Nexo Dev"
s0 camera tilts down into the Dev basement: one teal drum "Dataverse". s1 an empty neighbour basement shows "no database" (dashed drum): chip "zero or one". s2 the drum opens into a table (4 columns × 3 rows, header "Tickets", cell text >= 32 px). s3 kinetic "three reasons" (top-left). s4 a book flies from the table up to Nexo: chip "knowledge source". s5 a file drops from the maker into the drum: chip "uploaded files". s6 a moving box sits on a shelf next to the drum, tied to it with a cable: chip "solutions depend on it". s7 the admin with the "Environment Admin" badge tries the table: a teal lock stays closed. s8 chip "data access is granted separately"; a second person grants a key to the admin, lock opens.

## 4 EXAM: a place to build (pause s7, reveal s8) — exam room
- Q (visible from s0): "A team wants a place to develop and test a new agent before real employees use it. They also want to copy it and reset it when tests go wrong. Which environment type fits?"
- A "The default environment" (trap) · B "A production environment" · C "A sandbox environment" (right).
- Why: "A **sandbox** is for **development and testing**, with **copy and reset**. **Default** is **shared by everyone**; **production** is for **real work**."
- Proof (fills the lower half): left, the shared grey Default building full of people from other teams, red chip "shared"; right, a sandbox building with the team inside and the two buttons "Copy" and "Reset" working (green).

## 5 Solutions: the moving box (s0-5) — world (Dev building + street)
s0 the maker in "Nexo Dev" packs a brown moving box: label "solution". s1 four items go into the box one per word, each carried by the maker's hand: "agent" · "flow" · "environment variables" · "connections" (item chips >= 32 px, one row above the box, not overlapping it). s2 a large box label "Default solution" on the shelf, then the maker writes a new label "Nexo" and a chip "preferred solution". s3 the open box with a pencil: chip "unmanaged · editable". s4 the maker seals the box (seal stamp): chip "managed · sealed". s5 a van labelled "Pipelines" picks up the sealed box from the curb and drives along the street toward "Nexo Test" (clear path, the street carries the van).

## 6 EXAM: the trip to production (pause s7, reveal s8) — exam room
- Q (visible from s0): "Nexo works well in the Nexo Dev environment. Now the team must take it to Nexo Prod, where real employees will use it. How do they move it?"
- A "Package it in a managed solution" (right) · B "Rebuild the agent by hand in Prod" (trap) · C "Share the Dev agent with everyone".
- Why: "**Export** a **managed solution** from Dev and **import** it into Prod. **Rebuilding by hand** invites **mistakes**; Dev is for **building**, not for real users."
- Proof (fills the lower half): left, a sealed box carried by the maker from the blue Dev building to the green-grey Prod building (green check); right, a second maker rebuilding Nexo from loose parts in Prod with one part missing (red).

## 7 Find it in the portals (s0-5) — UI (maker laptop), three windows in sequence
s0 camera enters the laptop; window "Copilot Studio" (~80 % of the frame) with an environment picker at the top right showing "Nexo Dev"; the agent list shows "Nexo" and one more agent. s1 cursor opens the picker (rows "Nexo Dev" · "Nexo Test" · "Nexo Prod"), picks "Nexo Test": the agent list changes (no Nexo yet). s2 the window crossfades (≤ 0.5 s) to "Power Platform admin center": nav "Manage › Environments", a table with four rows: name and type ("Contoso (default)" Default · "Nexo Dev" Sandbox · "Nexo Test" Sandbox · "Nexo Prod" Production). s3 crossfade to "Power Apps · Solutions": button "New solution" clicked; form fields "Display name: Nexo" · "Publisher: Contoso". s4 inside the solution, cursor on "Add existing › Agent" → row "Nexo" appears. s5 cursor on "Export": two options "Unmanaged" · "Managed", each lights on its word. Window shrinks back into the laptop at scene end. All UI text >= 32 px.

## 8 Three buildings for Nexo (s0-6) — world, fills the frame, motion on every sentence
s0 callback wide of the park framed on the three Nexo buildings (fill width; street with people below; tenant fence faint), title "Back at Contoso" (top-left), recap board space top-right. s1 inside "Nexo Dev" the maker packs the open box "Nexo". s2 the box is sealed and the Pipelines van carries it to "Nexo Test" (tester ticks the clipboard), then to "Nexo Prod" (it unpacks at the Teams door; employees' bubbles answered correctly). s3 the three basements show their own drums lit (three "Dataverse" labels in close-ups not needed; one label per drum >= 32 px); Prod's drum glows "real data". s4 three small red gates drop in front of each building, each a different chip: "Dev policy" · "Test policy" · "Prod policy". s5-6 recap board (top-right, big text, one line per idea, lights on its words): "Environments separate the work" · "Dataverse: one per environment" · "Solutions carry it: managed to Prod". Last words: tag "next: test and publish" (bottom-centre). Hold >= 3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 4 and 6 with pauseSentence 7 and 7 (0-based). Right 2, 0; trap 0, 1. Questions and options exactly as above.
