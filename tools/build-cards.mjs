// Authors the 100 flashcards and writes data/flashcards.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'data', 'flashcards.js');
const CS = 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/';
const PP = 'https://learn.microsoft.com/en-us/power-platform/';
const PA = 'https://learn.microsoft.com/en-us/power-apps/maker/data-platform/';
const PAU = 'https://learn.microsoft.com/en-us/power-automate/';
const CON = 'https://learn.microsoft.com/en-us/connectors/';

const C = [];
const c = (skill, front, back, source) => C.push({ skill, front, back, source });

/* ---------------------------- D1 ---------------------------- */
// 1.1a
c('1.1a', '¿Cuándo usar MCP, custom connector, A2A o Activity Protocol?',
  'MCP: herramientas y recursos reutilizables (Streamable HTTP). Custom connector o HTTP: APIs planas. A2A: agentes con multi-turno y metadatos. Activity Protocol: agentes del Microsoft 365 Agents SDK.',
  CS + 'add-agent-agent-to-agent');
// 1.1b
c('1.1b', '¿Cuáles son las tres opciones de autenticación de un agente?',
  'No authentication (cualquiera con el enlace); Authenticate with Microsoft (Entra ID automático, por defecto, para Teams, Power Apps y Microsoft Copilot); Authenticate manually (Entra ID, Entra ID v2 o Generic OAuth 2).',
  CS + 'configuration-end-user-authentication');
c('1.1b', '¿Qué opción de autenticación expone User.AccessToken?',
  'Solo Authenticate manually. Authenticate with Microsoft expone User.Id y User.DisplayName, pero no User.AccessToken. Pasa el token únicamente a fuentes de confianza y nunca lo muestres en un nodo Message.',
  CS + 'configuration-end-user-authentication');
// 1.1c
c('1.1c', '¿Cuándo ven los usuarios el contenido recién publicado?',
  'Al iniciar una nueva sesión (en la mayoría de canales tras 30 minutos de inactividad). En Teams puedes escribir start over; si no, puede tardar hasta una hora en aplicarse.',
  CS + 'publication-fundamentals-publish-channels');
c('1.1c', '¿Cuántas opciones sugeridas muestra Teams en un nodo Question?',
  'Hasta seis (como hero card); Facebook admite hasta 13. Además, en Teams la encuesta de satisfacción es solo texto, no una Adaptive Card.',
  CS + 'publication-fundamentals-publish-channels');
// 1.1d
c('1.1d', '¿Dónde se configura la content moderation y cuál prevalece?',
  'En el agente (Generative AI settings), en el Generative answers node y en el prompt. En ejecución prevalece el nivel del topic. Va de Lowest a Highest; el valor por defecto es High.',
  CS + 'knowledge-copilot-studio');
c('1.1d', '¿Qué hace el ajuste Allow ungrounded responses?',
  'Activado: el agente puede responder con conocimiento general. Desactivado: bloquea los turnos sin fuente ni herramienta (se dispara el fallback) y solo devuelve respuestas de knowledge que lleven cita en línea.',
  CS + 'knowledge-copilot-studio');
// 1.1e
c('1.1e', '¿Qué cambios advierte el security scan antes de publicar?',
  'Cambiar a No authentication, elegir Maker-provided credentials en conectores o flows, y compartir el agente con todos los usuarios de la organización (por defecto no se comparte con nadie).',
  CS + 'security-scan');
c('1.1e', '¿Cuáles son los grupos de una data policy y qué regla aplica a los conectores?',
  'Business, Non-business y Blocked. Los conectores que comparten datos deben estar en el mismo grupo. Los conectores de Copilot Studio posteriores a 2019 suelen quedar en Non-business.',
  CS + 'admin-data-loss-prevention');
c('1.1e', '¿Qué ocurre al alcanzar el 125 % de la capacidad prepagada?',
  'Se activa el overage enforcement: los agentes personalizados se deshabilitan tras terminar la conversación en curso. Con los agent flows solo se bloquean nuevas ejecuciones y el agente sigue respondiendo.',
  CS + 'requirements-messages-management');
// 1.1f
c('1.1f', '¿Qué es una component collection y quién puede editarla?',
  'Conjunto reutilizable de topics, knowledge, tools, child agents, MCP, conectores, flows y entities. Solo su creador o un system customizer/admin la edita. Al exportarla es managed; para colecciones complejas usa una solución.',
  CS + 'authoring-export-import-copilot-components');
