import { q, CS, CON } from './qlib.mjs';

/* =========================  2.1  Enterprise knowledge  ========================= */

// 2.1a Copilot connectors
q('2.1a', 2,
  'Contoso quiere que su agente responda con citas sobre artículos de la base de conocimiento de ServiceNow, respetando los permisos de origen, y reutilizar ese contenido en Microsoft 365 Copilot. Aceptan que el contenido se indexe en Microsoft Graph. ¿Qué eliges?',
  'Un Copilot connector (antes Graph connector) que el administrador configura en el Microsoft 365 admin center',
  [
    'Un Power Platform connector como real-time knowledge, que consulta ServiceNow en cada pregunta con las credenciales de cada usuario y sin copiar nada a Microsoft Graph',
    'Un sitio web público agregado como Public website knowledge source',
    'Un agent flow que consulte ServiceNow con el conector HTTP en cada turno',
  ],
  'Los Copilot connectors indexan contenido externo en Microsoft Graph respetando las ACL del origen, con indexación semántica y citas, y se reutilizan en Copilot y Microsoft Search; los configura el administrador del tenant. Los Power Platform connectors consultan en vivo sin copiar datos (preview), más adecuados para datos al instante y transacciones.',
  CS + 'knowledge-graph-vs-power-platform-connectors');

q('2.1a', 3,
  'Tu agente usa un Copilot connector como knowledge source y publicas con Authenticate manually. En el flujo de pruebas el conector devuelve contenido, pero en el canal publicado no hay resultados. ¿Qué falta?',
  'Incluir el scope ExternalItem.Read.All en la configuración de autenticación manual',
  [
    'Solo el scope Files.Read.All en la autenticación manual',
    'Registrar el conector como custom connector en Power Apps',
    'Activar Allow ungrounded responses en los Generative AI settings para que el agente responda sin fuentes',
  ],
  'Los agentes que usan Copilot connectors como knowledge sources deben configurarse con la autenticación correcta al publicar en canales: hay que proporcionar el scope ExternalItem.Read.All como parte de la configuración de autenticación manual. Files.Read.All y Sites.Read.All aplican a SharePoint en generative answers, no a Copilot connectors.',
  CS + 'knowledge-copilot-connectors');

q('2.1a', 2,
  'Comparas Copilot connectors con Power Platform connectors como fuentes de conocimiento. Elige dos afirmaciones verdaderas sobre los Copilot connectors.',
  [
    'Copian e indexan el contenido externo en Microsoft Graph y respetan las ACL del origen',
    'Los configura el administrador en el Microsoft 365 admin center y luego aparecen en Add knowledge',
  ],
  [
    'Ejecutan cada consulta en vivo contra la API de origen sin mover datos',
    'Los crean los makers como conexiones por entorno en Power Platform',
    'Son la opción ideal para crear o actualizar registros (transacciones)',
  ],
  'Copilot connectors siguen el modelo index-then-answer: contenido indexado en Microsoft Graph, con ACL y citas, configurado por el administrador del tenant. Las consultas en vivo, las conexiones por entorno que crean los makers y las transacciones corresponden a los Power Platform connectors.',
  CS + 'knowledge-graph-vs-power-platform-connectors');

// 2.1b Power Platform connectors as knowledge
q('2.1b', 2,
  'Tu agente debe responder cuál es la prioridad actual del incidente INC-123 en ServiceNow, y la política prohíbe copiar los datos de tickets a Microsoft 365. El maker puede crear una conexión con credenciales del usuario. ¿Qué opción de conocimiento usas?',
  'Un Power Platform connector como real-time knowledge',
  [
    'Un Copilot connector indexado en Microsoft Graph',
    'Subir exportaciones CSV semanales como documentos',
    'Una Public website knowledge source con el portal de ServiceNow',
  ],
  'El conocimiento en tiempo real con Power Platform connectors (preview) ejecuta cada solicitud contra el sistema de origen con la identidad del usuario, sin replicar los datos. Un Copilot connector copiaría e indexaría el contenido en Microsoft Graph, y los CSV semanales o un sitio público no dan datos al instante ni respetan permisos.',
  CS + 'knowledge-real-time-connectors', true);

q('2.1b', 3,
  '¿Qué ocurre cuando agregas un Power Platform connector (por ejemplo, Azure SQL) como knowledge source en tiempo real?',
  'Solo se indexan metadatos (tablas y columnas); cada pregunta se ejecuta en vivo con el token del usuario',
  [
    'Se copian las filas de las tablas seleccionadas a Dataverse y se indexan cada noche',
    'Se indexa todo el contenido en Microsoft Graph conservando las ACL de origen',
    'Todas las consultas usan la identidad del maker, sin importar quién pregunte',
  ],
  'Con real-time knowledge, Microsoft solo indexa metadatos como nombres de tablas y columnas; no hay movimiento de datos y cada solicitud se procesa en tiempo de ejecución contra el sistema de destino, autenticada con el token del usuario, por lo que se conservan los controles de acceso. La conexión y las data policies son las mismas de Power Platform.',
  CS + 'knowledge-real-time-connectors', true);

q('2.1b', 3,
  'Contoso quiere un agente de soporte que (1) responda sobre políticas evergreen con búsqueda semántica y citas, (2) consulte el estado actual de tickets sin copiar los datos y (3) cree casos nuevos. ¿Qué combinación recomienda Microsoft para este escenario mixto?',
  'Copilot connectors para el contenido evergreen y Power Platform connectors para estado en vivo y transacciones',
  [
    'Solo Copilot connectors para los tres requisitos',
    'Solo Power Platform connectors, consultando también las políticas en vivo en cada pregunta y sin citas ni indexación',
    'Un servidor MCP distinto para cada uno de los tres requisitos',
  ],
  'El modo mixto recomendado indexa el contenido evergreen (políticas, FAQs) con Copilot connectors para obtener indexación semántica y citas, y usa Power Platform connectors para datos que no deben replicarse, información al minuto y transacciones como crear o actualizar casos. Un solo tipo no cubre los tres requisitos.',
  CS + 'knowledge-graph-vs-power-platform-connectors', true);

