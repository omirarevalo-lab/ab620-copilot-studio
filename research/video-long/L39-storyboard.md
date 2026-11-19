# L39 storyboard: world style (spec for the composition)

Narration `research/video-long/L39-script.json` (12 scenes, ~5.8 min before the exam silences, ~6.0 min with them), timings `video/L39/beats.json`. Build on the world library `tools/video/world/` (closest siblings: `video/L38/composition.html`, `video/L37/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Sentences per scene (0-based cues s0…): 0:5 1:6 2:7 3:6 4:11 5:6 6:5 7:11 8:8 9:11 10:8 11:8 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson
The section **"Global rules for this lesson"** of `research/video-long/L38-storyboard.md` (which points to the L37 rules + layout lint) applies here in full: lint first with `node tools/video/lint-layout.mjs L39`, text sizes, margins, pills, panels and UI windows, exam rooms with the 3.5 s silence after "Decide before I answer." and the 3-2-1 ring. Lesson-specific additions:
- **One world only:** everything happens on the hotel avenue described below. No SFX. No brand logos (Copilot Studio, Azure Key Vault, Dataverse as plain text only; no Azure or Microsoft icons).
- **No repeats of other worlds:** no moving depot, crates, seal press or moving van (L38), no business park, grading hall, IT floor or workshop, review room, house of topic rooms, library, Nexo's office, toolbelt or service city, airport, assembly plant, big top, staff door building, canal locks, check-in hall, dispatch kitchen or restaurant, help desk counter, mail room or courier dock, marina, observatory, parts market, power room, radio station, rail yard, recipe studio, records archive, telephone exchange, theatre, warehouse, print shop, river of systems, trail map. The hotels have a lobby and a front door only: never a reception check-in hall with queues.
- **On-screen spelling:** spoken "A P I", "U R L", "J S O N" are written "API", "URL", "JSON"; spoken "Api Base Url" / "Api Key" are written `ApiBaseUrl` / `ApiKey`; spoken "Microsoft dot Power Platform" is written `Microsoft.PowerPlatform`. Option text drops the spoken "Or" and the "?".

## Colour code (whole lesson, fixed, reused in exams and close)
- **Solution NexoCore** = the **hotel blueprint**: a blue #3d6e9e rolled plan stamped "NexoCore". Same plan for every hotel.
- **Environment** = a **hotel** on the avenue: "Dev" (lilac #8b7bb8 awning), "Test" (amber #e0a03a awning), "Production" (slate #5a6b7d awning). Same building shape for all three.
- **Environment variable** = an **address plate** slot by each hotel's front door, frame white with a small tag showing the variable name. `ApiBaseUrl` (Text) plate = white enamel with the address text in dark blue; Dev shows "dev address", Test shows "test address" (never real URLs).
- **Default / current value**: the plate frame holds a printed **default card** (grey #8a8f96) behind an optional **current value sticker** (teal #2f8f83) on top. Removing the current value = peeling the teal sticker.
- **Secret** = a gold #c9a227 **claim ticket** hanging in the slot instead of a plate, label "ApiKey · Secret". The real key = a small brass key that only ever appears **inside the bank vault**.
- **Azure Key Vault** = the **bank vault** at the end of the avenue (plain stone building, sign "Azure Key Vault" in plain text), with numbered locked boxes. **Same tenant** = the avenue's boundary line "Contoso tenant" painted on the road; the vault sits inside it.
- **Dataverse** = an open filing drawer under the blueprint office, label "Dataverse".
- **Published agent** = a printed **lobby brochure** in each hotel stamped "Published" with a small date ribbon; values printed on it are frozen.
- Correct = green #1e7f4f only; trap = red #c4392f only.
- Characters: Nexo = the blue robot agent (L05 robot, label "Nexo · IT agent"), works in the lobby of each hotel; Valeria = the L01 developer (purple top) with a rolled blueprint; Marta = coral #e07a5f top, laptop, a guest in the Test hotel lobby (scene 0 and close); the service manager = grey vest, appears in scene 0 and the close only; the Contoso admin = dark-green jacket with a badge lanyard (scenes 5, 9, 11).

## World layout (3840x2160) — "The Contoso hotel avenue: blueprint office, three hotels and the bank vault"
- **Blueprint office** (left, x 200-1000, y 900-1700): a small drafting room with a sloped desk where Valeria unrolls the NexoCore blueprint; a laptop on the desk (x ~800, y ~1300) for UI inserts; the "Dataverse" filing drawer under the desk (x ~500, y ~1550).
- **The avenue** (centre band, y 1650-1900, full width inside margins): a straight street with the painted boundary "Contoso tenant" on the far right kerb (x ~3650).
- **Three hotels** (x 1100-1700 "Dev", 1800-2400 "Test", 2500-3100 "Production"; facades y 500-1650): identical buildings, different awning colours. Each has a front door (y 1350-1650) with the **address plate slot** on its right (y ~1250) and a lobby window (y 900-1200) where Nexo and the brochure are seen.
- **Bank vault** (right, x 3200-3700, y 700-1650): stone front, sign "Azure Key Vault"; inside view (when zoomed) a wall of locked boxes; a **vault pass reader** at the door (x ~3250, y ~1300) and a small **registration counter** window (x ~3550, y ~1400) labelled "Azure subscription".
- UI window for UI mode (scene 10 and short inserts): grey-blue window "Copilot Studio · Solutions" on the blueprint-office laptop, standard UI as in L38.

## 0 One agent, three addresses (s0-4) — world
Wide over the whole avenue. s0 title "One agent, three addresses" (top-left slot); the Test hotel lights; Marta waves from its lobby; tag "NexoCore in Test" (own slot above the Test door). s1 in each lobby Nexo points to a line running to an "API" kiosk; the Dev line ends at "dev address", the Test line at "test address"; tag "different address in Dev and Test". s2 a brass key icon floats over Nexo with a lock badge; tag "the key must stay secret". s3 Valeria at the blueprint office shakes her head over three copies of the blueprint with pencil edits (red ✗ over the copies); tag "no editing in every environment". s4 pill "environment variables" (bottom-centre), ~4 s; the service manager nods beside the Test hotel.

## 1 A value that changes by place (s0-5) — world
s0 camera to the three hotels; the one NexoCore blueprint projects faintly onto all three facades; tag "one plan". s1 the doors zoom: same doors, empty address plate slots; tag "same rooms, the address changes". s2 the slot on each door gets the label `ApiBaseUrl`; tag "an environment variable". s3 a small copy of the slot rides on the blueprint as it rolls down the avenue; tag "travels with the solution" (own slot above the blueprint). s4 at the Test door a plate drops in with "test address"; tag "value given at import or deploy". s5 Nexo walks through Dev, Test and Production lobbies unchanged; pill "same agent, no editing" (bottom-centre).

## 2 The types (s0-6) — world
s0 a sign-painter's board beside the blueprint office, title "Variable types". s1 six equal tiles light one per word: "Decimal number" · "Text" · "JSON" · "Two options" · "Data source" · "Secret" (two rows of three, own area, no overlap with the office). s2 the "Text" tile glows; a white enamel plate slides out of it to the Dev door. s3 the plate's tag reads `ApiBaseUrl · Text`. s4 the brass key icon appears beside the board; tag "the key is different". s5 the key tries to sit on a white Text plate; red ✗; tag "never Text". s6 the "Secret" tile glows gold; tag "for a key: Secret".

## 3 Secret and Key Vault (s0-5) — world
s0 camera along the avenue to the bank vault; sign "Azure Key Vault"; tag "Secret stores a reference". s1 a gold claim ticket "ApiKey · Secret" hangs in the Test door slot; a dashed gold line runs from it to one locked box in the vault; tag "claim ticket, not the key". s2 the "Dataverse" drawer and the blueprint both show an empty spot where a key would be, with a small "no real secret" plate (own slot under them). s3 the blueprint rolls down the avenue carrying only the ticket; the brass key stays in its box; tag "only the ticket travels". s4 the painted line "Contoso tenant" highlights with the vault inside it; plate "Azure Key Vault only · same tenant". s5 Valeria at the laptop links `ApiKey` to the vault box; the gold line turns solid.

## 4 EXAM: where the key lives (pause s7, reveal s8) — exam room
- Q (visible from s0): "Nexo needs the Contoso API key in every environment. The security team says the key must never sit in the solution. What should Valeria do?"
- A "Store the key as a Text variable in Dataverse" (trap) · B "Use a Secret variable linked to Key Vault" (right) · C "Type the key into each topic after import".
- Why: "**Secret** stores only a **reference** to **Azure Key Vault**. The real secret never sits in **Dataverse**."
- Proof (built with the reveal, never empty): the scene-3 gold claim ticket in the door slot with its line to the locked vault box; beside it the "Dataverse" drawer with a brass key crossed in red.

## 5 Two things before Secret works (s0-5) — world (bank vault)
s0 camera to the vault front; the vault door stays shut; tag "set up in Azure first". s1 the admin walks to the registration counter "Azure subscription" and stamps a form "Microsoft.PowerPlatform resource provider · registered" (form text readable, own slot above the counter). s2 Valeria receives a lanyard badge "Key Vault Secrets User"; tag "for whoever creates the variable". s3 the badge on the pass reader; the reader lamp turns green; tag "allows reading secrets". s4 short recap chips side by side above the vault: "provider registered" ✓ · "role given" ✓. s5 the vault door opens a crack; the gold ticket line from the Test door snaps into place; tag "ApiKey can link".

## 6 Default value and current value (s0-4) — world
s0 the Dev door plate zooms (fills the right half): grey default card behind, teal sticker on top; labels "Default value" and "Current value" (own slots left of the plate, no line over the plate text). s1 tag "current value = set in one environment". s2 the teal sticker reads "dev address" with a small chip "only in Dev". s3 Valeria peels the teal sticker off before the blueprint rolls out; tag "remove before export · Dev value not exported" (own slot above the plate). s4 the blueprint arrives at the Test door; a prompt card pops "Value for Test?" and Valeria writes "test address"; small chip "import or deploy with Pipelines" (Pipelines as plain text, no diagram).

## 7 EXAM: the Dev address (pause s7, reveal s8) — exam room
- Q (visible from s0): "ApiBaseUrl holds the Dev address as its current value. Valeria will export NexoCore for Test, and Contoso does not want that address to travel. What should she do?"
- A "Remove the current value before she exports" (right) · B "Delete the variable and build it again in Test" (trap) · C "Change the variable type from Text to Secret".
- Why: "**Remove the current value** before export: the **Dev value** is not exported, and **Test asks** for its own value on import."
- Proof: the scene-6 plate with the teal "dev address" sticker peeled away, and the Test door prompt "Value for Test?" filled with "test address"; the `ApiBaseUrl` slot still on the blueprint.

## 8 In Copilot Studio (s0-7) — world (Test hotel lobby)
s0 inside the Test lobby; the `ApiBaseUrl` plate seen through the door has a small padlock chip "read-only" (Nexo cannot write on it). s1 the lobby brochure stamped "Published" shows "test address" printed; tag "values from publish time". s2 the admin swaps the door plate to "new test address"; the brochure still shows the old text, red outline; then Valeria reprints the brochure: tag "change → republish" (own slot above the brochure). s3 the gold `ApiKey` ticket glows; tag "the exception: Secret". s4 Nexo follows the gold line to the vault and back each time he needs the key; tag "read at runtime". s5 title "Remember the pair" (top-centre). s6 left chip "Text and other types → republish". s7 right chip "Secret → no republish" (equal-width chips, own row).

## 9 EXAM: the old address (pause s7, reveal s8) — exam room
- Q (visible from s0): "In Test, the admin updated the value of ApiBaseUrl. But the published Nexo still calls the old address. What should Valeria do?"
- A "Edit the value directly inside the Nexo topic" (trap) · B "Import the whole solution into Test again" · C "Republish Nexo so it picks up the new value" (right).
- Why: "The **published agent** keeps the values from **publish time**: **republish**. Variables are **read-only** in Copilot Studio."
- Proof: the scene-8 brochure reprinted with the new address and a fresh "Published" stamp; beside it the read-only padlock on the plate with a red ✗ over a pen.

## 10 The steps (s0-7) — UI mode
Standard grey-blue window "Copilot Studio · Solutions", fully sized from s0, with a seven-row step list as dim placeholders with text; each row lights on its sentence (only theory steps, nothing else). s0 header "Steps in order". s1 "1 New › Environment variable · choose type" (form fields "Name: ApiBaseUrl", "Type: Text"). s2 "2 Default or current value · only in Dev". s3 "3 Secret · link the Azure Key Vault secret" (field "Name: ApiKey", "Type: Secret"). s4 "4 Register Microsoft.PowerPlatform resource provider (Azure subscription)". s5 "5 Give the Key Vault Secrets User role". s6 "6 Remove the current value · export". s7 "7 Import into Test · enter value · republish". Cursor moves only along lit rows; the window fades fully before scene 11.

## 11 The right address in every hotel (s0-7) — world, fills the frame
s0 wide callback to scene 0 across the whole width: blueprint office left, three hotels, vault right (inside margins). s1 the Test door shows "test address"; Nexo's line from the Test lobby reaches the Test API kiosk; the brass key stays in the vault box, gold line glowing; Marta's chip "working". s2 title "Remember for the exam" (top-centre). s3-6 a recap board (two columns, one line per sentence, big text, own area, no line over a label): "Travels with the solution · value per environment" · "Secret = Key Vault reference · same tenant · never in Dataverse" · "Remove the current value before export" · "Read-only: republish after a change, except Secret". s7 chip "Next: Power Platform Pipelines" (bottom-centre). Hold >= 3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 4, 7, 9 with pauseSentence 7 (0-based). Right 1, 0, 2; trap 0, 1, 0. Questions and options exactly as above.

## Fact notes
- All facts come from the L39 theory (sections, steps, example, examTips, glossary) and FACTS.md "Environment variables": value that changes by environment and travels with the solution; value given per environment at import or deploy; types Decimal number, Text, JSON, Two options, Data source, Secret; base URL as Text; Secret = reference to a secret in Azure Key Vault, the real secret not in Dataverse or the solution; only Azure Key Vault, same tenant; register the Microsoft.PowerPlatform resource provider in the subscription; Key Vault Secrets User role for whoever creates it (allows reading secrets); default vs current value; remove the current value before export so the Dev value is not exported; asked for the value on import or deploy with Pipelines; in Copilot Studio read-only, published agent has publish-time values, republish after a change, Secret retrieved at runtime. Exam trap 1 is the theory's own trap "storing the real secret in Dataverse".
- Story details that are fiction, not product facts: the hotels, address plates, claim ticket, brochure, "dev address"/"test address" texts, the admin character, and the exam-3 situation. `ApiBaseUrl`, `ApiKey` and NexoCore come from the theory visual and example. The hotel-chain picture replaces the theory's restaurant-chain analogy (same idea) so as not to repeat a kitchen world.
- Not used on purpose (no source in theory, or beyond its scope): Key Vault firewall and Power Platform IPs, the `Env.` variable scope, System Customizer role, Pipelines details (next lesson, L40), JSON or Data source examples.