// 1.1g
c('1.1g', '¿Qué hace Require secured access y cuánto tarda en aplicar?',
  'En Web channel security exige un secreto o un token Direct Line. Tarda hasta dos horas en propagarse y no requiere publicar. Hay dos secretos para rotar sin tiempo de inactividad.',
  CS + 'configure-web-security');
c('1.1g', '¿Secreto o token Direct Line en un cliente web?',
  'Servicio a servicio: el secreto en el header. Navegador o app móvil: intercambia el secreto por un token en tu servicio (válido para una conversación, caduca si no se refresca). Nunca expongas el secreto.',
  CS + 'configure-web-security');

// 1.2
c('1.2a', '¿Qué necesita un agent flow para usarse como herramienta de un agente?',
  'Trigger When an agent calls the flow, acción Respond to the agent, estar publicado, Asynchronous response en Off y responder dentro del límite de 100 segundos.',
  CS + 'flow-agent');
c('1.2b', 'Run a multistage approval: etapas y límites',
  'Preview, conector Human review. Etapas manuales (First to respond o Everyone must approve) y de IA (Approve/Reject con justificación), con conditions. Sin mismo aprobador en varias etapas; sin ALM, sin compartir, sin adjuntos.',
  CS + 'flows-advanced-approvals');
c('1.2b', '¿Cómo funciona Request for information?',
  'Pausa el flow y envía la solicitud por Outlook (mismo tenant); gana la primera respuesta. Tipos de input: texto, sí/no, correo, número y fecha. Las salidas son contenido dinámico; evita espacios en los nombres.',
  CS + 'flows-request-for-information');
c('1.2c', 'Express mode en agent flows: ¿qué límites tiene?',
  'Preview. Dos minutos, máximo 100 acciones (cada iteración de bucle cuenta), variables de 1,024 caracteres, mensajes de 64 KB, sin Delay ni webhook. Requiere trigger y respuesta de agente y plan Copilot Studio.',
  CS + 'agent-flow-express-mode');
c('1.2d', '¿Cómo consume capacidad un agent flow?',
  '13 Copilot Credits por cada 100 acciones. Desde un topic suma una Classic answer; con orquestación generativa, una Autonomous action. Los test runs (diseñador o test chat) no consumen capacidad.',
  CS + 'flows-overview');
c('1.2e', '¿Cómo se llenan los inputs de una herramienta?',
  'Por defecto con Dynamically fill with AI: del contexto o preguntando al usuario. Con Fill using > Custom value (literal, variable o Power Fx) el agente no pregunta. Las salidas vuelven con Respond to the agent.',
  CS + 'add-tools-custom-agent');
c('1.2f', '¿Cuáles son los estados de Configure run after?',
  'is successful, has failed, is skipped y has timed out. Permiten crear rutas alternativas de error, como notificar o registrar el fallo en el paso siguiente.',
  PAU + 'guidance/coding-guidelines/error-handling');
c('1.2f', '¿Cómo se implementa un try-catch en un cloud flow?',
  'Acciones en un Scope Try; un Scope Catch con run after has failed y has timed out; result() con Filter array para hallar el error; Terminate con estado Failed y mensaje para detener el flow.',
  PAU + 'guidance/coding-guidelines/error-handling');
c('1.2f', '¿Qué retry policy se prefiere y qué se configura?',
  'El exponencial (el intervalo crece en cada reintento) frente al fijo. Se configura en la acción: intervalo inicial y número máximo de reintentos. Es útil para fallos transitorios.',
  PAU + 'guidance/coding-guidelines/error-handling');

// 1.3
c('1.3a', 'End current topic frente a End all topics',
  'End current topic termina el topic y vuelve al que lo llamó. End all topics termina todos los activos y no limpia las variables globales (usa Clear all variables). Antes puedes añadir End Conversation.',
  CS + 'authoring-topic-management');
c('1.3b', 'Quick replies frente a Question de opción múltiple',
  'Los quick replies son sugerencias: el usuario puede escribir otra cosa. Para forzar una elección usa un Question multiple choice. Algunos canales limitan o no admiten quick replies.',
  CS + 'authoring-send-message');