// 2.1c Azure AI Search
q('2.1c', 3,
  'Creaste el índice de Azure AI Search con Import and vectorize data y un modelo de embeddings. ¿Por qué Copilot Studio no necesita código propio para vectorizar la pregunta del usuario en tiempo de ejecución?',
  'Con integrated vectorization se usa el mismo modelo de embeddings para vectorizar la consulta entrante en runtime',
  [
    'Copilot Studio reconstruye el índice vectorial en cada pregunta usando su propio modelo de embeddings administrado por Microsoft en Azure',
    'El semantic ranker convierte la pregunta en un vector antes de buscar',
    'Access Key authentication vectoriza automáticamente cualquier consulta',
  ],
  'Copilot Studio admite índices vectorizados con integrated vectorization: el mismo modelo de embeddings que vectorizó los datos vectoriza el prompt entrante en tiempo de ejecución, por lo que no hay que escribir funciones especiales. El semantic ranker es una característica de reordenación distinta y el tipo de autenticación no interviene en la vectorización.',
  CS + 'knowledge-azure-ai-search');

q('2.1c', 2,
  'Vas a crear la conexión de Azure AI Search para tu agente y quieres evitar claves compartidas. Elige dos tipos de autenticación compatibles con la conexión.',
  [
    'Microsoft Entra ID Integrated',
    'Service principal (aplicación de Microsoft Entra ID)',
  ],
  [
    'Basic (usuario y contraseña)',
    'SAS token de Azure Storage',
    'Windows integrated authentication',
  ],
  'La conexión admite Access Key, Client Certificate Auth, Service principal (aplicación de Microsoft Entra ID) y Microsoft Entra ID Integrated. Las dos basadas en Entra evitan compartir claves, y la documentación recomienda Entra ID en vez de claves cuando hay que rehacer una conexión. Basic, SAS y Windows integrated no están entre las opciones.',
  CS + 'knowledge-azure-ai-search');

q('2.1c', 2,
  'Las respuestas basadas en tu índice de Azure AI Search funcionan, pero no incluyen citas con enlace al documento. ¿Qué debes asegurar en el índice?',
  'Un campo que contenga la URL completa del documento (metadata_storage_path se usa como cita si existe)',
  [
    'Un campo vectorial llamado citation que almacene los embeddings del título del documento',
    'Activar el semantic ranker en el índice para que genere los enlaces de cita automáticamente',
    'Un segundo índice vectorial solo para las citas',
  ],
  'Para devolver citas, el índice debe incluir un campo con la URL real del documento; si existe metadata_storage_path, Copilot Studio lo interpreta como cita, y si no, usa el campo que contenga un enlace completo. Además, los usuarios deben tener acceso a los orígenes a los que apuntan las citas.',
  CS + 'knowledge-azure-ai-search');

q('2.1c', 3,
  'Seguridad exige que el servicio de Azure AI Search no tenga acceso público y solo sea alcanzable por red privada. Elige dos requisitos para que funcione con Copilot Studio.',
  [
    'Configurar un private endpoint en el servicio de Azure AI Search',
    'Configurar Virtual Network support para el entorno de Power Platform',
  ],
  [
    'Usar únicamente Access Key authentication con el endpoint público',
    'Registrar el servicio como custom connector con on-premises data gateway obligatorio',
    'Desactivar vector indexes, porque no funcionan con red privada',
  ],
  'Copilot Studio admite índices de Azure AI Search configurados para virtual networks mediante private endpoint, siempre que el entorno de Power Platform tenga configurado Virtual Network support. Hay que añadir el conocimiento mediante una data connection formal, y no es necesario ni un gateway ni renunciar a los índices vectoriales.',
  CS + 'knowledge-azure-ai-search');

/* =========================  2.2  Tools  ========================= */

// 2.2a Computer use
q('2.2a', 1,
  'Un maker intenta usar la herramienta Computer use en un agente con classic orchestration. ¿Qué requisito falta?',
  'Activar generative orchestration, porque es el orquestador quien elige y llama a la herramienta',
  [
    'Activar el hosted browser en el entorno y registrar una máquina con Power Automate para escritorio',
    'Seleccionar un modelo de Anthropic en lugar del de OpenAI en la configuración de la herramienta',
    'Cambiar la autenticación del agente a No authentication para que no se pidan credenciales',
  ],
  'Computer use es una herramienta que opera sitios web y aplicaciones de escritorio con visión y razonamiento, y requiere generative orchestration. En classic orchestration las herramientas solo se llaman desde topics. El hosted browser es un lugar de ejecución y no sustituye ese requisito.',
  CS + 'computer-use');

q('2.2a', 3,
  'Tu agente con Computer use debe operar aplicaciones de escritorio personalizadas en máquinas administradas por la empresa, unidas a Microsoft Entra ID y administradas con Intune, con autoescalado. ¿Dónde configuras que se ejecute?',
  'En un Cloud PC pool (Windows 365 for Agents)',
  [
    'En el Hosted browser, que admite aplicaciones de escritorio personalizadas',
    'En tu propia máquina (bring your own machine), que ofrece autoescalado administrado',
    'En el navegador del usuario final, sin registrar ninguna máquina',
  ],
  'El Cloud PC pool (preview, Windows 365 for Agents) usa equipos unidos a Entra e Intune con autoescalado. El Hosted browser (preview) no está unido a Entra, no admite aplicaciones de escritorio personalizadas y es para experimentar; la máquina propia exige Power Automate para escritorio, registrar la máquina y activar Enable for computer use, sin autoescalado administrado.',
  CS + 'configure-where-computer-use-runs', true);

