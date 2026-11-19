# L25 storyboard: world style (spec for the composition)

Narration `research/video-long/L25-script.json`, timings `video/L25/beats.json` (12 scenes, about 6.2 min at 150 wpm; real length from beats). Build on the world library `tools/video/world/` (example: `video/L41/composition.html`). The section "Global rules for this lesson" referenced by `research/video-long/L24-storyboard.md` (that is, the section in `research/video-long/L22-storyboard.md`, same as `L21-storyboard.md` / `L05-storyboard.md`) applies here too, unchanged. Sentences per scene: 0:6 1:7 2:6 3:11 4:6 5:5 6:11 7:6 8:5 9:11 10:8 11:8.

Characters: Valeria (developer, laptop, a red marker pen), Nexo (blue robot agent, wears a waiter's apron), Marta (customer at the counter, speech bubbles, holding an order slip with blank lines, no digits), the service manager (clipboard, scenes 0 and 6 only, worried then nodding), a colleague (one figure in a hurry, scene 9 only).

## Colour code
- **Blue** = the API and its specification (the orders API kitchen, the OpenAPI menu sheet, its version tags).
- **Orange** = the REST API tool being set up (the menu board, the marker pen, the description and solution labels, the lock).
- **Purple** = Copilot Studio side (the "Tools" shelf, "Add a tool", "New tool", "REST API").
- **Green** = right answer / correct path / selected operations.
- **Red** = trap / not selected / crossed out.
- **Grey** = the orchestrator and the comparison with the custom connector (L24's adapter, shown small).

## World layout (3840x2160)
New world: **The Contoso diner: menu board, order window and kitchen**.
- **Kitchen** (far left, blue, behind a glass wall): labelled "Orders API". Three cooking stations with plain icons and signs "Create order", "Get order", "Delete order". No readable digits anywhere.
- **Printer and upload slot** (left-centre, blue to orange): a menu printer where a sheet "OpenAPI specification" is fed in. The slot has a tag "JSON, version 2". A small converter box beside it, "version 3 → version 2", with a little conveyor.
- **Menu board** (centre, orange, the hero object): a large chalkboard menu titled with the tool name and description line. One row per operation with a checkbox and a short "description" line, and two sub-lines "in" / "out" under each row. Valeria's red marker crosses out rows.
- **Solution box** (centre-bottom, orange): a labelled storage crate "Solution" ("groups components to move between environments"), with a "created for you" sticker variant.
- **Tools shelf** (centre-right, purple, labelled "Copilot Studio"): shelf with buttons "Tools", "Add a tool", "New tool", "REST API"; the finished menu board hangs here as a tool.
- **Order window** (right): Nexo stands at the window between the counter and the menu board. Above Nexo, a small grey gear "Orchestrator" ("decides which tool to use and when") that reads the menu board.
- **Back door lock** (top right, orange): the kitchen's back door with a lock dial of three positions "None", "API key", "OAuth 2.0"; a key tag with fields "Label", "Name", "Location: Header / Query"; a separate OAuth panel "Client ID", "Secret", "Authorization URL", "Token URL", "Scope".
- **Counter** (far right): Marta orders here with her order slip.
- **Side alcove** (bottom right, grey): L24's orange adapter "Custom connector" with plugs to "Power Apps" and "Power Automate", and a chip "Policy templates", for the comparison scene.
- Valeria's laptop (UI mode, scene 10).

## 0 A menu with a pen (s0-5)
Wide of the whole diner. s0 title "Monday at Contoso". s1 Marta at the counter, bubbles "Check my order" then "Place a new one" (no digits). s2 camera to the kitchen "Orders API"; the three station signs light in turn: "Create order", "Get order", "Delete order". s3 Valeria enters with laptop; the service manager nods; label "REST API tool" (orange). s4 visual metaphor: Nexo is handed a menu; the red marker crosses out one dish (label "cross out what it must not order"). s5 label "the agent uses only what is selected" (green).

## 1 Upload the specification (s0-6)
Camera to the purple tools shelf, then to the printer. s0 chip "the menu itself". s1 Valeria opens the agent: "Tools" lights. s2 "Add a tool" → "New tool" → "REST API" press in turn. s3 the sheet "OpenAPI specification" feeds into the slot tagged "JSON, version 2". s4 the sheet prints as menu rows, one per operation (label "describes the operations of the API"). s5 a second sheet tagged "version 3" arrives; question chip "version 3?". s6 the converter box runs, the sheet comes out tagged "version 2" (green check, "automatic").

## 2 Description and solution (s0-5)
Camera to the menu board. s0 the board's title line glows "description". s1 Valeria rewrites the name and description line (orange). s2 the grey gear "Orchestrator" above Nexo lights, label "decides which tool to use and when"; a sight line from the gear to the description line. s3 contrast panel: a menu with no dish names (blank rows, red), the gear shows a question mark. s4 the crate "Solution" slides in, label "groups components to move between environments". s5 alternate: an empty slot gets a crate with sticker "created for you".

## 3 EXAM: the version three file (pause s7, reveal s8)
- Q: "A partner team's specification file is OpenAPI version 3. What happens when they upload it to the REST API tool?"
- A "It is rejected, so they must convert it by hand" (trap) · B "It is translated to version two automatically" (right) · C "It stays as version three inside the tool".
- Proof panel: the upload slot with a "version 3" sheet going into the converter box and out as "version 2" (green check, "automatic"); a person rewriting the sheet by hand with a red X ("not needed"); a "version 3" tag inside the tool struck in red.

## 4 Cross out the dishes (s0-5)
Camera to the menu board with the kitchen behind. s0 chip "crossing out". s1 the three rows "Create order", "Get order", "Delete order" appear on the board. s2 label "operation = one specific action of the API". s3 checkboxes: "Create order" and "Get order" ticked green; "Delete order" unticked. s4 each ticked row gets a name and a short description line. s5 the red marker crosses out "Delete order"; the delete station in the kitchen dims; Nexo helps Marta but no delete icon ever appears near Nexo.

## 5 What goes in, what comes out (s0-4)
Close on the two ticked rows. s0 under each row the sub-lines "in" and "out" appear, label "complete descriptions". s1 the orchestrator gear reads them: arrows "what data to send" (in) and "what it gets back" (out). s2 the "Create order" row: "in" and "out" lines fill with icons (no field names, no digits). s3 the "Get order" row: "in" = "which order to look up", "out" = "what the answer contains". s4 metaphor: a dish card with no ingredients, Nexo hesitates (small grey question mark).

## 6 EXAM: no deleting (pause s7, reveal s8)
- Q: "Nexo must help with orders but never delete one. How should Valeria limit what Nexo can do with the orders API?"
- A "Ask Nexo in the instructions not to delete" (trap) · B "Remove the delete words from the description" · C "Select only the create and get operations" (right).
- Proof panel: the menu board with "Create order" and "Get order" ticked green and "Delete order" unselected and crossed out (label "the agent only uses what is selected"); a speech note "please do not delete" with a red X ("not the real limit"); a description line with words erased, also red X.

## 7 The lock on the door (s0-5)
Camera up to the back door. s0 the lock dial glows. s1 its three positions appear in turn: "None", "API key", "OAuth 2.0". s2 the key tag fills its fields: "Label", "Name", "Location", with a switch "Header" / "Query". s3 Marta's hand hands over her own key at the door, label "the user provides the key at run time". s4 the dial turns to "OAuth 2.0" briefly; the OAuth panel shows "Client ID", "Secret", "Authorization URL", "Token URL", "Scope". s5 the dial settles on "API key", switch on "Header", tag "Contoso" (orange).

## 8 Menu or connector (s0-4)
Camera pans to the side alcove. s0 chip "why not a custom connector?" with a small callback to L24's adapter. s1 the menu board with one kitchen: label "REST API tool: more direct for a single API". s2 the adapter "Custom connector" plugs into "Power Apps" and "Power Automate", label "reuse in Power Apps and flows". s3 chip "Policy templates" snaps onto the adapter, label "more options". s4 back to the diner: only Nexo uses the orders API, label "the quick menu is enough" (green).

## 9 EXAM: the silent tool (pause s7, reveal s8)
- Q: "A colleague uploads a specification and leaves every description empty. Now the agent never seems to call the tool. What is the most likely cause?"
- A "The orchestrator has no descriptions" (right) · B "The upload needed a version three file" (trap) · C "The tool needs a separate solution".
- Proof panel: a menu board with blank description lines and the orchestrator gear showing a question mark, then the lines filled and the gear lighting green ("it uses descriptions to decide when to call"); a "version 3" tag struck in red ("version 3 is translated anyway").

## 10 The steps (s0-7)
UI mode on Valeria's laptop, one step per sentence, only steps from the theory: s0 "The steps". s1 agent open → "Tools". s2 "Add a tool" → "New tool" → "REST API". s3 upload the "OpenAPI" specification, "JSON, version 2" (note "version 3 is translated"). s4 improve the "Name" and "Description" of the tool. s5 "Solution": choose one, or let one be created. s6 authentication picker with exactly: "None", "API key", "OAuth 2.0". s7 operations list with checkboxes (only the allowed ones ticked) and their "Input" / "Output" descriptions filled. Do not show any setting, field, wizard page or limit not in the theory.

## 11 The menu at work (s0-7)
Callback to scene 0, wide diner, warm light. s0 "Back to Contoso". s1 Marta's order slip: Nexo gets her order and places a new one; the crossed-out delete dish stays crossed out (icons, no digits). s2 recap row title "For the exam". s3 "OpenAPI, JSON version 2; version 3 is translated". s4 "None, API key, OAuth 2.0". s5 "Limit the agent = select operations". s6 "Trap: a spec without descriptions". s7 chip "Next: computer use". Hold ≥3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 3, 6, 9 with pauseSentence 7 (0-based) and the questions/options above (right 1, 2, 0; trap 0, 0, 1; 0-based).

## Fact notes
All facts from the L25 theory, steps, example, exam tips and glossary (FACTS.md lines 54-57 say the same):
- The REST API tool is the quick way to give the agent access to an API: upload its description and choose what it can do; the agent only uses what you leave selected (the restaurant-menu-with-crossed-out-dishes picture is from the theory).
- Tools, Add a tool, New tool, REST API; upload an OpenAPI specification in JSON version 2; a version 3 is translated to version 2 automatically.
- Improve the name and description, because the orchestrator uses it to decide when to call the tool. Orchestrator = the agent engine that decides which tool to use and when. Choose a solution, or one is created. Solution = container that groups components so you can move them between environments.
- Select only the operations the agent can use (example: create and get, not delete); give each a name and a description; input and output descriptions must be complete because the orchestrator uses them to know what data to send and what it gets back. Operation = a specific action of the API.
- Authentication: None, API key, OAuth 2.0. API key: parameter label, name, location (Header or Query); the user provides the key at run time. OAuth 2.0: client ID, secret, authorization and token URLs, scope.
- REST API tool is more direct for a single API; a custom connector (L24) is better to reuse it in Power Apps and Flows, with more options such as policy templates.
- Exam tips: to limit what the agent can do, select operations; trap: uploading a spec without descriptions.
- Contoso example: orders API with create, get, delete; only create and get selected; API key in the Header, each user provides their own key; careful input and output descriptions; the agent never offers or tries to delete. "Partner team", "shipping API", "colleague in a hurry", the diner and the worried service manager are story details only, no product facts. The exam-6 trap "instructions" is presented as "not the real limit", not as a product claim about instructions. No numbers, limits or prices are shown. No brand logos: the kitchen, menu board, lock and adapter are generic drawings.