c('1.3c', '¿Cuántas herramientas admite un agente?',
  'El orquestador admite hasta 128 herramientas por agente; para mejor rendimiento limítalas a 25–30. Cada child agent tiene su propia orquestación y su propio límite.',
  CS + 'add-tools-custom-agent');
c('1.3d', '¿Dónde se crea un prompt como herramienta?',
  'Como tool del agente (Tools > New tool > Prompt), como nodo de un topic (Add a tool > New prompt) o con la acción Run a prompt en un agent flow. Se edita en el prompt builder.',
  CS + 'nlu-prompt-node');
c('1.3d', '¿Qué modelo usa un prompt por defecto y qué rango tiene la temperature?',
  'GPT-4.1 mini (tarifa Basic). La temperature va de 0 a 1 (0 por defecto) y no está disponible con GPT-5 reasoning. El content moderation level solo existe para modelos administrados.',
  CS + 'prompt-model-settings');
c('1.3e', '¿Qué esquema tiene el campo Custom data?',
  'Tabla con Content (obligatorio), ContentLocation (URL de la cita) y Title (ambos opcionales). Solo se usan los tres primeros registros. Se configura en Classic data del Generative answers node.',
  CS + 'nlu-generative-answers-custom-data');
c('1.3e', '¿Cómo responder solo con tus propios datos en un Generative answers node?',
  'Search only selected sources activado y sin fuentes seleccionadas; tu variable en Custom data (Classic data); Web search y Allow the AI to use its own general knowledge desactivados.',
  CS + 'nlu-boost-node');
c('1.3f', 'Send HTTP request: métodos, timeout y manejo de errores',
  'GET, POST, PATCH, PUT y DELETE. Timeout por defecto de 30 s. Error handling: Raise an error (dispara On Error) o Continue on error con variables de status code y error body. Respuesta tipada con sample JSON.',
  CS + 'authoring-http-node');
c('1.3g', '¿Qué límite tienen las custom instructions de un Generative answers node?',
  '8,000 caracteres. Pueden incluir variables y fórmulas Power Fx, y sirven para definir tono, formato y alcance de la respuesta. Conviene darle al agente una salida («responde no encontrado»).',
  CS + 'nlu-generative-answers-prompt-modification');
c('1.3g', 'Search only selected sources: ¿qué cambia?',
  'Las fuentes seleccionadas reemplazan (no suman) a las del agente en ese nodo, sin fallback a ellas. Desactivado (por defecto) busca en todas. Sin Send a message, en Teams debes renderizar las citas.',
  CS + 'nlu-boost-node');
c('1.3h', '¿Qué versiones de Adaptive Card admite cada canal?',
  'Copilot Studio admite el schema 1.6 y anteriores. Web Chat: 1.6 sin Action.Execute. Live chat widget y Teams: 1.5. El test chat renderiza 1.6; el canvas, no.',
  CS + 'adaptive-cards-overview');
c('1.3h', 'Ask with adaptive card: reintentos y envíos',
  'Requiere al menos un submit. Reprompts por defecto: hasta 2. Allow switching to another topic viene activado. Incluye un identificador único en cada Action.Submit para distinguir cards consecutivas.',
  CS + 'authoring-ask-with-adaptive-card');
c('1.3i', '¿Cuáles son los cuatro scopes de variables?',
  'Topic (por defecto), global (prefijo Global., todos los topics), system (System.*, las crea Copilot Studio) y environment (de Power Platform, solo lectura). El tipo queda fijado en la primera asignación.',
  CS + 'authoring-variables-about');

/* ---------------------------- D2 ---------------------------- */
// 2.1a
c('2.1a', 'Copilot connectors frente a Power Platform connectors como knowledge',
  'Copilot connectors: copian e indexan en Microsoft Graph (ACL, citas, búsqueda semántica) y los configura el admin. Power Platform connectors: consulta en vivo sin mover datos (preview) y transacciones.',
  CS + 'knowledge-graph-vs-power-platform-connectors');
c('2.1a', '¿Qué scope exige un Copilot connector al publicar en canales?',
  'ExternalItem.Read.All dentro de la autenticación manual. Con licencia Microsoft 365 Copilot en el mismo tenant conviene activar Tenant graph grounding with semantic search.',
  CS + 'knowledge-copilot-connectors');