q('2.2a', 2,
  'Un agente autónomo usa Computer use con un modelo estándar y completa una tarea de 40 pasos. ¿Cuántos Copilot Credits consume solo por esa acción?',
  '200 (5 Copilot Credits por paso)',
  [
    '40 (1 Copilot Credit por paso)',
    '600 (15 Copilot Credits por paso, tarifa premium)',
    '5 (una sola acción de agente por tarea completa)',
  ],
  'Computer use se factura a la tarifa de agent action: 5 Copilot Credits por paso con modelos estándar (15 por paso con modelos premium), así que 40 pasos consumen 200. Este uso además no está incluido en la licencia Microsoft 365 Copilot USL.',
  CS + 'computer-use');

q('2.2a', 3,
  'Tu agente Computer use opera sitios web con credenciales almacenadas. Quieres reducir el riesgo de acciones no deseadas. Elige dos controles.',
  [
    'Configurar human supervision para que un revisor reciba un correo de Outlook cuando se detecten instrucciones potencialmente dañinas',
    'Definir un access control allow-list de dominios o aplicaciones permitidos y activar Enforce HTTPS',
  ],
  [
    'Usar credenciales maker-provided compartidas por todos los usuarios como valor por defecto, para que nadie tenga que iniciar sesión en el sitio',
    'Cambiar a un modelo premium para que no cometa errores',
    'Desactivar generative orchestration para limitar al agente',
  ],
  'Human supervision envía un correo de Outlook a un revisor cuando se detectan instrucciones potencialmente dañinas, y el allow-list bloquea acciones fuera de lo permitido (no bloquea abrir el sitio) junto con Enforce HTTPS. Las credenciales del maker son el valor por defecto pero arriesgadas si se comparten, un modelo premium no es un control de seguridad y Computer use requiere generative orchestration.',
  CS + 'human-supervision-computer-use');

// 2.2b MCP
q('2.2b', 2,
  'Tu servidor MCP existente usa el transporte SSE y la conexión desde Copilot Studio falla. ¿Qué debes hacer?',
  'Migrar el servidor a Streamable HTTP, el único transporte soportado (SSE ya no se admite)',
  [
    'Registrar el servidor como A2A agent con la URL de su endpoint, en lugar de usar el asistente de MCP',
    'Activar WebSocket en el custom connector del servidor',
    'Agregar el header x-ms-agentic-protocol: sse a la operación POST /mcp',
  ],
  'Copilot Studio solo admite el transporte Streamable HTTP para servidores MCP; SSE dejó de soportarse después de agosto de 2025. A2A es un protocolo distinto para agentes, y WebSocket o un valor sse en x-ms-agentic-protocol no existen como opciones válidas (el valor correcto es mcp-streamable-1.0).',
  CS + 'mcp-add-existing-server-to-agent');

q('2.2b', 2,
  'Conectaste un servidor MCP y la conexión funciona, pero el agente nunca invoca sus herramientas aunque la solicitud del usuario encaja perfectamente. ¿Qué mejoras primero?',
  'La Server description del servidor MCP, que el orquestador usa para decidir cuándo llamarlo',
  [
    'El Server URL, agregándole el sufijo /sse para que el orquestador detecte el servidor',
    'La autenticación, cambiándola a OAuth 2.0 Manual',
    'Desactivar generative orchestration para forzar que se elija',
  ],
  'En el asistente de MCP el nombre, la descripción y la URL son obligatorios, y la descripción es lo que el orquestador usa para decidir cuándo llamar al servidor. Las herramientas MCP se eligen con generative orchestration, de modo que desactivarla las dejaría sin uso; el sufijo /sse no es válido porque solo se admite Streamable HTTP.',
  CS + 'mcp-add-existing-server-to-agent');

q('2.2b', 3,
  'Tu servidor MCP usa OAuth 2.0. Tu proveedor de identidad soporta Dynamic Client Registration (DCR) y publica metadatos de discovery. ¿Qué tipo de OAuth eliges en el asistente de MCP?',
  'Dynamic discovery',
  [
    'Dynamic (DCR sin discovery, indicando las URL de autorización y de token)',
    'Manual (client ID, client secret, auth URL, token URL, refresh URL y scopes)',
    'API key en header',
  ],
  'Dynamic discovery aprovecha DCR y discovery, por lo que no pides URL ni credenciales a mano. Dynamic usa DCR sin discovery (indicas authorization URL y token URL template) y Manual exige client ID, secret, URLs y scopes, además de copiar la callback URL en el registro de la app del proveedor.',
  CS + 'mcp-add-existing-server-to-agent');

q('2.2b', 2,
  'El administrador creó una data policy que bloquea varios Power Platform connectors. Después, los makers ya no pueden usar un servidor MCP que antes funcionaba, aunque ningún conector llamado MCP está bloqueado. ¿Por qué?',
  'El acceso a MCP usa Power Platform connectors, así que las data policies de conectores también lo gobiernan',
  [
    'Las data policies bloquean automáticamente todo el protocolo MCP por defecto cuando existe cualquier política en el entorno',
    'Los servidores MCP solo funcionan en entornos sin ninguna data policy',
    'MCP usa A2A internamente y A2A está siempre bloqueado',
  ],
  'La conectividad con servidores MCP se apoya en Power Platform connectors, así que una data policy que regule esos conectores también regula el acceso al servidor MCP y a sus herramientas. No existe un bloqueo automático de MCP ni una dependencia de A2A.',
  CS + 'mcp-add-components-to-agent');

q('2.2b', 3,
  'Prefieres exponer tu servidor MCP mediante un custom connector en Power Apps en lugar del asistente. Elige dos requisitos de la definición.',
  [
    'Usar un archivo OpenAPI (Swagger 2.0)',
    'Marcar la operación POST /mcp con x-ms-agentic-protocol: mcp-streamable-1.0',
  ],
  [
    'Definir una operación GET /sse con text/event-stream',
    'Usar OpenAPI 3.1 en YAML',
    'Marcar la operación con x-ms-agentic-protocol: a2a',
  ],
  'La segunda vía para conectar un servidor MCP es un custom connector creado en Power Apps a partir de un archivo OpenAPI (Swagger 2.0) con la extensión x-ms-agentic-protocol: mcp-streamable-1.0 en la operación POST /mcp. SSE no está soportado y a2a no es un valor válido para esa extensión.',
  CS + 'mcp-add-existing-server-to-agent');

