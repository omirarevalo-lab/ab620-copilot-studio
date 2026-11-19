# L41 storyboard: world style (spec for the composition)

Narration `research/video-long/L41-script.json`, timings `video/L41/beats.json` (17 scenes, 7:42). Use `S(i,j)`, `E(i,j)`, `W(i,j,'word')`. Reuse the L05 world kit (characters, CAM/CUR/CLICK, UI shell, EXAM room, colour code, technical rules): see `the video guidelines` §4 and `video/L05/composition.html`. Same global rules as `L05-storyboard.md` (keywords only, ≥26 px, GSAP only, no blur, no SFX, no blank frames, change mode every 20-40 s).

## World layout (3840x2160, new for L41)
- Centre: Contoso office floor. **HR agent** (L05 robot with yellow "HR" folder) at 1720,1010 next to a **Tools toolbox** (a dark rounded box with a wrench icon, label "Tools") where cables plug in. **Maker** desk with laptop at 420,1040 (UI mode enters this laptop).
- Three "expert colleague" buildings around the agent, each one a character at a desk + its own building. They are NOT copies of the agent:
  - **Foundry IQ** (left-top, ~700,300): a library with shelves of policy binders, a librarian character (teal body) and a sign "Microsoft Foundry". A **compliance team** owner (two small figures) works inside. Colour: blue.
  - **Fabric IQ** (top-right, ~3000,300): a data tower with bar charts and a cube "Semantic model" whose three faces read **measures · hierarchies · dimensions**. Analyst character (purple body). Small "Preview" pill.
  - **Work IQ** (bottom-right, ~3100,1500): an open office with icons floating over desks: file, mail, calendar (meeting), chat. Assistant character (green body). "Preview" pill.
- Cables from each building to the Tools toolbox: blue solid when connected; dashed while not. A **"Microsoft 365 admin center"** admin tower (L05 admin) sits near Work IQ (used in scenes 10-11).

## 0 Three questions on Tuesday (s0-7)
WORLD wide. Title kinetic "Tuesday at Contoso" (s0). Three people walk to the agent; each gets a speech bubble in turn (s1-3): "Parental leave policy?", "Revenue by region?", "Meetings about a renewal?". s4: the agent looks at its folder, then three "?" marks. s5-6: camera pans out to show the three buildings (still dim). s7: label "Which Microsoft IQ capability?".

## 1 Three expert colleagues (s0-7)
Camera visits each building as it is named; each lights up with its name pill (40 px): "knows policies" → Foundry library; "business numbers" → Fabric tower; "files, email, meetings and chats" → Work IQ office (icons pop one by one on each word). s5-6: the agent sends a small question envelope to each colleague (it *asks*, does not absorb). s7: three name pills "Foundry IQ · Fabric IQ · Work IQ".

## 2 Reuse, never copy (s0-4)
Split world: left, the maker drags a document into the agent's folder (label "Knowledge source: you upload"). Right, a cable goes from the agent to the Foundry library; the binders stay on the shelf (label "IQ: points to it"). A copy icon gets a red strike. s3: a lock filter on the cable: only some binders light up ("only what you can access"). s4: "Preview" pills pulse on Fabric IQ and Work IQ.

## 3 Where you add them (s0-4)
UI mode: camera enters the maker laptop. Generic studio UI: top bar shows the agent name and a harness chip. s0-1: chip reads "GitHub Copilot harness", it is struck and replaced by **"Microsoft Copilot harness"** with a small "renamed Oct 2026" note. s3: cursor clicks the **Build** tab, then **Tools**, then "+ Add tool". s4: a tool card shows a **Name** and **Description** field highlighted; label "Orchestrator reads these".

## 4 Foundry IQ: the policy expert (s0-5)
WORLD → Foundry library close-up. s1: a binder labelled "Leave policy" glows. s2-3: a single socket on the Tools toolbox labelled "Foundry IQ: 1 connection"; a second cable tries to plug and bounces (red). s4: four keys on a ring: "API key", "Client certificate", "Service principal", "Entra ID integrated". s5: every key goes through one door labelled "Search Service endpoint".

## 5 EXAM: the wrong answers (pause s6, reveal s7)
- Q: "The agent's Foundry IQ answers about leave are strange and incomplete. Where do you fix it?"
- A "In Copilot Studio, edit the agent instructions" (trap) · B "In Microsoft Foundry, with the knowledge base owner" (right) · C "Remove the connection and add it again".
- Proof: the compliance team tunes a binder inside the library; a cable unplugged from the toolbox → the library is unchanged (label "Removing the connection changes nothing in Foundry").

