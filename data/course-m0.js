// AB-620 course, Module 0 (Fundamentals), English. Built by tools/en/assemble.mjs. Schema: COURSE-SCHEMA.md.
window.AB620_MODULES = [{"n":0,"title":"Fundamentals"},{"n":1,"title":"Plan the solution"},{"n":2,"title":"Advanced topics"},{"n":3,"title":"Agent flows"},{"n":4,"title":"Knowledge and tools"},{"n":5,"title":"MCP and multi-agent"},{"n":6,"title":"Azure and monitoring"},{"n":7,"title":"Evaluation and ALM"}];
window.AB620_COURSE = window.AB620_COURSE || [];
window.AB620_COURSE.push(
{
 "id": "F01",
 "module": 0,
 "title": "What Copilot Studio is and what it is for",
 "level": "basic",
 "minutes": 8,
 "skills": [],
 "theory": {
  "intro": "Copilot Studio is the Microsoft tool where you build AI assistants, called agents, with very little code. Think of an assembly workshop: you choose the parts (instructions, knowledge, tools), and the workshop puts them together and publishes them where your users already work.",
  "sections": [
   {
    "heading": "What you can build",
    "body": "Copilot Studio is a graphical low-code studio for creating and managing agents and workflows. Everything lives in one place, so you do not jump between tools.\n\nThere are three main pieces. An agent is an AI assistant that chats and completes tasks: it follows the instructions you give it, uses the knowledge you connect, and calls tools to take action. A workflow is an automation you build with a drag-and-drop designer. An agent flow is the classic Copilot Studio flow format, similar to Power Automate: it can run on its own or hang from an agent as a tool.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"8\" y=\"14\" width=\"104\" height=\"50\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"60\" y=\"35.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Agent</text><text x=\"60\" y=\"51.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">chats</text><rect x=\"128\" y=\"14\" width=\"104\" height=\"50\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"35.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Workflow</text><text x=\"180\" y=\"51.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">automates</text><rect x=\"248\" y=\"14\" width=\"104\" height=\"50\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"300\" y=\"35.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Agent flow</text><text x=\"300\" y=\"51.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">native flow</text><line x1=\"60\" y1=\"64\" x2=\"60\" y2=\"96\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"180\" y1=\"64\" x2=\"180\" y2=\"96\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"300\" y1=\"64\" x2=\"300\" y2=\"96\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"8\" y=\"96\" width=\"344\" height=\"30\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><text x=\"180\" y=\"115.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Harness: the engine that runs it</text><rect x=\"6\" y=\"150\" width=\"108\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"60\" y=\"174.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Standard</text><rect x=\"126\" y=\"150\" width=\"108\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"174.5\" text-anchor=\"middle\" font-size=\"12\" fill=\"currentColor\">Microsoft Copilot</text><rect x=\"246\" y=\"150\" width=\"108\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"300\" y=\"174.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Copilot chat</text><line x1=\"60\" y1=\"126\" x2=\"60\" y2=\"150\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"180\" y1=\"126\" x2=\"180\" y2=\"150\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"300\" y1=\"126\" x2=\"300\" y2=\"150\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/></svg>"
   },
   {
    "heading": "The harness: the engine underneath",
    "body": "Everything you build runs on a harness, the engine that does the work behind the scenes. Your choice changes how the agent reasons, how complex its work can be, and how it is billed.\n\nThere are three. The standard harness is for rule-based agents and structured, repeatable conversations. The Microsoft Copilot harness (formerly GitHub Copilot harness) is for multi-step work that needs reasoning. The Copilot chat harness extends Microsoft Copilot Chat with your organization's knowledge. This course focuses on standard harness agents."
   },
   {
    "heading": "How a standard agent responds",
    "body": "In the standard harness, the agent understands what the user asked and looks for the best topic: a part of the conversation that you design with steps, questions, and conditions. If the request falls outside your topics, the agent can still generate an answer from the knowledge you connected.\n\nThat is why a new agent can be useful from the first minute: just connect a website or a SharePoint site and it already answers questions.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"6\" y=\"80\" width=\"66\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"39\" y=\"104.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">User</text><line x1=\"72\" y1=\"100\" x2=\"92\" y2=\"100\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"92\" y=\"80\" width=\"66\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"125\" y=\"104.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Channel</text><line x1=\"158\" y1=\"100\" x2=\"178\" y2=\"100\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"178\" y=\"70\" width=\"84\" height=\"60\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"220\" y=\"104.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Agent</text><rect x=\"284\" y=\"30\" width=\"72\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"320\" y=\"54.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Knowledge</text><rect x=\"284\" y=\"130\" width=\"72\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"320\" y=\"154.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Tools</text><line x1=\"262\" y1=\"90\" x2=\"284\" y2=\"52\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"262\" y1=\"112\" x2=\"284\" y2=\"148\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><text x=\"180\" y=\"190\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--muted)\">Teams, web, mobile...</text></svg>"
   },
   {
    "heading": "Where users live and how you operate",
    "body": "You publish the agent to the channels where people already work: Microsoft Teams, Microsoft Copilot, websites, mobile apps, and more. Once it is in production, Copilot Studio helps you operate it with three areas: Analytics (performance and sessions), Evaluations (test sets that measure quality), and Administration (inventory, security, and costs).\n\nYou use Copilot Studio in the browser, as a web app. There is nothing to install."
   }
  ],
  "steps": [
   "Open the Copilot Studio web app in your browser and sign in with your work or school account.",
   "Look at the Home page: your agents appear there, along with the box to describe a new agent.",
   "Select Create and describe in natural language what your agent should do.",
   "Check the top bar to see which environment you are working in.",
   "Open the agent you created and walk through its sections: Overview, Knowledge, Tools, Topics, and Settings.",
   "Type a question in the Test your agent panel to see its first behavior."
  ],
  "example": "Contoso has an IT team of four people who answer the same questions all day: VPN, passwords, printers. They create an agent called Nexo in Copilot Studio. They write some instructions, connect the SharePoint site with the IT guides as Knowledge, and add a tool to open tickets. They publish it in Teams. Now an employee types \"my VPN won't connect\" and Nexo replies with the steps from the guide. If that does not fix it, Nexo opens the ticket for them. The IT team stops answering repetitive questions and focuses on the hard cases.",
  "examTips": [
   "The exam assumes you already know what an agent is. What it measures is planning, integrating, and managing solutions. This topic is your base map.",
   "The agents in this course run on the standard harness. Do not confuse them with the Microsoft Copilot harness, which is billed differently."
  ],
  "glossary": [
   {
    "term": "Agent",
    "def": "An AI assistant that chats and completes tasks using instructions, knowledge, and tools."
   },
   {
    "term": "Agent flow",
    "def": "A flow built inside Copilot Studio, similar to Power Automate. It runs on its own or as a tool of an agent."
   },
   {
    "term": "Harness",
    "def": "The engine that does the work of an agent or workflow. It affects reasoning, capabilities, and billing."
   },
   {
    "term": "Channel",
    "def": "The place where the user talks to the agent, such as Teams, a website, or a mobile app."
   }
  ]
 },
 "scenes": [
  {
   "title": "Same questions all day",
   "caption": "Contoso's IT team answers the same questions all day: VPN, passwords, printers. Copilot Studio builds an assistant that answers for them.",
   "say": "Monday at Contoso. The I T team has four people, and they answer the same questions all day. My V P N will not connect. I forgot my password. The printer is offline again. Every answer is already written in their guides, but someone still has to type it. What if an assistant answered those questions for them, right inside Teams? Today you meet the tool that builds it: Copilot Studio."
  },
  {
   "title": "An assembly workshop",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The workshop</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">How the agent behaves</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">What it answers from</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tools</span><span style=\"text-align:right\">How it takes action</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Web app, nothing to install</span></div></div>",
   "caption": "Copilot Studio is a low-code workshop: you choose the parts (instructions, knowledge, tools) and it assembles and publishes the agent.",
   "say": "Copilot Studio is the Microsoft tool where you build A I assistants, called agents, with very little code. Picture an assembly workshop. You choose the parts: instructions that say how to behave, knowledge to answer from, and tools to take action. The workshop puts them together and publishes the result where your users already work. It is a web app in your browser, so there is nothing to install."
  },
  {
   "title": "Three things you build",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three things you build</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent</span><span style=\"text-align:right\">Chats and completes tasks</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Workflow</span><span style=\"text-align:right\">Drag-and-drop automation</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent flow</span><span style=\"text-align:right\">Classic flow, alone or as a tool</span></div></div>",
   "caption": "Agent: chats and completes tasks. Workflow: automation from a drag-and-drop designer. Agent flow: classic flow, alone or as an agent's tool.",
   "say": "In this one studio you build three things. An agent is an A I assistant that chats and completes tasks. It follows your instructions, uses the knowledge you connect, and calls tools. A workflow is an automation you build with a drag and drop designer. An agent flow is the classic Copilot Studio flow, similar to Power Automate. It runs on its own, or hangs from an agent as a tool."
  },
  {
   "title": "Decide: which piece?",
   "caption": "Contoso wants an assistant that chats, answers from the IT guides and opens tickets. Workflow, agent, or agent flow?",
   "say": "Your turn. Contoso wants an assistant that chats with employees, answers from the I T guides, and opens a ticket when the steps fail. Which piece do they build? A workflow from the drag and drop designer? An agent that chats and completes tasks? Or a classic agent flow that runs on its own? Decide before I answer. An agent. It chats, uses knowledge, and calls a tool. A flow can be one of its tools."
  },
  {
   "title": "Your first agent",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Your first agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Home</span><span style=\"text-align:right\">Describe the agent, then Create</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Top bar</span><span style=\"text-align:right\">Which environment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Sections</span><span style=\"text-align:right\">Overview · Knowledge · Tools · Topics · Settings</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Try it</span><span style=\"text-align:right\">Test your agent</span></div></div>",
   "caption": "Sign in, describe the agent on Home and select Create. Check the environment, walk the sections, then try Test your agent.",
   "say": "Let us open the studio. You sign in with your work or school account. The Home page shows your agents and a box to describe a new one. Select Create and describe, in plain language, what the agent should do. Check the top bar to see which environment you are in. Then walk through the sections: Overview, Knowledge, Tools, Topics, and Settings. Finally, ask something in the Test your agent panel."
  },
  {
   "title": "The engine underneath",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The harness (engine)</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Standard</span><span style=\"text-align:right\">Rules, structured, repeatable</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft Copilot</span><span style=\"text-align:right\">Multi-step reasoning (formerly GitHub Copilot harness)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot chat</span><span style=\"text-align:right\">Extends Microsoft Copilot Chat</span></div></div>",
   "caption": "A harness is the engine. Standard: structured, repeatable. Microsoft Copilot: multi-step reasoning. Copilot chat: extends Copilot Chat.",
   "say": "Everything you build runs on a harness, the engine that does the work behind the scenes. It changes how the agent reasons, how complex its work can be, and how it is billed. The standard harness is for rules and structured, repeatable conversations. The Microsoft Copilot harness, formerly the GitHub Copilot harness, is for multi step work that needs reasoning. The Copilot chat harness extends Microsoft Copilot Chat with your organization's knowledge."
  },
  {
   "title": "How a standard agent answers",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Standard agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">First</span><span style=\"text-align:right\">Best matching topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topic</span><span style=\"text-align:right\">Steps, questions, conditions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Outside topics</span><span style=\"text-align:right\">Answer from connected knowledge</span></div></div>",
   "caption": "Standard harness: the agent picks the best topic. Outside your topics, it answers from connected knowledge, so it helps from minute one.",
   "say": "This course uses the standard harness. Here, the agent understands what the user asked and looks for the best topic. A topic is a part of the conversation that you design, with steps, questions, and conditions. If the request falls outside your topics, the agent can still generate an answer from the knowledge you connected. That is why a new agent is useful from minute one: connect a SharePoint site, and it already answers."
  },
  {
   "title": "Decide: which harness?",
   "caption": "An HR agent for leave requests: same rules, same questions, same order every time. Which harness fits?",
   "say": "Your turn. Contoso builds an H R agent for leave requests. Every conversation follows the same rules and the same questions, in the same order. Which harness fits? The standard harness, for structured rules? The Microsoft Copilot harness, for reasoning? Or the Copilot chat harness, for Copilot Chat? Decide before I answer. The standard harness. Rules and repeatable conversations are its job. The Microsoft Copilot harness is for multi step reasoning, and it is billed differently."
  },
  {
   "title": "Publish and operate",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Publish and operate</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Channels</span><span style=\"text-align:right\">Teams · Microsoft Copilot · websites · mobile apps</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Analytics</span><span style=\"text-align:right\">Performance and sessions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Evaluations</span><span style=\"text-align:right\">Test sets that measure quality</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Administration</span><span style=\"text-align:right\">Inventory, security, costs</span></div></div>",
   "caption": "Publish to channels: Teams, Microsoft Copilot, websites, mobile apps. Operate with Analytics, Evaluations and Administration.",
   "say": "When the agent is ready, you publish it to the channels where people already work: Microsoft Teams, Microsoft Copilot, websites, mobile apps, and more. Once it is in production, you operate it from the same studio, with three areas. Analytics shows performance and sessions. Evaluations runs test sets that measure quality. Administration covers inventory, security, and costs."
  },
  {
   "title": "Decide: which area?",
   "caption": "Nexo is live in Teams. Before each change, the IT lead wants to measure answer quality with test questions. Which area?",
   "say": "Your turn. Nexo is live in Teams. Before each change, the I T lead wants to measure answer quality with a set of test questions. Which area do they open? Analytics, for performance and sessions? Administration, for inventory and costs? Or Evaluations, for test sets and quality? Decide before I answer. Evaluations. Its test sets measure quality. Analytics shows how real sessions went, and Administration covers inventory, security, and costs."
  },
  {
   "title": "Nexo goes live",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Nexo at Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">SharePoint IT guides</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tool</span><span style=\"text-align:right\">Open a ticket</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Channel</span><span style=\"text-align:right\">Teams</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Result</span><span style=\"text-align:right\">Team keeps the hard cases</span></div></div>",
   "caption": "Nexo: instructions, the IT guides as knowledge, a ticket tool, published in Teams. Repeated questions answered; the team takes the hard cases.",
   "say": "Back to Contoso. The team builds an agent called Nexo. They write a few instructions, connect the SharePoint site with the I T guides as knowledge, add a tool to open tickets, and publish it in Teams. An employee types: my V P N will not connect. Nexo replies with the steps from the guide, and if that fails, it opens the ticket. The team stops answering repeats and focuses on the hard cases."
  }
 ],
 "check": [
  {
   "stem": "What is an agent in Copilot Studio?",
   "options": [
    "A spreadsheet connected to Teams that stores rows of data and formulas",
    "An AI assistant that completes tasks with instructions, knowledge, and tools",
    "A server in Azure where data is stored, backed up, and managed by the admins of the tenant",
    "A type of Microsoft 365 license that includes Teams, SharePoint, and Excel"
   ],
   "answer": 1,
   "explanation": "An agent follows instructions, consults knowledge, and calls tools to complete tasks in conversation."
  },
  {
   "stem": "What is a harness?",
   "options": [
    "A publishing channel where end users open the agent",
    "The engine underneath that runs the work of the agent",
    "A set of test questions for the agent",
    "A type of premium connector"
   ],
   "answer": 1,
   "explanation": "The harness is the engine underneath. It changes how the agent reasons, what it can do, and how it is billed."
  },
  {
   "stem": "How is Copilot Studio mainly used?",
   "options": [
    "Only inside Teams",
    "It is installed as a desktop program on Windows",
    "From the browser, as a web app",
    "Only from the Azure command line"
   ],
   "answer": 2,
   "explanation": "It is a low-code web app that you open from a modern browser."
  },
  {
   "stem": "Which is an example of a channel where you can publish an agent?",
   "options": [
    "Microsoft Teams",
    "An Excel file",
    "A Dataverse table",
    "A data policy"
   ],
   "answer": 0,
   "explanation": "Teams is a channel. The other examples are not places where a user chats with the agent."
  }
 ],
 "reto": {
  "text": "Open Copilot Studio and sign in.\nCreate an agent by describing it in one sentence (for example, IT help).\nType three questions in the Test panel and note what it answered well and what it did not.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio"
},
{
 "id": "F02",
 "module": 0,
 "title": "Anatomy of an agent",
 "level": "basic",
 "minutes": 10,
 "skills": [],
 "theory": {
  "intro": "An agent is built from four pieces: instructions, knowledge, tools, and topics. It is like hiring a new employee: you give them a job description, a folder of documents, access to systems, and a few scripts for delicate cases.",
  "sections": [
   {
    "heading": "The four pieces",
    "body": "Instructions: the text that defines the agent's role, tone, and rules. Knowledge: the sources it gets information from. Tools: what it can do, such as calling a connector, a flow, or an API. Topics: conversations you design step by step for cases you want to control.\n\nIn the new employee analogy, the instructions are the job description and style manual; the knowledge is the folder of documents they read; the tools are the systems you give them access to; and the topics are the scripts you hand them for delicate calls.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"6\" y=\"6\" width=\"348\" height=\"188\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><text x=\"180\" y=\"26\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Nexo agent</text><rect x=\"18\" y=\"40\" width=\"160\" height=\"60\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"98\" y=\"66.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Instructions</text><text x=\"98\" y=\"82.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">how it behaves</text><rect x=\"182\" y=\"40\" width=\"160\" height=\"60\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"262\" y=\"66.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Knowledge</text><text x=\"262\" y=\"82.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">what it knows</text><rect x=\"18\" y=\"112\" width=\"160\" height=\"60\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"98\" y=\"138.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Tools</text><text x=\"98\" y=\"154.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">what it can do</text><rect x=\"182\" y=\"112\" width=\"160\" height=\"60\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"262\" y=\"138.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Topics</text><text x=\"262\" y=\"154.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">fixed scripts</text></svg>"
   },
   {
    "heading": "Instructions: the job description",
    "body": "Instructions are free text in natural language. They say who the agent is, how it talks, and what it should or should not do. You write them on the agent's Overview page, and they guide the model when it decides how to respond.\n\nWrite clear, short instructions: role, tone, scope, and what to do when it does not know. Avoid contradictions, because the model tries to obey all of them. And remember that instructions do not replace the descriptions of tools and topics: those help the agent choose what to use.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><text x=\"180\" y=\"22\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Instructions (example)</text><rect x=\"30\" y=\"34\" width=\"300\" height=\"90\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"180\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">You are Nexo, Contoso IT assistant.</text><text x=\"180\" y=\"83.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Answer briefly.</text><text x=\"180\" y=\"99.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">If unsure, offer to open a ticket.</text><text x=\"180\" y=\"156\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Role + tone + scope + what to do</text><text x=\"180\" y=\"176\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">when it does not know</text></svg>"
   },
   {
    "heading": "Knowledge and tools: knowing and doing",
    "body": "Knowledge is what the agent can look up: websites, files, SharePoint, Dataverse. It is used to answer questions. Tools are what the agent can run: a connector, an agent flow, a prompt, a REST API, an MCP server, or computer use. They are used to take action or bring in live data.\n\nQuick rule: if the answer is written in a document, it is knowledge. If you must query a system or change something, it is a tool."
   },
   {
    "heading": "Topics: scripts made of nodes",
    "body": "A topic is a conversation designed by you. It starts with a trigger and continues with nodes: Message, Question, Condition, Call an action or tool, and others. Inside a topic you control exactly what is said and in what order.\n\nUse topics when you need precision: validating a value, following a fixed process, or returning an exact result. For everything else, let the agent use knowledge and tools with generative orchestration (the next topic).",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"6\" y=\"70\" width=\"78\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"45\" y=\"94.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Trigger</text><line x1=\"84\" y1=\"90\" x2=\"96\" y2=\"90\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"96\" y=\"70\" width=\"78\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"135\" y=\"94.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Question</text><line x1=\"174\" y1=\"90\" x2=\"186\" y2=\"90\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"186\" y=\"70\" width=\"78\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"225\" y=\"94.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Condition</text><line x1=\"264\" y1=\"90\" x2=\"276\" y2=\"90\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"276\" y=\"70\" width=\"78\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"315\" y=\"94.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Message</text><text x=\"180\" y=\"150\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">A topic is a script made of nodes</text></svg>"
   }
  ],
  "steps": [
   "Go to Copilot Studio and open your agent (or create a new one).",
   "On Overview, find the Instructions box and write the role, tone, scope, and what to do when in doubt.",
   "Open Knowledge and add a source, for example a public URL or a file.",
   "Open Tools and select Add a tool to see which connectors and tools you can add.",
   "Open Topics, review the system and custom topics, and open one to see its nodes.",
   "Try it in the Test panel and notice which piece answered: knowledge, a tool, or a topic."
  ],
  "example": "In Nexo, the Contoso IT agent, each piece has its own job. The Instructions say: \"You are Nexo, Contoso IT assistant; answer briefly; if you do not know, offer to open a ticket.\" The Knowledge is the SharePoint site with VPN and password guides. The Tools include an action to create tickets in the help desk system. And there is a topic called Report serious incident, with fixed questions (affected system, urgency), because IT always needs the same data. When an employee asks for help, Nexo decides which piece to use.",
  "examTips": [
   "Tell knowledge (answers with information) apart from tools (run actions or query live systems). It is a typical confusion in scenario questions.",
   "When you need an exact, repeatable flow, the exam expects a topic. When you need flexibility, it expects instructions, knowledge, and tools."
  ],
  "glossary": [
   {
    "term": "Instructions",
    "def": "Natural-language text that defines the agent's role, tone, and rules."
   },
   {
    "term": "Knowledge",
    "def": "Sources the agent looks up to answer with real information from your organization."
   },
   {
    "term": "Tool",
    "def": "A capability the agent can run: connector, flow, prompt, REST API, MCP, or computer use."
   },
   {
    "term": "Topic",
    "def": "A conversation you design: a trigger followed by nodes with messages, questions, and conditions."
   },
   {
    "term": "Trigger",
    "def": "The first node of a topic. It decides when the topic starts."
   }
  ]
 },
 "scenes": [
  {
   "title": "Nexo's second week",
   "caption": "Nexo is live in Teams, but new requests arrive: a ticket status it cannot see, an incident missing data. Each lives in another piece.",
   "say": "Two weeks later at Contoso. Nexo is live in Teams and answers V P N questions from the guides. But new requests arrive. An employee asks for the status of their ticket, and Nexo cannot see it. Another reports a server outage, and Nexo forgets to ask which system is down. Each problem lives in a different piece of the agent. Today we open Nexo and look inside."
  },
  {
   "title": "The new employee",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The new employee</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">Job description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">Folder of documents</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tools</span><span style=\"text-align:right\">Access to systems</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topics</span><span style=\"text-align:right\">Scripts for delicate calls</span></div></div>",
   "caption": "Four pieces, like a new employee: job description (instructions), document folder (knowledge), system access (tools), call scripts (topics).",
   "say": "Every agent is built from four pieces. Think of hiring a new employee. You give them a job description: those are the instructions. A folder of documents to read: that is the knowledge. Access to the company systems: those are the tools. And a few scripts for delicate calls: those are the topics. Keep this picture, because almost any scenario question on the exam asks which piece fits."
  },
  {
   "title": "Instructions: the job description",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Instructions</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Overview page</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">Role, tone, scope, what to do when unsure</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Style</span><span style=\"text-align:right\">Short, clear, no contradictions</span></div></div>",
   "caption": "Instructions: plain-language text on the Overview page. Role, tone, scope, what to do when unsure. Short, clear, no contradictions.",
   "say": "Start with the instructions, the job description. They are free text in plain language, written on the agent's Overview page. They say who the agent is, how it talks, and what it must not do. Nexo's instructions say: you are Nexo, the Contoso I T assistant. Answer briefly. If you do not know, offer to open a ticket. Keep them short and clear, with no contradictions, because the model tries to obey every line."
  },
  {
   "title": "Knowing and doing",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Knowing and doing</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">Websites · files · SharePoint · Dataverse</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tools</span><span style=\"text-align:right\">Connector · agent flow · prompt · REST API · MCP · computer use</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rule</span><span style=\"text-align:right\">Written in a document → knowledge; live system or change → tool</span></div></div>",
   "caption": "Knowledge is looked up: websites, files, SharePoint, Dataverse. Tools are run: connector, agent flow, prompt, REST API, MCP server, computer use.",
   "say": "Next, knowing and doing. Knowledge is what the agent can look up: websites, files, SharePoint, or Dataverse. It answers questions with your organization's real information. Tools are what the agent can run: a connector, an agent flow, a prompt, a REST A P I, an M C P server, or computer use. They take action or bring in live data. Quick rule: if the answer is written in a document, it is knowledge. If you must query a system or change something, it is a tool."
  },
  {
   "title": "Decide: ticket status",
   "caption": "An employee wants the live status of their ticket, kept in the help desk system. Knowledge, a topic, or a tool?",
   "say": "Your turn. An employee asks Nexo for the current status of their ticket. That status lives in the help desk system and changes all day. Which piece do they add? Knowledge, with the help desk guides? A topic, with fixed ticket questions? Or a tool that queries the help desk? Decide before I answer. A tool. The status is live data inside a system, so Nexo must query it. Knowledge only reads what is already written."
  },
  {
   "title": "Topics: scripts made of nodes",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Topics</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Starts with</span><span style=\"text-align:right\">A trigger</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Nodes</span><span style=\"text-align:right\">Message · Question · Condition · Call a tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Use for</span><span style=\"text-align:right\">Precision: exact, repeatable processes</span></div></div>",
   "caption": "A topic is a conversation you design: a trigger, then nodes such as Message, Question, Condition and a tool call. Use it for precision.",
   "say": "Last piece: topics, the scripts for delicate calls. A topic is a conversation you design. It starts with a trigger, the node that decides when it begins. Then come nodes: a message, a question, a condition, a call to a tool. Inside a topic you control exactly what is said and in what order. Use one when you need precision: validating a value, following a fixed process, or returning an exact result. For everything else, let the agent combine knowledge and tools."
  },
  {
   "title": "Decide: serious incidents",
   "caption": "For every serious incident, IT needs the affected system, then the urgency, always in that order. Topic, instruction, or knowledge file?",
   "say": "Your turn. For every serious incident, I T always needs the same data, asked in the same order: the affected system, then the urgency. How should Nexo collect it? A topic with fixed questions in order? An instruction that asks for both details? Or a knowledge file listing the questions? Decide before I answer. A topic. An exact, repeatable process is designed step by step. An instruction only guides the model, so a question can be skipped."
  },
  {
   "title": "Find each piece in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Overview</span><span style=\"text-align:right\">Instructions box</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">Add a source</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tools</span><span style=\"text-align:right\">Add a tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topics</span><span style=\"text-align:right\">System and custom, open to see nodes</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Test</span><span style=\"text-align:right\">Which piece answered?</span></div></div>",
   "caption": "Overview holds the instructions; Knowledge adds sources; Tools has Add a tool; Topics lists system and custom topics. Then test and see which piece answered.",
   "say": "Let us find each piece in Copilot Studio. Open Nexo. On Overview, the Instructions box holds the role, the tone, and the scope. Open Knowledge and add a source, such as a public website or a file. Open Tools and select Add a tool to see the connectors you can add. Open Topics to see the system topics and your own, and open one to read its nodes. Finally, ask something in the test panel and notice which piece answered."
  },
  {
   "title": "Decide: the ignored tool",
   "caption": "Nexo has a ticket tool but rarely chooses it, though the instructions mention tickets. Stricter instructions, a clear tool description, or more knowledge?",
   "say": "Your turn. Nexo has a ticket tool, but it rarely chooses it, even though the instructions talk about tickets. What should the maker improve? Stricter rules in the instructions? A clear description of the tool? Or more ticket guides as knowledge? Decide before I answer. A clear description of the tool. The agent reads the descriptions of tools and topics to choose what to use. Instructions set the role and the tone, but they do not replace a good description."
  },
  {
   "title": "Every piece in its place",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Nexo, fixed</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">Answer briefly</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">SharePoint IT guides</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tool</span><span style=\"text-align:right\">Ticket status from the help desk</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topic</span><span style=\"text-align:right\">Report serious incident</span></div></div>",
   "caption": "Nexo fixed: brief instructions, SharePoint guides as knowledge, a ticket status tool, a serious incident topic. Documents, live systems, exact processes.",
   "say": "Back to Contoso. The team fixes each problem with the right piece. The instructions keep answers brief. The SharePoint guides stay as knowledge. A new tool reads the ticket status from the help desk. And a topic called Report serious incident always asks for the affected system, then the urgency. Remember the rule: documents are knowledge, live systems are tools, exact processes are topics. In the next lesson, you will see how Nexo decides which piece to use."
  }
 ],
 "check": [
  {
   "stem": "Where do you define the agent's role, tone, and general rules?",
   "options": [
    "In the publishing channel",
    "In a Message node",
    "In the Instructions",
    "In the Knowledge"
   ],
   "answer": 2,
   "explanation": "Instructions are the natural-language text that defines who the agent is and how it should behave."
  },
  {
   "stem": "You need the agent to check the status of an order in a live system. Which piece do you use?",
   "options": [
    "A file uploaded as Knowledge",
    "A tool",
    "A channel",
    "Instructions"
   ],
   "answer": 1,
   "explanation": "Querying a live system or running an action is the job of a tool, not of static knowledge."
  },
  {
   "stem": "When is it a good idea to use a topic?",
   "options": [
    "To change the agent's default language for all users",
    "To choose the publishing channel and the sign-in method for users",
    "To store long documents that the agent can search during chats",
    "To control step by step what the agent says and when"
   ],
   "answer": 3,
   "explanation": "Topics are conversations designed by you, ideal for fixed processes and exact results."
  },
  {
   "stem": "Which of these is knowledge?",
   "options": [
    "A Question node for an email",
    "A SharePoint library of how-to guides",
    "A connector that creates tickets",
    "A flow that sends notifications"
   ],
   "answer": 1,
   "explanation": "SharePoint is a knowledge source: the agent looks it up to answer questions."
  }
 ],
 "reto": {
  "text": "Open an agent and go through Overview, Knowledge, Tools, and Topics, one by one.\nWrite three lines of Instructions: role, tone, and what to do when it does not know.\nAsk something in Test and note which piece answered.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-gpt-overview"
},
{
 "id": "F03",
 "module": 0,
 "title": "Generative orchestration vs classic topics",
 "level": "basic",
 "minutes": 10,
 "skills": [
  "1.3c"
 ],
 "theory": {
  "intro": "Orchestration is the decision about what to do with each user message. Think of a receptionist: classic mode has a list of phrases and sends each visitor to the matching department; generative mode understands what the person wants and can send them to several departments in sequence.",
  "sections": [
   {
    "heading": "Two ways to decide",
    "body": "In standard harness agents there are two modes. With generative orchestration, the agent uses AI to decide which topic, tool, other agent, or knowledge source to use. With classic orchestration, the agent triggers the topic whose trigger phrases are most similar to what the user typed.\n\nNew agents use generative orchestration by default. If you create the agent from a prebuilt one, its configuration decides which one is used."
   },
   {
    "heading": "What changes in practice",
    "body": "Topics: generative picks them by their description; classic by trigger phrases. Tools: generative calls them based on their name and description; in classic they are only called explicitly from a topic. Knowledge: generative can search proactively; classic uses it as a fallback when no topic matches.\n\nSeveral items: generative combines topics, tools, and knowledge in a single answer; classic tries to pick one topic. Missing data: generative creates the questions to the user on its own; in classic you write Question nodes. Response: generative writes it; in classic you use Message nodes.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><text x=\"150\" y=\"22\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Classic</text><text x=\"290\" y=\"22\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--accent)\" font-weight=\"600\">Generative</text><line x1=\"6\" y1=\"32\" x2=\"354\" y2=\"32\" stroke=\"var(--line)\" stroke-width=\"1\"/><text x=\"10\" y=\"56\" text-anchor=\"start\" font-size=\"13\" fill=\"currentColor\">Topics</text><text x=\"150\" y=\"56\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">trigger phrases</text><text x=\"290\" y=\"56\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">descriptions</text><line x1=\"6\" y1=\"72\" x2=\"354\" y2=\"72\" stroke=\"var(--line)\" stroke-width=\"1\"/><text x=\"10\" y=\"94\" text-anchor=\"start\" font-size=\"13\" fill=\"currentColor\">Tools</text><text x=\"150\" y=\"94\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">from a topic</text><text x=\"290\" y=\"94\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">agent chooses</text><line x1=\"6\" y1=\"110\" x2=\"354\" y2=\"110\" stroke=\"var(--line)\" stroke-width=\"1\"/><text x=\"10\" y=\"132\" text-anchor=\"start\" font-size=\"13\" fill=\"currentColor\">Knowledge</text><text x=\"150\" y=\"132\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">plan B</text><text x=\"290\" y=\"132\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">proactive</text><line x1=\"6\" y1=\"148\" x2=\"354\" y2=\"148\" stroke=\"var(--line)\" stroke-width=\"1\"/><text x=\"10\" y=\"170\" text-anchor=\"start\" font-size=\"13\" fill=\"currentColor\">Several</text><text x=\"150\" y=\"170\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">only one</text><text x=\"290\" y=\"170\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">combines several</text></svg>"
   },
   {
    "heading": "Descriptions are in charge",
    "body": "In generative mode, the most important factor for choosing is the description of each topic, tool, agent, or knowledge source. The name and the input and output parameters also matter.\n\nA good description is short (one or two sentences), uses active voice, includes keywords the user would say, and also says what it does not do. If two descriptions are similar, the agent picks only one and the result is unpredictable. When you turn on generative mode in an older agent, Copilot Studio generates a description for each topic from its trigger phrases; it is a good idea to review them.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"10\" y=\"14\" width=\"340\" height=\"54\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><text x=\"180\" y=\"37.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Bad: \"Answers questions\"</text><text x=\"180\" y=\"53.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">too vague</text><rect x=\"10\" y=\"90\" width=\"340\" height=\"70\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"180\" y=\"121.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Good: \"Checks the status of a ticket</text><text x=\"180\" y=\"137.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">by its number. Does not create tickets.\"</text><text x=\"180\" y=\"184\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">What it does + what it does not</text></svg>"
   },
   {
    "heading": "How to turn it on and watch it",
    "body": "In Settings, in the Generative AI section, under Orchestration, there is an option that asks whether to use generative orchestration for the agent's responses: Yes or No. In a topic's trigger, generative mode shows The agent chooses (with its description) instead of User says a phrase.\n\nTo see what the agent decided, open the test pane and the activity map, which shows the plan in real time. If an administrator turns off generative orchestration in an environment, agents in that environment can only use classic mode.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"6\" y=\"80\" width=\"66\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"39\" y=\"104.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Message</text><line x1=\"72\" y1=\"100\" x2=\"96\" y2=\"100\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"96\" y=\"70\" width=\"94\" height=\"60\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"143\" y=\"104.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Orchestrator</text><rect x=\"236\" y=\"24\" width=\"90\" height=\"36\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"281\" y=\"46.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Topic</text><rect x=\"236\" y=\"82\" width=\"90\" height=\"36\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"281\" y=\"104.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Tool</text><rect x=\"236\" y=\"140\" width=\"90\" height=\"36\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"281\" y=\"162.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Knowledge</text><line x1=\"190\" y1=\"92\" x2=\"236\" y2=\"44\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"190\" y1=\"100\" x2=\"236\" y2=\"100\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"190\" y1=\"108\" x2=\"236\" y2=\"156\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><text x=\"180\" y=\"194\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--muted)\">chooses by name and description</text></svg>"
   },
   {
    "heading": "Three harnesses",
    "body": "Copilot Studio builds agents on more than one harness. The standard harness uses rule-based topics and flows. The Microsoft Copilot harness (formerly GitHub Copilot harness) is built for reasoning-heavy, multistep work, with skills, memory, a secure sandbox, and usage-based billing in Copilot Credits. Despite the name, it is a Copilot Studio authoring and orchestration framework, not the GitHub Copilot service. The Copilot chat harness extends Microsoft Copilot Chat. Learn describes the Microsoft Copilot harness as a production-ready preview.\n\nAn agent cannot move between harnesses: a Microsoft Copilot harness agent cannot be transferred to the standard harness, and the other way round. A working standard agent does not need to move just because another harness exists. Treat a move as re-architecture and do it only for a clear benefit.\n\nOn the Microsoft Copilot harness the agent has four tabs: Build (identity, knowledge, tools, skills, model, memory), Preview, Evaluate (test sets that measure quality), and Monitor (production health, outcomes, reactions, sessions, and credit usage). The life cycle is Create, Build, Test (Preview and Evaluate), Publish, Monitor. This harness also uses one enhanced orchestration model for all agents, so you cannot configure orchestration the way you can on the standard harness."
   }
  ],
  "steps": [
   "Open your agent and go to Settings.",
   "In the Generative AI section, find Orchestration and check whether the option is set to Yes.",
   "Open the Topics page and a custom topic; look at its Trigger.",
   "Edit the topic description: one or two sentences that say what it does and what it does not do.",
   "Open Tools, go into a tool, and check its name and description.",
   "In the test pane, type a request with two intentions and open the activity map to see the plan."
  ],
  "example": "Contoso has two topics in Nexo: Ticket status and Create ticket. In classic mode, if the employee types \"my laptop will not turn on and I want to know how my other case is going,\" only one topic is triggered. In generative mode, the agent detects two intentions, calls Ticket status with the number it took from the conversation, then calls Create ticket asking only for the missing data, and writes a single response. So that it does not get confused, Contoso writes different descriptions: \"Checks the status of an existing ticket; does not create tickets\" and \"Creates a new ticket; does not check existing ones.\"",
  "examTips": [
   "In generative mode the agent chooses by description (and name); in classic by trigger phrases. Overlapping descriptions give unpredictable selection.",
   "In classic, tools are only called explicitly from a topic; in generative the agent can choose them.",
   "A topic can return its result as an output variable instead of showing a message, so the agent can combine it with everything else.",
   "Harnesses: standard (topics and flows), Microsoft Copilot (reasoning, skills, memory, Copilot Credits, preview), and Copilot chat. Agents cannot be transferred between harnesses.",
   "Microsoft Copilot harness tabs: Build, Preview, Evaluate, Monitor. It has one enhanced orchestration model; orchestration is not configurable like on the standard harness."
  ],
  "glossary": [
   {
    "term": "Orchestration",
    "def": "The process that decides which topic, tool, agent, or knowledge is used to answer each message."
   },
   {
    "term": "Generative orchestration",
    "def": "A mode where AI chooses and combines topics, tools, agents, and knowledge based on their descriptions."
   },
   {
    "term": "Classic orchestration",
    "def": "A mode where the topic whose trigger phrases best match the message is triggered."
   },
   {
    "term": "Trigger phrase",
    "def": "An example phrase that triggers a topic in classic mode."
   },
   {
    "term": "Activity map",
    "def": "A view in the test pane that shows the agent's plan in real time."
   }
  ]
 },
 "scenes": [
  {
   "title": "One message, two wishes",
   "caption": "\"My laptop will not turn on, and how is my other case going?\" Who decides what happens?",
   "say": "Monday at Contoso. An employee writes to Nexo, the I T agent: my laptop will not turn on, and I want to know how my other case is going. One message, two wishes. Nexo has a topic that creates tickets, and another that checks ticket status. Something has to decide what to do with this message. That decision is called orchestration. By the end of this class you will know the two ways to make it, and the three harnesses behind them."
  },
  {
   "title": "Two receptionists",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two receptionists</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Classic</span><span style=\"text-align:right\">List of phrases, one department</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Generative</span><span style=\"text-align:right\">Understands, several departments</span></div></div>",
   "caption": "Classic = a list of phrases. Generative = understands the wish and can route to several desks.",
   "say": "Here is the picture to keep. Orchestration is a receptionist. The classic receptionist has a list of phrases. A visitor says something, and the receptionist sends them to the one department whose phrases match best. The generative receptionist understands what the person wants, and can send them to several departments, one after another. Same building, very different service."
  },
  {
   "title": "Classic: trigger phrases",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Classic orchestration</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Chooses by</span><span style=\"text-align:right\">Trigger phrases</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Two wishes</span><span style=\"text-align:right\">Only one topic runs</span></div></div>",
   "caption": "Classic orchestration triggers the topic whose trigger phrases are most similar to the message.",
   "say": "In standard harness agents there are two modes. With classic orchestration, the agent triggers the topic whose trigger phrases are most similar to what the user typed. A trigger phrase is an example sentence you write on the topic, like check my ticket or where is my case. Nexo's message matches one topic better than the other, so only one topic runs. The second wish is simply lost."
  },
  {
   "title": "Generative: AI decides",
   "caption": "Generative orchestration uses AI to choose topics, tools, other agents and knowledge. Default for new agents.",
   "say": "With generative orchestration, the agent uses A I to decide which topic, tool, other agent or knowledge source to use. New agents use generative orchestration by default. If you create the agent from a prebuilt one, its configuration decides which mode is used. So unless something says otherwise, your new agent starts with the generative receptionist."
  },
  {
   "title": "What changes in practice",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">What changes</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topics</span><span style=\"text-align:right\">Description vs trigger phrases</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tools</span><span style=\"text-align:right\">Chosen vs only from a topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">Proactive vs fallback</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Missing data</span><span style=\"text-align:right\">Asks itself vs Question nodes</span></div></div>",
   "caption": "Topics, tools, knowledge, several items, missing data, response: six differences.",
   "say": "What changes in practice? Topics: generative picks them by description, classic by trigger phrases. Tools: generative calls them by name and description, classic only calls them explicitly from a topic. Knowledge: generative can search it proactively, classic uses it as a fallback when no topic matches. Several items: generative combines them in one answer. Missing data: generative asks for it on its own. And generative writes the response itself."
  },
  {
   "title": "Decide: the lonely tool",
   "caption": "Classic orchestration. A maker adds a tool and expects the agent to pick it on its own. Will it?",
   "say": "Your turn. An agent uses classic orchestration. A maker adds a tool with a perfect name and description, and expects the agent to choose it on its own when users ask. Will it work? Yes, because the description is very clear? No, classic only calls tools from a topic? Or yes, but only as a fallback choice here? Decide before I answer. No. In classic orchestration tools are only called from a topic. Choosing them is a generative skill."
  },
  {
   "title": "Descriptions are in charge",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Good description</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Length</span><span style=\"text-align:right\">One or two sentences</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Style</span><span style=\"text-align:right\">Active voice, user keywords</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Border</span><span style=\"text-align:right\">Says what it does not do</span></div></div>",
   "caption": "Generative mode chooses mainly by description, plus name and input and output parameters.",
   "say": "In generative mode, the most important factor for choosing is the description of each topic, tool, agent or knowledge source. The name and the input and output parameters also matter. A good description is short, one or two sentences, in active voice. It includes keywords the user would say. And it also says what it does not do. That last part draws the border between neighbours."
  },
  {
   "title": "Twin descriptions",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Twin descriptions</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Similar descriptions</span><span style=\"text-align:right\">Unpredictable selection</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fix</span><span style=\"text-align:right\">Different descriptions with borders</span></div></div>",
   "caption": "Two similar descriptions: the agent picks only one, and selection becomes unpredictable.",
   "say": "Here is what goes wrong. If two descriptions are similar, the agent picks only one, and the result is unpredictable. So Contoso writes clearly different ones. Ticket status: checks the status of an existing ticket, does not create tickets. Create ticket: creates a new ticket, does not check existing ones. And when you turn on generative mode in an older agent, Copilot Studio generates descriptions from the trigger phrases. Review them."
  },
  {
   "title": "Decide: the unpredictable agent",
   "caption": "Generative agent. Two topics, similar descriptions. Sometimes one runs, sometimes the other. Fix?",
   "say": "Your turn. A generative agent has two topics, reset password and unlock account. Sometimes one runs, sometimes the other, for the same request. What should the maker fix? Switch the agent to classic orchestration instead? Add many more trigger phrases to both topics? Or rewrite both descriptions so they differ? Decide before I answer. Rewrite the descriptions. In generative mode, overlapping descriptions make selection unpredictable."
  },
  {
   "title": "Nexo, generative",
   "caption": "Two intentions detected: Ticket status, then Create ticket, then one combined response.",
   "say": "Now watch Nexo in generative mode. It detects two intentions. It calls Ticket status with the case number it took from the conversation. Then it calls Create ticket, and asks only for the data that is still missing. Finally it writes a single response that covers both wishes. A topic can even return its result as an output variable instead of a message, so the agent combines it with everything else."
  },
  {
   "title": "Turn it on, watch it work",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Switch and watch</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Setting</span><span style=\"text-align:right\">Settings › Generative AI › Orchestration: Yes</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trigger shows</span><span style=\"text-align:right\">The agent chooses</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Watch</span><span style=\"text-align:right\">Test pane › activity map</span></div></div>",
   "caption": "Settings · Generative AI · Orchestration: Yes. Test pane · activity map shows the plan.",
   "say": "Where is the switch? In Settings, in the generative A I section, under orchestration, an option asks whether to use generative orchestration for the agent's responses: yes or no. In a topic's trigger, generative mode shows the agent chooses, with its description, instead of user says a phrase. To see what the agent decided, open the test pane and the activity map. It shows the plan in real time."
  },
  {
   "title": "The admin's switch",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Admin switch</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Generative off in environment</span><span style=\"text-align:right\">Agents there use classic only</span></div></div>",
   "caption": "Admin turns off generative orchestration in an environment: agents there can use only classic.",
   "say": "One more switch, and it is not yours. If an administrator turns off generative orchestration in an environment, agents in that environment can only use classic mode. So if a maker cannot find generative behavior anywhere, even with the agent setting on yes, check the environment. The environment rule wins over the agent's wish."
  },
  {
   "title": "Three harnesses",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three harnesses</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Standard</span><span style=\"text-align:right\">Topics and flows</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft Copilot harness</span><span style=\"text-align:right\">Reasoning, skills, memory, Copilot Credits</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot chat harness</span><span style=\"text-align:right\">Extends Microsoft Copilot Chat</span></div></div>",
   "caption": "Standard: topics and flows. Microsoft Copilot harness: reasoning, skills, memory, Copilot Credits. Copilot chat harness.",
   "say": "Copilot Studio builds agents on more than one harness, the runtime under the agent. The standard harness uses rule based topics and flows. The Microsoft Copilot harness, formerly called the GitHub Copilot harness, is built for reasoning heavy, multistep work, with skills, memory, a secure sandbox, and usage based billing in Copilot Credits. Despite the old name, it is not the GitHub Copilot service. The Copilot chat harness extends Microsoft Copilot Chat."
  },
  {
   "title": "No moving vans",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Moving harness</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Transfer</span><span style=\"text-align:right\">Not possible, either way</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">A move is</span><span style=\"text-align:right\">Re-architecture</span></div></div>",
   "caption": "Agents cannot be transferred between harnesses. A move is re-architecture.",
   "say": "An agent cannot move between harnesses. A Microsoft Copilot harness agent cannot be transferred to the standard harness, and the other way round. A working standard agent does not need to move just because a new harness exists. Treat a move as re architecture, a rebuild, and do it only for a clear benefit. Learn describes the Microsoft Copilot harness as a production ready preview."
  },
  {
   "title": "Decide: the move",
   "caption": "A working standard harness agent. The team wants to switch it to the Microsoft Copilot harness. How?",
   "say": "Your turn. Contoso's standard harness agent works well. A team member wants to switch it to the Microsoft Copilot harness. What is true? It cannot be transferred, a move means rebuilding? It moves by itself when the harness leaves preview? Or there is a Settings button that converts it? Decide before I answer. It cannot be transferred. A move is re architecture, so only do it for a clear benefit."
  },
  {
   "title": "Four tabs",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Microsoft Copilot harness tabs</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Build</span><span style=\"text-align:right\">Identity, knowledge, tools, skills, model, memory</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Preview</span><span style=\"text-align:right\">Test</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Evaluate</span><span style=\"text-align:right\">Test sets, quality</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Monitor</span><span style=\"text-align:right\">Health, sessions, credits</span></div></div>",
   "caption": "Microsoft Copilot harness: Build, Preview, Evaluate, Monitor. One orchestration model, not configurable.",
   "say": "On the Microsoft Copilot harness the agent has four tabs. Build holds identity, knowledge, tools, skills, model and memory. Preview is for testing. Evaluate runs test sets that measure quality. Monitor shows production health, outcomes, reactions, sessions and credit usage. The life cycle is create, build, test, publish, monitor. And this harness uses one enhanced orchestration model for all agents, so you cannot configure orchestration like on the standard harness."
  },
  {
   "title": "The steps",
   "caption": "Settings · Orchestration · topic trigger · descriptions · tools · test with two intentions.",
   "say": "Here are the steps. Open your agent and go to Settings. In the generative A I section, find orchestration and check that it is set to yes. Open a custom topic and look at its trigger. Edit the description: one or two sentences that say what it does and what it does not do. Check a tool's name and description. Then type a request with two intentions in the test pane, and open the activity map."
  },
  {
   "title": "Two wishes, one answer",
   "caption": "Generative: description routes, several items combine. Classic: trigger phrases, one topic.",
   "say": "Back to Nexo. In generative mode, the employee's two wishes became one plan: check the old case, create the new ticket, and answer once. Remember for the exam: generative chooses by description and name, classic by trigger phrases. In classic, tools run only from topics. Overlapping descriptions are unpredictable. And agents never move between harnesses."
  }
 ],
 "check": [
  {
   "stem": "How does the agent choose a topic in generative mode?",
   "options": [
    "By the channel where it was published",
    "It always picks the first topic",
    "By the description written for each topic",
    "By the alphabetical order"
   ],
   "answer": 2,
   "explanation": "In generative mode, the description is the most important factor for selecting topics, tools, agents, and knowledge."
  },
  {
   "stem": "In classic orchestration, how can a tool be called?",
   "options": [
    "Only from the channel",
    "Only when explicitly called from a topic",
    "It can never be called",
    "The agent picks it freely at runtime"
   ],
   "answer": 1,
   "explanation": "In classic mode, tools are only invoked explicitly inside a topic."
  },
  {
   "stem": "Two topics have almost identical descriptions. What happens in generative mode?",
   "options": [
    "The agent always runs both topics in the same turn",
    "One is turned off automatically by the platform",
    "A publishing error occurs",
    "The agent picks only one, with unpredictable results"
   ],
   "answer": 3,
   "explanation": "With overlapping descriptions the agent picks a single topic and the selection becomes unpredictable, so you must make them different."
  },
  {
   "stem": "Where do you turn generative orchestration on or off for an agent?",
   "options": [
    "On the Analytics page, under Topic usage",
    "In the Message node of each topic, under Conditions",
    "In Channels, under the publishing options of the agent",
    "In Settings, Generative AI, Orchestration"
   ],
   "answer": 3,
   "explanation": "It is an option in Settings, in the Generative AI section, under Orchestration."
  }
 ],
 "reto": {
  "text": "Open an agent and check in Settings whether it uses generative orchestration.\nWrite a new description for a topic and another for a tool, saying what they do and what they do not.\nAsk something with two intentions in Test and look at the activity map.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions"
},
{
 "id": "F04",
 "module": 0,
 "title": "Knowledge: where the answers come from",
 "level": "basic",
 "minutes": 10,
 "skills": [
  "1.3e",
  "1.3g"
 ],
 "theory": {
  "intro": "Knowledge is the set of sources the agent looks up to answer with real data from your organization instead of making things up. Think of a librarian: they do not remember everything, but they know which shelf to check and they cite the book.",
  "sections": [
   {
    "heading": "The agent's library",
    "body": "When answers come from your sources, they are called grounded. This reduces made-up answers and lets you show where each piece of data came from.\n\nYou can add knowledge when you create the agent or later, on the agent's Knowledge page, or inside a topic with a generative answers node. Published agents use these sources to ground their answers.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"6\" y=\"8\" width=\"150\" height=\"30\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"81\" y=\"27.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Public websites</text><rect x=\"6\" y=\"46\" width=\"150\" height=\"30\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"81\" y=\"65.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Uploaded files</text><rect x=\"6\" y=\"84\" width=\"150\" height=\"30\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"81\" y=\"103.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">SharePoint</text><rect x=\"6\" y=\"122\" width=\"150\" height=\"30\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"81\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Dataverse</text><rect x=\"6\" y=\"160\" width=\"150\" height=\"30\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"81\" y=\"179.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Connectors</text><line x1=\"156\" y1=\"23\" x2=\"230\" y2=\"90\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"156\" y1=\"61\" x2=\"230\" y2=\"95\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"156\" y1=\"99\" x2=\"230\" y2=\"100\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"156\" y1=\"137\" x2=\"230\" y2=\"106\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"156\" y1=\"175\" x2=\"230\" y2=\"112\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"230\" y=\"70\" width=\"120\" height=\"60\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"290\" y=\"96.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Agent</text><text x=\"290\" y=\"112.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">answers with citations</text></svg>"
   },
   {
    "heading": "Which sources exist",
    "body": "The main sources are: public websites (searched with Bing, and they only return results from the URLs you provide); documents you upload (stored in Dataverse); SharePoint; Dataverse (tables in the environment); and enterprise data through connectors (Copilot connectors, whose content Microsoft Search indexes).\n\nAzure AI Search can also be a source, a topic you will see later in the course. In generative mode you can have up to 25 websites and 25 SharePoint URLs; when there are more than 25 sources, a model filters which ones to query."
   },
   {
    "heading": "Permissions and citations",
    "body": "SharePoint, Dataverse, and enterprise connectors use the user's authentication: when someone asks a question, the agent only shows content that person already has access to. That is why you need to configure user authentication.\n\nAnswers usually include citations to the sources. If you customize the response, for example by showing it in a variable or an Adaptive Card, the citations are not added on their own: you must draw them yourself.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><text x=\"180\" y=\"22\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Same question, same agent</text><rect x=\"6\" y=\"40\" width=\"60\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"36\" y=\"64.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Ana</text><line x1=\"66\" y1=\"60\" x2=\"90\" y2=\"60\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"90\" y=\"40\" width=\"80\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"130\" y=\"64.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Agent</text><line x1=\"170\" y1=\"60\" x2=\"196\" y2=\"60\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"196\" y=\"40\" width=\"158\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"275\" y=\"64.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Answers with the doc</text><rect x=\"6\" y=\"110\" width=\"60\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"36\" y=\"134.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Luis</text><line x1=\"66\" y1=\"130\" x2=\"90\" y2=\"130\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"90\" y=\"110\" width=\"80\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"130\" y=\"134.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Agent</text><line x1=\"170\" y1=\"130\" x2=\"196\" y2=\"130\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\" stroke-dasharray=\"4 3\"/><rect x=\"196\" y=\"110\" width=\"158\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><text x=\"275\" y=\"134.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Does not mention it</text><text x=\"180\" y=\"184\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--muted)\">Ana can open the document; Luis cannot</text></svg>"
   },
   {
    "heading": "Settings that change the behavior",
    "body": "In Settings, Generative AI, there are several settings. Allow ungrounded responses: if you turn it off, the agent blocks generated responses in a turn where it used no source or tool, and the Fallback topic is triggered. Use information from the web: lets it search the whole public web with Bing. Content moderation: goes from Lowest to Highest; the default value is High.\n\nTurning off Allow ungrounded responses does not guarantee that the model never uses general knowledge: it only blocks turns with no source or tool. To improve citations, ask in the instructions that it always cite its sources.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"10\" y=\"8\" width=\"340\" height=\"46\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"27.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Allow ungrounded responses</text><text x=\"180\" y=\"43.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">off: blocks answers with no source</text><rect x=\"10\" y=\"62\" width=\"340\" height=\"46\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"81.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Use information from the web</text><text x=\"180\" y=\"97.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">searches public sites via Bing</text><rect x=\"10\" y=\"116\" width=\"340\" height=\"46\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"135.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Content moderation</text><text x=\"180\" y=\"151.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">default level: High</text><text x=\"180\" y=\"186\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--muted)\">Settings, Generative AI</text></svg>"
   }
  ],
  "steps": [
   "Open your agent and go to the Knowledge page.",
   "Select Add knowledge and choose a source type, for example Public website.",
   "Type the URL (or choose the file or SharePoint site), a name, and a clear description.",
   "Wait for the source to finish processing and be ready (Ready).",
   "Go to Settings, Generative AI, and review Allow ungrounded responses and Use information from the web.",
   "In the test pane, ask something that is only in your source and check that the answer includes a citation."
  ],
  "example": "Nexo must answer with the official Contoso IT guides. The team adds two things as Knowledge: the IT SharePoint site and the VPN vendor's public support site. Because SharePoint respects permissions, an employee only gets answers based on documents they can already open. To avoid made-up answers, they turn off Allow ungrounded responses and add to the instructions: \"always cite the source document.\" When someone asks how to reset their password, Nexo answers with the steps and a citation to the exact SharePoint article.",
  "examTips": [
   "If the scenario says each user should only see what they are allowed to see, think of sources with user authentication: SharePoint, Dataverse, and enterprise connectors.",
   "With generative orchestration, custom data and Bing Custom Search are not direct knowledge sources of the agent: they are used inside a generative answers node."
  ],
  "glossary": [
   {
    "term": "Knowledge",
    "def": "Sources the agent looks up to answer with information from your organization or from public sites."
   },
   {
    "term": "Grounding",
    "def": "Anchoring the model's answer in real sources to reduce made-up content."
   },
   {
    "term": "Citation",
    "def": "A reference to the source the information in an answer came from."
   },
   {
    "term": "Generative answers node",
    "def": "A topic node that searches knowledge sources and writes an answer."
   },
   {
    "term": "Ungrounded response",
    "def": "An answer the model generates from its general knowledge, without using sources or tools."
   }
  ]
 },
 "scenes": [
  {
   "title": "A confident wrong answer",
   "caption": "Nexo invents password steps because it has no source. The fix is knowledge: answers that come from Contoso's own documents.",
   "say": "Week three at Contoso. An employee asks Nexo how to reset their password. Nexo answers at once, sounding sure: open the Contoso portal, choose Security, press Reset. There is no such portal. The steps were invented. Nobody gave Nexo the real password guide, so the model filled the gap with a guess. The I T team does not want a smarter guess. They want answers that come from Contoso's own documents. That is what knowledge is for."
  },
  {
   "title": "The librarian",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The librarian</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">Sources the agent looks up</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Grounded</span><span style=\"text-align:right\">Answer comes from your sources</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Result</span><span style=\"text-align:right\">Fewer made-up answers, with citations</span></div></div>",
   "caption": "Knowledge is the set of sources the agent looks up. Answers from them are grounded: fewer made-up facts, plus citations.",
   "say": "Picture a librarian. A good librarian does not remember every book. They know which shelf to check, they read the page, and they show you the book. Knowledge works the same way. It is the set of sources the agent looks up before it answers. When an answer comes from your sources, we call it grounded. Grounded answers make fewer things up, and the agent can cite where each piece of data came from."
  },
  {
   "title": "The shelves",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The shelves</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Public website</span><span style=\"text-align:right\">Bing, only your URLs</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Uploaded files</span><span style=\"text-align:right\">Stored in Dataverse</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">SharePoint</span><span style=\"text-align:right\">Sites and libraries</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Dataverse</span><span style=\"text-align:right\">Tables in the environment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot connectors</span><span style=\"text-align:right\">Enterprise data, Microsoft Search</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where to add</span><span style=\"text-align:right\">At creation · Knowledge page · generative answers node</span></div></div>",
   "caption": "Sources: public websites (Bing, your URLs only), uploaded files (stored in Dataverse), SharePoint, Dataverse tables, Copilot connectors.",
   "say": "Which shelves can you add? Public websites, searched with Bing, but only inside the addresses you give. Files you upload, which are stored in Dataverse. SharePoint sites and libraries. Dataverse tables in your environment. And enterprise data through Copilot connectors, indexed by Microsoft Search. You add knowledge when you create the agent, later on the Knowledge page, or inside a topic with a generative answers node."
  },
  {
   "title": "Who can see what",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Who can see what</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">User's sign-in</span><span style=\"text-align:right\">SharePoint · Dataverse · enterprise connectors</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Effect</span><span style=\"text-align:right\">Each person sees only what they can open</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Needs</span><span style=\"text-align:right\">User authentication</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Custom response</span><span style=\"text-align:right\">Add the citations yourself</span></div></div>",
   "caption": "SharePoint, Dataverse and connectors use the user's sign-in: each person sees only what they can open. Custom responses need citations added by you.",
   "say": "Now a detail the exam loves. SharePoint, Dataverse and enterprise connectors use the user's own sign in. When someone asks a question, Nexo only shows content that person can already open. So an intern and a manager can ask the same thing and get different answers. For this to work, you configure user authentication. Answers also carry citations to their sources. But if you customize the response, for example in an Adaptive Card, you must add the citations yourself."
  },
  {
   "title": "Decide: the H R policies",
   "caption": "HR policies live in SharePoint with permissions per department. Each employee must only see what they can open. How do they add them?",
   "say": "Your turn. Contoso keeps its H R policies in a SharePoint site, with permissions for each department. Every employee must only get answers from documents they can already open. How do they add them? Upload copies of the documents as files? Add the SharePoint site as knowledge? Or paste the policies into the instructions? Decide before I answer. Add the SharePoint site. SharePoint uses the user's sign in, so each person only sees what they can open. Uploaded copies lose those permissions."
  },
  {
   "title": "The ungrounded switch",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Settings › Generative AI</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Allow ungrounded responses</span><span style=\"text-align:right\">Off: no source or tool → blocked, Fallback runs</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Use information from the web</span><span style=\"text-align:right\">Whole public web with Bing</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Content moderation</span><span style=\"text-align:right\">Lowest to Highest, default High</span></div></div>",
   "caption": "Settings, Generative AI: Allow ungrounded responses (off blocks turns with no source or tool; Fallback runs), web search, content moderation (default High).",
   "say": "Next, the settings. Open Settings, then Generative A I. Allow ungrounded responses is the key switch. Turn it off, and in any turn where the agent used no source and no tool, the generated answer is blocked and the Fallback topic runs instead. Use information from the web lets the agent search the whole public web with Bing. Content moderation goes from Lowest to Highest, and the default is High."
  },
  {
   "title": "Decide: no source, no answer",
   "caption": "Nexo sometimes answers from general knowledge with no source. IT wants those answers blocked so Fallback runs. What do they change?",
   "say": "Your turn. Sometimes Nexo still answers with no source at all, straight from the model's general knowledge. I T wants those answers blocked, so the Fallback topic runs instead. What do they change? Raise content moderation up to Highest? Turn on Use information from the web? Or switch off Allow ungrounded responses? Decide before I answer. Switch off Allow ungrounded responses. Moderation filters harmful content, and the web only adds sources. It is not a full guarantee, so the instructions also say: always cite the source."
  },
  {
   "title": "Add knowledge in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Knowledge page › Add knowledge</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Source type, URL, name, clear description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Wait for Ready</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Settings › Generative AI</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Test pane: look for the citation</span></div></div>",
   "caption": "Knowledge page, Add knowledge, Public website: URL, name, clear description. Wait for Ready, check Generative AI settings, test for a citation.",
   "say": "Let's do it in the studio. Open Nexo and go to the Knowledge page. Select Add knowledge and choose Public website. Type the address, a name, and a clear description, so the agent can pick the right source. Wait until the source shows Ready. Then open Settings, Generative A I, and check the two switches. Finally, in the test pane, ask something that only your source knows, and look for the citation under the answer."
  },
  {
   "title": "Back to the password question",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Nexo, grounded</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">IT SharePoint + VPN vendor site</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Setting</span><span style=\"text-align:right\">Allow ungrounded responses off</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">Always cite the source document</span></div></div>",
   "caption": "With SharePoint and the VPN vendor's site as knowledge, ungrounded answers off and citations requested, Nexo answers with the real steps and a source.",
   "say": "Back to week three. The I T team added two sources: the I T SharePoint site and the V P N vendor's public support site. They turned off Allow ungrounded responses and told Nexo to always cite the source document. The same employee asks how to reset their password. Nexo answers with the real steps and a citation to the exact SharePoint article. Remember: knowledge is looked up, SharePoint respects permissions, and no source means no generated answer. Next, the tools Nexo can run."
  }
 ],
 "check": [
  {
   "stem": "What does it mean for an answer to be \"grounded\"?",
   "options": [
    "It was published in Teams for all internal users",
    "It was written by an administrator who reviewed it",
    "It is anchored in real knowledge sources",
    "It has no citations and no links to any document"
   ],
   "answer": 2,
   "explanation": "Grounded means the answer relies on the connected sources, which reduces made-up content."
  },
  {
   "stem": "An agent uses SharePoint as knowledge. Ana can open a certain document and Luis cannot. What happens?",
   "options": [
    "Only the agent's creator can see the document at all",
    "Nobody gets answers from that document",
    "Only Ana gets answers from that document",
    "Both get the same answer, from the same document"
   ],
   "answer": 2,
   "explanation": "With user authentication, the agent only shows content that each person already has access to."
  },
  {
   "stem": "You turn off Allow ungrounded responses. What does the agent do when it responds without using any source or tool in a turn?",
   "options": [
    "It blocks the reply and runs the Fallback topic",
    "It answers anyway, using only its general knowledge and training",
    "It turns off the channel for all users",
    "It deletes the knowledge sources from the agent"
   ],
   "answer": 0,
   "explanation": "That setting blocks responses in turns with no source or tool, and the agent goes to the Fallback topic."
  },
  {
   "stem": "Where are the files you upload as knowledge stored?",
   "options": [
    "In Dataverse",
    "In Application Insights",
    "In the user's browser",
    "In the Teams channel"
   ],
   "answer": 0,
   "explanation": "Documents uploaded as a knowledge source are stored in Dataverse."
  }
 ],
 "reto": {
  "text": "Open your agent and add a public website as Knowledge.\nWait until it is Ready and ask something that only that source knows.\nTry turning Allow ungrounded responses off and on, and compare the answers.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
},
{
 "id": "F05",
 "module": 0,
 "title": "Tools and connectors",
 "level": "basic",
 "minutes": 10,
 "skills": [
  "1.2c",
  "2.2c"
 ],
 "theory": {
  "intro": "If knowledge is what the agent reads, tools are what the agent does. A connector is the adapter that lets it talk to services like SharePoint or Outlook without you writing any code.",
  "sections": [
   {
    "heading": "Tools: the agent's hands",
    "body": "A tool is a capability the agent can run: read an email, create a ticket, check an inventory. The main types are connector, agent flow, prompt, REST API, MCP, and computer use. With generative orchestration the agent chooses the tool by its name and description; in classic mode it is only called from a topic.\n\nAnalogy: tools are the apps installed on the agent's phone.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><text x=\"180\" y=\"18\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Agent tools (Add a tool)</text><rect x=\"10\" y=\"30\" width=\"160\" height=\"34\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"90\" y=\"51.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Connector</text><rect x=\"190\" y=\"30\" width=\"160\" height=\"34\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"270\" y=\"51.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Agent flow</text><rect x=\"10\" y=\"74\" width=\"160\" height=\"34\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"90\" y=\"95.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Prompt</text><rect x=\"190\" y=\"74\" width=\"160\" height=\"34\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"270\" y=\"95.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">REST API</text><rect x=\"10\" y=\"118\" width=\"160\" height=\"34\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"90\" y=\"139.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">MCP</text><rect x=\"190\" y=\"118\" width=\"160\" height=\"34\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"270\" y=\"139.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Computer use</text><rect x=\"10\" y=\"162\" width=\"160\" height=\"34\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"90\" y=\"183.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Custom connector</text></svg>"
   },
   {
    "heading": "What a connector is",
    "body": "A Power Platform connector is a wrapper around an API. It translates the agent's calls into the language of each service, such as SharePoint, Outlook, or Salesforce, and comes with ready-made lists of actions.\n\nThink of a travel plug adapter: your device (the agent) always uses the same plug, and the adapter makes sure it works in each country (each API). The same connectors work in Copilot Studio, Power Automate, Power Apps, and Azure Logic Apps.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"6\" y=\"70\" width=\"80\" height=\"56\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"46\" y=\"102.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Agent</text><line x1=\"86\" y1=\"98\" x2=\"116\" y2=\"98\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"116\" y=\"70\" width=\"120\" height=\"56\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"176\" y=\"94.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Connector</text><text x=\"176\" y=\"110.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">API wrapper</text><line x1=\"236\" y1=\"98\" x2=\"266\" y2=\"98\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"266\" y=\"70\" width=\"88\" height=\"56\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"310\" y=\"94.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">API</text><text x=\"310\" y=\"110.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">of the service</text><text x=\"180\" y=\"162\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Translates the agent's calls</text><text x=\"180\" y=\"180\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">into each API's language</text></svg>"
   },
   {
    "heading": "Standard, premium, and custom",
    "body": "Connectors are classified like this. Standard (like SharePoint): included in all Copilot Studio plans. Premium: available only in certain plans. Custom: you build them yourself when a service has no ready connector, usually from an OpenAPI specification.\n\nThe Copilot Studio plan for Teams, included in Microsoft 365, does not allow premium connectors. Also, administrators can use data policies (DLP) to control which connectors can be used or to block them.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"6\" y=\"40\" width=\"108\" height=\"100\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"60\" y=\"78.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Standard</text><text x=\"60\" y=\"94.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">e.g. SharePoint</text><text x=\"60\" y=\"110.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">in every plan</text><rect x=\"126\" y=\"40\" width=\"108\" height=\"100\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"78.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Premium</text><text x=\"180\" y=\"94.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">depends on your</text><text x=\"180\" y=\"110.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">license plan</text><rect x=\"246\" y=\"40\" width=\"108\" height=\"100\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"300\" y=\"78.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Custom</text><text x=\"300\" y=\"94.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">for APIs with no</text><text x=\"300\" y=\"110.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">ready connector</text><text x=\"180\" y=\"170\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--muted)\">All go through data policies (DLP)</text></svg>"
   },
   {
    "heading": "Connections and credentials",
    "body": "A connector needs a connection with valid credentials. By default it uses the credentials of the user chatting with the agent: each person signs in to the service. The alternative is Maker-provided credentials, which require an authenticated channel.\n\nUse maker-provided credentials with care: all users will act with the permissions of the person who configured the tool. Connections can be shared from the Power Apps portal, in Connections, with the Can use + share permission."
   }
  ],
  "steps": [
   "Open your agent and go to the Tools page.",
   "Select Add a tool and then Connector.",
   "Search for the service (for example SharePoint or Outlook) and choose the action you want.",
   "If there is no connection yet, select Create new connection and sign in.",
   "Select Add and configure.",
   "Review and improve the name and description of the tool and its inputs.",
   "In the test pane, try a request that should use it and look at the activity map.",
   "If there is no connector, use Add a tool, New tool, and Custom connector: it takes you to the Power Apps portal to create one."
  ],
  "example": "Nexo needs to create a ticket when the guide does not solve the problem. The Contoso help desk system already has a premium connector, so the team adds it from Add a tool, Connector. To check IT purchase approvals, which live in an internal system with no connector, a developer creates a custom connector from its OpenAPI specification and then adds it as a tool. The administrators review the data policies so that both connectors are allowed in the environment. Each employee signs in only once with their own credentials.",
  "examTips": [
   "Standard vs premium is a license question: premium connectors require a plan that includes them; the Copilot Studio plan for Teams does not allow them.",
   "If the system has no ready connector, the scenario answer is a custom connector (or a REST API tool); if it only has a screen, computer use.",
   "Data policies (DLP) also govern custom connectors and MCP servers."
  ],
  "glossary": [
   {
    "term": "Connector",
    "def": "A wrapper around an API that lets Copilot Studio and other Power Platform apps use a service."
   },
   {
    "term": "Connection",
    "def": "Saved credentials for using a connector with a specific service."
   },
   {
    "term": "Custom connector",
    "def": "A connector you build yourself, usually from an OpenAPI specification, for a service with no ready connector."
   },
   {
    "term": "Standard / Premium",
    "def": "A license classification: standard ones are in all plans; premium ones only in certain plans."
   },
   {
    "term": "Data policy (DLP)",
    "def": "An administrator rule that controls which connectors can be used and combined in an environment."
   }
  ]
 },
 "scenes": [
  {
   "title": "Nexo can talk, but not act",
   "caption": "Nexo reads the guides, but it cannot open a ticket. Knowledge is what the agent reads; tools are what it does.",
   "say": "Week four at Contoso. An employee writes: the V P N steps did not work, please open a ticket. Nexo found the right guide, but now it is stuck. It can only say: please call the help desk. The employee closes the chat, annoyed. Nexo can read, but it cannot act. Knowledge is what the agent reads. Tools are what the agent does. Today we give Nexo hands, and the adapters that connect them to real systems."
  },
  {
   "title": "Tools: the agent's hands",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Tools</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">A capability the agent can run</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Types</span><span style=\"text-align:right\">Connector · agent flow · prompt · REST API · MCP · computer use</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Generative</span><span style=\"text-align:right\">Chosen by name and description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Classic</span><span style=\"text-align:right\">Only called from a topic</span></div></div>",
   "caption": "A tool is something the agent can run. Like apps on a phone. Generative mode picks by name and description; classic only from topics.",
   "say": "A tool is a capability the agent can run: read an email, create a ticket, check an inventory. Think of the apps installed on the agent's phone. The main types are a connector, an agent flow, a prompt, a REST A P I, an M C P server, and computer use. With generative orchestration, the agent chooses a tool by its name and description. In classic mode, a tool is only called from a topic."
  },
  {
   "title": "The travel adapter",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Connector</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Is</span><span style=\"text-align:right\">A wrapper around an API</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Does</span><span style=\"text-align:right\">Translates calls, ready-made actions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Works in</span><span style=\"text-align:right\">Copilot Studio · Power Automate · Power Apps · Logic Apps</span></div></div>",
   "caption": "A connector wraps an API: it translates the agent's calls for each service and brings ready-made actions. Shared across Power Platform.",
   "say": "The most common tool is a connector. Picture a travel plug adapter. Your device always has the same plug, and the adapter makes it fit in every country. A connector is a wrapper around an A P I. It translates the agent's calls into the language of each service, like SharePoint, Outlook or Salesforce, and it comes with ready-made actions. The same connectors work in Copilot Studio, Power Automate, Power Apps and Azure Logic Apps."
  },
  {
   "title": "Standard, premium, custom",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three kinds</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Standard</span><span style=\"text-align:right\">All Copilot Studio plans (e.g. SharePoint)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Premium</span><span style=\"text-align:right\">Only certain plans; not the Teams plan</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Custom</span><span style=\"text-align:right\">You build it, usually from OpenAPI</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Data policies</span><span style=\"text-align:right\">Allow or block connectors, custom and MCP</span></div></div>",
   "caption": "Standard: all plans. Premium: only some plans, not the Teams plan. Custom: you build it, usually from OpenAPI. Data policies govern all.",
   "say": "Connectors come in three kinds. Standard ones, like SharePoint, are included in every Copilot Studio plan. Premium ones are only available in certain plans. Custom ones you build yourself, usually from an OpenAPI specification, when a service has no ready connector. Watch one trap: the Copilot Studio plan for Teams does not allow premium connectors. And administrators use data policies to allow or block connectors, custom connectors and M C P servers included."
  },
  {
   "title": "Decide: the payroll connector",
   "caption": "HR builds on the Copilot Studio plan for Teams and needs a premium payroll connector. What happens?",
   "say": "Your turn. Contoso's H R team builds an agent with the Copilot Studio plan for Teams, included in Microsoft three sixty five. The agent needs a premium connector for the payroll system. What happens? They need a plan with premium connectors? It works, as all connectors are included? Or it works once an admin data policy allows it? Decide before I answer. They need a plan with premium connectors. The Teams plan does not allow premium ones, and a data policy cannot grant a license."
  },
  {
   "title": "Connections and credentials",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Connections</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connection</span><span style=\"text-align:right\">Saved credentials for a service</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default</span><span style=\"text-align:right\">Each user signs in with their own</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Maker-provided</span><span style=\"text-align:right\">Needs authenticated channel; all act as the maker</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Share</span><span style=\"text-align:right\">Power Apps portal › Connections › Can use + share</span></div></div>",
   "caption": "A connection holds the credentials. Default: each user signs in. Maker-provided credentials need an authenticated channel; everyone acts as the maker.",
   "say": "A connector needs a connection: saved credentials for a service. By default, it uses the credentials of the person chatting, so each employee signs in once and acts with their own permissions. The alternative is maker provided credentials, which need an authenticated channel. Use them with care: every user then acts with the permissions of the person who set up the tool. Connections can be shared from the Power Apps portal, in Connections, with the Can use and share permission."
  },
  {
   "title": "Decide: the approvals system",
   "caption": "IT purchase approvals live in an internal system with an API and an OpenAPI description, but no ready connector. How does Nexo get a tool?",
   "say": "Your turn. I T purchase approvals live in an internal system. It has its own A P I and an OpenAPI description, but no ready connector. How does Nexo get a tool for it? Use computer use to click through its screens? Build a custom connector from its OpenAPI? Or add the system's website as a knowledge source? Decide before I answer. Build a custom connector. The A P I exists, so you wrap it. Computer use is for systems that only have a screen."
  },
  {
   "title": "Add a connector in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Tools page › Add a tool › Connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Search the service, pick the action</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Create new connection, sign in</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Add and configure, improve name and description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Test pane: check the activity map</span></div></div>",
   "caption": "Tools page, Add a tool, Connector: pick the action, create the connection, Add and configure, improve the description, test with the activity map.",
   "say": "Let's add one in the studio. Open Nexo and go to the Tools page. Select Add a tool, then Connector. Search for the service and choose the action, like create a ticket. If there is no connection yet, select Create new connection and sign in. Select Add and configure, then improve the tool's name and description. Finally, test a request in the test pane and watch the activity map show the tool running."
  },
  {
   "title": "Back to the ticket",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Nexo can act</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Help desk</span><span style=\"text-align:right\">Premium connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Approvals</span><span style=\"text-align:right\">Custom connector from OpenAPI</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Admins</span><span style=\"text-align:right\">Data policies allow both</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Users</span><span style=\"text-align:right\">Sign in once, own credentials</span></div></div>",
   "caption": "Help desk premium connector, custom connector for approvals, both allowed by data policy, each user signs in once. Nexo opens the ticket.",
   "say": "Back to week four. The team added the help desk's premium connector, and a developer built a custom connector for purchase approvals from its OpenAPI. The admins checked the data policies, so both are allowed. The same employee writes again. Nexo signs them in once and opens the ticket with their own credentials. Remember: premium needs the right plan, no connector means a custom one, and data policies decide what is allowed. Next, where all of this lives: environments."
  }
 ],
 "check": [
  {
   "stem": "What is a connector in Power Platform?",
   "options": [
    "A type of topic that runs a fixed set of Message nodes",
    "A wrapper around a service's API, with ready-made actions",
    "A publishing channel where users chat with the agent",
    "A Microsoft 365 license for Teams"
   ],
   "answer": 1,
   "explanation": "A connector acts as a proxy or wrapper for an API, with ready-to-use actions."
  },
  {
   "stem": "Which connector type is included in all Copilot Studio plans?",
   "options": [
    "Standard connectors, such as SharePoint and Outlook",
    "None of them, because all connectors are premium",
    "Premium connectors, which depend on the plan you have",
    "Custom connectors, which you build from an API definition"
   ],
   "answer": 0,
   "explanation": "Standard connectors, like SharePoint, are included in all plans; premium ones depend on the plan."
  },
  {
   "stem": "Your internal system has no ready connector, but it has an OpenAPI specification. What do you build?",
   "options": [
    "A new channel for the Teams app",
    "A Message node that calls the system",
    "A custom connector from an OpenAPI file",
    "A managed solution"
   ],
   "answer": 2,
   "explanation": "A custom connector is created from an OpenAPI specification for services with no prebuilt connector."
  },
  {
   "stem": "Which credentials does a connector in an agent use by default?",
   "options": [
    "The tenant administrator's account",
    "The agent creator's personal credentials",
    "The chatting user's own credentials by default",
    "None, because connectors need no sign-in"
   ],
   "answer": 2,
   "explanation": "By default each user enters their own credentials; the maker's credentials are a separate option."
  }
 ],
 "reto": {
  "text": "Open your agent, go to Tools, and choose Add a tool, Connector.\nAdd a SharePoint or Outlook action and improve its description.\nAsk in Test for something that should use it and check in the activity map that it chose it.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors"
},
{
 "id": "F06",
 "module": 0,
 "title": "Environments, Dataverse, and solutions",
 "level": "basic",
 "minutes": 10,
 "skills": [
  "3.2a"
 ],
 "theory": {
  "intro": "An environment is the office where your agents, flows, and data live; Dataverse is its database; and a solution is the moving box you use to take your work from one office to another. Understanding this avoids almost all the trouble when moving from testing to production.",
  "sections": [
   {
    "heading": "Environment: the separate office",
    "body": "A Power Platform environment is a space where your organization's apps, agents, and flows are stored, managed, and shared. It is a container that separates things with different roles, security, or audiences.\n\nAnalogy: different office buildings for development, testing, and production. What you build in one does not appear in another until you move it. Each environment belongs to a Microsoft Entra tenant and a geographic region, and only people in the tenant can access its resources. An agent can only use connections and data from the same environment.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"6\" y=\"6\" width=\"348\" height=\"188\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><text x=\"180\" y=\"26\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Contoso tenant</text><rect x=\"18\" y=\"40\" width=\"100\" height=\"120\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"68\" y=\"80.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Dev</text><text x=\"68\" y=\"96.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Dataverse</text><text x=\"68\" y=\"112.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">agents</text><text x=\"68\" y=\"128.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">connections</text><rect x=\"130\" y=\"40\" width=\"100\" height=\"120\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"80.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Test</text><text x=\"180\" y=\"96.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Dataverse</text><text x=\"180\" y=\"112.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">agents</text><text x=\"180\" y=\"128.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">connections</text><rect x=\"242\" y=\"40\" width=\"100\" height=\"120\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"292\" y=\"80.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Prod</text><text x=\"292\" y=\"96.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Dataverse</text><text x=\"292\" y=\"112.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">agents</text><text x=\"292\" y=\"128.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">connections</text><text x=\"180\" y=\"182\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--muted)\">Each environment is a separate box</text></svg>"
   },
   {
    "heading": "Environment types",
    "body": "Default: one per tenant, shared by everyone; it is for experimenting, not for production. Production: permanent, real work. Sandbox: non-production, for development and testing, with options such as copy and reset. Developer: personal, for people with the Developer Plan. Trial: for trying things out; it expires after 30 days.\n\nThere is also Dataverse for Teams, which is created automatically when you build in Teams. There are two built-in roles: Environment Admin (manages everything, including data policies) and Environment Maker (creates resources).",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><text x=\"10\" y=\"24\" text-anchor=\"start\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Default</text><text x=\"110\" y=\"24\" text-anchor=\"start\" font-size=\"13\" fill=\"var(--muted)\">one per tenant, to experiment</text><line x1=\"6\" y1=\"36\" x2=\"354\" y2=\"36\" stroke=\"var(--line)\" stroke-width=\"1\"/><text x=\"10\" y=\"60\" text-anchor=\"start\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Production</text><text x=\"110\" y=\"60\" text-anchor=\"start\" font-size=\"13\" fill=\"var(--muted)\">real, permanent work</text><line x1=\"6\" y1=\"72\" x2=\"354\" y2=\"72\" stroke=\"var(--line)\" stroke-width=\"1\"/><text x=\"10\" y=\"96\" text-anchor=\"start\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Sandbox</text><text x=\"110\" y=\"96\" text-anchor=\"start\" font-size=\"13\" fill=\"var(--muted)\">development and testing</text><line x1=\"6\" y1=\"108\" x2=\"354\" y2=\"108\" stroke=\"var(--line)\" stroke-width=\"1\"/><text x=\"10\" y=\"132\" text-anchor=\"start\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Developer</text><text x=\"110\" y=\"132\" text-anchor=\"start\" font-size=\"13\" fill=\"var(--muted)\">personal (Developer Plan)</text><line x1=\"6\" y1=\"144\" x2=\"354\" y2=\"144\" stroke=\"var(--line)\" stroke-width=\"1\"/><text x=\"10\" y=\"168\" text-anchor=\"start\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Trial</text><text x=\"110\" y=\"168\" text-anchor=\"start\" font-size=\"13\" fill=\"var(--muted)\">trial, expires in 30 days</text></svg>"
   },
   {
    "heading": "Dataverse: the database",
    "body": "Dataverse is the cloud database of Power Platform. Each environment can have zero or one Dataverse database. It stores information in tables, with rows and columns.\n\nIt matters for Copilot Studio for three reasons: its tables can be a knowledge source, it stores the files you upload as knowledge, and solutions depend on it. Having the Environment Admin role does not give automatic access to the data: that access is granted separately."
   },
   {
    "heading": "Solutions: the moving box",
    "body": "A solution is a container that groups components (agents, flows, environment variables, connections) so you can move them together from one environment to another. Agents are created inside a solution: the default one, unless you set a preferred solution.\n\nA solution can be unmanaged, the one you edit in development, or managed, the packaged version you deploy to testing and production. To move agents between environments, you create your own solution, add your components, and export it. Power Platform Pipelines automate that trip.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"6\" y=\"50\" width=\"100\" height=\"70\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"56\" y=\"73.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Dev</text><text x=\"56\" y=\"89.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">solution</text><text x=\"56\" y=\"105.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">unmanaged</text><line x1=\"106\" y1=\"85\" x2=\"130\" y2=\"85\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"130\" y=\"50\" width=\"100\" height=\"70\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"73.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Test</text><text x=\"180\" y=\"89.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">solution</text><text x=\"180\" y=\"105.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">managed</text><line x1=\"230\" y1=\"85\" x2=\"254\" y2=\"85\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"254\" y=\"50\" width=\"100\" height=\"70\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"304\" y=\"73.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Prod</text><text x=\"304\" y=\"89.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">solution</text><text x=\"304\" y=\"105.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">managed</text><text x=\"180\" y=\"150\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">The solution travels between environments</text><text x=\"180\" y=\"170\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--muted)\">edit unmanaged, deploy managed</text></svg>"
   }
  ],
  "steps": [
   "In Copilot Studio, look at the environment picker in the top bar and note which one you are in.",
   "Switch environments and notice that the list of agents is different.",
   "If you have permission, open the Power Platform admin center and go to Manage, Environments to see your environments and their type.",
   "In the Power Apps portal, go to Solutions and create a new solution (for example, Nexo) with its publisher.",
   "Inside the solution, use Add existing to add your agent.",
   "Export the solution as unmanaged and as managed, and compare what each one is for."
  ],
  "example": "Contoso has three environments: Nexo-Dev, Nexo-Test, and Nexo-Prod. The makers build the Nexo agent in Dev, inside a solution called Nexo, as an unmanaged version. When it is ready, they export the solution as managed and import it into Test, where IT runs tests with test data. If everything goes well, the same managed solution moves to Prod. Because each environment has its own Dataverse database and its own connections, the production agent uses real data while the development one never touches sensitive information. An administrator sets different data policies for each environment.",
  "examTips": [
   "To move agents between environments, you use a solution, not manual copying. Dev is worked on as unmanaged; Test and Prod receive managed.",
   "The default environment is for experimenting; a real-work scenario points to a production environment (or sandbox for testing)."
  ],
  "glossary": [
   {
    "term": "Environment",
    "def": "A Power Platform space where apps, agents, flows, and data live, separated by tenant and region."
   },
   {
    "term": "Dataverse",
    "def": "The cloud database of Power Platform; each environment can have zero or one."
   },
   {
    "term": "Solution",
    "def": "A container that groups components so you can move them between environments."
   },
   {
    "term": "Managed / Unmanaged",
    "def": "Unmanaged is the editable solution in development; managed is the packaged one you deploy to other environments."
   },
   {
    "term": "Tenant",
    "def": "Your organization's Microsoft Entra instance; it contains its environments and users."
   }
  ]
 },
 "scenes": [
  {
   "title": "Changes on the live agent",
   "caption": "A maker edits the live Nexo and employees get half-finished questions. A colleague can't even find Nexo. Nobody planned where it lives.",
   "say": "Week five at Contoso. A maker tries a new incident topic directly on the live Nexo. For an hour, employees get half finished questions. Then a colleague opens Copilot Studio to help, and Nexo is not even in their list of agents. Two problems, one cause: nobody planned where Nexo lives, or how changes travel to the people who use it. Today we fix that with three ideas: environments, Dataverse, and solutions."
  },
  {
   "title": "Separate office buildings",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Environment</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Is</span><span style=\"text-align:right\">A space where apps, agents and flows live</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Like</span><span style=\"text-align:right\">Separate office buildings: Dev · Test · Prod</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Belongs to</span><span style=\"text-align:right\">One Entra tenant, one region</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent uses</span><span style=\"text-align:right\">Connections and data from its own environment</span></div></div>",
   "caption": "An environment is a separate office: Dev, Test, Prod. Each belongs to one tenant and region. Agents use connections and data from their own environment.",
   "say": "An environment is a space where your apps, agents and flows live. Picture separate office buildings: one for development, one for testing, one for production. What you build in one building does not appear in another until you move it. That is why the colleague could not see Nexo. Each environment belongs to one Entra tenant and one region. And an agent only uses connections and data from its own environment."
  },
  {
   "title": "Types of environment",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Types</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default</span><span style=\"text-align:right\">One per tenant, shared, for experiments</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Production</span><span style=\"text-align:right\">Permanent, real work</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Sandbox</span><span style=\"text-align:right\">Dev and test, copy and reset</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Developer</span><span style=\"text-align:right\">Personal, Developer Plan</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trial</span><span style=\"text-align:right\">Expires after 30 days</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Roles</span><span style=\"text-align:right\">Environment Admin · Environment Maker</span></div></div>",
   "caption": "Default: shared, for experiments. Production: real work. Sandbox: dev and test, copy and reset. Developer: personal. Trial: expires in thirty days.",
   "say": "Environments come in types. Default: one per tenant, shared by everyone, for experiments, not for production. Production: permanent, for real work. Sandbox: for development and testing, with options to copy and reset it. Developer: a personal one, with the Developer Plan. Trial: for trying things out, and it expires after thirty days. Two built in roles matter: Environment Admin manages everything, and Environment Maker creates resources."
  },
  {
   "title": "Dataverse: the database",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Dataverse</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Per environment</span><span style=\"text-align:right\">Zero or one database</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stores</span><span style=\"text-align:right\">Tables with rows and columns</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">For Copilot Studio</span><span style=\"text-align:right\">Knowledge source · uploaded files · solutions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trap</span><span style=\"text-align:right\">Admin role ≠ data access</span></div></div>",
   "caption": "Dataverse is the environment's database: zero or one per environment, tables with rows and columns. Admin role does not grant data access.",
   "say": "Inside each building there can be one database: Dataverse. Each environment has zero or one. It stores information in tables, with rows and columns. It matters to Copilot Studio for three reasons. Its tables can be a knowledge source. It stores the files you upload as knowledge. And solutions depend on it. One trap: being Environment Admin does not give you access to the data. That access is granted separately."
  },
  {
   "title": "Decide: a place to build",
   "caption": "A team needs a place to develop and test a new agent, with copy and reset, before real use. Which environment type?",
   "say": "Your turn. A team wants a place to develop and test a new agent before real employees use it. They also want to copy it and reset it when tests go wrong. Which environment type fits? The default environment? A production environment? Or a sandbox environment? Decide before I answer. A sandbox. It is made for development and testing, with copy and reset. The default one is shared by everyone, and production is for real work."
  },
  {
   "title": "Solutions: the moving box",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Solution</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Groups</span><span style=\"text-align:right\">Agents · flows · environment variables · connections</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agents live in</span><span style=\"text-align:right\">Default solution, or the preferred one</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Unmanaged</span><span style=\"text-align:right\">Editable, in Dev</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Managed</span><span style=\"text-align:right\">Sealed package for Test and Prod</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Pipelines</span><span style=\"text-align:right\">Automate the trip</span></div></div>",
   "caption": "A solution groups agents, flows, variables and connections to move them. Unmanaged to edit in Dev; managed to deploy. Pipelines automate it.",
   "say": "To move work between buildings, you use a moving box: a solution. It groups components, like agents, flows, environment variables and connections, so they travel together. Agents are always created inside a solution: the default one, unless you set a preferred solution. In development the box is unmanaged, so you can edit it. For test and production you export it managed, a sealed package. Power Platform Pipelines can automate the trip."
  },
  {
   "title": "Decide: the trip to production",
   "caption": "Nexo works in Nexo Dev. The team must take it to Nexo Prod for real employees. How do they move it?",
   "say": "Your turn. Nexo works well in the Nexo Dev environment. Now the team must take it to Nexo Prod, where real employees will use it. How do they move it? Package it in a managed solution? Rebuild the agent by hand in Prod? Or share the Dev agent with everyone? Decide before I answer. A managed solution. You export it from Dev and import it into Prod. Rebuilding by hand invites mistakes, and Dev is for building, not for real users."
  },
  {
   "title": "Find it in the portals",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">On screen</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot Studio</span><span style=\"text-align:right\">Environment picker in the top bar</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Admin center</span><span style=\"text-align:right\">Manage › Environments</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Power Apps</span><span style=\"text-align:right\">Solutions › New solution + publisher</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Add existing › agent › Export</span></div></div>",
   "caption": "Environment picker in the top bar; admin center lists environments; Power Apps Solutions: new solution, Add existing agent, export unmanaged or managed.",
   "say": "Let's look at it on screen. In Copilot Studio, find the environment picker in the top bar. Switch environments, and the list of agents changes. If you have permission, the Power Platform admin center shows every environment and its type, under Manage, Environments. Then, in the Power Apps portal, open Solutions and create a solution called Nexo, with its publisher. Use Add existing to add the agent, and export it as unmanaged or managed."
  },
  {
   "title": "Three buildings for Nexo",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Nexo's three buildings</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Dev</span><span style=\"text-align:right\">Build, unmanaged solution</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Test</span><span style=\"text-align:right\">Managed import, test data</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Prod</span><span style=\"text-align:right\">Managed import, real data</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Each</span><span style=\"text-align:right\">Own Dataverse, connections, data policies</span></div></div>",
   "caption": "Nexo Dev, Test and Prod: built unmanaged in Dev, moved as a managed solution, each with its own Dataverse, connections and data policies.",
   "say": "Back to week five. Contoso now has three environments: Nexo Dev, Nexo Test and Nexo Prod. Makers build Nexo in Dev, inside a solution called Nexo. When it is ready, they export it as managed, import it into Test, and then into Prod. Each building has its own Dataverse and its own connections, so real data stays in production. An admin sets different data policies for each one. Next: how to test and publish Nexo."
  }
 ],
 "check": [
  {
   "stem": "What is an environment in Power Platform?",
   "options": [
    "A type of connector that links to an external API",
    "A publishing channel for sharing agents with users",
    "A container where apps, agents, and data are kept",
    "A user license that includes Copilot Studio access"
   ],
   "answer": 2,
   "explanation": "An environment is a separate space to store, manage, and share resources with different roles or audiences."
  },
  {
   "stem": "How many Dataverse databases can an environment have?",
   "options": [
    "Exactly five, one for each solution",
    "Unlimited, shared across all environments",
    "Zero or one",
    "One per user, created at sign-in"
   ],
   "answer": 2,
   "explanation": "Each environment can have zero or one Dataverse database."
  },
  {
   "stem": "You want to take your agent from Dev to Prod. What do you use?",
   "options": [
    "A data policy",
    "A solution",
    "Copy and paste the topics by hand",
    "A new channel"
   ],
   "answer": 1,
   "explanation": "Solutions group the agent's components and let you export and import them between environments."
  },
  {
   "stem": "Which version of a solution is normally deployed to Test and Prod?",
   "options": [
    "Unmanaged",
    "The one in the default environment",
    "Managed",
    "None"
   ],
   "answer": 2,
   "explanation": "You edit unmanaged in development and deploy the managed version to the other environments."
  }
 ],
 "reto": {
  "text": "In Copilot Studio, open the environment picker and note which environments you have and of what type.\nIn the Power Apps portal, create a solution called Nexo.\nAdd an agent with Add existing and explore the export option.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/power-platform/admin/environments-overview"
},
{
 "id": "F07",
 "module": 0,
 "title": "Test and publish an agent",
 "level": "basic",
 "minutes": 10,
 "skills": [
  "1.1c"
 ],
 "theory": {
  "intro": "Testing is rehearsing the play on an empty stage; publishing is opening the doors to the public. In Copilot Studio you rehearse with the test pane and the activity map, and you publish to the channels where your users already chat.",
  "sections": [
   {
    "heading": "Test before publishing",
    "body": "The Test your agent panel (test pane) lets you chat with your agent while you build it. You test the version being edited, without publishing. It is the fastest way to see whether the topics work and the conversation flows.\n\nWhen you select a response in the chat, you jump to the topic and the node that generated it; the nodes that ran are marked with a colored checkmark. With Track between topics, the canvas follows the conversation automatically from one topic to the next. Use Reset to forget the test conversation: saving a topic does not clear it.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"6\" y=\"70\" width=\"78\" height=\"50\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"45\" y=\"99.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Edit</text><line x1=\"84\" y1=\"95\" x2=\"96\" y2=\"95\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"96\" y=\"70\" width=\"78\" height=\"50\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"135\" y=\"99.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Test pane</text><line x1=\"174\" y1=\"95\" x2=\"186\" y2=\"95\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"186\" y=\"70\" width=\"78\" height=\"50\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"225\" y=\"99.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Publish</text><line x1=\"264\" y1=\"95\" x2=\"276\" y2=\"95\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"276\" y=\"70\" width=\"78\" height=\"50\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"315\" y=\"99.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Channels</text><text x=\"135\" y=\"142\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">draft</text><text x=\"225\" y=\"142\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">published</text><text x=\"180\" y=\"182\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--muted)\">Unpublished work does not reach users</text></svg>"
   },
   {
    "heading": "Activity map and variables",
    "body": "With generative orchestration, the activity map shows the agent's plan in real time: which topics, tools, or knowledge it chose and in what order. It is your tool for understanding why the agent did something. If you prefer to follow the path step by step, close it or turn off Show activity map when testing.\n\nIn Variables, on the Test tab, you see the value of the variables while you chat. In the three-dot menu you can save a snapshot (a .zip file with diagnostics and the agent's content; it may contain sensitive information) and use Manage connections. The Evaluate icon opens automatic evaluations with test sets.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"80\" y=\"8\" width=\"200\" height=\"30\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"27.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">User message</text><line x1=\"180\" y1=\"38\" x2=\"180\" y2=\"58\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"60\" y=\"58\" width=\"240\" height=\"34\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"180\" y=\"79.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Plan: what to pick and in what order</text><line x1=\"130\" y1=\"92\" x2=\"100\" y2=\"116\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"230\" y1=\"92\" x2=\"260\" y2=\"116\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"20\" y=\"116\" width=\"150\" height=\"34\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"95\" y=\"137.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Knowledge</text><rect x=\"190\" y=\"116\" width=\"150\" height=\"34\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"265\" y=\"137.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Tool: create ticket</text><line x1=\"95\" y1=\"150\" x2=\"150\" y2=\"166\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><line x1=\"265\" y1=\"150\" x2=\"210\" y2=\"166\" stroke=\"var(--muted)\" stroke-width=\"1.5\" marker-end=\"url(#ah)\"/><rect x=\"100\" y=\"166\" width=\"160\" height=\"28\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"184.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Response</text></svg>"
   },
   {
    "heading": "Publish: from draft to production",
    "body": "Publish applies your agent to all connected channels. If you change something and do not publish, users keep seeing the previous version. Publishing can take a few minutes.\n\nConversations in progress are not interrupted: the new content appears when a new session starts, and in most channels a session ends after 30 minutes of inactivity. In Teams you can type start over to restart. With a trial account you can test in the test pane, but you cannot publish."
   },
   {
    "heading": "Channels and authentication",
    "body": "A channel is the place where the user talks to the agent: Teams and Microsoft Copilot, SharePoint, WhatsApp, a website (demo or custom), a mobile app, Facebook, and Azure Bot Service channels (Slack, Telegram, Twilio, email, and others). Administrators can block channels with policies.\n\nBy default it is Authenticate with Microsoft (Teams, SharePoint, Power Apps, and Microsoft Copilot with no extra setup). Authenticate manually is for other channels with sign-in. No authentication lets anyone with the link chat, and it also prevents using tools with the user's credentials. The Demo website is only for stakeholders, not for customers.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><text x=\"180\" y=\"16\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Channels</text><rect x=\"10\" y=\"24\" width=\"160\" height=\"32\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"90\" y=\"44.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Teams and Copilot</text><rect x=\"190\" y=\"24\" width=\"160\" height=\"32\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"270\" y=\"44.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">SharePoint</text><rect x=\"10\" y=\"64\" width=\"160\" height=\"32\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"90\" y=\"84.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Website</text><rect x=\"190\" y=\"64\" width=\"160\" height=\"32\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"270\" y=\"84.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">WhatsApp</text><rect x=\"10\" y=\"104\" width=\"160\" height=\"32\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"90\" y=\"124.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Mobile app</text><rect x=\"190\" y=\"104\" width=\"160\" height=\"32\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"270\" y=\"124.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">Facebook</text><rect x=\"10\" y=\"146\" width=\"340\" height=\"44\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"164.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\" font-weight=\"600\">Azure Bot Service</text><text x=\"180\" y=\"180.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Slack, Telegram, Twilio, email...</text></svg>"
   }
  ],
  "steps": [
   "Open the Test panel (at the top) and type a question to your agent.",
   "Select the agent's response to jump to the node that generated it.",
   "Open the activity map and review the agent's plan if it uses generative orchestration.",
   "Open Variables, Test tab, to see the value of the variables during the conversation.",
   "Select Publish, confirm, and wait for it to finish.",
   "Open Channels, choose a channel (for example Teams and Microsoft Copilot), and follow its wizard.",
   "First test the published version yourself with Open the agent in Teams, before using Make the agent available to others."
  ],
  "example": "The Nexo team finishes the first version. In the test pane they try \"I can't get into my email,\" and with the activity map they see that the agent searched Knowledge and then used the tickets tool, just as they wanted. They notice that one answer came out without a citation, so they adjust the instructions. Then they Publish, open the agent in Teams just for themselves, and test it again. With the green light, they make it available to the IT department and, weeks later, to the whole company. They keep Authenticate with Microsoft, so Teams authenticates each employee with no extra setup.",
  "examTips": [
   "The test pane tests the draft and does not replace testing in a real channel: time-based or inactivity events may not fire there.",
   "If the scenario asks to authenticate each user in Teams, it is Authenticate with Microsoft; No authentication prevents using tools with the user's credentials.",
   "Every time you change the agent you must publish again so the channels see the changes."
  ],
  "glossary": [
   {
    "term": "Test pane",
    "def": "The Test your agent panel, for chatting with the version being edited, without publishing it."
   },
   {
    "term": "Activity map",
    "def": "A real-time view of the agent's plan: which items it chose and in what order."
   },
   {
    "term": "Publish",
    "def": "The action that applies the current version of the agent to all its connected channels."
   },
   {
    "term": "Channel",
    "def": "The platform where the user chats with the agent: Teams, web, mobile, and more."
   },
   {
    "term": "Authentication",
    "def": "How the user is identified: with Microsoft, manually, or with no authentication."
   }
  ]
 },
 "scenes": [
  {
   "title": "The fix nobody sees",
   "caption": "The team fixed Nexo's answer on Friday, but Teams still shows the old one. And a maker wants to share Nexo with everyone, untested.",
   "say": "Week six at Contoso. On Friday, the team fixed Nexo's answer about locked accounts. On Monday, employees in Teams still get the old answer. Meanwhile, an eager maker wants to share Nexo with the whole company, without ever trying it in Teams. Two mistakes from the same gap: not knowing the difference between testing and publishing. Today we rehearse on an empty stage, and then we open the doors."
  },
  {
   "title": "Rehearsal on an empty stage",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Test pane</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tests</span><span style=\"text-align:right\">The draft, without publishing</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Select a reply</span><span style=\"text-align:right\">Jump to its topic and node</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Track between topics</span><span style=\"text-align:right\">Canvas follows the chat</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Reset</span><span style=\"text-align:right\">Clears the test chat (saving does not)</span></div></div>",
   "caption": "The test pane chats with the draft, unpublished. Select a reply to jump to its node. Track between topics follows along. Reset clears the chat.",
   "say": "Testing is the rehearsal. The Test your agent pane lets you chat with the version you are editing, without publishing it. Select one of the agent's replies, and you jump to the topic and the node that produced it. The nodes that ran get a checkmark. Turn on Track between topics, and the canvas follows the conversation. And use Reset to start clean, because saving a topic does not clear the test chat."
  },
  {
   "title": "The activity map",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Activity map</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Shows</span><span style=\"text-align:right\">The plan live: topics, tools, knowledge, order</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Needs</span><span style=\"text-align:right\">Generative orchestration</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Variables</span><span style=\"text-align:right\">Test tab: values while you chat</span></div></div>",
   "caption": "With generative orchestration, the activity map shows the plan live: which topics, tools or knowledge, in what order. Variables shows values.",
   "say": "With generative orchestration, open the activity map. It shows the agent's plan in real time: which topics, tools or knowledge it chose, and in what order. The team types: I can't get into my email. The map shows Knowledge first, then the tickets tool. Exactly the plan they wanted. Next to it, the Variables panel, on its Test tab, shows each variable's value while you chat. When something looks wrong, these two tell you why."
  },
  {
   "title": "Publish: opening the doors",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Publish</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Does</span><span style=\"text-align:right\">Applies the current version to all channels</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Without it</span><span style=\"text-align:right\">Users keep the old version</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Live chats</span><span style=\"text-align:right\">Not cut off; new session gets the update</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Session ends</span><span style=\"text-align:right\">About 30 min without activity</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trial</span><span style=\"text-align:right\">Can test, cannot publish</span></div></div>",
   "caption": "Publish sends the current version to every channel. Until then, users see the old one. Live chats continue; new sessions get the update.",
   "say": "Publishing opens the doors. Publish applies your current version to every connected channel. If you change something and do not publish, users keep the previous version. It can take a few minutes. Conversations in progress are not cut off. The new content arrives when a new session starts, and most channels end a session after thirty minutes without activity. In Teams, a user can type start over. One more limit: a trial account can test, but cannot publish."
  },
  {
   "title": "Decide: the old answer",
   "caption": "The team fixed a topic and saved it. Employees in Teams still get the old answer, even in new chats. What is missing?",
   "say": "Your turn. The team fixed a wrong answer in a topic and saved it. A day later, employees in Teams still get the old answer, even in brand new chats. What is missing? Reset the conversation in the test pane? Publish the agent so channels update? Or wait for the old sessions to expire? Decide before I answer. Publish the agent. Saving only changes the draft. Channels see a change after you publish, and waiting changes nothing."
  },
  {
   "title": "Channels: where users already chat",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Channels</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft</span><span style=\"text-align:right\">Teams and Microsoft Copilot · SharePoint</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Others</span><span style=\"text-align:right\">WhatsApp · website · mobile app · Facebook</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Azure Bot Service</span><span style=\"text-align:right\">Slack · Telegram · Twilio · email</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Demo website</span><span style=\"text-align:right\">Stakeholders only</span></div></div>",
   "caption": "Channels: Teams and Microsoft Copilot, SharePoint, WhatsApp, websites, mobile apps, Facebook, Azure Bot Service channels. Demo website: stakeholders only.",
   "say": "A channel is where people talk to the agent. Teams and Microsoft Copilot. SharePoint. WhatsApp. A website, either the demo site or your own. A mobile app, Facebook, and the Azure Bot Service channels, like Slack, Telegram, Twilio or email. Pick the places where your users already chat. Administrators can block channels with policies. And remember: the demo website is only for showing stakeholders, never for real customers."
  },
  {
   "title": "Who is at the door",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Authentication</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">With Microsoft</span><span style=\"text-align:right\">Default; Teams, SharePoint, Power Apps, Copilot</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Manually</span><span style=\"text-align:right\">Other channels with sign-in</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">None</span><span style=\"text-align:right\">Anyone with the link; no user credentials</span></div></div>",
   "caption": "Authenticate with Microsoft: default, no setup in Teams, SharePoint, Power Apps, Copilot. Manual: other channels. None: anyone with the link, no user credentials.",
   "say": "Every channel needs to know who is at the door. The default is Authenticate with Microsoft. Teams, SharePoint, Power Apps and Microsoft Copilot work with no extra setup. Authenticate manually is for other channels that need a sign in. No authentication lets anyone with the link chat. It also means tools cannot run with each user's own credentials. So for an internal I T helper like Nexo, the default is usually right."
  },
  {
   "title": "Decide: who signs in",
   "caption": "Nexo must identify each employee in Teams and run tools with their own credentials, with no extra setup. Which authentication?",
   "say": "Your turn. In Teams, Nexo must identify each employee and run tools with that person's own credentials. The team wants no extra setup. Which authentication do they choose? Authenticate manually in each channel? No authentication, open to the link? Or authenticate with Microsoft in Teams? Decide before I answer. Authenticate with Microsoft. It works in Teams with no extra setup. Manual is for other channels, and no authentication blocks user credentials."
  },
  {
   "title": "Test, publish, share",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Routine</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Test pane, select reply, activity map, Variables</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Publish, confirm, wait</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Channels › Teams and Microsoft Copilot</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Open the agent in Teams first</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Then Make the agent available to others</span></div></div>",
   "caption": "Test pane, select a reply, activity map, Variables. Publish, confirm. Channels, Teams and Microsoft Copilot. Open in Teams first, then make it available.",
   "say": "Here is the full routine in the studio. Open the Test pane and ask a question. Select the reply to jump to its node. Check the activity map and the Variables tab. Then select Publish, confirm, and wait until it finishes. Open Channels and choose Teams and Microsoft Copilot. First, select Open the agent in Teams and try it yourself. Only then select Make the agent available to others."
  },
  {
   "title": "Opening night",
   "caption": "Fix tested, published, tried in Teams, then shared with IT and later everyone. The test pane never replaces a real channel test.",
   "say": "Back to week six. The team tests the locked account fix in the test pane, and the activity map looks right. They publish, open Nexo in Teams just for themselves, and try again. Green light. They share it with the I T department, and weeks later with the whole company. Remember: the test pane tests the draft and never replaces a real channel. Every change needs a new publish. Next, the exam map."
  }
 ],
 "check": [
  {
   "stem": "Which version of the agent do you use when you chat in the test pane?",
   "options": [
    "The last one exported",
    "The unpublished draft you are editing",
    "The version live in production",
    "The one in the default environment"
   ],
   "answer": 1,
   "explanation": "The test pane works with the current draft, which is why you can test before publishing."
  },
  {
   "stem": "You changed an instruction but did not select Publish. What do users see in Teams?",
   "options": [
    "Nothing, the agent shuts down",
    "The last published version of the agent",
    "The new change immediately, after a refresh",
    "An error message asking them to sign in again"
   ],
   "answer": 1,
   "explanation": "Channels keep using the last published version until you publish again."
  },
  {
   "stem": "What is the activity map for?",
   "options": [
    "To choose the channels for the agent",
    "To change the license type of the agent's users",
    "To see the plan the agent chose and in what order",
    "To export the solution"
   ],
   "answer": 2,
   "explanation": "It shows which topics, tools, or knowledge the agent chose and in what order when it uses generative orchestration."
  },
  {
   "stem": "Which option lets anyone with the link chat with the agent?",
   "options": [
    "Authenticate with Microsoft",
    "No authentication",
    "Authenticate manually",
    "Reset"
   ],
   "answer": 1,
   "explanation": "With No authentication the user is not identified, so it is best to avoid it in internal agents."
  }
 ],
 "reto": {
  "text": "Type three questions in Test and open the activity map on each one.\nSelect Publish and open the agent in Teams (Open the agent in Teams) just for yourself.\nCompare the answer in the test pane with the one in Teams and note the differences.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels"
},
{
 "id": "F08",
 "module": 0,
 "title": "Exam map and glossary",
 "level": "basic",
 "minutes": 8,
 "skills": [],
 "theory": {
  "intro": "The AB-620 exam has three domains with different weights, and this course is organized to follow that map. It is like planning a trip: before you start walking, it helps to know how heavy each stretch is and which words you will need.",
  "sections": [
   {
    "heading": "The exam in a few lines",
    "body": "AB-620 (Designing and Building Integrated AI Solutions in Copilot Studio) earns the Microsoft Certified: AI Agent Builder Associate certification. It lasts 120 minutes, is proctored, and can include interactive components. You pass with 700 points out of 1000.\n\nThat score is scaled: it does not mean answering 70% of the questions correctly. It is offered in several languages, including Spanish, but localized versions are updated about eight weeks after the English version. You can retake it after 24 hours. At the time of writing, the official Practice Assessment is not available yet. During the exam you can open Microsoft Learn, but not its Q&A, Practice Assessments or profile pages; to search, use Ctrl+F on the current page.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><text x=\"180\" y=\"30\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Scaled score</text><rect x=\"20\" y=\"60\" width=\"320\" height=\"24\" rx=\"4\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><rect x=\"20\" y=\"60\" width=\"224\" height=\"24\" rx=\"4\" fill=\"var(--accent)\" opacity=\"0.35\"/><line x1=\"244\" y1=\"52\" x2=\"244\" y2=\"92\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"20\" y=\"108\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--muted)\">0</text><text x=\"340\" y=\"108\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--muted)\">1000</text><text x=\"244\" y=\"124\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--accent)\" font-weight=\"600\">700 = pass</text><text x=\"180\" y=\"156\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">Not the same as 70% correct</text><text x=\"180\" y=\"178\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">120 minutes, proctored</text></svg>"
   },
   {
    "heading": "The three domains and their weights",
    "body": "D1, Plan and configure agent solutions: 30 to 35%. It includes planning the solution, creating and monitoring agent flows, and configuring topics. D2, Integrate and extend agents: 40 to 45%. It covers enterprise knowledge, tools, multi-agent solutions, and Azure services. D3, Test and manage agents: 20 to 25%. It covers evaluation and ALM.\n\nDomain 2 is the heaviest, almost half of the exam. But all three count, and the weights are ranges, so each exam varies.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><text x=\"10\" y=\"22\" text-anchor=\"start\" font-size=\"12\" fill=\"currentColor\">D1 · Plan and configure agent solutions</text><rect x=\"10\" y=\"30\" width=\"195\" height=\"20\" rx=\"4\" fill=\"var(--accent)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"213\" y=\"45\" text-anchor=\"start\" font-size=\"13\" fill=\"var(--muted)\">30-35%</text><text x=\"10\" y=\"82\" text-anchor=\"start\" font-size=\"12\" fill=\"currentColor\">D2 · Integrate and extend agents</text><rect x=\"10\" y=\"90\" width=\"255\" height=\"20\" rx=\"4\" fill=\"var(--accent)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"273\" y=\"105\" text-anchor=\"start\" font-size=\"13\" fill=\"var(--muted)\">40-45%</text><text x=\"10\" y=\"142\" text-anchor=\"start\" font-size=\"12\" fill=\"currentColor\">D3 · Test and manage agents</text><rect x=\"10\" y=\"150\" width=\"135\" height=\"20\" rx=\"4\" fill=\"var(--accent)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"153\" y=\"165\" text-anchor=\"start\" font-size=\"13\" fill=\"var(--muted)\">20-25%</text></svg>"
   },
   {
    "heading": "How this course is organized",
    "body": "The course has eight modules. M0 Fundamentals (this one) gives you the basics. M1 to M3 cover domain 1: planning the solution, advanced topics, and agent flows. M4 to M6 cover domain 2: knowledge and tools, MCP and multi-agent, and Azure and monitoring. M7 covers domain 3: evaluation and ALM.\n\nEach topic has theory, a short video, comprehension questions, and a hands-on challenge. The recommendation is to learn by doing: after each topic, open Copilot Studio and repeat what you saw in your own environment.",
    "visual": "<svg viewBox=\"0 0 360 200\" xmlns=\"http://www.w3.org/2000/svg\" font-size=\"13\" role=\"img\"><defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0L10 5L0 10z\" fill=\"var(--muted)\"/></marker></defs><rect x=\"10\" y=\"8\" width=\"340\" height=\"32\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--accent)\" stroke-width=\"2\"/><text x=\"180\" y=\"28.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">M0 · Fundamentals (you are here)</text><rect x=\"10\" y=\"48\" width=\"340\" height=\"40\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"64.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">D1 · M1 Planning, M2 Topics,</text><text x=\"180\" y=\"80.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">M3 Agent flows</text><rect x=\"10\" y=\"96\" width=\"340\" height=\"52\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"110.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">D2 · M4 Knowledge and tools,</text><text x=\"180\" y=\"126.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">M5 MCP and multi-agent,</text><text x=\"180\" y=\"142.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"var(--muted)\">M6 Azure and monitoring</text><rect x=\"10\" y=\"156\" width=\"340\" height=\"32\" rx=\"8\" fill=\"var(--surface)\" stroke=\"var(--line)\" stroke-width=\"1.5\"/><text x=\"180\" y=\"176.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"currentColor\">D3 · M7 Evaluation and ALM</text></svg>"
   },
   {
    "heading": "Essential glossary",
    "body": "Agent: an AI assistant that chats and acts. Topic: a conversation you design with nodes. Tool: a capability the agent runs. Connector: a wrapper around an API. Knowledge: sources the agent looks up. Orchestration: the decision about what to use for each message.\n\nEnvironment: a Power Platform space with its apps and data. Solution: a container for moving components between environments. Dataverse: the Power Platform database. DLP: the administrator's data policies. Channel: the place where the user chats with the agent. Harness: the engine that runs the agent. Copilot Credits: the unit used to bill agent usage."
   }
  ],
  "steps": [
   "Open the AB-620 study guide on Microsoft Learn and review the skills measured.",
   "Set a target date for the exam; it is scheduled with Pearson VUE.",
   "Order your study by domain, spending more time on D2, which weighs the most.",
   "Get your Copilot Studio lab environment ready.",
   "After each topic, repeat what you learned on screen and note your mistakes."
  ],
  "example": "Valeria, a Contoso developer, wants to get AB-620 certified in two months. She reviews the weights: domain 2 is worth 40 to 45%, so she spends most of her weeks on knowledge, tools, MCP, and multi-agent. She reserves a weekly block for domain 1 and leaves evaluation and ALM for the last weeks, without neglecting them because they add up to 20 to 25%. Every week she builds something with Nexo, the IT help agent, in her lab environment. One week before the exam she reviews the glossary and the questions she missed, and tries the demo exam environment.",
  "examTips": [
   "Study by weight: D2 (40 to 45%) deserves more time, but no domain can be ignored.",
   "700 out of 1000 is a scaled score; do not aim for a percentage of correct answers."
  ],
  "glossary": [
   {
    "term": "Domain",
    "def": "A big area of the exam with a percentage weight: D1 plan and configure, D2 integrate and extend, D3 test and manage."
   },
   {
    "term": "Scaled score",
    "def": "A score converted to a scale of 1 to 1000; you pass with 700, which is not the same as 70% correct."
   },
   {
    "term": "ALM",
    "def": "Application lifecycle management: moving agents between environments with solutions, variables, and pipelines."
   },
   {
    "term": "Proctored",
    "def": "An exam supervised by a proctor, online or at a testing center."
   },
   {
    "term": "Copilot Credits",
    "def": "The consumption unit used to bill agent usage in Copilot Studio."
   }
  ]
 },
 "scenes": [
  {
   "title": "Where do I start?",
   "caption": "Valeria wants AB-620 in two months and faces a long skills list. Before the trip, check how heavy each stretch is.",
   "say": "Meet Valeria, a developer at Contoso. She has watched Nexo grow over the last seven classes, and now she wants the certification herself, in two months. She opens the list of skills measured, and it is long. Where should she start? Think of planning a trip. Before you start walking, you check how heavy each stretch is, and which words you will need on the way. That is today: the exam map and the glossary."
  },
  {
   "title": "The exam in a few lines",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">AB-620</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Earns</span><span style=\"text-align:right\">Microsoft Certified: AI Agent Builder Associate</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Time</span><span style=\"text-align:right\">120 minutes, proctored, interactive parts</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Pass</span><span style=\"text-align:right\">700 / 1000, scaled score</span></div></div>",
   "caption": "AB-620 earns AI Agent Builder Associate. A hundred and twenty minutes, proctored, interactive parts. Pass at seven hundred of a thousand, scaled.",
   "say": "The exam is A B six twenty, Designing and Building Integrated A I Solutions in Copilot Studio. Passing it earns the Microsoft Certified A I Agent Builder Associate. It lasts one hundred and twenty minutes, it is proctored, and it can include interactive parts. You pass with seven hundred points out of one thousand. And that number is a scaled score, which matters more than it seems."
  },
  {
   "title": "The rules of the room",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Rules of the room</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Languages</span><span style=\"text-align:right\">Includes Spanish; local versions ~8 weeks after English</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Retake</span><span style=\"text-align:right\">After 24 hours</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Learn</span><span style=\"text-align:right\">Open, but not Q&A, practice assessments or profile</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Search</span><span style=\"text-align:right\">Ctrl+F on the page</span></div></div>",
   "caption": "Local versions update about eight weeks after English. Retake after a day. Learn opens in the exam, without Q and A or practice pages.",
   "say": "A few rules of the room. The exam comes in several languages, including Spanish, but local versions are updated about eight weeks after the English one. If you fail, you can retake it after twenty four hours. During the exam you can open Microsoft Learn, but not its Q and A, its practice assessments, or profile pages. To search a page, use Control F. Open Learn only for a quick check, because the clock keeps running."
  },
  {
   "title": "Decide: seventy percent",
   "caption": "Valeria gets about seventy percent right in practice. Is that a sure pass with seven hundred?",
   "say": "Your turn. In her practice sessions, Valeria answers about seventy percent of the questions correctly. She thinks: seven hundred out of a thousand, so seventy percent is enough. Is she right? No, seven hundred is a scaled score? Yes, seven hundred means seventy percent? Or only if each domain reaches seventy? Decide before I answer. No. Seven hundred is a scaled score. It does not equal seventy percent correct, so aim well above the line."
  },
  {
   "title": "Three domains, three weights",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Domains</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">D1 Plan and configure</span><span style=\"text-align:right\">30–35 % · planning, agent flows, topics</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">D2 Integrate and extend</span><span style=\"text-align:right\">40–45 % · knowledge, tools, multi-agent, Azure</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">D3 Test and manage</span><span style=\"text-align:right\">20–25 % · evaluation, ALM</span></div></div>",
   "caption": "Domain one, plan and configure: thirty to thirty-five percent. Domain two, integrate and extend: forty to forty-five. Domain three, test and manage: twenty to twenty-five.",
   "say": "Now the map. The exam has three domains. Domain one, plan and configure agent solutions: thirty to thirty five percent. Planning, agent flows and topics. Domain two, integrate and extend agents: forty to forty five percent. Knowledge, tools, multi agent solutions and Azure services. Domain three, test and manage agents: twenty to twenty five percent. Evaluation and A L M. The weights are ranges, so every exam is a little different."
  },
  {
   "title": "Decide: where the weeks go",
   "caption": "Valeria has eight weeks. Where should most of her study time go?",
   "say": "Your turn. Valeria has eight weeks before her exam date. She wants to spend most of them where the exam weighs the most. Where should most of her study time go? Plan and configure: planning and topics? Test and manage: evaluation and A L M? Or integrate and extend: knowledge, tools? Decide before I answer. Integrate and extend. It is forty to forty five percent, almost half. But all three count, so no domain is skipped."
  },
  {
   "title": "How this course follows the map",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Course map</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">M0</span><span style=\"text-align:right\">Fundamentals</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">M1–M3</span><span style=\"text-align:right\">Domain 1</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">M4–M6</span><span style=\"text-align:right\">Domain 2</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">M7</span><span style=\"text-align:right\">Domain 3</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Each topic</span><span style=\"text-align:right\">Theory · video · questions · challenge</span></div></div>",
   "caption": "Module zero: fundamentals. Modules one to three: domain one. Four to six: domain two. Seven: domain three. Every topic: theory, video, questions, challenge.",
   "say": "This course follows the same map. Module zero, the one you are finishing, gives you the basics. Modules one to three cover domain one: planning, advanced topics and agent flows. Modules four to six cover domain two: knowledge and tools, M C P and multi agent, and Azure and monitoring. Module seven covers domain three: evaluation and A L M. Every topic has theory, a video, questions, and a hands on challenge."
  },
  {
   "title": "Words so far: the agent",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Glossary: the agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent</span><span style=\"text-align:right\">AI assistant that chats and acts</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topic</span><span style=\"text-align:right\">Conversation designed with nodes</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tool</span><span style=\"text-align:right\">Capability the agent runs</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connector</span><span style=\"text-align:right\">Wrapper around an API</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">Sources the agent looks up</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Orchestration</span><span style=\"text-align:right\">Deciding what to use per message</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Harness</span><span style=\"text-align:right\">Engine that runs the agent</span></div></div>",
   "caption": "Agent, topic, tool, connector, knowledge, orchestration, harness: the words from Nexo's first classes.",
   "say": "Now the glossary, looking back at Nexo. An agent is an A I assistant that chats and acts. A topic is a conversation you design with nodes. A tool is a capability the agent runs. A connector is a wrapper around an A P I. Knowledge is the sources the agent looks up. Orchestration is the decision about what to use for each message. And the harness is the engine that runs the agent."
  },
  {
   "title": "Words so far: where it lives",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Glossary: where it lives</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Environment</span><span style=\"text-align:right\">Power Platform space with apps and data</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Solution</span><span style=\"text-align:right\">Container to move components</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Dataverse</span><span style=\"text-align:right\">Power Platform database</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">DLP</span><span style=\"text-align:right\">Admin data policies</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Channel</span><span style=\"text-align:right\">Where users chat with the agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot Credits</span><span style=\"text-align:right\">Billing unit for agent usage</span></div></div>",
   "caption": "Environment, solution, Dataverse, data policies, channel, Copilot Credits: where Nexo lives, travels, and talks.",
   "say": "And the words about where Nexo lives. An environment is a Power Platform space with its apps and data. A solution is the container that moves components between environments. Dataverse is the Power Platform database. D L P means the administrator's data policies. A channel is where the user chats with the agent. And Copilot Credits are the unit used to bill agent usage."
  },
  {
   "title": "Valeria's plan",
   "caption": "Study guide, a date with Pearson VUE, most weeks on domain two, a lab environment, and Nexo rebuilt after every topic. Next: module one.",
   "say": "Back to Valeria. She opens the study guide and books a date with Pearson VUE. Most of her weeks go to domain two, with a weekly block for domain one, and evaluation and A L M in the last weeks. Her lab environment is ready, and after every topic she rebuilds a piece of Nexo herself. One week before the exam, she reviews this glossary and her mistakes. Module zero is done. Next, module one: planning the solution."
  }
 ],
 "check": [
  {
   "stem": "Which AB-620 domain has the greatest weight?",
   "options": [
    "All weigh the same",
    "D1, Plan and configure agent solutions",
    "D3, Test and manage agents",
    "D2, Integrate and extend agents"
   ],
   "answer": 3,
   "explanation": "D2 weighs 40 to 45%, the highest range of the three domains."
  },
  {
   "stem": "What is the passing score for AB-620?",
   "options": [
    "700 out of 1000 points, as a scaled score",
    "800 out of 1000 points, on a scale",
    "500 out of 1000 points",
    "70% of the questions answered correctly"
   ],
   "answer": 0,
   "explanation": "You pass with 700 out of 1000; it is a scaled score, not a percentage of correct answers."
  },
  {
   "stem": "In which course module are evaluation and ALM studied?",
   "options": [
    "M2",
    "M4",
    "M0",
    "M7"
   ],
   "answer": 3,
   "explanation": "M7, Evaluation and ALM, matches domain 3 (test and manage agents)."
  },
  {
   "stem": "How long is the AB-620 exam?",
   "options": [
    "120 minutes",
    "240 minutes",
    "90 minutes",
    "60 minutes"
   ],
   "answer": 0,
   "explanation": "The exam lasts 120 minutes and is proctored."
  }
 ],
 "reto": {
  "text": "Open the AB-620 study guide and compare its domains with this course's map.\nWrite in your own words what ten glossary terms mean.\nPick a tentative exam date and split your weeks by domain.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-620"
}
);