q('2.2b', 2,
  'Tu servidor MCP expone diez herramientas, pero el agente solo debe usar tres. Además, cuando el propietario agregue herramientas nuevas, no deben quedar disponibles automáticamente. ¿Qué haces?',
  'Desactivar el toggle Allow all y dejar activas solo las tres herramientas necesarias',
  [
    'Dejar Allow all activado y excluir las demás herramientas con instrucciones del agente',
    'Crear tres servidores MCP, uno por herramienta',
    'Eliminar el servidor y registrarlo como custom connector con tres operaciones',
  ],
  'Al agregar un servidor MCP, todas sus herramientas quedan activas (Allow all). Si desactivas Allow all puedes activar o desactivar herramientas individuales, y cualquier herramienta nueva que añada el servidor queda desactivada por defecto. Filtrar por instrucciones no impide que el orquestador las use.',
  CS + 'mcp-add-components-to-agent');

// 2.2c Existing custom connector as tool
q('2.2c', 3,
  'Un colega creó el custom connector Inventario API en Power Apps. Cuando intentas agregarlo como herramienta de tu agente no aparece. ¿Qué requisito del conector podría faltar?',
  'Permisos de view y share sobre el conector para la organización, para que el agente pueda usarlo',
  [
    'Haber sido creado en Azure Logic Apps, porque solo esos conectores aparecen en la lista de herramientas',
    'Estar certificado por Microsoft para poder compartirse con cualquier agente de la organización',
    'Haberse publicado además como servidor MCP con el asistente de incorporación',
  ],
  'Para que un agente use un custom connector, este necesita permisos de view y share para la organización. Los conectores creados en Logic Apps no están disponibles en Copilot Studio, la certificación solo es necesaria para compartirlo con todos los usuarios de la plataforma, y un servidor MCP es otra vía distinta.',
  CS + 'add-tools-custom-agent');

q('2.2c', 3,
  'El equipo de APIs construyó un custom connector en Azure Logic Apps. Quieres usar esas operaciones como herramientas de tu agente. ¿Qué haces?',
  'Recrear el conector en Power Apps o Power Automate a partir de su OpenAPI o colección Postman',
  [
    'Nada: los conectores creados en Logic Apps aparecen automáticamente en la lista de herramientas de Copilot Studio',
    'Exportarlo como solución managed e importarlo en Copilot Studio',
    'Convertirlo en un agent flow desde el portal de Logic Apps',
  ],
  'Los custom connectors creados en Power Automate están disponibles en Power Apps y Copilot Studio (y viceversa), pero los creados en Logic Apps no. La solución es reutilizar la definición OpenAPI o la colección Postman para recrearlos en Power Apps o Power Automate. Los custom connectors se describen con OpenAPI, Postman o desde cero, y se protegen con OAuth 2.0, Basic o API key.',
  CON + 'custom-connectors/');

q('2.2c', 3,
  'Exportaste una solución con tu agente, un custom connector y sus connection references. Al importarla en Test falla o los flows no se activan. ¿Qué orden de importación evita el problema?',
  'Importar primero el custom connector, en una solución aparte, y después la solución del agente',
  [
    'Importar primero la solución del agente con sus connection references y, después, el custom connector',
    'Importar todo junto en una sola solución unmanaged para que las dependencias se resuelvan solas',
    'Importar solo el agente: los conectores se recrean al publicar',
  ],
  'Si tu agente usa custom connectors, deben importarse primero, en una solución separada, y después la solución con las connection references y el agente. Los conectores personalizados no se recrean automáticamente al publicar y mezclar todo en una solución provoca los errores descritos.',
  CS + 'authoring-solutions-import-export');

// 2.2d REST API tools
q('2.2d', 2,
  'Tienes la especificación OpenAPI 3.0 en JSON de tu API de tickets y quieres agregarla como herramienta REST API. ¿Es posible?',
  'Sí: la herramienta acepta JSON y, si la especificación es v3, se traduce automáticamente a v2',
  [
    'No: solo acepta Swagger 2.0 en formato YAML y rechaza cualquier especificación OpenAPI 3.x',
    'Sí, pero solo si la especificación es OpenAPI 3.1 en YAML',
    'No: la herramienta REST API exige una colección Postman',
  ],
  'La herramienta REST API (preview) pide una especificación OpenAPI en JSON de versión 2; una especificación v3 se traduce automáticamente a v2. Después eliges la solución, mejoras la descripción y seleccionas qué operaciones exponer.',
  CS + 'agent-extend-action-rest-api', true);

q('2.2d', 3,
  'Al crear la herramienta REST API para tu API, quieres exponer crear y consultar tickets, pero no eliminarlos, y ayudar al orquestador a elegir bien. Elige dos acciones.',
  [
    'Seleccionar solo las operaciones deseadas (crear y consultar) y dejar fuera la de eliminar',
    'Completar el nombre y la descripción de la herramienta y las descripciones de entradas y salidas',
  ],
  [
    'Subir la especificación con las tres operaciones y bloquear delete desde las instrucciones del agente',
    'Cargar un WSDL SOAP en lugar de OpenAPI',
    'Dejar las descripciones vacías para que el modelo infiera todo a partir del operationId',
  ],
  'Al crear la herramienta puedes elegir qué operaciones exponer (por ejemplo crear pero no eliminar) y completar nombre y descripción de la herramienta y de sus entradas y salidas, que el orquestador usa para decidir. Bloquear delete solo por instrucciones no garantiza que no se llame, y la herramienta usa OpenAPI, no WSDL.',
  CS + 'agent-extend-action-rest-api', true);