// 2.1b
c('2.1b', 'Real-time knowledge con Power Platform connectors',
  'Preview. Solo se indexan metadatos (tablas y columnas); cada consulta se ejecuta en runtime con el token del usuario. Ej.: Salesforce, ServiceNow, Azure SQL, Dataverse, SAP OData. Lo gobiernan las mismas data policies.',
  CS + 'knowledge-real-time-connectors');
c('2.1b', 'Límites de knowledge sources en modo generativo',
  'Sitios web públicos: 25. SharePoint: 25 URL. Dataverse y enterprise connectors: sin límite. Con más de 25 fuentes distintas el orquestador filtra con un GPT interno (los archivos subidos no cuentan).',
  CS + 'knowledge-copilot-studio');
// 2.1c
c('2.1c', '¿Qué tipos de autenticación admite Azure AI Search?',
  'Access Key, Client Certificate Auth, Service principal (aplicación de Entra) y Microsoft Entra ID Integrated. Agrégalo con una data connection formal; evita configurar endpoint y clave a mano.',
  CS + 'knowledge-azure-ai-search');
c('2.1c', '¿Qué requisitos tiene el índice de Azure AI Search?',
  'Índice vectorial con integrated vectorization (Import and vectorize data): el mismo modelo vectoriza la consulta. Solo un vector index por conexión. El semantic ranker se configura primero en Azure.',
  CS + 'knowledge-azure-ai-search');
c('2.1c', '¿Cómo se obtienen citas con Azure AI Search?',
  'Incluye un campo con la URL del documento: metadata_storage_path se usa como cita si existe; si no, cualquier campo con una URL completa. Los usuarios deben tener acceso a esas fuentes.',
  CS + 'knowledge-azure-ai-search');
// 2.2a
c('2.2a', '¿Dónde se ejecuta Computer use?',
  'Hosted browser (preview; experimentación, sin apps de escritorio), Cloud PC pool (preview; Entra + Intune, autoescalado) o tu propia máquina (Power Automate para escritorio 2.61.132.25266+, registrada y con Enable for computer use).',
  CS + 'configure-where-computer-use-runs');
c('2.2a', '¿Cuántos Copilot Credits cuesta Computer use?',
  '5 por paso con modelos estándar y 15 por paso con modelos premium (Opus 4.6). No está incluido en la licencia Microsoft 365 Copilot USL. Requiere generative orchestration.',
  CS + 'computer-use');
c('2.2a', '¿Qué modelos admite Computer use?',
  'OpenAI CUA y Anthropic Claude Sonnet 4.5 (GA); Sonnet 4.6 y Opus 4.6 son experimentales. Los modelos de Anthropic exigen que el administrador permita modelos externos.',
  CS + 'computer-use');
c('2.2a', '¿Qué controles de seguridad ofrece Computer use?',
  'Human supervision (correo de Outlook al revisor), access control allow-list (bloquea acciones, no abrir), Enforce HTTPS y credenciales almacenadas (internas o Azure Key Vault). Por defecto usa credenciales del maker.',
  CS + 'computer-use');
// 2.2b
c('2.2b', '¿Qué transporte y requisitos tiene un servidor MCP en Copilot Studio?',
  'Solo Streamable HTTP (SSE no se admite desde agosto de 2025). Requiere generative orchestration. El asistente pide nombre, descripción (la usa el orquestador) y URL del servidor.',
  CS + 'mcp-add-existing-server-to-agent');
c('2.2b', '¿Qué autenticaciones admite el asistente de MCP?',
  'None, API key (header o query) u OAuth 2.0: Dynamic discovery (DCR + discovery), Dynamic (DCR sin discovery) y Manual (client ID y secret, URLs, scopes; copia la callback URL en el IdP).',
  CS + 'mcp-add-existing-server-to-agent');
c('2.2b', '¿Cómo se expone MCP con un custom connector?',
  'Archivo OpenAPI (Swagger 2.0) con x-ms-agentic-protocol: mcp-streamable-1.0 en la operación POST /mcp. MCP usa Power Platform connectors, por lo que las data policies también lo gobiernan.',
  CS + 'mcp-add-existing-server-to-agent');
c('2.2b', 'Tools y Resources de un servidor MCP: ¿cómo se controlan?',
  'Desactiva Allow all para elegir herramientas una a una (las nuevas quedan desactivadas). Un resource solo lo usa el agente si el propietario lo configura como salida de una tool MCP.',
  CS + 'mcp-add-components-to-agent');
