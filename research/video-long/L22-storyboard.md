# L22 storyboard: world style (spec for the composition)

Narration `research/video-long/L22-script.json`, timings `video/L22/beats.json` (12 scenes, about 6 min at 150 wpm; real length from beats). Build on the world library `tools/video/world/` (example: `video/L41/composition.html`). The section "Global rules for this lesson" of `research/video-long/L21-storyboard.md` applies here too (same as `L05-storyboard.md`). Sentences per scene: 0:8 1:6 2:6 3:5 4:11 5:6 6:5 7:11 8:6 9:11 10:7 11:7.

Characters: Valeria (developer, laptop), Nexo (blue robot agent), Marta (user, speech bubbles), the service manager (clipboard), the tenant admin (lanyard "Admin"), the data owner (warehouse keeper with keys).

## Colour code
- **Blue** = Copilot connectors (the library, index then answer, Microsoft Graph).
- **Orange** = Power Platform connectors (the switchboard, live call, real-time knowledge).
- **Green** = right answer / correct choice. **Red** = trap / forbidden copy / missing scope.
- **Grey** = metadata only (table and column names).

## World layout (3840x2160)
New world: **The Contoso library and the switchboard**.
- **Library** (left half, blue): a reading hall with tall shelves. A **copy desk** at the entrance where a clerk photocopies pages from crates labelled "Manuals" and "HR policies" into a big card catalog cabinet labelled **"Microsoft Graph"**. Each catalog card carries a small padlock tag ("ACL") and a ribbon bookmark ("citation"). Above the catalog, a sign "Index then answer". A side door labelled "Microsoft Search" also reads from the same catalog. The tenant admin's key ring hangs by the copy desk.
- **Switchboard** (right half, orange): an old telephone switchboard with patch cables. One line runs out of the window to the **Contoso warehouse** (far right), where the data owner stands beside a stock counter whose numbers flicker constantly (no real digits needed: rolling bars). On the switchboard only a small grey card is pinned: "tables · columns" (metadata). Badge "Real-time knowledge (preview)". Every call carries an ID badge of the person asking.
- **Nexo's reading table** (centre): Nexo sits between the two halves, able to pull a catalog card (left) or lift the phone (right). Marta arrives at the table with questions.
- **Publishing gate** (top centre, scenes 8-9): an arched gate "Channels" with a key-card reader labelled "Authentication" and an empty key slot that must hold the scope card "ExternalItem.Read.All".
- Valeria's desk with laptop (UI mode, scene 10).

## 0 Two kinds of questions (s0-7)
Wide of the whole world. s0 title "Monday at Contoso". s1 Marta walks to Nexo's table with two bubbles. s2 bubble "What does this HR policy say?" (camera nudges left toward the library shelves). s3 bubble "How many units right now?" (camera nudges right to the warehouse counter, bars flickering). s4 Valeria enters with laptop between them. s5 label on the shelves "hardly changes" (still). s6 label on the warehouse "changes every minute" (flicker). s7 both halves light up, blue and orange: "which family?".

## 1 A library and a phone call (s0-5)
s0 camera pulls back to frame both halves. s1 headline chip "Two connector families". s2 split: library icon (blue) vs telephone icon (orange). s3 library: clerk copies a page into the catalog, then a fast search beam finds it. s4 switchboard: Nexo lifts the phone, line lights up to the data owner, who answers. s5 two labels "different purpose" under each half; exam chip.

## 2 Copilot connectors: index first (s0-5)
Camera into the library. s0 sign "Copilot connectors". s1 crates "Manuals", "HR policies" go through the copy desk into the "Microsoft Graph" catalog (word "indexes"). s2 padlock "ACL" snaps onto each card; two employees try to open a drawer, only the allowed one opens. s3 a search beam ("semantic indexing") pulls a card that comes out with a ribbon "citation". s4 the tenant admin turns a key at the copy desk; the side door "Microsoft Search" lights, reading the same catalog ("reused"). s5 sign "Index then answer" pulses.

## 3 Power Platform connectors: ask live (s0-4)
Camera to the switchboard. s0 sign "Power Platform connectors". s1 badge "Real-time knowledge (preview)"; Marta's question goes down the line with her ID badge clipped to it; the data owner answers from the live counter. s2 a photocopier near the switchboard is struck through ("not copied or moved"). s3 the grey card "tables · columns" pinned on the board ("only metadata indexed"). s4 Nexo on the phone at the moment Marta asks; label "the phone call".

