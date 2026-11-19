// AB-620 course, modules 4-7, English. Built by tools/en/assemble.mjs.
window.AB620_COURSE = window.AB620_COURSE || [];
window.AB620_COURSE.push(
{
 "id": "L22",
 "module": 4,
 "title": "Copilot connectors vs Power Platform connectors",
 "level": "intermediate",
 "minutes": 9,
 "skills": [
  "2.1a",
  "2.1b"
 ],
 "theory": {
  "intro": "Your agent needs to know things about your company, and there are two families of connectors to give it that knowledge. Think of a library and a phone call: in the library, someone copied the books into a catalog so you can search them fast; on the phone call, you ask the data owner right then. Each one serves a different purpose.",
  "sections": [
   {
    "heading": "Copilot connectors: index first, then answer",
    "body": "A Copilot connector copies (indexes) the content of an external system into Microsoft Graph. It respects the permissions of the source, or ACL, so each person only sees what they could already see. It gives semantic indexing and citations.\n\nThe tenant admin sets it up, and it is reused in Copilot and in Microsoft Search. This model is called index-then-answer: first you index, then you answer.",
    "visual": "<svg viewBox=\"0 0 340 130\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"6\" width=\"160\" height=\"50\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"82\" y=\"28\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Copilot connectors</text><text x=\"82\" y=\"42\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">index in Graph</text><rect x=\"178\" y=\"6\" width=\"160\" height=\"50\" rx=\"6\"/><text x=\"258\" y=\"28\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Power Platform</text><text x=\"258\" y=\"42\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">live query</text><text x=\"82\" y=\"76\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Stable content</text><text x=\"258\" y=\"76\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Data by the minute</text><text x=\"82\" y=\"94\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">ACL + citations</text><text x=\"258\" y=\"94\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">no data copied</text><text x=\"170\" y=\"120\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Set up by the admin / the maker</text></svg>"
   },
   {
    "heading": "Power Platform connectors: ask live",
    "body": "In real-time knowledge mode (preview), each question runs against the source system with the identity of the user. The data is not copied or moved.\n\nOnly metadata is indexed, such as table and column names, so the agent knows what it can ask."
   },
   {
    "heading": "Which one do I choose",
    "body": "If the content hardly changes, like manuals or policies, use Copilot connectors. If the data changes every minute and should not be replicated, like an inventory, use Power Platform connectors.\n\nThere is also a mixed mode, which uses each family where it fits.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Where each type of knowledge goes</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Manuals and policies</span><span style=\"text-align:right\">Copilot connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Inventory by the minute</span><span style=\"text-align:right\">Power Platform connector, real-time</span></div></div>"
   },
   {
    "heading": "A detail when publishing",
    "body": "When you publish the agent to channels and it uses Copilot connectors, authentication needs the ExternalItem.Read.All scope. It is a practical detail that the exam likes to ask about."
   }
  ],
  "steps": [
   "Open your agent in Copilot Studio and go to the Knowledge tab.",
   "Select Add knowledge and look at the list of available connectors.",
   "Ask yourself if the source changes little (manuals) or every minute (inventory).",
   "If it is stable and you want citations, choose a Copilot connector (the tenant admin enables it).",
   "If you need the data by the minute, choose a Power Platform connector with real-time knowledge (preview).",
   "When publishing to channels with Copilot connectors, add the ExternalItem.Read.All scope in authentication."
  ],
  "example": "Contoso has two sources. The product manuals and the HR policies hardly change: they index them with a Copilot connector, so the agent answers with citations. The warehouse inventory changes every minute and must not be copied: they use a Power Platform connector with real-time knowledge, and each query goes to the system with the identity of the person asking. The agent combines both in mixed mode.",
  "examTips": [
   "Data by the minute without replicating it: real-time knowledge (Power Platform connectors).",
   "Citations and semantic indexing of stable content: Copilot connectors.",
   "Trap: forgetting the ExternalItem.Read.All scope when publishing to channels."
  ],
  "glossary": [
   {
    "term": "ACL",
    "def": "List of permissions in the source system; it defines who can see each item."
   },
   {
    "term": "Microsoft Graph",
    "def": "Microsoft layer where Copilot connectors store the indexed content."
   },
   {
    "term": "Index-then-answer",
    "def": "The content is indexed first and then used to answer."
   },
   {
    "term": "Real-time knowledge",
    "def": "Live query to the source system, with the identity of the user (preview)."
   }
  ]
 },
 "scenes": [
  {
   "title": "Two kinds of questions",
   "caption": "Nexo must answer about stable HR policies and about an inventory that changes every minute.",
   "say": "Monday at Contoso. Marta asks Nexo two kinds of questions. What does this H R policy say? And how many units of a product are in the warehouse right now? Valeria, the developer, has to give Nexo both answers. The policies hardly change. The inventory changes every minute. By the end of this class you will know which family of connectors serves each question, and why."
  },
  {
   "title": "A library and a phone call",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two families</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot connectors</span><span style=\"text-align:right\">The library: a catalog searched fast</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Power Platform connectors</span><span style=\"text-align:right\">The phone call: ask the owner right then</span></div></div>",
   "caption": "Two connector families: a library catalog searched fast, or a phone call to the data owner right then.",
   "say": "Here is the picture to keep. Two families of connectors give an agent knowledge about your company. Think of a library and a phone call. In the library, someone copied the books into a catalog, so you can search them fast. On the phone call, you ask the data owner right then. Each one serves a different purpose, and the exam checks that you know which is which."
  },
  {
   "title": "Copilot connectors: index first",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Copilot connectors</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">How</span><span style=\"text-align:right\">Index content into Microsoft Graph</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Permissions</span><span style=\"text-align:right\">Respects the source ACL</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Gives</span><span style=\"text-align:right\">Semantic indexing and citations</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Set up by</span><span style=\"text-align:right\">Tenant admin, reused in Copilot and Microsoft Search</span></div></div>",
   "caption": "Copilot connector: indexes content into Microsoft Graph, keeps source permissions (ACL), gives citations. Set up by the tenant admin.",
   "say": "First family: Copilot connectors. A Copilot connector copies, or indexes, the content of an external system into Microsoft Graph. It respects the permissions of the source, called the A C L, so each person only sees what they could already see. It gives semantic indexing and citations. The tenant admin sets it up, and it is reused in Copilot and in Microsoft Search. This model is called index then answer."
  },
  {
   "title": "Power Platform connectors: ask live",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Power Platform connectors</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Real-time knowledge</span><span style=\"text-align:right\">Preview</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Each question</span><span style=\"text-align:right\">Live to the source, with the user's identity</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Data</span><span style=\"text-align:right\">Not copied or moved</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Indexed</span><span style=\"text-align:right\">Only metadata: table and column names</span></div></div>",
   "caption": "Real-time knowledge (preview): each question goes live to the source with the user's identity. Only metadata is indexed.",
   "say": "Second family: Power Platform connectors. In real-time knowledge mode, which is in preview, each question runs against the source system with the identity of the user. The data is not copied or moved. Only metadata is indexed, such as table and column names, so the agent knows what it can ask. That is the phone call: Nexo dials the system at the moment Marta asks."
  },
  {
   "title": "Decide: the live inventory",
   "caption": "The inventory changes every minute and must not be copied. Which connector does Nexo get?",
   "say": "Your turn. Contoso's warehouse inventory changes every minute. The data owner does not want the stock copied. Which option should Valeria give Nexo? A Copilot connector that indexes the stock? A Power Platform connector in real-time mode? Or a Copilot connector shared with Microsoft Search? Decide before I answer. A Power Platform connector in real-time mode. Each question goes live to the system with the identity of the user, and nothing is copied. A Copilot connector indexes the stock into Microsoft Graph, the copy the owner refused."
  },
  {
   "title": "Which one do I choose",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Which one</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stable: manuals, policies</span><span style=\"text-align:right\">Copilot connectors</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">By the minute, not replicated</span><span style=\"text-align:right\">Power Platform connectors</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Both</span><span style=\"text-align:right\">Mixed mode</span></div></div>",
   "caption": "Stable content like manuals and policies: Copilot connectors. Data by the minute, not replicated: Power Platform connectors.",
   "say": "So how do you choose? Ask one question about the source: does it change little, or every minute? If the content hardly changes, like manuals or policies, use Copilot connectors. If the data changes every minute and should not be replicated, like an inventory, use Power Platform connectors. And you do not have to pick only one. There is also a mixed mode, which uses each family where it fits."
  },
  {
   "title": "Contoso uses both",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Manuals, HR policies</span><span style=\"text-align:right\">Copilot connector, citations</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Warehouse inventory</span><span style=\"text-align:right\">Power Platform, real-time</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Nexo</span><span style=\"text-align:right\">Mixed mode</span></div></div>",
   "caption": "Manuals and HR policies: Copilot connector with citations. Inventory: real-time Power Platform connector. Both together: mixed mode.",
   "say": "Watch Contoso do it. The product manuals and the H R policies hardly change, so they are indexed with a Copilot connector, and Nexo answers with citations. The warehouse inventory changes every minute and must not be copied, so Valeria uses a Power Platform connector with real-time knowledge. Each query goes to the system with the identity of the person asking. Nexo combines both in mixed mode."
  },
  {
   "title": "Decide: the policy answers",
   "caption": "HR policy answers need citations, and each employee sees only what they could already see. Which option?",
   "say": "Your turn. Marta asks about H R policies. The manager wants citations, and each employee sees only what they could already see. Which option fits these policies? A Copilot connector set up by the admin? A Power Platform connector asked live? Or indexing only the table and column names? Decide before I answer. A Copilot connector, set up by the tenant admin. It indexes the policies, respects the A C L, and gives citations. A live query is meant for data that changes every minute, not stable policies."
  },
  {
   "title": "A detail when publishing",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Publishing to channels</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">With Copilot connectors</span><span style=\"text-align:right\">Scope ExternalItem.Read.All</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Authentication</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Exam trap</span><span style=\"text-align:right\">Forgetting the scope</span></div></div>",
   "caption": "Publishing to channels with Copilot connectors: authentication needs the ExternalItem.Read.All scope.",
   "say": "One practical detail, and the exam likes to ask about it. Valeria is ready to publish Nexo to channels. Because Nexo uses Copilot connectors, authentication needs one scope: External Item dot Read dot All. Valeria adds it in authentication before she publishes. The trap on the exam is simply forgetting this scope. Remember why it is there: the Copilot connectors, not the real-time Power Platform connectors."
  },
  {
   "title": "Decide: the missing scope",
   "caption": "Nexo uses a Copilot connector and is published to channels. What does authentication need?",
   "say": "Your turn. Valeria publishes Nexo to channels. Nexo uses a Copilot connector for the manuals and the H R policies. What does authentication need? The identity of each user, asked live? A scope for the Power Platform connector? Or the External Item Read All scope? Decide before I answer. The External Item dot Read dot All scope. Publishing to channels with Copilot connectors needs that scope in authentication. The Power Platform connector is not the reason for it, and forgetting this scope is the trap the exam sets."
  },
  {
   "title": "The steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge tab</span><span style=\"text-align:right\">Add knowledge</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stable + citations</span><span style=\"text-align:right\">Copilot connector (admin enables)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">By the minute</span><span style=\"text-align:right\">Power Platform connector, real-time</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Publish to channels</span><span style=\"text-align:right\">ExternalItem.Read.All</span></div></div>",
   "caption": "Knowledge tab · Add knowledge · stable or by the minute? · Copilot or Power Platform connector · scope when publishing.",
   "say": "Here are the steps. Open your agent in Copilot Studio and go to the Knowledge tab. Select Add knowledge and look at the list of available connectors. Ask yourself if the source changes little or every minute. If it is stable and you want citations, choose a Copilot connector, which the tenant admin enables. If you need the data by the minute, choose a Power Platform connector with real-time knowledge. When publishing to channels with Copilot connectors, add the External Item dot Read dot All scope in authentication."
  },
  {
   "title": "Catalog and call, together",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stable + citations</span><span style=\"text-align:right\">Copilot connectors</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">By the minute, no copy</span><span style=\"text-align:right\">Power Platform, real-time</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Publishing</span><span style=\"text-align:right\">ExternalItem.Read.All</span></div></div>",
   "caption": "Stable + citations: Copilot connectors. By the minute, no copy: real-time Power Platform. Publishing: ExternalItem.Read.All.",
   "say": "Back to Contoso. Marta asks about an H R policy, and Nexo answers from the index, with a citation. She asks about the stock, and Nexo makes the live call with her identity. Remember for the exam: stable content with citations, Copilot connectors. Data by the minute without copying it, real-time knowledge with Power Platform connectors. And the External Item dot Read dot All scope when you publish. Next, Azure A I Search as knowledge."
  }
 ],
 "check": [
  {
   "stem": "What does a Copilot connector do with external content?",
   "options": [
    "It deletes it at the source",
    "It queries the source live",
    "It indexes it in Microsoft Graph, respecting permissions",
    "It turns each item into a topic"
   ],
   "answer": 2,
   "explanation": "Copilot connectors index the content in Microsoft Graph and respect the ACLs of the source."
  },
  {
   "stem": "Contoso needs inventory by the minute without copying data. What does it use?",
   "options": [
    "A file uploaded to the Knowledge tab",
    "Real-time Power Platform connectors",
    "Copilot connectors with indexed copies",
    "A topic with fixed inventory messages"
   ],
   "answer": 1,
   "explanation": "Real-time knowledge queries the system on every question, without replicating data."
  },
  {
   "stem": "Which scope is needed when publishing an agent with Copilot connectors to channels?",
   "options": [
    "Mail.Send",
    "User.Read.All",
    "ExternalItem.Read.All",
    "Files.ReadWrite"
   ],
   "answer": 2,
   "explanation": "Authentication needs the ExternalItem.Read.All scope."
  },
  {
   "stem": "In real-time knowledge, what is indexed?",
   "options": [
    "All records and their values",
    "Nothing",
    "The user emails and attachments",
    "Only table and column metadata"
   ],
   "answer": 3,
   "explanation": "Only metadata is indexed; the data is queried live."
  }
 ],
 "reto": {
  "text": "Open Knowledge, Add knowledge, and review the available connectors.\nWrite down one stable source and one that changes every minute in your work.\nDecide which connector family you would use for each one.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-graph-vs-power-platform-connectors"
},
{
 "id": "L23",
 "module": 4,
 "title": "Azure AI Search as knowledge",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "2.1c",
  "2.4a"
 ],
 "theory": {
  "intro": "Azure AI Search is an Azure service that stores your documents in an index, something like the index of a book but much smarter. You can connect that index to your agent so it answers with your own documents. It is like giving the agent its own tidy filing cabinet, instead of asking it to guess.",
  "sections": [
   {
    "heading": "What Copilot Studio supports",
    "body": "Copilot Studio supports vectorized indexes with integrated vectorization (the Import and vectorize data option in Azure). The same embeddings model that vectorized your data also vectorizes the user question when the agent answers.\n\nIt also supports the semantic ranker, a ranking improvement. But note: that ranker is configured first in Azure, not in Copilot Studio.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Documents</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Vector</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">index</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Knowledge</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Answer</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">One connection, one vector index</text></svg>"
   },
   {
    "heading": "How to connect it",
    "body": "You add it from Add knowledge, in the Featured section, or from the Properties of a Generative answers node. The connection accepts four authentication types: Access Key, Client Certificate Auth, Service principal, and Microsoft Entra ID Integrated.\n\nYou can only add one vector index per connection. The status goes from In progress to Ready."
   },
   {
    "heading": "Citations",
    "body": "For answers to have citations, the index must include a field with the real address (URL) of the document. If metadata_storage_path exists, it is used as the citation. If not, Copilot Studio uses whichever field holds a complete URL. Also, users need access to the cited documents.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Add knowledge</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Featured</span><span style=\"text-align:right\">Azure AI Search</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">Service principal</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Status</span><span style=\"text-align:right\">In progress, then Ready</span></div></div>"
   },
   {
    "heading": "What does NOT go here",
    "body": "If you need Azure OpenAI on your data, it is not added as a knowledge source. You use the Classic data option of the Generative answers node.\n\nIf your service uses a private endpoint, you need Virtual Network support in Power Platform."
   },
   {
    "heading": "Always use Create new connection",
    "body": "Add Azure AI Search only through Create new connection. If you type the endpoint and key by hand in the knowledge form, it creates a faulty connection at the environment level. That can stop every agent in the environment from adding Azure AI Search. There is no way to delete it in the product. To recover, reset the agent's external access or delete and recreate the affected agent.\n\nFor authentication, Microsoft Entra ID Integrated is the recommended type: it uses the signed-in user's identity, so there is no key to rotate. Access Key suits a quick setup in a non-production environment."
   }
  ],
  "steps": [
   "In Azure, create the Azure AI Search service and the index (with Import and vectorize data).",
   "If you want the semantic ranker, configure it in Azure first.",
   "In Copilot Studio, open the agent and go to Knowledge.",
   "Select Add knowledge, Featured section, and choose Azure AI Search.",
   "Create the connection and pick the authentication type.",
   "Select the vector index (only one per connection).",
   "Wait for the status to go from In progress to Ready."
  ],
  "example": "Contoso has thousands of technical manuals. They index them in Azure AI Search with Import and vectorize data and add a field with the URL of each manual. In Copilot Studio they connect them from Add knowledge, Featured, with Service principal. When a technician asks how to replace a part, the agent answers with a citation to the right manual. Later, for Azure OpenAI on their data, they use Classic data in the node.",
  "examTips": [
   "Azure OpenAI on your data: it goes in Classic data of the node, not in knowledge sources.",
   "The semantic ranker is configured in Azure; it is not created from Copilot Studio.",
   "Only one vector index per connection; the final status is Ready.",
   "Never type the endpoint and key by hand: always use Create new connection. Microsoft Entra ID Integrated is the recommended authentication."
  ],
  "glossary": [
   {
    "term": "Embeddings",
    "def": "Numeric representation of the meaning of a text, used to search by meaning."
   },
   {
    "term": "Integrated vectorization",
    "def": "Azure vectorizes the data when importing it, and the query with the same model."
   },
   {
    "term": "Semantic ranker",
    "def": "Azure AI Search improvement that reorders results by meaning."
   },
   {
    "term": "Generative answers node",
    "def": "Node that answers with AI using knowledge sources."
   },
   {
    "term": "Microsoft Entra ID Integrated",
    "def": "The recommended Azure AI Search authentication. It uses the signed-in user's identity, so there is no key to rotate."
   }
  ]
 },
 "scenes": [
  {
   "title": "A filing cabinet for Nexo",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Azure AI Search</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">Azure service that stores documents in an index</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">For the agent</span><span style=\"text-align:right\">Answers with your own documents</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Picture</span><span style=\"text-align:right\">A tidy filing cabinet</span></div></div>",
   "caption": "Contoso has thousands of technical manuals. Azure AI Search stores them in an index so Nexo answers with them.",
   "say": "Monday at Contoso. The company has thousands of technical manuals, and Marta, a technician, asks Nexo how to replace a part. Valeria, the developer, does not want Nexo to guess. So she uses Azure A I Search, an Azure service that stores documents in an index, like the index of a book but much smarter. Connected to the agent, that index lets Nexo answer with Contoso's own documents. Think of it as a tidy filing cabinet."
  },
  {
   "title": "Filed by meaning",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Filed by meaning</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Supported</span><span style=\"text-align:right\">Vectorized indexes, integrated vectorization</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">In Azure</span><span style=\"text-align:right\">Import and vectorize data</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Embeddings</span><span style=\"text-align:right\">Numeric meaning of a text</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">The question</span><span style=\"text-align:right\">Same embeddings model</span></div></div>",
   "caption": "Integrated vectorization (Import and vectorize data). The same embeddings model vectorizes the documents and the user question.",
   "say": "How is the cabinet sorted? Copilot Studio supports vectorized indexes with integrated vectorization. In Azure, that is the Import and vectorize data option. Embeddings are a numeric representation of the meaning of a text, so documents are filed by meaning, not only by words. Here is the key detail. The same embeddings model that vectorized your data also vectorizes the user question when the agent answers. Question and documents are measured with the same ruler."
  },
  {
   "title": "The semantic ranker",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Semantic ranker</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Does</span><span style=\"text-align:right\">Reorders results by meaning</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Configured</span><span style=\"text-align:right\">In Azure first</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot Studio</span><span style=\"text-align:right\">Supports it, never creates it</span></div></div>",
   "caption": "The semantic ranker reorders results by meaning. Copilot Studio supports it, but it is configured first in Azure.",
   "say": "One more improvement. Copilot Studio also supports the semantic ranker. It is an Azure A I Search improvement that reorders the results by meaning, so the best document comes first. But notice where it lives. The semantic ranker is configured first in Azure, not in Copilot Studio. Valeria configures it in the Azure service before she touches the agent. Copilot Studio supports it, but never creates it."
  },
  {
   "title": "Decide: the ranker",
   "caption": "Valeria wants results reordered by meaning with the semantic ranker. Where does she configure it first?",
   "say": "Your turn. Valeria wants Nexo's search results reordered by meaning. She plans to use the semantic ranker. Where does she configure it first? In the Copilot Studio knowledge settings? In the Generative answers node settings? Or in the search service, first in Azure? Decide before I answer. In the search service, first in Azure. The semantic ranker is an Azure A I Search improvement, and Copilot Studio only supports it. The trap is the Copilot Studio knowledge settings, because the ranker is never created from Copilot Studio."
  },
  {
   "title": "Connecting the cabinet",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Connecting</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Add knowledge, Featured, or Generative answers node</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">Access Key, Client Certificate Auth, Service principal, Microsoft Entra ID Integrated</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Recommended</span><span style=\"text-align:right\">Microsoft Entra ID Integrated: no key to rotate</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Access Key</span><span style=\"text-align:right\">Quick setup, non-production</span></div></div>",
   "caption": "Add from Add knowledge, Featured, or a Generative answers node. Four authentication types; Microsoft Entra ID Integrated is recommended.",
   "say": "Now Valeria connects the cabinet to Nexo. She uses Add knowledge, in the Featured section, or the Properties of a Generative answers node. There are four authentication types: Access Key, Client Certificate Auth, Service principal, and Microsoft Entra I D Integrated. The recommended one is Microsoft Entra I D Integrated. It uses the signed in user's identity, so there is no key to rotate. Access Key suits a quick setup in a non production environment."
  },
  {
   "title": "Always Create new connection",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Always Create new connection</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Endpoint + key by hand</span><span style=\"text-align:right\">Faulty environment-level connection</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Effect</span><span style=\"text-align:right\">Every agent can be blocked</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Delete it</span><span style=\"text-align:right\">Not possible in the product</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Recover</span><span style=\"text-align:right\">Reset external access, or recreate the agent</span></div></div>",
   "caption": "Typing the endpoint and key by hand creates a faulty environment-level connection. Always use Create new connection.",
   "say": "Here is the trap that hurts most. Always add Azure A I Search through Create new connection. If you type the endpoint and key by hand in the knowledge form, it creates a faulty connection at the environment level. That can stop every agent in the environment from adding Azure A I Search, and there is no way to delete it in the product. To recover, reset the agent's external access, or delete and recreate the affected agent."
  },
  {
   "title": "Decide: the shortcut",
   "caption": "Valeria has the endpoint and key on a note and is in a hurry. How should she add Azure AI Search?",
   "say": "Your turn. Valeria is in a hurry. She has the endpoint and key on a note. How should she add Azure A I Search to Nexo? Through Create new connection, as always? By typing the endpoint and key in the form? Or by sharing the key with every user first? Decide before I answer. Through Create new connection, as always. Typing them by hand creates a faulty connection at the environment level. It can block every agent there, with no way to delete it in the product."
  },
  {
   "title": "One index, and citations",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Index and citations</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Per connection</span><span style=\"text-align:right\">Only one vector index</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Status</span><span style=\"text-align:right\">In progress, then Ready</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Citation</span><span style=\"text-align:right\">metadata_storage_path, or a field with a full URL</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Users</span><span style=\"text-align:right\">Need access to the cited documents</span></div></div>",
   "caption": "One vector index per connection, status In progress then Ready. Citations need a field with the document's real URL.",
   "say": "The connection is ready to use, and Valeria picks the manuals index. Only one vector index per connection, and the status goes from In progress to Ready. Now, citations. For answers to have citations, the index must include a field with the real address, the U R L, of each document. If metadata storage path exists, it is used as the citation. If not, Copilot Studio uses whichever field holds a complete U R L. Users also need access to the cited documents."
  },
  {
   "title": "What does not go here",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Not here</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Azure OpenAI on your data</span><span style=\"text-align:right\">Classic data in the Generative answers node</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Private endpoint</span><span style=\"text-align:right\">Virtual Network support in Power Platform</span></div></div>",
   "caption": "Azure OpenAI on your data is not a knowledge source: use Classic data in the node. Private endpoint: Virtual Network support.",
   "say": "Two things do not go in this cabinet. First, if you need Azure Open A I on your data, it is not added as a knowledge source. You use the Classic data option of the Generative answers node. Second, if your search service uses a private endpoint, you need Virtual Network support in Power Platform. Keep both exceptions in mind, because the exam likes to place them next to Azure A I Search."
  },
  {
   "title": "Decide: your own data",
   "caption": "Contoso also wants Azure OpenAI on their data. Where does it go in Copilot Studio?",
   "say": "Your turn. Contoso also wants Azure Open A I on their data. Valeria opens Nexo again. Where does Azure Open A I on your data go? In Add knowledge, next to the search index? In the Classic data option of the node? Or in a second vector index on the connection? Decide before I answer. In the Classic data option of the node. It is not added as a knowledge source, so it never goes in Add knowledge. And a second index fails too, because each connection takes only one."
  },
  {
   "title": "The steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Azure</span><span style=\"text-align:right\">Service + index (Import and vectorize data)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Semantic ranker</span><span style=\"text-align:right\">Configure in Azure first</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot Studio</span><span style=\"text-align:right\">Knowledge, Add knowledge, Featured, Azure AI Search</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connection</span><span style=\"text-align:right\">Create it, pick authentication</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Index</span><span style=\"text-align:right\">One vector index, wait for Ready</span></div></div>",
   "caption": "Azure: service, index, ranker. Copilot Studio: Knowledge, Add knowledge, Featured, Azure AI Search, connection, one vector index, Ready.",
   "say": "Here are the steps. In Azure, create the Azure A I Search service and the index, with Import and vectorize data. If you want the semantic ranker, configure it in Azure first. In Copilot Studio, open the agent and go to Knowledge. Select Add knowledge, the Featured section, and choose Azure A I Search. Create the connection and pick the authentication type. Select the vector index, only one per connection. Wait for the status to go from In progress to Ready."
  },
  {
   "title": "The cabinet at work",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Semantic ranker</span><span style=\"text-align:right\">Configured in Azure</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connection</span><span style=\"text-align:right\">Create new connection, never by hand</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Per connection</span><span style=\"text-align:right\">One vector index, final status Ready</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Azure OpenAI on your data</span><span style=\"text-align:right\">Classic data</span></div></div>",
   "caption": "Ranker in Azure. Create new connection, never endpoint and key by hand. One vector index, Ready. Azure OpenAI on your data: Classic data.",
   "say": "Back to Contoso. Marta asks how to replace a part, and Nexo answers from the manuals index, with a citation to the right manual. Remember for the exam. The semantic ranker is configured in Azure. Always use Create new connection, never the endpoint and key by hand. Only one vector index per connection, and the final status is Ready. Azure Open A I on your data goes in Classic data. Next, a custom connector as a tool."
  }
 ],
 "check": [
  {
   "stem": "Where is the semantic ranker configured?",
   "options": [
    "In Copilot Studio",
    "In the Question node",
    "In Azure first",
    "In the Teams channel"
   ],
   "answer": 2,
   "explanation": "The semantic ranker is configured in Azure first."
  },
  {
   "stem": "How many vector indexes can you add per connection?",
   "options": [
    "One",
    "Five",
    "As many as you want",
    "Two"
   ],
   "answer": 0,
   "explanation": "You can only add one vector index per connection."
  },
  {
   "stem": "What does the index need for citations to appear?",
   "options": [
    "A new topic for each document type",
    "A field with the document URL",
    "A flow to copy the files",
    "A Secret holding the storage key"
   ],
   "answer": 1,
   "explanation": "A field with the real address of the document; metadata_storage_path works as the citation."
  },
  {
   "stem": "Where does Azure OpenAI on your data go?",
   "options": [
    "In Classic data of the node",
    "In Environment variables",
    "In Add knowledge, Featured",
    "In Pipelines and deployments"
   ],
   "answer": 0,
   "explanation": "It is not a knowledge source: you use Classic data of the node."
  }
 ],
 "reto": {
  "text": "Create an Azure AI Search service on the free tier.\nImport and vectorize a test document.\nAdd the index as knowledge and check that it reaches Ready.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
},
{
 "id": "L24",
 "module": 4,
 "title": "Custom connector as a tool",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "2.2c"
 ],
 "theory": {
  "intro": "A custom connector turns your own API into a tool that Power Apps, Power Automate, and your agent can use. It is like making a custom adapter for an odd plug: once it is made, any device can use it. You describe the API once and reuse it many times.",
  "sections": [
   {
    "heading": "How it is built",
    "body": "You create it in Power Apps or Power Automate. You can start from an OpenAPI file (Swagger 2.0), a Postman collection, or from scratch (blank).\n\nAuthentication can be No auth, Basic, API key, or OAuth 2.0. You can also add policy templates and C# code.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">OpenAPI</text><text x=\"35.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">or Postman</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Custom</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">connector</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Connection</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agent</text><text x=\"302.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">tool</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Add a tool, Custom connector</text></svg>"
   },
   {
    "heading": "How it reaches the agent",
    "body": "In Copilot Studio you add it with Add a tool, Custom connector. First you create a connection, which stores the credentials used to run the connector.\n\nIf you want to move it between environments inside a solution, you use connection references: they point to the connection in each environment."
   },
   {
    "heading": "Governance (DLP)",
    "body": "Power Platform data policies also govern custom connectors. They can classify them by URL pattern. An administrator can then allow or block your API.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Custom connector</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Name</span><span style=\"text-align:right\">Inventory API</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">API key</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">In the agent</span><span style=\"text-align:right\">Add a tool, Custom connector</span></div></div>"
   },
   {
    "heading": "When it makes sense",
    "body": "If an internal API is already described in OpenAPI and used by Power Apps and Flows, the custom connector is the natural path, because it is reused everywhere."
   }
  ],
  "steps": [
   "Gather the OpenAPI file (Swagger 2.0) of the API, or a Postman collection.",
   "In Power Apps or Power Automate, create a custom connector from that file (or from scratch).",
   "Choose the authentication: No auth, Basic, API key, or OAuth 2.0.",
   "Test the operations of the connector.",
   "Create a connection with your credentials.",
   "In Copilot Studio, open the agent and select Add a tool, Custom connector.",
   "If you will move it between environments, use a solution and connection references."
  ],
  "example": "Contoso has an internal inventory API with its Swagger file. An administrator creates the Inventory API connector in Power Apps, chooses API key, and creates a connection. Then the agent adds it with Add a tool, Custom connector. Because their flows also use it, they do not repeat work. To move it from Dev to Test they use a solution with connection references, and the security team classifies it in the data policy by URL pattern.",
  "examTips": [
   "Internal API already in OpenAPI and reusable by Power Apps and Flows: custom connector.",
   "Trap: forgetting that DLP also governs custom connectors.",
   "Sources: OpenAPI (Swagger 2.0), Postman, or blank; auth No auth, Basic, API key, OAuth 2.0."
  ],
  "glossary": [
   {
    "term": "OpenAPI / Swagger",
    "def": "Standard file that describes the operations of an API."
   },
   {
    "term": "Connection",
    "def": "Saved credentials used to run a connector."
   },
   {
    "term": "Connection reference",
    "def": "Pointer to a connection that lets you move solutions between environments."
   },
   {
    "term": "DLP / data policy",
    "def": "Administrator rule that decides which connectors can be used together."
   }
  ]
 },
 "scenes": [
  {
   "title": "An adapter for an odd plug",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Custom connector</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">Turns your own API into a tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Used by</span><span style=\"text-align:right\">Power Apps, Power Automate, the agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Picture</span><span style=\"text-align:right\">A custom adapter for an odd plug</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Idea</span><span style=\"text-align:right\">Describe once, reuse many times</span></div></div>",
   "caption": "Contoso has an internal inventory API with its Swagger file. A custom connector turns it into a tool everyone can reuse.",
   "say": "Tuesday at Contoso. Marta asks Nexo how many parts are left in stock. The answer lives in Contoso's internal inventory A P I, and that A P I has an odd plug that Nexo cannot use. Valeria, the developer, has a plan. She will build a custom connector. It is like making a custom adapter for an odd plug. Once it is made, Power Apps, Power Automate, and the agent can all use it. You describe the A P I once and reuse it many times."
  },
  {
   "title": "Three ways to start",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Three ways to start</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Power Apps or Power Automate</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">OpenAPI</span><span style=\"text-align:right\">Swagger 2.0 file</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Postman</span><span style=\"text-align:right\">Postman collection</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Blank</span><span style=\"text-align:right\">From scratch</span></div></div>",
   "caption": "Create it in Power Apps or Power Automate, from an OpenAPI file (Swagger 2.0), a Postman collection, or from scratch.",
   "say": "Where is the adapter made? You create a custom connector in Power Apps or in Power Automate. There are three ways to start. The first is an Open A P I file, also called Swagger two point zero. It is a standard file that describes the operations of an A P I. The second is a Postman collection. The third is from scratch, a blank connector. Contoso already has the Swagger file of the inventory A P I, so Valeria starts from it."
  },
  {
   "title": "Choosing the lock",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Authentication</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Options</span><span style=\"text-align:right\">No auth, Basic, API key, OAuth 2.0</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Contoso</span><span style=\"text-align:right\">API key</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Extras</span><span style=\"text-align:right\">Policy templates, C# code</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Before use</span><span style=\"text-align:right\">Test the operations</span></div></div>",
   "caption": "Authentication: No auth, Basic, API key, or OAuth 2.0. You can add policy templates and C# code, then test the operations.",
   "say": "Next, the lock on the adapter. The connector needs an authentication type. There are four options: no authentication, Basic, A P I key, or OAuth two point zero. For the inventory A P I, Valeria chooses A P I key. If she needs more, she can also add policy templates and code written in C sharp. Before anyone uses it, she tests the operations of the connector. The adapter now fits the plug."
  },
  {
   "title": "Decide: the starting file",
   "caption": "A partner team has no Swagger file, only a Postman collection for their API. How can they start their custom connector?",
   "say": "Your turn. A partner team has a second A P I. They have no Swagger file, only a Postman collection. How can they start their custom connector? Only after they write a Swagger file first? From the Postman collection they have? Or only from scratch, typing every operation? Decide before I answer. From the Postman collection they have. A Postman collection is one of the three ways to start. The trap is writing a Swagger file first, because Open A P I is not the only way in."
  },
  {
   "title": "Plugging it into Nexo",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Reaching the agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connection</span><span style=\"text-align:right\">Stores the credentials</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot Studio</span><span style=\"text-align:right\">Add a tool, Custom connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connector</span><span style=\"text-align:right\">Describes the API</span></div></div>",
   "caption": "First create a connection, which stores the credentials. Then in Copilot Studio: Add a tool, Custom connector.",
   "say": "Now the adapter must reach Nexo. First, Valeria creates a connection. A connection stores the credentials used to run the connector, like a saved key on a key ring. Then she opens the agent in Copilot Studio. She selects Add a tool, and then Custom connector. The Inventory A P I appears as a tool, and Nexo can call it. Remember the order. The connector describes the A P I, and the connection holds the key."
  },
  {
   "title": "From Dev to Test",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Between environments</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Package</span><span style=\"text-align:right\">A solution</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connection reference</span><span style=\"text-align:right\">Points to the connection in each environment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Contoso</span><span style=\"text-align:right\">Dev to Test</span></div></div>",
   "caption": "To move the connector between environments inside a solution, use connection references. They point to the connection in each environment.",
   "say": "Next week the agent must move from Dev to Test. Each environment has its own connection, with its own key. So Valeria puts the connector inside a solution and uses connection references. A connection reference is a pointer to a connection. In Dev, it points to the Dev connection. In Test, it points to the Test connection. The solution moves between environments, and each label finds the right key in its new home."
  },
  {
   "title": "Decide: the move",
   "caption": "Valeria moves the solution with the connector from Dev to Test. What lets it find the right connection in each environment?",
   "say": "Your turn. Valeria moves the solution with the connector from Dev to Test. Each environment keeps its own connection. What lets the connector find the right connection in each environment? The same connection, shared by both? A new key typed into the agent each time? Or connection references in the solution? Decide before I answer. Connection references in the solution. A connection reference points to the connection in each environment. The trap is sharing one connection, because each environment has its own connection and the reference finds it."
  },
  {
   "title": "The security gate",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Governance (DLP)</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Data policies</span><span style=\"text-align:right\">Also govern custom connectors</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Classify</span><span style=\"text-align:right\">By URL pattern</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Administrator</span><span style=\"text-align:right\">Allows or blocks your API</span></div></div>",
   "caption": "Power Platform data policies (DLP) also govern custom connectors. They can classify them by URL pattern; an administrator allows or blocks them.",
   "say": "Watch out for governance. Power Platform data policies, also called D L P, govern custom connectors too. A data policy is an administrator rule that decides which connectors can be used together. It can classify a custom connector by its U R L pattern, the web address of the A P I. Then an administrator can allow or block your A P I. At Contoso, the security team classifies the Inventory A P I connector by its U R L pattern."
  },
  {
   "title": "When it makes sense",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">When it makes sense</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Internal API</span><span style=\"text-align:right\">Already described in OpenAPI</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Also used by</span><span style=\"text-align:right\">Power Apps and flows</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Why</span><span style=\"text-align:right\">Reused everywhere, no repeated work</span></div></div>",
   "caption": "An internal API already described in OpenAPI and used by Power Apps and flows: the custom connector is the natural path.",
   "say": "When is a custom connector the right choice? When an internal A P I is already described in Open A P I, and Power Apps and flows also use it. That is exactly Contoso's case. The same Inventory A P I connector serves the stock app, the reorder flow, and Nexo. Because it is reused everywhere, nobody repeats the work. One adapter, many devices."
  },
  {
   "title": "Decide: the policy",
   "caption": "The security team asks whether the data policy covers the new Inventory API custom connector. What should Valeria answer?",
   "say": "Your turn. The security team is reviewing Contoso's data policy. They ask Valeria about the new Inventory A P I connector. What should she answer? Yes, data policies cover it too? No, custom connectors are exempt? Or only when it runs inside a flow? Decide before I answer. Yes, data policies cover it too. Power Platform data policies also govern custom connectors, and can classify them by U R L pattern. The trap is thinking custom connectors are exempt, which is the mistake the exam expects."
  },
  {
   "title": "The steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Gather</span><span style=\"text-align:right\">OpenAPI (Swagger 2.0) or Postman collection</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Create</span><span style=\"text-align:right\">Custom connector in Power Apps or Power Automate</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">No auth, Basic, API key, OAuth 2.0</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Test, then connect</span><span style=\"text-align:right\">Test operations, create a connection</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent</span><span style=\"text-align:right\">Add a tool, Custom connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Move</span><span style=\"text-align:right\">Solution + connection references</span></div></div>",
   "caption": "Swagger file, create the connector, authentication, test, connection, Add a tool, Custom connector. Moving: solution and connection references.",
   "say": "Here are the steps. Gather the Open A P I file of the A P I, or a Postman collection. In Power Apps or Power Automate, create a custom connector from that file, or from scratch. Choose the authentication: no authentication, Basic, A P I key, or OAuth two point zero. Test the operations of the connector. Create a connection with your credentials. In Copilot Studio, open the agent and select Add a tool, Custom connector. To move it between environments, use a solution and connection references."
  },
  {
   "title": "The adapter at work",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Sources</span><span style=\"text-align:right\">OpenAPI, Postman, or blank</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Internal API in OpenAPI, reused</span><span style=\"text-align:right\">Custom connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Move environments</span><span style=\"text-align:right\">Connection references</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trap</span><span style=\"text-align:right\">DLP governs custom connectors too</span></div></div>",
   "caption": "Sources: OpenAPI, Postman, blank. Add a tool, Custom connector. Connection references to move. Data policies govern custom connectors too.",
   "say": "Back to Contoso. Marta asks how many parts are left, and Nexo answers from the Inventory A P I. Remember for the exam. A custom connector starts from Open A P I, a Postman collection, or a blank connector. An internal A P I already in Open A P I and reused by apps and flows means custom connector. Use connection references to move between environments. And data policies govern custom connectors too. Next, the REST A P I tool."
  }
 ],
 "check": [
  {
   "stem": "What can you create a custom connector from?",
   "options": [
    "Only from a Dataverse table with rows",
    "Only from Azure AI Search",
    "Only from a shared email message",
    "From OpenAPI, a Postman collection, or from scratch"
   ],
   "answer": 3,
   "explanation": "You create it from OpenAPI (Swagger 2.0), Postman, or blank."
  },
  {
   "stem": "What do you use to move the connector between environments in a solution?",
   "options": [
    "A topic that calls the connector",
    "The solution publisher record",
    "A channel in Microsoft Teams",
    "Connection references"
   ],
   "answer": 3,
   "explanation": "Connection references point to the connection in each environment."
  },
  {
   "stem": "Do data policies (DLP) apply to custom connectors?",
   "options": [
    "Yes, even by URL pattern",
    "No, custom connectors are exempt",
    "Only when published to Teams channels",
    "Only if they are Basic"
   ],
   "answer": 0,
   "explanation": "DLP also governs custom connectors and can classify them by URL."
  },
  {
   "stem": "How do you add it to the agent?",
   "options": [
    "Agents, Add agent, then Publish",
    "Add a tool, Custom connector",
    "Monitor, Evaluate",
    "Settings, Advanced, Connections"
   ],
   "answer": 1,
   "explanation": "You add it with Add a tool, Custom connector."
  }
 ],
 "reto": {
  "text": "Download or write a Swagger file with two operations.\nCreate a custom connector and test it.\nAdd it to your agent with Add a tool.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
},
{
 "id": "L25",
 "module": 4,
 "title": "REST API tool",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "2.2d"
 ],
 "theory": {
  "intro": "The REST API tool is the quick way to give your agent access to an API: you upload its description and choose what it can do. It is like handing the agent a restaurant menu and crossing out the dishes you do not want it to order. The agent will only use what you leave selected.",
  "sections": [
   {
    "heading": "Upload the specification",
    "body": "In Tools, New tool, REST API, you upload an OpenAPI specification in JSON version 2. If your specification is version 3, it is translated to version 2 automatically.\n\nThen you improve the description, because the orchestrator uses it to decide when to call the tool, and you choose a solution (or one is created for you).",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">New tool, REST API</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Spec</span><span style=\"text-align:right\">OpenAPI JSON v2 (v3 is translated)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">None, API key, OAuth 2.0</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Operations</span><span style=\"text-align:right\">only the ones you choose</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Solution</span><span style=\"text-align:right\">chosen or created</span></div></div>"
   },
   {
    "heading": "Choose operations",
    "body": "You select only the operations the agent can use, for example create and get but not delete. You give each one a name and a description.\n\nThe descriptions of inputs and outputs must be complete, because the orchestrator uses them to understand what data to send and what it gets back."
   },
   {
    "heading": "Authentication",
    "body": "There are three options: None, API key, and OAuth 2.0. With an API key, you define the parameter label, the name, and the location (Header or Query). The user provides the key at run time.\n\nWith OAuth 2.0, you enter the client ID, the secret, the authorization and token URLs, and the scope.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Operations of the orders service</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Create order</span><span style=\"text-align:right\">Selected</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Get order</span><span style=\"text-align:right\">Selected</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Delete order</span><span style=\"text-align:right\">Not selected</span></div></div>"
   },
   {
    "heading": "REST API or custom connector",
    "body": "REST API is more direct for a single API. A custom connector (L24) is better if you want to reuse it in Power Apps and Flows, with more options such as policy templates."
   }
  ],
  "steps": [
   "Open your agent and go to Tools.",
   "Select Add a tool, then New tool, REST API.",
   "Upload the OpenAPI specification in JSON (v2; a v3 is translated).",
   "Improve the name and the description of the tool.",
   "Choose the solution (or let one be created).",
   "Set the authentication: None, API key, or OAuth 2.0.",
   "Select only the allowed operations and complete their input and output descriptions."
  ],
  "example": "Contoso exposes its orders API with three operations: create order, get order, and delete order. The team uploads the specification and selects only create and get. They use an API key and define the label, the name, and the Header location; each user provides their own key at run time. They fill in the input and output descriptions carefully. This way the agent can help with orders, but it never offers or tries to delete them.",
  "examTips": [
   "To limit what the agent can do with an API: select operations.",
   "Trap: uploading a spec without descriptions. The orchestrator uses them to decide when to call.",
   "Format: OpenAPI JSON v2 (v3 is translated). Auth: None, API key, OAuth 2.0."
  ],
  "glossary": [
   {
    "term": "Operation",
    "def": "A specific action of the API, such as creating or getting an order."
   },
   {
    "term": "Orchestrator",
    "def": "The agent engine that decides which tool to use and when."
   },
   {
    "term": "API key",
    "def": "A secret key that identifies whoever calls the API."
   },
   {
    "term": "Solution",
    "def": "A container that groups components so you can move them between environments."
   }
  ]
 },
 "scenes": [
  {
   "title": "A menu with a pen",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">REST API tool</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">Quick way to give the agent an API</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Picture</span><span style=\"text-align:right\">A menu with dishes crossed out</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Contoso</span><span style=\"text-align:right\">Orders API: create, get, delete</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rule</span><span style=\"text-align:right\">The agent uses only what is selected</span></div></div>",
   "caption": "Contoso's orders API has three operations. The REST API tool is like a menu where you cross out the dishes the agent must not order.",
   "say": "Monday at Contoso. Marta asks Nexo to check her order, and then to place a new one. The answers live in Contoso's orders A P I, which has three operations: create order, get order, and delete order. Valeria, the developer, picks the quick way in: the REST A P I tool. It is like handing the agent a restaurant menu and crossing out the dishes you do not want it to order. Nexo will only use what she leaves selected."
  },
  {
   "title": "Upload the specification",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Upload the specification</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Tools, Add a tool, New tool, REST API</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Format</span><span style=\"text-align:right\">OpenAPI, JSON version 2</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Version 3</span><span style=\"text-align:right\">Translated to version 2 automatically</span></div></div>",
   "caption": "Tools, Add a tool, New tool, REST API. Upload an OpenAPI specification in JSON version 2; a version 3 is translated automatically.",
   "say": "First, the menu itself. In Copilot Studio, Valeria opens the agent and goes to Tools. She selects Add a tool, then New tool, REST A P I. She uploads an Open A P I specification in JSON, version two. The specification describes the operations of the A P I, like a menu lists its dishes. What if the file is version three? It is translated to version two automatically, so she does not convert it herself."
  },
  {
   "title": "Description and solution",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Description and solution</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Improve</span><span style=\"text-align:right\">Name and description of the tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Orchestrator</span><span style=\"text-align:right\">Decides which tool to use and when</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Solution</span><span style=\"text-align:right\">Chosen, or one is created</span></div></div>",
   "caption": "Improve the tool's name and description: the orchestrator uses it to decide when to call the tool. Then choose a solution, or one is created.",
   "say": "Next, the description of the tool. Valeria improves the name and the description, because the orchestrator reads it. The orchestrator is the agent engine that decides which tool to use and when. A vague description is like a menu with no dish names. Then she chooses a solution, a container that groups components so you can move them between environments. If she does not choose one, a solution is created for her."
  },
  {
   "title": "Decide: the version three file",
   "caption": "A partner team's specification is OpenAPI version 3. What happens when they upload it to the REST API tool?",
   "say": "Your turn. A partner team wants the same quick tool. Their file is Open A P I version three. What happens when they upload it? It is rejected, so they must convert it by hand? It is translated to version two automatically? Or it stays as version three inside the tool? Decide before I answer. It is translated to version two automatically. A version three file converts to version two by itself. The trap is converting it by hand, because nobody needs to rewrite the file."
  },
  {
   "title": "Cross out the dishes",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Choose operations</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Operation</span><span style=\"text-align:right\">One specific action of the API</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Selected</span><span style=\"text-align:right\">Create order, Get order</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not selected</span><span style=\"text-align:right\">Delete order</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Each one</span><span style=\"text-align:right\">A name and a description</span></div></div>",
   "caption": "Select only the operations the agent can use, for example create and get but not delete. Give each one a name and a description.",
   "say": "Now the crossing out. The orders A P I offers three operations: create order, get order, and delete order. An operation is one specific action of the A P I. Valeria selects only create and get, and leaves delete unselected. She gives each selected operation a name and a description. Delete is crossed out on the menu, so Nexo can help with orders, but it never offers or tries to delete them."
  },
  {
   "title": "What goes in, what comes out",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Inputs and outputs</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Must be</span><span style=\"text-align:right\">Complete descriptions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Inputs</span><span style=\"text-align:right\">What data to send</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Outputs</span><span style=\"text-align:right\">What it gets back</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Used by</span><span style=\"text-align:right\">The orchestrator</span></div></div>",
   "caption": "Input and output descriptions must be complete: the orchestrator uses them to know what data to send and what it gets back.",
   "say": "Each selected operation also needs complete descriptions of its inputs and outputs. The orchestrator uses them to understand what data to send and what it gets back. For create order, Valeria describes what the order needs and what comes back. For get order, she describes which order to look up and what the answer contains. A dish with no ingredients listed is hard to order well."
  },
  {
   "title": "Decide: no deleting",
   "caption": "Nexo must help with orders but never delete one. How should Valeria limit what Nexo can do with the orders API?",
   "say": "Your turn. The service manager is worried about the orders. Nexo must help with them, but never delete one. How should Valeria limit what Nexo can do? Ask Nexo in the instructions not to delete? Remove the delete words from the description? Or select only the create and get operations? Decide before I answer. Select only the create and get operations. The agent only uses the operations that are selected. The trap is relying on instructions, because selecting operations is the real limit."
  },
  {
   "title": "The lock on the door",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Authentication</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Options</span><span style=\"text-align:right\">None, API key, OAuth 2.0</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">API key</span><span style=\"text-align:right\">Label, name, location (Header or Query)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who gives the key</span><span style=\"text-align:right\">The user, at run time</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">OAuth 2.0</span><span style=\"text-align:right\">Client ID, secret, authorization and token URLs, scope</span></div></div>",
   "caption": "Authentication: None, API key, or OAuth 2.0. An API key has a label, a name and a location, Header or Query; the user provides it.",
   "say": "Next, the lock. The REST A P I tool has three authentication options: none, A P I key, and O Auth two point zero. With an A P I key, Valeria defines the parameter label, the name, and the location, either header or query. The user provides the key at run time. With O Auth two point zero, you enter the client I D, the secret, the authorization and token addresses, and the scope. Contoso uses a key in the header."
  },
  {
   "title": "Menu or connector",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">REST API or custom connector</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">REST API tool</span><span style=\"text-align:right\">More direct for a single API</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Custom connector</span><span style=\"text-align:right\">Reuse in Power Apps and flows</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connector extras</span><span style=\"text-align:right\">Policy templates</span></div></div>",
   "caption": "REST API is more direct for a single API. A custom connector is better to reuse it in Power Apps and flows, with policy templates.",
   "say": "Why not a custom connector, like in the last lesson? The REST A P I tool is more direct for a single A P I. A custom connector is better if you want to reuse the A P I in Power Apps and flows. It also brings more options, such as policy templates. Contoso only needs the orders A P I inside Nexo, so the quick menu is enough."
  },
  {
   "title": "Decide: the silent tool",
   "caption": "A colleague uploads a specification and leaves every description empty. Now the agent never seems to call the tool. What is the likely cause?",
   "say": "Your turn. A colleague uploads a specification in a hurry and leaves every description empty. Now Nexo never seems to call the new tool. What is the most likely cause? The orchestrator has no descriptions? The upload needed a version three file? Or the tool needs a separate solution? Decide before I answer. The orchestrator has no descriptions. It uses them to decide when to call the tool. The trap is the file version, because a version three file is translated anyway."
  },
  {
   "title": "The steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Start</span><span style=\"text-align:right\">Tools, Add a tool, New tool, REST API</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Upload</span><span style=\"text-align:right\">OpenAPI JSON v2 (v3 is translated)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Describe</span><span style=\"text-align:right\">Improve name and description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Solution</span><span style=\"text-align:right\">Choose, or let one be created</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">None, API key, OAuth 2.0</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Operations</span><span style=\"text-align:right\">Only the allowed ones, full input and output descriptions</span></div></div>",
   "caption": "Tools, Add a tool, New tool, REST API. Upload the spec, improve the description, choose a solution, set authentication, select operations.",
   "say": "Here are the steps. Open your agent and go to Tools. Select Add a tool, then New tool, REST A P I. Upload the Open A P I specification in JSON, version two, or a version three that is translated. Improve the name and the description of the tool. Choose the solution, or let one be created. Set the authentication: none, A P I key, or O Auth two point zero. Select only the allowed operations, and complete their input and output descriptions."
  },
  {
   "title": "The menu at work",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Format</span><span style=\"text-align:right\">OpenAPI JSON v2, v3 translated</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">None, API key, OAuth 2.0</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Limit the agent</span><span style=\"text-align:right\">Select operations</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trap</span><span style=\"text-align:right\">A spec without descriptions</span></div></div>",
   "caption": "OpenAPI JSON v2, v3 translated. None, API key, OAuth 2.0. Limit the agent: select operations. Never upload a spec without descriptions.",
   "say": "Back to Contoso. Marta asks about her order, and Nexo gets it and places a new one, but never offers to delete. Remember for the exam. The format is Open A P I in JSON, version two, and a version three is translated. Authentication is none, A P I key, or O Auth two point zero. To limit what the agent can do, select operations. And never upload a specification without descriptions. Next, computer use."
  }
 ],
 "check": [
  {
   "stem": "Which OpenAPI format does the REST API tool accept?",
   "options": [
    "Only CSV spreadsheet tables",
    "JSON, OpenAPI version 2",
    "Only Word documents from Office",
    "Only XML files, any version"
   ],
   "answer": 1,
   "explanation": "It accepts JSON v2; a v3 is translated to v2 automatically."
  },
  {
   "stem": "How do you stop the agent from deleting orders?",
   "options": [
    "By using Exact match on order IDs",
    "By turning off the internet",
    "By changing the publisher",
    "By selecting only the allowed operations"
   ],
   "answer": 3,
   "explanation": "You limit the scope by choosing only the operations the agent can use."
  },
  {
   "stem": "Where can an API key go?",
   "options": [
    "Only in the agent name",
    "Header or Query",
    "Only in an email",
    "Only in the topic"
   ],
   "answer": 1,
   "explanation": "With an API key you define the location: Header or Query."
  },
  {
   "stem": "When is a custom connector a better choice than the REST API tool?",
   "options": [
    "When you also want to reuse the API in Power Apps and Flows",
    "When the specification is in OpenAPI version 3, which the REST API tool rejects",
    "When the agent must be blocked from calling the delete operations of the API",
    "When the API requires no authentication at all, since the tool cannot handle it"
   ],
   "answer": 0,
   "explanation": "The REST API tool is more direct for a single API. A custom connector is better when you also want to reuse it in Power Apps and Flows, with more options such as policy templates."
  }
 ],
 "reto": {
  "text": "Take a public API with OpenAPI and create a REST API tool.\nSelect just one read operation.\nTest that the agent calls it and does not offer the others.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api"
},
{
 "id": "L26",
 "module": 4,
 "title": "Computer use",
 "level": "intermediate",
 "minutes": 11,
 "skills": [
  "2.2a"
 ],
 "theory": {
  "intro": "Computer use lets the agent work with a screen the way a person would: it looks, moves the mouse, and types. It is like hiring an assistant who sits at the computer when the system has no API. It works for websites or Windows desktop applications that only have a screen.",
  "sections": [
   {
    "heading": "What it is and what it needs",
    "body": "Computer use operates websites and Windows desktop applications using vision and reasoning. It requires generative orchestration.\n\nWhen you set it up, you enter a name, a description, a model, instructions, and the machine. The instructions must include full URLs and explicit steps.",
    "visual": "<svg viewBox=\"0 0 340 174\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"105\" y=\"6\" width=\"130\" height=\"38\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"170\" y=\"29\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"600\">Computer use</text><rect x=\"2\" y=\"96\" width=\"101\" height=\"46\" rx=\"6\"/><text x=\"52.5\" y=\"109\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Hosted</text><text x=\"52.5\" y=\"123\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">browser</text><text x=\"52.5\" y=\"137\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(preview)</text><line x1=\"170\" y1=\"46\" x2=\"52.5\" y2=\"94\" style=\"stroke:var(--muted)\"/><polygon points=\"52.5,94 59.5,94.1 57.4,89.0\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"119\" y=\"96\" width=\"101\" height=\"46\" rx=\"6\"/><text x=\"169.5\" y=\"109\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Cloud PC</text><text x=\"169.5\" y=\"123\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">pool</text><text x=\"169.5\" y=\"137\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(preview)</text><line x1=\"170\" y1=\"46\" x2=\"169.5\" y2=\"94\" style=\"stroke:var(--muted)\"/><polygon points=\"169.5,94 172.3,87.6 166.8,87.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"236\" y=\"96\" width=\"101\" height=\"46\" rx=\"6\"/><text x=\"286.5\" y=\"116\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Your machine</text><text x=\"286.5\" y=\"130\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(BYO)</text><line x1=\"170\" y1=\"46\" x2=\"286.5\" y2=\"94\" style=\"stroke:var(--muted)\"/><polygon points=\"286.5,94 281.6,89.0 279.5,94.1\" fill=\"currentColor\" stroke=\"none\"/><text x=\"170\" y=\"162\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Where it runs</text></svg>"
   },
   {
    "heading": "Where it runs",
    "body": "There are three places. Hosted browser (preview): meant for experimenting, with no Entra join and no desktop applications of your own. Cloud PC pool (preview): machines joined to Entra and Intune. Bring-your-own-machine: your own machine with Power Automate for desktop.\n\nFor production, you do not choose the Hosted browser."
   },
   {
    "heading": "Computer use or RPA?",
    "body": "Before you choose Computer use, also check RPA, which means Power Automate desktop flows. RPA is better when the screen is stable and the rules are simple. Computer use is better when screens change often, when decisions depend on what is shown on the screen, or when the automation must correct itself from what it sees.\n\nFor production, computer use needs a bring-your-own machine registered in Power Automate. Microsoft-hosted options (Hosted browser, Cloud PC pool) are in preview, so use them for prototyping only."
   },
   {
    "heading": "Credentials and security",
    "body": "The maker's credentials (the maker is the person who built the agent) are risky if the agent is shared. It is better to use stored credentials (internal storage or Azure Key Vault) or the end user's credentials.\n\nHuman supervision sends an Outlook email to a reviewer when it detects potentially harmful instructions. Access control blocks actions, not the opening of sites.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Computer use: web invoice</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Model</span><span style=\"text-align:right\">OpenAI CUA</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">Full URL and explicit steps</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Credentials</span><span style=\"text-align:right\">Stored, Azure Key Vault</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Human supervision</span><span style=\"text-align:right\">Outlook email</span></div></div>"
   },
   {
    "heading": "Cost",
    "body": "Each step costs 5 Copilot Credits with standard models and 15 with premium models. It is not included in the Microsoft 365 Copilot license (USL)."
   }
  ],
  "steps": [
   "Make sure the agent uses generative orchestration.",
   "In the agent, open Tools and add the Computer use tool.",
   "Write a clear name and description.",
   "Choose the model (for example, the OpenAI CUA one).",
   "Write the instructions with full URLs and explicit steps.",
   "Choose where it runs: Hosted browser, Cloud PC pool, or your own machine.",
   "Decide the credentials: stored credentials or the end user's.",
   "Turn on Human supervision if there is risk, and review the access control."
  ],
  "example": "Contoso has a supplier invoice portal that offers no API. They create a Computer use tool with these instructions: open the full URL, sign in, download this month's invoice, and save the total. They use stored credentials in Azure Key Vault instead of the maker's credentials, and they turn on Human supervision. They also work out the cost: each step uses 5 Copilot Credits. For production they use their own machine registered in Power Automate, because the Hosted browser and Cloud PC pools are still in preview.",
  "examTips": [
   "Cost: 5 Copilot Credits per step (standard), 15 with premium; not included in the Microsoft 365 Copilot USL.",
   "Trap: choosing Hosted browser for production. It is for experimenting, with no Entra join.",
   "Access control blocks actions, not the opening of the site.",
   "Stable screen and simple rules: RPA (Power Automate desktop). Screens that change, decisions from what is on screen, or self-correction: Computer use."
  ],
  "glossary": [
   {
    "term": "Computer use",
    "def": "A tool that operates Windows screens using vision and reasoning."
   },
   {
    "term": "Stored credentials",
    "def": "Credentials saved securely, in internal storage or Azure Key Vault."
   },
   {
    "term": "Human supervision",
    "def": "An Outlook alert to a reviewer when instructions look potentially harmful."
   },
   {
    "term": "Cloud PC pool",
    "def": "A set of cloud PCs joined to Entra and Intune."
   },
   {
    "term": "RPA",
    "def": "Robotic Process Automation: a Power Automate desktop flow that repeats fixed steps on a stable screen."
   }
  ]
 },
 "scenes": [
  {
   "title": "An assistant at the desk",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Computer use</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">The agent looks, moves the mouse, and types</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Picture</span><span style=\"text-align:right\">An assistant who sits at the computer</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">When</span><span style=\"text-align:right\">Websites or Windows apps with only a screen</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Contoso</span><span style=\"text-align:right\">Supplier invoice portal, no API</span></div></div>",
   "caption": "Contoso's supplier invoice portal has no API, only a screen. Computer use is like hiring an assistant who sits at the computer.",
   "say": "Monday at Contoso. Marta needs this month's invoice from a supplier portal. But the portal offers no A P I, only a screen. Valeria, the developer, reaches for Computer use. It is like hiring an assistant who sits at the computer: Nexo looks at the screen, moves the mouse, and types. It works for websites and for Windows desktop applications that only have a screen."
  },
  {
   "title": "The job sheet",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Setting it up</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Requires</span><span style=\"text-align:right\">Generative orchestration</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Works by</span><span style=\"text-align:right\">Vision and reasoning</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fields</span><span style=\"text-align:right\">Name, description, model, instructions, machine</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Model</span><span style=\"text-align:right\">For example OpenAI CUA</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">Full URLs and explicit steps</span></div></div>",
   "caption": "Computer use needs generative orchestration. Set a name, a description, a model, instructions with full URLs and explicit steps, and the machine.",
   "say": "First, what it needs. Computer use operates the screen with vision and reasoning, and it requires generative orchestration. In the agent, Valeria opens Tools and adds the Computer use tool. Then she fills in the job sheet: a name, a description, a model such as Open A I C U A, the instructions, and the machine. The instructions must include full web addresses and explicit steps. Hers say: open the full address, sign in, download this month's invoice, and save the total."
  },
  {
   "title": "Three desks",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Where it runs</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Hosted browser</span><span style=\"text-align:right\">Preview, for experimenting, no Entra join</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Cloud PC pool</span><span style=\"text-align:right\">Preview, joined to Entra and Intune</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Your own machine</span><span style=\"text-align:right\">Power Automate for desktop</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Production</span><span style=\"text-align:right\">Your own machine registered in Power Automate</span></div></div>",
   "caption": "Hosted browser and Cloud PC pool are in preview, for prototyping only. For production, use your own machine registered in Power Automate.",
   "say": "Next, where Nexo sits. There are three desks. The Hosted browser, in preview, is for experimenting: no Entra join, and no desktop applications of your own. The Cloud P C pool, also in preview, uses machines joined to Entra and Intune. The third desk is your own machine, with Power Automate for desktop. Both Microsoft hosted options are in preview, so they are for prototyping only. For production, you need your own machine registered in Power Automate."
  },
  {
   "title": "Decide: the production desk",
   "caption": "The invoice job worked on the Hosted browser. Now it must run for real every month. Where should Nexo run in production?",
   "say": "Your turn. The service manager wants the invoice job running for real. Valeria tested it on the Hosted browser, and it worked. Where should Nexo run in production? On the Hosted browser that already worked? On a Cloud P C pool joined to Entra and Intune? Or on their own machine in Power Automate? Decide before I answer. On their own machine, registered in Power Automate. Microsoft hosted options are in preview, for prototyping only. The trap is the Hosted browser, which is only for experimenting."
  },
  {
   "title": "Computer use or RPA?",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Computer use or RPA</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">RPA</span><span style=\"text-align:right\">Power Automate desktop flows</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">RPA fits</span><span style=\"text-align:right\">Stable screen, simple rules</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Computer use fits</span><span style=\"text-align:right\">Changing screens, on-screen decisions, self-correction</span></div></div>",
   "caption": "RPA, Power Automate desktop flows, fits stable screens and simple rules. Computer use fits changing screens, on-screen decisions and self-correction.",
   "say": "Before choosing Computer use, Valeria also checks R P A, which means Power Automate desktop flows. R P A is like a player piano: it repeats fixed steps on a stable screen. It is better when the screen is stable and the rules are simple. Computer use is better when screens change often, when decisions depend on what is shown, or when the automation must correct itself from what it sees. The supplier portal changes its layout often, so Contoso keeps Computer use."
  },
  {
   "title": "Whose keys?",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Credentials</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Maker's credentials</span><span style=\"text-align:right\">Risky if the agent is shared</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stored credentials</span><span style=\"text-align:right\">Internal storage or Azure Key Vault</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Or</span><span style=\"text-align:right\">The end user's credentials</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Contoso</span><span style=\"text-align:right\">Stored in Azure Key Vault</span></div></div>",
   "caption": "The maker's credentials are risky if the agent is shared. Prefer stored credentials, in internal storage or Azure Key Vault, or the end user's.",
   "say": "Now, the keys to the portal. Nexo must sign in, but with whose credentials? The maker is the person who built the agent, and the maker's credentials are risky if the agent is shared. It is like lending your own house key to every visitor. It is better to use stored credentials, kept in internal storage or Azure Key Vault, or the end user's own credentials. Contoso keeps the portal sign in as stored credentials in Azure Key Vault."
  },
  {
   "title": "Decide: the stable screen",
   "caption": "Another team copies data into an old desktop application whose screen never changes, with simple rules. Which option fits best?",
   "say": "Your turn. Another team copies data into an old desktop application every day. The screen never changes, and the rules are simple. Which option fits best? A Power Automate desktop flow? Computer use on a Cloud P C pool? Or Computer use on their own machine? Decide before I answer. A Power Automate desktop flow, which is R P A. R P A is better when the screen is stable and the rules are simple. The trap is Computer use, which fits screens that change often."
  },
  {
   "title": "The supervisor's window",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Supervision and access</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Human supervision</span><span style=\"text-align:right\">Outlook email to a reviewer</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">When</span><span style=\"text-align:right\">Potentially harmful instructions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Access control</span><span style=\"text-align:right\">Blocks actions, not the opening of sites</span></div></div>",
   "caption": "Human supervision emails a reviewer in Outlook when it detects potentially harmful instructions. Access control blocks actions, not the opening of sites.",
   "say": "Next, supervision. Human supervision sends an Outlook email to a reviewer when it detects potentially harmful instructions. Think of a supervisor behind a glass window who gets a note before anything risky goes ahead. Contoso turns it on. There is also access control, and here is a detail to remember: access control blocks actions, not the opening of sites. Nexo can still open a page, but a blocked action stays blocked."
  },
  {
   "title": "The meter",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Cost per step</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Standard models</span><span style=\"text-align:right\">5 Copilot Credits</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Premium models</span><span style=\"text-align:right\">15 Copilot Credits</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft 365 Copilot license</span><span style=\"text-align:right\">Not included</span></div></div>",
   "caption": "Each step costs five Copilot Credits with standard models and fifteen with premium. It is not included in the Microsoft 365 Copilot license.",
   "say": "Now, the bill. Every step Nexo takes on the screen has a price, like a taxi meter that ticks with each move. Each step costs five Copilot Credits with standard models, and fifteen with premium models. And it is not included in the Microsoft three six five Copilot license. Valeria works out the cost of the invoice job before the service manager signs off: every step uses five Copilot Credits."
  },
  {
   "title": "Decide: the budget",
   "caption": "Marta's team has Microsoft 365 Copilot licenses. The invoice job uses a standard model. What does each step of Computer use cost?",
   "say": "Your turn. Marta's team has Microsoft three six five Copilot licenses. The service manager asks Valeria to budget the invoice job, which uses a standard model. What does each step of Computer use cost? Fifteen Copilot Credits per step? Five Copilot Credits per step? Or nothing, the license covers it? Decide before I answer. Five Copilot Credits per step. Fifteen is the price with premium models, not standard ones. The trap is the license, because Computer use is not included in the Microsoft three six five Copilot license."
  },
  {
   "title": "The steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Start</span><span style=\"text-align:right\">Generative orchestration on</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Add</span><span style=\"text-align:right\">Tools, Computer use tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Describe</span><span style=\"text-align:right\">Clear name and description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Model</span><span style=\"text-align:right\">For example OpenAI CUA</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">Full URLs, explicit steps</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Machine</span><span style=\"text-align:right\">Hosted browser, Cloud PC pool, or your own</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Credentials</span><span style=\"text-align:right\">Stored or the end user's</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Safety</span><span style=\"text-align:right\">Human supervision, access control</span></div></div>",
   "caption": "Generative orchestration, Tools, add Computer use, name and description, model, instructions, machine, credentials, Human supervision and access control.",
   "say": "Here are the steps. Make sure the agent uses generative orchestration. In the agent, open Tools and add the Computer use tool. Write a clear name and description. Choose the model, for example Open A I C U A. Write the instructions with full web addresses and explicit steps. Choose where it runs: Hosted browser, Cloud P C pool, or your own machine. Decide the credentials: stored, or the end user's. Turn on Human supervision if there is risk, and review the access control."
  },
  {
   "title": "The assistant at work",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Cost</span><span style=\"text-align:right\">5 credits per step, 15 premium, not in the license</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trap</span><span style=\"text-align:right\">Hosted browser for production</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Access control</span><span style=\"text-align:right\">Blocks actions, not opening sites</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stable screen</span><span style=\"text-align:right\">RPA; changing screens: Computer use</span></div></div>",
   "caption": "Five credits per step, fifteen premium, not in the Copilot license. No Hosted browser in production. Access control blocks actions. Stable screen: RPA.",
   "say": "Back to Contoso. Nexo opens the portal, signs in with the stored credentials, downloads this month's invoice, and saves the total for Marta. Remember for the exam. Each step costs five Copilot Credits, fifteen with premium, and the Copilot license does not include it. Never choose the Hosted browser for production. Access control blocks actions, not the opening of sites. A stable screen with simple rules means R P A, and changing screens mean Computer use. Next, M C P tool servers."
  }
 ],
 "check": [
  {
   "stem": "What does Computer use need in order to work?",
   "options": [
    "A deployment pipelines host",
    "Generative orchestration",
    "A Fabric data agent connection",
    "A test set with screenshots"
   ],
   "answer": 1,
   "explanation": "Computer use requires generative orchestration."
  },
  {
   "stem": "How much does each step cost with a standard model?",
   "options": [
    "5 Copilot Credits per step",
    "1 Copilot Credit",
    "It is free",
    "15 Copilot Credits"
   ],
   "answer": 0,
   "explanation": "5 per step with standard models; 15 with premium."
  },
  {
   "stem": "What is the Hosted browser for?",
   "options": [
    "Production",
    "Evaluating agents",
    "Exporting solutions",
    "Experimenting"
   ],
   "answer": 3,
   "explanation": "It is meant for experimenting; it is not for production."
  },
  {
   "stem": "What is better than using the maker's credentials in a shared agent?",
   "options": [
    "Using the default solution",
    "Turning off the model",
    "Leaving the password in the instructions",
    "Stored or end-user credentials"
   ],
   "answer": 3,
   "explanation": "The maker's credentials are risky when shared; use stored credentials or the end user's."
  }
 ],
 "reto": {
  "text": "Read the sample instructions for Computer use.\nWrite instructions to fill in a web form: URL, steps, and result.\nIf you have capacity, try it with the hosted browser.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
},
{
 "id": "L27",
 "module": 5,
 "title": "MCP: tool servers",
 "level": "exam",
 "minutes": 12,
 "skills": [
  "2.2b"
 ],
 "theory": {
  "intro": "MCP (Model Context Protocol) is an open protocol that lets a server offer tools and resources to any compatible agent. Think of a universal plug: if your server has the MCP plug, many different agents can connect without special adapters. Copilot Studio is one of those clients.",
  "sections": [
   {
    "heading": "What an MCP server is",
    "body": "An MCP server exposes tools and resources. The same server can be used from Copilot Studio and from other compatible clients. The agent does not need to know how it works inside: it only reads which tools it offers.\n\nMCP requires generative orchestration, because the orchestrator chooses the tools based on their description.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agent</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"34\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">MCP</text><text x=\"124.5\" y=\"47\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Streamable</text><text x=\"124.5\" y=\"60\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">HTTP</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">MCP</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">server</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Tools</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">The orchestrator picks the tool by description</text></svg>"
   },
   {
    "heading": "Allowed transport",
    "body": "Copilot Studio speaks only Streamable HTTP. The SSE transport has not been supported since August 2025. If a server only offers SSE, it will not work."
   },
   {
    "heading": "Two ways to connect",
    "body": "The recommended way is the MCP wizard: Tools, Add a tool, New tool, Model Context Protocol. You enter a name, a description (the orchestrator uses it to decide when to call it), and the server URL.\n\nThe other way is a custom connector created in Power Apps from an OpenAPI file (Swagger 2.0), where the POST /mcp operation carries the x-ms-agentic-protocol: mcp-streamable-1.0 mark.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">New tool, Model Context Protocol</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Server name</span><span style=\"text-align:right\">nexo-tools</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Server description</span><span style=\"text-align:right\">Gets and creates tickets</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Server URL</span><span style=\"text-align:right\">the MCP server's URL</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">None, API key, or OAuth 2.0</span></div></div>"
   },
   {
    "heading": "Authentication and governance",
    "body": "Options: None, API key (in Header or Query), and OAuth 2.0 with three modes: Dynamic discovery, Dynamic, and Manual. After that you create the connection and select Add to agent.\n\nBecause MCP uses Power Platform connectors, data policies (DLP) also govern MCP servers."
   },
   {
    "heading": "Managing tools, resources, and keys",
    "body": "The Tools section lists every tool the server publishes. Allow all is on by default, so all tools are enabled, and tools the server adds later are enabled automatically. Turn it off to enable tools one by one: new tools then appear disabled until a maker enables them. This gives least privilege and fewer tools for the orchestrator to choose from.\n\nTool descriptions come from the server and are read-only in Copilot Studio. The only fix is to ask the server owner to change them. Resources can't be called by themselves: they reach the agent only as the output of an MCP tool that the server owner set up. Copilot Studio does not support MCP prompts. When the owner updates a tool, every connected agent sees the change with no republish. Topics can't call MCP; only the orchestrator can.\n\nWith API key authentication, the maker does not store the key. You only set Type (Header or Query) and Parameter name, for example x-api-key. Each user is asked for their own key the first time they use the tool."
   }
  ],
  "steps": [
   "Confirm that your agent uses generative orchestration.",
   "Open Tools and select Add a tool.",
   "Choose New tool, then Model Context Protocol.",
   "Enter the Server name, Server description, and Server URL.",
   "Choose the authentication: None, API key, or OAuth 2.0 (Dynamic discovery, Dynamic, or Manual).",
   "Create or select the connection.",
   "Select Add to agent and test it by asking for something that forces the use of a tool."
  ],
  "example": "Contoso builds an MCP server called nexo-tools that gets and creates support tickets. In Copilot Studio they use the wizard: they enter the name, the description Gets and creates tickets, and the server URL. They create the connection and select Add to agent. When an employee says their printer failed, the orchestrator reads the descriptions and calls the create ticket tool. The security team blocks servers that are not approved with a data policy.",
  "examTips": [
   "To block unapproved MCP servers: data policies (DLP), because they use Power Platform connectors.",
   "Trap: using SSE as the transport. It is no longer supported; only Streamable HTTP.",
   "It requires generative orchestration; the alternative to the wizard is a custom connector with x-ms-agentic-protocol.",
   "Allow all is on by default. Off: new server tools stay disabled until a maker enables them. Tool descriptions are read-only; fix them on the server."
  ],
  "glossary": [
   {
    "term": "MCP",
    "def": "Model Context Protocol: an open protocol for exposing tools and resources to agents."
   },
   {
    "term": "Streamable HTTP",
    "def": "The only MCP transport supported in Copilot Studio."
   },
   {
    "term": "Dynamic discovery",
    "def": "An OAuth mode that discovers and registers the client automatically."
   },
   {
    "term": "Orchestrator",
    "def": "The engine that chooses which tool to call based on its description."
   },
   {
    "term": "Allow all",
    "def": "A toggle on an MCP server. On by default: all tools, including new ones, are enabled. Off: you enable tools one by one."
   }
  ]
 },
 "scenes": [
  {
   "title": "The printer that broke",
   "caption": "Marta's printer failed. Contoso has an MCP server, nexo-tools, that gets and creates support tickets.",
   "say": "Tuesday at Contoso. Marta's printer has failed, and she tells Nexo. Valeria, the developer, wants Nexo to create a support ticket for her. Contoso already built a server called nexo tools that gets and creates support tickets, and it speaks M C P. In this class you will learn how to plug that server into Nexo, which transport it must use, and how the security team keeps control."
  },
  {
   "title": "A universal plug",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">MCP</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Model Context Protocol</span><span style=\"text-align:right\">Open protocol</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">MCP server</span><span style=\"text-align:right\">Exposes tools and resources</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Clients</span><span style=\"text-align:right\">Copilot Studio and other compatible agents</span></div></div>",
   "caption": "MCP, Model Context Protocol: an open protocol. A server exposes tools and resources to any compatible agent, like a universal plug.",
   "say": "First, what is M C P? It stands for Model Context Protocol, an open protocol that lets a server offer tools and resources to any compatible agent. Think of a universal plug. If your server has the M C P plug, many different agents can connect without special adapters. Copilot Studio is one of those clients. Nexo does not need to know how the server works inside. It only reads which tools it offers."
  },
  {
   "title": "One socket shape",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Transport</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Streamable HTTP</span><span style=\"text-align:right\">Supported</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">SSE</span><span style=\"text-align:right\">Not since August 2025</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">SSE-only server</span><span style=\"text-align:right\">Will not work</span></div></div>",
   "caption": "Copilot Studio speaks only Streamable HTTP. SSE has not been supported since August 2025; an SSE-only server will not work.",
   "say": "Now the socket itself. Copilot Studio speaks only one transport: Streamable H T T P. The older S S E transport has not been supported since August twenty twenty-five. So if a server only offers S S E, it will not work in Copilot Studio. The exam likes this trap. Before anything else, check that the server speaks Streamable H T T P."
  },
  {
   "title": "The wizard",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The wizard</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Path</span><span style=\"text-align:right\">Tools · Add a tool · New tool · Model Context Protocol</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fields</span><span style=\"text-align:right\">Name, description, server URL</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Description</span><span style=\"text-align:right\">The orchestrator uses it to decide</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Requires</span><span style=\"text-align:right\">Generative orchestration</span></div></div>",
   "caption": "Recommended: Tools, Add a tool, New tool, Model Context Protocol. Enter name, description and server URL. Requires generative orchestration.",
   "say": "There are two ways to connect. The recommended way is the M C P wizard. In Tools, select Add a tool, then New tool, then Model Context Protocol. You enter a name, a description, and the server U R L. Write the description with care, because the orchestrator uses it to decide when to call the server. That is also why M C P requires generative orchestration: the orchestrator chooses the tools by their description."
  },
  {
   "title": "Decide: the SSE server",
   "caption": "A vendor's ticket server offers only the SSE transport. What happens when Valeria connects it to Nexo?",
   "say": "Your turn. Valeria finds a vendor's ticket server. It only offers the S S E transport. What happens when she connects it to Nexo? It works through the wizard as usual? It works with a custom connector instead? Or it does not work in Copilot Studio? Decide before I answer. It does not work in Copilot Studio. Only Streamable H T T P is supported, and S S E has not been since August twenty twenty-five. A custom connector does not rescue an S S E only server."
  },
  {
   "title": "Keys and the other door",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Authentication</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">None</span><span style=\"text-align:right\">No credentials</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">API key</span><span style=\"text-align:right\">Header or Query</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">OAuth 2.0</span><span style=\"text-align:right\">Dynamic discovery, Dynamic, Manual</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Alternative</span><span style=\"text-align:right\">Custom connector, x-ms-agentic-protocol</span></div></div>",
   "caption": "Authentication: None, API key (Header or Query), or OAuth 2.0 (Dynamic discovery, Dynamic, Manual). Alternative: a custom connector with x-ms-agentic-protocol.",
   "say": "Next comes authentication. There are three options: None, A P I key, sent in a Header or a Query, and O Auth two point zero, with three modes: Dynamic discovery, Dynamic, and Manual. Then you create the connection and select Add to agent. The other way to connect is a custom connector, created in Power Apps from an Open A P I file. Its operation carries the mark x M S agentic protocol."
  },
  {
   "title": "The building rules",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Governance</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">MCP uses</span><span style=\"text-align:right\">Power Platform connectors</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Data policies (DLP)</span><span style=\"text-align:right\">Govern MCP servers</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Use</span><span style=\"text-align:right\">Block unapproved servers</span></div></div>",
   "caption": "MCP uses Power Platform connectors, so data policies (DLP) govern MCP servers too and can block unapproved ones.",
   "say": "Now the security side. M C P uses Power Platform connectors. Because of that, data policies, also called D L P, govern M C P servers too. Think of a data policy as the rule of the building: it decides which plugs may go into the sockets. At Contoso, the security team uses a data policy to block servers that are not approved, so nexo tools stays plugged in while unknown servers stay out."
  },
  {
   "title": "Decide: the unknown servers",
   "caption": "Makers could connect Nexo to MCP servers nobody approved. How should the security team block those servers?",
   "say": "Your turn. The security team is worried. Makers could connect Nexo to M C P servers nobody approved. How should the team block them? With a data policy, also called D L P? By requiring an A P I key on each server? Or by turning off generative orchestration? Decide before I answer. With a data policy, also called D L P. M C P uses Power Platform connectors, so data policies govern M C P servers too. An A P I key blocks nothing."
  },
  {
   "title": "The power strip",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Allow all</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">On (default)</span><span style=\"text-align:right\">All tools, new ones too</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Off</span><span style=\"text-align:right\">Enable tools one by one</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">New tools when off</span><span style=\"text-align:right\">Disabled until a maker enables them</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Benefit</span><span style=\"text-align:right\">Least privilege, fewer tools</span></div></div>",
   "caption": "Allow all is on by default: every tool, including new ones, is enabled. Off: new tools stay disabled until a maker enables them.",
   "say": "Once the server is connected, the Tools section lists every tool it publishes. Allow all is on by default, so every tool is enabled, and tools the server adds later are enabled automatically. Turn Allow all off to enable tools one by one. New tools then appear disabled until a maker enables them. That gives least privilege, and fewer tools for the orchestrator to choose from."
  },
  {
   "title": "What the server owns",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Server side</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tool descriptions</span><span style=\"text-align:right\">Read-only; fix on the server</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Resources</span><span style=\"text-align:right\">Only as a tool's output</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">MCP prompts</span><span style=\"text-align:right\">Not supported</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tool updates</span><span style=\"text-align:right\">No republish</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topics</span><span style=\"text-align:right\">Can't call MCP</span></div></div>",
   "caption": "Descriptions are read-only, fixed on the server. Resources arrive only through a tool. No MCP prompts. Updates need no republish. Topics can't call MCP.",
   "say": "A few more rules come from the server side. Tool descriptions come from the server and are read-only in Copilot Studio, so the only fix is to ask the server owner to change them. Resources cannot be called by themselves; they reach Nexo only as the output of an M C P tool. Copilot Studio does not support M C P prompts. When the owner updates a tool, every connected agent sees the change with no republish. And topics cannot call M C P; only the orchestrator can."
  },
  {
   "title": "Decide: the unclear description",
   "caption": "Nexo keeps calling the wrong ticket tool because the tool description from the server is unclear. What should Valeria do?",
   "say": "Your turn. Nexo keeps calling the wrong ticket tool. Valeria sees that the tool description is unclear. What should she do? Edit the description in Copilot Studio? Ask the server owner to change it? Or call the tool from a topic instead? Decide before I answer. Ask the server owner to change it. Tool descriptions come from the server and are read-only in Copilot Studio, so the only fix is on the server. Editing it in Copilot Studio is the trap, and topics cannot call M C P anyway."
  },
  {
   "title": "The steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Generative orchestration</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Tools · Add a tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">New tool · Model Context Protocol</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Name, description, URL</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Authentication</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Connection · Add to agent · test</span></div></div>",
   "caption": "Generative orchestration · Tools, Add a tool · New tool, Model Context Protocol · name, description, URL · authentication · Add to agent · test.",
   "say": "Here are the steps. Confirm that your agent uses generative orchestration. Open Tools and select Add a tool. Choose New tool, then Model Context Protocol. Enter the server name, server description, and server U R L. Choose the authentication. With an A P I key, you only set the type and the parameter name, and each user gives their own key the first time. Create the connection, select Add to agent, and test it by asking for something that forces a tool."
  },
  {
   "title": "Plugged in",
   "caption": "Streamable HTTP only. Generative orchestration required. DLP blocks unapproved servers. Allow all on by default. Descriptions are fixed on the server.",
   "say": "Back to Marta. She tells Nexo her printer failed. The orchestrator reads the descriptions and calls the create ticket tool on nexo tools. Remember for the exam: Streamable H T T P only, never S S E. Generative orchestration is required. Data policies block servers that are not approved. Allow all is on by default, and descriptions are fixed on the server. Next, multi-agent design."
  }
 ],
 "check": [
  {
   "stem": "Which transport does Copilot Studio support for MCP?",
   "options": [
    "Server-Sent Events (SSE)",
    "Streamable HTTP",
    "Only email with attachments",
    "FTP over a VPN tunnel"
   ],
   "answer": 1,
   "explanation": "Only Streamable HTTP; SSE has not been supported since August 2025."
  },
  {
   "stem": "What does the orchestrator use the server description for?",
   "options": [
    "To export it to another environment",
    "To encrypt the URL and the keys",
    "To decide when to call it",
    "To charge credits for each call"
   ],
   "answer": 2,
   "explanation": "The orchestrator uses the description to decide when to call the server."
  },
  {
   "stem": "How do you block unapproved MCP servers?",
   "options": [
    "With Compare with",
    "With Exact match",
    "By deleting the agent",
    "With a data policy (DLP)"
   ],
   "answer": 3,
   "explanation": "MCP uses Power Platform connectors, so DLP policies govern them."
  },
  {
   "stem": "What does MCP require in the agent?",
   "options": [
    "Only a classic topic with nodes",
    "Generative orchestration",
    "A Fabric data agent in the solution",
    "A deployment pipeline with stages"
   ],
   "answer": 1,
   "explanation": "It requires generative orchestration because the orchestrator chooses the tools."
  }
 ],
 "reto": {
  "text": "Open Tools, Add a tool, New tool, Model Context Protocol.\nConnect a public sample MCP server or your own local server.\nAsk the agent for something that forces it to use one of its tools.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
},
{
 "id": "L28",
 "module": 5,
 "title": "Multi-agent design",
 "level": "exam",
 "minutes": 12,
 "skills": [
  "2.3a"
 ],
 "theory": {
  "intro": "When an agent grows, it helps to share the work between several agents, as in a company: a small team does everything, but a big one has departments. Multi-agent design answers one question: where do I put each capability? Copilot Studio offers child agents, connected agents, and external agents.",
  "sections": [
   {
    "heading": "Child agent: light and inside",
    "body": "A child agent lives inside the main agent. It is lightweight and fits a single use case and a single team. It has no settings, authentication, or deployment of its own, and it is not published separately.\n\nBy default the main agent picks a child agent from its description (The agent chooses, Based on description). For routing that does not depend on wording, open When will this be used? and choose a trigger: An activity occurs, A message is received, A custom client event occurs, The conversation changes, It's invoked, It's redirected to, The user is inactive for a while (set the time under Additional details), A plan completes, or An AI-generated response is about to be sent.\n\nYou can add a Condition (the condition builder or a Power Fx formula) and a Priority. The built-in order is: An activity occurs first; then message received, custom client event, conversation changes, and invoked; The agent chooses last. In the same tier, the oldest agent goes first unless you set Priority. A lower number means a higher priority.",
    "visual": "<svg viewBox=\"0 0 340 150\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"2\" width=\"226\" height=\"146\" rx=\"6\" style=\"stroke:var(--muted)\" stroke-dasharray=\"4 3\"/><text x=\"115\" y=\"79\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\"></text><text x=\"115\" y=\"18\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"600\">Main agent</text><rect x=\"100\" y=\"28\" width=\"100\" height=\"32\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"150\" y=\"48\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Orchestrator</text><rect x=\"12\" y=\"92\" width=\"100\" height=\"42\" rx=\"6\"/><text x=\"62\" y=\"110\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Child agent</text><text x=\"62\" y=\"124\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">inside, light</text><line x1=\"125\" y1=\"62\" x2=\"70\" y2=\"90\" style=\"stroke:var(--accent)\"/><polygon points=\"70,90 77.0,89.5 74.5,84.6\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><line x1=\"180\" y1=\"62\" x2=\"280\" y2=\"90\" style=\"stroke:var(--accent)\"/><polygon points=\"280,90 274.5,85.6 273.1,90.9\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><rect x=\"236\" y=\"92\" width=\"100\" height=\"42\" rx=\"6\"/><text x=\"286\" y=\"110\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Connected</text><text x=\"286\" y=\"124\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">agent (separate)</text></svg>"
   },
   {
    "heading": "Connected agent: separate",
    "body": "A connected agent is another Copilot Studio agent in the same environment, with its own publishing and life cycle. The orchestrator of the main agent decides which one to hand work to, based on their descriptions.\n\nYou can also connect external agents: A2A, Microsoft Foundry, Fabric data agents, and agents built with the Microsoft 365 Agents SDK.\n\nHarness options differ. On the standard harness you can connect a Copilot Studio agent (yes), a Foundry agent (preview), a Fabric data agent (preview), a Microsoft 365 Agents SDK agent (preview), and an A2A agent (yes), and you can add child agents. On the Microsoft Copilot harness (formerly GitHub Copilot harness), a connected Copilot Studio agent is currently the only type, and it must itself be a Microsoft Copilot harness agent. Inside one agent, use instructions, a skill, or a tool instead of a child agent. A connected agent must be published, in the same environment, and set to allow other agents to connect."
   },
   {
    "heading": "When to split",
    "body": "Start simple. Split when the accuracy of tool selection drops: as a rule of thumb, with more than 30 to 40 options across tools, topics, and agents, or when the descriptions look alike.\n\nAlso split if there are several teams, different publishing channels, settings of their own (for example, the model), independent ALM, or a need to reuse.\n\nStart with one agent. Before you split, try the smallest change: if requests reach the wrong capability, make the descriptions and instructions more distinct; if the agent needs a new capability, add a tool or knowledge source to the same agent. Real signals to split are team ownership, distinct domains, and reuse.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Contoso's decision</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Licenses</span><span style=\"text-align:right\">Child agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">HR</span><span style=\"text-align:right\">Connected agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">More than 30 to 40 options</span><span style=\"text-align:right\">consider splitting</span></div></div>"
   },
   {
    "heading": "The cost",
    "body": "Each extra orchestration hop adds latency and enlarges what you must test and govern. That is why you should not split without a reason.\n\nWhatever pattern you use, adding agents is also a governance decision: apply least privilege to every agent and tool call, pass only the context the receiving agent needs, require human approval for high-impact cross-agent actions, and keep end-to-end traceability."
   },
   {
    "heading": "Choosing a coordination pattern",
    "body": "One question separates the two patterns: how much of the path is known before runtime? In the orchestrator/subagent pattern, the main agent decides at runtime which connected agent to use. It fits open-ended use cases and connected agents that are ready to reuse. It is the wrong choice when you need a consistent success rate or strict ordering, or when connected agents need long response windows or bigger requests than the main agent allows.\n\nIn the workflow-oriented pattern, a workflow engine calls agents as steps in a set path. It gives deterministic runs, approval gates, and auditability. A serial workflow runs agents one after another (quality gates, strict order, slower). A concurrent workflow runs agents in parallel (quorum or voting decisions). You can mix both: agents can call workflows as tools, and workflows can call agents.\n\nOn the standard harness, three building blocks call an agent as a step: a topic Redirect node, the Run an agent action in an agent flow, and a Power Automate cloud flow using the Microsoft Copilot Studio connector (for example Execute Agent and wait). On the Microsoft Copilot harness, a workflow uses the agent node, and that connector does not support Microsoft Copilot harness agents."
   }
  ],
  "steps": [
   "List the capabilities your agent needs.",
   "Count the options (tools, topics, agents): if they pass 30 to 40, consider splitting.",
   "Ask whether they are different teams, channels, or deployment cycles.",
   "If it is a single team and use case, create a child agent inside the main one.",
   "If it needs its own publishing or ALM, create a connected agent in the same environment.",
   "Write clear, distinct descriptions for each agent.",
   "Test how the orchestrator chooses who to hand work to."
  ],
  "example": "At Contoso, software licenses are handled by a single team with one use case, so they model it as a child agent inside the IT agent. Human resources, however, has its own team, channels, and publishing, so they model it as a connected agent. Before splitting, they counted their options and saw that they passed 30 to 40, and the descriptions looked alike. They accepted a cost: one more orchestration call and more things to test.",
  "examTips": [
   "Child vs connected: justify it with teams, ALM, publishing, and reuse.",
   "Trap: ignoring the cost. More hops mean more latency and more to test and govern.",
   "External: A2A, Foundry, Fabric, and Microsoft 365 Agents SDK.",
   "Path known before runtime? Little: orchestrator/subagent. Mostly known, strict order or approvals: workflow-oriented (serial or concurrent)."
  ],
  "glossary": [
   {
    "term": "Child agent",
    "def": "A lightweight agent inside the main one, with no settings or deployment of its own."
   },
   {
    "term": "Connected agent",
    "def": "Another Copilot Studio agent in the same environment, with its own life cycle."
   },
   {
    "term": "Orchestrator",
    "def": "The engine of the main agent that decides who to hand work to."
   },
   {
    "term": "ALM",
    "def": "Application lifecycle management: development, testing, and deployment."
   },
   {
    "term": "Orchestrator/subagent pattern",
    "def": "The main agent decides at runtime which connected agent handles a request. Good for open-ended use cases."
   },
   {
    "term": "Workflow-oriented pattern",
    "def": "A workflow engine calls agents as steps in a defined path. Deterministic, with approval gates and auditability."
   }
  ]
 },
 "scenes": [
  {
   "title": "Nexo is growing",
   "caption": "Nexo now handles many requests at Contoso. Valeria must decide where to put each capability: child, connected, or external agents.",
   "say": "Monday at Contoso. Nexo, the blue robot agent, now handles printers, tickets, and software licenses. Marta asks it for a new license, and soon she will ask about her holidays, which belong to human resources. Valeria, the developer, faces one question: where do I put each capability? In this class you will meet child agents, connected agents, and external agents, and learn when to split."
  },
  {
   "title": "A gate inside the terminal",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Child agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Inside the main agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Size</span><span style=\"text-align:right\">Lightweight</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fits</span><span style=\"text-align:right\">One use case, one team</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Own settings, auth, deployment</span><span style=\"text-align:right\">None</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Published separately</span><span style=\"text-align:right\">No</span></div></div>",
   "caption": "A child agent lives inside the main agent: lightweight, one use case, one team, no settings or deployment of its own.",
   "say": "First, the child agent. Think of Nexo as an airport terminal with its own gates. A child agent is a gate inside the terminal: it lives inside the main agent. It is lightweight and fits a single use case and a single team. It has no settings, authentication, or deployment of its own, and it is not published separately. At Contoso, software licenses are one team with one use case, so they become a child agent inside Nexo."
  },
  {
   "title": "Routing the child",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Routing a child</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default</span><span style=\"text-align:right\">The agent chooses · Based on description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">When will this be used?</span><span style=\"text-align:right\">Choose a trigger</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Add</span><span style=\"text-align:right\">Condition and Priority</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Order</span><span style=\"text-align:right\">An activity occurs first · The agent chooses last</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Priority</span><span style=\"text-align:right\">Lower number = higher priority</span></div></div>",
   "caption": "By default the main agent chooses a child from its description. Triggers, a Condition and a Priority give routing that ignores wording.",
   "say": "How does Nexo pick the child agent? By default, the main agent chooses from its description: The agent chooses, Based on description. For routing that does not depend on wording, open When will this be used, and choose a trigger, such as A message is received, It's redirected to, or The user is inactive for a while. You can add a Condition and a Priority. An activity occurs goes first, and The agent chooses goes last. A lower number means a higher priority."
  },
  {
   "title": "Other terminals",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Connected agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">Another Copilot Studio agent, same environment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Life cycle</span><span style=\"text-align:right\">Its own publishing</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Chosen by</span><span style=\"text-align:right\">The orchestrator, from descriptions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Requires</span><span style=\"text-align:right\">Published · same environment · allow other agents to connect</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">External</span><span style=\"text-align:right\">A2A, Microsoft Foundry, Fabric data agents, Microsoft 365 Agents SDK</span></div></div>",
   "caption": "A connected agent is another Copilot Studio agent in the same environment, with its own publishing and life cycle. External agents connect too.",
   "say": "Next, the connected agent. It is another Copilot Studio agent in the same environment, like a second terminal with its own publishing and life cycle. The orchestrator of the main agent, our control tower, decides which one to hand work to, based on their descriptions. A connected agent must be published, in the same environment, and set to allow other agents to connect. You can also connect external agents: A two A, Microsoft Foundry, Fabric data agents, and Microsoft three six five Agents S D K agents."
  },
  {
   "title": "Decide: the human resources agent",
   "caption": "Human resources has its own team, channels and publishing. How should Valeria model it?",
   "say": "Your turn. Human resources wants its own agent. It has its own team, its own channels, and its own publishing. How should Valeria model it? As a connected agent of its own? As a child agent inside the IT agent? Or as one more topic in the IT agent? Decide before I answer. As a connected agent of its own. A connected agent has its own publishing and life cycle, like this team needs. A child agent is not published separately, so it is the trap."
  },
  {
   "title": "When to split",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">When to split</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Start</span><span style=\"text-align:right\">One agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Accuracy drops</span><span style=\"text-align:right\">More than 30 to 40 options, or similar descriptions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Real signals</span><span style=\"text-align:right\">Team ownership, distinct domains, reuse</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Also</span><span style=\"text-align:right\">Channels, own settings, independent ALM</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">First try</span><span style=\"text-align:right\">Distinct descriptions, or add a tool or knowledge</span></div></div>",
   "caption": "Start with one agent. Split with more than 30 to 40 options, similar descriptions, several teams, own settings, independent ALM, or reuse.",
   "say": "So when do you split? Start simple, with one agent. Split when the accuracy of tool selection drops: as a rule of thumb, with more than thirty to forty options across tools, topics, and agents, or when descriptions look alike. Real signals are team ownership, distinct domains, and reuse, plus different publishing channels, settings of their own, or independent A L M. Before you split, try the smallest change: make descriptions and instructions more distinct, or add a tool or knowledge source to the same agent."
  },
  {
   "title": "The price of a hop",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The cost</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Each hop</span><span style=\"text-align:right\">More latency</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Also</span><span style=\"text-align:right\">More to test and govern</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Least privilege</span><span style=\"text-align:right\">Every agent and tool call</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Context</span><span style=\"text-align:right\">Only what the receiver needs</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">High-impact actions</span><span style=\"text-align:right\">Human approval · end-to-end traceability</span></div></div>",
   "caption": "Each orchestration hop adds latency and more to test and govern. Least privilege, minimal context, human approval, end-to-end traceability.",
   "say": "Splitting has a price. Each extra orchestration hop is like a taxi ride between terminals: it adds latency, and it enlarges what you must test and govern. So do not split without a reason. Adding agents is also a governance decision. Apply least privilege to every agent and tool call. Pass only the context the receiving agent needs. Require human approval for high-impact cross-agent actions, and keep end-to-end traceability."
  },
  {
   "title": "Decide: the wrong capability",
   "caption": "One team owns Nexo's few tools and topics, but requests reach the wrong capability because two descriptions look alike. What first?",
   "say": "Your turn. Nexo has a few tools and topics, owned by one team. Some requests reach the wrong capability, because two descriptions look alike. What should Valeria try first? Split Nexo into several connected agents? Make the descriptions more distinct? Or give every request its own child agent? Decide before I answer. Make the descriptions more distinct. Start with one agent and try the smallest change first. Splitting is the trap: every extra hop adds latency and more to test and govern."
  },
  {
   "title": "Two ways to coordinate",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Coordination patterns</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Key question</span><span style=\"text-align:right\">How much of the path is known before runtime?</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Orchestrator/subagent</span><span style=\"text-align:right\">Runtime choice · open-ended</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Workflow-oriented</span><span style=\"text-align:right\">Set path · deterministic · approvals · audit</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Serial</span><span style=\"text-align:right\">One after another · strict order</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Concurrent</span><span style=\"text-align:right\">Parallel · quorum or voting</span></div></div>",
   "caption": "Little of the path known before runtime: orchestrator/subagent. A set path: workflow-oriented, serial or concurrent. You can mix both.",
   "say": "How do several agents work together? One question separates the two patterns: how much of the path is known before runtime. In the orchestrator and subagent pattern, the main agent decides at runtime which connected agent to use, which fits open-ended use cases. In the workflow-oriented pattern, a workflow engine calls agents as steps in a set path, with deterministic runs, approval gates, and auditability. A serial workflow runs agents one after another. A concurrent workflow runs them in parallel, for quorum or voting. You can mix both."
  },
  {
   "title": "Two control desks",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Harness</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Standard</span><span style=\"text-align:right\">Child agents · Copilot Studio and A2A agents</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Preview (standard)</span><span style=\"text-align:right\">Foundry, Fabric, Agents SDK</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent as a step</span><span style=\"text-align:right\">Redirect node · Run an agent · Copilot Studio connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft Copilot harness</span><span style=\"text-align:right\">Connected Copilot Studio agent only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Workflow</span><span style=\"text-align:right\">Agent node</span></div></div>",
   "caption": "Standard harness: child agents, Redirect node, Run an agent, Copilot Studio connector. Microsoft Copilot harness: connected Copilot Studio agents only, agent node.",
   "say": "The harness changes your options. On the standard harness, you can add child agents and connect Copilot Studio and A two A agents, while Foundry, Fabric, and Agents S D K agents are in preview. Three building blocks call an agent as a step: a topic Redirect node, the Run an agent action in an agent flow, and a cloud flow with the Microsoft Copilot Studio connector. On the Microsoft Copilot harness, a connected Copilot Studio agent is the only type, and a workflow uses the agent node."
  },
  {
   "title": "Decide: the new hire process",
   "caption": "A new hire process runs human resources, then approval, then Nexo, in strict order, and must be auditable. Which pattern fits?",
   "say": "Your turn. Contoso needs a new hire process: human resources first, then a manager approval, then Nexo, in strict order. Every run must be identical and auditable. Which coordination pattern fits? The orchestrator picks agents at runtime? A concurrent workflow that votes? Or a serial workflow with approval gates? Decide before I answer. A serial workflow with approval gates. The path is known before runtime, so a workflow gives deterministic runs, approval gates, and auditability. The orchestrator pattern is the trap: it is wrong when you need strict ordering."
  },
  {
   "title": "The steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">List the capabilities</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Count options: past 30 to 40?</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Different teams, channels, cycles?</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">One team and use case: child agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Own publishing or ALM: connected agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Distinct descriptions · test the orchestrator</span></div></div>",
   "caption": "List capabilities · count options · teams, channels, cycles? · child or connected agent · distinct descriptions · test the orchestrator.",
   "say": "Here are the steps. List the capabilities your agent needs. Count the options across tools, topics, and agents, and if they pass thirty to forty, consider splitting. Ask whether there are different teams, channels, or deployment cycles. For a single team and use case, create a child agent inside the main one. If it needs its own publishing or A L M, create a connected agent in the same environment. Write clear, distinct descriptions for each agent, and test how the orchestrator chooses who to hand work to."
  },
  {
   "title": "Cleared for take-off",
   "caption": "Child vs connected: teams, ALM, publishing, reuse. More than 30 to 40 options: consider splitting. Every hop costs latency. Strict order: workflow.",
   "say": "Back to Marta. She asks for a new license, and the control tower sends it to the licenses child agent inside Nexo. She asks about her holidays, and Nexo hands it to the human resources connected agent. Remember for the exam: child versus connected is about teams, A L M, publishing, and reuse. More than thirty to forty options suggests a split, but every hop costs latency. For strict order or approvals, use a workflow. Next, connected agents in practice."
  }
 ],
 "check": [
  {
   "stem": "Where does a child agent live?",
   "options": [
    "In a Teams channel",
    "Inside the main agent",
    "In a separate Dataverse environment",
    "In Azure AI Search"
   ],
   "answer": 1,
   "explanation": "A child agent lives inside the main agent and is lightweight."
  },
  {
   "stem": "Which one has its own publishing and life cycle?",
   "options": [
    "Neither of the two agents",
    "Both have the same life cycle",
    "Child agent inside the parent",
    "Connected agent"
   ],
   "answer": 3,
   "explanation": "The connected agent has its own life cycle and publishing."
  },
  {
   "stem": "With how many options should you consider splitting (rule of thumb)?",
   "options": [
    "Never, one agent is always enough",
    "More than 5 options in total",
    "More than 1000",
    "More than 30 to 40"
   ],
   "answer": 3,
   "explanation": "Accuracy drops with more than 30 to 40 options across tools, topics, and agents."
  },
  {
   "stem": "What is the cost of each hop between agents?",
   "options": [
    "Zero cost",
    "Less testing",
    "Less governance",
    "More latency"
   ],
   "answer": 3,
   "explanation": "Each hop adds latency and more to test and govern."
  }
 ],
 "reto": {
  "text": "Draw the agents for a Contoso case and mark which one is a child and which is connected.\nCreate a child agent and a connected agent in your environment.\nWatch how the orchestrator chooses based on the descriptions.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
},
{
 "id": "L29",
 "module": 5,
 "title": "Connected agents in practice",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "2.3c"
 ],
 "theory": {
  "intro": "A connected agent is a specialist that your main agent passes questions to. It is like a receptionist who hears a payroll question and transfers the call to Human Resources. Here we see how it is invoked, what limits it has, and why citations sometimes disappear.",
  "sections": [
   {
    "heading": "Two ways to invoke it",
    "body": "Connected agents are Copilot Studio agents in the same environment. The orchestrator of the main agent can decide by itself when to hand work over, based on the connected agent's description.\n\nOr a topic can redirect the conversation to the agent (Redirect node). Its inputs and outputs become topic variables.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">User</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Main</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">agent</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topic</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Redirect</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"302.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">HR</text><text x=\"302.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">agent</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Inputs and outputs = topic variables</text></svg>"
   },
   {
    "heading": "Reference it in instructions",
    "body": "In the main agent's instructions, you can reference another agent by typing a forward slash (/) and choosing its name. This tells the agent when to use it."
   },
   {
    "heading": "Limits that get asked",
    "body": "An agent that is a main agent with connected agents cannot also be used as a connected agent by another main agent. They do not chain that way.\n\nChild and connected agents respect the main agent's Use general knowledge setting. And citations can be lost when the answer returns to the main agent.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">IT agent instructions</div><div style=\"padding:2px 0\">For payroll questions, hand off to /HR agent.</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Mechanism</span><span style=\"text-align:right\">Redirect from a topic, or the orchestrator</span></div></div>"
   },
   {
    "heading": "The key: good descriptions",
    "body": "For delegation to work, each agent needs a clear and distinct description. With similar descriptions, the orchestrator hesitates."
   },
   {
    "heading": "Prerequisites and upkeep",
    "body": "To appear in the list, the target agent must be published, be in the same environment, and have Let other agents connect to and use this one turned on (Settings, General). You must also own the agent or have it shared with you. When you connect, pass conversation history to this agent is on by default. You can turn it off for a connection.\n\nThe main agent keeps its own local copy of the connected agent's description. It does not sync when the source agent changes, and your edits stay local. Review it from time to time. If better descriptions don't fix routing, name the connected agents in the main agent's instructions.\n\nThe Enabled toggle pauses a connected agent and keeps its setup. Disconnect agent removes it for good, so you must rebuild the connection to use it again; the source agent is not affected. Each connected agent writes its own transcripts, separate from the main agent's."
   }
  ],
  "steps": [
   "Create (or identify) the specialist agent in the same environment.",
   "Write a clear description of what it can solve.",
   "In the main agent, open Agents and select Add agent to connect it.",
   "If you want the orchestrator to decide, let it use the description.",
   "If you want control, create a topic with a Redirect node to the agent.",
   "In the instructions, reference the agent with a forward slash (/).",
   "Test with a question that only the specialist can answer."
  ],
  "example": "Contoso's IT agent gets a question about when payroll arrives. Its description says it does not handle payroll, but it knows the Human Resources agent. The orchestrator hands the question to HR, which answers it with its own sources. On the way back, the answer may lose its citations. The team remembers that the IT agent cannot be both a main agent with connected agents and a connected agent of another agent.",
  "examTips": [
   "Lost citations when passing through another agent: they can be lost on the way back.",
   "Trap: chaining a main agent as a connected agent of another. It is not allowed.",
   "Child agents respect the main agent's Use general knowledge.",
   "Agent missing from the connection list: check Let other agents connect to and use this one, that it is published, and that it is in the same environment."
  ],
  "glossary": [
   {
    "term": "Redirect",
    "def": "A topic node that sends the conversation to another topic or agent."
   },
   {
    "term": "Use general knowledge",
    "def": "A setting that lets the agent answer with the model's general knowledge."
   },
   {
    "term": "Specialist",
    "def": "An agent with a single area of knowledge and a clear description."
   },
   {
    "term": "Citation",
    "def": "A reference to the source of an answer."
   },
   {
    "term": "Disconnect agent",
    "def": "Permanently removes a connected agent from the main agent. Reconnecting means rebuilding the connection. The source agent is not affected."
   }
  ]
 },
 "scenes": [
  {
   "title": "A payroll question",
   "caption": "Marta asks Nexo, Contoso's IT agent, when payroll arrives. Nexo does not handle payroll, so it transfers the question to a specialist.",
   "say": "Tuesday at Contoso. Marta asks Nexo, the blue robot agent of the IT team, a simple question: when does payroll arrive? Nexo does not handle payroll. But Valeria, the developer, has connected it to the Human Resources agent. Think of a receptionist who hears a payroll question and transfers the call. In this class you will see how a connected agent is invoked, what limits it has, and why citations sometimes disappear."
  },
  {
   "title": "The specialist's card",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Connected agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">Another Copilot Studio agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Same environment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knows</span><span style=\"text-align:right\">A single area: the specialist</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Orchestrator reads</span><span style=\"text-align:right\">The descriptions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Descriptions alike</span><span style=\"text-align:right\">The orchestrator hesitates</span></div></div>",
   "caption": "A connected agent is a specialist in the same environment. It needs a clear, distinct description, or the orchestrator hesitates.",
   "say": "First, the specialist. A connected agent is another Copilot Studio agent in the same environment, with a single area of knowledge. The key is its description. The orchestrator of the main agent reads the descriptions to decide who should answer. So each agent needs a clear and distinct description. Nexo's description says it does not handle payroll. The Human Resources agent's description says it does. If the two descriptions looked alike, the orchestrator would hesitate."
  },
  {
   "title": "Plugging in the line",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Appears in Add agent if</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Published</span><span style=\"text-align:right\">Yes</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Environment</span><span style=\"text-align:right\">The same one</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Settings, General</span><span style=\"text-align:right\">Let other agents connect to and use this one: on</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">You</span><span style=\"text-align:right\">Own it, or it is shared with you</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Pass conversation history</span><span style=\"text-align:right\">On by default · can be turned off per connection</span></div></div>",
   "caption": "Target agent listed only if published, same environment, Let other agents connect to and use this one on, and owned or shared with you.",
   "say": "Now Valeria connects it. In Nexo, she opens Agents and selects Add agent. To appear in that list, the target agent must be published and be in the same environment. It must also have Let other agents connect to and use this one turned on, under Settings, General. And Valeria must own the agent, or have it shared with her. When she connects, pass conversation history to this agent is on by default. She can turn it off for this connection."
  },
  {
   "title": "Decide: the missing agent",
   "caption": "The HR agent is published, in the same environment, and Valeria owns it, but it is missing from the list. What should she check?",
   "say": "Your turn. Add agent does not list the Human Resources agent. It is published, in the same environment, and Valeria owns it. What should she check on it? The Use general knowledge setting? The let other agents connect setting? Or the pass conversation history setting? Decide before I answer. The let other agents connect setting. Without Let other agents connect to and use this one turned on, the agent never appears in the list. Pass conversation history is the trap: it is set per connection, after you connect."
  },
  {
   "title": "Two ways to transfer",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two ways to invoke</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Orchestrator</span><span style=\"text-align:right\">Decides from the description · flexibility</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topic with Redirect node</span><span style=\"text-align:right\">You control the moment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Inputs and outputs</span><span style=\"text-align:right\">Topic variables</span></div></div>",
   "caption": "The orchestrator hands work over based on the description, or a topic's Redirect node sends it. Inputs and outputs become topic variables.",
   "say": "There are two ways to invoke a connected agent. One: the orchestrator of the main agent decides by itself when to hand work over, based on the connected agent's description. That gives flexibility. Two: a topic redirects the conversation to the agent with a Redirect node. The agent's inputs and outputs become topic variables. That gives you control over exactly when the work is handed over."
  },
  {
   "title": "Naming it in the instructions",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In the instructions</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">You type</span><span style=\"text-align:right\">A forward slash (/)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">You choose</span><span style=\"text-align:right\">The agent by name</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Example</span><span style=\"text-align:right\">For payroll questions, hand off to /HR agent.</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Result</span><span style=\"text-align:right\">Tells the main agent when to use it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Routing still wrong?</span><span style=\"text-align:right\">Name the connected agents in the instructions</span></div></div>",
   "caption": "In the main agent's instructions, type a forward slash and choose the agent's name. This tells the main agent when to use it.",
   "say": "There is one more way to guide the orchestrator. In the main agent's instructions, Valeria types a forward slash and chooses the Human Resources agent by name. Her line reads: for payroll questions, hand off to the Human Resources agent. This tells Nexo when to use it. And if better descriptions do not fix the routing, naming the connected agents in the main agent's instructions is the next thing to try."
  },
  {
   "title": "Limits on the line",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Limits that get asked</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Chaining</span><span style=\"text-align:right\">A main agent with connected agents cannot be a connected agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Use general knowledge</span><span style=\"text-align:right\">Child and connected agents follow the main agent's setting</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Citations</span><span style=\"text-align:right\">Can be lost on the way back</span></div></div>",
   "caption": "A main agent with connected agents cannot be a connected agent too. Use general knowledge follows the main agent. Citations can be lost.",
   "say": "Now the limits that get asked on the exam. First, an agent that is a main agent with connected agents cannot also be used as a connected agent by another main agent. They do not chain that way. Second, child and connected agents respect the main agent's Use general knowledge setting. Third, citations can be lost when the answer returns to the main agent. Remember these three points."
  },
  {
   "title": "Decide: the missing citations",
   "caption": "Nexo hands Marta's payroll question to the HR agent. The answer she gets is correct, but the citations are gone. What is the likely cause?",
   "say": "Your turn. Nexo hands Marta's payroll question to the Human Resources agent. The answer is correct, but the citations are gone. What is the most likely cause? The Human Resources agent has no sources? Nexo has Use general knowledge turned off? Or citations can be lost on the way back? Decide before I answer. Citations can be lost on the way back. The specialist used its own sources, but citations can be lost on the way back. Use general knowledge is the trap: it does not control citations."
  },
  {
   "title": "Upkeep of the line",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Upkeep</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Description</span><span style=\"text-align:right\">Local copy in the main agent · does not sync</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Your edits</span><span style=\"text-align:right\">Stay local · review from time to time</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Enabled toggle</span><span style=\"text-align:right\">Pauses · keeps the setup</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Disconnect agent</span><span style=\"text-align:right\">Removes for good · rebuild to reconnect · source not affected</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Transcripts</span><span style=\"text-align:right\">Each connected agent writes its own</span></div></div>",
   "caption": "The main agent keeps a local copy of the description that never syncs. Enabled pauses the agent; Disconnect agent removes it for good.",
   "say": "Finally, upkeep. Nexo keeps its own local copy of the Human Resources agent's description. It does not sync when the source agent changes, and Valeria's edits stay local, so she reviews it from time to time. The Enabled toggle pauses a connected agent and keeps its setup. Disconnect agent removes it for good, so she would have to rebuild the connection, while the source agent is not affected. Each connected agent writes its own transcripts, separate from the main agent's."
  },
  {
   "title": "Decide: the facilities agent",
   "caption": "Nexo already has the HR agent connected. The facilities team wants Nexo as a connected agent of its own main agent. What happens?",
   "say": "Your turn. Nexo already has the Human Resources agent connected. The facilities team wants Nexo as a connected agent of their own main agent. What happens? It is not allowed for that agent? It works if both share one environment? Or it works once the agent is republished? Decide before I answer. It is not allowed for that agent. A main agent with connected agents cannot also be a connected agent of another main agent. Sharing one environment is the trap: agents still do not chain that way."
  },
  {
   "title": "In Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Specialist agent in the same environment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Clear description of what it solves</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Main agent: Agents · Add agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Orchestrator decides, or topic with Redirect node</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Reference it with a forward slash (/)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Test with a question only the specialist can answer</span></div></div>",
   "caption": "Specialist in the same environment with a clear description. Main agent: Agents, Add agent, orchestrator or Redirect, forward slash, then test.",
   "say": "Here are the steps in Copilot Studio. Create or identify the specialist agent in the same environment, and write a clear description of what it can solve. In the main agent, open Agents and select Add agent to connect it. Let the orchestrator use the description, or, for control, create a topic with a Redirect node to the agent. Reference the agent in the instructions with a forward slash. Then test with a question that only the specialist can answer."
  },
  {
   "title": "Call transferred",
   "caption": "Descriptions drive the hand-off, Redirect gives control. Published, same environment, connect setting on. No chaining. Citations can be lost.",
   "say": "Back to Marta. She asks when payroll arrives. Nexo reads the descriptions and hands the question to the Human Resources agent, which answers with its own sources. On the way back, the citations may be lost. Remember for the exam: the target agent must be published, in the same environment, and allow other agents to connect. A main agent with connected agents cannot be a connected agent too. Next, Microsoft Foundry agents."
  }
 ],
 "check": [
  {
   "stem": "What happens to the variables when a topic redirects to a connected agent?",
   "options": [
    "They are sent by email to the team",
    "Its inputs and outputs become topic variables",
    "They are deleted at once",
    "They are encrypted in Azure Key Vault"
   ],
   "answer": 1,
   "explanation": "The agent's inputs and outputs become topic variables."
  },
  {
   "stem": "How do you reference an agent in the instructions?",
   "options": [
    "You cannot, use a topic instead",
    "With a forward slash",
    "With a dollar sign before the name",
    "With a comma and the agent name"
   ],
   "answer": 1,
   "explanation": "In the instructions, you reference it by typing a forward slash."
  },
  {
   "stem": "Can a main agent with connected agents be a connected agent of another main agent?",
   "options": [
    "Only in Teams",
    "Only in preview",
    "No",
    "Yes, always"
   ],
   "answer": 2,
   "explanation": "No; an agent that is a main agent with connected agents cannot be used as a connected agent of another."
  },
  {
   "stem": "What can happen to citations when the answer comes back from another agent?",
   "options": [
    "They are duplicated",
    "They can be lost",
    "They become topics",
    "They are encrypted"
   ],
   "answer": 1,
   "explanation": "Citations can be lost when the answer is passed back."
  }
 ],
 "reto": {
  "text": "Create a second agent with a single specialty.\nConnect it to the main agent with Add agent.\nAsk a question that only the second agent can answer.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
},
{
 "id": "L30",
 "module": 5,
 "title": "Microsoft Foundry agents",
 "level": "exam",
 "minutes": 11,
 "skills": [
  "2.3b"
 ],
 "theory": {
  "intro": "Microsoft Foundry is the Azure platform where teams build agents with their own code and models. Copilot Studio can invoke one of those agents, like a boss who calls an outside specialist. This capability is in preview, and it has two requirements that the exam loves.",
  "sections": [
   {
    "heading": "How to add it",
    "body": "You go to Agents, Add an agent, Connect to an external agent, and choose Microsoft Foundry. The connection needs the Foundry project endpoint. Then you enter a name, a description, and the Agent Id.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Copilot</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Studio</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Foundry</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">project</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agent</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(Agent Id)</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Requires Activity protocol enabled</text></svg>"
   },
   {
    "heading": "Requirement 1: Activity protocol",
    "body": "The Foundry agent must have the Activity protocol endpoint enabled. New agents expose only Responses and A2A by default.\n\nYou can enable Activity only with the REST API or the Python SDK. The portal still shows only Responses and A2A. If it is missing, you get a 400 error saying the endpoint does not support activity."
   },
   {
    "heading": "Requirement 2: the new portal",
    "body": "Only agents created in the new Foundry portal work. If the agent was created in the previous portal, the error is 404, Version not found.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Add an agent, Microsoft Foundry</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Foundry project endpoint</span><span style=\"text-align:right\">from your project</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent Id</span><span style=\"text-align:right\">from the new portal</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Activity protocol</span><span style=\"text-align:right\">enable via REST or Python</span></div></div>"
   },
   {
    "heading": "To diagnose",
    "body": "Error 400 \"endpoint does not support activity\": the Activity protocol is not enabled. Error 404 \"Version not found\": the agent is from the old portal."
   }
  ],
  "steps": [
   "Create the agent in the new Foundry portal (not the previous one).",
   "Check which endpoints it exposes: by default, Responses and A2A.",
   "Enable the Activity protocol endpoint with the REST API or the Python SDK.",
   "In Copilot Studio, open Agents and select Add an agent.",
   "Choose Connect to an external agent, then Microsoft Foundry.",
   "Create the connection with the Foundry project endpoint.",
   "Enter the name, the description, and the Agent Id, and test it."
  ],
  "example": "Contoso has an Incident Analyst agent in Foundry, built by the data team. The IT agent in Copilot Studio wants to invoke it. When they connect it, they get the 400 error saying the endpoint does not support activity. They check the portal and see only Responses and A2A, so they use the Python SDK to enable the Activity protocol. After that, the connection with the project endpoint works and the IT agent hands over complex incidents.",
  "examTips": [
   "Error 404 Version not found: the agent was created in the old Foundry portal.",
   "Trap: looking for the Activity protocol in the portal. It does not appear; only Responses and A2A do.",
   "The Activity protocol is enabled only through the REST API or the Python SDK."
  ],
  "glossary": [
   {
    "term": "Microsoft Foundry",
    "def": "The Azure platform for building and deploying agents and models."
   },
   {
    "term": "Activity protocol",
    "def": "The protocol that Copilot Studio needs the Foundry agent to expose."
   },
   {
    "term": "Agent Id",
    "def": "The identifier of the agent in Foundry that you enter when connecting it."
   },
   {
    "term": "Project endpoint",
    "def": "The address of the Foundry project that the connection uses."
   }
  ]
 },
 "scenes": [
  {
   "title": "A complex incident",
   "caption": "Marta reports a complex incident to Nexo, Contoso's IT agent. The data team built an Incident Analyst agent in Microsoft Foundry.",
   "say": "Monday at Contoso. Marta reports a complex incident to Nexo, the blue robot agent of the IT team. Nexo can take the report, but the deep analysis belongs to a specialist. The data team has built an Incident Analyst agent in Microsoft Foundry. Think of a boss who calls an outside specialist. In this class you will see how to add a Foundry agent, and the two requirements that the exam loves."
  },
  {
   "title": "The specialist in Foundry",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Microsoft Foundry</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">The Azure platform for building and deploying agents and models</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Built by</span><span style=\"text-align:right\">Teams, with their own code and models</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot Studio</span><span style=\"text-align:right\">Can invoke a Foundry agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Status</span><span style=\"text-align:right\">Preview</span></div></div>",
   "caption": "Microsoft Foundry is the Azure platform for building and deploying agents and models. Copilot Studio can invoke a Foundry agent, in preview.",
   "say": "First, the specialist. Microsoft Foundry is the Azure platform where teams build agents with their own code and models. The data team built the Incident Analyst there, not in Copilot Studio. Copilot Studio can invoke one of those agents, so Nexo reuses the work of another team. Keep one detail in mind: this capability is in preview."
  },
  {
   "title": "How to add it",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">How to add it</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Path</span><span style=\"text-align:right\">Agents · Add an agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Connect to an external agent · Microsoft Foundry</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connection</span><span style=\"text-align:right\">Foundry project endpoint</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Details</span><span style=\"text-align:right\">Name, description, Agent Id</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Description</span><span style=\"text-align:right\">Tells the main agent when to invoke it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent Id later</span><span style=\"text-align:right\">Adjust it from the details page</span></div></div>",
   "caption": "Agents, Add an agent, Connect to an external agent, Microsoft Foundry. The connection needs the Foundry project endpoint; then name, description, Agent Id.",
   "say": "Now Valeria, the developer, adds it. In Nexo, she goes to Agents, Add an agent, Connect to an external agent, and chooses Microsoft Foundry. The connection needs the Foundry project endpoint, the address of the data team's project. Then she enters a name, a description, and the Agent Id, the identifier of the agent in Foundry. The description tells Nexo when to invoke it. Later, she can adjust the Agent Id from the details page."
  },
  {
   "title": "Requirement one: Activity protocol",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Requirement 1: Activity protocol</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Must be</span><span style=\"text-align:right\">Activity protocol endpoint enabled</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">New agents expose</span><span style=\"text-align:right\">Only Responses and A2A</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Enable Activity with</span><span style=\"text-align:right\">REST API or Python SDK</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Foundry portal</span><span style=\"text-align:right\">Still shows only Responses and A2A</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Missing</span><span style=\"text-align:right\">400 · endpoint does not support activity</span></div></div>",
   "caption": "The Foundry agent must have the Activity protocol enabled. New agents expose only Responses and A2A. Enable Activity only with REST API or Python SDK.",
   "say": "First requirement, the Activity protocol. The Foundry agent must have the Activity protocol endpoint enabled. But new agents expose only Responses and A two A by default. You can enable Activity only with the R E S T A P I or the Python S D K. The portal still shows only Responses and A two A. If Activity is missing, you get a four hundred error: the endpoint does not support activity."
  },
  {
   "title": "Decide: the missing channel",
   "caption": "Valeria gets the 400 error. The Foundry portal shows only Responses and A2A. Where can she enable the Activity protocol?",
   "say": "Your turn. Valeria connects the Incident Analyst and gets the four hundred error. She opens the Foundry portal and sees only Responses and A two A. Where can she enable the Activity protocol? In the connection form? In the Foundry portal? Or with the Python S D K? Decide before I answer. With the Python S D K. Only the R E S T A P I or the Python S D K can enable it. The portal is the trap: it still shows only Responses and A two A."
  },
  {
   "title": "Requirement two: the new portal",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Requirement 2: the new portal</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Works</span><span style=\"text-align:right\">Agents created in the new Foundry portal</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Previous portal</span><span style=\"text-align:right\">404 · Version not found</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Before connecting</span><span style=\"text-align:right\">Check where the agent was created</span></div></div>",
   "caption": "Only agents created in the new Foundry portal work. An agent from the previous portal gives error 404, Version not found.",
   "say": "Second requirement, the portal. Only agents created in the new Foundry portal work. The data team also has an older test agent, created in the previous portal. If Valeria connects that one, the error is four hundred four, Version not found. Remember the pair: an agent from the new portal can connect; an agent from the previous portal gives four hundred four. So check where the agent was created."
  },
  {
   "title": "Reading the error code",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">To diagnose</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">400 · endpoint does not support activity</span><span style=\"text-align:right\">Activity protocol not enabled</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">404 · Version not found</span><span style=\"text-align:right\">Agent from the old portal</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trap</span><span style=\"text-align:right\">Looking for Activity in the portal</span></div></div>",
   "caption": "Error 400, endpoint does not support activity: enable the Activity protocol. Error 404, Version not found: the agent is from the old portal.",
   "say": "Now you can diagnose by reading the error code. Four hundred, endpoint does not support activity, means the Activity protocol is not enabled. Four hundred four, Version not found, means the agent was created in the old portal. And here is the classic trap: looking for the Activity protocol in the portal. It does not appear there; only Responses and A two A do."
  },
  {
   "title": "Decide: the older agent",
   "caption": "Valeria connects the data team's older test agent and sees 404, Version not found. What is the most likely cause?",
   "say": "Your turn. The data team offers an older test agent. When Valeria connects it, she sees four hundred four, Version not found. What is the most likely cause? The Activity protocol is off? It was built in the old portal? Or its description is far too vague? Decide before I answer. It was built in the old portal. Only agents created in the new Foundry portal work, and the old portal gives four hundred four. The Activity protocol is the trap: without it, the error is four hundred."
  },
  {
   "title": "The fix at Contoso",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The fix at Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Error</span><span style=\"text-align:right\">400 · endpoint does not support activity</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Portal showed</span><span style=\"text-align:right\">Only Responses and A2A</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fix</span><span style=\"text-align:right\">Python SDK enables the Activity protocol</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Connection with the project endpoint works</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Result</span><span style=\"text-align:right\">Nexo hands over complex incidents</span></div></div>",
   "caption": "Contoso enables the Activity protocol with the Python SDK. The connection with the project endpoint works, and Nexo hands over complex incidents.",
   "say": "Back to Contoso. When Valeria first connected the Incident Analyst, she got the four hundred error: the endpoint does not support activity. She checked the portal and saw only Responses and A two A. So they used the Python S D K to enable the Activity protocol. After that, the connection with the project endpoint worked. Now Nexo hands complex incidents over to the Incident Analyst."
  },
  {
   "title": "In Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Create the agent in the new Foundry portal</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Check its endpoints: Responses and A2A by default</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Enable Activity with the REST API or Python SDK</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Copilot Studio: Agents · Add an agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Connect to an external agent · Microsoft Foundry</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Connection with the Foundry project endpoint</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">7</span><span style=\"text-align:right\">Name, description, Agent Id · test</span></div></div>",
   "caption": "New portal agent, Activity enabled via REST API or Python SDK. Then Agents, Add an agent, Microsoft Foundry, project endpoint, name, description, Agent Id, test.",
   "say": "Here are the steps. Create the agent in the new Foundry portal, not the previous one. Check which endpoints it exposes: by default, Responses and A two A. Enable the Activity protocol endpoint with the R E S T A P I or the Python S D K. In Copilot Studio, open Agents and select Add an agent. Choose Connect to an external agent, then Microsoft Foundry. Create the connection with the Foundry project endpoint. Enter the name, the description, and the Agent Id, and test it."
  },
  {
   "title": "Decide: the last field",
   "caption": "The agent has Activity enabled and comes from the new portal. Valeria has the project endpoint, name and description. What else identifies the agent?",
   "say": "Your turn. The Incident Analyst now has Activity and comes from the new portal. Valeria fills in the connection with the Foundry project endpoint, a name, and a description. What else does she enter to identify the agent? Its Foundry Agent Id? The Responses endpoint? Or an A P I key for it? Decide before I answer. Its Foundry Agent Id. The Agent Id identifies the agent in Foundry. The Responses endpoint is the trap: the connection uses the project endpoint."
  },
  {
   "title": "Specialist on the air",
   "caption": "Activity protocol via REST API or Python SDK, agents from the new portal. 400 means Activity is missing; 404 means the old portal.",
   "say": "Back to Marta. She reports a complex incident, and Nexo hands it over to the Incident Analyst in Foundry. Remember for the exam: the Foundry agent needs the Activity protocol, enabled only with the R E S T A P I or the Python S D K. It must come from the new portal. Four hundred means Activity is missing; four hundred four means the old portal. Next, A two A agents."
  }
 ],
 "check": [
  {
   "stem": "What do you need to connect a Foundry agent?",
   "options": [
    "An Excel sheet with all the agent names",
    "A test set with expected answers",
    "The Foundry project endpoint and the Agent Id",
    "A pipeline in Power Platform"
   ],
   "answer": 2,
   "explanation": "The connection uses the project endpoint, and you enter the Agent Id."
  },
  {
   "stem": "Error 404 Version not found. What is the most likely cause?",
   "options": [
    "Key Vault is missing from the solution",
    "The agent is a child agent",
    "An API key is missing in the connection",
    "The agent was made in the old portal"
   ],
   "answer": 3,
   "explanation": "Only agents from the new portal work; the old one gives 404."
  },
  {
   "stem": "How do you enable the Activity protocol?",
   "options": [
    "With the REST API or the Python SDK",
    "You cannot",
    "With one click in the portal",
    "With a topic node and a flow"
   ],
   "answer": 0,
   "explanation": "Only through the REST API or the Python SDK; the portal does not show it."
  },
  {
   "stem": "Which endpoints does a new Foundry agent expose by default?",
   "options": [
    "None of the endpoints",
    "Responses and A2A",
    "Only the Activity endpoint",
    "Only the MCP endpoint"
   ],
   "answer": 1,
   "explanation": "By default, only Responses and A2A."
  }
 ],
 "reto": {
  "text": "Create a simple agent in the new Foundry portal.\nCheck which endpoints it exposes.\nConnect it from Copilot Studio and fix the error if one appears.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent"
},
{
 "id": "L31",
 "module": 5,
 "title": "A2A agents",
 "level": "exam",
 "minutes": 11,
 "skills": [
  "2.3e"
 ],
 "theory": {
  "intro": "A2A (Agent to Agent) is a standard that lets agents built with different frameworks work together, like two people who speak different languages but agree on a common protocol. It supports multi-turn conversations and rich metadata. Copilot Studio can connect to an external A2A agent.",
  "sections": [
   {
    "heading": "How to connect",
    "body": "In Agents, Add agent, A2A agent, you paste the URL of the agent's endpoint, not the agent card's URL.\n\nIf a valid agent card exists at the path /.well-known/agent.json, the name and description fill in by themselves. If not, you write a good description.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Copilot Studio</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">agent</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">A2A</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">endpoint</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">External</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">agent</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Agent card: /.well-known/agent.json</text></svg>"
   },
   {
    "heading": "Authentication",
    "body": "You can choose None, API key (in header or query), or OAuth 2.0 (client ID, secret, authorization, token, and refresh URLs)."
   },
   {
    "heading": "What travels and how to develop",
    "body": "The message includes a contextId, message identifiers, the language, and the full conversation history in the metadata. For development, expose your local agent with Dev Tunnels and make the port public.\n\nA2A uses the custom connectors infrastructure, so it can reach agents that are on-premises or in virtual networks.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Add agent, A2A agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Endpoint</span><span style=\"text-align:right\">the agent's, not the agent card</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">None, API key, or OAuth 2.0</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Local development</span><span style=\"text-align:right\">Dev Tunnels, public port</span></div></div>"
   },
   {
    "heading": "When to use A2A and when something else",
    "body": "A2A: flows between agents. Connector or HTTP: simple APIs. MCP: tools and resources. Activity Protocol: agents built with the Microsoft 365 Agents SDK."
   }
  ],
  "steps": [
   "Find out the URL of the A2A agent's endpoint (not the agent card's).",
   "In Copilot Studio, open the agent and go to Agents.",
   "Select Add agent and choose A2A agent.",
   "Paste the endpoint URL.",
   "Check the name and description; if they did not fill in, write a good description.",
   "Choose the authentication: None, API key, or OAuth 2.0.",
   "If the agent is local, expose it with Dev Tunnels using a public port, and connect."
  ],
  "example": "Contoso has a logistics agent built with another framework and hosted in a virtual network. In Copilot Studio they use Add agent, A2A agent, and paste the endpoint URL. Because it has a valid agent card, the name and description fill in by themselves. They choose an API key in the header. During development, they exposed their local agent with Dev Tunnels. To check the status of a shipment, they use A2A; for a simple pricing API, they use an HTTP connector.",
  "examTips": [
   "Paste the endpoint URL, not the agent card's.",
   "A2A for flows between agents; HTTP or connector for simple APIs; MCP for tools and resources; Activity Protocol for the Microsoft 365 Agents SDK.",
   "The contextId and the chat history travel in the metadata."
  ],
  "glossary": [
   {
    "term": "A2A",
    "def": "Agent to Agent: a standard that lets agents from different frameworks work together."
   },
   {
    "term": "Agent card",
    "def": "The agent's profile at /.well-known/agent.json, with its name and description."
   },
   {
    "term": "contextId",
    "def": "An identifier that keeps the context of a conversation between agents."
   },
   {
    "term": "Dev Tunnels",
    "def": "A way to expose a local agent with a public URL for development."
   }
  ]
 },
 "scenes": [
  {
   "title": "Where is my shipment?",
   "caption": "Marta asks Nexo about a shipment. Contoso's logistics agent was built with another framework and is hosted in a virtual network.",
   "say": "Monday at Contoso. Marta asks Nexo, the blue robot agent, where her shipment is. The answer lives in another agent. Contoso has a logistics agent, built with another framework and hosted in a virtual network. Valeria, the developer, wants the two agents to work together. For that she will use A two A. In this class you will see how to connect it, how it authenticates, and when to choose it."
  },
  {
   "title": "A common protocol",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">A2A · Agent to Agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">A standard for agents from different frameworks</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Like</span><span style=\"text-align:right\">Two languages, one common protocol</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Supports</span><span style=\"text-align:right\">Multi-turn conversations and rich metadata</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot Studio</span><span style=\"text-align:right\">Can connect to an external A2A agent</span></div></div>",
   "caption": "A2A, Agent to Agent, is a standard that lets agents from different frameworks work together, with multi-turn conversations and rich metadata.",
   "say": "A two A means Agent to Agent. It is a standard that lets agents built with different frameworks work together. Picture two diplomats who speak different languages but agree on a common protocol. Nexo is a Copilot Studio agent; the logistics agent comes from another framework; A two A is the protocol they share. It supports multi-turn conversations and rich metadata. And Copilot Studio can connect to an external A two A agent."
  },
  {
   "title": "How to connect",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">How to connect</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Path</span><span style=\"text-align:right\">Agents · Add agent · A2A agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Paste</span><span style=\"text-align:right\">The endpoint URL</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not</span><span style=\"text-align:right\">The agent card URL</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent card</span><span style=\"text-align:right\">/.well-known/agent.json</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Valid card</span><span style=\"text-align:right\">Name and description fill in</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">No card</span><span style=\"text-align:right\">Write a good description</span></div></div>",
   "caption": "Agents, Add agent, A2A agent. Paste the endpoint URL, not the agent card's. With a valid agent card, name and description fill in.",
   "say": "Valeria opens Nexo in Copilot Studio and goes to Agents. She selects Add agent and chooses A two A agent. Now the key detail. She pastes the U R L of the agent's endpoint, not the U R L of the agent card. The agent card is the agent's profile, at the path well known, agent dot json. If a valid agent card exists there, the name and description fill in by themselves. If not, she writes a good description."
  },
  {
   "title": "Authentication",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Authentication</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">None</span><span style=\"text-align:right\">No authentication</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">API key</span><span style=\"text-align:right\">In the header or the query</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">OAuth 2.0</span><span style=\"text-align:right\">Client ID, secret</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">OAuth 2.0 URLs</span><span style=\"text-align:right\">Authorization, token, refresh</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Contoso</span><span style=\"text-align:right\">API key in the header</span></div></div>",
   "caption": "Authentication: None, API key in the header or query, or OAuth 2.0 with client ID, secret, and authorization, token and refresh URLs.",
   "say": "Next, authentication. Valeria has three choices. None, with no authentication at all. A P I key, sent in the header or in the query. Or O Auth two point zero, which asks for a client I D, a secret, and the authorization, token, and refresh U R Ls. For the logistics agent, Contoso chooses an A P I key in the header. Remember the three names: None, A P I key, and O Auth two point zero."
  },
  {
   "title": "Decide: which address",
   "caption": "The logistics team sends Valeria two addresses: the endpoint and the agent card. Which one does she paste in the A2A agent form?",
   "say": "Your turn. The logistics team sends Valeria two addresses. One is the endpoint; the other is the agent card. Which one does she paste in the A two A agent form? The agent card U R L? The endpoint U R L? Or the team's web page? Decide before I answer. The endpoint U R L. You paste the address of the agent's endpoint, not the agent card's. The agent card is the trap: it only fills in the name and description."
  },
  {
   "title": "What travels",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">What travels</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">contextId</span><span style=\"text-align:right\">Keeps the context between agents</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Message identifiers</span><span style=\"text-align:right\">One per message</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Language</span><span style=\"text-align:right\">In the metadata</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">History</span><span style=\"text-align:right\">The full conversation history</span></div></div>",
   "caption": "Each A2A message carries a contextId, message identifiers, the language, and the full conversation history in the metadata.",
   "say": "Now, what travels with each message. Marta asks a follow up question: and when will it arrive? A two A supports multi-turn conversations. The message includes a context I D, message identifiers, the language, and the full conversation history, all in the metadata. The context I D keeps the context of the conversation between the two agents. So the logistics agent receives the whole history, not just the last question."
  },
  {
   "title": "Development and reach",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Development and reach</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Local agent</span><span style=\"text-align:right\">Expose it with Dev Tunnels</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Port</span><span style=\"text-align:right\">Make it public</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Dev Tunnels</span><span style=\"text-align:right\">A public URL for development</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Infrastructure</span><span style=\"text-align:right\">Custom connectors</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Reaches</span><span style=\"text-align:right\">On-premises and virtual network agents</span></div></div>",
   "caption": "For development, expose a local agent with Dev Tunnels and a public port. A2A uses custom connectors, so it reaches on-premises and virtual network agents.",
   "say": "Two more facts. First, development. While the logistics agent was still being built, it ran locally. To connect it, the team exposed the local agent with Dev Tunnels and made the port public. Dev Tunnels gives a local agent a public U R L for development. Second, reach. A two A uses the custom connectors infrastructure, so it can reach agents that are on-premises or in virtual networks. That is how Nexo reaches the logistics agent."
  },
  {
   "title": "Decide: the local copy",
   "caption": "Valeria runs a test copy of the logistics agent on her laptop. Copilot Studio must reach that local agent. What should she do?",
   "say": "Your turn. While she is still building, Valeria runs a test copy of the logistics agent on her own laptop. Copilot Studio must reach that local agent. What should she do? Paste its local address? Set authentication to None? Or expose it via Dev Tunnels? Decide before I answer. Expose it via Dev Tunnels, with a public port. Dev Tunnels gives the local agent a public U R L for development. The local address is the trap: only Dev Tunnels with a public port exposes the local agent."
  },
  {
   "title": "Which one to use",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">What to use when</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Flows between agents</span><span style=\"text-align:right\">A2A</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Simple APIs</span><span style=\"text-align:right\">Connector or HTTP</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tools and resources</span><span style=\"text-align:right\">MCP</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft 365 Agents SDK agents</span><span style=\"text-align:right\">Activity Protocol</span></div></div>",
   "caption": "A2A for flows between agents. Connector or HTTP for simple APIs. MCP for tools and resources. Activity Protocol for Microsoft 365 Agents SDK agents.",
   "say": "Now, when to use A two A and when something else. A two A is for flows between agents, like checking the status of a shipment with the logistics agent. A connector or H T T P is for simple A P Is. M C P is for tools and resources. And Activity Protocol is for agents built with the Microsoft three six five Agents S D K. This comparison shows up a lot in exam questions."
  },
  {
   "title": "In Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Find the endpoint URL, not the agent card's</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Copilot Studio: open the agent · Agents</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Add agent · A2A agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Paste the endpoint URL</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Check name and description, or write one</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Authentication: None, API key or OAuth 2.0</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">7</span><span style=\"text-align:right\">Local agent: Dev Tunnels, public port · connect</span></div></div>",
   "caption": "Endpoint URL, Agents, Add agent, A2A agent, paste it, check name and description, choose authentication, and Dev Tunnels if local.",
   "say": "Here are the steps. Find out the U R L of the logistics agent's endpoint, not the agent card's. In Copilot Studio, open Nexo and go to Agents. Select Add agent and choose A two A agent. Paste the endpoint U R L. Check the name and description; if they did not fill in, write a good description. Choose the authentication: None, A P I key, or O Auth two point zero. If the agent is local, expose it with Dev Tunnels using a public port, and connect."
  },
  {
   "title": "Decide: the pricing API",
   "caption": "Marta also wants prices. Contoso has a simple pricing API. What should Valeria use to call it?",
   "say": "Your turn. Marta also wants prices. Contoso has a simple pricing A P I. What should Valeria use to call it? An H T T P connector? A second A two A agent? Or a new M C P server? Decide before I answer. An H T T P connector. Simple A P Is use a connector or H T T P. A two A is the trap: it is for flows between agents, and M C P is for tools and resources."
  },
  {
   "title": "Two agents, one protocol",
   "caption": "Paste the endpoint URL, not the agent card's. A2A for agents, HTTP for simple APIs, MCP for tools, Activity Protocol for the Agents SDK.",
   "say": "Back to Marta. She asks where her shipment is, and Nexo asks the logistics agent over A two A, with the full history in the metadata. For prices, Nexo uses the H T T P connector. Remember for the exam: paste the endpoint U R L, not the agent card's. A two A for flows between agents, H T T P or a connector for simple A P Is, M C P for tools, and Activity Protocol for the Agents S D K. Next, Fabric data agents."
  }
 ],
 "check": [
  {
   "stem": "Which URL do you paste when adding an A2A agent?",
   "options": [
    "The SharePoint document library one",
    "The agent's endpoint",
    "The Azure portal's login page",
    "The agent card's JSON URL"
   ],
   "answer": 1,
   "explanation": "You paste the endpoint URL, not the agent card's."
  },
  {
   "stem": "What is Dev Tunnels for?",
   "options": [
    "Exposing a local agent",
    "Encrypting secrets in Key Vault",
    "Exporting solutions to production",
    "Evaluating agents with test sets"
   ],
   "answer": 0,
   "explanation": "It exposes the local agent with a public port for development."
  },
  {
   "stem": "What travels in the metadata of an A2A message?",
   "options": [
    "The publisher and its contact list",
    "The contextId and chat history",
    "Nothing at all",
    "Only the password and the API key"
   ],
   "answer": 1,
   "explanation": "The contextId, identifiers, and the full conversation history travel there."
  },
  {
   "stem": "What is best for a simple API?",
   "options": [
    "Connector or HTTP",
    "A2A agent link",
    "Deployment pipelines",
    "Fabric data agent over the lakehouse"
   ],
   "answer": 0,
   "explanation": "A2A is for flows between agents; simple APIs use a connector or HTTP."
  }
 ],
 "reto": {
  "text": "Write down what endpoint a sample A2A agent would have.\nOpen Add agent, A2A agent and review the fields.\nIf you have a local agent, expose it with Dev Tunnels and connect it.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
},
{
 "id": "L32",
 "module": 5,
 "title": "Fabric data agents",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "2.3d"
 ],
 "theory": {
  "intro": "A Fabric data agent answers natural language questions about your Microsoft Fabric data. It is like an analyst who turns your question into a query and brings you the result. It only reads, never changes data, and uses your own permissions.",
  "sections": [
   {
    "heading": "What it does",
    "body": "It translates the question into read-only queries (NL2SQL, NL2DAX, or NL2KQL) and runs them with the user's credentials. It can use up to 5 data sources: warehouse, lakehouse, Power BI semantic model, KQL database, mirrored database, ontology, or Microsoft Graph.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Question</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Fabric</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">data agent</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">SQL / DAX</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">/ KQL</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Data</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Read-only, user's credentials</text></svg>"
   },
   {
    "heading": "Requirements",
    "body": "It needs a paid Fabric capacity of F2 or higher (or Power BI Premium P1 or higher with Fabric enabled). The trial is not enough.\n\nIn Copilot Studio, you add it as an external agent (preview)."
   },
   {
    "heading": "Result limits",
    "body": "Answers are limited to 25 rows by 25 columns. It works only in English, and you cannot change the language model.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Fabric data agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Data sources</span><span style=\"text-align:right\">up to 5</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Maximum answer</span><span style=\"text-align:right\">25 rows by 25 columns</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Capacity</span><span style=\"text-align:right\">Fabric F2 or higher</span></div></div>"
   },
   {
    "heading": "Limitations in Copilot Studio",
    "body": "It cannot be the target of a Redirect node or be referenced in the instructions. It does not work if the main agent is deployed in Microsoft Copilot. And Agent evaluation does not support it."
   }
  ],
  "steps": [
   "Confirm that your organization has a paid Fabric capacity of F2 or higher.",
   "In Fabric, create the Fabric data agent and choose its sources (up to 5).",
   "Publish the data agent in Fabric.",
   "In Copilot Studio, open Agents and select Add agent to connect it as an external agent (preview).",
   "Write a good description.",
   "Test questions in English, for example sales for the quarter.",
   "Remember that you cannot redirect to it from a topic or reference it in the instructions."
  ],
  "example": "Contoso's director asks, in English, what the sales by region were for the quarter. The Copilot Studio agent hands the question to a Fabric data agent connected as an external agent. It turns the question into a read-only query on the lakehouse, using the director's credentials, and answers with a table of up to 25 rows by 25 columns. For this they need an F2 capacity or higher, because the trial is not enough.",
  "examTips": [
   "Limitations: no Redirect node, no reference in instructions, does not work in Microsoft Copilot, English only, cannot change the LLM.",
   "It requires a paid capacity of F2 or higher; the trial is not enough.",
   "Maximum 25 rows by 25 columns; read-only."
  ],
  "glossary": [
   {
    "term": "NL2SQL",
    "def": "Translation of natural language into an SQL query."
   },
   {
    "term": "Lakehouse",
    "def": "A Fabric data store with tables (not just loose files)."
   },
   {
    "term": "F2 capacity",
    "def": "The minimum paid Fabric level required."
   },
   {
    "term": "Read-only",
    "def": "The agent queries data but does not change it."
   }
  ]
 },
 "scenes": [
  {
   "title": "Ask your data",
   "caption": "Contoso's director asks Nexo, in English, for the sales by region for the quarter. The numbers live in Contoso's Fabric lakehouse.",
   "say": "Friday at Contoso. The director asks Nexo, the blue robot agent, a question in English. What were the sales by region for the quarter? The numbers live in Contoso's Microsoft Fabric data, in a lakehouse. Valeria, the developer, will connect a Fabric data agent to Nexo. In this class you will see what it does, what it needs, and the limits that the exam asks about."
  },
  {
   "title": "What it does",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Fabric data agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What</span><span style=\"text-align:right\">Answers natural language questions about Fabric data</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Like</span><span style=\"text-align:right\">An analyst who turns your question into a query</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Writing</span><span style=\"text-align:right\">Read-only · never changes data</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Credentials</span><span style=\"text-align:right\">The user's own permissions</span></div></div>",
   "caption": "A Fabric data agent answers natural language questions about Fabric data. It only reads, never changes data, and uses the user's own credentials.",
   "say": "A Fabric data agent answers natural language questions about your Microsoft Fabric data. It is like an analyst who turns your question into a query and brings you the result. Two rules matter from the start. It only reads, it never changes data. And it uses the credentials of the person asking, so it works with their own permissions."
  },
  {
   "title": "Queries and sources",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Queries and sources</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Queries</span><span style=\"text-align:right\">NL2SQL, NL2DAX, NL2KQL · read-only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Runs with</span><span style=\"text-align:right\">The user's credentials</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Sources</span><span style=\"text-align:right\">Up to 5</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Choices</span><span style=\"text-align:right\">Warehouse, lakehouse, Power BI semantic model</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Also</span><span style=\"text-align:right\">KQL database, mirrored database, ontology, Microsoft Graph</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Lakehouse</span><span style=\"text-align:right\">A Fabric data store with tables</span></div></div>",
   "caption": "It translates questions into read-only NL2SQL, NL2DAX or NL2KQL queries, and can use up to five data sources, such as a lakehouse.",
   "say": "How does it query? It translates the question into read-only queries: N L two S Q L, N L two D A X, or N L two K Q L. Then it runs them with the user's credentials. It can use up to five data sources. The choices are a warehouse, a lakehouse, a Power B I semantic model, a K Q L database, a mirrored database, an ontology, or Microsoft Graph. For the director, the source is the lakehouse, a Fabric data store with tables."
  },
  {
   "title": "Decide: the wrong figure",
   "caption": "Marta spots a wrong sales figure in the lakehouse and asks the data agent to correct it. What does the data agent do?",
   "say": "Your turn. Marta spots a wrong sales figure in the lakehouse. She asks the data agent to correct it. What does the data agent do? It updates the lakehouse table? It asks for admin rights first? Or it only reads, never changes? Decide before I answer. It only reads, never changes. A Fabric data agent runs read-only queries with the user's credentials. Updating the table is the trap, because the agent queries data but never changes it."
  },
  {
   "title": "Result limits",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Result limits</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Maximum answer</span><span style=\"text-align:right\">25 rows by 25 columns</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Language</span><span style=\"text-align:right\">English only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Language model</span><span style=\"text-align:right\">Cannot be changed</span></div></div>",
   "caption": "Answers are limited to 25 rows by 25 columns. It works only in English, and you cannot change the language model.",
   "say": "Now, the result limits. An answer is limited to twenty-five rows by twenty-five columns. So think of short summaries, like sales by region, not endless lists. It works only in English. If Marta asks in Spanish, the agent does not support it. And you cannot change the language model it uses. Remember the three: twenty-five by twenty-five, English only, and a fixed language model."
  },
  {
   "title": "Requirements",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Requirements</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fabric</span><span style=\"text-align:right\">Paid capacity, F2 or higher</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Alternative</span><span style=\"text-align:right\">Power BI Premium P1 or higher with Fabric enabled</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trial</span><span style=\"text-align:right\">Not enough</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">In Fabric</span><span style=\"text-align:right\">Create and publish the data agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Copilot Studio</span><span style=\"text-align:right\">External agent (preview)</span></div></div>",
   "caption": "It needs a paid Fabric capacity of F2 or higher, or Power BI Premium P1 or higher with Fabric. The trial is not enough.",
   "say": "What does it need? A paid Fabric capacity of F two or higher. Or Power B I Premium, P one or higher, with Fabric enabled. The trial is not enough. Valeria checks with the administrator, and Contoso has an F two capacity. The data agent is created and published in Fabric. Then, in Copilot Studio, Valeria adds it as an external agent, in preview."
  },
  {
   "title": "Decide: the trial workspace",
   "caption": "Valeria's own test workspace only has a Fabric trial. What does the Fabric data agent need?",
   "say": "Your turn. Valeria wants to try the data agent in her own test workspace. That workspace only has a Fabric trial. What does the data agent need? The Fabric trial capacity? A paid F two or higher? Or any free Power B I license? Decide before I answer. A paid F two or higher. The data agent requires a paid Fabric capacity of F two or higher, or Power B I Premium with Fabric enabled. The trial capacity is the trap, because the trial is not enough."
  },
  {
   "title": "Limits in Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Limits in Copilot Studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Redirect node</span><span style=\"text-align:right\">Cannot target it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">Cannot reference it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft Copilot</span><span style=\"text-align:right\">Does not work if the main agent is deployed there</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent evaluation</span><span style=\"text-align:right\">Does not support it</span></div></div>",
   "caption": "In Copilot Studio it cannot be a Redirect target or referenced in instructions, fails in Microsoft Copilot, and Agent evaluation does not support it.",
   "say": "Now the limitations in Copilot Studio, the ones that get asked. First, a Fabric data agent cannot be the target of a Redirect node. Second, it cannot be referenced in the instructions. Third, it does not work if the main agent is deployed in Microsoft Copilot. And Agent evaluation does not support it. So Nexo reaches it only as an external agent, never through a Redirect node."
  },
  {
   "title": "The director's answer",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The director's answer</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Question</span><span style=\"text-align:right\">Sales by region for the quarter, in English</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Via</span><span style=\"text-align:right\">Nexo · external agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Query</span><span style=\"text-align:right\">Read-only, on the lakehouse</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Credentials</span><span style=\"text-align:right\">The director's</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Answer</span><span style=\"text-align:right\">A table, up to 25 rows by 25 columns</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Capacity</span><span style=\"text-align:right\">F2</span></div></div>",
   "caption": "Nexo hands the question to the Fabric data agent. It runs a read-only lakehouse query with the director's credentials and returns a table.",
   "say": "Back to the director's question. Nexo hands it to the Fabric data agent, connected as an external agent. The data agent turns the question into a read-only query on the lakehouse. It runs the query with the director's credentials. And it answers with a table of up to twenty-five rows by twenty-five columns: the sales by region for the quarter. All of this works because Contoso has an F two capacity."
  },
  {
   "title": "Decide: the sales topic",
   "caption": "Valeria builds a topic for sales questions and wants it to send every question to the data agent. Which of these can she not do?",
   "say": "Your turn. Valeria builds a topic for sales questions. She wants that topic to send every question to the data agent. Which of these can she not do? Redirect to it from a topic? Connect it as an external agent? Or ask it questions in English? Decide before I answer. Redirect to it from a topic. A Fabric data agent cannot be the target of a Redirect node, or be referenced in the instructions. Connecting it as an external agent is the trap, because that is how you add it."
  },
  {
   "title": "In Fabric and Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Confirm a paid Fabric capacity, F2 or higher</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Fabric: create the data agent · sources (up to 5)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Publish the data agent in Fabric</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Copilot Studio: Agents · Add agent · external agent (preview)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Write a good description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Test questions in English</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">7</span><span style=\"text-align:right\">No Redirect from a topic · no reference in instructions</span></div></div>",
   "caption": "Check for F2 or higher, create and publish the data agent in Fabric, then Agents, Add agent, a good description, and English test questions.",
   "say": "Here are the steps. Confirm that your organization has a paid Fabric capacity of F two or higher. In Fabric, create the Fabric data agent and choose its sources, up to five. Publish the data agent in Fabric. In Copilot Studio, open Agents and select Add agent, to connect it as an external agent, in preview. Write a good description. Test questions in English, for example sales for the quarter. And remember: no redirect to it from a topic, and no reference in the instructions."
  },
  {
   "title": "Ask, read, answer",
   "caption": "Read-only, up to five sources, 25 rows by 25 columns, English only, paid F2 or higher. No Redirect, no instructions reference, not in Microsoft Copilot.",
   "say": "Back to the director. A question in English, a read-only query on the lakehouse, the director's own credentials, and a table of sales by region. Remember for the exam: read-only, up to five sources, twenty-five rows by twenty-five columns, English only, and you cannot change the language model. It needs a paid capacity of F two or higher, because the trial is not enough. No Redirect node, no reference in the instructions, and it does not work in Microsoft Copilot. Next, Foundry models in prompts."
  }
 ],
 "check": [
  {
   "stem": "What kind of queries does a Fabric data agent run?",
   "options": [
    "None",
    "Read-only",
    "Ones that change data",
    "Delete only"
   ],
   "answer": 1,
   "explanation": "It generates read-only queries (NL2SQL, NL2DAX, NL2KQL)."
  },
  {
   "stem": "What is the maximum rows by columns in an answer?",
   "options": [
    "No limit",
    "5 by 5",
    "25 by 25",
    "100 by 100"
   ],
   "answer": 2,
   "explanation": "Answers are limited to 25 rows by 25 columns."
  },
  {
   "stem": "What minimum paid Fabric capacity is needed?",
   "options": [
    "F2 or higher",
    "F0",
    "Only the trial",
    "None"
   ],
   "answer": 0,
   "explanation": "It requires F2 or higher (or Power BI Premium P1+ with Fabric)."
  },
  {
   "stem": "What can you not do with a Fabric data agent in Copilot Studio?",
   "options": [
    "Ask it questions in plain English",
    "Redirect to it from a topic",
    "Connect it as an external agent",
    "Use the user's credentials"
   ],
   "answer": 1,
   "explanation": "It cannot be a Redirect target or be referenced in instructions."
  }
 ],
 "reto": {
  "text": "Read which Fabric capacity you would need in your organization.\nWrite down three business questions for a Fabric data agent.\nIf you have F2, try it, and pause the capacity afterwards.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent"
},
{
 "id": "L33",
 "module": 6,
 "title": "Foundry models in prompts",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "2.4b"
 ],
 "theory": {
  "intro": "Bring your own model (BYOM) means using a model you deployed in Microsoft Foundry inside a Copilot Studio prompt. It is like bringing your own tool to the workshop instead of using the one the shop lends you. It works, but with precise rules about which model and which endpoint to use.",
  "sections": [
   {
    "heading": "How to connect it",
    "body": "In a Prompt, open the Model drop-down, select the plus sign, and choose Connect a model from Azure AI Foundry. Type the deployment name and the base model name exactly as they appear in Foundry.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Model requirements</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Type</span><span style=\"text-align:right\">chat completion</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Endpoint ends in</span><span style=\"text-align:right\">/chat/completions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">GPT-5 and later</span><span style=\"text-align:right\">not supported</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Billing</span><span style=\"text-align:right\">Azure, separate</span></div></div>"
   },
   {
    "heading": "Rules the exam asks about",
    "body": "Only chat completion models are supported. The endpoint must end in /chat/completions. If you use a Responses endpoint (/openai/v1/responses), you get the error Resource not found.\n\nModels in the GPT-5 family and later are not supported for these prompts.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Model in</text><text x=\"35.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Foundry</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Model:</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">+ connect</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Prompt</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Resultado</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">chat completion and chat/completions</text></svg>"
   },
   {
    "heading": "Governance and cost",
    "body": "Admins govern it with the Azure AI Foundry connector in the data policies of the Power Platform admin center.\n\nUsage is billed separately in Azure, outside the Copilot Studio rates."
   },
   {
    "heading": "If something fails",
    "body": "Check two things first: the model must be a chat completion model (and not GPT-5 or later), and the endpoint must have the form /chat/completions."
   }
  ],
  "steps": [
   "In Foundry, deploy a chat completion model and note its deployment name and base model name.",
   "In Copilot Studio, open or create a Prompt.",
   "Open the Model drop-down.",
   "Select + and choose Connect a model from Azure AI Foundry.",
   "Type the deployment name and the base model name exactly as in Foundry.",
   "Check that the endpoint ends in /chat/completions.",
   "Test the prompt. If it fails, check the model type and the endpoint."
  ],
  "example": "Contoso deploys its own model in Foundry to classify support tickets by urgency. In a Copilot Studio Prompt, they open Model, select +, and connect the model, copying the exact names. At first they used a Responses endpoint and got Resource not found. They changed it to /chat/completions and it worked. They remember that the charge comes through Azure, not Copilot Studio, and that the security team controls it with the Azure AI Foundry connector.",
  "examTips": [
   "It fails because of: a model in the GPT-5 family or later, or an endpoint that is not /chat/completions.",
   "Trap: thinking it is billed in Copilot Studio. It is billed separately in Azure.",
   "Governance: the Azure AI Foundry connector in the data policies."
  ],
  "glossary": [
   {
    "term": "BYOM",
    "def": "Bring your own model: using your own model deployed in Foundry."
   },
   {
    "term": "Deployment name",
    "def": "The name you gave the model when you deployed it in Foundry."
   },
   {
    "term": "Chat completion",
    "def": "The type of chat model that this feature does support."
   },
   {
    "term": "Endpoint",
    "def": "The web address where requests to the model are sent."
   }
  ]
 },
 "scenes": [
  {
   "title": "Tickets by urgency",
   "caption": "Contoso wants to sort support tickets by urgency with its own model, deployed in Microsoft Foundry, used inside a Copilot Studio prompt.",
   "say": "Monday at Contoso. Support tickets pile up at the service desk, and Marta waits for an answer. Valeria, the developer, wants Nexo, the blue robot agent, to sort each ticket by urgency. For that, her team deployed its own model in Microsoft Foundry. In this class you will see how to bring that model into a Copilot Studio prompt, the rules it must follow, and who pays for it."
  },
  {
   "title": "Bring your own model",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Bring your own model</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">BYOM</span><span style=\"text-align:right\">A model you deployed in Microsoft Foundry</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Used in</span><span style=\"text-align:right\">A Copilot Studio prompt</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Like</span><span style=\"text-align:right\">Bringing your own tool to the workshop</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rules</span><span style=\"text-align:right\">Which model and which endpoint</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Endpoint</span><span style=\"text-align:right\">The web address where requests to the model are sent</span></div></div>",
   "caption": "BYOM means using a model you deployed in Microsoft Foundry inside a Copilot Studio prompt. The endpoint is the web address requests go to.",
   "say": "Bring your own model, or B Y O M, means using a model you deployed in Microsoft Foundry inside a Copilot Studio prompt. It is like bringing your own tool to the workshop, instead of using the one the shop lends you. It works, but with precise rules about which model and which endpoint to use. The endpoint is the web address where requests to the model are sent."
  },
  {
   "title": "How to connect it",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">How to connect it</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">In the Prompt</span><span style=\"text-align:right\">Model drop-down</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">+ · Connect a model from Azure AI Foundry</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Deployment name</span><span style=\"text-align:right\">The name you gave the model when you deployed it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Base model name</span><span style=\"text-align:right\">Exactly as in Foundry</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tip</span><span style=\"text-align:right\">Copy the names, do not type them from memory</span></div></div>",
   "caption": "In a Prompt, open Model, select the plus sign, choose Connect a model from Azure AI Foundry, and type both names exactly.",
   "say": "How do you connect it? In the prompt, open the Model drop-down. Select the plus sign, and choose Connect a model from Azure A I Foundry. Then type two names. The deployment name, which is the name you gave the model when you deployed it, and the base model name. Type both exactly as they appear in Foundry. Copy them, do not type them from memory."
  },
  {
   "title": "Which models work",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Which models work</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Supported</span><span style=\"text-align:right\">Chat completion models only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Chat completion</span><span style=\"text-align:right\">The type of chat model this feature supports</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">GPT-5 family and later</span><span style=\"text-align:right\">Not supported</span></div></div>",
   "caption": "Only chat completion models are supported. Models in the GPT-5 family and later are not supported for these prompts.",
   "say": "Now the first rule that the exam asks about: the model type. Only chat completion models are supported. Chat completion is the type of chat model that this feature does support. And there is a second limit on the model. Models in the G P T five family and later are not supported for these prompts. So, here, newer does not mean supported. Valeria checks that her ticket model is a chat completion model."
  },
  {
   "title": "Decide: which model",
   "caption": "Valeria has several models deployed in Foundry for the ticket classifier. Which one can she connect to her Copilot Studio prompt?",
   "say": "Your turn. Valeria has several models deployed in Foundry for the ticket classifier. She can connect only one kind of them to her prompt. Which model can she connect? A chat completion model? A G P T five family model? Or any model type in Foundry? Decide before I answer. A chat completion model. Only chat completion models are supported, and the G P T five family and later are not. The G P T five family model is the trap, because newer does not mean supported."
  },
  {
   "title": "The endpoint rule",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The endpoint rule</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Must end in</span><span style=\"text-align:right\">/chat/completions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Responses endpoint</span><span style=\"text-align:right\">/openai/v1/responses</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Error</span><span style=\"text-align:right\">Resource not found</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">If it fails</span><span style=\"text-align:right\">Check the model type and the endpoint</span></div></div>",
   "caption": "The endpoint must end in /chat/completions. A Responses endpoint, /openai/v1/responses, gives the error Resource not found.",
   "say": "The second rule is about the endpoint. It must end in slash chat completions. If you use a Responses endpoint, the one that ends in slash openai slash v one slash responses, you get the error Resource not found. The model can be right, and the names can be right, but the address is wrong. So, if something fails, check two things first: the model type, and the endpoint."
  },
  {
   "title": "Valeria's first try",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Valeria's first try</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connect</span><span style=\"text-align:right\">Model · + · exact names from Foundry</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">First endpoint</span><span style=\"text-align:right\">Responses</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Result</span><span style=\"text-align:right\">Resource not found</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fix</span><span style=\"text-align:right\">Endpoint ending in /chat/completions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Now</span><span style=\"text-align:right\">Tickets sorted by urgency</span></div></div>",
   "caption": "Valeria first used a Responses endpoint and got Resource not found. She changed it to /chat/completions, and the prompt worked.",
   "say": "Back to the tickets. Valeria opens Model in her prompt, selects the plus sign, and connects the ticket model, copying the exact names from Foundry. At first she uses a Responses endpoint. The test fails with the error Resource not found. She changes the endpoint so that it ends in slash chat completions. She tests again, and it works: each new ticket from Marta comes back sorted by urgency."
  },
  {
   "title": "Decide: Resource not found",
   "caption": "Valeria connects a second chat completion model to another prompt. The test fails with Resource not found. What should she change?",
   "say": "Your turn. Valeria connects a second chat completion model to another prompt. The test fails with the error Resource not found, and her endpoint is a Responses endpoint. What should she change? Retype the deployment name? Switch to a G P T five model? Or end it in chat completions? Decide before I answer. End it in chat completions. A Responses endpoint gives Resource not found, and the endpoint must end in slash chat completions. Retyping the deployment name is the trap, because here the endpoint is the problem."
  },
  {
   "title": "Governance and billing",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Governance and billing</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Governed by</span><span style=\"text-align:right\">Azure AI Foundry connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Data policies · Power Platform admin center</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">At Contoso</span><span style=\"text-align:right\">The security team</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Billing</span><span style=\"text-align:right\">Separately, in Azure</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not</span><span style=\"text-align:right\">Copilot Studio rates</span></div></div>",
   "caption": "Admins govern it with the Azure AI Foundry connector in data policies, in the Power Platform admin center. Usage is billed separately in Azure.",
   "say": "Two more facts: who controls it, and who pays. Admins govern it with the Azure A I Foundry connector, in the data policies of the Power Platform admin center. At Contoso, the security team controls it there. And the usage is billed separately in Azure, outside the Copilot Studio rates. So the bill for the ticket model arrives through Azure, not through Copilot Studio."
  },
  {
   "title": "Decide: who bills it",
   "caption": "The service manager reviews the costs of the ticket model inside a Copilot Studio prompt. Where is the model usage billed?",
   "say": "Your turn. The service manager reviews the costs of the ticket classifier. The model runs from Foundry, inside a Copilot Studio prompt. Where is the model usage billed? In the Copilot Studio rates? Separately, through Azure? Or per user, in Microsoft Teams? Decide before I answer. Separately, through Azure. The usage of a Foundry model in a prompt is billed separately in Azure, outside the Copilot Studio rates. The Copilot Studio rates are the trap, because this usage is not charged there."
  },
  {
   "title": "In Foundry and Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">The steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Foundry: deploy a chat completion model · note both names</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Copilot Studio: open or create a Prompt</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Open the Model drop-down</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">+ · Connect a model from Azure AI Foundry</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Deployment name and base model name, exactly as in Foundry</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Endpoint ends in /chat/completions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">7</span><span style=\"text-align:right\">Test · if it fails, check model type and endpoint</span></div></div>",
   "caption": "Deploy a chat completion model, open a Prompt, Model, plus, Connect a model from Azure AI Foundry, exact names, /chat/completions, then test.",
   "say": "Here are the steps. In Foundry, deploy a chat completion model and note its deployment name and base model name. In Copilot Studio, open or create a prompt. Open the Model drop-down. Select the plus sign, and choose Connect a model from Azure A I Foundry. Type the deployment name and the base model name exactly as in Foundry. Check that the endpoint ends in slash chat completions. Then test the prompt. If it fails, check the model type and the endpoint."
  },
  {
   "title": "Your own model, the right rules",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Remember</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Model</span><span style=\"text-align:right\">Chat completion only · not GPT-5 or later</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Endpoint</span><span style=\"text-align:right\">/chat/completions · else Resource not found</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Governance</span><span style=\"text-align:right\">Azure AI Foundry connector in data policies</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Billing</span><span style=\"text-align:right\">Separately, in Azure</span></div></div>",
   "caption": "Chat completion only, not GPT-5 or later, endpoint /chat/completions, governed by the Azure AI Foundry connector, billed separately in Azure.",
   "say": "Back to the tickets. Valeria's own model, deployed in Foundry, now sorts Marta's tickets by urgency inside Nexo's prompt. Remember for the exam: chat completion models only, and nothing from the G P T five family or later. The endpoint must end in slash chat completions, or you get Resource not found. The Azure A I Foundry connector governs it in the data policies, and the usage is billed separately in Azure. Next, Application Insights."
  }
 ],
 "check": [
  {
   "stem": "What type of models does BYOM support in prompts?",
   "options": [
    "Audio transcription only",
    "Any type of model at all",
    "Chat completion",
    "Image generation models only"
   ],
   "answer": 2,
   "explanation": "Only chat completion models are supported."
  },
  {
   "stem": "How must the endpoint end?",
   "options": [
    "/mcp",
    "/chat/completions",
    "/v1/docs/index.html",
    "/responses"
   ],
   "answer": 1,
   "explanation": "It must end in /chat/completions. A Responses endpoint gives Resource not found."
  },
  {
   "stem": "Where is the usage of these models billed?",
   "options": [
    "In Copilot Studio",
    "In Teams, per user",
    "It is not billed",
    "In Azure, separately"
   ],
   "answer": 3,
   "explanation": "It is billed separately in Azure."
  },
  {
   "stem": "Which model family is not supported?",
   "options": [
    "None",
    "Models deployed in Foundry",
    "GPT-5 and later",
    "Chat completion models"
   ],
   "answer": 2,
   "explanation": "GPT-5 and later models are not supported in BYOM."
  }
 ],
 "reto": {
  "text": "Deploy a chat model in Foundry.\nConnect it in the Model of a prompt, copying the exact names.\nTry a wrong endpoint to see the error.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts"
},
{
 "id": "L34",
 "module": 6,
 "title": "Application Insights",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "2.4c"
 ],
 "theory": {
  "intro": "Application Insights is an Azure service that records what your agent does, like the black box of an airplane. Later you can query those records to understand what users ask and what decisions the agent makes. You connect it with a connection string.",
  "sections": [
   {
    "heading": "How to turn it on",
    "body": "In Settings, Advanced, Application Insights, paste the Connection string of your resource. Turn on Enable logging and, if you need more detail, three options: Log conversation details (user, name, and message text), Log sensitive Activity properties, and Node execution events (one event for each node that runs).",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agent</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Connection</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">string</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">App</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Insights</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">KQL</text><text x=\"302.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Workbook</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Data goes to customEvents</text></svg>"
   },
   {
    "heading": "Where the data lands",
    "body": "The data arrives in the customEvents table. Every event includes the designMode dimension, which is True when the conversation happened in the test canvas.\n\nTo analyze only real traffic, filter with KQL: customDimensions['designMode'] == \"False\".",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">KQL in Application Insights</div><div style=\"padding:2px 0\">customEvents</div><div style=\"padding:2px 0\">| where customDimensions['designMode'] == \"False\"</div></div>"
   },
   {
    "heading": "Dashboard and sharing",
    "body": "There is a workbook called Copilot Studio Dashboard (preview) in Application Insights, under Workbooks. To share it, you need the Reader role on the resource."
   },
   {
    "heading": "Admin control",
    "body": "To prevent telemetry at the agent level, the admin blocks the Application Insights in Copilot Studio connector in a data policy. Turning off the toggles in one agent is not an admin control. There is also environment-level telemetry (preview), which uses traces and spans."
   },
   {
    "heading": "The Monitor tab (Microsoft Copilot harness)",
    "body": "Application Insights is not the only way to watch an agent. On the Microsoft Copilot harness (formerly GitHub Copilot harness), the Monitor tab shows production health. Open the agent, select Monitor, and set the date range. Percentages compare with the previous period, and an unpublished agent shows empty metrics. After a session ends, its data can take up to an hour to appear.\n\nThe overview shows total sessions, total users, average duration, and success rate, plus autonomous runs and their fail rate. A session is one conversation between a user and the agent. The Reactions card counts thumbs up and thumbs down. If it asks you to turn on feedback, the User feedback setting (Settings, Safety & access) is off.\n\nThe Sessions list shows only the past 28 days, with status (completed, failed, or in progress), the tools used, and credits. You can open a full transcript with tool calls and knowledge use. Total estimated credits used is the number that is used for billing. It updates a few times a day and can be split by experience: production, Preview, and evaluations. Environment-level telemetry in Application Insights works for agents on both harnesses."
   }
  ],
  "steps": [
   "In Azure, create an Application Insights resource and copy its Connection string.",
   "In Copilot Studio, open your agent and go to Settings.",
   "Go to Advanced, in the Application Insights section.",
   "Paste the Connection string.",
   "Turn on Enable logging.",
   "If you need it, turn on Log conversation details, Log sensitive Activity properties, or Node execution events.",
   "Chat with the agent, then query customEvents in Application Insights, filtering on designMode."
  ],
  "example": "Contoso wants to know what real employees ask. They paste the Connection string in Settings, Advanced, and turn on Enable logging. In Application Insights they query the customEvents table and filter with designMode equal to False, to leave out the tests made in the test canvas. They share the Copilot Studio Dashboard workbook with the team by giving them the Reader role. The security team, for its part, can block the telemetry with a data policy.",
  "examTips": [
   "To prevent agent telemetry: block the Application Insights in Copilot Studio connector in a data policy.",
   "Trap: thinking that turning off toggles per agent is an admin control.",
   "designMode True = test canvas; the data goes to customEvents.",
   "Monitor tab (Microsoft Copilot harness): sessions list covers the past 28 days, data can take up to an hour, and the credits shown there are the billing source of truth.",
   "Reactions (thumbs up and down) need the User feedback setting turned on. Environment-level telemetry in Application Insights works on both harnesses."
  ],
  "glossary": [
   {
    "term": "Connection string",
    "def": "The string that identifies your Application Insights resource."
   },
   {
    "term": "customEvents",
    "def": "The table where the agent's events arrive."
   },
   {
    "term": "designMode",
    "def": "A dimension: True if the conversation was in the test canvas."
   },
   {
    "term": "KQL",
    "def": "Query language used to analyze data in Azure."
   }
  ]
 },
 "scenes": [
  {
   "title": "Is Nexo working?",
   "caption": "Contoso's manager asks: what do employees really ask Nexo, and is it working? Half the numbers are tests.",
   "say": "Monday at Contoso. The manager asks the team a simple question about Nexo, the I T agent. What do employees really ask it, and is it working? The team opens the numbers and frowns. Half of the conversations are their own tests from last week. The other half nobody can explain. By the end of this class you will know the two tools that answer that question, and how to keep the tests out."
  },
  {
   "title": "Black box and cockpit",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Black box and cockpit</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Application Insights</span><span style=\"text-align:right\">Records everything, query later (Azure)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Monitor tab</span><span style=\"text-align:right\">Health at a glance (Microsoft Copilot harness)</span></div></div>",
   "caption": "Application Insights = the black box, you query it later. Monitor tab = the cockpit dashboard.",
   "say": "Here is the picture to keep. An airplane has a black box. It records everything, and later an investigator queries it in detail. That is Application Insights, an Azure service. The airplane also has a cockpit dashboard, with the health of the flight at a glance. That is the Monitor tab of the Microsoft Copilot harness, formerly GitHub Copilot harness. One records for deep analysis, the other shows health now."
  },
  {
   "title": "Plug in the black box",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Turn it on</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">Settings › Advanced › Application Insights</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Paste</span><span style=\"text-align:right\">Connection string</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Switch</span><span style=\"text-align:right\">Enable logging</span></div></div>",
   "caption": "Settings › Advanced › Application Insights: paste the Connection string, turn on Enable logging.",
   "say": "First the black box. In Azure, create an Application Insights resource and copy its Connection string. That string identifies your resource. Then, in Copilot Studio, open Nexo and go to Settings, then Advanced, then the Application Insights section. Paste the Connection string and turn on Enable logging. From now on, every conversation leaves a record in Azure. Nothing else in the agent changes."
  },
  {
   "title": "Three extra switches",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Extra switches</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Log conversation details</span><span style=\"text-align:right\">User, name, message text</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Log sensitive Activity properties</span><span style=\"text-align:right\">Sensitive activity details</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Node execution events</span><span style=\"text-align:right\">One event per node that runs</span></div></div>",
   "caption": "Log conversation details, Log sensitive Activity properties, Node execution events: only when you need them.",
   "say": "Below Enable logging there are three more switches. Log conversation details adds the user, the name, and the message text. Log sensitive Activity properties adds sensitive details of each activity. Node execution events adds one event for every node that runs, so you can follow the path inside a topic. More detail means more personal data stored, so turn each one on only when you really need it."
  },
  {
   "title": "customEvents and designMode",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Where the data lands</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Table</span><span style=\"text-align:right\">customEvents</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">designMode True</span><span style=\"text-align:right\">Test canvas</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">designMode False</span><span style=\"text-align:right\">Real users</span></div></div>",
   "caption": "Events land in customEvents. designMode is True when the conversation happened in the test canvas.",
   "say": "Where does the data land? In a table called customEvents. Each event carries a set of dimensions, and one of them matters a lot: designMode. It is True when the conversation happened in the test canvas, the chat you use while building. It is False for real users. This small label is the answer to the Monday mess. The tests are there, but they are marked."
  },
  {
   "title": "Decide: only real employees",
   "caption": "Nexo's numbers mix the makers' tests with real traffic. How do you see only real employees?",
   "say": "Your turn. Nexo's numbers mix the team's tests with real employees. The manager wants only real traffic. What do you do? Delete the old events from the customEvents table? Filter designMode equal to False in the query? Or publish the agent again to reset the counters? Decide before I answer. Filter designMode equal to False. The tests stay recorded but drop out of the query. Deleting loses data, and publishing resets nothing."
  },
  {
   "title": "Querying with K Q L",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">KQL idea</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">From</span><span style=\"text-align:right\">customEvents</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Where</span><span style=\"text-align:right\">customDimensions['designMode'] == \"False\"</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Group by message or topic</span></div></div>",
   "caption": "KQL: customEvents | where customDimensions['designMode'] == \"False\". Then group by message or topic.",
   "say": "The language for those queries is K Q L, the query language of Azure. The idea is short. Start from customEvents, keep only the rows where designMode is False, and then group them, for example by the message text or by topic. Now Contoso sees what employees really ask Nexo, and which questions come back every day. That is the deep analysis the black box is for."
  },
  {
   "title": "A ready dashboard",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Ready dashboard</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Workbook</span><span style=\"text-align:right\">Copilot Studio Dashboard (preview)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Share</span><span style=\"text-align:right\">Reader role on the resource</span></div></div>",
   "caption": "Workbooks › Copilot Studio Dashboard (preview). To share it, give the Reader role on the resource.",
   "say": "You do not have to start from zero. Inside Application Insights, under Workbooks, there is a ready panel called Copilot Studio Dashboard, in preview. It already charts the main numbers of your agent. The manager wants to see it too. To share it, give the Reader role on the Application Insights resource. Reader lets people look at the data without changing anything."
  },
  {
   "title": "Who can switch it off",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Admin control</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Block</span><span style=\"text-align:right\">Application Insights in Copilot Studio connector (data policy)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not admin control</span><span style=\"text-align:right\">Toggles inside one agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Also</span><span style=\"text-align:right\">Environment-level telemetry (preview): traces, spans</span></div></div>",
   "caption": "Admin control = data policy blocking the Application Insights in Copilot Studio connector. Agent toggles are not.",
   "say": "Now the security side. Contoso's security team wants to be sure no agent sends telemetry to Application Insights. Switching off the toggles inside one agent is not an admin control. Any maker could switch them on again. The admin control is a data policy that blocks the connector called Application Insights in Copilot Studio. There is also environment level telemetry, in preview, which uses traces and spans."
  },
  {
   "title": "Decide: no telemetry anywhere",
   "caption": "Security must guarantee that no agent in the environment sends telemetry. Which control?",
   "say": "Your turn. The security team must guarantee that no agent in the environment can send telemetry to Application Insights, not today and not next month. What do they use? Block its connector in a data policy? Turn off Enable logging in every agent? Or remove the Reader role from every maker? Decide before I answer. Block the Application Insights in Copilot Studio connector in a data policy. Toggles can come back, and Reader is only for viewing."
  },
  {
   "title": "The cockpit: Monitor tab",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Monitor tab</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Open</span><span style=\"text-align:right\">Agent › Monitor › date range</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Percentages</span><span style=\"text-align:right\">Vs previous period</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Unpublished</span><span style=\"text-align:right\">Empty metrics</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Delay</span><span style=\"text-align:right\">Up to an hour</span></div></div>",
   "caption": "Microsoft Copilot harness: Monitor tab, date range, compare with previous period. Data can take up to an hour.",
   "say": "Now the cockpit. On the Microsoft Copilot harness, open the agent and select Monitor. Set the date range. Each percentage compares with the previous period of the same length. If the agent was never published, the metrics are empty, because only real use counts. And be patient: after a session ends, its data can take up to an hour to appear."
  },
  {
   "title": "The overview cards",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Overview</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Cards</span><span style=\"text-align:right\">Sessions, users, duration, success rate</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Autonomous</span><span style=\"text-align:right\">Runs and fail rate</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Session</span><span style=\"text-align:right\">One user–agent conversation</span></div></div>",
   "caption": "Total sessions, total users, average duration, success rate, autonomous runs and their fail rate.",
   "say": "The overview shows the health at a glance. Total sessions, total users, average duration, and success rate. A session is one conversation between a user and the agent. If the agent also works on its own, you see autonomous runs and their fail rate. For Contoso this answers the second half of the Monday question: is Nexo working? The success rate says it plainly."
  },
  {
   "title": "Thumbs up, thumbs down",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Reactions</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Counts</span><span style=\"text-align:right\">Thumbs up and down</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Asks to turn on feedback</span><span style=\"text-align:right\">User feedback off (Settings › Safety & access)</span></div></div>",
   "caption": "Reactions card counts thumbs up and down. It asks for feedback when User feedback (Settings › Safety & access) is off.",
   "say": "The Reactions card counts thumbs up and thumbs down from users. One morning the card shows no numbers and asks you to turn on feedback. That means the User feedback setting is off. You find it in Settings, under Safety and access. Turn it on, and employees can react to every answer Nexo gives. Reactions are the cheapest signal you will ever get."
  },
  {
   "title": "Sessions and transcripts",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Sessions list</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Range</span><span style=\"text-align:right\">Past 28 days</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Shows</span><span style=\"text-align:right\">Status, tools used, credits</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Open</span><span style=\"text-align:right\">Full transcript, tool calls, knowledge</span></div></div>",
   "caption": "Sessions list: past 28 days only. Status, tools used, credits. Open a full transcript with tool calls.",
   "say": "Below the cards is the Sessions list. It shows only the past twenty eight days. For each session you see the status, which is completed, failed, or in progress, the tools that were used, and the credits it cost. Open one and you get the full transcript, with every tool call and every use of knowledge. A failed session tells you exactly where Nexo got lost."
  },
  {
   "title": "The billing number",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Billing number</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Total estimated credits used</span><span style=\"text-align:right\">Source of truth for billing</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Split by</span><span style=\"text-align:right\">Production, Preview, evaluations</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Updates</span><span style=\"text-align:right\">A few times a day</span></div></div>",
   "caption": "Total estimated credits used = the number used for billing. Split by production, Preview, evaluations.",
   "say": "One card matters to finance: Total estimated credits used. That is the number used for billing. It updates a few times a day, and you can split it by experience: production, Preview, and evaluations. So you see how much the building and testing cost, apart from real use. And the black box still works here: environment level telemetry in Application Insights works on both harnesses."
  },
  {
   "title": "Decide: the billing figure",
   "caption": "Finance wants the credits Contoso will be billed for this month. Where do you read them?",
   "say": "Your turn. Finance wants the credits Contoso will be billed for this month on Nexo. Where do you get the figure? Add up the credits shown for each listed session? Query the credit events in Application Insights? Or read Total estimated credits used on Monitor? Decide before I answer. Total estimated credits used, on the Monitor tab. It is the billing source of truth. The sessions list is only a view of single sessions."
  },
  {
   "title": "Monday, solved",
   "caption": "Black box: connection string, customEvents, designMode False, data policy. Cockpit: Monitor, 28 days, credits.",
   "say": "Back to Monday. Contoso filters designMode equal to False, and the tests disappear. The workbook shows what employees ask, and the Monitor tab shows Nexo is healthy. Remember for the exam. Connection string in Settings, Advanced. Data in customEvents. Block telemetry with a data policy on the connector. Monitor keeps twenty eight days of sessions, data can take an hour, and its credits are what you pay."
  }
 ],
 "check": [
  {
   "stem": "Where do you paste the Connection string?",
   "options": [
    "Agents, Add agent",
    "Settings, Advanced",
    "Monitor, Evaluate",
    "Tools, REST API"
   ],
   "answer": 1,
   "explanation": "In Settings, Advanced, in the Application Insights section."
  },
  {
   "stem": "What is designMode when the conversation was in the test canvas?",
   "options": [
    "True",
    "Zero",
    "Null",
    "False"
   ],
   "answer": 0,
   "explanation": "designMode is True in the test canvas."
  },
  {
   "stem": "In which table do the events land?",
   "options": [
    "Pipeline run history",
    "Solution components",
    "Users and sessions",
    "customEvents"
   ],
   "answer": 3,
   "explanation": "The data arrives in the customEvents table."
  },
  {
   "stem": "How does an admin prevent agent telemetry?",
   "options": [
    "By turning off the WiFi",
    "By deleting the agent",
    "By changing the publisher",
    "By blocking the Application Insights connector in a data policy"
   ],
   "answer": 3,
   "explanation": "With a data policy that blocks that connector. The connector is Application Insights in Copilot Studio."
  }
 ],
 "reto": {
  "text": "Create an Application Insights resource and copy its Connection string.\nPaste it in Settings, Advanced and turn on Enable logging.\nChat with the agent and query customEvents, filtering on designMode.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/telemetry-overview"
},
{
 "id": "L35",
 "module": 7,
 "title": "Create a test set",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "3.1a"
 ],
 "theory": {
  "intro": "A test set is a list of test questions that you use to measure how well your agent answers, like a student's exam. Each case is a question, and sometimes also the expected answer. With a good test set you can check improvements instead of guessing.",
  "sections": [
   {
    "heading": "Two types of case",
    "body": "A case can be a single response (one question and one answer) or a conversation (several turns).",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Import a test set</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Format</span><span style=\"text-align:right\">CSV or TXT</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Headers</span><span style=\"text-align:right\">Question, Expected response</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Maximum</span><span style=\"text-align:right\">100 questions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Length per question</span><span style=\"text-align:right\">1000 characters</span></div></div>"
   },
   {
    "heading": "Import from a file",
    "body": "You can import a CSV or TXT file with the headers Question and Expected response. The limit is 100 questions and 1000 characters per question.\n\nExpected responses are optional when you import, but you need them for the Compare meaning, Text similarity, and Exact match methods."
   },
   {
    "heading": "Generate cases",
    "body": "There are several ways: Quick question set (10 questions from the agent description); from knowledge (text, Word, Excel, PDF, or SharePoint files, maximum 5 MB, no folders); or from the real topics on the Monitor page (preview), with the Evaluate action.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">CSV import file</div><div style=\"padding:2px 0\">Question,Expected response</div><div style=\"padding:2px 0\">How do I reset my password?,Use the self-service portal</div></div>"
   },
   {
    "heading": "Agent requirements",
    "body": "Only agents with No authentication or Authenticate with Microsoft are evaluated. If the agent needs authentication, you choose a test user profile. Fabric data agents cannot be evaluated."
   },
   {
    "heading": "Test sets on the Evaluate tab (Microsoft Copilot harness)",
    "body": "On the Microsoft Copilot harness (formerly GitHub Copilot harness), evaluation lives in the Evaluate tab, which is in preview. The cycle is: create a test set, configure and run it, review the results, change the agent, and run the same set again. Reusing the same set makes runs comparable. A test set is a collection of conversations, also called test cases. A conversation has user messages and, optionally, an expected agent response. An evaluation is a named test set plus a test method.\n\nThere are three ways to add conversations. Upload a CSV: the maximum size is 5 MB, and a template is available. Generate with AI: Quick conversation set creates 10 conversations from the agent's description, instructions, and topics, and after a first run the menu also offers Generate 25 and Generate 50. Or write the questions yourself.\n\nActions that use credits show a Uses Copilot Credits badge. The agent must use No authentication or Authenticate with Microsoft; Authenticate manually is not supported. The User profile setting decides who runs the evaluation and invokes the agent's tools; by default it is the signed-in user. These limits are different from the standard harness (100 questions and 1000 characters each), so do not mix them."
   }
  ],
  "steps": [
   "Open your agent and go to the Evaluation section.",
   "Create a new test set.",
   "Choose how to fill it: import CSV or TXT, Quick question set, from knowledge, or from Monitor (preview).",
   "If you import, use the headers Question and Expected response.",
   "Review the cases and their type: single response or conversation.",
   "If the agent requires authentication, choose a test user profile.",
   "Save the test set so you can run it with the evaluation methods."
  ],
  "example": "Contoso imports 40 real support questions in a CSV with the headers Question and Expected response. They also generate a Quick question set of 10 questions from the agent description and compare both sets. When choosing the methods, they remember that Exact match needs expected responses, so every row in the CSV includes them. Their agent uses Authenticate with Microsoft, so they can evaluate it with a test user profile.",
  "examTips": [
   "Only agents with No authentication or Authenticate with Microsoft are evaluated; not Fabric data agents.",
   "Trap: importing without expected responses and then using Exact match.",
   "Import: CSV or TXT, up to 100 questions and 1000 characters each.",
   "Evaluate tab, Microsoft Copilot harness: CSV up to 5 MB, Quick conversation set = 10 conversations, later Generate 25 or 50. Standard harness: CSV or TXT, 100 questions, 1000 characters each. Do not mix the numbers.",
   "Good test sets start from real traffic, favor coverage over polish, and are rerun unchanged so runs can be compared."
  ],
  "glossary": [
   {
    "term": "Test set",
    "def": "A set of test cases used to evaluate an agent."
   },
   {
    "term": "Single response",
    "def": "A case with one question and one answer."
   },
   {
    "term": "Conversation",
    "def": "A case with several turns."
   },
   {
    "term": "Expected response",
    "def": "The answer you expect; some methods need it."
   }
  ]
 },
 "scenes": [
  {
   "title": "Better or worse?",
   "caption": "Friday: new instructions for Nexo. Monday: \"the answers got worse\". Nobody can prove it either way.",
   "say": "Monday at Contoso. On Friday the team gave Nexo, the I T agent, new instructions. This morning someone says the answers got worse. Someone else says they got better. Nobody can prove anything, because nobody measured before the change. Everyone is guessing. By the end of this class you will know how to build a test set, so the next change is measured instead of guessed."
  },
  {
   "title": "The same exam, every time",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Same exam, every time</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Test set</span><span style=\"text-align:right\">The agent's exam</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Case</span><span style=\"text-align:right\">Question (+ expected answer)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rule</span><span style=\"text-align:right\">Rerun the same set to compare</span></div></div>",
   "caption": "A test set is the agent's exam: each case is a question, sometimes with the expected answer.",
   "say": "Here is the picture to keep. A test set is a student's exam. Each case is a question, and sometimes it also carries the expected answer, like the answer key. The trick is to give the same exam again after every change. If the student scores better on the same exam, the student improved. If you change the exam each time, the scores say nothing."
  },
  {
   "title": "Two kinds of case",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two kinds of case</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Single response</span><span style=\"text-align:right\">One question, one answer</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Conversation</span><span style=\"text-align:right\">Several turns</span></div></div>",
   "caption": "Single response = one question, one answer. Conversation = several turns.",
   "say": "A case comes in two kinds. A single response case is one question and one answer, like where do I reset my password. A conversation case has several turns, like a user who asks for a laptop, then answers a question about the model, then asks for delivery. Use single responses for facts, and conversations when the agent must keep context across turns."
  },
  {
   "title": "Import from a file",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Import from a file</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Format</span><span style=\"text-align:right\">CSV or TXT</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Headers</span><span style=\"text-align:right\">Question, Expected response</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Limits</span><span style=\"text-align:right\">100 questions, 1000 characters each</span></div></div>",
   "caption": "CSV or TXT with headers Question and Expected response. Up to 100 questions, 1000 characters each.",
   "say": "The fastest way to fill a test set is a file. You import a CSV or a TXT file with two headers: Question and Expected response. There are limits to remember. Up to one hundred questions per file, and up to one thousand characters per question. Contoso exports forty real support questions, writes the expected answer next to each, and imports them in one go."
  },
  {
   "title": "When the answer key matters",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Answer key</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">On import</span><span style=\"text-align:right\">Expected response optional</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Needed by</span><span style=\"text-align:right\">Compare meaning, Text similarity, Exact match</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not needed</span><span style=\"text-align:right\">General quality</span></div></div>",
   "caption": "Expected responses are optional on import, but Compare meaning, Text similarity and Exact match need them.",
   "say": "Here is the detail the exam loves. Expected responses are optional when you import. The file is accepted without them. But some test methods compare the agent's answer with the expected one: Compare meaning, Text similarity, and Exact match. Without an answer key, those methods have nothing to compare with. General quality is different, it grades the answer without needing one."
  },
  {
   "title": "Decide: the missing column",
   "caption": "Contoso imported a CSV with only a Question column. Now they want Exact match. What must they fix?",
   "say": "Your turn. Contoso imported a CSV with only the Question column. Now they want to use Exact match. What must they fix first? Split the file into two smaller TXT files? Change each case into a conversation case? Or fill an Expected response for each row? Decide before I answer. Fill an Expected response for each row. Exact match compares with the answer key. File size and case type are not the problem."
  },
  {
   "title": "Let the tool write questions",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Generate cases</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Quick question set</span><span style=\"text-align:right\">10 questions from the description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">From knowledge</span><span style=\"text-align:right\">Text, Word, Excel, PDF, SharePoint · 5 MB · no folders</span></div></div>",
   "caption": "Quick question set: 10 questions from the agent description. From knowledge: files up to 5 MB, no folders.",
   "say": "You can also generate cases. Quick question set writes ten questions from the agent description, a good first draft in seconds. Or generate from knowledge: text, Word, Excel, P D F, or SharePoint files, up to five megabytes each, and no folders. The questions then come from the content Nexo really knows, so you test its sources and not only its wording."
  },
  {
   "title": "From real traffic",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">From real traffic</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Monitor page (preview)</span><span style=\"text-align:right\">Real topics › Evaluate action</span></div></div>",
   "caption": "Monitor page (preview): pick real topics and use the Evaluate action to create cases.",
   "say": "The best questions come from real users. On the Monitor page, in preview, you can take the real topics people talk about and use the Evaluate action to turn them into cases. Now the exam looks like Monday morning, not like the makers' imagination. A good test set starts from real traffic, and prefers coverage over polish."
  },
  {
   "title": "Who can be evaluated",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Who can be evaluated</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Yes</span><span style=\"text-align:right\">No authentication, Authenticate with Microsoft</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Signed-in</span><span style=\"text-align:right\">Choose a test user profile</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">No</span><span style=\"text-align:right\">Fabric data agents</span></div></div>",
   "caption": "Only No authentication or Authenticate with Microsoft. Choose a test user profile. Not Fabric data agents.",
   "say": "Not every agent can take the exam. Only agents with No authentication or Authenticate with Microsoft are evaluated. If the agent needs a signed in user, you choose a test user profile, and the run uses that identity. And one kind of agent is out completely: Fabric data agents cannot be evaluated. Check this before you build a single case."
  },
  {
   "title": "Decide: which one can take the exam",
   "caption": "Contoso has three agents. Which one can be evaluated with a test set?",
   "say": "Your turn. Contoso has three agents and wants to evaluate one of them today. Which one can take the exam? The one using Authenticate with Microsoft? The one where makers Authenticate manually? Or the Fabric data agent of the finance team? Decide before I answer. The one using Authenticate with Microsoft, with a test user profile. Manual authentication is not supported, and Fabric data agents cannot be evaluated."
  },
  {
   "title": "The Evaluate tab",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Evaluate tab (Microsoft Copilot harness)</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Status</span><span style=\"text-align:right\">Preview</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Loop</span><span style=\"text-align:right\">Create › run › review › change › rerun same set</span></div></div>",
   "caption": "Microsoft Copilot harness: Evaluate tab (preview). Create, run, review, change the agent, run the same set again.",
   "say": "So far this is the standard harness. On the Microsoft Copilot harness, formerly GitHub Copilot harness, evaluation lives in the Evaluate tab, in preview. The cycle is a loop. Create a test set, configure and run it, review the results, change the agent, and run the same set again. Reusing the same set is what makes two runs comparable. Same exam, every time."
  },
  {
   "title": "The words on that tab",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Words on the tab</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Test set</span><span style=\"text-align:right\">Collection of conversations (test cases)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Conversation</span><span style=\"text-align:right\">User messages + optional expected response</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Evaluation</span><span style=\"text-align:right\">Named test set + test method</span></div></div>",
   "caption": "Test set = conversations (test cases). Conversation = user messages + optional expected response. Evaluation = test set + method.",
   "say": "That tab uses its own words. A test set is a collection of conversations, also called test cases. A conversation has user messages and, optionally, an expected agent response. And an evaluation is a named test set plus a test method. So when a question says evaluation, think of the pair: which exam, and how it is graded."
  },
  {
   "title": "Three ways to add conversations",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Add conversations</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Upload CSV</span><span style=\"text-align:right\">Up to 5 MB, template</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Quick conversation set</span><span style=\"text-align:right\">10, then Generate 25 or 50</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Manual</span><span style=\"text-align:right\">Write them yourself</span></div></div>",
   "caption": "Upload CSV (up to 5 MB, template). Quick conversation set = 10, then Generate 25 or 50. Or write them.",
   "say": "There are three ways to add conversations. Upload a CSV, up to five megabytes, and a template is available. Generate with A I: Quick conversation set creates ten conversations from the agent's description, instructions, and topics. After a first run, the menu also offers Generate twenty five and Generate fifty. Or write the questions yourself, which is still the best way to cover edge cases."
  },
  {
   "title": "Credits and identity",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Credits and identity</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Badge</span><span style=\"text-align:right\">Uses Copilot Credits</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Auth</span><span style=\"text-align:right\">No auth or Authenticate with Microsoft (not manual)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">User profile</span><span style=\"text-align:right\">Who runs it; default signed-in user</span></div></div>",
   "caption": "Uses Copilot Credits badge. No Authenticate manually. User profile decides who runs it; default = signed-in user.",
   "say": "Two practical details. Actions that cost money show a badge that says Uses Copilot Credits. And identity: the agent must use No authentication or Authenticate with Microsoft, and Authenticate manually is not supported here either. The User profile setting decides who runs the evaluation and invokes the agent's tools. By default it is the signed in user. Do not mix these limits with the standard harness numbers."
  },
  {
   "title": "Decide: which limit applies",
   "caption": "Nexo is on the Microsoft Copilot harness. Contoso uploads a file of real questions. Which limit applies?",
   "say": "Your turn. Nexo now runs on the Microsoft Copilot harness, and Contoso wants to upload a file of real questions to the Evaluate tab. Which limit applies? One hundred questions of one thousand characters? A single CSV file up to five megabytes in size? Or twenty five conversations until the first run? Decide before I answer. A CSV up to five megabytes. One hundred questions is the standard harness, and twenty five is a generate option."
  },
  {
   "title": "Monday, measured",
   "caption": "Same test set before and after. CSV/TXT 100 × 1000 chars; expected responses for Exact match; auth limits.",
   "say": "Back to Monday. This time Contoso ran the same test set before and after the new instructions, and the scores settle the argument in a minute. Remember for the exam. Standard harness: CSV or TXT, one hundred questions, one thousand characters each, and expected responses for Exact match. Only No authentication or Authenticate with Microsoft, no Fabric data agents. Evaluate tab: five megabytes, ten conversations, then twenty five or fifty."
  }
 ],
 "check": [
  {
   "stem": "Which types of case exist?",
   "options": [
    "Topic and flow cases only",
    "Only single response cases",
    "Only CSV files",
    "Single and multi-turn"
   ],
   "answer": 3,
   "explanation": "Cases can be single response or conversation (multi-turn)."
  },
  {
   "stem": "Which headers does the import CSV use?",
   "options": [
    "Topic name, node, and trigger",
    "Input text and Output value",
    "First name and last name",
    "Question and Expected response"
   ],
   "answer": 3,
   "explanation": "The headers are Question and Expected response."
  },
  {
   "stem": "What is the maximum number of questions you can import?",
   "options": [
    "100",
    "Unlimited",
    "1000",
    "10"
   ],
   "answer": 0,
   "explanation": "Up to 100 questions, with 1000 characters per question."
  },
  {
   "stem": "Which agents cannot be evaluated?",
   "options": [
    "Agents with No authentication",
    "Agents with Authenticate with Microsoft",
    "Fabric data agents",
    "Agents with a user profile"
   ],
   "answer": 2,
   "explanation": "Fabric data agents cannot be evaluated."
  }
 ],
 "reto": {
  "text": "Write a CSV with five questions and expected responses.\nImport it as a test set in Evaluation.\nAlso generate a Quick question set and compare the cases.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create"
},
{
 "id": "L36",
 "module": 7,
 "title": "Evaluation methods",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "3.1b"
 ],
 "theory": {
  "intro": "Evaluating an agent is like grading an exam: first you decide what you want to measure, then you choose the right rule. Some methods give a score, others only say pass or fail. Choosing the wrong method gives misleading results.",
  "sections": [
   {
    "heading": "Methods with a score",
    "body": "Compare meaning compares the intent with the expected response (default pass score of 50) and tolerates different wording. Text similarity measures how close the wording is, with a cosine from 0 to 1. General quality is graded by a language model out of 100 (relevance, groundedness, completeness, and abstention) and does not need an expected response.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Which method to use</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Exact number or code</span><span style=\"text-align:right\">Exact match</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Same meaning</span><span style=\"text-align:right\">Compare meaning</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Used the right tools</span><span style=\"text-align:right\">Tool use</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Harmful content</span><span style=\"text-align:right\">Content safety</span></div></div>"
   },
   {
    "heading": "Pass or fail methods",
    "body": "Exact match requires an exact match (ideal for codes or numbers). Keyword match checks for keywords (Any or All). Tool use checks whether the expected tools or topics were used. Content safety evaluates hate, sexual content, violence, and self-harm, with a severity threshold from 0 (strictest) to 7 (most permissive)."
   },
   {
    "heading": "Custom and General quality",
    "body": "General quality is on by default. Custom lets you write instructions and at least two labels, each marked as Pass or Fail (for example Compliant and Non-compliant).\n\nOne detail: General quality can flag a correct refusal (abstention) as needing improvement. For expected refusals, use Custom.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Methods for Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Order code</span><span style=\"text-align:right\">Exact match</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Reworded policy</span><span style=\"text-align:right\">Compare meaning</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Called CreateTicket</span><span style=\"text-align:right\">Tool use</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Expected refusal</span><span style=\"text-align:right\">Custom</span></div></div>"
   },
   {
    "heading": "Invalid",
    "body": "If a case is missing what the method needs (expected response, keywords, or tools), the result is Invalid."
   },
   {
    "heading": "Methods on the Microsoft Copilot harness",
    "body": "The methods in this lesson belong to the standard harness. On the Evaluate tab of the Microsoft Copilot harness (formerly GitHub Copilot harness), the only test method today is General quality. It is an AI-based check of whether responses meet quality standards such as relevance and completeness. Each test case gets Pass or Fail.\n\nBecause the check is AI-based, results can differ between runs, so run important scenarios more than once. A Pass also does not show which knowledge sources the agent used or whether a tool ran. For that evidence, open the activity trace in the Preview tab (Knowledge and Tool nodes), the conversation history (which model was used), and the Monitor tab (credits)."
   }
  ],
  "steps": [
   "Open your test set in the Evaluation section.",
   "Check that General quality is on (it is on by default).",
   "Add the method you need: Compare meaning, Exact match, Tool use, and so on.",
   "For each method, set its threshold or pass score if it asks for one.",
   "For Content safety, choose the threshold from 0 to 7 (one method for each type of content).",
   "If you need your own criteria, create a Custom method with instructions and two or more Pass or Fail labels.",
   "Run the test set and check whether any case shows Invalid."
  ],
  "example": "Contoso wants to measure three things. For the order code, it uses Exact match, because it must match character by character. For a policy written in a different way, it uses Compare meaning, which tolerates changes in words. To check that the agent called the CreateTicket tool, it uses Tool use. It also creates a Custom method with the labels Compliant and Non-compliant to check that the agent correctly refuses what it should not answer.",
  "examTips": [
   "Expected refusals: use Custom, because General quality can flag a correct refusal as needing improvement.",
   "Content safety: threshold from 0 (strictest) to 7 (most permissive); one method for each type of content.",
   "A case without what the method requires gives Invalid.",
   "Evaluate tab on the Microsoft Copilot harness: General quality is the only method and the result is Pass or Fail. Compare meaning, Exact match, Tool use, and the others belong to the standard harness.",
   "A General quality Pass does not prove a tool ran or which knowledge was used. Check the Preview activity trace."
  ],
  "glossary": [
   {
    "term": "General quality",
    "def": "A score out of 100 from a model, with no expected response needed."
   },
   {
    "term": "Pass score",
    "def": "The minimum score a case must reach to pass."
   },
   {
    "term": "Custom",
    "def": "A method with your own instructions and at least two Pass or Fail labels."
   },
   {
    "term": "Invalid",
    "def": "The result when the case is missing what the method needs."
   }
  ]
 },
 "scenes": [
  {
   "title": "Green, but wrong",
   "caption": "Expected code CT-4471. Nexo said CT-4417. The evaluation showed green: the method graded the meaning.",
   "say": "Tuesday at Contoso. Nexo, the I T agent, answers a question about an order. The expected code is C T four four seven one. Nexo says C T four four one seven. The evaluation shows green, because the method graded the meaning, and the meaning looked close. In real life, that is a wrong order. The test set was fine. The grading rule was wrong. Today you learn to pick the right one."
  },
  {
   "title": "First what, then how",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">First what, then how</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Step 1</span><span style=\"text-align:right\">Decide what to measure</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Step 2</span><span style=\"text-align:right\">Choose the method (the rule)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Results</span><span style=\"text-align:right\">Score + pass mark, or Pass/Fail</span></div></div>",
   "caption": "First decide what to measure, then choose the rule. Some methods give a score, others only Pass or Fail.",
   "say": "Keep this picture. Evaluating an agent is like grading an exam. First you decide what you want to measure: the meaning, the exact words, a tool, safety. Then you choose the grader with the right rule. Some graders give a score, and you set the pass mark. Others only say pass or fail. Each test set can have several methods, and the wrong one gives misleading results."
  },
  {
   "title": "General quality, the default judge",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">General quality</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Graded by</span><span style=\"text-align:right\">Language model, out of 100</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Looks at</span><span style=\"text-align:right\">Relevance, groundedness, completeness, abstention</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Expected response</span><span style=\"text-align:right\">Not needed · on by default</span></div></div>",
   "caption": "General quality: a language model grades out of 100 (relevance, groundedness, completeness, abstention). No expected response. On by default.",
   "say": "The first grader is already on every test set. General quality is turned on by default. A language model grades each answer out of one hundred, looking at four things: relevance, groundedness, completeness, and abstention. It needs no expected response, so it works from day one, even before anyone writes an answer key. It is a good first check, but it judges quality, not exact facts."
  },
  {
   "title": "Meaning or wording",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Meaning or wording</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Compare meaning</span><span style=\"text-align:right\">Same intent · default pass score 50</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Text similarity</span><span style=\"text-align:right\">Wording closeness · cosine 0–1</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Both</span><span style=\"text-align:right\">Need an expected response</span></div></div>",
   "caption": "Compare meaning: same intent as the expected response, default pass score 50. Text similarity: wording closeness, cosine 0 to 1.",
   "say": "The next two graders both read the answer key. Compare meaning checks whether the answer has the same intent as the expected response, so different wording is fine. Its default pass score is fifty. Text similarity is stricter about the words themselves. It measures how close the wording is, with a cosine score from zero to one. Use meaning for policies explained in your own words, similarity when the phrasing matters."
  },
  {
   "title": "Exact words, key words",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Pass or Fail graders</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Exact match</span><span style=\"text-align:right\">Character by character · codes, numbers</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Keyword match</span><span style=\"text-align:right\">Any or All of your keywords</span></div></div>",
   "caption": "Exact match: character by character, ideal for codes and numbers. Keyword match: Any or All of your keywords. Pass or Fail.",
   "say": "Now the strict graders. Exact match wants the answer character by character, so it is ideal for order codes, prices, and numbers. Keyword match only looks for the words you list, and you choose Any or All. With All, every expected word or phrase must appear for the case to pass. These two give no score, only pass or fail, so use them when you need a clear yes or no."
  },
  {
   "title": "Decide: the order code",
   "caption": "Contoso wants to be sure Nexo returns the order code with every character in the right place. Which method should they add?",
   "say": "Your turn. Contoso wants to be sure Nexo returns the order code with every character in the right place. Which method should they add? Compare meaning with its default pass score of fifty? Exact match with the code as expected response? Or General quality, which is turned on by default? Decide before I answer. Exact match. Codes must match character by character. Compare meaning tolerates near misses, and General quality needs no answer key."
  },
  {
   "title": "Did it use the tool?",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Tool use</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Checks</span><span style=\"text-align:right\">Expected tools or topics were used</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Result</span><span style=\"text-align:right\">Pass or Fail, no score</span></div></div>",
   "caption": "Tool use: Pass if the expected tools or topics were used, like Create Ticket. Pass or Fail, no score.",
   "say": "Some answers are right only if the agent did something. When a user reports a broken laptop, Nexo should call the Create Ticket tool, not just say sorry. Tool use checks whether the expected tools or topics were used in the response. You list them on the case, and the grader looks for them. Like Exact match, it gives pass or fail, with no score."
  },
  {
   "title": "The safety inspector",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Content safety</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Checks</span><span style=\"text-align:right\">Hate, sexual, violence, self-harm</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Threshold</span><span style=\"text-align:right\">0 strictest … 7 most permissive</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rule</span><span style=\"text-align:right\">One method per content type</span></div></div>",
   "caption": "Content safety: hate, sexual content, violence, self-harm. Threshold 0 (strictest) to 7 (most permissive). One method per content type.",
   "say": "Next, the safety inspector. Content safety checks answers for four kinds of harm: hate, sexual content, violence, and self harm. You set a severity threshold from zero to seven. Zero is the strictest, and seven is the most permissive. It gives pass or fail. One detail the exam likes: you add one Content safety method for each type of content, so checking all four means four methods."
  },
  {
   "title": "Your own rule",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Custom</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instructions</span><span style=\"text-align:right\">What the grader judges</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Labels</span><span style=\"text-align:right\">2 or more, each Pass or Fail</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Example</span><span style=\"text-align:right\">Compliant / Non-compliant</span></div></div>",
   "caption": "Custom: your evaluation instructions plus at least two labels, each marked Pass or Fail, like Compliant and Non-compliant.",
   "say": "When no built in grader fits, write your own. A Custom method has two parts. First, instructions that tell the grader what to judge, in plain language. Second, at least two labels, and each label is marked as pass or fail. Contoso writes, check that Nexo follows the H R privacy policy, with the labels Compliant, marked pass, and Non compliant, marked fail."
  },
  {
   "title": "The correct refusal",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Expected refusals</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">General quality</span><span style=\"text-align:right\">May flag a correct refusal</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Use</span><span style=\"text-align:right\">Custom</span></div></div>",
   "caption": "General quality can flag a correct refusal (abstention) as needing improvement. For expected refusals, use Custom.",
   "say": "Here is the trap. Some questions Nexo must refuse, like what does my manager earn. A good refusal is the right answer. But General quality can flag a correct refusal as needing improvement, even when it is exactly what you wanted. So for cases where the agent should refuse, use a Custom method. Your labels decide that a polite, correct refusal is a pass."
  },
  {
   "title": "Decide: the salary question",
   "caption": "Nexo must refuse salary questions, and it does. General quality keeps marking those refusals as needing improvement. What should Contoso do?",
   "say": "Your turn. Nexo must refuse every question about salaries, and it does. But General quality keeps marking those refusals as needing improvement. What should Contoso do? Set the Content safety threshold to zero? Add Keyword match with the All option? Or create a Custom method with two labels? Decide before I answer. Create a Custom method. Expected refusals need your own rule. Content safety and keywords do not judge a correct refusal."
  },
  {
   "title": "Nothing to grade",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Nothing to grade</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Missing material</span><span style=\"text-align:right\">Result = Invalid</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Single response only</span><span style=\"text-align:right\">Compare meaning, Text similarity, Exact match, Tool use</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Both set types</span><span style=\"text-align:right\">Keyword match, Custom</span></div></div>",
   "caption": "Missing expected response, keywords or tools = Invalid. Compare meaning, Text similarity, Exact match, Tool use: single response only.",
   "say": "A grader needs material. If a case is missing what the method needs, an expected response, keywords, or tools, the result is not fail. It is Invalid. Also check the set type. Compare meaning, Text similarity, Exact match, and Tool use work only with single response cases. Keyword match and Custom work with single responses and conversations. After a run, always look for Invalid."
  },
  {
   "title": "One grader on the harness",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Evaluate tab (Microsoft Copilot harness)</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Only method</span><span style=\"text-align:right\">General quality</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Result</span><span style=\"text-align:right\">Pass or Fail per test case</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Other methods</span><span style=\"text-align:right\">Standard harness only</span></div></div>",
   "caption": "Microsoft Copilot harness, Evaluate tab: General quality is the only test method, and each test case gets Pass or Fail.",
   "say": "Everything so far is the standard harness. On the Microsoft Copilot harness, formerly GitHub Copilot harness, the Evaluate tab has only one test method today: General quality. It is an A I based check of quality standards like relevance and completeness, and each test case gets pass or fail. Compare meaning, Exact match, Tool use, and the rest belong to the standard harness."
  },
  {
   "title": "Same case, another run",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Runs can differ</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Why</span><span style=\"text-align:right\">Agent and grader are AI-based</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Do</span><span style=\"text-align:right\">Run important scenarios more than once</span></div></div>",
   "caption": "Agent and grader are both AI-based, so results can differ between runs. Run important scenarios more than once.",
   "say": "Because the check is A I based, and the agent is too, the same case can pass on one run and fail on the next. That is not a broken test. It is how these systems behave. So run your important scenarios more than once before you trust a result, and compare the runs on the same test set, as you learned in the last lesson."
  },
  {
   "title": "What a Pass does not show",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Evidence beyond a Pass</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge / tools</span><span style=\"text-align:right\">Preview activity trace (Knowledge, Tool nodes)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Model used</span><span style=\"text-align:right\">Conversation history</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Credits</span><span style=\"text-align:right\">Monitor tab</span></div></div>",
   "caption": "A Pass doesn't show which knowledge was used or whether a tool ran. Evidence: Preview activity trace, conversation history, Monitor tab.",
   "say": "One more limit. A General quality pass does not show which knowledge sources Nexo used, or whether a tool really ran. The answer could read well and still skip the tool. For evidence, open the activity trace in the Preview tab and look at the Knowledge and Tool nodes. The conversation history shows which model answered, and the Monitor tab shows the credits."
  },
  {
   "title": "Decide: proof of the tool",
   "caption": "On the Microsoft Copilot harness, Nexo passes General quality. The manager wants proof that Create Ticket ran. Where do you look?",
   "say": "Your turn. On the Microsoft Copilot harness, Nexo passes General quality. The manager wants proof the Create Ticket tool ran. Where do you look? The Tool node in the Preview activity trace? A Tool use method added to the Evaluate tab? Or a second evaluation run that also shows pass? Decide before I answer. The Tool node in the trace. The Evaluate tab offers only General quality, and a second pass proves nothing about tools."
  },
  {
   "title": "The right grader",
   "caption": "Codes: Exact match. Same idea, other words: Compare meaning. Tool: Tool use. Refusals: Custom. Harness: General quality only.",
   "say": "Back to the order code. Contoso adds Exact match, and C T four four one seven now fails, as it should. Remember for the exam. Codes and numbers, Exact match. Same idea in other words, Compare meaning. A tool call, Tool use. Expected refusals, Custom. Missing material, Invalid. Safety, zero is strictest. And on the Microsoft Copilot harness, General quality is the only method, pass or fail."
  }
 ],
 "check": [
  {
   "stem": "Which method is on by default?",
   "options": [
    "Tool use, with tool calls",
    "Exact match against expected text",
    "General quality",
    "Custom, with your own rules"
   ],
   "answer": 2,
   "explanation": "General quality is the default method in every test set."
  },
  {
   "stem": "Which one requires a character-by-character match?",
   "options": [
    "Exact match",
    "Compare meaning",
    "Text similarity",
    "Tool use"
   ],
   "answer": 0,
   "explanation": "Exact match requires an exact match; it works for codes or numbers."
  },
  {
   "stem": "In Content safety, what does a threshold of 0 mean?",
   "options": [
    "Most permissive",
    "Strictest",
    "No evaluation",
    "Invalid"
   ],
   "answer": 1,
   "explanation": "0 is the strictest and 7 is the most permissive."
  },
  {
   "stem": "Which method do you use to check that a tool was called?",
   "options": [
    "Text similarity",
    "General quality",
    "Tool use",
    "Keyword match"
   ],
   "answer": 2,
   "explanation": "Tool use checks whether the expected tools or topics were used."
  }
 ],
 "reto": {
  "text": "Pick three test cases and assign one method to each.\nCreate a Custom method with the labels Compliant and Non-compliant.\nRun the test set and check whether any case shows Invalid.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
},
{
 "id": "L37",
 "module": 7,
 "title": "Review results",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "3.1c"
 ],
 "theory": {
  "intro": "After you evaluate, you have to read the grades. Each case gets a result, and understanding what each one means helps you avoid wrong conclusions. It is like reviewing a graded exam: you do not only look at the score, you also understand why it was given and whether it improved compared with the previous exam.",
  "sections": [
   {
    "heading": "The four results",
    "body": "Each case gets Pass, Fail, Invalid, or Error. Invalid appears when the case is missing what the method needs (expected response, keywords, or tools). Error is an execution failure. A very high pass score gives Fail, not Invalid.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Pass</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Fail</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Invalid</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Error</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Invalid = something is missing in the case</text></svg>"
   },
   {
    "heading": "Understand one case",
    "body": "Show activity map explains the sequence of decisions the agent made in one case: which steps it took until it answered. It helps you learn why the agent behaved that way."
   },
   {
    "heading": "Measure the effect of a change",
    "body": "Compare with compares two runs of the same test set. Arrows mark the cases that went from failing to passing, or the other way around. This way you measure the effect of changing, for example, the instructions.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Before and after changing instructions</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Run 1</span><span style=\"text-align:right\">7 Pass, 3 Fail</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Run 2</span><span style=\"text-align:right\">9 Pass, 1 Fail</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Compare with</span><span style=\"text-align:right\">arrows from Fail to Pass</span></div></div>"
   },
   {
    "heading": "How long they last and how to save them",
    "body": "Results are available in Copilot Studio for 89 days. To keep them longer, export them to CSV, with the question, expected response, method, score, agent response, result, and analysis."
   },
   {
    "heading": "Reading results on the Evaluate tab",
    "body": "Each run is saved separately, so you can compare runs and see whether a change improved the agent. To run a set again, use Recent results, then Evaluate test set again. The evaluation summary shows Score, Duration, Test cases, Data type (Conversation is the only one), User profile, and Credits used. Duration is how long the whole run took, not the agent's response time; measure latency in Preview. To keep results, select the three dots, then Export test results, which gives a CSV with every conversation, response, and score.\n\nWhen a case fails, the cause can be the evaluation setup (the evaluation author), the agent configuration (the agent builder), or a platform limitation (the platform team). Check the setup first: healthy dependencies, valid authentication for the user profile, and the right environment. For example, an expired connection for the user profile is a setup issue. Restore the connection, rerun, and leave the instructions alone."
   },
   {
    "heading": "Fixing and triaging failures",
    "body": "Match the symptom to the fix. Low General quality means improve the instructions. Missing or incorrect tool use means improve the tool descriptions. Incorrect information means check the knowledge sources. Triage in this order: safety and compliance, core business scenarios, the lowest-scoring evaluation, then recurring failures.\n\nCredit estimates in Evaluate and Preview are near real time. The Monitor tab shows the final, accurate consumption within a few hours."
   },
   {
    "heading": "Validating a model change",
    "body": "Before you change an agent's model, define acceptance gates: overall pass rate, business-critical scenarios, blocking failures, latency and reliability, safety and compliance, credit consumption, and signoff. Then baseline the current model: run your regression set and export the results, because after the change you cannot rebuild the baseline.\n\nTest the candidate model in a nonproduction copy with the same instructions, knowledge, tools, and connections. In the Build tab, open the Model list, pick the candidate, and save. Experimental and preview models are for testing, not for production, and admins control whether makers can add them. A similar overall score is not enough to approve: check tool selection in the Preview trace, get signoff, and pair the evaluation with a responsible AI review."
   }
  ],
  "steps": [
   "Run the test set from Evaluation.",
   "Open the results and look at the status of each case: Pass, Fail, Invalid, or Error.",
   "If there is an Invalid, check what is missing: expected response, keywords, or tools.",
   "For a confusing case, open Show activity map.",
   "Change something (for example the instructions) and run the same test set again.",
   "Use Compare with to see which cases changed.",
   "Export the results to CSV if you need to keep them for more than 89 days."
  ],
  "example": "Contoso runs its test set and gets Pass, Fail, and Invalid cases. The Invalid ones come from rows without an expected response when using Compare meaning, so they add the responses. Then they change the agent instructions and run the same test set again. With Compare with, they see arrows that show which cases went from failing to passing and which got worse. For a strange case, they open Show activity map. At the end, they export to CSV to keep the history.",
  "examTips": [
   "Results are available for 89 days; to keep them longer, export to CSV.",
   "Trap: thinking that a demanding threshold gives Invalid. It gives Fail.",
   "Compare with = two runs of the same test set.",
   "A failed case can come from the setup, the agent, or the platform. Check the setup first: an expired connection for the user profile means restore the connection and rerun, not edit the instructions.",
   "Model migration: define acceptance gates and export a baseline before the change, test the candidate in a nonproduction copy, and do not approve on a similar overall score alone (check tool selection too)."
  ],
  "glossary": [
   {
    "term": "Invalid",
    "def": "The case does not have what the method needs."
   },
   {
    "term": "Error",
    "def": "An execution failure while evaluating."
   },
   {
    "term": "Compare with",
    "def": "A comparison of two runs of the same test set."
   },
   {
    "term": "Activity map",
    "def": "A view of the sequence of decisions the agent made in one case."
   }
  ]
 },
 "scenes": [
  {
   "title": "Twelve red cases",
   "caption": "Nexo's instructions changed over the weekend. Monday: twelve red cases. The first instinct is to rewrite the instructions again.",
   "say": "Monday at Contoso. Over the weekend, the maker rewrote the instructions of Nexo, the I T agent, and ran the test set again. Monday morning, twelve cases are red. The first instinct is to rewrite the instructions again, and run again, and hope. But the real cause is not in the instructions at all. Today you learn to read the results before you change anything."
  },
  {
   "title": "Read the graded exam",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Read the graded exam</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">What result?</span><span style=\"text-align:right\">Pass · Fail · Invalid · Error</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Why?</span><span style=\"text-align:right\">Show activity map</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Did it improve?</span><span style=\"text-align:right\">Compare with</span></div></div>",
   "caption": "Three questions: what result did each case get, why, and did it improve? Tools: the result, Show activity map, Compare with.",
   "say": "Keep this picture. Reading results is like reviewing a graded exam. You don't only look at the score. You ask three questions. What result did each answer get? Why did it get that result? And did this exam improve compared with the last one? Copilot Studio gives you one tool for each question: the result itself, the activity map, and Compare with."
  },
  {
   "title": "Four results",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Four results</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Pass / Fail</span><span style=\"text-align:right\">The method graded the answer</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Invalid</span><span style=\"text-align:right\">Missing expected response, keywords or tools</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Error</span><span style=\"text-align:right\">Execution failure while evaluating</span></div></div>",
   "caption": "Pass, Fail, Invalid, Error. Invalid: the case lacks what the method needs. Error: the evaluation failed to run.",
   "say": "Every case gets one of four results. Pass and Fail are the grades you expect: the method judged the answer. Invalid means the case is missing what the method needs, like an expected response, keywords, or tools. Error means an execution failure while evaluating, so there is no grade at all. Only Pass and Fail say something about the answer. Invalid and Error tell you to look at the run first."
  },
  {
   "title": "Decide: the demanding bar",
   "caption": "Contoso raises the Compare meaning pass score to 95. Cases with an expected response now score below it. What result do they get?",
   "say": "Your turn. Contoso raises the Compare meaning pass score to ninety five. Cases that have an expected response now score below that bar. What result do those cases get? Invalid, because the bar is too demanding? Error, because the method could not decide? Or Fail, because they scored below the bar? Decide before I answer. Fail. The case had everything the method needs, so it was graded. Invalid is only for missing material."
  },
  {
   "title": "Why did it do that?",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Show activity map</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Shows</span><span style=\"text-align:right\">Sequence of decisions in one case</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Use it</span><span style=\"text-align:right\">To learn why the agent did that</span></div></div>",
   "caption": "Show activity map: the sequence of decisions the agent made in one case, step by step, until it answered.",
   "say": "When one case confuses you, open Show activity map. It shows the sequence of decisions Nexo made in that case, step by step, until it answered. Here, the user asked how to reconnect the V P N, and the map shows Nexo went to the Password reset topic first. Now you know why the answer was wrong, instead of guessing."
  },
  {
   "title": "Did the change help?",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Compare with</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Compares</span><span style=\"text-align:right\">Two runs of the same test set</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Arrows</span><span style=\"text-align:right\">Failing → passing, or the other way</span></div></div>",
   "caption": "Compare with: two runs of the same test set. Arrows mark cases that went from failing to passing, or the other way.",
   "say": "To measure a change, use Compare with. It puts two runs of the same test set side by side. Arrows mark the cases that changed, from failing to passing, or the other way around. Contoso edits the instructions, runs the same set again, and sees five cases improve and one get worse. That one is the next case to open. Compare with only makes sense on the same test set."
  },
  {
   "title": "Eighty-nine days",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Keeping results</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">In Copilot Studio</span><span style=\"text-align:right\">89 days</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Longer</span><span style=\"text-align:right\">Export to CSV</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">CSV row</span><span style=\"text-align:right\">Question, expected, method, score, response, result, analysis</span></div></div>",
   "caption": "Results stay in Copilot Studio for 89 days. Export to CSV: question, expected response, method, score, agent response, result, analysis.",
   "say": "Results do not stay forever. Copilot Studio keeps evaluation results for eighty nine days. To keep them longer, export them to a C S V file. Each row has the question, the expected response, the method, the score, the agent's response, the result, and the analysis. That file is your history, for audits and for comparisons months later."
  },
  {
   "title": "Decide: a full year",
   "caption": "Contoso's auditors want this quarter's evaluation results available for a full year. What should the maker do?",
   "say": "Your turn. Contoso's auditors want this quarter's evaluation results available for a full year. What should the maker do? Export the results to C S V after each run? Ask an admin to extend the result retention? Or use Compare with to merge the older runs? Decide before I answer. Export to C S V. Results stay eighty nine days, and exporting is how you keep them longer. Compare with only puts two runs side by side."
  },
  {
   "title": "The Evaluate tab",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Evaluate tab (Microsoft Copilot harness)</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Runs</span><span style=\"text-align:right\">Each saved separately</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rerun</span><span style=\"text-align:right\">Recent results › Evaluate test set again</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Duration</span><span style=\"text-align:right\">Whole run, not response time</span></div></div>",
   "caption": "Microsoft Copilot harness: each run saved separately. Rerun: Recent results › Evaluate test set again. Duration = whole run, not response time.",
   "say": "Everything so far is the standard harness. On the Microsoft Copilot harness, formerly GitHub Copilot harness, results live in the Evaluate tab. Each run is saved separately. To run a set again, open Recent results, then Evaluate test set again. The summary shows Score, Duration, Test cases, Data type, User profile, and Credits used. Duration is the whole run, not how fast the agent answered. Measure latency in Preview."
  },
  {
   "title": "Who broke it?",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Why a case failed</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Evaluation setup</span><span style=\"text-align:right\">Evaluation author · check first</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent configuration</span><span style=\"text-align:right\">Agent builder</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Platform limitation</span><span style=\"text-align:right\">Platform team</span></div></div>",
   "caption": "A fail comes from the evaluation setup, the agent configuration, or a platform limitation. Check the setup first: dependencies, user profile auth, environment.",
   "say": "On this harness, a fail can come from three places. The evaluation setup, owned by the evaluation author. The agent configuration, owned by the agent builder. Or a platform limitation, owned by the platform team. Check the setup first. Are the dependencies healthy? Is the authentication valid for the user profile? Is it the right environment? Only then blame the agent."
  },
  {
   "title": "Decide: Monday morning",
   "caption": "Twelve cases fail overnight. All call the Create Ticket tool, and the user profile's connection expired yesterday. What should the maker do first?",
   "say": "Your turn. Back to Monday. Twelve cases fail overnight. All of them call the Create Ticket tool, and the connection for the user profile expired yesterday. What should the maker do first? Rewrite the instructions and run the set again? Restore the connection and rerun the same set? Or improve the Create Ticket tool description? Decide before I answer. Restore the connection and rerun. An expired connection is a setup issue. Leave the instructions alone."
  },
  {
   "title": "Symptom, then fix",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Symptom → fix</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Low General quality</span><span style=\"text-align:right\">Instructions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Missing / wrong tool use</span><span style=\"text-align:right\">Tool descriptions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Incorrect information</span><span style=\"text-align:right\">Knowledge sources</span></div></div>",
   "caption": "Low General quality → instructions. Missing or incorrect tool use → tool descriptions. Incorrect information → knowledge sources.",
   "say": "When the agent really is the cause, match the symptom to the fix. Low General quality means improve the instructions. Missing or incorrect tool use means improve the tool descriptions. Incorrect information means check the knowledge sources. Change one thing, run the same set again, and use Compare with to see the effect."
  },
  {
   "title": "Which failure first?",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Triage order</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Safety and compliance</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Core business scenarios</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Lowest-scoring evaluation</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Recurring failures</span></div></div>",
   "caption": "Triage order: safety and compliance, core business scenarios, the lowest-scoring evaluation, then recurring failures.",
   "say": "With many failures, you need an order. First, safety and compliance. Then the core business scenarios, the ones Contoso cannot work without. Then the lowest scoring evaluation. Last, the failures that keep coming back. A low score on the cafeteria menu can wait. An answer that breaks a privacy rule cannot."
  },
  {
   "title": "Decide: three failures",
   "caption": "After a run: a vague cafeteria menu answer, a wrong order status, an answer that shares an employee's home address. Which do you triage first?",
   "say": "Your turn. After a run, Nexo has three failures. A vague answer about the cafeteria menu, a wrong order status, and an answer that shares an employee's home address. Which one do you triage first? The wrong order status in a core scenario? The vague menu answer with the lowest score? Or the answer sharing an employee's address? Decide before I answer. The shared address. Safety and compliance come first, then core scenarios."
  },
  {
   "title": "Estimate or final",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Credits</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Evaluate / Preview</span><span style=\"text-align:right\">Near-real-time estimate</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Monitor tab</span><span style=\"text-align:right\">Final, accurate, within a few hours</span></div></div>",
   "caption": "Credits in Evaluate and Preview are near-real-time estimates. The Monitor tab shows the final, accurate consumption within a few hours.",
   "say": "One last number: credits. Evaluation runs use Copilot Credits. The credits you see in Evaluate and in Preview are estimates, close to real time. The final, accurate consumption appears in the Monitor tab within a few hours, after the usage is processed. So for the real number, check Monitor later, not the run summary."
  },
  {
   "title": "Read before you fix",
   "caption": "Pass, Fail, Invalid, Error. High bar = Fail. Activity map = why. Compare with = effect. 89 days, then CSV. Setup first. Safety first.",
   "say": "Back to Monday. The maker leaves the instructions alone, restores the connection, and runs the same set again. Compare with shows the twelve cases going from fail to pass. Remember for the exam. Four results: Pass, Fail, Invalid, Error. A demanding pass score gives Fail, not Invalid. Activity map explains one case. Compare with measures a change. Eighty nine days, then C S V. Check the setup first, and triage safety first."
  }
 ],
 "check": [
  {
   "stem": "For how many days are the results available in Copilot Studio?",
   "options": [
    "30",
    "365",
    "89",
    "7"
   ],
   "answer": 2,
   "explanation": "They are available for 89 days; to keep them longer, export to CSV."
  },
  {
   "stem": "When does Invalid appear?",
   "options": [
    "When the agent fails the whole test run",
    "When the pass threshold is set very high",
    "Never, not even when data is missing",
    "When the expected data is missing"
   ],
   "answer": 3,
   "explanation": "Invalid appears if the expected response, keywords, or tools are missing."
  },
  {
   "stem": "What is Compare with used for?",
   "options": [
    "To export solutions",
    "To compare two runs of the same test set",
    "To create topics from a test case",
    "To import cases from a flow run"
   ],
   "answer": 1,
   "explanation": "It compares two runs of the same test set."
  },
  {
   "stem": "A very high pass score produces...",
   "options": [
    "Error",
    "Fail",
    "Invalid",
    "Always Pass"
   ],
   "answer": 1,
   "explanation": "A demanding threshold produces Fail, not Invalid."
  }
 ],
 "reto": {
  "text": "Run a test set twice, changing the instructions in between.\nUse Compare with and see which cases changed.\nExport the results to CSV.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results"
},
{
 "id": "L38",
 "module": 7,
 "title": "Solutions and agents",
 "level": "intermediate",
 "minutes": 11,
 "skills": [
  "3.2a",
  "3.2b"
 ],
 "theory": {
  "intro": "A solution is a box that groups everything in your agent so you can move it between environments, like a suitcase you pack in one place and open in another. Every Copilot Studio agent lives inside a solution. Knowing its rules helps you avoid mistakes when you export and import.",
  "sections": [
   {
    "heading": "Where your agent lives",
    "body": "Every agent is created inside a solution: the default solution, unless you set a preferred solution. To move agents between environments, it is best to use a custom solution with your own publisher and its prefix. Keep just one, because you cannot change the publisher of a component in a managed solution.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Unmanaged</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">solution</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Export</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">managed</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Target</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">environment</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Develop unmanaged, deploy managed</text></svg>"
   },
   {
    "heading": "Unmanaged and managed",
    "body": "Unmanaged solutions are for development; managed solutions are for deployment. You get a managed solution by exporting the unmanaged one as managed."
   },
   {
    "heading": "Before you export and import",
    "body": "Components you add after putting the agent in the solution, such as new topics or flows, must also be added before you export, with Advanced, Add required objects. Removing the agent from the solution does not remove its components.\n\nAfter you import, you must set up authentication again and publish.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">NexoCore solution</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Publisher</span><span style=\"text-align:right\">Contoso, prefix nexo</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Preferred solution</span><span style=\"text-align:right\">NexoCore</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Before export</span><span style=\"text-align:right\">Add required objects</span></div></div>"
   },
   {
    "heading": "Clear local changes",
    "body": "To remove the local changes of a managed agent, open Solution Layers, select the unmanaged layer, and choose Remove unmanaged layer. One export trap: you cannot export a solution that has a topic with dots in its name."
   }
  ],
  "steps": [
   "Create a custom solution with your own publisher and prefix.",
   "Set it as the preferred solution so your agents are created in it.",
   "Create the agent, or add the existing one to the solution.",
   "After adding new topics or flows, use Advanced, Add required objects.",
   "Export the solution as managed (from the unmanaged one).",
   "Import it in the other environment.",
   "Set up authentication again and publish the agent."
  ],
  "example": "Contoso creates the NexoCore solution with its own publisher and sets it as the preferred solution, so its IT agent is born inside it. After adding a new topic and a new flow, they use Add required objects before exporting. A topic with dots in its name blocked the export, so they renamed it. They export as managed and import into Test, where they set up authentication again and publish. If someone changed something locally in Test, they remove the unmanaged layer from Solution Layers.",
  "examTips": [
   "It will not export: a topic with dots in its name.",
   "Trap: changing the publisher of a component in a managed solution. It is not possible.",
   "Unmanaged is for development; managed is for deployment; removing the agent does not remove its components."
  ],
  "glossary": [
   {
    "term": "Solution",
    "def": "A container that groups components so you can move them between environments."
   },
   {
    "term": "Publisher",
    "def": "The owner and prefix of the solution components."
   },
   {
    "term": "Managed / unmanaged",
    "def": "Managed is for deployment; unmanaged is for development."
   },
   {
    "term": "Solution Layers",
    "def": "A view of a component's layers; lets you remove the unmanaged layer."
   }
  ]
 },
 "scenes": [
  {
   "title": "Moving day",
   "caption": "Contoso wants Nexo moved from development to the Test environment. Today: how to pack an agent so it travels safely.",
   "say": "Moving day at Contoso. Valeria has built Nexo, the I T agent, in her development environment. Now the service manager wants Nexo in the Test environment, so Marta and her team can try it. But an agent does not travel loose. It travels packed, with everything it needs, and a few rules decide whether it arrives working. Today you learn how solutions carry your agent between environments."
  },
  {
   "title": "Every agent lives in a box",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Where an agent lives</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Solution</span><span style=\"text-align:right\">Groups everything in your agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Set nothing</span><span style=\"text-align:right\">Default solution</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Preferred solution set</span><span style=\"text-align:right\">Agents are created in it</span></div></div>",
   "caption": "A solution groups everything in your agent. Every agent is created in one: the default solution, unless you set a preferred solution.",
   "say": "Keep this picture. A solution is a box that groups everything in your agent, like a moving crate you pack in one place and open in another. Every Copilot Studio agent lives inside a solution. If you set nothing, the agent is created in the default solution. If you set a preferred solution, your agents are created in that one instead. So the question is never whether Nexo has a box, only which box."
  },
  {
   "title": "Your own label",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Custom solution</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Publisher</span><span style=\"text-align:right\">Contoso · prefix nexo</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Preferred solution</span><span style=\"text-align:right\">NexoCore</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Keep one publisher</span><span style=\"text-align:right\">Cannot change in managed</span></div></div>",
   "caption": "To move agents, use a custom solution with your own publisher and prefix. Keep just one publisher: it cannot change in managed.",
   "say": "To move agents between environments, it is best to use a custom solution with your own publisher and its prefix. The publisher is the owner label on the crate. Contoso creates the NexoCore solution, with the publisher Contoso and the prefix nexo, and sets it as the preferred solution. Now Nexo is born inside it. Keep just one publisher, because you cannot change the publisher of a component in a managed solution."
  },
  {
   "title": "Develop, then deploy",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two kinds</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Unmanaged</span><span style=\"text-align:right\">For development</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Managed</span><span style=\"text-align:right\">For deployment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">How managed is made</span><span style=\"text-align:right\">Export the unmanaged one as managed</span></div></div>",
   "caption": "Unmanaged solutions are for development; managed solutions are for deployment. You get managed by exporting the unmanaged one as managed.",
   "say": "Solutions come in two kinds. Unmanaged solutions are for development: the crate is open, and Valeria can keep changing what is inside. Managed solutions are for deployment: the crate is sealed for the trip. You do not build a managed solution from scratch. You get it by exporting the unmanaged one as managed. Develop unmanaged, deploy managed."
  },
  {
   "title": "Decide: the right crate",
   "caption": "Valeria finishes Nexo inside NexoCore. Contoso wants Nexo in the Test environment. Which solution should she import in Test?",
   "say": "Your turn. Valeria finishes building Nexo inside the NexoCore solution. Now Contoso wants Nexo in the Test environment. Which solution should she import in Test? The unmanaged one, so Test can keep editing it? A managed export made from the unmanaged one? Or the default solution with every agent inside? Decide before I answer. A managed export made from the unmanaged one. Managed solutions are for deployment, and you get one by exporting as managed. Unmanaged is for development, so it stays where Valeria builds."
  },
  {
   "title": "Pack the late arrivals",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Before you export</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">New topics or flows</span><span style=\"text-align:right\">Advanced › Add required objects</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Remove the agent</span><span style=\"text-align:right\">Its components stay</span></div></div>",
   "caption": "Topics or flows added after the agent joined the solution: add them with Advanced, Add required objects before you export.",
   "say": "Here is a step people forget. Components you add after putting the agent in the solution, such as new topics or flows, are not packed by themselves. Before you export, add them with Advanced, Add required objects. Valeria adds a new topic and a new flow to Nexo, so she uses Add required objects first. And one more rule: removing the agent from the solution does not remove its components."
  },
  {
   "title": "The dotted name",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Export trap</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Topic with dots in its name</span><span style=\"text-align:right\">Will not export</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fix</span><span style=\"text-align:right\">Rename the topic</span></div></div>",
   "caption": "Export trap: you cannot export a solution that has a topic with dots in its name. Rename the topic, then export.",
   "say": "Now one export trap. You cannot export a solution that has a topic with dots in its name. Valeria tries to export NexoCore, and the export is blocked. She checks the topics and finds one whose name has dots in it. She renames that topic, and the export goes through. If a solution will not export, look at the topic names first."
  },
  {
   "title": "Decide: the blocked export",
   "caption": "New topic and flow added with Add required objects. The export is refused; one topic has dots in its name. What should Valeria do?",
   "say": "Your turn. Valeria adds a new topic and a new flow with Add required objects. Her export is refused, and one topic has dots in its name. What should she do? Change the publisher of the NexoCore components? Remove Nexo from the solution and add it back? Or rename the topic that has dots in its name? Decide before I answer. Rename the topic that has dots in its name. Dots in a topic name block the export. The publisher is not the problem, and you keep just one."
  },
  {
   "title": "Unpack and clean up",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">After you import</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Then</span><span style=\"text-align:right\">Set up authentication again · publish</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Local changes</span><span style=\"text-align:right\">Solution Layers › Remove unmanaged layer</span></div></div>",
   "caption": "After you import: set up authentication again and publish. Local changes on a managed agent: Solution Layers, Remove unmanaged layer.",
   "say": "The crate arrives in Test. After you import, you must set up authentication again and publish the agent. Import alone is not the finish line. Later, someone in Test changes something locally on the managed Nexo. To remove those local changes, open Solution Layers, select the unmanaged layer, and choose Remove unmanaged layer. Nexo goes back to what was imported."
  },
  {
   "title": "Decide: local edits in Test",
   "caption": "In Test, someone changed the managed Nexo locally. Contoso wants Nexo back exactly as imported. What should Valeria do?",
   "say": "Your turn. In Test, someone changed the managed Nexo locally. Contoso wants Nexo back exactly as it was imported. What should Valeria do? Remove the unmanaged layer in Solution Layers? Remove Nexo from the solution to drop the edits? Or change the publisher of the edited components? Decide before I answer. Remove the unmanaged layer in Solution Layers. Local changes sit in the unmanaged layer, and removing it clears them. Removing the agent from the solution does not remove its components."
  },
  {
   "title": "In Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Custom solution · publisher · prefix</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Set as preferred solution</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Create or add the agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Advanced › Add required objects</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Export as managed</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Import · auth · publish</span></div></div>",
   "caption": "Custom solution and publisher, preferred solution, agent inside, Add required objects, export as managed, import, authentication and publish.",
   "say": "Here are the steps in order. Create a custom solution with your own publisher and prefix. Set it as the preferred solution, so your agents are created in it. Create the agent, or add the existing one to the solution. After adding new topics or flows, use Advanced, Add required objects. Export the solution as managed, from the unmanaged one. Import it in the other environment. Then set up authentication again and publish the agent."
  },
  {
   "title": "Packed and delivered",
   "caption": "Default unless preferred. One publisher. Unmanaged develops, managed deploys. Add required objects. Dots block export. Auth and publish. Remove unmanaged layer.",
   "say": "Back to moving day. NexoCore arrives sealed in Test, Valeria sets up authentication and publishes, and Marta's team starts testing. Remember for the exam. Agents go in the default solution unless you set a preferred one. Keep one publisher. Unmanaged develops, managed deploys. Add required objects before export. Dots in a topic name block the export. Removing the agent keeps its components. Next, environment variables."
  }
 ],
 "check": [
  {
   "stem": "Where is an agent created if you set nothing?",
   "options": [
    "In an Azure AI Search index",
    "In the default solution",
    "In a Teams channel for the team",
    "In Azure Key Vault secrets"
   ],
   "answer": 1,
   "explanation": "It is created in the default solution, unless you set a preferred solution."
  },
  {
   "stem": "Which type of solution is deployed?",
   "options": [
    "Neither",
    "Both the same",
    "Managed",
    "Unmanaged"
   ],
   "answer": 2,
   "explanation": "Unmanaged solutions are for development; managed solutions are for deployment."
  },
  {
   "stem": "What prevents a solution from exporting?",
   "options": [
    "Using Teams channels",
    "Having a publisher",
    "Having an agent with flows",
    "A topic with dots in its name"
   ],
   "answer": 3,
   "explanation": "You cannot export it if a topic has dots in its name."
  },
  {
   "stem": "What do you do after you import?",
   "options": [
    "Nothing, it works right away",
    "Set up authentication again and publish",
    "Change the publisher in the solution",
    "Delete the solution and reimport it"
   ],
   "answer": 1,
   "explanation": "After you import, you must set up authentication again and publish."
  }
 ],
 "reto": {
  "text": "Create a solution with your own publisher.\nSet it as the preferred solution and create an agent in it.\nExport as managed and import into another environment.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-overview"
},
{
 "id": "L39",
 "module": 7,
 "title": "Environment variables",
 "level": "intermediate",
 "minutes": 11,
 "skills": [
  "3.2c"
 ],
 "theory": {
  "intro": "An environment variable is a value that changes depending on the environment, like the table number in each restaurant of a chain: the menu is the same, but the local detail is different. This way the same agent works in Dev, Test, and Production without editing it.",
  "sections": [
   {
    "heading": "What it is and which types exist",
    "body": "An environment variable travels with the solution, and its value is given for each environment when you import or deploy. The types are Decimal number, Text, JSON, Two options, Data source, and Secret.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Environment variable</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Definition</span><span style=\"text-align:right\">travels in the solution</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default value</span><span style=\"text-align:right\">is exported</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Current value</span><span style=\"text-align:right\">per environment; can be removed before export</span></div></div>"
   },
   {
    "heading": "Secret and Key Vault",
    "body": "The Secret type stores a reference to a secret in Azure Key Vault: the real secret does not live in Dataverse or in the solution. Only Azure Key Vault is supported as a store, and it must be in the same tenant.\n\nTo use it, you must register the Microsoft.PowerPlatform resource provider in the subscription and give the Key Vault Secrets User role to whoever creates it.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">NexoCore variables</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">ApiBaseUrl (Text)</span><span style=\"text-align:right\">different in Dev and Test</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">ApiKey (Secret)</span><span style=\"text-align:right\">reference to Key Vault</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Required role</span><span style=\"text-align:right\">Key Vault Secrets User</span></div></div>"
   },
   {
    "heading": "Default value and current value",
    "body": "Before you export, you can remove the current value so the development value is not exported. When you import or deploy with Pipelines, you are asked for the value of the new environment."
   },
   {
    "heading": "In Copilot Studio",
    "body": "Variables are read-only. The published agent includes the values they had when it was published, so you must republish after a change. The exception is Secret types, which are retrieved at runtime."
   }
  ],
  "steps": [
   "In your solution, create an Environment variable and choose its type (for example Text for the base URL).",
   "Set the default value or the current value only in Dev.",
   "For a key, choose the Secret type and link the Azure Key Vault secret.",
   "Register the Microsoft.PowerPlatform resource provider in the Azure subscription.",
   "Give the Key Vault Secrets User role to whoever creates the variable.",
   "Before you export, remove the development current value.",
   "Import into Test: you are asked for the value of that environment. Republish the agent if you changed a variable."
  ],
  "example": "Contoso's API changes address between Dev and Test, so its base URL is a variable of type Text. The API key is of type Secret: it stores only a reference to Azure Key Vault, not the key. The admin registers the Power Platform resource provider and gives the Key Vault Secrets User role. Before exporting, the team removes the current value so they do not carry the Dev one. When they import into Test, the system asks them for the Test value.",
  "examTips": [
   "In Copilot Studio they are read-only; the published agent has the values from publish time: republish, except Secret, which is read at runtime.",
   "Trap: storing the real secret in Dataverse.",
   "Secret = reference to Azure Key Vault (same tenant); remove the current value before you export."
  ],
  "glossary": [
   {
    "term": "Environment variable",
    "def": "A value that changes by environment and travels with the solution."
   },
   {
    "term": "Current value",
    "def": "The value currently set in an environment, different from the default."
   },
   {
    "term": "Secret",
    "def": "A type that stores a reference to a secret in Azure Key Vault."
   },
   {
    "term": "Key Vault Secrets User",
    "def": "A role that allows reading secrets from Key Vault."
   }
  ]
 },
 "scenes": [
  {
   "title": "One agent, three addresses",
   "caption": "NexoCore moves from Dev to Test. The API address changes, and the API key must stay secret. Today: environment variables.",
   "say": "NexoCore has arrived in Test, but there is a problem. Nexo calls a Contoso A P I, and that A P I has a different address in Dev and in Test. Nexo also needs an A P I key, and the security team says the key must stay secret. Valeria does not want to edit Nexo in every environment. Today you learn how environment variables solve both problems."
  },
  {
   "title": "A value that changes by place",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Environment variable</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Travels</span><span style=\"text-align:right\">With the solution</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Value</span><span style=\"text-align:right\">Given per environment at import or deploy</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Result</span><span style=\"text-align:right\">Same agent in Dev, Test, Production</span></div></div>",
   "caption": "An environment variable travels with the solution. Its value is given for each environment when you import or deploy.",
   "say": "Picture a chain of hotels built from one plan. The rooms are the same in every hotel, but the street address on the door changes. An environment variable works the same way. It is a value that changes depending on the environment, and it travels with the solution. Its value is given for each environment when you import or deploy. So the same agent works in Dev, Test, and Production without editing it."
  },
  {
   "title": "The types",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Types</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Decimal number · Text · JSON</span><span style=\"text-align:right\">Two options · Data source · Secret</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">ApiBaseUrl</span><span style=\"text-align:right\">Text</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">A key</span><span style=\"text-align:right\">Secret, never Text</span></div></div>",
   "caption": "Types: Decimal number, Text, JSON, Two options, Data source, and Secret. A base URL fits the Text type.",
   "say": "Every environment variable has a type. The types are Decimal number, Text, J S O N, Two options, Data source, and Secret. Contoso's A P I changes address between Dev and Test, so Valeria creates a variable for its base U R L, of type Text. She calls it Api Base Url. The key is different. A key should never be Text. For a key, there is Secret."
  },
  {
   "title": "Secret and Key Vault",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Secret</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stores</span><span style=\"text-align:right\">A reference to Azure Key Vault</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Real secret</span><span style=\"text-align:right\">Not in Dataverse or the solution</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Store</span><span style=\"text-align:right\">Azure Key Vault only · same tenant</span></div></div>",
   "caption": "Secret stores only a reference to a secret in Azure Key Vault, in the same tenant. The real secret is not in Dataverse.",
   "say": "The Secret type stores a reference to a secret in Azure Key Vault. Think of a claim ticket for a locked box in a bank vault. The real secret does not live in Dataverse or in the solution. Only the ticket travels. Only Azure Key Vault is supported as a store, and it must be in the same tenant. So Valeria creates Api Key, of type Secret, linked to the Key Vault secret."
  },
  {
   "title": "Decide: where the key lives",
   "caption": "Nexo needs the API key in every environment, and it must never sit in the solution. What should Valeria do?",
   "say": "Your turn. Nexo needs the Contoso A P I key in every environment. The security team says the key must never sit in the solution. What should Valeria do? Store the key as a Text variable in Dataverse? Use a Secret variable linked to Key Vault? Or type the key into each topic after import? Decide before I answer. Use a Secret variable linked to Key Vault. Secret stores only a reference, so the real key stays out of the solution. Storing the real secret in Dataverse is the trap."
  },
  {
   "title": "Two things before Secret works",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Before Secret works</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Azure subscription</span><span style=\"text-align:right\">Register Microsoft.PowerPlatform provider</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who creates it</span><span style=\"text-align:right\">Key Vault Secrets User role</span></div></div>",
   "caption": "Register the Microsoft.PowerPlatform resource provider in the subscription. Give the Key Vault Secrets User role to whoever creates the variable.",
   "say": "Secret needs two things set up in Azure first. One, the admin registers the Microsoft dot Power Platform resource provider in the Azure subscription. Two, the person who creates the variable gets the Key Vault Secrets User role. That role allows reading secrets from Key Vault. At Contoso, the admin registers the provider and gives Valeria the role. Now her Api Key variable can link to the vault."
  },
  {
   "title": "Default value and current value",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Two values</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Current value</span><span style=\"text-align:right\">Set per environment · remove before export</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Import or deploy</span><span style=\"text-align:right\">Asks for the new environment's value</span></div></div>",
   "caption": "Remove the current value before you export, so the Dev value does not travel. On import or deploy, you are asked for the new value.",
   "say": "A variable can hold a default value and a current value. The current value is the value set in one environment, different from the default. Valeria set the Dev address as the current value, only in Dev. Before you export, you can remove the current value, so the development value is not exported. When you import, or deploy with Pipelines, you are asked for the value of the new environment."
  },
  {
   "title": "Decide: the Dev address",
   "caption": "ApiBaseUrl holds the Dev address as its current value. Contoso does not want it to travel to Test. What should Valeria do?",
   "say": "Your turn. Api Base Url holds the Dev address as its current value. Valeria will export NexoCore for Test, and Contoso does not want that address to travel. What should she do? Remove the current value before she exports? Delete the variable and build it again in Test? Or change the variable type from Text to Secret? Decide before I answer. Remove the current value before she exports. Then the Dev value is not exported, and Test asks for its own value. Deleting the variable breaks what the solution carries."
  },
  {
   "title": "In Copilot Studio",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">In Copilot Studio</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Variables</span><span style=\"text-align:right\">Read-only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Published agent</span><span style=\"text-align:right\">Values from publish time · republish</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Exception</span><span style=\"text-align:right\">Secret, read at runtime</span></div></div>",
   "caption": "In Copilot Studio, variables are read-only. The published agent keeps its publish-time values: republish after a change. Secret is read at runtime.",
   "say": "In Copilot Studio, environment variables are read-only. The published agent includes the values they had when it was published. So if a variable changes, you must republish the agent. The exception is Secret. Secret types are retrieved at runtime, so Nexo reads the key from Key Vault each time. Remember the pair. Text and the other types need a republish. Secret does not."
  },
  {
   "title": "Decide: the old address",
   "caption": "In Test, the admin updated ApiBaseUrl, but the published Nexo still calls the old address. What should Valeria do?",
   "say": "Your turn. In Test, the admin updated the value of Api Base Url. But the published Nexo still calls the old address. What should Valeria do? Edit the value directly inside the Nexo topic? Import the whole solution into Test again? Or republish Nexo so it picks up the new value? Decide before I answer. Republish Nexo so it picks up the new value. The published agent keeps the values from publish time. Variables are read-only in Copilot Studio, so you cannot edit them from a topic."
  },
  {
   "title": "The steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Create variable · choose type</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Value only in Dev</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Secret · link Key Vault secret</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Register resource provider</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Key Vault Secrets User role</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Remove current value · export</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">7</span><span style=\"text-align:right\">Import Test · enter value · republish</span></div></div>",
   "caption": "Create the variable, set the value only in Dev, link the Secret, register the provider, give the role, remove the value, import, republish.",
   "say": "Here are the steps in order. In your solution, create an environment variable and choose its type, Text for the base U R L. Set the default or current value only in Dev. For the key, choose Secret and link the Azure Key Vault secret. Register the resource provider in the Azure subscription. Give the Key Vault Secrets User role. Before you export, remove the development current value. Import into Test, enter its value, and republish if a variable changed."
  },
  {
   "title": "The right address in every hotel",
   "caption": "Value per environment. Secret is a Key Vault reference, same tenant. Remove the current value. Read-only: republish, except Secret.",
   "say": "Back at Contoso. In Test, Nexo calls the Test address, and the key stays in Key Vault. Remember for the exam. An environment variable travels with the solution, with a value for each environment. Secret stores a reference to Azure Key Vault, in the same tenant, never the real secret in Dataverse. Remove the current value before you export. In Copilot Studio, republish after a change, except Secret. Next, Power Platform Pipelines."
  }
 ],
 "check": [
  {
   "stem": "What does a variable of type Secret store?",
   "options": [
    "The real secret in Dataverse",
    "Nothing",
    "A reference to Azure Key Vault",
    "A CSV file"
   ],
   "answer": 2,
   "explanation": "It stores a reference to a secret in Azure Key Vault."
  },
  {
   "stem": "What must you do after changing a variable (not Secret) in a published agent?",
   "options": [
    "Change environment",
    "Republish",
    "Delete the agent",
    "Nothing"
   ],
   "answer": 1,
   "explanation": "The published agent has the values from publish time, so you must republish."
  },
  {
   "stem": "Which role must you give to use Secret?",
   "options": [
    "Solution Owner for the environment",
    "Reader on the subscription",
    "Key Vault Secrets User",
    "Global Administrator in Azure AD"
   ],
   "answer": 2,
   "explanation": "You give the Key Vault Secrets User role to whoever creates the variable."
  },
  {
   "stem": "Why do you remove the current value before exporting?",
   "options": [
    "So the Dev value does not export",
    "To save credits on the export run",
    "To avoid the Key Vault connection errors",
    "To change the solution publisher name"
   ],
   "answer": 0,
   "explanation": "This way the Dev value is not exported."
  }
 ],
 "reto": {
  "text": "Create an environment variable of type Text in your solution.\nAdd the current value only in Dev and export.\nImport into Test and see how it asks for the value.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables"
},
{
 "id": "L40",
 "module": 7,
 "title": "Power Platform Pipelines",
 "level": "exam",
 "minutes": 12,
 "skills": [
  "3.2d"
 ],
 "theory": {
  "intro": "Pipelines in Power Platform automate the trip of a solution from Dev to Test to Production, like a conveyor belt with quality checks: every package goes through all the stations in order. Nobody can skip testing. It is the guided way to do ALM without your own scripts.",
  "sections": [
   {
    "heading": "What they deploy",
    "body": "Pipelines deploy managed solutions. The same exported artifact goes through the stages in order, so you cannot skip QA. You see and run them from an unmanaged solution in the development environment, not from the default solution or from the targets.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Dev</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">unmanaged</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\" style=\"stroke:var(--accent)\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Test</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">managed</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\" style=\"stroke:var(--accent)\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Prod</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">managed</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">The host stores artifacts and backups</text></svg>"
   },
   {
    "heading": "Environment requirements",
    "body": "The host must be a production environment, and it does not have to be managed. Developer environments do not need to be managed. All the other environments in the pipeline must be Managed Environments."
   },
   {
    "heading": "Deployment rules",
    "body": "You deploy one solution at a time, the default import type is Upgrade, and you cannot deploy across tenants. Connections, connection references, and environment variables are provided beforehand and validated before the deployment.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:12px;color:var(--muted);margin-bottom:6px\">Pipeline NexoCore</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Host</span><span style=\"text-align:right\">production environment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Stage 1</span><span style=\"text-align:right\">Dev to Test</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Extension</span><span style=\"text-align:right\">OnPreDeploymentStarted</span></div></div>"
   },
   {
    "heading": "How to extend it",
    "body": "Use a pre-deployment step (trigger OnPreDeploymentStarted), or delegated deployments (trigger OnApprovalStarted) that run as a service principal. Status actions use 20 to complete or approve and 30 to reject."
   }
  ],
  "steps": [
   "Create (or choose) the pipelines host environment, a production one.",
   "In the host, create the pipeline and its stages (for example Dev, Test, Production).",
   "Check that the target environments are Managed Environments (Developer ones do not need to be).",
   "In Dev, work from an unmanaged solution (not the default solution).",
   "Choose Deploy from the solution and pick the pipeline and the stage.",
   "Provide connections, connection references, and environment variables; they are validated first.",
   "Deploy. Optional: add a pre-deployment step with OnPreDeploymentStarted and respond with status 20 to complete."
  ],
  "example": "Contoso has the NexoCore pipeline, from Dev to Test. Its unmanaged solution in Dev is deployed as managed; before deploying, the system validates the connections, connection references, and environment variables. The security team added a pre-deployment step: a manual approval that uses status 20 to complete and 30 to reject. Another team uses delegated deployments with a service principal. An attempt to deploy to another tenant was rejected: for that they use Azure DevOps or GitHub.",
  "examTips": [
   "Requirements: production host (it does not have to be managed); Developer environments not managed; all the others must be Managed Environments.",
   "Traps: deploying unmanaged, to another tenant, or more than one solution per deployment.",
   "Pre-deployment: 20 complete, 30 reject. Delegated: 20 approve, 30 reject. Default import: Upgrade."
  ],
  "glossary": [
   {
    "term": "Pipeline",
    "def": "An automated deployment route between environments."
   },
   {
    "term": "Host",
    "def": "The production environment where the pipelines live."
   },
   {
    "term": "Managed Environment",
    "def": "An environment with extra Power Platform governance; required for targets."
   },
   {
    "term": "Delegated deployment",
    "def": "A deployment that runs as a service principal, with approval."
   }
  ]
 },
 "scenes": [
  {
   "title": "Three stops for NexoCore",
   "caption": "NexoCore works in Dev and must reach Test, then Production, with the same checks every time. Today: Power Platform Pipelines.",
   "say": "NexoCore works in Dev, and now it must reach Test and then Production. Valeria has been exporting and importing it by hand, and once she almost skipped Test. The service manager wants every release to pass the same checks, in the same order. Today you learn Power Platform Pipelines, the guided way to do A L M without writing your own scripts."
  },
  {
   "title": "Stations in order",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Pipeline</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Trip</span><span style=\"text-align:right\">Dev → Test → Production</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Deploys</span><span style=\"text-align:right\">Managed solutions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Same artifact</span><span style=\"text-align:right\">Stages in order · no skipping QA</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Host</span><span style=\"text-align:right\">Stores artifacts and backups</span></div></div>",
   "caption": "A pipeline automates the trip from Dev to Test to Production. It deploys managed solutions, and nobody can skip testing.",
   "say": "Picture a plant nursery. Every tray moves from the seedling bench to the hardening greenhouse, and only then to the garden centre. A pipeline works the same way. It automates the trip of a solution from Dev to Test to Production. Pipelines deploy managed solutions. The same exported artifact goes through the stages in order, so nobody can skip testing. The host, where the pipelines live, stores the artifacts and backups."
  },
  {
   "title": "Where you start",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Where you start</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Run from</span><span style=\"text-align:right\">Unmanaged solution in Dev</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not from</span><span style=\"text-align:right\">Default solution · target environments</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Deploy</span><span style=\"text-align:right\">Pick the pipeline and the stage</span></div></div>",
   "caption": "You see and run pipelines from an unmanaged solution in Dev. Not from the default solution, not from the targets.",
   "say": "You see and run pipelines from an unmanaged solution in the development environment. Not from the default solution, and not from the target environments. At Contoso, Valeria opens her unmanaged NexoCore solution in Dev. She chooses Deploy, then picks the pipeline and the stage, for example Test. From there the deployment begins, and Test receives NexoCore as a managed solution."
  },
  {
   "title": "Decide: where to start",
   "caption": "Valeria is ready to send NexoCore to Test with the pipeline. Where should she start the deployment?",
   "say": "Your turn. Valeria is ready to send NexoCore to Test with the pipeline. In Dev she sees the default solution and her own NexoCore, and Test holds an older managed copy. Where should she start the deployment? From the default solution in Dev? From an unmanaged solution in Dev? Or from the managed NexoCore copy in Test? Decide before I answer. From an unmanaged solution in Dev. Pipelines run from an unmanaged solution in the development environment. The default solution is the trap, because pipelines are not run from it."
  },
  {
   "title": "What each environment must be",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Environment requirements</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Host</span><span style=\"text-align:right\">Production · not necessarily managed</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Developer</span><span style=\"text-align:right\">Does not need to be managed</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">All others</span><span style=\"text-align:right\">Must be Managed Environments</span></div></div>",
   "caption": "Host: a production environment, not necessarily managed. Developer environments: not managed. All the others: Managed Environments.",
   "say": "Pipelines have environment requirements. The host must be a production environment, but it does not have to be managed. Developer environments do not need to be managed either. All the other environments in the pipeline must be Managed Environments. A Managed Environment adds extra Power Platform governance. At Contoso, the host is a production environment, Dev is a Developer environment, and Test and Production are Managed Environments."
  },
  {
   "title": "One tray at a time",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Deployment rules</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Per deployment</span><span style=\"text-align:right\">One solution</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default import</span><span style=\"text-align:right\">Upgrade</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Other tenant</span><span style=\"text-align:right\">Not supported · use Azure DevOps or GitHub</span></div></div>",
   "caption": "One solution per deployment. The default import type is Upgrade. No deploying across tenants: for that, use Azure DevOps or GitHub.",
   "say": "Now the deployment rules. You deploy one solution at a time, never two in the same deployment. The default import type is Upgrade. And you cannot deploy across tenants. When Contoso tried to send NexoCore to another tenant, the deployment was rejected. For another tenant, Contoso uses Azure DevOps or GitHub instead."
  },
  {
   "title": "Decide: the Test environment",
   "caption": "The NexoCore pipeline has a production host, a Developer environment and a Test environment that is not managed. What is required?",
   "say": "Your turn. Contoso builds the NexoCore pipeline with a production host, a Developer environment for Dev, and a Test environment. Test is not a Managed Environment yet. What does the pipeline require? Make Dev a Managed Environment? Make the host a Managed Environment? Or make Test a Managed Environment? Decide before I answer. Make Test a Managed Environment. Every environment in the pipeline other than the host and Developer environments must be managed. The host is the trap, because it must be production but does not have to be managed."
  },
  {
   "title": "Values checked before the trip",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Validated first</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Provided beforehand</span><span style=\"text-align:right\">Connections · connection references · environment variables</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Checked</span><span style=\"text-align:right\">Before the deployment runs</span></div></div>",
   "caption": "Connections, connection references and environment variables are provided beforehand and validated before the deployment runs.",
   "say": "Remember environment variables from the last lesson. In a pipeline, connections, connection references, and environment variables are provided beforehand. They are validated before the deployment runs. So when Valeria deploys NexoCore to Test, she provides the Test connections and the value for Api Base Url. If something is missing, she finds out before the deployment, not after. Then NexoCore arrives in Test as a managed solution."
  },
  {
   "title": "Extending the pipeline",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Extending</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Pre-deployment step</span><span style=\"text-align:right\">OnPreDeploymentStarted · 20 complete · 30 reject</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Delegated deployments</span><span style=\"text-align:right\">OnApprovalStarted · 20 approve · 30 reject</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Delegated runs as</span><span style=\"text-align:right\">Service principal</span></div></div>",
   "caption": "Pre-deployment step: OnPreDeploymentStarted. Delegated deployments: OnApprovalStarted, as a service principal. Status 20 completes or approves; 30 rejects.",
   "say": "You can extend a pipeline in two ways. One, a pre-deployment step, with the trigger On Pre Deployment Started. Contoso's security team added a manual approval there. Two, delegated deployments, with the trigger On Approval Started, which run as a service principal. Status actions use two numbers. For a pre-deployment step, twenty completes and thirty rejects. For delegated deployments, twenty approves and thirty rejects."
  },
  {
   "title": "Decide: stop the deployment",
   "caption": "The security team finds a problem in its pre-deployment step and must stop this deployment. What status should it send back?",
   "say": "Your turn. The security team reviews NexoCore in its pre-deployment step. They find a problem and must stop this deployment to Test. What should their approval send back? Respond with status thirty? Respond with status twenty? Or respond with status one hundred? Decide before I answer. Respond with status thirty. In a pre-deployment step, thirty rejects the deployment. Twenty is the trap, because twenty completes the step instead of stopping it."
  },
  {
   "title": "The steps",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Steps</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">1</span><span style=\"text-align:right\">Host · a production environment</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">2</span><span style=\"text-align:right\">Pipeline and stages in the host</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">3</span><span style=\"text-align:right\">Targets are Managed Environments</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">4</span><span style=\"text-align:right\">Unmanaged solution in Dev</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">5</span><span style=\"text-align:right\">Deploy · pick pipeline and stage</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">6</span><span style=\"text-align:right\">Connections and variables · validated</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">7</span><span style=\"text-align:right\">Deploy · optional pre-deployment step</span></div></div>",
   "caption": "Host, pipeline and stages, Managed Environments, unmanaged solution in Dev, Deploy, values validated, deploy. Optional: pre-deployment step.",
   "say": "Here are the steps in order. Create or choose the pipelines host, a production environment. In the host, create the pipeline and its stages, for example Dev, Test, and Production. Check that the targets are Managed Environments, except Developer ones. In Dev, work from an unmanaged solution, not the default solution. Choose Deploy, then pick the pipeline and the stage. Provide connections, connection references, and environment variables, which are validated first. Deploy, and optionally add a pre-deployment step that responds with status twenty to complete."
  },
  {
   "title": "Every tray through every station",
   "caption": "Managed solutions, stage by stage. Production host, Managed targets. One solution, Upgrade, same tenant. 20 completes or approves, 30 rejects.",
   "say": "Back at Contoso. NexoCore reaches Test as a managed solution, and the security team approves it. Remember for the exam. Pipelines deploy managed solutions from an unmanaged solution in Dev, stage by stage. The host is production and need not be managed, Developer environments need not be managed, and all the others must be Managed Environments. One solution at a time, Upgrade by default, no crossing tenants. Twenty completes or approves, thirty rejects. Next, Microsoft I Q."
  }
 ],
 "check": [
  {
   "stem": "Which type of solution does a pipeline deploy?",
   "options": [
    "Unmanaged",
    "None",
    "Only the default solution",
    "Managed"
   ],
   "answer": 3,
   "explanation": "Pipelines deploy managed solutions."
  },
  {
   "stem": "What must the host environment be?",
   "options": [
    "A Developer environment",
    "The default solution in Dataverse",
    "A Fabric data agent workspace",
    "A production environment"
   ],
   "answer": 3,
   "explanation": "The host must be a production environment, and it does not have to be managed."
  },
  {
   "stem": "How many solutions are deployed at a time?",
   "options": [
    "One",
    "Two",
    "None",
    "All of them"
   ],
   "answer": 0,
   "explanation": "One solution is deployed at a time."
  },
  {
   "stem": "Which status does a pre-deployment action use to reject?",
   "options": [
    "100",
    "0",
    "30",
    "20"
   ],
   "answer": 2,
   "explanation": "20 completes or approves and 30 rejects."
  }
 ],
 "reto": {
  "text": "Create a pipelines host and a pipeline from Dev to Test.\nDeploy your managed solution with an environment variable.\nAdd a pre-deployment step that approves with status twenty.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines"
},
{
 "id": "L41",
 "module": 4,
 "title": "Microsoft IQ: Foundry IQ, Fabric IQ and Work IQ",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "2.1a",
  "2.4a",
  "2.3d",
  "2.2b"
 ],
 "theory": {
  "intro": "Microsoft IQ is a set of capabilities that give an agent context about your organization. Think of three expert colleagues: one knows the official policies, one knows the business numbers, and one knows how your teams work every day. The context already exists outside Copilot Studio and your agent reuses it; this lesson uses the Microsoft Copilot harness (formerly GitHub Copilot harness), and Fabric IQ and Work IQ are in preview.",
  "sections": [
   {
    "heading": "Three capabilities, three kinds of context",
    "body": "Foundry IQ brings curated knowledge, such as policies and authoritative documents, from knowledge bases built in Microsoft Foundry. Fabric IQ (preview) brings business entities and data from Microsoft Fabric, through the semantic model. Work IQ (preview) brings context about how people work across Microsoft 365: files, email, meetings, and chats.\n\nOn the Microsoft Copilot harness you add each one as a tool, in Tools on the Build tab. The orchestrator decides when to call it from the tool's name and description. With a knowledge source you pick the content in Copilot Studio. With an IQ capability you reuse a setup that someone else maintains on another platform, and you can select only the items you have access to.\n\nQuick choice: policies tuned by another team point to Foundry IQ. Business measures in a Fabric semantic model point to Fabric IQ. Email and meetings point to Work IQ. Documents you write and update yourself fit a knowledge source. A domain run by another Copilot Studio agent fits a connected agent.",
    "figure": {
     "type": "matrix",
     "corner": "Capability",
     "cols": [
      "Foundry IQ",
      "Fabric IQ",
      "Work IQ"
     ],
     "rows": [
      {
       "label": "Brings",
       "cells": [
        "Policies, documents",
        "Business measures",
        "Email, files, meetings"
       ]
      },
      {
       "label": "Comes from",
       "cells": [
        "Foundry knowledge base",
        "Fabric semantic model",
        "Microsoft 365"
       ]
      },
      {
       "label": "Added as",
       "cells": [
        "Tool",
        "Tool",
        "MCP tool"
       ]
      },
      {
       "label": "Preview",
       "cells": [
        false,
        true,
        true
       ]
      }
     ],
     "caption": "Three kinds of context that already exist outside Copilot Studio. Each one is added on the Build tab, in Tools."
    }
   },
   {
    "heading": "Foundry IQ: policies from a knowledge base",
    "body": "An agent can have only one Foundry IQ connection. The connection uses one of four authentication types: API key, Client Certificate Auth, Service principal (a Microsoft Entra ID application), or Microsoft Entra ID Integrated. Every type needs the Foundry IQ Search Service endpoint.\n\nIf the knowledge base returns unexpected results, you work with its owner to tune it in Microsoft Foundry, not in Copilot Studio. Removing the connection in Copilot Studio does not delete or change the knowledge base.\n\nWrite a clear tool name and description: say when to use it, what it returns, and what it does not handle, so two tools do not claim the same questions.",
    "figure": {
     "type": "flow",
     "nodes": [
      {
       "title": "Build tab, Tools",
       "desc": "Add a tool, Foundry IQ"
      },
      {
       "title": "Connection",
       "desc": "One per agent; 4 auth types; Search Service endpoint"
      },
      {
       "title": "Knowledge base",
       "desc": "Pick it, Add to agent, Save"
      },
      {
       "title": "Preview trace",
       "desc": "Confirm the Foundry IQ step ran"
      }
     ],
     "caption": "Connecting Foundry IQ. If the results are wrong, tune the knowledge base in Foundry, not the agent."
    }
   },
   {
    "heading": "Fabric IQ: business data (preview)",
    "body": "Fabric IQ grounds the agent in the Fabric semantic model, with its measures, hierarchies, and dimensions. Because the agent uses that model, you do not rebuild the same metrics or data models in Copilot Studio.\n\nYou need a Microsoft Copilot harness agent and access to the Fabric workspace and semantic model. In the Preview trace, no Fabric IQ call means you should check Tools and the description. A call to a different tool means the boundaries need to be clearer. An error often means a failed authentication, so check that the tool's credentials are current. Removing the tool changes nothing in Fabric."
   },
   {
    "heading": "Work IQ: Microsoft 365 context (preview)",
    "body": "You add Work IQ to an agent as a Model Context Protocol (MCP) tool. It is read-only unless an administrator turns on write operations in the Microsoft 365 admin center. A Global Administrator enables Work IQ once for the tenant, the tenant needs a usage-based billing plan in Copilot Studio, and admins create a separate spending policy for Work IQ usage.\n\nDo not select the workload-specific tools (Mail, Teams, OneDrive, and so on) in place of Work IQ. They are a legacy experience on the standard harness and standard billing. Also remember that each MCP server counts toward the agent's tool total, and extra servers are skipped for a turn, so keep the number of attached MCP servers small."
   }
  ],
  "steps": [
   "Open your Microsoft Copilot harness agent and go to the Build tab.",
   "In Tools, select Add a tool (or + Add tool).",
   "For Foundry IQ, select Foundry IQ, then Create new connection. Pick an authentication type, enter the Search Service endpoint, and select Create.",
   "Select Next, choose the knowledge base, then select Add to agent and Save.",
   "For Fabric IQ, select Fabric IQ, then Add. Sign in if asked, review the name and description, and Save.",
   "For Work IQ, go to Add Tool, MCP, Work IQ (Preview). Create a connection, sign in, and select Add and Configure.",
   "Rewrite each tool description: when to use it, what it returns, and what it does not handle.",
   "In the Preview tab, keep End user preview off, ask a test question, and read the activity trace to confirm the IQ step ran."
  ],
  "example": "Contoso's compliance team keeps HR policies in a Foundry knowledge base, so the HR agent uses Foundry IQ and the policies are never copied. The sales director asks for revenue by region, and Fabric IQ answers from the existing Fabric semantic model. A manager asks which meetings this week mention a renewal, and Work IQ reads Microsoft 365 context, read-only because the admin did not enable writes. Contoso's own product sheets are written by the marketing team, so they stay a knowledge source.",
  "examTips": [
   "Foundry IQ: only one connection per agent, four authentication types that all need the Search Service endpoint. Unexpected results are tuned in Microsoft Foundry, not in Copilot Studio.",
   "Work IQ (preview) is an MCP tool and is read-only unless an admin enables write operations. Do not use the workload-specific tools instead of it. Fabric IQ is also preview.",
   "Choose by who maintains the context: another team's policies = Foundry IQ; a Fabric semantic model = Fabric IQ; Microsoft 365 work data = Work IQ; documents you own = knowledge source."
  ],
  "glossary": [
   {
    "term": "Microsoft IQ",
    "def": "A set of capabilities (Foundry IQ, Fabric IQ, Work IQ) that give agents context about an organization."
   },
   {
    "term": "Foundry IQ",
    "def": "Gives an agent curated knowledge from a knowledge base built in Microsoft Foundry."
   },
   {
    "term": "Fabric IQ",
    "def": "Preview. Grounds an agent in the Microsoft Fabric semantic model of business data."
   },
   {
    "term": "Work IQ",
    "def": "Preview. Gives an agent context about work in Microsoft 365, added as an MCP tool and read-only by default."
   },
   {
    "term": "Semantic model",
    "def": "A Fabric model of business measures, hierarchies, and dimensions that an agent can reuse."
   },
   {
    "term": "Activity trace",
    "def": "The step-by-step view in the Preview tab that shows which tools and knowledge the agent used."
   }
  ]
 },
 "scenes": [
  {
   "title": "Three questions on Tuesday",
   "caption": "One HR agent, three questions. The answers already exist, somewhere else.",
   "say": "Tuesday morning at Contoso. The HR agent gets three questions. An employee asks about the parental leave policy. The sales director asks for revenue by region. A manager asks which meetings this week mention a renewal. None of these answers lives in Copilot Studio. The policy, the numbers and the meetings are kept by other teams, on other platforms. By the end of this class you will know which Microsoft I Q capability answers each one."
  },
  {
   "title": "Three expert colleagues",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Microsoft IQ</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Foundry IQ</span><span style=\"text-align:right\">Policies, authoritative documents</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fabric IQ (preview)</span><span style=\"text-align:right\">Business numbers</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Work IQ (preview)</span><span style=\"text-align:right\">Files, email, meetings, chats</span></div></div>",
   "caption": "Foundry IQ = policies. Fabric IQ = business numbers. Work IQ = how teams work.",
   "say": "Here is the picture to keep. Microsoft I Q is like three expert colleagues sitting next to your agent. The first one knows the official policies. The second one knows the business numbers. The third one knows how your teams work every day, their files, email, meetings and chats. Your agent does not learn what they know. It asks them. Their names are Foundry I Q, Fabric I Q and Work I Q."
  },
  {
   "title": "Reuse, never copy",
   "caption": "The context already exists outside Copilot Studio. The agent reuses it.",
   "say": "The key idea is reuse. With a knowledge source, you pick and upload the content yourself in Copilot Studio. With an I Q capability, the context already exists outside Copilot Studio, and someone else maintains it on another platform. Your agent simply points to it, and you can select only the items you have access to. Note that Fabric I Q and Work I Q are still in preview."
  },
  {
   "title": "Where you add them",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Where you add them</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Harness</span><span style=\"text-align:right\">Microsoft Copilot harness (formerly GitHub Copilot harness)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Place</span><span style=\"text-align:right\">Build tab › Tools</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Who calls it</span><span style=\"text-align:right\">Orchestrator, by name and description</span></div></div>",
   "caption": "Microsoft Copilot harness (formerly GitHub Copilot harness) · Build tab · Tools.",
   "say": "Where do these colleagues join the agent? On the Microsoft Copilot harness, which until late October was called the GitHub Copilot harness. Same harness, new name, so the exam may still use the old one. You open the Build tab and add each capability as a tool, in Tools. The orchestrator then decides when to call it, based only on the tool's name and description."
  },
  {
   "title": "Foundry IQ: the policy expert",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Foundry IQ</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Connections</span><span style=\"text-align:right\">Only one per agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Auth types</span><span style=\"text-align:right\">API key, client certificate, service principal, Entra ID integrated</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Always needs</span><span style=\"text-align:right\">Search Service endpoint</span></div></div>",
   "caption": "Curated knowledge from a Microsoft Foundry knowledge base. One connection per agent.",
   "say": "Foundry I Q is the policy expert. It brings curated knowledge, such as policies and authoritative documents, from a knowledge base built in Microsoft Foundry. Remember two exam facts. An agent can have only one Foundry I Q connection. And the connection uses one of four authentication types: A P I key, client certificate, service principal, or Microsoft Entra I D integrated. Every type needs the Foundry I Q search service endpoint."
  },
  {
   "title": "Decide: the wrong answers",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Unexpected results</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fix where?</span><span style=\"text-align:right\">Microsoft Foundry, with the owner</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Remove connection?</span><span style=\"text-align:right\">Knowledge base unchanged</span></div></div>",
   "caption": "Foundry IQ returns unexpected results. Where do you fix it?",
   "say": "Your turn. The HR agent uses Foundry I Q, but its answers about leave are strange and incomplete. Where do you fix it? By removing the connection and adding it again? In Copilot Studio, by editing the agent instructions? Or in Microsoft Foundry, together with the knowledge base owner? Decide before I answer. You tune it in Microsoft Foundry, with the owner. The knowledge base lives there, and removing the connection in Copilot Studio does not change it at all."
  },
  {
   "title": "Descriptions draw the borders",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Tool description</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">When</span><span style=\"text-align:right\">When to use it</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Returns</span><span style=\"text-align:right\">What it returns</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Not</span><span style=\"text-align:right\">What it does not handle</span></div></div>",
   "caption": "Say when to use it, what it returns, and what it does not handle.",
   "say": "Because the orchestrator chooses tools from their descriptions, a vague description is a real problem. Two tools may both claim the same question, or neither one gets called. So rewrite every description in three parts. When to use it. What it returns. And what it does not handle. For example: use for H R policy questions, returns policy text, does not handle salaries or personal data."
  },
  {
   "title": "Fabric IQ: the numbers expert",
   "caption": "Preview. Grounds the agent in the Fabric semantic model: measures, hierarchies, dimensions.",
   "say": "Fabric I Q, in preview, is the numbers expert. It grounds your agent in the Microsoft Fabric semantic model, with its measures, hierarchies and dimensions. Because the agent uses that model, you do not rebuild the same metrics or data models in Copilot Studio. Revenue by region already exists in Fabric, so the agent reuses it. You need an agent on the Microsoft Copilot harness and access to the Fabric workspace and semantic model."
  },
  {
   "title": "Read the activity trace",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Fabric IQ trace</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">No call</span><span style=\"text-align:right\">Check Tools and description</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Other tool called</span><span style=\"text-align:right\">Clarify borders</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Error</span><span style=\"text-align:right\">Check credentials</span></div></div>",
   "caption": "No call: check Tools and description. Wrong tool: clarify borders. Error: check credentials.",
   "say": "How do you know it worked? Open the Preview tab, keep End user preview off, ask a test question and read the activity trace step by step. If there is no Fabric I Q call, check Tools and the description. If a different tool was called, the borders between descriptions need to be clearer. If you see an error, it is often a failed authentication, so check that the tool's credentials are current."
  },
  {
   "title": "Decide: the other tool answered",
   "caption": "Revenue question, but the trace shows another tool was called. What do you change?",
   "say": "Your turn. You ask the agent for revenue by region. The activity trace shows that the policy tool was called instead of Fabric I Q. What do you change? Make the tool descriptions clearer about what each one handles? Remove Fabric I Q and use a knowledge source? Or rebuild the revenue metrics inside Copilot Studio? Decide before I answer. Clarify the descriptions. The orchestrator picked the wrong tool because the borders were vague."
  },
  {
   "title": "Work IQ: the teamwork expert",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Work IQ</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Added as</span><span style=\"text-align:right\">MCP tool</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default</span><span style=\"text-align:right\">Read-only</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Writes</span><span style=\"text-align:right\">Admin enables in Microsoft 365 admin center</span></div></div>",
   "caption": "Preview. Microsoft 365 context, added as an MCP tool. Read-only by default.",
   "say": "Work I Q, in preview, is the teamwork expert. It gives the agent context about how people work in Microsoft three six five: files, email, meetings and chats. You add it as a Model Context Protocol tool, an M C P tool. And it is read-only, unless an administrator turns on write operations in the Microsoft three six five admin center. Reading is the default. Writing is a deliberate admin choice."
  },
  {
   "title": "Work IQ needs the admin",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Work IQ admin setup</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Enable</span><span style=\"text-align:right\">Global Administrator, once per tenant</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Billing</span><span style=\"text-align:right\">Usage-based plan</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Spending</span><span style=\"text-align:right\">Separate policy</span></div></div>",
   "caption": "Global Administrator enables it once. Usage-based billing. Separate spending policy.",
   "say": "Work I Q also needs some admin work first. A Global Administrator enables it once for the whole tenant. The tenant needs a usage based billing plan in Copilot Studio. And admins create a separate spending policy for Work I Q usage. One more limit: every M C P server counts toward the agent's tool total, and extra servers are skipped for a turn, so keep the number of attached servers small."
  },
  {
   "title": "Decide: the shortcut tools",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Mail / Teams / OneDrive tools</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Status</span><span style=\"text-align:right\">Legacy, standard harness and billing</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Use instead</span><span style=\"text-align:right\">Work IQ</span></div></div>",
   "caption": "A maker adds Mail, Teams and OneDrive tools instead of Work IQ. Good idea?",
   "say": "Your turn. A maker wants meeting and email context. Instead of Work I Q, they add the separate Mail, Teams and OneDrive tools. Is that the recommended choice? Is it required, because Work I Q cannot read email? Is it wrong, because those tools are a legacy experience on the standard harness and billing? Or is it fine, because they read the same data? Decide before I answer. It is the legacy path. Use Work I Q instead."
  },
  {
   "title": "Choose by who maintains it",
   "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Choose by who maintains it</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Another team's policies</span><span style=\"text-align:right\">Foundry IQ</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fabric semantic model</span><span style=\"text-align:right\">Fabric IQ</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Microsoft 365 work</span><span style=\"text-align:right\">Work IQ</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Your own documents</span><span style=\"text-align:right\">Knowledge source</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Another agent's domain</span><span style=\"text-align:right\">Connected agent</span></div></div>",
   "caption": "Another team's policies, Fabric model, Microsoft 365 work, your own documents, another agent.",
   "say": "So how do you choose? Ask who maintains the context. Policies tuned by another team point to Foundry I Q. Business measures in a Fabric semantic model point to Fabric I Q. Email, files and meetings point to Work I Q. Documents you write and update yourself fit a normal knowledge source. And a whole domain run by another Copilot Studio agent fits a connected agent."
  },
  {
   "title": "The steps in the product",
   "caption": "Build tab · Tools · Add a tool · connect · rewrite description · test in Preview.",
   "say": "Here are the steps. Open your agent on the Microsoft Copilot harness and go to the Build tab. In Tools, select Add a tool. For Foundry I Q, create a new connection, pick the authentication type, enter the search service endpoint and choose the knowledge base. For Fabric I Q, select it and add it. For Work I Q, go to M C P and pick Work I Q. Then rewrite each description and test in Preview."
  },
  {
   "title": "Decide: which colleague?",
   "caption": "Revenue by region, from measures already modelled in Fabric. Which capability?",
   "say": "Your turn. The sales director wants revenue by region, and those measures are already modelled in a Fabric semantic model. Which capability should the agent use? A knowledge source with an exported spreadsheet? Work I Q, because the director asks in a Teams chat? Or Fabric I Q, because the measures live in the semantic model? Decide before I answer. Fabric I Q. The numbers expert reuses the model, so nobody copies or rebuilds the metrics."
  },
  {
   "title": "Tuesday, solved",
   "caption": "Leave policy: Foundry IQ. Revenue: Fabric IQ. Meetings: Work IQ, read-only.",
   "say": "Back to Tuesday at Contoso. The leave policy comes from Foundry I Q, tuned by the compliance team in Foundry. Revenue by region comes from Fabric I Q and the existing semantic model. The renewal meetings come from Work I Q, read-only because the admin did not enable writes. Remember for the exam: one Foundry I Q connection, Work I Q is an M C P tool, and you choose by who maintains the context."
  }
 ],
 "check": [
  {
   "stem": "Which Microsoft IQ capability brings curated policy documents from a knowledge base built in Microsoft Foundry?",
   "options": [
    "Foundry IQ",
    "Fabric IQ",
    "Work IQ",
    "A workload-specific Mail tool"
   ],
   "answer": 0,
   "explanation": "Foundry IQ gives agents curated knowledge from Foundry knowledge bases. Fabric IQ is for business data and Work IQ is for Microsoft 365 work context."
  },
  {
   "stem": "How many Foundry IQ connections can one agent have?",
   "options": [
    "Two, one for each harness",
    "One",
    "One for each authentication type",
    "As many as the tool limit allows"
   ],
   "answer": 1,
   "explanation": "An agent can have only one Foundry IQ connection."
  },
  {
   "stem": "What is true about Work IQ by default?",
   "options": [
    "It can send email and edit files without any admin action",
    "It works only on the standard harness",
    "It is read-only until an admin enables write operations",
    "It replaces the need for a Global Administrator"
   ],
   "answer": 2,
   "explanation": "Work IQ is added as an MCP tool and is read-only unless an administrator turns on write operations in the Microsoft 365 admin center."
  },
  {
   "stem": "A Foundry IQ knowledge base returns unexpected results. Where do you tune it?",
   "options": [
    "In the agent instructions only",
    "By removing the connection in Copilot Studio, which deletes the knowledge base",
    "By adding a second Foundry IQ connection",
    "In Microsoft Foundry, together with the knowledge base owner"
   ],
   "answer": 3,
   "explanation": "The tuning happens in Microsoft Foundry, not in Copilot Studio. Removing the connection does not change the knowledge base, and an agent has only one Foundry IQ connection."
  }
 ],
 "reto": {
  "text": "Open a Microsoft Copilot harness agent and go to the Build tab.\nWrite a tool name and description for one IQ capability: when to use it, what it returns, and what it does not handle.\nFor three questions from your own work, decide: Foundry IQ, Fabric IQ, Work IQ, or a knowledge source?",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/en-us/training/modules/connect-agents-microsoft-iq-github-copilot/2-choose-iq-capability-agent"
}
);
