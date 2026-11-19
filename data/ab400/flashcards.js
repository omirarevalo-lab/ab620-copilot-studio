// AB-400 flashcards (34, one fact each, English). Same schema as data/flashcards.js.
window.AB620_CARDS = [
 {
  "id": "c-3.1a-01",
  "skill": "3.1a",
  "front": "Which four stages does a Dataverse message pass through, in order?",
  "back": "PreValidation (10), PreOperation (20), MainOperation (30), PostOperation (40).",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/event-framework"
 },
 {
  "id": "c-3.1a-02",
  "skill": "3.1a",
  "front": "Which stage is the usual place to cancel an operation with InvalidPluginExecutionException?",
  "back": "PreValidation, in a synchronous step.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/event-framework"
 },
 {
  "id": "c-3.1a-03",
  "skill": "3.1a",
  "front": "Which is the only stage that allows asynchronous steps?",
  "back": "PostOperation.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/event-framework"
 },
 {
  "id": "c-3.1a-04",
  "skill": "3.1a",
  "front": "Do asynchronous steps run inside the database transaction?",
  "back": "No. They run outside it, so a failed async step leaves the saved row saved.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/event-framework"
 },
 {
  "id": "c-3.1a-05",
  "skill": "3.1a",
  "front": "Which parameter collection can only be read in PostOperation steps?",
  "back": "OutputParameters, filled after the database transaction.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/event-framework"
 },
 {
  "id": "c-3.1b-01",
  "skill": "3.1b",
  "front": "Which interface does a plug-in class implement, and what is its one method?",
  "back": "IPlugin, with one method: Execute(IServiceProvider).",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/write-plug-in"
 },
 {
  "id": "c-3.1b-02",
  "skill": "3.1b",
  "front": "Why must a plug-in class keep no state in its fields?",
  "back": "The platform caches and reuses one instance, so fields would be shared between calls.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/write-plug-in"
 },
 {
  "id": "c-3.1b-03",
  "skill": "3.1b",
  "front": "Which API must not be used inside a plug-in?",
  "back": "The Web API, because it is not supported.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/write-plug-in"
 },
 {
  "id": "c-3.1b-04",
  "skill": "3.1b",
  "front": "Which exception is the only one that controls the message the user sees?",
  "back": "InvalidPluginExecutionException.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/write-plug-in"
 },
 {
  "id": "c-3.1b-05",
  "skill": "3.1b",
  "front": "Which entity image is not available on a Create step?",
  "back": "The Pre Image.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/write-plug-in"
 },
 {
  "id": "c-3.1c-01",
  "skill": "3.1c",
  "front": "What is the hard time limit for a whole Dataverse operation, including all plug-ins?",
  "back": "Two minutes. Otherwise the operation is rolled back.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/analyze-performance"
 },
 {
  "id": "c-3.1c-02",
  "skill": "3.1c",
  "front": "What is Microsoft's guidance for how long your own plug-in should take?",
  "back": "No more than two seconds. It is guidance, not the platform limit.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/analyze-performance"
 },
 {
  "id": "c-3.1c-03",
  "skill": "3.1c",
  "front": "Which two Organization requests must you avoid inside a plug-in?",
  "back": "ExecuteMultipleRequest and ExecuteTransactionRequest.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/analyze-performance"
 },
 {
  "id": "c-3.1c-04",
  "skill": "3.1c",
  "front": "What does an Update step with no filtering attributes run on?",
  "back": "Every update, to any column of the table.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/analyze-performance"
 },
 {
  "id": "c-3.1d-01",
  "skill": "3.1d",
  "front": "Which HTTP method calls a custom API function, and which calls an action?",
  "back": "Function: GET. Action: POST.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api"
 },
 {
  "id": "c-3.1d-02",
  "skill": "3.1d",
  "front": "Can you change a custom API from function to action after creating it?",
  "back": "No. You cannot change it, in either direction.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api"
 },
 {
  "id": "c-3.1d-03",
  "skill": "3.1d",
  "front": "Which Binding Type gives an automatic Target parameter of type EntityReference?",
  "back": "Entity, which binds to one row.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api"
 },
 {
  "id": "c-3.1d-04",
  "skill": "3.1d",
  "front": "What are the Allowed Custom Processing Step Type options?",
  "back": "None, Async Only, or Sync and Async.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api"
 },
 {
  "id": "c-3.1d-05",
  "skill": "3.1d",
  "front": "What does Is Private do to a custom API?",
  "back": "Hides it from $metadata and code generation, but does not block callers who know the name.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api"
 },
 {
  "id": "c-3.1e-01",
  "skill": "3.1e",
  "front": "What command opens the Plug-in Registration tool?",
  "back": "pac tool prt.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in"
 },
 {
  "id": "c-3.1e-02",
  "skill": "3.1e",
  "front": "What can happen to steps with the same Execution Order, stage, table and message?",
  "back": "They can run in a random order, so set distinct values.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in"
 },
 {
  "id": "c-3.1e-03",
  "skill": "3.1e",
  "front": "Are Secure Configuration values included when you export a solution?",
  "back": "No. Secure Configuration is not included in the export.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in"
 },
 {
  "id": "c-3.1e-04",
  "skill": "3.1e",
  "front": "Does removing a plug-in assembly from a solution also remove its steps?",
  "back": "No. Assemblies and steps are separate solution components.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in"
 },
 {
  "id": "c-3.1f-01",
  "skill": "3.1f",
  "front": "Can you use Create, Update and Delete in the 'When an action is performed' trigger?",
  "back": "No. Use 'When a row is added, modified or deleted' for row changes.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api"
 },
 {
  "id": "c-3.1f-02",
  "skill": "3.1f",
  "front": "When are subscribers to a business event notified?",
  "back": "Only after the operation completes successfully.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api"
 },
 {
  "id": "c-3.1f-03",
  "skill": "3.1f",
  "front": "What must you add a business event to, before exposing it to others?",
  "back": "The event catalog.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api"
 },
 {
  "id": "c-3.1f-04",
  "skill": "3.1f",
  "front": "Is using business events to move data a correct use?",
  "back": "No. They notify automation; moving data with them is a misuse.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api"
 },
 {
  "id": "c-3.1g-01",
  "skill": "3.1g",
  "front": "Which interface requests a token in a plug-in using managed identity?",
  "back": "IManagedIdentityService, through AcquireToken with a list of scopes.",
  "source": "https://learn.microsoft.com/power-platform/admin/managed-identity-overview"
 },
 {
  "id": "c-3.1g-02",
  "skill": "3.1g",
  "front": "Which version should all new and existing plug-ins use for managed identity?",
  "back": "Version 2.",
  "source": "https://learn.microsoft.com/power-platform/admin/managed-identity-overview"
 },
 {
  "id": "c-3.1g-03",
  "skill": "3.1g",
  "front": "Which certificate name characters break managed identity version 1?",
  "back": "Non-ASCII letters, such as accents (AADSTS70050), and commas (AADSTS700213).",
  "source": "https://learn.microsoft.com/power-platform/admin/managed-identity-overview"
 },
 {
  "id": "c-3.1g-04",
  "skill": "3.1g",
  "front": "When may you use a self-signed certificate for a managed identity plug-in?",
  "back": "Only for development or testing. Production needs a trusted certificate.",
  "source": "https://learn.microsoft.com/power-platform/admin/managed-identity-overview"
 },
 {
  "id": "c-1.2c-01",
  "skill": "1.2c",
  "front": "Are a plug-in's data changes all or nothing, as a transaction?",
  "back": "Yes, they are transactional: all or nothing.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/event-framework"
 },
 {
  "id": "c-1.2c-02",
  "skill": "1.2c",
  "front": "Are the steps of a cloud flow part of a transaction?",
  "back": "No. Flow steps are independent and not transactional.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/event-framework"
 },
 {
  "id": "c-1.2c-03",
  "skill": "1.2c",
  "front": "Which should you choose when logic must be instant, guaranteed and transactional?",
  "back": "A plug-in. Flows or async steps suit work that can happen later.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/event-framework"
 }
];
