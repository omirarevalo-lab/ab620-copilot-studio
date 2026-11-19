// AB-400 exam metadata (skills measured as of 2026-10-16): domains, skill groups and skills. bullets = official bullet numbers inside the group.
window.AB620_META = {
 "exam": {
  "howTo": "How to do it",
  "code": "AB-400",
  "title": "Extending Microsoft Power Platform Solutions with Code and AI",
  "app": "AB-400 Workshop",
  "subject": "Power Platform development with code and AI",
  "skillsAsOf": "2026-10-16",
  "source": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-400"
 },
 "defaults": {
  "startDate": "2026-10-12",
  "examDate": "2026-12-18"
 },
 "splits": {
  "mock": {
   "D1": 9,
   "D2": 14,
   "D3": 19,
   "D4": 8
  },
  "short": {
   "D1": 4,
   "D2": 5,
   "D3": 8,
   "D4": 3
  }
 },
 "domains": [
  {
   "id": "D1",
   "name": "Build Microsoft Power Platform solutions",
   "weight": [
    15,
    20
   ],
   "color": "--d1"
  },
  {
   "id": "D2",
   "name": "Extend the user experience",
   "weight": [
    25,
    30
   ],
   "color": "--d2"
  },
  {
   "id": "D3",
   "name": "Extend Microsoft Power Platform",
   "weight": [
    35,
    40
   ],
   "color": "--d3"
  },
  {
   "id": "D4",
   "name": "Develop integrations",
   "weight": [
    10,
    15
   ],
   "color": "--d4"
  }
 ],
 "groups": [
  {
   "id": "1.1",
   "domain": "D1",
   "title": "Design the technical architecture"
  },
  {
   "id": "1.2",
   "domain": "D1",
   "title": "Design solution components"
  },
  {
   "id": "1.3",
   "domain": "D1",
   "title": "Application lifecycle management (ALM)"
  },
  {
   "id": "2.1",
   "domain": "D2",
   "title": "Client scripting in model-driven apps"
  },
  {
   "id": "2.2",
   "domain": "D2",
   "title": "PCF code components"
  },
  {
   "id": "2.3",
   "domain": "D2",
   "title": "Build Power Apps code apps"
  },
  {
   "id": "2.4",
   "domain": "D2",
   "title": "Deploy and manage code apps"
  },
  {
   "id": "3.1",
   "domain": "D3",
   "title": "Dataverse plug-ins"
  },
  {
   "id": "3.2",
   "domain": "D3",
   "title": "Platform APIs"
  },
  {
   "id": "3.3",
   "domain": "D3",
   "title": "Azure Functions"
  },
  {
   "id": "3.4",
   "domain": "D3",
   "title": "Cloud flows and Copilot Studio workflows"
  },
  {
   "id": "3.5",
   "domain": "D3",
   "title": "Foundry agents built with code"
  },
  {
   "id": "4.1",
   "domain": "D4",
   "title": "Publish and consume Dataverse events"
  },
  {
   "id": "4.2",
   "domain": "D4",
   "title": "Synchronize Dataverse data"
  },
  {
   "id": "4.3",
   "domain": "D4",
   "title": "Custom connectors"
  }
 ],
 "skills": [
  {
   "id": "1.1a",
   "domain": "D1",
   "group": "1.1",
   "label": "Solution components and out-of-the-box first",
   "bullets": [
    1,
    3
   ]
  },
  {
   "id": "1.1b",
   "domain": "D1",
   "group": "1.1",
   "label": "Authentication and authorization design",
   "bullets": [
    2
   ]
  },
  {
   "id": "1.1c",
   "domain": "D1",
   "group": "1.1",
   "label": "Where business logic runs (deterministic or not)",
   "bullets": [
    4,
    7
   ]
  },
  {
   "id": "1.1d",
   "domain": "D1",
   "group": "1.1",
   "label": "Standard, virtual, elastic tables or connectors",
   "bullets": [
    5
   ]
  },
  {
   "id": "1.1e",
   "domain": "D1",
   "group": "1.1",
   "label": "Impact of security features",
   "bullets": [
    6
   ]
  },
  {
   "id": "1.1f",
   "domain": "D1",
   "group": "1.1",
   "label": "Choosing the user experience technology",
   "bullets": [
    8
   ]
  },
  {
   "id": "1.1g",
   "domain": "D1",
   "group": "1.1",
   "label": "Foundry or Copilot Studio for agents",
   "bullets": [
    9
   ]
  },
  {
   "id": "1.2a",
   "domain": "D1",
   "group": "1.2",
   "label": "Reusable UI: generative pages, PCF, client scripting, code apps",
   "bullets": [
    1,
    6
   ]
  },
  {
   "id": "1.2b",
   "domain": "D1",
   "group": "1.2",
   "label": "Custom connectors and MCP servers",
   "bullets": [
    2
   ]
  },
  {
   "id": "1.2c",
   "domain": "D1",
   "group": "1.2",
   "label": "Plug-ins and custom APIs (design)",
   "bullets": [
    3
   ]
  },
  {
   "id": "1.2d",
   "domain": "D1",
   "group": "1.2",
   "label": "Cloud flows and Copilot Studio workflows (design)",
   "bullets": [
    4
   ]
  },
  {
   "id": "1.2e",
   "domain": "D1",
   "group": "1.2",
   "label": "Inbound and outbound integrations with Azure",
   "bullets": [
    5
   ]
  },
  {
   "id": "1.2f",
   "domain": "D1",
   "group": "1.2",
   "label": "Custom agents that integrate with Power Platform",
   "bullets": [
    7
   ]
  },
  {
   "id": "1.2g",
   "domain": "D1",
   "group": "1.2",
   "label": "Monitoring and alerting",
   "bullets": [
    8
   ]
  },
  {
   "id": "1.3a",
   "domain": "D1",
   "group": "1.3",
   "label": "Solution dependencies and layers",
   "bullets": [
    1,
    3
   ]
  },
  {
   "id": "1.3b",
   "domain": "D1",
   "group": "1.3",
   "label": "Environment variables",
   "bullets": [
    2
   ]
  },
  {
   "id": "1.3c",
   "domain": "D1",
   "group": "1.3",
   "label": "Power Platform Pipelines",
   "bullets": [
    4
   ]
  },
  {
   "id": "1.3d",
   "domain": "D1",
   "group": "1.3",
   "label": "CI/CD with Power Platform Build Tools",
   "bullets": [
    5
   ]
  },
  {
   "id": "2.1a",
   "domain": "D2",
   "group": "2.1",
   "label": "Client API object model and event handlers",
   "bullets": [
    1,
    2
   ]
  },
  {
   "id": "2.1b",
   "domain": "D2",
   "group": "2.1",
   "label": "Client scripts that call the Dataverse Web API",
   "bullets": [
    3
   ]
  },
  {
   "id": "2.1c",
   "domain": "D2",
   "group": "2.1",
   "label": "Commands and buttons with Power Fx and JavaScript",
   "bullets": [
    4
   ]
  },
  {
   "id": "2.1d",
   "domain": "D2",
   "group": "2.1",
   "label": "Navigation, dialogs and notifications",
   "bullets": [
    5
   ]
  },
  {
   "id": "2.2a",
   "domain": "D2",
   "group": "2.2",
   "label": "Lifecycle events and component interfaces",
   "bullets": [
    1,
    3
   ]
  },
  {
   "id": "2.2b",
   "domain": "D2",
   "group": "2.2",
   "label": "The component manifest",
   "bullets": [
    2
   ]
  },
  {
   "id": "2.2c",
   "domain": "D2",
   "group": "2.2",
   "label": "Package, deploy and consume a component",
   "bullets": [
    4
   ]
  },
  {
   "id": "2.2d",
   "domain": "D2",
   "group": "2.2",
   "label": "Device, Utility and Web API features",
   "bullets": [
    5
   ]
  },
  {
   "id": "2.3a",
   "domain": "D2",
   "group": "2.3",
   "label": "Connections and environment variables in code apps",
   "bullets": [
    1,
    7
   ]
  },
  {
   "id": "2.3b",
   "domain": "D2",
   "group": "2.3",
   "label": "Dataverse tables, metadata, actions and functions",
   "bullets": [
    2,
    3,
    4
   ]
  },
  {
   "id": "2.3c",
   "domain": "D2",
   "group": "2.3",
   "label": "Cloud flows and Copilot Studio agents from code apps",
   "bullets": [
    5,
    6
   ]
  },
  {
   "id": "2.4a",
   "domain": "D2",
   "group": "2.4",
   "label": "Content Security Policy (CSP)",
   "bullets": [
    1
   ]
  },
  {
   "id": "2.4b",
   "domain": "D2",
   "group": "2.4",
   "label": "Package, deploy and share code apps",
   "bullets": [
    3
   ]
  },
  {
   "id": "2.4c",
   "domain": "D2",
   "group": "2.4",
   "label": "Monitoring, troubleshooting and performance",
   "bullets": [
    2,
    4,
    5
   ]
  },
  {
   "id": "3.1a",
   "domain": "D3",
   "group": "3.1",
   "label": "Event pipeline stages and execution context",
   "bullets": [
    1,
    2
   ]
  },
  {
   "id": "3.1b",
   "domain": "D3",
   "group": "3.1",
   "label": "Business logic, images and the Organization service",
   "bullets": [
    3,
    4,
    5
   ]
  },
  {
   "id": "3.1c",
   "domain": "D3",
   "group": "3.1",
   "label": "Plug-in performance",
   "bullets": [
    6
   ]
  },
  {
   "id": "3.1d",
   "domain": "D3",
   "group": "3.1",
   "label": "Custom API messages and their plug-ins",
   "bullets": [
    7,
    9
   ]
  },
  {
   "id": "3.1e",
   "domain": "D3",
   "group": "3.1",
   "label": "Plug-in Registration Tool",
   "bullets": [
    8
   ]
  },
  {
   "id": "3.1f",
   "domain": "D3",
   "group": "3.1",
   "label": "Dataverse business events",
   "bullets": [
    10
   ]
  },
  {
   "id": "3.1g",
   "domain": "D3",
   "group": "3.1",
   "label": "Managed identity for plug-ins",
   "bullets": [
    11
   ]
  },
  {
   "id": "3.2a",
   "domain": "D3",
   "group": "3.2",
   "label": "Dataverse Web API operations",
   "bullets": [
    1
   ]
  },
  {
   "id": "3.2b",
   "domain": "D3",
   "group": "3.2",
   "label": "Organization service and the .NET and Python SDKs",
   "bullets": [
    2,
    7
   ]
  },
  {
   "id": "3.2c",
   "domain": "D3",
   "group": "3.2",
   "label": "API limits and retry policies",
   "bullets": [
    3
   ]
  },
  {
   "id": "3.2d",
   "domain": "D3",
   "group": "3.2",
   "label": "Performance, concurrency, transactions and bulk operations",
   "bullets": [
    4
   ]
  },
  {
   "id": "3.2e",
   "domain": "D3",
   "group": "3.2",
   "label": "OAuth authentication",
   "bullets": [
    5
   ]
  },
  {
   "id": "3.2f",
   "domain": "D3",
   "group": "3.2",
   "label": "Background operations",
   "bullets": [
    6
   ]
  },
  {
   "id": "3.3a",
   "domain": "D3",
   "group": "3.3",
   "label": "Long-running work and scheduled or event triggers",
   "bullets": [
    1,
    2
   ]
  },
  {
   "id": "3.3b",
   "domain": "D3",
   "group": "3.3",
   "label": "Managed identities to reach Power Platform",
   "bullets": [
    3
   ]
  },
  {
   "id": "3.4a",
   "domain": "D3",
   "group": "3.4",
   "label": "Complex expressions",
   "bullets": [
    1
   ]
  },
  {
   "id": "3.4b",
   "domain": "D3",
   "group": "3.4",
   "label": "Flow control and error handling",
   "bullets": [
    2
   ]
  },
  {
   "id": "3.4c",
   "domain": "D3",
   "group": "3.4",
   "label": "Trigger filters and retry policies",
   "bullets": [
    3
   ]
  },
  {
   "id": "3.4d",
   "domain": "D3",
   "group": "3.4",
   "label": "Child flows",
   "bullets": [
    4
   ]
  },
  {
   "id": "3.4e",
   "domain": "D3",
   "group": "3.4",
   "label": "Dataverse connector with service principals",
   "bullets": [
    5
   ]
  },
  {
   "id": "3.5a",
   "domain": "D3",
   "group": "3.5",
   "label": "Power Platform MCP servers for custom agents",
   "bullets": [
    1
   ]
  },
  {
   "id": "3.5b",
   "domain": "D3",
   "group": "3.5",
   "label": "Custom agents and Copilot Studio agents (client library)",
   "bullets": [
    2,
    4
   ]
  },
  {
   "id": "3.5c",
   "domain": "D3",
   "group": "3.5",
   "label": "Work IQ for Dataverse data",
   "bullets": [
    3
   ]
  },
  {
   "id": "4.1a",
   "domain": "D4",
   "group": "4.1",
   "label": "Publishing events (service endpoint notification, Plug-in Registration Tool)",
   "bullets": [
    1,
    2
   ]
  },
  {
   "id": "4.1b",
   "domain": "D4",
   "group": "4.1",
   "label": "Service endpoints: webhooks, Service Bus, Event Hubs",
   "bullets": [
    3
   ]
  },
  {
   "id": "4.1c",
   "domain": "D4",
   "group": "4.1",
   "label": "Choosing how to listen to events",
   "bullets": [
    4
   ]
  },
  {
   "id": "4.2a",
   "domain": "D4",
   "group": "4.2",
   "label": "Change tracking",
   "bullets": [
    1
   ]
  },
  {
   "id": "4.2b",
   "domain": "D4",
   "group": "4.2",
   "label": "Alternate keys and UpsertRequest",
   "bullets": [
    2,
    3
   ]
  },
  {
   "id": "4.3a",
   "domain": "D4",
   "group": "4.3",
   "label": "Connector authentication",
   "bullets": [
    1
   ]
  },
  {
   "id": "4.3b",
   "domain": "D4",
   "group": "4.3",
   "label": "Policy templates",
   "bullets": [
    2
   ]
  },
  {
   "id": "4.3c",
   "domain": "D4",
   "group": "4.3",
   "label": "Import definitions and connectors for Azure services",
   "bullets": [
    3,
    4
   ]
  },
  {
   "id": "4.3d",
   "domain": "D4",
   "group": "4.3",
   "label": "Azure Functions and custom code in connectors",
   "bullets": [
    5,
    7
   ]
  },
  {
   "id": "4.3e",
   "domain": "D4",
   "group": "4.3",
   "label": "Extending the OpenAPI definition",
   "bullets": [
    6
   ]
  }
 ]
};
