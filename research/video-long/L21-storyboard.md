# L21 storyboard: world style (spec for the composition)

Narration `research/video-long/L21-script.json`, timings `video/L21/beats.json` (16 scenes, 6:46). Build on the world library `tools/video/world/` (example: `video/L41/composition.html`). Same global rules as `L05-storyboard.md`. Sentences per scene: 0:6 1:5 2:5 3:4 4:10 5:7 6:4 7:6 8:6 9:10 10:3 11:5 12:11 13:6 14:8 15:4.

## World layout (3840x2160)
- **Flow factory** (centre): the IT agent (robot with headset) at the left end of a conveyor belt named "Create ticket" (agent flow). Along the belt, action stations (small machines, numbered by count only, no digits on screen needed beyond the count chips), ending at a **Dataverse** cabinet where ticket cards land. A broken cable at the Dataverse station (red, sparks) in scenes 0-5.
- **Dashboard** (top, a big car-style dashboard panel over the factory): two gauges "Health" (error rate) and "Fuel: Copilot Credits", plus three tab buttons "Overview · Activity · Analytics".
- **Fuel tank** (right): a tank labelled "Prepaid capacity" connected to the belt by a pipe with a meter; a second optional pipe "Pay-as-you-go".
- **Harness district** (far right, scenes 10-13): the three harness buildings from F03 (Standard bricks, Microsoft Copilot harness glass tower "formerly GitHub Copilot harness", Copilot chat harness), each with its own credit meter.
- **Finance desk** (bottom right): a finance person with a calculator.
- Maker desk with laptop (UI mode).

## 0 The missing tickets (s0-5)
Wide. s0 title "Thursday at Contoso". s1 employees with "ticket?" bubbles; the belt carries cards, two fall off at the broken Dataverse cable (red). s2-3 camera follows a failing card. s4 finance desk: "How much do flows cost?". s5 the dashboard lights up: "one place to look".

## 1 The car dashboard (s0-4)
Camera to the dashboard. s1-2 Health gauge needle moves; s3 Fuel gauge labelled "Copilot Credits". s4 labels "health" and "fuel".

## 2 Three tabs (s0-4)
UI mode: flow page with tabs. Overview (s1): name, description, connections, owners, recent runs, plus "Turn off" and "Delete" buttons. Activity (s3): run list with Status and Duration columns. Analytics (s4): three tiles "Runs", "Error rate", "Trend" with a line chart.

## 3 Activity: diagnose and resubmit (s0-3)
UI: cursor opens a Failed run → step list with the failing step in red (s1). s2 cursor ticks two Failed runs → buttons "Resubmit" and "Cancel" (for an "In progress" row). s3 an Analytics tile shows a clock pill "up to 30 min".

## 4 EXAM: where are the failures? (pause s6, reveal s7)
- Q: "The team wants each failed run of Create ticket, its details, and a way to send failed runs again. Which tab?"
- A "Analytics, it shows the error rate" (trap) · B "Activity" (right) · C "Overview, it lists recent runs".
- Proof: Activity list with Failed rows ticked and Resubmit highlighted.

## 5 Contoso fixes the flow (s0-6)
World + UI alternation: s1 Activity tab, two Failed rows; s2-3 details show "Dataverse connection" step red; s4 a technician reconnects the cable in the factory (sparks stop, green); s5 Resubmit → the two cards ride the belt and land in Dataverse; s6 Analytics error-rate line drops (clock pill).

## 6 What a flow costs (s0-3)
The belt's action stations light one by one; every 100 actions a coin of "13 credits" drops into a meter (s1). s2 a designer/test-chat window labelled "Test run" runs the belt with a "free" tag (meter does not move). s3 a user with a "Microsoft 365 Copilot" badge triggers through a gate "When an agent calls the flow" → "not charged".

## 7 Do the math (s0-5)
A calculation strip builds on cue: "20 actions" × "500 runs" = "10,000 actions" → "÷ 100 = 100 blocks" → "× 13" = "≈ 1,300 Copilot Credits"; the finance person nods. s5 the earlier test run tag "+0".

## 8 When the tank is empty (s0-5)
The prepaid tank drains to empty (s0). s1 a new card at the belt entrance hits a red barrier "new runs blocked". s2 cards already on the belt finish and land (green). s3 the agent keeps chatting with an employee in a bubble without flows ("still answering"). s4 struck myth "agent stops completely". s5 the "Pay-as-you-go" pipe connects and flow resumes.

## 9 EXAM: out of capacity (pause s6, reveal s7)
- Q: "Mid-day, Contoso's prepaid capacity runs out. What happens?"
- A "The agent stops responding completely until capacity is added" (trap) · B "New flow runs are blocked, runs in progress finish, the agent keeps answering interactions without flows" (right) · C "All runs in progress are cancelled at once".
- Proof: the scene-8 tableau (barrier, finishing cards, chatting agent).

## 10 One unit, three meters (s0-2)
Camera to the harness district: the same coin "Copilot Credits" over all three buildings (s0). s1 Standard meter: per-event tick marks ("per event, defined rates"). s2 Microsoft Copilot harness meter fed by three pipes: "LLM tokens", "Tools (knowledge, MCP)", "Runtime".

## 11 When the meter starts (s0-4)
A timeline strip "Build → Preview → Evaluate → Publish → Run". Standard and Copilot chat meters start only at "Run" (s1). The Microsoft Copilot harness meter starts already at "Build" (s2-3). s4 the "Microsoft 365 Copilot license exception" badge bounces off the glass tower ("does not apply").

## 12 EXAM: the preview bill (pause s7, reveal s8)
- Q: "Makers spent a week authoring and previewing a new agent. Nothing is published, but Copilot Credits were consumed. Which harness?"
- A "The standard harness" (trap) · B "The Copilot chat harness" · C "The Microsoft Copilot harness" (right).
- Proof: the timeline with the glass-tower meter running from Build.

## 13 Four cost drivers (s0-5)
Four dials around the glass tower light on cue: "Model (reasoning = premium tokens)" · "Context drawn in" · "Tools and actions" · "Task and orchestration complexity". s4-5 a compass icon "Copilot Credits estimator: directional".

## 14 The steps (s0-7)
UI mode cursor run-through, one step per sentence: Flows list → select flow → Overview → Activity → open failed run details → select failed runs → Resubmit → Analytics → estimate strip "13 per 100 actions".

## 15 Dashboard read (s0-3)
Callback to scene 0: belt runs clean, tickets land, finance desk shows "≈ 1,300 credits". Recap row: "Activity = history + resubmit" · "Empty tank blocks only new runs" · "Test runs free" · "Microsoft Copilot harness bills from build". Hold ≥3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 4, 9, 12 with pauseSentence 6, 6, 7 (0-based) and the questions/options above (right/trap 0-based).