// 2.2c
c('2.2c', '¿Cómo se crea un custom connector y qué autenticaciones admite?',
  'Desde una definición OpenAPI (Swagger 2.0), una colección Postman o desde cero (portal de Power Apps o Power Automate). Auth: OAuth 2.0, Basic o API key. Se agrega con Add a tool > Custom connector.',
  CON + 'custom-connectors/');
c('2.2c', 'Orden de importación de un agente con custom connector',
  'Importa primero el custom connector, en una solución aparte, y después la solución con las connection references y el agente. Si no, la importación falla o los flows no se activan.',
  CS + 'authoring-solutions-import-export');
// 2.2d
c('2.2d', 'REST API tool: formato de la especificación',
  'Preview. OpenAPI en JSON versión 2; una especificación v3 se traduce a v2. Eliges la solución, mejoras la descripción (la usa el orquestador) y seleccionas solo las operaciones deseadas (crear sí, eliminar no).',
  CS + 'agent-extend-action-rest-api');
c('2.2d', 'REST API tool: opciones de autenticación',
  'None, API key (etiqueta, nombre y ubicación Header o Query) u OAuth 2.0 (client ID y secret, auth URL, token URL, refresh URL y scope). Completa también las descripciones de entradas y salidas.',
  CS + 'agent-extend-action-rest-api');
c('2.2d', '¿Custom connector, REST API tool o Send HTTP request?',
  'Custom connector: reutilizable en flows, apps y agentes con conexiones. REST API tool: se define en el agente y eliges operaciones. Send HTTP request: nodo dentro de un topic, sin selección del orquestador.',
  CS + 'add-tools-custom-agent');
// 2.3a
c('2.3a', '¿Child agent o connected agent?',
  'Child: ligero, dentro del agente, un caso de uso y un equipo, sin ajustes ni despliegue propios. Connected: otro agente de Copilot Studio del mismo entorno con su publicación, modelo y ALM; reutilizable.',
  CS + 'authoring-add-other-agents');
c('2.3a', '¿Cuándo dividir un agente en varios?',
  'Con más de unas 30–40 herramientas, topics o agentes, o descripciones parecidas; varios equipos; publicación o canales separados. Costo: más latencia y más superficie de pruebas y gobierno.',
  CS + 'authoring-add-other-agents');
c('2.3a', '¿Qué límites tiene el diseño multi-agente?',
  'Un agente principal con connected agents no puede ser connected agent de otro. Child y connected respetan Use general knowledge del principal. Las citas pueden perderse al devolver la respuesta.',
  CS + 'authoring-add-other-agents');
// 2.3b
c('2.3b', '¿Qué se necesita para conectar un agente de Foundry (preview)?',
  'Foundry project endpoint y Agent Id. El agente debe haberse creado en el portal nuevo de Foundry (si es del antiguo: 404 Version not found) y tener habilitado el Activity protocol endpoint.',
  CS + 'add-agent-foundry-agent');
c('2.3b', '¿Cómo se habilita el Activity protocol endpoint de Foundry?',
  'Solo con REST API o Python SDK; el portal únicamente muestra Responses y A2A. Si falta, la conexión falla con 400 «endpoint does not support activity».',
  CS + 'add-agent-foundry-agent');
// 2.3c
c('2.3c', '¿Cómo se invoca un connected agent?',
  'El orquestador lo elige por su descripción; también puedes referenciarlo con / en las instrucciones o usar un nodo Redirect desde un topic (inputs y outputs pasan a variables del topic).',
  CS + 'authoring-add-other-agents');
// 2.3d
c('2.3d', '¿Qué capacidad y orígenes necesita un Fabric data agent?',
  'Capacidad paga F2 o superior (o Power BI Premium P1+ con Fabric). Hasta 5 orígenes: warehouse, lakehouse, modelo semántico, KQL database, mirrored DB, ontology o Microsoft Graph.',
  CS + 'add-agent-fabric-data-agent');
c('2.3d', '¿Qué límites tiene un Fabric data agent?',
  'Solo lectura (NL2SQL, NL2DAX, NL2KQL), credenciales del usuario, respuestas de 25 filas por 25 columnas, hasta 100 example queries por origen (no en modelos semánticos), solo inglés, y no se puede cambiar el LLM.',
  CS + 'add-agent-fabric-data-agent');
