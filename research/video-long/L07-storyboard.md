# L07 storyboard: world style (spec for the composition)

Narration `research/video-long/L07-script.json` (11 scenes, ~4.8 min before the exam silences, ~5.0 min with them), timings `video/L07/beats.json` (regenerate: the old L07 narration does not match). **Intermediate lesson, module 1 close (skill 1.1g):** calm pace, one image per idea. Build on the world library `tools/video/world/` (closest siblings: `video/L03/composition.html`, `video/L01/composition.html`; exam helper `EXAMX` as in `video/L06/composition.html`). Sentences per scene (0-based cues s0…): 0:7 1:6 2:6 3:5 4:11 5:7 6:11 7:7 8:11 9:7 10:8 (check against `beats.json`; if the narrator splits differently, follow `beats.json` and keep each visual on its words).

## Global rules for this lesson (L03 rules, all mandatory)
- **Lint first:** `node tools/video/lint-layout.mjs L07 --png` must show **no BLOQUEANTE** before any full render (BORDE-CORTADO, SOLAPE, VACIO, DOBLE-EXPOSICION). Review frames after the LAST edit.
- **Margins:** every subject, label, panel and chip >= 120 px from every frame edge at 1080p, bottom edge included, in every shot (pans and zooms too).
- **Text size: ALL text >= 32 px at 1080p**, no exceptions (labels, sub-labels, UI rows, code lines, reveal text, proof chips). If it does not fit, cut words or zoom; never shrink.
- **Full frames from the first second:** every shot fills width and height; no empty band > 20 %; characters large (Valeria, Marta, Nexo, the visitor >= 300 px tall in close shots). No empty placeholder boxes: content lights **on the word that names it**.
- **Names on screen, exact:** when the voice names a setting, button, channel or idea, its label (exact words of this storyboard) is on screen in its own slot. Setting names always with exact capitals: "Authenticate with Microsoft", "No authentication", "Require secured access", "Share", "Web channel security".
- **Reserved slots, no covering;** moving objects (the token ticket, the visitor) follow a free path.
- **No ghosts, no double exposures:** in any swap on the same spot (secret in page → token in page), the old element reaches opacity 0 **before** the new one starts (sequential, ≤ 0.25 s each).
- **State matches the story;** dimmed items #5b6578 on #e7eaf1. **UI windows** ~80 % of the frame, rows sized to content. **Dialogs and panels opaque** from their first frame.
- **Transitions:** no empty or grey frame > 0.5 s. Something happens on every sentence; the close moves until the 3 s tail.
- **Pills:** at most 2 on screen, reserved slots (top-left / bottom-centre); none longer than ~15 s.
- **Exam rooms:** question card **and** all three options enter **together** at s0 ("Your turn."), dim, full-width rows (~75 % width, ring at right); each option brightens on its own sentence (s4, s5, s6). On-screen options drop the spoken "Or" and the "?". After "Decide before I answer." the fixer inserts **3.5 s of silence**; the 3-2-1 ring starts when that sentence ENDS; nothing moves in the silence. **Reveal exactly at `S(i, 8)`**. Trap red, struck, "Trap" pill; right green with check; other at 50 %. Rows shrink with an eased tween **>= 0.8 s**; explanation (right) and proof panels (below) enter **after** the rows finish; proof panels sized to their content and filled.
- **Colour code (whole lesson, fixed, reused in exams and close):** **Staff door / Authenticate with Microsoft = purple #8a5cd6** with a badge reader; **Share = a purple guest list** clipboard with names; **Public desk / No authentication = open amber #d98a00 counter**; **Own website / Require secured access = teal #0f7b8a kiosk** with a lock; **Secret = a gold key #b8860b** (only ever inside the server safe, except in the "mistake" shots); **Token = a blue ticket #2f5bd3 with "1 conversation"**; Contoso server = navy #1f2a44 back room with a safe. Correct = green #1e7f4f only; trap = red #c4392f only. Nexo = blue robot; Valeria = L01/L03 developer (purple top); Marta = L03 Contoso sales (coral #e07a5f top, laptop); **Visitor = new character, public customer (teal-grey coat, phone)**. No SFX. No brand logos anywhere.
- **Continuity:** Valeria's lab desk from L01, Marta from L03. **No repeats:** no print shop, no newsstand street, no theatre, no river of bridges, no business park, no service city, no library wing.