## 4 EXAM: the live inventory (pause s7, reveal s8)
- Q: "Contoso's warehouse inventory changes every minute, and the data owner does not want the stock copied. Which option should Valeria give Nexo?"
- A "A Copilot connector that indexes the stock" (trap) · B "A Power Platform connector in real-time mode" (right) · C "A Copilot connector shared with Microsoft Search".
- Proof panel: the switchboard line from Nexo to the warehouse with Marta's ID badge, the struck photocopier, and a red X over a crate "Stock" at the copy desk (the copy the owner refused).

## 5 Which one do I choose (s0-5)
A two-way signpost at Nexo's table. s0 sign "How do you choose?". s1 question chip "changes little or every minute?". s2 left arm (blue) "Manuals, policies → Copilot connectors". s3 right arm (orange) "Inventory, not replicated → Power Platform connectors". s4 "not only one" hand-off: both arms glow. s5 badge "Mixed mode" over the table.

## 6 Contoso uses both (s0-4)
Wide world, the example as one continuous move. s0 "Watch Contoso". s1 manuals and HR policies indexed into the catalog; Nexo hands Marta an answer with a ribbon "citation". s2 Valeria patches the warehouse line on the switchboard ("real-time knowledge"). s3 a query travels with the asker's ID badge. s4 Nexo holds a catalog card in one hand and the phone in the other: "Mixed mode".

## 7 EXAM: the policy answers (pause s7, reveal s8)
- Q: "Marta asks about HR policies. The manager wants citations, and each employee sees only what they could already see. Which option fits these policies?"
- A "A Copilot connector set up by the admin" (right) · B "A Power Platform connector asked live" (trap) · C "Indexing only the table and column names".
- Proof panel: the library catalog card "HR policies" with padlock "ACL" and ribbon "citation", the admin's key at the copy desk; small grey "tables · columns" card shown as insufficient for C.

## 8 A detail when publishing (s0-5)
Camera rises to the publishing gate "Channels". s0 exam chip "the exam likes this". s1 Valeria walks Nexo toward the gate. s2 Nexo carries a catalog card (blue) → the reader "Authentication" blinks; the scope card "ExternalItem.Read.All" appears. s3 Valeria slots the card in; the gate opens (green). s4 red ghost of an empty slot "forgetting the scope = trap". s5 a blue arrow from the library to the slot "because of Copilot connectors"; the orange switchboard line greyed "not the reason".

## 9 EXAM: the missing scope (pause s7, reveal s8)
- Q: "Valeria publishes Nexo to channels. Nexo uses a Copilot connector for the manuals and the HR policies. What does authentication need?"
- A "The identity of each user, asked live" · B "A scope for the Power Platform connector" (trap) · C "The External Item Read All scope" (right).
- Proof panel: the gate's reader with the card "ExternalItem.Read.All" seated, a blue arrow from the library catalog; the switchboard line greyed.

## 10 The steps (s0-6)
UI mode on Valeria's laptop, one step per sentence, only steps from the theory: s0 "The steps". s1 Copilot Studio, agent open → Knowledge tab. s2 "Add knowledge" → list of available connectors. s3 decision chip "changes little or every minute?". s4 choose a Copilot connector (note "the tenant admin enables it"). s5 choose a Power Platform connector with real-time knowledge (preview badge). s6 publishing → authentication → scope "ExternalItem.Read.All". Do not show any setting not in the theory.

## 11 Catalog and call, together (s0-6)
Callback to scene 0, wide world, warm light. s0 "Back to Contoso". s1 Marta's HR question → Nexo pulls a catalog card with ribbon "citation". s2 Marta's stock question → Nexo lifts the phone, her ID badge on the line. s3 recap row starts "Stable + citations = Copilot connectors". s4 "By the minute, no copy = real-time Power Platform connectors". s5 "Publishing = ExternalItem.Read.All". s6 chip "Next: Azure AI Search as knowledge". Hold ≥3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 4, 7, 9 with pauseSentence 7 (0-based) and the questions/options above (right 1, 0, 2; trap 0, 1, 1; 0-based).

## Fact notes
All facts from the L22 theory, steps, example and exam tips only:
- Copilot connectors index content into Microsoft Graph, respect the source ACL, give semantic indexing and citations, are set up by the tenant admin and reused in Copilot and Microsoft Search; model "index-then-answer".
- Power Platform connectors in real-time knowledge mode (preview): each question runs against the source with the user's identity; data not copied or moved; only metadata (table and column names) indexed.
- Stable content (manuals, policies) → Copilot connectors; data by the minute that must not be replicated (inventory) → Power Platform connectors; mixed mode uses both.
- Publishing to channels with Copilot connectors needs the ExternalItem.Read.All scope in authentication (spoken as "External Item dot Read dot All").
- No limits, numbers or prices are stated in the theory; none are shown. No brand logos: library, switchboard and gate are generic drawings.