q('2.2d', 3,
  'Debes elegir entre un custom connector, una herramienta REST API y un nodo Send HTTP request para integrar una API interna. Requisitos: reutilizar la integración en agentes, flows de Power Automate y Power Apps, con conexiones y connection references gestionadas. ¿Qué eliges?',
  'Custom connector',
  [
    'Herramienta REST API',
    'Nodo Send HTTP request',
    'Servidor MCP',
  ],
  'Un custom connector se crea en Power Apps o Power Automate y se reutiliza en flows, apps y Copilot Studio, con conexiones y connection references gestionadas. La herramienta REST API se define dentro del agente (preview) y Send HTTP request es un nodo de topic; ninguno se comparte como conector entre Power Automate y Power Apps.',
  CON + 'custom-connectors/');

/* =========================  2.3  Multi-agent  ========================= */

// 2.3a Design multi-agent
q('2.3a', 2,
  'Nexo (agente de mesa de ayuda) necesita un especialista en licencias: un único caso de uso, mantenido por el mismo equipo, sin autenticación ni publicación propias y sin reutilización por otros agentes. ¿Qué eliges?',
  'Un child agent dentro de Nexo',
  [
    'Un connected agent publicado por separado',
    'Un A2A agent',
    'Un Foundry agent',
  ],
  'Los child agents son ligeros y agrupan herramientas, instrucciones y conocimiento para un caso de uso concreto sin configuración, autenticación ni despliegue independientes, y no se reutilizan. Connected agents, A2A y Foundry agents son agentes separados con su propio ciclo de vida.',
  CS + 'authoring-add-other-agents');

q('2.3a', 3,
  'Tu agente tiene más de 40 entre herramientas, topics y agentes con descripciones parecidas y el orquestador elige mal. Además, tres equipos mantienen áreas distintas y necesitan publicar y versionar de forma independiente. ¿Qué diseño recomiendas?',
  'Dividir en connected agents (agentes de Copilot Studio separados) que el agente principal orqueste',
  [
    'Agregar más instrucciones al agente único para diferenciar las descripciones de herramientas, topics y agentes',
    'Convertir todo en child agents dentro del mismo agente',
    'Mover todas las herramientas a un único servidor MCP',
  ],
  'Conviene dividir en connected agents cuando se degrada la precisión de selección (regla práctica de más de 30–40 opciones o descripciones similares), hay varios equipos, publicación o canales separados, ajustes propios (por ejemplo modelo) y ALM independiente. Los child agents no tienen ajustes ni despliegue propios y siguen dentro del mismo agente.',
  CS + 'authoring-add-other-agents');

q('2.3a', 2,
  'Evalúas dividir tu solución en varios agentes. Elige dos costos o desventajas reales que debes considerar.',
  [
    'Mayor latencia por los saltos adicionales de orquestación',
    'Mayor superficie de pruebas y de gobierno',
  ],
  [
    'Los agentes secundarios ignoran el ajuste Use general knowledge del agente principal',
    'Las citas siempre se conservan idénticas al devolver la respuesta al agente principal',
    'Un agente con connected agents puede además usarse como connected agent de otro principal',
  ],
  'Dividir añade latencia (más saltos de orquestación) y amplía lo que hay que probar y gobernar. Los child y connected agents respetan el ajuste Use general knowledge del agente principal, las citas pueden perderse al pasar la respuesta y un agente principal con connected agents no puede usarse como connected agent de otro principal.',
  CS + 'authoring-add-other-agents');

q('2.3a', 3,
  'El agente Mesa de ayuda ya tiene tres connected agents. Otro equipo quiere agregar Mesa de ayuda como connected agent de su propio agente principal. ¿Es posible?',
  'No: un agente principal con connected agents no puede ser connected agent de otro principal',
  [
    'Sí, sin restricciones',
    'Sí, pero solo si Mesa de ayuda se reconfigura como child agent del otro agente principal',
    'Sí, siempre que Mesa de ayuda se publique en Microsoft Teams',
  ],
  'La limitación documentada es que un agente que es principal con connected agents no puede usarse, a la vez, como connected agent de otro agente principal. Ser child agent o publicarse en Teams no cambia esa restricción.',
  CS + 'authoring-add-other-agents');

// 2.3b Foundry agent
q('2.3b', 3,
  'Al conectar tu agente de Foundry desde Copilot Studio recibes el error 400 «endpoint does not support activity». ¿Cuál es la solución?',
  'Habilitar el Activity protocol endpoint del agente de Foundry mediante REST API o Python SDK',
  [
    'Activar la opción Activity protocol en el portal de Foundry, que ya la muestra junto a Responses y A2A',
    'Registrarlo como A2A agent usando la URL de su endpoint',
    'Recrear el agente en el portal clásico de Foundry',
  ],
  'Un agente de Foundry debe tener habilitado el Activity protocol endpoint; los agentes nuevos solo exponen Responses y A2A por defecto y habilitar Activity solo es posible con REST API o Python SDK (el portal aún no lo muestra). Registrarlo como A2A no resuelve el requisito y el portal clásico no funciona con esta conexión.',
  CS + 'add-agent-foundry-agent', true);

q('2.3b', 3,
  'Conectas un agente de Foundry y obtienes «404 - Version not found». ¿Cuál es la causa más probable?',
  'El agente se creó en el portal antiguo de Foundry; solo funcionan los creados en el portal nuevo',
  [
    'No se habilitó el Activity protocol endpoint del agente mediante REST API o Python SDK',
    'El Agent Id lleva espacios al final',
    'El project endpoint debe terminar en /chat/completions',
  ],
  'Solo los agentes creados en el nuevo portal de Foundry funcionan con la conexión; los del portal antiguo devuelven 404 - Version not found. La falta del Activity protocol endpoint produce otro error (400), y /chat/completions es un requisito de los modelos para prompts, no de los agentes.',
  CS + 'add-agent-foundry-agent', true);

