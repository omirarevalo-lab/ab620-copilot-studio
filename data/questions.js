// AB-620 practice question bank (299 original scenario-based questions, English). Built by tools/en/assemble.mjs. Schema: SPEC §6.
window.AB620_QUESTIONS = [
 {
  "id": "q-1.1a-01",
  "skill": "1.1a",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso needs its agent to record invoices in a legacy desktop application that has only a graphical interface: it exposes no API, no accessible database, and no available connector. Which integration mechanism should you plan?",
  "options": [
   "A custom connector created from an OpenAPI (Swagger 2.0) file of the application and shared with the whole organization",
   "A Computer use tool that operates the application through vision and reasoning over the user interface",
   "A REST API tool by uploading an OpenAPI specification in JSON",
   "An MCP server registered with the onboarding wizard"
  ],
  "answer": [
   1
  ],
  "explanation": "Computer use operates websites and desktop applications that have a graphical interface through vision and reasoning, with no need for an API. Custom connectors, REST API tools, and MCP all assume that the system exposes an API or a server that speaks that protocol, which does not exist here. Remember that Computer use requires generative orchestration and costs 5 Copilot Credits per step with standard models.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use",
  "preview": false
 },
 {
  "id": "q-1.1a-02",
  "skill": "1.1a",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso's platform team wants to expose the same internal tools (check the status of a service and search KB articles) to Copilot Studio and to other third-party agent frameworks, without rewriting them for each platform. Which integration approach should they choose?",
  "options": [
   "Publish an MCP server with Streamable HTTP transport and connect it to the agent",
   "Create one custom connector for each platform and maintain a separate OpenAPI definition for each",
   "Wrap each tool in an agent flow with the When an agent calls the flow trigger",
   "Add a Send HTTP request node to every topic that needs the tool and store the response in a variable"
  ],
  "answer": [
   0
  ],
  "explanation": "MCP is an open protocol for exposing tools and resources: one server can be consumed from Copilot Studio and from other compatible clients. Custom connectors, agent flows, and Send HTTP request are Power Platform mechanisms and would force you to duplicate the work for each platform. In Copilot Studio the transport must be Streamable HTTP (SSE is no longer supported).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp",
  "preview": false
 },
 {
  "id": "q-1.1a-03",
  "skill": "1.1a",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Northwind's ticketing API is documented in an OpenAPI 3.0 file in JSON format. You want the agent to create and retrieve tickets, but users must never be able to delete them. What do you do?",
  "options": [
   "Convert the file by hand to a Swagger 2.0 YAML file first, because the REST API tool rejects OpenAPI 3.0 files",
   "Register the API as an MCP server, because the REST API tool always exposes every operation of the API",
   "Upload the file in a REST API tool and select only the create and retrieve operations as tools",
   "Create the REST API tool with every operation and rely on a data policy to block only the delete operation"
  ],
  "answer": [
   2
  ],
  "explanation": "The REST API tool takes a JSON OpenAPI specification; a v3 file is translated to v2 automatically, so no manual conversion is needed. During setup you choose which endpoint and method combinations become tools, so you can add create and retrieve and leave delete out. An MCP server needs the MCP protocol, and a data policy governs connectors and endpoints, not the operations you pick inside the tool.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api",
  "preview": true
 },
 {
  "id": "q-1.1a-04",
  "skill": "1.1a",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso's administrator creates a data policy that blocks Power Platform connectors from being used as tools in Copilot Studio agents. A maker asks whether the tools of an MCP server already connected to their agent will be affected. What is the correct answer?",
  "options": [
   "No: MCP is an open protocol, so MCP servers are outside the scope of data policies and keep working",
   "Yes: MCP tools use Power Platform connectors for connectivity, so blocking those connectors blocks the tools too",
   "No: only a data policy that blocks the HTTP connector can affect the tools of an MCP server connected to an agent",
   "Yes, but only for MCP servers that were connected with API key authentication; OAuth connections are exempt"
  ],
  "answer": [
   1
  ],
  "explanation": "An MCP server connection is built on the Power Platform connector infrastructure, so data policies govern it like any other connector. Blocking the connectors therefore blocks the tools of connected MCP servers as well. The authentication type of the MCP server does not change this, and the HTTP connector is unrelated.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
  "preview": false
 },
 {
  "id": "q-1.1a-05",
  "skill": "1.1a",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "Adatum's MCP server uses OAuth 2.0, but its identity provider does not support dynamic client registration. You registered an app in that provider yourself. In the MCP onboarding wizard, which two actions are required? Each correct answer presents part of the solution.",
  "options": [
   "Choose the Manual OAuth 2.0 type and enter the client ID, client secret, authorization URL, token URL template, refresh URL and scopes",
   "Choose Dynamic discovery, which registers the client automatically from the server's metadata",
   "Copy the callback URL shown in Copilot Studio into the app registration at the identity provider",
   "Choose API key and send the client secret in a header or query parameter",
   "Switch the server to SSE transport so the identity provider can redirect users"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "The Dynamic discovery and Dynamic types depend on dynamic client registration, which this provider lacks. With the Manual type you supply the client details and URLs yourself, and you must copy the callback URL from Copilot Studio into your app registration so the sign-in can return to the agent. An API key is a different authentication type, and Copilot Studio supports only Streamable HTTP transport, not SSE.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent",
  "preview": false
 },
 {
  "id": "q-1.1a-06",
  "skill": "1.1a",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Woodgrove Bank has a proprietary loan origination REST API with an OpenAPI definition and no prebuilt connector. Four different agents, several Power Automate cloud flows and a Power Apps app will all need to call it. Which integration pattern is the best fit?",
  "options": [
   "A REST API tool added separately to each agent",
   "A Send HTTP request node copied into each agent's topics",
   "A custom connector built from the OpenAPI definition",
   "A Computer use tool that operates the API's web portal"
  ],
  "answer": [
   2
  ],
  "explanation": "A custom connector is a reusable wrapper around a REST API: you build it once and use it across agents, flows and apps, which justifies the setup effort when many consumers share the API. A REST API tool works only inside Copilot Studio, so flows and Power Apps could not use it. The HTTP request node cannot be shared, and Computer use is for systems that have no API.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/3-compare-action-integration-patterns",
  "preview": false
 },
 {
  "id": "q-1.1a-07",
  "skill": "1.1a",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "Fabrikam already has a conversational component built with the Bot Framework SDK and wants to register it in Copilot Studio as a Bot Framework skill instead of rebuilding it. Which two trade-offs must the team plan for? Each correct answer presents part of the solution.",
  "options": [
   "Ongoing support requires C# development",
   "The skill can only be called by the orchestrator, never from a topic",
   "Azure AI Bot Service costs are billed separately from Power Platform licensing",
   "The skill must first be converted into an agent flow before it can be registered"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "Bot Framework skills reuse existing pro-code components, but they need C# development to support them, add Azure AI Bot Service costs outside Power Platform licensing, and sit outside the Power Platform ALM toolchain. They are invoked as nodes in a topic, not only by the orchestrator, and they are registered as they are, not converted into agent flows.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/3-compare-action-integration-patterns",
  "preview": false
 },
 {
  "id": "q-1.1b-01",
  "skill": "1.1b",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "You will publish an internal support agent for employees only, available in Microsoft Teams and in Microsoft 365 Copilot. Employees must not have to sign in manually, and you want to use User.DisplayName in topics without configuring an identity provider. Which authentication option do you choose?",
  "options": [
   "No authentication",
   "Authenticate manually with Generic OAuth 2",
   "Authenticate with Microsoft",
   "Authenticate manually with Microsoft Entra ID V2 with certificates"
  ],
  "answer": [
   2
  ],
  "explanation": "Authenticate with Microsoft configures Microsoft Entra ID automatically; in Teams the user is already identified and is not asked to sign in, and the Teams + Microsoft 365 channels support only this option. No authentication lets anyone with the link chat, and the manual options require you to configure the provider and block those channels.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
  "preview": false
 },
 {
  "id": "q-1.1b-02",
  "skill": "1.1b",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "An agent for external customers will be published on your own website. Customers will sign in with their Google account, and the agent must call a backend API with the user's token (User.AccessToken). Choose two required configurations.",
  "options": [
   "Configure Generic OAuth 2 as the service provider, pointing to an OAuth 2-compatible provider",
   "Use Microsoft Entra ID V2 with certificates, because Google does not need its own provider",
   "Select Authenticate with Microsoft, which exposes User.AccessToken automatically for any identity provider",
   "Leave No authentication and send the token in a fixed header from the topic",
   "Select Authenticate manually"
  ],
  "answer": [
   0,
   4
  ],
  "explanation": "Users with a non-Microsoft account require Authenticate manually and a generic OAuth 2 provider; this makes User.Id, User.DisplayName, User.AccessToken, and User.IsLoggedIn available. Authenticate with Microsoft does not expose User.AccessToken and works only for Teams/Microsoft 365; No authentication does not identify the user; the Entra ID options work only for Entra identities.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
  "preview": false
 },
 {
  "id": "q-1.1b-03",
  "skill": "1.1b",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A topic in Fabrikam's agent must call a backend API with the signed-in user's token by using User.AccessToken. The agent currently uses Authenticate with Microsoft. What should you do?",
  "options": [
   "Keep Authenticate with Microsoft, because it exposes User.AccessToken and User.IsLoggedIn by default",
   "Turn on Require users to sign in under Authenticate with Microsoft so that the token is exposed",
   "Switch to No authentication and read the token from the request header in the topic",
   "Switch to Authenticate manually, because User.AccessToken is not available with Authenticate with Microsoft"
  ],
  "answer": [
   3
  ],
  "explanation": "Authenticate with Microsoft makes only User.ID and User.DisplayName available. User.AccessToken and User.IsLoggedIn exist only with Authenticate manually. Require users to sign in is not even available for Authenticate with Microsoft, and No authentication gives the agent no user token at all.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
  "preview": false
 },
 {
  "id": "q-1.1b-04",
  "skill": "1.1b",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A maker configures Contoso's agent with Authenticate manually and the Generic OAuth 2 provider. Afterwards, the Teams + Microsoft 365 channels are shown as blocked. What is the cause?",
  "options": [
   "The Token exchange URL field is left empty, and Teams needs that URL to complete single sign-on",
   "The Teams and Microsoft 365 channels support only Authenticate with Microsoft, so any other option blocks them",
   "Require users to sign in is turned off, and Teams requires it to be on for every authenticated agent",
   "A data policy blocks the Direct Line channels in Copilot Studio connector in the environment of the agent"
  ],
  "answer": [
   1
  ],
  "explanation": "Teams + Microsoft 365 channels only support the Authenticate with Microsoft option; if you select any other authentication option those channels are blocked. To keep other channels with authentication you use Authenticate manually, but then Teams is not available. The token exchange URL and the sign-in toggle are not what blocks the channel, and the Direct Line connector concerns different channels.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
  "preview": false
 },
 {
  "id": "q-1.1b-05",
  "skill": "1.1b",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "Adatum's security policy forbids client secrets for end-user sign-in. The maker chooses Authenticate manually with the Microsoft Entra ID V2 with certificates provider. Which two fields are required specifically for this provider? Each correct answer presents part of the solution.",
  "options": [
   "Client secret copied from the app registration",
   "Client Certificate KeyVault URL",
   "Token exchange URL",
   "Is x5c Claim required",
   "Refresh body template"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "With certificates, the certificate is kept in Azure Key Vault, so you provide the Client Certificate KeyVault URL, and you also specify whether the x5c claim is required in the token request. A client secret belongs to the client-secret provider, and the token exchange URL is optional and only used to configure single sign-on.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
  "preview": false
 },
 {
  "id": "q-1.1b-06",
  "skill": "1.1b",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Adatum publishes an agent in Microsoft Teams that uses custom Active Directory authentication and several connector tools. Employees are signed in to Teams, yet they are asked to sign in to each connector separately. What explains this?",
  "options": [
   "SSO is not supported for connectors when Teams uses custom Active Directory authentication",
   "The connectors were all placed in the Non-business group of the data policy",
   "Control maker-provided credentials is enforced in the environment and it turns off single sign-on",
   "The security scan disables sign-in sharing when the agent is shared with the whole organization"
  ],
  "answer": [
   0
  ],
  "explanation": "When an agent deployed to Teams uses custom Active Directory authentication, SSO is not supported for connectors, so users must authenticate to each connector manually even if SSO works elsewhere in the chat. Data groups control which connectors can be combined, Control maker-provided credentials forces end-user authentication, and the security scan only warns.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/4-authenticate-govern-integrations",
  "preview": false
 },
 {
  "id": "q-1.1c-01",
  "skill": "1.1c",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "You published a fix to a topic, but a tester with an open conversation in Microsoft Teams still sees the previous behavior. You want to verify the new content right away. What do you do?",
  "options": [
   "Change the authentication to No authentication and publish again",
   "Republish the agent once for each connected channel until Teams recognizes the changes",
   "Remove the agent's app in Teams and reinstall it from the app store after every published change",
   "Type start over in the conversation to restart it with the latest content"
  ],
  "answer": [
   3
  ],
  "explanation": "Publishing updates all connected channels, but the new content applies only when a new session starts (in most channels, after 30 minutes of inactivity). In channels with persistent conversations such as Teams, you can type start over to force a new session; otherwise it can take up to an hour. You do not need to republish for each channel or touch the authentication.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels",
  "preview": false
 },
 {
  "id": "q-1.1c-02",
  "skill": "1.1c",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "As an administrator, you want to prevent makers from publishing agents to WhatsApp and Facebook while keeping Teams and the website available. Choose two actions in a data policy in the Power Platform admin center.",
  "options": [
   "Block the WhatsApp channel in Copilot Studio connector",
   "Block the Facebook channel in Copilot Studio connector",
   "Block the Microsoft Teams + Microsoft 365 Channel in Copilot Studio connector",
   "Block the HTTP connector",
   "Block the Direct Line channels in Copilot Studio connector"
  ],
  "answer": [
   0,
   1
  ],
  "explanation": "Each channel has its own connector in data policies, so blocking the WhatsApp and Facebook ones disables them for makers. Direct Line channels covers the Demo website, custom websites, and mobile apps, and the Teams + Microsoft 365 connector controls Teams: blocking them would remove channels you want to keep. The HTTP connector governs Send HTTP request nodes, not channels.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
  "preview": false
 },
 {
  "id": "q-1.1c-03",
  "skill": "1.1c",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "A Contoso administrator puts the Direct Line channels in Copilot Studio connector in the Blocked group of a data policy. Choose the three channels that makers can no longer publish to in that environment. Each correct answer presents part of the solution.",
  "options": [
   "Facebook",
   "Demo website",
   "Microsoft Teams",
   "Custom website",
   "Mobile app"
  ],
  "answer": [
   1,
   3,
   4
  ],
  "explanation": "The Direct Line channels connector covers the Demo website, custom websites, the mobile app and other Direct Line channels. Teams and Facebook each have their own connector (Microsoft Teams + Microsoft 365 Channel, Facebook channel), so blocking Direct Line does not affect them.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
  "preview": false
 },
 {
  "id": "q-1.1c-04",
  "skill": "1.1c",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Northwind wants customers to upload a photo of a damaged item in the chat. The agent is published on its custom website, but when a customer sends an attachment the agent replies that it can only process text. What explains this?",
  "options": [
   "The agent uses No authentication, and attachments are accepted only when users sign in with Authenticate with Microsoft",
   "Direct Line channels block attachments, while the same upload works in the Microsoft Teams channel",
   "Attachments are not processed on any channel, including Direct Line and Teams, unless the message goes to a skill that handles attachments",
   "Require secured access in Web channel security blocks file uploads until the secret is regenerated"
  ],
  "answer": [
   2
  ],
  "explanation": "A user can't send or upload attachments to the chat, and the agent answers that it can only process text. This limitation applies to all channels, even those whose client supports attachments, such as the Direct Line API and Teams. Attachments can be supported only if the message is sent to a skill that can process them.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels",
  "preview": false
 },
 {
  "id": "q-1.1c-05",
  "skill": "1.1c",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Fabrikam's topic asks users to pick from 9 options in a multiple-choice Question node. All options appear on the website, but in Microsoft Teams the question does not show all of them. What is the reason and the fix?",
  "options": [
   "Teams cannot render multiple-choice options at all, so replace the node with an adaptive card",
   "Teams shows at most three options per message, so split them into three consecutive questions",
   "The agent must be republished separately to the Teams channel before it renders every option",
   "Teams renders up to six options in a question node, so reduce the choices to six or fewer"
  ],
  "answer": [
   3
  ],
  "explanation": "The channel reference notes that Microsoft Teams supports multiple-choice options up to six (as a hero card) and can render up to six suggested actions in one question node, so the other options are not shown. Publishing updates all connected channels at once, so a separate republish for Teams is not a fix.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels",
  "preview": false
 },
 {
  "id": "q-1.1d-01",
  "skill": "1.1d",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "An HR topic uses a Generative answers node over sensitive internal policies. Compliance requires the strictest possible harmful-content filtering for that topic, even if the agent generates fewer answers. What do you configure?",
  "options": [
   "The agent's moderation level set to Lowest, because the level configured on the topic is ignored",
   "Turn on Allow ungrounded responses in the agent's Generative AI settings",
   "The content moderation level of the Generative answers node set to Highest",
   "Lower the prompt's temperature to 0 in the prompt builder"
  ],
  "answer": [
   2
  ],
  "explanation": "Moderation can be set at the agent, generative answers node, and prompt level; at runtime the topic's setting takes precedence. Highest applies the strictest filter and generates fewer answers, while Lowest generates more answers with a higher risk of harmful content. Allow ungrounded responses and temperature do not control harmful-content filtering.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
  "preview": false
 },
 {
  "id": "q-1.1d-02",
  "skill": "1.1d",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "In a responsible AI strategy for an agent with generative orchestration, you want answers to be based on your knowledge sources and users to know that part of the conversation is AI-generated. Choose two actions.",
  "options": [
   "Add a message in the Conversation Start system topic that warns that some answers are generated by AI",
   "Turn off Allow ungrounded responses in the Generative AI settings",
   "Set the content moderation level to Lowest so the agent answers more questions even if the risk of harmful content increases",
   "Turn on Use information from the web to broaden the source of answers",
   "Mark all sources as Official source"
  ],
  "answer": [
   0,
   1
  ],
  "explanation": "With Allow ungrounded responses turned off, the agent blocks the answers in a turn where it used no source or tool (the fallback is triggered). Notifying users in Conversation Start is the recommended best practice for disclosing AI-generated content. Lowering moderation increases risk, web search broadens the source of answers, and Official source is not supported with generative orchestration.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
  "preview": false
 },
 {
  "id": "q-1.1d-03",
  "skill": "1.1d",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "A maker builds a prompt tool in Contoso's agent and selects an Anthropic Claude model. The Content moderation level slider in the prompt settings is unavailable. Why?",
  "options": [
   "The slider appears only after the agent's Generative AI moderation level is set to Highest",
   "Prompt tools take the moderation level from the topic's generative answers node, so the slider is disabled",
   "The setting is available only for managed models, not for Anthropic or Azure AI Foundry models",
   "Temperature is set to 0, which disables the moderation level"
  ],
  "answer": [
   2
  ],
  "explanation": "The prompt-level Content moderation level slider (Low, Moderate, High; default Moderate) works only with managed models. It is unavailable when you select Anthropic or Azure AI Foundry models. It does not depend on the agent's moderation level or on the temperature.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/prompt-model-settings",
  "preview": false
 },
 {
  "id": "q-1.1d-04",
  "skill": "1.1d",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Northwind turns off Allow ungrounded responses. A user gets a policy answer from a knowledge source, then asks a follow-up that the agent could answer from the conversation history without calling any knowledge source or tool. What happens?",
  "options": [
   "The response is blocked and the fallback topic is triggered",
   "The agent answers from the history and adds a note that the answer is not grounded",
   "The agent automatically searches the knowledge sources again before answering",
   "The conversation ends with a system error and the transcript is flagged for review"
  ],
  "answer": [
   0
  ],
  "explanation": "With Allow ungrounded responses off, the agent blocks any response generated in a turn where it used no knowledge source or tool, and the fallback topic triggers. This also applies to answers taken from conversation history. The setting does not make the agent search again, and it does not end the conversation with an error.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
  "preview": false
 },
 {
  "id": "q-1.1d-05",
  "skill": "1.1d",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A compliance officer asks how Copilot Studio applies content moderation to generative AI requests, including jailbreak and prompt injection attempts. Which description is accurate?",
  "options": [
   "Only the agent's final response is checked, because user input is trusted within the tenant",
   "Content is checked only when a maker sets the moderation level to Highest",
   "Content is checked once, at the moment the knowledge source returns its results",
   "Content is checked twice: when the user sends the input and again when the agent is about to respond"
  ],
  "answer": [
   3
  ],
  "explanation": "Copilot Studio applies content moderation policies on all generative AI requests, and they extend to malicious attempts such as jailbreaking, prompt injection and prompt exfiltration. All content is checked twice: on user input and again when the agent is about to respond; if harmful or malicious content is found, the agent does not respond.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/faqs-generative-answers",
  "preview": false
 },
 {
  "id": "q-1.1e-01",
  "skill": "1.1e",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "Before publishing, Copilot Studio runs an automatic security scan and warns the maker when secure default values are changed. Choose three changes that trigger that warning.",
  "options": [
   "Change the agent's authentication to No authentication",
   "Share the agent with all users in the organization",
   "Turn on Require users to sign in",
   "Select Maker-provided credentials in Credentials to use for a connector or flow",
   "Change the agent's display name"
  ],
  "answer": [
   0,
   1,
   3
  ],
  "explanation": "The scan warns when the defaults are weakened: Authenticate with Microsoft changes to No authentication (anyone with the link can chat), end-user credentials change to the maker's credentials, and the agent is shared with the whole organization (by default it is shared with no one). Requiring sign-in strengthens security, and renaming the agent does not affect it.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-scan",
  "preview": false
 },
 {
  "id": "q-1.1e-02",
  "skill": "1.1e",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A policy requires every published agent to require authentication, and makers must not be able to choose No authentication. How does the administrator enforce this?",
  "options": [
   "By blocking the HTTP connector in every environment through a tenant-wide data policy",
   "By turning on Require secured access in Web channel security for each agent and regenerating its secrets",
   "With a data policy that blocks the Direct Line channels in Copilot Studio connector in every tenant environment where agents are published",
   "With a data policy that blocks the Chat without Microsoft Entra ID authentication in Copilot Studio connector"
  ],
  "answer": [
   3
  ],
  "explanation": "Blocking Chat without Microsoft Entra ID authentication in Copilot Studio prevents publishing agents without authentication; makers can choose only Authenticate with Microsoft or Authenticate manually. Blocking Direct Line affects the web and mobile channels, Require secured access protects web access with secrets or tokens but does not force users to authenticate, and the HTTP connector controls only Send HTTP request nodes.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
  "preview": false
 },
 {
  "id": "q-1.1e-03",
  "skill": "1.1e",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "An administrator blocks the Knowledge source with documents in Copilot Studio connector in a data policy to prevent sensitive files from being uploaded. Even so, a maker adds a SharePoint file as a knowledge source with Upload files > SharePoint. Why did this happen?",
  "options": [
   "It blocks only the upload of local files; SharePoint and OneDrive have their own connector",
   "SharePoint is exempt from data policies because the user's identity is already validated with Microsoft Entra ID authentication",
   "Data policies cannot block knowledge sources, only action and channel connectors, so the block never had any effect",
   "The block takes up to 24 hours to propagate and will then cover SharePoint as well"
  ],
  "answer": [
   0
  ],
  "explanation": "Each type of knowledge source has its own connector: local documents, SharePoint/OneDrive, and public websites. Blocking one does not affect the others. To allow or deny specific SharePoint or public-site endpoints, you can use endpoint filtering instead of blocking the whole connector.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
  "preview": false
 },
 {
  "id": "q-1.1e-04",
  "skill": "1.1e",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's policy allows agents to call only https://api.fabrikam.com through the HTTP request node, and every other HTTP destination must be denied. What does the administrator configure?",
  "options": [
   "Block the HTTP connector in the data policy, which still lets the allowed endpoint through",
   "Endpoint filtering on the HTTP connector, with the allowed endpoint in Connector endpoints",
   "Move the HTTP connector to the Business group and put all other connectors in the Non-business group",
   "Turn on Require secured access in Web channel security and list the allowed URLs"
  ],
  "answer": [
   1
  ],
  "explanation": "To allow or deny specific HTTP endpoints instead of blocking every HTTP call, the administrator uses endpoint filtering on the HTTP connector. Blocking the connector stops all HTTP requests, including the allowed one. Data groups and web channel security do not filter outbound HTTP destinations.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
  "preview": false
 },
 {
  "id": "q-1.1e-05",
  "skill": "1.1e",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "A maker's agent uses an HTTP request node and a SharePoint connector tool. In the environment's data policy no connector is blocked and no endpoint filtering is configured, but the HTTP connector is in the Non-business group and the SharePoint connector is in the Business group. The Publish button is unavailable and a data policy error appears. What is the cause?",
  "options": [
   "The security scan requires an administrator to acknowledge its warnings before publishing",
   "The Chat without Microsoft Entra ID authentication connector is missing from the policy",
   "The agent must first be shared with everyone in the organization before it can be published",
   "The two connectors are in different data groups, and data cannot be shared among connectors in different groups"
  ],
  "answer": [
   3
  ],
  "explanation": "Within a data policy, connectors used together must be in the same data group, because data can't be shared among connectors in different groups. A group mismatch with the HTTP connector counts as a violation, and while a violation exists the Publish button is unavailable. The details can be downloaded from the error banner on the Channels page.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
  "preview": false
 },
 {
  "id": "q-1.1e-06",
  "skill": "1.1e",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Northwind's administrator enforces the Control maker-provided credentials setting in the Power Platform admin center for an environment. What is the effect on tools in that environment?",
  "options": [
   "Connectors in the Business group are blocked for all agents in the environment",
   "Agents can no longer be published to anonymous channels such as the Demo website",
   "Makers can no longer set tools to use their own credentials; each user authenticates at runtime",
   "Agents with connectors can only be shared with the maker's own security group"
  ],
  "answer": [
   2
  ],
  "explanation": "When Control maker-provided credentials is enforced, makers cannot configure tools to use their own credentials, so all tool connections are authenticated by the end user at runtime and the agent stays within each user's own permissions. It is separate from data policies, which classify connectors as Business, Non-business or Blocked, and it does not change channels or sharing.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/4-authenticate-govern-integrations",
  "preview": false
 },
 {
  "id": "q-1.1f-01",
  "skill": "1.1f",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Two teams maintain different agents in the same environment and want to share the same topics and an agent flow, managed from a single place. The authors of the consuming agents must be able to use them but not modify them. What do you use?",
  "options": [
   "Copy and paste the topics and the flow into each agent",
   "A component collection connected to both agents",
   "A child agent inside each agent",
   "Export a whole agent and import it with another name"
  ],
  "answer": [
   1
  ],
  "explanation": "Component collections package topics, tools, knowledge, flows, entities, child agents, and MCP for reuse. Once available in an agent, all authors can use the collection but cannot change its components: only the creator or a system customizer/admin can edit it. Copy and paste duplicates and gets out of sync, a child agent is not shared across agents, and exporting a whole agent is excessive.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-export-import-copilot-components",
  "preview": false
 },
 {
  "id": "q-1.1f-02",
  "skill": "1.1f",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Your component collection includes a custom connector and environment variables, and you must move it from Dev to Production while keeping its dependencies. What is the recommended approach?",
  "options": [
   "Export only the main agent, because collections travel with it automatically",
   "Add the collection to a solution (Add existing > Agent > Component collection), then export and import it",
   "Use the collection's own Export button, which always includes connectors and environment variables",
   "Manually recreate the connector and the variables in Production and import only the collection"
  ],
  "answer": [
   1
  ],
  "explanation": "For complex collections (for example, ones with connectors or environment variables), the recommendation is to use solutions as carriers: add the collection to a solution, export it, and import it in the target. A direct export of a collection packages it as managed and is intended for simpler cases. Exporting only the agent does not guarantee that the collection's components travel with it.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-export-import-copilot-components",
  "preview": false
 },
 {
  "id": "q-1.1f-03",
  "skill": "1.1f",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso wants a smaller component collection that leaves out the dependencies of the components added from one agent. The collection is currently connected to two agents. What must the maker do first?",
  "options": [
   "Export the collection as unmanaged, because only unmanaged collections can exclude dependencies",
   "Clear Include component dependencies in the Add from an agent wizard, which works with any number of connected agents",
   "Disconnect all agents but one, set it as primary agent, then clear Include component dependencies",
   "Move the collection into a solution and delete the dependencies from the solution layer"
  ],
  "answer": [
   2
  ],
  "explanation": "Dependencies can be excluded only when the collection has a primary agent, and a primary agent can be set only if a single agent is connected. So you disconnect the others, set the primary agent, and clear Include component dependencies in the Add from an agent wizard. Managed or unmanaged export is unrelated.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-export-import-copilot-components",
  "preview": false
 },
 {
  "id": "q-1.1f-04",
  "skill": "1.1f",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "A maker uses the Export button of a component collection in the Dev environment to bring it to Prod. Choose two correct statements. Each correct answer presents part of the solution.",
  "options": [
   "The collection is exported as unmanaged so that it can be edited in Prod",
   "The import works only in the same environment where the collection was exported",
   "The exported collection is packaged as a managed solution",
   "Connectors and environment variables used by the components are always included automatically",
   "In Prod, you import it from an agent's Settings > Component collections > Import solution"
  ],
  "answer": [
   2,
   4
  ],
  "explanation": "When you export a collection with its own Export button it becomes managed, and you import it from an agent's Settings > Component collections > Import solution in the target environment. Importing into the same environment where it was exported gives an error. For collections with connectors or environment variables, Microsoft recommends carrying them in a solution instead.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-export-import-copilot-components",
  "preview": false
 },
 {
  "id": "q-1.1f-05",
  "skill": "1.1f",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "A maker adds the PDF files uploaded as knowledge sources in Northwind's support agent to a new component collection. Afterwards, the files no longer appear in the support agent's knowledge list. What happened?",
  "options": [
   "Adding uploaded files to a collection removes them from the originating agent; you can move them back",
   "The collection copied the files, and the agent list refreshes only after the next publish",
   "An author with the system customizer role deleted the files from the agent's knowledge list",
   "The files were converted to Dataverse tables, which are listed on a different page of the agent"
  ],
  "answer": [
   0
  ],
  "explanation": "When you add components from an agent to a collection, they are moved to the collection and the agent references them there. For uploaded knowledge files this means they disappear from the originating agent; a workaround is to move the files from the collection back to the agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-export-import-copilot-components",
  "preview": false
 },
 {
  "id": "q-1.1g-01",
  "skill": "1.1g",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "You will publish an agent on your own website for external customers. By default, anyone who knows the agent ID can use the Demo website and Custom website channels, and the web client code is visible to customers. Choose two measures to secure access.",
  "options": [
   "Embed Secret 1 in the page's JavaScript so the browser authenticates with every request to the agent",
   "Exchange the secret for a token in your service's code and give only the token to the browser",
   "Turn on Require secured access in Web channel security",
   "Keep No authentication, because the agent ID works like a password",
   "Choose Authenticate with Microsoft so external customers sign in to the site"
  ],
  "answer": [
   1,
   2
  ],
  "explanation": "With Require secured access, the channels require the client to authenticate with a secret or with a token generated from that secret. If the code runs in the browser, the secret must not be exposed: your service exchanges it for a token (valid for a single conversation and expiring if not refreshed) and hands over only the token. Embedding the secret compromises it, and No authentication leaves access open to anyone who knows the ID.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security",
  "preview": false
 },
 {
  "id": "q-1.1g-02",
  "skill": "1.1g",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Compliance requires that only members of an internal security group can chat with the agent, and that this control be done with the agent's Share option. Which authentication setting makes this possible?",
  "options": [
   "Authenticate with Microsoft: Share controls who can chat",
   "Authenticate manually with Generic OAuth 2: Share controls which users in the organization can chat",
   "Authenticate manually with Generic OAuth 2 and Require users to sign in turned off",
   "No authentication: anyone with the link can chat, but you limit it with Share"
  ],
  "answer": [
   0
  ],
  "explanation": "With Authenticate with Microsoft, the user always signs in (Require users to sign in stays on) and the Share option controls who in the organization can chat. With No authentication anyone with the link can talk to the agent, and with Generic OAuth 2 you cannot use Share to control which specific users in your organization chat with it.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
  "preview": false
 },
 {
  "id": "q-1.1g-03",
  "skill": "1.1g",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "An administrator turns on Require secured access in Web channel security for a Contoso agent and immediately opens the Demo website with the agent ID. The agent still responds without a secret. What explains this?",
  "options": [
   "The agent must be published again to the Demo website before the setting takes effect",
   "The Demo website is exempt, and only custom websites enforce Require secured access",
   "The setting takes effect only after Secret 1 is swapped with Secret 2 in Web channel security",
   "The change can take up to two hours to take effect; no republish is needed"
  ],
  "answer": [
   3
  ],
  "explanation": "Turning Require secured access on or off can take up to two hours to take effect; until then the previous setting applies. You do not need to publish the agent for it to apply, and the Demo website and Direct Line channels are covered by the setting.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security",
  "preview": false
 },
 {
  "id": "q-1.1g-04",
  "skill": "1.1g",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Secret 1 of Fabrikam's web channel may have leaked. The website's service uses it to obtain tokens, and the team wants to rotate it with no interruption. What is the correct sequence?",
  "options": [
   "Regenerate Secret 1 first, then update the website's service with the new value as soon as possible",
   "Switch the service to Secret 2, then regenerate Secret 1 once users connect with it",
   "Turn off Require secured access, regenerate both secrets, and turn it back on",
   "Publish the agent again so that Copilot Studio rotates the secret automatically"
  ],
  "answer": [
   1
  ],
  "explanation": "Copilot Studio provides two secrets that work at the same time, so you can move to the other one without downtime. Regenerating a secret disconnects the user profiles that connected with it or with a token from it, so you regenerate only after everyone uses the new secret. Publishing does not rotate secrets.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security",
  "preview": false
 },
 {
  "id": "q-1.1g-05",
  "skill": "1.1g",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "Contoso's website service exchanges the Direct Line secret for a token that the browser uses. Which two statements about these tokens are true? Each correct answer presents part of the solution.",
  "options": [
   "A token can be reused for any conversation of the same customer until the secret is regenerated",
   "A token works for a single conversation and expires unless it is refreshed",
   "An expired token can still be refreshed once with the refresh request",
   "The secret can be sent from the browser as long as it is placed in the Authorization header",
   "A token that has not expired can be refreshed an unlimited number of times"
  ],
  "answer": [
   1,
   4
  ],
  "explanation": "A token is valid for one conversation and expires unless you refresh it; you can refresh it any number of times as long as it has not expired, but an expired token can't be refreshed. The secret must never be exposed in code that runs in the browser, so the token is obtained in your service code.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security",
  "preview": false
 },
 {
  "id": "q-1.2a-01",
  "skill": "1.2a",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "You want an agent flow to be addable as a tool of an agent. Which trigger and which response action must it have?",
  "options": [
   "A Recurrence trigger and the Send an email (V2) action to report the result",
   "The When an HTTP request is received trigger and the Response action",
   "The Manually trigger a flow trigger with inputs and the Respond to a PowerApp or flow action",
   "The When an agent calls the flow trigger and Respond to the agent action"
  ],
  "answer": [
   3
  ],
  "explanation": "For a flow to appear as an agent tool, it must have the When an agent calls the flow trigger and a Respond to the agent action. It must also be published and respond in real time (Asynchronous response set to Off) within the 100-second action limit. The other triggers and responses belong to other scenarios (Power Apps, webhooks, schedules).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent",
  "preview": false
 },
 {
  "id": "q-1.2a-02",
  "skill": "1.2a",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "Your agent flow already has the When an agent calls the flow trigger and a Respond to the agent action, but it does not appear in the Flow list when you select Add a tool. Choose three additional conditions it must meet.",
  "options": [
   "Be in an environment with a Power Automate Premium license",
   "Be published",
   "Have Express mode turned on as a requirement",
   "Have Asynchronous response set to Off (real-time response) on the Respond to the agent action",
   "Respond to the agent within the 100-second action limit"
  ],
  "answer": [
   1,
   3,
   4
  ],
  "explanation": "A flow can be added as a tool if it has a trigger and a response action, is published, responds in real time (Asynchronous response turned off, under Networking), and replies within the 100-second limit. Agent flows consume Copilot Studio capacity, not Power Automate Premium licenses, and Express mode is optional (preview).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent",
  "preview": false
 },
 {
  "id": "q-1.2a-03",
  "skill": "1.2a",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso has a Power Automate cloud flow that is not in a solution. The team wants to manage it in Copilot Studio and have it consume Copilot Studio capacity instead of Power Automate licensing. What is required?",
  "options": [
   "Add the flow to a solution in an environment with Copilot Studio capacity, then change its plan to Copilot Studio; this cannot be undone",
   "Export the flow as a package and import it in Copilot Studio, while the original flow keeps its Power Automate billing",
   "Copy the flow on the Copilot Studio Flows page; converted flows can later be switched back to Power Automate billing",
   "Change the flow's trigger to When an agent calls the flow, which converts it to an agent flow automatically"
  ],
  "answer": [
   0
  ],
  "explanation": "To convert a cloud flow to an agent flow, it must be in a solution in the environment whose Copilot Studio capacity (prepaid or pay-as-you-go) it will use; you edit it, change the plan to Copilot Studio and confirm. The conversion is one-way because the billing changes. Changing only the trigger does not convert the flow.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview",
  "preview": false
 },
 {
  "id": "q-1.2a-04",
  "skill": "1.2a",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Northwind's agent flow looks up an order and must return the status to the agent in the same turn. Afterwards it archives documents, which takes about five minutes. The flow must remain usable as an agent tool. How do you design it?",
  "options": [
   "Turn on Asynchronous response in the Respond to the agent action so the whole flow can run longer",
   "Put the archiving before the Respond to the agent action and turn on Express mode so it finishes in two minutes",
   "Move the archiving to a second agent flow that the user must start manually from the Flows page",
   "Place the archiving actions after the Respond to the agent action, so they keep running after the agent gets its answer"
  ],
  "answer": [
   3
  ],
  "explanation": "To be a tool, the flow must respond in real time within the 100-second action limit. Actions that need longer can be placed after Respond to the agent and continue running up to the flow run duration limit of 30 days. Turning Asynchronous response on is a different, newer callback pattern (long flows, new-infrastructure environments only), not the tool pattern, and here the status must come back in the same turn. Express mode still requires finishing within two minutes.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-flow-create",
  "preview": false
 },
 {
  "id": "q-1.2a-05",
  "skill": "1.2a",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A maker edits an existing cloud flow to use the When an agent calls the flow trigger and adds Respond to the agent. When the agent runs the tool, it says 'Something unexpected happened' with error code 3000. The flow was previously configured to respond asynchronously. What should the maker check?",
  "options": [
   "That the flow is stored in the Default Solution of a different environment",
   "That Express mode is turned off on the When an agent calls the flow trigger",
   "That every action in the flow uses a premium connector from the same solution",
   "That Asynchronous response is Off in the settings of the Respond to the agent action"
  ],
  "answer": [
   3
  ],
  "explanation": "Flows used by an agent must return values in real time. A modified flow that still has asynchronous responses turned on can make the agent fail with that message and error code 3000. The fix is to set Asynchronous response to Off under the Respond to the agent settings (the separate asynchronous callback feature is not the tool pattern). The flow must also be in a solution in the same environment as the agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-modify-use-with-agent",
  "preview": false
 },
 {
  "id": "q-1.2b-01",
  "skill": "1.2b",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso wants hardware requests to go first through an automatic AI review that rejects orders over 1500 USD or without a justification, and then through manual approval by the manager, all within a single flow action. What do you use?",
  "options": [
   "Start and wait for an approval with the Everyone must approve type",
   "The Request for information action of the Human review connector, sending the amount and justification to the manager through Outlook",
   "The Run a multistage approval action of the Human review connector, with an AI stage followed by a manual stage",
   "A flow condition that compares the amount with 1500 and sends an email to the manager to reply manually"
  ],
  "answer": [
   2
  ],
  "explanation": "Run a multistage approval (preview) combines manual stages (First to respond or Everyone must approve) and AI stages (instructions and inputs; they return Approve/Reject with a justification), with conditions between stages. Request for information only collects data through Outlook, a basic approval has no AI stage, and a condition with an email is not a formal approval.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-advanced-approvals",
  "preview": true
 },
 {
  "id": "q-1.2b-02",
  "skill": "1.2b",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "During a flow, you need an IT colleague from the same tenant to provide a device's asset tag before continuing. They would reply from their email. Which action is the right one?",
  "options": [
   "Send an email (V2) to the colleague and a Delay action until they reply, then read their reply email",
   "Run a multistage approval with a manual stage in which the colleague types the asset tag as a comment",
   "Run a multistage approval with an AI stage that drafts the asset tag from the colleague's email",
   "Request for information (Human review), which pauses the flow and asks via Outlook"
  ],
  "answer": [
   3
  ],
  "explanation": "Request for information pauses the flow and asks one or more assignees for data (text, yes/no, email, number, date, or options) through Outlook, within the same tenant; the first response wins and the outputs are available as dynamic content. Approvals return Approve/Reject decisions, not free-form data, and a Delay with email does not receive the reply in a structured way.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-request-for-information",
  "preview": false
 },
 {
  "id": "q-1.2b-03",
  "skill": "1.2b",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "You design a flow with Run a multistage approval. Choose two correct statements.",
  "options": [
   "An AI stage receives instructions and inputs (text, documents, images, or knowledge) and returns Approve or Reject with a justification",
   "You can assign the same approver to several manual stages to speed up the process",
   "Files are sent directly as attachments to the approver",
   "When you import the solution into another environment, the advanced approval flow travels with ALM, and you do not have to recreate it or reconfigure the stages",
   "Between stages you can use conditions to route, approve, reject, or skip stages"
  ],
  "answer": [
   0,
   4
  ],
  "explanation": "Conditions between stages let you route, approve, reject, or skip, and AI stages return a decision with a rationale. You cannot assign the same approver to several manual stages, advanced approvals have no ALM support (you must recreate them after importing), they cannot be shared, and they do not include file attachments.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-advanced-approvals",
  "preview": true
 },
 {
  "id": "q-1.2b-04",
  "skill": "1.2b",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "An agent flow uses Request for information to ask three claims adjusters for a repair estimate. Two of them reply with different amounts. Which value does the flow use?",
  "options": [
   "The average of all submitted numbers, calculated automatically by the action",
   "The first adjuster's response; later responses are not processed",
   "The response from the last adjuster who replies, because it overwrites the earlier ones",
   "None: the flow fails because two assignees answered the same request"
  ],
  "answer": [
   1
  ],
  "explanation": "With Request for information you can enter several email addresses, but the response from the first person to respond is the one used in the flow, and subsequent responses aren't processed. The action does not combine or overwrite answers.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-request-for-information",
  "preview": false
 },
 {
  "id": "q-1.2b-05",
  "skill": "1.2b",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "In a multistage approval, the AI stage instructions say 'approve expenses under $500 and reject expenses over $300'. For a $400 expense the stage returns Analysis failed. Choose two actions that make the AI stage more reliable. Each correct answer presents part of the solution.",
  "options": [
   "Assign the same approver to the AI stage and to the next manual stage",
   "Add a Delay action before the stage so the model has more time to decide",
   "Rewrite the instructions to focus on either approval criteria or rejection criteria, with exact thresholds",
   "Send the receipt as a file attachment instead of base64 content",
   "Select a more capable model in the model picker"
  ],
  "answer": [
   2,
   4
  ],
  "explanation": "Analysis failed usually appears when instructions conflict or are off-topic, as here, where $400 satisfies both rules. Microsoft recommends focusing on either reasons to approve or reasons to reject, using clear thresholds, and favoring more powerful models for approval decisions. Files must be base64 (attachments aren't supported), and a delay changes nothing.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-advanced-approvals",
  "preview": true
 },
 {
  "id": "q-1.2c-01",
  "skill": "1.2c",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "An agent flow with the Respond to the agent action does a lot of logic processing (calculations and transformations), moves little connector data, and sometimes takes more than two minutes, so the agent gets a timeout. The agent needs the result in the same turn. What do you turn on?",
  "options": [
   "Express mode on the flow",
   "A Try scope with an exponential retry policy on each action",
   "Asynchronous response, which returns the result through a later callback and not in the same turn",
   "Convert the agent flow into a Power Automate cloud flow with a manual trigger"
  ],
  "answer": [
   0
  ],
  "explanation": "Express mode (preview) speeds up flows with heavy processing and low data volume so they complete within the two-minute window; it requires the When an agent calls the flow trigger, a Respond to the agent action, and a Copilot Studio plan. Asynchronous response lets you go beyond two minutes but delivers the result as a later callback; a cloud flow or a retry policy does not fix the run time.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-flow-express-mode",
  "preview": true
 },
 {
  "id": "q-1.2c-02",
  "skill": "1.2c",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "In an agent flow, you want to send text to a model with your own instructions and typed inputs, and use the response in later steps. Which category and action do you add?",
  "options": [
   "Connectors > HTTP",
   "Human in the loop > Request for information",
   "AI capabilities > Run a prompt",
   "Built-in tools > Parse JSON"
  ],
  "answer": [
   2
  ],
  "explanation": "The actions of an agent flow are grouped into AI capabilities (generate text, process documents, run a prompt, call an agent, respond to the agent), Human in the loop (approvals or information), Built-in tools (loops, conditions, data operations, dates, child flows), and Connectors. Run a prompt is in AI capabilities.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview",
  "preview": false
 },
 {
  "id": "q-1.2c-03",
  "skill": "1.2c",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "Adatum wants a connector tool to run with the maker's credentials so that users do not need their own access to the service. Choose two required steps. Each correct answer presents part of the solution.",
  "options": [
   "Turn off generative orchestration for the agent",
   "Configure the agent to use an authenticated channel",
   "Share the connection with every user by using the Can use + share permission",
   "Select No authentication for the agent",
   "In the tool's Details > Additional details, set Credentials to use to Maker-provided credentials"
  ],
  "answer": [
   1,
   4
  ],
  "explanation": "To use maker-provided credentials the agent must use an authenticated channel, and the tool's Credentials to use setting must be changed from the default End user credentials to Maker-provided credentials. Sharing a connection is a separate option, and generative orchestration does not need to be turned off.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors",
  "preview": false
 },
 {
  "id": "q-1.2c-04",
  "skill": "1.2c",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Fabrikam's agent with generative orchestration now has about 100 tools, and it often picks the wrong one. Which statement reflects Microsoft's guidance?",
  "options": [
   "The limit is 50 tools per agent, so removing 50 tools solves the problem completely",
   "Raise the limit by turning on Allow agent to decide dynamically on every tool in the agent",
   "Up to 128 tools are supported, but 25 to 30 is best; split the tools across child agents",
   "The number of tools does not affect selection; only the tool names matter to the orchestrator"
  ],
  "answer": [
   2
  ],
  "explanation": "With generative orchestration an agent supports up to 128 tools, but for the best performance Microsoft recommends keeping it to 25 to 30. With child agents, each child agent has its own orchestration and can manage its own set of up to 128 tools, so splitting tools across them keeps each set small.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.2c-05",
  "skill": "1.2c",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A tool in Contoso's agent cancels customer subscriptions. The maker wants the agent to ask the user for confirmation in the chat before the tool runs. Which setting does this?",
  "options": [
   "Allow agent to decide dynamically when to use the tool",
   "Ask the end user before running, in the tool's additional details",
   "Authentication set to End user credentials, so each user signs in to the tool",
   "After running set to Send specific response, with a confirmation message"
  ],
  "answer": [
   1
  ],
  "explanation": "Ask the end user before running makes the agent request confirmation in the chat before running the tool; it is set to No by default. Allow agent to decide dynamically controls whether the orchestrator can pick the tool on its own, and the authentication and completion settings do not ask for confirmation.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.2d-01",
  "skill": "1.2d",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "An agent flow failed several times today. Where in Copilot Studio do you see the run history with its status and duration, and can you resubmit the runs that failed?",
  "options": [
   "On the Overview tab, which keeps the full run history",
   "On the flow's Activity tab",
   "On the Designer tab",
   "On the Analytics tab, which lists every run with a Resubmit button"
  ],
  "answer": [
   1
  ],
  "explanation": "Activity shows the run history with status and duration, lets you open the details, and lets you resubmit or cancel several runs. Overview shows only flow details (name, connections, owners) and the most recent runs; Analytics summarizes activity (number of runs, error rate, and trends) and can take up to 30 minutes to reflect them.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-manage-monitor",
  "preview": false
 },
 {
  "id": "q-1.2d-02",
  "skill": "1.2d",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "The prepaid Copilot Studio capacity of an environment has been completely used up. Choose two correct statements about what happens to agent flows.",
  "options": [
   "New runs are blocked until capacity is available, but runs already in progress finish normally",
   "All runs in progress are canceled immediately and the agent stops responding completely until the next billing cycle",
   "Flows keep running and are billed automatically as pay-as-you-go with no configuration",
   "Test runs (designer or test chat) and users with a Microsoft 365 Copilot license are not affected",
   "Only flows with premium connectors are blocked; the rest continue normally"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "Each action in an agent flow consumes capacity (13 Copilot Credits per 100 actions). When prepaid capacity runs out, new runs are blocked, running ones finish normally, and the agent keeps responding in interactions without a flow. Test runs (designer or test chat) and users with an M365 Copilot license are not blocked; to avoid interruptions you can link pay-as-you-go.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview",
  "preview": false
 },
 {
  "id": "q-1.2d-03",
  "skill": "1.2d",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "A flow owner runs an agent flow ten times, then opens the Analytics tab a few minutes later. The run count is lower than the number in the Activity tab. What is the most likely explanation?",
  "options": [
   "Analytics counts only failed runs, so successful runs are excluded from the charts",
   "Runs can take up to 30 minutes to appear in the run-related visualizations, and the data sources differ from the Activity tab",
   "The flow is turned off, which pauses analytics collection until it is turned on again",
   "Analytics shows only the runs of the last hour, while the Activity tab shows the full history"
  ],
  "answer": [
   1
  ],
  "explanation": "The Analytics tab lists known limitations: flow runs might take up to 30 minutes to appear in run-related visualizations, and the number of runs can differ from the Activity tab because of differences in data sources, availability and refresh rates.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-manage-monitor",
  "preview": false
 },
 {
  "id": "q-1.2d-04",
  "skill": "1.2d",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso's agent runs an agent flow from a topic in production. Which usage is consumed for one run?",
  "options": [
   "One classic answer plus the agent flow actions",
   "One autonomous action plus the agent flow actions",
   "Only the agent flow actions, because the topic itself is free",
   "Nothing, because flows called by an agent are included in the Copilot Studio license"
  ],
  "answer": [
   0
  ],
  "explanation": "When an agent flow is run from a topic, you consume one classic answer plus the agent flow actions (13 Copilot Credits per 100 actions). Under generative orchestration it is one autonomous action plus the flow actions. Runs from the designer or the agent's test chat do not consume agent flow capacity.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview",
  "preview": false
 },
 {
  "id": "q-1.2d-05",
  "skill": "1.2d",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "Choose the two tasks that you can perform on the Overview tab of an agent flow in Copilot Studio. Each correct answer presents part of the solution.",
  "options": [
   "Turn the flow off so that it no longer triggers",
   "Resubmit several failed runs at once",
   "View the owner, any co-owners and the most recent runs",
   "Review the run error rate and performance trends over time",
   "Cancel runs that are in progress"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "The Overview tab shows the flow's name, description, connections, owner and co-owners, and the most recent runs, and lets you delete the flow or turn it off. Resubmitting or canceling runs belongs to the Activity tab, and trends and error rate are on the Analytics tab.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-manage-monitor",
  "preview": false
 },
 {
  "id": "q-1.2e-01",
  "skill": "1.2e",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "The CreateTicket flow must return the generated ticket number to the agent so a topic can show it to the user. How do you implement this?",
  "options": [
   "Add a second When an agent calls the flow trigger with the number as an input",
   "End the flow with Terminate and send the number in the Message field",
   "Save it with Set variable inside the flow and then read it from the topic as Global.Ticket, without defining outputs",
   "Define an output parameter in Respond to the agent and use it as a variable in the tool node"
  ],
  "answer": [
   3
  ],
  "explanation": "The Respond to the agent action returns the flow's output values to the agent; those outputs appear as variables in the topic's tool node (or the orchestrator uses them to compose the answer). The flow's internal variables do not reach the agent, Terminate stops the flow, and a second trigger does not return data.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent",
  "preview": false
 },
 {
  "id": "q-1.2e-02",
  "skill": "1.2e",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "You add an agent flow as a tool of an agent with generative orchestration. Choose two correct statements about its input parameters.",
  "options": [
   "If you set Custom value, the agent still asks the user to confirm the value",
   "By default each input uses Dynamically fill with AI: the agent extracts it from the context or generates a question for the user",
   "You must create a Question node for each input, because the orchestrator cannot ask the user for data when a flow value is missing",
   "Inputs are filled automatically only in classic orchestration",
   "You can set a value with Fill using > Custom value (literal, variable, or Power Fx formula), and then the agent does not ask the user"
  ],
  "answer": [
   1,
   4
  ],
  "explanation": "With generative orchestration, the agent fills a tool's inputs from the context or generates questions to ask for them, so you do not need Question nodes for each input. If you override an input with Custom value, the agent does not ask again. Automatic collection is a feature of generative orchestration, not of classic.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.2e-03",
  "skill": "1.2e",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "A tool input named region in Northwind's agent flow must map to a predefined list of regions, and the agent should ask again if the user's answer is not recognized. In the tool's Inputs, with Fill using set to Dynamically fill with AI, which two Customize options do you use? Each correct answer presents part of the solution.",
  "options": [
   "Identify as, set to the predefined entity",
   "Custom value with a Power Fx formula",
   "Ask the end user before running",
   "Retry logic",
   "Allow agent to decide dynamically when to use the tool"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "Customize on an input lets you set the display name and description, Identify as (how the answer is interpreted, for example as a predefined entity), Retry logic (ask again if no entity is identified) and Input validation. Custom value would stop the agent from asking, and the other two settings apply to the whole tool, not to one input.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.2e-04",
  "skill": "1.2e",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "After Northwind's CreateTicket flow returns the ticket number, the maker wants the agent to always say exactly 'Ticket {number} created' using the flow's output variable, instead of letting the model word the reply. Which Completion option does the maker use?",
  "options": [
   "Don't respond, which is the default, and lets the agent word the reply",
   "Write the response with generative AI, using the flow's output variable",
   "Send specific response, with the output variable inserted",
   "Send an adaptive card with the ticket number in a text block"
  ],
  "answer": [
   2
  ],
  "explanation": "Under After running, Send specific response lets you author a templated message and insert output variables with the variable picker, so the wording is fixed. Don't respond lets the agent incorporate the output into its own reply, and Write the response with generative AI lets the model word it.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.2e-05",
  "skill": "1.2e",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "An agent flow has an approved branch and a rejected branch, and each ends with its own Respond to the agent action. The approved branch returns TicketId and Status, but the rejected branch returns only Status. What is the problem?",
  "options": [
   "Respond to the agent can be used in several branches, but it must return the same outputs everywhere it is used",
   "A flow can contain only one Respond to the agent action, so the second one must be deleted",
   "Outputs are optional per branch; the agent fills the missing TicketId with a blank value",
   "The rejected branch must use Terminate instead, because only the approved branch can return values"
  ],
  "answer": [
   0
  ],
  "explanation": "The Respond to the agent action can appear in multiple branches of a flow, but it must have the same outputs at each usage. A branch that defines different outputs breaks that rule. Terminate ends the run and does not return values to the agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-modify-use-with-agent",
  "preview": false
 },
 {
  "id": "q-1.2e-06",
  "skill": "1.2e",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "A topic calls an agent flow that generates a long report and takes about ten minutes. The topic times out because tool calls must respond within 100 seconds. How should the flow be designed?",
  "options": [
   "Place the long actions before Respond to the agent and rely on the 30-day flow duration limit",
   "Return a job ID at Respond to the agent and run the long actions after it",
   "Turn on Ask the end user before running so the topic waits for the user",
   "Split the flow in two and call both flows in the same Action node so each stays under 100 seconds"
  ],
  "answer": [
   1
  ],
  "explanation": "Respond to the agent is the line between synchronous and asynchronous: actions placed after it run asynchronously, up to Power Automate's flow duration limit of 30 days. The flow returns a job ID quickly, within 100 seconds, and a polling topic or follow-up message delivers the final result. Putting the long actions before the response still makes the topic wait, and a confirmation prompt does not change timing.",
  "source": "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/3-call-agent-flows-topics",
  "preview": false
 },
 {
  "id": "q-1.2f-01",
  "skill": "1.2f",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A flow runs several actions, and you want to catch any failure of the group in a single place to log it and notify the owner. Which pattern do you apply?",
  "options": [
   "Group the actions in a Try scope and add a Catch scope that runs after has failed and has timed out",
   "Increase the retry policy of all actions to 10 retries with a fixed interval",
   "Put a Terminate action with Succeeded status after each action",
   "Configure run after is successful on each action and manually check the result of the previous one to detect the error"
  ],
  "answer": [
   0
  ],
  "explanation": "Grouping actions in scopes enables a try-catch pattern: the Catch scope runs when the Try fails (run after has failed or has timed out), and with result() and Filter array you get the error to log or notify. is successful runs only when everything went well, Terminate with Succeeded hides errors, and retries help only with transient failures.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling",
  "preview": false
 },
 {
  "id": "q-1.2f-02",
  "skill": "1.2f",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "An HTTP action in a flow fails intermittently because of transient network problems on the external service. Which configuration does Microsoft recommend?",
  "options": [
   "A Terminate action with Failed status after the first error so the owner gets notified",
   "A Catch scope that deletes the flow when it fails",
   "An exponential retry policy on the HTTP action",
   "A retry policy of none so as not to overload the external service"
  ],
  "answer": [
   2
  ],
  "explanation": "A retry policy helps recover from transient failures; exponential ones are preferred because they increase the interval between retries and give the problem more time to resolve. They are configured in the action settings (initial interval and maximum retries). Terminate and deleting the flow do not fix a transient failure, and none does not retry.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling",
  "preview": false
 },
 {
  "id": "q-1.2f-03",
  "skill": "1.2f",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "In your flow's Catch scope, you want to identify which action in the Try failed and stop the flow, marking it as failed. Choose two actions.",
  "options": [
   "Configure the Try scope with run after has failed so it runs right before the Catch and captures its errors",
   "Configure the Catch scope with run after is successful",
   "Use the result() expression on the Try scope and filter the output with Filter array to get the error",
   "Delete the Try scope so the error does not propagate",
   "Add a Terminate action with Failed status and a message that explains the cause"
  ],
  "answer": [
   2,
   4
  ],
  "explanation": "result() returns the results of the actions in the scope and Filter array lets you keep the one that failed; Terminate with Failed status stops the flow and leaves a status and message for diagnosis. The run after setting belongs on the Catch scope, pointing at the Try (has failed or has timed out); with is successful the Catch would run only when there is no error.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling",
  "preview": false
 },
 {
  "id": "q-1.2f-04",
  "skill": "1.2f",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "In Fabrikam's flow, a Send summary email action must run after Update a row no matter how that action ends: success, failure, timeout or skip. How do you configure it?",
  "options": [
   "Leave the default run after setting, which makes the action run after both success and failure",
   "Set run after to has failed only, because failure is the case that matters",
   "Add a Terminate action with Succeeded status before it, so the outcome is always successful",
   "Select is successful, has failed, is skipped and has timed out under run after"
  ],
  "answer": [
   3
  ],
  "explanation": "Run after lets you decide whether an action runs when the previous action fails, times out, is skipped or succeeds. The default is to run only after success, so an action that must always run needs all the outcomes selected. Selecting only has failed would skip the action on success, and Terminate stops the flow.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling",
  "preview": false
 },
 {
  "id": "q-1.2f-05",
  "skill": "1.2f",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "In the Catch scope of Contoso's flow, the maker wants the notification email to include a direct link to the failed run. Which approach does Microsoft's guidance describe?",
  "options": [
   "Use the result() function on the Catch scope; its output already contains the run URL",
   "Read the run URL from the Message field of the Terminate action in the Catch scope",
   "Use workflow(), parse its JSON with Parse JSON, and build the run URL with Compose",
   "Turn on Express mode so that the run URL is added to every notification automatically"
  ],
  "answer": [
   2
  ],
  "explanation": "The workflow() function returns details about the current run, including environment, flow and run identifiers. You parse it with Parse JSON and use a Compose action to assemble the run URL, which you can put in a notification email or an error log. The guidance warns against excessive custom logging that adds many actions.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling",
  "preview": false
 },
 {
  "id": "q-1.3a-01",
  "skill": "1.3a",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A topic must call the FindEmployee agent flow at an exact step of its conversation (after asking for the email), and the flow must not be available in other topics. What do you do?",
  "options": [
   "Turn it into a shared component collection and add it to the agent",
   "Add it inside the topic with Add a tool, which creates an Action node",
   "Add it only on the agent's Tools page as an agent-level tool available to every topic",
   "Call it with a Redirect node that sends the conversation to another topic"
  ],
  "answer": [
   1
  ],
  "explanation": "A flow added to a topic is available only to that topic and runs at the point on the canvas where you place it, creating an Action node. An agent-level tool, on the other hand, is available for the orchestrator to choose; Redirect only transfers the conversation to another topic, and a component collection is for sharing components across agents, not for limiting their use to one topic.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent",
  "preview": false
 },
 {
  "id": "q-1.3a-02",
  "skill": "1.3a",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "The Cancel order agent flow is destructive. You want it to run only when the confirmation topic explicitly calls it and never to be chosen by the orchestrator on its own. What do you configure?",
  "options": [
   "Turn on Ask the end user before running and keep dynamic selection turned on so the user confirms every call",
   "Set the tool's Enabled toggle to Off for the orchestrator",
   "Call it from the topic with Add a tool and turn off Allow agent to decide dynamically",
   "Change Authentication to Maker-provided credentials"
  ],
  "answer": [
   2
  ],
  "explanation": "With Allow agent to decide dynamically turned off, the agent uses the tool only when a topic calls it explicitly. Ask the end user before running only asks for confirmation, but the orchestrator can still choose it; switching to maker credentials does not limit who calls it; and setting Enabled to Off blocks the agent from using the tool in any case.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.3a-03",
  "skill": "1.3a",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A Contoso topic calls an agent flow through an Action node, and the flow returns a ticket number with Respond to the agent. How do you show that number in a Message node placed after the Action node?",
  "options": [
   "Add a Question node that asks the flow for the value again, then save it",
   "Read it from the System.Activity.Text variable in the Message node",
   "Insert variable ({x}) in the Message node and pick the Action node's output",
   "Leave it out: flow outputs are available only to the orchestrator, not to the topic"
  ],
  "answer": [
   2
  ],
  "explanation": "The output of an Action node generates new variables, which you can insert into later nodes like any other variable. System.Activity.Text holds the user's last message, not the flow output, and a Question node would ask the user, not the flow. Topics can use the outputs of tools they call.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables",
  "preview": false
 },
 {
  "id": "q-1.3a-04",
  "skill": "1.3a",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "Contoso wants to add an existing agent flow to a single topic as a topic-level tool. Which three requirements must the flow meet? Each correct answer presents part of the solution.",
  "options": [
   "It has the When an agent calls the flow trigger and a Respond to the agent action",
   "It was first added on the agent's Tools page as an agent-level tool",
   "It is published",
   "Asynchronous response is set to Off in the Respond to the agent action",
   "It uses the Manually trigger a flow trigger"
  ],
  "answer": [
   0,
   2,
   3
  ],
  "explanation": "To be used as a tool, a flow needs the agent trigger and response action, must be published, and must respond in real time (Asynchronous response Off) within the 100-second action limit. A flow can be added at the agent level or directly at the topic level, so adding it to the Tools page first is not required, and a manual trigger does not qualify.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent",
  "preview": false
 },
 {
  "id": "q-1.3a-05",
  "skill": "1.3a",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Fabrikam's environment uses customer-managed keys (CMK). A cloud flow called from a topic is set to run with the Provided by run-only user connections, and it fails when end users run it. What do you do?",
  "options": [
   "Turn on Ask the end user before running on the Action node of the topic",
   "Set the flow's run-only connection settings to specific connections instead of Provided by run-only user",
   "Copy the flow into a Prompt tool so it no longer needs connections",
   "Move the flow from the topic to the agent's Tools page as an agent-level tool"
  ],
  "answer": [
   1
  ],
  "explanation": "Cloud flows in CMK environments cannot yet run with the customer's own credentials as part of an orchestration plan or when called from a topic, so their run-only settings must use specific connections. Asking for confirmation, converting to a prompt, or moving the flow to agent level does not change which credentials the flow uses.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-flow-create",
  "preview": false
 },
 {
  "id": "q-1.3a-06",
  "skill": "1.3a",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's flow has the When an agent calls the flow trigger and a Respond to the agent action, is published, and has Asynchronous response set to Off. It still does not appear in the tool picker of a topic. What else must be true?",
  "options": [
   "The flow must be a solution flow",
   "The flow must use the Manually trigger a flow trigger as well",
   "Allow agent to decide dynamically must be turned on for the flow",
   "The flow must be converted into a Power Automate desktop flow"
  ],
  "answer": [
   0
  ],
  "explanation": "A flow must also be a solution flow to appear in the tool picker. The agent trigger and response action are already in place, and a manual trigger is not what makes a flow callable. Allow agent to decide dynamically is a tool setting that controls automatic selection, not visibility in the picker.",
  "source": "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/3-call-agent-flows-topics",
  "preview": false
 },
 {
  "id": "q-1.3b-01",
  "skill": "1.3b",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "You want the user to be required to choose one of three priorities (High, Medium, or Low) and not be able to reply with free text. What do you use?",
  "options": [
   "Quick replies in a Message node",
   "A multiple choice Question node",
   "A Message node with three message variations",
   "An Adaptive Card with three buttons shown inside a Message node"
  ],
  "answer": [
   1
  ],
  "explanation": "Quick replies suggest answers, but the client can ignore them and type freely; to require a choice from a list, you use a multiple choice Question. Message variations only pick one wording at random, and an Adaptive Card inside a Message is informational, not interactive.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-send-message",
  "preview": false
 },
 {
  "id": "q-1.3b-02",
  "skill": "1.3b",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A tool returns variables (ticket number, status, and SLA). You want exact, formatted text with those values inserted, without the model rewriting the response. Which After running option do you choose?",
  "options": [
   "Turn off Allow agent to decide dynamically when to use this tool",
   "Write the response with generative AI",
   "Don't respond (default value)",
   "Send specific response, inserting the output variables"
  ],
  "answer": [
   3
  ],
  "explanation": "Send specific response lets you write a templated response with output variables (even with Power Fx formulas), with no involvement from the model. Don't respond lets the agent incorporate the output into its own response, and Write the response with generative AI makes the AI compose the response; neither guarantees the exact text.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.3b-03",
  "skill": "1.3b",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A Northwind Message node must show a button labeled Return an item. When the user selects it, the code RETURN_START must reach the agent as the user's reply, but the code must not appear in the chat history. What do you configure?",
  "options": [
   "A quick reply with Type set to Open URL that points to RETURN_START",
   "A quick reply with Type set to Send a message, with RETURN_START as the text",
   "A quick reply with Type set to Make a call using the number RETURN_START",
   "A quick reply with Type set to Send a hidden message to the agent"
  ],
  "answer": [
   3
  ],
  "explanation": "Quick replies default to Send a message, which sends the text to the agent and shows it in the chat history. The Send a hidden message to the agent type sends it but keeps it out of the history. Open URL and Make a call do not send a reply to the agent at all.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-send-message",
  "preview": false
 },
 {
  "id": "q-1.3b-04",
  "skill": "1.3b",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "Contoso's agent runs on a voice-enabled channel (Omnichannel for Customer Service). A Message node contains a long URL that sounds awkward when read aloud. You want different spoken wording and a short pause before the order number. Which two actions do you take? Each correct answer presents part of the solution.",
  "options": [
   "Add a message variation with the spoken wording",
   "Switch the Message node to Speech and enter the spoken message",
   "Add a quick reply of type Send a hidden message to the agent",
   "Add an SSML Break tag to the speech message",
   "Add an Adaptive Card that contains the spoken text"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "On voice channels the message text is used for both display and voice, but a Speech override lets you give the agent different spoken text. SSML tags such as Break insert pauses. Message variations are picked at random and are not speech-specific, and quick replies or Adaptive Cards do not control what is spoken.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-send-message",
  "preview": false
 },
 {
  "id": "q-1.3b-05",
  "skill": "1.3b",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A Message node holds three basic cards describing Contoso's plans. Users currently see one card at a time and must swipe through them. You want all three cards visible in a vertical stack. What do you do?",
  "options": [
   "Select a card and choose the List icon in the node's menu bar",
   "Turn off the Carousel option in the agent's Generative AI settings",
   "Replace the basic cards with quick replies",
   "Move the cards to a Question node, because only Question nodes can show a list"
  ],
  "answer": [
   0
  ],
  "explanation": "When a node has two or more media cards they display as a Carousel by default, and the List icon on the node's menu bar switches them to a vertical list. It is a per-node display option, not an agent setting, and every Message node capability is also available in a Question node.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-send-message",
  "preview": false
 },
 {
  "id": "q-1.3c-01",
  "skill": "1.3c",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "Your agent uses classic orchestration (generative orchestration turned off) and you want it to query a Dataverse tool. How can the tool be used?",
  "options": [
   "Only by calling it explicitly from a topic with an Add a tool node",
   "By adding it on the Tools page: classic orchestration runs it based on trigger phrases",
   "The agent will choose it automatically based on its description",
   "It cannot be used: classic orchestration does not support tools"
  ],
  "answer": [
   0
  ],
  "explanation": "In classic orchestration, tools can be called only explicitly from a topic; it is the generative orchestrator that chooses them dynamically by name and description. That is why trigger phrases select only topics, not tools, and you can indeed use tools inside topics.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.3c-02",
  "skill": "1.3c",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "A tool deletes records in Dataverse. You want the end user to confirm before the agent runs it. Which Additional details setting do you configure?",
  "options": [
   "Fill using set to Custom value",
   "Ask the end user before running set to Yes",
   "Authentication set to Maker-provided credentials",
   "After running set to Don't respond"
  ],
  "answer": [
   1
  ],
  "explanation": "Ask the end user before running (No by default) makes the agent ask the user for confirmation before running the tool. Authentication defines which credentials it runs with, After running controls how it responds afterward, and Fill using defines how its inputs are filled.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.3c-03",
  "skill": "1.3c",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A Dataverse tool in your agent has an input named Region that must always take its value from the Global.UserRegion variable. The agent must never ask the user for it. What do you set in the tool's Inputs?",
  "options": [
   "Fill using set to Dynamically fill with AI and a clear input description",
   "Fill using set to Custom value with Global.UserRegion",
   "Authentication set to Maker-provided credentials for the Dataverse connection",
   "Ask the end user before running set to Yes, with Region as a required input"
  ],
  "answer": [
   1
  ],
  "explanation": "Custom value overrides the input with a value, variable or Power Fx formula, and then the agent does not ask the user for it. Dynamically fill with AI is the default and can generate a question to the user. Authentication and the confirmation setting do not control how inputs are filled.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.3c-04",
  "skill": "1.3c",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Adatum's HR lookup tool reads a shared internal service. All employees must be able to use it through the agent without each of them having their own access to that service. Which Authentication setting do you choose on the tool?",
  "options": [
   "End user credentials, which is the default",
   "Maker-provided credentials",
   "None, because tools can run without authentication",
   "End user credentials, together with Ask the end user before running set to Yes"
  ],
  "answer": [
   1
  ],
  "explanation": "Maker-provided credentials make the tool use its author's identity, which suits shared resources or cases where users should not need individual access. End user credentials (the default) make each user authenticate and see only what they are allowed to see. Tools cannot run unless authentication is enabled, and the confirmation setting does not change whose credentials are used.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.3c-05",
  "skill": "1.3c",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "During an incident you must stop the agent from using a Dataverse tool, but you want it to stay connected so you can switch it back on later without reconfiguring it. What do you do?",
  "options": [
   "Turn off the Enabled toggle on the tool's page and save",
   "Delete the tool from the main Tools page in Copilot Studio",
   "Clear Allow agent to decide dynamically when to use the tool",
   "Set Authentication to Maker-provided credentials for the tool"
  ],
  "answer": [
   0
  ],
  "explanation": "Turning the Enabled toggle off blocks the agent from using the tool while it stays connected and can be turned back on. Tools can be deleted only from the agent's own Tools page, not the main Tools page, and clearing dynamic use would still let topics call the tool explicitly.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-1.3c-06",
  "skill": "1.3c",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A maker wants the orchestrator to call the Create search query tool on its own, but the tool does not appear on the agent's Tools page. Why?",
  "options": [
   "It appears only after generative orchestration is turned on in Generative AI settings",
   "It must first be published as a custom connector in the environment",
   "It is a topic-only tool: you add it with Add a tool inside a topic, and the orchestrator cannot call it",
   "It is available only to agents that use Azure AI Search as knowledge"
  ],
  "answer": [
   2
  ],
  "explanation": "Create search query and Perform custom search exist only at the topic level. They are added with Add a tool inside a topic, do not appear on the agent's Tools page, and cannot be invoked by the orchestrator, regardless of the orchestration mode.",
  "source": "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/2-call-tools-topics",
  "preview": false
 },
 {
  "id": "q-1.3d-01",
  "skill": "1.3d",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "You need a single-turn instruction that takes the text of a ticket, classifies it with a language model, and returns the result, and that you can use in a topic or as an agent tool. Which type of tool do you create?",
  "options": [
   "A Generative answers node over a public website",
   "A child agent with its own instructions and tools",
   "A REST API tool that calls a classification endpoint",
   "A prompt built with the prompt builder"
  ],
  "answer": [
   3
  ],
  "explanation": "A prompt is a single-turn, model-based tool with instructions, inputs, and optionally knowledge; it can be added as an agent tool (Tools > New tool > Prompt), as a node in a topic (Add a tool > New prompt), or as a Run a prompt action in an agent flow. A child agent is heavier, a generative answers node answers over knowledge, and a REST API tool calls an API.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-prompt-node",
  "preview": false
 },
 {
  "id": "q-1.3d-02",
  "skill": "1.3d",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "When you open the prompt builder, the Temperature slider appears disabled. What is the most likely cause?",
  "options": [
   "The agent uses Authenticate manually",
   "Temperature can be changed only in the agent's Generative AI settings, not in the prompt builder",
   "You selected the GPT-5 reasoning model, which does not support the temperature setting",
   "The prompt's content moderation level is set to High"
  ],
  "answer": [
   2
  ],
  "explanation": "Temperature (from 0 to 1; 0 by default) controls the balance between predictable and creative answers, and it is not available for the GPT-5 reasoning model, so the slider is disabled. It is configured in the prompt's settings, not the agent's, and it does not depend on authentication or the moderation level.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/prompt-model-settings",
  "preview": false
 },
 {
  "id": "q-1.3d-03",
  "skill": "1.3d",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso publishes a customer-facing agent that allows anonymous users (no authentication). A prompt tool in the agent uses a Dataverse table as its knowledge object. Which statement is true?",
  "options": [
   "It works as for authenticated users, because the prompt runs with the maker's credentials",
   "The prompt cannot be used at all in an agent that allows anonymous users until authentication is on",
   "The Dataverse table works, but only the first three rows are sent to the model",
   "The Dataverse table cannot be used as knowledge, but inputs and model settings still work"
  ],
  "answer": [
   3
  ],
  "explanation": "Agents that allow anonymous users cannot use Dataverse tables as knowledge sources in prompts. The prompt can still define inputs, pick the model and set the temperature. The three-record limit belongs to custom data in a generative answers node, not to prompts.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-prompt-node",
  "preview": false
 },
 {
  "id": "q-1.3d-04",
  "skill": "1.3d",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Northwind wants a prompt tool to extract fields from an invoice scan that the user supplies at runtime, and the scan must change on every call. What do you add in the prompt builder?",
  "options": [
   "An input of type Image or document, added with /",
   "A knowledge object from Dataverse that holds the scan",
   "A Text input, because the prompt accepts only text values",
   "A lower Temperature so the image is read more accurately"
  ],
  "answer": [
   0
  ],
  "explanation": "Inputs let you pass dynamic values at runtime, and you can choose Text or Image or document as the input type. A knowledge object is data retrieved from a source connection such as Dataverse, not a value supplied per call. Temperature only changes how random the output is.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/create-custom-prompt",
  "preview": false
 },
 {
  "id": "q-1.3d-05",
  "skill": "1.3d",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "A prompt tool has its own content moderation level set to Low, but its responses in the agent still follow the agent's stricter moderation. How do you make the prompt's own setting apply?",
  "options": [
   "Turn on Include links in the response in the prompt settings so that citations are returned",
   "Set Record retrieval to the maximum number of records in the knowledge settings",
   "In Completion, set After running to Send specific response with the prompt's output variable",
   "In the tool's Completion, set After running to Write the response with generative AI"
  ],
  "answer": [
   2
  ],
  "explanation": "To override the agent or topic moderation for a prompt tool, configure its Completion so that After running sends a specific response containing the prompt output variable. Citation links and record retrieval have nothing to do with moderation, and letting generative AI write the response keeps the agent's moderation in play.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/prompt-model-settings",
  "preview": false
 },
 {
  "id": "q-1.3e-01",
  "skill": "1.3e",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "Inventory data lives only in an internal API that no supported knowledge source covers. You want a Generative answers node to answer using only the response from that API. Choose three configurations.",
  "options": [
   "Turn on Search only selected sources and do not select any knowledge source",
   "Convert the Send HTTP request response into a Table and pass it to the Custom data (Classic data) field",
   "Add the API URL as a Public website knowledge source",
   "Upload the JSON response every hour as a document in Dataverse",
   "Keep Web search and Allow the AI to use its own general knowledge turned off"
  ],
  "answer": [
   0,
   1,
   4
  ],
  "explanation": "To answer only with your own data, you pass a table to the Custom data field (under Classic data), turn on Search only selected sources without selecting any sources so the node does not search knowledge sources, and leave web search and the AI's general knowledge turned off. A private API is not a public website, and uploading files periodically is unnecessary.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node",
  "preview": false
 },
 {
  "id": "q-1.3e-02",
  "skill": "1.3e",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "You pass a table with 10 records (Content, ContentLocation, and Title) to the Custom data field, but the answers always seem to be based on the same few records. What is the reason?",
  "options": [
   "Only the first three records in the table are used",
   "ContentLocation must be a local file path, not a URL, for the citations to work",
   "Title is required and records without a Title are discarded before the answer is generated",
   "Custom data supports only one record per call, so the rest are ignored"
  ],
  "answer": [
   0
  ],
  "explanation": "Custom data receives a table with Content (required), ContentLocation (citation URL, optional), and Title (optional), but only the first three records are used to generate the answer. That is why you should sort and filter the table before passing it to the node.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-custom-data",
  "preview": false
 },
 {
  "id": "q-1.3e-03",
  "skill": "1.3e",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's agent uses generative orchestration. The team wants its answers to draw on a Table of custom data built from an internal API response. Where must the custom data be used?",
  "options": [
   "Inside a generative answers node, using Classic data > Custom data",
   "As a knowledge source added on the agent's Knowledge page",
   "In the Allow ungrounded responses setting of the Generative AI settings",
   "As an Official source marked on the Knowledge page"
  ],
  "answer": [
   0
  ],
  "explanation": "Generative orchestration does not support custom data (or Bing Custom Search) as agent-level knowledge sources, so you embed them in a generative answers node in a topic. The Allow ungrounded responses setting only allows model general knowledge, and Official source is a trust label, not a way to supply data.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
  "preview": false
 },
 {
  "id": "q-1.3e-04",
  "skill": "1.3e",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "A generative answers node uses Custom data whose records contain only the Content column. Allow ungrounded responses is turned off, and the agent sometimes withholds correct answers as if it found nothing. What should you do?",
  "options": [
   "Raise the number of records in the table above three so more content is searched",
   "Turn on Search only selected sources and pick a single source",
   "Lower the content moderation level of the node to Low",
   "Add ContentLocation and Title to each record, and ask the model to cite"
  ],
  "answer": [
   3
  ],
  "explanation": "With Allow ungrounded responses off, an answer from a knowledge source is returned only if it includes an in-text citation, so answers without one can be withheld. ContentLocation (URL) and Title give the model what it needs to cite, and citation instructions make that more consistent. Extra records, source selection and moderation do not fix a missing citation.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
  "preview": false
 },
 {
  "id": "q-1.3e-05",
  "skill": "1.3e",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "In the properties of a generative answers node, which two kinds of source are not offered in the node's list of knowledge sources and must be configured through the Classic data option? Each correct answer presents part of the solution.",
  "options": [
   "A SharePoint site",
   "Bing Custom Search",
   "Documents uploaded to Dataverse",
   "Custom data",
   "A public website"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "Knowledge sources inside a generative answers node do not support Bing Custom Search, Azure OpenAI or custom data, so those are set up under Classic data. SharePoint sites, uploaded documents and public websites can be selected as regular knowledge sources.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node",
  "preview": false
 },
 {
  "id": "q-1.3e-06",
  "skill": "1.3e",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "In an HR topic, Contoso must remove confidential records from the knowledge search results and then summarize what is left with a custom prompt. Which two steps achieve this? Each correct answer presents part of the solution.",
  "options": [
   "Add the Perform custom search tool in the topic, which returns the raw, unsummarized results in an output variable",
   "Use the Generative answers node and filter its summary afterwards",
   "Use Create search query, which returns the matching records",
   "Filter the results in the topic and pass what remains to a prompt for summarization"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "Perform custom search separates retrieval from response: it returns raw results in a variable, so the topic can filter them with business rules and then feed them to a prompt. The Generative answers node retrieves and summarizes in one step, leaving no stage to filter in between. Create search query only rewrites the user's message into a clear query string; it does not return records.",
  "source": "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/2-call-tools-topics",
  "preview": false
 },
 {
  "id": "q-1.3f-01",
  "skill": "1.3f",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Your Send HTTP request node sometimes returns 404. You want the topic to continue, read the status code, and explain to the user what happened, instead of triggering the system error message. What do you configure?",
  "options": [
   "Mark the node with Allow switching to another topic so the topic can handle the error",
   "Set Error handling to Continue on error and assign variables to the status code and error body",
   "Leave Raise an error and catch the error in the On Error system topic to continue the original topic with the status code",
   "Raise the Request timeout to 120 seconds so the API has time to respond"
  ],
  "answer": [
   1
  ],
  "explanation": "By default the node uses Raise an error: the operation stops and the On Error system topic is triggered. With Continue on error, the status code and the error body are saved (type Any, which you can convert with Parse value) and the topic keeps going. The timeout (30 seconds by default) does not fix a 404, and On Error does not return control to the original topic.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node",
  "preview": false
 },
 {
  "id": "q-1.3f-02",
  "skill": "1.3f",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "You need to send a POST whose body includes values of topic variables (for example Topic.Title and Topic.Priority). Choose two steps.",
  "options": [
   "Choose Raw content, which does not support variables",
   "Leave Body as No Content; variables are added automatically as a query string on the endpoint URL",
   "Use Edit JSON > Formula and write a Power Fx object that references the variables",
   "Under Headers and body > Body, choose JSON Content",
   "Change the method to GET so that it accepts a dynamic body"
  ],
  "answer": [
   2,
   3
  ],
  "explanation": "In JSON Content you can write a JSON object or, with Edit JSON > Formula, a Power Fx object that references variables and is converted to JSON when the request is made. Body is No Content by default (typical for GET); Raw content is also written with a Power Fx formula, so it does support variables.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node",
  "preview": false
 },
 {
  "id": "q-1.3f-03",
  "skill": "1.3f",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso's Send HTTP request node calls a slow inventory API that regularly takes about 45 seconds to respond, and the node fails before the response arrives. What do you change?",
  "options": [
   "Change the method from GET to PUT so the server prioritizes the request",
   "Set Error handling to Continue on error and read the status code afterwards",
   "Increase Request timeout in the HTTP Request properties panel",
   "Add a header named Timeout with the value 45 to the request"
  ],
  "answer": [
   2
  ],
  "explanation": "The HTTP Request node has a Request timeout property, in milliseconds, with a default of 30 seconds, so a 45-second API needs a larger value. Continue on error only lets the topic carry on after a failure and does not make the call wait longer. The method and an invented header have no effect on the timeout.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node",
  "preview": false
 },
 {
  "id": "q-1.3f-04",
  "skill": "1.3f",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "After a Send HTTP request node returns an order, you want to reference fields of the response in later Power Fx formulas with IntelliSense. What do you configure on the node?",
  "options": [
   "Response data type set to From sample data, then Get schema from sample JSON with an example response",
   "Body set to JSON Content with the expected fields of the response",
   "Body set to Raw content with a template of the expected response",
   "Request timeout set to match the API's response size, in milliseconds"
  ],
  "answer": [
   0
  ],
  "explanation": "Choosing From sample data and pasting an example JSON response generates a typed Power Fx variable for the response, so later nodes get IntelliSense on its fields. The Body options shape the request that is sent, not how the response is typed, and the timeout does not affect typing.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node",
  "preview": false
 },
 {
  "id": "q-1.3f-05",
  "skill": "1.3f",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "A Send HTTP request node sometimes fails. The topic must keep running and read a field named message from the error response body. Which two actions do you take? Each correct answer presents part of the solution.",
  "options": [
   "Set Error handling to Continue on error and assign variables for the status code and the error response body",
   "Leave Error handling on the default, because the topic continues and fills the error variables automatically",
   "Change the method to GET so the error body comes back as a record",
   "Add a Parse value node to convert the error response variable, whose type is Any, into a record"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "By default the node raises an error and triggers the On Error system topic; Continue on error stores the status code and error body in variables so the topic can continue. The error response variable has type Any, so a Parse value node turns it into a record whose fields you can read. The method does not change how errors are returned.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node",
  "preview": false
 },
 {
  "id": "q-1.3g-01",
  "skill": "1.3g",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "A sensitive topic must answer using only an approved SharePoint site and without mixing in results from the agent's other knowledge sources. Choose two Generative answers node configurations.",
  "options": [
   "Leave Search only selected sources turned off (default value) and trust that the node prioritizes SharePoint",
   "Turn off all sources at the agent level",
   "Select only that SharePoint site in the list of sources",
   "Turn on Search only selected sources without selecting any source",
   "Turn on Search only selected sources"
  ],
  "answer": [
   2,
   4
  ],
  "explanation": "With Search only selected sources turned on, the sources you select replace the agent's sources for that node (with no fallback to them). Turned off (the default), the node searches all of the agent's sources, and if you select none, the node does not search knowledge sources (useful only with custom data). Turning off the agent's sources would affect all the other topics.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node",
  "preview": false
 },
 {
  "id": "q-1.3g-02",
  "skill": "1.3g",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "In a Generative answers node, you cleared Send a message and saved the response in a global variable to show it in an Adaptive Card. In Teams, users no longer see the citation links. Why?",
  "options": [
   "Citations are turned off because the content moderation level is High in the Generative AI settings",
   "Teams does not support citations in any case, only plain text without links or references",
   "In Teams, automatic citations are returned only in unmodified responses; in customized ones you must render them yourself",
   "Adaptive Cards always remove citations; you have to use a Message node instead of the card"
  ],
  "answer": [
   2
  ],
  "explanation": "When you clear Send a message and display the customized response (for example in an Adaptive Card), Copilot Studio no longer adds the citations automatically in Teams; you must include their rendering in your response. Teams does support citations, and moderation does not remove them.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node",
  "preview": false
 },
 {
  "id": "q-1.3g-03",
  "skill": "1.3g",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "A generative answers node has Search only selected sources turned on, with only Contoso's HR SharePoint site selected. A user asks something the HR site cannot answer, although a public website on the agent's Knowledge page could. What happens?",
  "options": [
   "The node automatically falls back to the agent-level knowledge sources",
   "The node does not search the agent's other sources",
   "The node ignores the selection and searches all sources",
   "The node switches to web search when Web search is on for the agent"
  ],
  "answer": [
   1
  ],
  "explanation": "With Search only selected sources on, the selected sources replace the agent-level set for that node, and there is no automatic fallback to the other sources. Generative answers as a fallback is a separate agent-level behavior that applies when no topic matches.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node",
  "preview": false
 },
 {
  "id": "q-1.3g-04",
  "skill": "1.3g",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Adatum pastes a 12,000-character style guide into the custom instructions field of a generative answers node to control tone and format. Which limit applies to those prompt instructions?",
  "options": [
   "500 characters",
   "2,000 characters",
   "4,000 characters",
   "8,000 characters"
  ],
  "answer": [
   3
  ],
  "explanation": "Custom instructions (prompt modification) for generative answers are limited to 8,000 characters, so the style guide has to be shortened. Simple, specific instructions also work better than very long ones.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-prompt-modification",
  "preview": false
 },
 {
  "id": "q-1.3g-05",
  "skill": "1.3g",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's agent has content moderation set to Lowest in the Generative AI settings. One sensitive topic's generative answers node is set to Highest. Which level applies when that node runs?",
  "options": [
   "Lowest, because the agent-level setting always wins",
   "An average of the two levels, which rounds to Medium",
   "Highest, because the node overrides the agent",
   "Whichever level is more permissive of the two"
  ],
  "answer": [
   2
  ],
  "explanation": "The agent-level moderation setting is the default, but the setting on the generative answers node takes precedence at runtime for that topic. If the node has no setting of its own, it uses the Generative AI settings value.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
  "preview": false
 },
 {
  "id": "q-1.3h-01",
  "skill": "1.3h",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "You need a form with Input.Text for the description, Input.ChoiceSet for the priority, and a Submit button, with the values saved in topic variables. Which node do you use?",
  "options": [
   "A Message node with an Adaptive Card added from Add > Adaptive card and an Action.Submit button",
   "A Boolean Question node",
   "A Send an event node",
   "Ask with adaptive card, with a card that includes at least one Action.Submit"
  ],
  "answer": [
   3
  ],
  "explanation": "The Adaptive Card node (Ask with adaptive card) is for interactive cards: it shows the card, requires at least one submit button, and automatically creates output variables from the inputs (editable with Edit Schema). Message and Question show informational, non-interactive cards.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-ask-with-adaptive-card",
  "preview": false
 },
 {
  "id": "q-1.3h-02",
  "skill": "1.3h",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Your Adaptive Card uses version 1.6 elements and an Action.Execute action. It looks fine in the test chat but fails when delivered in Teams and in web chat. What do you do?",
  "options": [
   "Redesign it with schema 1.5 and Action.Submit, which Teams and Web Chat support",
   "Raise the schema to 1.7, which is what Teams and Web Chat support in their card renderers",
   "Change the authentication to Authenticate manually so the card renders",
   "Republish the agent: the canvas shows version 1.6 only after publishing"
  ],
  "answer": [
   0
  ],
  "explanation": "Copilot Studio supports schemas 1.6 and earlier, but it depends on the host: Web Chat supports 1.6 but not Action.Execute, and both the live chat widget and Teams are limited to 1.5. The test chat renders 1.6 cards (the canvas does not), which is why it looks fine there. Publishing or changing the authentication does not change the host's support.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/adaptive-cards-overview",
  "preview": false
 },
 {
  "id": "q-1.3h-03",
  "skill": "1.3h",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "In an Ask with adaptive card node, you switch to Formula so the card title shows Topic.Title. Later you decide you want the original JSON back. Which statement is true?",
  "options": [
   "Once you edit in the formula panel you cannot return to the original JSON",
   "Switching back to JSON restores the original card at any time, even after editing the formula",
   "You can return to JSON only before the topic is saved or published",
   "Formulas are supported only in Message nodes, not in Ask with adaptive card"
  ],
  "answer": [
   0
  ],
  "explanation": "Selecting Formula converts the card JSON into a Power Fx formula, and once you begin editing there you cannot go back to the original JSON. Keep a copy of the JSON in your notes or a node comment. Power Fx works in the Ask with adaptive card node.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-ask-with-adaptive-card",
  "preview": false
 },
 {
  "id": "q-1.3h-04",
  "skill": "1.3h",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "An Ask with adaptive card node uses default settings. Instead of selecting Submit, the user types a text message that does not trigger another topic. What happens?",
  "options": [
   "The card is treated as submitted with empty values and the topic continues",
   "The topic ends and the agent returns to the Conversation Start topic",
   "The message is invalid, so the agent resends the card up to 2 times",
   "The agent goes to the Fallback system topic after the first message"
  ],
  "answer": [
   2
  ],
  "explanation": "While the agent waits for a card submission, a typed message counts as invalid unless it triggers an interruption. By default How many reprompts is Repeat up to 2 times, and the card is resent on each retry. If the text matched another topic, Allow switching to another topic (on by default) would interrupt instead.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-ask-with-adaptive-card",
  "preview": false
 },
 {
  "id": "q-1.3h-05",
  "skill": "1.3h",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "An agent sends two consecutive Adaptive Cards, each with an Action.Submit button. Users sometimes select the button on the earlier card and the agent behaves unexpectedly. Which two actions help prevent this? Each correct answer presents part of the solution.",
  "options": [
   "Raise the card schema version to 1.6",
   "Include a unique identifier in each submit action's data payload",
   "Add conditions in the agent that check that identifier to tell which card and action a response came from",
   "Set How many reprompts to Don't repeat",
   "Replace Action.Submit with Action.Execute"
  ],
  "answer": [
   1,
   2
  ],
  "explanation": "Submit buttons can be selected more than once by design, so each submit action should carry unique data and the agent should use conditions on it to separate responses. The schema version and reprompt settings do not address stale clicks, and Web Chat does not support Action.Execute.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-ask-with-adaptive-card",
  "preview": false
 },
 {
  "id": "q-1.3h-06",
  "skill": "1.3h",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Employees sometimes close an Ask with Adaptive Card form without selecting Submit, and the next Message node then shows blank values. What is the recommended way to handle this?",
  "options": [
   "Mark every input as Required so that closing the card is blocked in Teams",
   "Add a Condition node after it to check that the output variables have values",
   "Edit the schema in the card so that the output variables get default values",
   "Add a second Action.Submit button labelled Close that sends empty values"
  ],
  "answer": [
   1
  ],
  "explanation": "If the user closes the card without Submit, the output variables stay empty, so you add a Condition node right after the Ask with Adaptive Card node and route empty cases to a handling branch. Marking fields Required only prevents submitting without them; it does not stop the user from closing the card, and nothing generates values for an unsubmitted card.",
  "source": "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/4-collect-input-adaptive-cards",
  "preview": false
 },
 {
  "id": "q-1.3h-07",
  "skill": "1.3h",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "A leave-request card must show a dropdown whose options come from an HTTP request earlier in the topic. How should the Input.ChoiceSet be configured?",
  "options": [
   "Set choices to a Power Fx expression such as =Topic.AvailableLeaveTypes, a table with title and value columns",
   "Set choices to a text variable that holds the options separated by commas",
   "Set choices to a table with name and id columns using any variable syntax",
   "Leave choices empty and let Edit Schema fill the list at runtime from the HTTP response"
  ],
  "answer": [
   0
  ],
  "explanation": "For a dynamic list, replace the hardcoded choices array with a Power Fx expression such as =Topic.AvailableLeaveTypes. That variable must be a table with title and value columns, which is the format Input.ChoiceSet expects. A comma-separated text or a table with other column names does not match, and Edit Schema only fixes output variables.",
  "source": "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/4-collect-input-adaptive-cards",
  "preview": false
 },
 {
  "id": "q-1.3h-08",
  "skill": "1.3h",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "You are designing a card that collects a start date, a time and an approval checkbox. Which two statements about the input elements are correct? Each correct answer presents part of the solution.",
  "options": [
   "Input.Date returns a date string in YYYY-MM-DD format",
   "Input.Time returns a time string in HH:MM format",
   "Input.Toggle returns Yes or No",
   "Input.Number requires both a minimum and a maximum"
  ],
  "answer": [
   0,
   1
  ],
  "explanation": "Input.Date returns YYYY-MM-DD and Input.Time returns HH:MM. Input.Toggle is a checkbox that returns true or false, not Yes or No, and Input.Number accepts optional minimum and maximum values, so setting them is not required.",
  "source": "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/4-collect-input-adaptive-cards",
  "preview": false
 },
 {
  "id": "q-1.3i-01",
  "skill": "1.3i",
  "domain": "D1",
  "type": "single",
  "difficulty": 1,
  "stem": "A value captured in topic A must be available in any other topic during the same conversation. What do you do?",
  "options": [
   "Save it in a system variable",
   "Turn it into an environment variable",
   "Leave it as a topic variable, which is visible in all topics",
   "Set the variable's scope to global"
  ],
  "answer": [
   3
  ],
  "explanation": "Topic variables exist only in the topic where they are created (the default scope); by changing the scope to global, you can use them in all topics. System variables are created by Copilot Studio, and environment variables are created in Power Platform and are read-only in Copilot Studio.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about",
  "preview": false
 },
 {
  "id": "q-1.3i-02",
  "skill": "1.3i",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "You created a variable by assigning it the initial value 1. Later you try to assign it the string apples and get an error. Why?",
  "options": [
   "The variable's type is fixed on the first assignment (Number)",
   "Topic variables support only numbers and booleans",
   "Strings can be assigned only to global variables",
   "You must declare the type beforehand in Variable properties before assigning values"
  ],
  "answer": [
   0
  ],
  "explanation": "A variable takes its base type when a value is first assigned to it (here, Number); after that the type is fixed, and assigning a String causes an error. The available types include String, Boolean, Number, Table, Record, DateTime, Choice, and Blank.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about",
  "preview": false
 },
 {
  "id": "q-1.3i-03",
  "skill": "1.3i",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "An admin changes the value of a Text environment variable in Power Apps. The published agent that uses it still shows the old value. What is needed?",
  "options": [
   "Edit the variable's value in Copilot Studio, where it is editable",
   "Republish the agent so it picks up the new value",
   "Convert it into a global variable and set it again",
   "Add a Clear variable values node to the topic"
  ],
  "answer": [
   1
  ],
  "explanation": "Environment variables are read-only in Copilot Studio, and a published agent holds the values from the time it was published, so you must republish after an admin changes them. The exception is the Secret type, which is retrieved at runtime and needs no republish.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about",
  "preview": false
 },
 {
  "id": "q-1.3i-04",
  "skill": "1.3i",
  "domain": "D1",
  "type": "multi",
  "difficulty": 2,
  "stem": "A Booking topic asks for the customer's name even though the Greeting topic already collected it and then redirects to Booking. Which two changes make Booking skip the question? Each correct answer presents part of the solution.",
  "options": [
   "In Booking, set the name variable to Receive values from other topics",
   "Change Greeting's name variable into a system variable",
   "Turn Booking's name variable into an environment variable",
   "In Greeting's Redirect node, add the Booking variable as an input and pass Greeting's name variable"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "A variable set to Receive values from other topics lets another topic fill it, and the Redirect node supplies the value through Add input, so the question is skipped. System and environment variables cannot be created or filled this way.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables",
  "preview": false
 },
 {
  "id": "q-1.3i-05",
  "skill": "1.3i",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Fabrikam's website passes Global.UserName to the agent, and the variable allows external sources to set values. Earlier in the conversation a Set variable value node set Global.UserName to Sam. Which value does the agent use?",
  "options": [
   "The value passed by the website, because external values always win",
   "An error, because the variable has two sources of values",
   "Both values, joined into one string separated by a comma",
   "Sam, because a value set inside the agent prevails and the passed value is ignored"
  ],
  "answer": [
   3
  ],
  "explanation": "If the agent sets a variable that would otherwise come from an external source during the conversation, the value set inside the agent prevails and the value passed in context is ignored. This stops the external value from overwriting values deliberately set in topics.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-bot",
  "preview": false
 },
 {
  "id": "q-2.1a-01",
  "skill": "2.1a",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso wants its agent to answer with citations from ServiceNow knowledge base articles, respecting source permissions, and to reuse that content in Microsoft 365 Copilot. They accept that the content is indexed in Microsoft Graph. What do you choose?",
  "options": [
   "A public website added as a Public website knowledge source",
   "A Copilot connector (formerly Graph connector) that the administrator configures in the Microsoft 365 admin center",
   "A Power Platform connector as real-time knowledge, which queries ServiceNow on every question with each user's credentials and copies nothing to Microsoft Graph",
   "An agent flow that queries ServiceNow with the HTTP connector on every turn"
  ],
  "answer": [
   1
  ],
  "explanation": "Copilot connectors index external content in Microsoft Graph while respecting the source ACLs, with semantic indexing and citations, and they are reused in Copilot and Microsoft Search; the tenant administrator configures them. Power Platform connectors query live without copying data (preview), which suits up-to-the-minute data and transactions better.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-graph-vs-power-platform-connectors",
  "preview": false
 },
 {
  "id": "q-2.1a-02",
  "skill": "2.1a",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Your agent uses a Copilot connector as a knowledge source, and you publish with Authenticate manually. In testing the connector returns content, but in the published channel there are no results. What is missing?",
  "options": [
   "Only the Files.Read.All scope in the manual authentication",
   "Turn on Allow ungrounded responses in the Generative AI settings so the agent answers without sources",
   "Include the ExternalItem.Read.All scope in the manual authentication configuration",
   "Register the connector as a custom connector in Power Apps"
  ],
  "answer": [
   2
  ],
  "explanation": "Agents that use Copilot connectors as knowledge sources must be configured with the right authentication when publishing to channels: you must provide the ExternalItem.Read.All scope as part of the manual authentication configuration. Files.Read.All and Sites.Read.All apply to SharePoint in generative answers, not to Copilot connectors.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-connectors",
  "preview": false
 },
 {
  "id": "q-2.1a-03",
  "skill": "2.1a",
  "domain": "D2",
  "type": "multi",
  "difficulty": 2,
  "stem": "You are comparing Copilot connectors with Power Platform connectors as knowledge sources. Choose two true statements about Copilot connectors.",
  "options": [
   "They run every query live against the source API without moving data",
   "The administrator configures them in the Microsoft 365 admin center, and then they appear in Add knowledge",
   "They are the ideal option for creating or updating records (transactions)",
   "Makers create them as per-environment connections in Power Platform",
   "They copy and index external content in Microsoft Graph and respect the source ACLs"
  ],
  "answer": [
   1,
   4
  ],
  "explanation": "Copilot connectors follow the index-then-answer model: content indexed in Microsoft Graph, with ACLs and citations, configured by the tenant administrator. Live queries, per-environment connections created by makers, and transactions belong to Power Platform connectors.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-graph-vs-power-platform-connectors",
  "preview": false
 },
 {
  "id": "q-2.1a-04",
  "skill": "2.1a",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's tenant administrator has already configured the Jira Copilot connector. A maker opens Add knowledge in the agent, but Jira is not in the Featured list. What should the maker try first?",
  "options": [
   "Create a custom connector in Power Apps that wraps the Jira API",
   "Add Jira as a real-time Power Platform connector from the Tools page",
   "Select Advanced in the Add knowledge dialog",
   "Turn on generative orchestration so the connector index is listed"
  ],
  "answer": [
   2
  ],
  "explanation": "If a Copilot connector is not in the Featured list, the maker selects Advanced to see more choices; if it still does not appear, the maker contacts the tenant admin who configures the connector. A custom connector or a Power Platform connector would be a different mechanism (live API calls), not the indexed Copilot connector the admin already created. Orchestration mode does not control which knowledge sources are listed.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-connectors",
  "preview": false
 },
 {
  "id": "q-2.1a-05",
  "skill": "2.1a",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "Contoso grounds an agent on Confluence content that the administrator indexed through a Copilot connector, but the answers are poor. Which two actions does Microsoft recommend for better search results? Each correct answer presents part of the solution.",
  "options": [
   "Turn on tenant graph grounding with semantic search",
   "Replace the connector with a custom connector built from an OpenAPI file",
   "Disable the agent's Use general knowledge setting",
   "Have a Microsoft 365 Copilot license in the same tenant as the agent"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "For better results with Copilot connectors, Microsoft recommends a Microsoft 365 Copilot license in the same tenant as the agent and turning on tenant graph grounding with semantic search. A custom connector would call the API live instead of using the Graph index, and the general knowledge setting only controls whether the model's own knowledge is used when sources do not answer.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-connectors",
  "preview": false
 },
 {
  "id": "q-2.1a-06",
  "skill": "2.1a",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's team stores engineering issues in GitHub. A maker opens Add knowledge in the agent, but the GitHub connector is not in the Featured list, and it still does not appear after selecting Advanced. What does Microsoft Learn say to do next?",
  "options": [
   "Replace it with the GitHub Power Platform connector, which always appears in Featured",
   "Contact the tenant administrator, who must first configure the Copilot connector",
   "Turn on tenant graph grounding with semantic search in the agent settings",
   "Add the ExternalItem.Read.All scope to the agent's manual authentication settings"
  ],
  "answer": [
   1
  ],
  "explanation": "Copilot connectors show up in an agent's knowledge list only after the tenant administrator has configured them, so if Advanced does not reveal the connector, the maker should contact the admin. Tenant graph grounding improves answer quality but does not make a connector appear. The ExternalItem.Read.All scope matters when you publish to channels, not for listing the connector.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-connectors",
  "preview": false
 },
 {
  "id": "q-2.1a-07",
  "skill": "2.1a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso keeps its product catalog in a PostgreSQL database hosted on-premises, outside Microsoft 365, and wants Copilot to ground answers on it. Which approach does Microsoft Learn describe?",
  "options": [
   "Connect Microsoft Copilot directly to the PostgreSQL server by using its connection string",
   "Add the PostgreSQL Copilot connector without a connector agent, since indexing is in the cloud",
   "Use a Copilot connector with a connector agent so the data is first indexed into Microsoft Search",
   "Use Power Platform real-time knowledge, which queries the database live without any indexing"
  ],
  "answer": [
   2
  ],
  "explanation": "For a PostgreSQL database hosted outside Microsoft 365, Copilot cannot connect directly: the data must first be indexed into Microsoft Search through a Copilot connector that uses a connector agent. Skipping the connector agent fails because the database is not reachable from the cloud, and PostgreSQL is not in the list of connectors supported for real-time knowledge.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-graph-vs-power-platform-connectors",
  "preview": false
 },
 {
  "id": "q-2.1b-01",
  "skill": "2.1b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Your agent must answer what the current priority of incident INC-123 in ServiceNow is, and policy forbids copying ticket data to Microsoft 365. The maker can create a connection with the user's credentials. Which knowledge option do you use?",
  "options": [
   "A Copilot connector indexed in Microsoft Graph",
   "Upload weekly CSV exports as documents",
   "A Public website knowledge source with the ServiceNow portal",
   "A Power Platform connector as real-time knowledge"
  ],
  "answer": [
   3
  ],
  "explanation": "Real-time knowledge with Power Platform connectors (preview) runs each request against the source system with the user's identity, without replicating the data. A Copilot connector would copy and index the content in Microsoft Graph, and weekly CSVs or a public site neither give up-to-the-minute data nor respect permissions.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-real-time-connectors",
  "preview": true
 },
 {
  "id": "q-2.1b-02",
  "skill": "2.1b",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "What happens when you add a Power Platform connector (for example, Azure SQL) as a real-time knowledge source?",
  "options": [
   "Only metadata is indexed; queries run live with the user's token",
   "All queries use the maker's identity, so every user sees what the maker can see",
   "All the content is indexed in Microsoft Graph and keeps the source ACLs",
   "The rows of the selected tables are copied to Dataverse and indexed every night"
  ],
  "answer": [
   0
  ],
  "explanation": "With real-time knowledge, Microsoft indexes only metadata such as table and column names; there is no data movement, and each request is processed at runtime against the target system, authenticated with the user's token, so access controls are preserved. The connection and the data policies are the same as in Power Platform.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-real-time-connectors",
  "preview": true
 },
 {
  "id": "q-2.1b-03",
  "skill": "2.1b",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso wants a support agent that (1) answers about evergreen policies with semantic search and citations, (2) checks the current status of tickets without copying the data, and (3) creates new cases. Which combination does Microsoft recommend for this mixed scenario?",
  "options": [
   "Only Copilot connectors, configured in the Microsoft 365 admin center, for all three requirements",
   "Copilot connectors for policies and Power Platform connectors for status and cases",
   "Only Power Platform connectors, querying the policies live on every question",
   "A different MCP server for each of the three requirements"
  ],
  "answer": [
   1
  ],
  "explanation": "The recommended mixed mode indexes the evergreen content (policies, FAQs) with Copilot connectors to get semantic indexing and citations, and uses Power Platform connectors for data that must not be replicated, up-to-the-minute information, and transactions such as creating or updating cases. A single type does not cover all three requirements.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-graph-vs-power-platform-connectors",
  "preview": true
 },
 {
  "id": "q-2.1b-04",
  "skill": "2.1b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Northwind's administrator wants to stop makers in the development environment from adding ServiceNow as a real-time knowledge source, without touching how agents use other knowledge. Which mechanism governs this?",
  "options": [
   "Power Platform data policies, which govern the same connections",
   "Connection settings of the Copilot connector in the Microsoft 365 admin center",
   "The content moderation level of each generative answers node",
   "A sensitivity label that Microsoft Purview applies to the agent"
  ],
  "answer": [
   0
  ],
  "explanation": "Real-time knowledge is established through Power Platform connections, so customers govern it with the same Power Platform data policies (DLP) that govern the connectors. The Microsoft 365 admin center manages Copilot connectors, which are a different mechanism, and content moderation only affects how generated answers are filtered.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-real-time-connectors",
  "preview": true
 },
 {
  "id": "q-2.1b-05",
  "skill": "2.1b",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "Adatum adds a Power Platform connector as real-time knowledge and wants to enter synonyms and glossary definitions for the tables so that the agent understands internal jargon. Which two connectors support this today? (Choose two.)",
  "options": [
   "Azure SQL",
   "Zendesk",
   "Salesforce",
   "ServiceNow"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "When adding a real-time connector as knowledge, the synonyms and glossary step is currently supported only for the ServiceNow and Zendesk connectors. Salesforce and Azure SQL are supported as real-time knowledge sources, but they do not offer the synonyms and glossary step.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-real-time-connectors",
  "preview": true
 },
 {
  "id": "q-2.1b-06",
  "skill": "2.1b",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Northwind wants an agent to answer from its Confluence wiki by using a Power Platform connector as real-time knowledge (preview), without copying data. The wiki runs on Confluence Data Center in Northwind's own datacenter. What is the outcome?",
  "options": [
   "It does not work: the Confluence connector supports only Confluence Cloud",
   "It does not work, because Confluence is not supported for real-time knowledge at all",
   "It works for both Cloud and Data Center, as long as the right tables are selected",
   "It works only after an administrator indexes the wiki with a Copilot connector"
  ],
  "answer": [
   0
  ],
  "explanation": "Confluence is on the list of supported real-time knowledge connectors, but the list marks it Cloud only, so a self-hosted Data Center instance cannot be used this way. Saying Confluence is unsupported entirely is wrong because it is listed, and real-time knowledge never requires indexing the content with a Copilot connector: only metadata is indexed.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-real-time-connectors",
  "preview": true
 },
 {
  "id": "q-2.1b-07",
  "skill": "2.1b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "A maker adds ServiceNow as a Power Platform connector for real-time knowledge, signs in, selects the tables, and chooses Add to agent. The knowledge source then shows the status In progress. What is happening, and when can the maker test it?",
  "options": [
   "Copilot Studio is copying the table rows into Microsoft Graph; testing starts when the copy ends",
   "Copilot Studio is waiting for the tenant administrator to approve the connector; testing starts after approval",
   "The sign-in did not complete; the maker must select Sign in again before the status can change",
   "Copilot Studio is indexing table and column metadata; testing starts when the status is Ready"
  ],
  "answer": [
   3
  ],
  "explanation": "For real-time knowledge, Copilot Studio indexes only metadata such as table and column names, and the status shows In progress until that finishes. When it changes to Ready, the maker can test. The data itself is not copied anywhere, and no administrator approval or second sign-in is part of this step.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-real-time-connectors",
  "preview": true
 },
 {
  "id": "q-2.1c-01",
  "skill": "2.1c",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "You created the Azure AI Search index with Import and vectorize data and an embedding model. Why does Copilot Studio not need any custom code to vectorize the user's question at runtime?",
  "options": [
   "The semantic ranker converts the question into a vector before searching",
   "Access Key authentication automatically vectorizes any query sent to the index",
   "Integrated vectorization uses the same embedding model on the query at runtime",
   "Copilot Studio rebuilds the vector index on every question with its own embedding model"
  ],
  "answer": [
   2
  ],
  "explanation": "Copilot Studio supports vectorized indexes with integrated vectorization: the same embedding model that vectorized the data vectorizes the incoming prompt at runtime, so you do not have to write special functions. The semantic ranker is a different re-ranking feature, and the authentication type plays no part in vectorization.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
  "preview": false
 },
 {
  "id": "q-2.1c-02",
  "skill": "2.1c",
  "domain": "D2",
  "type": "multi",
  "difficulty": 2,
  "stem": "You are going to create the Azure AI Search connection for your agent and want to avoid shared keys. Choose two authentication types that the connection supports.",
  "options": [
   "Azure Storage SAS token",
   "Microsoft Entra ID Integrated",
   "Service principal (Microsoft Entra ID application)",
   "Basic (username and password)",
   "Windows integrated authentication"
  ],
  "answer": [
   1,
   2
  ],
  "explanation": "The connection supports Access Key, Client Certificate Auth, Service principal (Microsoft Entra ID application), and Microsoft Entra ID Integrated. The two Entra-based options avoid sharing keys, and the documentation recommends Entra ID instead of keys when you need to recreate a connection. Basic, SAS, and Windows integrated are not among the options.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
  "preview": false
 },
 {
  "id": "q-2.1c-03",
  "skill": "2.1c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "The answers based on your Azure AI Search index work, but they do not include citations with a link to the document. What must you ensure in the index?",
  "options": [
   "A field that contains the full URL of the document",
   "A vector field named citation that stores the embeddings of the document title",
   "Turn on the semantic ranker in the index so that it generates the citation links automatically",
   "A second vector index dedicated only to citation links"
  ],
  "answer": [
   0
  ],
  "explanation": "To return citations, the index must include a field with the document's real URL; if metadata_storage_path exists, Copilot Studio treats it as the citation, and if not, it uses the field that contains a full link. In addition, users must have access to the sources that the citations point to.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
  "preview": false
 },
 {
  "id": "q-2.1c-04",
  "skill": "2.1c",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "Security requires that the Azure AI Search service have no public access and be reachable only over a private network. Choose two requirements for it to work with Copilot Studio.",
  "options": [
   "Register the service as a custom connector with a mandatory on-premises data gateway",
   "Use only Access Key authentication with the public endpoint",
   "Turn off vector indexes, because they do not work with a private network",
   "Configure Virtual Network support for the Power Platform environment",
   "Configure a private endpoint on the Azure AI Search service"
  ],
  "answer": [
   3,
   4
  ],
  "explanation": "Copilot Studio supports Azure AI Search indexes configured for virtual networks through a private endpoint, as long as the Power Platform environment has Virtual Network support configured. You must add the knowledge through a formal data connection, and you need neither a gateway nor to give up vector indexes.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
  "preview": false
 },
 {
  "id": "q-2.1c-05",
  "skill": "2.1c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Tailwind has two vector indexes in the same Azure AI Search service. In the Add knowledge flow, a maker creates the connection and reaches the step that asks for the index. What can be entered at that step?",
  "options": [
   "Up to five indexes of the service, separated by commas",
   "Every index in the service, which are added automatically",
   "One index per Azure region of the search service",
   "A single Azure AI Search vector index"
  ],
  "answer": [
   3
  ],
  "explanation": "After the connection is created, the dialog asks for the vector index to use, and only one vector index can be added in that step. Copilot Studio does not add all indexes of the service automatically, nor does it accept a list of indexes.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
  "preview": false
 },
 {
  "id": "q-2.1c-06",
  "skill": "2.1c",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "A maker typed the Azure AI Search endpoint and key directly into the knowledge form. Now none of the agents in the environment can add Azure AI Search as knowledge, and there is no option in the product to delete the connection. What happened, and how do you recover?",
  "options": [
   "The semantic ranker is off in Azure; enable it and wait until the status changes to Ready",
   "A faulty connection was created; reset the agent's external access or recreate the agent",
   "The index has more than one vector index; remove the extra indexes and run the indexer again",
   "Virtual Network support is missing; configure it in the Power Platform admin center"
  ],
  "answer": [
   1
  ],
  "explanation": "Entering the endpoint and key by hand creates a faulty data connection at environment level that can block every agent in the environment from adding Azure AI Search. It cannot be deleted in the product, so recovery is to reset the agent's external access or delete and recreate the affected agent. Always use Create new connection to avoid it.",
  "source": "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/5-connect-azure-ai-search",
  "preview": false
 },
 {
  "id": "q-2.1c-07",
  "skill": "2.1c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Woodgrove Bank connects its compliance index in Azure AI Search to a production agent. Security wants the connection to use the signed-in user's identity and avoid keys that need rotating. Which authentication type is the recommended choice?",
  "options": [
   "Access Key",
   "Client Certificate Auth",
   "Microsoft Entra ID Integrated",
   "Entering the endpoint and key manually in the knowledge form"
  ],
  "answer": [
   2
  ],
  "explanation": "Microsoft Entra ID Integrated is the recommended type: it uses the signed-in user's identity, so there is no key to rotate. Access Key suits quick setups in non-production environments and needs ongoing rotation. Typing the endpoint and key into the form is not an authentication type and creates a faulty environment-level connection.",
  "source": "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/5-connect-azure-ai-search",
  "preview": false
 },
 {
  "id": "q-2.2a-01",
  "skill": "2.2a",
  "domain": "D2",
  "type": "single",
  "difficulty": 1,
  "stem": "A maker tries to use the Computer use tool in an agent with classic orchestration. Which requirement is missing?",
  "options": [
   "Change the agent's authentication to No authentication so that credentials are not requested",
   "Select an Anthropic model instead of the OpenAI one in the tool settings",
   "Turn on the Hosted browser in the environment and register a machine with Power Automate for desktop",
   "Turn on generative orchestration, so the orchestrator can choose the tool"
  ],
  "answer": [
   3
  ],
  "explanation": "Computer use is a tool that operates websites and desktop applications with vision and reasoning, and it requires generative orchestration. In classic orchestration, tools can be called only from topics. The Hosted browser is a place to run and does not replace that requirement.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use",
  "preview": false
 },
 {
  "id": "q-2.2a-02",
  "skill": "2.2a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Your agent with Computer use must operate custom desktop applications on company-managed machines that are joined to Microsoft Entra ID and managed with Intune, with autoscaling. Where do you configure it to run?",
  "options": [
   "In the end user's browser, without registering any machine",
   "On your own machine (bring your own machine), which offers managed autoscaling",
   "On a Cloud PC pool (Windows 365 for Agents)",
   "On the Hosted browser, which supports custom desktop applications"
  ],
  "answer": [
   2
  ],
  "explanation": "The Cloud PC pool (preview, Windows 365 for Agents) uses machines joined to Entra and managed with Intune, with autoscaling. The Hosted browser (preview) is not joined to Entra, does not support custom desktop applications, and is for experimenting; your own machine requires Power Automate for desktop, registering the machine, and turning on Enable for computer use, with no managed autoscaling.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-where-computer-use-runs",
  "preview": true
 },
 {
  "id": "q-2.2a-03",
  "skill": "2.2a",
  "domain": "D2",
  "type": "single",
  "difficulty": 1,
  "stem": "An autonomous agent uses Computer use with a standard model and completes a 40-step task. How many Copilot Credits does that action alone consume?",
  "options": [
   "40 (1 Copilot Credit per step)",
   "200 (5 Copilot Credits per step)",
   "5 (a single agent action for the whole task)",
   "600 (15 Copilot Credits per step, premium rate)"
  ],
  "answer": [
   1
  ],
  "explanation": "Computer use is billed at the agent action rate: 5 Copilot Credits per step with standard models (15 per step with premium models), so 40 steps consume 200. This usage is also not included in the Microsoft 365 Copilot USL license.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use",
  "preview": false
 },
 {
  "id": "q-2.2a-04",
  "skill": "2.2a",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "Your Computer use agent operates websites with stored credentials. You want to reduce the risk of unwanted actions. Choose two controls.",
  "options": [
   "Switch to a premium model so that it does not make mistakes",
   "Turn off generative orchestration to limit the agent",
   "Configure human supervision so that a reviewer receives an Outlook email when potentially harmful instructions are detected",
   "Use maker-provided credentials shared by all users as the default, so nobody has to sign in to the site",
   "Define an access control allow-list of permitted domains or applications and turn on Enforce HTTPS"
  ],
  "answer": [
   2,
   4
  ],
  "explanation": "Human supervision sends an Outlook email to a reviewer when potentially harmful instructions are detected, and the allow-list blocks actions outside what is permitted (it does not block opening the site), along with Enforce HTTPS. Maker credentials are the default but risky if shared, a premium model is not a security control, and Computer use requires generative orchestration.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/human-supervision-computer-use",
  "preview": false
 },
 {
  "id": "q-2.2a-05",
  "skill": "2.2a",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "Fabrikam wants computer use to run on its own Windows machine. The machine is not Entra-joined and is not a Cloud PC. Which two things are required for it to be used for computer use? (Choose two.)",
  "options": [
   "Join the machine to Microsoft Entra ID and enroll it in Intune",
   "Install Power Automate for desktop 2.61.132.25266 or later, with the web extension for browser interactions",
   "Create a Cloud PC pool in Windows 365 for Agents",
   "After registering the machine, turn on Enable for computer use in its settings in Power Automate"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "The bring-your-own-machine option needs Power Automate for desktop version 2.61.132.25266 or later (with the web extension for browser tasks), and after the machine is registered you must turn on Enable for computer use in its settings. Entra join, Intune and Cloud PC pools belong to the Cloud PC pool option, not to a machine you own and register.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-where-computer-use-runs",
  "preview": false
 },
 {
  "id": "q-2.2a-06",
  "skill": "2.2a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Adatum must enter payroll totals into a legacy Windows desktop application that has no API. Its screens never change and the rules are simple and fixed. Which approach should the team evaluate first?",
  "options": [
   "A Computer use tool on a Cloud PC pool, so the agent can reason about each screen",
   "A Power Automate desktop flow (RPA)",
   "An MCP server that wraps the application's screens",
   "A custom connector built from the application's OpenAPI file"
  ],
  "answer": [
   1
  ],
  "explanation": "When the user interface is stable and the logic is simple and rule-based, RPA with Power Automate desktop flows is the better choice. Computer use pays off when screens vary, when decisions depend on what is displayed, or when the automation must self-correct from visual feedback. MCP servers and custom connectors both need an API, which this application does not have.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/3-compare-action-integration-patterns",
  "preview": false
 },
 {
  "id": "q-2.2b-01",
  "skill": "2.2b",
  "domain": "D2",
  "type": "single",
  "difficulty": 1,
  "stem": "Your existing MCP server uses the SSE transport and the connection from Copilot Studio fails. What must you do?",
  "options": [
   "Turn on WebSocket support in the server's custom connector settings",
   "Register the server as an A2A agent with its endpoint URL, instead of using the MCP wizard",
   "Migrate the server to Streamable HTTP, the only supported transport",
   "Add the x-ms-agentic-protocol: sse header to the POST /mcp operation"
  ],
  "answer": [
   2
  ],
  "explanation": "Copilot Studio supports only the Streamable HTTP transport for MCP servers; SSE stopped being supported after August 2025. A2A is a different protocol for agents, and WebSocket or an sse value in x-ms-agentic-protocol do not exist as valid options (the correct value is mcp-streamable-1.0).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent",
  "preview": false
 },
 {
  "id": "q-2.2b-02",
  "skill": "2.2b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "You connected an MCP server and the connection works, but the agent never invokes its tools even though the user's request fits perfectly. What do you improve first?",
  "options": [
   "The MCP server's Server description, read by the orchestrator",
   "The Server URL, by adding the /sse suffix so that the orchestrator detects the server",
   "Turn off generative orchestration so the agent is forced to choose it",
   "The authentication type, by changing it to OAuth 2.0 Manual"
  ],
  "answer": [
   0
  ],
  "explanation": "In the MCP wizard, the name, description, and URL are required, and the description is what the orchestrator uses to decide when to call the server. MCP tools are chosen with generative orchestration, so turning it off would leave them unused; the /sse suffix is not valid because only Streamable HTTP is supported.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent",
  "preview": false
 },
 {
  "id": "q-2.2b-03",
  "skill": "2.2b",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Your MCP server uses OAuth 2.0. Your identity provider supports Dynamic Client Registration (DCR) and publishes discovery metadata. Which OAuth type do you choose in the MCP wizard?",
  "options": [
   "Manual (client ID, client secret, auth URL, token URL, refresh URL, and scopes)",
   "API key in header",
   "Dynamic (DCR without discovery, specifying the authorization and token URLs)",
   "Dynamic discovery"
  ],
  "answer": [
   3
  ],
  "explanation": "Dynamic discovery takes advantage of DCR and discovery, so you do not enter URLs or credentials by hand. Dynamic uses DCR without discovery (you specify the authorization URL and the token URL template), and Manual requires the client ID, secret, URLs, and scopes, and you must also copy the callback URL into the provider's app registration.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent",
  "preview": false
 },
 {
  "id": "q-2.2b-04",
  "skill": "2.2b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "The administrator created a data policy that blocks several Power Platform connectors. Afterward, makers can no longer use an MCP server that used to work, even though no connector named MCP is blocked. Why?",
  "options": [
   "MCP servers work only in environments with no data policy",
   "MCP access uses Power Platform connectors, so connector data policies govern it as well",
   "Data policies automatically block the whole MCP protocol by default when any policy exists in the environment",
   "MCP uses A2A internally and A2A is always blocked"
  ],
  "answer": [
   1
  ],
  "explanation": "Connectivity to MCP servers relies on Power Platform connectors, so a data policy that governs those connectors also governs access to the MCP server and its tools. There is no automatic MCP block and no dependency on A2A.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-components-to-agent",
  "preview": false
 },
 {
  "id": "q-2.2b-05",
  "skill": "2.2b",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "You prefer to expose your MCP server through a custom connector in Power Apps instead of the onboarding wizard. Which two requirements apply to the definition? (Choose two.)",
  "options": [
   "Use an OpenAPI (Swagger 2.0) file",
   "Use OpenAPI 3.1 in YAML",
   "Mark the operation with x-ms-agentic-protocol: a2a",
   "Define a GET /sse operation with text/event-stream",
   "Mark the POST /mcp operation with x-ms-agentic-protocol: mcp-streamable-1.0"
  ],
  "answer": [
   0,
   4
  ],
  "explanation": "The second way to connect an MCP server is a custom connector created in Power Apps from an OpenAPI (Swagger 2.0) file, with the x-ms-agentic-protocol: mcp-streamable-1.0 extension on the POST /mcp operation. SSE is not supported, and a2a is not a valid value for this extension.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent",
  "preview": false
 },
 {
  "id": "q-2.2b-06",
  "skill": "2.2b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Your MCP server exposes ten tools, but the agent must use only three of them. In addition, when the server owner adds new tools, they must not become available automatically. What should you do?",
  "options": [
   "Create three MCP servers, one per tool, each with its own connection",
   "Turn off the Allow all toggle and enable only the three required tools",
   "Leave Allow all turned on and exclude the other tools by using agent instructions",
   "Delete the server and register it as a custom connector with three operations"
  ],
  "answer": [
   1
  ],
  "explanation": "When you add an MCP server, all of its tools are enabled (Allow all). If you turn off Allow all, you can enable or disable individual tools, and any new tool that the server adds is disabled by default. Filtering through instructions does not stop the orchestrator from using the tools.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-components-to-agent",
  "preview": false
 },
 {
  "id": "q-2.2b-07",
  "skill": "2.2b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "An MCP server's tool is described on the server as \"performs a verification\", and the orchestrator often skips it or uses it at the wrong time. The maker wants to improve the tool's description. What should they do?",
  "options": [
   "Edit the tool description on the tool's details page in Copilot Studio",
   "Turn the Allow all toggle off and on again to refresh the descriptions",
   "Ask the MCP server owner to change the description on the server",
   "Add the server again with the Dynamic OAuth type"
  ],
  "answer": [
   2
  ],
  "explanation": "MCP tool descriptions are set by the server owner and are read-only in Copilot Studio. The only way to fix a vague description is to have the owner update it on the server, and connected agents then see the change without republishing. Allow all controls which tools are enabled, and the OAuth type affects sign-in, not descriptions.",
  "source": "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/5-enable-manage-mcp-tools",
  "preview": false
 },
 {
  "id": "q-2.2b-08",
  "skill": "2.2b",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso's MCP server requires an API key sent in an x-api-key header. A maker wants to paste one shared key into the agent so that all employees can use the tools without being asked for anything. What happens with API key authentication in Copilot Studio?",
  "options": [
   "The maker enters the key value once, and it is sent to the server for every user",
   "The key is stored in an environment variable that every user's session reads",
   "The key goes in the Server description so the orchestrator can pass it along",
   "The maker sets only Type and Parameter name; each user supplies their own key"
  ],
  "answer": [
   3
  ],
  "explanation": "With API key authentication the maker configures only where the key is sent (Type: Header or Query) and the Parameter name, such as x-api-key. The key value itself is never set by the maker; each user is prompted for their own key the first time they use the tool, so credentials stay user-scoped.",
  "source": "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/4-configure-mcp-authentication",
  "preview": false
 },
 {
  "id": "q-2.2b-09",
  "skill": "2.2b",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "An agent is connected to an MCP server that exposes tools and resources. Which two statements are correct? Each correct answer presents part of the solution.",
  "options": [
   "Topics cannot call MCP tools; only the orchestrator can",
   "Each agent must be republished before it sees a tool update made by the server owner",
   "Resources are not independently callable; they reach the agent only as output of an MCP tool the server owner set up",
   "The orchestrator can invoke a resource directly, as it does a tool"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "Only the generative orchestrator can invoke MCP tools, and topics cannot call them. Resources are data items that the agent can use only when the server owner configured them as the output of an MCP tool. When the server owner updates tool definitions, all connected agents pick up the changes without being republished.",
  "source": "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/5-enable-manage-mcp-tools",
  "preview": false
 },
 {
  "id": "q-2.2c-01",
  "skill": "2.2c",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "A colleague created the Inventario API custom connector in Power Apps. When you try to add it as a tool for your agent, it does not appear. Which connector requirement might be missing?",
  "options": [
   "It was also published as an MCP server by using the onboarding wizard",
   "It was created in Azure Logic Apps, because only those connectors appear in the tools list",
   "View and share permissions on the connector for the organization",
   "It is certified by Microsoft so that it can be shared with any agent in the organization"
  ],
  "answer": [
   2
  ],
  "explanation": "For an agent to use a custom connector, the connector needs view and share permissions for the organization. Connectors created in Logic Apps are not available in Copilot Studio, certification is only needed to share a connector with all users of the platform, and an MCP server is a different path.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent",
  "preview": false
 },
 {
  "id": "q-2.2c-02",
  "skill": "2.2c",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "The API team built a custom connector in Azure Logic Apps. You want to use its operations as tools for your agent. What should you do?",
  "options": [
   "Re-create the connector in Power Apps or Power Automate from its OpenAPI definition",
   "Nothing: connectors created in Logic Apps appear in the tools list automatically",
   "Export it as a managed solution and import it into the Copilot Studio environment",
   "Convert it into an agent flow by using the Logic Apps portal and publish it"
  ],
  "answer": [
   0
  ],
  "explanation": "Custom connectors created in Power Automate are available in Power Apps and Copilot Studio (and the other way around), but connectors created in Logic Apps are not. The solution is to reuse the OpenAPI definition or the Postman collection to re-create the connector in Power Apps or Power Automate. Custom connectors are described with OpenAPI, Postman, or from scratch, and are secured with OAuth 2.0, Basic, or API key.",
  "source": "https://learn.microsoft.com/en-us/connectors/custom-connectors/",
  "preview": false
 },
 {
  "id": "q-2.2c-03",
  "skill": "2.2c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "You exported a solution that contains your agent, a custom connector, and their connection references. When you import it into Test, the import fails or the flows do not turn on. Which import order avoids the problem?",
  "options": [
   "Import everything together in a single unmanaged solution so that dependencies resolve on their own",
   "Import the agent solution with its connection references first, and the custom connector afterward",
   "Import only the agent: connectors are re-created when you publish",
   "Import the custom connector first, in a separate solution, then the agent solution"
  ],
  "answer": [
   3
  ],
  "explanation": "If your agent uses custom connectors, you must import them first, in a separate solution, and then import the solution that contains the connection references and the agent. Custom connectors are not re-created automatically when you publish, and mixing everything in one solution causes the errors described.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-2.2c-04",
  "skill": "2.2c",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "A tenant administrator at Northwind must allow custom connectors that call https://api.northwind.com and block custom connectors that call any other host, in a tenant-level data policy. Which two actions achieve this? Each correct answer presents part of the solution.",
  "options": [
   "Classify each custom connector by name on the Connectors page of the tenant-level policy",
   "Add a URL pattern for https://api.northwind.com* on the Custom connectors page and classify it as Business",
   "Set the final * pattern on the Custom connectors page to Blocked",
   "Block the Microsoft Copilot Studio connector in the policy"
  ],
  "answer": [
   1,
   2
  ],
  "explanation": "At tenant level, custom connectors are classified by their host URL with an ordered list of patterns on the Custom connectors page; the * entry is always last and can be set to Blocked, so an allowed pattern above it plus a Blocked * achieves the goal. Classifying by name does not work at tenant level because a connector's name has no meaning outside its environment, and blocking the Copilot Studio connector would break agents in general.",
  "source": "https://learn.microsoft.com/en-us/power-platform/admin/dlp-custom-connector-parity",
  "preview": false
 },
 {
  "id": "q-2.2c-05",
  "skill": "2.2c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso's agent needs a custom connector to an internal REST API that is visible only on the corporate network, not on the public internet. What does Microsoft offer for this on-premises connectivity?",
  "options": [
   "Dev Tunnels with the port made public",
   "An on-premises data gateway",
   "A Cloud PC pool in Windows 365 for Agents",
   "Environment-level telemetry in Application Insights"
  ],
  "answer": [
   1
  ],
  "explanation": "A custom connector wraps a REST API that can be public or private; for private APIs, Microsoft offers on-premises data connectivity through an on-premises data gateway. Dev Tunnels are meant for exposing a local agent during development, and Cloud PC pools and telemetry have nothing to do with connector connectivity.",
  "source": "https://learn.microsoft.com/en-us/connectors/custom-connectors/",
  "preview": false
 },
 {
  "id": "q-2.2c-06",
  "skill": "2.2c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's Dev environment allows a custom connector, so the maker builds an agent around it. When the maker adds the same connector in the Prod environment, an error appears immediately. What explains this, and what should the maker have done?",
  "options": [
   "Enforcement is real time and per environment; the policy should have been checked at design time",
   "The security scan blocks the connector only when the agent is published, so it should be re-run in Dev",
   "Custom connectors are blocked automatically in every Prod environment by the default policy",
   "The connector must first be moved to the Business group of the Dev data policy and re-shared"
  ],
  "answer": [
   0
  ],
  "explanation": "DLP enforcement in Copilot Studio happens in real time, so adding a blocked connector shows an error at once, and a connector allowed in one environment can be blocked in another. Confirm the target environment's policy at design time to avoid rework. The security scan only warns about weakened settings, and nothing blocks custom connectors in Prod by default.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/4-authenticate-govern-integrations",
  "preview": false
 },
 {
  "id": "q-2.2d-01",
  "skill": "2.2d",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "You have the OpenAPI 3.0 specification in JSON for your tickets API, and you want to add it as a REST API tool. Is this possible?",
  "options": [
   "Yes: the tool accepts JSON, and a v3 specification is translated to v2",
   "No: it only accepts Swagger 2.0 in YAML and rejects OpenAPI 3.x",
   "No: the REST API tool requires a Postman collection exported as JSON",
   "Yes, but only if the specification is written as OpenAPI 3.1 in YAML"
  ],
  "answer": [
   0
  ],
  "explanation": "The REST API tool (preview) asks for an OpenAPI specification in JSON, version 2. A v3 specification is automatically translated to v2. After that, you choose the solution, improve the description, and select which operations to expose.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api",
  "preview": true
 },
 {
  "id": "q-2.2d-02",
  "skill": "2.2d",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "When you create the REST API tool for your API, you want to expose creating and retrieving tickets but not deleting them, and you want to help the orchestrator choose correctly. Which two actions should you take? (Choose two.)",
  "options": [
   "Leave the descriptions empty so that the model infers everything from the operationId",
   "Upload a SOAP WSDL instead of OpenAPI",
   "Select only the operations you want (create and retrieve) and leave out the delete operation",
   "Fill in the tool name and description and the descriptions of the inputs and outputs",
   "Upload the specification with all three operations and block delete through the agent instructions"
  ],
  "answer": [
   2,
   3
  ],
  "explanation": "When you create the tool, you can choose which operations to expose (for example, create but not delete) and fill in the name and description of the tool and of its inputs and outputs, which the orchestrator uses to decide. Blocking delete only through instructions does not guarantee that it is never called, and the tool uses OpenAPI, not WSDL.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api",
  "preview": true
 },
 {
  "id": "q-2.2d-03",
  "skill": "2.2d",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "You must choose between a custom connector, a REST API tool, and a Send HTTP request node to integrate an internal API. Requirements: reuse the integration in agents, Power Automate flows, and Power Apps, with managed connections and connection references. What do you choose?",
  "options": [
   "MCP server",
   "Custom connector",
   "REST API tool",
   "Send HTTP request node"
  ],
  "answer": [
   1
  ],
  "explanation": "A custom connector is created in Power Apps or Power Automate and is reused in flows, apps, and Copilot Studio, with managed connections and connection references. The REST API tool is defined inside the agent (preview), and Send HTTP request is a topic node. Neither is shared as a connector across Power Automate and Power Apps.",
  "source": "https://learn.microsoft.com/en-us/connectors/custom-connectors/",
  "preview": false
 },
 {
  "id": "q-2.2d-04",
  "skill": "2.2d",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "You create a REST API tool that uses API key authentication. You set the parameter label, parameter name and location (Header). When does the key get provided and by whom?",
  "options": [
   "At design time: the maker types one key that all users of the agent share",
   "At publish time: Power Platform reads the key from an Azure Key Vault secret",
   "Never: the orchestrator generates a temporary key for each call",
   "At runtime: the agent prompts the user, who provides their own key"
  ],
  "answer": [
   3
  ],
  "explanation": "With API key authentication, you only define the parameter label, name and location (Header or Query). At runtime, when the agent wants to use the tool, it prompts the user to authenticate and the user supplies the key, which the agent sends to the API. The key is not shared from the maker's configuration and is not generated by the orchestrator.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api",
  "preview": true
 },
 {
  "id": "q-2.2d-05",
  "skill": "2.2d",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "A maker creates a REST API tool and leaves the Solution field blank on the API details page. What happens?",
  "options": [
   "The system creates a solution named after the action, with the default publisher",
   "The creation is blocked until a solution and a publisher are selected",
   "The tool is stored only inside the agent and cannot be moved",
   "The tool is added to the Default solution, which cannot be changed later"
  ],
  "answer": [
   0
  ],
  "explanation": "If you leave Solution blank, the system creates a solution for you with the action name and the default publisher; a preferred solution or an existing connector's solution is selected automatically. Storing the tool in a solution lets you move it across environments, so the creation is not blocked and the tool is not locked inside the agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api",
  "preview": true
 },
 {
  "id": "q-2.2d-06",
  "skill": "2.2d",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "A maker uploads an OpenAPI specification for a REST API tool and reaches the Review your tool's parameters page for one operation. Which two statements about this page are correct? (Choose two.)",
  "options": [
   "The input and output values come from the uploaded specification and cannot be changed on this page",
   "The maker can rename the inputs and change their data types to simplify the schema",
   "The descriptions can be updated, and any blank description must be completed to continue",
   "Blank descriptions are allowed and the orchestrator fills them in automatically at runtime"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "The page shows the expected inputs and returned outputs, taken directly from the specification: those values cannot be changed, only their descriptions can be updated. Blank descriptions block the maker from moving forward, so they must be completed. The orchestrator relies on these descriptions, so it does not generate them for you.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api",
  "preview": true
 },
 {
  "id": "q-2.2d-07",
  "skill": "2.2d",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso is adding a REST API tool for an internal API that uses OAuth 2.0. Only users from Contoso's own Microsoft 365 organization may use the endpoints. Which authentication setting enforces this?",
  "options": [
   "Leave the optional Scope field empty so that no other organization can request a token",
   "Enter Contoso's tenant GUID in the setting that defines which app (client) can use the endpoints",
   "Set the organization that accesses the endpoints to My organization only",
   "Choose API key authentication and set the parameter location to Header instead of Query"
  ],
  "answer": [
   2
  ],
  "explanation": "The OAuth 2.0 settings include which Microsoft 365 organization accesses the endpoints, with the choices My organization only or Any Microsoft 365 organizations. The app (client) setting takes a GUID of the client system, not a tenant, and Scope is only the optional list of permissions requested. API key authentication is a different method with no organization restriction.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api",
  "preview": true
 },
 {
  "id": "q-2.3a-01",
  "skill": "2.3a",
  "domain": "D2",
  "type": "single",
  "difficulty": 1,
  "stem": "Nexo (a help desk agent) needs a licensing specialist: a single use case, maintained by the same team, with no authentication or publishing of its own and no reuse by other agents. What do you choose?",
  "options": [
   "A connected agent published separately",
   "A Foundry agent",
   "An A2A agent",
   "A child agent inside Nexo"
  ],
  "answer": [
   3
  ],
  "explanation": "Child agents are lightweight. They group tools, instructions, and knowledge for a specific use case, with no separate configuration, authentication, or deployment, and they are not reused. Connected agents, A2A agents, and Foundry agents are separate agents with their own lifecycle.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
  "preview": false
 },
 {
  "id": "q-2.3a-02",
  "skill": "2.3a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Your agent has more than 40 tools, topics, and agents with similar descriptions, and the orchestrator picks the wrong one. In addition, three teams maintain different areas and need to publish and version independently. Which design do you recommend?",
  "options": [
   "Add more instructions to the agent to tell similar descriptions apart",
   "Move all the tools to a single MCP server that exposes every tool",
   "Split the solution into connected agents orchestrated by the main agent",
   "Turn everything into child agents inside the same agent, one per team"
  ],
  "answer": [
   2
  ],
  "explanation": "Split into connected agents when selection accuracy degrades (rule of thumb: more than 30 to 40 choices, or similar descriptions) and when there are several teams, separate publishing or channels, dedicated settings (for example, the model), and independent ALM. Child agents have no settings or deployment of their own and stay inside the same agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
  "preview": false
 },
 {
  "id": "q-2.3a-03",
  "skill": "2.3a",
  "domain": "D2",
  "type": "multi",
  "difficulty": 2,
  "stem": "You are evaluating whether to split your solution into several agents. Which two real costs or drawbacks should you consider? (Choose two.)",
  "options": [
   "A larger testing and governance surface",
   "Higher latency because of the extra orchestration hops",
   "Secondary agents ignore the main agent's Use general knowledge setting",
   "Citations are always preserved unchanged when the answer is returned to the main agent",
   "An agent that has connected agents can also be used as a connected agent by another main agent"
  ],
  "answer": [
   0,
   1
  ],
  "explanation": "Splitting adds latency (more orchestration hops) and widens what you must test and govern. Child and connected agents respect the main agent's Use general knowledge setting, citations may be lost when the response is passed back, and a main agent that has connected agents cannot be used as a connected agent by another main agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
  "preview": false
 },
 {
  "id": "q-2.3a-04",
  "skill": "2.3a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "The Help Desk agent already has three connected agents. Another team wants to add Help Desk as a connected agent of its own main agent. Is this possible?",
  "options": [
   "Yes, with no restrictions on nesting connected agents",
   "Yes, but only if Help Desk is reconfigured as a child agent",
   "No: a main agent with connected agents cannot be connected to another main agent",
   "Yes, as long as Help Desk is published to Microsoft Teams first"
  ],
  "answer": [
   2
  ],
  "explanation": "The documented limitation is that an agent that is a main agent with connected agents cannot also be used as a connected agent of another main agent. Being a child agent or being published to Teams does not change this restriction.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
  "preview": false
 },
 {
  "id": "q-2.3a-05",
  "skill": "2.3a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso's engineering team built a code-first agent in C# with the Microsoft 365 Agents SDK and hosted it on Azure. The main Copilot Studio agent must delegate tasks to it. Which option do you use?",
  "options": [
   "Create it as a child agent inside the main agent with its own instructions",
   "Add it as a connected agent from the list of Copilot Studio agents in the environment",
   "Connect it as an external Microsoft 365 Agents SDK agent",
   "Add it as an A2A agent by entering its agent card URL as the endpoint"
  ],
  "answer": [
   2
  ],
  "explanation": "Agents built with the Microsoft 365 Agents SDK are added from Add an agent > Connect to an external agent > Microsoft 365 Agents SDK, using the messaging endpoint URL (by default ending in /api/messages); this option is in preview. Child and connected agents are Copilot Studio agents, and an A2A agent needs the agent to implement the A2A protocol and its endpoint URL, not the card URL.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-microsoft-365-agents-sdk-agent",
  "preview": true
 },
 {
  "id": "q-2.3a-06",
  "skill": "2.3a",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso has a child agent that must send a proactive check-in message when a customer has not written anything for five minutes. Description-based routing cannot do this because no user message arrives. What should the maker configure?",
  "options": [
   "Set When will this be used? to A message is received and add a Condition on the message text",
   "Set When will this be used? to The conversation changes and lower its Priority number",
   "Set When will this be used? to A plan completes and enter the five minutes in Priority",
   "Set When will this be used? to The user is inactive for a while"
  ],
  "answer": [
   3
  ],
  "explanation": "The trigger The user is inactive for a while fires after a period of user inactivity, and the period is set under Additional details. A message trigger needs a user message, and conversation-change and plan-complete triggers fire on other events. Priority only orders agents that respond to the same event; it never holds a time value.",
  "source": "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/3-create-configure-child-agent",
  "preview": false
 },
 {
  "id": "q-2.3a-07",
  "skill": "2.3a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "An orchestrator has two child agents, Billing (created first) and Refunds (created later). Both use the trigger A message is received, and a customer message currently goes to Billing first. The maker wants Refunds to run first. What should they do?",
  "options": [
   "Give Refunds a higher Priority number than Billing",
   "Delete both agents and create Refunds first",
   "Switch Refunds to The agent chooses, so it is evaluated sooner",
   "Give Refunds a lower Priority number than Billing"
  ],
  "answer": [
   3
  ],
  "explanation": "Within the same tier, child agents fire in creation order (oldest first) unless you set an explicit Priority, and a lower number means higher priority. A higher number would push Refunds further back. The agent chooses is the last tier to fire, so switching to it would make Refunds run later, not sooner.",
  "source": "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/3-create-configure-child-agent",
  "preview": false
 },
 {
  "id": "q-2.3a-08",
  "skill": "2.3a",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "A solution mixes child agents that use explicit triggers with others that use The agent chooses. Which two statements about the built-in execution order are correct? Each correct answer presents part of the solution.",
  "options": [
   "Agents that use The agent chooses (description-based routing) fire last",
   "Agents that use The agent chooses fire first, because description matching is the most specific",
   "Triggers of type An activity occurs fire first",
   "Within the same tier, agents fire in alphabetical order of their names unless Priority is set"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "Copilot Studio fires An activity occurs triggers first, then message received, custom client event, conversation changes and invoked, and finally The agent chooses. Within a tier the order is creation order (oldest first), not alphabetical, unless an explicit Priority number is set.",
  "source": "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/3-create-configure-child-agent",
  "preview": false
 },
 {
  "id": "q-2.3a-09",
  "skill": "2.3a",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's quarterly vendor contract review must check each contract against several policy agents in a fixed order, send the result to a legal reviewer for approval, and keep an audit trail of which agents ran. Which coordination pattern fits best?",
  "options": [
   "Orchestrator/subagent, where the primary agent decides at runtime which connected agent to call",
   "A single agent with all policy checks written into its instructions",
   "A concurrent workflow that runs all policy agents in parallel and votes",
   "A serial workflow that calls each agent as a step, with an approval gate"
  ],
  "answer": [
   3
  ],
  "explanation": "When the path is known before runtime and needs strict ordering, approval gates and auditability, the workflow-oriented pattern fits, and a serial workflow runs each agent after the previous one completes. Runtime routing adds variability that a compliance review cannot accept, and a concurrent workflow is for parallel work such as quorum decisions, not for a fixed sequence.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/4-select-multi-agent-orchestration-pattern",
  "preview": false
 },
 {
  "id": "q-2.3a-10",
  "skill": "2.3a",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "A team is choosing the orchestrator/subagent pattern for a multi-agent solution. In which two situations is this pattern the wrong choice? Each correct answer presents part of the solution.",
  "options": [
   "The use case is open-ended and has no predetermined process flow",
   "The process needs a consistent success rate or has well-defined steps with strong dependencies",
   "Several connected agents already exist and are optimized for reuse",
   "The connected agents need long response windows, or requests and responses larger than the primary agent allows"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "Runtime routing adds variability, so it is a poor fit when you need a consistent success rate or strict step dependencies, and when connected agents exceed the primary agent's limits on response time or size. An open-ended use case and ready-to-reuse connected agents are exactly where the orchestrator/subagent pattern works best.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/4-select-multi-agent-orchestration-pattern",
  "preview": false
 },
 {
  "id": "q-2.3a-11",
  "skill": "2.3a",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Northwind's single support agent sometimes sends a request to the wrong tool because two tools have similar descriptions. One team owns everything and no part of it has a separate life cycle. What is the smallest change to try before splitting the agent?",
  "options": [
   "Make the descriptions and instructions more distinct",
   "Create a connected agent for each tool",
   "Move each tool into its own child agent",
   "Add a workflow engine that calls both tools in sequence"
  ],
  "answer": [
   0
  ],
  "explanation": "Guidance is to start with one agent and try the smallest change first: if requests reach the wrong capability, make the descriptions and instructions more distinct. Real signals to split are team ownership, distinct domains and reuse, and every extra agent adds orchestration latency and more to test and govern.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/4-select-multi-agent-orchestration-pattern",
  "preview": false
 },
 {
  "id": "q-2.3a-12",
  "skill": "2.3a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso builds an agent on the Microsoft Copilot harness. A returns-policy capability is owned by the same team, is used only by this primary agent and has no separate life cycle. On the standard harness it would be a child agent. What should Contoso use on the Microsoft Copilot harness?",
  "options": [
   "A child agent inside the primary agent, as on the standard harness",
   "Instructions, a skill or a tool in the primary agent",
   "A connected Microsoft Foundry agent hosted in the same project",
   "An Agent2Agent (A2A) protocol agent run by another team"
  ],
  "answer": [
   1
  ],
  "explanation": "For a capability owned by the same team with no separate life cycle, you keep it inside the primary agent: a child agent on the standard harness, and instructions, a skill or a tool on the Microsoft Copilot harness. Foundry and A2A agents are not currently available as connection types on that harness, where a connected Copilot Studio agent is the only type.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/3-design-agent-organization",
  "preview": false
 },
 {
  "id": "q-2.3a-13",
  "skill": "2.3a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "A Copilot Studio workflow on the Microsoft Copilot harness must call a published agent as one of its steps. Which building block should the maker use?",
  "options": [
   "A Power Automate cloud flow that uses the Microsoft Copilot Studio connector with Execute Agent and wait",
   "The agent node, selecting An existing agent",
   "A topic Redirect node that hands off to the agent",
   "The Run an agent action inside an agent flow"
  ],
  "answer": [
   1
  ],
  "explanation": "On the Microsoft Copilot harness a workflow calls an agent through the agent node, which offers An existing agent or New agent for this workflow. The Microsoft Copilot Studio connector in Power Automate does not support Microsoft Copilot harness agents. Redirect nodes, the Run an agent action and the Execute Agent and wait route are the standard-harness building blocks.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/3-design-agent-organization",
  "preview": false
 },
 {
  "id": "q-2.3b-01",
  "skill": "2.3b",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "When you connect your Foundry agent from Copilot Studio, you get the error 400 \"endpoint does not support activity\". What is the fix?",
  "options": [
   "Enable the Activity protocol endpoint by using the REST API or the Python SDK",
   "Register it as an A2A agent by entering its endpoint URL on the Agents page",
   "Turn on the Activity protocol option in the Foundry portal",
   "Re-create the agent in the classic Foundry portal and connect it again"
  ],
  "answer": [
   0
  ],
  "explanation": "A Foundry agent must have the Activity protocol endpoint enabled. New agents expose only Responses and A2A by default, and you can enable Activity only with the REST API or the Python SDK (the portal does not show it yet). Registering the agent as A2A does not solve the requirement, and the classic portal does not work with this connection.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent",
  "preview": true
 },
 {
  "id": "q-2.3b-02",
  "skill": "2.3b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "You connect a Foundry agent and get \"404 - Version not found\". What is the most likely cause?",
  "options": [
   "The Agent Id was pasted with trailing spaces from the Foundry portal",
   "The project endpoint must end in /chat/completions, as for prompt models",
   "The Activity protocol endpoint of the agent was not enabled",
   "The agent was created in the old Foundry portal; only new-portal agents work"
  ],
  "answer": [
   3
  ],
  "explanation": "Only agents created in the new Foundry portal work with the connection. Agents from the old portal return 404 - Version not found. A missing Activity protocol endpoint causes a different error (400), and /chat/completions is a requirement for models used in prompts, not for agents.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent",
  "preview": true
 },
 {
  "id": "q-2.3b-03",
  "skill": "2.3b",
  "domain": "D2",
  "type": "single",
  "difficulty": 1,
  "stem": "What information do you need to connect a Foundry agent from the Agents page of your agent in Copilot Studio?",
  "options": [
   "The agent card URL (/.well-known/agent.json)",
   "The Foundry project endpoint for the connection, and then the name, description, and Agent Id",
   "The URL of an MCP server in the project",
   "The Azure OpenAI resource API key and the model deployment name, with the endpoint ending in /chat/completions"
  ],
  "answer": [
   1
  ],
  "explanation": "In Agents > Add an agent > Connect to an external agent > Microsoft Foundry, you create a connection with the Foundry project endpoint and then provide the name, description, and Agent Id. The agent card belongs to A2A, the key and deployment belong to using models in prompts, and MCP is a different path.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent",
  "preview": true
 },
 {
  "id": "q-2.3b-04",
  "skill": "2.3b",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "A colleague creates a new agent in the new Microsoft Foundry portal and does nothing else. Which two protocol endpoints does the agent expose by default? (Choose two.)",
  "options": [
   "Activity",
   "A2A",
   "Responses",
   "Direct Line"
  ],
  "answer": [
   1,
   2
  ],
  "explanation": "A newly created Foundry agent exposes only the Responses and A2A endpoints by default. The Activity protocol endpoint, which Copilot Studio needs, must be enabled separately, and until then the connection fails at runtime with a 400 error.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent",
  "preview": true
 },
 {
  "id": "q-2.3b-05",
  "skill": "2.3b",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "You enabled the Activity protocol endpoint on your Foundry agent by using the REST API. In the Foundry portal, the Endpoints section still shows only Responses and A2A. What should you conclude?",
  "options": [
   "The update failed, so you must repeat it by using the toggle in the portal",
   "The portal omits Activity as expected; it does not mean the change failed",
   "The Activity endpoint is hidden until the agent is published to Copilot Studio",
   "The agent must be recreated in the previous portal to show Activity"
  ],
  "answer": [
   1
  ],
  "explanation": "After you enable Activity, the portal keeps showing only Responses and A2A. Microsoft documents this UI omission as expected, and the connection to Copilot Studio works once the update is applied. There is no portal toggle for Activity (it is enabled only via REST API or Python SDK), and agents from the previous portal fail with 404 - Version not found.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent",
  "preview": true
 },
 {
  "id": "q-2.3b-06",
  "skill": "2.3b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso's main agent has a connected Foundry agent for incident analysis and also a separate tool that looks up incidents. The main agent often calls the wrong one. What should the maker change for the Foundry agent?",
  "options": [
   "Rewrite its description to state its specific purpose and when to use it",
   "Enable the Activity protocol endpoint again by using the REST API or the Python SDK",
   "Recreate the agent in the previous Foundry portal so that the main agent prefers it",
   "Change its Agent Id to match the name of the overlapping tool"
  ],
  "answer": [
   0
  ],
  "explanation": "The description tells the main agent when to invoke the connected agent, so when it overlaps with another tool or agent it should be made more specific. The Activity protocol and the new-portal requirement affect whether the connection works at all, not which agent the orchestrator picks, and the Agent Id only identifies the Foundry agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent",
  "preview": true
 },
 {
  "id": "q-2.3b-07",
  "skill": "2.3b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "A maker connected a Foundry agent to a Copilot Studio agent and later notices that the Agent Id was entered incorrectly. What is the correct way to fix it?",
  "options": [
   "Create a new connection with a different Foundry project endpoint, because the connection stores the Agent Id",
   "Delete the agent and add it again, because the Agent Id cannot be edited after creation",
   "Edit the Agent Id in the Endpoints section of the agent in the Foundry portal",
   "Open the agent from the Agents list and change the Agent Id on its details page"
  ],
  "answer": [
   3
  ],
  "explanation": "After the agent is created, the maker can select it from the Agents list and adjust the Agent Id on its details page. The connection only holds the Foundry project endpoint, not the Agent Id, and there is no need to delete and re-add the agent. The Foundry portal does not hold this Copilot Studio setting.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent",
  "preview": true
 },
 {
  "id": "q-2.3c-01",
  "skill": "2.3c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "The HR agent is maintained by another team, has its own publishing and configuration, and is in the same environment as Nexo. Nexo must delegate vacation questions to it. Which mechanism do you use?",
  "options": [
   "Add it to Nexo as a connected agent",
   "Add it as a child agent by copying its topics",
   "Connect it as a Fabric data agent",
   "A REST API tool that calls its Direct Line endpoint"
  ],
  "answer": [
   0
  ],
  "explanation": "Connected agents are other Copilot Studio agents in the same environment, with their own configuration and publishing. A child agent lives inside the main agent, a Fabric data agent is a different type of external agent, and calling its endpoint with a REST API tool does not take advantage of multi-agent orchestration.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
  "preview": false
 },
 {
  "id": "q-2.3c-02",
  "skill": "2.3c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "You want a topic to hand off a specific scenario to a connected agent and receive its result in topic variables. What do you use?",
  "options": [
   "A global variable that the secondary agent reads directly when the topic ends",
   "An End all topics node, then a message naming the target agent",
   "An Adaptive Card with a Submit action named after the target agent",
   "A node that redirects to an agent and maps inputs and outputs to topic variables"
  ],
  "answer": [
   3
  ],
  "explanation": "A topic can redirect to a child or connected agent, and the agent's inputs and outputs become topic variables. You can also reference agents in the instructions by typing / and choosing the agent. This is not possible with Fabric data agents.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
  "preview": false
 },
 {
  "id": "q-2.3c-03",
  "skill": "2.3c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "You turned off Use general knowledge on the main agent. The connected agent is configured to answer with general knowledge when it finds no sources. What behavior do you expect when the main agent delegates a question to it?",
  "options": [
   "It answers with general knowledge because its own configuration takes precedence over the main agent's on every turn",
   "The connected agent respects the main agent's setting and does not use general knowledge",
   "It always fails with a configuration error",
   "It uses general knowledge only when the channel is Teams"
  ],
  "answer": [
   1
  ],
  "explanation": "Child and connected agents respect the main agent's Use general knowledge setting, so if it is turned off, they will not use general knowledge even if their own configuration allows it. This is one of the documented limitations of multi-agent design, along with the possible loss of citations.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
  "preview": false
 },
 {
  "id": "q-2.3c-04",
  "skill": "2.3c",
  "domain": "D2",
  "type": "multi",
  "difficulty": 2,
  "stem": "Nexo is the main agent. Which two requirements must the other Copilot Studio agent meet so that Nexo can connect to it as a connected agent? (Choose two.)",
  "options": [
   "It must be in the same environment as Nexo",
   "It must be published",
   "It must use classic orchestration",
   "It must be stored in a managed solution"
  ],
  "answer": [
   0,
   1
  ],
  "explanation": "To connect to another Copilot Studio agent it must be in the same environment, published and configured to allow connections from other agents (on by default); the maker must also own it or have it shared. Orchestration mode and managed solutions are not requirements.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-copilot-studio-agent",
  "preview": false
 },
 {
  "id": "q-2.3c-05",
  "skill": "2.3c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Compliance requires that the connected HR agent receive only the explicit task that Nexo delegates, not the user's earlier conversation with Nexo. What do you configure?",
  "options": [
   "Turn off Let other agents connect to and use this one on the HR agent",
   "Turn off Use general knowledge in the settings of the HR agent",
   "Remove the HR agent from the instructions of Nexo",
   "Clear the Pass conversation history to this agent box for the HR agent"
  ],
  "answer": [
   3
  ],
  "explanation": "When you add a connected agent, the Pass conversation history to this agent box controls whether history is sent; clearing it limits the information to the explicit task. Turning off connections would stop Nexo from using the agent at all, and the general knowledge setting is about knowledge sources, not history.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-copilot-studio-agent",
  "preview": false
 },
 {
  "id": "q-2.3c-06",
  "skill": "2.3c",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "The HR team changes the description of its agent after Nexo connected to it. Nexo's orchestrator keeps routing as if the old scope applied. Which statement explains this behavior?",
  "options": [
   "The orchestrator reads the connected agent's live description every time it routes a request",
   "The orchestrator keeps its own local copy of the description, which does not sync",
   "Edits made to the description in Nexo are also written back to the HR agent",
   "The description is refreshed only when Pass conversation history to this agent is turned off and on"
  ],
  "answer": [
   1
  ],
  "explanation": "When you connect an agent, the orchestrator stores a local copy of its description and uses that copy for routing. It does not sync automatically, so you must review it and update it manually when the source agent's scope changes. Edits to the local copy affect only that orchestrator, not the connected agent or other orchestrators.",
  "source": "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/3-connect-copilot-studio-agent",
  "preview": false
 },
 {
  "id": "q-2.3c-07",
  "skill": "2.3c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "The Finance team will rework its connected Copilot Studio agent over a weekend. The orchestrator owner wants to stop routing to it during that time and bring it back quickly without rebuilding the connection. What should they do?",
  "options": [
   "Select Disconnect agent and connect it again on Monday with the same settings",
   "Turn off the agent's Enabled toggle, then turn it on",
   "Edit the local description to say the agent is unavailable",
   "Clear Pass conversation history to this agent for the weekend"
  ],
  "answer": [
   1
  ],
  "explanation": "The Enabled toggle suspends a connected agent without losing its configuration; the orchestrator stops routing to it and routing resumes as soon as it is enabled again. Disconnect agent removes it permanently, so reconnecting means rebuilding the connection. Changing the description or the history option does not stop routing.",
  "source": "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/6-manage-test-connected-agent-solution",
  "preview": false
 },
 {
  "id": "q-2.3d-01",
  "skill": "2.3d",
  "domain": "D2",
  "type": "single",
  "difficulty": 1,
  "stem": "A team wants to add a Fabric data agent to its Copilot Studio agent. What is the minimum Fabric capacity it needs?",
  "options": [
   "Only Fabric F64 or higher, since smaller capacities cannot host data agents",
   "A Fabric trial capacity is enough to create and publish the data agent",
   "Paid F2 or higher, or Power BI Premium P1+ with Fabric enabled",
   "Any Power BI Pro workspace, with no dedicated Fabric capacity required"
  ],
  "answer": [
   2
  ],
  "explanation": "A Fabric data agent requires paid Fabric capacity F2 or higher (or Power BI Premium P1+ with Fabric enabled). It supports up to 5 data sources (warehouse, lakehouse, Power BI semantic model, KQL database, mirrored database, ontology, or Microsoft Graph) and is added to Copilot Studio as an external agent (preview).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent",
  "preview": true
 },
 {
  "id": "q-2.3d-02",
  "skill": "2.3d",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Users report that the Fabric data agent returns truncated tables when a query produces thousands of rows. What is the explanation?",
  "options": [
   "It uses the maker's identity, which has only limited permissions on the lakehouse",
   "Responses are limited to 25 rows by 25 columns",
   "It can only query tables with fewer than 1,000 records",
   "It always returns 100 rows by 10 columns"
  ],
  "answer": [
   1
  ],
  "explanation": "Fabric data agent responses are limited to 25 rows by 25 columns. It also generates read-only queries (NL2SQL, NL2DAX, NL2KQL), uses the user's credentials, and works only in English.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent",
  "preview": true
 },
 {
  "id": "q-2.3d-03",
  "skill": "2.3d",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "You plan to use a Fabric data agent from Copilot Studio. Which two statements about its limitations or characteristics are correct? (Choose two.)",
  "options": [
   "It can write and update lakehouse data with queries generated from natural language",
   "It supports up to 25 data sources per agent",
   "It cannot be the target of a Redirect node or be referenced in the agent instructions",
   "It lets you change the underlying LLM from Copilot Studio",
   "It does not work when the main agent is deployed to Microsoft Copilot"
  ],
  "answer": [
   2,
   4
  ],
  "explanation": "A Fabric data agent cannot be the target of a Redirect node or be referenced in instructions, and it does not work if the main agent is deployed to Microsoft Copilot. It generates read-only queries, supports up to 5 data sources, and does not let you change the LLM.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent",
  "preview": true
 },
 {
  "id": "q-2.3d-04",
  "skill": "2.3d",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's lakehouse holds CSV files in its Files section, and a Fabric data agent connected to that lakehouse cannot answer questions about them. What is the correct fix?",
  "options": [
   "Load the data into lakehouse tables and select them for the agent",
   "Add the Files folder as a sixth data source of the data agent",
   "Grant the users Build permission on the lakehouse and its workspace",
   "Scale the Fabric capacity up to F64 so that it can read raw files"
  ],
  "answer": [
   0
  ],
  "explanation": "For a lakehouse, the Fabric data agent answers from the tables you select and does not read standalone files such as CSV or JSON unless they are ingested or exposed as tables. A data agent supports up to five data sources, so adding another source does not help, and you cannot change its LLM.",
  "source": "https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent",
  "preview": false
 },
 {
  "id": "q-2.3d-05",
  "skill": "2.3d",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Two analysts with different permissions on the same warehouse ask the same question through a Fabric data agent and get different results. What explains this?",
  "options": [
   "The agent uses the maker's credentials, and results depend on the maker's cache",
   "The agent runs under a shared service principal that filters results by group",
   "The agent uses the requesting user's credentials, so each sees only authorized data",
   "Each analyst's session is routed to a different large language model in the pool"
  ],
  "answer": [
   2
  ],
  "explanation": "The Fabric data agent uses the requesting user's credentials and permissions to enforce least-privilege access, and it only generates read queries. It does not run as the maker or a shared service principal, and the LLM cannot be changed or varied per user.",
  "source": "https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent",
  "preview": false
 },
 {
  "id": "q-2.3d-06",
  "skill": "2.3d",
  "domain": "D2",
  "type": "multi",
  "difficulty": 2,
  "stem": "Adatum's analysts write their questions to a Fabric data agent in Spanish, and the team also wants to swap in a different language model for it. Which two statements are correct? (Choose two.)",
  "options": [
   "The Fabric data agent does not currently support non-English languages",
   "Spanish questions work once the Fabric capacity is F64 or higher",
   "The language model can be replaced from the Model dropdown in Copilot Studio",
   "The language model that the Fabric data agent uses cannot be changed"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "Fabric data agent limitations include no support for non-English languages (questions, instructions, and example queries should be in English) and no way to change the LLM it uses. A larger capacity does not add language support, and the Model dropdown in Copilot Studio is for prompts, not for the Fabric data agent.",
  "source": "https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent",
  "preview": false
 },
 {
  "id": "q-2.3d-07",
  "skill": "2.3d",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "A Fabric data agent lives in a workspace whose capacity is in France Central. It uses a lakehouse in a workspace whose capacity is in North Europe, and no queries run. What explains this?",
  "options": [
   "The agent supports only data sources that are loaded as raw files, not lakehouse tables",
   "Queries cannot run when the data source's capacity is in another region than the agent's",
   "A lakehouse can be used only when a Redirect node in Copilot Studio targets the data agent",
   "The agent requires the user and the data source to be in the same Microsoft Entra tenant region"
  ],
  "answer": [
   1
  ],
  "explanation": "A listed limitation is that the Fabric data agent cannot execute queries when the data source's workspace capacity is in a different region than the data agent's workspace capacity. Lakehouse data must be exposed as tables, not raw files, and a Redirect node cannot target a Fabric data agent in Copilot Studio at all.",
  "source": "https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent",
  "preview": false
 },
 {
  "id": "q-2.3e-01",
  "skill": "2.3e",
  "domain": "D2",
  "type": "single",
  "difficulty": 1,
  "stem": "You are adding an external A2A-compatible agent from Add agent > A2A agent. Which URL do you enter?",
  "options": [
   "The Foundry Agent Id",
   "The dev tunnel URL ending in /mcp",
   "The agent endpoint URL (not the agent card URL)",
   "The agent card URL published at /.well-known/agent.json of that agent"
  ],
  "answer": [
   2
  ],
  "explanation": "You must enter the agent endpoint URL, not the agent card URL. If a valid agent card exists at /.well-known/agent.json, the name and description are filled in automatically. If not, write a clear description manually so that the orchestrator knows when to use the agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent",
  "preview": false
 },
 {
  "id": "q-2.3e-02",
  "skill": "2.3e",
  "domain": "D2",
  "type": "single",
  "difficulty": 1,
  "stem": "A partner exposed an agent built with another framework. You need multi-turn conversations, rich metadata (contextId and chat history), and interoperability across frameworks. What do you choose?",
  "options": [
   "Add it as an A2A agent",
   "A custom connector with a POST operation",
   "A Send HTTP request node inside a topic",
   "An MCP server"
  ],
  "answer": [
   0
  ],
  "explanation": "A2A is designed for agent workflows. It supports multi-turn conversations, rich metadata (contextId, message IDs, locale, and chat history in metadata), and interoperability across frameworks. Custom connectors and HTTP are for plain APIs, MCP is for tools and resources, and the Activity Protocol is for Microsoft 365 Agents SDK agents.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent",
  "preview": false
 },
 {
  "id": "q-2.3e-03",
  "skill": "2.3e",
  "domain": "D2",
  "type": "multi",
  "difficulty": 2,
  "stem": "You are developing a local A2A agent on port 5000, and Copilot Studio cannot reach it. Which two actions let you test it? (Choose two.)",
  "options": [
   "Use the public tunnel URL as the endpoint of the A2A agent",
   "Register localhost:5000 as the endpoint, because Copilot Studio runs on your machine",
   "Import the local agent as an unmanaged solution",
   "Expose it with Dev Tunnels by making the port public",
   "Change the transport to SSE"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "Copilot Studio runs in the cloud and cannot see your localhost. For development, you expose the local agent with Dev Tunnels (public port) and use the tunnel URL as the endpoint. Importing solutions or switching to SSE does not fix connectivity.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent",
  "preview": false
 },
 {
  "id": "q-2.3e-04",
  "skill": "2.3e",
  "domain": "D2",
  "type": "multi",
  "difficulty": 2,
  "stem": "When you add an A2A agent, which authentication options are available? (Choose three.)",
  "options": [
   "API key (in header or query)",
   "OAuth 2.0 (client ID and secret, authorization URL, token URL, and refresh URL)",
   "Kerberos",
   "None",
   "Basic (user name and password)"
  ],
  "answer": [
   0,
   1,
   3
  ],
  "explanation": "An A2A agent supports None, API key (in header or query), and OAuth 2.0 with client ID and secret and the authorization, token, and refresh URLs. Basic and Kerberos are not among the options. A2A connections use the custom connector infrastructure, so they can reach agents on private or on-premises networks.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent",
  "preview": false
 },
 {
  "id": "q-2.3e-05",
  "skill": "2.3e",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "You enter the endpoint URL of an A2A agent, but Copilot Studio does not fill in the name and description. What is a likely cause and a correct next step?",
  "options": [
   "The agent does not need a description; leave the fields empty because the orchestrator reads the card at runtime",
   "The agent may have no card at the .well-known location; enter the name and description manually",
   "You must enter the agent card URL instead of the endpoint URL, then sign in again",
   "A2A agents are named only after you wrap them in a custom connector and publish it"
  ],
  "answer": [
   1
  ],
  "explanation": "Name and description are pulled automatically when the agent has a valid card at the standard .well-known URL (the endpoint plus /.well-known/agent.json). If not, check the endpoint and enter an appropriate name and description yourself, since the description is what lets the main agent decide when to use the agent. The card URL is the wrong value for the endpoint field.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent",
  "preview": false
 },
 {
  "id": "q-2.3e-06",
  "skill": "2.3e",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's partner built an agent with the Microsoft 365 Agents SDK, and Fabrikam wants its Copilot Studio agent to delegate tasks to it. Which integration approach does the Microsoft Learn guidance on A2A connections recommend for this kind of agent?",
  "options": [
   "Connect it through the Activity Protocol, built for Agents SDK agents",
   "Add it as an A2A agent, by using its endpoint URL and an OAuth 2.0 connection",
   "Expose it as an MCP server so that Copilot Studio can call its tools",
   "Call it as a plain API with a custom connector or an HTTP tool"
  ],
  "answer": [
   0
  ],
  "explanation": "The A2A article lists alternatives: custom connectors or HTTP tools for basic APIs, MCP servers for tools and resources, and the Activity Protocol for agents built with the Microsoft 365 Agents SDK. A2A is for agents that already implement the Agent2Agent protocol, which this partner's agent is not described as doing.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent",
  "preview": false
 },
 {
  "id": "q-2.3e-07",
  "skill": "2.3e",
  "domain": "D2",
  "type": "multi",
  "difficulty": 2,
  "stem": "Contoso's Copilot Studio agent delegates a task to an external A2A agent. Which two items are part of the message payload that Copilot Studio sends? (Choose two.)",
  "options": [
   "Only the latest user message, with no earlier turns of the conversation",
   "A unique contextId that identifies the conversation",
   "The full chat history in the metadata, not only the latest utterance",
   "The agent card, embedded in every message for validation"
  ],
  "answer": [
   1,
   2
  ],
  "explanation": "A typical A2A payload from Copilot Studio includes a unique contextId, message IDs, locale information, and the full chat history in the metadata, not just the latest user utterance. The agent card is a separate document used to fill in the name and description, not something sent in every message.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent",
  "preview": false
 },
 {
  "id": "q-2.4a-01",
  "skill": "2.4a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Your team already has Azure OpenAI \"on your data\" over an Azure AI Search index in Foundry and wants to use it in a specific topic. Where do you configure it in Copilot Studio?",
  "options": [
   "In Agents > Add an agent > Connect to an external agent > Microsoft Foundry, entering the project endpoint",
   "In Settings > Advanced > Application Insights",
   "In Tools > Add a tool > Prompt",
   "In the Generative answers node: Data source > Classic data > Add connection to Azure OpenAI"
  ],
  "answer": [
   3
  ],
  "explanation": "The knowledge sources of a Generative answers node do not directly support Azure OpenAI. Instead, you use the node's Classic data option and Add connection to link the Azure OpenAI \"on your data\" service (preview). Connecting a Foundry agent, Application Insights, and prompts are different features.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-azure-openai",
  "preview": true
 },
 {
  "id": "q-2.4a-02",
  "skill": "2.4a",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "You want to improve answer relevance by using the semantic ranker with your Azure AI Search knowledge. Which sequence is correct?",
  "options": [
   "It works only with Access Key authentication",
   "It is not supported in Copilot Studio",
   "Configure it first in Azure AI Search, and then create the connection in Copilot Studio",
   "Turn it on in Copilot Studio when you create the connection; it is provisioned automatically in the Azure service"
  ],
  "answer": [
   2
  ],
  "explanation": "Copilot Studio supports the semantic ranker, but you must configure that feature in Azure AI Search first and then add the connection in Copilot Studio. It is not provisioned from Copilot Studio, and it does not depend on the authentication type you choose.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
  "preview": false
 },
 {
  "id": "q-2.4a-03",
  "skill": "2.4a",
  "domain": "D2",
  "type": "multi",
  "difficulty": 2,
  "stem": "You have a vector index in Azure AI Search. Which two places in Copilot Studio can you use to add it as a knowledge source? (Choose two.)",
  "options": [
   "From the Channels page",
   "From Settings > Security > Web channel security, by turning on Require secured access",
   "From the Knowledge page of the agent (Add knowledge)",
   "From the Properties of a Generative answers node",
   "From Tools > Add a tool > Computer use"
  ],
  "answer": [
   2,
   3
  ],
  "explanation": "You add Azure AI Search with Add knowledge from the agent's Overview or Knowledge pages, or from the Properties of a Generative answers node, by selecting Featured > Azure AI Search. You can add only one vector index per connection, and you must use a formal data connection.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
  "preview": false
 },
 {
  "id": "q-2.4a-04",
  "skill": "2.4a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "An agent has a SharePoint site as agent-level knowledge. In one topic, the Generative answers node uses Classic data with an Azure OpenAI on your data connection. Which sources does that node use?",
  "options": [
   "The Azure OpenAI connection in the node; agent-level sources only as fallback",
   "Only the SharePoint site, because agent-level sources always take priority",
   "Both sources, merged and ranked together by the semantic ranker",
   "Neither, because a node cannot combine Classic data with agent knowledge"
  ],
  "answer": [
   0
  ],
  "explanation": "Knowledge sources defined in a generative answers node take priority over the agent-level knowledge sources, which function as a fallback. So in that topic the answers come from the Azure OpenAI on your data connection. The sources are not merged, and the node can use its own connection.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-azure-openai",
  "preview": true
 },
 {
  "id": "q-2.4a-05",
  "skill": "2.4a",
  "domain": "D2",
  "type": "multi",
  "difficulty": 2,
  "stem": "Your team connected its Azure AI Search data to Azure OpenAI in Foundry and uses Deploy to > A new Microsoft Copilot Studio bot. Which two results occur? (Choose two.)",
  "options": [
   "A new Azure AI Search index is provisioned for the agent",
   "An agent is created that automatically connects to your Azure resource in your default environment",
   "The agent is published to Microsoft Teams",
   "A Conversational boosting system topic is generated automatically"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "Deploying from Foundry creates an agent in the default environment that is automatically connected to your Azure resource, and a Conversational boosting system topic is generated. The index already exists (it is your data source), and nothing is published to a channel automatically.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-azure-openai",
  "preview": true
 },
 {
  "id": "q-2.4a-06",
  "skill": "2.4a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso's agent uses an Azure AI Search vector index of policy documents as knowledge. Answers are correct, but the citations do not link to the source documents, and the index has no metadata_storage_path field. What should the team do?",
  "options": [
   "Turn on the semantic ranker in Azure AI Search, which adds citation links to the results",
   "Add a second vector index to the connection so that citations can be resolved",
   "Re-create the connection by typing the endpoint and admin key directly in the knowledge form",
   "Add a field to the index that holds the full URL of each document, which is used as the citation"
  ],
  "answer": [
   3
  ],
  "explanation": "To return citations, the index needs a field with the actual URL link to the document: Copilot Studio uses metadata_storage_path if it exists, and otherwise whichever field contains a complete URL. The semantic ranker only improves ranking, only one vector index can be added anyway, and typing the endpoint and key manually can create a faulty connection.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
  "preview": false
 },
 {
  "id": "q-2.4b-01",
  "skill": "2.4b",
  "domain": "D2",
  "type": "single",
  "difficulty": 1,
  "stem": "You connect a Foundry model to a prompt and paste the /openai/v1/responses endpoint. When you test it, you get \"Resource not found\". What do you fix?",
  "options": [
   "Raise the content moderation level to Highest",
   "Change the deployment name to the base model name and reconnect the model",
   "Add the /embeddings suffix to the endpoint",
   "Use the chat completions endpoint (/chat/completions)"
  ],
  "answer": [
   3
  ],
  "explanation": "Foundry models used in prompts must be chat completion models, and the endpoint must end in /chat/completions. A Responses endpoint such as /openai/v1/responses produces \"Resource not found\". The deployment name and the base model name must match Foundry exactly.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts",
  "preview": false
 },
 {
  "id": "q-2.4b-02",
  "skill": "2.4b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "You deployed a model from the GPT-5 family in Foundry and want to use it in a Copilot Studio prompt with Connect a model from Azure AI Foundry. What happens?",
  "options": [
   "It is not supported for BYOM prompts: the GPT-5 family and later",
   "It works if you use the Responses endpoint instead of chat completions",
   "It works if the deployment name matches the base model name exactly",
   "It works, but only with temperature set to 0 and a lower token limit"
  ],
  "answer": [
   0
  ],
  "explanation": "Models in the GPT-5 family and later are not supported for BYOM prompts. Only chat completion models with a /chat/completions endpoint are supported. Changing the endpoint to Responses or matching the names does not fix the incompatibility.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts",
  "preview": false
 },
 {
  "id": "q-2.4b-03",
  "skill": "2.4b",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "You use a Foundry model in a prompt (bring your own model). Which two statements are correct? (Choose two.)",
  "options": [
   "It consumes AI Builder credits first and then Copilot Credits",
   "Usage is billed separately in Azure, not at Copilot Studio rates",
   "The Azure AI Foundry connector in the data policies of the Power Platform admin center governs its use",
   "The deployment name can be entered approximately because it is ignored",
   "The content moderation slider is still available for Foundry models and for Anthropic models"
  ],
  "answer": [
   1,
   2
  ],
  "explanation": "Foundry model usage is billed separately in Azure, outside Copilot Studio rates, and it is governed by the Azure AI Foundry connector in data policies. The content moderation level exists only for managed models (not for Anthropic or Foundry models), AI Builder credits are not consumed in Copilot Studio, and the deployment name must match exactly.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts",
  "preview": false
 },
 {
  "id": "q-2.4b-04",
  "skill": "2.4b",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "A maker wants a prompt to run on a Llama model deployed in Microsoft Foundry. Where in Copilot Studio is the Foundry model connected?",
  "options": [
   "On the Agents page: Add an agent, then Microsoft Foundry and the Llama model",
   "On the Knowledge page: Add knowledge, then Azure AI Foundry",
   "In the Prompt tool, in the Model dropdown, by selecting the plus sign",
   "In Settings > Generative AI: replace the default model of the whole agent"
  ],
  "answer": [
   2
  ],
  "explanation": "Foundry models for prompts are connected inside the Prompt tool: in the Model field, open the dropdown, select the plus sign, and enter the model deployment name and base model name exactly as in Foundry. Add an agent > Microsoft Foundry connects a Foundry agent, which is a different feature, and knowledge sources do not set the model of a prompt.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts",
  "preview": false
 },
 {
  "id": "q-2.4b-05",
  "skill": "2.4b",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "A prompt takes an image as input. The maker has a Foundry connection to a text-only Llama model, but that model is missing from the Model dropdown. What is the reason?",
  "options": [
   "The deployment name contains a typo, so the model was removed from the connection",
   "Llama models are blocked by the Foundry connector in data policies",
   "Models must be connected again after every prompt edit or republish",
   "With image input, the dropdown lists only Foundry models that handle images"
  ],
  "answer": [
   3
  ],
  "explanation": "When a prompt has image input, the Model dropdown shows only the Azure AI Foundry models that work with images (for example GPT-4o or Phi-4-multimodal), so a text-only model is not listed. A wrong deployment name would break the connection rather than hide the model, and data policies do not change the list per input type.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts",
  "preview": false
 },
 {
  "id": "q-2.4b-06",
  "skill": "2.4b",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Adatum wants a Copilot Studio prompt to create product images, and a maker plans to pick a text-to-image model such as DALL-E 3 from the Foundry catalog in the prompt's Model dropdown. What does Microsoft Learn say about image generation?",
  "options": [
   "It works like any Foundry model, as long as the endpoint ends in /chat/completions",
   "It is not natively supported; deploy the model, expose it as a REST API, and call it through a plugin or custom action",
   "It works only for models that accept image input, such as GPT-4o and GPT-4o-mini",
   "It works when the prompt input type is set to image, which then lists every text-to-image model"
  ],
  "answer": [
   1
  ],
  "explanation": "Copilot Studio does not natively support image generation, and the catalog has no text-to-image models. The documented workaround is to deploy the model in Azure, expose it as a REST API, and call the endpoint from Copilot Studio through a plugin or custom action. Image input is a different feature: it only filters the dropdown to models that can read images.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts",
  "preview": false
 },
 {
  "id": "q-2.4c-01",
  "skill": "2.4c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "You want agent telemetry in Application Insights that includes the user's name and the text of the messages, but without logging potentially sensitive activity properties. What do you configure in Settings > Advanced > Application Insights?",
  "options": [
   "Turn on Enable logging, Log sensitive Activity properties, and Node execution events",
   "Turn on Enable logging and Log conversation details only",
   "Turn on Enable logging and Node execution events, without conversation details",
   "Paste the instrumentation key in Settings > Security > Authentication"
  ],
  "answer": [
   1
  ],
  "explanation": "Log conversation details includes the user ID, name, and message text. Log sensitive Activity properties also logs property values that may be sensitive, and Node execution events logs one event for each node that runs. The connection string is pasted in Settings > Advanced, not in Security.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry",
  "preview": false
 },
 {
  "id": "q-2.4c-02",
  "skill": "2.4c",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Your KQL query for distinct users per day includes test conversations made in the test canvas. How do you exclude them?",
  "options": [
   "Filter with where customDimensions['designMode'] == \"False\"",
   "Filter with where name == 'conversationUpdate'",
   "Filter with where customDimensions['designMode'] == \"True\"",
   "Filter with where timestamp > ago(14d)"
  ],
  "answer": [
   0
  ],
  "explanation": "All events include the designMode dimension, which is True when the conversation took place in the test canvas. Filtering by designMode == \"False\" keeps only real traffic. The data is in the customEvents table, and filtering by time or by activity type does not tell test traffic apart.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry",
  "preview": false
 },
 {
  "id": "q-2.4c-03",
  "skill": "2.4c",
  "domain": "D2",
  "type": "single",
  "difficulty": 1,
  "stem": "An administrator needs to prevent makers from sending agent telemetry to Application Insights. How do they do it?",
  "options": [
   "Turn off Log conversation details and Enable logging in every agent that has the connection string",
   "Block the HTTP connector in the environment",
   "Remove the Reader role on the Application Insights resource",
   "Block the Application Insights in Copilot Studio connector in a data policy"
  ],
  "answer": [
   3
  ],
  "explanation": "To prevent agent-level telemetry, block the Application Insights in Copilot Studio connector in a data policy in the Power Platform admin center. The Reader role only lets people view the shared workbook, and turning off toggles agent by agent is not a central control.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry",
  "preview": false
 },
 {
  "id": "q-2.4c-04",
  "skill": "2.4c",
  "domain": "D2",
  "type": "multi",
  "difficulty": 3,
  "stem": "You are comparing agent-level telemetry with environment-level telemetry (preview) in Application Insights. Which two statements are correct? (Choose two.)",
  "options": [
   "Environment-level telemetry is configured once by administrators and uses traces and spans aligned with OpenTelemetry",
   "Agent-level telemetry uses spans aligned with OpenTelemetry and the dependencies table, and is configured by the administrator",
   "Agent-level telemetry is configured per agent and logs events in the customEvents table",
   "Both write only to customEvents",
   "Environment-level telemetry is configured by any maker who has access to a single agent"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "Agent-level telemetry is event-based (customEvents), is configured by the maker of each agent, and does not include OpenTelemetry spans. Environment-level telemetry (preview) is configured once by administrators or platform teams, is based on traces and spans aligned with OpenTelemetry, and mainly uses the dependencies table.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/telemetry-overview",
  "preview": true
 },
 {
  "id": "q-2.4c-05",
  "skill": "2.4c",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "A team lead opens the shared Copilot Studio Dashboard workbook from Application Insights but sees no data. What access does sharing the workbook require?",
  "options": [
   "Owner of the Copilot Studio agent that sends the telemetry",
   "At least the Reader role on the Application Insights resource",
   "Power Platform administrator role in the environment",
   "Log sensitive Activity properties turned on in the agent"
  ],
  "answer": [
   1
  ],
  "explanation": "When you share the Copilot Studio Dashboard workbook (preview), team members need at least the Reader role on the connected Application Insights resource to view its information. Ownership of the agent or an admin role in Power Platform does not grant access to the Azure resource, and the logging toggles control what is collected, not who can read it.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry",
  "preview": true
 },
 {
  "id": "q-2.4c-06",
  "skill": "2.4c",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Fabrikam has OpenTelemetry tracing enabled for its agent's Application Insights telemetry. The operations team wants the spans to include tool input arguments and tool output results. Which setting controls this?",
  "options": [
   "Log sensitive Activity properties",
   "Node execution events",
   "Log conversation details",
   "Enable logging"
  ],
  "answer": [
   2
  ],
  "explanation": "When OpenTelemetry tracing is enabled, Log conversation details also controls whether tool input arguments and tool output results are captured in spans, in addition to user ID, user name, and message text. Log sensitive Activity properties covers certain sensitive property values, Node execution events logs each topic node run, and Enable logging covers message and event details in general.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry",
  "preview": false
 },
 {
  "id": "q-3.1a-01",
  "skill": "3.1a",
  "domain": "D3",
  "type": "multi",
  "difficulty": 2,
  "stem": "You are going to import a file to create a single response test set. Which two file requirements apply? (Choose two.)",
  "options": [
   "The Expected response column is required for the import to work",
   "XLSX format with one sheet per evaluation method and a pass score column",
   "Up to 500 questions per file",
   "A maximum of 100 questions, each up to 1,000 characters",
   "CSV or TXT format with the columns Question and Expected response, in that order"
  ],
  "answer": [
   3,
   4
  ],
  "explanation": "The file must be CSV or TXT with the headers Question and Expected response, with up to 100 questions and 1,000 characters per question. Expected responses are optional when you import, but you need them to run Compare meaning, Text similarity, or Exact match.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
  "preview": false
 },
 {
  "id": "q-3.1a-02",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "You want to evaluate your agent with real user questions about \"billing and payments\", grouped in the agent's analytics. How do you create that test set?",
  "options": [
   "With Quick question set, which generates ten questions from the agent's description, instructions, and capabilities",
   "With Full question set based on Topics",
   "In Monitor > Themes, select Evaluate on the theme to generate the test set with real questions",
   "With Use your test chat conversation, using the latest test chat"
  ],
  "answer": [
   2
  ],
  "explanation": "Theme-based test sets (preview) are generated from real user questions grouped into themes on the Monitor page, by using the Evaluate action. Quick question set generates 10 questions from the agent's description and capabilities, the test chat uses your own test questions, and Full question set generates from knowledge or topics.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
  "preview": true
 },
 {
  "id": "q-3.1a-03",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "You try to generate a single response test set from a SharePoint folder, and the generation fails. Which restriction explains the problem?",
  "options": [
   "Files must be larger than 50 MB",
   "Only individual SharePoint files, not folders, up to 5 MB",
   "Only entire SharePoint sites are supported",
   "Generation works only with public websites indexed by Bing"
  ],
  "answer": [
   1
  ],
  "explanation": "To generate cases from knowledge, you can use text, Word, Excel, PDF, and individual SharePoint files (not folders), with a maximum of 5 MB per file. Generation also fails if any question violates the agent's content moderation settings.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
  "preview": false
 },
 {
  "id": "q-3.1a-04",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Your agent uses Authenticate manually with Microsoft Entra ID, and the QA team wants to automate testing with agent evaluation. What is the restriction?",
  "options": [
   "They work only with agents that use Fabric data agents as their knowledge source",
   "They support only agents with Authenticate manually and a generic OAuth 2 provider configured",
   "They support only agents with No authentication or Authenticate with Microsoft, not Authenticate manually",
   "They require a test set of more than 100 cases for the results to be statistically valid"
  ],
  "answer": [
   2
  ],
  "explanation": "Agent evaluation supports only agents configured with No authentication or Authenticate with Microsoft, and it does not support Fabric data agents. If the agent needs authentication for knowledge or tools, you choose a test user profile (account) in Manage profile and connections.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-intro",
  "preview": false
 },
 {
  "id": "q-3.1a-05",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso's agent uses classic orchestration and answers mostly through authored topics. You create a full question set for a single response test set and must choose what the generation uses as a reference. What do you select?",
  "options": [
   "Topics",
   "Knowledge sources",
   "Themes in Monitor",
   "The latest test chat"
  ],
  "answer": [
   0
  ],
  "explanation": "When generating a full question set you choose a reference: Knowledge sources works best for agents with generative orchestration, and Topics works best for agents that use classic orchestration. Themes and the test chat are other ways to create a test set, not a reference option for generation.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
  "preview": false
 },
 {
  "id": "q-3.1a-06",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam's tester spent an hour asking the agent questions in the test chat and now wants exactly those questions as a test set. Which creation option does this?",
  "options": [
   "Quick question set, which generates 10 questions from the agent's description",
   "Full question set, which generates questions from a knowledge source or topics",
   "Use your test chat conversation, which fills the set with the questions from the latest test chat",
   "Evaluate on a theme in Monitor, which uses real questions from users"
  ],
  "answer": [
   2
  ],
  "explanation": "Use your test chat conversation populates the test set with the questions you typed in the latest test chat, and you can also start it from the evaluate icon in the test chat. Quick question set and Full question set generate new questions with AI, and a theme uses questions asked by real users.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
  "preview": false
 },
 {
  "id": "q-3.1a-07",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Adatum's agent reads a SharePoint site that only the service desk account can open. Ana, signed in with her own account, wants the evaluation to run with the service desk's access. What must she do?",
  "options": [
   "Pick the service desk account from a user list in Manage profile and connections",
   "Sign out, sign in with the service desk account, and then start the evaluation",
   "Share the agent with the service desk account by using the Agent viewer role",
   "Set the agent to Authenticate manually so that the evaluation asks for the account"
  ],
  "answer": [
   1
  ],
  "explanation": "Automated testing uses the authentication of the currently signed-in user, and you cannot connect with a different user while you are signed in. To run as another user, sign out, sign in with that account, and then run the evaluation. Authenticate manually is not supported for agent evaluation, and the Agent viewer role only controls access to evaluations.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
  "preview": false
 },
 {
  "id": "q-3.1a-08",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "A security reviewer asks who can open the test sets that Copilot Studio generated from the HR agent's knowledge, because the generated questions may quote confidential policy text. What is true?",
  "options": [
   "Only the maker who generated the test set can open it",
   "Only users with the Agent viewer role can view the test sets",
   "Test sets stay hidden from makers until someone runs them",
   "Any maker with access to the agent can view its test sets"
  ],
  "answer": [
   3
  ],
  "explanation": "When Copilot Studio generates test cases it uses a connected account to read your knowledge sources, so the cases can include sensitive data that this account can reach. Any maker with access to the agent can also view its test sets, so review the generated questions before sharing the agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
  "preview": false
 },
 {
  "id": "q-3.1b-01",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "For a question about business hours, the agent can answer \"We are open 9 to 5, Monday to Friday\" or \"Our hours are Monday through Friday, 9:00 AM to 5:00 PM\". Both are correct, and you want both to pass. Which method do you use?",
  "options": [
   "Compare meaning with a pass score (50 by default)",
   "Exact match with the expected response",
   "Text similarity with a high pass score to require almost identical wording",
   "Tool use with the business hours topic as the expected topic"
  ],
  "answer": [
   0
  ],
  "explanation": "Compare meaning evaluates the similarity of intent between the response and the expected one, so it tolerates different wording with the same meaning (default pass score 50). Exact match requires a character-for-character match, Text similarity measures wording similarity with cosine similarity, and Tool use only checks which tools or topics were used.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
  "preview": false
 },
 {
  "id": "q-3.1b-02",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 1,
  "stem": "You want to check that, when asked for an invoice number, the agent returns exactly INV-20481, with no variations. Which method do you use?",
  "options": [
   "Custom with Compliant and Non-compliant labels",
   "Compare meaning",
   "General quality",
   "Exact match"
  ],
  "answer": [
   3
  ],
  "explanation": "Exact match checks that the response matches the expected one character for character and word for word. It is ideal for short, precise answers such as numbers, codes, or fixed phrases. Compare meaning and General quality tolerate variations in wording.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
  "preview": false
 },
 {
  "id": "q-3.1b-03",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "You want to validate that, when a user says \"I need a Visio license\", the agent calls the CreateTicket agent flow and does not answer with knowledge alone. Which method do you use?",
  "options": [
   "Keyword match with Any and the word ticket in the agent's expected response",
   "Tool use with CreateTicket as the expected tool",
   "General quality",
   "Content safety with threshold 0"
  ],
  "answer": [
   1
  ],
  "explanation": "Tool use checks whether the agent used the expected tools or topics (pass/fail) and is configured per test case. A case with no expected tools produces an Invalid result. Keyword match only checks for words in the response, General quality evaluates quality, and Content safety evaluates harmful content.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
  "preview": false
 },
 {
  "id": "q-3.1b-04",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Your test cases include out-of-scope questions that the agent must refuse to answer, and General quality flags those responses as needing improvement. What do you do so that a correct refusal counts as a pass?",
  "options": [
   "Lower the General quality pass score to 0 so that any refusal by the agent counts as a pass in all cases",
   "Switch to Content safety with severity 7 so that refusals always exceed the threshold",
   "Use Exact match with the agent's exact refusal phrase as the expected response",
   "Add a Custom method with instructions and labels (for example, Appropriate refusal = Pass)"
  ],
  "answer": [
   3
  ],
  "explanation": "General quality includes the abstention criterion (whether the agent tried to answer), so a correct refusal can be flagged as needing improvement. A Custom method lets you define evaluation instructions and at least two labels with a Pass or Fail result, for example an Appropriate refusal label that counts as a pass.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
  "preview": false
 },
 {
  "id": "q-3.1b-05",
  "skill": "3.1b",
  "domain": "D3",
  "type": "multi",
  "difficulty": 2,
  "stem": "When you configure methods for a single response test set, some require you to set a pass score. Which two methods require one? (Choose two.)",
  "options": [
   "Keyword match",
   "Compare meaning",
   "Text similarity",
   "Tool use",
   "Exact match"
  ],
  "answer": [
   1,
   2
  ],
  "explanation": "Compare meaning (similarity of meaning, default pass score 50) and Text similarity (cosine similarity of wording, from 0 to 1) are scored and need a threshold. Exact match, Keyword match, and Tool use are pass/fail, and Custom passes or fails according to the labels you define.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
  "preview": false
 },
 {
  "id": "q-3.1b-06",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Compliance wants any response with more than minimal violent content to fail the test, using the strictest possible threshold. What do you configure in Content safety?",
  "options": [
   "A Content safety method for Violence with the threshold set to 7",
   "General quality with a pass score of 100",
   "Content safety for Violence with the severity threshold set to 0, the strictest level",
   "A single Content safety method that covers all four types of harmful content at once"
  ],
  "answer": [
   2
  ],
  "explanation": "Content safety evaluates hate and unfairness, sexual content, violence, and self-harm. The severity threshold goes from 0 (strictest) to 7 (most permissive, which lets graphic or extreme content pass), and you must add a separate method for each content type. General quality does not measure harmful content.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
  "preview": false
 },
 {
  "id": "q-3.1b-07",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "A refund answer can be worded freely, but it must always include both \"30 days\" and \"original receipt\". If either phrase is missing, the case must fail. Which method and setting do you use?",
  "options": [
   "Keyword match, set to require All keywords",
   "Keyword match, with a pass requiring Any of the keywords",
   "Text similarity, with a pass score set very high",
   "Exact match, with the full expected sentence"
  ],
  "answer": [
   0
  ],
  "explanation": "Keyword match checks that the answer contains the words or phrases you define, and you choose whether Any or All must match. With All, a missing phrase fails the case. Any would pass with just one phrase, while Text similarity and Exact match judge the whole wording instead of specific phrases.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
  "preview": false
 },
 {
  "id": "q-3.1b-08",
  "skill": "3.1b",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "Northwind is building a conversation (multi-turn) test set. Which two methods can it add to this type of test set? (Choose two.)",
  "options": [
   "Compare meaning",
   "Keyword match",
   "Tool use",
   "Custom",
   "Exact match"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "Keyword match and Custom are available for both single response and conversation test sets (as are General quality and Content safety). Compare meaning, Tool use, Text similarity, and Exact match are available only for single response test sets.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
  "preview": false
 },
 {
  "id": "q-3.1c-01",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "You changed the agent's instructions and want to see which cases improved or got worse compared with the previous run of the same test set. What do you use?",
  "options": [
   "Create a new test set with a different name",
   "Compare with in the results, once the same test set has run twice",
   "Export both runs to CSV and compare them manually, because there is no built-in comparison",
   "Show activity map for an individual case"
  ],
  "answer": [
   1
  ],
  "explanation": "Compare with compares two runs of the same test set: arrows show the cases that went from failing to passing or the other way around, and the panel shows a direct comparison of scores. Show activity map explains the sequence of decisions for a single case but does not compare runs.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results",
  "preview": false
 },
 {
  "id": "q-3.1c-02",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "After you run a test set with Compare meaning, several cases appear as Invalid. What is the most likely cause?",
  "options": [
   "Those cases have no expected answer",
   "The agent returned a network error in those cases",
   "The pass score is set to 100",
   "The test set exceeded the maximum of 100 cases"
  ],
  "answer": [
   0
  ],
  "explanation": "Each case receives Pass, Fail, Invalid, or Error. A case that lacks the expected responses, keywords, or tools that the method needs produces Invalid for that method. Execution failures are reported as Error, and a high pass score produces Fail, not Invalid.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
  "preview": false
 },
 {
  "id": "q-3.1c-03",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 1,
  "stem": "You need to keep evaluation results for one year for audit purposes. What should you do?",
  "options": [
   "Export the results to CSV",
   "Raise the pass score of the methods",
   "Share the agent with the agent viewer role so that other users keep a copy",
   "Nothing: results are kept indefinitely and are included in the agent backup"
  ],
  "answer": [
   0
  ],
  "explanation": "Evaluation results are available in Copilot Studio for 89 days. To keep them longer, export them to CSV (question, expected response, method, score, agent response, result, and analysis). The agent viewer role only lets you view and manage other makers' evaluations and does not change the 89-day retention.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results",
  "preview": false
 },
 {
  "id": "q-3.1c-04",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "A test case in a single response evaluation passed, but its response time shows 42 seconds. The team lead asks whether slow responses lower the pass rate. What is the correct answer?",
  "options": [
   "Yes, any response slower than 30 seconds is counted as a fail",
   "Only if the General quality method is selected",
   "Only for conversation test sets, where each interaction is timed",
   "No: it is only measured and does not change the pass rate"
  ],
  "answer": [
   3
  ],
  "explanation": "Copilot Studio measures the end-to-end response time of each interaction, but it is only a measurement: it does not assign a Pass or Fail result or change the test set's pass rate. It is useful to spot slow interactions and compare performance after you change the agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results",
  "preview": false
 },
 {
  "id": "q-3.1c-05",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Ana created a test set, and her colleague Luis (another maker of the same agent) ran it. When Ana opens Luis's run in the results, what can she see?",
  "options": [
   "The full results, including each response and explanation, because she created the test set",
   "The run status and result metrics, but not the responses or explanations",
   "Nothing, because makers cannot open runs started by someone else",
   "The responses but not the pass or fail result"
  ],
  "answer": [
   1
  ],
  "explanation": "Makers can see the run status and the result metrics of any test run, but only the maker who initiated the run can view the agent responses and the result explanations. Creating the test set does not give Ana that access.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results",
  "preview": false
 },
 {
  "id": "q-3.1c-06",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "After a maker switches the agent to a different model, the Review button in the top bar shows a warning badge. What does the warning mean for the agent?",
  "options": [
   "The last pass rate is no longer valid, and publishing stays blocked until a run reaches 100 percent",
   "Copilot Studio is re-running the last test set and will publish the agent when it finishes",
   "The test set must be recreated because each test set is tied to a single model",
   "The agent has not been evaluated with its current model, and the warning does not block publishing"
  ],
  "answer": [
   3
  ],
  "explanation": "The Review button warns when no evaluation exists or when the agent model changed since the latest evaluation. You select Evaluate agent to run a new evaluation with the current model. These warnings do not block publishing.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results",
  "preview": false
 },
 {
  "id": "q-3.1c-07",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso's agent uses user authentication and its evaluations used to run fine. Now every run fails to start, nothing changed in the agent, and the Power Platform admin has just edited the data policies. What is the most likely cause?",
  "options": [
   "The Microsoft Copilot Studio connector was turned off in a policy",
   "The Azure AI Search connector was moved to the Non-business group",
   "The test set passed the 89-day retention limit for evaluation results",
   "The Agent viewer role was removed from the maker who runs the tests"
  ],
  "answer": [
   0
  ],
  "explanation": "Agent evaluations that use user authentication require access through the Microsoft Copilot Studio connector. If an admin turns off that connection, makers cannot run tests with the evaluation tool. Retention affects stored results, not starting a run, and the Agent viewer role is only for sharing evaluations.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results",
  "preview": false
 },
 {
  "id": "q-3.1c-08",
  "skill": "3.1c",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "Contoso shares the Support agent with a QA analyst by using the Agent viewer role so that the analyst can work only with evaluations. Which two actions can the analyst perform? (Choose two.)",
  "options": [
   "View and run test sets created by other makers",
   "Create new test sets for the agent",
   "Rename, cancel, and delete evaluations",
   "Publish the agent after a passing run",
   "Change who else the agent is shared with"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "A user with the Agent viewer role can view and run evaluation test sets from other makers and can rename, cancel, and delete evaluations. They cannot create or update the test sets shared with them, publish the agent, or manage its sharing and access settings.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results",
  "preview": false
 },
 {
  "id": "q-3.2a-01",
  "skill": "3.2a",
  "domain": "D3",
  "type": "single",
  "difficulty": 1,
  "stem": "You create a new agent without having configured anything, and you will later need to move it between environments. Where was it created, and what do you do so that new agents are created in your own solution?",
  "options": [
   "It is created with no solution and you must add it later with Add existing",
   "It is created in the production environment's solution",
   "In the default solution, unless you set a preferred one",
   "It is created in a managed solution of the tenant and this cannot be changed"
  ],
  "answer": [
   2
  ],
  "explanation": "Every agent is created inside a solution: the default solution, unless you set a preferred solution. To move agents between environments, use a custom solution: create it and set it as your preferred solution, or add the agent with Add existing.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-overview",
  "preview": false
 },
 {
  "id": "q-3.2a-02",
  "skill": "3.2a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Your team will create the NexoCore solution with components that use the nexo prefix. Which best practice do you follow?",
  "options": [
   "Use the default publisher and change the prefix when needed",
   "Wait until components are created before defining the prefix",
   "Create a different publisher in each environment to avoid collisions",
   "Create a publisher with the nexo prefix before creating components"
  ],
  "answer": [
   3
  ],
  "explanation": "Each solution has a publisher with a prefix that avoids name collisions. Create your own publisher (do not use the default one) and keep using the same one consistently, because you cannot change the publisher of a component in a managed solution. Define the prefix before you create metadata, because names cannot be changed later.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm",
  "preview": false
 },
 {
  "id": "q-3.2a-03",
  "skill": "3.2a",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "When you export the solution that contains your agent, the export fails. You discover that some topics have names such as \"Ticket.Status.v2\". What is the cause and the fix?",
  "options": [
   "The agent must be in a managed solution before it can be exported",
   "Topic names that contain periods prevent the solution from being exported; rename the topics without periods",
   "Topic names must be unique across all environments in the tenant, so you must add an environment suffix",
   "You must delete the topic and node comments from the agent before exporting"
  ],
  "answer": [
   1
  ],
  "explanation": "You cannot export a solution that contains an agent if any of its topics has a period in its name. The fix is to rename them without periods. Topic-level and node-level comments are not exported, but that does not prevent the export, and managed solutions cannot be exported.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-topic-management",
  "preview": false
 },
 {
  "id": "q-3.2a-04",
  "skill": "3.2a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "You develop in Dev with an unmanaged solution and must deliver to Test and Production. What is the recommended practice?",
  "options": [
   "Export the unmanaged solution as managed, import it into Test and Production, and keep the unmanaged one as the source",
   "Import the unmanaged solution into Production so you can edit it there",
   "Export the managed solution directly from Dev, because managed solutions are exported as they are and do not need to be generated from an unmanaged one",
   "Import the managed solution into the same Dev environment to test it"
  ],
  "answer": [
   0
  ],
  "explanation": "Unmanaged solutions are for development. Managed solutions are deployed to environments other than the development environment, and you generate them by exporting the unmanaged solution as managed (a build artifact). You cannot export a managed solution, or import it into the environment that contains its source unmanaged solution.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm",
  "preview": false
 },
 {
  "id": "q-3.2a-05",
  "skill": "3.2a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Ana can create and export solutions in the Power Apps admin center, but Luis cannot. Both open the solution explorer in Copilot Studio. What can Luis do there?",
  "options": [
   "Everything Ana can do, because the explorer uses the agent's permissions",
   "Everything, as long as he is the owner of the agent",
   "Only the solution tasks that his security role privileges allow, as in Power Apps",
   "Nothing, because the explorer is read-only for makers"
  ],
  "answer": [
   2
  ],
  "explanation": "The solution explorer in Copilot Studio inherits the user's security role privileges, so a user can only do the solution-management tasks that they can do in the Power Apps admin center. Owning the agent does not add solution privileges.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-overview",
  "preview": false
 },
 {
  "id": "q-3.2a-06",
  "skill": "3.2a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "The Contoso admin wants to know the minimum Dataverse security role a maker needs to export and import agents by using solutions in Copilot Studio. Which role is it?",
  "options": [
   "System Administrator",
   "System Customizer",
   "Environment Maker (Power Apps)",
   "Dataverse Basic User"
  ],
  "answer": [
   1
  ],
  "explanation": "To export and import agents with solutions you need at least the System Customizer security role. Environment Maker and Basic User do not meet that minimum, and System Administrator is more than the minimum requires.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-3.2a-07",
  "skill": "3.2a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Fabrikam built an agent in a Microsoft Teams team and wants the same agent in a second team without rebuilding it. How do they move it?",
  "options": [
   "Publish the agent to the Teams channel of the second team",
   "Share the agent with the owners of the second team as editors",
   "Export the agent as a customization with the Power Apps app in Teams, then import it into the other team",
   "Export the agent's transcripts from analytics and import them into the other team"
  ],
  "answer": [
   2
  ],
  "explanation": "In Teams, you export and import agents between teams with the Power Apps Teams app: you export the customizations that include the agent from team A and import them into team B, where the agent appears in the Copilot Studio app. Publishing or sharing does not copy the agent's definition.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-3.2a-08",
  "skill": "3.2a",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Maria changed the Dev solution that contains her agent from unmanaged to managed to prepare it for Test, and now she cannot export it. What should she do?",
  "options": [
   "Create a new solution, add the agent, and export it as managed",
   "Set another preferred solution and try to export the solution again",
   "Delete the publisher and re-create it with the same prefix, then export",
   "Run Add required objects on the agent and then export the solution again"
  ],
  "answer": [
   0
  ],
  "explanation": "Solutions are unmanaged by default, but if you change one to managed you cannot export it, so you need to create a new solution. Add the agent to it, then export from the unmanaged solution as managed. The preferred solution, the publisher, and Add required objects do not affect this restriction.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-3.2b-01",
  "skill": "3.2b",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "You added your agent to the NexoCore solution. Afterward, you created two new topics and an agent flow in Copilot Studio. When you import into Test, those components are missing. What did you miss before exporting?",
  "options": [
   "Remove the agent from the solution and add it again",
   "Publish the agent three times",
   "Export the solution as managed and as unmanaged separately and combine both packages",
   "Use Advanced > Add required objects on the agent"
  ],
  "answer": [
   3
  ],
  "explanation": "Components that you add to an agent after you put it in a solution (topics, flows) must also be added to the solution before you export, by using Advanced > Add required objects. Removing an agent from the solution does not remove its components, and publishing or exporting in a different way does not include what is missing.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-3.2b-02",
  "skill": "3.2b",
  "domain": "D3",
  "type": "single",
  "difficulty": 1,
  "stem": "You imported the solution with your agent into the Test environment. What must you do before you share it with users?",
  "options": [
   "Nothing: the agent is published and shared automatically when you import the solution",
   "Configure the agent's authentication again and publish it",
   "Rename the solution",
   "Re-import it as unmanaged"
  ],
  "answer": [
   1
  ],
  "explanation": "After you import, you must configure the agent's authentication again and publish it before you can share it. In addition, the icon can take up to 24 hours to appear everywhere. Some properties, such as conversation IDs and environment IDs, are not transferred.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-3.2b-03",
  "skill": "3.2b",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "A hotfix made directly in Test created an unmanaged layer on top of your managed agent, and now it does not receive updates from the solution. How do you remove it?",
  "options": [
   "Change the publisher of the managed solution so that it replaces the layer",
   "Delete the managed solution from the environment and import it again",
   "Advanced > See solution layers, then Remove unmanaged layer",
   "Export the agent as unmanaged from Test and re-import it over the managed one"
  ],
  "answer": [
   2
  ],
  "explanation": "Solution layers show managed and unmanaged layers stacked. On the agent's Solution Layers page, you select the unmanaged layer and choose Remove unmanaged layer. Deleting the solution would remove the whole agent, and exporting or changing the publisher does not change the layer.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-overview",
  "preview": false
 },
 {
  "id": "q-3.2b-04",
  "skill": "3.2b",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "A maker keeps the agent in the unmanaged solution but deletes some of its topics directly from the solution in the solution explorer. What is the consequence?",
  "options": [
   "Export and import fail, so topics must be changed only in Copilot Studio authoring",
   "Nothing, because the topics deleted in the solution are re-created automatically on import",
   "The topics are only hidden from users in the Test environment after import, and can be restored",
   "The agent is automatically removed from the solution along with its remaining components"
  ],
  "answer": [
   0
  ],
  "explanation": "Removing or changing an agent's components, such as topics, directly from the solution (while the agent remains) causes the export and import to fail. Topic changes should be made only in the standard Copilot Studio authoring experience, and removing an agent from a solution does not remove its components either.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-3.2b-05",
  "skill": "3.2b",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "The import of your solution with the agent into Test failed. Where do you find the details of what failed, and what is the most common reason?",
  "options": [
   "The Monitor page of the agent; the agent was not published",
   "Application Insights; the connection string is missing",
   "The Power Platform admin center; the solution is unmanaged",
   "Download log file; the solution lacks required components"
  ],
  "answer": [
   3
  ],
  "explanation": "If an import fails, select Download log file to get an XML file with the cause. The most common reason is that the solution does not contain some required components, which you avoid by using Add required objects before export. Publishing, telemetry and managed state are not the usual cause.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-3.2b-06",
  "skill": "3.2b",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso's agent calls a custom connector, and its solution must go to Test. Which import order must the team follow?",
  "options": [
   "Import the agent solution first, then add the custom connector afterward",
   "Import the connection reference first, then the connector, then the agent",
   "Import the custom connector first, then the connection reference together with the agent solution",
   "Import both in one step; the order does not matter for custom connectors"
  ],
  "answer": [
   2
  ],
  "explanation": "When the agent uses custom connectors, you must import the custom connectors first and then the connection reference with the agent solution. The agent depends on the connection reference, which in turn depends on the connector, so any other order fails to resolve dependencies.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-3.2b-07",
  "skill": "3.2b",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "To tidy up the NexoCore solution, Luis removes the IT agent from it. What happens to the agent's topics and flows in that solution?",
  "options": [
   "They are deleted from the solution at the same time as the agent",
   "They move to the default solution automatically",
   "They become unmanaged layers on the agent",
   "They stay in the solution, so they must be removed separately"
  ],
  "answer": [
   3
  ],
  "explanation": "Removing an agent from a solution does not remove its components, so the topics and flows stay in the solution and must be removed separately. Do not remove an unmanaged agent's components directly from the solution unless you also remove the agent, because that breaks export and import.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-3.2b-08",
  "skill": "3.2b",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "The IT agent uses a cloud flow and an environment variable that were created after the agent was added to the solution. Which two steps make sure both go into the export? (Choose two.)",
  "options": [
   "If the solution has no environment variables, select Add existing > More > Environment variable and choose them",
   "Publish the agent again so that new flows and variables are packed automatically",
   "On the flow under Workflows in the Objects pane, select Advanced > Add required objects",
   "Mark the flow and the variable as managed before you export",
   "Export the solution as unmanaged first, because managed exports ignore flows"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "Components you create after adding the agent are not added automatically. For flows, use Advanced > Add required objects on the workflow, and for environment variables use Add existing > More > Environment variable (or Add required objects if the solution already has variables). Publishing does not change what the solution contains.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export",
  "preview": false
 },
 {
  "id": "q-3.2c-01",
  "skill": "3.2c",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Your agent calls an API that requires a key. You want the key not to travel in the solution, each environment to use its own key, and the key to be stored in Azure Key Vault. Which type of environment variable do you use?",
  "options": [
   "Secret, which references an Azure Key Vault secret",
   "JSON with the key encrypted",
   "Data source with a SharePoint connection that stores the key in a list",
   "Text with the key as the default value and an empty current value in each environment"
  ],
  "answer": [
   0
  ],
  "explanation": "The types are Decimal number, Text, JSON, Two options, Data source, and Secret. Secret stores a reference to an Azure Key Vault secret (the actual secret does not live in Dataverse or in the solution), and only Azure Key Vault is supported as a secret store.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-azure-key-vault-secrets",
  "preview": false
 },
 {
  "id": "q-3.2c-02",
  "skill": "3.2c",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "You are creating a Secret environment variable that references Azure Key Vault, and permissions fail. Which two configuration requirements apply? (Choose two.)",
  "options": [
   "Assign only the Key Vault Reader role, which already allows reading the secret content with no other permissions",
   "Assign the Key Vault Secrets User role to the user who creates the variable and to the Dataverse identity",
   "Store the secret in an encrypted Dataverse table",
   "Register the Microsoft.PowerPlatform resource provider in the Azure subscription that contains the vault",
   "Use a Key Vault from a different tenant than Power Platform"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "You must register the Microsoft.PowerPlatform resource provider in the subscription and grant permissions to retrieve secrets (the Key Vault Secrets User role) to the user and to the Dataverse identity. The Key Vault must be in the same tenant, and the Key Vault Reader role alone is not enough to read the secret content.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-azure-key-vault-secrets",
  "preview": false
 },
 {
  "id": "q-3.2c-03",
  "skill": "3.2c",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "The NexoCore solution uses the variable nexo_ApiBaseUrl. Dev points to https://dev.api.contoso.com, and Test must use https://test.api.contoso.com without touching the agent. How do you handle this?",
  "options": [
   "Create a separate variable for each environment, such as nexo_ApiBaseUrlTest, and reference the right one in the agent",
   "Change the URL inside the Send HTTP request node in Test after importing, and republish the agent",
   "Remove the current value from the variable before exporting, and provide the Test value when you import",
   "Include the Dev current value: it is overwritten automatically with the Test URL"
  ],
  "answer": [
   2
  ],
  "explanation": "The variable definition travels in the solution, and its value is provided per environment during import or deployment with Pipelines. You can remove the current value before exporting so the Dev value is not exported. Changing nodes by hand or duplicating variables hard-codes values and breaks the separation between configuration and components.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables",
  "preview": false
 },
 {
  "id": "q-3.2c-04",
  "skill": "3.2c",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "You use a Secret environment variable in a Message node of a topic. In the test chat, you see \"Bot isn't allowed to use environment variable... add a tag AllowedBots\". What do you fix?",
  "options": [
   "Change the variable type to Text and write the secret value directly in the solution",
   "Add the AllowedBots tag to the secret in Key Vault, with the agent's {envId}/{schemaName} value",
   "Publish the agent again so that the secret value is included in the published version",
   "Register a new resource provider in Azure for each agent that uses Key Vault secrets"
  ],
  "answer": [
   1
  ],
  "explanation": "To use secrets in Copilot Studio, the Microsoft Copilot Studio service needs the Key Vault Secrets User role, and the secret must have the AllowedBots tag with {envId}/{schemaName} (several agents separated by commas), or the AllowedEnvironments tag with the environment ID to allow all agents in the environment. Publishing again or changing the type to Text does not grant the agent permission (and would expose the value), and the resource provider is a subscription prerequisite, not a per-agent registration.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-azure-key-vault-secrets",
  "preview": false
 },
 {
  "id": "q-3.2c-05",
  "skill": "3.2c",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "You use environment variables in a Copilot Studio agent. Which two statements are correct? (Choose two.)",
  "options": [
   "Environment variable errors appear in the Topics list",
   "Any value change, including for Secret variables, requires you to publish the agent again in all channels",
   "They are read-only in Copilot Studio; administrators change their values in Power Apps",
   "Authors can change their value from the topics canvas",
   "Changing the value of a Secret variable does not require publishing again, because it is retrieved at runtime"
  ],
  "answer": [
   2,
   4
  ],
  "explanation": "In Copilot Studio, environment variables are read-only. The published agent includes the values they had when it was published, so you must publish again after a change, except for Secret variables, which are retrieved at runtime. Their errors appear in the test chat and when you publish, not in the Topics list.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about",
  "preview": false
 },
 {
  "id": "q-3.2c-06",
  "skill": "3.2c",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso turned on the Azure Key Vault firewall. A Secret environment variable now fails to read its secret, even though the Key Vault Secrets User role is assigned correctly. What do you configure?",
  "options": [
   "Select Trusted Services Only, because it includes Power Platform",
   "Allow the Power Platform IP addresses through the firewall",
   "Replace the Key Vault Secrets User role with Key Vault Reader",
   "Move the vault to a different Azure tenant to bypass the firewall"
  ],
  "answer": [
   1
  ],
  "explanation": "When the Key Vault firewall is on, you must allow the Power Platform IP addresses to reach the vault, because Power Platform is not included in the Trusted Services Only option. Key Vault Reader does not grant access to secret contents, and the vault must stay in the same tenant as Power Platform.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-azure-key-vault-secrets",
  "preview": false
 },
 {
  "id": "q-3.2c-07",
  "skill": "3.2c",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Fabrikam ships an update of its solution with a new default value of 10 for the variable fab_MaxItems. In a customer environment, that variable has the current value 25. After the update is imported, which value is used?",
  "options": [
   "10, because the new default replaces any existing value",
   "No value, until someone sets one again after the import",
   "25, because a value set by the customer is not overwritten",
   "Import fails because the default and the current value conflict"
  ],
  "answer": [
   2
  ],
  "explanation": "The default value is used only when there is no current value, and a defined current value is used even if a default is present. This separation lets a publisher update the definition and default without overwriting the value the customer set.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables",
  "preview": false
 },
 {
  "id": "q-3.2c-08",
  "skill": "3.2c",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "A team plans to use Secret environment variables backed by Azure Key Vault. Which two statements are correct? (Choose two.)",
  "options": [
   "The Azure Key Vault must be in the same tenant as the Power Platform subscription",
   "They can be read by any customization, including canvas apps, through the Dataverse Web API",
   "Azure Key Vault or any other secret store can be selected as the Secret Store",
   "They can be used in Power Automate flows, Copilot Studio agents, and custom connectors",
   "Their values appear in the dynamic content selector of every cloud flow"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "Secret environment variables are limited to Power Automate flows, Copilot Studio agents, and custom connectors, and they are not available through the API in general or in the flow dynamic content selector. Azure Key Vault is the only supported secret store, and it must be in the same tenant.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-azure-key-vault-secrets",
  "preview": false
 },
 {
  "id": "q-3.2d-01",
  "skill": "3.2d",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Makers cannot find where to run the Dev to Test pipeline for their solution. Where can they see and run it?",
  "options": [
   "From the default solution of the development environment linked to the pipeline",
   "From the pipeline host environment, by opening the Deployment Pipeline Configuration app as a maker",
   "From a managed solution already imported into the pipeline's target environment",
   "From an unmanaged solution in the development environment linked to the pipeline"
  ],
  "answer": [
   3
  ],
  "explanation": "Pipelines are viewed and run from an unmanaged solution in a development environment associated with the pipeline. You cannot see or run them from the default solution, from managed solutions, or from the target environments. You can also view and run them with the CLI (pac pipeline).",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines",
  "preview": false
 },
 {
  "id": "q-3.2d-02",
  "skill": "3.2d",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "You set up pipelines with these environments: Host (Production), Dev (Developer), QA (Developer), and Prod (Production). Which environments must be Managed Environments, with premium licenses?",
  "options": [
   "Only the host environment, where the pipelines are stored",
   "Dev and QA, but not Prod, because Production receives only managed solutions",
   "Only Prod; the host and the Developer environments do not need it",
   "All of them, including the host and the Developer environments"
  ],
  "answer": [
   2
  ],
  "explanation": "The host must be a production environment, but it does not need to be managed. Developer environments do not need to be managed. All the other environments used in the pipeline must be Managed Environments, with licenses that grant premium rights. In addition, since October 2026, administrators are warned about deployments to unmanaged targets.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines",
  "preview": false
 },
 {
  "id": "q-3.2d-03",
  "skill": "3.2d",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "You want every deployment to Production to require a final approval through a cloud flow in the pipelines host, after the deployment has been approved. Which two steps do you take? (Choose two.)",
  "options": [
   "Turn on the Pre-deployment Step Required gated extension on the stage",
   "Turn on only Pre-export Step Required and use the OnDeploymentRequested trigger to approve before the solution is exported",
   "Send status 10 from the flow to approve the step",
   "Create a flow with OnPreDeploymentStarted that runs UpdatePreDeploymentStepStatus with 20 (complete) or 30 (reject)",
   "Use the OnDeploymentCompleted trigger to block the deployment"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "Pre-deployment Step Required inserts a custom step after the deployment is approved. Its trigger is OnPreDeploymentStarted, and it is closed with the Perform an unbound action UpdatePreDeploymentStepStatus (20 to complete, 30 to reject). Status 10 is the system's pending state, Pre-export validates when the request is submitted, and OnDeploymentCompleted happens after the deployment has already finished.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/extend-pipelines",
  "preview": false
 },
 {
  "id": "q-3.2d-04",
  "skill": "3.2d",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "You want deployments to Production to be run by a service principal, makers not to need access to Production, and an approval flow to decide. What do you configure?",
  "options": [
   "Give the System Administrator role to each maker in Production and let them approve their own deployments",
   "Turn on Is delegated deployment (Service Principal), and use an OnApprovalStarted flow with UpdateApprovalStatus",
   "Use the OnDeploymentCompleted trigger with the flow owner's connection to approve and notify",
   "Turn on Pre-export Step Required on the stage and call UpdatePreExportStepStatus with the connection of the maker who submits the deployment, approving from their own account"
  ],
  "answer": [
   1
  ],
  "explanation": "In a delegated deployment, the trigger is OnApprovalStarted, and the UpdateApprovalStatus action (20 to approve, 30 to reject) must run with the connection of the configured service principal. The person who sets it up must be an owner of the enterprise application in Microsoft Entra ID, and the service principal needs the Deployment Pipeline Administrator role on the host and System Administrator on the targets. This way, makers do not need access to the target.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/delegated-deployments-setup",
  "preview": false
 },
 {
  "id": "q-3.2d-05",
  "skill": "3.2d",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "About how Power Platform Pipelines work, which two statements are correct? (Choose two.)",
  "options": [
   "Each deployment supports several solutions at once",
   "The same exported managed artifact goes through the stages in order, so QA cannot be skipped",
   "They can deploy unmanaged solutions to Production",
   "The default import behavior is Upgrade without Overwrite customizations",
   "They can deploy across different tenants"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "The solution is exported when the deployment request is submitted, and the same managed artifact goes through the stages in order. The default import is Upgrade without Overwrite customizations. Unmanaged solutions are not deployed (they are stored as a backup), cross-tenant deployment is not supported (Azure DevOps or GitHub is recommended), and each deployment carries only one solution.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines",
  "preview": false
 },
 {
  "id": "q-3.2d-06",
  "skill": "3.2d",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Adatum wants a naming-convention check to run as soon as a maker submits a deployment, before the solution is exported from Dev, and only on the first stage. What do you enable?",
  "options": [
   "Pre-export Step Required on the first stage, with an OnDeploymentRequested flow that updates the step status",
   "Pre-deployment Step Required on the last stage, with an OnPreDeploymentStarted flow",
   "Is delegated deployment on the first stage, with an OnApprovalStarted flow",
   "Pre-export Step Required on every stage, with an OnDeploymentCompleted flow"
  ],
  "answer": [
   0
  ],
  "explanation": "Pre-export Step Required runs custom validation when the deployment request is submitted, and the pipeline does not export the solution until the step is marked complete, so it should be enabled only on the first stage. Its trigger is OnDeploymentRequested and its action is UpdatePreExportStepStatus. Pre-deployment runs after approval, and delegated deployment changes the identity used.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/extend-pipelines",
  "preview": false
 },
 {
  "id": "q-3.2d-07",
  "skill": "3.2d",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "NexoCore 1.4 was deployed to Production through a pipeline and has a defect. The admin wants to redeploy version 1.3 with the same pipeline. What is needed?",
  "options": [
   "Nothing, because pipelines always accept any earlier solution version",
   "Enable the setting for redeploying older versions, then use run history",
   "Delete 1.4 from Production and import 1.3 as an unmanaged solution by hand",
   "Change the pipeline import behavior from Upgrade to Update and redeploy 1.3"
  ],
  "answer": [
   1
  ],
  "explanation": "If the setting to redeploy previous solution versions is enabled, you can redeploy an older version from the run history view on the Pipelines page. If it is disabled, only higher solution versions can be deployed or imported. Pipelines do not let you change the import behavior, and unmanaged deployments are not supported.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines",
  "preview": false
 },
 {
  "id": "q-3.2d-08",
  "skill": "3.2d",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "About how Power Platform Pipelines behave, which two statements are correct? (Choose two.)",
  "options": [
   "For standard deployments, the maker who requested the deployment owns the deployed solution objects",
   "The pipelines host can also act as the development environment of the same pipeline",
   "Pipelines publish a maker's unmanaged customizations automatically before they export the solution",
   "Deploying to an environment in another geography requires Cross-Geo Solution Deployments to be enabled in the host"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "The deploying identity owns the deployed objects: the requesting maker for standard deployments, or the service principal or user for delegated ones. Cross-region deployment works only when the Cross-Geo setting is enabled in the host. Using one environment as both development and host is not supported, and pipelines do not publish unmanaged customizations before export.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines",
  "preview": false
 },
 {
  "id": "q-1.1b-07",
  "skill": "1.1b",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "Adatum's identity team wants to review the identity of a brand-new Copilot Studio agent in the Microsoft Entra admin center before anyone publishes it. What can they expect?",
  "options": [
   "The identity appears only after the first publish to a channel",
   "The identity exists only if the environment admin turned on automatic agent identities",
   "A Microsoft Entra Agent ID was created automatically when the agent was created",
   "The maker must register an app in Entra and paste its ID into the agent settings"
  ],
  "answer": [
   2
  ],
  "explanation": "Copilot Studio creates a Microsoft Entra Agent ID automatically for each new agent, at creation time and not at publish. Since May 2026 there is no environment-level opt out, and makers do not create the identity by hand.",
  "source": "https://learn.microsoft.com/microsoft-copilot-studio/govern-agents-identities-overview",
  "preview": false
 },
 {
  "id": "q-1.1b-08",
  "skill": "1.1b",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "Fabrikam's security team reviews Microsoft Entra Agent IDs for its Copilot Studio agents. Which two statements are correct? Each correct answer presents part of the solution.",
  "options": [
   "An Agent ID is a service principal with the Agent subtype; OAuth stays the same",
   "A maker can bring an existing service principal and assign it as the agent's Agent ID",
   "If the tenant is at its directory quota, the agent is created and gets its identity later",
   "Agents made in Agent Builder do not use app registration IDs or Agent IDs"
  ],
  "answer": [
   0,
   3
  ],
  "explanation": "Agent IDs are service principals with an Agent subtype, and the underlying OAuth flow stays the same. Agent Builder agents do not use app registration IDs or Agent IDs. You cannot bring your own identity, and at quota the agent fails to be created instead of waiting for an identity.",
  "source": "https://learn.microsoft.com/microsoft-copilot-studio/govern-agents-identities-overview",
  "preview": false
 },
 {
  "id": "q-1.1e-07",
  "skill": "1.1e",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso's HR benefits agent was built by an IT-approved maker, will be used by employees in other departments, reads shared HR data, and has no SLA. Under zoned governance, where does this agent belong?",
  "options": [
   "Zone 1, the citizen zone with private read-only agents",
   "Zone 2, the partnered zone with IT-approved makers",
   "Zone 3, the professional zone with ALM and the strongest controls",
   "Zone 1, if the maker turns sharing off for the agent"
  ],
  "answer": [
   1
  ],
  "explanation": "Classification asks who builds the agent, who uses it, what data and permissions it needs, and how critical it is. An IT-approved maker, other departments, shared data, and no SLA place the agent in Zone 2. Zone 1 is for private read-only agents, and Zone 3 is for professional developers and IT with SLAs.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-governance-security-strategy-copilot-studio/3-zoned-governance-strategy",
  "preview": false
 },
 {
  "id": "q-1.1e-08",
  "skill": "1.1e",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "Northwind enabled Agent 365 and has qualifying licenses. One Copilot Studio agent is set to No authentication, and the admin finds no Agent 365 activity data for its anonymous chats. What explains this?",
  "options": [
   "The maker has to add telemetry code to the agent before any data is produced",
   "The agent must first be approved for the tenant-wide catalog to produce telemetry",
   "Agent 365 collects data only from agents that run in Zone 3 environments",
   "An agent set to No authentication produces no telemetry for unauthenticated sessions"
  ],
  "answer": [
   3
  ],
  "explanation": "Agent 365 activity data needs a qualifying license, an authenticated session, and an agent that is not multitenant. With No authentication there is no telemetry for unauthenticated sessions. Copilot Studio agents send telemetry without instrumentation, and catalog approval is a separate step.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-governance-security-strategy-copilot-studio/6-agent-365-inventory-observability",
  "preview": false
 },
 {
  "id": "q-1.1f-06",
  "skill": "1.1f",
  "domain": "D1",
  "type": "single",
  "difficulty": 3,
  "stem": "A Contoso agent on the Microsoft Copilot harness must handle every expense claim in the same fixed order of steps, with defined inputs and outputs each time. Which component fits best?",
  "options": [
   "A workflow, which enforces the sequence more strictly than a skill",
   "A skill, because its Markdown instructions fix the order of steps",
   "A connected agent, because the process needs its own owner",
   "The agent instructions, because the process is a one-off need"
  ],
  "answer": [
   0
  ],
  "explanation": "A workflow enforces a fixed sequence with defined inputs and outputs more strictly than a skill's Markdown instructions can. A skill fits a repeatable pattern that is reused across agents. A connected agent is for a separately owned capability, and instructions suit one-off needs.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-reusable-behavior-skills-copilot-studio/2-position-skills-github-copilot-component-model",
  "preview": false
 },
 {
  "id": "q-1.1f-07",
  "skill": "1.1f",
  "domain": "D1",
  "type": "multi",
  "difficulty": 3,
  "stem": "A maker prepares a skill for a Microsoft Copilot harness agent. Which two statements are correct? Each correct answer presents part of the solution.",
  "options": [
   "The description should be a short title, because it is written for readers",
   "The orchestrator activates the skill when a user's request matches its description",
   "A skill can be used only by the one agent in which it was first created",
   "The name may use lowercase letters, numbers, and hyphens, and must be unique inside one agent"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "A skill is a name, a description, and Markdown instructions that the orchestrator activates when a request matches the description. The name allows lowercase letters, numbers, and hyphens and must be unique inside one agent. The description is written for the model, not for readers, and one skill can be added to many agents.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-reusable-behavior-skills-copilot-studio/2-position-skills-github-copilot-component-model",
  "preview": false
 },
 {
  "id": "q-2.1a-08",
  "skill": "2.1a",
  "domain": "D2",
  "type": "single",
  "difficulty": 2,
  "stem": "Adatum's compliance team maintains curated policy documents in a Microsoft Foundry knowledge base and keeps tuning it. A maker with a Microsoft Copilot harness agent wants answers grounded in those policies without copying the content. What should the maker add?",
  "options": [
   "The policy documents as uploaded files in a knowledge source",
   "A Work IQ tool, because policies are part of how people work",
   "A Fabric IQ tool that reads the policies from the semantic model",
   "A Foundry IQ tool connected to the existing knowledge base"
  ],
  "answer": [
   3
  ],
  "explanation": "Foundry IQ reuses curated knowledge from knowledge bases that another team maintains in Microsoft Foundry, so nothing is re-created in Copilot Studio. Uploaded files fit documents the maker owns. Fabric IQ is for business data in a semantic model, and Work IQ is for Microsoft 365 work context.",
  "source": "https://learn.microsoft.com/en-us/training/modules/connect-agents-microsoft-iq-github-copilot/2-choose-iq-capability-agent",
  "preview": false
 },
 {
  "id": "q-2.4a-07",
  "skill": "2.4a",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "A Contoso agent uses a Foundry IQ tool. In the Preview tab, the activity trace shows that the Foundry IQ step ran, but the returned items are not relevant. What is the right next step?",
  "options": [
   "Remove the connection in Copilot Studio, because that resets the knowledge base",
   "Work with the knowledge base owner to tune it in Microsoft Foundry",
   "Add a second Foundry IQ connection that points to the same knowledge base",
   "Shorten the tool description, because it controls which items come back"
  ],
  "answer": [
   1
  ],
  "explanation": "If the Foundry IQ step runs but the items are wrong, the tuning happens in Microsoft Foundry with the knowledge base owner, not in Copilot Studio. Removing the connection does not change the knowledge base, and an agent can have only one Foundry IQ connection.",
  "source": "https://learn.microsoft.com/en-us/training/modules/connect-agents-microsoft-iq-github-copilot/3-connect-foundry-iq-knowledge-base",
  "preview": false
 },
 {
  "id": "q-2.3d-08",
  "skill": "2.3d",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "A maker added the Fabric IQ tool to a Microsoft Copilot harness agent. In testing, the Preview activity trace shows a Fabric IQ step that ends with an error. What should the maker check first?",
  "options": [
   "Whether the semantic model's measures were rebuilt in Copilot Studio",
   "Whether the agent was moved to the standard harness",
   "Whether the credentials used by the tool are still current",
   "Whether the tool description lists what the tool does not handle"
  ],
  "answer": [
   2
  ],
  "explanation": "Authentication failures are a common cause of a Fabric IQ error, so check that the tool's credentials are current. Fabric IQ reuses the Fabric semantic model, so nothing is rebuilt in Copilot Studio. A weak description explains a missing call or a call to another tool, not an error.",
  "source": "https://learn.microsoft.com/en-us/training/modules/connect-agents-microsoft-iq-github-copilot/4-connect-fabric-iq-business-data",
  "preview": true
 },
 {
  "id": "q-2.2b-10",
  "skill": "2.2b",
  "domain": "D2",
  "type": "single",
  "difficulty": 3,
  "stem": "Contoso's agent uses the Work IQ (preview) MCP tool. It can read a user's email and meetings, but it cannot send a message for the user. What is the most likely reason?",
  "options": [
   "Work IQ is read-only until an admin turns on write operations in the admin center",
   "The maker must add the workload-specific Mail tool, because Work IQ cannot send email",
   "Work IQ supports only chats, so email actions need a Power Automate flow",
   "The tenant must move the agent to the standard harness to allow writes"
  ],
  "answer": [
   0
  ],
  "explanation": "Work IQ is read-only unless an administrator turns on write operations in the Microsoft 365 admin center. The workload-specific tools are a legacy experience on the standard harness and should not replace Work IQ. Work IQ runs on the Microsoft Copilot harness and covers files, email, meetings, and chats.",
  "source": "https://learn.microsoft.com/en-us/training/modules/connect-agents-microsoft-iq-github-copilot/5-connect-work-iq-microsoft-365-context",
  "preview": true
 },
 {
  "id": "q-3.1a-09",
  "skill": "3.1a",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "A QA lead creates a test set on the Evaluate tab of a Microsoft Copilot harness agent. Which two statements are correct? Each correct answer presents part of the solution.",
  "options": [
   "The CSV can hold up to 100 questions of 1,000 characters each",
   "A CSV upload can be at most 5 MB, and a template is available",
   "Generate 25 and Generate 50 conversations are offered before the first run",
   "Quick conversation set generates 10 conversations from the agent setup"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "On the Evaluate tab the CSV limit is 5 MB, and Quick conversation set generates 10 conversations from the agent's description, instructions, and topics. The 100-question limit belongs to the standard harness. Generate 25 and Generate 50 appear only after an initial evaluation run.",
  "source": "https://learn.microsoft.com/en-us/training/modules/evaluate-agents-github-copilot/2-create-test-set-conversations",
  "preview": true
 },
 {
  "id": "q-3.1b-09",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Fabrikam's QA lead wants the Evaluate tab of a Microsoft Copilot harness agent to check each answer against the expected response from a CSV with Exact match. What is the situation today?",
  "options": [
   "Exact match is available when the test set has expected responses",
   "Compare meaning is available, but only with a pass score of 50",
   "General quality is the only method: an AI check of relevance and completeness",
   "A Custom method with Pass and Fail labels replaces Exact match on this harness"
  ],
  "answer": [
   2
  ],
  "explanation": "Currently the only test method on the Evaluate tab is General quality, an AI-based assessment of qualities such as relevance and completeness. Exact match, Compare meaning, and Custom belong to the standard harness evaluation.",
  "source": "https://learn.microsoft.com/en-us/training/modules/evaluate-agents-github-copilot/2-create-test-set-conversations",
  "preview": true
 },
 {
  "id": "q-3.1c-09",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "A Contoso evaluation on the Evaluate tab suddenly fails every case that calls a tool. The trace shows that the connection for the evaluation's user profile has expired. What should the team do?",
  "options": [
   "Rewrite the agent instructions, because failed tool calls point to weak instructions",
   "Restore the connection and rerun the evaluation, leaving the instructions unchanged",
   "Switch the test method to a Custom method with Pass and Fail labels",
   "Treat it as a platform limitation and wait for the platform team"
  ],
  "answer": [
   1
  ],
  "explanation": "An expired connection for the user profile is an evaluation setup issue. Restore the connection and rerun, and leave the agent's instructions as they are. A Fail can come from the test, the agent, or the platform, so check the setup first.",
  "source": "https://learn.microsoft.com/en-us/training/modules/evaluate-agents-github-copilot/4-interpret-evaluation-results",
  "preview": true
 },
 {
  "id": "q-3.1c-10",
  "skill": "3.1c",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "Contoso plans to switch a Microsoft Copilot harness agent to a new model. Which two actions belong to a safe validation? Each correct answer presents part of the solution.",
  "options": [
   "Run the regression set and export the results before the model changes, to keep a baseline",
   "Change the model in production first, then rebuild the baseline from the new results",
   "Test the candidate in a nonproduction copy with the same setup and tools",
   "Approve the candidate when its overall score is similar, since tool selection does not matter"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "Baseline the current model first, because after the change you cannot rebuild it. Then test the candidate in a nonproduction copy that keeps the same instructions, knowledge, tools, and connections. A similar overall score is not enough, so you must also check tool selection in the Preview trace.",
  "source": "https://learn.microsoft.com/en-us/training/modules/evaluate-agents-github-copilot/5-validate-ai-model-migration",
  "preview": true
 },
 {
  "id": "q-1.1a-08",
  "skill": "1.1a",
  "domain": "D1",
  "type": "single",
  "difficulty": 2,
  "stem": "A colleague reads that Copilot Studio renamed the \"GitHub Copilot harness\" to the \"Microsoft Copilot harness\". Contoso asks whether its agents built on it need to be rebuilt or will be billed differently. What is correct?",
  "options": [
   "It is a different harness with new capabilities, so existing agents must be rebuilt on it",
   "It is the same harness under a new name, with no change in capabilities or billing",
   "The standard harness was replaced, so all agents must move to the renamed harness",
   "Billing moves to the GitHub Copilot service, so a GitHub subscription is now required"
  ],
  "answer": [
   1
  ],
  "explanation": "Microsoft only renamed the harness (announced 28 October 2026): capabilities and billing are unchanged, and Learn or the exam may still use the old name. Agents cannot move between harnesses anyway, and it is not the GitHub Copilot service.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview",
  "preview": false
 }
];
