# L12 storyboard: world style (spec for the composition)

Narration `research/video-long/L12-script.json` (12 scenes, ~5 min with the exam silences), timings `video/L12/beats.json` (regenerate: the old L12 narration does not match). **Intermediate lesson, module 2 (skill 1.3h, Adaptive Cards):** calm pace, one image per idea. Build on the world library `tools/video/world/` (closest siblings: `video/L11/composition.html`, `video/L10/composition.html`; exam helper `EXAMX` as in `video/L09/composition.html`). Sentences per scene (0-based cues s0…): 0:5 1:3 2:5 3:11 4:7 5:4 6:5 7:11 8:4 9:11 10:8 11:7 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson
**Every rule in the section "Global rules for this lesson" of `research/video-long/L10-storyboard.md` applies unchanged** (which in turn inherits L09's: lint first with no BLOQUEANTE, margins >= 120 px, all text >= 32 px at 1080p, full frames, no empty boxes, no world-edge bands, names on screen exact, no ghosts, opaque dialogs, transitions, pills, exam-room timing with 3.5 s silence + 3-2-1 ring, reveal exactly at `S(i, 8)`, rows shrink >= 0.8 s, proof panels complete from their first frame, no SFX, no brand logos). Only the colour code, the exact names and the continuity list below are specific to L12.

- **Names on screen, exact:** "Adaptive Card", "Ask with Adaptive Card", "Message", "Question", "Submit", "Required", "Input.Text", "Input.Number", "Input.Date", "Input.Time", "Input.Toggle", "Input.ChoiceSet", "Edit Schema", "Condition", "Action.Submit", "Action.Execute", "Add node", "Properties", "Edit adaptive card", "Web Chat", "Teams", "Live chat widget", "Test chat", "Authoring canvas", "1.5", "1.6".
- **Colour code (whole lesson, fixed, reused in exams and close):** **Adaptive card = teal #0f7b8a form sheet** (as in L09/L10) with white fields and a navy #1f2a44 "Submit" button; **informational card = the same teal sheet with a grey #5b6578 stamp "info only", no button**; **output variables = amber #e0a21e tags** on a rail; **schema version = a numbered gate sign: 1.6 violet #7b5cd6, 1.5 blue #2f6fdb**; **Condition = a green-edged fork sign**. Correct = green #1e7f4f only; trap = red #c4392f only. Nexo = blue robot, the check-in agent (wears a small badge "Ask with Adaptive Card"); Valeria = L01 developer (purple top); user = Marta (coral #e07a5f top, laptop); the service manager = an older character with a grey vest and a clipboard (as in L07/L08). No SFX. No brand logos (Teams is a generic purple chat gate titled "Teams", no logo).
- **Continuity:** Valeria's lab desk from L01, Marta from L03/L07–L11. **No repeats:** none of the worlds already used (business park, grading hall, IT floor and workshop, review room, house of topic rooms, library, office, toolbelt and service city, staff door/public desk/back room, dispatch kitchen, help desk counter, records archive, theatre, print shop and newsstand street, river of systems, trail map). This hall is bright and open, with counters, signs and a gate wall: NO racks, NO kitchen equipment, NO shelves.

## World layout (3840x2160) — "The Contoso check-in hall"
- **Form counter** (centre-left, x 300-1700, y 500-1900): a long check-in counter where Nexo hands Marta the teal card sheet; a clipboard rack on its front holds blank sheets.
- **Gate wall** (right, x 2300-3600, y 400-1500): three gates in a row with big version signs: "Web Chat" (1.6, a small crossed tag "no Action.Execute"), "Teams" (1.5), "Live chat widget" (1.5). A fourth separate door at the far left of the wall, "Test chat", is labelled 1.6 and has no limit sign. A small side window "Authoring canvas" is dark with a note "does not render 1.6".
- **Variable rail** (front-centre, x 600-3000, y 1650-1950): a conveyor where the amber output-variable tags land after Submit.
- **Fork sign** (right-front, x 2600-3500, y 1500-1950): the Condition fork, where the empty-variable path leaves the rail.
- **Phone corner** (far left, x 100-500): an old desk phone used only in scene 1.
- **Valeria's desk** (front-left, from L01) for UI mode (scene 10): generic grey-blue window "Copilot Studio · Contoso help agent", no logos.
- The floor and back wall extend at least 10 % beyond every camera framing.

## 0 One detail at a time (s0-4) — world, filled from frame 1
s0 full shot of the hall; Marta at the form counter with her laptop; title "Module 2" (top-left). s1 Marta's chat bubbles on the reply screen: Nexo asks "Title?" and she answers, then a second bubble waits: chip "one detail at a time". s2 the service manager with a clipboard holds a ticket stub with two empty slots "Title" and "Urgency": chip "both in every ticket". s3 Valeria enters from the left holding one teal sheet; Marta's two separate bubbles merge into the sheet: chip "one sheet, all at once". s4 kinetic title "Adaptive Cards" (104 px), then shrinks to a pill top-left.

## 1 A mini form in the chat (s0-2) — world (close on the counter)
s0 the teal card sheet rises out of Marta's chat window with a title "New ticket", two white fields "Title" and "Urgency: High" and the navy "Submit" button: chip "mini form". s1 left, the old phone corner with a handset and a label "one by one"; right, the clipboard sheet with a tick list "all at once"; a bright arrow chooses the sheet: chip "a sheet to fill in". s2 Marta presses "Submit" and the whole sheet flies as one piece to Nexo's hands: chip "the agent gets everything together".

## 2 The right node (s0-4) — world (counter, two cards)
s0 Nexo's badge "Ask with Adaptive Card" lights; the node tag appears in a topic strip. s1 the teal sheet clips onto the node: the navy Submit button glows: chip "at least one submit button". s2 input fields on the sheet; an amber variable tag drops from each field onto the variable rail: chip "saved in variables". s3 two small tags "Message" and "Question" slide in with a second teal sheet carrying the grey stamp "info only" and no Submit. s4 Marta taps this info sheet, nothing flies back, only a grey "collects no response" chip.

## 3 EXAM: which node (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso wants a ticket form in the chat, with a title and an urgency. The user must send both together with a button. Which node should Valeria use?"
- A "A Message node with a card" (trap) · B "Ask with Adaptive Card" (right) · C "A Question node with a card".
- Why: "It is the node that needs **at least one submit button** and collects the response. A card in a Message or Question node is **only informational**, so it collects nothing."
- Proof (after the rows shrink, each panel complete from its first frame): left panel "Ask with Adaptive Card": teal sheet with Title and Urgency fields, the navy Submit, two amber variable tags landing on the rail, green check; right panel "Message / Question card": the same teal sheet stamped "info only", no Submit, an empty rail, chip "collects nothing".

## 4 Six input elements (s0-6) — world (field gallery above the counter)
s0 six slots appear on a display wall above the counter, all labelled at once and empty-looking boxes avoided (each slot shows its sample). s1 "Input.Text" slot: a text field with a multiline tag. s2 "Input.Number": a number field with a small "min · max (optional)" tag. s3 "Input.Date" (calendar sample) and "Input.Time" (clock sample) side by side. s4 "Input.Toggle" (switch showing true/false). s5 "Input.ChoiceSet" (dropdown and radio buttons). s6 a field shows a red-free grey star "Required" and the Submit button stays locked until it is filled: chip "cannot be sent without it" (no red; use navy lock).

## 5 Variables and clear ids (s0-3) — world (variable rail)
s0 Valeria saves the design: each field on the teal sheet drops an amber variable tag onto the rail: chip "output variables, automatically". s1 one tag is misspelled/mistyped in grey; a wrench panel "Edit Schema" opens with its list of variables and their types, the tag is fixed: chip "fix with Edit Schema". s2 two tags side by side: a default-looking tag with the name "input1" crossed in neutral grey, and a clear tag "leaveType" (camelCase example from the theory): chip "clear camelCase id". s3 a dropdown field "Input.ChoiceSet" is fed by a small table card with the columns "title" and "value" and a formula chip "Power Fx": chip "dynamic list: a table".

## 6 Versions by channel (s0-4) — world (camera to the gate wall)
s0 camera pans to the gate wall; the three gates and their version signs are all drawn from the first frame, and the title chip "schema 1.6 and earlier". s1 "Web Chat" gate lights: sign 1.6 with the small tag "no Action.Execute": chip "1.6 without Action.Execute". s2 "Teams" and "Live chat widget" gates light: sign 1.5 on each: chip "up to 1.5". s3 the "Test chat" door at the far left glows with sign 1.6: Valeria walks through happily: chip "it all looks fine here". s4 camera to the dark side window "Authoring canvas": a violet 1.6 card sheet on it is blank-greyed; note "does not render 1.6".

## 7 EXAM: the Teams version (pause s7, reveal s8) — exam room
- Q (visible from s0): "Valeria designed the ticket card with schema one point six, and it looks perfect in the test chat. Contoso's employees use Teams. What should she do?"
- A "Keep schema one point six everywhere" (trap) · B "Check it only in the authoring canvas" · C "Design with schema one point five" (right).
- Why: "Teams **stops at one point five**, but the test chat shows one point six, so it fools you. One point six **fails in Teams**, and the authoring canvas **cannot render it**."
- Proof (after the rows shrink, each panel complete from its first frame): left panel "Schema 1.5": the "Teams" gate with sign 1.5 and the teal sheet passing through, green check, chip "works in Teams"; right panel "Schema 1.6 everywhere": the "Teams" gate with sign 1.5 and a violet 1.6 sheet stopped at the barrier, red outline, chip "limit is 1.5".

## 8 A card closed without submit (s0-3) — world (variable rail + fork sign)
s0 Marta closes the teal sheet with an X before pressing Submit: chip "closed without Submit". s1 the variable rail runs with slots where the amber tags should be, drawn as dashed slots labelled "Title", "Urgency" (all text drawn): chip "variables stay empty". s2 the green-edged "Condition" fork sign appears right after the node on the rail: the empty path leaves to a side lane, the filled path continues: chip "add a Condition node right after". s3 two retried sheets side by side, each stamped with a different small tag "action Submit id" (a unique id in Action.Submit data) and a magnifier ticking the right one: chip "unique id on retries".

## 9 EXAM: the closed card (pause s7, reveal s8) — exam room
- Q (visible from s0): "A user closes the ticket card without selecting submit. The output variables stay empty. What should Valeria add right after the node?"
- A "A Condition node that checks them" (right) · B "A Message that uses the title variable" (trap) · C "Edit Schema with a new variable".
- Why: "If the card is closed without submit, the output variables stay empty, and the **Condition node** lets the topic handle that case. A Message that uses the title variable would show **nothing**, because that variable is empty."
- Proof (after the rows shrink, each panel complete from its first frame): left panel "Condition node": the fork sign on the rail, empty path to a side lane and filled path continuing, green check; right panel "Message with the title": a message bubble reading "I registered your ticket with " and a blank slot, red outline, chip "the variable is empty".

## 10 Set it up in the studio (s0-7) — UI (maker laptop), window ~80 % of the frame
s0 camera enters Valeria's laptop; window "Copilot Studio · Contoso help agent" arrives with its content (a topic open on the canvas). s1 cursor on "Add node (+)" under the chosen node. s2 the menu shows "Ask with Adaptive Card": cursor selects it; the node appears. s3 cursor on the three dots of the node, then "Properties"; the panel opens (opaque), then "Edit adaptive card". s4 the designer opens: input fields and a "Submit" button are added, or the card J S O N is pasted: chip "designer or JSON". s5 "Save": the output variables appear below the node. s6 "Edit Schema" opens with the variable list to review. s7 a "Message" node uses one variable. Window shrinks back into the laptop at scene end. All UI text >= 32 px; show only the theory steps.

## 11 Three rules to remember (s0-6) — world, close shot, motion on every sentence
s0 close on the form counter with Valeria and Marta; title "Back in the check-in hall" (top-left); recap board slot top-right reserved. s1 Marta fills in the teal sheet and sends it; the agent's bubble confirms the ticket with its urgency. s2 recap board appears **with its header and three dim lines, all text drawn**: header "Remember: three rules". s3 line 1 brightens: "Ask with Adaptive Card collects fields" (teal chip). s4 line 2: "Teams stops at schema 1.5" (blue 1.5 gate chip). s5 line 3: "Closed card → add a Condition node" (green fork chip). s6 the camera slides toward a sign over a side corridor "Custom prompts": tag "next lesson" (bottom-centre). Motion continues until the 3 s tail (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 3, 7 and 9 with pauseSentence 7, 7, 7 (0-based). Right 1, 2, 0 (B, C, A); trap 0, 0, 1. Questions and options exactly as above (on-screen options drop the spoken "Or" and the "?").

## Fact notes (checked)
- Adaptive Card: mini form in the chat with text, fields and buttons; handed as a sheet vs asking one by one — theory L12 intro.
- Ask with Adaptive Card: at least one submit button, optional input fields; typed values saved in variables — theory L12 section 1.
- Message and Question cards are informational, not interactive — theory L12 section 3.
- Output variables created automatically on Save; fix with Edit Schema — theory L12 section 2.
- Schema 1.6 and earlier depending on channel; Web Chat 1.6 without Action.Execute; live chat widget and Teams up to 1.5; test chat renders 1.6; the authoring canvas does not render v1.6 cards — theory L12 section 4.
- Six inputs: Input.Text (multiline), Input.Number (optional min and max), Input.Date, Input.Time, Input.Toggle (true or false), Input.ChoiceSet (dropdown or radio buttons); Required in the properties panel — theory L12 section 5. Do not show the Date/Time return formats.
- Clear camelCase ids such as leaveType; dynamic choices via a Power Fx expression returning a table with title and value columns; closed card leaves variables empty, add a Condition node right after; unique id in Action.Submit data for consecutive or retried cards — theory L12 section 5.
- Studio steps: Add node, Ask with Adaptive Card, three dots, Properties, Edit adaptive card, add inputs and submit or paste JSON, Save, Edit Schema, use in a Message — theory L12 steps.
- Do NOT invent card contents beyond Title and Urgency (High, Medium, Low); the Contoso confirmation is "I registered your ticket with High urgency".
