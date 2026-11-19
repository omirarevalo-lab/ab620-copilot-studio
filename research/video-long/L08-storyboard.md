# L08 storyboard: world style (spec for the composition)

Narration `research/video-long/L08-script.json` (11 scenes, ~4.8 min before the exam silences, ~5.0 min with them), timings `video/L08/beats.json` (regenerate: the old L08 narration does not match). **Basic-intermediate lesson, module 2 opener (skill 1.3i):** calm pace, one image per idea. Build on the world library `tools/video/world/` (closest siblings: `video/L07/composition.html`, `video/L03/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Sentences per scene (0-based cues s0…): 0:6 1:5 2:5 3:11 4:5 5:5 6:11 7:7 8:11 9:6 10:8 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson (L03/L07 rules, all mandatory)
- **Lint first:** `node tools/video/lint-layout.mjs L08 --png` must show **no BLOQUEANTE** before any full render (BORDE-CORTADO, SOLAPE, VACIO, DOBLE-EXPOSICION). Review frames after the LAST edit.
- **Margins:** every subject, label, panel and chip >= 120 px from every frame edge at 1080p, bottom edge included, in every shot (pans and zooms too).
- **Text size: ALL text >= 32 px at 1080p**, no exceptions (box labels, variable names, UI rows, reveal text, proof chips). Long names (`System.User.DisplayName`) get their own full-width slot; if it does not fit, zoom or cut words, never shrink.
- **Full frames from the first second:** every shot fills width and height; no empty band > 20 %; characters large (Marta, Valeria, Nexo, the administrator >= 300 px tall in close shots). No empty placeholder boxes: content lights **on the word that names it**.
- **Names on screen, exact:** when the voice names a prefix, setting or node, its label is on screen in its own slot, with exact spelling and capitals: "Global.", "Global.EmployeeId", "System.Activity.Text", "System.User.DisplayName", "Env.", "Env.ApiBaseUrl", "Number", "String", "Variable properties", "Save user response as", "Question node", "Power Apps", "Power Platform". The voice says "dot"; the screen always shows the real dot.
- **Reserved slots, no covering;** moving objects (the box sliding from one room to the hall, the address card) follow a free path.
- **No ghosts, no double exposures:** in any swap on the same spot (topic box → global box, test URL → real URL), the old element reaches opacity 0 **before** the new one starts (sequential, ≤ 0.25 s each).
- **State matches the story;** dimmed items #5b6578 on #e7eaf1. **UI windows** ~80 % of the frame, rows sized to content. **Dialogs and panels opaque** from their first frame.
- **Transitions:** no empty or grey frame > 0.5 s. Something happens on every sentence; the close moves until the 3 s tail.
- **Pills:** at most 2 on screen, reserved slots (top-left / bottom-centre); none longer than ~15 s.
- **Exam rooms:** question card **and** all three options enter **together** at s0 ("Your turn."), dim, full-width rows (~75 % width, ring at right); each option brightens on its own sentence (s4, s5, s6). On-screen options drop the spoken "Or" and the "?". After "Decide before I answer." the fixer inserts **3.5 s of silence**; the 3-2-1 ring starts when that sentence ENDS; nothing moves in the silence. **Reveal exactly at `S(i, 8)`**. Trap red, struck, "Trap" pill; right green with check; other at 50 %. Rows shrink with an eased tween **>= 0.8 s**; explanation (right) and proof panels (below) enter **after** the rows finish; proof panels sized to their content and filled.
- **Colour code (whole lesson, fixed, reused in exams and close):** **Topic variable = a small cardboard box #c08a4a** with a name tag, kept inside one topic room; **Global variable = a gold box #b8860b** with a "Global." tag, on the shared hall shelf; **System variable = a slate box #4a5a78** with the Copilot Studio gear stamp, already filled; **Environment variable = a teal box #0f7b8a** with an "Env." tag and a padlock (read-only), on a shelf outside the building that only the administrator opens; **type = the box's shape:** Number = a round slot "#", String = a long flat slot "Aa". Correct = green #1e7f4f only; trap = red #c4392f only. Nexo = blue robot; Marta = L03/L07 Contoso sales (coral #e07a5f top, laptop); Valeria = L01 developer (purple top); **administrator = L05 admin character** (navy jacket, badge). No SFX. No brand logos anywhere.
- **Continuity:** Valeria's lab desk from L01, Marta from L03/L07, the admin from L05. **No repeats:** no print shop, no newsstand street, no theatre, no river of bridges, no business park, no service city, no library wing, no staff door / public desk building (L07).

## World layout (3840x2160) — "Nexo's house of topic rooms"
- **Topic rooms** (top row, x 200-3640, y 200-1000): three rooms with door signs "Vacation" · "Payroll" · "Benefits"; each has a small desk where Nexo serves Marta; topic boxes sit on each room's desk.
- **Shared hall** (middle, x 200-3640, y 1100-1500): a long hall connecting all rooms, with a gold shelf "Global" in the centre; doors from each room open onto it.
- **System cabinet** (bottom-left, x 200-1400, y 1600-2000): a slate cabinet stamped with the gear, holding pre-filled slate boxes.
- **Environment shed** (right, outside the house, x 2900-3640, y 1600-2000): a teal shed with two signs "Development" · "Production"; the administrator holds its key; Power Apps tablet in hand.
- **Valeria's desk** (bottom-centre, from L01): Valeria with laptop, for the type mistake and the studio scene.
- Maker laptop for UI mode (scene 9): generic grey-blue window "Copilot Studio · Nexo", no logos.

## 0 Asked twice (s0-5) — world (house, filled from frame 1)
s0 frame opens full on the "Vacation" room: Marta at the desk with Nexo; title "Module 2" (top-left). s1 Nexo's bubble "Your employee number?"; Marta types "4215" and a small cardboard box with tag "EmployeeId" closes on the Vacation desk. s2 camera slides right to the "Payroll" room; Marta walks in: bubble "Show my payslip". s3 Nexo's bubble "Your employee number?" again; the Payroll desk is empty (no box): chip "asked again" (red outline). s4 Marta sighs (shoulders drop, a small "…" puff). s5 kinetic title "Variables and scope" (104 px), then shrinks to a pill top-left.

## 1 A named box and who can open it (s0-4) — world (close on one box)
s0 close shot: a cardboard box with a big name tag "EmployeeId": label "variable = a named box". s1 the lid opens, a card "4215" drops in: label "one piece of data, for later" (examples float in their own slots: "name" · "ticket number"). s2 a keyhole on the box glows: label "scope = who can open it". s3 two keys appear side by side: "one topic" (cardboard) · "the whole agent" (gold). s4 camera pulls back: the box is inside the Vacation room behind a closed door, a small padlock on the door: chip "locked inside one topic".

## 2 Topic and Global (s0-4) — world (rooms + hall)
s0 a new cardboard box appears on the Vacation desk with a tag "Topic · default". s1 the Vacation room walls light; the box stays inside: label "only in its own topic". s2 the Payroll room: Nexo looks at an empty desk, a "?" bubble: chip "Payroll can't see it". s3 the box slides out of the Vacation door along the hall (free path) to the gold "Global" shelf and turns gold; tag becomes "Global." : label "works in all topics". s4 the tag reads "Global.EmployeeId"; dotted lines from the shelf reach the Vacation, Payroll and Benefits desks, each lights green in turn: chip "filled once, reused everywhere".

## 3 EXAM: one number, many topics (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso's vacation topic saves the employee number in a topic variable. The payroll and benefits topics need the same number without asking again. What should you do?"
- A "Copy the question into every topic" (trap) · B "Change the variable scope to global" (right) · C "Make it a new system variable instead".
- Why: "Change it in the variable's **properties panel**. Copying the question **asks the user again**. You **cannot create** system variables."
- Proof (after the rows shrink, filled): left panel "Scope: global": the gold "Global.EmployeeId" box on the hall shelf with three green lines to Vacation · Payroll · Benefits; right panel "Copied question": three rooms each with Nexo's bubble "Your employee number?" and Marta sighing, chip "asks again ×3".

## 4 System variables (s0-4) — world (system cabinet)
s0 close shot on the slate cabinet; drawers slide out already holding boxes: label "already filled". s1 the gear stamp lights: label "created by Copilot Studio". s2 one slate box opens: tag "System.Activity.Text" (full-width slot), and Marta's last message "Show my payslip" rises out of it: chip "last thing the user typed". s3 a second slate box: tag "System.User.DisplayName", a name card "Marta" rises out: chip "the user's name". s4 Valeria's hand reaches in and reads a card (green "read"), then tries to add a new slate box to the cabinet and the drawer refuses (slate X): chip "you read them · you don't create them".

## 5 The type is set once (s0-4) — world (Valeria's desk)
s0 two empty boxes on Valeria's desk with different slots: round "#" and long flat "Aa": label "type = the box's shape". s1 a box with no shape yet: label "set by the first assignment". s2 a card "4215" drops in, the slot snaps round "#", tag "Number": chip "stays a Number". s3 a text card "Marta" pushes against the round slot, cannot enter, the box flashes red: chip "text later → error". s4 a shelf of eight small shaped boxes lights one by one, each label in its own slot: "String" · "Boolean" · "Number" · "Table" · "Record" · "DateTime" · "Choice" · "Blank" (two rows of four, all >= 32 px).

## 6 EXAM: text in a number box (pause s7, reveal s8) — exam room
- Q (visible from s0): "Valeria first sets Global.EmployeeId to the number 4215. Later, a node saves the text E4215 in the same variable. What happens?"
- A "An error: the type is already Number" (right) · B "It quietly converts itself to a String" (trap) · C "The text is stored as the number zero".
- Why: "The type comes from the **first assignment**, and it **does not change**. If an ID can have **letters**, start it as **text**."
- Proof (after the rows shrink, filled): left panel "First value 4215": the gold box with a round "#" slot, the card "E4215" bounced off with a red error toast "type mismatch"; right panel "Start as text": a box with the long "Aa" slot accepting "E4215" (green).

## 7 Environment variables (s0-6) — world (environment shed)
s0 camera to the teal shed outside the house; Nexo carries a card "inventory address". s1 the two signs light: "Development → test server" · "Production → real server" (two slots, each with its own server icon). s2 a teal box with padlock and tag "Env.ApiBaseUrl" on the shed shelf. s3 the shed sign "Power Platform" lights; Valeria tries to write on the box, her pen bounces off the padlock: chip "read-only in Copilot Studio". s4 the administrator opens the shed with the key and edits the value on a tablet "Power Apps": the card inside swaps test URL → real URL (sequential swap, no ghost). s5 the whole house moves from a "Development" ground plate to a "Production" ground plate, the topic rooms unchanged: chip "same nodes, different value". s6 a "Republish" button pulses on Valeria's laptop; a small teal "Secret" box beside it shows "read at runtime" instead: chip "value changes → republish (except secret)".

## 8 EXAM: test server, real server (pause s7, reveal s8) — exam room
- Q (visible from s0): "Nexo calls an inventory address that is different in development and in production. Contoso wants to move the agent without editing any node. What should you use?"
- A "A global variable set in every topic" (trap) · B "A system variable that holds the address" · C "An environment variable for the address" (right).
- Why: "It **separates the parameter from the logic**; the administrator sets each value in **Power Apps**. A global variable still means **editing the agent**."
- Proof (after the rows shrink, filled): left panel "Env.ApiBaseUrl": the teal shed with two values "Development: test" · "Production: real" and the house unchanged (green); right panel "Global variable": Valeria editing three topic rooms with a pen, chip "edit every topic".

## 9 Make it global in the studio (s0-5) — UI (maker laptop), window ~80 % of frame
s0 camera enters Valeria's laptop; window "Copilot Studio · Nexo" arrives with its content (Topics tab open, topic list "Vacation" · "Payroll" · "Benefits"). s1 cursor opens "Vacation"; the canvas shows a "Question node" with text "What is your employee number?". s2 field "Save user response as" → "Create new variable"; name typed "EmployeeId". s3 cursor selects the variable; an opaque "Variable properties" panel opens on the right; scope switch moves "Topic" → "Global" and the name becomes "Global.EmployeeId" (gold). s4 cursor opens "Payroll"; adds a "Message" node "Hi, employee {x}" and inserts "Global.EmployeeId" with the insert-variable icon. s5 test chat: Marta types "4215" once in Vacation, then "Show my payslip" → Nexo answers "Payslip for employee 4215" (green tick); a "Variables" panel lists "Global.EmployeeId = 4215". Window shrinks back into the laptop at scene end. All UI text >= 32 px.

## 10 One box for the whole agent (s0-7) — world, close shot, motion on every sentence
s0 close shot of the hall with the gold shelf, Marta in the Payroll room; title "Back to Marta" (top-left); recap board slot top-right reserved. s1 Marta types "4215" once in Vacation; in Payroll Nexo's bubble "Hi Marta, payslip for 4215" (green). s2 recap board appears, header "Remember: four boxes". s3 line 1 lights: "Topic: default · Global.: all topics" (cardboard + gold chips). s4 line 2: "System.: from Copilot Studio" (slate chip). s5 line 3: "Env.: Power Platform, read-only here" (teal chip). s6 line 4: "Type: fixed by the first value" (round "#" chip). s7 the camera slides toward a door sign "Formatted responses": tag "next: formatted responses" (bottom-centre). Motion continues (Nexo moving between rooms, the shelf glowing) until the 3 s tail (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 3, 6 and 8 with pauseSentence 7, 7, 7 (0-based). Right 1, 0, 2 (B, A, C); trap 0, 1, 0. Questions and options exactly as above.

## Fact notes (checked)
- Scopes: topic (default), global (`Global.`), system (`System.Activity.Text`, `System.User.DisplayName`), environment (`Env.`) — FACTS.md › Topics; theory L08.
- Scope changed from topic to global in Variable properties; type fixed at first assignment, assigning another type errors; types list — theory L08.
- Environment variables: created in Power Platform, read-only in Copilot Studio, values changed in Power Apps; republish after change except secret-type (read at runtime) — theory L08; secret type = Azure Key Vault reference (FACTS.md › Solutions & ALM).
- `changes-2026-10-31b.md`: nothing changes this lesson (only topic inputs/outputs via child-agent redirect, out of scope here).
- "You cannot create system variables": system variables are created by Copilot Studio (theory, FACTS.md); the script does not claim they can never be written.
