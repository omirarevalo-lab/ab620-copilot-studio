# L24 storyboard: world style (spec for the composition)

Narration `research/video-long/L24-script.json`, timings `video/L24/beats.json` (12 scenes, about 6.4 min at 150 wpm; real length from beats). Build on the world library `tools/video/world/` (example: `video/L41/composition.html`). The section "Global rules for this lesson" referenced by `research/video-long/L23-storyboard.md` (that is, the section in `research/video-long/L22-storyboard.md`, same as `L21-storyboard.md` / `L05-storyboard.md`) applies here too, unchanged. Sentences per scene: 0:8 1:8 2:7 3:11 4:8 5:7 6:11 7:6 8:6 9:11 10:8 11:8.

Characters: Valeria (developer, laptop), Nexo (blue robot agent), Marta (warehouse user, speech bubbles, holding a stock sheet with blank rows, no digits), the service manager (clipboard, scene 0 only, nodding), the security team (one figure with a badge, scenes 7 and 9 only).

## Colour code
- **Blue** = the API and its description (the inventory API, the Swagger / OpenAPI blueprint, Postman, blank).
- **Orange** = the custom connector itself (the adapter being built on the bench, its lock, test lamp).
- **Purple** = Copilot Studio side (Nexo's tool rack, "Add a tool", "Custom connector").
- **Green** = right answer / correct path (connection references, data policy covers it, Postman accepted).
- **Red** = trap / not allowed / blocked.
- **Grey** = governance and environments (the security gate, the Dev and Test wings).

## World layout (3840x2160)
New world: **The Contoso adapter forge and the plug wall**.
- **Plug wall** (far left, blue): a big wall socket with an odd, oddly shaped plug labelled "Inventory API" (internal). Next to it a pinned blueprint "Swagger file". No readable digits anywhere.
- **Forge bench** (left-centre, orange): the workbench where the adapter is made. Signs on the bench: "Power Apps" and "Power Automate" (two stations of the same bench). Three intake trays in front: "OpenAPI (Swagger 2.0)", "Postman collection", "Blank". On the bench, the adapter body "Custom connector", a lock dial with four positions "No auth", "Basic", "API key", "OAuth 2.0", two small add-on chips "Policy templates" and "C# code", and a test lamp "Test operations".
- **Key ring hook** (centre): a hook holding a key ring "Connection" ("stores the credentials").
- **Nexo's tool rack** (centre-right, purple, labelled "Copilot Studio"): a pegboard with a button "Add a tool" and a slot "Custom connector"; the finished adapter hangs here as tool "Inventory API".
- **Devices row** (right): three devices plugged into the same adapter type: a tablet "Power Apps" (stock app), a conveyor control "Power Automate" (reorder flow), and Nexo.
- **Environment wings** (bottom band of the world, grey, two rooms side by side): "Dev" and "Test", each with its own key hook "Connection". A moving crate "Solution" travels on a rail between them; on the crate, a tag "Connection reference" with a string that points to the hook of whichever room the crate is in.
- **Security gate** (top right, grey): a turnstile gate with a sign "Data policy (DLP)", a scanner that reads the adapter's address tag "URL pattern", and two lamps "Allow" / "Block" controlled by an administrator.
- **Warehouse corner** (far right): Marta's stock shelves; she asks Nexo questions.
- Valeria's laptop (UI mode, scene 10).

## 0 An adapter for an odd plug (s0-7)
Wide of the whole world. s0 title "Tuesday at Contoso". s1 Marta at her shelves, bubble "How many parts are left?" (no digits). s2 camera to the plug wall: the odd plug "Inventory API"; Nexo tries and the plug does not fit (small red shake). s3 Valeria opens her laptop; the service manager nods. s4 the adapter body "Custom connector" appears on the forge bench. s5 visual metaphor: an odd plug + adapter = it fits (label "a custom adapter for an odd plug"). s6 the three devices light up one after another: "Power Apps", "Power Automate", Nexo. s7 label "describe once, reuse many times".

## 1 Three ways to start (s0-7)
Camera into the forge bench. s0 chip "Where is it made?". s1 the two station signs "Power Apps" and "Power Automate" light. s2 chip "three ways to start", three trays appear empty-free (each with its label). s3 the "OpenAPI (Swagger 2.0)" tray lights, label "Swagger 2.0". s4 a blueprint unrolls: "describes the operations of an API" (operation rows drawn as icons, no digits). s5 the "Postman collection" tray lights. s6 the "Blank" tray lights ("from scratch"). s7 Valeria takes the pinned "Swagger file" from the plug wall and drops it in the OpenAPI tray.

## 2 Choosing the lock (s0-6)
s0 the lock dial on the adapter glows. s1 chip "authentication type". s2 the dial's four positions appear in turn: "No auth", "Basic", "API key", "OAuth 2.0". s3 the dial clicks to "API key" (orange highlight), tag "Contoso". s4 the two add-on chips snap onto the adapter: "Policy templates", "C# code". s5 the test lamp "Test operations" blinks, then turns green. s6 the adapter now fits the odd plug (green check).

## 3 EXAM: the starting file (pause s7, reveal s8)
- Q: "A partner team has no Swagger file, only a Postman collection for their API. How can they start their custom connector?"
- A "Only after they write a Swagger file first" (trap) · B "From the Postman collection they have" (right) · C "Only from scratch, typing every operation".
- Proof panel: the three intake trays with the "Postman collection" tray holding the partner's collection (green check), the "OpenAPI (Swagger 2.0)" tray empty with a note "not the only way in" (red X over "Swagger first"), the "Blank" tray shown as also allowed but not needed.

## 4 Plugging it into Nexo (s0-7)
Camera to the centre. s0 the finished adapter travels from the bench toward Nexo. s1 Valeria hangs a key ring on the hook: "Connection". s2 label "stores the credentials", the key ring is a "saved key". s3 camera to the purple tool rack "Copilot Studio", Valeria opens the agent. s4 the "Add a tool" button presses, then the "Custom connector" slot lights. s5 the adapter hangs on the rack as tool "Inventory API"; Nexo picks it up. s6 chip "remember the order". s7 two labels side by side: "Connector = describes the API" (orange) · "Connection = holds the key" (key ring).

## 5 From Dev to Test (s0-6)
Camera down to the environment wings. s0 the rail "Dev → Test" lights. s1 each room shows its own hook "Connection" with a different key. s2 Valeria packs the connector into the crate "Solution" and ties the tag "Connection reference". s3 label "pointer to a connection". s4 in "Dev", the tag's string points to the Dev hook. s5 the crate rides to "Test"; the string re-points to the Test hook. s6 label "the right key in each environment" (green).

## 6 EXAM: the move (pause s7, reveal s8)
- Q: "Valeria moves the solution with the connector from Dev to Test. What lets the connector find the right connection in each environment?"
- A "The same connection, shared by both" (trap) · B "A new key typed into the agent each time" · C "Connection references in the solution" (right).
- Proof panel: the crate "Solution" in the Test room with its "Connection reference" string pointing to the Test hook (green); a single key ring stretched across both rooms with a red X ("each environment has its own connection").

## 7 The security gate (s0-5)
Camera up to the security gate. s0 red warning chip "governance". s1 sign "Data policy (DLP)" lights, label "also governs custom connectors". s2 caption chip "administrator rule: which connectors can be used together". s3 the scanner reads the adapter's tag "URL pattern" ("web address of the API"). s4 the administrator's two lamps "Allow" / "Block" (green and red). s5 the security team figure stamps the Inventory API adapter "classified by URL pattern".

## 8 When it makes sense (s0-5)
Wide on the devices row. s0 chip "When is it the right choice?". s1 checklist appears: "internal API" + "already in OpenAPI" + "used by Power Apps and flows". s2 label "Contoso's case" (all three ticks green). s3 the same adapter type plugs into the stock app "Power Apps", the reorder flow "Power Automate", and Nexo. s4 a "repeat the work" icon is struck through. s5 label "One adapter, many devices".

## 9 EXAM: the policy (pause s7, reveal s8)
- Q: "The security team asks whether the data policy covers the new Inventory API custom connector. What should Valeria answer?"
- A "Yes, data policies cover it too" (right) · B "No, custom connectors are exempt" (trap) · C "Only when it runs inside a flow".
- Proof panel: the security gate "Data policy (DLP)" with the Inventory API adapter on the scanner, tag "URL pattern" read (green check, "custom connectors too"); a struck "exempt" badge in red.

## 10 The steps (s0-7)
UI mode on Valeria's laptop, one step per sentence, only steps from the theory: s0 "The steps". s1 gather the "OpenAPI (Swagger 2.0)" file or a "Postman collection". s2 in "Power Apps" or "Power Automate": create a custom connector from that file (or from scratch). s3 authentication picker with the four types exactly: "No auth", "Basic", "API key", "OAuth 2.0". s4 "Test" the operations of the connector. s5 create a connection with your credentials. s6 Copilot Studio: agent open → "Add a tool" → "Custom connector". s7 to move between environments: "Solution" + "Connection references". Do not show any setting, field, wizard page or limit not in the theory.

## 11 The adapter at work (s0-7)
Callback to scene 0, wide world, warm light. s0 "Back to Contoso". s1 Marta's stock question → Nexo uses the Inventory API adapter and hands her the filled stock sheet (icons, no digits). s2 recap row title "For the exam". s3 "Sources: OpenAPI, Postman, or blank". s4 "Internal API in OpenAPI, reused by apps and flows = custom connector". s5 "Move environments = connection references". s6 "Data policies govern custom connectors too". s7 chip "Next: REST API tool". Hold ≥3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 3, 6, 9 with pauseSentence 7 (0-based) and the questions/options above (right 1, 2, 0; trap 0, 0, 1; 0-based).

## Fact notes
All facts from the L24 theory, steps, example, exam tips and glossary (FACTS.md line 60 says the same):
- A custom connector turns your own API into a tool that Power Apps, Power Automate, and the agent can use; described once, reused many times (the adapter-for-an-odd-plug picture is from the theory).
- Created in Power Apps or Power Automate, from an OpenAPI file (Swagger 2.0), a Postman collection, or from scratch (blank). OpenAPI / Swagger = standard file that describes the operations of an API.
- Authentication: No auth, Basic, API key, OAuth 2.0. Policy templates and C# code can be added. Steps include testing the operations of the connector.
- A connection stores the credentials used to run the connector. In Copilot Studio: Add a tool, Custom connector.
- To move between environments inside a solution: connection references, which point to the connection in each environment (example: Dev to Test).
- Power Platform data policies (DLP) also govern custom connectors and can classify them by URL pattern; an administrator can allow or block the API. Data policy = administrator rule that decides which connectors can be used together.
- An internal API already described in OpenAPI and used by Power Apps and flows: the custom connector is the natural path, because it is reused everywhere.
- Contoso example: internal inventory API with its Swagger file, connector "Inventory API", API key, connection, Add a tool, Custom connector, flows also use it, Dev to Test with a solution and connection references, security team classifies it by URL pattern. In the example the connector is created by "an administrator"; here Valeria builds it (same steps) and the security team does the classification. The "stock app", "reorder flow" and "partner team with a Postman collection" are story details only, no product facts. No numbers, limits or prices are shown. No brand logos: plug, adapter, gate and devices are generic drawings.