q('2.3b', 2,
  '¿Qué datos necesitas para conectar un agente de Foundry desde la página Agents de tu agente en Copilot Studio?',
  'El Foundry project endpoint para la conexión y luego el nombre, la descripción y el Agent Id',
  [
    'La URL del agent card (/.well-known/agent.json)',
    'La clave de API del recurso de Azure OpenAI y el nombre del deployment del modelo, con el endpoint terminado en /chat/completions',
    'La URL de un servidor MCP del proyecto',
  ],
  'En Agents > Add an agent > Connect to an external agent > Microsoft Foundry se crea una conexión con el project endpoint de Foundry y después se indica el nombre, la descripción y el Agent Id. El agent card corresponde a A2A, la clave y el deployment al uso de modelos en prompts, y MCP es otra vía.',
  CS + 'add-agent-foundry-agent', true);

// 2.3c Connected agent
q('2.3c', 2,
  'El agente RR. HH. lo mantiene otro equipo, tiene su propia publicación y configuración, y está en el mismo entorno que Nexo. Nexo debe delegarle consultas de vacaciones. ¿Qué mecanismo usas?',
  'Agregarlo a Nexo como connected agent',
  [
    'Agregarlo como child agent copiando sus topics',
    'Conectarlo como Fabric data agent',
    'Una herramienta REST API con su endpoint de Direct Line',
  ],
  'Los connected agents son otros agentes de Copilot Studio del mismo entorno, con su propia configuración y publicación. Un child agent vive dentro del agente principal, un Fabric data agent es otro tipo de agente externo y llamar a su endpoint con REST API no aprovecha la orquestación multi-agente.',
  CS + 'authoring-add-other-agents');

q('2.3c', 2,
  'Quieres que un topic transfiera un escenario concreto a un connected agent y reciba su resultado en variables del topic. ¿Qué usas?',
  'Un nodo de redirección a un agente desde el topic, mapeando sus inputs y outputs a variables del topic',
  [
    'Una Adaptive Card con el nombre del agente como acción',
    'Un nodo End all topics, seguido de un mensaje que mencione el nombre del agente de destino',
    'Una variable global que el agente secundario lee directamente',
  ],
  'Un topic puede redirigir a un child o connected agent; las entradas y salidas del agente se convierten en variables del topic. También puedes referenciar agentes en las instrucciones escribiendo / y eligiendo el agente. Esto no es posible con Fabric data agents.',
  CS + 'authoring-add-other-agents');

q('2.3c', 3,
  'En el agente principal desactivaste Use general knowledge. El connected agent está configurado para responder con conocimiento general cuando no halla fuentes. ¿Qué comportamiento esperas al delegarle una pregunta?',
  'El connected agent respeta el ajuste del agente principal y no usa conocimiento general',
  [
    'Responde con conocimiento general porque su configuración propia prevalece sobre la del agente principal en cada turno',
    'Falla siempre con un error de configuración',
    'Usa conocimiento general solo cuando el canal es Teams',
  ],
  'Los child y connected agents respetan el ajuste Use general knowledge del agente principal, por lo que si está desactivado no usarán conocimiento general aunque su propia configuración lo permita. Es una de las limitaciones documentadas del diseño multi-agente, junto con la posible pérdida de citas.',
  CS + 'authoring-add-other-agents');

// 2.3d Fabric data agent
q('2.3d', 2,
  'Un equipo quiere agregar un Fabric data agent a su agente de Copilot Studio. ¿Qué capacidad de Fabric mínima necesita?',
  'Capacidad paga F2 o superior (o Power BI Premium P1+ con Fabric habilitado)',
  [
    'Una capacidad de prueba (trial) de Fabric es suficiente para crear y publicar el data agent',
    'Cualquier workspace de Power BI Pro, sin necesidad de capacidad de Fabric dedicada',
    'Solo Fabric F64 o superior',
  ],
  'Un Fabric data agent requiere capacidad Fabric de pago F2 o superior (o Power BI Premium P1+ con Fabric habilitado). Admite hasta 5 orígenes de datos (warehouse, lakehouse, modelo semántico de Power BI, KQL database, mirrored DB, ontology o Microsoft Graph) y se agrega a Copilot Studio como agente externo (preview).',
  CS + 'add-agent-fabric-data-agent', true);

q('2.3d', 3,
  'Los usuarios reportan que el Fabric data agent devuelve tablas truncadas cuando la consulta produce miles de filas. ¿Cuál es la explicación?',
  'Las respuestas están limitadas a 25 filas por 25 columnas',
  [
    'Siempre devuelve 100 filas por 10 columnas',
    'Solo puede consultar tablas con menos de 1000 registros',
    'Usa la identidad del maker, que solo tiene permisos limitados sobre el lakehouse',
  ],
  'Las respuestas del Fabric data agent están limitadas a 25 filas por 25 columnas. Además genera consultas de solo lectura (NL2SQL, NL2DAX, NL2KQL), usa las credenciales del usuario y solo funciona en inglés.',
  CS + 'add-agent-fabric-data-agent', true);

q('2.3d', 3,
  'Planificas usar un Fabric data agent desde Copilot Studio. Elige dos limitaciones o características correctas.',
  [
    'No puede ser destino de un nodo Redirect ni referenciarse en las instrucciones del agente',
    'No funciona cuando el agente principal se despliega en Microsoft Copilot',
  ],
  [
    'Puede escribir y actualizar datos del lakehouse con consultas generadas a partir de lenguaje natural',
    'Admite hasta 25 orígenes de datos por agente',
    'Permite cambiar el LLM subyacente desde Copilot Studio',
  ],
  'Un Fabric data agent no admite ser objetivo de un nodo Redirect ni referenciarse en instrucciones, y no funciona si el agente principal está desplegado en Microsoft Copilot. Genera consultas de solo lectura, admite hasta 5 orígenes de datos y no permite cambiar el LLM.',
  CS + 'add-agent-fabric-data-agent', true);

