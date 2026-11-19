// AB-400 course: module 6 Plug-ins (topics P25-P30). Schema: COURSE-SCHEMA.md + specs/ab400-lessons-spec.md. Data only (figures are rendered by the app).
window.AB620_COURSE = window.AB620_COURSE || [];
window.AB620_COURSE.push(
{
 "id": "P25",
 "module": 6,
 "title": "The event pipeline: stages and execution context",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "3.1a",
  "1.2c"
 ],
 "theory": {
  "intro": "When someone creates, updates or deletes a row, Dataverse does not simply write it to the database. It sends the request through a pipeline of four stages, and your plug-in can join the stages around the main operation. Think of a restaurant order: the waiter checks it, the cook prepares it, the kitchen cooks it, and then the plate gets its finishing touches.",
  "sections": [
   {
    "heading": "One message, four stages",
    "body": "Every data operation in Dataverse is a message with a name: Create, Update, Delete, Retrieve and many more. When you register a plug-in, you register a step. A step says which message, which table and which stage your code runs in.\n\nThe four stages are PreValidation (10), PreOperation (20), MainOperation (30) and PostOperation (40). These are the stage values you see in plug-in telemetry. \"Pre\" and \"Post\" mean before and after the main operation, which is the step where Dataverse itself processes the row. MainOperation is for internal use only, except for custom APIs and custom virtual table data providers.",
    "figure": {
     "type": "pipeline",
     "token": "Create account",
     "stages": [
      {
       "tag": "Stage 10",
       "title": "PreValidation",
       "desc": "Checks before anything is saved"
      },
      {
       "tag": "Stage 20",
       "title": "PreOperation",
       "desc": "Change the row before it is saved"
      },
      {
       "tag": "Stage 30",
       "title": "MainOperation",
       "desc": "Dataverse writes the row",
       "tone": "muted"
      },
      {
       "tag": "Stage 40",
       "title": "PostOperation",
       "desc": "React after the save"
      }
     ],
     "caption": "One Create message passes four stages. You register your steps on 10, 20 and 40; 30 belongs to the platform."
    }
   },
   {
    "heading": "What is inside the database transaction",
    "body": "PreValidation usually runs outside the database transaction, and before the security checks. PreOperation and PostOperation both run inside the transaction. The transaction works like a safety net: if your code throws an exception in any synchronous stage, the whole transaction rolls back.\n\nThis tells you where to put your logic. To cancel an operation, detect the problem in PreValidation and throw an InvalidPluginExecutionException with a clear message. You can also cancel in PreOperation, but the rollback has a significant performance cost, so avoid it. To change the values of the row before it is saved, use PreOperation. Use PostOperation for work that needs the saved row.",
    "figure": {
     "type": "pipeline",
     "active": [
      0,
      1
     ],
     "bracket": {
      "from": 1,
      "to": 3,
      "label": "Database transaction"
     },
     "stages": [
      {
       "tag": "Stage 10",
       "title": "PreValidation",
       "desc": "Cancel here: no rollback needed"
      },
      {
       "tag": "Stage 20",
       "title": "PreOperation",
       "desc": "Change values here; cancelling costs a rollback"
      },
      {
       "tag": "Stage 30",
       "title": "MainOperation",
       "desc": "The save itself",
       "tone": "muted"
      },
      {
       "tag": "Stage 40",
       "title": "PostOperation",
       "desc": "Work that needs the saved row"
      }
     ],
     "caption": "Stages 20 to 40 share one transaction: an exception in a synchronous step rolls everything back."
    }
   },
   {
    "heading": "Synchronous or asynchronous",
    "body": "A synchronous step runs immediately, in its stage and in its execution order. The whole operation waits until it finishes, so the user waits too. An asynchronous step is put in a queue and runs after the main operation completes.\n\nAsynchronous steps can be registered only on the PostOperation stage. They run outside the database transaction. They never join it, and each request inside them runs on its own. So if an asynchronous step fails, the saved row stays saved.\n\nOne more tip for PostOperation: avoid changing the same row there. It triggers a new Update event. If you must change the row, do it earlier, in PreOperation.",
    "figure": {
     "type": "compare",
     "cols": [
      {
       "title": "Synchronous",
       "sub": "Runs now; the user waits",
       "items": [
        "Stages 10, 20 or 40",
        "Stages 20 and 40 are inside the transaction",
        "An exception rolls back the save"
       ]
      },
      {
       "title": "Asynchronous",
       "sub": "Queued; runs after the save",
       "items": [
        "Stage 40 (PostOperation) only",
        "Never joins the transaction",
        "If it fails, the row stays saved"
       ]
      }
     ]
    }
   },
   {
    "heading": "The execution context",
    "body": "Your plug-in receives an IServiceProvider. From it you ask for an IPluginExecutionContext. Think of it as the envelope that came with the message. It tells you the message name, the table, the stage, the users and the data.\n\nThe data is in InputParameters. For Create and Update, the key Target holds the row as an Entity. You can read and change InputParameters in PreValidation and PreOperation. OutputParameters are filled only after the database transaction, so only PostOperation steps can see them. UserId is the user set in Run in User's Context. InitiatingUserId is the user who started the action. ParentContext describes the operation that triggered this one. The platform uses Depth to stop infinite loops, so never write business logic that depends on it.",
    "code": {
     "lang": "csharp",
     "text": "var context = (IPluginExecutionContext)\n    serviceProvider.GetService(typeof(IPluginExecutionContext));\n\nif (context.MessageName == \"Create\"\n    && context.PrimaryEntityName == \"account\"\n    && context.InputParameters.Contains(\"Target\"))\n{\n    Entity account = (Entity)context.InputParameters[\"Target\"];\n    int stage = context.Stage;            // 10, 20, 30 or 40\n    Guid runAs = context.UserId;          // the Run in User's Context account\n}",
     "title": "AccountPlugin.cs",
     "notes": [
      {
       "line": 1,
       "text": "Ask the service provider for the execution context."
      },
      {
       "line": 8,
       "text": "Target holds the row for Create and Update."
      },
      {
       "line": 9,
       "text": "Stage tells you where you run: 10, 20, 30 or 40."
      },
      {
       "line": 10,
       "text": "UserId is the Run in User’s Context account, not always the person who clicked."
      }
     ]
    },
    "figure": {
     "type": "matrix",
     "corner": "In the step…",
     "cols": [
      "PreValidation",
      "PreOperation",
      "PostOperation"
     ],
     "rows": [
      {
       "label": "Change InputParameters",
       "cells": [
        true,
        true,
        false
       ]
      },
      {
       "label": "See OutputParameters",
       "cells": [
        false,
        false,
        true
       ]
      },
      {
       "label": "Inside the transaction",
       "cells": [
        "Usually not",
        true,
        true
       ]
      }
     ],
     "caption": "What your code can do with the context depends on the stage."
    }
   },
   {
    "heading": "Plug-in or cloud flow? The design view",
    "body": "A plug-in runs whenever the event occurs, whichever app, flow or API made the change. Its data changes are transactional: all or nothing. A synchronous plug-in can also block bad data before it is saved. The steps of a cloud flow are independent. They are not part of a transaction, so a flow needs its own steps to undo work.\n\nTime matters too. A Dataverse operation, with all its synchronous and asynchronous plug-ins, must finish within two minutes, or it is rolled back. Microsoft's guidance for your own plug-in is two seconds. Choose a plug-in when the logic must be instant, guaranteed and transactional. Choose a flow or an asynchronous step when the work can happen later.",
    "figure": {
     "type": "compare",
     "cols": [
      {
       "title": "Plug-in",
       "sub": "Runs for every change, from any app, flow or API",
       "items": [
        "All or nothing: transactional",
        "A synchronous step can block bad data",
        "Two-minute limit; aim for two seconds"
       ]
      },
      {
       "title": "Cloud flow",
       "sub": "Runs after the change",
       "items": [
        "Independent steps, no transaction",
        "Undoing work needs its own steps",
        "Good for work that can wait"
       ]
      }
     ]
    }
   }
  ],
  "steps": [
   "In a terminal, run pac plugin init to create a plug-in project with template code.",
   "Open the project in Visual Studio or VS Code and write your logic in the Execute method.",
   "Build the project, then run pac tool prt to open the Plug-in Registration tool and connect to your environment.",
   "Register the assembly, then right-click your plug-in class and choose Register New Step.",
   "Set Message to Create and Primary Entity to account.",
   "Choose the Event Pipeline Stage of Execution: PreValidation, PreOperation or PostOperation.",
   "Choose the Execution Mode. Asynchronous is possible only for PostOperation.",
   "Create an account in your app to fire the step, and check the result."
  ],
  "example": "Contoso wants every new account to have a tax number. Sam registers four steps on the Create message of the account table. A synchronous PreValidation step throws an error when the tax number is empty. A synchronous PreOperation step trims the account name before it is saved. A synchronous PostOperation step creates a follow-up task for the sales rep. An asynchronous PostOperation step sends the welcome email, so nobody waits for it. If the task step fails, the account is rolled back too. If the email step fails, the account stays.",
  "examTips": [
   "To cancel an operation, throw InvalidPluginExecutionException in a synchronous PreValidation step. Trap: cancelling in PreOperation or PostOperation works, but it rolls back the transaction with a significant performance cost.",
   "Asynchronous steps can be registered only on the PostOperation stage. They run outside the transaction and never take part in it.",
   "You can read and change InputParameters in PreValidation and PreOperation. OutputParameters exist only after the transaction, so only PostOperation steps see them.",
   "Trap: Depth is there for the platform, to stop infinite loops. Never build your own logic on its value."
  ],
  "glossary": [
   {
    "term": "Message",
    "def": "The name of an operation in Dataverse, such as Create, Update or Delete. Plug-ins respond to messages."
   },
   {
    "term": "Step",
    "def": "The registration that tells Dataverse to run your plug-in for one message, one table, one stage and one execution mode."
   },
   {
    "term": "Database transaction",
    "def": "A group of changes that all succeed together or are all rolled back if one part fails."
   },
   {
    "term": "Execution context",
    "def": "The object your plug-in receives with the message name, table, stage, users and data of the operation."
   },
   {
    "term": "Asynchronous step",
    "def": "A step that is queued and runs after the main operation, outside the transaction. The user does not wait."
   }
  ]
 },
 "scenes": [
  {
   "title": "One click, one message",
   "caption": "A save becomes a message. Dataverse runs the Create message through four stages, and plug-ins join the stages around the save.",
   "say": "Maya, a sales rep at Contoso, saves a new account in her model-driven app. The app does not write to the database by itself. It sends a message called Create to Dataverse. Dataverse then runs that message through a pipeline of four stages, and your plug-ins join the stages around the save. Think of a restaurant: the order is checked, prepared, cooked, and finally plated."
  },
  {
   "title": "Stage ten: PreValidation",
   "caption": "PreValidation runs first, usually outside the transaction. Cancel here with InvalidPluginExecutionException.",
   "say": "The first stop is PreValidation, stage ten. It usually runs outside the database transaction, and before the security checks. Contoso registers a synchronous plug-in here. It sees that the tax number is empty, and throws an Invalid Plugin Execution Exception with a clear message. Maya reads the message, and nothing was written. This is the cheapest place to cancel an operation."
  },
  {
   "title": "Stage twenty: PreOperation",
   "caption": "PreOperation runs inside the transaction, before the save. Change values here. Avoid cancelling.",
   "say": "Next comes PreOperation, stage twenty. Now the database transaction is open, but the row is not saved yet. Contoso's second plug-in tidies the account name before it is written. Because the plug-in changes the values first, there is no extra update. Avoid cancelling here. A cancel triggers a rollback of the whole transaction, and that costs a lot of performance."
  },
  {
   "title": "Stage thirty: the main operation",
   "caption": "MainOperation is where Dataverse writes the row. It is for internal use, except custom APIs and custom virtual tables.",
   "say": "Stage thirty is the main operation. This is where Dataverse itself writes the new account row. The stage is for internal use, with one exception: the plug-ins of custom A P Is, and custom virtual table data providers, run here. Everything before it is called Pre, and everything after it is called Post. The words simply mean before or after this write."
  },
  {
   "title": "Stage forty: PostOperation",
   "caption": "PostOperation runs after the save but still inside the transaction. An error here rolls everything back.",
   "say": "PostOperation, stage forty, runs after the write and still inside the transaction. Contoso creates a follow-up task for Maya here, with a synchronous plug-in. If that plug-in throws an error, the whole transaction rolls back, and the new account disappears too. Also avoid changing the same account here, because that triggers a brand new Update event."
  },
  {
   "title": "Asynchronous: after the transaction",
   "caption": "Asynchronous steps exist only in PostOperation. They run after the operation, outside the transaction.",
   "say": "Not every job must make Maya wait. In PostOperation you can register an asynchronous step. It goes into a queue and runs after the operation completes, outside the database transaction. It never joins that transaction, so if it fails, the account stays saved. Only PostOperation allows asynchronous steps. Contoso uses one to send the welcome email."
  },
  {
   "title": "What the exam asks",
   "caption": "Cancel in PreValidation. Change values in PreOperation. Async only in PostOperation. An exception rolls everything back.",
   "say": "On the exam, remember four rules. To cancel an operation, use a synchronous PreValidation step and throw an Invalid Plugin Execution Exception. To change values before they are saved, use PreOperation. Asynchronous steps exist only in PostOperation. And an exception in any synchronous stage rolls back the whole transaction. Never build logic on the Depth property."
  }
 ],
 "check": [
  {
   "stem": "Which stage is the best place to cancel an operation before the database transaction?",
   "options": [
    "PostOperation",
    "PreValidation",
    "MainOperation",
    "PreOperation"
   ],
   "answer": 1,
   "explanation": "PreValidation usually runs outside the transaction, so a cancel there is cheap. Cancelling later causes a rollback."
  },
  {
   "stem": "In which stage can you register an asynchronous plug-in step?",
   "options": [
    "Only PostOperation",
    "PreValidation or PreOperation",
    "Any of the four stages",
    "Only MainOperation"
   ],
   "answer": 0,
   "explanation": "Asynchronous steps can be registered only for the PostOperation stage."
  },
  {
   "stem": "A synchronous plug-in throws an exception in PostOperation. What happens to the new account?",
   "options": [
    "It is saved, and the error is only logged",
    "It is saved, but marked as inactive",
    "It is rolled back with the whole transaction",
    "The plug-in is run again from the queue"
   ],
   "answer": 2,
   "explanation": "An exception in any synchronous stage inside the transaction rolls back the entire transaction."
  },
  {
   "stem": "Where can a plug-in read OutputParameters?",
   "options": [
    "In PreValidation and PreOperation",
    "In the MainOperation stage only",
    "In every stage of the pipeline",
    "In PostOperation only"
   ],
   "answer": 3,
   "explanation": "The system fills OutputParameters only after the database transaction, so only PostOperation steps can see them."
  }
 ],
 "reto": {
  "text": "Register one synchronous PreValidation step on Create of account.\nThrow an InvalidPluginExecutionException when the account name is empty.\nTry to save an account without a name and read the message.",
  "minutes": 20
 },
 "source": "https://learn.microsoft.com/power-apps/developer/data-platform/event-framework"
},
{
 "id": "P26",
 "module": 6,
 "title": "Writing plug-in logic: Organization service and images",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "3.1b"
 ],
 "theory": {
  "intro": "A plug-in is a C# class with one method, Execute. Inside it, the platform hands you three helpers: the context, the Organization service to read and write rows, and the tracing service to leave notes. It is like a waiter with an order pad: the context says what was ordered, and the services let you act on it.",
  "sections": [
   {
    "heading": "The shape of a plug-in",
    "body": "A plug-in is a class in an assembly that targets .NET Framework. It implements the IPlugin interface, which has one method: Execute, with one parameter, an IServiceProvider.\n\nThe class must be stateless. The platform caches an instance of your class and reuses it. So never store a service or context data in a field, because it would be shared with the next call. Keep everything in local variables inside Execute. Constants are fine. If you need settings, the constructor can receive two strings, unsecure and secure configuration, set when you register the step.",
    "code": {
     "lang": "csharp",
     "text": "public class AccountTaxCheck : IPlugin\n{\n    public void Execute(IServiceProvider serviceProvider)\n    {\n        var context = (IPluginExecutionContext)\n            serviceProvider.GetService(typeof(IPluginExecutionContext));\n        var factory = (IOrganizationServiceFactory)\n            serviceProvider.GetService(typeof(IOrganizationServiceFactory));\n        IOrganizationService service = factory.CreateOrganizationService(context.UserId);\n        var tracer = (ITracingService)\n            serviceProvider.GetService(typeof(ITracingService));\n        tracer.Trace(\"Started for {0}\", context.MessageName);\n    }\n}"
    }
   },
   {
    "heading": "The three services",
    "body": "You get each service by calling GetService on the service provider with the type you want. The execution context tells you what happened. The Organization service reads and writes Dataverse rows with SDK for .NET calls, such as Retrieve, Create, Update and Delete. You get it from IOrganizationServiceFactory, by calling CreateOrganizationService with context.UserId.\n\nTwo rules. Do not use the Web API in a plug-in, because it is not supported. And do not sign in the user: the user is already authenticated when the plug-in runs.\n\nThe tracing service writes messages to the PluginTraceLog table. You must first enable trace logging in your environment. Tracing works only for plug-ins registered in sandbox mode.",
    "figure": {
     "type": "compare",
     "cols": [
      {
       "title": "IPluginExecutionContext",
       "sub": "What happened",
       "items": [
        "Message, table and stage",
        "The users",
        "InputParameters, with Target"
       ]
      },
      {
       "title": "IOrganizationService",
       "sub": "Read and write rows",
       "items": [
        "Retrieve, Create, Update, Delete",
        "From IOrganizationServiceFactory",
        "CreateOrganizationService(context.UserId)"
       ]
      },
      {
       "title": "ITracingService",
       "sub": "Notes for you, not the user",
       "items": [
        "Trace(…) messages",
        "Stored in the PluginTraceLog table"
       ]
      }
     ],
     "caption": "Every service comes from the same place: serviceProvider.GetService(typeof(…))."
    }
   },
   {
    "heading": "Reading and changing the Target",
    "body": "The row that triggered the step is in InputParameters, under the key Target. It is an Entity with late-bound values. For Create, it holds the new values. For Update, it holds only the columns that changed.\n\nIn a PreOperation step you can change the values of Target. Dataverse saves your changes together with the row, so you need no extra Update call. You may convert Target to an early-bound class with ToEntity for reading, but never assign an early-bound object back into InputParameters. That causes a SerializationException.",
    "code": {
     "lang": "csharp",
     "text": "// Step: Create of account, PreOperation, synchronous\nEntity target = (Entity)context.InputParameters[\"Target\"];\nstring name = target.GetAttributeValue<string>(\"name\");\n\nif (name != null)\n{\n    // Changing Target here is saved by the main operation\n    target[\"name\"] = name.Trim();\n}"
    }
   },
   {
    "heading": "Entity images: before and after",
    "body": "Sometimes you need a value that the message does not carry, for example the old value on Update. Do not call Retrieve in the plug-in. Define an entity image on the step instead. An image is a snapshot of the row. A Pre Image is the row before the main operation. A Post Image is the row after it.\n\nWhen you register the image, you give it an alias and choose its columns. In code, you read it by alias from PreEntityImages or PostEntityImages. The default is to select all columns. Do not use that default: choose only the columns your logic needs. Images are available only for some messages, and they depend on the stage: no Pre Image on Create, no Post Image on Delete, and a Post Image only in PostOperation.",
    "code": {
     "lang": "csharp",
     "text": "// Step: Update of account, PreValidation. Pre Image alias: PreImage\nEntity target = (Entity)context.InputParameters[\"Target\"];\nEntity before = context.PreEntityImages[\"PreImage\"];\n\nMoney oldLimit = before.GetAttributeValue<Money>(\"creditlimit\");\nMoney newLimit = target.GetAttributeValue<Money>(\"creditlimit\");\n\nif (oldLimit != null && newLimit != null && newLimit.Value > oldLimit.Value * 2)\n{\n    throw new InvalidPluginExecutionException(\"The credit limit cannot be more than doubled at once.\");\n}"
    },
    "figure": {
     "type": "matrix",
     "corner": "Image",
     "cols": [
      "Create",
      "Update",
      "Delete"
     ],
     "rows": [
      {
       "label": "Pre Image",
       "cells": [
        false,
        true,
        true
       ]
      },
      {
       "label": "Post Image",
       "cells": [
        "PostOperation only",
        "PostOperation only",
        false
       ]
      }
     ],
     "caption": "There is no row before a Create and no row after a Delete. Choose only the columns you need."
    }
   },
   {
    "heading": "Errors the user can read, and traces for you",
    "body": "InvalidPluginExecutionException is the only exception that lets you control the message the user sees. Any other exception shows a generic error. In a synchronous stage, any exception rolls back the whole transaction.\n\nA good pattern: catch the Organization service fault and wrap it in an InvalidPluginExecutionException with a clear message. For any other exception, write a trace first, then rethrow with a plain throw so the stack is kept.",
    "code": {
     "lang": "csharp",
     "text": "try\n{\n    service.Update(account);\n}\ncatch (FaultException<OrganizationServiceFault> ex)\n{\n    throw new InvalidPluginExecutionException(\"The account could not be updated.\", ex);\n}\ncatch (Exception ex)\n{\n    tracer.Trace(\"AccountTaxCheck: {0}\", ex.ToString());\n    throw;\n}"
    },
    "figure": {
     "type": "compare",
     "cols": [
      {
       "title": "InvalidPluginExecutionException",
       "sub": "The only one you control",
       "items": [
        "The user sees your message",
        "Synchronous stage: the transaction rolls back"
       ]
      },
      {
       "title": "Any other exception",
       "sub": "Unplanned",
       "items": [
        "The user sees a generic error",
        "Synchronous stage: the transaction rolls back",
        "Write a trace first, then rethrow"
       ]
      }
     ]
    }
   }
  ],
  "steps": [
   "Run pac plugin init to create a plug-in project, or create one with Power Platform Tools in Visual Studio.",
   "Open the project. The generated PluginBase class gives you the context, the service factory and the tracing service.",
   "Write your logic in ExecuteDataversePlugin, or in Execute if you implement IPlugin yourself.",
   "Create the Organization service with CreateOrganizationService(context.UserId). Never call the Web API.",
   "Read Target from InputParameters and add Trace messages for the values you check.",
   "Build the project in Visual Studio. Turn on plug-in trace logging in your environment settings.",
   "Register the assembly and the step with the Plug-in Registration tool. Add a Pre Image if you need old values.",
   "Trigger the message in your app, then open the PluginTraceLog table to read your messages."
  ],
  "example": "Contoso wants to stop a big jump in credit limit. Lena writes a plug-in for the Update message of the account table. Update carries only the columns that changed, so she adds a Pre Image named PreImage with one column, creditlimit. In the plug-in she reads the new value from Target and the old value from PreImage. If the new limit is more than double the old one, she throws an InvalidPluginExecutionException with a clear message. She registers the step in PreValidation, so the cancel is cheap and nothing is rolled back.",
  "examTips": [
   "Get IOrganizationService from IOrganizationServiceFactory, with CreateOrganizationService(context.UserId). Trap: the Web API is not supported inside plug-ins.",
   "Trap: the default entity image selects all columns. Select only the columns your plug-in needs, for performance.",
   "Images by stage: no Pre Image on Create, no Post Image on Delete, and a Post Image only in PostOperation. Update in PostOperation can have both.",
   "Only InvalidPluginExecutionException controls the message the user sees. Keep IPlugin classes stateless, because the platform reuses one instance."
  ],
  "glossary": [
   {
    "term": "IPlugin",
    "def": "The interface every plug-in class implements. It has one method, Execute, which receives an IServiceProvider."
   },
   {
    "term": "Organization service",
    "def": "The SDK for .NET service a plug-in uses to read and write Dataverse rows. It is IOrganizationService."
   },
   {
    "term": "Entity image",
    "def": "A snapshot of a row, taken before (Pre Image) or after (Post Image) the main operation, read by alias."
   },
   {
    "term": "PluginTraceLog",
    "def": "The Dataverse table where the tracing service writes your Trace messages, if trace logging is enabled."
   },
   {
    "term": "Stateless",
    "def": "A class that keeps no data between calls. A plug-in must not store services or context in fields."
   }
  ]
 },
 "scenes": [
  {
   "title": "A class with one method",
   "caption": "A plug-in implements IPlugin and its Execute method. The class must be stateless: keep everything in local variables.",
   "say": "A plug-in is a class that implements the I Plugin interface, with one method called Execute. Dataverse calls Execute every time your step fires. The platform caches the class and reuses it, so the class must be stateless. Never keep services or context data in fields. Everything lives inside Execute, in local variables. That is the first rule to remember."
  },
  {
   "title": "Three services",
   "caption": "Ask the service provider for the context, the service factory and the tracing service. The Web API is not supported.",
   "say": "Inside Execute you ask the service provider for three things. First, the execution context: what was asked, and by whom. Second, the organization service factory, which creates the organization service for reading and writing rows. Pass it the user id from the context. Third, the tracing service, which writes notes to the plug-in trace log. Do not use the Web A P I in a plug-in. It is not supported."
  },
  {
   "title": "Read and change the Target",
   "caption": "Target holds the row. On Update it holds only the changed columns. Change it in PreOperation to save extra work.",
   "say": "The row that triggered the step is in the input parameters, under the name Target. For Create, it holds the new values. For Update, it holds only the columns that changed. In a PreOperation step you can change Target, and Dataverse saves your changes with the row. No extra update call, no extra cost. Early-bound classes are fine for reading, but never assign one back into Target."
  },
  {
   "title": "Images: before and after",
   "caption": "A Pre Image is a snapshot before the operation, a Post Image after. Read them by alias, and select only needed columns.",
   "say": "Sometimes you need the old value. The Update message carries only the changed columns, and calling Retrieve is slower. Define a Pre Image on the step instead. An image is a snapshot of the row, taken before or after the operation. You give it an alias, and read it from the Pre Entity Images collection. Select only the columns you need, never the default of all columns."
  },
  {
   "title": "Errors the user can read",
   "caption": "Throw InvalidPluginExecutionException for a message people can read. Trace first for unexpected errors, then rethrow.",
   "say": "When a business rule fails, throw an Invalid Plugin Execution Exception with a message people can read. It is the only exception type that lets you control the text the user sees. Any other exception shows a generic error. In a synchronous stage, any exception rolls back the whole transaction. For unexpected errors, write a trace first, and then rethrow."
  },
  {
   "title": "What the exam asks",
   "caption": "Factory plus UserId for the service, no Web API, only needed image columns, and the right exception.",
   "say": "Exam time. Get the organization service from the factory, using the user id of the context. The Web A P I is not supported inside plug-ins. Tracing works only in sandbox mode, and trace logging must be enabled. There is no Pre Image on Create, no Post Image on Delete, and a Post Image only in PostOperation. Select only the columns you need. And keep the class stateless."
  }
 ],
 "check": [
  {
   "stem": "How does a plug-in get the Organization service?",
   "options": [
    "By calling the Web API with a token",
    "By signing in with a client secret",
    "From the service factory, using the user Id",
    "By building a new ServiceClient"
   ],
   "answer": 2,
   "explanation": "You ask the service provider for IOrganizationServiceFactory and call CreateOrganizationService with context.UserId."
  },
  {
   "stem": "Which exception lets a plug-in control the message the user sees?",
   "options": [
    "Exception",
    "InvalidPluginExecutionException",
    "NullReferenceException",
    "TimeoutException"
   ],
   "answer": 1,
   "explanation": "InvalidPluginExecutionException is the only one that controls the message. Other exceptions show a generic error."
  },
  {
   "stem": "When can a plug-in use a Post Image?",
   "options": [
    "On Delete, in any stage",
    "In PreValidation, on Update",
    "On Create, in PreOperation",
    "In PostOperation steps only"
   ],
   "answer": 3,
   "explanation": "There is no way to know the row after the operation before the transaction ends, so a Post Image needs a PostOperation step."
  },
  {
   "stem": "Why must an IPlugin class be stateless?",
   "options": [
    "The platform reuses a cached instance of the class",
    "Plug-ins are not allowed to have methods besides Execute",
    "Dataverse refuses to load any class that has fields",
    "A stateless class is required for PreValidation steps"
   ],
   "answer": 0,
   "explanation": "The platform caches and reuses the instance, so data stored in fields would leak into the next call."
  }
 ],
 "reto": {
  "text": "Create a plug-in with pac plugin init.\nTrace the old and new credit limit using a Pre Image.\nUpdate an account and read the PluginTraceLog table.",
  "minutes": 25
 },
 "source": "https://learn.microsoft.com/power-apps/developer/data-platform/write-plug-in"
},
{
 "id": "P27",
 "module": 6,
 "title": "Registering plug-ins with the Plug-in Registration Tool",
 "level": "intermediate",
 "minutes": 12,
 "skills": [
  "3.1e"
 ],
 "theory": {
  "intro": "Writing a plug-in is only half of the job. You must also tell Dataverse when to run it, and that is called registration. Think of hiring: the assembly is the employee, and the step is the job description.",
  "sections": [
   {
    "heading": "The tools and what you register",
    "body": "Registering a plug-in needs a tool: the Plug-in Registration tool (PRT) or the Power Platform Tools extension for Visual Studio. The PRT is one of the Dataverse developer tools you download from NuGet, and the command pac tool prt opens it. It creates registrations for assemblies and steps, and it can edit them.\n\nWhen you upload an assembly, Dataverse stores it in the PluginAssembly table. Every class that implements IPlugin is registered for you. The tool also shows isolation mode and location. Dataverse is online only, so always accept the defaults, Sandbox and Database. A plug-in package can carry dependent assemblies, but packages are not supported on-premises or for custom workflow activities.",
    "code": {
     "lang": "bash",
     "text": "# Create a plug-in project with template code\npac plugin init\n\n# Open the Plug-in Registration tool, then connect to your environment inside it\npac tool prt"
    },
    "figure": {
     "type": "flow",
     "nodes": [
      {
       "title": "Assembly",
       "desc": "Stored in the PluginAssembly table"
      },
      {
       "title": "Plug-in type",
       "desc": "Each class that implements IPlugin"
      },
      {
       "title": "Step",
       "desc": "Message, table, stage, mode"
      },
      {
       "title": "Image",
       "desc": "Optional row snapshot for the step"
      }
     ],
     "caption": "What the Plug-in Registration tool creates, from the uploaded assembly down to an image."
    }
   },
   {
    "heading": "Describe the step",
    "body": "A step says when your plug-in runs. You choose the Message, such as Update, and the Primary Entity, the table. If you leave the table empty for a core message, the plug-in is invoked for every table that supports the message.\n\nFiltering Attributes limit an Update step to requests that include the listed columns. List only columns that really change, and never the primary key, because it is always in an update and would make the other filters useless. Note that a request that contains a filtering column fires the plug-in even if its value did not change.\n\nThen you choose the Event Pipeline Stage (PreValidation, PreOperation or PostOperation) and the Execution Mode. Asynchronous is allowed only for PostOperation.",
    "figure": {
     "type": "flow",
     "active": 2,
     "nodes": [
      {
       "title": "Message",
       "desc": "For example Update"
      },
      {
       "title": "Primary Entity",
       "desc": "Empty = every table that supports the message"
      },
      {
       "title": "Filtering attributes",
       "desc": "Only the columns that really change"
      },
      {
       "title": "Stage and mode",
       "desc": "For example PreOperation, synchronous"
      }
     ],
     "caption": "A step answers one question: exactly when does my code run?"
    }
   },
   {
    "heading": "Order, user, images and configuration",
    "body": "Execution Order sets which step runs first in a stage, from the lowest number to the highest. Do not accept the default. Steps with the same value, for the same stage, table and message, can run in a random order.\n\nRun in User's Context is Calling User by default. If that user lacks privileges for what the plug-in does, choose another user. To change it, you need the System Administrator or System Customizer role, or a role with the prvSetImpersonatingUserIdOnSdkMessageProcessingStep privilege.\n\nYou also add entity images to a step here, with an alias and only the columns you need. The Unsecure Configuration and Secure Configuration fields pass strings to the plug-in constructor. Trap: Secure Configuration is not included when you export the solution."
   },
   {
    "heading": "Solutions, updates and debugging",
    "body": "The tool puts a new assembly in the Default Solution. Do not develop there. Start with a custom publisher and an unmanaged solution, then add the assembly in the Power Apps maker portal with Add existing, More, Developer, Plug-in assembly. Steps are separate components: add each one too. Removing the assembly from a solution does not remove its steps.\n\nTo update an assembly, change its version. A new build or revision number is an in-place upgrade, and steps follow. A new major or minor number makes a different assembly, and steps keep pointing to the old one.\n\nYou cannot attach a debugger to the remote server. Use the Plug-in Profiler to capture a run, then replay it in Visual Studio.",
    "figure": {
     "type": "flow",
     "nodes": [
      {
       "title": "Custom publisher",
       "desc": "Not the Default Solution"
      },
      {
       "title": "Unmanaged solution",
       "desc": "Where you develop"
      },
      {
       "title": "Add existing › Plug-in assembly",
       "desc": "More › Developer"
      },
      {
       "title": "Add each step",
       "desc": "Steps are separate components"
      }
     ]
    }
   }
  ],
  "steps": [
   "Build your plug-in project to produce the assembly, a .dll file.",
   "In a terminal, run pac tool prt to open the Plug-in Registration tool.",
   "Create a new connection, sign in and choose your environment.",
   "Register a new assembly, choose your .dll, accept Sandbox and Database, and register the selected plug-ins.",
   "Right-click your plug-in class and choose Register New Step. Set Message, Primary Entity, Filtering Attributes, stage, mode and Execution Order.",
   "Right-click the step and add an image if you need old or new values. Give it an alias and select only the columns you need.",
   "In the Power Apps maker portal, open your unmanaged solution. Use Add existing, More, Developer, Plug-in assembly, and then add each step.",
   "If a run fails, use the Plug-in Profiler to capture it and replay it in Visual Studio."
  ],
  "example": "Contoso's plug-in is ready as AccountTools.dll. Priya runs pac tool prt, connects to the development environment and registers the assembly with the default Sandbox and Database options. She adds a step: Update of account, filtering attribute creditlimit, PreValidation, synchronous, execution order ten. She adds a second step in the same stage with order twenty, so the order is clear. Then, in the Power Apps maker portal, she adds the assembly and both steps to the unmanaged solution Contoso Sales.",
  "examTips": [
   "Trap: steps with the same Execution Order, in the same stage, table and message, can run in random order. Set distinct values.",
   "Removing an assembly from a solution does not remove its steps. Assemblies and steps are separate components, so add both to the solution.",
   "Trap: Secure Configuration data is not included when you export a solution.",
   "Run in User's Context defaults to Calling User. For Update steps, list only the columns that change in Filtering Attributes, never the primary key."
  ],
  "glossary": [
   {
    "term": "Plug-in Registration tool",
    "def": "The Dataverse developer tool, also called PRT, that registers assemblies, steps and images. Open it with pac tool prt."
   },
   {
    "term": "Filtering attributes",
    "def": "The columns that make an Update step fire. They stop the plug-in from running on every update."
   },
   {
    "term": "Execution Order",
    "def": "The number that sets which step runs first in the same stage. Lower numbers run first."
   },
   {
    "term": "Plug-in Profiler",
    "def": "A tool that captures a plug-in run so you can replay it locally in Visual Studio and debug it."
   }
  ]
 },
 "scenes": [
  {
   "title": "Tell Dataverse when to run",
   "caption": "Registration connects your code to a message. Use the Plug-in Registration tool, opened with pac tool prt.",
   "say": "After you write a plug-in, Dataverse must be told when to run it. That is registration. You can use the Plug-in Registration tool, or the Power Platform Tools extension for Visual Studio. From a terminal, the command pac tool prt opens the registration tool. You connect to your environment, then upload the assembly. Think of registration as hiring: the code is the employee, and the step is the job description."
  },
  {
   "title": "Register the assembly",
   "caption": "The assembly is uploaded to Dataverse. Accept the defaults Sandbox and Database.",
   "say": "In the tool, you register the assembly. The tool uploads it into the plug-in assembly table. Every class that implements the I Plugin interface is registered for you. The tool also shows isolation mode and location. In Dataverse, always accept the defaults: Sandbox and Database. Then you add steps to your classes. The assembly alone does nothing until a step connects it to a message."
  },
  {
   "title": "Describe the step",
   "caption": "A step sets the message, table, filtering attributes, stage, mode, order and user.",
   "say": "A step says when your plug-in runs. You pick the message, such as Update, and the primary table. If you leave the table empty, the plug-in runs for every table that supports that message. For Update, set filtering attributes with only the columns that change, and never the primary key. Then choose the stage and the execution mode, synchronous or asynchronous."
  },
  {
   "title": "Order and identity",
   "caption": "Lower Execution Order runs first. Equal numbers can run in random order. Run in User's Context is Calling User by default.",
   "say": "Several steps can share a stage. The execution order number decides which runs first, from lowest to highest. If two steps share the same number, the order is not guaranteed and can be random, so set distinct values. Run in User's Context is Calling User by default. To change it, you need the System Administrator or System Customizer role."
  },
  {
   "title": "Ship it in a solution",
   "caption": "Add the assembly and each step to your unmanaged solution. Removing the assembly does not remove its steps.",
   "say": "The tool puts your assembly in the default solution. To ship it, add the assembly to your own unmanaged solution. Then add each step separately, because steps are separate solution components. Removing the assembly from a solution does not remove its steps. And secure configuration is not included when you export the solution, so you must set it again in the target environment."
  },
  {
   "title": "What the exam asks",
   "caption": "Random order for equal Execution Order, steps stay when the assembly is removed, secure configuration is not exported.",
   "say": "Exam reminders. Steps with the same execution order can run in random order. Removing an assembly from a solution does not remove its steps. Secure configuration is not exported with a solution. Run in User's Context defaults to Calling User. And because you cannot attach a debugger to the remote server, capture a run with the Plug-in Profiler and replay it in Visual Studio."
  }
 ],
 "check": [
  {
   "stem": "Which command opens the Plug-in Registration tool from the Power Platform CLI?",
   "options": [
    "pac tool prt",
    "pac plugin run",
    "pac solution prt",
    "pac admin open"
   ],
   "answer": 0,
   "explanation": "pac tool prt opens the Plug-in Registration tool. pac plugin init creates a plug-in project."
  },
  {
   "stem": "Two steps share the same stage, table, message and Execution Order. What happens?",
   "options": [
    "The first registered always runs first",
    "Dataverse rejects the second step",
    "The order is not guaranteed and can be random",
    "Both steps run together at the same time"
   ],
   "answer": 2,
   "explanation": "The order is not guaranteed for equal values, so you should set a distinct Execution Order for each step."
  },
  {
   "stem": "You remove a plug-in assembly from a solution. What happens to its steps?",
   "options": [
    "They are deleted with it",
    "They are disabled automatically",
    "They move to the default solution",
    "They are not removed"
   ],
   "answer": 3,
   "explanation": "Steps are separate solution components. Removing the assembly does not remove the steps that depend on it."
  },
  {
   "stem": "What is the default value of Run in User's Context?",
   "options": [
    "System Administrator",
    "Calling User",
    "The owner of the row",
    "The user who built the assembly"
   ],
   "answer": 1,
   "explanation": "The default is Calling User. Changing it needs the System Administrator or System Customizer role."
  }
 ],
 "reto": {
  "text": "Register your assembly with the Plug-in Registration tool.\nAdd an Update step with a filtering attribute on one column.\nAdd the assembly and the step to an unmanaged solution.",
  "minutes": 25
 },
 "source": "https://learn.microsoft.com/power-apps/developer/data-platform/register-plug-in"
},
{
 "id": "P28",
 "module": 6,
 "title": "Plug-in performance",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "3.1c"
 ],
 "theory": {
  "intro": "A synchronous plug-in makes the user wait, so a slow plug-in is a slow app. Think of a toll booth on a motorway: one slow booth makes the whole queue slow. Good plug-ins are small, stateless, and run only when they are really needed.",
  "sections": [
   {
    "heading": "Two time limits",
    "body": "A Dataverse message operation, including all registered synchronous and asynchronous plug-ins, must complete within two minutes. If it does not, it is rolled back. That is the hard limit.\n\nMicrosoft also gives guidance for your own code: limit the time your plug-in takes to execute to no more than two seconds. You cannot control the other plug-ins in the pipeline, so keep your share small. Trap: two seconds is the advice for a plug-in, not the hard limit of the platform.",
    "figure": {
     "type": "compare",
     "cols": [
      {
       "title": "Two minutes",
       "sub": "Hard limit",
       "items": [
        "The whole message operation",
        "Includes every synchronous and asynchronous plug-in",
        "Exceeded: everything rolls back"
       ]
      },
      {
       "title": "Two seconds",
       "sub": "Microsoft guidance",
       "items": [
        "Your own plug-in",
        "You cannot control the others",
        "Longer work: consider asynchronous"
       ]
      }
     ]
    }
   },
   {
    "heading": "Keep the class stateless",
    "body": "The platform caches plug-in instances, and several threads can run the same instance at the same time. If you store a service or a value in a field, one call can overwrite the data of another call. This causes bugs that are very hard to find.\n\nSo get the services and the context inside Execute and keep them in local variables. A constant is fine, because it never changes. Anything that changes with each call must not be stored in the class.",
    "code": {
     "lang": "csharp",
     "text": "public class AccountPlugin : IPlugin\n{\n    // WRONG: shared by every call, because the platform reuses this instance\n    private IOrganizationService _service;\n\n    public void Execute(IServiceProvider serviceProvider)\n    {\n        // RIGHT: keep the context and services in local variables\n        var context = (IPluginExecutionContext)\n            serviceProvider.GetService(typeof(IPluginExecutionContext));\n    }\n}"
    }
   },
   {
    "heading": "Run only when needed",
    "body": "Without filtering attributes, an Update step runs every time any column of the table is updated. So always set filtering attributes on Update steps, and set the Primary Entity so the step does not run for every table.\n\nRegister each step only once. A duplicate step registration makes the plug-in fire several times for the same message. In the code, exit early when the work is not needed, so the plug-in stops after one cheap check.",
    "code": {
     "lang": "csharp",
     "text": "// Exit early: do nothing unless the column we care about is in the request\nEntity target = (Entity)context.InputParameters[\"Target\"];\nif (!target.Contains(\"creditlimit\"))\n{\n    return;\n}\n// ... the real work starts here"
    },
    "figure": {
     "type": "compare",
     "cols": [
      {
       "title": "No filtering attributes",
       "items": [
        "Runs on every update of the table",
        "Even when nothing you care about changed"
       ]
      },
      {
       "title": "Filtering attributes set",
       "items": [
        "Runs only when a listed column is in the update",
        "Never list the primary key"
       ]
      }
     ],
     "caption": "Set the Primary Entity too, or the step runs for every table that supports the message."
    }
   },
   {
    "heading": "Do less in each run",
    "body": "Do not use ExecuteMultipleRequest or ExecuteTransactionRequest inside a plug-in. Make normal single requests instead. When you need the old value of a column, use a Pre Image, not a Retrieve call. In an image, select only the columns you need, because the default is all columns.\n\nAvoid cancelling an operation in PreOperation or PostOperation, because the rollback has a significant cost. Cancel in PreValidation. If a job is slow and the user does not need its result, move it out of the synchronous path, for example to an asynchronous step. Remember that asynchronous steps count in the two-minute limit too.",
    "figure": {
     "type": "compare",
     "cols": [
      {
       "title": "Avoid",
       "tone": "bad",
       "items": [
        "ExecuteMultipleRequest or ExecuteTransactionRequest",
        "Retrieve just to read an old value",
        "Images with every column",
        "Cancelling in PreOperation or PostOperation"
       ]
      },
      {
       "title": "Prefer",
       "tone": "good",
       "items": [
        "Normal single requests",
        "A Pre Image",
        "Only the columns you need",
        "Cancelling in PreValidation"
       ]
      }
     ]
    }
   }
  ],
  "steps": [
   "Open the Plug-in Registration tool with pac tool prt and expand your assembly to list its steps.",
   "For every Update step, set Filtering Attributes with only the columns that change. Do not add the primary key.",
   "Look for the same message, table and stage registered twice, and unregister the duplicate.",
   "Open each image and keep only the columns your code reads.",
   "In your code, look for fields that store a service or context data. Move them into Execute as local variables.",
   "Search the project for ExecuteMultipleRequest and ExecuteTransactionRequest, and replace them with single requests.",
   "Use plug-in telemetry or the trace log to find the slow steps, and move work that can wait to an asynchronous step."
  ],
  "example": "Contoso's credit limit plug-in is slow. Tom opens the Plug-in Registration tool and finds three problems. The Update step has no filtering attributes, so it fires on every account update. The same step is registered twice. The Pre Image selects all columns. He sets creditlimit as the only filtering attribute, unregisters the duplicate step and keeps two columns in the image. Now the plug-in runs only when the credit limit is in the request, and only once.",
  "examTips": [
   "Trap: the hard limit is two minutes for the whole operation, with all sync and async plug-ins. Two seconds is only the guidance for your own plug-in.",
   "IPlugin classes must be stateless. The platform caches the instance, and many threads can run it at once.",
   "Trap: do not use ExecuteMultipleRequest or ExecuteTransactionRequest inside a plug-in.",
   "Always set filtering attributes on Update steps, or the plug-in runs on every update. Registering the same step twice makes it fire twice."
  ],
  "glossary": [
   {
    "term": "Stateless",
    "def": "A class that keeps nothing between calls. It stores no service or context data in fields."
   },
   {
    "term": "Filtering attributes",
    "def": "The columns that trigger an Update step. If none are set, the step runs on every update of the table."
   },
   {
    "term": "Rollback",
    "def": "Undoing all the changes of a transaction because something failed or took too long."
   },
   {
    "term": "Duplicate step",
    "def": "The same plug-in registered twice for one message and stage. It fires more than once for each event."
   }
  ]
 },
 "scenes": [
  {
   "title": "Users wait for plug-ins",
   "caption": "A synchronous plug-in makes the user wait. Plug-in design is also performance design.",
   "say": "A synchronous plug-in makes the user wait. If Maya clicks Save and three plug-ins run, she waits for all of them. Too many plug-ins, or slow ones, can freeze the app. In the worst case, the operation times out and everything is rolled back. So plug-in design is also performance design. Let's look at the limits, and then at a few habits that keep plug-ins fast."
  },
  {
   "title": "Two clocks",
   "caption": "Two minutes is the hard limit for the whole operation. Two seconds is the guidance for your own plug-in.",
   "say": "There are two clocks. A Dataverse operation, with all its synchronous and asynchronous plug-ins together, must finish within two minutes, or it is rolled back. That is the hard limit. Microsoft also advises that your own plug-in should run for no more than two seconds. That is guidance, not the hard limit. The exam likes to mix them up. Two seconds for you, two minutes for the whole operation."
  },
  {
   "title": "Stay stateless",
   "caption": "The platform reuses one cached instance on many threads. Keep services and context in local variables.",
   "say": "Habit one: stay stateless. The platform caches your plug-in instance, and several threads can run the same instance at the same time. If you store a service or a value in a field, one call can overwrite another. Keep services and context in local variables inside Execute. A constant is fine. Anything that changes with each call is not."
  },
  {
   "title": "Run only when needed",
   "caption": "Set filtering attributes on Update steps. Register each step once. Select only needed image columns.",
   "say": "Habit two: run only when needed. On Update, always set filtering attributes. Without them, the step runs on every update to the table. Register each step once, because a duplicate registration makes the plug-in fire several times for the same message. And select only the columns you need in entity images, because the default is all columns."
  },
  {
   "title": "Do less in each run",
   "caption": "No ExecuteMultiple or ExecuteTransaction in plug-ins. Use images instead of Retrieve. Avoid late cancels.",
   "say": "Habit three: do less in each run. Do not use Execute Multiple or Execute Transaction requests inside a plug-in. Use a Pre Image instead of a Retrieve call to get old values. Avoid cancelling in PreOperation or PostOperation, because the rollback is expensive. If work is slow and the user does not need the result, move it out of the plug-in."
  },
  {
   "title": "What the exam asks",
   "caption": "Two minutes versus two seconds, stateless classes, no batch requests, filtering attributes, no duplicate steps.",
   "say": "On the exam: the whole operation has two minutes, and your plug-in should take two seconds at most. Plug-in classes must be stateless. Do not use Execute Multiple or Execute Transaction requests. Always set filtering attributes on Update steps. And never register the same step twice, because it fires more than once."
  }
 ],
 "check": [
  {
   "stem": "How long should your own plug-in run, according to Microsoft's guidance?",
   "options": [
    "No more than two minutes",
    "No more than two seconds",
    "No more than twenty seconds",
    "As long as it needs"
   ],
   "answer": 1,
   "explanation": "The guidance for your own plug-in is no more than two seconds. Two minutes is the limit for the whole operation."
  },
  {
   "stem": "An operation and all its plug-ins take longer than two minutes. What happens?",
   "options": [
    "Dataverse only logs a warning",
    "The remaining plug-ins are skipped",
    "The operation is rolled back",
    "The user gets extra time"
   ],
   "answer": 2,
   "explanation": "A Dataverse message operation must complete within two minutes, or it is rolled back."
  },
  {
   "stem": "Which request classes should you not use inside a plug-in?",
   "options": [
    "ExecuteMultiple and ExecuteTransaction",
    "Create and Update",
    "Retrieve and RetrieveMultiple",
    "Associate and Disassociate"
   ],
   "answer": 0,
   "explanation": "Do not use ExecuteMultipleRequest or ExecuteTransactionRequest in a plug-in. Use single requests."
  },
  {
   "stem": "What happens to an Update step that has no filtering attributes?",
   "options": [
    "It never runs",
    "It runs only for the primary key",
    "It runs only in PostOperation",
    "It runs on every update to the table"
   ],
   "answer": 3,
   "explanation": "Without filtering attributes, the plug-in executes every time an update message occurs for that table."
  }
 ],
 "reto": {
  "text": "Pick one Update step in your environment.\nAdd the right filtering attribute and trim its image columns.\nCheck that no duplicate step exists for the same message.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/power-apps/developer/data-platform/analyze-performance"
},
{
 "id": "P29",
 "module": 6,
 "title": "Custom APIs and business events",
 "level": "exam",
 "minutes": 13,
 "skills": [
  "3.1d",
  "3.1f"
 ],
 "theory": {
  "intro": "Dataverse comes with messages such as Create and Update. A custom API lets you add your own message, like a new button on the remote control. A business event uses the same idea to tell other systems that something important just happened.",
  "sections": [
   {
    "heading": "A custom API is a new message",
    "body": "A custom API creates a new message that callers can invoke through the Web API or the Dataverse SDK for .NET, just like any other operation. You define it with data: a unique name, request parameters and response properties.\n\nMost of the time you combine it with a plug-in, which holds the logic. But a plug-in is not required. Custom APIs are the modern alternative to custom process actions, and they give developers more options. You can create one with the Plug-in Registration tool, with forms in the maker portal, with code, or with solution files.",
    "figure": {
     "type": "flow",
     "active": 1,
     "nodes": [
      {
       "title": "Caller",
       "desc": "Web API or Dataverse SDK for .NET"
      },
      {
       "title": "Your custom API",
       "desc": "A new message with a unique name"
      },
      {
       "title": "Plug-in",
       "desc": "Optional; runs in the main operation"
      },
      {
       "title": "Response properties",
       "desc": "Returned by name"
      }
     ]
    }
   },
   {
    "heading": "Function or action, binding and privilege",
    "body": "Is Function decides the kind. A function is called with an HTTP GET. It returns data and changes nothing, and it must have at least one response property. An action is called with POST. The Dataverse connector in Power Automate performs only actions. Trap: you cannot change a function into an action, or the other way round, after you create the custom API.\n\nBinding Type can be Global (no table), Entity (one row, with an automatic Target parameter of type EntityReference) or EntityCollection. To require a privilege, set Execute Privilege Name. You must use an existing privilege.",
    "figure": {
     "type": "compare",
     "cols": [
      {
       "title": "Function",
       "sub": "Is Function = Yes",
       "items": [
        "Called with HTTP GET",
        "Returns data and changes nothing",
        "Needs at least one response property"
       ]
      },
      {
       "title": "Action",
       "sub": "Is Function = No",
       "items": [
        "Called with HTTP POST",
        "The only kind the Dataverse connector in Power Automate performs"
       ]
      }
     ],
     "caption": "Decide early: a function cannot become an action later, or the other way round."
    }
   },
   {
    "heading": "The plug-in behind it",
    "body": "The plug-in for a custom API is a normal IPlugin class. The request parameter values arrive in InputParameters, by their unique names. You set the response properties in OutputParameters, by their unique names.\n\nYou register the assembly, but you do not register a step. You set the Plugin Type on the custom API instead. The plug-in runs in the main operation, stage 30, so it is good practice to check the message name and the stage. You cannot pass secure or unsecure configuration to this plug-in. The workaround is a PostOperation step on the custom API message.",
    "code": {
     "lang": "csharp",
     "text": "public void Execute(IServiceProvider serviceProvider)\n{\n    var context = (IPluginExecutionContext)\n        serviceProvider.GetService(typeof(IPluginExecutionContext));\n\n    // Main operation of the custom API message\n    if (context.MessageName == \"contoso_FormatAccountName\" && context.Stage == 30)\n    {\n        // Request parameter: read it from InputParameters\n        string raw = (string)context.InputParameters[\"RawName\"];\n        // Response property: write it to OutputParameters\n        context.OutputParameters[\"CleanName\"] = raw.Trim().ToUpperInvariant();\n    }\n}"
    }
   },
   {
    "heading": "Calling it, and letting others extend it",
    "body": "With the Web API, an action is a POST to the message name and a function is a GET. With the SDK, you build an OrganizationRequest with the unique name, add parameters by name, call Execute, and read the response by name.\n\nThe Allowed Custom Processing Step Type decides who else can add steps to your message: None, Async Only or Sync and Async. If you do not want to support other developers, set Is Private to true before you ship the managed solution. Trap: Is Private hides the message from the $metadata document and from code generation tools, but it does not block callers who know the name. Also, a private custom API cannot be used inside a plug-in.",
    "code": {
     "lang": "csharp",
     "text": "var req = new OrganizationRequest(\"contoso_FormatAccountName\")\n{\n    [\"RawName\"] = \"  contoso ltd  \"\n};\n\nOrganizationResponse resp = service.Execute(req);\nstring clean = (string)resp[\"CleanName\"];   // CONTOSO LTD"
    },
    "figure": {
     "type": "matrix",
     "corner": "Allowed Custom Processing Step Type",
     "cols": [
      "Async steps by others",
      "Sync steps by others"
     ],
     "rows": [
      {
       "label": "None",
       "cells": [
        false,
        false
       ]
      },
      {
       "label": "Async Only",
       "cells": [
        true,
        false
       ]
      },
      {
       "label": "Sync and Async",
       "cells": [
        true,
        true
       ]
      }
     ],
     "caption": "Async Only lets others react to your message without changing or cancelling it."
    }
   },
   {
    "heading": "Business events: tell others it happened",
    "body": "A business event tells other systems that something important happened. You build one with a custom API, usually with Async Only and often with no plug-in at all. To expose it, you must add it to the event catalog. Subscribers are notified only after the operation completes successfully.\n\nPower Automate can listen to a business event with the trigger When an action is performed. Trap: Create, Update and Delete do not appear in that trigger. For row changes, use When a row is added, modified or deleted. Also remember that business events are for notifying automation. Using them to move data is a misuse.",
    "figure": {
     "type": "flow",
     "active": 3,
     "nodes": [
      {
       "title": "Custom API",
       "desc": "Usually Async Only, often no plug-in"
      },
      {
       "title": "Event catalog",
       "desc": "Required to expose it"
      },
      {
       "title": "Operation succeeds",
       "desc": "No notification on failure"
      },
      {
       "title": "Subscribers notified",
       "desc": "For example When an action is performed"
      }
     ]
    }
   }
  ],
  "steps": [
   "Write a plug-in class that reads InputParameters and sets OutputParameters, then build the project.",
   "Register the assembly with the Plug-in Registration tool. You do not register a step.",
   "Create the custom API in the Plug-in Registration tool, or in the Power Apps maker portal. Set the Unique Name with your publisher prefix, the Binding Type and Is Function.",
   "Choose the Allowed Custom Processing Step Type: None, Async Only or Sync and Async.",
   "Add the request parameters and the response properties, each with a unique name and a type.",
   "Set the Plugin Type to your class. Set Execute Privilege Name if callers need a privilege.",
   "Add the custom API to a solution. Before you ship a managed solution, set Is Private to true if you do not support other developers, and Is Customizable to false.",
   "Test it with Postman or Insomnia for the Web API, or with an OrganizationRequest in C#."
  ],
  "example": "Contoso's web shop and its Power Apps app both need a clean account name. Alex creates a custom API called contoso_FormatAccountName. He makes it an action, because Power Automate can call only actions. The plug-in trims the text and makes it uppercase. He also creates a second custom API, contoso_AccountApproved, with Async Only and no plug-in. It is a business event: when it is cataloged, a Power Automate flow can start after every approval, without changing the approval process.",
  "examTips": [
   "Trap: you cannot change a custom API from function to action, or back, after you create it. A function uses GET, and an action uses POST.",
   "Trap: Is Private hides the API from $metadata and code generation. It does not block callers who know its name.",
   "A custom API plug-in reads request parameters from InputParameters and sets response properties in OutputParameters. Its logic runs in the main operation, stage 30.",
   "Business events notify only after the operation completes. Create, Update and Delete are not in the When an action is performed trigger. Use When a row is added, modified or deleted."
  ],
  "glossary": [
   {
    "term": "Custom API",
    "def": "A message you define yourself in Dataverse, with a name, request parameters and response properties. Callers use it like any other operation."
   },
   {
    "term": "Function and action",
    "def": "A function is called with GET and only returns data. An action is called with POST and can change data."
   },
   {
    "term": "Custom processing step type",
    "def": "The setting that decides whether other developers can add no steps, async steps only, or sync and async steps."
   },
   {
    "term": "Business event",
    "def": "A message that notifies subscribers, such as a Power Automate flow, after something important completes."
   },
   {
    "term": "Binding type",
    "def": "Whether the custom API is Global, bound to one row (Entity) or bound to a collection of rows (EntityCollection)."
   }
  ]
 },
 "scenes": [
  {
   "title": "Your own message",
   "caption": "A custom API is a new Dataverse message. Callers use it from the Web API or the SDK. A plug-in usually holds the logic.",
   "say": "Dataverse has built-in messages like Create and Update. A custom A P I lets you define your own message, with your own name, input parameters and response properties. Callers use it through the Web A P I or the S D K for dot net, like any other operation. Usually a plug-in holds the logic, but a plug-in is not required. Think of it as a new button on the Dataverse remote control."
  },
  {
   "title": "Function or action",
   "caption": "A function uses GET and only returns data. An action uses POST. You cannot change this choice later.",
   "say": "First decision: function or action. A function is called with G E T, and returns data without changing anything. It must have at least one response property. An action is called with P O S T, and can change data. The Dataverse connector in Power Automate only performs actions. And remember, you cannot change this choice after you create the custom A P I, so decide early."
  },
  {
   "title": "The plug-in behind it",
   "caption": "Read request parameters from InputParameters. Write response properties to OutputParameters. Register the assembly, not a step.",
   "say": "The plug-in behind a custom A P I implements I Plugin like any other plug-in. The request parameters arrive in InputParameters, by name. You write the answer into OutputParameters, by name. You register only the assembly, not a step, and set the plug-in type on the custom A P I. It runs in stage thirty, the main operation, so check the message name and the stage. Secure and unsecure configuration is not available for this plug-in."
  },
  {
   "title": "Calling it",
   "caption": "Web API: POST for an action, GET for a function. SDK: an OrganizationRequest with the unique name.",
   "say": "Calling it is easy. With the Web A P I, an action is a P O S T to the message name, and a function is a G E T. In C sharp, you build an Organization Request with the unique name of the custom A P I, add parameters by name, call Execute, and read the response by name. If the custom A P I is bound to a table, the Target parameter is created for you as an entity reference."
  },
  {
   "title": "Who else may extend it",
   "caption": "The custom processing step type decides. Set Is Private to true if you do not support other developers.",
   "say": "Who else may extend your custom A P I? The custom processing step type decides. None allows no extra steps. Async Only lets others detect the operation after it finishes, but not cancel it or change it. Sync and Async lets them change the behavior and even cancel. To protect it, set the execute privilege name to an existing privilege. And if you do not support other developers, set Is Private to true before you ship."
  },
  {
   "title": "Business events",
   "caption": "A business event notifies subscribers after the operation completes. It is for notifying, never for moving data.",
   "say": "A business event tells other systems that something important happened. You build it as a custom A P I, often with Async Only and no plug-in, and then you add it to the event catalog. Subscribers are notified only after the operation completes successfully. Power Automate can listen with the trigger When an action is performed. Use business events to notify, never to move data. That is a misuse."
  },
  {
   "title": "What the exam asks",
   "caption": "GET or POST is fixed, InputParameters in, OutputParameters out, Is Private does not block callers.",
   "say": "Exam rules. A function uses G E T and an action uses P O S T, and you cannot change it later. The plug-in reads InputParameters and sets OutputParameters, in the main operation. Is Private hides the message from metadata, but it does not block callers. Create, Update and Delete do not appear in the When an action is performed trigger. For row changes, use When a row is added, modified or deleted."
  }
 ],
 "check": [
  {
   "stem": "Which HTTP method calls a custom API that is a function?",
   "options": [
    "POST",
    "PATCH",
    "DELETE",
    "GET"
   ],
   "answer": 3,
   "explanation": "A function supports GET and returns data. An action uses POST."
  },
  {
   "stem": "Where does the plug-in of a custom API read the request parameters?",
   "options": [
    "InputParameters",
    "OutputParameters",
    "PreEntityImages",
    "SharedVariables"
   ],
   "answer": 0,
   "explanation": "Request parameters are in InputParameters. You set the response properties in OutputParameters."
  },
  {
   "stem": "What does Is Private = true do for a custom API?",
   "options": [
    "It blocks every caller who knows its name",
    "It removes the API from the managed solution",
    "It hides it from metadata and code tools",
    "It forces the plug-in to run asynchronously"
   ],
   "answer": 2,
   "explanation": "Is Private hides the API from the $metadata document and code generation. It does not block callers who know the name."
  },
  {
   "stem": "When does a business event notify its subscribers?",
   "options": [
    "As soon as the request arrives",
    "After the operation completes",
    "Only when the operation fails",
    "Every time a row is read"
   ],
   "answer": 1,
   "explanation": "Custom business events send notifications only when the event is completed."
  }
 ],
 "reto": {
  "text": "Create a custom API named with your publisher prefix, with one text parameter and one text response.\nWrite and register a plug-in that returns the text in uppercase.\nCall it from the SDK with an OrganizationRequest.",
  "minutes": 35
 },
 "source": "https://learn.microsoft.com/power-apps/developer/data-platform/custom-api"
},
{
 "id": "P30",
 "module": 6,
 "title": "Managed identity for plug-ins",
 "level": "intermediate",
 "minutes": 10,
 "skills": [
  "3.1g"
 ],
 "theory": {
  "intro": "Sometimes a plug-in must call Azure, for example to read a key from Azure Key Vault. To do that, it must prove who it is. Power Platform managed identity gives the plug-in a trusted identity, like a building badge instead of a password on a sticky note.",
  "sections": [
   {
    "heading": "The problem: secrets in plug-in code",
    "body": "To call a protected Azure resource, a plug-in needs credentials. Keeping a secret in the code or in a configuration value is risky, and someone has to look after it.\n\nPower Platform managed identity removes this problem. It allows Dataverse plug-ins to connect to Azure resources that support Azure managed identity, without you managing the credentials. The key benefits are simpler authentication, less credential management, and better security because there is less to attack. A typical example is a plug-in that reads keys and secrets from Azure Key Vault.",
    "figure": {
     "type": "compare",
     "cols": [
      {
       "title": "Secret in code or configuration",
       "tone": "bad",
       "items": [
        "Someone must store and rotate it",
        "It can leak"
       ]
      },
      {
       "title": "Power Platform managed identity",
       "tone": "good",
       "items": [
        "No credentials to manage",
        "Works with Azure resources that support managed identity"
       ]
      }
     ]
    }
   },
   {
    "heading": "How it works, and what you create",
    "body": "Power Platform managed identity relies on federated identity credentials (FIC). You create either an app registration or a user-assigned managed identity (UAMI) in Microsoft Entra ID. An app registration gives you an app identity linked to the plug-in, so you can apply Azure policies. A UAMI is the choice when you need a service principal.\n\nThe FIC is configured on that app registration or UAMI. It tells Entra ID to trust token requests from your signed plug-in. You sign the plug-in assembly, or the plug-in package, with a certificate. This feature is generally available for Dataverse plug-ins and for plug-ins with dependent assemblies.",
    "figure": {
     "type": "flow",
     "active": 2,
     "nodes": [
      {
       "title": "Signed plug-in",
       "desc": "Assembly or package"
      },
      {
       "title": "Managed identity record",
       "desc": "In Dataverse"
      },
      {
       "title": "App registration or UAMI",
       "desc": "With a federated identity credential"
      },
      {
       "title": "Token",
       "desc": "For the Azure resource"
      }
     ],
     "caption": "The trust lives in Microsoft Entra ID and in the signed plug-in, not in your code."
    }
   },
   {
    "heading": "In your plug-in code",
    "body": "In the plug-in, you use IManagedIdentityService to request a token. Its AcquireToken method takes a list of scopes and returns the token as a string. You then use that token to call the Azure resource.\n\nSee what is missing from the code: there is no password, no client secret and no connection string with a key. The trust lives in Entra ID and in the signed plug-in, not in your code.",
    "code": {
     "lang": "csharp",
     "text": "// Method of IManagedIdentityService, used inside your plug-in:\nstring AcquireToken(IEnumerable<string> scopes);\n\n// You pass the scopes of the Azure resource you want to call,\n// and you get back an access token string.\n// No secret appears anywhere in your code."
    }
   },
   {
    "heading": "Version 2 and certificates",
    "body": "Use version 2 for all new and existing plug-ins. Version 2 builds the FIC from a hash of the certificate's full distinguished name. It produces a fixed-length, ASCII-only subject identifier, so it works with any certificate name.\n\nVersion 1 is based on the certificate common name (CN). It fails when the CN has non-ASCII characters, such as accented letters (error AADSTS70050), or commas (error AADSTS700213). Version 0 is deprecated. You can move an existing plug-in to version 2 without rebuilding or re-registering it.\n\nTrap: use a self-signed certificate only for development or testing. In production, use a trusted certificate.",
    "figure": {
     "type": "compare",
     "cols": [
      {
       "title": "Version 1",
       "sub": "Certificate common name (CN)",
       "tone": "bad",
       "items": [
        "Fails with non-ASCII characters (AADSTS70050)",
        "Fails with commas (AADSTS700213)"
       ]
      },
      {
       "title": "Version 2",
       "sub": "Hash of the full distinguished name",
       "tone": "good",
       "items": [
        "Fixed length, ASCII only",
        "Works with any certificate name",
        "Use it for new and existing plug-ins"
       ]
      }
     ]
    }
   }
  ],
  "steps": [
   "In Microsoft Entra ID, create an app registration or a user-assigned managed identity. Note the application (client) ID and the tenant ID.",
   "In Visual Studio, write the plug-in and call AcquireToken of IManagedIdentityService to get a token.",
   "Sign the plug-in assembly with SignTool, or the plug-in package with nuget sign. Use a trusted certificate in production.",
   "Register the plug-in with the Plug-in Registration tool.",
   "In the Azure portal, open your app or identity. Go to Certificates and secrets, Federated credentials, Add credential, and choose Other issuer. Select Explicit subject identifier and enter the version 2 subject.",
   "Create the managed identity record in Dataverse with version 2, and bind your plug-in assembly or package to it.",
   "Give the app or identity access to the Azure resource, such as Azure Key Vault. Then trigger the plug-in to validate."
  ],
  "example": "Contoso's plug-in must read a tax key from Azure Key Vault when an invoice is created. Before, Dan stored a client secret in the secure configuration of the step. Now Dan creates an app registration, signs the plug-in with a trusted certificate and configures a federated identity credential with the version 2 subject identifier. He creates the managed identity record in Dataverse and gives the app access to the Key Vault. The plug-in calls AcquireToken and reads the key. No secret is stored anywhere.",
  "examTips": [
   "Power Platform managed identity lets Dataverse plug-ins reach Azure resources, such as Key Vault, without you managing credentials.",
   "Setup starts in Microsoft Entra ID: create an app registration or a user-assigned managed identity. The federated identity credential (FIC) is configured on it.",
   "Use version 2 for all new and existing plug-ins. Version 1 fails with non-ASCII characters or commas in the certificate name.",
   "Trap: a self-signed certificate is for development or testing only. Production needs a trusted certificate."
  ],
  "glossary": [
   {
    "term": "Managed identity",
    "def": "An identity in Microsoft Entra ID that a service uses to get tokens, so you do not store passwords or secrets."
   },
   {
    "term": "UAMI",
    "def": "User-assigned managed identity. It is an Azure identity you create and assign, and it can be used as a service principal."
   },
   {
    "term": "FIC",
    "def": "Federated identity credential. It tells Entra ID to trust tokens from another system, here the signed Dataverse plug-in."
   },
   {
    "term": "Scope",
    "def": "The permission or resource a token is requested for. You pass scopes to AcquireToken."
   }
  ]
 },
 "scenes": [
  {
   "title": "The sticky-note problem",
   "caption": "A plug-in that calls Azure needs to prove who it is. A stored secret is a risk.",
   "say": "A plug-in sometimes needs to call Azure, for example to read a key from Azure Key Vault. To do that, it must prove who it is. The old way is a secret stored somewhere, which someone must protect. A leaked secret is a real risk. It is like a password on a sticky note. Power Platform managed identity removes the sticky note."
  },
  {
   "title": "A badge instead of a password",
   "caption": "Dataverse plug-ins reach Azure resources without managing credentials, using a federated identity credential in Entra ID.",
   "say": "With Power Platform managed identity, a Dataverse plug-in connects to Azure resources that support managed identity, without you managing credentials. It uses a federated identity credential, set on a user-assigned managed identity or on an app registration, in Microsoft Entra I D. The plug-in asks for a token, and Azure checks the trust. No secret travels in your code."
  },
  {
   "title": "Six setup steps",
   "caption": "Create the identity, sign and register the plug-in, configure the FIC, create the Dataverse record, grant access, validate.",
   "say": "Setup has six steps. Create an app registration or a user-assigned managed identity. Build, sign and register the plug-in. Configure the federated identity credential in the Azure portal. Create the managed identity record in Dataverse. Grant the identity access to the Azure resource. And validate by triggering the plug-in. The order matters, because each step needs the one before it."
  },
  {
   "title": "In the code",
   "caption": "Call AcquireToken with a list of scopes and receive a token. No password or secret in the code.",
   "say": "In the plug-in code, you use the managed identity service. Its AcquireToken method takes a list of scopes and returns a token as a string. You then use that token to call the Azure resource, such as Key Vault. Notice what is missing: there is no password, no client secret, and no key in your code. The trust lives in Entra I D and in the signed plug-in."
  },
  {
   "title": "Version two and certificates",
   "caption": "Use version 2. Version 1 fails with accented letters or commas in the certificate name. Self-signed is for testing only.",
   "say": "Always use version two. Version two builds a fixed-length, ASCII-only subject identifier, so it works with any certificate name. Version one is based on the certificate common name, and fails when the name has accented letters or commas. You sign the plug-in with a certificate. A self-signed certificate is only for development or testing. In production, use a trusted certificate."
  },
  {
   "title": "What the exam asks",
   "caption": "Azure access without stored credentials, app registration or UAMI first, version 2, and no self-signed certificate in production.",
   "say": "On the exam: managed identity lets plug-ins reach Azure resources without managing credentials. Setup starts by creating an app registration or a user-assigned managed identity in Entra I D. The federated identity credential is configured on that identity. Use version two. And never use a self-signed certificate in production."
  }
 ],
 "check": [
  {
   "stem": "What does Power Platform managed identity let a Dataverse plug-in do?",
   "options": [
    "Reach Azure resources without a secret",
    "Skip the database transaction completely",
    "Run without any step registration",
    "Call the Dataverse Web API directly"
   ],
   "answer": 0,
   "explanation": "It lets plug-ins connect to Azure resources that support managed identity, without you managing the credentials."
  },
  {
   "stem": "What is the first step of the managed identity setup?",
   "options": [
    "Grant the identity access to the Azure resource",
    "Create the managed identity record in Dataverse",
    "Create an app registration or managed identity",
    "Validate the integration by triggering the plug-in"
   ],
   "answer": 2,
   "explanation": "You start by creating an app registration or a user-assigned managed identity in Microsoft Entra ID."
  },
  {
   "stem": "Which version should you use for all new and existing plug-ins?",
   "options": [
    "Version 0",
    "Version 1",
    "Any version, they are the same",
    "Version 2"
   ],
   "answer": 3,
   "explanation": "Version 2 works with any certificate name. Version 1 fails with non-ASCII characters or commas, and version 0 is deprecated."
  },
  {
   "stem": "Which certificate should you use in production?",
   "options": [
    "A self-signed certificate",
    "A trusted certificate",
    "Any expired certificate",
    "No certificate at all"
   ],
   "answer": 1,
   "explanation": "Self-signed certificates are for development or testing only. Production needs a trusted certificate."
  }
 ],
 "reto": {
  "text": "Draw the six setup steps on paper, in order.\nMark which steps happen in Entra ID, in Dataverse and in Visual Studio.\nWrite which Azure resource your plug-in would call first.",
  "minutes": 15
 },
 "source": "https://learn.microsoft.com/power-platform/admin/managed-identity-overview"
}
);
