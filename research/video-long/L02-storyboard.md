# L02 storyboard: world style (spec for the composition)

Narration `research/video-long/L02-script.json`, timings `video/L02/beats.json` (16 scenes, 7:02). Build on the world library `tools/video/world/` (characters, CAM/CUR/CLICK, UI shell, EXAM room, colour code). Same global rules as `L05-storyboard.md`: keywords only, ≥26 px, GSAP only, no blur, no SFX, no blank frames, change mode every 20-40 s. Sentence counts per scene: 0:6 1:7 2:5 3:5 4:5 5:9 6:5 7:6 8:5 9:10 10:5 11:5 12:6 13:9 14:8 15:4.

## World layout (3840x2160)
- **Contoso building** (left half): a glass front with **three doors** side by side, used all video long:
  - Door A "No authentication": wide open, no frame lock (grey).
  - Door B "Authenticate with Microsoft": a **badge reader** (blue) with a small Entra shield; employees tap badges.
  - Door C "Authenticate manually": a **padlock with a key ring** labelled "OAuth 2" (purple).
- Inside the building: the **IT helpdesk agent** (L05 robot, blue, with a headset instead of the HR folder) sitting in a **Teams-like chat room** (generic, no logo; label "Teams").
- **Customer portal** (right half): a web storefront window "Contoso portal" with the **order agent** (robot with a parcel box). Customers (crowd people) arrive from the street; each holds a portal key card, none holds a Microsoft badge.
- **Maker** desk with laptop near the centre (UI mode enters it). **Admin** with a tower at the top right labelled "Microsoft Entra admin center" (used in scenes 11-12).

## 0 Who is talking? (s0-5)
Wide world. s0 title kinetic "Two agents at Contoso". s1 camera on helpdesk agent + employees in Teams room. s2 camera to portal agent + customers (pill "no Microsoft account"). s3 maker flips both agents' doors to wide open (red pill "No authentication" on both). s4-5 big kinetic question "Who is talking to your agent?".

## 1 Three kinds of door (s0-6)
Camera along the three doors, each lights up on its word: "open" → door A swings open; "badge" → door B reader blinks green as an employee taps; "own lock" → door C padlock clicks. s5: a stranger walks through door A (red flash), an employee bounces off door C (amber "locked out"). s6: three labels under the doors.

## 2 Open door (s0-4)
Door A close-up. s0-1 a stream of anonymous figures (grey, "?" faces) walks in. s2 a public FAQ kiosk agent: green check "public, general questions". s3-4 the link (chain icon) gets copied and spread; strangers reach an agent holding a red "internal data" folder → red pill "classic mistake".

## 3 The badge (s0-4)
Door B close-up. s1 a gear builds the badge reader automatically ("set up automatically"). s2 pill "Microsoft Entra ID = who each person is". s3-4 camera into the Teams room: an employee starts chatting at once; no sign-in screen appears (a sign-in card slides in and is struck out); the agent shows the employee's name.

## 4 The channel rule (s0-4)
Two channel tiles ("Teams", "Microsoft 365") each wired to door B only. Trying to wire them to door C sparks red and bounces. s3-4 a long scenario card scrolls; the word "Teams" inside it gets highlighted with a marker.

## 5 EXAM: the Teams helpdesk (pause s6, reveal s7)
- Q: "An IT support agent for Contoso employees will be published in Teams. Which authentication option?"
- A "Authenticate manually with a generic OAuth 2 provider" (trap) · B "No authentication, everyone in Teams is an employee" · C "Authenticate with Microsoft" (right).
- Proof: employee in Teams chats with no sign-in screen; the Teams tile wired to door B.

## 6 Your own lock (s0-4)
Portal side. Customers with portal key cards. s1 the maker installs the padlock on door C (pill "generic OAuth 2 provider"). s3 a customer signs in at the provider desk; a password stays in their pocket (pill "no password shared with the agent"). s4 door C opens for them.

## 7 The user variables (s0-5)
UI mode (maker laptop): a topic editor with a variables panel. Each variable chip appears on its sentence: User.Id · User.DisplayName → a message bubble "Hi, Ana!" · User.IsLoggedIn = true · User.AccessToken (with pill "manual authentication"). s5 cursor opens the variable picker in a topic.

## 8 Identity travels (s0-4)
World: a conversation thread drawn as a ribbon follows a customer from door C to the order agent; an identity tag rides on it. s1-2 the agent pulls the right customer's order (green) and refuses another customer's order (red cross). s3 a tool call carries the user's permission key. s4 without identity the ribbon tag disappears and two customers look identical ("?").

## 9 EXAM: the customer portal (pause s7, reveal s8)
- Q: "Customers sign in to the Contoso portal with the portal's own accounts and have no Microsoft account. Which option fits?"
- A "Authenticate with Microsoft, the simplest secure choice" (trap) · B "Authenticate manually with a generic OAuth 2 provider" (right) · C "No authentication, it is a public website".
- Proof: customers bounce off door B (no badge), pass through door C.

## 10 Entra Agent ID (s0-4)
World: the maker clicks "Create agent"; a new robot appears and at the same instant a badge "Agent ID" clips onto it (s1, pill "at creation"). s2 a publish button glows later but the badge was already there (timeline: Create ● badge … Publish ○). s3 an environment switch "Agent ID: Off" is greyed/locked; a "bring your own" badge is rejected.

## 11 What the Agent ID changes (s0-4)
s0 the badge flips: "Service principal · subtype Agent". s1 users still go through the same OAuth door (unchanged). s2-3 camera to the admin tower "Microsoft Entra admin center": the agent appears in a list; tabs light up on their words: "Audit logs", "Life cycle", "Conditional Access → connector permissions". s4 UI mode: Settings › Advanced › Metadata showing a masked ID field.

## 12 Two limits (s0-5)
Left: an Agent Builder robot (smaller, grey) with an empty badge slot ("no Agent ID"). Right: a directory cabinet filling with badge objects; a meter "directory quota" hits full; the next "Create agent" shows a red error "agent cannot be created".

## 13 EXAM: when is the badge issued? (pause s6, reveal s7)
- Q: "When does Copilot Studio create the Microsoft Entra Agent ID?"
- A "When the agent is published to its first channel" (trap) · B "When the agent is created" (right) · C "After an admin enables it for the environment".
- Proof: the create/publish timeline from scene 10, badge on "Create".

## 14 Where you set it up (s0-7)
UI mode, cursor run-through, one step per sentence: Settings → Security → Authentication → three radio options → (manual) OAuth 2 fields → Save → Publish (pill "reaches the channels only after publish") → topic variable picker.

## 15 Two doors, chosen (s0-3)
Callback to scene 0: helpdesk agent behind door B, employee chats with no sign-in; portal agent behind door C, greets "Hi, Ana!". s3 recap row of 4 cards: "Teams → Microsoft" · "No Microsoft account → manual" · "Agent ID at creation" · "Never open on internal data". Hold ≥3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 5, 9, 13 with pauseSentence 6, 7, 6 (0-based) and the questions/options above (right/trap 0-based).