c('2.3d', '¿Qué limitaciones tiene un Fabric data agent en Copilot Studio?',
  'Preview. No puede ser destino de un nodo Redirect ni referenciarse en las instrucciones, y no funciona si el agente principal se despliega en Microsoft Copilot.',
  CS + 'add-agent-fabric-data-agent');
// 2.3e
c('2.3e', 'A2A: ¿qué URL se ingresa?',
  'La URL del endpoint del agente, no la del agent card. Si /.well-known/agent.json es válido, nombre y descripción se autocompletan; si no, escribe una descripción útil para el orquestador.',
  CS + 'add-agent-agent-to-agent');
c('2.3e', 'A2A: autenticación y contenido del payload',
  'None, API key (header o query) u OAuth 2.0. El payload incluye contextId, IDs de mensaje, locale e historial de chat en metadata (copilotstudio.microsoft.com/a2a/chathistory).',
  CS + 'add-agent-agent-to-agent');
c('2.3e', '¿Cómo probar un agente A2A local?',
  'Exponlo con Dev Tunnels haciendo público el puerto y usa la URL del túnel como endpoint. A2A reutiliza la infraestructura de custom connectors, por lo que también puede alcanzar agentes en redes privadas.',
  CS + 'add-agent-agent-to-agent');
// 2.4a
c('2.4a', 'Azure OpenAI «on your data» en un Generative answers node',
  'Preview. En el nodo: Data source > Classic data > Add connection a Azure OpenAI Service. Las fuentes del nodo tienen prioridad sobre las del agente, que actúan como respaldo.',
  CS + 'nlu-generative-answers-azure-openai');
c('2.4a', '¿Dónde se agrega Azure AI Search como conocimiento?',
  'Con Add knowledge desde Overview o Knowledge del agente, o desde las Properties de un Generative answers node (Featured > Azure AI Search). Admite private endpoint con Virtual Network support.',
  CS + 'knowledge-azure-ai-search');
// 2.4b
c('2.4b', 'Modelos de Foundry en prompts: ¿qué endpoint?',
  'Debe terminar en /chat/completions (solo modelos chat completion). Un endpoint Responses (/openai/v1/responses) da «Resource not found». Deployment name y base model name, exactamente como en Foundry.',
  CS + 'bring-your-own-model-prompts');
c('2.4b', '¿Qué modelos no admite BYOM en prompts?',
  'La familia GPT-5 y posteriores no se admite. Se conecta desde el prompt: Model > + > Connect a model from Azure AI Foundry.',
  CS + 'bring-your-own-model-prompts');
c('2.4b', 'BYOM: ¿cómo se factura y se gobierna?',
  'Se factura aparte en Azure, no a las tarifas de Copilot Studio. Lo gobierna el conector Azure AI Foundry en las data policies del Power Platform admin center.',
  CS + 'bring-your-own-model-prompts');
// 2.4c
c('2.4c', 'Application Insights: ¿dónde se configura y qué toggles hay?',
  'Settings > Advanced > Application Insights > Connection string. Toggles: Enable logging, Log conversation details (usuario y texto), Log sensitive Activity properties y Node execution events.',
  CS + 'advanced-bot-framework-composer-capture-telemetry');
c('2.4c', 'KQL: ¿cómo excluir las conversaciones de prueba?',
  'Los eventos están en customEvents. designMode es True en el test canvas: usa where customDimensions[\'designMode\'] == "False". Otras dimensiones: type, channelId, fromId, locale y text.',
  CS + 'advanced-bot-framework-composer-capture-telemetry');
c('2.4c', 'Copilot Studio Dashboard: ¿dónde está y quién puede verlo?',
  'Workbook en Application Insights > Monitoring > Workbooks (preview). Para compartirlo, los usuarios necesitan al menos el rol Reader en el recurso de Application Insights conectado.',
  CS + 'advanced-bot-framework-composer-capture-telemetry');
c('2.4c', 'Telemetría de agente frente a la de entorno',
  'Agente: la configura el maker, eventos en customEvents. Entorno (preview): una vez por admin, trazas y spans alineados con OpenTelemetry, tabla dependencies. Se bloquea con la data policy Application Insights in Copilot Studio.',
  CS + 'telemetry-overview');