// 2.3e A2A
q('2.3e', 2,
  'Vas a agregar un agente externo compatible con A2A desde Add agent > A2A agent. ¿Qué URL ingresas?',
  'La URL del endpoint del agente (no la del agent card)',
  [
    'La URL del agent card publicada en /.well-known/agent.json de ese agente',
    'La URL del dev tunnel terminada en /mcp',
    'El Agent Id de Foundry',
  ],
  'Debes ingresar la URL del endpoint del agente, no la del agent card. Si existe un agent card válido en /.well-known/agent.json, el nombre y la descripción se rellenan automáticamente; si no, escribe una descripción clara manualmente para que el orquestador sepa cuándo usarlo.',
  CS + 'add-agent-agent-to-agent');

q('2.3e', 2,
  'Un socio expuso un agente construido con otro framework. Necesitas conversaciones multi-turno, metadatos ricos (contextId e historial de chat) e interoperabilidad entre frameworks. ¿Qué eliges?',
  'Agregarlo como A2A agent',
  [
    'Un custom connector con una operación POST',
    'Un servidor MCP',
    'Un nodo Send HTTP request dentro de un topic',
  ],
  'A2A está pensado para flujos de trabajo entre agentes: admite multi-turno, metadatos ricos (contextId, IDs de mensaje, locale e historial en metadata) e interoperabilidad entre frameworks. Custom connectors y HTTP sirven para APIs planas, MCP para herramientas y recursos, y el Activity Protocol para agentes del Microsoft 365 Agents SDK.',
  CS + 'add-agent-agent-to-agent');

q('2.3e', 2,
  'Desarrollas un agente A2A local en el puerto 5000 y Copilot Studio no puede alcanzarlo. Elige dos acciones para probarlo.',
  [
    'Exponerlo con Dev Tunnels haciendo público el puerto',
    'Usar la URL pública del túnel como endpoint del A2A agent',
  ],
  [
    'Registrar localhost:5000 como endpoint, porque Copilot Studio se ejecuta en tu equipo',
    'Importar el agente local como solución unmanaged',
    'Cambiar el transporte a SSE',
  ],
  'Copilot Studio se ejecuta en la nube y no ve tu localhost: para desarrollo se expone el agente local con Dev Tunnels (puerto público) y se usa la URL del túnel como endpoint. Importar soluciones o cambiar a SSE no resuelven la conectividad.',
  CS + 'add-agent-agent-to-agent');

q('2.3e', 2,
  'Al agregar un A2A agent, ¿qué opciones de autenticación están disponibles? Elige tres.',
  [
    'None',
    'API key (en header o query)',
    'OAuth 2.0 (client ID y secret, URL de autorización, de token y de refresh)',
  ],
  [
    'Basic (usuario y contraseña)',
    'Kerberos',
  ],
  'Un A2A agent admite None, API key (en header o query) y OAuth 2.0 con client ID/secret y las URL de autorización, token y refresh. Basic y Kerberos no figuran entre las opciones. Las conexiones A2A usan la infraestructura de custom connectors, por lo que pueden alcanzar agentes en redes privadas o locales.',
  CS + 'add-agent-agent-to-agent');

/* =========================  2.4  Azure  ========================= */

// 2.4a Generative answers with Azure AI Search + Foundry
q('2.4a', 3,
  'Tu equipo ya tiene Azure OpenAI «on your data» sobre un índice de Azure AI Search en Foundry y quiere usarlo en un topic concreto. ¿Dónde se configura en Copilot Studio?',
  'En el Generative answers node: Data source > Classic data > Add connection a Azure OpenAI',
  [
    'En Agents > Add an agent > Connect to an external agent > Microsoft Foundry, indicando el project endpoint',
    'En Settings > Advanced > Application Insights',
    'En Tools > Add a tool > Prompt',
  ],
  'Los knowledge sources de un generative answers node no admiten directamente Azure OpenAI; se usa la opción Classic data del nodo y Add connection para vincular el servicio Azure OpenAI «on your data» (preview). Conectar un agente de Foundry, Application Insights y los prompts son funciones distintas.',
  CS + 'nlu-generative-answers-azure-openai', true);

q('2.4a', 2,
  'Quieres mejorar la relevancia de las respuestas con el semantic ranker de tu conocimiento de Azure AI Search. ¿Qué secuencia es correcta?',
  'Configurarlo primero en Azure AI Search y después crear la conexión en Copilot Studio',
  [
    'Activarlo en Copilot Studio al crear la conexión; se aprovisiona automáticamente en el servicio de Azure',
    'No es compatible con Copilot Studio',
    'Solo funciona con Access Key authentication',
  ],
  'Copilot Studio admite el semantic ranker, pero esa característica debe configurarse antes en Azure AI Search y después se agrega la conexión en Copilot Studio. No se aprovisiona desde Copilot Studio y no depende del tipo de autenticación elegido.',
  CS + 'knowledge-azure-ai-search');

q('2.4a', 2,
  'Tienes un índice vectorial en Azure AI Search. Elige dos lugares de Copilot Studio desde los que puedes agregarlo como fuente de conocimiento.',
  [
    'Desde la página Knowledge del agente (Add knowledge)',
    'Desde las Properties de un Generative answers node',
  ],
  [
    'Desde Settings > Security > Web channel security, activando Require secured access',
    'Desde la página Channels',
    'Desde Tools > Add a tool > Computer use',
  ],
  'Azure AI Search se agrega con Add knowledge desde las páginas Overview o Knowledge del agente, o desde las Properties de un Generative answers node, seleccionando Featured > Azure AI Search. Solo puede añadirse un índice vectorial por conexión y debe usarse una data connection formal.',
  CS + 'knowledge-azure-ai-search');

