# L26 storyboard: world style (spec for the composition)

Narration `research/video-long/L26-script.json`, timings `video/L26/beats.json` (12 scenes, about 6.3 min at 150 wpm; real length from beats). Build on the world library `tools/video/world/` (example: `video/L41/composition.html`). The section "Global rules for this lesson" referenced by `research/video-long/L25-storyboard.md` (that is, the section in `research/video-long/L22-storyboard.md`, same as `L21-storyboard.md` / `L05-storyboard.md`) applies here too, unchanged. Sentences per scene: 0:6 1:6 2:7 3:11 4:5 5:6 6:11 7:6 8:5 9:11 10:9 11:8.

Characters: Valeria (developer, laptop, a clipboard "job sheet"), Nexo (blue robot agent, wears a temp worker's lanyard badge, sits at a desk with monitor, mouse and keyboard), Marta (the user, in accounts, holding an invoice folder with blank lines, no digits), the service manager (clipboard, scenes 3, 8 and 9, worried then nodding), another team (two small figures at an old desktop, scene 6 only), the reviewer (a figure behind a glass window, scene 7 only).

## Colour code
- **Blue** = the screen-only systems (the supplier invoice portal on the monitor, the old Windows desktop application).
- **Orange** = the Computer use tool being set up (the job sheet, its fields, the instructions card, the credentials key cabinet).
- **Purple** = Copilot Studio side (the "Tools" shelf, "Computer use" tool button, "Generative orchestration" switch).
- **Green** = right answer / correct path / production-ready desk.
- **Red** = trap / risky / blocked.
- **Grey** = the comparison with RPA (the player piano) and the cost meter.

## World layout (3840x2160)
New world: **The Contoso temp office: three desks, a key cabinet and the supervisor's window**.
- **Reception** (far left): a front desk where Nexo receives a lanyard badge "Assistant" and Valeria's job sheet. A purple wall panel "Copilot Studio" beside it with a switch "Generative orchestration" and a shelf "Tools" holding a button "Computer use".
- **The job sheet** (left-centre, orange, the hero object): a large clipboard with five fields in order: "Name", "Description", "Model" (chip "OpenAI CUA"), "Instructions" (a card with a full address bar and a numbered-by-icons list of steps: open, sign in, download invoice, save total; no digits), "Machine".
- **Three desks** (centre, in a row): desk one "Hosted browser" with a "Preview" tent card and a sign "for experimenting" (no badge reader, no own apps); desk two "Cloud PC pool" with a "Preview" tent card and two badges on the chair "Entra" and "Intune"; desk three "Your own machine" with a plaque "Power Automate for desktop" and a stamp slot "registered". Each desk has a monitor, mouse and keyboard; Nexo can sit at any of them. The monitor shows the blue supplier portal (generic boxes, no logos).
- **The player piano** (centre-right, grey, behind a low partition): a self-playing piano labelled "RPA: Power Automate desktop flows" with a fixed paper roll, facing a frozen screen "stable screen". Next to it a shifting screen whose boxes move, for Computer use.
- **Key cabinet** (right, orange): a wall cabinet with two drawers "Internal storage" and "Azure Key Vault"; a key hook "Maker's credentials" (with a red warning tag "risky if shared") and a hook "End user's credentials".
- **Supervisor's window** (top right): a glass window with the reviewer behind it; an envelope icon labelled "Outlook" flies to it. A turnstile in front of the portal labelled "Access control" that lets a page open but stops an action button.
- **The meter** (bottom right, grey): a taxi-style meter on the wall labelled "Copilot Credits per step", with two dials "Standard: 5" and "Premium: 15" (the only digits allowed, in labels only) and a crossed card "Microsoft 365 Copilot license: not included".
- **Accounts corner** (far right): Marta's desk with her invoice folder.
- Valeria's laptop (UI mode, scene 10).

## 0 An assistant at the desk (s0-5)
Wide of the whole office. s0 title "Monday at Contoso". s1 Marta at her desk, bubble "This month's invoice" (no digits), the supplier portal glows blue. s2 the portal shows a closed back door "API" struck in red and label "only a screen". s3 Valeria enters with laptop and job sheet; label "Computer use" (purple). s4 metaphor: Nexo receives a lanyard "Assistant" and sits at a desk; three quick icons light: eye ("looks"), mouse ("moves the mouse"), keyboard ("types"). s5 two monitor icons "Websites" and "Windows desktop apps", label "only a screen".

## 1 The job sheet (s0-5)
Camera to reception and the Copilot Studio panel. s0 chip "what it needs". s1 labels "vision and reasoning" (eye + gear on Nexo) and the switch "Generative orchestration" flips on (purple, label "required"). s2 "Tools" lights, then the "Computer use" button is added to the shelf. s3 the job sheet fills field by field: "Name", "Description", "Model" with chip "OpenAI CUA", "Instructions", "Machine". s4 the "Instructions" card zooms: a full address bar and label "full URLs and explicit steps". s5 the four step icons appear in order: open the address, sign in, download invoice, save total (no digits).

## 2 Three desks (s0-6)
Camera pans along the three desks. s0 chip "where Nexo sits". s1 three desks appear with name plates. s2 desk "Hosted browser": tent "Preview", sign "for experimenting", two struck chips "Entra join" and "own desktop apps" (red). s3 desk "Cloud PC pool": tent "Preview", badges "Entra" and "Intune" on the chair. s4 desk "Your own machine": plaque "Power Automate for desktop". s5 desks one and two get a shared tag "Microsoft hosted: prototyping only". s6 desk three gets a green stamp "registered in Power Automate", label "production".

## 3 EXAM: the production desk (pause s7, reveal s8)
- Q: "The invoice job worked on the Hosted browser. Now it must run for real every month. Where should Nexo run in production?"
- A "On the Hosted browser that already worked" (trap) · B "On a Cloud PC pool joined to Entra and Intune" · C "On their own machine in Power Automate" (right).
- Proof panel: the three desks; desk three lit green with stamp "registered in Power Automate" and label "production"; desks one and two keep their "Preview" tents with tag "prototyping only"; the Hosted browser desk gets a red X ("only for experimenting").

## 4 Computer use or RPA? (s0-4)
Camera to the partition with the player piano. s0 chip "check RPA first", label "RPA = Power Automate desktop flows". s1 the player piano plays a fixed paper roll against the frozen screen (grey), label "repeats fixed steps". s2 label "stable screen, simple rules: RPA". s3 the shifting screen: its boxes move; Nexo looks, decides, and corrects a click; three chips "screens change", "decisions from what is shown", "corrects itself" (label "Computer use"). s4 back to the supplier portal, its boxes rearrange; label "Contoso keeps Computer use" (green).

## 5 Whose keys? (s0-5)
Camera to the key cabinet. s0 chip "the keys to the portal". s1 Nexo at the portal sign-in box, question chip "whose credentials?". s2 hook "Maker's credentials" with label "the maker = the person who built the agent" and red tag "risky if the agent is shared". s3 metaphor: one house key copied for a queue of visitors (red). s4 drawers "Internal storage" and "Azure Key Vault" open (label "stored credentials"), and the hook "End user's credentials" lights green. s5 the portal key goes into "Azure Key Vault", tag "Contoso" (orange).

## 6 EXAM: the stable screen (pause s7, reveal s8)
- Q: "Another team copies data into an old desktop application every day. The screen never changes and the rules are simple. Which option fits best?"
- A "A Power Automate desktop flow" (right) · B "Computer use on a Cloud PC pool" · C "Computer use on their own machine" (trap).
- Proof panel: the player piano at the frozen screen lit green, label "stable screen, simple rules: RPA"; the shifting-screen Computer use badge with a red X ("for screens that change").

## 7 The supervisor's window (s0-5)
Camera up to the glass window. s0 chip "supervision". s1 a warning icon on an instruction card; an envelope "Outlook" flies to the reviewer (label "Human supervision: email to a reviewer"). s2 metaphor: the reviewer reads the note behind the glass before the risky card moves on. s3 switch "Human supervision" turns on, tag "Contoso". s4 the turnstile "Access control" appears, label "blocks actions, not the opening of sites". s5 Nexo walks through and the portal page opens (green), but an action button is stopped at the turnstile (red).

## 8 The meter (s0-4)
Camera to the meter. s0 chip "the bill". s1 metaphor: the taxi meter ticks once per Nexo click (label "price per step"). s2 dials "Standard: 5 Copilot Credits" and "Premium: 15 Copilot Credits" light in turn. s3 card "Microsoft 365 Copilot license" with red stamp "not included". s4 Valeria writes the invoice job budget on her clipboard (icons, no extra digits), the service manager nods; label "5 credits per step".

## 9 EXAM: the budget (pause s7, reveal s8)
- Q: "Marta's team has Microsoft 365 Copilot licenses and the invoice job uses a standard model. What does each step of Computer use cost?"
- A "Fifteen Copilot Credits per step" · B "Five Copilot Credits per step" (right) · C "Nothing, the license covers it" (trap).
- Proof panel: the meter with dial "Standard: 5" lit green; dial "Premium: 15" dimmed ("premium models"); card "Microsoft 365 Copilot license" with red X ("not included").

## 10 The steps (s0-8)
UI mode on Valeria's laptop, one step per sentence, only steps from the theory: s0 "The steps". s1 "Generative orchestration" on. s2 agent → "Tools" → add "Computer use". s3 "Name" and "Description" fields. s4 "Model" picker showing "OpenAI CUA". s5 "Instructions" box with a full URL and explicit steps. s6 machine choice with exactly: "Hosted browser", "Cloud PC pool", "Your own machine". s7 credentials choice: "Stored credentials" or "End user's credentials". s8 "Human supervision" toggle on, and "Access control" highlighted for review. Do not show any setting, field, wizard page, model or limit not in the theory.

## 11 The assistant at work (s0-7)
Callback to scene 0, wide office, warm light. s0 "Back to Contoso". s1 Nexo at desk three opens the portal, the key comes from "Azure Key Vault", the invoice drops into Marta's folder, a "total" chip is saved (icons, no digits). s2 recap row title "For the exam". s3 "5 Copilot Credits per step, 15 premium, not in the Copilot license". s4 "Trap: Hosted browser for production". s5 "Access control blocks actions, not opening sites". s6 "Stable screen, simple rules: RPA · changing screens: Computer use". s7 chip "Next: MCP tool servers". Hold ≥3 s (`<!-- TAIL 2.5 -->`).

## quiz.json
Scenes 3, 6, 9 with pauseSentence 7 (0-based) and the questions/options above (right 2, 0, 1; trap 0, 2, 2; 0-based). Spoken options say "Cloud P C pool"; on screen write "Cloud PC pool".

## Fact notes
All facts from the L26 theory, steps, example, exam tips and glossary (FACTS.md lines 62-65, 93-94 and 107 say the same):
- Computer use lets the agent work with a screen like a person: it looks, moves the mouse, and types; like hiring an assistant who sits at the computer when the system has no API; for websites or Windows desktop applications that only have a screen. It uses vision and reasoning and requires generative orchestration.
- Setup: name, description, model (example OpenAI CUA), instructions with full URLs and explicit steps, and the machine. Steps: Tools, add the Computer use tool.
- Where it runs: Hosted browser (preview, for experimenting, no Entra join, no own desktop apps); Cloud PC pool (preview, joined to Entra and Intune); bring-your-own machine with Power Automate for desktop. Microsoft-hosted options are in preview, prototyping only; production needs a bring-your-own machine registered in Power Automate. Trap: Hosted browser for production.
- RPA (Power Automate desktop flows) when the screen is stable and the rules are simple; Computer use when screens change often, decisions depend on what is on screen, or the automation must self-correct.
- Maker's credentials (maker = the person who built the agent) are risky if the agent is shared; better stored credentials (internal storage or Azure Key Vault) or the end user's credentials.
- Human supervision sends an Outlook email to a reviewer when it detects potentially harmful instructions. Access control blocks actions, not the opening of sites.
- Cost: 5 Copilot Credits per step with standard models, 15 with premium; not included in the Microsoft 365 Copilot license (USL).
- Contoso example: supplier invoice portal with no API; instructions open the full URL, sign in, download this month's invoice, save the total; stored credentials in Azure Key Vault; Human supervision on; 5 credits per step; production on their own machine registered in Power Automate.
- Story details only, no product facts: Marta in accounts, "the portal changes its layout often", "another team" with an old desktop application, the temp office, player piano, house key, supervisor's window and taxi meter metaphors, the service manager's budget. "Nexo can still open a page, but a blocked action stays blocked" restates "blocks actions, not the opening of sites". No other models, version numbers, limits or prices are shown. No brand logos: the portal, desks, cabinet and meter are generic drawings.