/* ---------------------------- D3 ---------------------------- */
// 3.1a
c('3.1a', 'Single response: ¿qué límites tiene el test set y su importación?',
  'Hasta 100 casos. Importación en CSV o TXT con encabezados Question y Expected response; hasta 100 preguntas de máximo 1,000 caracteres. Los resultados se conservan 89 días (exporta a CSV).',
  CS + 'analytics-agent-evaluation-create');
c('3.1a', 'Conversation: ¿qué límites tiene el test set?',
  'Hasta 20 casos de prueba y 12 mensajes por caso (6 pares pregunta-respuesta). Según la tabla de métodos aplican General quality, Content safety, Keyword match y Custom (Compare meaning, similitud, Exact match y Tool use son de respuesta única).',
  CS + 'analytics-agent-evaluation-multi-turn');
c('3.1a', '¿Cómo se crea un test set?',
  'Quick question set (10 preguntas desde la descripción), Full question set (desde knowledge o topics), test chat, importar CSV, escribir a mano o desde themes (preview). Archivos para generar: hasta 5 MB.',
  CS + 'analytics-agent-evaluation-create');
// 3.1b
c('3.1b', '¿Qué métodos de evaluación usan pass score?',
  'Compare meaning (por defecto 50) y Text similarity (coseno de 0 a 1). Son pass/fail: Exact match, Keyword match (Any o All), Tool use, Content safety y Custom. General quality se puntúa sobre 100 %.',
  CS + 'analytics-agent-evaluation-overview');
c('3.1b', 'Compare meaning, Text similarity y Exact match: ¿cuándo cada uno?',
  'Compare meaning: misma intención con redacción distinta. Text similarity: redacción casi idéntica (coseno). Exact match: carácter por carácter, para códigos o números. Sin respuesta esperada el caso es Invalid.',
  CS + 'analytics-agent-evaluation-overview');
c('3.1b', 'Content safety: ¿qué significa el umbral de severidad?',
  'Va de 0 (el más estricto) a 7 (el más permisivo). Se agrega un método por tipo: hatefulness y unfairness, sexual, violence y self-harm. Pasa si la severidad está dentro del umbral.',
  CS + 'analytics-agent-evaluation-overview');
c('3.1b', 'General quality y Custom: ¿en qué se diferencian?',
  'General quality (LLM): relevancia, groundedness, completitud y abstención; viene por defecto y no necesita respuesta esperada. Para negativas esperadas usa Custom: instrucciones y 2 o más labels con Pass o Fail.',
  CS + 'analytics-agent-evaluation-overview');
// 3.1c
c('3.1c', '¿Qué resultados puede tener un caso de evaluación?',
  'Pass, Fail, Invalid (falta la respuesta, keyword o herramienta esperada del método) o Error. El Pass rate resume el test set. Solo se ejecuta una evaluación a la vez.',
  CS + 'analytics-agent-evaluation-results');
c('3.1c', '¿Cómo se revisan y comparan los resultados?',
  'Compare with compara dos ejecuciones del mismo test set; Show activity map muestra decisiones y recursos usados; el response time solo se mide. Los resultados duran 89 días: exporta a CSV.',
  CS + 'analytics-agent-evaluation-results');

// 3.2a
c('3.2a', 'Solución managed frente a unmanaged',
  'Unmanaged se desarrolla; exporta como managed para Test y Producción. No se exporta una managed ni se importa en el entorno de su unmanaged. Borrar una managed elimina sus personalizaciones.',
  PP + 'alm/solution-concepts-alm');
c('3.2a', 'Publisher, prefijo y preferred solution',
  'Crea tu publisher (no el predeterminado) y define el prefijo antes de crear componentes. La preferred solution es donde se crean por defecto los agentes nuevos; si no, van a la default solution.',
  PP + 'alm/solution-concepts-alm');
c('3.2a', '¿Qué impide exportar o importar bien una solución con agente?',
  'Una solución managed no se exporta; topics con puntos en el nombre impiden exportar; los comentarios no se exportan. Tras importar: reconfigura la autenticación y publica antes de compartir.',
  CS + 'authoring-solutions-import-export');
// 3.2b
c('3.2b', '¿Cómo se agrega un agente existente a una solución?',
  'En la solución: Add existing > Agent > Agent. Si luego agregas topics o flows, usa Advanced > Add required objects. Quitar el agente de la solución no elimina sus componentes.',
  CS + 'authoring-solutions-import-export');