## World layout (3840x2160) — "The Contoso building: staff door, public desk, back room"
- **Staff entrance** (left, x 200-1200): a purple door with a badge reader and sign "Staff door"; inside, an office corridor where Marta sits at her laptop; a guest-list clipboard "Share" hangs beside the door.
- **Public lobby** (centre, x 1300-2400): an open amber counter "Public desk" where Nexo greets anyone; a glass front door to the street.
- **Website kiosk** (right, x 2500-3640): a teal screen kiosk "Contoso website" on the street side, with the visitor in front of it; a small "page code" panel can slide out of its side.
- **Back room** (top-right, behind the kiosk, x 2700-3640, y 200-900): navy "Contoso server" room with a safe holding the gold key "Secret"; a ticket slot that prints blue "Token" tickets down a free path to the kiosk.
- **Valeria's desk** (bottom-left, from L01): Valeria with laptop, Nexo beside her.
- Maker laptop for UI mode (scene 9): generic grey-blue window "Copilot Studio · Nexo", no logos.

## 0 One agent, two doors (s0-6) — world (building front, filled from frame 1)
s0 frame opens full: the Contoso building with Nexo at the centre; title "Module 1" (top-left). s1 the staff side lights purple, sign "Intranet · employees". s2 the kiosk lights teal, sign "Public website · customers". s3 cut to Valeria at her desk, typing fast: chip "connect the website". s4 a gold key "Secret" is dragged from her laptop into the kiosk's slid-out "page code" panel (code lines, >= 32 px, the key visible inside them). s5 the visitor at the kiosk taps "View source"; the gold key slides into the visitor's pocket: chip "copied" (red outline). s6 kinetic title "Internal and external audiences" (104 px), then shrinks to a pill top-left.

## 1 The staff door and the public desk (s0-5) — world (building, wide)
s0 camera pulls back to the whole building: label "the Contoso office". s1 Marta walks to the purple "Staff door", taps her badge; the reader turns green: chip "asks for a badge". s2 the visitor walks into the amber "Public desk" and Nexo waves: chip "open to everyone". s3 both doors glow side by side: tag "same building, two doors" (bottom-centre). s4 Nexo steps to the middle between the doors: label "your agent". s5 a sign drops over Nexo: "Who uses it → how you protect it".

## 2 Employees: Authenticate with Microsoft (s0-5) — world (staff door close-up)
s0 close shot on the "Staff door"; a purple sign lights "Authenticate with Microsoft". s1 the badge reader glows: label "= the badge". s2 Marta taps her badge: chip "always signs in". s3 the "Share" guest list opens beside the door; rows "Sales team ✓" · "HR team ✓" light: label "Share: who in the organization can chat". s4 Marta's name ticks on the "Sales team" row and the door opens; she sits at her laptop and Nexo answers (bubble). s5 two channel tiles appear above the door, "Teams" · "Microsoft 365", each with a purple "only this option" lock badge: chip "Teams + Microsoft 365: only this option".

## 3 Anonymous public: No authentication (s0-4) — world (public desk close-up)
s0 close shot on the amber "Public desk"; sign lights "No authentication". s1 label "= the open desk"; the glass door swings open. s2 three different visitors walk up with a link card, none shows a badge: chip "anyone with the link · nobody signs in". s3 a caution sign "with care" (amber outline) stands on the counter. s4 the counter shows only a "Returns policy" leaflet (public, green tick) while a locked drawer "internal data" stays shut with a slate padlock: chip "only without internal data".

## 4 EXAM: only the HR team (pause s7, reveal s8) — exam room
- Q (visible from s0): "Nexo now answers questions about salaries and leave. Compliance says only members of the HR security group may chat, controlled with the Share option. Which setting makes this possible?"
- A "Authenticate with Microsoft and Share" (right) · B "No authentication with a private link" (trap) · C "Require secured access with one secret".
- Why: "Users **always sign in**, and **Share** decides **who in the organization** can chat. A **private link** protects **nothing**."
- Proof (after the rows shrink, filled): left panel "Authenticate with Microsoft": the purple staff door with the "Share" list showing only "HR team ✓" (green), a sales badge bounced; right panel "Private link": the amber desk with the link card passed hand to hand to three visitors, chip "anyone with the link".

## 5 Own website: Require secured access (s0-6) — world (website kiosk)
s0 close shot on the teal kiosk "Contoso website". s1 a chip "by default: anyone with the agent ID" while two tiles light "Demo website" · "Custom website" with an open padlock (amber outline). s2 a teal switch "Require secured access" flips On and a lock closes on the kiosk. s3 the kiosk slot shows two accepted items, each in its own slot: gold key "Secret" · blue ticket "Token (from the secret)": label "the client must authenticate". s4 label "Careful" (top-left pill). s5 the lock glows around the channel, while the visitor still chats with no badge: chip "protects the web channel, not each customer". s6 a clock chip "up to two hours to apply".

