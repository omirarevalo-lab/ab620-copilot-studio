# L38 storyboard: world style (spec for the composition)

Narration `research/video-long/L38-script.json` (12 scenes, ~5.6 min before the exam silences, ~5.8 min with them), timings `video/L38/beats.json`. Build on the world library `tools/video/world/` (closest siblings: `video/L37/composition.html`, `video/L36/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Sentences per scene (0-based cues s0…): 0:6 1:6 2:5 3:6 4:11 5:5 6:6 7:11 8:6 9:11 10:8 11:10 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson
The section **"Global rules for this lesson (L36 rules + layout lint)"** of `research/video-long/L37-storyboard.md` applies here in full (lint first with `node tools/video/lint-layout.mjs L38`, text sizes, margins, pills, panels and UI windows, exam rooms with the 3.5 s silence after "Decide before I answer." and the 3-2-1 ring). Lesson-specific additions:
- **One world only:** no harness split in this lesson; everything happens in the moving depot and the Test branch. No SFX. No brand logos (Copilot Studio as plain text only).
- **No repeats of other worlds:** no business park, grading hall, IT floor or workshop, review room, house of topic rooms, library, Nexo's office, toolbelt or service city, airport, assembly plant, big top, staff door building, canal locks, check-in hall, dispatch kitchen, help desk counter, mail room or courier dock (the van is a moving van, never a courier dock or parcel sorter), marina, observatory, parts market, power room, radio station, rail yard, recipe studio, records archive, telephone exchange, theatre, warehouse or stock floor (the depot has a packing bench and a crate yard, never shelving aisles or stock counts), print shop, river of systems, trail map.
- **On-screen spelling:** "I T" is written "IT"; option text drops the spoken "Or" and the "?".

## Colour code (whole lesson, fixed, reused in exams and close)
- **Solution** = a wooden **moving crate**. **Default solution** = a plain grey #8a8f96 crate stencilled "Default solution". **NexoCore** (custom solution) = a blue #3d6e9e crate stencilled "NexoCore".
- **Publisher** = an **owner label** on the crate lid, amber #e0a03a: "Publisher: Contoso · prefix nexo". Only one label per crate, ever.
- **Unmanaged** = the crate **open**, lid leaning beside it, a small tag "Unmanaged · development". **Managed** = the crate **sealed** with a teal #2f8f83 seal strip, tag "Managed · deployment".
- **Components** = items packed inside: topic cards (white with a speech-bubble icon) and flow cards (white with a small arrow-chain icon), labelled "Topic" / "Flow".
- **Unmanaged layer** (scene 8-9) = a thin translucent coral #e07a5f sheet laid on top of the sealed crate in Test, label "Unmanaged layer".
- Correct = green #1e7f4f only; trap = red #c4392f only.
- Characters: Nexo = the blue robot agent (L05 robot, label "Nexo · IT agent"), packed as a figure that stands inside the crate; Valeria = the L01 developer (purple top) with a packing list clipboard; Marta = coral #e07a5f top, laptop, waiting at the Test branch with two teammates (crowd figures); the service manager = grey vest, appears in scene 0 and the close only.

## World layout (3840x2160) — "The Contoso moving depot: packing bench, crate yard, the moving van and the Test branch"
- **Development side** (left, x 200-1500): a sign over the area "Development environment" (y ~250). **Packing bench** (x 300-1400, y 1100-1600): Valeria at the bench with her clipboard; the NexoCore crate on the bench; a small **label printer** (x ~1300) that prints the publisher label.
- **Crate yard** (left-centre, x 1500-2100, y 1200-1700): the grey "Default solution" crate on the floor, and a **preferred-solution arrow sign** on a post (x ~1800, y ~900) that can point either to the grey crate or to the bench: label "Preferred solution".
- **Seal press** (centre, x 2100-2500, y 1100-1600): a press with a lever labelled "Export as managed"; an unmanaged crate goes in open and comes out sealed. A small **inspection gate** in front of it (scene 6) with a lamp: green "export OK" / red "export blocked".
- **The road and the moving van** (centre-right, x 2500-2900, y 1300-1700): a moving van (no logo, plain white with the word "Contoso" in plain text) that carries the sealed crate along a short road.
- **Test branch** (right, x 2900-3700): a small office with the sign "Test environment" (y ~250). Inside: an unpacking table (y 1200-1600), a wall panel with two switches "Authentication" and "Publish" (x ~3500, y 700-1000), and Marta's team at a table (x ~3200, y 1650).
- UI window for UI mode (scene 10 and short inserts): grey-blue window "Copilot Studio · Solutions" placed on the bench laptop, standard UI as in L37.

## 0 Moving day (s0-5) — world
Wide over the whole depot. s0 title "Moving day at Contoso" (top-left slot). s1 Valeria at the packing bench with Nexo standing beside her; sign "Development environment" lights. s2 the service manager points across to the Test branch sign "Test environment"; Marta and two teammates wave from the branch table. s3 Nexo takes a step towards the road alone; a red dashed outline appears around him with tag "does not travel loose" (own slot above him). s4 the NexoCore crate slides onto the bench, open, with a few item cards inside; tag "packed, with everything it needs". s5 pill "solutions carry agents between environments" (bottom-centre), ~5 s.

## 1 Every agent lives in a box (s0-5) — world
s0 camera to the bench and the crate yard; tag "keep this picture". s1 the NexoCore crate closes and opens in Valeria's hands; tag "a box that groups everything" (own slot over the crate). s2 a camera hint along the road to the Test branch; tag "pack here, open there". s3 small plate under the crates "every agent lives in a solution". s4 the preferred-solution arrow sign first points at the grey crate: "set nothing → Default solution"; a small Nexo figure drops into the grey crate. s5 the arrow sign swings to the blue NexoCore crate: "preferred solution set → created there"; tag "which box, not whether" (own slot below the sign).

## 2 Your own label (s0-4) — world
s0 Valeria at the label printer; tag "custom solution · own publisher and prefix". s1 the printer prints the amber label; it sticks on the NexoCore lid: "Publisher: Contoso · prefix nexo"; tag "the owner label". s2 the stencil "NexoCore" glows; the preferred-solution sign points at it with the label "Preferred solution: NexoCore". s3 Nexo appears inside the NexoCore crate with a soft glow: tag "born inside it". s4 a second amber label tries to stick over the first and bounces off with a red ✗; tag "one publisher · cannot change in managed" (own slot right of the crate).

## 3 Develop, then deploy (s0-5) — world
s0 two crates side by side on the bench (equal width): left open, right sealed. s1 left crate open, Valeria swaps a topic card inside; tag "Unmanaged · development". s2 right crate sealed with the teal strip; tag "Managed · deployment". s3 a crossed-out "build managed from scratch" note fades in and out above the sealed crate (red ✗, ~2 s). s4 the open crate moves into the seal press; the lever "Export as managed" drops; it comes out sealed. s5 pill "develop unmanaged, deploy managed" (bottom-centre).

## 4 EXAM: the right crate (pause s7, reveal s8) — exam room
- Q (visible from s0): "Valeria finishes building Nexo inside the NexoCore solution. Now Contoso wants Nexo in the Test environment. Which solution should she import in Test?"
- A "The unmanaged one, so Test can keep editing it" (trap) · B "A managed export made from the unmanaged one" (right) · C "The default solution with every agent inside".
- Why: "**Managed** is for **deployment**; you get it by **exporting as managed**. **Unmanaged** is for **development**."
- Proof (built with the reveal, never empty): the scene-3 seal press with the open crate going in and the sealed teal crate coming out onto the van; the open crate's tag "Unmanaged · development" stays at the bench.

## 5 Pack the late arrivals (s0-4) — world
s0 the open NexoCore crate on the bench with Nexo and two topic cards inside; tag "a step people forget". s1 a new "Topic" card and a new "Flow" card land on the bench beside the crate, NOT inside (dashed outline); tag "not packed by themselves". s2 UI insert (standard window, fully filled, on the bench laptop, not over the crate): menu path "Advanced › Add required objects" highlights. s3 the two cards hop into the crate; tag "added before export" (own slot above the crate). s4 Nexo is lifted out of the crate; the topic and flow cards stay inside, highlighted; tag "removing the agent keeps its components".

## 6 The dotted name (s0-5) — world
s0 the inspection gate in front of the seal press; tag "export trap". s1 plate under the gate "no export with a topic that has dots in its name". s2 the NexoCore crate rolls to the gate; the lamp turns red: "export blocked". s3 the crate lid opens; one topic card enlarges: "VPN.Reset.Help" with the dots circled in red. s4 Valeria's pen rewrites it to "VPN Reset Help"; the lamp turns green "export OK"; the crate rolls into the press. s5 tag "won't export? check the topic names first" (own slot above the gate).

## 7 EXAM: the blocked export (pause s7, reveal s8) — exam room
- Q (visible from s0): "Valeria adds a new topic and a new flow with Add required objects. Her export is refused, and one topic has dots in its name. What should she do?"
- A "Change the publisher of the NexoCore components" (trap) · B "Remove Nexo from the solution and add it back" · C "Rename the topic that has dots in its name" (right).
- Why: "**Dots in a topic name** block the export. The **publisher** is not the problem: keep **just one**."
- Proof: the scene-6 inspection gate, lamp red on "VPN.Reset.Help", then green on "VPN Reset Help"; the amber publisher label untouched on the lid.

## 8 Unpack and clean up (s0-5) — world (Test branch)
s0 the van arrives; the sealed teal crate lands on the unpacking table at the Test branch. s1 the wall panel: switch "Authentication" flips on, then "Publish"; tag "set up again after import" (own slot left of the panel). s2 a small finish flag stays grey until both switches are on, then turns green: tag "import alone is not the finish line". s3 a teammate edits Nexo locally; the coral translucent sheet "Unmanaged layer" settles on top of the sealed crate. s4 UI insert (standard window, filled): "Solution Layers" list with two rows "Managed layer · NexoCore" and "Unmanaged layer" (selected), button "Remove unmanaged layer" highlights. s5 the coral sheet lifts away; the crate shows clean; tag "back to what was imported".

## 9 EXAM: local edits in Test (pause s7, reveal s8) — exam room
- Q (visible from s0): "In Test, someone changed the managed Nexo locally. Contoso wants Nexo back exactly as it was imported. What should Valeria do?"
- A "Remove the unmanaged layer in Solution Layers" (right) · B "Remove Nexo from the solution to drop the edits" (trap) · C "Change the publisher of the edited components".
- Why: "Local changes sit in the **unmanaged layer**; removing it clears them. **Removing the agent** does **not** remove its components."
- Proof: the scene-8 Solution Layers window with "Unmanaged layer" selected and "Remove unmanaged layer" pressed; beside it, the scene-5 picture of Nexo lifted out while the cards stay in the crate, red outline.

## 10 In Copilot Studio (s0-7) — UI mode
Standard grey-blue window "Copilot Studio · Solutions", fully sized from s0, with a seven-row step list as dim placeholders with text; each row lights on its sentence (only theory steps, nothing else). s0 header "Steps in order". s1 "1 Create a custom solution · publisher · prefix" (form fields "Publisher: Contoso", "Prefix: nexo"). s2 "2 Set as preferred solution" (chip "Preferred solution: NexoCore"). s3 "3 Create the agent, or add the existing one". s4 "4 Advanced › Add required objects". s5 "5 Export as managed (from the unmanaged one)". s6 "6 Import in the other environment". s7 "7 Set up authentication again · publish". Cursor moves only along lit rows; the window fades fully before scene 11.

## 11 Packed and delivered (s0-9) — world, fills the frame
s0 wide callback to scene 0 across the whole width: depot left, Test branch right (inside margins); the van parks at the branch. s1 the sealed NexoCore crate opens on the table; both switches on; Marta's team at their laptops, chip "testing". s2 title "Remember for the exam" (top-centre). s3-8 a recap board (two columns, one line per sentence, big text, own area, no line over a label): "Default solution, unless preferred" · "One publisher" · "Unmanaged develops · managed deploys" · "Add required objects before export" · "Dots in a topic name block export" · "Removing the agent keeps its components". s9 chip "Next: environment variables" (bottom-centre). Hold >= 3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 4, 7, 9 with pauseSentence 7 (0-based). Right 1, 2, 0; trap 0, 0, 1. Questions and options exactly as above.

## Fact notes
- All facts come from the L38 theory (sections, steps, example, examTips, glossary) and FACTS.md "Solutions & ALM — 3.2": default solution unless a preferred solution; custom solution with own publisher and prefix; keep one publisher, cannot change the publisher of a component in a managed solution; unmanaged = development, managed = deployment, managed obtained by exporting the unmanaged one as managed; Advanced, Add required objects for components added later; removing the agent does not remove its components; topic with dots in its name blocks export; after import set up authentication again and publish; Solution Layers › select unmanaged layer › Remove unmanaged layer.
- Story details that are fiction, not product facts: the topic name "VPN.Reset.Help", the depot props, Marta's team testing in Test. The publisher "Contoso · prefix nexo" and the solution name "NexoCore" are from the theory visual and example.
- Not used on purpose (no source in theory): Power Platform pipelines, security roles, connection references, environment variables (next lesson, L39).
