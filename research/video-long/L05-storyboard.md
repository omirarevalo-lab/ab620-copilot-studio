# L05 storyboard: world style (spec for the composition)

Base: `video/L05x/composition.html` (approved pilot = scenes 0-3). The full video goes in `video/L05/composition.html` and uses `video/L05/beats.json` (17 scenes, 8:17). Scene and sentence timings come from `S(i,j)`, `E(i,j)` and `W(i,j,'word')`. Narration = `research/video-long/L05-script.json`.

## Global rules
- One continuous world (3840x2160) with a camera (`CAM`). Three modes: **WORLD**, **UI** (generic product screen with a cursor, no logos) and **EXAM ROOM**.
- Change mode every 20-40 s. Never cut to a blank screen. Use camera moves and zooms in and out of objects.
- Colour code: amber = warning (scan), red = blocked (policy), blue = agent and allowed, green = correct, purple = Non-business.
- On-screen text: names and key words only (3-6 words). Every name must come from the script or the lesson theory. Invent no product facts.
- Sizes at 1920x1080: at least 26 px for minor text, 34+ px for labels, 30+ px in UI text.
- GSAP only, no CSS animations, no randomness, no `filter: blur` (it forces slow capture).
- No sound effects.

## EXAM ROOM (scenes 5, 9, 12, 15): app pause point
- Full-screen dark overlay (#141b2d). Label "EXAM QUESTION". White question card (40 px). Options are white rows labelled A/B/C (36 px), at fixed positions, all visible **before** the sentence that says "Decide".
- From the start of the "Decide" sentence, a countdown ring (SVG stroke) runs for 3 s. **The app pauses the video at that sentence start.** Nothing may move or change the options between that moment and the reveal.
- Reveal at the sentence that gives the answer: the trap turns red and is struck through, with a "Trap" pill. The right option turns green with a check. The other options fade to 50 %.
- Then show "why" (2 lines max, keywords in colour) and a mini world scene that proves the answer.
- Store `#examA`, `#examB` and so on as ids. Write the question, options, pause sentence and right answer to `video/L05/quiz.json`:
  `[{ "scene": 5, "pauseSentence": 4, "question": "...", "options": ["..",".."], "right": 2, "trap": 0 }]`

## Scenes 0-3: copy the pilot as is.

## 4 Three groups (sentences 0-6)
WORLD → admin tower close-up. The admin desk holds three bins/lanes: **Business** (blue), **Non-business** (purple), **Blocked** (red), each with a 40 px label (s0-1).
- Connector cards (rounded plugs with a name) drop into the bins: SharePoint → Business, social network → Non-business, one generic "Connector" → Blocked. The Blocked lane gets a red lock (s2).
- s3: two plugs, one Business and one Non-business, slide toward the agent together and bounce apart. Show the word "never together".
- s4-5: camera to the agent. The SharePoint plug connects (blue). When the social network plug touches it, red sparks fire and a red error toast appears in real time: "Data policy: can't combine Business and Non-business".
- s6: the maker walks to the tower holding a request card. The admin drags a card from Blocked into a usable lane.

## 5 EXAM: it worked yesterday (pause s4, reveal s5)
- Q: "An agent works in development. In production, adding the same tool fails at once with an error. What stopped it?"
- Options: A "The security scan" (trap) · B "The development data policy" · C "The production data policy" (right).
- Proof after the reveal: two side-by-side rooms, DEV (green gate open, the tool plug connects) and PROD (red gate closed, the plug bounces). Label: "Policies are per environment".

## 6 Credentials and Teams (s0-5)
UI mode, generic "Admin center" screen.
- s1-2: the cursor turns on the toggle "Control maker-provided credentials".
- s3: cut to the agent's Tool credentials dropdown. It is now locked to "End user credentials", with a lock icon. A small end-user figure with a key signs in.
- s4-5: generic chat-app window, Teams-like but without a logo. A message shows the agent asking "Sign in to SharePoint", then "Sign in to Outlook", stacked. A struck "SSO" pill and the label "Custom AD auth → sign in to each connector".

## 7 One connector per source (s0-7)
WORLD: the agent's knowledge shelf with three separate pipes, animated dots flowing:
- Uploaded documents (folder)
- SharePoint and OneDrive (building)
- Public websites (globe)
Each pipe has its own valve (s1-4). s5: the admin closes only the websites valve; it turns red and its flow stops, while the other two keep flowing. s6: label "Blocking one never touches the others". s7: a sieve appears on the websites pipe (endpoint filtering): some URL chips pass (green), some bounce (red). Label "Endpoint filtering".

## 8 Closing the Monday door (s0-7): callback to scene 0
- s0: camera back on the Monday scene (maker, open lock, crowd).
- s2: a big plug labelled "Chat without Microsoft Entra ID authentication" sits in the admin tower. s3: the admin blocks it and it turns red.
- s4: on the maker's laptop the dropdown now lists only "Authenticate with Microsoft" and "Authenticate manually". "No authentication" is greyed and struck through.
- s5: the agent's lock closes (green). The crowd at the door is stopped by the gate.
- s6-7: the alarm rings once and fades. The gate glows red, with the label "The guard closes the door".

## 9 EXAM: the exam version (pause s5, reveal s6)
- Q: "An admin must prevent any agent from being published without authentication. What do you do?"
- Options: A "Rely on the security scan" (trap) · B "Block the Chat without Microsoft Entra ID authentication connector" (right) · C "Enforce Control maker-provided credentials".
- Why (s7-8): "The scan only warns. That setting controls credentials, not sign-in. Prevent → data policy."

## 10 Three zones (s0-5)
- s0-1: the camera pulls far out; the fleet of mini bots fills the floor.
- s2: the world splits into three districts with ground tints:
  - Zone 1 (small houses, light blue)
  - Zone 2 (office buildings, blue)
  - Zone 3 (fortress or data centre, dark navy)
  The bots slide into the districts.
- Zone labels: s3 "Zone 1 · Citizen: private, read-only", s4 "Zone 2 · Partnered: IT-approved makers", s5 "Zone 3 · Professional: ALM, SLAs".

## 11 What each zone allows (s0-3)
The camera visits each district, showing 2-3 signs with an icon and short text:
- Z1: "M365 + Power Platform connectors only", "User's context", "Sharing off" (struck share icon)
- Z2: "Advanced connector policies", "Approved data sources", "Pipelines", "IT approval to publish" (stamp)
- Z3: "Advanced connector policies", "Microsoft Purview" (eye), "Integrated apps"

## 12 EXAM: which zone? (pause s8, reveal s9)
- s0-4: four big question chips appear one by one: Who builds it? · Who will use it? · What data? · How critical?
- s6: the case card (HR benefits agent: IT-approved maker, other departments, shared HR data, no SLA).
- Options: A "Zone 1 · Citizen" (trap) · B "Zone 2 · Partnered" (right) · C "Zone 3 · Professional".
- After s9: the HR bot flies into the Zone 2 district. Why (s10-11): "Others use it → not Zone 1 · No SLA → not Zone 3".

## 13 Environment groups (s0-5)
Diagram in the world: tenant admin at the top, with a group box below holding three environment rooms.
- s1: the rooms snap in, labelled "one group only · no nesting".
- s2: three rule badges ("Agent sharing", "Generative AI", "Transcript access") slide down into every room and lock (read-only lock icon).
- s4: an environment admin in one room tries to flip a badge; it shakes and stays locked.
- s5: an arrow runs up to the tenant admin: "Change it at the group level".

## 14 Agent 365 (s0-6)
- s1-2: a control room with a large monitor in UI mode: a generic admin center with the breadcrumb "Manage › Inventory" and a table of agents (name, status, published/draft). New agents appear as rows on their own ("automatic, no maker setup").
- s4: label "Registry: Microsoft 365 admin center".
- s5: the cursor clicks Block on "HR agent". Its status turns Blocked (red) and the channel icons beside it grey out. A small "Test" window shows the maker can still test (green).
- s6: a log panel adds lines ("Purview: agent blocked …").

## 15 EXAM: the silent agent (pause s4, reveal s5)
- Q: "An agent set to No authentication is used all week. What do admins see for those chats?"
- Options: A "Full conversation telemetry" (trap) · B "Aggregated counts only" · C "Nothing for unauthenticated sessions" (right).
- Proof: a dashboard mock with an empty chart and "No data", then three requirement chips: signed-in session · qualifying license · not multitenant.

## 16 What to remember (s0-7)
Wide shot of the whole world. Each rule lights up as a sign over its place, in order:
- the alarm: "Scan warns"
- the gate: "Policy blocks: per environment, by connector, 3 groups"
- the knowledge pipes: "One connector per source"
- the tower plug: "Block one connector → no agent without sign-in"
- the districts: "Zones: builder, users, data, criticality"
- the control room: "Agent 365 sees all, if users sign in"

s7: the Monday scene is fixed (lock green, crowd gone). Final frame: a calm wide shot.