## 6 Descriptions draw the borders (s0-6)
WORLD: two tool cards argue over one question bubble (both reach for it) → then neither does. s3-5: a description card fills in three lines, one per word cue: "When to use: HR policy questions" · "Returns: policy text" · "Not: salaries, personal data". s6: the bubble now goes cleanly to one tool.

## 7 Fabric IQ: the numbers expert (s0-4)
Camera to the Fabric tower. The semantic-model cube rotates (GSAP rotateY, no blur) showing **measures · hierarchies · dimensions** on cue. s2: a maker starts rebuilding a chart inside the agent → red strike "don't rebuild". s3: "Revenue by region" bar chart rises from the tower and travels along the cable. s4: two requirement checks: "Microsoft Copilot harness agent", "Access to workspace + semantic model".

## 8 Read the activity trace (s0-4)
UI mode: Preview tab, toggle **End user preview: Off** (cursor). An **activity trace** panel lists steps. s2: case 1 "no Fabric IQ step" → hint "Check Tools + description". s3: case 2 "Called: Policy tool" (amber) → "Clarify borders". s4: case 3 red error row → "Check credentials".

## 9 EXAM: the other tool answered (pause s7, reveal s8)
- Q: "You ask for revenue by region. The trace shows the policy tool was called instead of Fabric IQ. What do you change?"
- A "Rebuild the revenue metrics in Copilot Studio" (trap) · B "Make the tool descriptions clearer" (right) · C "Replace Fabric IQ with a knowledge source".
- Proof: the two description cards get sharp borders; the revenue question now flies to the Fabric cable.

## 10 Work IQ: the teamwork expert (s0-5)
WORLD → Work IQ office. Icons file / mail / meeting / chat pop on cue. s2: the cable to the toolbox gets an **MCP** plug shape (label "MCP tool"). s3-4: an eye icon "Read-only"; a pencil icon stays locked. s5: the admin at the "Microsoft 365 admin center" tower unlocks the pencil (label "admin enables writes"), then locks it again ("default: read").

## 11 Work IQ needs the admin (s0-4)
UI mode: generic admin screen. s0: "Global Administrator" badge flips **Enable Work IQ** for the tenant (once). s2: row "Billing: usage-based plan" ✓. s3: card "Spending policy: Work IQ" (separate). s4: back to world: the Tools toolbox shows a counter of MCP plugs; when a fourth MCP plug is pushed in, one dims with "skipped this turn" → label "Keep MCP servers few".

## 12 EXAM: the shortcut tools (pause s7, reveal s8)
- Q: "A maker wants email and meeting context and adds the separate Mail, Teams and OneDrive tools instead of Work IQ. Is that the recommended choice?"
- A "Yes, they read the same data" (trap) · B "No, they are a legacy experience on the standard harness and billing" (right) · C "Yes, Work IQ cannot read email".
- Proof: three small grey tool plugs labelled "legacy · standard harness" fade; the Work IQ cable lights up.

## 13 Choose by who maintains it (s0-6)
WORLD wide with a decision board (5 rows, filled on cue): "Another team's policies → Foundry IQ" · "Fabric semantic model → Fabric IQ" · "Email, files, meetings → Work IQ" · "Your own documents → Knowledge source" (maker's folder) · "Another agent's domain → Connected agent" (a second robot linked by a cable).

## 14 The steps in the product (s0-6)
UI mode, fast cursor run-through, one step per sentence: Build tab → Tools → Add a tool → Foundry IQ "Create new connection" (auth dropdown + endpoint field) → Fabric IQ "Add" → MCP → "Work IQ (Preview)" → description field rewritten → Preview tab.

## 15 EXAM: which colleague? (pause s6, reveal s7)
- Q: "The sales director wants revenue by region, and the measures are already modelled in a Fabric semantic model. Which capability?"
- A "Work IQ, because the question came in a Teams chat" (trap) · B "Fabric IQ" (right) · C "A knowledge source with an exported spreadsheet".
- Proof: the cube on the Fabric tower glows and the chart travels to the director.

## 16 Tuesday, solved (s0-4)
WORLD: callback to scene 0. Each of the three people gets an answer bubble from the agent, with the source colleague lit (s1 Foundry, s2 Fabric, s3 Work IQ with the eye "read-only"). s4: recap in a clean 3-card row: "One Foundry IQ connection" · "Work IQ = MCP tool" · "Choose by who maintains it". End on the lit world for ≥3 s (use `<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 5, 9, 12, 15 with pauseSentence 6, 7, 7, 6 (0-based) and the questions/options above (right/trap 0-based).
