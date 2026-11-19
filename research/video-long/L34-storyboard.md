# L34 storyboard: world style (spec for the composition)

Narration `research/video-long/L34-script.json`, timings `video/L34/beats.json` (17 scenes, 7:12 before the exam silences). Build on the world library `tools/video/world/` (examples: `video/L41/composition.html`, `video/L21/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Same global rules as `L05-storyboard.md`. Sentences per scene: 0:7 1:7 2:7 3:5 4:7 5:11 6:5 7:6 8:6 9:9 10:6 11:6 12:6 13:5 14:5 15:10 16:8.

## Global rules for this lesson (learned from L21 `video/L21/qc.md`)
- **Text size:** world labels >= 60 px on the 3840x2160 canvas (>= 30 px at 1080p in the widest shot that shows them); UI window text >= 30 px at 1080p, table cells included. If a label would be smaller in a wide shot, hide it there or push the camera in.
- **Margins:** keep every subject >= 120 px (1080p) from the left and right frame edges; the closing shot fills the frame (no empty third).
- **Pills:** no long pill on screen more than ~15 s; the alias pill "formerly GitHub Copilot harness" shows ~4 s at its one mention (scene 1 s5) and never again.
- **Panels:** a reveal or calculation panel never appears empty: its content comes in with it, or the panel arrives on the cue of its first line.
- **Exam rooms:** question card visible from the scene's first frame (s0 "Your turn."); options appear on their own sentences; full fade-out of the world/UI before the room fades in, and the same on exit. After "Decide before I answer." the fixer inserts **3.5 s of silence** into `narration.mp3` + `beats.json`; the 3-2-1 ring starts when the sentence ENDS (start of the silence), nothing moves during the silence, the answer reveals on the reveal sentence. On-screen options drop the spoken "Or" and the "?".
- Name: "Microsoft Copilot harness" everywhere; "Application Insights" spelled out on screen (no "App Insights"). No SFX.

## World layout (3840x2160)
- **Contoso floor** (centre, x 1350-2450): Nexo (L05 robot with headset, label "Nexo · IT agent") at a help desk; three employees (`crowd`) with question bubbles; the maker team's desk (`maker`) with a laptop showing a chat labelled "Test canvas". Test messages are amber bubbles, real ones blue.
- **Azure hangar** (left, x 150-1250): the **black box**, an orange flight recorder "Application Insights" with an Azure badge, joined to Nexo by a cable. Next to it a filing drawer "customEvents" where event cards drop; each card has a stamp "designMode: True" (amber) or "False" (blue). An investigator with a magnifier at a terminal (used for KQL and the workbook).
- **Cockpit** (right, x 2600-3700): an airplane cockpit dashboard titled "Monitor" with four round gauges "Sessions", "Users", "Avg duration", "Success rate", a thumbs card "Reactions", and a fuel-style meter "Total estimated credits used".
- **Security post** (bottom left, under the cable): `admin` tower + a `gate` barrier "Data policy" that can drop onto the Nexo → black box cable.
- **Finance desk** (bottom right, below the cockpit): a finance person with a calculator.
- Camera: wide at scale ~0.5; close-ups at 0.9-1.1 on one district.

## 0 Is Nexo working? (s0-6) — world
Wide. s0 title "Monday at Contoso". s1 manager (`crowd`, navy) turns to the team desk. s2 two big bubbles over the floor: "What do they ask?" · "Is it working?". s3 the team's laptop shows a bar chart; frowning faces. s4 half the chart bars turn amber with a "tests" tag. s5 the other half get a grey "?". s6 the black box (left) and the cockpit (right) glow faintly; pills "two tools" + "keep tests out".

## 1 Black box and cockpit (s0-6) — world
s0 camera wide. s1 an airplane silhouette flies across the top; its orange black box drops into the hangar. s2 the investigator opens it with the magnifier (records stream out as cards). s3 label "Application Insights · Azure" (big). s4 camera pans right to the cockpit; gauges sweep. s5 label "Monitor tab · Microsoft Copilot harness" + alias pill "formerly GitHub Copilot harness" for ~4 s only. s6 two-column sign under both: "records → deep analysis" | "health now".

## 2 Plug in the black box (s0-6) — UI
s0 world close on the black box, then fade to UI. s1 Azure portal window "Application Insights" → resource overview, cursor copies the field "Connection string" (value shown masked `InstrumentationKey=••••…`). s2 tag "identifies your resource". s3 Copilot Studio window: Nexo → nav "Settings" → "Advanced" → section "Application Insights" (NAV one step per clause). s4 cursor pastes into "Connection string", clicks the toggle "Enable logging" (turns blue). s5 back to world: cable lights from Nexo to the black box, a first card drops into the drawer. s6 small pill "agent unchanged" on Nexo.

## 3 Three extra switches (s0-4) — UI
Same Settings window, zoomed on the section. s0 three switches slide in below "Enable logging". s1 "Log conversation details" → mini preview chips "user", "name", "message text". s2 "Log sensitive Activity properties" → chip "sensitive details". s3 "Node execution events" → a tiny topic diagram where the nodes light one by one (path). s4 a balance: "more detail" vs "more personal data"; amber pill "only when needed". Switches stay OFF.

## 4 customEvents and designMode (s0-6) — world
s0 camera to the hangar drawer. s1 drawer label "customEvents" pops (big). s2 one card enlarges as a dimensions sheet: rows "name", "conversationId", "designMode" (designMode highlighted). s3 a card from the team's Test canvas drops with stamp "designMode: True" (amber). s4 a card from an employee drops with "False" (blue). s5 the Monday chart from scene 0 reappears beside the drawer. s6 its amber bars get the "True" stamp: "marked, not missing".

## 5 EXAM: only real employees (pause s7, reveal s8) — exam room
- Q (visible from s0): "Nexo's numbers mix the team's tests with real employees. The manager wants only real traffic. What do you do?"
- A "Delete the old events from the customEvents table" (trap) · B "Filter designMode equal to False in the query" (right) · C "Publish the agent again to reset the counters".
- Why: "Tests stay recorded, but drop out of the **query**. Deleting **loses data**; publishing **resets nothing**."
- Proof (.xp, built with the reveal, never empty): the drawer with amber "True" cards dimmed behind a funnel "designMode == False", blue cards pass through.

## 6 Querying with KQL (s0-4) — world + code card
s0 camera to the investigator's terminal; title "KQL · Azure query language". s1-2 a code card builds line by line on cue (each line arrives with its clause, no empty card):
```
customEvents
| where customDimensions['designMode'] == "False"
| summarize count() by name
```
(the third line swaps "by name" → "by topic" on "by topic"). s3 a bar chart of real questions next to the card: "Password reset", "VPN", "New laptop"; tag "comes back every day" on the top bar. s4 pill "deep analysis = black box".

## 7 A ready dashboard (s0-5) — UI
s0 pill "no need to start from zero". s1 Azure window: nav "Workbooks" → tile "Copilot Studio Dashboard" + amber "Preview" tag. s2 the workbook opens with three charts already full (sessions, top topics, errors). s3 world: the manager walks to the investigator. s4 UI: "Access control (IAM)" → role "Reader" added for the manager. s5 the manager sees the dashboard with a "view only" eye badge (no edit pencil).

## 8 Who can switch it off (s0-5) — world
s0 camera to the security post. s1 security officer (`admin`) with a bubble "No agent sends telemetry". s2 a maker's hand flips Nexo's "Enable logging" toggle OFF; tag "not an admin control". s3 another maker flips it back ON (cable lights again); red tag "comes back". s4 the `gate` barrier "Data policy" drops onto the cable; connector chip "Application Insights in Copilot Studio" turns red "Blocked"; cable goes grey. s5 small amber side pill "Environment telemetry · Preview · traces and spans" (≤ 10 s).

## 9 EXAM: no telemetry anywhere (pause s6, reveal s7) — exam room
- Q (visible from s0): "Security must guarantee that no agent in the environment can send telemetry to Application Insights, now or next month. What do they use?"
- A "Block its connector in a data policy" (right) · B "Turn off Enable logging in every agent" (trap) · C "Remove the Reader role from every maker".
- Why: "A **data policy** on the connector covers every agent. **Toggles come back**; **Reader** is only for viewing."
- Proof: the scene-8 tableau, barrier down, three agents' cables grey.

## 10 The cockpit: Monitor tab (s0-5) — UI
s0 world camera to the cockpit, then UI. s1 Microsoft Copilot harness window: Nexo → nav "Monitor". s2 date-range picker "Last 7 days" opens and closes. s3 each card shows a small "▲ 12% vs previous 7 days" line (highlight the comparison text). s4 an inset "Never published" agent with empty cards and pill "only real use counts". s5 clock pill "up to 1 hour after a session ends".

## 11 The overview cards (s0-5) — UI + world
s0 Monitor overview, cards light in order on s1: "Total sessions 1,240" · "Total users 310" · "Avg duration 3m 10s" · "Success rate 87%". s2 definition chip "session = one conversation, user ↔ agent". s3 a second row slides in: "Autonomous runs 96" · "Fail rate 4%". s4 world: the cockpit's "Success rate" gauge swings to green; Monday bubble "Is it working?" gets a green check. s5 big "87%" pulses once.

## 12 Thumbs up, thumbs down (s0-5) — UI
s0 "Reactions" card with 👍 128 / 👎 9. s1 next morning (small calendar flip) the card is empty with text "Turn on feedback to see reactions". s2 tag "User feedback = off". s3 cursor: Settings → "Safety and access" → toggle "User feedback" ON. s4 world: an employee taps 👍 under a Nexo answer bubble; the cockpit thumbs card fills. s5 pill "cheapest signal".

## 13 Sessions and transcripts (s0-4) — UI
s0 below the cards a table "Sessions" with columns Status · Tools · Credits. s1 filter chip "Last 28 days" (only option). s2 rows show statuses "Completed" (green), "Failed" (red), "In progress" (amber), a tool chip ("Create ticket") and credits ("4.2"). s3 cursor opens a Failed row → transcript panel with turns, a tool-call block and a knowledge-source block. s4 the failed step glows red: "where Nexo got lost".

## 14 The billing number (s0-4) — UI + world
s0 card "Total estimated credits used 2,480" highlighted; world: the finance person looks up. s1 tag "billing figure". s2 the card splits into three bars by experience: "Production", "Preview", "Evaluations"; small clock "updates a few times a day". s3 Preview + Evaluations bars bracketed: "building and testing". s4 world wide: the black box cable lights to both the glass tower and a brick building, pill "Environment telemetry · both harnesses" (≤ 10 s).

## 15 EXAM: the billing figure (pause s6, reveal s7) — exam room
- Q (visible from s0): "Finance wants the credits Contoso will be billed for this month on Nexo. Where do you get the figure?"
- A "Add up the credits shown for each listed session" (trap) · B "Query the credit events in Application Insights" · C "Read Total estimated credits used on Monitor" (right).
- Why: "**Total estimated credits used** is the billing source of truth. The sessions list only shows **single sessions** (and only 28 days)."
- Proof: the Monitor card with a "billing" stamp next to a short sessions list with a "partial view" tag.

## 16 Monday, solved (s0-7) — world, fills the frame
s0 wide callback to scene 0, framed so the floor, hangar and cockpit span the whole width (no empty third). s1 the amber test bars vanish from the team's chart ("designMode = False"). s2 left: the workbook on the investigator's screen; right: cockpit gauges green. s3 title "Remember for the exam". s4-7 a recap column builds one line per sentence (big text, centred, ≥ 60 px world): "Connection string → Settings › Advanced" · "Data → customEvents" · "Block telemetry → data policy on the connector" · "Monitor: 28 days · up to 1 h · credits = billing". Hold >= 3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 5, 9, 15 with pauseSentence 7, 6, 6 (0-based). Right 1, 0, 2; trap 0, 1, 0. Questions and options exactly as above.
