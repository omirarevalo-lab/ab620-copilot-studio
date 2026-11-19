// AB-620 flashcards (261, English). One fact per card (minimum information principle). data/flashcards.js is the source of truth. Schema: SPEC §6.
window.AB620_CARDS = [
 {
  "id": "c-1.1a-01",
  "skill": "1.1a",
  "front": "Which integration option suits reusable tools and resources for agents?",
  "back": "MCP, over Streamable HTTP.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "c-1.1a-02",
  "skill": "1.1a",
  "front": "Which option suits agents that need multi-turn conversations and metadata?",
  "back": "A2A.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "c-1.1a-03",
  "skill": "1.1a",
  "front": "Which option suits agents built with the Microsoft 365 Agents SDK?",
  "back": "The Activity Protocol.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "c-1.1a-04",
  "skill": "1.1a",
  "front": "Which two options suit plain API calls?",
  "back": "A custom connector or HTTP.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "c-1.1a-05",
  "skill": "1.1a",
  "front": "A ready-made, Microsoft-built way to reach the system already exists. Which integration option should you try first?",
  "back": "The prebuilt connector.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/5-select-integration-patterns"
 },
 {
  "id": "c-1.1a-06",
  "skill": "1.1a",
  "front": "Which integration option suits a one-off API that only Copilot Studio needs?",
  "back": "A REST API tool.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/3-compare-action-integration-patterns"
 },
 {
  "id": "c-1.1b-01",
  "skill": "1.1b",
  "front": "What are the three authentication options for an agent?",
  "back": "No authentication, Authenticate with Microsoft, and Authenticate manually.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
 },
 {
  "id": "c-1.1b-03",
  "skill": "1.1b",
  "front": "Which authentication option is the default?",
  "back": "Authenticate with Microsoft (automatic Entra ID).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
 },
 {
  "id": "c-1.1b-04",
  "skill": "1.1b",
  "front": "Which identity options does Authenticate manually support?",
  "back": "Entra ID, Entra ID v2, or Generic OAuth 2.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
 },
 {
  "id": "c-1.1b-02",
  "skill": "1.1b",
  "front": "Which authentication option exposes User.AccessToken?",
  "back": "Only Authenticate manually.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
 },
 {
  "id": "c-1.1b-05",
  "skill": "1.1b",
  "front": "Where must you never show User.AccessToken?",
  "back": "In a Message node.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
 },
 {
  "id": "c-1.1c-01",
  "skill": "1.1c",
  "front": "When do users see newly published content?",
  "back": "When they start a new session.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels"
 },
 {
  "id": "c-1.1c-03",
  "skill": "1.1c",
  "front": "After how much inactivity does a new session start in most channels?",
  "back": "30 minutes.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels"
 },
 {
  "id": "c-1.1c-02",
  "skill": "1.1c",
  "front": "How many suggested options does Teams show in a Question node?",
  "back": "Up to six, as a hero card.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels"
 },
 {
  "id": "c-1.1c-04",
  "skill": "1.1c",
  "front": "In Teams, is the satisfaction survey an Adaptive Card?",
  "back": "No, it is text only.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels"
 },
 {
  "id": "c-1.1d-01",
  "skill": "1.1d",
  "front": "Which content moderation setting wins at runtime?",
  "back": "The topic-level setting.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
 },
 {
  "id": "c-1.1d-03",
  "skill": "1.1d",
  "front": "What is the default content moderation level?",
  "back": "High.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
 },
 {
  "id": "c-1.1d-02",
  "skill": "1.1d",
  "front": "What does turning on Allow ungrounded responses do?",
  "back": "The agent can answer with general knowledge.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
 },
 {
  "id": "c-1.1d-04",
  "skill": "1.1d",
  "front": "What does turning off Allow ungrounded responses do?",
  "back": "It blocks turns that have no source or tool; the fallback fires.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
 },
 {
  "id": "c-1.1e-01",
  "skill": "1.1e",
  "front": "Which authentication change does the security scan warn about before publishing?",
  "back": "Switching to No authentication.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-scan"
 },
 {
  "id": "c-1.1e-04",
  "skill": "1.1e",
  "front": "Which credential choice for connectors or flows does the security scan warn about?",
  "back": "Maker-provided credentials.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-scan"
 },
 {
  "id": "c-1.1e-05",
  "skill": "1.1e",
  "front": "Which sharing change does the security scan warn about?",
  "back": "Sharing the agent with everyone in the organization.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-scan"
 },
 {
  "id": "c-1.1e-02",
  "skill": "1.1e",
  "front": "What are the data policy groups?",
  "back": "Business, Non-business, and Blocked.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention"
 },
 {
  "id": "c-1.1e-06",
  "skill": "1.1e",
  "front": "What rule applies to connectors that share data in a data policy?",
  "back": "They must be in the same group.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention"
 },
 {
  "id": "c-1.1e-03",
  "skill": "1.1e",
  "front": "What happens to custom agents when you reach 125% of prepaid capacity?",
  "back": "They are disabled after the current conversation ends.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management"
 },
 {
  "id": "c-1.1e-07",
  "skill": "1.1e",
  "front": "What happens to agent flows when you reach 125% of prepaid capacity?",
  "back": "Only new runs are blocked; the agent keeps responding.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management"
 },
 {
  "id": "c-1.1e-08",
  "skill": "1.1e",
  "front": "What does a maker see when they add a connector from the Blocked group to an agent?",
  "back": "An error, shown immediately.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/4-authenticate-govern-integrations"
 },
 {
  "id": "c-1.1e-09",
  "skill": "1.1e",
  "front": "What can't makers do when the admin enforces \"Control maker-provided credentials\"?",
  "back": "Set tools to use their own credentials.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/4-authenticate-govern-integrations"
 },
 {
  "id": "c-1.1e-10",
  "skill": "1.1e",
  "front": "Does SSO work for connectors when a Teams agent uses custom Active Directory authentication?",
  "back": "No. Users sign in to each connector manually.",
  "source": "https://learn.microsoft.com/en-us/training/modules/take-action-external-systems-connector-rest-api-tools-copilot-studio/4-configure-connector-authentication"
 },
 {
  "id": "c-1.1f-01",
  "skill": "1.1f",
  "front": "What is a component collection?",
  "back": "A reusable set of agent components such as topics, tools, knowledge, and flows.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-export-import-copilot-components"
 },
 {
  "id": "c-1.1f-02",
  "skill": "1.1f",
  "front": "Who can edit a component collection?",
  "back": "Only its creator or a system customizer/admin.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-export-import-copilot-components"
 },
 {
  "id": "c-1.1g-01",
  "skill": "1.1g",
  "front": "In Web channel security, what must a client present when Require secured access is on?",
  "back": "A secret or a Direct Line token.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security"
 },
 {
  "id": "c-1.1g-03",
  "skill": "1.1g",
  "front": "How long can the \"Require secured access\" setting take to apply?",
  "back": "Up to two hours.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security"
 },
 {
  "id": "c-1.1g-02",
  "skill": "1.1g",
  "front": "For service-to-service calls, how do you authenticate to Direct Line?",
  "back": "Send the secret in the header.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security"
 },
 {
  "id": "c-1.1g-04",
  "skill": "1.1g",
  "front": "In a browser or mobile app, what do you use instead of the Direct Line secret?",
  "back": "A token your own service gets by exchanging the secret.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security"
 },
 {
  "id": "c-1.2a-01",
  "skill": "1.2a",
  "front": "Which trigger must an agent flow have to be used as an agent tool?",
  "back": "When an agent calls the flow.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent"
 },
 {
  "id": "c-1.2a-02",
  "skill": "1.2a",
  "front": "Which action must an agent flow include so the calling agent gets its results?",
  "back": "Respond to the agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent"
 },
 {
  "id": "c-1.2a-03",
  "skill": "1.2a",
  "front": "What value must Asynchronous response have for an agent flow used as a tool (real-time pattern)?",
  "back": "Off: the flow must respond in real time, within 100 seconds.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent"
 },
 {
  "id": "c-1.2a-04",
  "skill": "1.2a",
  "front": "What is the response time limit for an agent flow used as a tool?",
  "back": "100 seconds.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent"
 },
 {
  "id": "c-1.2b-01",
  "skill": "1.2b",
  "front": "Which preview connector runs multistage approvals?",
  "back": "Human review.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-advanced-approvals"
 },
 {
  "id": "c-1.2b-03",
  "skill": "1.2b",
  "front": "What two kinds of stages do multistage approvals have?",
  "back": "Manual stages and AI stages.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-advanced-approvals"
 },
 {
  "id": "c-1.2b-04",
  "skill": "1.2b",
  "front": "Which two response rules can a manual approval stage use?",
  "back": "First to respond or Everyone must approve.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-advanced-approvals"
 },
 {
  "id": "c-1.2b-05",
  "skill": "1.2b",
  "front": "Which three features are unavailable in multistage approvals?",
  "back": "ALM, sharing, and attachments.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-advanced-approvals"
 },
 {
  "id": "c-1.2b-02",
  "skill": "1.2b",
  "front": "What does Request for information do to the flow?",
  "back": "It pauses the flow and sends the request through Outlook.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-request-for-information"
 },
 {
  "id": "c-1.2b-06",
  "skill": "1.2b",
  "front": "Which response is used when several people reply to Request for information?",
  "back": "The first response.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-request-for-information"
 },
 {
  "id": "c-1.2b-07",
  "skill": "1.2b",
  "front": "Which input types does Request for information support?",
  "back": "Text, yes/no, email, number, and date.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-request-for-information"
 },
 {
  "id": "c-1.2c-01",
  "skill": "1.2c",
  "front": "What is the maximum run time of an agent flow in express mode?",
  "back": "Two minutes.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-flow-express-mode"
 },
 {
  "id": "c-1.2c-02",
  "skill": "1.2c",
  "front": "How many actions can an express mode flow have?",
  "back": "About 100 (a recommended safe limit, not a hard cap); each loop iteration counts.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-flow-express-mode"
 },
 {
  "id": "c-1.2c-03",
  "skill": "1.2c",
  "front": "Which two features are unavailable in express mode?",
  "back": "Delay and webhook.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-flow-express-mode"
 },
 {
  "id": "c-1.2d-01",
  "skill": "1.2d",
  "front": "How many Copilot Credits does an agent flow consume per 100 actions?",
  "back": "13.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview"
 },
 {
  "id": "c-1.2d-02",
  "skill": "1.2d",
  "front": "Do agent flow test runs consume capacity?",
  "back": "No, neither designer nor test chat runs do.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview"
 },
 {
  "id": "c-1.2e-01",
  "skill": "1.2e",
  "front": "How are a tool's inputs filled in by default?",
  "back": "Dynamically fill with AI: from context or by asking the user.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
 },
 {
  "id": "c-1.2e-02",
  "skill": "1.2e",
  "front": "Which input option stops the agent from asking the user?",
  "back": "Fill using > Custom value.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
 },
 {
  "id": "c-1.2f-01",
  "skill": "1.2f",
  "front": "What can you build with the Configure run after setting?",
  "back": "Alternative error paths, such as notifying or logging the failure in the next step.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling"
 },
 {
  "id": "c-1.2f-04",
  "skill": "1.2f",
  "front": "Which run after state triggers when the previous action fails?",
  "back": "has failed.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling"
 },
 {
  "id": "c-1.2f-02",
  "skill": "1.2f",
  "front": "Which two run after states must a Catch Scope select?",
  "back": "has failed and has timed out.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling"
 },
 {
  "id": "c-1.2f-05",
  "skill": "1.2f",
  "front": "Which expression finds the error details in a Catch Scope?",
  "back": "result() with Filter array.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling"
 },
 {
  "id": "c-1.2f-06",
  "skill": "1.2f",
  "front": "Which action stops the flow with a Failed status and a message?",
  "back": "Terminate.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling"
 },
 {
  "id": "c-1.2f-03",
  "skill": "1.2f",
  "front": "Which retry policy is preferred?",
  "back": "Exponential: the interval grows with each retry, rather than fixed.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling"
 },
 {
  "id": "c-1.2f-07",
  "skill": "1.2f",
  "front": "Which two settings do you configure for a retry policy on an action?",
  "back": "Initial interval and maximum number of retries.",
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling"
 },
 {
  "id": "c-1.3a-01",
  "skill": "1.3a",
  "front": "What does End current topic do?",
  "back": "It ends the topic and returns to the one that called it.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-topic-management"
 },
 {
  "id": "c-1.3a-02",
  "skill": "1.3a",
  "front": "Does End all topics clear global variables?",
  "back": "No. Use Clear all variables.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-topic-management"
 },
 {
  "id": "c-1.3a-03",
  "skill": "1.3a",
  "front": "How do actions placed after \"Respond to the agent\" run?",
  "back": "Asynchronously, for up to 30 days.",
  "source": "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/3-call-agent-flows-topics"
 },
 {
  "id": "c-1.3a-04",
  "skill": "1.3a",
  "front": "What kind of flow must an agent flow be to appear in the tool picker?",
  "back": "A solution flow.",
  "source": "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/3-call-agent-flows-topics"
 },
 {
  "id": "c-1.3b-01",
  "skill": "1.3b",
  "front": "Can users type something else when you use quick replies?",
  "back": "Yes, quick replies are only suggestions.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-send-message"
 },
 {
  "id": "c-1.3b-02",
  "skill": "1.3b",
  "front": "How do you force the user to pick from set options?",
  "back": "Use a multiple choice Question node.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-send-message"
 },
 {
  "id": "c-1.3c-01",
  "skill": "1.3c",
  "front": "How many tools can the orchestrator support per agent?",
  "back": "Up to 128.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
 },
 {
  "id": "c-1.3c-02",
  "skill": "1.3c",
  "front": "Do child agents share their parent agent's tool limit?",
  "back": "No. Each child agent has its own orchestration and limit.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
 },
 {
  "id": "c-1.3c-03",
  "skill": "1.3c",
  "front": "Can the orchestrator call the \"Create search query\" or \"Perform custom search\" tools on its own?",
  "back": "No. They work only inside topics.",
  "source": "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/2-call-tools-topics"
 },
 {
  "id": "c-1.3c-04",
  "skill": "1.3c",
  "front": "What form do the results of \"Perform custom search\" take?",
  "back": "Raw, unsummarized results, stored in a variable.",
  "source": "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/2-call-tools-topics"
 },
 {
  "id": "c-1.3d-01",
  "skill": "1.3d",
  "front": "Where do you create a prompt as an agent tool?",
  "back": "Tools > New tool > Prompt.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-prompt-node"
 },
 {
  "id": "c-1.3d-03",
  "skill": "1.3d",
  "front": "Which topic node option creates a new prompt?",
  "back": "Add a tool > New prompt.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-prompt-node"
 },
 {
  "id": "c-1.3d-02",
  "skill": "1.3d",
  "front": "Which model does a prompt use by default?",
  "back": "GPT-4.1 mini (Basic rate).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/prompt-model-settings"
 },
 {
  "id": "c-1.3d-04",
  "skill": "1.3d",
  "front": "What is the temperature range for prompts?",
  "back": "0 to 1.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/prompt-model-settings"
 },
 {
  "id": "c-1.3e-01",
  "skill": "1.3e",
  "front": "What schema does the Custom data field use?",
  "back": "A table with Content, ContentLocation, and Title.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-custom-data"
 },
 {
  "id": "c-1.3e-03",
  "skill": "1.3e",
  "front": "Which column of the Custom data table is required?",
  "back": "Content.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-custom-data"
 },
 {
  "id": "c-1.3e-04",
  "skill": "1.3e",
  "front": "How many Custom data records are used?",
  "back": "Only the first three.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-custom-data"
 },
 {
  "id": "c-1.3e-02",
  "skill": "1.3e",
  "front": "How must Search only selected sources be set to answer only from your own data?",
  "back": "On, with no sources selected.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node"
 },
 {
  "id": "c-1.3e-05",
  "skill": "1.3e",
  "front": "Which two settings must be off to answer only from your own data?",
  "back": "Web search and Allow the AI to use its own general knowledge.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node"
 },
 {
  "id": "c-1.3f-01",
  "skill": "1.3f",
  "front": "What is the default timeout of Send HTTP request?",
  "back": "30 seconds.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node"
 },
 {
  "id": "c-1.3f-02",
  "skill": "1.3f",
  "front": "Which Send HTTP request error option triggers On Error?",
  "back": "Raise an error.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node"
 },
 {
  "id": "c-1.3f-03",
  "skill": "1.3f",
  "front": "What does Continue on error expose in Send HTTP request?",
  "back": "Status code and error body variables.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node"
 },
 {
  "id": "c-1.3g-01",
  "skill": "1.3g",
  "front": "What is the character limit for custom instructions in a Generative answers node?",
  "back": "8,000 characters.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-prompt-modification"
 },
 {
  "id": "c-1.3g-03",
  "skill": "1.3g",
  "front": "What should custom instructions give the agent when no answer exists?",
  "back": "A way out, such as \"reply not found\".",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-prompt-modification"
 },
 {
  "id": "c-1.3g-02",
  "skill": "1.3g",
  "front": "What do selected sources do when Search only selected sources is on?",
  "back": "They replace the agent's sources in that node, with no fallback.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node"
 },
 {
  "id": "c-1.3g-04",
  "skill": "1.3g",
  "front": "What is the default of Search only selected sources?",
  "back": "Off, which searches all sources.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node"
 },
 {
  "id": "c-1.3h-01",
  "skill": "1.3h",
  "front": "Which Adaptive Card schema versions does Copilot Studio support?",
  "back": "1.6 and earlier.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/adaptive-cards-overview"
 },
 {
  "id": "c-1.3h-03",
  "skill": "1.3h",
  "front": "Which Adaptive Card version does Web Chat support?",
  "back": "1.6, without Action.Execute.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/adaptive-cards-overview"
 },
 {
  "id": "c-1.3h-02",
  "skill": "1.3h",
  "front": "How many submit actions does an \"Ask with adaptive card\" node require?",
  "back": "At least one.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-ask-with-adaptive-card"
 },
 {
  "id": "c-1.3h-04",
  "skill": "1.3h",
  "front": "How do you tell consecutive Action.Submit cards apart?",
  "back": "Include a unique identifier in each Action.Submit.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-ask-with-adaptive-card"
 },
 {
  "id": "c-1.3h-05",
  "skill": "1.3h",
  "front": "What do the output variables hold if the user closes an Adaptive Card without selecting \"Submit\"?",
  "back": "They stay empty.",
  "source": "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/4-collect-input-adaptive-cards"
 },
 {
  "id": "c-1.3h-06",
  "skill": "1.3h",
  "front": "In what format does an Input.Date element return its value?",
  "back": "YYYY-MM-DD.",
  "source": "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/4-collect-input-adaptive-cards"
 },
 {
  "id": "c-1.3h-07",
  "skill": "1.3h",
  "front": "What two column names must the table behind a dynamic ChoiceSet have?",
  "back": "title and value.",
  "source": "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/4-collect-input-adaptive-cards"
 },
 {
  "id": "c-1.3i-01",
  "skill": "1.3i",
  "front": "Which variable scope is the default?",
  "back": "Topic.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about"
 },
 {
  "id": "c-1.3i-02",
  "skill": "1.3i",
  "front": "A variable must be usable from every topic in the conversation. Which scope prefix does its name carry?",
  "back": "Global.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about"
 },
 {
  "id": "c-1.3i-03",
  "skill": "1.3i",
  "front": "Which variable scope comes from Power Platform and is read-only?",
  "back": "Environment.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about"
 },
 {
  "id": "c-2.1a-01",
  "skill": "2.1a",
  "front": "How do Copilot connectors make external data available as knowledge?",
  "back": "They copy and index it into Microsoft Graph.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-graph-vs-power-platform-connectors"
 },
 {
  "id": "c-2.1a-03",
  "skill": "2.1a",
  "front": "What does Microsoft Graph indexing of Copilot connectors provide?",
  "back": "ACLs, citations, and semantic search.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-graph-vs-power-platform-connectors"
 },
 {
  "id": "c-2.1a-04",
  "skill": "2.1a",
  "front": "Which preview connector type queries knowledge live without moving data?",
  "back": "Power Platform connectors.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-graph-vs-power-platform-connectors"
 },
 {
  "id": "c-2.1a-02",
  "skill": "2.1a",
  "front": "Which scope does a Copilot connector require when publishing to channels?",
  "back": "ExternalItem.Read.All.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-connectors"
 },
 {
  "id": "c-2.1a-05",
  "skill": "2.1a",
  "front": "Which setting should you turn on with a Microsoft 365 Copilot license in the same tenant?",
  "back": "Tenant graph grounding with semantic search.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-connectors"
 },
 {
  "id": "c-2.1b-01",
  "skill": "2.1b",
  "front": "What is indexed for real-time knowledge with Power Platform connectors?",
  "back": "Only metadata: tables and columns.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-real-time-connectors"
 },
 {
  "id": "c-2.1b-03",
  "skill": "2.1b",
  "front": "Whose token runs real-time knowledge queries?",
  "back": "The user's token, at runtime.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-real-time-connectors"
 },
 {
  "id": "c-2.1b-02",
  "skill": "2.1b",
  "front": "How many public websites can be knowledge sources in generative mode?",
  "back": "25.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
 },
 {
  "id": "c-2.1b-04",
  "skill": "2.1b",
  "front": "What happens with more than 25 distinct knowledge sources?",
  "back": "The orchestrator filters them with an internal GPT.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
 },
 {
  "id": "c-2.1c-01",
  "skill": "2.1c",
  "front": "Which two Azure AI Search authentication types use a key or certificate?",
  "back": "Access Key and Client Certificate Auth.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
 },
 {
  "id": "c-2.1c-04",
  "skill": "2.1c",
  "front": "Which two Azure AI Search authentication types use Microsoft Entra identities?",
  "back": "Service principal and Microsoft Entra ID Integrated.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
 },
 {
  "id": "c-2.1c-02",
  "skill": "2.1c",
  "front": "Which index type does Azure AI Search knowledge require?",
  "back": "A vector index with integrated vectorization.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
 },
 {
  "id": "c-2.1c-05",
  "skill": "2.1c",
  "front": "How many vector indexes can one Azure AI Search connection have?",
  "back": "Only one.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
 },
 {
  "id": "c-2.1c-06",
  "skill": "2.1c",
  "front": "What must you set up in Azure first for Azure AI Search knowledge?",
  "back": "The semantic ranker.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
 },
 {
  "id": "c-2.1c-03",
  "skill": "2.1c",
  "front": "Which index field is used as the citation if it exists?",
  "back": "metadata_storage_path.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
 },
 {
  "id": "c-2.1c-07",
  "skill": "2.1c",
  "front": "Which other field can supply the Azure AI Search citation?",
  "back": "Any field with a full URL.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
 },
 {
  "id": "c-2.1c-08",
  "skill": "2.1c",
  "front": "Which Azure AI Search authentication type does Microsoft recommend?",
  "back": "Microsoft Entra ID Integrated.",
  "source": "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/5-connect-azure-ai-search"
 },
 {
  "id": "c-2.1c-09",
  "skill": "2.1c",
  "front": "What must you use to add Azure AI Search, rather than typing the endpoint and key by hand?",
  "back": "Create new connection.",
  "source": "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/5-connect-azure-ai-search"
 },
 {
  "id": "c-2.1c-10",
  "skill": "2.1c",
  "front": "What can a connection made by typing the endpoint and key by hand block?",
  "back": "Every agent in that environment from adding Azure AI Search.",
  "source": "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/5-connect-azure-ai-search"
 },
 {
  "id": "c-2.2a-01",
  "skill": "2.2a",
  "front": "Which preview Computer use option is for experimentation, with no desktop apps?",
  "back": "Hosted browser.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-where-computer-use-runs"
 },
 {
  "id": "c-2.2a-05",
  "skill": "2.2a",
  "front": "What do you need to run Computer use on your own machine?",
  "back": "Power Automate for desktop 2.61.132.25266+, registered, with Enable for computer use.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-where-computer-use-runs"
 },
 {
  "id": "c-2.2a-02",
  "skill": "2.2a",
  "front": "How many Copilot Credits per step does Computer use cost with standard models?",
  "back": "5.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
 },
 {
  "id": "c-2.2a-06",
  "skill": "2.2a",
  "front": "How many Copilot Credits per step does Computer use cost with premium models?",
  "back": "15 (Opus 4.6).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
 },
 {
  "id": "c-2.2a-03",
  "skill": "2.2a",
  "front": "Which Computer use models are GA?",
  "back": "OpenAI CUA and Anthropic Claude Sonnet 4.5.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
 },
 {
  "id": "c-2.2a-07",
  "skill": "2.2a",
  "front": "Which Computer use models are experimental?",
  "back": "Sonnet 4.6 and Opus 4.6.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
 },
 {
  "id": "c-2.2a-04",
  "skill": "2.2a",
  "front": "What does human supervision do in Computer use?",
  "back": "It sends an Outlook email to the reviewer.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
 },
 {
  "id": "c-2.2a-08",
  "skill": "2.2a",
  "front": "Whose credentials does Computer use run with by default?",
  "back": "The maker's credentials.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
 },
 {
  "id": "c-2.2a-09",
  "skill": "2.2a",
  "front": "Which kind of screen favors RPA with Power Automate desktop over Computer use?",
  "back": "A stable screen with simple rules.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/2-explore-integration-landscape"
 },
 {
  "id": "c-2.2b-01",
  "skill": "2.2b",
  "front": "Which MCP transport does Copilot Studio support?",
  "back": "Only Streamable HTTP.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
 },
 {
  "id": "c-2.2b-05",
  "skill": "2.2b",
  "front": "When did Copilot Studio stop supporting SSE for MCP?",
  "back": "August 2025.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
 },
 {
  "id": "c-2.2b-02",
  "skill": "2.2b",
  "front": "Which three authentication types does the MCP wizard support?",
  "back": "None, API key, or OAuth 2.0.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
 },
 {
  "id": "c-2.2b-06",
  "skill": "2.2b",
  "front": "Which MCP OAuth 2.0 option uses DCR plus discovery?",
  "back": "Dynamic discovery.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
 },
 {
  "id": "c-2.2b-07",
  "skill": "2.2b",
  "front": "Which MCP OAuth 2.0 option needs client ID, secret, URLs, and scopes?",
  "back": "Manual.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
 },
 {
  "id": "c-2.2b-03",
  "skill": "2.2b",
  "front": "Which file exposes MCP through a custom connector?",
  "back": "An OpenAPI file (Swagger 2.0).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
 },
 {
  "id": "c-2.2b-08",
  "skill": "2.2b",
  "front": "Which extension marks the operation as MCP in the OpenAPI file?",
  "back": "x-ms-agentic-protocol: mcp-streamable-1.0.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
 },
 {
  "id": "c-2.2b-04",
  "skill": "2.2b",
  "front": "How do you pick MCP tools one by one?",
  "back": "Turn off Allow all.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-components-to-agent"
 },
 {
  "id": "c-2.2b-09",
  "skill": "2.2b",
  "front": "When does the agent use an MCP resource?",
  "back": "Only if the owner sets it up as the output of an MCP tool.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-components-to-agent"
 },
 {
  "id": "c-2.2b-10",
  "skill": "2.2b",
  "front": "What happens to tools that an MCP server adds later, while \"Allow all\" is on?",
  "back": "They are enabled automatically.",
  "source": "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/5-enable-manage-mcp-tools"
 },
 {
  "id": "c-2.2b-11",
  "skill": "2.2b",
  "front": "Where must an MCP tool's description be changed, since Copilot Studio treats it as read-only?",
  "back": "On the MCP server, by its owner.",
  "source": "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/5-enable-manage-mcp-tools"
 },
 {
  "id": "c-2.2b-12",
  "skill": "2.2b",
  "front": "Who supplies the API key when an MCP server uses API key authentication?",
  "back": "Each user, the first time they use the tool.",
  "source": "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/4-configure-mcp-authentication"
 },
 {
  "id": "c-2.2c-01",
  "skill": "2.2c",
  "front": "From which sources can you create a custom connector?",
  "back": "An OpenAPI definition (Swagger 2.0), a Postman collection, or scratch.",
  "source": "https://learn.microsoft.com/en-us/connectors/custom-connectors/"
 },
 {
  "id": "c-2.2c-03",
  "skill": "2.2c",
  "front": "Which authentication types does a custom connector support?",
  "back": "OAuth 2.0, Basic, or API key.",
  "source": "https://learn.microsoft.com/en-us/connectors/custom-connectors/"
 },
 {
  "id": "c-2.2c-02",
  "skill": "2.2c",
  "front": "What do you import first for an agent that uses a custom connector?",
  "back": "The custom connector, in a separate solution.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export"
 },
 {
  "id": "c-2.2c-04",
  "skill": "2.2c",
  "front": "What happens if the custom connector is not imported first?",
  "back": "The import fails or the flows do not turn on.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export"
 },
 {
  "id": "c-2.2d-01",
  "skill": "2.2d",
  "front": "Which specification format does the REST API tool (preview) use?",
  "back": "OpenAPI in JSON, version 2.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api"
 },
 {
  "id": "c-2.2d-04",
  "skill": "2.2d",
  "front": "What happens to an OpenAPI v3 specification in the REST API tool?",
  "back": "It is translated to v2.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api"
 },
 {
  "id": "c-2.2d-02",
  "skill": "2.2d",
  "front": "Which authentication options does the REST API tool offer?",
  "back": "None, API key, or OAuth 2.0.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api"
 },
 {
  "id": "c-2.2d-05",
  "skill": "2.2d",
  "front": "Which API key details do you set in the REST API tool?",
  "back": "Label, name, and location (Header or Query).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api"
 },
 {
  "id": "c-2.2d-03",
  "skill": "2.2d",
  "front": "Which option is reusable in flows, apps, and agents through connections?",
  "back": "A custom connector.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
 },
 {
  "id": "c-2.2d-06",
  "skill": "2.2d",
  "front": "Where is a REST API tool defined?",
  "back": "In the agent, where you choose the operations.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
 },
 {
  "id": "c-2.2d-07",
  "skill": "2.2d",
  "front": "Which option is a topic node that the orchestrator never selects?",
  "back": "Send HTTP request.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
 },
 {
  "id": "c-2.3a-01",
  "skill": "2.3a",
  "front": "Which agent type is lightweight, lives inside the agent, and has no deployment of its own?",
  "back": "A child agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "c-2.3a-04",
  "skill": "2.3a",
  "front": "Which agent type has its own publishing, model, and ALM, and is reusable?",
  "back": "A connected agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "c-2.3a-05",
  "skill": "2.3a",
  "front": "Where must a connected agent live relative to the main agent?",
  "back": "In the same environment, as a Copilot Studio agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "c-2.3a-02",
  "skill": "2.3a",
  "front": "At about how many tools, topics, or agents should you consider splitting an agent?",
  "back": "More than about 30-40.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "c-2.3a-06",
  "skill": "2.3a",
  "front": "Besides size, which three situations favor splitting an agent?",
  "back": "Similar descriptions, several teams, or separate publishing or channels.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "c-2.3a-03",
  "skill": "2.3a",
  "front": "Can a main agent that has connected agents be a connected agent of another?",
  "back": "No.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "c-2.3a-07",
  "skill": "2.3a",
  "front": "Which main agent setting do child and connected agents respect?",
  "back": "Use general knowledge.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "c-2.3a-08",
  "skill": "2.3a",
  "front": "Which trigger comes first in the built-in order for child agents?",
  "back": "An activity occurs.",
  "source": "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/4-configure-child-agent-inputs-outputs-triggers"
 },
 {
  "id": "c-2.3a-09",
  "skill": "2.3a",
  "front": "When two child agents share a trigger tier and have no Priority set, which runs first?",
  "back": "The oldest one.",
  "source": "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/4-configure-child-agent-inputs-outputs-triggers"
 },
 {
  "id": "c-2.3a-10",
  "skill": "2.3a",
  "front": "In a child agent's \"Priority\" setting, what does a lower number mean?",
  "back": "A higher priority.",
  "source": "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/4-configure-child-agent-inputs-outputs-triggers"
 },
 {
  "id": "c-2.3a-11",
  "skill": "2.3a",
  "front": "Which coordination pattern lets the main agent choose a connected agent at runtime?",
  "back": "Orchestrator/subagent.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/4-select-multi-agent-orchestration-pattern"
 },
 {
  "id": "c-2.3a-12",
  "skill": "2.3a",
  "front": "In the workflow-oriented pattern, which mode runs agents in parallel for quorum or voting?",
  "back": "Concurrent.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/4-select-multi-agent-orchestration-pattern"
 },
 {
  "id": "c-2.3a-13",
  "skill": "2.3a",
  "front": "Before splitting an agent, what should you try first if requests reach the wrong capability?",
  "back": "Make the descriptions and instructions more distinct.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/4-select-multi-agent-orchestration-pattern"
 },
 {
  "id": "c-2.3a-14",
  "skill": "2.3a",
  "front": "On the Microsoft Copilot harness, which connected agent type is the only one currently available?",
  "back": "A connected Copilot Studio agent.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/3-design-agent-organization"
 },
 {
  "id": "c-2.3a-15",
  "skill": "2.3a",
  "front": "On the Microsoft Copilot harness, what should you use inside one agent instead of a child agent?",
  "back": "Instructions, a skill, or a tool.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/3-design-agent-organization"
 },
 {
  "id": "c-2.3b-01",
  "skill": "2.3b",
  "front": "Which two values do you need to connect a Foundry agent (preview)?",
  "back": "The Foundry project endpoint and the Agent Id.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent"
 },
 {
  "id": "c-2.3b-03",
  "skill": "2.3b",
  "front": "What error appears for an agent that comes from the old Foundry portal?",
  "back": "404 Version not found.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent"
 },
 {
  "id": "c-2.3b-04",
  "skill": "2.3b",
  "front": "Which endpoint must a Foundry agent have enabled to connect?",
  "back": "The Activity protocol endpoint.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent"
 },
 {
  "id": "c-2.3b-02",
  "skill": "2.3b",
  "front": "How can you enable the Foundry Activity protocol endpoint?",
  "back": "Only with the REST API or the Python SDK.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent"
 },
 {
  "id": "c-2.3b-05",
  "skill": "2.3b",
  "front": "What error occurs if the Activity protocol endpoint is missing?",
  "back": "400 \"endpoint does not support activity\".",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent"
 },
 {
  "id": "c-2.3c-01",
  "skill": "2.3c",
  "front": "How does the orchestrator pick a connected agent?",
  "back": "By its description.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "c-2.3c-02",
  "skill": "2.3c",
  "front": "Which topic node can invoke a connected agent?",
  "back": "A Redirect node.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "c-2.3c-03",
  "skill": "2.3c",
  "front": "Which setting on the agent's General page must be on before other agents can connect to it?",
  "back": "Let other agents connect to and use this one.",
  "source": "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/3-connect-copilot-studio-agent"
 },
 {
  "id": "c-2.3c-04",
  "skill": "2.3c",
  "front": "Does the main agent's copy of a connected agent's description update when the source agent changes?",
  "back": "No. The copy is local and does not sync.",
  "source": "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/6-manage-test-connected-agent-solution"
 },
 {
  "id": "c-2.3c-05",
  "skill": "2.3c",
  "front": "Is the \"pass conversation history to this agent\" option on or off by default?",
  "back": "On.",
  "source": "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/3-connect-copilot-studio-agent"
 },
 {
  "id": "c-2.3d-01",
  "skill": "2.3d",
  "front": "What minimum capacity does a Fabric data agent need?",
  "back": "Paid F2 or higher.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent"
 },
 {
  "id": "c-2.3d-04",
  "skill": "2.3d",
  "front": "How many sources can a Fabric data agent have?",
  "back": "Up to 5.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent"
 },
 {
  "id": "c-2.3d-02",
  "skill": "2.3d",
  "front": "What access does a Fabric data agent have to data?",
  "back": "Read-only.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent"
 },
 {
  "id": "c-2.3d-05",
  "skill": "2.3d",
  "front": "What is the maximum answer size of a Fabric data agent?",
  "back": "25 rows by 25 columns.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent"
 },
 {
  "id": "c-2.3d-06",
  "skill": "2.3d",
  "front": "Which language does a Fabric data agent support?",
  "back": "English only.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent"
 },
 {
  "id": "c-2.3d-03",
  "skill": "2.3d",
  "front": "Can a Fabric data agent be the target of a Redirect node?",
  "back": "No.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent"
 },
 {
  "id": "c-2.3d-07",
  "skill": "2.3d",
  "front": "When does a Fabric data agent not work in Copilot Studio?",
  "back": "If the main agent is deployed in Microsoft Copilot.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent"
 },
 {
  "id": "c-2.3e-01",
  "skill": "2.3e",
  "front": "Which URL do you enter for an A2A agent?",
  "back": "The agent's endpoint URL, not the agent card URL.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "c-2.3e-04",
  "skill": "2.3e",
  "front": "When do A2A name and description fill in automatically?",
  "back": "When /.well-known/agent.json is valid.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "c-2.3e-02",
  "skill": "2.3e",
  "front": "Which authentication types does A2A support?",
  "back": "None, API key, or OAuth 2.0.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "c-2.3e-05",
  "skill": "2.3e",
  "front": "Besides chat history, which three values does the A2A payload include?",
  "back": "contextId, message IDs, and locale.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "c-2.3e-03",
  "skill": "2.3e",
  "front": "Which tool exposes a local A2A agent for testing?",
  "back": "Dev Tunnels.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "c-2.3e-06",
  "skill": "2.3e",
  "front": "What do you do with the port in Dev Tunnels for A2A testing?",
  "back": "Make it public.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "c-2.4a-01",
  "skill": "2.4a",
  "front": "Where do you add Azure OpenAI \"on your data\" (preview) in a Generative answers node?",
  "back": "Data source > Classic data > Add connection to an Azure OpenAI Service.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-azure-openai"
 },
 {
  "id": "c-2.4a-03",
  "skill": "2.4a",
  "front": "A Generative answers node has its own knowledge sources set. What happens to the agent's sources?",
  "back": "The node's sources take priority.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-azure-openai"
 },
 {
  "id": "c-2.4a-02",
  "skill": "2.4a",
  "front": "Where do you add Azure AI Search as knowledge from the agent?",
  "back": "Add knowledge, on the Overview or Knowledge page.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
 },
 {
  "id": "c-2.4a-04",
  "skill": "2.4a",
  "front": "How can you add Azure AI Search from a Generative answers node?",
  "back": "Properties > Featured > Azure AI Search.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
 },
 {
  "id": "c-2.4b-01",
  "skill": "2.4b",
  "front": "Which endpoint path must a Foundry model in prompts end with?",
  "back": "/chat/completions.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts"
 },
 {
  "id": "c-2.4b-04",
  "skill": "2.4b",
  "front": "What error does a /openai/v1/responses endpoint cause in prompts?",
  "back": "\"Resource not found\".",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts"
 },
 {
  "id": "c-2.4b-02",
  "skill": "2.4b",
  "front": "Which model families does BYOM in prompts not support?",
  "back": "The GPT-5 family and later.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts"
 },
 {
  "id": "c-2.4b-05",
  "skill": "2.4b",
  "front": "How do you connect a Foundry model from a prompt?",
  "back": "Model > + > Connect a model from Azure AI Foundry.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts"
 },
 {
  "id": "c-2.4b-03",
  "skill": "2.4b",
  "front": "Where is BYOM usage billed?",
  "back": "Separately in Azure, not at Copilot Studio rates.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts"
 },
 {
  "id": "c-2.4b-06",
  "skill": "2.4b",
  "front": "Which connector governs BYOM in data policies?",
  "back": "The Azure AI Foundry connector, in the Power Platform admin center.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts"
 },
 {
  "id": "c-2.4c-01",
  "skill": "2.4c",
  "front": "Where do you set up Application Insights in Copilot Studio?",
  "back": "Settings > Advanced > Application Insights > Connection string.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry"
 },
 {
  "id": "c-2.4c-05",
  "skill": "2.4c",
  "front": "Besides Enable logging, which three toggles does Application Insights offer?",
  "back": "Log conversation details, Log sensitive Activity properties, and Node execution events.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry"
 },
 {
  "id": "c-2.4c-02",
  "skill": "2.4c",
  "front": "Which Application Insights table holds Copilot Studio events?",
  "back": "customEvents.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry"
 },
 {
  "id": "c-2.4c-06",
  "skill": "2.4c",
  "front": "Which KQL filter excludes test conversations?",
  "back": "where customDimensions['designMode'] == \"False\".",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry"
 },
 {
  "id": "c-2.4c-03",
  "skill": "2.4c",
  "front": "Where is the Copilot Studio Dashboard (preview)?",
  "back": "A workbook in Application Insights > Monitoring > Workbooks.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry"
 },
 {
  "id": "c-2.4c-07",
  "skill": "2.4c",
  "front": "What role do users need to share the Copilot Studio Dashboard?",
  "back": "At least Reader on the connected Application Insights resource.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry"
 },
 {
  "id": "c-2.4c-04",
  "skill": "2.4c",
  "front": "Who sets up agent telemetry?",
  "back": "The maker.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/telemetry-overview"
 },
 {
  "id": "c-2.4c-08",
  "skill": "2.4c",
  "front": "Who sets up environment telemetry (preview), and how often?",
  "back": "An admin, once.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/telemetry-overview"
 },
 {
  "id": "c-3.1a-01",
  "skill": "3.1a",
  "front": "How many cases can a single-response test set hold?",
  "back": "Up to 100.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create"
 },
 {
  "id": "c-3.1a-04",
  "skill": "3.1a",
  "front": "How long are evaluation results kept?",
  "back": "89 days.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create"
 },
 {
  "id": "c-3.1a-02",
  "skill": "3.1a",
  "front": "How many test cases can a conversation test set hold?",
  "back": "Up to 20.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-multi-turn"
 },
 {
  "id": "c-3.1a-05",
  "skill": "3.1a",
  "front": "Which test method that compares the answer character by character is not available in conversation (multi-turn) test sets?",
  "back": "Exact match.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-multi-turn"
 },
 {
  "id": "c-3.1a-03",
  "skill": "3.1a",
  "front": "How many questions does Quick question set generate?",
  "back": "10, from the agent description.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create"
 },
 {
  "id": "c-3.1a-06",
  "skill": "3.1a",
  "front": "What does Full question set generate questions from?",
  "back": "Knowledge or topics.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create"
 },
 {
  "id": "c-3.1b-01",
  "skill": "3.1b",
  "front": "What is the default pass score for Compare meaning?",
  "back": "50.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
 },
 {
  "id": "c-3.1b-05",
  "skill": "3.1b",
  "front": "What scale does Text similarity use?",
  "back": "Cosine, from 0 to 1.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
 },
 {
  "id": "c-3.1b-06",
  "skill": "3.1b",
  "front": "Which two modes does Keyword match offer?",
  "back": "Any or All.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
 },
 {
  "id": "c-3.1b-02",
  "skill": "3.1b",
  "front": "Which method fits the same intent with different wording?",
  "back": "Compare meaning.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
 },
 {
  "id": "c-3.1b-07",
  "skill": "3.1b",
  "front": "Which method compares character by character, for codes or numbers?",
  "back": "Exact match.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
 },
 {
  "id": "c-3.1b-03",
  "skill": "3.1b",
  "front": "What does a Content safety severity threshold of 0 mean?",
  "back": "The strictest setting.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
 },
 {
  "id": "c-3.1b-08",
  "skill": "3.1b",
  "front": "What does a Content safety severity threshold of 7 mean?",
  "back": "The most permissive setting.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
 },
 {
  "id": "c-3.1b-04",
  "skill": "3.1b",
  "front": "What does the General quality method (LLM) score?",
  "back": "Relevance, groundedness, completeness, and abstention.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
 },
 {
  "id": "c-3.1b-09",
  "skill": "3.1b",
  "front": "Which method handles expected refusals?",
  "back": "The Custom method.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
 },
 {
  "id": "c-3.1c-01",
  "skill": "3.1c",
  "front": "Which evaluation case result means the expected response, keyword, or tool is missing?",
  "back": "Invalid.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results"
 },
 {
  "id": "c-3.1c-03",
  "skill": "3.1c",
  "front": "Besides Pass, Fail, and Invalid, which result can an evaluation case have?",
  "back": "Error.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results"
 },
 {
  "id": "c-3.1c-02",
  "skill": "3.1c",
  "front": "Which feature compares two runs of the same test set?",
  "back": "Compare with.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results"
 },
 {
  "id": "c-3.1c-04",
  "skill": "3.1c",
  "front": "What does Show activity map show?",
  "back": "The decisions and resources used.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results"
 },
 {
  "id": "c-3.2a-01",
  "skill": "3.2a",
  "front": "What is an unmanaged solution used for?",
  "back": "Development.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm"
 },
 {
  "id": "c-3.2a-04",
  "skill": "3.2a",
  "front": "Can you import a managed solution into its unmanaged source environment?",
  "back": "No.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm"
 },
 {
  "id": "c-3.2a-02",
  "skill": "3.2a",
  "front": "Which publisher should you use for your components?",
  "back": "Your own, not the default.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm"
 },
 {
  "id": "c-3.2a-05",
  "skill": "3.2a",
  "front": "What is the preferred solution?",
  "back": "The solution where new agents are created by default.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm"
 },
 {
  "id": "c-3.2a-03",
  "skill": "3.2a",
  "front": "Can you export a managed solution?",
  "back": "No.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export"
 },
 {
  "id": "c-3.2a-06",
  "skill": "3.2a",
  "front": "Which topic names block solution export?",
  "back": "Names with dots.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export"
 },
 {
  "id": "c-3.2b-01",
  "skill": "3.2b",
  "front": "How do you add an existing agent to a solution?",
  "back": "Add existing > Agent > Agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export"
 },
 {
  "id": "c-3.2b-03",
  "skill": "3.2b",
  "front": "How do you add topics or flows created after adding the agent?",
  "back": "Advanced > Add required objects.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-import-export"
 },
 {
  "id": "c-3.2b-02",
  "skill": "3.2b",
  "front": "What does a direct change in the environment create on a managed agent?",
  "back": "An unmanaged layer.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-overview"
 },
 {
  "id": "c-3.2b-04",
  "skill": "3.2b",
  "front": "How do you remove an unmanaged layer from an agent?",
  "back": "Advanced > See solution layers, select the layer, then Remove unmanaged layer.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-overview"
 },
 {
  "id": "c-3.2c-01",
  "skill": "3.2c",
  "front": "Which environment variable type stores Yes/No values?",
  "back": "Two options.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables"
 },
 {
  "id": "c-3.2c-06",
  "skill": "3.2c",
  "front": "What is the maximum length of an environment variable value?",
  "back": "2,000 characters.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables"
 },
 {
  "id": "c-3.2c-02",
  "skill": "3.2c",
  "front": "What is the current value of an environment variable?",
  "back": "The environment's own value, used even if a default exists.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables"
 },
 {
  "id": "c-3.2c-07",
  "skill": "3.2c",
  "front": "Which environment variable value travels with the solution?",
  "back": "The definition with its default value.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables"
 },
 {
  "id": "c-3.2c-03",
  "skill": "3.2c",
  "front": "Which resource provider must be registered for Secret variables?",
  "back": "Microsoft.PowerPlatform, in the subscription.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-azure-key-vault-secrets"
 },
 {
  "id": "c-3.2c-08",
  "skill": "3.2c",
  "front": "Which Key Vault role do the user and Dataverse need?",
  "back": "Key Vault Secrets User.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-azure-key-vault-secrets"
 },
 {
  "id": "c-3.2c-04",
  "skill": "3.2c",
  "front": "Which tag allows a specific agent to use a Secret?",
  "back": "AllowedBots = {envId}/{schemaName}.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-azure-key-vault-secrets"
 },
 {
  "id": "c-3.2c-09",
  "skill": "3.2c",
  "front": "Which tag allows a whole environment to use a Secret?",
  "back": "AllowedEnvironments = the environment ID.",
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-azure-key-vault-secrets"
 },
 {
  "id": "c-3.2c-05",
  "skill": "3.2c",
  "front": "What must you do after changing an environment variable's value?",
  "back": "Republish the agent.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about"
 },
 {
  "id": "c-3.2c-10",
  "skill": "3.2c",
  "front": "Which variable type does not need republishing after a change?",
  "back": "Secret, which is fetched at runtime.",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about"
 },
 {
  "id": "c-3.2d-01",
  "skill": "3.2d",
  "front": "Must the pipelines host environment be a Managed Environment?",
  "back": "No, but it must be a production environment.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines"
 },
 {
  "id": "c-3.2d-06",
  "skill": "3.2d",
  "front": "Which other pipeline environments must be Managed Environments?",
  "back": "All others, with premium licenses.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines"
 },
 {
  "id": "c-3.2d-02",
  "skill": "3.2d",
  "front": "Which solutions can pipelines deploy?",
  "back": "Only managed ones.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines"
 },
 {
  "id": "c-3.2d-07",
  "skill": "3.2d",
  "front": "What do pipelines validate beforehand?",
  "back": "Connections, connection references, and variables.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines"
 },
 {
  "id": "c-3.2d-03",
  "skill": "3.2d",
  "front": "What are the two pipeline security roles?",
  "back": "Deployment Pipeline Administrator and Deployment Pipeline User.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines"
 },
 {
  "id": "c-3.2d-08",
  "skill": "3.2d",
  "front": "Where do pipelines run from?",
  "back": "An unmanaged solution in the development environment.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines"
 },
 {
  "id": "c-3.2d-09",
  "skill": "3.2d",
  "front": "Which command group manages pipelines from the CLI?",
  "back": "pac pipeline.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines"
 },
 {
  "id": "c-3.2d-04",
  "skill": "3.2d",
  "front": "Which three gated extensions exist for pipelines?",
  "back": "Pre-export, \"Is delegated deployment\", and Pre-deployment.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/extend-pipelines"
 },
 {
  "id": "c-3.2d-10",
  "skill": "3.2d",
  "front": "Which trigger and which action belong to the \"Is delegated deployment\" extension?",
  "back": "The trigger OnApprovalStarted and the action UpdateApprovalStatus.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/extend-pipelines"
 },
 {
  "id": "c-3.2d-05",
  "skill": "3.2d",
  "front": "Who deploys in delegated deployment, after approval?",
  "back": "A service principal or the stage owner.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/delegated-deployments-setup"
 },
 {
  "id": "c-3.2d-11",
  "skill": "3.2d",
  "front": "Which role does the delegated service principal need on the host?",
  "back": "Deployment Pipeline Administrator.",
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/delegated-deployments-setup"
 },
 {
  "id": "c-1.1b-06",
  "skill": "1.1b",
  "front": "When does Copilot Studio create the Microsoft Entra Agent ID for an agent?",
  "back": "When the agent is created, automatically. It is not created at publish.",
  "source": "https://learn.microsoft.com/microsoft-copilot-studio/govern-agents-identities-overview"
 },
 {
  "id": "c-1.1e-11",
  "skill": "1.1e",
  "front": "How many zones does zoned governance use to sort agents?",
  "back": "Three, by purpose and risk: citizen, partnered, and professional.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-governance-security-strategy-copilot-studio/3-zoned-governance-strategy"
 },
 {
  "id": "c-1.1f-03",
  "skill": "1.1f",
  "front": "What is a skill on the Microsoft Copilot harness?",
  "back": "A name, a description, and Markdown instructions that the orchestrator activates when a request matches the description.",
  "source": "https://learn.microsoft.com/en-us/training/modules/design-reusable-behavior-skills-copilot-studio/2-position-skills-github-copilot-component-model"
 },
 {
  "id": "c-1.2d-03",
  "skill": "1.2d",
  "front": "Which harness bills Copilot Credits from build time as well as at runtime?",
  "back": "The Microsoft Copilot harness: authoring, previewing, and evaluating also use credits.",
  "source": "https://learn.microsoft.com/en-us/training/modules/manage-usage-cost-agents-copilot-studio/2-compare-billing-models"
 },
 {
  "id": "c-2.4a-05",
  "skill": "2.4a",
  "front": "How many Foundry IQ connections can one agent have?",
  "back": "Only one.",
  "source": "https://learn.microsoft.com/en-us/training/modules/connect-agents-microsoft-iq-github-copilot/3-connect-foundry-iq-knowledge-base"
 },
 {
  "id": "c-2.2b-13",
  "skill": "2.2b",
  "front": "Is Work IQ read-only or read-write by default?",
  "back": "Read-only, unless an admin turns on write operations in the Microsoft 365 admin center.",
  "source": "https://learn.microsoft.com/en-us/training/modules/connect-agents-microsoft-iq-github-copilot/5-connect-work-iq-microsoft-365-context"
 },
 {
  "id": "c-3.1a-07",
  "skill": "3.1a",
  "front": "What is the maximum CSV size for a test set on the Evaluate tab of the Microsoft Copilot harness?",
  "back": "5 MB.",
  "source": "https://learn.microsoft.com/en-us/training/modules/evaluate-agents-github-copilot/2-create-test-set-conversations"
 },
 {
  "id": "c-3.1b-10",
  "skill": "3.1b",
  "front": "Which test method is the only one on the Evaluate tab of the Microsoft Copilot harness today?",
  "back": "General quality.",
  "source": "https://learn.microsoft.com/en-us/training/modules/evaluate-agents-github-copilot/2-create-test-set-conversations"
 },
 {
  "id": "c-1.1a-07",
  "skill": "1.1a",
  "front": "What happened to the name \"GitHub Copilot harness\" on 28 October 2026?",
  "back": "It was renamed Microsoft Copilot harness (same harness; Learn and the exam may still use the old name).",
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview"
 }
];
