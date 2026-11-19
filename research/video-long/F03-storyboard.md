# F03 storyboard: world style (spec for the composition)

Narration `research/video-long/F03-script.json`, timings `video/F03/beats.json` (18 scenes, 8:01). Build on the world library `tools/video/world/` (example: `video/L41/composition.html`). Same global rules as `L05-storyboard.md`. Sentences per scene: 0:7 1:6 2:5 3:4 4:7 5:11 6:6 7:7 8:10 9:6 10:5 11:4 12:5 13:5 14:10 15:7 16:7 17:6.

## World layout (3840x2160)
- **Contoso lobby** (centre): a reception desk with two receptionists side by side that light up in turn: **Classic** (grey, holding a clipboard "phrase list") and **Generative** (blue, with a small spark icon). The agent "Nexo" (L05 robot with a headset, label "Nexo · IT agent") stands behind the desk.
- **Departments** along the back wall (doors with signs): "Ticket status" (topic), "Create ticket" (topic), "Tools" (wrench room), "Knowledge" (library), "Other agent" (second robot).
- An **employee** walks in with a message bubble carrying two icons: a laptop with a red "!" and a folder "case 123" (two wishes).
- **Harness district** (right, used in scenes 12-15): three buildings: "Standard harness" (topics and flows, bricks), "Microsoft Copilot harness" (glass tower with sparkles; pills: skills, memory, sandbox, Copilot Credits; "Preview"), "Copilot chat harness" (chat-bubble building). A moving van that is blocked (scene 13).
- Maker desk with laptop (UI mode).

## 0 One message, two wishes (s0-6)
Wide. s0 title "Monday at Contoso". s1-2 the employee walks to the desk; the bubble with two icons. s3 two department doors glow ("Create ticket", "Ticket status"). s4-5 a big "?" over the desk; label "orchestration = the decision". s6 three harness buildings appear faintly at the far right.

## 1 Two receptionists (s0-5)
s1 classic receptionist reads the clipboard and points to one door. s2-3 generative receptionist reads the bubble and draws a route through two doors in sequence (dotted path). s4-5 labels "Classic: phrase list" · "Generative: understands, several departments".

## 2 Classic: trigger phrases (s0-4)
UI insert: a topic card with trigger phrases "check my ticket", "where is my case" (s1-2). World: the message is compared to the phrase lists of both topics (similarity bars); the higher one wins and its door opens (s3); the laptop wish falls to the floor with a grey "lost" tag (s4).

## 3 Generative: AI decides (s0-3)
The generative receptionist lights up; arrows fan out to topic, tool, other agent and knowledge doors (s0-1). s2 a pill "Default for new agents" stamps onto a new robot. s3 a "prebuilt agent" box arrives with its own setting tag "config decides".

## 4 What changes in practice (s0-6)
A two-column comparison board (Generative | Classic) filled row by row on each sentence: Topics: description | trigger phrases · Tools: name + description | only from a topic · Knowledge: proactive | fallback · Several items: combined | one topic · Missing data: asks itself | Question nodes · Response: writes it | Message nodes.

## 5 EXAM: the lonely tool (pause s7, reveal s8)
- Q: "An agent uses classic orchestration. A maker adds a tool with a perfect name and description and expects the agent to choose it on its own. Will it?"
- A "Yes, because the description is clear" (trap) · B "No, in classic a tool is only called explicitly from a topic" (right) · C "Yes, but only as a fallback".
- Proof: the wrench room door is locked from the lobby; only a topic door has a corridor into it.

## 6 Descriptions are in charge (s0-5)
Each door gets a description plate; the generative receptionist reads plates, not phrase lists (s0-1). s2 small plates for "Name" and "Inputs/outputs". s3-5 a good plate is written on cue: "one or two sentences" · "active voice" · "user keywords" · "says what it does not do" (a border line drawn between two doors).

## 7 Twin descriptions (s0-6)
Two doors with near-identical plates; the receptionist flips a coin (s1, unpredictable). s3-5 plates rewritten: "Checks the status of an existing ticket; does not create tickets" / "Creates a new ticket; does not check existing ones". s6 an old agent's plates auto-generated from trigger phrases get a "Review" amber pill.

## 8 EXAM: the unpredictable agent (pause s7, reveal s8)
- Q: "A generative agent has two topics, Reset password and Unlock account. For the same request sometimes one runs, sometimes the other. What should the maker fix?"
- A "Add more trigger phrases to both topics" (trap) · B "Rewrite the two descriptions so they differ and say what each does not do" (right) · C "Switch the agent to classic orchestration".
- Proof: the coin disappears; each request goes to its own door.

## 9 Nexo, generative (s0-5)
The plan runs on cue: s1 two intentions split from the bubble; s2 Ticket status door opens with "case 123" taken from the conversation; s3 Create ticket door opens and Nexo asks only for the missing item ("Device?"); s4 one combined reply bubble; s5 a topic returns an "output variable" chip that flows into the reply instead of a message.

## 10 Turn it on, watch it work (s0-4)
UI mode: Settings → Generative AI → Orchestration: Yes/No toggle (s1). A topic trigger card switches from "User says a phrase" to "The agent chooses" with description (s2-3). Test pane + "Activity map" showing the plan nodes lighting in order (s4).

## 11 The admin's switch (s0-3)
Admin tower: environment panel "Generative orchestration: Off" (s0). All robots in that environment get a "classic only" tag even though the agent toggle says Yes (s1-2). s3 pill "environment rule wins".

## 12 Three harnesses (s0-4)
Camera to the harness district; each building lights on its name with its pills. s3 a struck tag "not the GitHub Copilot service" near the Microsoft Copilot harness, which shows "formerly GitHub Copilot harness". s4 Copilot chat harness building.

## 13 No moving vans (s0-4)
A moving van tries to carry a robot from the glass tower to the brick building and back: a red barrier both ways (s0-1). s2 the standard robot stays home with a green check "working, no need to move". s3 a rebuild crane icon "re-architecture". s4 "production-ready preview" pill on the tower.

## 14 EXAM: the move (pause s7, reveal s8)
- Q: "Contoso's standard harness agent works well. A team member wants to switch it to the Microsoft Copilot harness. What is true?"
- A "There is a transfer button in Settings that converts it" (trap) · B "It cannot be transferred; a move means rebuilding it, only for a clear benefit" (right) · C "It moves automatically when the harness leaves preview".
- Proof: the barrier and the crane.

## 15 Four tabs (s0-6)
UI mode: agent on the Microsoft Copilot harness with tabs Build · Preview · Evaluate · Monitor, each highlighted on cue with its items (Build: identity, knowledge, tools, skills, model, memory; Evaluate: test sets; Monitor: health, outcomes, reactions, sessions, credit usage). s5 life-cycle strip Create → Build → Test → Publish → Monitor. s6 a greyed "Orchestration settings" panel with a lock: "one enhanced model".

## 16 The steps (s0-6)
UI mode cursor run-through, one step per sentence: Settings → Orchestration Yes → topic trigger → edit description → tool name/description → test pane two-intention message → activity map.

## 17 Two wishes, one answer (s0-5)
Callback to scene 0: the employee receives one reply covering both wishes; both doors glow. Recap row: "Generative: description + name" · "Classic: trigger phrases" · "Classic tools only from topics" · "No moves between harnesses". Hold ≥3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 5, 8, 14 with pauseSentence 7, 7, 7 (0-based) and the questions/options above (right/trap 0-based).