c('3.2b', '¿Cómo se quita una capa unmanaged de un agente managed?',
  'Un cambio directo en el entorno crea una capa unmanaged sobre la managed. En el agente: Advanced > See solution layers, selecciona la capa y elige Remove unmanaged layer.',
  CS + 'authoring-solutions-overview');
// 3.2c
c('3.2c', '¿Qué tipos de environment variable existen?',
  'Decimal number, Text, JSON, Two options (Yes/No), Data source y Secret. En Copilot Studio son de solo lectura. Su valor puede tener hasta 2,000 caracteres.',
  PA + 'environmentvariables');
c('3.2c', 'Default value frente a current value',
  'La definición con su default value viaja en la solución; el current value es el valor del entorno y se usa aunque haya default. Quítalo antes de exportar para dar el valor al importar o desplegar.',
  PA + 'environmentvariables');
c('3.2c', 'Variable Secret: ¿qué requisitos tiene en Azure?',
  'Resource provider Microsoft.PowerPlatform registrado en la suscripción; rol Key Vault Secrets User para el usuario y para Dataverse; Key Vault del mismo tenant. Solo Azure Key Vault se admite como almacén.',
  PA + 'environmentvariables-azure-key-vault-secrets');
c('3.2c', 'Usar un Secret en Copilot Studio: ¿qué más hace falta?',
  'Da el rol Key Vault Secrets User a Microsoft Copilot Studio Service y etiqueta el secreto: AllowedBots = {envId}/{schemaName} o AllowedEnvironments = ID del entorno.',
  PA + 'environmentvariables-azure-key-vault-secrets');
c('3.2c', '¿Cuándo hay que republicar tras cambiar una environment variable?',
  'Al cambiar su valor hay que republicar el agente, salvo en las de tipo Secret, que se recuperan en tiempo de ejecución. Sus errores aparecen en el test chat y al publicar.',
  CS + 'authoring-variables-about');
// 3.2d
c('3.2d', 'Pipelines: ¿qué entornos deben ser Managed Environments?',
  'El host debe ser de producción pero no necesita ser managed; los entornos Developer tampoco. Todos los demás entornos de la pipeline deben ser Managed Environments con licencias premium.',
  PP + 'alm/pipelines');
c('3.2d', 'Pipelines: ¿qué despliegan y con qué reglas?',
  'Solo soluciones managed (la unmanaged se guarda de respaldo) más conexiones, connection references y variables validadas antes. Mismo artefacto en orden, importación Upgrade, una solución por despliegue, no entre tenants.',
  PP + 'alm/pipelines');
c('3.2d', 'Pipelines: roles y dónde se ejecutan',
  'Deployment Pipeline Administrator (abre Deployment Pipeline Configuration) y Deployment Pipeline User. Se ejecutan desde una solución unmanaged en el entorno de desarrollo; también con pac pipeline.',
  PP + 'alm/pipelines');
c('3.2d', 'Extender pipelines: ¿qué gated extensions y acciones existen?',
  'Pre-export (UpdatePreExportStepStatus), Is delegated deployment (OnApprovalStarted, UpdateApprovalStatus) y Pre-deployment (OnPreDeploymentStarted, UpdatePreDeploymentStepStatus). Estados: 20 completar, 30 rechazar.',
  PP + 'alm/extend-pipelines');
c('3.2d', 'Despliegue delegado: ¿cómo funciona?',
  'Is delegated deployment: despliega un service principal o el propietario de la etapa, previa aprobación (OnApprovalStarted). El service principal necesita Deployment Pipeline Administrator en el host y System Administrator en destinos.',
  PP + 'alm/delegated-deployments-setup');

// ---- build ----
const counters = {};
const out = C.map(card => {
  const n = (counters[card.skill] = (counters[card.skill] || 0) + 1);
  return { id: `c-${card.skill}-${String(n).padStart(2, '0')}`, skill: card.skill, front: card.front, back: card.back, source: card.source };
});
const json = JSON.stringify(out, null, 2).replace(/<\/script/gi, '<\\/script');
const header =
  '// AB-620 flashcards (100, Spanish). Generated by tools/build-cards.mjs. Schema: SPEC §6.\n';
fs.writeFileSync(OUT, header + 'window.AB620_CARDS = ' + json + ';\n', 'utf8');
console.log('wrote', OUT, out.length, 'cards');
