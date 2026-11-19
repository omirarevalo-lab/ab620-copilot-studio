// AB-620 course, modules 1-3, English. Built by tools/en/assemble.mjs.
window.AB620_COURSE = window.AB620_COURSE || [];
window.AB620_COURSE.push(
{
 "id": "L01",
 "module": 1,
 "title": "Integrate with enterprise systems",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "1.1a"
 ],
 "theory": {
  "intro": "An agent that only chats is like an employee with no phone and no computer: it can talk, but it can't do anything in your systems. Integration \"bridges\" give it hands to read, create, and update data. Learning to pick the right bridge is the base of every solution.",
  "sections": [
   {
    "heading": "The available bridges",
    "body": "Copilot Studio offers several paths: Power Platform connectors (already built for well-known services), custom connectors, the REST API tool, MCP servers, Agent flows (flows built inside Copilot Studio), and Computer use. All of them show up as Tools, the things your agent can use.",
    "visual": "<svg viewBox=\"0 0 360 110\" role=\"img\" aria-label=\"Agent → Bridge (tool) → Contoso system\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\"/><text x=\"54\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agent</text><line x1=\"108\" y1=\"39\" x2=\"122\" y2=\"39\"/><polygon points=\"126,39 119,35.5 119,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"128\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"180\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Bridge</text><text x=\"180\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(tool)</text><line x1=\"234\" y1=\"39\" x2=\"248\" y2=\"39\"/><polygon points=\"252,39 245,35.5 245,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"254\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\"/><text x=\"306\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Contoso</text><text x=\"306\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">system</text><text x=\"180\" y=\"94\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Without a bridge, the agent only chats</text></svg>"
   },
   {
    "heading": "The question that sorts everything",
    "body": "Ask yourself: does the system expose an API? If a connector already exists, use it. If you have an OpenAPI file, use the REST API tool or a custom connector. If the system speaks the MCP protocol, connect it as an MCP server. If it only has a screen and no API, the answer is Computer use.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Which tool do I choose</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">A connector exists</span><span style=\"text-align:right\">Power Platform connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">An OpenAPI file exists</span><span style=\"text-align:right\">REST API / custom connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Speaks the MCP protocol</span><span style=\"text-align:right\">MCP server</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Has only a screen</span><span style=\"text-align:right\">Computer use</span></div></div>"
   },
   {
    "heading": "Trade-offs and the order to choose",
    "body": "Work down this order. Use a prebuilt connector first: it needs no development, but large result sets slow the answer. If there is no connector and several agents need the same API, build a custom connector: you can reuse it, but it is extra work for a single use. For a one-off API in a non-production test, use a REST API tool (preview). It works only inside Copilot Studio, not in Power Automate, Power Apps, or Logic Apps. For steps that must run in order, with human approval, use an agent flow. For a central tool server shared by many agents, use MCP.\n\nEach choice has a cost. Agent flows depend on API rate limits, need explicit error paths, have size limits on the response sent back to the agent, and use Copilot Credits. MCP needs generative orchestration, topics can't call it, and the tool descriptions are set on the server. For a prototype or a single agent, a connector or REST API tool is faster. The Send HTTP request node is quick for one call, but you can't share it. Bot Framework skills reuse existing pro-code components as topic nodes, but they need C# development, Azure AI Bot Service costs, and sit outside Power Platform ALM.\n\nTools are for doing things. Knowledge sources are for answering questions. One knowledge type is Unstructured data: files from OneDrive or SharePoint that are synced and vector-indexed in Dataverse, plus third-party knowledge base articles that arrive through Power Platform connectors."
   },
   {
    "heading": "MCP and Computer use in detail",
    "body": "MCP is an open protocol: the same server can be used by Copilot Studio and by other AI clients. In Copilot Studio the transport must be Streamable HTTP; SSE is no longer supported.\n\nComputer use operates websites and desktop apps with vision and reasoning, as if a person were looking at the screen. Both require generative orchestration, and Computer use costs 5 Copilot Credits per step with standard models."
   },
   {
    "heading": "The orchestrator picks by description",
    "body": "When the agent decides which tool to use, it reads the tool's name and description. A vague description makes it choose badly or choose nothing. Write them as if you were explaining to a new teammate what each tool is for."
   }
  ],
  "steps": [
   "Open your agent in Copilot Studio.",
   "Go to the Tools tab and select Add a tool.",
   "Look at the categories: connectors, MCP, REST API, flows, and Computer use.",
   "Pick the bridge that fits the system (for example, REST API if you have an OpenAPI file).",
   "Write a name and a clear description so the orchestrator knows when to use it.",
   "Create or select the connection and select Add to agent.",
   "Test the tool in the test panel."
  ],
  "example": "Contoso wants to record invoices in an old desktop program that has no API, so it uses Computer use, which operates the screen with vision. To check inventory, which does have an OpenAPI specification, it uses a REST API tool. And because other AI clients in the company also need those tools, it also exposes them as an MCP server. This way every system gets the bridge it really needs.",
  "examTips": [
   "If the scenario says the application has only a graphical interface, with no API and no database, the answer is Computer use.",
   "Trap: choosing a custom connector, REST API, or MCP. All three assume an API or an MCP server.",
   "MCP and Computer use require generative orchestration; SSE is no longer supported for MCP.",
   "Order of choice: prebuilt connector; custom connector if several agents share the API; REST API tool for a one-off; agent flow for fixed steps or approvals; MCP for a shared tool server."
  ],
  "glossary": [
   {
    "term": "Tool",
    "def": "A capability the agent can use to act outside the conversation: a connector, flow, API, MCP server, or Computer use."
   },
   {
    "term": "MCP",
    "def": "Model Context Protocol: an open protocol for exposing tools and resources to different AI clients."
   },
   {
    "term": "Computer use",
    "def": "A tool that operates websites or desktop apps by looking at the screen with vision and reasoning."
   },
   {
    "term": "OpenAPI",
    "def": "A standard file that describes the operations of an API. It is used to create a REST API tool or a custom connector."
   },
   {
    "term": "Bot Framework skill",
    "def": "A reusable pro-code component built with the Bot Framework SDK. You register it in Copilot Studio and call it as a node in a topic."
   }
  ]
 },
 "scenes": [
  {
   "title": "Three systems, three bridges",
   "caption": "Module one. Contoso asks Nexo for three new jobs: invoices in an old program, live inventory, and tools other AI clients can share.",
   "say": "Module one begins, and Valeria is now building Nexo herself. Contoso asks for three new jobs. Record invoices in an old desktop program that has no A P I. Check live inventory in a system with an OpenAPI file. And share those tools with other A I clients in the company. Three systems, three very different doors. Today you learn to pick the right bridge for each one, the base of every solution."
  },
  {
   "title": "The bridges",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The bridges</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connectors</span><span style=\"text-align:right\">Prebuilt, for well-known services</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Custom connectors</span><span style=\"text-align:right\">You build them</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">REST API tool</span><span style=\"text-align:right\">From an OpenAPI file</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">MCP servers</span><span style=\"text-align:right\">Open protocol tool servers</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent flows</span><span style=\"text-align:right\">Built inside Copilot Studio</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Computer use</span><span style=\"text-align:right\">Operates the screen</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">All appear under Tools</span></div></div>",
   "caption": "Bridges: Power Platform connectors, custom connectors, REST API tool, MCP servers, agent flows, computer use. All of them appear as Tools.",
   "say": "An agent that only chats is like an employee with no phone and no computer. Integration bridges give it hands to read, create and update data. Copilot Studio offers six: Power Platform connectors, already built for well known services. Custom connectors. The REST A P I tool. M C P servers. Agent flows, built inside Copilot Studio. And computer use. All of them show up in one place: Tools."
  },
  {
   "title": "The question that sorts everything",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Does it have an API?</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connector exists</span><span style=\"text-align:right\">Use it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">OpenAPI file</span><span style=\"text-align:right\">REST API tool or custom connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Speaks MCP</span><span style=\"text-align:right\">MCP server</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Screen only</span><span style=\"text-align:right\">Computer use</span></div></div>",
   "caption": "Does the system expose an API? Connector exists: use it. OpenAPI file: REST API tool or custom connector. MCP: MCP server. Screen only: computer use.",
   "say": "One question sorts almost every case: does the system expose an A P I? If a connector already exists, use it. If you have an OpenAPI file, use the REST A P I tool or a custom connector. If the system speaks the M C P protocol, connect it as an M C P server. And if it only has a screen, with no A P I at all, the answer is computer use."
  },
  {
   "title": "The order to choose",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Order of choice</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Prebuilt connector (large results are slow)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Custom connector if several agents share the API</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">REST API tool: one-off test, preview, Copilot Studio only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Agent flow: ordered steps, human approval</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">MCP: shared tool server</span></div></div>",
   "caption": "Order: prebuilt connector, custom connector for a shared API, REST API tool for a one-off test, agent flow for ordered steps, MCP server.",
   "say": "When several bridges could work, go down this order. A prebuilt connector first: no development, though large results slow the answer. No connector, and several agents need the same A P I? Build a custom connector you can reuse. A one off A P I in a test? The REST A P I tool, which is in preview and works only inside Copilot Studio. Steps that must run in order, with human approval: an agent flow. A central tool server for many agents: M C P."
  },
  {
   "title": "Decide: the shared inventory API",
   "caption": "The inventory API has an OpenAPI file. Three agents and a Power Automate flow need it. Which bridge?",
   "say": "Your turn. Contoso's inventory system has an OpenAPI file, but no ready connector. Three different agents need it, and a Power Automate flow needs it too. Which bridge do they build? A REST A P I tool inside each agent? A custom connector they all share? Or a Send H T T P request node per topic? Decide before I answer. A custom connector. Many agents share it, and it also works in Power Automate. The REST A P I tool lives only inside Copilot Studio."
  },
  {
   "title": "Every bridge has a price",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Costs</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent flows</span><span style=\"text-align:right\">Rate limits, error paths, response size, credits</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">MCP</span><span style=\"text-align:right\">Generative only, not from topics, descriptions on server</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Send HTTP request</span><span style=\"text-align:right\">Quick, not shareable</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Bot Framework skills</span><span style=\"text-align:right\">C#, Azure costs, outside Power Platform ALM</span></div></div>",
   "caption": "Agent flows: rate limits, error paths, response size, credits. MCP: generative only, not from topics. HTTP node: not shareable. Bot Framework skills: C#, outside ALM.",
   "say": "Every bridge has a price. Agent flows depend on A P I rate limits, need explicit error paths, limit the size of the response sent back, and use Copilot Credits. M C P needs generative orchestration, topics cannot call it, and the tool descriptions are set on the server. The Send H T T P request node is quick for one call, but you cannot share it. And Bot Framework skills reuse pro code, but need C sharp, Azure costs, and sit outside Power Platform A L M."
  },
  {
   "title": "MCP and computer use",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">MCP and computer use</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">MCP</span><span style=\"text-align:right\">Open protocol, many AI clients</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Transport</span><span style=\"text-align:right\">Streamable HTTP; SSE not supported</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Computer use</span><span style=\"text-align:right\">Vision and reasoning on sites and apps</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Both</span><span style=\"text-align:right\">Need generative orchestration</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Cost</span><span style=\"text-align:right\">Computer use: 5 credits per step (standard)</span></div></div>",
   "caption": "MCP: open protocol, same server for many AI clients, Streamable HTTP only. Computer use: vision on websites and apps. Both need generative orchestration.",
   "say": "Two bridges deserve a closer look. M C P is an open protocol, so the same server can serve Copilot Studio and other A I clients. In Copilot Studio its transport must be Streamable H T T P. The older S S E transport is no longer supported. Computer use operates websites and desktop apps with vision and reasoning, as if a person were looking at the screen. Both need generative orchestration. Computer use costs five Copilot Credits per step with standard models."
  },
  {
   "title": "Decide: the silent MCP tools",
   "caption": "An agent with classic orchestration gets an MCP server. The maker wants a topic to call its tools, but they never run. What must change?",
   "say": "Your turn. A maker connects an M C P server to an agent that still uses classic orchestration. They want a topic to call its tools, but the tools never run. What must change? Call the M C P tools from inside a topic? Switch the server transport to S S E? Or switch to generative orchestration? Decide before I answer. Switch to generative orchestration. M C P only works when the agent plans for itself. Topics cannot call it, and S S E is no longer supported."
  },
  {
   "title": "Doing, answering, describing",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Doing vs answering</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tools</span><span style=\"text-align:right\">Do things</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge</span><span style=\"text-align:right\">Answer questions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Unstructured data</span><span style=\"text-align:right\">OneDrive/SharePoint files indexed in Dataverse; KB articles via connectors</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Descriptions</span><span style=\"text-align:right\">The orchestrator picks by name and description</span></div></div>",
   "caption": "Tools do; knowledge answers, including unstructured data indexed in Dataverse. The orchestrator picks a tool by its name and description.",
   "say": "Keep two ideas apart. Tools are for doing things. Knowledge is for answering questions. One knowledge type is unstructured data: files from OneDrive or SharePoint, synced and vector indexed in Dataverse, plus third party articles that arrive through connectors. And when the agent picks a tool, it reads the tool's name and description. A vague description makes it choose badly, or choose nothing. Write it as if you were explaining the tool to a new teammate."
  },
  {
   "title": "Decide: the old invoice program",
   "caption": "Invoices live in an old desktop program with no API and no database access. Nexo must record each invoice. Which bridge?",
   "say": "Your turn. Contoso records invoices in an old desktop program. It has no A P I and nobody can reach its database, but Nexo must type each new invoice into it. Which bridge fits? Computer use, working its screen? A custom connector to the program? Or an M C P server running on the program? Decide before I answer. Computer use. There is only a screen, so Nexo works it with vision. A connector and M C P both assume an A P I."
  },
  {
   "title": "Add a tool in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Tools › Add a tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Categories: connectors, MCP, REST API, flows, computer use</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Pick the bridge, clear name and description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Connection › Add to agent › test</span></div></div>",
   "caption": "Tools, Add a tool, look at the categories, pick the bridge, write a clear name and description, create the connection, Add to agent, test.",
   "say": "Here is how it looks in the studio. Open Nexo and go to the Tools tab. Select Add a tool and look at the categories: connectors, M C P, REST A P I, flows, and computer use. Pick the bridge that fits the system. For inventory, that is REST A P I with the OpenAPI file. Write a clear name and description. Create or select the connection, select Add to agent, and try it in the test pane."
  },
  {
   "title": "Every system, its bridge",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Contoso's bridges</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Invoices</span><span style=\"text-align:right\">Computer use (no API)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Inventory</span><span style=\"text-align:right\">REST API tool (OpenAPI)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Other AI clients</span><span style=\"text-align:right\">Same tools as an MCP server</span></div></div>",
   "caption": "Invoices: computer use. Inventory: REST API tool. Shared with other AI clients: an MCP server. Each system gets the bridge it needs.",
   "say": "Back to Valeria's three jobs. The old invoice program gets computer use, which works its screen with vision. Inventory, with its OpenAPI file, gets a REST A P I tool. And because other A I clients in Contoso need the same tools, the team also exposes them as an M C P server. Remember the question: does it have an A P I? Then follow the order. Next, who the agent is when it reaches those systems: identity and authentication."
  }
 ],
 "check": [
  {
   "stem": "An old desktop application has only a screen and exposes no API. Which bridge do you use?",
   "options": [
    "MCP server",
    "REST API",
    "Custom connector",
    "Computer use"
   ],
   "answer": 3,
   "explanation": "Computer use operates the screen with vision and reasoning, with no need for an API. The other three assume an API or an MCP server."
  },
  {
   "stem": "How much does each Computer use step cost with standard models?",
   "options": [
    "2 Copilot Credits",
    "5 Copilot Credits",
    "1 Copilot Credit",
    "13 Copilot Credits"
   ],
   "answer": 1,
   "explanation": "Computer use uses the agent action rate: 5 Copilot Credits per step with standard models."
  },
  {
   "stem": "Which transport does Copilot Studio support for MCP servers?",
   "options": [
    "FTP, the file protocol",
    "Streamable HTTP transport",
    "SSE, Server-Sent Events",
    "Email, using SMTP"
   ],
   "answer": 1,
   "explanation": "Only Streamable HTTP. SSE is no longer supported."
  },
  {
   "stem": "What does the orchestrator look at to choose a tool?",
   "options": [
    "The user's language and location",
    "Its name and description",
    "The time of day and the channel used",
    "Its color and icon in the Tools list"
   ],
   "answer": 1,
   "explanation": "The orchestrator chooses tools by name and description, so you need to write them well."
  }
 ],
 "reto": {
  "text": "Open an agent and go to Tools, Add a tool.\nLook at the categories: connectors, MCP, REST API, Computer use.\nFor three imaginary systems from your work, note which bridge you would use and why.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
},
{
 "id": "L02",
 "module": 1,
 "title": "Identity and authentication",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "1.1b"
 ],
 "theory": {
  "intro": "Authentication answers a simple question: who is talking to my agent? It is like the door of a building: you can leave it open, use the company's access control, or fit your own lock. A wrong choice lets strangers in or locks your users out.",
  "sections": [
   {
    "heading": "The three paths",
    "body": "There are three options. No authentication: anyone with the link can chat. Authenticate with Microsoft: Copilot Studio sets up Microsoft Entra ID automatically. Authenticate manually: you set up a provider yourself, for example generic OAuth 2, for users without a Microsoft account.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">User</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Channel</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Entra ID</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">or OAuth 2</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agent</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Identity travels with the conversation</text></svg>"
   },
   {
    "heading": "Authenticate with Microsoft",
    "body": "This is the simplest option. In Teams the user is already identified, so they never even see a sign-in screen. The Teams and Microsoft 365 channels only support this option."
   },
   {
    "heading": "Authenticate manually",
    "body": "Use this when your users don't have a Microsoft account, for example customers of your own portal. You set up a generic OAuth 2 provider. This makes variables available such as User.Id, User.DisplayName, User.AccessToken, and User.IsLoggedIn.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Authentication</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams (employees)</span><span style=\"text-align:right\">Authenticate with Microsoft</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Customer portal</span><span style=\"text-align:right\">Authenticate manually, OAuth 2</span></div></div>"
   },
   {
    "heading": "Why it matters",
    "body": "Identity travels with the conversation. Thanks to it, the agent can show data for the right user or call tools with their permissions. Leaving No authentication on an agent that touches internal data is the classic mistake."
   },
   {
    "heading": "Entra Agent ID: the agent's own identity",
    "body": "People have an identity, and since May 2026 every new agent has one too. When you create an agent, Copilot Studio automatically creates a Microsoft Entra Agent ID for it. You cannot turn this off for an environment, and you cannot bring your own. The ID is created when the agent is created, not when you publish it.\n\nAn Agent ID is a service principal with the \"Agent\" subtype. The OAuth sign-in flow underneath is the same as before, so nothing changes for your users. What changes is governance. Admins can see the agent in the Microsoft Entra admin center, read its audit logs, manage its life cycle, and target its connector permissions with Conditional Access policies. You find the ID in Settings, Advanced, Metadata.\n\nAgents made in Agent Builder do not use app registration IDs or Agent IDs. Each Agent ID is a directory object, so if the tenant is at its quota, the new agent cannot be created."
   }
  ],
  "steps": [
   "Open your agent and go to Settings.",
   "Go to the Security section and select Authentication.",
   "Choose an option: No authentication, Authenticate with Microsoft, or Authenticate manually.",
   "If you choose manual, fill in the OAuth 2 provider details.",
   "Save your changes.",
   "Publish the agent so the change reaches the channels.",
   "Check in a topic which User variables are available."
  ],
  "example": "The Contoso IT support agent lives in Teams, so it uses Authenticate with Microsoft and nobody sees a sign-in. The Contoso customer portal uses its own accounts, so it uses Authenticate manually with OAuth 2. With authentication turned on, the topic can greet people with User.DisplayName and look up orders for the right user. Each audience gets the door that fits it.",
  "examTips": [
   "Teams and Microsoft 365 only support Authenticate with Microsoft.",
   "Non-Microsoft accounts: Authenticate manually with generic OAuth 2.",
   "Trap: choosing No authentication for simplicity on an agent that accesses internal data.",
   "Copilot Studio creates a Microsoft Entra Agent ID automatically for each new agent, when the agent is created (not at publish). Since May 2026 there is no environment-level opt out.",
   "The Agent ID adds governance (Entra audit logs, life cycle, Conditional Access on connector permissions). The OAuth flow stays the same, and Agent Builder agents do not use Agent IDs."
  ],
  "glossary": [
   {
    "term": "Microsoft Entra ID",
    "def": "Microsoft's identity service that verifies who each user is."
   },
   {
    "term": "OAuth 2",
    "def": "An authorization standard that lets you sign in with an identity provider without sharing your password."
   },
   {
    "term": "User.AccessToken",
    "def": "A variable that holds the user's access token. It exists with manual authentication."
   }
  ]
 },
 "scenes": [
  {
   "title": "Who is talking to your agent?",
   "caption": "Two agents, two audiences: employees in Teams, customers on a web portal.",
   "say": "Contoso builds two agents this week. The first one helps employees with I T support, inside Teams. The second one helps customers track their orders on the company's web portal, and those customers have no Microsoft account. In a hurry, the maker leaves both on No authentication. One question decides whether this is fine or a disaster: who is talking to your agent? By the end of this class you will choose the right answer for each one."
  },
  {
   "title": "Three kinds of door",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three doors</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">No authentication</span><span style=\"text-align:right\">Open door</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authenticate with Microsoft</span><span style=\"text-align:right\">Company badge (Entra ID)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authenticate manually</span><span style=\"text-align:right\">Your own lock (OAuth 2)</span></div></div>",
   "caption": "No authentication = open door. Microsoft = company badge. Manual = your own lock.",
   "say": "Here is the picture to keep. Authentication is the door of a building. You can leave the door open, so anyone walks in. You can use the company's badge reader, so only employees get in. Or you can fit your own lock, with keys you hand out yourself. A wrong door either lets strangers in, or locks your real users out. Copilot Studio gives you exactly these three doors."
  },
  {
   "title": "No authentication: the open door",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">No authentication</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who can chat</span><span style=\"text-align:right\">Anyone with the link</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Classic mistake</span><span style=\"text-align:right\">Used on internal data</span></div></div>",
   "caption": "Anyone with the link can chat. Fine only when no internal data is involved.",
   "say": "The first door is No authentication. Anyone who has the link can chat with the agent, and the agent has no idea who they are. That can be fine for a public agent that only answers general questions. But leaving No authentication on an agent that touches internal data is the classic mistake. The link gets shared, and strangers now talk to an agent that knows your company's secrets."
  },
  {
   "title": "Authenticate with Microsoft: the badge",
   "caption": "Copilot Studio sets up Microsoft Entra ID automatically. In Teams, no sign-in screen.",
   "say": "The second door is Authenticate with Microsoft. It is the simplest secure option, because Copilot Studio sets up Microsoft Entra I D for you automatically. Entra I D is Microsoft's identity service, the badge reader that checks who each person is. And in Teams the user is already identified, so they never even see a sign-in screen. They just start chatting, and the agent knows who they are."
  },
  {
   "title": "The channel rule",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Channel rule</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams</span><span style=\"text-align:right\">Authenticate with Microsoft only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft 365</span><span style=\"text-align:right\">Authenticate with Microsoft only</span></div></div>",
   "caption": "Teams and Microsoft 365 channels support only Authenticate with Microsoft.",
   "say": "Now a rule the exam loves. The Teams channel and the Microsoft three six five channel only support Authenticate with Microsoft. Not manual authentication, and not your own provider. So if the agent must live in Teams, the door is already chosen for you. Keep this in mind, because the exam often hides the channel inside a long scenario and expects you to spot it."
  },
  {
   "title": "Decide: the Teams helpdesk",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Teams helpdesk</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Audience</span><span style=\"text-align:right\">Employees in Teams</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Answer</span><span style=\"text-align:right\">Authenticate with Microsoft</span></div></div>",
   "caption": "An IT support agent for employees, published in Teams. Which authentication option?",
   "say": "Your turn. The I T support agent is for Contoso employees, and it will be published in Teams. Which authentication option should the maker choose? Authenticate with Microsoft? Authenticate manually with a generic OAuth two provider? Or No authentication, since everyone in Teams is an employee anyway? Decide before I answer. Authenticate with Microsoft. Teams only supports that option, and employees are signed in without ever seeing a screen."
  },
  {
   "title": "Authenticate manually: your own lock",
   "caption": "Users without a Microsoft account: set up a provider yourself, such as generic OAuth 2.",
   "say": "The third door is Authenticate manually. You use it when your users do not have a Microsoft account, for example the customers of your own web portal. You set up an identity provider yourself, such as a generic OAuth two provider. OAuth two is a standard that lets people sign in through an identity provider without sharing their password with your agent. It is your own lock, with your own keys."
  },
  {
   "title": "The user variables",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">User variables</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">User.Id</span><span style=\"text-align:right\">Who it is</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">User.DisplayName</span><span style=\"text-align:right\">Name</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">User.IsLoggedIn</span><span style=\"text-align:right\">Signed in?</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">User.AccessToken</span><span style=\"text-align:right\">Manual authentication</span></div></div>",
   "caption": "User.Id, User.DisplayName, User.AccessToken, User.IsLoggedIn.",
   "say": "Once a door checks people, the agent gets variables about the user. User dot I D identifies them. User dot display name gives their name, so a topic can greet them. User dot is logged in tells you whether sign-in happened. And User dot access token holds their access token, which exists with manual authentication. You can check in any topic which of these variables are available."
  },
  {
   "title": "Identity travels with the conversation",
   "caption": "The agent can show the right user's data and call tools with their permissions.",
   "say": "Why does all this matter? Because identity travels with the whole conversation. Thanks to it, the agent can look up orders for the right customer, not for somebody else. And it can call tools with that user's own permissions, so people only reach what they are allowed to reach. Without identity, the agent cannot tell one person from another, so it cannot protect anyone's data."
  },
  {
   "title": "Decide: the customer portal",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Customer portal</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Users</span><span style=\"text-align:right\">No Microsoft account</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Answer</span><span style=\"text-align:right\">Authenticate manually, generic OAuth 2</span></div></div>",
   "caption": "Customers sign in with the portal's own accounts, not Microsoft accounts. Which option?",
   "say": "Your turn. The order tracking agent lives on Contoso's customer portal. Customers sign in with the portal's own accounts, and they have no Microsoft account. Which option fits? No authentication, because it is a public website? Authenticate with Microsoft, because it is the simplest secure choice? Or Authenticate manually with a generic OAuth two provider? Decide before I answer. Authenticate manually. These users have no Microsoft account, so you bring your own provider."
  },
  {
   "title": "Entra Agent ID: the agent's own badge",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Entra Agent ID</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Created</span><span style=\"text-align:right\">Automatically, when the agent is created</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Opt out</span><span style=\"text-align:right\">None (since May 2026)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Bring your own</span><span style=\"text-align:right\">No</span></div></div>",
   "caption": "Every new agent gets a Microsoft Entra Agent ID automatically, when it is created.",
   "say": "People have an identity, and now agents do too. Since May twenty twenty six, when you create an agent, Copilot Studio automatically creates a Microsoft Entra Agent I D for it. It happens when the agent is created, not when you publish it. You cannot turn this off for an environment, and you cannot bring your own I D. Think of it as the agent getting its own employee badge on day one."
  },
  {
   "title": "What the Agent ID changes",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">What changes</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Users</span><span style=\"text-align:right\">Same OAuth flow</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Admins</span><span style=\"text-align:right\">Entra admin center, audit logs, life cycle, Conditional Access</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Find it</span><span style=\"text-align:right\">Settings › Advanced › Metadata</span></div></div>",
   "caption": "Same sign-in flow for users. New governance for admins: logs, life cycle, Conditional Access.",
   "say": "An Agent I D is a service principal with the subtype Agent. The OAuth sign-in flow underneath stays the same, so nothing changes for your users. What changes is governance. Admins can see the agent in the Microsoft Entra admin center, read its audit logs, manage its life cycle, and target its connector permissions with Conditional Access policies. Makers find the I D in Settings, Advanced, Metadata."
  },
  {
   "title": "Two limits to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Limits</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent Builder agents</span><span style=\"text-align:right\">No Agent ID</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Directory quota reached</span><span style=\"text-align:right\">Agent cannot be created</span></div></div>",
   "caption": "Agent Builder agents have no Agent ID. A tenant at its directory quota blocks new agents.",
   "say": "Two limits to remember. First, agents made in Agent Builder do not use app registration I Ds or Agent I Ds. Only Copilot Studio agents get them. Second, every Agent I D is a directory object. So if the tenant has reached its directory object quota, the new agent cannot be created at all. On the exam, an agent that fails to be created can point to this quota."
  },
  {
   "title": "Decide: when is the badge issued?",
   "caption": "When does Copilot Studio create the Microsoft Entra Agent ID?",
   "say": "Your turn. A maker says: I will worry about the Agent I D later, it only appears when I publish. When does Copilot Studio really create the Microsoft Entra Agent I D? When the agent is published to its first channel? Only after an admin enables it for the environment? Or when the agent is created? Decide before I answer. When the agent is created. It is automatic, and there is no environment opt out."
  },
  {
   "title": "Where you set it up",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Settings › Security › Authentication</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Choose an option</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Save, then Publish</span></div></div>",
   "caption": "Settings · Security · Authentication · choose · Save · Publish.",
   "say": "Here are the steps. Open your agent and go to Settings. In the Security section, select Authentication. Choose No authentication, Authenticate with Microsoft, or Authenticate manually. If you choose manual, fill in the OAuth two provider details. Save your changes. Then publish the agent, because the change only reaches the channels after you publish. Finally, check in a topic which user variables are available."
  },
  {
   "title": "Two doors, chosen",
   "caption": "Teams helpdesk: Microsoft. Customer portal: manual OAuth 2. Never open on internal data.",
   "say": "Back to Contoso. The I T support agent lives in Teams, so it uses Authenticate with Microsoft, and nobody sees a sign-in screen. The customer portal agent uses Authenticate manually with OAuth two, and greets each customer by name. Remember for the exam: Teams means Microsoft, no Microsoft account means manual, the Agent I D comes at creation, and No authentication never guards internal data."
  }
 ],
 "check": [
  {
   "stem": "Which authentication option sets up Microsoft Entra ID automatically?",
   "options": [
    "None of them, since you set up Entra ID by hand",
    "Authenticate manually, with your own OAuth 2 setup",
    "Authenticate with Microsoft",
    "No authentication, which skips sign-in entirely"
   ],
   "answer": 2,
   "explanation": "Authenticate with Microsoft sets up Entra ID automatically."
  },
  {
   "stem": "The users of a portal don't have a Microsoft account. What do you choose?",
   "options": [
    "Only the Teams channel",
    "Authenticate manually with OAuth 2",
    "No authentication",
    "Authenticate with Microsoft"
   ],
   "answer": 1,
   "explanation": "For non-Microsoft accounts you use Authenticate manually with a generic OAuth 2 provider."
  },
  {
   "stem": "Which channels only support Authenticate with Microsoft?",
   "options": [
    "WhatsApp, through its own separate channel",
    "Demo website, for quick testing",
    "Facebook, using its own channel",
    "Teams and Microsoft 365 channels"
   ],
   "answer": 3,
   "explanation": "The Teams and Microsoft 365 channels only support Microsoft authentication."
  },
  {
   "stem": "What happens with No authentication?",
   "options": [
    "Entra ID is turned on for every user",
    "Only admins can chat, after signing in with Entra",
    "Anyone who has the link can chat",
    "Nobody can chat until an admin approves them"
   ],
   "answer": 2,
   "explanation": "Without authentication, anyone who has the link can talk to the agent."
  }
 ],
 "reto": {
  "text": "Open Settings, Security, Authentication of a test agent.\nSwitch between No authentication and Authenticate with Microsoft.\nNote which User variables appear when you choose authentication.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
},
{
 "id": "L03",
 "module": 1,
 "title": "Channels and publishing",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "1.1c"
 ],
 "theory": {
  "intro": "Publishing an agent is like printing and handing out a new edition of a manual: as long as someone keeps reading the old edition, they won't see the changes. Channels are the places where your users find the agent: Teams, a website, a mobile app.",
  "sections": [
   {
    "heading": "Saving is not publishing",
    "body": "While you edit, your changes live in your draft. Only when you select Publish are all connected channels updated at once. You don't need to republish channel by channel.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Edit</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Publish</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Channels</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"302.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">New</text><text x=\"302.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">session</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Changes arrive in new sessions</text></svg>"
   },
   {
    "heading": "Why some users see the old version",
    "body": "New content only applies when a new session starts. In most channels that happens after 30 minutes of inactivity. In channels with persistent conversations, like Teams, you can type start over to force a new session; otherwise it can take up to an hour."
   },
   {
    "heading": "Which channels exist",
    "body": "There are channels such as Teams and Microsoft 365, Demo website, and others. Direct Line channels covers the Demo website, custom websites, and mobile apps. Some channels require authentication."
   },
   {
    "heading": "Channel governance",
    "body": "Each channel has its own connector in the administrator's data policies. If the administrator blocks the WhatsApp and Facebook connectors, makers can no longer use those channels.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Channels</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams</span><span style=\"text-align:right\">Published</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Demo website</span><span style=\"text-align:right\">Published</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">WhatsApp</span><span style=\"text-align:right\">Blocked by data policy</span></div></div>"
   }
  ],
  "steps": [
   "Open your agent and check that your changes are saved.",
   "Select Publish and confirm.",
   "Go to Channels to see which channels are available.",
   "Pick a channel, for example Teams or Demo website, and follow its connection steps.",
   "Check whether the channel requires authentication.",
   "Open a new conversation in the channel to see the published change.",
   "If you don't see the change, wait for a new session (or type start over in Teams)."
  ],
  "example": "Contoso publishes its agent in Teams and on a Demo website. The administrator blocks the WhatsApp and Facebook connectors in the data policies, so makers can't use those channels. A Teams user still sees the old answer after publishing. It is not a bug: her session started earlier, before the change was published. When she starts a new session, she sees the change right away.",
  "examTips": [
   "If someone sees the old version after publishing, the answer is: their session started earlier, and only a new session sees the change.",
   "Publish updates all channels; you don't republish one by one.",
   "Each channel has its connector in the data policies; Direct Line covers Demo website, custom websites, and mobile apps."
  ],
  "glossary": [
   {
    "term": "Channel",
    "def": "A place where users talk to the agent, such as Teams or a website."
   },
   {
    "term": "Publish",
    "def": "The action that sends the saved version of the agent to all its channels."
   },
   {
    "term": "Session",
    "def": "A conversation in progress. New content only applies when a new one starts."
   },
   {
    "term": "Data policy",
    "def": "An administrator rule that allows or blocks connectors, including channel connectors."
   }
  ]
 },
 "scenes": [
  {
   "title": "The fix nobody sees",
   "caption": "Valeria publishes a fix to Nexo's returns answer. Next morning, Marta in Teams still gets the old answer. Is something broken?",
   "say": "Valeria fixes Nexo's answer about returns. She selects Publish and goes home happy. The next morning, Marta from sales opens Teams and asks about returns. She gets the old answer. Is Nexo broken? No. Today you learn what Publish really does, where your users meet the agent, and why some of them still see yesterday's version."
  },
  {
   "title": "A new edition of the manual",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The manual</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Draft</span><span style=\"text-align:right\">Your edits, on your desk</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Publish</span><span style=\"text-align:right\">Prints and hands out the new edition</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Old edition</span><span style=\"text-align:right\">Still read until users pick up the new one</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Channels</span><span style=\"text-align:right\">Teams, a website, a mobile app</span></div></div>",
   "caption": "Your draft is the manual on your desk. Publish prints the new edition and hands it out. Channels: Teams, a website, a mobile app.",
   "say": "Think of the agent as a manual. While you edit, your changes are a draft on your desk. Publish prints the new edition and hands it out to everyone. But someone still reading the old edition won't see the changes until they pick up the new one. And the places where users pick it up are called channels. Teams, a website, a mobile app."
  },
  {
   "title": "Saving is not publishing",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Saving is not publishing</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Save</span><span style=\"text-align:right\">Updates your draft (test pane only)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Publish</span><span style=\"text-align:right\">Updates every connected channel at once</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Per channel</span><span style=\"text-align:right\">Never republish one by one</span></div></div>",
   "caption": "Saved changes stay in your draft. Publish sends the saved version to every connected channel at once. No republishing channel by channel.",
   "say": "First rule. Saving is not publishing. Your saved changes stay in your draft, and only you see them in the test pane. When you select Publish, every connected channel is updated at once. Teams, the website and the mobile app get the same new edition together. So you never republish channel by channel. One Publish is enough."
  },
  {
   "title": "Decide: the change nobody sees",
   "caption": "Valeria saved a change and it works in the test pane. Users on Teams and the website don't see it. What is missing?",
   "say": "Your turn. Valeria saved a change, and it works in the test pane. But users on Teams and on the website don't see it, even in new conversations. What is missing? Republish each channel one by one? Select Publish once for the agent? Or wait for the save to reach channels? Decide before I answer. Select Publish once. Saving only updates the draft. One Publish updates every connected channel together."
  },
  {
   "title": "Why some users see the old version",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Sessions</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">New content</span><span style=\"text-align:right\">Only in a new session</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Most channels</span><span style=\"text-align:right\">New session after 30 min of inactivity</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams</span><span style=\"text-align:right\">Type start over to force it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Otherwise</span><span style=\"text-align:right\">Up to an hour</span></div></div>",
   "caption": "New content applies only in a new session: in most channels after 30 minutes idle. In Teams, type start over; else up to an hour.",
   "say": "Now Marta's mystery. A session is a conversation in progress. New content only applies when a new session starts. In most channels, that happens after thirty minutes of inactivity. Teams keeps conversations open, so the old session can stay alive. There, the user can type start over to force a new session. Otherwise, it can take up to an hour."
  },
  {
   "title": "Decide: Marta's old answer",
   "caption": "Marta's Teams conversation is still open and she gets the old answer. Valeria wants her to see the fix right now. What should Marta do?",
   "say": "Your turn. The fix is published, but Marta's conversation in Teams is still open, and she keeps getting the old answer. Valeria wants her to see the fix right now. What should Marta do? Type start over in the chat? Publish again just for Teams? Or reinstall the app in Teams? Decide before I answer. Type start over. It forces a new session, and new sessions get the published content. Publishing again changes nothing."
  },
  {
   "title": "Which channels exist",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Channels</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams and Microsoft 365</span><span style=\"text-align:right\">Where people already work</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Demo website</span><span style=\"text-align:right\">Quick page to try the agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Others</span><span style=\"text-align:right\">WhatsApp, Facebook…</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Direct Line channels</span><span style=\"text-align:right\">Demo website, custom websites, mobile apps</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Watch out</span><span style=\"text-align:right\">Some channels require authentication</span></div></div>",
   "caption": "Channels include Teams and Microsoft 365 and the Demo website. Direct Line channels cover the Demo website, custom websites and mobile apps. Some need authentication.",
   "say": "So where can users meet the agent? There is Teams and Microsoft three sixty five. There is the Demo website, a quick page to try the agent. And there are others, such as WhatsApp and Facebook. One family deserves a name: Direct Line channels. It covers the Demo website, custom websites and mobile apps. And watch out: some channels require authentication before they work."
  },
  {
   "title": "Channel governance",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Channel governance</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who decides</span><span style=\"text-align:right\">The administrator</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">How</span><span style=\"text-align:right\">One connector per channel in data policies</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Block WhatsApp + Facebook</span><span style=\"text-align:right\">Makers can't use those channels</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams, website</span><span style=\"text-align:right\">Keep working</span></div></div>",
   "caption": "Each channel has its own connector in the administrator's data policies. Block the WhatsApp and Facebook connectors and makers can't use those channels.",
   "say": "Who decides which channels makers may use? The administrator. Each channel has its own connector in the data policies. Teams and Microsoft three sixty five has one. Direct Line channels has one. WhatsApp and Facebook have their own. So if the administrator blocks the WhatsApp and Facebook connectors, makers can no longer use those two channels. Teams and the website keep working."
  },
  {
   "title": "Decide: blocking Direct Line",
   "caption": "The administrator blocks the Direct Line channels connector in a data policy. Which channels can makers no longer use?",
   "say": "Your turn. Contoso's administrator puts the Direct Line channels connector in the Blocked group of a data policy. Makers ask which channels they just lost. Which channels can they no longer use? Every channel, even Teams? The Demo website alone? Or websites and mobile apps? Decide before I answer. Websites and mobile apps. Direct Line covers the Demo website, custom websites and mobile apps. Teams has its own connector."
  },
  {
   "title": "Publish and connect in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Check changes are saved</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Publish › confirm</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Channels › pick Teams or Demo website</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Follow its connection steps, check authentication</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Open a new conversation to see the change</span></div></div>",
   "caption": "Check the changes are saved, Publish and confirm, open Channels, pick Teams or Demo website, follow its steps, check authentication, open a new conversation.",
   "say": "Here is how it looks in the studio. Open Nexo and check that your changes are saved. Select Publish and confirm. Then go to Channels to see which ones are available. Pick one, for example Teams or the Demo website, and follow its connection steps. Check whether it requires authentication. Finally, open a new conversation in the channel to see your change."
  },
  {
   "title": "One edition for everyone",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Publish</span><span style=\"text-align:right\">Once updates every channel</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Session</span><span style=\"text-align:right\">Only a new one sees the change</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Data policies</span><span style=\"text-align:right\">Each channel has its own connector</span></div></div>",
   "caption": "Marta types start over and sees the fix. One Publish updates every channel; only a new session sees it; each channel has its own connector.",
   "say": "Back at Contoso. Marta types start over, and Nexo gives her the new returns answer. Nothing was broken. Her session had simply started before the fix. Remember three things. One Publish updates every channel. Only a new session sees the change. And each channel has its own connector in the data policies. Next, keeping the agent safe and fair: responsible A I and moderation."
  }
 ],
 "check": [
  {
   "stem": "When you select Publish, what gets updated?",
   "options": [
    "All connected channels",
    "Only the Demo website, not the others",
    "No channel, until a channel is added",
    "Only the Teams channel and its apps"
   ],
   "answer": 0,
   "explanation": "Publish updates all connected channels at once."
  },
  {
   "stem": "A user still sees the old version after publishing. Why?",
   "options": [
    "Authentication changed",
    "The agent is broken and needs a fix",
    "Each channel must be republished",
    "Their session started earlier"
   ],
   "answer": 3,
   "explanation": "New content only applies when a new session starts."
  },
  {
   "stem": "Which channel covers the Demo website, custom websites, and mobile apps?",
   "options": [
    "Direct Line for websites and apps",
    "WhatsApp, a messaging app",
    "Teams, the Microsoft chat app",
    "Facebook Messenger"
   ],
   "answer": 0,
   "explanation": "Direct Line channels covers the Demo website, custom websites, and mobile apps."
  },
  {
   "stem": "How does an administrator block the WhatsApp and Facebook channels?",
   "options": [
    "By renaming the agent and all of its topics",
    "By deleting the agent from the environment",
    "It is not possible, even for an administrator",
    "By blocking their data policy connectors"
   ],
   "answer": 3,
   "explanation": "Each channel has its own connector in the data policies; blocking them disables those channels for makers."
  }
 ],
 "reto": {
  "text": "Publish your test agent to the Demo website.\nChange a message, publish again, and open a new conversation.\nLook in Channels to see which channels exist and which require authentication.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels"
},
{
 "id": "L04",
 "module": 1,
 "title": "Responsible AI and moderation",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "1.1d"
 ],
 "theory": {
  "intro": "A generative agent writes new answers, and that brings risks: harmful content or made-up answers. Responsible AI is the set of controls you add so the agent speaks safely. It is like the filter on a tap: you decide how fine it is.",
  "sections": [
   {
    "heading": "Content moderation level",
    "body": "You can set the moderation level at the agent level, the Generative answers node level, and the prompt level. At runtime, the topic's level takes precedence. Highest applies the strictest filter and generates fewer responses; Lowest generates more responses, with more risk of harmful content.",
    "visual": "<svg viewBox=\"0 0 360 84\" role=\"img\" aria-label=\"Highest versus Lowest\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"2\" width=\"170\" height=\"80\" rx=\"8\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><rect x=\"188\" y=\"2\" width=\"170\" height=\"80\" rx=\"8\"/><text x=\"87\" y=\"22\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"bold\">Highest</text><text x=\"273\" y=\"22\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"bold\">Lowest</text><text x=\"87\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Strictest filter</text><text x=\"87\" y=\"66\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Fewer responses</text><text x=\"273\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Most permissive filter</text><text x=\"273\" y=\"66\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">More responses</text></svg>"
   },
   {
    "heading": "Avoiding ungrounded answers",
    "body": "With Allow ungrounded responses turned off, if the agent used no source or tool in a turn, the response is blocked and the fallback is triggered. This stops the agent from making things up without relying on your data.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Settings, Generative AI</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Content moderation</span><span style=\"text-align:right\">Highest</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Allow ungrounded responses</span><span style=\"text-align:right\">Off</span></div></div>"
   },
   {
    "heading": "Telling users it is an AI",
    "body": "The recommended best practice is to say so at the start: you can put a notice in the Conversation Start topic to tell the user they are talking to an AI and that the content is generated."
   },
   {
    "heading": "What each setting does not do",
    "body": "Allow ungrounded responses and temperature do not control harmful content filtering. Each setting has its own job: moderation filters, and the grounding setting requires sources."
   },
   {
    "heading": "Moderation on the Microsoft Copilot harness",
    "body": "Content filtering checks two points in every exchange: what the user sends and what the agent answers. If either one is harmful, the agent is blocked and the user sees the message \"The content was filtered due to Responsible AI restrictions\" (error code ContentFiltered).\n\nWhere you set the level depends on the harness. On the standard harness you set it for the agent, for a generative answers node, and for a prompt. On the Microsoft Copilot harness (formerly GitHub Copilot harness) there is one Moderation level for the whole agent, on the AI & behavior tab of the agent settings. The levels are Minimum, Low, Medium, High, and Maximum. The change takes effect after you save and publish. Lowering it for one task lowers it for every task. On the standard harness, a filtered generative answers node returns no answer and gives no sign that moderation was the cause. To find out, use conversation transcripts or Application Insights and look for ContentFiltered.\n\nModeration only screens for harm. It does not check whether a request fits your company's policies, such as asking for a coworker's leave balance. For that you use instructions, knowledge scope, tools, and permissions."
   }
  ],
  "steps": [
   "Open your agent and go to Settings.",
   "Go to Generative AI.",
   "Under Content moderation, choose the level (for example Highest).",
   "Turn off Allow ungrounded responses if you want to require sources.",
   "Save your changes.",
   "In the test panel, ask an awkward question and another outside your sources.",
   "Add an AI notice in the Conversation Start topic."
  ],
  "example": "The Contoso HR agent answers policy questions. Contoso turns off Allow ungrounded responses: if the agent used no source or tool in a turn, the response is blocked and the fallback is triggered. The Conversation Start topic also says: \"I am an artificial intelligence assistant.\" This way the employee knows who they are talking to and does not get made-up answers. The result is a safer agent.",
  "examTips": [
   "To avoid ungrounded responses: turn off Allow ungrounded responses.",
   "Trap: believing Highest generates more responses; it is the opposite, it filters more.",
   "Moderation is set at agent, node, and prompt level; at runtime the topic's level takes precedence.",
   "Microsoft Copilot harness: Moderation level is one agent-wide setting (AI & behavior tab, Minimum to Maximum), active after save and publish. Standard harness: agent, node, and prompt levels.",
   "Trap: content moderation does not enforce organizational policy. Use instructions, knowledge scope, tools, and permissions for that."
  ],
  "glossary": [
   {
    "term": "Content moderation",
    "def": "A filter that limits harmful content in generated responses."
   },
   {
    "term": "Ungrounded response",
    "def": "A response that does not rely on any source or tool used in the turn."
   },
   {
    "term": "Fallback",
    "def": "A backup response that is triggered when the agent cannot answer."
   },
   {
    "term": "Conversation Start",
    "def": "A topic that runs when the conversation begins. It is useful for greeting or giving notices."
   }
  ]
 },
 "scenes": [
  {
   "title": "Three bad answers on Friday",
   "caption": "An offensive message, a made-up policy, a coworker's leave balance. Three different problems.",
   "say": "Friday at Contoso. The HR agent has a rough day. Someone sends it an offensive message. Another employee asks about a policy that is not in its sources, and the agent invents an answer. A third person asks for a coworker's leave balance, and gets it. Three bad answers, and each one has a different fix. By the end of this class you will know which control stops which problem."
  },
  {
   "title": "The filter on the tap",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two controls</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Content moderation</span><span style=\"text-align:right\">Filters harmful content</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Grounding</span><span style=\"text-align:right\">Requires sources or tools</span></div></div>",
   "caption": "Moderation = how fine the filter is. Grounding = only water from your own pipes.",
   "say": "Here is the picture to keep. A generative agent is a tap that writes new answers. Responsible A I is the set of controls you add so it speaks safely. Content moderation is the filter on the tap: you decide how fine it is. Grounding is a different valve: it only lets out water that comes from your own pipes, your sources and tools. Two controls, two different jobs."
  },
  {
   "title": "Two checkpoints",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two checkpoints</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Checked</span><span style=\"text-align:right\">User message and agent answer</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Blocked</span><span style=\"text-align:right\">Error code ContentFiltered</span></div></div>",
   "caption": "Filtering checks what the user sends and what the agent answers. Code: ContentFiltered.",
   "say": "Content filtering checks two points in every exchange. First, what the user sends. Second, what the agent answers. If either one is harmful, the exchange is blocked, and the user sees the message: the content was filtered due to Responsible A I restrictions. Behind it, the error code is Content Filtered. Remember that name, because you will search for it later when you troubleshoot."
  },
  {
   "title": "Where the level lives: standard harness",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Standard harness levels</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Agent, generative answers node, prompt</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">At runtime</span><span style=\"text-align:right\">Topic's level takes precedence</span></div></div>",
   "caption": "Standard harness: agent, generative answers node, prompt. At runtime the topic's level wins.",
   "say": "Where do you set the filter? It depends on the harness. On the standard harness you can set the moderation level in three places: for the whole agent, for a generative answers node, and for a prompt. When they disagree, at runtime the topic's level takes precedence. So a strict node inside a topic stays strict, even if the agent level is more relaxed."
  },
  {
   "title": "Highest filters more",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Moderation scale</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Highest</span><span style=\"text-align:right\">Strictest filter, fewer responses</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Lowest</span><span style=\"text-align:right\">More responses, more risk</span></div></div>",
   "caption": "Highest = strictest filter, fewer responses. Lowest = more responses, more risk.",
   "say": "Now the direction of the scale, which the exam loves to twist. Highest applies the strictest filter, so the agent generates fewer responses. Lowest generates more responses, with more risk of harmful content. Highest does not mean more answers. It means a finer filter, so less gets through. Picture the tap again: the finer the filter, the less water comes out."
  },
  {
   "title": "Decide: the most answers",
   "caption": "Which moderation level makes the agent generate the most responses, with the most risk?",
   "say": "Your turn. A maker complains that the agent refuses too many questions. They want the level that generates the most responses, and they accept more risk. Which content moderation level is that? Medium, because it balances answers and safety? Highest, because it unlocks the most answers? Or Lowest? Decide before I answer. Lowest. It generates more responses, with more risk of harmful content. Highest is the strictest filter."
  },
  {
   "title": "One dial on the Microsoft Copilot harness",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Microsoft Copilot harness</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Setting</span><span style=\"text-align:right\">One Moderation level for the agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">AI & behavior tab</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Levels</span><span style=\"text-align:right\">Minimum to Maximum</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Active</span><span style=\"text-align:right\">After save and publish</span></div></div>",
   "caption": "One agent-wide Moderation level, AI & behavior tab, Minimum to Maximum, after save and publish.",
   "say": "On the Microsoft Copilot harness, formerly called the GitHub Copilot harness, it is simpler. There is one moderation level for the whole agent, on the A I and behavior tab of the agent settings. The levels are minimum, low, medium, high and maximum. The change takes effect after you save and publish. And because it is one dial, lowering it for one task lowers it for every task."
  },
  {
   "title": "The silent filter",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Silent filter</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Standard harness node</span><span style=\"text-align:right\">Returns no answer, no sign</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Find it</span><span style=\"text-align:right\">Transcripts or Application Insights: ContentFiltered</span></div></div>",
   "caption": "Standard harness: a filtered generative answers node returns nothing. Look for ContentFiltered.",
   "say": "Here is a trap from real life. On the standard harness, when moderation filters a generative answers node, the node simply returns no answer, and it gives no sign that moderation was the cause. The user just sees nothing useful. To find out what happened, open the conversation transcripts or Application Insights, and look for Content Filtered. That code tells you the filter, not a bug, ate the answer."
  },
  {
   "title": "Decide: one creative task",
   "caption": "Microsoft Copilot harness: the maker lowers moderation for one creative task. What happens?",
   "say": "Your turn. An agent runs on the Microsoft Copilot harness. The maker lowers the moderation level to help one creative writing task. What is the effect? Every task of the agent uses the lower level, once the maker saves and publishes? Nothing changes until an admin approves it? Or only that task's node uses the lower level? Decide before I answer. Every task. On this harness the level is one setting for the whole agent."
  },
  {
   "title": "No source, no answer",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Allow ungrounded responses: Off</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">No source or tool in the turn</span><span style=\"text-align:right\">Response blocked</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Fallback is triggered</span></div></div>",
   "caption": "Allow ungrounded responses off: no source or tool in the turn, response blocked, fallback.",
   "say": "Now the second valve. The setting is called allow ungrounded responses. An ungrounded response is one that does not rely on any source or tool used in that turn. Turn the setting off, and if the agent used no source or tool, the response is blocked and the fallback is triggered instead. The fallback is a backup reply. This stops the agent from making things up without relying on your data."
  },
  {
   "title": "Each setting has one job",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">One job each</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Moderation</span><span style=\"text-align:right\">Harmful content</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Ungrounded responses / temperature</span><span style=\"text-align:right\">Do not filter harm</span></div></div>",
   "caption": "Ungrounded responses and temperature do not filter harmful content. Moderation does.",
   "say": "Keep the jobs apart, because the exam mixes them on purpose. Allow ungrounded responses does not filter harmful content. Temperature does not filter harmful content either. Moderation filters harm. The grounding setting requires sources. So if the problem is invented answers, moderation will not fix it. And if the problem is offensive content, turning off ungrounded responses will not fix it either."
  },
  {
   "title": "Decide: the invented policy",
   "caption": "The HR agent invents answers about policies that are not in its sources. What fixes it?",
   "say": "Your turn. The HR agent answers questions about policies that are not in its sources, and the answers are invented. What fixes this? Lower the temperature? Turn off allow ungrounded responses? Or raise content moderation to Highest? Decide before I answer. Turn off allow ungrounded responses. With no source or tool in the turn, the response is blocked and the fallback runs. Moderation only screens for harm, not for made-up facts."
  },
  {
   "title": "Moderation is not policy",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Moderation is not policy</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Moderation</span><span style=\"text-align:right\">Only screens for harm</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Policy</span><span style=\"text-align:right\">Instructions, knowledge scope, tools, permissions</span></div></div>",
   "caption": "A coworker's leave balance is not harmful content. Use instructions, scope, tools, permissions.",
   "say": "Back to the third bad answer: a coworker's leave balance. Nothing in that request is harmful, so moderation lets it through. Moderation only screens for harm. It does not check whether a request fits your company's policies. For that you use other controls: instructions that say what the agent must not do, a narrow knowledge scope, the right tools, and permissions, so each user only reaches their own data."
  },
  {
   "title": "Decide: the leave balance",
   "caption": "Any employee can get a coworker's leave balance. Which controls should stop this?",
   "say": "Your turn. Any employee can ask the HR agent for a coworker's leave balance, and the agent answers. Which controls should stop this? Turn off allow ungrounded responses? Raise content moderation to maximum? Or instructions, knowledge scope, tools and permissions? Decide before I answer. Instructions, knowledge scope, tools and permissions. The request is not harmful, so moderation does not see a problem. This is a policy question, not a harm question."
  },
  {
   "title": "Say it is an AI",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">AI notice</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Conversation Start topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Says</span><span style=\"text-align:right\">You are talking to an AI</span></div></div>",
   "caption": "Best practice: an AI notice in the Conversation Start topic.",
   "say": "One more good habit. Tell users they are talking to an A I, right at the start. The recommended practice is to put a notice in the Conversation Start topic, the topic that runs when the conversation begins. Something like: I am an artificial intelligence assistant, and my answers are generated. The employee then knows who they are talking to, and reads the answers with the right care."
  },
  {
   "title": "The steps",
   "caption": "Settings · Generative AI · Content moderation · Allow ungrounded responses · test · AI notice.",
   "say": "Here are the steps on the standard harness. Open your agent and go to Settings, then Generative A I. Under content moderation, choose the level, for example Highest. Turn off allow ungrounded responses if you want to require sources. Save. In the test panel, ask an awkward question and another one outside your sources, and watch what happens. Finally, add an A I notice in the Conversation Start topic."
  },
  {
   "title": "Friday, fixed",
   "caption": "Offensive message: moderation. Invented policy: grounding. Leave balance: instructions and permissions.",
   "say": "Back to Friday at Contoso. The offensive message is stopped by moderation, at both checkpoints. The invented policy is stopped by turning off allow ungrounded responses, so the fallback runs. The leave balance is stopped by instructions, knowledge scope and permissions. Remember for the exam: Highest filters more, the topic level wins on the standard harness, and one dial rules the whole agent on the Microsoft Copilot harness."
  }
 ],
 "check": [
  {
   "stem": "Which moderation level applies the strictest filter?",
   "options": [
    "Medium is the strictest",
    "Highest",
    "None",
    "Lowest"
   ],
   "answer": 1,
   "explanation": "Highest applies the strictest filter and generates fewer responses."
  },
  {
   "stem": "Which setting stops the agent from answering without relying on a source or tool?",
   "options": [
    "Turning off Allow ungrounded responses",
    "Changing the channel",
    "Lowering moderation to Lowest",
    "Raising the temperature of the model"
   ],
   "answer": 0,
   "explanation": "With Allow ungrounded responses turned off, a response with no source or tool is blocked and the fallback is triggered."
  },
  {
   "stem": "At runtime, which moderation level takes precedence?",
   "options": [
    "The agent's, always",
    "The channel's",
    "The topic's",
    "The user's"
   ],
   "answer": 2,
   "explanation": "At runtime, the topic's moderation level takes precedence."
  },
  {
   "stem": "Where is it recommended to tell users they are talking to an AI?",
   "options": [
    "In Conversation Start",
    "In the Teams channel only",
    "In the file name",
    "In the data policy"
   ],
   "answer": 0,
   "explanation": "Giving the notice in Conversation Start is the recommended best practice."
  }
 ],
 "reto": {
  "text": "In a test agent, open Settings, Generative AI.\nTry the moderation level on Highest and ask an awkward question.\nTurn off Allow ungrounded responses and ask something outside your sources.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
},
{
 "id": "L05",
 "module": 1,
 "title": "Security and governance",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "1.1e"
 ],
 "theory": {
  "intro": "Agent security has two safety nets, like a building with an alarm and guards. The security scan is the alarm: it warns you when you weaken the configuration. Data policies are the administrator's guards: they truly block what must not be done.",
  "sections": [
   {
    "heading": "Security scan: it warns",
    "body": "The scan warns you when default values are weakened. Examples: switching from Authenticate with Microsoft to No authentication (anyone with the link can chat), switching end-user credentials to the maker's credentials, or sharing the agent with the whole organization (by default it is shared with nobody).",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Maker</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Security</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">scan</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Data</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">policies</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Publish</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Scan warns; DLP blocks</text></svg>"
   },
   {
    "heading": "Data policies: they block",
    "body": "The administrator governs with data policies (DLP) in Power Platform. Each connector can be allowed or blocked. If it is blocked, makers cannot use that capability. The scan only warns; the data policy prevents."
   },
   {
    "heading": "Three data groups and credential control",
    "body": "A data policy puts each connector in one of three groups: Business, Non-business, or Blocked. A Blocked connector can't be used by any agent in that environment. Business and Non-business connectors can each be used, but one agent can't combine connectors from both groups. The check happens in real time: if a maker adds a blocked connector, an error shows at once. A connector may be allowed in development and blocked in production, so check the target environment at design time.\n\nIf a connector is blocked, ask the admin to move it to another group. Remember that MCP servers also run on Power Platform connectors, so data policies govern them too. A second admin control is Control maker-provided credentials, in the Power Platform admin center. When it is enforced, makers can't set tools to use their own credentials, and every connection is authenticated by the end user at runtime.\n\nOne more limit applies to Teams. When an agent there uses custom Active Directory authentication, SSO isn't supported for connectors, so users sign in to each connector manually."
   },
   {
    "heading": "One connector per type of knowledge",
    "body": "Each type of knowledge source has its own connector: local documents, SharePoint and OneDrive, and public websites. Blocking one does not affect the others. To allow or deny specific endpoints you can use endpoint filtering instead of blocking the whole connector.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Contoso data policy</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Chat without Microsoft Entra ID authentication in Copilot Studio</span><span style=\"text-align:right\">Blocked</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge: local documents</span><span style=\"text-align:right\">own connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge: SharePoint and OneDrive</span><span style=\"text-align:right\">own connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge: public websites</span><span style=\"text-align:right\">own connector</span></div></div>"
   },
   {
    "heading": "Preventing agents without authentication",
    "body": "So that nobody publishes agents without sign-in, the administrator blocks the Chat without Microsoft Entra ID authentication in Copilot Studio connector. Then makers can only choose Authenticate with Microsoft or Authenticate manually."
   },
   {
    "heading": "Zoned governance: three zones and their controls",
    "body": "Not every agent needs the same rules. Zoned governance sorts agents into three zones by purpose and risk, and each zone takes effect through the environment and its policies. Zone 1 is for citizens: private, read-only agents made in Agent Builder or as SharePoint agents. Zone 2 is for partnered makers: IT-approved makers with a coach, working in IT-managed environments in Copilot Studio. Zone 3 is for professional developers and IT: ALM, the strongest controls, and the option of SLAs, using Foundry Agent Service and Copilot Studio.\n\nZone 1 allows only Microsoft 365 and Power Platform connectors, runs in the user's context, lives in developer environments, and has sharing turned off. Zone 2 adds advanced connector policies, approved data sources, environment groups and rules, ALM pipelines, and IT-admin approval to publish. Zone 3 uses advanced connector policies plus Microsoft Purview, and shares agents through Integrated apps in the Microsoft 365 admin center.\n\nTo place an agent, ask four questions: who builds it, who will use it, what data and permissions it needs, and how critical it is. Example: an HR benefits agent built by an IT-approved maker, used by other departments, with shared HR data and no SLA, belongs in Zone 2. Environment groups apply rules at scale. An environment can be in only one group, and groups cannot overlap or nest. Tenant admin rules, such as agent sharing, generative AI settings, and transcript access, are inherited and become read-only in each environment. An environment admin cannot override them locally, so any change goes through a tenant admin at the group level."
   },
   {
    "heading": "Agent 365: see and control every agent",
    "body": "Microsoft Agent 365 gives admins one place to see and control agents. Copilot Studio agents connect to it automatically, with no setup from the maker: the agent is registered when it is created, approvals use Power Platform admin center policies, and telemetry flows without extra instrumentation.\n\nAn admin with a role such as Power Platform administrator or AI administrator sees every Copilot Studio and Agent Builder agent, drafts and published, in the Power Platform admin center under Manage, Inventory. The registry is in the Microsoft 365 admin center under Agent 365, Agent registry. Some inventory fields, such as authentication, channels, sharing, and capabilities, are in preview and can be empty.\n\nAn admin can block an agent. Then nobody can use it in any other channel until it is unblocked, although makers can still open and test it in Copilot Studio. Microsoft Purview logs every governance action. Activity data appears in the Microsoft 365 admin center (dashboards), Microsoft Defender (security alerts), and Microsoft Purview (audit logs and DLP tracking). It needs at least one qualifying Agent 365 license, an authenticated session, and an agent that is not multitenant. An agent set to No authentication produces no telemetry for unauthenticated sessions."
   }
  ],
  "steps": [
   "Open your agent and go to Settings.",
   "Find the Security scan and run it.",
   "Read the warnings that appear.",
   "Change authentication to No authentication and run the scan again.",
   "Note which new warning appears and how you would fix it.",
   "If you are an administrator, open the Power Platform admin center and review the data policies.",
   "Find the Chat without Microsoft Entra ID authentication in Copilot Studio connector."
  ],
  "example": "The Contoso administrator blocks the Chat without Microsoft Entra ID authentication in Copilot Studio connector in a data policy: nobody can publish an agent without authentication. The administrator also leaves the SharePoint and OneDrive connector allowed, but blocks the public websites connector as a knowledge source. Each type of source is controlled separately. This way Contoso governs precisely without slowing makers down.",
  "examTips": [
   "To prevent public agents without authentication: block that connector in the data policy.",
   "Trap: believing that blocking one knowledge connector affects the others; each type has its own.",
   "Security scan = warnings; data policies = blocks.",
   "Three DLP groups: Business, Non-business, Blocked. Business and Non-business can't be combined in one agent. Control maker-provided credentials forces end-user authentication.",
   "Zoned governance has three zones: Zone 1 citizen (private, Agent Builder), Zone 2 partnered (IT-approved makers, IT-managed environments), Zone 3 professional (ALM, strongest controls, SLAs). Classify by builder, audience, data and permissions, and criticality.",
   "Agent 365 needs no setup from the maker, but No authentication means no telemetry for unauthenticated sessions. Environment-group rules from a tenant admin are inherited and read-only."
  ],
  "glossary": [
   {
    "term": "Security scan",
    "def": "A check that warns you when a setting weakens the default security values."
   },
   {
    "term": "Data policy (DLP)",
    "def": "An administrator rule that allows or blocks connectors in Power Platform."
   },
   {
    "term": "Knowledge source",
    "def": "A source the agent gets information from: documents, SharePoint, websites."
   },
   {
    "term": "Endpoint filtering",
    "def": "Allowing or denying specific addresses without blocking the whole connector."
   },
   {
    "term": "Business, Non-business, Blocked",
    "def": "The three data groups for connectors in a data policy. Blocked connectors can't be used; Business and Non-business can't be mixed in one agent."
   },
   {
    "term": "Control maker-provided credentials",
    "def": "A Power Platform admin setting. When enforced, makers can't use their own credentials for tools; end users authenticate at runtime."
   }
  ]
 },
 "scenes": [
  {
   "title": "Monday morning at Contoso",
   "caption": "A test agent, no sign-in, a shared link. Who should have stopped it?",
   "say": "Monday morning at Contoso. A maker builds an HR agent and, to test faster, switches authentication to No authentication. Then the link gets shared. Now anyone with that link can chat with an agent that knows HR policies. Who should have stopped this? Copilot Studio has two safety nets, and admins have tools to govern hundreds of agents at once. By the end of this class you will know exactly which one stops what."
  },
  {
   "title": "The alarm and the guard",
   "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Maker</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Security</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">scan</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Data</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">policies</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Publish</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Scan warns; DLP blocks</text></svg>",
   "caption": "Security scan = alarm (warns). Data policy = guard (blocks).",
   "say": "Here is the picture to keep. The security scan is an alarm. It rings when you weaken a setting, but you can still walk through the door. A data policy is a guard. The administrator posts it at the door, and it simply does not let you pass. One warns, the other prevents. Many governance questions on the exam come down to this difference."
  },
  {
   "title": "The alarm in action",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The scan warns if...</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">You switch to No authentication</span><span style=\"text-align:right\">Anyone can chat</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">You use maker credentials</span><span style=\"text-align:right\">You lose the user's</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">You share with the whole organization</span><span style=\"text-align:right\">Default: nobody</span></div></div>",
   "caption": "The scan warns about No authentication, maker credentials, and sharing with everyone.",
   "say": "Let's watch the alarm. Our maker switches from Authenticate with Microsoft to No authentication. The scan warns. If tools switch from end user credentials to the maker's own credentials, it warns again. If the agent is shared with the whole organization, it warns too, because by default an agent is shared with nobody. Notice the pattern. Each warning means a default was weakened. And notice the limit: the maker can still publish."
  },
  {
   "title": "The guard: data policies",
   "visual": "<svg viewBox=\"0 0 360 110\" role=\"img\" aria-label=\"Data policy → Blocked connector → Maker without access\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"54\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Data</text><text x=\"54\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">policy</text><line x1=\"108\" y1=\"39\" x2=\"122\" y2=\"39\"/><polygon points=\"126,39 119,35.5 119,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"128\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\"/><text x=\"180\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Blocked</text><text x=\"180\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">connector</text><line x1=\"234\" y1=\"39\" x2=\"248\" y2=\"39\"/><polygon points=\"252,39 245,35.5 245,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"254\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\"/><text x=\"306\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Maker</text><text x=\"306\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">no access</text><text x=\"180\" y=\"94\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">The administrator decides</text></svg>",
   "caption": "Admins set data policies in Power Platform. Blocked connector, blocked capability.",
   "say": "Now the guard. The administrator defines data policies in Power Platform, for each environment. A data policy works on connectors. Here is the key idea: almost everything an agent does rides on a connector. Channels, knowledge sources, tools, even M C P servers. So when the admin blocks a connector, that capability simply disappears for every maker in the environment. It does not warn, it blocks. Blocked."
  },
  {
   "title": "Three groups",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three groups in a data policy</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Business</span><span style=\"text-align:right\">Usable</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Non-business</span><span style=\"text-align:right\">Usable, never mixed with Business</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Blocked</span><span style=\"text-align:right\">No agent can use it</span></div></div>",
   "caption": "Business, Non-business, Blocked. One agent can't mix Business and Non-business.",
   "say": "A data policy sorts every connector into one of three groups. Business, Non-business, and Blocked. Blocked connectors can't be used by any agent. Business and Non-business connectors can both be used, but never together in one agent. Picture an agent that reads SharePoint, which the admin put in Business, and posts to a social network the admin put in Non-business. The moment the maker adds the second one, an error appears, in real time. If a maker needs a blocked connector, ask the admin to move it to another group."
  },
  {
   "title": "Decide: it worked yesterday",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Works in dev, fails in prod</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who blocks it?</span><span style=\"text-align:right\">The production data policy</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Why?</span><span style=\"text-align:right\">Policies are per environment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Habit</span><span style=\"text-align:right\">Check the target environment early</span></div></div>",
   "caption": "Works in development, fails in production. Which environment's policy applies?",
   "say": "Your turn. An agent works perfectly in the development environment. In production, adding the same tool fails at once with an error. Is the scan to blame, or a data policy? Decide before I answer. It is a data policy, and it belongs to the production environment. Policies are set per environment, so a connector can be allowed in development and blocked in production. Check the target environment while you design, not on launch day."
  },
  {
   "title": "Credentials and Teams",
   "caption": "Control maker-provided credentials forces end-user sign-in at runtime.",
   "say": "Admins have a second lever, beyond connectors. In the Power Platform admin center there is a setting called Control maker provided credentials. When it is enforced, makers can no longer set tools to run with their own credentials. Every connection is signed in by the end user, at runtime. One more limit for Teams. If an agent there uses custom Active Directory authentication, single sign on does not work for connectors, so users sign in to each connector by hand."
  },
  {
   "title": "One connector per source",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Contoso data policy</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Chat without Microsoft Entra ID authentication in Copilot Studio</span><span style=\"text-align:right\">Blocked</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge: local documents</span><span style=\"text-align:right\">own connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge: SharePoint and OneDrive</span><span style=\"text-align:right\">own connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge: public websites</span><span style=\"text-align:right\">own connector</span></div></div>",
   "caption": "Documents, SharePoint and OneDrive, public websites: separate connectors.",
   "say": "Knowledge works the same way, with a twist. Each type of knowledge source has its own connector. Uploaded documents have one. SharePoint and OneDrive have another. Public websites have a third. So an admin can block public websites and keep SharePoint fully working. Blocking one never touches the others. And if blocking a whole connector is too blunt, endpoint filtering lets the admin allow or deny specific addresses instead."
  },
  {
   "title": "Closing the Monday door",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Block this connector</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Chat without Microsoft Entra ID authentication</span><span style=\"text-align:right\">Blocked</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Options left</span><span style=\"text-align:right\">Authenticate with Microsoft, or manually</span></div></div>",
   "caption": "Block Chat without Microsoft Entra ID authentication. Only signed-in options remain.",
   "say": "Back to Monday morning. How does the admin make sure nobody ever publishes an agent without sign in? There is a connector for exactly that: Chat without Microsoft Entra I D authentication in Copilot Studio. Block it in the data policy. Now the No authentication option is gone. Makers can only choose Authenticate with Microsoft, or Authenticate manually. The alarm would only have warned. The guard closes the door."
  },
  {
   "title": "Decide: the exam version",
   "caption": "Prevent agents without sign-in: block the connector, don't rely on the scan.",
   "say": "Here is how the exam asks it. An admin must prevent any agent from being published without authentication. Option one, rely on the security scan. Option two, block the Chat without Microsoft Entra I D authentication connector. Option three, enforce Control maker provided credentials. Decide. The answer is option two. The scan only warns, and that setting controls credentials, not sign in. When the question says prevent, think data policy."
  },
  {
   "title": "Three zones",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three zones</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Zone 1 citizen</span><span style=\"text-align:right\">Private, read-only, Agent Builder</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Zone 2 partnered</span><span style=\"text-align:right\">IT-approved makers, managed environments</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Zone 3 professional</span><span style=\"text-align:right\">ALM, strongest controls, SLAs</span></div></div>",
   "caption": "Zone one citizen, zone two partnered, zone three professional.",
   "say": "Now zoom out. A large company has hundreds of agents, and they don't all need the same rules. Zoned governance sorts them into three zones by purpose and risk. Zone one is for citizens: private, read only agents made in Agent Builder or as SharePoint agents. Zone two is for partnered makers, approved by I T, with a coach, in I T managed environments. Zone three is for professional developers: A L M, the strongest controls, and service level agreements."
  },
  {
   "title": "What each zone allows",
   "caption": "Zone one: Microsoft connectors, no sharing. Zone two: approvals, pipelines. Zone three: Purview.",
   "say": "Each zone takes effect through its environment and policies. Zone one allows only Microsoft three sixty five and Power Platform connectors, runs in the user's own context, lives in developer environments, and has sharing turned off. Zone two adds advanced connector policies, approved data sources, environment groups and rules, deployment pipelines, and I T approval before publishing. Zone three keeps advanced connector policies, adds Microsoft Purview, and shares agents through Integrated apps in the Microsoft three sixty five admin center."
  },
  {
   "title": "Decide: which zone?",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Place an agent: four questions</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who builds it?</span><span style=\"text-align:right\">IT-approved maker</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who uses it?</span><span style=\"text-align:right\">Other departments</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Data?</span><span style=\"text-align:right\">Shared HR data</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Critical?</span><span style=\"text-align:right\">No SLA → Zone 2</span></div></div>",
   "caption": "Ask: who builds it, who uses it, what data, how critical. HR benefits = zone two.",
   "say": "To place any agent, ask four questions. Who builds it? Who will use it? What data and permissions does it need? How critical is it? Try one. An HR benefits agent, built by an I T approved maker, used by other departments, with shared HR data, and no service level agreement. Which zone? Decide. Zone two. Not zone one, because others use it and the data is shared. Not zone three, because nothing demands an S L A."
  },
  {
   "title": "Environment groups",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Environment groups</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Membership</span><span style=\"text-align:right\">One group per environment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Structure</span><span style=\"text-align:right\">No overlap, no nesting</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tenant rules</span><span style=\"text-align:right\">Inherited, read-only</span></div></div>",
   "caption": "One group per environment. Tenant rules are inherited and read-only.",
   "say": "Environment groups apply rules at scale. An environment belongs to one group only, and groups can't overlap or nest. When a tenant admin sets rules on a group, such as agent sharing, generative A I settings, or transcript access, every environment inherits them as read only. Here is the trap. An environment admin can't override them locally. If a change is needed, it goes through a tenant admin, at the group level."
  },
  {
   "title": "Agent three sixty five",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Agent 365</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Registration</span><span style=\"text-align:right\">Automatic, no maker setup</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Inventory</span><span style=\"text-align:right\">Power Platform admin center › Manage › Inventory</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Block</span><span style=\"text-align:right\">No channels; makers can still test</span></div></div>",
   "caption": "Every agent registered automatically. Inventory, registry, block, and audit.",
   "say": "Last piece: seeing every agent. Microsoft Agent three sixty five gives admins one place to see and control them. Copilot Studio agents join automatically, with no setup from the maker. Admins find drafts and published agents in the Power Platform admin center, under Manage, Inventory. The registry lives in the Microsoft three sixty five admin center. An admin can block an agent: nobody can use it in any channel, but makers can still open and test it. Microsoft Purview logs every governance action."
  },
  {
   "title": "Decide: the silent agent",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">No authentication</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Telemetry</span><span style=\"text-align:right\">None for unauthenticated sessions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Needs</span><span style=\"text-align:right\">Signed-in session, license, not multitenant</span></div></div>",
   "caption": "No authentication means no telemetry for unauthenticated sessions.",
   "say": "One more. Our Monday agent, still set to No authentication, is used all week. The admin opens the activity dashboards. What does the admin see for those chats? Decide. Nothing. Telemetry needs an authenticated session, at least one qualifying license, and an agent that is not multitenant. So an agent without sign in is not only exposed, it is also invisible. Two reasons to close that door."
  },
  {
   "title": "What to remember",
   "caption": "Scan warns, policy blocks. Connectors per source. Zones by risk. Agent three sixty five sees all.",
   "say": "Let's close. The scan is the alarm, it warns. The data policy is the guard, it blocks, per environment, by connector, in three groups. Each knowledge source has its own connector. To stop agents without sign in, block that one connector. Zones sort agents by who builds them, who uses them, the data, and how critical they are. And Agent three sixty five sees everything, as long as users sign in. Now Monday morning can't happen."
  }
 ],
 "check": [
  {
   "stem": "What does the security scan do?",
   "options": [
    "Deletes insecure agents",
    "Warns you when you weaken the default values",
    "Blocks connectors",
    "Publishes the agent"
   ],
   "answer": 1,
   "explanation": "The scan warns; it does not block. The data policy is what blocks."
  },
  {
   "stem": "How does the administrator prevent publishing agents without authentication?",
   "options": [
    "By blocking the Chat without Microsoft Entra ID authentication connector",
    "By deleting the Teams channel from every agent in the tenant",
    "By changing the channel settings for every agent and every user in the tenant",
    "By changing the channel to Direct Line for every agent in the tenant"
   ],
   "answer": 0,
   "explanation": "Blocking that connector means makers can only choose Microsoft or manual authentication."
  },
  {
   "stem": "If the public websites connector is blocked, what happens to SharePoint and OneDrive?",
   "options": [
    "They are not affected",
    "They become public",
    "They are deleted",
    "They are also blocked by the same policy"
   ],
   "answer": 0,
   "explanation": "Each type of knowledge source has its own connector; blocking one does not affect the others."
  }
 ],
 "reto": {
  "text": "Open an agent and find the Security scan in Settings.\nChange authentication to No authentication and run the scan again.\nNote which warning appears and how you would fix it.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-scan"
},
{
 "id": "L06",
 "module": 1,
 "title": "Reusable components",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "1.1f"
 ],
 "theory": {
  "intro": "Imagine a box of Lego pieces that every team in your company can use without breaking them. That is a component collection: you package ready-made pieces to reuse in several agents, instead of copying and pasting.",
  "sections": [
   {
    "heading": "What a collection contains",
    "body": "A component collection packages topics, tools, knowledge, flows, entities, child agents, and MCP. You make the piece once and use it in many agents.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topics</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Tools</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Component</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">collection</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agent A</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agent B</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">One package, many agents</text></svg>"
   },
   {
    "heading": "Who can change it",
    "body": "Once it is available in an agent, all authors can use it but cannot change its components. Only the creator, or a system customizer or administrator, can edit it. This way nobody breaks the shared piece by accident."
   },
   {
    "heading": "Why not copy and paste",
    "body": "Copy and paste duplicates and falls out of sync: if you fix the original, the copies stay old. A child agent is also not shared between agents, and exporting a whole agent is too much when you only want a few pieces."
   },
   {
    "heading": "Complex collections: carrier solution",
    "body": "If the collection includes connectors or environment variables, it is recommended to use solutions as carriers: you add the collection to a solution, export it, and import it in the target. Exporting a collection directly packages it as managed and is meant for simpler cases.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Component collection: Greeting and escalation</div><span style=\"display:inline-block;border:1px solid var(--accent);color:var(--accent);border-radius:999px;padding:0 8px;font-size:12px;margin:2px 4px 2px 0\">Topic: Greeting</span><span style=\"display:inline-block;border:1px solid var(--muted);border-radius:999px;padding:0 8px;font-size:12px;margin:2px 4px 2px 0\">Topic: Escalate to a human</span><span style=\"display:inline-block;border:1px solid var(--muted);border-radius:999px;padding:0 8px;font-size:12px;margin:2px 4px 2px 0\">Tool: Create ticket</span><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Used by</span><span style=\"text-align:right\">IT, HR, Sales agents</span></div></div>"
   },
   {
    "heading": "Skills: reusable behavior (Microsoft Copilot harness)",
    "body": "A component collection shares pieces on the standard harness. On the Microsoft Copilot harness (formerly GitHub Copilot harness), the reusable piece is a skill: a name, a description, and Markdown instructions that the orchestrator activates when a user's request matches the description. A skill can also have supporting files. You write it once, add it to many agents, and export or share it as a Markdown file or package.\n\nThe description is written for the model, not for readers. It is the signal the orchestrator matches, so write it for routing. The name uses lowercase letters, numbers, and hyphens, has no hyphen at the start or end, and must be unique inside one agent.\n\nYou add a skill in the Build tab, under Skills. Two formats work: a Markdown file with YAML front matter (name and description) followed by the instructions, or a ZIP with a SKILL.md file and supporting files."
   },
   {
    "heading": "When to use a skill, and how to fix one",
    "body": "Use a skill when the task is a repeatable, task-specific pattern, it must run consistently each time, and it will be reused beyond one agent. Otherwise pick something else. A one-off need belongs in the agent instructions. A single external action is a tool. A fixed sequence with defined inputs and outputs is a workflow, because a workflow enforces the order more strictly than Markdown instructions can. A capability with its own owner and life cycle is a connected agent.\n\nWrite portable instructions. Restate the tone, audience, and policy the skill needs, and avoid hard-coding one agent's tools or data, because assumptions from one agent do not travel to another.\n\nIf an upload fails, check for invalid YAML front matter or a missing or empty name or description. If the skill fires when it should not, or does not fire when it should, refine the description. If it fires but gives the wrong output, refine the instructions. To update a skill, edit the source file and use Replace."
   },
   {
    "heading": "Memory (preview)",
    "body": "Memory is another feature of the Microsoft Copilot harness, and it is in preview. The maker turns it on or off for each agent. When it is on, the agent keeps a separate memory store for every user, so one person's context is never shared with another."
   }
  ],
  "steps": [
   "Open your agent and go to Settings.",
   "Find the Component collections section.",
   "Create a new collection and give it a name.",
   "Add components: for example a greeting topic and a tool.",
   "Save the collection.",
   "Open another agent and add that collection.",
   "Check that you can use its components but not edit them."
  ],
  "example": "Contoso builds a collection called \"Greeting and escalation\" with two topics (Greeting and Escalate to a human) and one tool (Create ticket). Its three agents use it: IT, HR, and Sales. When the collection starts to include connectors and environment variables, Contoso adds it to a solution and moves it to production by exporting and importing that solution. One single source keeps everything tidy.",
  "examTips": [
   "Reusing pieces across agents without authors breaking them: component collections.",
   "Trap: copying topics by hand, or exporting only the collection when it includes connectors; in that case a solution is recommended.",
   "Consumers use the collection but do not edit its components.",
   "Microsoft Copilot harness: reuse behavior with a skill (name, description, Markdown instructions; Build tab, Skills; Markdown with YAML front matter or ZIP with SKILL.md). The description routes the skill.",
   "Skill or not: one-off = instructions; single action = tool; fixed sequence = workflow; separate owner and life cycle = connected agent. Fires wrongly = fix the description; wrong output = fix the instructions."
  ],
  "glossary": [
   {
    "term": "Component collection",
    "def": "A package of topics, tools, knowledge, flows, entities, child agents, and MCP that can be reused across agents."
   },
   {
    "term": "Solution",
    "def": "A Power Platform container for moving components between environments."
   },
   {
    "term": "Managed",
    "def": "A closed type of solution, meant for targets such as production."
   }
  ]
 },
 "scenes": [
  {
   "title": "Three copies, three versions",
   "caption": "IT, HR and Sales agents each got a copied Greeting topic. One fix, two stale copies.",
   "say": "Contoso has three agents: I T, H R and Sales. Each one needs the same greeting and the same way to escalate to a human. So a maker copies the topics from one agent into the other two. A month later, someone fixes a bug in the I T greeting. The H R and Sales copies still have the bug. Three agents, three versions of the same piece. By the end of this class you will know how to share pieces the right way."
  },
  {
   "title": "A box of Lego pieces",
   "caption": "A component collection: ready-made pieces every team can use without breaking them.",
   "say": "Here is the picture to keep. Imagine a box of Lego pieces that every team in the company can use, but nobody can bend or break. That is a component collection. You package ready made pieces once, and reuse them in several agents, instead of copying and pasting. Fix a piece in the box, and every agent that uses the box gets the fix."
  },
  {
   "title": "What goes in the box",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Component collection</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Contains</span><span style=\"text-align:right\">Topics, tools, knowledge, flows, entities, child agents, MCP</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Contoso</span><span style=\"text-align:right\">Greeting and escalation</span></div></div>",
   "caption": "Topics, tools, knowledge, flows, entities, child agents and MCP.",
   "say": "What can a component collection contain? Topics. Tools. Knowledge. Flows. Entities. Child agents. And M C P servers. You make the piece once and use it in many agents. For Contoso, one collection called Greeting and escalation holds two topics, Greeting and Escalate to a human, plus one tool called Create ticket. All three agents add that one collection."
  },
  {
   "title": "Use, but do not touch",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Who edits</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authors of consuming agents</span><span style=\"text-align:right\">Use, cannot change</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Can edit</span><span style=\"text-align:right\">Creator, system customizer, administrator</span></div></div>",
   "caption": "Authors can use the components but cannot change them. Only the creator, system customizer or admin edits.",
   "say": "Who can change the pieces? Once the collection is available in an agent, all the authors of that agent can use its components, but they cannot change them. Only the creator of the collection, or a system customizer or an administrator, can edit it. This way nobody breaks the shared piece by accident while working on their own agent. The box stays clean."
  },
  {
   "title": "Why not copy and paste",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Why not</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copy and paste</span><span style=\"text-align:right\">Falls out of sync</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Child agent</span><span style=\"text-align:right\">Not shared</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Export whole agent</span><span style=\"text-align:right\">Too much</span></div></div>",
   "caption": "Copies fall out of sync. Child agents are not shared. Exporting a whole agent is too much.",
   "say": "Why not just copy and paste? Because copies duplicate and fall out of sync. When you fix the original, the copies stay old, exactly like at Contoso. Two other ideas also fall short. A child agent is not shared between agents, it belongs to one. And exporting a whole agent is far too much when you only want a few pieces. The collection is the clean answer."
  },
  {
   "title": "Decide: share without breaking",
   "caption": "Reuse topics and a tool across three agents, and authors must not break them. What do you use?",
   "say": "Your turn. Contoso wants the same topics and tool in its I T, H R and Sales agents, and the authors of those agents must not be able to change them. What should the maker use? A component collection? Copy the topics by hand into each agent? Or export the whole I T agent and import it three times? Decide before I answer. A component collection. One source, used everywhere, and consumers cannot edit its components."
  },
  {
   "title": "Heavy boxes travel in a solution",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Moving a collection</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connectors or environment variables</span><span style=\"text-align:right\">Use a solution as carrier</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Direct export</span><span style=\"text-align:right\">Managed, simpler cases</span></div></div>",
   "caption": "Connectors or environment variables inside? Add the collection to a solution, export, import.",
   "say": "Now the collection grows. It starts to include connectors and environment variables. How do you move it to production? The recommendation is to use a solution as the carrier. A solution is the Power Platform container for moving components between environments. You add the collection to a solution, export the solution, and import it in the target. Exporting the collection directly packages it as managed, and that is meant for simpler cases."
  },
  {
   "title": "Decide: the trip to production",
   "caption": "The collection now has connectors and environment variables. How do you move it to production?",
   "say": "Your turn. Contoso's collection now includes connectors and environment variables, and it must go from development to production. What is recommended? Rebuild the components by hand in production? Export the collection directly, since it is already a package? Or add the collection to a solution, then export and import that solution? Decide before I answer. Use a solution as the carrier. A direct export is meant for simpler collections."
  },
  {
   "title": "Skills: reusable behavior",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Skill (Microsoft Copilot harness)</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Parts</span><span style=\"text-align:right\">Name, description, Markdown instructions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Activated</span><span style=\"text-align:right\">When the request matches the description</span></div></div>",
   "caption": "Microsoft Copilot harness: a skill = name + description + Markdown instructions.",
   "say": "On the standard harness you share pieces with a collection. On the Microsoft Copilot harness, formerly the GitHub Copilot harness, the reusable piece is a skill. A skill has a name, a description, and instructions written in Markdown. The orchestrator activates it when a user's request matches the description. A skill can also carry supporting files. You write it once, add it to many agents, and share it as a Markdown file or a package."
  },
  {
   "title": "Writing and adding a skill",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Adding a skill</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Build tab › Skills</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Formats</span><span style=\"text-align:right\">Markdown with YAML front matter, or ZIP with SKILL.md</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Name</span><span style=\"text-align:right\">lowercase, numbers, hyphens; unique</span></div></div>",
   "caption": "Description = routing signal. Name: lowercase, numbers, hyphens. Build tab, Skills.",
   "say": "The description is written for the model, not for people. It is the signal the orchestrator matches, so write it for routing. The name uses lowercase letters, numbers and hyphens, never starts or ends with a hyphen, and must be unique inside one agent. You add a skill in the Build tab, under Skills, as a Markdown file with a front matter block holding the name and description, or as a zip with a skill file and supporting files."
  },
  {
   "title": "Skill, or something else?",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Skill or not</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">One-off</span><span style=\"text-align:right\">Agent instructions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Single action</span><span style=\"text-align:right\">Tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fixed sequence</span><span style=\"text-align:right\">Workflow</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Own owner, life cycle</span><span style=\"text-align:right\">Connected agent</span></div></div>",
   "caption": "One-off = instructions. Single action = tool. Fixed sequence = workflow. Own owner = connected agent.",
   "say": "When is a skill the right choice? When the task is a repeatable pattern, it must run the same way each time, and it will be reused beyond one agent. Otherwise pick something else. A one off need belongs in the agent instructions. A single external action is a tool. A fixed sequence with defined inputs and outputs is a workflow, because a workflow enforces the order more strictly than Markdown can. A capability with its own owner and life cycle is a connected agent."
  },
  {
   "title": "Decide: the strict sequence",
   "caption": "Five steps, fixed order, defined inputs and outputs, order must be enforced. Skill?",
   "say": "Your turn. A process has five steps that must always run in the same order, with defined inputs and outputs, and the order must be enforced. A maker wants to write it as a skill. What should they use? A single tool? A workflow? Or a skill, because it runs consistently? Decide before I answer. A workflow. It enforces the order more strictly than Markdown instructions in a skill can. A skill guides behavior, a workflow guarantees the sequence."
  },
  {
   "title": "Portable instructions",
   "caption": "Restate tone, audience and policy. Never hard-code one agent's tools or data.",
   "say": "A skill travels to other agents, so write portable instructions. Restate the tone, the audience and the policy the skill needs, inside the skill itself. And avoid hard coding one agent's tools or data, because assumptions from one agent do not travel to another. A skill that says use the H R lookup tool breaks the day it lands in the Sales agent, which has no such tool."
  },
  {
   "title": "Fixing a skill",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Fixing a skill</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Upload fails</span><span style=\"text-align:right\">YAML front matter, name, description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fires wrongly</span><span style=\"text-align:right\">Refine the description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Wrong output</span><span style=\"text-align:right\">Refine the instructions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Update</span><span style=\"text-align:right\">Edit source, Replace</span></div></div>",
   "caption": "Upload fails: YAML front matter, name, description. Fires wrongly: description. Wrong output: instructions.",
   "say": "How do you fix a skill? If the upload fails, check for invalid front matter, or a name or description that is missing or empty. If the skill fires when it should not, or does not fire when it should, refine the description, because the description is what routes it. If it fires but gives the wrong output, refine the instructions. To update a skill, edit the source file and use Replace."
  },
  {
   "title": "Decide: the eager skill",
   "caption": "A skill keeps activating for requests it was not built for. What do you refine?",
   "say": "Your turn. A refunds skill keeps activating when users ask about shipping times, a request it was never built for. Its output for real refund requests is perfect. What should the maker refine? The name, so it sounds more specific? The instructions inside the skill? Or the description? Decide before I answer. The description. It is the routing signal the orchestrator matches. Wrong output would mean the instructions, but here the routing is the problem."
  },
  {
   "title": "Memory, per user",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Memory (preview)</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Switch</span><span style=\"text-align:right\">On or off per agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Store</span><span style=\"text-align:right\">Separate per user</span></div></div>",
   "caption": "Preview. On or off per agent. A separate memory store for every user.",
   "say": "One more feature of the Microsoft Copilot harness: memory, which is in preview. The maker turns it on or off for each agent. When it is on, the agent keeps a separate memory store for every user. So what one person told the agent is never shared with another person. Think of a locker per user, not one shared noticeboard."
  },
  {
   "title": "The steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Settings › Component collections</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">New collection, add components, save</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Add it to another agent</span></div></div>",
   "caption": "Settings · Component collections · new · add components · save · add to another agent.",
   "say": "Here are the steps for a collection. Open your agent and go to Settings. Find the component collections section. Create a new collection and give it a name. Add components, for example a greeting topic and a tool. Save the collection. Then open another agent and add that collection. Finally, check that you can use its components, but not edit them. That last check proves the box is protected."
  },
  {
   "title": "One box, three agents",
   "caption": "Collection for shared pieces, solution for the trip, skill for reusable behavior.",
   "say": "Back to Contoso. The greeting and escalation pieces now live in one collection, used by the I T, H R and Sales agents, and one fix reaches all three. When connectors arrived, the collection moved to production inside a solution. On the Microsoft Copilot harness, reusable behavior is a skill. Remember for the exam: consumers cannot edit, solutions carry heavy collections, and a skill that fires wrongly needs a better description."
  }
 ],
 "check": [
  {
   "stem": "What can you do with the components of a collection in another agent?",
   "options": [
    "Edit them freely",
    "Only view them in the collection",
    "Nothing, they are locked",
    "Use them, but you cannot edit them"
   ],
   "answer": 3,
   "explanation": "Authors can use the collection but cannot change its components."
  },
  {
   "stem": "A collection includes connectors and environment variables. What is recommended?",
   "options": [
    "Export the whole agent as a single file",
    "Copy and paste each connector by hand",
    "Use a solution as a carrier",
    "Delete the connectors and the variables"
   ],
   "answer": 2,
   "explanation": "For complex collections you use solutions as carriers: you add it, export it, and import it."
  },
  {
   "stem": "Which of these is NOT packaged in a component collection?",
   "options": [
    "Tools and their descriptions",
    "Topics and their trigger phrases",
    "Child agents and their knowledge",
    "User passwords"
   ],
   "answer": 3,
   "explanation": "A collection packages topics, tools, knowledge, flows, entities, child agents, and MCP; not passwords."
  }
 ],
 "reto": {
  "text": "In an agent, open Settings and find Component collections.\nCreate a collection with a greeting topic.\nNote which agents in your environment could reuse it.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-export-import-copilot-components"
},
{
 "id": "L07",
 "module": 1,
 "title": "Internal and external audiences",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "1.1g"
 ],
 "theory": {
  "intro": "Serving employees is not the same as serving the anonymous public. It is like an office: the staff door asks for a badge, while the public service desk is open to everyone. Depending on who uses your agent, the way you protect it changes.",
  "sections": [
   {
    "heading": "Employees: Authenticate with Microsoft",
    "body": "With Authenticate with Microsoft the user always signs in (Require users to sign in stays on) and the Share option controls who in the organization can chat. It is the natural option for an internal audience.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Audience</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Employees</span><span style=\"text-align:right\">Authenticate with Microsoft + Share</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Anonymous public</span><span style=\"text-align:right\">No authentication (with care)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Own website</span><span style=\"text-align:right\">Require secured access</span></div></div>"
   },
   {
    "heading": "Anonymous public: No authentication",
    "body": "With No authentication, anyone with the link can talk to the agent. Use it with care and only when the agent does not touch internal data. With Generic OAuth 2 you cannot use Share to control which specific users in your organization chat."
   },
   {
    "heading": "Own website: Require secured access",
    "body": "With Require secured access, the channels require the client to authenticate with a secret or with a token generated from that secret. It protects access to the web channel, but it does not force each end user to authenticate."
   },
   {
    "heading": "The secret never goes to the browser",
    "body": "If the code runs in the browser, the secret must not be exposed. Your own service exchanges the secret for a token (valid for a single conversation and it expires if it is not refreshed) and only gives the token to the page.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Browser</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Contoso</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">server</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Token</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agent</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">The secret never reaches the browser</text></svg>"
   }
  ],
  "steps": [
   "Open your agent and go to Settings, Security.",
   "Review Web channel security.",
   "Turn on Require secured access.",
   "Look at which secrets are generated and store them only on your server.",
   "On your server, create a service that uses the secret to request a token.",
   "Make the web page receive only the token, never the secret.",
   "Test the conversation from the page."
  ],
  "example": "The Contoso intranet uses Authenticate with Microsoft: employees sign in and Share limits who can chat. The public Contoso website uses Require secured access: the secret lives only on the Contoso server, which generates one token per conversation and hands it to the page. If the secret were in the page code, any visitor could read it, copy it, and use it to open conversations with the agent.",
  "examTips": [
   "To protect an agent embedded in your own site: Require secured access with a token generated on the server.",
   "Trap: putting the secret in the browser code, where anyone can read it.",
   "Authenticate with Microsoft: mandatory sign-in + Share; No authentication: open to anyone with the link."
  ],
  "glossary": [
   {
    "term": "Require secured access",
    "def": "An option that requires a secret or a token to use the agent's web channel."
   },
   {
    "term": "Token",
    "def": "A temporary credential generated with the secret; valid for a single conversation."
   },
   {
    "term": "Share",
    "def": "An option that controls which people in the organization can chat with the agent."
   }
  ]
 },
 "scenes": [
  {
   "title": "One agent, two doors",
   "caption": "Contoso wants Nexo on the intranet and the public website. Valeria pastes the secret into the page code, and a visitor copies it.",
   "say": "Contoso wants Nexo in two places. On the intranet, for employees. And on the public website, for customers. Valeria connects the website fast. She pastes the secret straight into the page code. That afternoon, a visitor opens the page source and copies it. Today you learn how to protect an agent for each audience, and where that secret must live."
  },
  {
   "title": "The staff door and the public desk",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two doors</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Staff door</span><span style=\"text-align:right\">Asks for a badge (employees)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Public desk</span><span style=\"text-align:right\">Open to everyone (customers)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rule</span><span style=\"text-align:right\">Who uses the agent decides how you protect it</span></div></div>",
   "caption": "Employees enter through the staff door with a badge. The public desk is open to everyone. Who uses the agent decides how you protect it.",
   "say": "Think of the Contoso office. Employees enter through the staff door, and the door asks for a badge. Customers go to the public desk, which is open to everyone. Same building, two very different doors. Your agent works the same way. Who uses it decides how you protect it."
  },
  {
   "title": "Employees: Authenticate with Microsoft",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Employees</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Setting</span><span style=\"text-align:right\">Authenticate with Microsoft</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Sign-in</span><span style=\"text-align:right\">The user always signs in</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Share</span><span style=\"text-align:right\">Controls who in the organization can chat</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams + Microsoft 365</span><span style=\"text-align:right\">Support only this option</span></div></div>",
   "caption": "Authenticate with Microsoft: the user always signs in, and Share controls who can chat. Teams and Microsoft 365 support only this option.",
   "say": "For employees, use Authenticate with Microsoft. That is the badge. The user always signs in. Then the Share option controls who in the organization can chat with the agent. So Marta from sales gets in, because the agent is shared with her team. And remember: the Teams and Microsoft three sixty five channels support only this option."
  },
  {
   "title": "Anonymous public: No authentication",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Anonymous public</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Setting</span><span style=\"text-align:right\">No authentication</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who</span><span style=\"text-align:right\">Anyone with the link</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Only if</span><span style=\"text-align:right\">The agent does not touch internal data</span></div></div>",
   "caption": "With No authentication, anyone with the link can talk to the agent. Use it with care, only when the agent does not touch internal data.",
   "say": "For the anonymous public, there is No authentication. That is the open desk. Anyone with the link can talk to the agent, and nobody signs in. Use it with care. Only choose it when the agent does not touch internal data, like a public returns policy."
  },
  {
   "title": "Decide: only the HR team",
   "caption": "Nexo answers HR questions. Only members of the HR security group may chat, controlled with Share. Which setting makes this possible?",
   "say": "Your turn. Nexo now answers questions about salaries and leave. Compliance says only members of the HR security group may chat, controlled with the Share option. Which setting makes this possible? Authenticate with Microsoft and Share? No authentication with a private link? Or Require secured access with one secret? Decide before I answer. Authenticate with Microsoft and Share it with the group. Users always sign in, and Share decides who in the organization can chat. A private link protects nothing."
  },
  {
   "title": "Own website: Require secured access",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Own website</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">By default</span><span style=\"text-align:right\">Anyone with the agent ID can use Demo and Custom website</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Require secured access</span><span style=\"text-align:right\">Client needs a secret or a token</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Protects</span><span style=\"text-align:right\">The web channel, not each end user</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Takes effect</span><span style=\"text-align:right\">Up to two hours</span></div></div>",
   "caption": "Require secured access: the client needs a secret or a token from it. It protects the web channel, not each user. Up to two hours.",
   "say": "Now the public website. By default, anyone who knows the agent's ID can use the Demo website and Custom website channels. To close that, turn on Require secured access. Now the client must authenticate with a secret, or with a token generated from that secret. Careful: this protects the web channel. It does not make each customer sign in. And the change can take up to two hours to apply."
  },
  {
   "title": "Decide: will customers sign in?",
   "caption": "Contoso turns on Require secured access for its public website. Marketing worries every customer must now sign in. What is true?",
   "say": "Your turn. Contoso turns on Require secured access for its public website. Marketing worries that every customer must now create an account. What is true? Every customer must sign in with Microsoft? It only applies to users outside the network? Or the page client needs a secret or a token? Decide before I answer. The page client needs a secret or a token. Require secured access protects the web channel. Customers still chat without signing in."
  },
  {
   "title": "The secret never goes to the browser",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The secret</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Browser code</span><span style=\"text-align:right\">Anyone can read it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Secret</span><span style=\"text-align:right\">Only on your own server</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Token</span><span style=\"text-align:right\">Made from the secret, one conversation</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Page</span><span style=\"text-align:right\">Receives only the token</span></div></div>",
   "caption": "Browser code is readable by anyone. Contoso's server exchanges the secret for a token for one conversation and gives the page only the token.",
   "say": "Here is Valeria's mistake. Code that runs in the browser can be read by anyone. So the secret must never be there. Instead, Contoso's own server keeps the secret, like a safe in the back room. When a visitor opens the page, the server exchanges the secret for a token. The token is valid for a single conversation, and it expires if it isn't refreshed. The page only ever receives the token."
  },
  {
   "title": "Decide: the secret in the page",
   "caption": "The secret sits in the website's JavaScript and any visitor can copy it. Valeria must keep the agent protected. What should she do?",
   "say": "Your turn. The secret sits in the website's JavaScript, and any visitor can copy it. Valeria must fix this and keep the agent protected. What should she do? Move the secret into an HTML comment? Turn off Require secured access entirely? Or have the server send the page a token? Decide before I answer. Have the server send the page a token. The secret stays on the server. An HTML comment is still readable, and turning security off opens the channel."
  },
  {
   "title": "Secure the web channel in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Settings › Security › Web channel security</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Turn on Require secured access</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Store the secrets only on your server</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Server service requests a token</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Page gets only the token › test</span></div></div>",
   "caption": "Settings › Security › Web channel security: turn on Require secured access, keep the secrets on your server, give the page only a token, test.",
   "say": "Here is how it looks in the studio. Open Nexo and go to Settings, then Security. Open Web channel security and turn on Require secured access. Look at the secrets it generates, and store them only on your server. On the server, create a service that uses the secret to request a token. Make the web page receive only the token. Then test a conversation from the page."
  },
  {
   "title": "Two doors, one agent",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Employees</span><span style=\"text-align:right\">Authenticate with Microsoft + Share</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Anonymous public</span><span style=\"text-align:right\">No authentication, no internal data</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Own website</span><span style=\"text-align:right\">Require secured access, token from the server</span></div></div>",
   "caption": "Employees: Authenticate with Microsoft plus Share. Public: No authentication, without internal data. Own website: Require secured access, token from the server.",
   "say": "Back at Contoso. Marta signs in on the intranet, and the web visitor chats with a token, never seeing the secret. Remember three things. Employees: Authenticate with Microsoft, and Share decides who chats. Anonymous public: No authentication, only without internal data. Your own website: Require secured access, with the token made on the server. That closes module one. Next, variables and scope."
  }
 ],
 "check": [
  {
   "stem": "With Authenticate with Microsoft, what does the Share option control?",
   "options": [
    "The channels where the agent is shown",
    "The language used in the chat window",
    "The agent's color and its avatar image",
    "Who in the organization can chat"
   ],
   "answer": 3,
   "explanation": "Share controls who in the organization can chat with the agent."
  },
  {
   "stem": "Where should the Require secured access secret live on a website?",
   "options": [
    "In the page title and the HTML comments",
    "In the URL query string of the page",
    "On the site's server, not in the page",
    "In the browser code, next to the page script"
   ],
   "answer": 2,
   "explanation": "The secret must stay on the server, which gives only a token to the page."
  },
  {
   "stem": "Does Require secured access make each end user sign in?",
   "options": [
    "Yes, every user must sign in with their own Microsoft account before they can chat",
    "No, it only requires the client to authenticate with a secret or a token",
    "Yes, but only for users who connect from outside the organization network",
    "No, because the Share option already makes the secret optional for web chats"
   ],
   "answer": 1,
   "explanation": "Require secured access protects the web channel: the client must authenticate with a secret or a token generated from it. It does not force each end user to authenticate."
  }
 ],
 "reto": {
  "text": "Open Settings, Security and review Web channel security.\nTurn on Require secured access and look at which secrets are generated.\nDraw who would issue the token on a Contoso web page.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security"
},
{
 "id": "L08",
 "module": 2,
 "title": "Variables and scope",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "1.3i"
 ],
 "theory": {
  "intro": "A variable is a small named box where the agent keeps a piece of data to use later, like the user's name or a ticket number. The scope says who can open that box: only one topic or the whole agent.",
  "sections": [
   {
    "heading": "The four scopes",
    "body": "Topic variables live only in the topic where you create them; this is the default scope. Global variables (prefix Global.) work in all topics. System variables are created by Copilot Studio, like System.Activity.Text, which holds the last thing the user typed. Environment variables (prefix Env.) are created in Power Platform.",
    "visual": "<svg viewBox=\"0 0 340 150\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"4\" width=\"160\" height=\"56\" rx=\"6\"/><text x=\"82\" y=\"29\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topic</text><text x=\"82\" y=\"43\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">this topic only</text><rect x=\"178\" y=\"4\" width=\"160\" height=\"56\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"258\" y=\"29\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Global.</text><text x=\"258\" y=\"43\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">all topics</text><rect x=\"2\" y=\"80\" width=\"160\" height=\"56\" rx=\"6\" style=\"stroke:var(--muted)\" stroke-dasharray=\"4 3\"/><text x=\"82\" y=\"105\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">System.</text><text x=\"82\" y=\"119\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">made by Copilot Studio</text><rect x=\"178\" y=\"80\" width=\"160\" height=\"56\" rx=\"6\"/><text x=\"258\" y=\"105\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Env.</text><text x=\"258\" y=\"119\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">per environment</text></svg>"
   },
   {
    "heading": "Changing the scope",
    "body": "If a piece of data must be used in several topics, you change the variable's scope from topic to global in the variable's properties panel. This way you don't ask the same question again in every topic."
   },
   {
    "heading": "The type is set once",
    "body": "A variable takes its type from its first assignment. If it starts with a numeric value, it is a Number, and assigning text to it later causes an error. The types include String, Boolean, Number, Table, Record, DateTime, Choice, and Blank.",
    "visual": "<svg viewBox=\"0 0 360 110\" role=\"img\" aria-label=\"First assignment → Fixed type → Other type: error\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\"/><text x=\"54\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">First</text><text x=\"54\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">assignment</text><line x1=\"108\" y1=\"39\" x2=\"122\" y2=\"39\"/><polygon points=\"126,39 119,35.5 119,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"128\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"180\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Fixed</text><text x=\"180\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">type</text><line x1=\"234\" y1=\"39\" x2=\"248\" y2=\"39\"/><polygon points=\"252,39 245,35.5 245,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"254\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\"/><text x=\"306\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Other type:</text><text x=\"306\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">error</text><text x=\"180\" y=\"94\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">The type is decided only once</text></svg>"
   },
   {
    "heading": "Environment variables",
    "body": "Environment variables are read-only in Copilot Studio: the administrator changes them in Power Apps. They let you move an agent between environments without touching its logic, for example with a different URL in development and in production. If they change, you must republish the agent (except secret-type ones, which are read at runtime)."
   }
  ],
  "steps": [
   "Open a topic and add a Question node that asks for the name.",
   "Under Save user response as, create a new variable with a clear name.",
   "Select the variable and open its properties panel (Variable properties).",
   "Change its scope to global if other topics also need it.",
   "In another topic, add a Message and use the insert variable icon to show it.",
   "Test in the test chat and check the variables panel.",
   "Try assigning a value of a different type and watch the error."
  ],
  "example": "Contoso stores the employee number in the variable Global.EmployeeId the first time someone types it. This way the vacation topic and the payroll topic reuse it without asking again. The inventory API URL lives in Env.ApiBaseUrl: in development it points to a test server and in production to the real one, without changing a single node. And if someone tries to save text in a numeric variable, the agent shows an error.",
  "examTips": [
   "To use a piece of data in several topics: change the scope to global.",
   "Trap: assigning a String to a variable that is already a Number; the type is fixed and it fails.",
   "Environment variables are read-only in Copilot Studio; they are edited in Power Platform."
  ],
  "glossary": [
   {
    "term": "Scope",
    "def": "The reach of a variable: topic, global, system, or environment."
   },
   {
    "term": "System variable",
    "def": "A variable created by Copilot Studio with data about the conversation or the user."
   },
   {
    "term": "Environment variable",
    "def": "A Power Platform variable, read-only in Copilot Studio, useful for moving solutions between environments."
   },
   {
    "term": "Base type",
    "def": "The data type of a variable, fixed at its first assignment."
   }
  ]
 },
 "scenes": [
  {
   "title": "Asked twice",
   "caption": "Marta types her employee number in the vacation topic. In the payroll topic, Nexo asks for the same number again.",
   "say": "Marta opens Nexo to ask about her vacation. Nexo asks for her employee number, and she types it. Then she asks about her payslip. Nexo asks for the same number again. Marta sighs. Today you learn where an agent keeps data, and who can use it."
  },
  {
   "title": "A named box and who can open it",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">A named box</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Variable</span><span style=\"text-align:right\">One piece of data kept for later</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Scope</span><span style=\"text-align:right\">Who can open the box</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Reach</span><span style=\"text-align:right\">One topic or the whole agent</span></div></div>",
   "caption": "A variable is a named box that keeps data for later. The scope says who can open it: one topic or the whole agent.",
   "say": "Think of a variable as a small box with a name on it. Inside, the agent keeps one piece of data to use later, like a name or a ticket number. The scope says who can open the box. Only one topic, or the whole agent. Contoso's problem is simple: the box was locked inside one topic."
  },
  {
   "title": "Topic and Global",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Topic and Global</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topic</span><span style=\"text-align:right\">Default · only in its own topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Global.</span><span style=\"text-align:right\">Works in all topics</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Global.EmployeeId</span><span style=\"text-align:right\">Filled once, reused everywhere</span></div></div>",
   "caption": "A new variable is a topic variable by default and lives only in its topic. A Global. variable works in all topics.",
   "say": "When you create a variable, it is a topic variable by default. It lives only in the topic where you created it. The payroll topic cannot see it, so it asks again. A global variable carries the prefix Global dot, and it works in all topics. So Global dot EmployeeId is filled once, and every topic reuses it."
  },
  {
   "title": "Decide: one number, many topics",
   "caption": "The vacation topic saves the employee number in a topic variable. Payroll and benefits need it without asking again. What should you do?",
   "say": "Your turn. Contoso's vacation topic saves the employee number in a topic variable. The payroll and benefits topics need the same number without asking again. What should you do? Copy the question into every topic? Change the variable scope to global? Or make it a new system variable instead? Decide before I answer. Change the variable scope to global. You do it in the variable's properties panel. Copying the question only asks the user again, and you cannot create system variables."
  },
  {
   "title": "System variables",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">System variables</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Created by</span><span style=\"text-align:right\">Copilot Studio</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">System.Activity.Text</span><span style=\"text-align:right\">The user's last message</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">System.User.DisplayName</span><span style=\"text-align:right\">The user's name</span></div></div>",
   "caption": "Copilot Studio creates system variables: System.Activity.Text holds the user's last message, System.User.DisplayName the user's name.",
   "say": "Some boxes come already filled. Copilot Studio creates system variables for you. System dot Activity dot Text holds the last thing the user typed. System dot User dot DisplayName holds the user's name. You read them, but you do not create them."
  },
  {
   "title": "The type is set once",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The type</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Set by</span><span style=\"text-align:right\">The first assignment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Starts as a number</span><span style=\"text-align:right\">Stays a Number</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Text later</span><span style=\"text-align:right\">Error</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Types</span><span style=\"text-align:right\">String, Boolean, Number, Table, Record, DateTime, Choice, Blank</span></div></div>",
   "caption": "A variable takes its type from its first assignment. Start with a number and it stays a Number: text later causes an error.",
   "say": "Each box also has a shape, called its type. A variable takes its type from its first assignment. If it starts with a number, it stays a Number. Later, if you try to put text in it, you get an error. The types include String, Boolean, Number, Table, Record, DateTime, Choice and Blank."
  },
  {
   "title": "Decide: text in a number box",
   "caption": "Valeria first sets Global.EmployeeId to the number 4215. Later a node saves the text E4215 in it. What happens?",
   "say": "Your turn. Valeria first sets Global dot EmployeeId to the number four two one five. Later, a node saves the text E four two one five in the same variable. What happens? An error: the type is already Number? It quietly converts itself to a String? Or the text is stored as the number zero? Decide before I answer. An error: the type is already Number. The type comes from the first assignment, and it does not change. If an ID can have letters, start it as text."
  },
  {
   "title": "Environment variables",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Environment variables</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Prefix</span><span style=\"text-align:right\">Env.</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Created in</span><span style=\"text-align:right\">Power Platform</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">In Copilot Studio</span><span style=\"text-align:right\">Read-only · edited in Power Apps</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Dev vs prod</span><span style=\"text-align:right\">Different value, same nodes</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Value changes</span><span style=\"text-align:right\">Republish (except secret-type)</span></div></div>",
   "caption": "Env.ApiBaseUrl holds a test address in development and the real one in production. Read-only in Copilot Studio, edited in Power Apps.",
   "say": "Now the inventory interface. In development it must call a test server, and in production the real one. Contoso keeps that address in an environment variable, Env dot ApiBaseUrl. Environment variables are created in Power Platform, and they are read-only in Copilot Studio. The administrator changes their values in Power Apps, not in the topic. So the same agent moves between environments without touching a single node. If a value changes, you republish the agent, except for secret-type ones, which are read at runtime."
  },
  {
   "title": "Decide: test server, real server",
   "caption": "Nexo's inventory address differs in development and production. Contoso wants to move the agent without editing nodes. What should you use?",
   "say": "Your turn. Nexo calls an inventory address that is different in development and in production. Contoso wants to move the agent without editing any node. What should you use? A global variable set in every topic? A system variable that holds the address? Or an environment variable for the address? Decide before I answer. An environment variable for the address. It separates the parameter from the logic, and the administrator sets each value in Power Apps. A global variable still means editing the agent, and you cannot create system variables."
  },
  {
   "title": "Make it global in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Question node › Save user response as</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">New variable EmployeeId</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Variable properties › scope global</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Other topic › Message › insert Global.EmployeeId</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Test chat › variables panel</span></div></div>",
   "caption": "Question node › Save user response as › new variable › Variable properties › scope global › insert it in another topic › test.",
   "say": "Here is how it looks in the studio. Open the vacation topic and add a Question node that asks for the employee number. Under Save user response as, create a variable called EmployeeId. Select it, open Variable properties, and change its scope to global. In the payroll topic, add a Message and insert Global dot EmployeeId. Test in the test chat and watch the variables panel."
  },
  {
   "title": "One box for the whole agent",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topic</span><span style=\"text-align:right\">Default, one topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Global.</span><span style=\"text-align:right\">All topics</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">System.</span><span style=\"text-align:right\">Created by Copilot Studio</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Env.</span><span style=\"text-align:right\">Power Platform, read-only here</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Type</span><span style=\"text-align:right\">Fixed by the first value</span></div></div>",
   "caption": "Topic is the default, Global. works in all topics, System. comes from Copilot Studio, Env. is read-only. The first value fixes the type.",
   "say": "Back to Marta. She types her number once, and the payroll topic greets her with it. Remember four boxes. Topic is the default, and Global dot works in all topics. System variables come from Copilot Studio. Env dot comes from Power Platform and is read-only here. And the first value fixes the type. Next, formatted responses."
  }
 ],
 "check": [
  {
   "stem": "Which prefix do global variables have?",
   "options": [
    "Global.",
    "System.",
    "Topic.",
    "Env."
   ],
   "answer": 0,
   "explanation": "Global variables have the prefix Global. and can be used in all topics."
  },
  {
   "stem": "A variable started as a Number and you assign text to it. What happens?",
   "options": [
    "It gives an error",
    "It becomes global",
    "It becomes a String",
    "It is deleted"
   ],
   "answer": 0,
   "explanation": "The type is set by the first assignment and cannot change; assigning another type gives an error."
  },
  {
   "stem": "Who creates system variables?",
   "options": [
    "Copilot Studio",
    "The user",
    "The maker",
    "The Azure administrator"
   ],
   "answer": 0,
   "explanation": "System variables are created automatically by Copilot Studio, like System.Activity.Text."
  },
  {
   "stem": "You need to use a piece of data in several topics. What do you do?",
   "options": [
    "Copy it by hand into every topic",
    "Create a new agent for each topic",
    "Change the variable to global scope",
    "Use System.Activity.Text"
   ],
   "answer": 2,
   "explanation": "Changing the scope to global makes the variable available in all topics."
  }
 ],
 "reto": {
  "text": "Create a topic that asks for the name and saves it in a variable.\nChange its scope to global and read it in another topic.\nTry assigning a different type and watch the error.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about"
},
{
 "id": "L09",
 "module": 2,
 "title": "Formatted responses",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "1.3b"
 ],
 "theory": {
  "intro": "A good agent does more than answer: it answers in the right shape. Sometimes you want exact text, other times a list of buttons or a card. It is like choosing between a handwritten note and a form with checkboxes.",
  "sections": [
   {
    "heading": "The Message node",
    "body": "The Message node sends a message to the user. It can include basic formatting, variables, message variations, images, videos, cards, and quick replies. The Question node has all of these abilities too.",
    "visual": "<svg viewBox=\"0 0 360 84\" role=\"img\" aria-label=\"Quick replies versus Multiple choice\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"2\" width=\"170\" height=\"80\" rx=\"8\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><rect x=\"188\" y=\"2\" width=\"170\" height=\"80\" rx=\"8\"/><text x=\"87\" y=\"22\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"bold\">Quick replies</text><text x=\"273\" y=\"22\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"bold\">Multiple choice</text><text x=\"87\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Suggest options</text><text x=\"87\" y=\"66\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">User can ignore them</text><text x=\"273\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Force a choice</text><text x=\"273\" y=\"66\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Question node</text></svg>"
   },
   {
    "heading": "Suggesting is not forcing",
    "body": "Quick replies suggest answers, but the user can ignore them and type freely. To make the user pick from a list, use a Question node with multiple choice. Message variations only make the agent pick one of several wordings at random."
   },
   {
    "heading": "Responding after a tool",
    "body": "In a tool, the After running option sets how the agent responds when the tool finishes. Don't respond (the default) lets the agent fold the output into its own answer. Write the response with generative AI makes the AI write the reply. Send specific response uses your template with variables.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">After a tool runs (After running)</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Send specific response</span><span style=\"text-align:right\">template + variables</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Don't respond</span><span style=\"text-align:right\">the agent writes it</span></div></div>"
   },
   {
    "heading": "Exact text with a template",
    "body": "With Send specific response, you write a template and insert output variables, even with Power Fx formulas. The model does not rewrite it, so the text is exactly what you defined. There is also a Send an adaptive card option for interactive responses."
   }
  ],
  "steps": [
   "Open a topic and add a Message node with Add node.",
   "Type the text and use the variable icon to insert a value.",
   "On the node toolbar, select Add and choose Quick reply to suggest options.",
   "To force a choice, add a Question node with multiple choice.",
   "Open a tool and find After running in its settings.",
   "Choose Send specific response and write the template with output variables.",
   "Compare the result in the test chat with Don't respond."
  ],
  "example": "After looking up a ticket, the Contoso agent uses Send specific response with the template \"Ticket {number}, status {status}\". The user always sees \"Ticket 4821, status In progress\", word for word, because the model does not rewrite the reply. To choose the request type (hardware, software, or access), Contoso uses a multiple choice Question, not quick replies, because the user must pick one of the options.",
  "examTips": [
   "Exact, controlled response after a tool: Send specific response.",
   "Trap: using quick replies to restrict options. They only suggest; they do not force.",
   "To require a choice from a list: a Question node with multiple choice."
  ],
  "glossary": [
   {
    "term": "Quick reply",
    "def": "A button that suggests an answer. The user can ignore it and type something else."
   },
   {
    "term": "Message variation",
    "def": "An alternative wording. The agent picks one at random each time."
   },
   {
    "term": "After running",
    "def": "A tool setting that defines how the agent responds when the tool finishes."
   },
   {
    "term": "Send specific response",
    "def": "A reply built from a template and variables, with no model involvement."
   }
  ]
 },
 "scenes": [
  {
   "title": "The same ticket, two answers",
   "caption": "Contoso's help desk agent words the same ticket status differently each day, and users type any request type they like.",
   "say": "Contoso's help desk agent looks up a ticket. On Monday it says the ticket is in progress. On Tuesday, same ticket, it says someone is probably working on it. The service manager wants the exact status, every time. And when users must pick a request type, they type whatever they like. Today you learn how to give each answer the right shape."
  },
  {
   "title": "A note or a form",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two shapes</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Handwritten note</span><span style=\"text-align:right\">Any words</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Form with checkboxes</span><span style=\"text-align:right\">Only the boxes you print</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rule</span><span style=\"text-align:right\">Choose the shape on purpose</span></div></div>",
   "caption": "A handwritten note can say anything. A form with checkboxes only accepts the boxes you print. Choose the shape on purpose.",
   "say": "Think of two ways to answer a customer. A handwritten note can say anything, in any words. A form with checkboxes only accepts the boxes you print. A good agent chooses the shape on purpose. Sometimes exact text, sometimes buttons, sometimes a card."
  },
  {
   "title": "The Message node",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The Message node</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Text</span><span style=\"text-align:right\">Basic formatting + variables</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Media</span><span style=\"text-align:right\">Images, videos, cards</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Options</span><span style=\"text-align:right\">Quick replies, message variations</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Question node</span><span style=\"text-align:right\">Can do all of this too</span></div></div>",
   "caption": "The Message node sends formatting, variables, images, videos, cards, quick replies and message variations. The Question node can too.",
   "say": "The Message node sends a message to the user. It can carry basic formatting and variables, like the user's name. It can show images, videos and cards. It can add quick replies and message variations. The Question node can do all of this too."
  },
  {
   "title": "Decide: a less robotic greeting",
   "caption": "The greeting uses the same words every time. Users say the agent sounds robotic, and the meaning must stay. What should you add?",
   "say": "Your turn. Contoso's greeting uses exactly the same words every single time. Users say the agent sounds robotic, and the meaning must stay the same. What should you add? Quick replies under the greeting? Message variations on the node? Or an adaptive card with the greeting? Decide before I answer. Message variations on the node. The agent picks one of several wordings at random each time. Quick replies and cards change the shape, not the wording."
  },
  {
   "title": "Suggesting is not forcing",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Suggest vs force</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Quick replies</span><span style=\"text-align:right\">Only suggest · user can type anything</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Question, multiple choice</span><span style=\"text-align:right\">User must pick one option</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Message variations</span><span style=\"text-align:right\">Random wording, same meaning</span></div></div>",
   "caption": "Quick replies only suggest: the user can ignore them and type anything. A Question node with multiple choice forces the pick.",
   "say": "Now the request type. Valeria adds quick replies: hardware, software, access. They look like a choice, but they only suggest. The user can ignore them and type anything at all. To make the user pick from a list, use a Question node with multiple choice. Then the answer is always one of your options."
  },
  {
   "title": "Decide: one of three types",
   "caption": "A ticket must be hardware, software or access, and nothing else. Users must not type a different type. What should Contoso use?",
   "say": "Your turn. A ticket must be labelled hardware, software or access, and nothing else. Users must not be able to type a different type. What should Contoso use? A multiple choice Question node? Quick replies on a Message node? Or message variations for each type? Decide before I answer. A multiple choice Question node. The user must pick one of your options. Quick replies only suggest, and the user can still type freely."
  },
  {
   "title": "After running",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">After running</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Don't respond</span><span style=\"text-align:right\">Default · output folded into the agent's answer</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Write the response with generative AI</span><span style=\"text-align:right\">The AI writes the reply</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Send specific response</span><span style=\"text-align:right\">Your template + variables</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Send an adaptive card</span><span style=\"text-align:right\">Interactive card</span></div></div>",
   "caption": "After running sets how the agent responds when a tool finishes: Don't respond (default), generative AI, specific response, or adaptive card.",
   "say": "Next, tools. When a tool finishes, the After running option decides how the agent responds. Don't respond is the default: the agent folds the output into its own answer. Write the response with generative AI lets the AI write the reply. Send specific response uses your own template with variables. And Send an adaptive card shows an interactive card."
  },
  {
   "title": "Exact text with a template",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Exact text</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Template</span><span style=\"text-align:right\">Ticket {number}, status {status}</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Extras</span><span style=\"text-align:right\">Output variables, Power Fx</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Model</span><span style=\"text-align:right\">Does not rewrite it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">User sees</span><span style=\"text-align:right\">Ticket 4821, status In progress</span></div></div>",
   "caption": "Send specific response: a template with output variables, even Power Fx. The model does not rewrite it: Ticket 4821, status In progress.",
   "say": "Back to the ticket. With Send specific response, Valeria writes a template with two output variables, the ticket number and the status. She can even use Power Fx formulas. The model does not rewrite it. So the user always sees Ticket four eight two one, status In progress, word for word. Every single time."
  },
  {
   "title": "Decide: the exact status",
   "caption": "After the ticket lookup tool runs, the manager wants the same exact sentence with number and status, no rewording. Which option fits?",
   "say": "Your turn. After the ticket lookup tool runs, the service manager wants the same exact sentence with the number and the status. No rewording by the model. Which After running option fits? Write the response with generative AI? Don't respond, the default setting? Or Send specific response, a template? Decide before I answer. Send specific response, a template. The model does not rewrite it, so the text is exactly what you defined. Generative AI rewords the reply, and Don't respond folds it into the agent's own answer."
  },
  {
   "title": "Shape the answers in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Add node › Message node</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Variable icon › insert a value</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Toolbar › Add › Quick reply</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Force a choice: Question node, multiple choice</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Tool › After running › Send specific response</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Template + output variables › test chat</span></div></div>",
   "caption": "Message node › variable icon › Add › Quick reply; Question node with multiple choice; tool › After running › Send specific response › test.",
   "say": "Here is how it looks in the studio. Open a topic, select Add node, and add a Message node. Type the text and use the variable icon to insert a value. On the node toolbar, select Add, then Quick reply. To force a choice, add a Question node with multiple choice instead. Then open the ticket tool, find After running, and choose Send specific response. Write the template with output variables, and compare it in the test chat with Don't respond."
  },
  {
   "title": "The right shape for each answer",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Wording varies</span><span style=\"text-align:right\">Message variations</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Suggest</span><span style=\"text-align:right\">Quick replies</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Force a choice</span><span style=\"text-align:right\">Question, multiple choice</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Exact text after a tool</span><span style=\"text-align:right\">Send specific response</span></div></div>",
   "caption": "Variations change the wording. Quick replies suggest, a multiple choice Question forces. After a tool, Send specific response gives exact text.",
   "say": "Back at the help desk. Every user now sees the exact ticket status, and every ticket has a valid type. Remember three shapes. Message variations change the wording at random. Quick replies only suggest, and a multiple choice Question forces the choice. After a tool, Send specific response gives exact text from your template. Next, the generative answers node."
  }
 ],
 "check": [
  {
   "stem": "What forces the user to pick an option from a list?",
   "options": [
    "A message with an image and a caption",
    "A Question node set to multiple choice",
    "Message variations",
    "Quick replies"
   ],
   "answer": 1,
   "explanation": "Quick replies only suggest. Multiple choice requires the user to pick from the list."
  },
  {
   "stem": "What do message variations do?",
   "options": [
    "They call a tool and wait for its result",
    "They translate the message into the user's language",
    "They pick one wording at random each time",
    "They force the user to make a choice"
   ],
   "answer": 2,
   "explanation": "Each time the node runs, the agent picks one of the variations at random."
  },
  {
   "stem": "You want exact text with variables after a tool. What do you choose in After running?",
   "options": [
    "Write the response with generative AI",
    "Send specific response",
    "None of them",
    "Don't respond"
   ],
   "answer": 1,
   "explanation": "Send specific response uses your template with variables, and the model does not rewrite it."
  }
 ],
 "reto": {
  "text": "Create a topic with a multiple choice Question that has three options.\nAdd a tool and try both After running options.\nCompare how the response changes in the test chat.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-send-message"
},
{
 "id": "L10",
 "module": 2,
 "title": "Generative answers node",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "1.3g"
 ],
 "theory": {
  "intro": "The Generative answers node is like a librarian. It takes a question, searches the sources you point to, and writes an answer from what it finds. You decide which shelves it can search.",
  "sections": [
   {
    "heading": "What the node does",
    "body": "With this node, the agent answers from knowledge sources inside a topic. Sources can be documents uploaded to Dataverse, SharePoint, public websites, and more. If no topic matches, the agent also uses generative answers as a fallback.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Question</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Generative</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">answers</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Sources</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Answer</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Option: save to a variable</text></svg>"
   },
   {
    "heading": "Search only selected sources",
    "body": "With this setting off (the default), the node searches all of the agent's sources. When it is on, the node searches only the sources you select, and they replace the agent's sources for that node. There is no fallback to the agent's sources."
   },
   {
    "heading": "Customizing the response",
    "body": "To show the answer in an Adaptive Card, save the answer in a global variable and clear the Send a message checkbox. Then the agent no longer returns the answer right away, and you present it however you like.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Generative answers node Properties</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Search only selected sources</span><span style=\"text-align:right\">On</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Chosen source</span><span style=\"text-align:right\">HR policies SharePoint</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Send a message</span><span style=\"text-align:right\">Cleared: you add the citations</span></div></div>"
   },
   {
    "heading": "Citations and moderation",
    "body": "In Teams, citations are returned automatically only for responses you have not customized. If you customize, you must include their rendering yourself. The node also has its own moderation level, from Lowest to Highest. The default is High."
   }
  ],
  "steps": [
   "Open the Topics page and enter the topic you want.",
   "Select Add node (+), point to Advanced, and choose Generative answers.",
   "A node called Create generative answers appears.",
   "Select the three dots on the node and choose Properties.",
   "Under Input, select the System.Activity.Text variable.",
   "Turn on Search only selected sources and choose the source you want.",
   "Test with a question that only another source knows, and see what happens."
  ],
  "example": "In the HR policies topic, Contoso turns on Search only selected sources and picks only the policies SharePoint site. That way, documents from other departments do not affect the answer. To show the answer in an Adaptive Card with the company style, Contoso clears the Send a message checkbox and saves the answer in a global variable. Because the agent is also published in Teams, Contoso adds the citation rendering to its card.",
  "examTips": [
   "To answer with only certain sources in a topic: Search only selected sources.",
   "Trap: thinking it falls back to the agent's sources. The selected ones replace them.",
   "If you clear Send a message, citations are not added automatically in Teams."
  ],
  "glossary": [
   {
    "term": "Knowledge source",
    "def": "An information source for the agent: documents, SharePoint, websites, Dataverse."
   },
   {
    "term": "Generative answers node",
    "def": "A node that searches sources and writes an answer for the user."
   },
   {
    "term": "Citation",
    "def": "A reference to the source the answer came from."
   },
   {
    "term": "Fallback",
    "def": "Backup behavior used when no topic matches the question."
   }
  ]
 },
 "scenes": [
  {
   "title": "A confident answer from the wrong shelf",
   "caption": "A leave question gets an answer from a marketing page. Valeria wants only the HR policies site, shown in a branded card.",
   "say": "Contoso's HR agent is asked about parental leave. The answer sounds sure, but it quotes a marketing page. Valeria wants answers only from the HR policies site. And she wants to show them in a card with the company style. Today you learn how the Generative answers node does it."
  },
  {
   "title": "A librarian in the topic",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The librarian</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">You ask</span><span style=\"text-align:right\">A question</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The librarian reads</span><span style=\"text-align:right\">The shelves you point to</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">You choose</span><span style=\"text-align:right\">The shelves, not the words</span></div></div>",
   "caption": "The node searches the sources you point to and writes the answer. You choose the shelves, not the words.",
   "say": "Think of a librarian. You ask a question. The librarian goes to the shelves you point to, reads what is there, and writes you an answer. You never choose the words. You choose the shelves. That is the Generative answers node: a librarian that works inside one topic."
  },
  {
   "title": "What the node does",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Generative answers node</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Sources</span><span style=\"text-align:right\">Dataverse, SharePoint, websites</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fallback</span><span style=\"text-align:right\">When no topic matches</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Output</span><span style=\"text-align:right\">The answer, or save to a variable</span></div></div>",
   "caption": "The node answers from knowledge sources: Dataverse documents, SharePoint, websites. It is also the fallback when no topic matches.",
   "say": "With this node, the agent answers from knowledge sources inside a topic. The sources can be documents in Dataverse, SharePoint sites, public websites and more. And when no topic matches a question, the agent uses generative answers as its fallback. The answer can also be saved to a variable."
  },
  {
   "title": "Search only selected sources",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Search only selected sources</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Off (default)</span><span style=\"text-align:right\">All of the agent's sources</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">On</span><span style=\"text-align:right\">Only the sources you select</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fallback</span><span style=\"text-align:right\">None to the agent's sources</span></div></div>",
   "caption": "Off, the default: all of the agent's sources. On: only the sources you select, which replace the agent's. No fallback.",
   "say": "Here is the setting that fixes it. By default, Search only selected sources is off, and the node searches all of the agent's sources. Turn it on, and the node searches only the sources you select. They replace the agent's sources for that node. There is no fallback to the agent's sources."
  },
  {
   "title": "Decide: only the HR shelf",
   "caption": "Marketing documents keep slipping into HR answers, which must come only from the policies site. What should Valeria turn on?",
   "say": "Your turn. Contoso's HR topic answers leave questions with a Generative answers node, but marketing documents keep slipping in. The answers must come only from the policies SharePoint site. What should Valeria turn on? Moderation level set to Highest? A separate fallback topic? Or Search only selected sources? Decide before I answer. Search only selected sources. Then the node uses only the sources you choose, and other departments cannot affect the answer. Moderation sets how strict the answers are, and a fallback topic does not choose the sources."
  },
  {
   "title": "Customizing the answer",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Customizing the answer</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Save the answer</span><span style=\"text-align:right\">In a global variable</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Send a message</span><span style=\"text-align:right\">Cleared: no reply right away</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Show it</span><span style=\"text-align:right\">In an adaptive card</span></div></div>",
   "caption": "Save the answer in a global variable and clear Send a message. The agent stops replying right away, and you show it in a card.",
   "say": "Next, the look of the answer. Valeria wants it in an adaptive card with the company style. So she saves the answer in a global variable. Then she clears the Send a message checkbox. Now the agent no longer returns the answer right away, and she presents it however she likes."
  },
  {
   "title": "Decide: outside the chosen site",
   "caption": "Search only selected sources is on with the policies site chosen. The question is outside that site. Which statement is true?",
   "say": "Your turn. Valeria turned on Search only selected sources and chose the policies site. A user asks something that site does not cover. Which statement is true? It still falls back to all of the agent's sources? The selected sources replace the agent's sources? Or the chosen sources are added to the agent's? Decide before I answer. The selected sources replace the agent's sources. For that node, there is no fallback to the agent's other sources. So a question outside the chosen site is not rescued by the rest."
  },
  {
   "title": "Citations and moderation",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Citations and moderation</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams citations</span><span style=\"text-align:right\">Automatic only if not customized</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Customized</span><span style=\"text-align:right\">You render the citations</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Moderation</span><span style=\"text-align:right\">Lowest to Highest · default High</span></div></div>",
   "caption": "In Teams, citations are automatic only for uncustomized responses. Customize, and you render them. Moderation runs Lowest to Highest, default High.",
   "say": "But there is a catch. In Teams, citations are returned automatically only for responses you have not customized. If you customize the answer, you must include the citation rendering yourself. The node also has its own moderation level, from Lowest to Highest. The default is High."
  },
  {
   "title": "Decide: the Teams card",
   "caption": "The answer is shown in a custom adaptive card and the agent is published in Teams. What must Contoso add to the card?",
   "say": "Your turn. Contoso clears Send a message, saves the answer in a global variable, and shows it in an adaptive card. The agent is also published in Teams. What must Contoso add to the card? The citation rendering in the card? Nothing, Teams adds citations by itself? Or a second Generative answers node? Decide before I answer. The citation rendering in the card. In Teams, citations come back automatically only for responses you have not customized. Once you customize, you must include the citations yourself."
  },
  {
   "title": "Set it up in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Add node</span><span style=\"text-align:right\">Advanced · Generative answers</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Properties</span><span style=\"text-align:right\">Input: System.Activity.Text</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Setting</span><span style=\"text-align:right\">Search only selected sources: On</span></div></div>",
   "caption": "Add node, Advanced, Generative answers; Properties, Input System.Activity.Text; turn on Search only selected sources; test.",
   "say": "Here is how it looks in the studio. Open the Topics page and enter your topic. Select Add node, point to Advanced, and choose Generative answers. Open the node properties, and under Input select the System Activity Text variable. Turn on Search only selected sources and choose your source. Then test with a question that only another source knows, and see what happens."
  },
  {
   "title": "Three rules to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three rules</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Selected sources</span><span style=\"text-align:right\">Replace the agent's · no fallback</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Send a message cleared</span><span style=\"text-align:right\">You add the citations</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Moderation</span><span style=\"text-align:right\">Lowest to Highest · default High</span></div></div>",
   "caption": "Selected sources replace the agent's, no fallback. Clear Send a message and you add the citations. Moderation: Lowest to Highest, default High.",
   "say": "Back in the records archive. Answers now come only from the policies site, and the card shows them in the company style. Remember three things. Search only selected sources replaces the agent's sources, with no fallback. Clearing Send a message means you add the citations yourself. And moderation goes from Lowest to Highest, with High as the default. Next, custom data and your own sources."
  }
 ],
 "check": [
  {
   "stem": "What does the Generative answers node do?",
   "options": [
    "It changes the channel the agent is on",
    "It deletes variables after each turn",
    "It only sends a fixed message, with no search",
    "It searches sources and writes an answer"
   ],
   "answer": 3,
   "explanation": "It searches the knowledge sources and writes the answer for the user."
  },
  {
   "stem": "With Search only selected sources turned off, where does the node search?",
   "options": [
    "In all of the agent's sources",
    "Only on public websites",
    "In no sources",
    "Only in SharePoint"
   ],
   "answer": 0,
   "explanation": "By default it searches all the sources configured for the agent."
  },
  {
   "stem": "With Search only selected sources turned on, what happens to the agent's sources?",
   "options": [
    "They are used as a fallback if none match",
    "They are deleted from the agent permanently",
    "They are duplicated into the node settings",
    "Only the selected sources are used"
   ],
   "answer": 3,
   "explanation": "The selected sources replace the agent's sources for that node, with no fallback."
  }
 ],
 "reto": {
  "text": "Add a Generative answers node to a topic.\nTurn on Search only selected sources and choose just one source.\nAsk something only another source knows and watch the response.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node"
},
{
 "id": "L11",
 "module": 2,
 "title": "Custom data and your own sources",
 "level": "exam",
 "minutes": 12,
 "skills": [
  "1.3e"
 ],
 "theory": {
  "intro": "Sometimes the information you want to use is not in a file or on a website. You calculate it yourself, with a flow or a query. Custom data is a way to hand the node a \"tray\" with that data, so it answers using only that.",
  "sections": [
   {
    "heading": "What Custom data is",
    "body": "It is an option of the Generative answers node, inside Classic data. It takes a table variable with your own records. Use it when the source is a private API or the result of a flow, not a public site or a file.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Table for Custom data</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Content</span><span style=\"text-align:right\">article text (required)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">ContentLocation</span><span style=\"text-align:right\">citation URL</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Title</span><span style=\"text-align:right\">title</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Records used</span><span style=\"text-align:right\">only the first 3</span></div></div>"
   },
   {
    "heading": "The shape of the table",
    "body": "Each row must have Content, which is required and holds the text. It can optionally have ContentLocation, the URL used for the citation, and Title, the title. Only the first three records are used to generate the answer."
   },
   {
    "heading": "Sort and filter first",
    "body": "Only the first three records count, so there is no point sending hundreds of rows and hoping the node reads them all. Filter and sort the table before you pass it, so the most relevant rows are at the top.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Incident</text><text x=\"35.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">flow</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Table</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">3 rows</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Custom</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">data</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Cited</text><text x=\"302.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">answer</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Content, ContentLocation, Title</text></svg>"
   },
   {
    "heading": "Answer only from your data",
    "body": "To make the node use only your table, turn on Search only selected sources and leave all sources unselected. Then put your variable in Custom data and keep web search and the AI's general knowledge turned off."
   }
  ],
  "steps": [
   "Create or get a Table variable, for example the output of a flow.",
   "Make sure each row has Content and, if possible, ContentLocation and Title.",
   "Open the Generative answers node and go to Properties.",
   "Turn on Search only selected sources and select no sources.",
   "Under Classic data, put your variable in Custom data.",
   "Turn off Web search and Allow the AI to use its own general knowledge.",
   "Test a question and check that the citation uses ContentLocation."
  ],
  "example": "The Contoso support team has an incident database. A flow looks up the articles related to the question, filters them, and returns a table with the three most useful rows, each with Content, ContentLocation, and Title. Contoso passes it to Custom data, turns on Search only selected sources without choosing any source, and turns off web search and general knowledge. The agent answers only from those three articles and cites the link of each one.",
  "examTips": [
   "To answer only from data you calculate: a table in Custom data, and Search only selected sources with no sources.",
   "Trap: sending hundreds of rows. Only the first three count.",
   "Content is the only required field in the table."
  ],
  "glossary": [
   {
    "term": "Custom data",
    "def": "A Classic data option of the node that takes your own table as the source of the answer."
   },
   {
    "term": "Table",
    "def": "A variable type: a list of records of the same kind."
   },
   {
    "term": "ContentLocation",
    "def": "The table field with the URL used as the citation."
   },
   {
    "term": "Classic data",
    "def": "A section of the node's properties for sources such as Custom data."
   }
  ]
 },
 "scenes": [
  {
   "title": "Answers from our own articles",
   "caption": "Marta gets a general answer. Valeria wants answers only from the articles her flow picks, with a link to each.",
   "say": "Contoso's support team keeps an incident database. Marta asks about a printer fault, and the agent gives a general answer. Valeria wants answers built only from the articles her own flow picks, each with a link. Today you learn Custom data. It is how you hand the node your own data."
  },
  {
   "title": "A tray for the cook",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The tray</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Your source</span><span style=\"text-align:right\">Not a file, not a website</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">You calculate it</span><span style=\"text-align:right\">With a flow or a query</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The node</span><span style=\"text-align:right\">Answers only from the tray</span></div></div>",
   "caption": "Custom data is a tray: you hand the node your own table, and it answers using only that.",
   "say": "Picture a kitchen with a serving hatch. Nexo is the cook. Usually it takes ingredients from the pantry shelves. With Custom data, you hand it a tray instead. The information is not in a file or on a website. You calculate it yourself, with a flow or a query, and the cook serves only what is on the tray."
  },
  {
   "title": "Where the option is",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Custom data</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Generative answers node · Classic data</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">You pass</span><span style=\"text-align:right\">A Table variable</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Use it for</span><span style=\"text-align:right\">A private API or a flow result</span></div></div>",
   "caption": "In the Generative answers node, under Classic data, you pass a Table variable.",
   "say": "The option is in the properties of the Generative answers node, in the section called Classic data. There you put a variable of type Table. Use it when the source is a private A P I or the result of a flow, not a public site or a file. At Contoso, the table comes out of a flow."
  },
  {
   "title": "The shape of the table",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The shape of the table</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Content</span><span style=\"text-align:right\">Required · the text</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">ContentLocation</span><span style=\"text-align:right\">Optional · citation URL</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Title</span><span style=\"text-align:right\">Optional · the title</span></div></div>",
   "caption": "Content is required. ContentLocation, the citation address, and Title are optional.",
   "say": "Each row in the table needs Content. It is required, and it holds the article text. Optionally, a row can have ContentLocation, the address used for the citation, and Title, the article title. With ContentLocation filled in, the agent can cite the link of each article for Marta."
  },
  {
   "title": "Only three records",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Only three records</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Records used</span><span style=\"text-align:right\">Only the first three</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Before you pass it</span><span style=\"text-align:right\">Filter and sort</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Most relevant</span><span style=\"text-align:right\">On top</span></div></div>",
   "caption": "Only the first three records are used. Filter and sort the table first, most relevant rows on top.",
   "say": "Now the limit. Only the first three records are used to generate the answer. So there is no point sending hundreds of rows and hoping the node reads them all. Filter and sort the table before you pass it, with the most relevant rows on top. Contoso's flow does exactly that, and returns three articles."
  },
  {
   "title": "Decide: hundreds of rows",
   "caption": "The flow finds hundreds of matching articles. What should Valeria do with the table before passing it to Custom data?",
   "say": "Your turn. Contoso's incident flow finds hundreds of matching articles. Valeria must pass them on. What should she do with the table first? Send every row and let the node read them all? Filter and sort first, best rows on top? Or pass the first three rows as they come? Decide before I answer. Filter and sort first, best rows on top. Only the first three records are used, so the best rows go on top. More rows do not raise the limit, and unsorted rows can miss the best."
  },
  {
   "title": "Only with your data",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Only your data</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Search only selected sources</span><span style=\"text-align:right\">On · no sources</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Custom data</span><span style=\"text-align:right\">Your variable</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Web search and general knowledge</span><span style=\"text-align:right\">Off</span></div></div>",
   "caption": "Search only selected sources on with no sources, your variable in Custom data, web search and general knowledge off.",
   "say": "To answer only from your table, turn on Search only selected sources and select no sources. Then put your variable in Custom data. Turn off Web search and Allow the AI to use its own general knowledge. Now the agent answers only from the three articles and cites each link."
  },
  {
   "title": "Decide: answer only from the table",
   "caption": "The agent must answer only from the table the flow returns. What should Valeria do with Search only selected sources?",
   "say": "Your turn. Contoso's flow returns a table of three articles, already in Custom data. The agent must answer only from that table. What should Valeria do with Search only selected sources? Turn it on and select no sources? Turn it on and select all sources? Or leave it off and let the agent decide? Decide before I answer. Turn it on and select no sources. Then the node searches no knowledge sources, so only your table is left. Selecting all sources brings them back in."
  },
  {
   "title": "Set it up in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Open</span><span style=\"text-align:right\">Node · Properties</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Classic data</span><span style=\"text-align:right\">Custom data · your variable</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Test</span><span style=\"text-align:right\">Citation uses ContentLocation</span></div></div>",
   "caption": "Generative answers node, Properties: Search only selected sources on with no sources, variable in Custom data, web and general knowledge off, test.",
   "say": "Here is how it looks in the studio. Open the Generative answers node and go to Properties. Turn on Search only selected sources and select no sources. Under Classic data, put your variable in Custom data. Turn off Web search and Allow the AI to use its own general knowledge. Then test a question and check that the citation uses ContentLocation."
  },
  {
   "title": "Decide: the required field",
   "caption": "Valeria checks the table her flow returns. Which field can no row be missing?",
   "say": "Your turn. Contoso is checking the table its flow returns before sending it to Custom data. Valeria wants to know which field no row can be missing. Which field is it? ContentLocation, because it holds the link? Title, because the answer needs a heading? Or Content, because it holds the text? Decide before I answer. Content, because it holds the text. Content is the only required field. ContentLocation and Title are optional, so a row can leave them out."
  },
  {
   "title": "Three rules to remember",
   "caption": "Content is the only required field. Only the first three records count. Answer only from your data: Search only selected sources, no sources.",
   "say": "Back in the kitchen. Marta asks again, and the answer comes only from the three articles, each with a link. Remember three things. Content is the only required field. Only the first three records count, so filter and sort first. And to answer only from your data, use Search only selected sources with no sources. Next, Adaptive Cards."
  }
 ],
 "check": [
  {
   "stem": "What type of variable do you pass to Custom data?",
   "options": [
    "DateTime",
    "Table",
    "String",
    "Boolean"
   ],
   "answer": 1,
   "explanation": "Custom data takes a table with the records the node will use."
  },
  {
   "stem": "Which table column is required?",
   "options": [
    "Content",
    "None",
    "Title",
    "ContentLocation"
   ],
   "answer": 0,
   "explanation": "Content is the only required field. ContentLocation and Title are optional."
  },
  {
   "stem": "How many records does the node use to generate the answer?",
   "options": [
    "All of them, sorted by date",
    "Just one, the newest record",
    "Only the first three records",
    "Twenty-five records at a time"
   ],
   "answer": 2,
   "explanation": "Only the first three records are used, so it helps to sort and filter first."
  },
  {
   "stem": "You want the node to answer only from your table. What do you do with Search only selected sources?",
   "options": [
    "Turn it off",
    "It does not matter, the agent decides",
    "Turn it on and select all sources",
    "Turn it on without choosing any source"
   ],
   "answer": 3,
   "explanation": "You turn it on and select no sources, so the node does not search any knowledge sources."
  }
 ],
 "reto": {
  "text": "Create a topic with a Table variable that has two sample rows.\nPass it to Custom data in a Generative answers node.\nTurn on Search only selected sources with no sources and test.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-custom-data"
},
{
 "id": "L12",
 "module": 2,
 "title": "Adaptive Cards",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "1.3h"
 ],
 "theory": {
  "intro": "An Adaptive Card is a mini form inside the chat, with text, fields, and buttons. It is the difference between asking someone for details one by one over the phone and handing them a sheet to fill in all at once.",
  "sections": [
   {
    "heading": "What it is and what it is for",
    "body": "With the Ask with Adaptive Card node, the agent shows an interactive card with at least one submit button and, if you want, input fields. What the user types is saved in variables you can use later in the conversation.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px\"><div style=\"font-weight:600\">New ticket</div><div style=\"border:1px solid var(--muted);border-radius:6px;padding:3px 8px;margin:6px 0;color:var(--muted)\">Title</div><div style=\"border:1px solid var(--muted);border-radius:6px;padding:3px 8px;margin:6px 0;color:var(--muted)\">Urgency: High</div><div style=\"display:inline-block;border:1px solid var(--accent);color:var(--accent);border-radius:6px;padding:3px 12px\">Submit</div></div>"
   },
   {
    "heading": "Automatic variables",
    "body": "When you save the design, Copilot Studio automatically creates output variables from the card's inputs. If they are not right, you can edit the list and its types with Edit Schema in the node properties.",
    "visual": "<svg viewBox=\"0 0 360 110\" role=\"img\" aria-label=\"Card with inputs → Submit → Output variables\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\"/><text x=\"54\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Card with</text><text x=\"54\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">inputs</text><line x1=\"108\" y1=\"39\" x2=\"122\" y2=\"39\"/><polygon points=\"126,39 119,35.5 119,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"128\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"180\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Submit</text><line x1=\"234\" y1=\"39\" x2=\"248\" y2=\"39\"/><polygon points=\"252,39 245,35.5 245,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"254\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\"/><text x=\"306\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Output</text><text x=\"306\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">variables</text><text x=\"180\" y=\"94\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Each input creates a variable</text></svg>"
   },
   {
    "heading": "Message and Question are not interactive",
    "body": "A card inside a Message or a Question node is informational. It shows data but does not collect a response. To collect several fields with buttons, use the Ask with Adaptive Card node."
   },
   {
    "heading": "Versions by channel",
    "body": "Copilot Studio supports schema 1.6 and earlier, but it depends on where the card is shown. Web Chat supports 1.6 without Action.Execute. The live chat widget and Teams go up to 1.5. The test chat renders 1.6, so everything looks fine there. The authoring canvas does not render v1.6 cards at all; only the test pane does.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Which card version works where</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Web Chat</span><span style=\"text-align:right\">1.6, no Action.Execute</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams</span><span style=\"text-align:right\">1.5</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Live chat widget</span><span style=\"text-align:right\">1.5</span></div></div>"
   },
   {
    "heading": "Input elements and safe handling",
    "body": "A card can have six input elements: Input.Text (can be multiline), Input.Number (optional min and max), Input.Date (returns YYYY-MM-DD), Input.Time (returns HH:MM), Input.Toggle (returns true or false), and Input.ChoiceSet (a dropdown or radio buttons). Mark a field Required in the properties panel so the form can't be sent without it.\n\nGive each input a clear camelCase id, such as leaveType. Default ids give variables like Topic.input1. If the user closes the card without selecting Submit, the output variables stay empty, so add a Condition node right after the node. With consecutive or retried cards, put a unique id in each Action.Submit data (for example actionSubmitId) and check it.\n\nFor a dynamic list, set choices to a Power Fx expression such as =Topic.AvailableLeaveTypes. That variable must be a table with title and value columns."
   }
  ],
  "steps": [
   "Open a topic and select Add node under the node you want.",
   "Choose Ask with Adaptive Card.",
   "Select the three dots on the node and open Properties.",
   "Select Edit adaptive card to open the designer.",
   "Add input fields and a submit button, or paste the card JSON.",
   "Save. Copilot Studio creates the output variables.",
   "Review or fix the variables with Edit Schema and use them in a Message."
  ],
  "example": "The Contoso ticket form asks for two things: a title (text) and an urgency (a list of High, Medium, Low). When the user selects Submit, Copilot Studio fills one variable for each input, and the next Message node shows \"I registered your ticket with High urgency\". Because employees use Teams, Contoso designs the card with schema 1.5 to avoid surprises, and checks that it does not use Action.Execute in Web Chat.",
  "examTips": [
   "To collect several fields at once with buttons: Ask with Adaptive Card.",
   "Trap: designing with 1.6 and assuming it looks the same in Teams. There the limit is 1.5.",
   "The card must have at least one submit button. Message and Question only show informational cards.",
   "Card closed without Submit: the output variables stay empty. Add a Condition node right after Ask with Adaptive Card."
  ],
  "glossary": [
   {
    "term": "Adaptive Card",
    "def": "An interactive card described in JSON, with text, fields, and buttons."
   },
   {
    "term": "Action.Submit",
    "def": "A card button that sends the data the user typed to the agent."
   },
   {
    "term": "Edit Schema",
    "def": "An option to fix the output variables that the card generates."
   },
   {
    "term": "Schema version",
    "def": "The version of the card format. The channel sets the highest version it supports."
   },
   {
    "term": "Input.ChoiceSet",
    "def": "A card input shown as a dropdown or radio buttons. Its choices can come from a table with title and value columns."
   }
  ]
 },
 "scenes": [
  {
   "title": "One detail at a time",
   "caption": "Marta reports a problem one detail at a time. Valeria wants one sheet. Today: Adaptive Cards.",
   "say": "Marta wants to report a problem to Contoso's help team. Her agent asks for the title, waits, then asks for the urgency, and waits again. The service manager wants both details in every ticket, without the back and forth. Valeria wants to hand Marta one sheet to fill in all at once. Today you learn Adaptive Cards."
  },
  {
   "title": "A mini form in the chat",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The mini form</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Looks like</span><span style=\"text-align:right\">Text, fields, and buttons</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Compared to</span><span style=\"text-align:right\">A sheet filled in all at once</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The agent gets</span><span style=\"text-align:right\">Everything together on submit</span></div></div>",
   "caption": "An Adaptive Card is a mini form inside the chat, with text, fields, and buttons.",
   "say": "An Adaptive Card is a mini form inside the chat, with text, fields, and buttons. It is the difference between asking for details one by one over the phone and handing someone a sheet to fill in all at once. The agent gets everything together when the user selects submit."
  },
  {
   "title": "The right node",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Which node collects</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Ask with Adaptive Card</span><span style=\"text-align:right\">At least one submit button</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Typed values</span><span style=\"text-align:right\">Saved in variables</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Message / Question</span><span style=\"text-align:right\">Informational only</span></div></div>",
   "caption": "Ask with Adaptive Card needs a submit button. Message and Question cards are only informational.",
   "say": "To collect data with a card, you use the Ask with Adaptive Card node. The card needs at least one submit button, and it can have input fields. What the user types is saved in variables you can use later in the conversation. A card inside a Message or Question node is only informational. It shows data, but it collects no response."
  },
  {
   "title": "Decide: which node",
   "caption": "A ticket form needs a title and an urgency sent together with a button. Which node should Valeria use?",
   "say": "Your turn. Contoso wants a ticket form in the chat, with a title and an urgency. The user must send both together with a button. Which node should Valeria use? A Message node with a card? Ask with Adaptive Card? Or a Question node with a card? Decide before I answer. Ask with Adaptive Card. It is the node that needs at least one submit button and collects the response. A card in a Message or Question node is only informational, so it collects nothing."
  },
  {
   "title": "Six input elements",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Six input elements</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Text · Number</span><span style=\"text-align:right\">Multiline · optional min and max</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Date · Time · Toggle</span><span style=\"text-align:right\">Date, time, true or false</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">ChoiceSet</span><span style=\"text-align:right\">Dropdown or radio buttons</span></div></div>",
   "caption": "Six inputs: Text, Number, Date, Time, Toggle, ChoiceSet. Mark a field Required so it cannot be skipped.",
   "say": "A card can have six input elements. Input Text, which can be multiline. Input Number, with an optional minimum and maximum. Input Date and Input Time. Input Toggle, which returns true or false. And Input ChoiceSet, a dropdown or radio buttons. Mark a field as Required in the properties panel, and the form cannot be sent without it."
  },
  {
   "title": "Variables and clear ids",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Variables and ids</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">On save</span><span style=\"text-align:right\">Output variables are created</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not right?</span><span style=\"text-align:right\">Edit Schema</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Dynamic list</span><span style=\"text-align:right\">Table with title and value</span></div></div>",
   "caption": "Each input creates an output variable. Fix them with Edit Schema. Give inputs clear camelCase ids.",
   "say": "When you save the design, Copilot Studio automatically creates output variables from the inputs. If they are not right, you fix the list and its types with Edit Schema. Give each input a clear camel case I D, such as leave type, instead of a default one. For a dropdown with dynamic choices, use a Power F X expression that points to a table with title and value columns."
  },
  {
   "title": "Versions by channel",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Versions by channel</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Web Chat</span><span style=\"text-align:right\">1.6, no Action.Execute</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams · live chat widget</span><span style=\"text-align:right\">1.5</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Test chat</span><span style=\"text-align:right\">Renders 1.6</span></div></div>",
   "caption": "Web Chat 1.6 without Action.Execute; Teams and live chat widget 1.5. The test chat renders 1.6.",
   "say": "Copilot Studio supports schema one point six and earlier, but it depends on the channel. Web Chat supports one point six, without Action Execute. The live chat widget and Teams go up to one point five. The test chat renders one point six, so everything looks fine there. The authoring canvas does not render version one point six cards at all."
  },
  {
   "title": "Decide: the Teams version",
   "caption": "The card was designed with 1.6 and looks perfect in the test chat. Employees use Teams. What should Valeria do?",
   "say": "Your turn. Valeria designed the ticket card with schema one point six, and it looks perfect in the test chat. Contoso's employees use Teams. What should she do? Keep schema one point six everywhere? Check it only in the authoring canvas? Or design with schema one point five? Decide before I answer. Design with schema one point five. Teams stops at one point five, but the test chat shows one point six, so it fools you. One point six fails in Teams, and the authoring canvas cannot render it."
  },
  {
   "title": "A card closed without submit",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Closed without Submit</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Variables</span><span style=\"text-align:right\">Stay empty</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Add</span><span style=\"text-align:right\">A Condition node right after</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Retries</span><span style=\"text-align:right\">Unique id in Action.Submit data</span></div></div>",
   "caption": "Closed without Submit: the variables stay empty. Add a Condition node right after. Use a unique id on retries.",
   "say": "What if the user closes the card without selecting submit? Then the output variables stay empty. So add a Condition node after the Ask with Adaptive Card node. And when cards are consecutive or retried, put a unique I D in each Action Submit data, such as action Submit I D."
  },
  {
   "title": "Decide: the closed card",
   "caption": "A user closes the ticket card without Submit and the variables are empty. What goes right after the node?",
   "say": "Your turn. A user closes the ticket card without selecting submit. Its outputs stay empty. What should Valeria add right after the node? A Condition node that checks them? A Message that uses the title variable? Or Edit Schema with a new variable? Decide before I answer. A Condition node that checks them. If the card is closed without submit, the output variables stay empty, and the Condition node handles that case. A Message that uses the title variable would show nothing, because that variable is empty."
  },
  {
   "title": "Set it up in the studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Add node</span><span style=\"text-align:right\">Ask with Adaptive Card</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Properties</span><span style=\"text-align:right\">Edit adaptive card</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">After Save</span><span style=\"text-align:right\">Review with Edit Schema</span></div></div>",
   "caption": "Add node, Ask with Adaptive Card; three dots, Properties, Edit adaptive card; add inputs and submit; Save; Edit Schema.",
   "say": "Here it is in the studio. Open a topic and select Add node under the node you want. Choose Ask with Adaptive Card. Select the three dots on the node, open Properties, and select Edit adaptive card. Add inputs and a submit button, or paste the card J S O N. Save, and Copilot Studio creates the output variables. Review them with Edit Schema. Then use one of them in a Message."
  },
  {
   "title": "Three rules to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three rules</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Collect fields</span><span style=\"text-align:right\">Ask with Adaptive Card</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams limit</span><span style=\"text-align:right\">Schema 1.5</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Closed card</span><span style=\"text-align:right\">Add a Condition node</span></div></div>",
   "caption": "Ask with Adaptive Card collects fields. Teams stops at 1.5. Closed card: add a Condition node.",
   "say": "Back to Marta and her ticket. Marta fills in one card and sends it, and the agent confirms the ticket with its urgency. Remember three things. Ask with Adaptive Card collects several fields with buttons. Teams stops at schema one point five, even if the test chat shows one point six. And a closed card leaves empty variables, so add a Condition node after it. Next, custom prompts."
  }
 ],
 "check": [
  {
   "stem": "What does a card in the Ask with Adaptive Card node need at a minimum?",
   "options": [
    "A video that plays inline",
    "A submit button for the user",
    "A phone number field for the user",
    "An image, shown at the top"
   ],
   "answer": 1,
   "explanation": "The card must be interactive, with at least one submit button."
  },
  {
   "stem": "What is the highest schema version Teams supports?",
   "options": [
    "1.5",
    "1.6",
    "1.3",
    "1.0"
   ],
   "answer": 0,
   "explanation": "Teams and the live chat widget are limited to version 1.5."
  },
  {
   "stem": "How do you fix the output variables generated by the card?",
   "options": [
    "With Edit Schema",
    "By changing the channel",
    "You cannot fix them",
    "By deleting the topic"
   ],
   "answer": 0,
   "explanation": "Edit Schema, in the node properties, lets you edit the list of variables and their types."
  },
  {
   "stem": "What does a Message node with a card show?",
   "options": [
    "A form that saves data to Dataverse",
    "A non-interactive, informational card",
    "A flow that runs in the background",
    "A phone call"
   ],
   "answer": 1,
   "explanation": "In Message and Question nodes, cards are informational, not interactive."
  }
 ],
 "reto": {
  "text": "Create an Ask with adaptive card node with two inputs and a submit button.\nCheck the variables it generates in Edit Schema.\nTry it in the test chat and use one of the variables in a Message.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-ask-with-adaptive-card"
},
{
 "id": "L13",
 "module": 2,
 "title": "Custom prompts",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "1.3d"
 ],
 "theory": {
  "intro": "A custom prompt is a saved instruction for a language model. You give it an input text and it returns a result. It is like a recipe with variable ingredients: the recipe is always the same, and only what you put in changes.",
  "sections": [
   {
    "heading": "What a prompt is",
    "body": "It is a single-turn tool based on a model. It has instructions, inputs, and, if you want, knowledge to consult. Unlike a conversation, it does one task and returns the result. It does not keep a dialogue going.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Ticket</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">text</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Prompt</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(model)</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Output</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">category</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Instructions + inputs = one result</text></svg>"
   },
   {
    "heading": "Where you add it",
    "body": "You can add it as an agent tool (Tools, New tool, Prompt), as a node inside a topic (Add a tool, New prompt), or as the Run a prompt action inside an agent flow.",
    "visual": "<svg viewBox=\"0 0 360 138\" role=\"img\" aria-label=\"Three ways to use a prompt\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><text x=\"4\" y=\"14\" stroke=\"none\" style=\"fill:var(--muted)\">Three ways to use a prompt</text><rect x=\"2\" y=\"22\" width=\"356\" height=\"30\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"14\" y=\"41\" stroke=\"none\" fill=\"currentColor\">Agent tool (Tools, New tool, Prompt)</text><rect x=\"2\" y=\"60\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"79\" stroke=\"none\" fill=\"currentColor\">Topic node (Add a tool, New prompt)</text><rect x=\"2\" y=\"98\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"117\" stroke=\"none\" fill=\"currentColor\">Run a prompt action in an agent flow</text></svg>"
   },
   {
    "heading": "The prompt editor",
    "body": "In the editor, you write the instructions by hand, with help from Copilot, or from a template. You define the inputs, choose the model, adjust the temperature, and test with sample data before using it. Instructions should be clear and short, with a fallback output if there is no answer."
   },
   {
    "heading": "Temperature",
    "body": "Temperature goes from 0 to 1 (0 by default) and controls the balance between predictable and creative responses. At 0, responses are more consistent. With the GPT-5 reasoning model, it is not available and the slider appears disabled. It is set in the prompt settings, not the agent settings.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Prompt: classify ticket</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">Return category and urgency</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Input</span><span style=\"text-align:right\">Ticket text</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Temperature</span><span style=\"text-align:right\">0</span></div></div>"
   }
  ],
  "steps": [
   "Open your agent and go to the Tools tab.",
   "Select Add a tool, then New tool, and choose Prompt.",
   "Write the instructions: what it must do and what it must return.",
   "Add an input, for example the text of a ticket.",
   "Choose the model and leave the temperature at 0 if you want consistent results.",
   "Type sample data and select Test.",
   "Save and select Add and configure to keep it as a tool."
  ],
  "example": "Contoso creates a prompt called \"Classify ticket\". Its input is the ticket text, and its instructions ask it to return the category (hardware, software, or access) and the urgency (high, medium, or low), and to answer \"not found\" if the text has too little information. With temperature 0, five similar tickets always get the same classification. The agent uses it as a tool every time a new request arrives.",
  "examTips": [
   "Consistent classification: clear instructions and low temperature.",
   "Trap: looking for temperature with GPT-5 reasoning. It is disabled.",
   "A prompt is single-turn. A child agent is heavier."
  ],
  "glossary": [
   {
    "term": "Prompt",
    "def": "Saved instructions and inputs that let a model do a task in a single turn."
   },
   {
    "term": "Temperature",
    "def": "A value from 0 to 1 that balances predictable and creative responses."
   },
   {
    "term": "Run a prompt",
    "def": "An agent flow action that runs a prompt at a point in the flow."
   }
  ]
 },
 "scenes": [
  {
   "title": "Two tickets, two different answers",
   "caption": "Same ticket, different categories. Valeria proposes a saved instruction for the model: a custom prompt.",
   "say": "The service desk at Contoso has a new problem. Marta sends two tickets that are almost the same, and the agent puts them in different categories. The service manager is not happy. Valeria has an idea: a saved recipe for the model, called a custom prompt. Nexo gets it as a new badge."
  },
  {
   "title": "A recipe with variable ingredients",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The recipe idea</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The recipe</span><span style=\"text-align:right\">The instructions, always the same</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The ingredients</span><span style=\"text-align:right\">The inputs, like the ticket text</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The result</span><span style=\"text-align:right\">One output per run</span></div></div>",
   "caption": "The instructions are the recipe. The inputs change. The model returns one result each time.",
   "say": "Think of a recipe with variable ingredients. The recipe is the instructions, and it stays the same every time. What changes is the input, for example the text of a ticket. The model reads the instructions and the input, does the task once, and returns one result. The recipe is saved, so you can reuse it."
  },
  {
   "title": "One turn, one result",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">What a prompt is</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Type</span><span style=\"text-align:right\">Single-turn tool on a model</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Has</span><span style=\"text-align:right\">Instructions, inputs, optional knowledge</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not</span><span style=\"text-align:right\">A dialogue; a child agent is heavier</span></div></div>",
   "caption": "A prompt is a single-turn tool. A conversation keeps a dialogue; a child agent is heavier.",
   "say": "A prompt is a single-turn tool based on a model. It has instructions, inputs and, if you want, knowledge to consult. Unlike a conversation, it does one task and returns the result. It does not keep a dialogue going with the user. A child agent is heavier. For one small task, a prompt is the lighter choice."
  },
  {
   "title": "Three doors for the same prompt",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three doors</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent tool</span><span style=\"text-align:right\">Tools · New tool · Prompt</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topic node</span><span style=\"text-align:right\">Add a tool · New prompt</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent flow</span><span style=\"text-align:right\">Run a prompt action</span></div></div>",
   "caption": "Agent tool, topic node, or the Run a prompt action inside an agent flow.",
   "say": "You can use the same prompt in three places. As an agent tool, from the Tools tab. As a node inside a topic, with Add a tool and New prompt. Or as the Run a prompt action inside an agent flow. Same instructions, same inputs, three doors."
  },
  {
   "title": "Decide: how many turns",
   "caption": "Valeria compares a prompt with a long chat. How many turns does a prompt have?",
   "say": "Your turn. Valeria explains custom prompts to the service manager. She compares a prompt with a long chat about the same ticket. How many turns does a prompt have? As many turns as the user needs? Two, it asks for missing input? Or only one, then it returns? Decide before I answer. Only one, then it returns. A prompt does one task and returns the result, and that is its whole run. A conversation keeps a dialogue going, and a child agent is heavier for a small task."
  },
  {
   "title": "Inside the prompt editor",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The prompt editor</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">By hand, with Copilot, or a template</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rules</span><span style=\"text-align:right\">Clear and short, with a fallback</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fallback</span><span style=\"text-align:right\">not found when the text is thin</span></div></div>",
   "caption": "Write instructions by hand, with Copilot, or from a template. Keep them short, with a fallback.",
   "say": "Inside the prompt editor, Valeria writes the instructions by hand, with help from Copilot, or from a template. She defines the inputs, such as the ticket text. Good instructions are clear and short, and they include a fallback output. If the text has too little information, the prompt answers not found instead of guessing a category."
  },
  {
   "title": "The temperature dial",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Temperature</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Range</span><span style=\"text-align:right\">Zero to one · default zero</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">At zero</span><span style=\"text-align:right\">More predictable responses</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">GPT five reasoning</span><span style=\"text-align:right\">The slider is disabled</span></div></div>",
   "caption": "From zero to one, default zero. Disabled with the GPT five reasoning model. Set in the prompt settings.",
   "say": "Temperature goes from zero to one, and zero is the default. At zero the responses are more predictable. With the G P T five reasoning model the slider appears disabled. It is set in the prompt settings, not in the agent settings. Valeria leaves the temperature at zero whenever she wants consistent results."
  },
  {
   "title": "Decide: the same classification every time",
   "caption": "Two nearly identical tickets got different categories. What should Valeria change?",
   "say": "Your turn. Contoso's prompt classifies tickets, but two nearly identical tickets got different categories. The service manager wants similar tickets to always get the same classification. What should Valeria change? Lower the temperature to zero? Raise the temperature near one? Or move the slider into agent settings? Decide before I answer. Lower the temperature to zero. At zero the responses are more predictable, so similar tickets always get the same classification. A high temperature is for creative results, and it is set in the prompt settings, not the agent."
  },
  {
   "title": "The Contoso case: Classify ticket",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Classify ticket</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Input</span><span style=\"text-align:right\">The ticket text</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Returns</span><span style=\"text-align:right\">Category and urgency</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fallback</span><span style=\"text-align:right\">not found if too little info</span></div></div>",
   "caption": "Input: ticket text. Returns category and urgency. Answers not found when the text is too thin.",
   "say": "Contoso builds the prompt called Classify ticket. Its input is the ticket text. Its instructions ask for one category out of hardware, software or access, and one urgency out of high, medium or low. If a ticket has too little information, the prompt answers not found. With temperature zero, five similar tickets get the same classification."
  },
  {
   "title": "Add it as a tool",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Add as a tool</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Tools · Add a tool · New tool · Prompt</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Settings</span><span style=\"text-align:right\">Model · temperature zero</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Finish</span><span style=\"text-align:right\">Test · Save · Add and configure</span></div></div>",
   "caption": "Tools, Add a tool, New tool, Prompt. Instructions, input, model, temperature zero. Test, then Add and configure.",
   "say": "Adding it as a tool takes a few steps. Open the agent and go to the Tools tab. Select Add a tool, then New tool, and choose Prompt. Write the instructions, add the input, choose the model, and leave the temperature at zero. Type sample data and select Test. Then select Save, and Add and configure."
  },
  {
   "title": "Decide: where a prompt cannot go",
   "caption": "The manager asks where a prompt can be attached. Which place does not take a prompt?",
   "say": "Your turn. The service manager likes prompts. Now he asks where a prompt can be attached. Which place does not take a prompt? As a tool of your agent? As a publishing channel? Or as a node inside a topic? Decide before I answer. As a publishing channel. A prompt is used as an agent tool, as a topic node with Add a tool and New prompt, or as the Run a prompt action in a flow. Channels are how users reach the agent, so a prompt never goes there."
  },
  {
   "title": "Three rules to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">A prompt is</span><span style=\"text-align:right\">A recipe: one result per run</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Single-turn</span><span style=\"text-align:right\">Lighter than a child agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Consistency</span><span style=\"text-align:right\">Clear instructions · temperature zero</span></div></div>",
   "caption": "One recipe, changing inputs, one result. Single-turn. Clear instructions and temperature zero for consistency.",
   "say": "Back to the two tickets. The prompt is saved as a tool, and now similar requests get the same category and urgency. Remember three things. A prompt is a recipe: same instructions, changing inputs, one result. It is single-turn, lighter than a child agent. Clear instructions and temperature zero give consistent classifications. Next, the Send H T T P request node."
  }
 ],
 "check": [
  {
   "stem": "How many turns does a prompt have?",
   "options": [
    "Two",
    "None",
    "Unlimited",
    "One"
   ],
   "answer": 3,
   "explanation": "A prompt is a single-turn tool based on a model."
  },
  {
   "stem": "What is the range of a prompt's temperature?",
   "options": [
    "From -1 to 1",
    "From 0 to 100",
    "From 1 to 10",
    "From 0 to 1"
   ],
   "answer": 3,
   "explanation": "Temperature goes from 0 to 1. The default value is 0."
  },
  {
   "stem": "Where can you NOT use a prompt?",
   "options": [
    "As a node in a topic",
    "As a publishing channel",
    "As a Run a prompt action in a flow",
    "As an agent tool"
   ],
   "answer": 1,
   "explanation": "A prompt is used as a tool, a node, or a flow action. A channel is something else."
  },
  {
   "stem": "You want a consistent classification. Which temperature do you choose?",
   "options": [
    "It is always turned off",
    "High, close to 1",
    "Low, close to 0",
    "It does not matter"
   ],
   "answer": 2,
   "explanation": "A low temperature gives more predictable and consistent responses."
  }
 ],
 "reto": {
  "text": "Create a ticket classification prompt with three categories.\nTest it with five different texts and temperature zero.\nAdd it as an agent tool and call it from the chat.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-prompt-node"
},
{
 "id": "L14",
 "module": 2,
 "title": "Send HTTP request",
 "level": "exam",
 "minutes": 12,
 "skills": [
  "1.3f"
 ],
 "theory": {
  "intro": "Send HTTP request is the node that lets a topic call an API on the internet by itself, like asking another system for a piece of data by message. It is useful when you need to read or change information that lives outside the agent.",
  "sections": [
   {
    "heading": "What you configure",
    "body": "You type the endpoint URL, choose the method (GET, POST, PATCH, PUT, or DELETE), add headers if needed, such as Authorization, and define the body. By default the body is No Content, which is typical for a GET.",
    "visual": "<svg viewBox=\"0 0 360 176\" role=\"img\" aria-label=\"Fields of the Send HTTP request node\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><text x=\"4\" y=\"14\" stroke=\"none\" style=\"fill:var(--muted)\">Fields of the Send HTTP request node</text><rect x=\"2\" y=\"22\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"41\" stroke=\"none\" fill=\"currentColor\">URL and Method (GET, POST, PATCH, PUT, DELETE)</text><rect x=\"2\" y=\"60\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"79\" stroke=\"none\" fill=\"currentColor\">Headers and Body (default: No Content)</text><rect x=\"2\" y=\"98\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"117\" stroke=\"none\" fill=\"currentColor\">Response data type: from a sample JSON</text><rect x=\"2\" y=\"136\" width=\"356\" height=\"30\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"14\" y=\"155\" stroke=\"none\" fill=\"currentColor\">Error handling and Request timeout (30 s)</text></svg>"
   },
   {
    "heading": "The body",
    "body": "With JSON content, you send a JSON object, typical for POST or PUT. With Edit JSON and Formula, you can write it as a Power Fx object that uses variables. With Raw content, you send a text string, also written with a Power Fx formula."
   },
   {
    "heading": "The response",
    "body": "In Response data type, you paste a sample JSON and choose Get schema from sample JSON. Copilot Studio generates a variable with that shape. In Save user response as, you choose where to store it.",
    "visual": "<svg viewBox=\"0 0 340 110\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"30\" width=\"90\" height=\"46\" rx=\"6\"/><text x=\"47\" y=\"57\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topic</text><rect x=\"125\" y=\"30\" width=\"100\" height=\"46\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"175\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Send HTTP</text><text x=\"175\" y=\"64\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">request</text><line x1=\"94\" y1=\"53\" x2=\"123\" y2=\"53\"/><polygon points=\"123,53 116.6,50.3 116.6,55.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"255\" y=\"4\" width=\"83\" height=\"36\" rx=\"6\"/><text x=\"296.5\" y=\"19\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Response</text><text x=\"296.5\" y=\"33\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">ok</text><rect x=\"255\" y=\"68\" width=\"83\" height=\"36\" rx=\"6\" style=\"stroke:var(--muted)\" stroke-dasharray=\"4 3\"/><text x=\"296.5\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">On Error</text><line x1=\"227\" y1=\"45\" x2=\"253\" y2=\"24\"/><polygon points=\"253,24 246.3,25.9 249.7,30.2\" fill=\"currentColor\" stroke=\"none\"/><line x1=\"227\" y1=\"61\" x2=\"253\" y2=\"84\" style=\"stroke:var(--muted)\"/><polygon points=\"253,84 250.0,77.7 246.4,81.8\" fill=\"currentColor\" stroke=\"none\"/></svg>"
   },
   {
    "heading": "If something fails",
    "body": "By default the node uses Raise an error. The agent stops and the On Error system topic fires. With Continue on error, the status code and the error body are saved in variables and the topic goes on. The error is of type Any, so you convert it with Parse value. The default timeout is 30 seconds.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Send HTTP request</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Method</span><span style=\"text-align:right\">GET</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Body</span><span style=\"text-align:right\">No Content</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Error handling</span><span style=\"text-align:right\">Continue on error</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Saved</span><span style=\"text-align:right\">status code and error body</span></div></div>"
   }
  ],
  "steps": [
   "Open a topic and select Add node under the node you want.",
   "Point to Advanced and choose Send HTTP request.",
   "Type the URL and choose the method, for example GET.",
   "Select Edit in Headers and body to add headers and define the body.",
   "In Response data type, choose From sample data and paste a sample JSON.",
   "In Save user response as, create a variable for the response.",
   "In Error handling, choose Continue on error and define the status and error variables."
  ],
  "example": "Contoso queries a tickets API with a GET. The body stays as No Content and the response is saved in a variable built from a sample JSON. If the API returns a 404, Contoso chose Continue on error. The code is saved in Topic.StatusCode, the error body in Topic.ErrorResponse, and the topic replies \"I could not find that ticket\" without stopping. To create tickets, it uses a POST with JSON content.",
  "examTips": [
   "To handle the error without stopping the topic: Continue on error.",
   "Trap: leaving the default and not understanding why On Error fires.",
   "Default body: No Content. The error is of type Any and is converted with Parse value."
  ],
  "glossary": [
   {
    "term": "HTTP request",
    "def": "A call to an API with a URL, a method, headers, and sometimes a body."
   },
   {
    "term": "On Error",
    "def": "A system topic that runs when an unhandled error happens."
   },
   {
    "term": "Parse value",
    "def": "A node that converts a value of type Any into a structured record."
   },
   {
    "term": "Continue on error",
    "def": "An option that saves the status and the error in variables and lets the topic go on."
   }
  ]
 },
 "scenes": [
  {
   "title": "A ticket that lives outside",
   "caption": "The tickets live outside the agent. Valeria proposes a node that calls an API by itself: Send HTTP request.",
   "say": "Marta wants to know the status of her ticket, but the tickets live in another system, outside the agent. The service manager wants the agent to check by itself. Valeria has the answer: the Send H T T P request node. It lets a topic call an A P I on the internet, like asking another system for a piece of data by message. Nexo gets a courier badge."
  },
  {
   "title": "Address, method, headers, body",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">What you configure</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Address</span><span style=\"text-align:right\">The URL of the endpoint</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Method</span><span style=\"text-align:right\">GET · POST · PATCH · PUT · DELETE</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Headers · Body</span><span style=\"text-align:right\">Authorization · default No Content</span></div></div>",
   "caption": "Type the URL, choose the method, add headers such as Authorization, and define the body. Default body: No Content.",
   "say": "Think of a letter leaving the mail room. You type the endpoint address, the U R L. You choose the method: get, post, patch, put, or delete. You add headers if needed, such as Authorization. Then you define the body, what goes inside the envelope. By default the body is No Content, which is typical for a get."
  },
  {
   "title": "What goes inside the envelope",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The body</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">JSON content</span><span style=\"text-align:right\">A JSON object · POST or PUT</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Edit JSON and Formula</span><span style=\"text-align:right\">A Power Fx object with variables</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Raw content</span><span style=\"text-align:right\">A text string · Power Fx formula</span></div></div>",
   "caption": "JSON content sends a JSON object. Edit JSON and Formula uses Power Fx. Raw content sends a text string.",
   "say": "When there is something to send, the body has two kinds of content. With J S O N content, you send a J S O N object, typical for post or put. With Edit J S O N and Formula, you write it as a Power F X object that uses variables. With Raw content, you send a text string, also written with a Power F X formula."
  },
  {
   "title": "The reply letter",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The response</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Response data type</span><span style=\"text-align:right\">Paste a sample JSON</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Get schema from sample JSON</span><span style=\"text-align:right\">A variable with that shape</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Save user response as</span><span style=\"text-align:right\">Where the reply is stored</span></div></div>",
   "caption": "Paste a sample JSON, choose Get schema from sample JSON, then pick a variable in Save user response as.",
   "say": "The other system answers with a reply letter. In Response data type, Valeria pastes a sample J S O N and chooses Get schema from sample J S O N. Copilot Studio generates a variable with that shape, so the topic knows the fields of the reply. In Save user response as, she chooses where to store it."
  },
  {
   "title": "Decide: the body of a get",
   "caption": "Valeria reads one ticket with a GET and leaves the body as it is. What does the body hold by default?",
   "say": "Your turn. Valeria adds the node to read one ticket. She uses get and leaves the body as it is. What does the body hold by default? An object with the ticket data? No Content, nothing is sent? Or a text string with the ticket? Decide before I answer. No Content, nothing is sent. The body is No Content by default, which is typical for a get. A J S O N object is for post or put, and a text string is Raw content."
  },
  {
   "title": "When the call fails",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Default error handling</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default</span><span style=\"text-align:right\">Raise an error</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What happens</span><span style=\"text-align:right\">The agent stops</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">On Error system topic fires</span></div></div>",
   "caption": "By default the node uses Raise an error: the agent stops and the On Error system topic fires.",
   "say": "Sometimes the letter comes back unanswered. By default the node uses Raise an error. The agent stops, and the On Error system topic fires. The rest of the topic does not run. Many authors leave this default and then do not understand why On Error appears. Valeria wants a calmer path for Contoso."
  },
  {
   "title": "Continue on error",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Continue on error</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Saved</span><span style=\"text-align:right\">Status code and error body</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Error type</span><span style=\"text-align:right\">Any · convert with Parse value</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Request timeout</span><span style=\"text-align:right\">Thirty seconds by default</span></div></div>",
   "caption": "Continue on error saves the status code and the error body. The error is type Any: use Parse value. Timeout: thirty seconds.",
   "say": "With Continue on error, the node does not stop the agent. The status code and the error body are saved in variables, and the topic goes on. The error is of type Any, so you convert it with a Parse value node. One more setting to know: the default request timeout is thirty seconds."
  },
  {
   "title": "Decide: reply and go on",
   "caption": "A missing ticket makes the API fail and the topic stops. What should Valeria choose in Error handling?",
   "say": "Your turn. Marta asks about a missing ticket, and the tickets A P I fails. The service manager wants the topic to reply and go on. What should Valeria choose in Error handling? Keep the default, Raise an error? Set a longer request timeout? Or switch to Continue on error? Decide before I answer. Switch to Continue on error. It saves the status code and the error body in variables, and the topic goes on. The default, Raise an error, stops the agent and fires On Error."
  },
  {
   "title": "The Contoso case: find a ticket",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Find a ticket</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Request</span><span style=\"text-align:right\">GET · body No Content</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">On a 404</span><span style=\"text-align:right\">Topic.StatusCode · Topic.ErrorResponse</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Reply</span><span style=\"text-align:right\">I could not find that ticket</span></div></div>",
   "caption": "GET with No Content. On a 404 the code goes to Topic.StatusCode, the body to Topic.ErrorResponse, and the topic replies.",
   "say": "Contoso queries its tickets A P I with a get. The body stays as No Content, and the response is saved in a variable built from a sample J S O N. Contoso chose Continue on error, so if the A P I returns a four oh four, the code goes into Topic Status Code and the error body into Topic Error Response. The topic replies, I could not find that ticket, without stopping. To create tickets, Contoso uses a post with J S O N content."
  },
  {
   "title": "Add it in Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Add the node</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Add node · Advanced · Send HTTP request</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Request</span><span style=\"text-align:right\">URL · method · Headers and body</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Reply and errors</span><span style=\"text-align:right\">Sample JSON · variable · Continue on error</span></div></div>",
   "caption": "Add node, Advanced, Send HTTP request. URL and method, headers and body, sample JSON, response variable, Continue on error.",
   "say": "Here are the steps in Copilot Studio. Open a topic and select Add node. Point to Advanced and choose Send H T T P request. Type the U R L and choose get. Select Edit in Headers and body. In Response data type, choose From sample data and paste a sample J S O N. In Save user response as, create a variable. In Error handling, choose Continue on error and define the status and error variables."
  },
  {
   "title": "Decide: reading the error",
   "caption": "The error body waits in a variable of type Any. Which node converts it into a structured record?",
   "say": "Your turn. Valeria chose Continue on error, so the error body waits in a variable. It is of type Any, and she wants its fields. Which node converts it into a structured record? Parse value, into a record? Send a message, as plain text? Or the On Error system topic? Decide before I answer. Parse value, into a record. Parse value converts a value of type Any into a structured record the topic can use. On Error only runs when an error is not handled, so it converts nothing."
  },
  {
   "title": "Three rules to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The letter</span><span style=\"text-align:right\">URL · method · headers · body</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default</span><span style=\"text-align:right\">Raise an error fires On Error</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Go on</span><span style=\"text-align:right\">Continue on error · Parse value</span></div></div>",
   "caption": "Address, method, headers, body (default No Content). Raise an error fires On Error. Continue on error plus Parse value.",
   "say": "Back in the mail room, Marta's question now gets an answer, even when the ticket does not exist. Remember three things. The node sends a letter with an address, a method, headers, and a body that is No Content by default. Raise an error is the default, and it fires On Error. Continue on error saves the status and the error body, and Parse value reads it. Next, tools inside a topic."
  }
 ],
 "check": [
  {
   "stem": "What does the node do by default if the call fails?",
   "options": [
    "It continues silently and logs nothing",
    "It raises an error",
    "It retries again and again, with no limit",
    "It deletes the topic and its variables"
   ],
   "answer": 1,
   "explanation": "The default is Raise an error. The agent stops and the On Error system topic fires."
  },
  {
   "stem": "What does Continue on error save?",
   "options": [
    "Only the URL and the request headers",
    "Nothing, the variables are left empty",
    "The status code and error body",
    "The user's name and the chat history"
   ],
   "answer": 2,
   "explanation": "The status code and the error body are saved in the variables you define, and the topic goes on."
  },
  {
   "stem": "What is the default value of the body?",
   "options": [
    "Raw content",
    "JSON content",
    "Form data",
    "No Content"
   ],
   "answer": 3,
   "explanation": "The body is No Content by default, which is typical for a GET."
  },
  {
   "stem": "Which node converts the error of type Any into a record?",
   "options": [
    "End all topics",
    "Redirect",
    "Send a message",
    "Parse value"
   ],
   "answer": 3,
   "explanation": "Parse value converts a value of type Any into a Power Fx record."
  }
 ],
 "reto": {
  "text": "Add a Send HTTP request with a GET to a public test API.\nDefine the response with a sample JSON.\nSwitch to Continue on error and cause a failure with a bad URL.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node"
},
{
 "id": "L15",
 "module": 2,
 "title": "Tools inside a topic",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "1.3c"
 ],
 "theory": {
  "intro": "A tool can be called in two ways: by you, explicitly from a topic, or by the agent itself when it decides it needs it. The difference is who is in control, like a driver who follows a fixed route versus one who chooses the way.",
  "sections": [
   {
    "heading": "Classic versus generative",
    "body": "In classic orchestration (generative orchestration turned off), an agent answers only with topics, and tools are called only explicitly from a topic. With generative orchestration, the orchestrator picks the most suitable tool or topic by itself, reading its name and description.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Orchestration</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Classic</span><span style=\"text-align:right\">you call the tool from a topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Generative</span><span style=\"text-align:right\">the agent picks by description</span></div></div>"
   },
   {
    "heading": "Trigger phrases and tools",
    "body": "Trigger phrases only select topics, never tools. You can use tools inside topics, though. Add a node with Add node, Add a tool, and an Action node appears.",
    "visual": "<svg viewBox=\"0 0 360 110\" role=\"img\" aria-label=\"Topic → Add a tool → Action node\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\"/><text x=\"54\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topic</text><line x1=\"108\" y1=\"39\" x2=\"122\" y2=\"39\"/><polygon points=\"126,39 119,35.5 119,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"128\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"180\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Add a tool</text><line x1=\"234\" y1=\"39\" x2=\"248\" y2=\"39\"/><polygon points=\"252,39 245,35.5 245,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"254\" y=\"14\" width=\"104\" height=\"50\" rx=\"6\"/><text x=\"306\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Action</text><text x=\"306\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">node</text><text x=\"180\" y=\"94\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Explicit call from the topic</text></svg>"
   },
   {
    "heading": "Tool settings",
    "body": "In a tool's details you find Allow agent to decide dynamically (the agent can pick it by itself), Ask the end user before running (asks for confirmation; No by default), and Authentication (end user or maker credentials). Fill using sets how the inputs are filled.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Tool: Check inventory</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Ask the end user before running</span><span style=\"text-align:right\">Yes</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">sets the credentials</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">After running</span><span style=\"text-align:right\">sets how it responds</span></div></div>"
   },
   {
    "heading": "What happens when it finishes",
    "body": "With After running, you choose how the agent responds: Don't respond (the default), Write the response with generative AI, Send specific response, or Send an adaptive card. Tools run in the user's context, so authentication must be enabled."
   },
   {
    "heading": "Search tools that only work in topics",
    "body": "Two tools exist only inside topics. You add them with Add a tool in a topic. They don't appear on the agent's Tools page, and the orchestrator can't call them.\n\nCreate search query rewrites the user's latest message, plus the conversation context, into a clear query string. For example, the follow-up \"what about sick leave?\" becomes a full question. Perform custom search searches the knowledge sources you set on the node and returns the raw results, not summarized, in a variable. Then you can filter them, apply business rules, or feed a prompt. They are often used in sequence.\n\nThis differs from the Generative answers node, which finds and writes the answer in one step. Here, retrieval and response are separate."
   }
  ],
  "steps": [
   "Open your agent and go to the Tools page.",
   "Select Add a tool and choose a tool, then Add and configure.",
   "In its settings, review Name and Description, written so the orchestrator can understand it.",
   "Turn on Ask the end user before running if the action is sensitive.",
   "Open a topic, select Add node (+), and choose Add a tool.",
   "Select the tool. An Action node appears in the topic.",
   "Test in the chat and check whether it asks for confirmation."
  ],
  "example": "Contoso has a tool called \"Check inventory\". Because it can show stock data, Contoso turns on Ask the end user before running, so the agent asks the user to confirm before running it. The tool uses end user credentials, so each employee sees only what their account allows. And because the description clearly says \"checks stock by product code\", the orchestrator picks it by itself only when someone asks about stock.",
  "examTips": [
   "User confirmation before a sensitive action: Ask the end user before running.",
   "Trap: relying on trigger phrases to pick tools. They only pick topics.",
   "Classic = explicit call from a topic. Generative = chosen by name and description.",
   "Create search query and Perform custom search work only inside topics. Perform custom search returns raw, unsummarized results in a variable."
  ],
  "glossary": [
   {
    "term": "Orchestrator",
    "def": "The component that decides which topic, tool, or knowledge to use to respond."
   },
   {
    "term": "Action node",
    "def": "A node that appears in a topic when you add a tool."
   },
   {
    "term": "Trigger phrase",
    "def": "A phrase that starts a topic. It does not start tools."
   },
   {
    "term": "Authentication (tool)",
    "def": "Sets whether the tool runs with end user or maker credentials."
   },
   {
    "term": "Create search query",
    "def": "A topic-only tool that rewrites the latest message and conversation context into a clear query string."
   },
   {
    "term": "Perform custom search",
    "def": "A topic-only tool that searches the node's knowledge sources and returns raw results in a variable."
   }
  ]
 },
 "scenes": [
  {
   "title": "Who calls the tool",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two ways to call a tool</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Explicit</span><span style=\"text-align:right\">You call it from a topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">By the agent</span><span style=\"text-align:right\">It decides it needs it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The difference</span><span style=\"text-align:right\">Who is in control</span></div></div>",
   "caption": "A tool can be called explicitly from a topic, or by the agent when it decides it needs it.",
   "say": "Marta asks the Contoso agent about the stock of a product. Nexo needs a tool for that, the Check inventory tool. A tool can be called in two ways. You can call it explicitly from a topic, or the agent can call it by itself when it decides it needs it. The difference is who is in control. It is like a driver who follows a fixed route, versus one who chooses the way."
  },
  {
   "title": "Classic orchestration",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Classic orchestration</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Generative orchestration</span><span style=\"text-align:right\">Turned off</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The agent answers</span><span style=\"text-align:right\">Only with topics</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tools</span><span style=\"text-align:right\">Called only from a topic</span></div></div>",
   "caption": "Classic orchestration: generative orchestration off. The agent answers only with topics; tools are called only explicitly from a topic.",
   "say": "First, the fixed route. In classic orchestration, generative orchestration is turned off. The agent answers only with topics. Tools are called only explicitly, from inside a topic, at the step where you placed them. Nobody else picks them. Valeria draws the route, and Nexo follows it, stop by stop. You keep full control of the flow."
  },
  {
   "title": "Generative orchestration",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Generative orchestration</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who picks</span><span style=\"text-align:right\">The orchestrator, by itself</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What it picks</span><span style=\"text-align:right\">The most suitable tool or topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What it reads</span><span style=\"text-align:right\">Name and description</span></div></div>",
   "caption": "Generative orchestration: the orchestrator picks the most suitable tool or topic by itself, reading its name and description.",
   "say": "Now the driver who chooses the way. With generative orchestration, the orchestrator picks the most suitable tool or topic by itself. The orchestrator is the part that decides which topic, tool, or knowledge to use to respond. To choose a tool, it reads the tool's name and description. So the description must say clearly what the tool does. A vague one leaves Nexo guessing."
  },
  {
   "title": "Decide: the fixed route",
   "caption": "Generative orchestration is off, and Check inventory must still run. In classic orchestration, how is a tool called?",
   "say": "Your turn. Valeria turns generative orchestration off for a test agent. The Check inventory tool must still run. In classic orchestration, how is a tool called? By the orchestrator, by description? Explicitly, from inside a topic? Or by the user, from the chat window? Decide before I answer. Explicitly, from inside a topic. In classic orchestration the agent answers only with topics, so tools run only where a topic calls them. Picking a tool by name and description is generative orchestration, and that is turned off here."
  },
  {
   "title": "Inside a topic",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Inside a topic</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Add</span><span style=\"text-align:right\">Add node · Add a tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Result</span><span style=\"text-align:right\">An Action node appears</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trigger phrases</span><span style=\"text-align:right\">Select topics, never tools</span></div></div>",
   "caption": "Add node, Add a tool, and an Action node appears. Trigger phrases only select topics, never tools.",
   "say": "Back on the fixed route. To call a tool from a topic, Valeria selects Add node, then Add a tool, and picks the tool. An Action node appears in the topic. That node is the explicit call. One more rule, and the exam loves it. Trigger phrases start topics. They only select topics, never tools. You can use tools inside topics, but a trigger phrase never picks a tool."
  },
  {
   "title": "Tool settings",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Tool settings</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Allow agent to decide dynamically</span><span style=\"text-align:right\">The agent can pick it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Ask the end user before running</span><span style=\"text-align:right\">Confirmation · No by default</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication · Fill using</span><span style=\"text-align:right\">Credentials · how inputs are filled</span></div></div>",
   "caption": "Allow agent to decide dynamically, Ask the end user before running (No by default), Authentication, and Fill using.",
   "say": "Each tool has its details. Allow agent to decide dynamically lets the agent pick the tool by itself. Ask the end user before running asks for confirmation first, and it is No by default. Authentication sets whether the tool runs with end user or maker credentials. And Fill using sets how the inputs are filled. Check inventory can show stock data, so Contoso turns on Ask the end user before running."
  },
  {
   "title": "Decide: ask first",
   "caption": "A sensitive tool must get the user's okay before it runs. Which setting should Valeria turn on?",
   "say": "Your turn. The service manager is worried about a sensitive tool. Before it runs, the agent must get the user's okay. Which setting should Valeria turn on? Ask the end user before running? A trigger phrase that asks first? Or Authentication with maker credentials? Decide before I answer. Ask the end user before running. That setting asks the user for confirmation before the tool runs, and it is No by default. A trigger phrase only selects topics, never tools, so it cannot guard a tool."
  },
  {
   "title": "When the tool finishes",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">After running</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default</span><span style=\"text-align:right\">Don't respond</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Other choices</span><span style=\"text-align:right\">Generative AI · specific response · adaptive card</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">User's context</span><span style=\"text-align:right\">Authentication must be enabled</span></div></div>",
   "caption": "After running: Don't respond (default), Write the response with generative AI, Send specific response, or Send an adaptive card.",
   "say": "When the tool finishes, After running sets how the agent responds. There are four choices. Don't respond, which is the default. Write the response with generative A I. Send specific response. Or Send an adaptive card. Tools run in the user's context, so authentication must be enabled. At Contoso, Check inventory uses end user credentials, so each employee sees only what their account allows."
  },
  {
   "title": "Two tools only for topics",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Topic-only tools</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Add a tool in a topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not on</span><span style=\"text-align:right\">The Tools page · the orchestrator</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Create search query</span><span style=\"text-align:right\">Message + context → clear query</span></div></div>",
   "caption": "Two tools exist only inside topics, not on the Tools page. Create search query rewrites the latest message into a clear query.",
   "say": "Inside one aisle, Valeria opens a small booth with two special tools. They exist only inside topics, and you add them with Add a tool in a topic. They do not appear on the agent's Tools page, and the orchestrator cannot call them. The first is Create search query. It rewrites the user's latest message, plus the conversation context, into a clear query string. A follow up like, what about sick leave, becomes a full question."
  },
  {
   "title": "Raw results, two steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Perform custom search</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Returns</span><span style=\"text-align:right\">Raw results in a variable</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Filter · business rules · a prompt</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Generative answers</span><span style=\"text-align:right\">Finds and writes in one step</span></div></div>",
   "caption": "Perform custom search returns raw, unsummarized results in a variable. Generative answers finds and writes in one step.",
   "say": "The second is Perform custom search. It searches the knowledge sources you set on the node, and returns the raw results, not summarized, in a variable. Then you can filter them, apply business rules, or feed a prompt. The two tools are often used in sequence. Compare the Generative answers node, which finds and writes the answer in one step. Here, retrieval and response are separate."
  },
  {
   "title": "Add it in Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Add it in Copilot Studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tools page</span><span style=\"text-align:right\">Add a tool · Add and configure</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Settings</span><span style=\"text-align:right\">Name · Description · Ask before running</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topic</span><span style=\"text-align:right\">Add node · Add a tool · Action node</span></div></div>",
   "caption": "Tools page, Add a tool, Add and configure. Review Name and Description, ask before running, then Add node, Add a tool, test.",
   "say": "Here are the steps in Copilot Studio. Open your agent and go to the Tools page. Select Add a tool, choose a tool, then Add and configure. In its settings, review the Name and Description, written so the orchestrator can understand them. Turn on Ask the end user before running if the action is sensitive. Now open a topic, select Add node, and choose Add a tool. Select the tool, and an Action node appears. Test in the chat, and check whether it asks for confirmation."
  },
  {
   "title": "Decide: the raw results",
   "caption": "Valeria wants raw search results in a variable, to filter with business rules. Which tool should she add inside the topic?",
   "say": "Your turn. Valeria wants the raw search results in a variable. Then the topic will filter them with business rules. Which tool should she add inside the topic? Create search query? Generative answers node? Or Perform custom search? Decide before I answer. Perform custom search. It searches the knowledge sources set on the node and returns raw, unsummarized results in a variable. Generative answers finds and writes the answer in one step, and Create search query only rewrites the question."
  },
  {
   "title": "Three rules to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Classic · Generative</span><span style=\"text-align:right\">Explicit call · name and description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trigger phrases</span><span style=\"text-align:right\">Topics only · ask before running</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Search tools</span><span style=\"text-align:right\">Only inside topics</span></div></div>",
   "caption": "Classic: explicit call from a topic. Generative: name and description. Trigger phrases pick topics. Search tools live only in topics.",
   "say": "Back on the warehouse floor, Marta confirms, and Nexo brings her stock answer. Remember three things. Classic means an explicit call from a topic, and generative means the orchestrator picks by name and description. Trigger phrases select only topics, and Ask the end user before running asks for confirmation. Create search query and Perform custom search work only inside topics. Next, agent flows inside a topic."
  }
 ],
 "check": [
  {
   "stem": "In classic orchestration, how is a tool called?",
   "options": [
    "Explicitly from a topic",
    "With a trigger phrase",
    "With a channel",
    "By itself, through the orchestrator"
   ],
   "answer": 0,
   "explanation": "In classic orchestration, tools are called only explicitly from a topic."
  },
  {
   "stem": "Which setting asks the user for confirmation before the tool runs?",
   "options": [
    "Authentication method for the tool's connection",
    "Fill using, to map the input values",
    "After running, send a specific response",
    "Ask the end user before running"
   ],
   "answer": 3,
   "explanation": "Ask the end user before running (No by default) asks for confirmation before running."
  },
  {
   "stem": "What does the generative orchestrator rely on to pick a tool?",
   "options": [
    "Its size and the number of inputs",
    "Its color and the size of its icon",
    "The channel and the time of the request",
    "Its name and description"
   ],
   "answer": 3,
   "explanation": "The orchestrator uses the name and description, together with the context and the user's intent."
  },
  {
   "stem": "Trigger phrases select...",
   "options": [
    "Tools that are linked to a topic",
    "Only topics, not tools or flows",
    "Flows that the topic calls",
    "Channels where the agent is published"
   ],
   "answer": 1,
   "explanation": "Trigger phrases select only topics, not tools."
  }
 ],
 "reto": {
  "text": "Add a tool to an agent and open its settings.\nTurn on Ask the end user before running and test it in the chat.\nRewrite its description and see whether the agent picks it differently.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
},
{
 "id": "L16",
 "module": 2,
 "title": "Agent flows inside a topic",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "1.3a"
 ],
 "theory": {
  "intro": "An agent flow is an automatic recipe of steps, like creating a ticket or sending an email. You can give it to the whole agent, which uses it when it sees fit, or place it at an exact point in a topic, like a step that always goes in the same place.",
  "sections": [
   {
    "heading": "A flow in a topic",
    "body": "When you add a flow to a topic, it is available only to that topic and runs exactly at the point on the canvas where you put it, like an Action node. This is what you need when something must happen at an exact moment in the conversation.",
    "visual": "<svg viewBox=\"0 0 340 120\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"6\" width=\"160\" height=\"44\" rx=\"6\"/><text x=\"82\" y=\"32\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topic: Report problem</text><rect x=\"178\" y=\"6\" width=\"160\" height=\"44\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"258\" y=\"32\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agent (orchestrator)</text><rect x=\"2\" y=\"76\" width=\"160\" height=\"38\" rx=\"6\" style=\"stroke:var(--muted)\" stroke-dasharray=\"4 3\"/><text x=\"82\" y=\"92\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Flow CreateTicket</text><text x=\"82\" y=\"106\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">only here</text><rect x=\"178\" y=\"76\" width=\"160\" height=\"38\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"258\" y=\"92\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Flow CreateTicket</text><text x=\"258\" y=\"106\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">agent's choice</text><line x1=\"82\" y1=\"52\" x2=\"82\" y2=\"74\" style=\"stroke:var(--muted)\"/><polygon points=\"82,74 84.7,67.6 79.3,67.6\" fill=\"currentColor\" stroke=\"none\"/><line x1=\"258\" y1=\"52\" x2=\"258\" y2=\"74\" style=\"stroke:var(--accent)\"/><polygon points=\"258,74 260.7,67.6 255.3,67.6\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/></svg>"
   },
   {
    "heading": "A flow at agent level",
    "body": "If you add it from the agent's Tools page, it becomes an agent-level tool. The orchestrator can pick it directly at run time, without a topic calling it."
   },
   {
    "heading": "Controlling automatic selection",
    "body": "If you add the flow as a tool and turn off Allow agent to decide dynamically, the agent uses it only when a topic calls it explicitly. Ask the end user before running, on the other hand, only asks for confirmation. The orchestrator can still pick it.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Topic: Report problem</div><div style=\"padding:2px 0\">Question: title</div><div style=\"padding:2px 0\">Question: urgency</div><div style=\"padding:2px 0\">Action: CreateTicket (agent flow)</div><div style=\"padding:2px 0\">Message: ticket number</div></div>"
   },
   {
    "heading": "Flow requirements",
    "body": "To add it as a tool, the flow must have the When an agent calls the flow trigger and a Respond to the agent action. It must also be published, respond in real time, and do so within 100 seconds."
   },
   {
    "heading": "Long jobs: the async split",
    "body": "The flow must also be a solution flow, or it does not appear in the tool picker. If you create the flow as a new tool from the agent, Copilot Studio adds the trigger and the response action for you.\n\nRespond to the agent is the line between synchronous and asynchronous. Actions placed after it run asynchronously, up to Power Automate's flow duration limit of 30 days. For long work, start the job, return a job ID quickly (within 100 seconds), and let a polling topic or a follow-up message give the final result.\n\nMicrosoft also documents a newer, separate option: Asynchronous response On, a callback for flows that run longer than two minutes (only in environments on the new infrastructure; fully supported in Teams, not in Microsoft Copilot or telephony). It is not the tool pattern: for a flow used as a tool, keep it Off and use the job ID approach above."
   }
  ],
  "steps": [
   "Create a simple agent flow and publish it.",
   "Open your agent and go to the Topics page. Open the topic where you want the flow.",
   "Select Add node (+) under the node you want.",
   "Choose Add a tool and select the flow.",
   "An Action node appears in the topic, at that exact point.",
   "Map the inputs to topic variables and use the outputs in a Message.",
   "If you also added it as an agent tool, turn off Allow agent to decide dynamically to limit its use."
  ],
  "example": "The Contoso CreateTicket flow is added inside the \"Report problem\" topic. It runs right after the agent collects the title and the urgency, and returns the ticket number to show in a message. Contoso does not want the agent to create tickets in other conversations, so it keeps the flow as a topic tool. If it ever adds it as an agent tool, it will turn off Allow agent to decide dynamically so it is used only when a topic calls it.",
  "examTips": [
   "A flow that must run only at an exact point in the conversation: add it to the topic.",
   "Trap: thinking Ask the end user before running blocks automatic selection. It only asks for confirmation.",
   "Allow agent to decide dynamically off = only explicit calls from a topic.",
   "Job longer than 100 seconds: return a job ID at Respond to the agent and put the long actions after it. The flow must be a solution flow."
  ],
  "glossary": [
   {
    "term": "Agent flow",
    "def": "A flow of automatic steps created in Copilot Studio that an agent can use as a tool."
   },
   {
    "term": "Topic-level tool",
    "def": "A flow added to a topic. It is available only to that topic."
   },
   {
    "term": "Agent-level tool",
    "def": "A flow added to the agent. The orchestrator can pick it."
   },
   {
    "term": "Allow agent to decide dynamically",
    "def": "A setting that lets the agent decide when to use the tool."
   },
   {
    "term": "Respond to the agent",
    "def": "The flow action where the topic gets its outputs. Actions placed after it run asynchronously."
   },
   {
    "term": "Solution flow",
    "def": "A flow that lives in a solution. It must be one to appear in the tool picker."
   }
  ]
 },
 "scenes": [
  {
   "title": "Two ways to use a flow",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two ways to use a flow</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent flow</span><span style=\"text-align:right\">An automatic recipe of steps</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Whole agent</span><span style=\"text-align:right\">Used when it sees fit</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">In a topic</span><span style=\"text-align:right\">At an exact point</span></div></div>",
   "caption": "An agent flow is an automatic recipe of steps. Give it to the whole agent, or place it at an exact point in a topic.",
   "say": "Marta has a problem with her laptop, and she tells the Contoso agent. Nexo needs to create a ticket for her. An agent flow is an automatic recipe of steps, like creating a ticket or sending an email. You can give it to the whole agent, which uses it when it sees fit. Or you can place it at an exact point in a topic, like a step that always goes in the same place."
  },
  {
   "title": "A flow inside a topic",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">A flow inside a topic</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Available</span><span style=\"text-align:right\">Only to that topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Runs</span><span style=\"text-align:right\">Where you put it · like an Action node</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Contoso</span><span style=\"text-align:right\">CreateTicket in Report problem</span></div></div>",
   "caption": "A flow added to a topic is available only to that topic, and runs where you put it, like an Action node.",
   "say": "First, the exact point. When you add a flow to a topic, it is available only to that topic. It runs exactly at the point on the canvas where you put it, like an Action node. At Contoso, the CreateTicket flow goes inside the Report problem topic. It runs right after the agent collects the title and the urgency. Then it returns the ticket number, shown in a message."
  },
  {
   "title": "A flow as an agent tool",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">A flow as an agent tool</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Added from</span><span style=\"text-align:right\">The agent's Tools page</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Type</span><span style=\"text-align:right\">Agent-level tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who picks</span><span style=\"text-align:right\">The orchestrator, at run time</span></div></div>",
   "caption": "A flow added from the agent's Tools page is an agent-level tool. The orchestrator can pick it at run time, without a topic calling it.",
   "say": "Now the other way. If you add the flow from the agent's Tools page, it becomes an agent-level tool. The orchestrator can pick it directly at run time, without a topic calling it. So the flow is no longer tied to one moment in one topic. It becomes the agent's choice, not a fixed step. Nexo can reach for it whenever it sees fit."
  },
  {
   "title": "Decide: the exact moment",
   "caption": "CreateTicket must run at one exact moment, and never in other conversations. Where should Valeria add the flow?",
   "say": "Your turn. The service manager wants a ticket at one exact moment. No tickets in other conversations. Where should Valeria add the CreateTicket flow? On the agent's own Tools page? In the Report problem topic? Or in all topics of the agent? Decide before I answer. In the Report problem topic. A flow in a topic is available only to that topic, and runs exactly where you put it. On the Tools page, the orchestrator could pick it in any conversation."
  },
  {
   "title": "Controlling the selection",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Controlling the selection</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Allow agent to decide dynamically</span><span style=\"text-align:right\">Off: explicit calls only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Ask the end user before running</span><span style=\"text-align:right\">Only asks for confirmation</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The orchestrator</span><span style=\"text-align:right\">Can still pick it</span></div></div>",
   "caption": "Allow agent to decide dynamically off: explicit topic calls only. Ask the end user before running only asks for confirmation.",
   "say": "But what if Contoso also adds the flow as an agent tool? Then Valeria turns off Allow agent to decide dynamically. With that setting off, the agent uses the flow only when a topic calls it explicitly. Watch out for a common trap. Ask the end user before running does not block the selection. It only asks for confirmation, and the orchestrator can still pick the flow."
  },
  {
   "title": "What a flow needs",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Flow requirements</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trigger · action</span><span style=\"text-align:right\">When an agent calls the flow · Respond to the agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Timing</span><span style=\"text-align:right\">Published · real time · within 100 seconds</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tool picker</span><span style=\"text-align:right\">Solution flow only</span></div></div>",
   "caption": "A tool flow needs the When an agent calls the flow trigger, Respond to the agent, publishing, a reply within 100 seconds, and a solution.",
   "say": "Not every flow can be a tool. It must have the When an agent calls the flow trigger, and a Respond to the agent action. It must be published, respond in real time, and do so within one hundred seconds. It must also be a solution flow, or it does not appear in the tool picker. Good news: if you create the flow as a new tool from the agent, Copilot Studio adds the trigger and the response action for you."
  },
  {
   "title": "Long jobs: the async split",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The async split</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Respond to the agent</span><span style=\"text-align:right\">Synchronous | asynchronous line</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">After it</span><span style=\"text-align:right\">Runs async · up to 30 days</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Long work</span><span style=\"text-align:right\">Job ID fast · polling topic or follow-up</span></div></div>",
   "caption": "Actions after Respond to the agent run asynchronously, up to 30 days. For long work, return a job ID quickly, then report the result later.",
   "say": "Some jobs take longer than one hundred seconds. Respond to the agent is the line between synchronous and asynchronous. Actions placed after it run asynchronously, up to Power Automate's flow duration limit of thirty days. So for long work, start the job and return a job I D quickly, within one hundred seconds. Then a polling topic or a follow-up message gives the final result."
  },
  {
   "title": "Decide: only when a topic calls",
   "caption": "CreateTicket is also an agent tool, but must run only when a topic calls it. Which setting should Valeria change?",
   "say": "Your turn. CreateTicket is now an agent tool too. It must run only when a topic calls it. Which setting should Valeria change? Turn off Allow agent to decide dynamically? Turn on Ask the end user before running? Or remove the flow from the Report problem topic? Decide before I answer. Turn off Allow agent to decide dynamically. With it off, the agent uses the flow only when a topic calls it explicitly. Ask the end user before running only asks for confirmation, and the orchestrator can still pick it."
  },
  {
   "title": "A separate callback option",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Asynchronous response On</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">Callback · flows over two minutes</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">New infrastructure · Teams, not Microsoft Copilot or telephony</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">For a tool</span><span style=\"text-align:right\">Keep it Off · use the job ID</span></div></div>",
   "caption": "Asynchronous response On is a newer, separate callback for flows over two minutes. It is not the tool pattern: for a tool, keep it Off.",
   "say": "Microsoft also documents a newer, separate option, called Asynchronous response On. It is a callback for flows that run longer than two minutes. It works only in environments on the new infrastructure. It is fully supported in Teams, but not in Microsoft Copilot or telephony. But it is not the tool pattern. For a flow used as a tool, keep it Off, and use the job I D approach."
  },
  {
   "title": "Add it in Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Add it in Copilot Studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Flow</span><span style=\"text-align:right\">Create · publish</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topic</span><span style=\"text-align:right\">Add node (+) · Add a tool · Action node</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Inputs → topic variables · outputs → Message</span></div></div>",
   "caption": "Publish the flow, open the topic, Add node, Add a tool, select the flow. Map inputs to topic variables and use outputs in a Message.",
   "say": "Here are the steps in Copilot Studio. Create a simple agent flow and publish it. Open your agent, go to the Topics page, and open the Report problem topic. Select Add node under the node you want. Choose Add a tool and select CreateTicket. An Action node appears at that exact point. Map the inputs to topic variables, and use the outputs in a Message. If you also added it as an agent tool, turn off Allow agent to decide dynamically."
  },
  {
   "title": "Decide: the long job",
   "caption": "A Contoso flow starts a job that runs for hours, but a tool must respond within 100 seconds. What should Valeria do?",
   "say": "Your turn. A Contoso flow starts a job that runs for hours. As a tool, it must respond within one hundred seconds. What should Valeria do? Turn on the Asynchronous response option? Move every action before the response? Or reply early, work after the response? Decide before I answer. Reply early, work after the response. Return a job I D at Respond to the agent, and place the long actions after it, where they run asynchronously. Asynchronous response On is a separate callback, so for a tool keep it Off."
  },
  {
   "title": "Three rules to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Exact point</span><span style=\"text-align:right\">Add the flow to the topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Decide dynamically off</span><span style=\"text-align:right\">Explicit calls only · ask before running only confirms</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Longer than 100 seconds</span><span style=\"text-align:right\">Job ID at Respond to the agent · solution flow</span></div></div>",
   "caption": "Exact point: add the flow to the topic. Decide dynamically off: explicit calls only. Long job: job ID at Respond to the agent.",
   "say": "Back at the plant, Marta reads her ticket number, and Nexo moves on. Remember three things. A flow that must run at an exact point goes inside the topic, and turning off Allow agent to decide dynamically means explicit calls only. Ask the end user before running only asks for confirmation. And for a job longer than one hundred seconds, return a job I D at Respond to the agent, in a solution flow. Next, create an agent flow and its parameters."
  }
 ],
 "check": [
  {
   "stem": "Where is a flow that you added to a topic available?",
   "options": [
    "Nowhere, it is only in the flow list",
    "In all agents in the environment",
    "In all topics of the agent",
    "Only in that topic, not the agent"
   ],
   "answer": 3,
   "explanation": "A flow added to a topic is available only to that topic."
  },
  {
   "stem": "Which node appears when you add a flow to a topic?",
   "options": [
    "Condition",
    "Message",
    "Action",
    "Question"
   ],
   "answer": 2,
   "explanation": "When you add a tool or flow to a topic, an Action node appears."
  },
  {
   "stem": "Which setting stops the orchestrator from picking the flow by itself?",
   "options": [
    "Ask the end user before running each time it is called",
    "Allow agent to decide dynamically turned off",
    "Authentication, set to Manual",
    "After running, show the tool's output"
   ],
   "answer": 1,
   "explanation": "With Allow agent to decide dynamically turned off, it is used only by an explicit call from a topic."
  },
  {
   "stem": "What does Ask the end user before running do?",
   "options": [
    "It blocks automatic selection of the flow",
    "It changes the channel the flow runs on",
    "It deletes the flow from the topic",
    "It asks for confirmation before it runs"
   ],
   "answer": 3,
   "explanation": "It only asks for confirmation. The orchestrator can still pick the tool."
  }
 ],
 "reto": {
  "text": "Create a simple agent flow from the agent's Tools page.\nAdd it to a topic with an Action node.\nTurn off Allow agent to decide dynamically and compare the behavior.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent"
},
{
 "id": "L17",
 "module": 3,
 "title": "Create an agent flow and its parameters",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "1.2a",
  "1.2e"
 ],
 "theory": {
  "intro": "An agent flow is a sequence of automatic steps that the agent can run, like a recipe with input ingredients and an output dish. For the agent to use it, the recipe must start and end in a very specific way.",
  "sections": [
   {
    "heading": "It starts and ends in a special way",
    "body": "To work as an agent tool, a flow needs the When an agent calls the flow trigger at the start and a Respond to the agent action at the end. In between go the actions you want. The other triggers belong to other scenarios, such as Power Apps or schedules.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">When an agent</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">calls the flow</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\" style=\"stroke:var(--accent)\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"169.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Actions</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\" style=\"stroke:var(--accent)\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Respond to</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">the agent</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Inputs on top, outputs below</text></svg>"
   },
   {
    "heading": "Inputs and outputs",
    "body": "Inputs are defined in the trigger and outputs in Respond to the agent. With generative orchestration, the agent fills the inputs from the conversation context or generates questions to ask for them. If you set a Custom value on an input, the agent no longer asks for it."
   },
   {
    "heading": "Only the outputs arrive",
    "body": "The internal variables of the flow do not reach the agent. Only the outputs you define in Respond to the agent do. Those outputs appear as variables in the tool node of the topic, or the orchestrator uses them to write the response.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Agent flow: CreateTicket</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Inputs</span><span style=\"text-align:right\">title, urgency</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Output</span><span style=\"text-align:right\">ticketId</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Asynchronous response</span><span style=\"text-align:right\">Off</span></div></div>"
   },
   {
    "heading": "Conditions to use it",
    "body": "The flow must be published and respond in real time: the Asynchronous response option (under Networking, inside Respond to the agent) must be Off. It must also answer within the 100-second action limit. (A newer, separate callback feature does exist with Asynchronous response On for flows longer than two minutes, but it is not the pattern for a flow used as a tool.)",
    "visual": "<svg viewBox=\"0 0 360 176\" role=\"img\" aria-label=\"Why a flow does not show up as a tool\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><text x=\"4\" y=\"14\" stroke=\"none\" style=\"fill:var(--muted)\">Why a flow does not show up as a tool</text><rect x=\"2\" y=\"22\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"41\" stroke=\"none\" fill=\"currentColor\">Missing the When an agent calls the flow trigger</text><rect x=\"2\" y=\"60\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"79\" stroke=\"none\" fill=\"currentColor\">Missing the Respond to the agent action</text><rect x=\"2\" y=\"98\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"117\" stroke=\"none\" fill=\"currentColor\">The flow is not published</text><rect x=\"2\" y=\"136\" width=\"356\" height=\"30\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"14\" y=\"155\" stroke=\"none\" fill=\"currentColor\">Asynchronous response is still On (Networking)</text></svg>"
   }
  ],
  "steps": [
   "In Copilot Studio, create a new agent flow (with the designer or with natural language).",
   "Check that the trigger is When an agent calls the flow.",
   "Add the inputs the flow needs, for example title and urgency.",
   "Add the middle actions that do the work.",
   "At the end, add Respond to the agent and define the outputs, for example ticketId.",
   "In Respond to the agent, check that Asynchronous response is Off.",
   "Publish the flow and add it from Tools, Add a tool, Flow."
  ],
  "example": "Contoso creates the flow CreateTicket. Its inputs are title and urgency, and its output is ticketId. With generative orchestration, when someone says \"my laptop will not turn on\", the agent fills in the title from the message and asks for the urgency. For urgency, Contoso can set a fixed Custom value if every ticket starts as Medium, and then the agent no longer asks. At the end, the flow responds with ticketId and the agent shares it. The flow was published before it was added.",
  "examTips": [
   "A flow does not show up as a tool: the trigger or Respond to the agent is missing, it is not published, or Asynchronous response is still on.",
   "Trap: forgetting that only explicit outputs reach the agent.",
   "Action limit of 100 seconds; real-time response."
  ],
  "glossary": [
   {
    "term": "Agent flow",
    "def": "Automation flow built in Copilot Studio that the agent can use as a tool."
   },
   {
    "term": "Respond to the agent",
    "def": "Action that returns the flow outputs to the agent."
   },
   {
    "term": "Custom value",
    "def": "Fixed value that replaces the automatic filling of an input; the agent no longer asks."
   },
   {
    "term": "Asynchronous response",
    "def": "Option that delivers the result later; for tools it must be Off."
   }
  ]
 },
 "scenes": [
  {
   "title": "A recipe for the agent",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">A recipe for the agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent flow</span><span style=\"text-align:right\">A sequence of automatic steps</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Like a recipe</span><span style=\"text-align:right\">Input ingredients · output dish</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">To be a tool</span><span style=\"text-align:right\">A specific start and end</span></div></div>",
   "caption": "An agent flow is a sequence of automatic steps the agent can run, like a recipe: input ingredients, an output dish.",
   "say": "Marta tells the Contoso agent that her laptop will not turn on. Nexo needs to open a ticket, and Valeria builds the tool for it. An agent flow is a sequence of automatic steps that the agent can run. Think of a recipe, with input ingredients and an output dish. For the agent to use it, the recipe must start and end in a very specific way."
  },
  {
   "title": "It starts and ends in a special way",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Start and end</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trigger</span><span style=\"text-align:right\">When an agent calls the flow</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">In between</span><span style=\"text-align:right\">The actions you want</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">End</span><span style=\"text-align:right\">Respond to the agent</span></div></div>",
   "caption": "A tool flow starts with the When an agent calls the flow trigger and ends with Respond to the agent.",
   "say": "The start is the trigger called When an agent calls the flow. The end is the action called Respond to the agent. In between go the actions you want, the steps that do the work. Other triggers belong to other scenarios, such as Power Apps or schedules. Without this start and this end, Nexo cannot use the flow as a tool."
  },
  {
   "title": "The inputs",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The inputs</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Defined in</span><span style=\"text-align:right\">The trigger</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Generative orchestration</span><span style=\"text-align:right\">Fills them from the conversation</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Missing data</span><span style=\"text-align:right\">The agent asks for it</span></div></div>",
   "caption": "Inputs are defined in the trigger. With generative orchestration, the agent fills them from the conversation or asks for them.",
   "say": "Now the inputs. Inputs are defined in the trigger, at the start of the flow. CreateTicket needs two of them, a title and an urgency. With generative orchestration, the agent fills the inputs from the conversation context. When something is missing, it generates questions to ask for it. Marta said her laptop will not turn on, so Nexo takes the title from her message and asks for the urgency."
  },
  {
   "title": "A Custom value",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Custom value</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">A fixed value on an input</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Replaces</span><span style=\"text-align:right\">The automatic filling</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Effect</span><span style=\"text-align:right\">The agent no longer asks</span></div></div>",
   "caption": "A Custom value is a fixed value on an input. It replaces the automatic filling, and the agent no longer asks.",
   "say": "But what if every ticket starts with the same urgency? The service manager says all new tickets begin as Medium. Valeria sets a Custom value on the urgency input. A Custom value is a fixed value that replaces the automatic filling. Once it is set, the agent no longer asks for that input. Nexo only takes the title from Marta, and the urgency is always Medium."
  },
  {
   "title": "Decide: always Medium",
   "caption": "Every ticket must start as Medium, but Nexo still asks Marta for the urgency. What should Valeria do?",
   "say": "Your turn. The service manager wants every ticket to start as Medium. Today, Nexo still asks Marta for the urgency each time. What should Valeria do? Add a Question node for urgency? Set a Custom value of Medium? Or remove urgency from the trigger? Decide before I answer. Set a Custom value of Medium. With a fixed Custom value, the agent no longer asks for that input. A Question node would still ask Marta, which is exactly what the manager wants to stop."
  },
  {
   "title": "Only the outputs arrive",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Only the outputs arrive</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Outputs</span><span style=\"text-align:right\">Defined in Respond to the agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Internal variables</span><span style=\"text-align:right\">Never reach the agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Outputs become</span><span style=\"text-align:right\">Tool node variables · or the response</span></div></div>",
   "caption": "Outputs are defined in Respond to the agent. Internal flow variables never reach the agent; only explicit outputs do.",
   "say": "Now the other end. Outputs are defined in Respond to the agent. CreateTicket returns one output, the ticket I D. Inside the flow there can be many internal variables, but they do not reach the agent. Only the outputs you define in Respond to the agent arrive. They appear as variables in the tool node of a topic, or the orchestrator uses them to write the response."
  },
  {
   "title": "Conditions to use it",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Conditions to use it</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Published</span><span style=\"text-align:right\">Before it is added</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Real time</span><span style=\"text-align:right\">Asynchronous response Off · Networking</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Action limit</span><span style=\"text-align:right\">100 seconds</span></div></div>",
   "caption": "The flow must be published, respond in real time with Asynchronous response Off, and answer within 100 seconds.",
   "say": "A few more conditions before Nexo can use the flow. First, it must be published. Second, it must respond in real time. So the Asynchronous response option must be Off. You find it under Networking, inside Respond to the agent. The flow must also answer within the action limit of one hundred seconds. A separate callback feature with Asynchronous response On exists for long flows, but it is not the pattern for a tool."
  },
  {
   "title": "Decide: the missing number",
   "caption": "The flow keeps the ticket ID in an internal variable, and Nexo never shares it. What should Valeria do?",
   "say": "Your turn. Valeria's flow keeps the ticket I D in an internal variable. Nexo runs the flow, but never shares the number with Marta. What should Valeria do? Ask Nexo to read the flow variable? Copy the variable into the topic? Or add it to Respond to the agent? Decide before I answer. Add it to Respond to the agent. Only the outputs defined there reach the agent, as variables or for the response. Internal variables never arrive, so Nexo cannot read them, no matter how you ask."
  },
  {
   "title": "The Contoso case",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">CreateTicket at Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Inputs</span><span style=\"text-align:right\">title (from the message) · urgency (Custom value Medium)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Output</span><span style=\"text-align:right\">ticketId</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Before adding</span><span style=\"text-align:right\">Published</span></div></div>",
   "caption": "CreateTicket: title from the message, urgency fixed as Medium, ticketId returned by Respond to the agent. Published before it was added.",
   "say": "Here is the whole Contoso case. Marta writes that her laptop will not turn on. Nexo calls CreateTicket and fills the title from her message. The urgency comes from the Custom value, Medium, so nobody asks. The middle actions create the ticket. At the end, Respond to the agent returns the ticket I D, and Nexo shares it with Marta. And the flow was published before it was added."
  },
  {
   "title": "Build it in Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Build it in Copilot Studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Flow</span><span style=\"text-align:right\">New agent flow · When an agent calls the flow · inputs</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">End</span><span style=\"text-align:right\">Respond to the agent · outputs · Asynchronous response Off</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Publish · Tools · Add a tool · Flow</span></div></div>",
   "caption": "Create the agent flow, check the trigger, add inputs and actions, add Respond to the agent, keep Asynchronous response Off, publish, add it.",
   "say": "Here are the steps in Copilot Studio. Create a new agent flow, with the designer or with natural language. Check that the trigger is When an agent calls the flow, and add the inputs title and urgency. Add the middle actions that do the work. At the end, add Respond to the agent and define the output ticket I D. Check that Asynchronous response is Off. Then publish the flow, and add it from Tools, Add a tool, Flow."
  },
  {
   "title": "Decide: not a tool yet",
   "caption": "The flow has the right trigger, Respond to the agent, and Asynchronous response Off, but it does not show up as a tool.",
   "say": "Your turn. Valeria's new flow has the right trigger and Respond to the agent. Asynchronous response is Off, but the flow does not show up as a tool. What should Valeria do? Publish the flow, then add it? Turn on Asynchronous response? Or set a Custom value on each input? Decide before I answer. Publish the flow, then add it. A flow must be published before the agent can use it as a tool. Asynchronous response on breaks the real time rule, and Custom values do not make it appear."
  },
  {
   "title": "Rules to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Start · end</span><span style=\"text-align:right\">When an agent calls the flow · Respond to the agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Inputs · outputs</span><span style=\"text-align:right\">Custom value stops the questions · only explicit outputs arrive</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">To show up</span><span style=\"text-align:right\">Published · Asynchronous response Off · 100 seconds</span></div></div>",
   "caption": "Start with When an agent calls the flow, end with Respond to the agent. Only explicit outputs arrive. Published, Off, 100 seconds.",
   "say": "Back at the rail yard, Marta reads her ticket I D, and Nexo moves on. Remember the rules. The flow starts with When an agent calls the flow and ends with Respond to the agent. Inputs live in the trigger, and a Custom value stops the questions. Only explicit outputs reach the agent. It must be published, with Asynchronous response Off, and answer within one hundred seconds. Next, actions, connectors, and express mode."
  }
 ],
 "check": [
  {
   "stem": "Which trigger does a flow need to be an agent tool?",
   "options": [
    "Recurrence",
    "When an HTTP request is received",
    "When a file is created",
    "When an agent calls the flow"
   ],
   "answer": 3,
   "explanation": "The right trigger is When an agent calls the flow."
  },
  {
   "stem": "Which action returns the outputs to the agent?",
   "options": [
    "Delay the flow",
    "Respond to the agent",
    "Terminate the flow run",
    "Compose a new value"
   ],
   "answer": 1,
   "explanation": "Respond to the agent returns the flow output values to the agent."
  },
  {
   "stem": "What is the action time limit?",
   "options": [
    "30 seconds",
    "10 seconds",
    "100 seconds",
    "1,000 seconds"
   ],
   "answer": 2,
   "explanation": "The flow must respond within the action limit of 100 seconds."
  },
  {
   "stem": "What happens to the internal variables of the flow?",
   "options": [
    "They are deleted from the flow",
    "They reach the agent unchanged",
    "They are published to Teams",
    "They never reach the agent"
   ],
   "answer": 3,
   "explanation": "Only the outputs defined in Respond to the agent reach the agent."
  }
 ],
 "reto": {
  "text": "Create an agent flow with the When an agent calls the flow trigger.\nAdd two inputs and one output in Respond to the agent.\nPublish it and call it from the agent chat.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent"
},
{
 "id": "L18",
 "module": 3,
 "title": "Actions, connectors, and express mode",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "1.2c"
 ],
 "theory": {
  "intro": "Actions are the steps a flow performs, like the ingredients and tools of a kitchen: some come grouped by type and others come from connectors to other systems. Express mode is also a faster way to cook when the agent is waiting for the answer.",
  "sections": [
   {
    "heading": "The action catalog",
    "body": "The actions of an agent flow are grouped into AI capabilities (generate text, process documents, Run a prompt, call an agent, respond to the agent), Human in the loop (approvals or information), Built-in tools (loops, conditions, data operations, dates, child flows), and Connectors.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Action groups</div><div style=\"padding:2px 0\">AI capabilities</div><div style=\"padding:2px 0\">Human in the loop</div><div style=\"padding:2px 0\">Built-in tools</div><div style=\"padding:2px 0\">Connectors</div></div>"
   },
   {
    "heading": "Connectors and Run a prompt",
    "body": "Connectors bring actions from other systems, such as Dataverse. Run a prompt, inside AI capabilities, runs a prompt at a point in the flow. You add it with Insert new action and choose an existing prompt or a new one.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Dataverse</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Add a row</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Run a</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">prompt</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Respond to</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">the agent</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Connector + AI + response</text></svg>"
   },
   {
    "heading": "What express mode is (preview)",
    "body": "By default, a flow that takes more than two minutes to respond to the agent fails. Express mode speeds up flows with heavy processing and low data volume, so they finish inside that two-minute window. It is in preview. Two figures appear in Microsoft's pages: 100 seconds is the action limit for a flow used as a tool, and two minutes is the default window for an agent flow to respond (the one express mode helps with). For a tool flow, plan for 100 seconds."
   },
   {
    "heading": "Requirements and limits",
    "body": "It requires the When an agent calls a flow trigger, a Respond to the agent action, and a Copilot Studio plan; it has no extra cost. It does not support Delay or webhooks. It works poorly with lots of data: do not include more than about 100 actions per run and avoid very large connector responses.",
    "visual": "<svg viewBox=\"0 0 360 106\" role=\"img\" aria-label=\"Use express mode versus Do not use it\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"2\" width=\"170\" height=\"102\" rx=\"8\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><rect x=\"188\" y=\"2\" width=\"170\" height=\"102\" rx=\"8\"/><text x=\"87\" y=\"22\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"bold\">Use express mode</text><text x=\"273\" y=\"22\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"bold\">Do not use it</text><text x=\"87\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Heavy processing</text><text x=\"87\" y=\"66\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Little data</text><text x=\"87\" y=\"88\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">With Respond to agent</text><text x=\"273\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Lots of data</text><text x=\"273\" y=\"66\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">No response</text><text x=\"273\" y=\"88\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Long processes</text></svg>"
   }
  ],
  "steps": [
   "Open an agent flow in Copilot Studio.",
   "Select Insert new action at the point where you want a step.",
   "Review the groups: AI capabilities, Human in the loop, Built-in tools, and Connectors.",
   "Add an action from a connector, for example Dataverse.",
   "Add a Run a prompt from AI capabilities.",
   "Open Overview, select Edit under Details, and turn on Express mode (if it is available in your environment).",
   "Test the flow and check that it responds in under two minutes."
  ],
  "example": "The Contoso flow CreateTicket uses a Dataverse connector to insert the ticket row and a Run a prompt to summarize the user text. It ends with Respond to the agent. Because it does quite a lot of processing but moves little data, Contoso turns on express mode (preview) so it answers within the two-minute window. For a long reconciliation process, however, Contoso does not use it: that process works asynchronously.",
  "examTips": [
   "Express mode (preview): heavy processing, little data, two-minute window; it requires the agent trigger, a response to the agent, and a Copilot Studio plan.",
   "Trap: using it for long processes; those are asynchronous.",
   "Run a prompt is in AI capabilities."
  ],
  "glossary": [
   {
    "term": "AI capabilities",
    "def": "Group of AI actions: generate text, process documents, Run a prompt, call an agent."
   },
   {
    "term": "Built-in tools",
    "def": "Group of basic actions: loops, conditions, data operations, dates, and child flows."
   },
   {
    "term": "Express mode",
    "def": "Preview mode that speeds up flows with heavy processing and little data."
   },
   {
    "term": "Connector",
    "def": "Set of actions to work with another system, such as Dataverse."
   }
  ]
 },
 "scenes": [
  {
   "title": "Steps from the shelves",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps from the shelves</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Actions</span><span style=\"text-align:right\">The steps a flow performs</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Grouped by type</span><span style=\"text-align:right\">Ready on the shelves</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">From connectors</span><span style=\"text-align:right\">Actions from other systems</span></div></div>",
   "caption": "Actions are the steps a flow performs. Some come grouped by type, others come from connectors to other systems.",
   "say": "Marta writes to Nexo that her laptop will not turn on, and CreateTicket must open a ticket fast. Valeria opens the flow to add more steps. Actions are the steps a flow performs, like the ingredients and tools of a kitchen. Some come grouped by type, and others come from connectors to other systems. Knowing the groups helps you find what you need quickly."
  },
  {
   "title": "The action catalog",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The action catalog</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">AI capabilities</span><span style=\"text-align:right\">Generate text · process documents · Run a prompt · call an agent · respond to the agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Human in the loop</span><span style=\"text-align:right\">Approvals · information</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Built-in tools</span><span style=\"text-align:right\">Loops · conditions · data operations · dates · child flows</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connectors</span><span style=\"text-align:right\">Actions from other systems</span></div></div>",
   "caption": "Four action groups: AI capabilities, Human in the loop, Built-in tools, and Connectors.",
   "say": "The actions of an agent flow come in four groups. AI capabilities holds generate text, process documents, Run a prompt, call an agent, and respond to the agent. Human in the loop is for approvals or for asking for information. Built-in tools holds loops, conditions, data operations, dates, and child flows. The fourth group is Connectors."
  },
  {
   "title": "Connectors and Run a prompt",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Connectors and Run a prompt</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connector</span><span style=\"text-align:right\">Dataverse · add the ticket row</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Run a prompt</span><span style=\"text-align:right\">In AI capabilities · runs at one point</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">How</span><span style=\"text-align:right\">Insert new action · existing or new prompt</span></div></div>",
   "caption": "Connectors bring actions from other systems, such as Dataverse. Run a prompt, in AI capabilities, runs a prompt at one point.",
   "say": "Connectors bring actions from other systems, such as Dataverse. CreateTicket uses the Dataverse connector to add the ticket row. Run a prompt lives inside AI capabilities, and it runs a prompt at one point in the flow. Valeria selects Insert new action where she wants the step. Then she chooses an existing prompt or a new one. Here, the prompt summarizes Marta's text."
  },
  {
   "title": "Decide: where is Run a prompt",
   "caption": "Valeria wants a step that summarizes Marta's text with a prompt. Where should she look for Run a prompt?",
   "say": "Your turn. Valeria wants a step that summarizes Marta's text with a prompt. She selects Insert new action in CreateTicket. Where should she look for Run a prompt? Look under the Connectors group? Look under AI capabilities? Or look under Built-in tools? Decide before I answer. Look under AI capabilities. Run a prompt is one of the AI capabilities, next to generate text and process documents. Connectors bring actions from other systems, such as Dataverse, not prompts."
  },
  {
   "title": "The two-minute window",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The two-minute window</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default</span><span style=\"text-align:right\">Over two minutes to respond: the flow fails</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Express mode</span><span style=\"text-align:right\">Heavy processing · low data volume</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Status</span><span style=\"text-align:right\">Preview</span></div></div>",
   "caption": "By default, a flow that takes more than two minutes to respond to the agent fails. Express mode (preview) helps it finish in time.",
   "say": "Now speed. By default, a flow that takes more than two minutes to respond to the agent fails. Marta would be left waiting, and Nexo would get an error. Express mode helps here. It speeds up flows with heavy processing and low data volume, so they finish inside that two-minute window. Express mode is in preview."
  },
  {
   "title": "Two figures, kept apart",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two figures</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">100 seconds</span><span style=\"text-align:right\">Action limit for a flow used as a tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Two minutes</span><span style=\"text-align:right\">Default window for an agent flow to respond</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tool flow</span><span style=\"text-align:right\">Plan for 100 seconds</span></div></div>",
   "caption": "100 seconds is the action limit for a flow used as a tool. Two minutes is the default window for an agent flow.",
   "say": "Two figures appear in Microsoft's pages, so keep them apart. One hundred seconds is the action limit for a flow used as a tool. Two minutes is the default window for an agent flow to respond to the agent, and that is the window express mode helps with. When your flow is a tool, plan for one hundred seconds."
  },
  {
   "title": "Requirements and limits",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Requirements and limits</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Needs</span><span style=\"text-align:right\">When an agent calls a flow · Respond to the agent · Copilot Studio plan</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Cost</span><span style=\"text-align:right\">No extra cost</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not supported</span><span style=\"text-align:right\">Delay · webhooks</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Keep it small</span><span style=\"text-align:right\">About 100 actions per run · no very large connector responses</span></div></div>",
   "caption": "Express mode needs the agent trigger, Respond to the agent, and a Copilot Studio plan. No Delay, no webhooks, little data.",
   "say": "Express mode has requirements. The flow needs the When an agent calls a flow trigger, a Respond to the agent action, and a Copilot Studio plan. It has no extra cost. It also has limits. It does not support Delay or webhooks. It works poorly with lots of data, so keep each run under about one hundred actions and avoid very large connector responses. Long processes are not for express mode; they work asynchronously."
  },
  {
   "title": "Decide: the long reconciliation",
   "caption": "A long reconciliation process moves a lot of data. Should express mode handle it?",
   "say": "Your turn. Contoso also has a long reconciliation process that moves a lot of data. The service manager asks Valeria whether express mode should handle it. What should Valeria do? Turn on express mode for it? Add a Delay action to it? Or let it run asynchronously? Decide before I answer. Let it run asynchronously. Long processes with lots of data are asynchronous, and express mode is for heavy processing with little data. Express mode for it is the trap, because it would not fit the two-minute window."
  },
  {
   "title": "The Contoso case",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">CreateTicket at Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connector</span><span style=\"text-align:right\">Dataverse inserts the ticket row</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">AI capabilities</span><span style=\"text-align:right\">Run a prompt summarizes the text</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">End</span><span style=\"text-align:right\">Respond to the agent · express mode on</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Reconciliation</span><span style=\"text-align:right\">Long process · asynchronous · no express mode</span></div></div>",
   "caption": "CreateTicket: Dataverse inserts the row, Run a prompt summarizes, Respond to the agent answers. Express mode on; reconciliation stays asynchronous.",
   "say": "Here is the whole Contoso case. CreateTicket starts with When an agent calls a flow. A Dataverse connector inserts the ticket row, and a Run a prompt summarizes Marta's text. The flow ends with Respond to the agent. It does quite a lot of processing but moves little data, so Contoso turns on express mode, in preview, and it answers within the two-minute window. The long reconciliation process does not use it."
  },
  {
   "title": "Build it in Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Build it in Copilot Studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Add</span><span style=\"text-align:right\">Insert new action · connector action · Run a prompt</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Turn on</span><span style=\"text-align:right\">Overview · Edit under Details · Express mode</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Test</span><span style=\"text-align:right\">Responds in under two minutes</span></div></div>",
   "caption": "Insert new action, add a connector action and a Run a prompt, then Overview, Edit under Details, Express mode on, and test.",
   "say": "Here are the steps in Copilot Studio. Open the agent flow. Select Insert new action at the point where you want a step, and review the groups AI capabilities, Human in the loop, Built-in tools, and Connectors. Add an action from a connector, such as Dataverse, then add a Run a prompt from AI capabilities. Open Overview, select Edit under Details, and turn on Express mode, if your environment offers it. Test that the flow responds in under two minutes."
  },
  {
   "title": "Decide: nothing comes back",
   "caption": "Valeria's flow does heavy processing on little data, but it never sends an answer back. What must the flow have?",
   "say": "Your turn. Valeria's new flow does heavy processing on little data. But it never sends an answer back, and express mode cannot help it. What must the flow have? A Respond to the agent action? A Delay action before the end? Or a webhook that calls the agent? Decide before I answer. A Respond to the agent action. Express mode requires the agent trigger, a Respond to the agent action, and a Copilot Studio plan. Delay and webhooks are not supported in express mode at all."
  },
  {
   "title": "Rules to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Four groups</span><span style=\"text-align:right\">AI capabilities · Human in the loop · Built-in tools · Connectors</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Run a prompt</span><span style=\"text-align:right\">AI capabilities</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Express mode</span><span style=\"text-align:right\">Heavy processing · little data · two minutes · preview</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Long processes</span><span style=\"text-align:right\">Asynchronous</span></div></div>",
   "caption": "Four groups; Run a prompt is in AI capabilities. Express mode: heavy processing, little data, two minutes. Long processes stay asynchronous.",
   "say": "Back at the market, Marta reads her ticket I D, and Nexo moves on. Remember the four groups: AI capabilities, Human in the loop, Built-in tools, and Connectors. Run a prompt is in AI capabilities. Express mode, in preview, is for heavy processing with little data, inside the two-minute window. It needs the agent trigger, Respond to the agent, and a Copilot Studio plan. Long processes stay asynchronous. Next, error handling in flows."
  }
 ],
 "check": [
  {
   "stem": "Which action group contains Run a prompt?",
   "options": [
    "Connectors",
    "AI capabilities",
    "Human in the loop",
    "Built-in tools"
   ],
   "answer": 1,
   "explanation": "Run a prompt is inside AI capabilities."
  },
  {
   "stem": "Which time window does express mode aim to meet?",
   "options": [
    "One day",
    "Thirty minutes",
    "Ten seconds",
    "Two minutes"
   ],
   "answer": 3,
   "explanation": "Express mode helps the flow finish within the two-minute window."
  },
  {
   "stem": "Which kind of flow benefits from express mode?",
   "options": [
    "Long processes with lots of data",
    "Heavy processing and low data volume",
    "Flows with Delay actions",
    "Flows with no response to the agent"
   ],
   "answer": 1,
   "explanation": "It works best with heavy processing and low data volume."
  },
  {
   "stem": "Which group includes loops and conditions?",
   "options": [
    "AI capabilities",
    "Teams",
    "Built-in tools",
    "Human in the loop"
   ],
   "answer": 2,
   "explanation": "Built-in tools includes loops, conditions, data operations, dates, and child flows."
  }
 ],
 "reto": {
  "text": "Open an agent flow and review the action groups.\nAdd an action from a connector and a Run a prompt.\nCheck whether your flow meets the express mode requirements.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-flow-express-mode"
},
{
 "id": "L19",
 "module": 3,
 "title": "Error handling in flows",
 "level": "exam",
 "minutes": 12,
 "skills": [
  "1.2f"
 ],
 "theory": {
  "intro": "Errors in a flow are not an \"if\", they are a \"when\". Handling them is like having a plan B: if the main path fails, your flow knows what to do instead of staying silent. The classic pattern is called try-catch.",
  "sections": [
   {
    "heading": "Try and Catch with scopes",
    "body": "You group the main actions inside a scope called Try and create another scope called Catch to handle the error. You set the Catch to run when the Try fails, using run after with has failed and has timed out.",
    "visual": "<svg viewBox=\"0 0 340 110\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"20\" width=\"100\" height=\"52\" rx=\"6\"/><text x=\"52\" y=\"43\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Scope Try</text><text x=\"52\" y=\"57\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">actions</text><rect x=\"120\" y=\"20\" width=\"100\" height=\"52\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"170\" y=\"36\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Scope Catch</text><text x=\"170\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">run after: failed</text><text x=\"170\" y=\"64\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">or timed out</text><rect x=\"238\" y=\"20\" width=\"100\" height=\"52\" rx=\"6\"/><text x=\"288\" y=\"43\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Terminate</text><text x=\"288\" y=\"57\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">status Failed</text><line x1=\"104\" y1=\"46\" x2=\"118\" y2=\"46\" style=\"stroke:var(--accent)\"/><polygon points=\"118,46 111.6,43.3 111.6,48.7\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><line x1=\"222\" y1=\"46\" x2=\"236\" y2=\"46\"/><polygon points=\"236,46 229.6,43.3 229.6,48.7\" fill=\"currentColor\" stroke=\"none\"/><text x=\"170\" y=\"100\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Catch reads result() from Try</text></svg>"
   },
   {
    "heading": "Reading the error",
    "body": "Inside the Catch, the result() function returns the results of the actions in the Try scope. With the Filter array action you keep the one that failed, and you can log the error or notify someone.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Agent flow with errors</div><div style=\"padding:2px 0\">Scope Try: insert row in Dataverse</div><div style=\"padding:2px 0\">Scope Catch (run after: has failed, has timed out)</div><div style=\"padding:2px 0\">Filter array on result() of Try</div><div style=\"padding:2px 0\">Terminate: Failed</div></div>"
   },
   {
    "heading": "Run after: the trap",
    "body": "Run after is set on the Catch, relative to the Try. With is successful, the Catch would run only when everything went well, which is the opposite of what you want. Run after can check whether an action failed, timed out, was skipped, or succeeded."
   },
   {
    "heading": "Retry policy and Terminate",
    "body": "A retry policy helps recover from transient failures. It is set in the action settings, with an initial interval and a maximum number of retries. Exponential retries are preferred because they increase the interval between retries. Terminate, with status Failed and a message, stops the flow and leaves a diagnosis.",
    "visual": "<svg viewBox=\"0 0 360 110\" role=\"img\" aria-label=\"Attempt fails → Retry 1 min → Retry 2 min → Retry 4 min\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"14\" width=\"72\" height=\"50\" rx=\"6\"/><text x=\"38\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Attempt</text><text x=\"38\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">fails</text><line x1=\"76\" y1=\"39\" x2=\"90\" y2=\"39\"/><polygon points=\"94,39 87,35.5 87,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"96\" y=\"14\" width=\"72\" height=\"50\" rx=\"6\"/><text x=\"132\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Retry</text><text x=\"132\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">1 min</text><line x1=\"170\" y1=\"39\" x2=\"184\" y2=\"39\"/><polygon points=\"188,39 181,35.5 181,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"190\" y=\"14\" width=\"72\" height=\"50\" rx=\"6\"/><text x=\"226\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Retry</text><text x=\"226\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">2 min</text><line x1=\"264\" y1=\"39\" x2=\"278\" y2=\"39\"/><polygon points=\"282,39 275,35.5 275,42.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"284\" y=\"14\" width=\"72\" height=\"50\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"320\" y=\"35\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Retry</text><text x=\"320\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">4 min</text><text x=\"180\" y=\"94\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Exponential retry: the interval grows</text></svg>"
   }
  ],
  "steps": [
   "Open your agent flow in the designer.",
   "Add a scope and name it Try; move the main actions inside it.",
   "Add another scope called Catch, right after the Try.",
   "In the Catch settings, configure run after: select has failed and has timed out.",
   "Inside the Catch, use Filter array on result() of the Try to get the error.",
   "Log the error or notify IT, and add Terminate with status Failed and a message.",
   "For actions sensitive to temporary failures, configure an exponential retry policy in their settings."
  ],
  "example": "In the Contoso flow CreateTicket, the Dataverse insert goes inside the Try scope. If it fails, the Catch scope runs with run after has failed and has timed out. It uses result() and Filter array to get the exact message, logs it, notifies the IT team, and ends with Terminate in status Failed. Also, the call to an external service has an exponential retry policy, because sometimes the network fails for a moment and a later retry works.",
  "examTips": [
   "Logging the error of a group of actions: Catch scope with run after has failed and has timed out, result(), and Filter array.",
   "Trap: setting run after \"is successful\", which only runs if everything went well.",
   "Exponential retry for transient failures; Terminate Failed leaves a status and a message."
  ],
  "glossary": [
   {
    "term": "Scope",
    "def": "Container that groups actions so they can be handled together."
   },
   {
    "term": "Run after",
    "def": "Setting that defines when an action runs, based on the result of the previous one."
   },
   {
    "term": "result()",
    "def": "Function that returns the results of the actions inside a scope."
   },
   {
    "term": "Retry policy",
    "def": "Setting that retries an action after a transient failure."
   },
   {
    "term": "Terminate",
    "def": "Action that stops the flow with a status and a message."
   }
  ]
 },
 "scenes": [
  {
   "title": "A plan B for the flow",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">A plan B for the flow</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Errors</span><span style=\"text-align:right\">Not an if, a when</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Plan B</span><span style=\"text-align:right\">The flow knows what to do instead of staying silent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Pattern</span><span style=\"text-align:right\">try catch</span></div></div>",
   "caption": "Errors in a flow are not an if, they are a when. The classic plan B pattern is called try catch.",
   "say": "Marta asks Nexo for help with her laptop, and CreateTicket must save her ticket in Dataverse. Today the insert fails, and the flow stays silent. Valeria knows that errors in a flow are not an if, they are a when. Handling them is like having a plan B. If the main path fails, the flow knows what to do instead of staying silent. The classic pattern is called try catch."
  },
  {
   "title": "Try and Catch scopes",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Try and Catch scopes</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Scope</span><span style=\"text-align:right\">Container that groups actions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Try</span><span style=\"text-align:right\">The main actions · Dataverse insert</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Catch</span><span style=\"text-align:right\">Right after the Try · handles the error</span></div></div>",
   "caption": "Group the main actions in a scope called Try. Create another scope called Catch, right after it, to handle the error.",
   "say": "A scope is a container that groups actions, so they can be handled together. Valeria adds a scope, names it Try, and moves the main actions inside it, such as the Dataverse insert. Then she adds another scope called Catch, right after the Try. The Try is the main path. The Catch is the plan B, and it only handles the error."
  },
  {
   "title": "Run after",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Run after</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Run after</span><span style=\"text-align:right\">When an action runs, based on the previous one</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Can check</span><span style=\"text-align:right\">failed · timed out · skipped · succeeded</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">On the Catch</span><span style=\"text-align:right\">Relative to the Try · has failed · has timed out</span></div></div>",
   "caption": "Run after defines when an action runs. Set it on the Catch, relative to the Try: has failed and has timed out.",
   "say": "So when does the Catch run? That is decided by run after, a setting that defines when an action runs, based on the result of the previous one. Run after can check whether an action failed, timed out, was skipped, or succeeded. Valeria sets it on the Catch, relative to the Try. She selects has failed and has timed out. Now the Catch runs only when the Try fails."
  },
  {
   "title": "Decide: when the Catch runs",
   "caption": "Valeria opens the settings of the Catch scope. Which run after options should she select?",
   "say": "Your turn. Valeria has put the Dataverse insert inside the Try scope. Now she opens the settings of the Catch scope. Which run after options should she select? Is successful and is skipped? Is skipped and has timed out? Or has failed or has timed out? Decide before I answer. Has failed or has timed out. The Catch must run when the Try fails or runs out of time. Is successful is the trap, because the Catch would then run only when everything went well."
  },
  {
   "title": "Reading the error",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Reading the error</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">result()</span><span style=\"text-align:right\">Results of the actions in the Try scope</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Filter array</span><span style=\"text-align:right\">Keeps the one that failed</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Log the error · notify IT</span></div></div>",
   "caption": "Inside the Catch, result() returns the results of the Try actions. Filter array keeps the one that failed.",
   "say": "Inside the Catch, Valeria needs to know what went wrong. The result function returns the results of the actions inside the Try scope. Some succeeded and one failed. With the Filter array action, she keeps only the one that failed, with its exact message. With that data she can log the error, or notify someone, such as the I T team."
  },
  {
   "title": "Retry policy",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Retry policy</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">For</span><span style=\"text-align:right\">Transient failures</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Action settings · initial interval · maximum number of retries</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Exponential</span><span style=\"text-align:right\">Preferred · the interval grows</span></div></div>",
   "caption": "A retry policy recovers from transient failures. Set it in the action settings. Exponential retries increase the interval.",
   "say": "Some failures are transient. The network fails for a moment, and a later try works. A retry policy helps the flow recover from them. It is set in the action settings, with an initial interval and a maximum number of retries. Exponential retries are preferred, because they increase the interval between retries. Each wait is longer than the last, so the problem has more time to clear."
  },
  {
   "title": "Decide: the external service",
   "caption": "Sometimes the network fails for a moment, and a later try works. What should Valeria set on the external call?",
   "say": "Your turn. CreateTicket also calls an external service. Sometimes the network fails for a moment, and a later try works. What should Valeria set on that call? An exponential retry policy? A Terminate with status Failed? Or a Catch with is successful? Decide before I answer. An exponential retry policy. A retry policy recovers from transient failures, and exponential retries increase the interval between retries. Terminate is the trap here, because it stops the flow instead of trying again."
  },
  {
   "title": "Terminate",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Terminate</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Terminate</span><span style=\"text-align:right\">Stops the flow with a status and a message</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Status</span><span style=\"text-align:right\">Failed</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Leaves</span><span style=\"text-align:right\">A diagnosis</span></div></div>",
   "caption": "Terminate, with status Failed and a message, stops the flow and leaves a diagnosis.",
   "say": "The Catch has one more job. When the error is logged and someone is notified, the flow should not pretend that all went well. Terminate is an action that stops the flow with a status and a message. Valeria adds Terminate at the end of the Catch, with status Failed and a short message. The run stops, and it leaves a diagnosis that anyone can read."
  },
  {
   "title": "The Contoso case",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">CreateTicket at Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Try</span><span style=\"text-align:right\">Dataverse insert</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Catch</span><span style=\"text-align:right\">has failed · has timed out · result() · Filter array</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Log · notify IT · Terminate Failed</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">External service</span><span style=\"text-align:right\">Exponential retry policy</span></div></div>",
   "caption": "CreateTicket: Dataverse insert in Try; Catch on has failed and has timed out; Filter array, log, notify IT, Terminate Failed.",
   "say": "Here is the whole Contoso case. In CreateTicket, the Dataverse insert goes inside the Try scope. If it fails, the Catch scope runs, with run after on has failed and has timed out. It uses the result function and Filter array to get the exact message. It logs it, notifies the I T team, and ends with Terminate in status Failed. The call to the external service has an exponential retry policy, because sometimes the network fails for a moment, and a later retry works."
  },
  {
   "title": "Build it in the designer",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Build it in the designer</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Scopes</span><span style=\"text-align:right\">Try with the main actions · Catch right after</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Catch settings</span><span style=\"text-align:right\">Run after: has failed · has timed out</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Inside the Catch</span><span style=\"text-align:right\">Filter array on result() · log or notify IT · Terminate Failed</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Sensitive actions</span><span style=\"text-align:right\">Exponential retry policy</span></div></div>",
   "caption": "Try scope, Catch scope with run after, Filter array on result(), log or notify, Terminate Failed, exponential retry.",
   "say": "Here are the steps. Open your agent flow in the designer. Add a scope, name it Try, and move the main actions inside it. Add another scope called Catch, right after the Try. In the Catch settings, configure run after with has failed and has timed out. Inside the Catch, use Filter array on the result of the Try. Log the error or notify I T, and add Terminate with status Failed and a message. Last, set an exponential retry policy on sensitive actions."
  },
  {
   "title": "Decide: the exact message",
   "caption": "The service manager wants the error of the Try actions logged with its exact message. What should Valeria add to read it?",
   "say": "Your turn. The service manager wants each Try error logged with its exact message. Valeria must read it first. What should she add to read the error? An exponential retry on every action? Filter array on the result function? Or a Catch that runs after is successful? Decide before I answer. Filter array on the result function. The result function returns the Try results, and Filter array keeps the failed one. A Catch on is successful is the trap, because it only runs when everything went well."
  },
  {
   "title": "Rules to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Try</span><span style=\"text-align:right\">Main actions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Catch</span><span style=\"text-align:right\">has failed · has timed out · never is successful</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Error</span><span style=\"text-align:right\">result() · Filter array</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Recover / stop</span><span style=\"text-align:right\">Exponential retry · Terminate Failed with a message</span></div></div>",
   "caption": "Try and Catch scopes; run after has failed and has timed out; result() and Filter array; exponential retry; Terminate Failed.",
   "say": "Back at Contoso, Marta's ticket is saved, and when something fails, the I T team knows why. Remember the pattern. A Try scope holds the main actions. A Catch scope runs after has failed and has timed out, never is successful. The result function and Filter array give you the error. Exponential retry handles transient failures. Terminate with status Failed leaves a status and a message. Next, human in the loop."
  }
 ],
 "check": [
  {
   "stem": "When does the Catch scope run?",
   "options": [
    "Always before the Try",
    "When the Try fails",
    "Never",
    "Only if everything went well"
   ],
   "answer": 1,
   "explanation": "The Catch is set with run after to run when the Try fails or times out."
  },
  {
   "stem": "Which function returns the results of the actions in a scope?",
   "options": [
    "concat()",
    "result()",
    "utcNow()",
    "workflow()"
   ],
   "answer": 1,
   "explanation": "result() returns the scope results, and Filter array lets you keep the action that failed."
  },
  {
   "stem": "Which run after option is the trap for a Catch?",
   "options": [
    "has timed out",
    "has failed",
    "is successful",
    "None"
   ],
   "answer": 2,
   "explanation": "With is successful, the Catch would only run when everything went well."
  },
  {
   "stem": "Why are exponential retry policies preferred?",
   "options": [
    "They do not retry at all",
    "They cancel the flow run at once",
    "They lengthen the wait between retries",
    "They are cheaper to run in the cloud"
   ],
   "answer": 2,
   "explanation": "They give a transient problem more time to clear by increasing the interval."
  }
 ],
 "reto": {
  "text": "Create a flow with a Try scope that fails on purpose.\nAdd a Catch scope with run after has failed.\nUse result() and Filter array to read the error and end with Failed.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling"
},
{
 "id": "L20",
 "module": 3,
 "title": "Human-in-the-loop",
 "level": "exam",
 "minutes": 12,
 "skills": [
  "1.2b"
 ],
 "theory": {
  "intro": "Human-in-the-loop means a person takes part in the automatic process, like a boss who signs before something is sent. A flow can ask someone for an approval or a piece of data and wait for the answer before moving on.",
  "sections": [
   {
    "heading": "Multistage approvals (preview)",
    "body": "The Run a multistage approval action, from the Human review connector, combines manual stages, AI stages, and conditions between stages. Multistage approvals exist only in agent flows. People respond through the Approvals app in Teams, Outlook, or the Power Automate portal.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">AI stage</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Condition</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Stage</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">manual</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Decision</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Manual and AI stages in sequence</text></svg>"
   },
   {
    "heading": "Manual and AI stages",
    "body": "A manual stage defines the approval type (First to respond or Everyone must approve), the title, who it is assigned to, and the details. An AI stage receives instructions and inputs (documents, images, text, knowledge) and returns Approve or Reject with a rationale. You cannot assign the same approver to several manual stages."
   },
   {
    "heading": "Conditions",
    "body": "Conditions between stages let you route, approve, reject, or skip stages based on criteria. Without conditions, if a stage is approved it moves to the next one, and if it is rejected the process ends. On the left side of a condition you can only use an input.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Laptop purchase</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stage 1, AI</span><span style=\"text-align:right\">checks the budget</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Condition</span><span style=\"text-align:right\">if Reject, reject</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stage 2, manual</span><span style=\"text-align:right\">management, First to respond</span></div></div>"
   },
   {
    "heading": "Request for information",
    "body": "If you only need data, use Request for information: it pauses the flow and asks one or more people for information through Outlook (same tenant). The first response wins, and the input types include text, yes/no, email, number, and date. The outputs are available as dynamic content.",
    "visual": "<svg viewBox=\"0 0 360 84\" role=\"img\" aria-label=\"Multistage approval versus Request for information\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"2\" width=\"170\" height=\"80\" rx=\"8\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><rect x=\"188\" y=\"2\" width=\"170\" height=\"80\" rx=\"8\"/><text x=\"87\" y=\"22\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"bold\">Multistage approval</text><text x=\"273\" y=\"22\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"bold\">Request for information</text><text x=\"87\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Approve or Reject</text><text x=\"87\" y=\"66\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Manual and AI stages</text><text x=\"273\" y=\"44\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Collects data</text><text x=\"273\" y=\"66\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">First response wins</text></svg>"
   }
  ],
  "steps": [
   "Open the designer of an agent flow.",
   "Select + at the point where you want the approval and search for Run a multistage approval (Human review).",
   "Select Set up the approval to open the stage editor.",
   "Select Create and add a manual stage: title, Assigned to, and Details.",
   "Add an AI stage with instructions and choose the model; select Test.",
   "Add a Condition between stages and define whether it approves, rejects, routes, or skips.",
   "To collect a piece of data, also try the Request for information action with a text field."
  ],
  "example": "Contoso handles laptop purchases. The request first goes through an AI stage that checks that the amount is within budget and returns Approve or Reject with its rationale. A condition decides: if the amount is above a certain threshold, it goes to a manual management stage with First to respond; if not, it ends approved. Contoso cannot assign the same manager to several manual stages. To ask for a missing cost center, it uses Request for information through Outlook.",
  "examTips": [
   "Approval in stages with AI and humans: multistage approval. Collecting a piece of data: Request for information.",
   "Trap: thinking advanced approvals have ALM support; you must recreate them after importing.",
   "Same approver in several manual stages: not allowed."
  ],
  "glossary": [
   {
    "term": "Human in the loop",
    "def": "Flow steps where a person approves or provides information before the flow continues."
   },
   {
    "term": "Multistage approval",
    "def": "Approval with several manual or AI stages and conditions between them; in preview."
   },
   {
    "term": "First to respond",
    "def": "Approval type that ends with the first response received."
   },
   {
    "term": "Request for information",
    "def": "Action that pauses the flow and asks people for data through Outlook."
   }
  ]
 },
 "scenes": [
  {
   "title": "A person in the flow",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">A person in the flow</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Human in the loop</span><span style=\"text-align:right\">A person takes part in the automatic process</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Like</span><span style=\"text-align:right\">A boss who signs before something is sent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The flow asks</span><span style=\"text-align:right\">An approval · a piece of data</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Waits for the answer before moving on</span></div></div>",
   "caption": "Human in the loop: a person takes part in the automatic process, like a boss who signs before something is sent.",
   "say": "Marta asks Nexo for a new laptop, and Contoso handles laptop purchases with an agent flow. But someone must say yes before the purchase goes ahead. Valeria knows the answer is human in the loop. It means a person takes part in the automatic process, like a boss who signs before something is sent. The flow can ask someone for an approval or a piece of data. Then it waits for the answer before moving on."
  },
  {
   "title": "Multistage approval",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Multistage approval</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Action</span><span style=\"text-align:right\">Run a multistage approval · preview</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connector</span><span style=\"text-align:right\">Human review</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Combines</span><span style=\"text-align:right\">Manual stages · AI stages · conditions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Only in agent flows</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Respond in</span><span style=\"text-align:right\">Approvals app in Teams · Outlook · Power Automate portal</span></div></div>",
   "caption": "Run a multistage approval, Human review connector, preview: manual stages, AI stages, conditions. Only in agent flows.",
   "say": "For an approval in several steps, Valeria uses the Run a multistage approval action. It comes from the Human review connector, and it is in preview. It combines manual stages, A I stages, and conditions between the stages. Multistage approvals exist only in agent flows. People respond through the Approvals app in Teams, in Outlook, or in the Power Automate portal."
  },
  {
   "title": "Manual stages",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Manual stages</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Approval type</span><span style=\"text-align:right\">First to respond · Everyone must approve</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Settings</span><span style=\"text-align:right\">Title · Assigned to · Details</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rule</span><span style=\"text-align:right\">Never the same approver in several manual stages</span></div></div>",
   "caption": "Manual stage: First to respond or Everyone must approve, title, Assigned to, details. Never the same approver in several manual stages.",
   "say": "A manual stage is a step where a person decides. Valeria picks the approval type. First to respond ends with the first response received. Everyone must approve needs every approver to say yes. She also sets the title, who the stage is assigned to, and the details. One rule matters: you cannot assign the same approver to several manual stages."
  },
  {
   "title": "AI stages",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">AI stages</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Gets</span><span style=\"text-align:right\">Instructions · inputs: documents, images, text, knowledge</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Setup</span><span style=\"text-align:right\">Choose the model · Test</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Returns</span><span style=\"text-align:right\">Approve or Reject · with a rationale</span></div></div>",
   "caption": "AI stage: instructions and inputs such as documents, images, text, or knowledge. It returns Approve or Reject with a rationale.",
   "say": "An A I stage is a step where a model decides. Valeria writes its instructions and gives it inputs, such as documents, images, text, or knowledge. She chooses the model and selects Test. The stage returns Approve or Reject, together with a rationale. So anyone can read why the stage decided, and not only what it decided."
  },
  {
   "title": "Decide: the second manual stage",
   "caption": "The service manager approves the first manual stage. Valeria wants the same manager on the second one. What should she do?",
   "say": "Your turn. Valeria builds the laptop approval with two manual stages. The service manager approves the first one, and Valeria wants the same manager on the second one too. What should she do? Assign the manager to both stages? Use a second approver instead? Or turn both stages into conditions? Decide before I answer. Use a second approver instead. You cannot assign the same approver to several manual stages, so the second stage needs someone else. Assigning the manager to both stages is the trap, because the rule forbids it."
  },
  {
   "title": "Conditions",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Conditions</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Between stages</span><span style=\"text-align:right\">Route · approve · reject · skip</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Without conditions</span><span style=\"text-align:right\">Approved → next stage · rejected → process ends</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Left side</span><span style=\"text-align:right\">Only an input</span></div></div>",
   "caption": "Conditions between stages route, approve, reject, or skip stages. Without them: approved moves on, rejected ends. Left side: only an input.",
   "say": "Between the stages, Valeria can add conditions. A condition lets her route, approve, reject, or skip stages based on criteria. Without conditions, the path is simple. If a stage is approved, it moves to the next one. If it is rejected, the process ends. One detail: on the left side of a condition, you can only use an input."
  },
  {
   "title": "Request for information",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Request for information</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Does</span><span style=\"text-align:right\">Pauses the flow · asks one or more people</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Channel</span><span style=\"text-align:right\">Outlook · same tenant</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Answers</span><span style=\"text-align:right\">First response wins</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Input types</span><span style=\"text-align:right\">Text · yes/no · email · number · date</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Outputs</span><span style=\"text-align:right\">Dynamic content</span></div></div>",
   "caption": "Request for information pauses the flow and asks for data through Outlook, same tenant. First response wins; outputs are dynamic content.",
   "say": "Sometimes the flow does not need a yes or a no, only a piece of data. For that, Valeria uses Request for information. It pauses the flow and asks one or more people through Outlook, inside the same tenant. The first response wins. Input types include text, yes or no, email, number, and date. The answers come back as dynamic content for the next steps."
  },
  {
   "title": "Decide: the missing cost center",
   "caption": "Marta's laptop request has no cost center, and the flow cannot continue until someone types it in. What should Valeria add?",
   "say": "Your turn. Marta's laptop request arrives without a cost center. The flow cannot continue until someone types it in. What should Valeria add? A new manual approval stage? A condition on the cost center? Or a Request for information? Decide before I answer. A Request for information. It pauses the flow, asks for the data through Outlook, and returns it as dynamic content. A manual approval stage is the trap, because it returns Approve or Reject, not the missing data."
  },
  {
   "title": "The Contoso case",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Laptop purchase at Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stage 1, AI</span><span style=\"text-align:right\">Checks the budget · Approve or Reject with a rationale</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Condition</span><span style=\"text-align:right\">Above a threshold → management · if not, ends approved</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stage 2, manual</span><span style=\"text-align:right\">Management · First to respond</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Missing cost center</span><span style=\"text-align:right\">Request for information</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Moving solutions</span><span style=\"text-align:right\">No ALM support · recreate after import</span></div></div>",
   "caption": "AI stage checks the budget; a condition sends large amounts to management, First to respond. Missing cost center: Request for information.",
   "say": "Here is the whole Contoso case. Marta's laptop request first goes through an A I stage that checks the amount is within budget. It returns Approve or Reject with its rationale. Then a condition decides. Above a certain threshold, the request goes to a manual management stage with First to respond. If not, it ends approved. A missing cost center is asked with Request for information. One more fact: advanced approvals have no A L M support, so you must recreate them after importing."
  },
  {
   "title": "Build it in the designer",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Build it in the designer</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Start</span><span style=\"text-align:right\">Designer of an agent flow · + · Run a multistage approval</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stage editor</span><span style=\"text-align:right\">Set up the approval</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Manual stage</span><span style=\"text-align:right\">Create · title · Assigned to · Details</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">AI stage</span><span style=\"text-align:right\">Instructions · model · Test</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Condition between stages · Request for information with a text field</span></div></div>",
   "caption": "Designer, plus, Run a multistage approval, Set up the approval, manual stage, AI stage with Test, condition, Request for information.",
   "say": "Here are the steps. Open the designer of an agent flow. Select the plus sign where you want the approval, and search for Run a multistage approval. Select Set up the approval to open the stage editor. Create a manual stage with a title, Assigned to, and Details. Add an A I stage with instructions, choose the model, and select Test. Add a condition between the stages. To collect a piece of data, also try Request for information with a text field."
  },
  {
   "title": "Decide: moving to production",
   "caption": "Valeria exports the solution with the laptop approval and imports it into production. What must she do with the multistage approval?",
   "say": "Your turn. The laptop approval works in development. Valeria exports the solution and imports it into production. What must she do with the multistage approval? Recreate the approval after import? Nothing, it travels with the solution? Or export it again as unmanaged first? Decide before I answer. Recreate the approval after import. Advanced approvals have no A L M support, so you must recreate them after importing. Doing nothing is the trap, because the approval does not travel with the solution."
  },
  {
   "title": "Rules to remember",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stages with AI and humans</span><span style=\"text-align:right\">Multistage approval · agent flows only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Manual</span><span style=\"text-align:right\">First to respond or Everyone must approve · no repeated approver</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">AI</span><span style=\"text-align:right\">Approve or Reject with a rationale</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Conditions</span><span style=\"text-align:right\">Route · approve · reject · skip</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Data</span><span style=\"text-align:right\">Request for information</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Import</span><span style=\"text-align:right\">Recreate advanced approvals</span></div></div>",
   "caption": "Multistage approval: manual and AI stages with conditions, agent flows only. Data: Request for information. Recreate after import.",
   "say": "Back at Contoso, Marta's laptop is approved, and the service manager signed in one stage. Remember the rules. Stages with A I and humans mean a multistage approval, only in agent flows. Manual stages use First to respond or Everyone must approve, never the same approver twice. A I stages return Approve or Reject with a rationale. Conditions route, approve, reject, or skip. A piece of data means Request for information. Recreate advanced approvals after import. Next, monitor agent flows and their cost."
  }
 ],
 "check": [
  {
   "stem": "What does Run a multistage approval combine?",
   "options": [
    "Only email messages to approvers",
    "Manual stages, AI stages, and conditions",
    "Only manual stages with no conditions",
    "Only Teams chat messages"
   ],
   "answer": 1,
   "explanation": "It combines manual stages, AI stages, and conditions between stages."
  },
  {
   "stem": "What does an AI stage return?",
   "options": [
    "A random number",
    "A PDF file with a summary",
    "Approve or Reject with a rationale",
    "Nothing, it only logs the step"
   ],
   "answer": 2,
   "explanation": "It returns an Approve or Reject decision together with a rationale."
  },
  {
   "stem": "Which channel does Request for information use today?",
   "options": [
    "Teams",
    "SMS",
    "Outlook",
    "WhatsApp"
   ],
   "answer": 2,
   "explanation": "Request for information sends the request through Outlook, inside the same tenant."
  },
  {
   "stem": "What can you not do in manual stages?",
   "options": [
    "Set a title for the stage",
    "Use First to respond to the request",
    "Reuse one approver across stages",
    "Use conditions between stages"
   ],
   "answer": 2,
   "explanation": "You cannot assign the same approver to several manual stages."
  }
 ],
 "reto": {
  "text": "Create a flow with a two-stage Run a multistage approval.\nAdd a condition between the stages.\nAlso try a Request for information with a text field.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-advanced-approvals"
},
{
 "id": "L21",
 "module": 3,
 "title": "Monitor agent flows and their cost",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "1.2d"
 ],
 "theory": {
  "intro": "A flow in production needs monitoring, like the dashboard of a car: it tells you if everything is fine and how much fuel you use. In Copilot Studio that dashboard has tabs, and the fuel is measured in Copilot Credits.",
  "sections": [
   {
    "heading": "The three tabs",
    "body": "Overview shows the flow details (name, description, connections, owners) and the most recent runs; it also lets you turn the flow off or delete it. Activity shows the run history with status and duration. Analytics summarizes activity: number of runs, error rate, and trends.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Tabs of an agent flow</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Overview</span><span style=\"text-align:right\">name, connections, owners</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Activity</span><span style=\"text-align:right\">history, resubmit, cancel</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Analytics</span><span style=\"text-align:right\">metrics summary</span></div></div>"
   },
   {
    "heading": "What you can do in Activity",
    "body": "You select a run to open its details and diagnose it. You can also select several runs to resubmit them or cancel the ones in progress. Analytics can take up to 30 minutes to reflect the runs.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">CreateTicket Activity</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Run 1</span><span style=\"text-align:right\">Succeeded</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Run 2</span><span style=\"text-align:right\">Failed</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Action</span><span style=\"text-align:right\">Resubmit</span></div></div>"
   },
   {
    "heading": "What it costs",
    "body": "Each action in an agent flow consumes capacity: 13 Copilot Credits for every 100 actions. Tests in the designer or in the test chat (test runs) do not consume capacity. Users with a Microsoft 365 Copilot license are not charged when the flow is triggered with When an agent calls the flow."
   },
   {
    "heading": "If capacity runs out",
    "body": "When prepaid capacity runs out, new runs are blocked, the runs already in progress finish normally, and the agent keeps responding in interactions that do not use flows. To avoid interruptions, you can link a pay-as-you-go plan.",
    "visual": "<svg viewBox=\"0 0 360 176\" role=\"img\" aria-label=\"What happens when prepaid capacity runs out\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><text x=\"4\" y=\"14\" stroke=\"none\" style=\"fill:var(--muted)\">What happens when prepaid capacity runs out</text><rect x=\"2\" y=\"22\" width=\"356\" height=\"30\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"14\" y=\"41\" stroke=\"none\" fill=\"currentColor\">New flow runs are blocked</text><rect x=\"2\" y=\"60\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"79\" stroke=\"none\" fill=\"currentColor\">Runs already in progress finish</text><rect x=\"2\" y=\"98\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"117\" stroke=\"none\" fill=\"currentColor\">The agent keeps responding without flows</text><rect x=\"2\" y=\"136\" width=\"356\" height=\"30\" rx=\"6\"/><text x=\"14\" y=\"155\" stroke=\"none\" fill=\"currentColor\">Test runs are not blocked</text></svg>"
   },
   {
    "heading": "Copilot Credits across harnesses",
    "body": "Copilot Credits are the single unit of consumption across all three harnesses, but what counts is different. On the standard harness, credits are metered per event at defined rates, with a set number of credits for each interaction type. On the Microsoft Copilot harness (formerly GitHub Copilot harness), billing is usage-based: LLM tokens, the tools called (including knowledge and MCP), and the harness runtime.\n\nThe timing differs too. Standard and Copilot chat agents accrue credits at runtime only, when a published agent handles interactions. The Microsoft Copilot harness is the only one that bills from build time as well, so authoring, previewing, and evaluating also use credits. The Microsoft 365 Copilot license exception for authenticated users in Microsoft 365 channels does not apply to the Microsoft Copilot harness.\n\nFour things drive consumption on the Microsoft Copilot harness: the model (reasoning models meter premium tokens), the organizational context the agent draws in, the number of tools and actions, and the complexity of the task and orchestration. A Copilot Credits estimator helps you plan from representative scenarios, but treat its results as directional."
   }
  ],
  "steps": [
   "In Copilot Studio, open the Flows list and select your agent flow.",
   "Review Overview: name, connections, owners, and recent runs.",
   "Go to Activity and review the status and duration of each run.",
   "Select a failed run and open its details to see where it failed.",
   "Select the failed runs and use Resubmit to send them again.",
   "Open Analytics to see the number of runs and the error rate.",
   "Estimate the cost: 13 Copilot Credits for every 100 actions run."
  ],
  "example": "The Contoso team notices that some tickets were not created. They open the Activity tab of CreateTicket, open the details of two runs with status Failed, fix the Dataverse connection, and resubmit both. Then they check Analytics to see the error rate. To estimate the cost, they know a flow with 20 actions run 500 times adds up to 10,000 actions, which is about 1,300 Copilot Credits. The tests they did earlier in the designer did not consume capacity.",
  "examTips": [
   "When prepaid capacity runs out: new runs are blocked, running ones finish, and the agent keeps responding in other interactions.",
   "Trap: thinking the agent stops working completely.",
   "Activity = history and resubmit; Overview = flow details; Analytics = metrics.",
   "Only the Microsoft Copilot harness bills Copilot Credits from build time (authoring, previewing, evaluating). Standard and Copilot chat harnesses bill at runtime only.",
   "The Microsoft 365 Copilot license exception does not apply to the Microsoft Copilot harness. Its cost drivers: model, context drawn in, number of tools and actions, task complexity."
  ],
  "glossary": [
   {
    "term": "Activity",
    "def": "Tab with the run history, status, and duration; lets you resubmit or cancel."
   },
   {
    "term": "Analytics",
    "def": "Tab with a summary of runs, error rate, and trends."
   },
   {
    "term": "Copilot Credits",
    "def": "Unit used to measure Copilot Studio capacity consumption."
   },
   {
    "term": "Resubmit",
    "def": "Send runs again, for example the ones that failed."
   }
  ]
 },
 "scenes": [
  {
   "title": "The missing tickets",
   "caption": "Some tickets were never created, and finance asks what the agent flows cost.",
   "say": "Thursday at Contoso. Employees complain that some of their tickets were never created. The I T agent calls a flow named Create ticket, and somewhere it fails. On the same day, finance asks a second question: how much are these agent flows costing us? Two questions, one place to look. By the end of this class you will know where to find the failed runs, how to fix them, and how the bill is counted."
  },
  {
   "title": "The car dashboard",
   "caption": "Monitoring = a dashboard: is everything fine, and how much fuel do you use? Fuel = Copilot Credits.",
   "say": "Here is the picture to keep. A flow in production needs a dashboard, like a car. The dashboard tells you whether everything is running fine, and how much fuel you use. In Copilot Studio that dashboard has three tabs, and the fuel is measured in Copilot Credits, the unit for Copilot Studio capacity. Health on one side, fuel on the other."
  },
  {
   "title": "Three tabs",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three tabs</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Overview</span><span style=\"text-align:right\">Flow details, recent runs, turn off, delete</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Activity</span><span style=\"text-align:right\">Run history, status, duration</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Analytics</span><span style=\"text-align:right\">Runs, error rate, trends</span></div></div>",
   "caption": "Overview = flow details. Activity = run history. Analytics = metrics and trends.",
   "say": "The three tabs each have one job. Overview shows the flow details: name, description, connections and owners, plus the most recent runs. From Overview you can also turn the flow off or delete it. Activity shows the run history, with the status and duration of each run. Analytics summarizes the activity: the number of runs, the error rate, and the trends over time."
  },
  {
   "title": "Activity: diagnose and resubmit",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Activity</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Open a run</span><span style=\"text-align:right\">Diagnose where it failed</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Several runs</span><span style=\"text-align:right\">Resubmit or cancel</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Analytics delay</span><span style=\"text-align:right\">Up to 30 minutes</span></div></div>",
   "caption": "Open a run to diagnose it. Select several to resubmit, or cancel those in progress.",
   "say": "Activity is where you work. Select a run to open its details and see exactly where it failed. You can also select several runs at once to resubmit them, which means sending them again, or to cancel the ones still in progress. One more detail for the exam: Analytics can take up to thirty minutes to reflect new runs, so a missing number there is not always a problem."
  },
  {
   "title": "Decide: where are the failures?",
   "caption": "You need each failed run, its details, and a way to send it again. Which tab?",
   "say": "Your turn. The team wants to see each failed run of Create ticket, open its details, and send the failed runs again after the fix. Which tab do they open? Activity, because it keeps all run details? Overview, because it lists the latest runs? Or Analytics, because it charts the error rate? Decide before I answer. Activity. It holds the full run history, the details of each run, and Resubmit. Analytics only gives the numbers, and Overview only the latest runs."
  },
  {
   "title": "Contoso fixes the flow",
   "caption": "Two Failed runs, a broken Dataverse connection, fixed, resubmitted. Then check Analytics.",
   "say": "Watch Contoso do it. They open the Activity tab of Create ticket. Two runs have the status failed. They open the details, and both stopped at the same step: the Dataverse connection. They fix the connection, select the two failed runs, and resubmit them. The tickets are created. Then they open Analytics to watch the error rate come down over the next half hour."
  },
  {
   "title": "What a flow costs",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Flow cost</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rate</span><span style=\"text-align:right\">13 Copilot Credits per 100 actions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Test runs</span><span style=\"text-align:right\">Free</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">M365 Copilot license + When an agent calls the flow</span><span style=\"text-align:right\">Not charged</span></div></div>",
   "caption": "13 Copilot Credits for every 100 actions. Test runs are free.",
   "say": "Now the fuel. Each action in an agent flow consumes capacity: thirteen Copilot Credits for every hundred actions. Tests in the designer or in the test chat, called test runs, do not consume capacity. And users with a Microsoft three six five Copilot license are not charged when the flow is triggered with the trigger called when an agent calls the flow."
  },
  {
   "title": "Do the math",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Example</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">20 actions × 500 runs</span><span style=\"text-align:right\">10,000 actions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Cost</span><span style=\"text-align:right\">≈ 1,300 Copilot Credits</span></div></div>",
   "caption": "20 actions × 500 runs = 10,000 actions ≈ 1,300 Copilot Credits.",
   "say": "Let us do the math the exam likes. Contoso's flow has twenty actions, and it runs five hundred times. Twenty times five hundred is ten thousand actions. Ten thousand divided by a hundred is a hundred blocks, and each block costs thirteen credits. So about one thousand three hundred Copilot Credits. The tests they ran earlier in the designer added nothing to that number."
  },
  {
   "title": "When the tank is empty",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Capacity runs out</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">New runs</span><span style=\"text-align:right\">Blocked</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Running</span><span style=\"text-align:right\">Finish</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent</span><span style=\"text-align:right\">Keeps answering without flows</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Avoid it</span><span style=\"text-align:right\">Link pay-as-you-go</span></div></div>",
   "caption": "Prepaid capacity runs out: new runs blocked, running ones finish, agent keeps answering elsewhere.",
   "say": "What happens when prepaid capacity runs out? New runs are blocked. The runs already in progress finish normally. And the agent keeps responding in interactions that do not use flows. The agent does not stop working completely, that is the trap. To avoid interruptions, you can link a pay as you go plan, so the flows keep running when the prepaid capacity is gone."
  },
  {
   "title": "Decide: out of capacity",
   "caption": "Prepaid capacity is used up mid-day. What happens to the agent and its flows?",
   "say": "Your turn. In the middle of the day, Contoso's prepaid capacity runs out. What happens? The agent stops answering until capacity is added? All runs in progress are cancelled right away? Or new flow runs are blocked, the agent talks on? Decide before I answer. The third one. Only new flow runs are blocked. The agent keeps talking."
  },
  {
   "title": "One unit, three meters",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">What counts</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Standard</span><span style=\"text-align:right\">Per event, defined rates</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft Copilot harness</span><span style=\"text-align:right\">LLM tokens, tools, runtime</span></div></div>",
   "caption": "Copilot Credits everywhere. Standard: per event. Microsoft Copilot harness: tokens, tools, runtime.",
   "say": "Copilot Credits are the single unit across all three harnesses, but what counts is different. On the standard harness, credits are metered per event, at defined rates for each interaction type. On the Microsoft Copilot harness, formerly the GitHub Copilot harness, billing is usage based: the language model tokens, the tools called, including knowledge and M C P, and the harness runtime itself."
  },
  {
   "title": "When the meter starts",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">When credits accrue</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Standard, Copilot chat</span><span style=\"text-align:right\">Runtime only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft Copilot harness</span><span style=\"text-align:right\">Also build time</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">M365 Copilot license exception</span><span style=\"text-align:right\">Not on Microsoft Copilot harness</span></div></div>",
   "caption": "Standard and Copilot chat: runtime only. Microsoft Copilot harness: also build time.",
   "say": "The timing differs too. Standard and Copilot chat agents accrue credits at runtime only, when a published agent handles interactions. The Microsoft Copilot harness is the only one that bills from build time as well. So authoring, previewing and evaluating also use credits. And the Microsoft three six five Copilot license exception for authenticated users does not apply to the Microsoft Copilot harness."
  },
  {
   "title": "Decide: the preview bill",
   "caption": "Credits were used while makers only built and previewed, nothing published. Which harness?",
   "say": "Your turn. Contoso's makers spent a week authoring and previewing a new agent. Nothing was published yet, but Copilot Credits were consumed. Which harness is the agent on? The standard harness for agents? The Microsoft Copilot harness? Or the Copilot chat harness? Decide before I answer. The Microsoft Copilot harness. It is the only one that bills from build time, so authoring, previewing and evaluating use credits. The other two bill at runtime only."
  },
  {
   "title": "Four cost drivers",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Cost drivers</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Model</span><span style=\"text-align:right\">Reasoning models use premium tokens</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Context</span><span style=\"text-align:right\">Organizational context drawn in</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tools</span><span style=\"text-align:right\">Number of tools and actions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Complexity</span><span style=\"text-align:right\">Task and orchestration</span></div></div>",
   "caption": "Model, context drawn in, number of tools and actions, task complexity. Estimator = directional.",
   "say": "On the Microsoft Copilot harness, four things drive consumption. The model, because reasoning models meter premium tokens. The organizational context the agent draws in. The number of tools and actions. And the complexity of the task and orchestration. A Copilot Credits estimator helps you plan from representative scenarios, but treat its results as directional, a compass, not a quote."
  },
  {
   "title": "The steps",
   "caption": "Flows list · Overview · Activity · failed run details · Resubmit · Analytics · estimate.",
   "say": "Here are the steps. In Copilot Studio, open the flows list and select your agent flow. Review Overview: name, connections, owners and recent runs. Go to Activity and review the status and duration of each run. Select a failed run and open its details. Select the failed runs and use Resubmit. Open Analytics for the number of runs and the error rate. Then estimate the cost at thirteen credits per hundred actions."
  },
  {
   "title": "Dashboard read",
   "caption": "Activity found and resubmitted the failures. Credits counted: 13 per 100 actions.",
   "say": "Back to Contoso. The missing tickets were found in Activity, fixed at the connection, and resubmitted. Finance got its number: about one thousand three hundred credits for five hundred runs. Remember for the exam: Activity is history and resubmit, an empty tank blocks only new runs, test runs are free, and only the Microsoft Copilot harness bills from build time."
  }
 ],
 "check": [
  {
   "stem": "Which tab shows the run history with status and duration?",
   "options": [
    "Analytics",
    "Designer",
    "Activity",
    "Overview"
   ],
   "answer": 2,
   "explanation": "Activity shows the run history, its status, and its duration."
  },
  {
   "stem": "How many Copilot Credits do 100 agent flow actions consume?",
   "options": [
    "5",
    "100",
    "13",
    "1"
   ],
   "answer": 2,
   "explanation": "Every 100 agent flow actions consume 13 Copilot Credits."
  },
  {
   "stem": "Do tests done in the designer consume capacity?",
   "options": [
    "No, test runs do not consume capacity",
    "Only when used in Teams",
    "Yes, it counts double",
    "Only in the production environment"
   ],
   "answer": 0,
   "explanation": "Test runs, in the designer or in the test chat, do not consume capacity."
  },
  {
   "stem": "Prepaid capacity runs out. What happens to the agent?",
   "options": [
    "It keeps responding in interactions without flows",
    "It switches to another channel",
    "It stops working for every user",
    "It is deleted from the environment"
   ],
   "answer": 0,
   "explanation": "New flow runs are blocked, but the agent keeps responding in other interactions."
  }
 ],
 "reto": {
  "text": "Run your flow three times, one of them with an error.\nOpen Activity and review the status and duration of each run.\nResubmit the failed run and compare.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-manage-monitor"
}
);