## 6 EXAM: will customers sign in? (pause s7, reveal s8) — exam room
- Q (visible from s0): "Contoso turns on Require secured access for its public website. Marketing worries that every customer must now create an account. What is true?"
- A "Every customer must sign in with Microsoft" (trap) · B "It only applies to users outside the network" · C "The page client needs a secret or a token" (right).
- Why: "**Require secured access** protects the **web channel**. Customers still chat **without signing in**."
- Proof (after the rows shrink, filled): left panel "The page client": kiosk lock opened by a blue "Token" ticket (green); right panel "The customer": the visitor chatting on the phone, no badge, no account form, chip "no sign-in".

## 7 The secret never goes to the browser (s0-6) — world (kiosk + back room)
s0 back to the scene-0 mistake: page code panel with the gold key inside; pill "Valeria's mistake" (top-left). s1 a magnifier sweeps the page code; chip "browser code: anyone can read it". s2 the gold key fades out of the page (to 0) and a red strike shows the empty spot is fixed: label "never in the browser". s3 camera rises to the navy "Contoso server" back room; the gold key goes into the safe: label "the safe in the back room". s4 the visitor opens the page; the server takes the key, the slot prints a blue "Token" ticket that travels down the free path to the kiosk. s5 the ticket shows "1 conversation" and a small timer that fades if not renewed: chip "expires if not refreshed". s6 page code panel now shows only the blue "Token" (sequential swap after the key is gone): tag "the page only gets the token" (bottom-centre).

## 8 EXAM: the secret in the page (pause s7, reveal s8) — exam room
- Q (visible from s0): "The secret sits in the website's JavaScript, and any visitor can copy it. Valeria must fix this and keep the agent protected. What should she do?"
- A "Move the secret into an HTML comment" (trap) · B "Have the server send the page a token" (right) · C "Turn off Require secured access entirely".
- Why: "The **secret** stays **on the server**. An **HTML comment** is **still readable**, and turning security **off** opens the channel."
- Proof (after the rows shrink, filled): left panel "Server sends a token": back-room safe with the gold key, blue ticket arriving at the kiosk (green); right panel "HTML comment": page code with `<!-- secret -->` and the gold key visible under a magnifier, chip "still readable".

## 9 Secure the web channel in the studio (s0-6) — UI (maker laptop), window ~80 % of frame
s0 camera enters Valeria's laptop; window "Copilot Studio · Nexo" arrives with its content (Overview tab, left nav). s1 cursor to "Settings", then "Security" (nav rows light on their words). s2 tile "Web channel security" opens an opaque panel; toggle "Require secured access" turns On (teal). s3 two masked rows "Secret 1 ••••••" · "Secret 2 ••••••", each with a "Copy" button; an arrow carries a copy to a navy "Contoso server" box (right side, inside the margins): chip "only on your server". s4 the server box shows a short code card (>= 32 px): "secret → request token". s5 a blue "Token" ticket flows from the server box to a "Web page" box; the page box shows "token only" (green), no key. s6 a test chat on the "Web page" box: "How do returns work?" → Nexo's answer (green tick); window shrinks back into the laptop at scene end. All UI text >= 32 px.

## 10 Two doors, one agent (s0-7) — world, close shot, motion on every sentence
s0 close shot of the building front (staff door with Marta left, kiosk with the visitor right, Nexo centre), title "Back at Contoso" (top-left); recap board slot top-right reserved. s1 Marta taps her badge and sits; the visitor chats with a blue token ticket in the kiosk, the gold key safe in the back room (green). s2 recap board appears, header "Remember". s3 line 1 lights: "Employees: Authenticate with Microsoft + Share". s4 line 2: "Public: No authentication, no internal data". s5 line 3: "Own website: Require secured access, token from the server". s6 a "Module 1 ✓" stamp on the board. s7 the camera slides toward a door sign "Module 2: Variables and scope": tag "next: variables and scope" (bottom-centre). Motion continues (visitor chatting, ticket timer) until the 3 s tail (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 4, 6 and 8 with pauseSentence 7, 7, 7 (0-based). Right 0, 2, 1 (A, C, B); trap 1, 0, 0. Questions and options exactly as above.

## Fact notes (checked)
- Authenticate with Microsoft: user always signs in, Share controls who chats; Teams + Microsoft 365 channels support only this option (`research/audit-2026-10-09/D-facts.md` #12, CS `configuration-end-user-authentication`).
- Require secured access: default anyone with the agent ID can use Demo/Custom website; up to two hours to take effect; token valid for one conversation (D-facts #13, CS `configure-web-security`). It does not force end-user sign-in (theory L07).
- Doubt to watch: "expires if it isn't refreshed" follows the theory; Learn also says an **expired** token can't be refreshed (refresh only before expiry). The script does not claim otherwise.
