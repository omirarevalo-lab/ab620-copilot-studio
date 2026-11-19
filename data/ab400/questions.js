// AB-400 practice question bank (35 original scenario-based questions, English). Schema: specs/questions-spec.md + specs/ab400-questions-spec.md.
window.AB620_QUESTIONS = [
 {
  "id": "q-3.1a-01",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso must block the creation of an account row when a custom credit check fails, and the check usually fails during bulk imports, so the cancellation must be as cheap as possible. Where should the plug-in step be registered?",
  "options": [
   "Synchronously in PreOperation, inside the database transaction",
   "Asynchronously in PostOperation, so the import is not delayed",
   "Synchronously in PreValidation, throwing InvalidPluginExecutionException when the check fails",
   "In MainOperation, the stage meant for custom validation logic"
  ],
  "answer": [
   2
  ],
  "explanation": "PreValidation usually runs outside the main database transaction, so cancelling there avoids a rollback. Cancelling in PreOperation triggers a rollback of the transaction and has a significant performance impact. Asynchronous steps run only after the operation, so they cannot cancel it, and MainOperation is for internal use only (except custom APIs and custom virtual table providers).",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/handle-exceptions#cancel-the-current-operation",
  "preview": false
 },
 {
  "id": "q-3.1a-02",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "A Fabrikam developer needs a synchronous plug-in to read the OutputParameters of a message and log what the platform returns to the caller. In which stage must the step be registered?",
  "options": [
   "PostOperation, after the database transaction",
   "PreValidation, as the first stage sees every parameter",
   "PreOperation, as output values are calculated before the main operation",
   "MainOperation, as the response is built during the operation itself"
  ],
  "answer": [
   0
  ],
  "explanation": "The platform does not populate OutputParameters until after the database transaction, so only steps registered in PostOperation can read or change them. InputParameters, by contrast, can be read and changed in PreValidation and PreOperation. MainOperation is reserved for internal use.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/understand-the-data-context#outputparameters",
  "preview": false
 },
 {
  "id": "q-3.1a-03",
  "skill": "3.1a",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "A Northwind architect reviews the design of an asynchronous plug-in step. Which two statements about asynchronous steps are true?",
  "options": [
   "They can be registered only in the PostOperation stage",
   "The user's operation waits until the step completes",
   "Requests they make run independently and never join a platform transaction",
   "An exception thrown in them cancels the original operation",
   "They can be registered in PreValidation to avoid blocking the user"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "Asynchronous plug-ins can only be registered for the PostOperation stage, and they never participate in a platform transaction: each request they make is performed independently. Only synchronous steps make the operation wait, and only synchronous steps can cancel the operation by throwing an exception.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in#execution-mode",
  "preview": false
 },
 {
  "id": "q-3.1a-04",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "A step on the Account Update message is registered with Run in User's Context set to a service account. The plug-in must call Dataverse as the person who actually started the update, so that person's security roles apply. Which value should it pass to CreateOrganizationService?",
  "options": [
   "context.UserId, which always holds the user who started the operation",
   "context.InitiatingUserId, the user who started the action",
   "context.BusinessUnitId, the caller's business unit",
   "context.OrganizationId, the environment scope"
  ],
  "answer": [
   1
  ],
  "explanation": "UserId applies the account chosen in the step's Run in User's Context setting, which here is the service account. InitiatingUserId is the user who started the action that caused the plug-in to run, and it can be passed to the service to act as that user.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/impersonate-a-user#during-plug-in-execution",
  "preview": false
 },
 {
  "id": "q-3.1a-05",
  "skill": "3.1a",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "An Update plug-in at Adatum updates the same row and retriggers itself. A colleague suggests adding code that exits when IExecutionContext.Depth is greater than 1. What does Microsoft guidance say about this?",
  "options": [
   "Use Depth only in PreValidation steps, where its value is always 1",
   "Use Depth freely, because it equals the number of plug-ins registered on the message",
   "Read Depth from OutputParameters in PostOperation, where it is reliable",
   "Do not depend on Depth in your code; the platform uses it to stop infinite loops"
  ],
  "answer": [
   3
  ],
  "explanation": "The IExecutionContext.Depth property is used by the platform to stop infinite loops caused by nested calls, and the documentation says not to take any dependency on it in your code. Design the logic so it does not retrigger itself instead of relying on the value.",
  "source": "https://learn.microsoft.com/dotnet/api/microsoft.xrm.sdk.iexecutioncontext.depth?view=dataverse-sdk-latest",
  "preview": false
 },
 {
  "id": "q-3.1b-01",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "A Northwind plug-in must retrieve a related contact row while it runs. How should the plug-in call Dataverse?",
  "options": [
   "Get IOrganizationServiceFactory from the service provider and call CreateOrganizationService with context.UserId",
   "Cast IPluginExecutionContext to IOrganizationService and call Retrieve",
   "Send an HTTP request to the Web API with HttpClient and a stored token",
   "Call Xrm.WebApi.retrieveRecord from inside the plug-in class"
  ],
  "answer": [
   0
  ],
  "explanation": "The plug-in gets IOrganizationServiceFactory from the IServiceProvider and calls CreateOrganizationService, passing context.UserId, to obtain the Organization service. The Web API is not supported in plug-ins, and Xrm.WebApi is a client-side API that does not exist in plug-in code.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/write-plug-in#services-you-can-use-in-your-code",
  "preview": false
 },
 {
  "id": "q-3.1b-02",
  "skill": "3.1b",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "A Contoso developer calls ITracingService.Trace in a plug-in to diagnose a production problem. Which two statements are true?",
  "options": [
   "Messages are written to the audit log table",
   "Messages are written to the PluginTraceLog table",
   "Trace output works for a plug-in registered in any isolation mode",
   "Trace logging works only when the plug-in is registered in sandbox mode",
   "Messages are shown to the calling user on every successful run"
  ],
  "answer": [
   1,
   3
  ],
  "explanation": "The tracing service writes its messages to the PluginTraceLog table, where you review what the plug-in did. Trace logging through ITracingService works only when the plug-in is registered in sandbox mode.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/best-practices/business-logic/use-itracingservice-plugins",
  "preview": false
 },
 {
  "id": "q-3.1b-03",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "An Update plug-in at Fabrikam must compare the old value of a column with the new one before the row is saved. Which approach works?",
  "options": [
   "Register a Post Image on a PreOperation step and read it from PostEntityImages by alias",
   "Read the old value from OutputParameters in a PreOperation step",
   "Register a Pre Image with that column and read it from PreEntityImages by alias",
   "Call Retrieve in PostOperation to read the row as it was before the update"
  ],
  "answer": [
   2
  ],
  "explanation": "A Pre Image is a snapshot of the row before the operation, available in the PreEntityImages collection by its alias. A Post Image exists only for steps in PostOperation, OutputParameters are not populated until after the transaction, and by PostOperation the row already holds the new value.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in#step-registration",
  "preview": false
 },
 {
  "id": "q-3.1b-04",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "A reviewer notices that a Post Image on Adatum's Update step was created with the default settings and flags a performance concern. What should the developer change?",
  "options": [
   "Leave the columns blank, which limits the image to the primary key",
   "Convert the Post Image to a Pre Image, which never includes all columns",
   "Register the step in PreValidation so that the image is skipped",
   "Select only the columns the plug-in reads"
  ],
  "answer": [
   3
  ],
  "explanation": "The default behavior when creating an entity image is to select all columns, and the documentation says not to use that default. Include only the columns the plug-in needs. Leaving the selection blank is how you get the all-columns default.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in#step-registration",
  "preview": false
 },
 {
  "id": "q-3.1b-05",
  "skill": "3.1b",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "When a plug-in rejects an account change, Contoso wants users to see the message 'Credit limit exceeded for this account' in the app. What should the plug-in do?",
  "options": [
   "Throw an InvalidOperationException with that message",
   "Throw an InvalidPluginExecutionException",
   "Write the message with ITracingService.Trace and return",
   "Set the message in OutputParameters in PostOperation"
  ],
  "answer": [
   1
  ],
  "explanation": "InvalidPluginExecutionException is the only exception that lets you control the message displayed to the user, so throw it with the message text. Other exception types produce a generic error, and trace messages only go to the PluginTraceLog table for developers.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/handle-exceptions#unexpected-errors",
  "preview": false
 },
 {
  "id": "q-3.1c-01",
  "skill": "3.1c",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "A Northwind team sets performance rules for plug-ins on the Create message of an order table. Which two statements about time constraints are correct?",
  "options": [
   "The whole message operation, including all registered plug-ins, must complete within 2 minutes or it is rolled back",
   "Your own plug-in should run for no more than 2 seconds",
   "The 2-minute limit applies only to synchronous steps",
   "Each plug-in step has its own 2-minute limit, so the total can be longer",
   "Asynchronous steps are exempt from every time limit"
  ],
  "answer": [
   0,
   1
  ],
  "explanation": "A Dataverse message operation, including all registered synchronous and asynchronous plug-ins, must complete within 2 minutes or it is rolled back. Because you cannot control the rest of the operation, the guidance for your own plug-in is a maximum of 2 seconds.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/analyze-performance#time-and-resource-constraints",
  "preview": false
 },
 {
  "id": "q-3.1c-02",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "A Fabrikam plug-in class keeps the current account ID in a private field that is set at the start of Execute. Under load, some rows receive data that belongs to other accounts. What is the cause?",
  "options": [
   "Plug-ins in PostOperation share one database connection across users",
   "The step lacks filtering attributes, so it runs for every user at once",
   "Asynchronous steps reuse the execution context of the previous call",
   "Plug-in instances are cached and can run on several threads at once, so instance fields are shared"
  ],
  "answer": [
   3
  ],
  "explanation": "Dataverse caches plug-in class instances, and multiple threads can execute the same shared instance concurrently. IPlugin implementations must therefore be stateless: keep per-call data in local variables or the execution context, not in fields.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/best-practices/business-logic/develop-iplugin-implementations-stateless",
  "preview": false
 },
 {
  "id": "q-3.1c-03",
  "skill": "3.1c",
  "domain": "D3",
  "type": "multi",
  "difficulty": 2,
  "stem": "An Adatum plug-in on the Create message of an order must create 50 order line rows, and a developer wants to reduce round trips by sending one batch request. Which two request classes should NOT be used inside the plug-in?",
  "options": [
   "ExecuteMultipleRequest",
   "RetrieveMultipleRequest",
   "ExecuteTransactionRequest",
   "AssociateRequest",
   "CreateRequest"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "The documentation says not to use ExecuteMultipleRequest or ExecuteTransactionRequest within the context of a plug-in or workflow activity. RetrieveMultipleRequest, AssociateRequest and CreateRequest are ordinary individual requests.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/best-practices/business-logic/avoid-batch-requests-plugin",
  "preview": false
 },
 {
  "id": "q-3.1c-04",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso's plug-in only needs to run when the emailaddress1 column of a contact changes, but it currently runs on every contact update and slows the app. What is the best fix?",
  "options": [
   "Set emailaddress1 as the filtering attribute of the Update step",
   "Move the step to the PreOperation stage",
   "Increase the Execution Order value so the step runs after other updates",
   "Add a Pre Image that contains emailaddress1"
  ],
  "answer": [
   0
  ],
  "explanation": "If no filtering attributes are set, the plug-in executes every time an update message occurs for that table. Listing emailaddress1 as the filtering attribute makes the step run only when that column is in the update. Stage, execution order and images do not limit when a step fires.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/best-practices/business-logic/include-filtering-attributes-plugin-registration",
  "preview": false
 },
 {
  "id": "q-3.1c-05",
  "skill": "3.1c",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "After a deployment, Northwind customers receive two identical notification emails for every account update. The plug-in code contains a single send call and is stateless. What is the most likely cause?",
  "options": [
   "Two steps share the same Execution Order value, so each one runs twice",
   "The step runs in PostOperation, which always invokes a plug-in twice",
   "The same step is registered twice for the message, so it fires twice",
   "Filtering attributes are set on the step, which makes it fire once for each column"
  ],
  "answer": [
   2
  ],
  "explanation": "Duplicate step registrations cause the plug-in to fire multiple times on the same message or event. Equal execution order values only make the order uncertain, and a PostOperation registration or filtering attributes do not duplicate calls.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/best-practices/business-logic/do-not-duplicate-plugin-step-registration",
  "preview": false
 },
 {
  "id": "q-3.1d-01",
  "skill": "3.1d",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso needs a custom API that returns a calculated discount, changes no data, and can be called with an HTTP GET request. How should the custom API be defined?",
  "options": [
   "As an action, because actions support GET and POST",
   "As a function, by setting Is Private to true so GET is allowed",
   "As an action bound to the account table",
   "As a function, by setting Is Function to yes"
  ],
  "answer": [
   3
  ],
  "explanation": "A custom API with Is Function set to yes is a function, and a function supports GET. An action is invoked with POST. Is Private only hides the API from metadata and code generation, and binding affects where it is called, not the HTTP method.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/reference/entities/customapi#writable-columns-attributes",
  "preview": false
 },
 {
  "id": "q-3.1d-02",
  "skill": "3.1d",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Fabrikam created a custom API as a function and passed it to the test environment. The team now realizes it should be an action. What does this require?",
  "options": [
   "Edit the Is Function value in the solution and import it again",
   "Create a new custom API as an action, because this setting cannot be changed after creation",
   "Change the value in the unmanaged layer of the test environment",
   "Set Allowed Custom Processing Step Type to Sync and Async"
  ],
  "answer": [
   1
  ],
  "explanation": "You can't change whether a custom API is a function or an action after you create it, so the decision must be made early in the design. The fix is a new custom API defined as an action. Processing step settings do not affect the function or action choice.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api#when-to-create-a-function",
  "preview": false
 },
 {
  "id": "q-3.1d-03",
  "skill": "3.1d",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Northwind publishes a custom API and wants other developers to be able to register steps that detect when it runs, but not steps that cancel it or change its behavior. Which Allowed Custom Processing Step Type should be used?",
  "options": [
   "Async Only, so no synchronous steps",
   "Sync and Async, which allows both kinds of steps",
   "None, which blocks every custom step from other developers",
   "Is Private, which hides the API from other developers"
  ],
  "answer": [
   0
  ],
  "explanation": "Async Only lets other developers detect when the operation occurs without letting them cancel it or change its behavior, because only asynchronous steps can be registered. None would block all custom steps, and Sync and Async would allow synchronous steps that can cancel or change the operation.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api#select-a-custom-processing-step-type",
  "preview": false
 },
 {
  "id": "q-3.1d-04",
  "skill": "3.1d",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Adatum's custom API must be callable only by users whose security roles contain a specific privilege. Which setting enforces this?",
  "options": [
   "Set Is Private to true so unauthorized callers get an error",
   "Set Allowed Custom Processing Step Type to None to block other steps",
   "Set Execute Privilege Name to the name of an existing privilege",
   "Set Is Function to yes so only read access is needed"
  ],
  "answer": [
   2
  ],
  "explanation": "Setting the Execute Privilege Name property to the name of an existing privilege requires that privilege to call the custom API. Is Private only hides the API from $metadata and code generation, and callers who know the name can still call it.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api#secure-your-custom-api-by-requiring-a-privilege",
  "preview": false
 },
 {
  "id": "q-3.1d-05",
  "skill": "3.1d",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "Contoso will ship a managed solution with a custom API used only by its own solution, and sets Is Private to true. Which two statements describe the result?",
  "options": [
   "The API no longer appears in the $metadata document",
   "Callers who know the API name can still call it",
   "Callers without a specific role receive a 401 error",
   "Other developers cannot register steps on the API",
   "The API is removed from the exported solution"
  ],
  "answer": [
   0,
   1
  ],
  "explanation": "Is Private hides the API from $metadata and from code generation, so other developers do not build on it by accident. It is not a security feature: callers who know the name can still call it, and restricting who may call it needs an Execute Privilege Name.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api#when-to-make-your-custom-api-private",
  "preview": false
 },
 {
  "id": "q-3.1e-01",
  "skill": "3.1e",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Two Contoso plug-ins are registered on the Account Update message in PreOperation, and both have Execution Order 1. Intermittently the second plug-in reads values the first one should have set. What should the developer do?",
  "options": [
   "Move the second plug-in to the PreValidation stage",
   "Register the second step asynchronously in PostOperation",
   "Add filtering attributes so the steps run less often",
   "Give the steps distinct Execution Order values"
  ],
  "answer": [
   3
  ],
  "explanation": "The actual execution order of steps with the same Execution Order value for the same stage, table and message isn't guaranteed and can be random. Setting explicit, distinct values makes the sequence predictable. Another stage, asynchronous mode or filtering attributes do not fix the ordering.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in#step-registration",
  "preview": false
 },
 {
  "id": "q-3.1e-02",
  "skill": "3.1e",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "A Fabrikam developer with a custom security role tries to set Run in User's Context to a service account in the Plug-in Registration tool, and the change is rejected. What does the developer need?",
  "options": [
   "Register the step in the PostOperation stage instead",
   "Be assigned the System Customizer security role",
   "Make the step asynchronous so it runs in the background",
   "Add a Pre Image to the step"
  ],
  "answer": [
   1
  ],
  "explanation": "Run in User's Context defaults to Calling User. Changing it requires the System Administrator or System Customizer role, or a role that has the prvSetImpersonatingUserIdOnSdkMessageProcessingStep privilege. Stage, execution mode and images do not affect this permission.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in#step-registration",
  "preview": false
 },
 {
  "id": "q-3.1e-03",
  "skill": "3.1e",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "Which two entity image registrations can be created in the Plug-in Registration tool?",
  "options": [
   "A Pre Image on a Create step",
   "A Post Image on a Delete step",
   "A Pre Image on an Update step",
   "A Post Image on an Update step in the PostOperation stage",
   "A Post Image on an Update step in the PreOperation stage"
  ],
  "answer": [
   2,
   3
  ],
  "explanation": "A Pre Image needs a row that exists before the operation, so none is available on Create, and a Post Image is not available on Delete. A Post Image can only be registered for steps in the PostOperation stage.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in#step-registration",
  "preview": false
 },
 {
  "id": "q-3.1e-04",
  "skill": "3.1e",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "A Northwind plug-in reads an API key from its Secure Configuration. After exporting the solution from development and importing it into test, the plug-in fails because the key is missing. Why?",
  "options": [
   "Secure Configuration is cleared when the step moves to PostOperation",
   "Secure Configuration can only be read by synchronous steps",
   "Secure Configuration is not included with the step registration when you export a solution",
   "Managed solutions remove every configuration value on import"
  ],
  "answer": [
   2
  ],
  "explanation": "Secure Configuration data isn't included with the step registration when a solution is exported, so it must be set again in the target environment. The other explanations are not documented behavior.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in#set-configuration-data",
  "preview": false
 },
 {
  "id": "q-3.1e-05",
  "skill": "3.1e",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "An Adatum developer cannot attach a debugger to a plug-in that runs in Dataverse and needs to step through the code in Visual Studio. What should the developer use?",
  "options": [
   "Capture an execution with the Plug-in Profiler and replay it locally",
   "Attach the Visual Studio debugger to the plug-in process on the server",
   "Add a Pre Image that stores the call stack for later replay",
   "Run the step asynchronously, because system jobs expose breakpoints"
  ],
  "answer": [
   0
  ],
  "explanation": "The plug-in runs on a remote server, so you can't attach a debugger to its process. The Plug-in Profiler captures an execution so you can replay it locally in Visual Studio with the debugger attached.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/tutorial-debug-plug-in",
  "preview": false
 },
 {
  "id": "q-3.1f-01",
  "skill": "3.1f",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "Contoso catalogs a custom API named Escalate as a business event. A synchronous PreOperation plug-in throws an exception during one call, so the operation fails. What happens with the business event?",
  "options": [
   "Subscribers are notified, with the failure reason in the payload",
   "Subscribers are not notified, because custom business events fire only when the operation completes successfully",
   "Subscribers are notified when the platform retries the operation",
   "Subscribers are notified immediately, before the main operation runs"
  ],
  "answer": [
   1
  ],
  "explanation": "Custom business events can only send notifications when an event is completed. Even if synchronous logic could cancel or change the operation, notifications occur only when the operation completes successfully.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/business-events#custom-events",
  "preview": false
 },
 {
  "id": "q-3.1f-02",
  "skill": "3.1f",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "A Fabrikam developer created a custom API named OnVendorPaymentPosted. The flow author cannot find it in the Power Automate When an action is performed trigger. What is the most likely reason?",
  "options": [
   "It is not set as a function, so flows cannot read it",
   "It is not bound to the Account table, so flows ignore it",
   "It has not been added to a catalog",
   "It has no plug-in type for its main operation"
  ],
  "answer": [
   2
  ],
  "explanation": "To expose a business event, you must catalog it. A catalog is a hierarchy with a solution at the top and categories below, and the solution owner adds the events and tables that matter to it. Function type, binding and plug-in type do not expose an event.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/business-events#event-catalog",
  "preview": false
 },
 {
  "id": "q-3.1f-03",
  "skill": "3.1f",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "A Northwind flow author wants a flow to start when an account row is created, and looks for the Create event in the When an action is performed trigger. It is not there. What should the author use?",
  "options": [
   "The When a row is added, modified or deleted trigger",
   "The When an action is performed trigger with the filter set to the Account table",
   "A business event created on the Account table",
   "The Dataverse trigger for custom process actions only"
  ],
  "answer": [
   0
  ],
  "explanation": "In the When an action is performed experience, Create, Update and Delete events don't appear for table events. Those events are already available through the When a row is added, modified or deleted trigger.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/business-events#use-business-events-to-trigger-automation",
  "preview": false
 },
 {
  "id": "q-3.1f-04",
  "skill": "3.1f",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "Adatum wants to push 50,000 invoice rows to a partner every night and proposes a business event whose parameters carry all the invoice data. What is the right assessment?",
  "options": [
   "It is correct, because business events are designed to export large amounts of data",
   "It is correct if the event is registered as a function",
   "It is correct if the partner subscribes through a webhook",
   "It is a misuse; business events should be lightweight and not transfer data"
  ],
  "answer": [
   3
  ],
  "explanation": "The design principles for business events state that they should be lightweight and must not be used for data transfer scenarios, which is described as a misuse. The event should only describe what happened and give subscribers enough context to retrieve data.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/business-events#design-principles",
  "preview": false
 },
 {
  "id": "q-3.1f-05",
  "skill": "3.1f",
  "domain": "D3",
  "type": "multi",
  "difficulty": 3,
  "stem": "A Contoso point-of-sale app calls a custom API named OnCustomerPurchase just to tell Dataverse that a purchase already happened. Which two settings suit this external event?",
  "options": [
   "Set Allowed Custom Processing Step Type to Async Only",
   "Include only request parameters and no response properties",
   "Register a synchronous plug-in as the main operation to compute totals",
   "Set Is Function to yes so the app can use GET",
   "Set Execute Privilege Name to the delete privilege"
  ],
  "answer": [
   0,
   1
  ],
  "explanation": "For external events, the custom API should not allow any synchronous step registrations (use Async Only), should have no plug-in type for the main operation, and should have only request parameters because without synchronous logic nothing can set response properties. Synchronous logic could make the call fail even though the event already happened.",
  "source": "https://learn.microsoft.com/power-apps/developer/data-platform/business-events#external-events",
  "preview": false
 },
 {
  "id": "q-3.1g-01",
  "skill": "3.1g",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "A Contoso plug-in must read a secret from Azure Key Vault. The security team forbids storing credentials in the plug-in or its Secure Configuration. What should be used?",
  "options": [
   "A business event that carries the secret",
   "Run in User's Context set to the calling user",
   "Power Platform managed identity for Dataverse plug-ins",
   "A custom API with an Execute Privilege Name for the secret"
  ],
  "answer": [
   2
  ],
  "explanation": "Power Platform managed identity lets Dataverse plug-ins connect securely to Azure resources, such as Key Vault, without managing credentials. The other options do not provide an identity that Azure resources can authorize.",
  "source": "https://learn.microsoft.com/power-platform/admin/managed-identity-overview",
  "preview": false
 },
 {
  "id": "q-3.1g-02",
  "skill": "3.1g",
  "domain": "D3",
  "type": "multi",
  "difficulty": 2,
  "stem": "When you configure Power Platform managed identity for a plug-in, on which two Microsoft Entra objects can the federated identity credential be configured?",
  "options": [
   "A user-assigned managed identity",
   "A Microsoft Entra security group",
   "An application registration",
   "A Conditional Access policy",
   "A Key Vault access policy"
  ],
  "answer": [
   0,
   2
  ],
  "explanation": "Setup begins by creating either a user-assigned managed identity or an application registration in Microsoft Entra ID, and the federated identity credential is configured on that object to support managed identity for plug-ins.",
  "source": "https://learn.microsoft.com/power-platform/admin/managed-identity-overview",
  "preview": false
 },
 {
  "id": "q-3.1g-03",
  "skill": "3.1g",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "A Fabrikam plug-in set up with managed identity version 1 fails to get a token with AADSTS700213 because the signing certificate subject is 'CN=Contoso, Inc.'. What resolves the problem?",
  "options": [
   "Sign the assembly again with a self-signed certificate",
   "Grant the identity the Key Vault Contributor role",
   "Register the plug-in step asynchronously",
   "Move the setup to managed identity version 2, whose subject identifier is a hash of the certificate's distinguished name"
  ],
  "answer": [
   3
  ],
  "explanation": "Version 1 builds the identity from the certificate CN and fails with commas or non-ASCII characters. Version 2 produces a fixed-length, ASCII-only subject identifier, so it works with any certificate name. Azure role assignments do not fix a federated credential mismatch.",
  "source": "https://learn.microsoft.com/power-platform/admin/set-up-managed-identity#why-version-2",
  "preview": false
 },
 {
  "id": "q-3.1g-04",
  "skill": "3.1g",
  "domain": "D3",
  "type": "single",
  "difficulty": 2,
  "stem": "A Northwind team signed its plug-in assembly with the self-signed certificate used during development and plans to use it in production. What is the guidance?",
  "options": [
   "Use a certificate from a trusted issuer",
   "Keep it, because the federated credential is created the same way for every certificate",
   "Keep it, but also register the assembly with a user-assigned identity",
   "Use a self-signed certificate only for plug-in packages, not assemblies"
  ],
  "answer": [
   0
  ],
  "explanation": "Use a self-signed certificate only for development or testing and never in production. A trusted-issuer certificate is also used for the production subject identifier format, which is different from the self-signed one.",
  "source": "https://learn.microsoft.com/power-platform/admin/set-up-managed-identity#set-up-managed-identity",
  "preview": false
 },
 {
  "id": "q-3.1g-05",
  "skill": "3.1g",
  "domain": "D3",
  "type": "single",
  "difficulty": 3,
  "stem": "After creating the managed identity record in Dataverse for a signed plug-in assembly, what links the identity to the plug-in?",
  "options": [
   "Add the identity to a Dataverse team that owns the assembly",
   "Bind the plug-in assembly (or package) to the managed identity record",
   "Set the step's Run in User's Context to the managed identity",
   "Add the identity to the System Customizer role and the assembly's solution"
  ],
  "answer": [
   1
  ],
  "explanation": "After the managed identity record is created, the plug-in assembly (or plug-in package) is bound to it by updating the pluginassemblies or pluginpackages row with a managedidentityid reference. Teams, roles and Run in User's Context are not used for this link.",
  "source": "https://learn.microsoft.com/power-platform/admin/set-up-managed-identity#step-4-create-the-managed-identity-record-in-dataverse",
  "preview": false
 }
];