// 2.4b BYOM prompts
q('2.4b', 2,
  'Conectas un modelo de Foundry a un prompt y pegas el endpoint /openai/v1/responses. Al probar obtienes «Resource not found». ¿Qué corriges?',
  'Usar el endpoint de chat completions (que termina en /chat/completions)',
  [
    'Cambiar el nombre del deployment por el nombre del modelo base y volver a conectar el modelo',
    'Subir el content moderation level a Highest',
    'Añadir el sufijo /embeddings al endpoint',
  ],
  'Los modelos de Foundry en prompts deben ser de tipo chat completion y el endpoint debe terminar en /chat/completions; un endpoint de Responses como /openai/v1/responses produce «Resource not found». El deployment name y el base model name deben coincidir exactamente con Foundry.',
  CS + 'bring-your-own-model-prompts');

q('2.4b', 2,
  'Desplegaste un modelo de la familia GPT-5 en Foundry y quieres usarlo en un prompt de Copilot Studio con Connect a model from Azure AI Foundry. ¿Qué ocurre?',
  'No es compatible: la familia GPT-5 y posteriores no se admite en BYOM prompts',
  [
    'Funciona, pero solo con temperatura 0',
    'Funciona si usas el endpoint Responses en lugar de chat completions',
    'Funciona si el deployment name coincide con el nombre del modelo base',
  ],
  'Los modelos de la familia GPT-5 y posteriores no se admiten para BYOM prompts; solo se admiten modelos de chat completion con endpoint /chat/completions. Cambiar el endpoint a Responses o igualar nombres no resuelve la incompatibilidad.',
  CS + 'bring-your-own-model-prompts');

q('2.4b', 3,
  'Usas un modelo de Foundry en un prompt (bring your own model). Elige dos afirmaciones correctas.',
  [
    'El uso se factura por separado en Azure, no a las tarifas de Copilot Studio',
    'El conector Azure AI Foundry de las data policies del Power Platform admin center gobierna su uso',
  ],
  [
    'El slider de content moderation sigue disponible para modelos de Foundry y para los modelos de Anthropic',
    'Consume primero los AI Builder credits y después los Copilot Credits',
    'El deployment name puede escribirse de forma aproximada porque se ignora',
  ],
  'El uso de modelos de Foundry se factura por separado en Azure, fuera de las tarifas de Copilot Studio, y lo gobierna el conector Azure AI Foundry en las data policies. El content moderation level solo existe para modelos administrados (no para Anthropic ni Foundry), los AI Builder credits no se consumen en Copilot Studio y el deployment name debe coincidir exactamente.',
  CS + 'bring-your-own-model-prompts');

// 2.4c Application Insights
q('2.4c', 2,
  'Quieres telemetría de un agente en Application Insights que incluya el nombre del usuario y el texto de los mensajes, pero sin registrar propiedades potencialmente sensibles de las actividades. ¿Qué configuras en Settings > Advanced > Application Insights?',
  'Activar Enable logging y Log conversation details, dejando desactivado Log sensitive Activity properties',
  [
    'Activar solo Node execution events',
    'Activar Enable logging, Log sensitive Activity properties y Node execution events, pero no Log conversation details',
    'Pegar la instrumentation key en Settings > Security > Authentication',
  ],
  'Log conversation details incluye ID de usuario, nombre y texto de los mensajes; Log sensitive Activity properties registra además valores de propiedades que pueden ser sensibles, y Node execution events registra un evento por cada nodo ejecutado. El Connection string se pega en Settings > Advanced, no en Security.',
  CS + 'advanced-bot-framework-composer-capture-telemetry');

q('2.4c', 2,
  'Tu consulta KQL de usuarios distintos por día incluye conversaciones de prueba hechas en el test canvas. ¿Cómo las excluyes?',
  'Filtrando customEvents con where customDimensions[\'designMode\'] == "False"',
  [
    'Con where customDimensions[\'designMode\'] == "True"',
    'Con where timestamp > ago(14d)',
    'Con where customDimensions[\'type\'] == \'conversationUpdate\'',
  ],
  'Todos los eventos incluyen la dimensión designMode, que es True cuando la conversación ocurrió en el test canvas; filtrar por designMode == "False" deja solo el tráfico real. Los datos están en la tabla customEvents, y el filtro por tiempo o por tipo de actividad no distingue las pruebas.',
  CS + 'advanced-bot-framework-composer-capture-telemetry');

q('2.4c', 2,
  'Un administrador necesita impedir que los makers envíen telemetría de agentes a Application Insights. ¿Cómo lo hace?',
  'Bloqueando el conector Application Insights in Copilot Studio en una data policy',
  [
    'Quitando el rol Reader en el recurso de Application Insights',
    'Desactivando Log conversation details y Enable logging en cada agente que tenga el connection string',
    'Bloqueando el conector HTTP en el entorno',
  ],
  'Para impedir la telemetría a nivel de agente se bloquea, en una data policy del Power Platform admin center, el conector Application Insights in Copilot Studio. El rol Reader solo permite ver el workbook compartido, y desactivar toggles por agente no es un control central.',
  CS + 'advanced-bot-framework-composer-capture-telemetry');

q('2.4c', 3,
  'Comparas la telemetría a nivel de agente con la de nivel de entorno (preview) en Application Insights. Elige dos afirmaciones correctas.',
  [
    'La de agente se configura por agente y registra eventos en la tabla customEvents',
    'La de entorno la configuran administradores una sola vez y usa trazas y spans alineados con OpenTelemetry',
  ],
  [
    'La de agente usa spans alineados con OpenTelemetry y la tabla dependencies, y la configura el administrador',
    'La de entorno la configura cualquier maker con acceso a un solo agente',
    'Ambas escriben únicamente en customEvents',
  ],
  'La telemetría de agente es basada en eventos (customEvents), la configura el maker de cada agente y no incluye spans OpenTelemetry. La de entorno (preview) se configura una vez por administradores o equipos de plataforma, es de trazas y spans alineados con OpenTelemetry y usa principalmente la tabla dependencies.',
  CS + 'telemetry-overview', true);
