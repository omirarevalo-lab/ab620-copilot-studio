# L23 storyboard: world style (spec for the composition)

Narration `research/video-long/L23-script.json`, timings `video/L23/beats.json` (12 scenes, about 6.3 min at 150 wpm; real length from beats). Build on the world library `tools/video/world/` (example: `video/L41/composition.html`). The section "Global rules for this lesson" of `research/video-long/L22-storyboard.md` (same as `L21-storyboard.md` / `L05-storyboard.md`) applies here too. Sentences per scene: 0:6 1:7 2:7 3:11 4:6 5:5 6:11 7:7 8:5 9:11 10:8 11:8.

Characters: Valeria (developer, laptop), Nexo (blue robot agent), Marta (technician user, speech bubbles, holding a machine part), the service manager (clipboard, scene 0 only, nodding).

## Colour code
- **Blue** = Azure side (the Azure AI Search service, the index cabinet, the semantic ranker, Import and vectorize data).
- **Purple** = Copilot Studio side (Add knowledge, Featured, Generative answers node, Nexo's desk).
- **Green** = right answer / correct path (Create new connection, Ready).
- **Red** = trap / faulty hand-typed connection / not allowed.
- **Grey** = outside this knowledge source (Classic data, Virtual Network support).

## World layout (3840x2160)
New world: **The Contoso repair floor and the smart filing cabinet**.
- **Manual stacks** (far left): towering piles of grey technical manuals ("thousands of manuals"), no readable digits.
- **Filing hall** (left half, blue, labelled "Azure AI Search"): a giant smart **filing cabinet** "Index". At its intake, a sorting machine "Import and vectorize data" turns each manual into a small glowing dot-pattern tag ("embeddings") and files it in a drawer by meaning (similar topics in neighbouring drawers). Each drawer label has a small slot for a ribbon tag "URL". Above the cabinet, a **reorder rail** "Semantic ranker" that slides the best drawer forward; its control lever is mounted on the Azure side wall, plainly away from Nexo.
- **Connection corridor** (centre): a sturdy pipe from the cabinet to Nexo's desk with a green coupler "Create new connection". Beside it a hand-taped red splice ("endpoint + key typed by hand") that, when shown, leaks into a big main pipe running under the whole floor labelled "Environment", blocking the doors of several other agents' desks (generic robot silhouettes). A lock box on the coupler with four key slots: "Access Key", "Client Certificate Auth", "Service principal", "Microsoft Entra ID Integrated" (the last one marked "recommended", a person badge instead of a key).
- **Nexo's desk** (right half, purple, labelled "Copilot Studio"): a desk panel "Add knowledge" with a highlighted tab "Featured" and a second door "Generative answers node · Properties". A status lamp "In progress → Ready". A single socket "one vector index". On the node door, a grey side drawer "Classic data".
- **Repair floor** (far right): Marta's workbench with a machine and a missing part; she asks Nexo questions.
- **Network gate** (bottom right, grey, scene 8 only): a fenced gate "Private endpoint" with a sign "Virtual Network support in Power Platform".
- Valeria's laptop (UI mode, scene 10).

## 0 A filing cabinet for Nexo (s0-5)
Wide of the whole world. s0 title "Monday at Contoso". s1 camera on the manual stacks; Marta at her bench holds a part, bubble "How do I replace this part?". s2 Valeria shakes her head at a "guess" cloud above Nexo (cloud pops); the service manager nods. s3 camera glides left to the filing hall: sign "Azure AI Search", manuals flow into the cabinet "Index" (book-index icon morphs into the smarter cabinet). s4 the pipe connects the cabinet to Nexo's desk; Nexo pulls a document "your own documents". s5 label "a tidy filing cabinet".

## 1 Filed by meaning (s0-6)
Camera into the filing hall. s0 chip "How is it sorted?". s1 badge "Integrated vectorization" on the sorting machine. s2 the machine's sign "Import and vectorize data" lights. s3 a manual becomes a dot-pattern tag "embeddings = meaning as numbers" (dots, no digits) and lands in a drawer next to similar topics. s4 chip "key detail". s5 Marta's question enters the same machine and gets a matching tag, flying to the right drawer: "same embeddings model". s6 one ruler measures both the question tag and the document tag: "same ruler".

## 2 The semantic ranker (s0-6)
s0 the reorder rail lights. s1 badge "Semantic ranker" (supported). s2 the rail slides the best drawer forward: "reorders by meaning". s3 a pointer to the lever on the Azure wall. s4 label "configured first in Azure" (blue) and a struck-through purple label "not in Copilot Studio". s5 Valeria pulls the Azure lever before walking to Nexo's desk. s6 Nexo's desk shows a small "supports" check, no lever on it.

## 3 EXAM: the ranker (pause s7, reveal s8)
- Q: "Valeria wants Nexo's search results reordered by meaning with the semantic ranker. Where does she configure it first?"
- A "In the Copilot Studio knowledge settings" (trap) · B "In the Generative answers node settings" · C "In the search service, first in Azure" (right).
- Proof panel: the reorder rail with its lever on the Azure wall (green), a red X over an empty lever spot on Nexo's purple desk.

## 4 Connecting the cabinet (s0-5)
Camera to the centre and Nexo's desk. s0 Valeria walks the pipe end to the desk. s1 two doors light: "Add knowledge · Featured" and "Generative answers node · Properties". s2 the lock box on the coupler shows its four slots, each label appears in turn. s3 the "Microsoft Entra ID Integrated" slot glows green with a "recommended" ribbon. s4 the slot shows a person badge "signed-in user", and a "key rotation" calendar is struck through. s5 the "Access Key" slot gets a small tag "quick setup, non-production".

## 5 Always Create new connection (s0-4)
s0 red warning chip "the trap that hurts most". s1 the green coupler "Create new connection" clicks into place. s2 alternate take: Valeria's hands tape a red splice "endpoint + key by hand"; the leak runs into the main pipe "Environment" ("faulty, environment level"). s3 the doors of the other agents' desks lock one by one; a "delete" button on the splice is greyed "not in the product". s4 two recovery paths: "reset the agent's external access" or "delete and recreate the affected agent".

## 6 EXAM: the shortcut (pause s7, reveal s8)
- Q: "Valeria is in a hurry and has the endpoint and key on a note. How should she add Azure AI Search to Nexo?"
- A "Through Create new connection, as always" (right) · B "By typing the endpoint and key in the form" (trap) · C "By sharing the key with every user first".
- Proof panel: the green coupler "Create new connection" seated; the red splice with the leak into "Environment" and the locked agent doors; note "no delete in the product".

## 7 One index, and citations (s0-6)
s0 Nexo's socket accepts one cable "manuals index". s1 a second cable bounces off ("only one vector index per connection"); the status lamp turns "In progress" then "Ready" (green). s2 chip "Citations". s3 a drawer label gets the ribbon tag "URL" ("real address of the document"). s4 the tag reads "metadata_storage_path" → used as citation. s5 on another drawer without it, a different field with a full URL becomes the tag ("whichever field holds a complete URL"). s6 Marta follows the citation to the manual through a door she can open ("users need access").

## 8 What does not go here (s0-4)
s0 chip "Two things do not go here". s1 a crate "Azure OpenAI on your data" is turned away from the "Add knowledge" door (red X). s2 it goes into the grey side drawer "Classic data" on the Generative answers node door. s3 camera to the grey network gate: "Private endpoint" → sign "Virtual Network support in Power Platform". s4 both grey items get the exam chip.

## 9 EXAM: your own data (pause s7, reveal s8)
- Q: "Contoso also wants Azure OpenAI on their data. Where does Azure OpenAI on your data go?"
- A "In Add knowledge, next to the search index" (trap) · B "In the Classic data option of the node" (right) · C "In a second vector index on the connection".
- Proof panel: the grey "Classic data" drawer on the Generative answers node door holding the crate (green check); red X on the "Add knowledge" door; the socket "one vector index" with the second cable bounced.

## 10 The steps (s0-7)
UI mode on Valeria's laptop, one step per sentence, only steps from the theory: s0 "The steps". s1 Azure: create the Azure AI Search service and the index, "Import and vectorize data". s2 Azure: semantic ranker (optional) "configure first". s3 Copilot Studio: agent open → Knowledge. s4 "Add knowledge" → "Featured" → "Azure AI Search". s5 create the connection → authentication type picker (the four types as in the theory). s6 pick the vector index (note "only one per connection"). s7 status "In progress" → "Ready". Do not show any setting, field or limit not in the theory.

## 11 The cabinet at work (s0-7)
Callback to scene 0, wide world, warm light. s0 "Back to Contoso". s1 Marta's part question → Nexo pulls the drawer and hands her the answer with a "URL" citation ribbon; she fits the part. s2 recap row title "For the exam". s3 "Semantic ranker = configured in Azure". s4 "Create new connection, never endpoint + key by hand". s5 "One vector index per connection · final status Ready". s6 "Azure OpenAI on your data = Classic data". s7 chip "Next: Custom connector as a tool". Hold ≥3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 3, 6, 9 with pauseSentence 7 (0-based) and the questions/options above (right 2, 0, 1; trap 0, 1, 0; 0-based).

## Fact notes
All facts from the L23 theory, steps, example and exam tips (plus FACTS.md lines 47-49 and 114, which say the same):
- Azure AI Search stores documents in an index; connected to the agent, it answers with your own documents.
- Copilot Studio supports vectorized indexes with integrated vectorization ("Import and vectorize data" in Azure); the same embeddings model vectorizes the user question. Embeddings = numeric representation of meaning.
- Semantic ranker: supported, reorders results by meaning, configured first in Azure, not created from Copilot Studio.
- Added from Add knowledge → Featured, or from the Properties of a Generative answers node. Auth types: Access Key, Client Certificate Auth, Service principal, Microsoft Entra ID Integrated (recommended: signed-in user's identity, no key to rotate). Access Key = quick setup, non-production.
- Only one vector index per connection; status In progress → Ready.
- Always Create new connection; typing endpoint + key by hand creates a faulty environment-level connection that can stop every agent in the environment from adding Azure AI Search; no in-product delete; recover by resetting the agent's external access or deleting and recreating the affected agent.
- Citations need a field with the real URL; metadata_storage_path (spoken "metadata storage path") if present, otherwise any field with a complete URL; users need access to cited documents.
- Azure OpenAI on your data → Classic data option of the Generative answers node, not a knowledge source. Private endpoint → Virtual Network support in Power Platform.
- The example's "thousands of technical manuals" is from the theory; no other numbers, limits or prices are shown. No brand logos: cabinet, pipes and gates are generic drawings.
