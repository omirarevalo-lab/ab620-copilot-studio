// AB-620 in-app lessons (Spanish). Schema: see plan "Content to create".
window.AB620_LESSONS = [
 {
  "id": "L01",
  "skills": [
   "1.1a"
  ],
  "title": "Integrar con sistemas empresariales",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Elige el puente correcto",
    "body": "Un agente solo sirve si llega a tus sistemas. Copilot Studio ofrece varios puentes: conectores, custom connector, REST API, MCP, Agent flows y Computer use. La pregunta clave: ¿el sistema expone una API? Entonces úsala. ¿Solo tiene pantalla? Entonces Computer use.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Qué herramienta elijo</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Existe un conector</span><span style=\"text-align:right\">Power Platform connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Existe un OpenAPI</span><span style=\"text-align:right\">REST API / custom connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Habla el protocolo MCP</span><span style=\"text-align:right\">MCP server</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Solo tiene pantalla</span><span style=\"text-align:right\">Computer use</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso quiere registrar facturas en un programa de escritorio viejo, sin API: Computer use, que opera la pantalla con visión. Para consultar el inventario, que sí tiene OpenAPI: una herramienta REST API. Y si otros clientes de IA también deben usar las herramientas: un servidor MCP.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Agente Contoso, Tools</div><span style=\"display:inline-block;border:1px solid var(--accent);color:var(--accent);border-radius:999px;padding:0 8px;font-size:12px;margin:2px 4px 2px 0\">Facturas: Computer use</span><span style=\"display:inline-block;border:1px solid var(--muted);border-radius:999px;padding:0 8px;font-size:12px;margin:2px 4px 2px 0\">Inventario: REST API</span><span style=\"display:inline-block;border:1px solid var(--muted);border-radius:999px;padding:0 8px;font-size:12px;margin:2px 4px 2px 0\">Herramientas compartidas: MCP</span></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "El enunciado dice que la aplicación solo tiene interfaz gráfica, sin API ni base de datos accesible. La respuesta es Computer use. La trampa: elegir custom connector, REST API o MCP, que presuponen una API o un servidor que hable ese protocolo."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Computer use y MCP requieren generative orchestration. Computer use cuesta 5 Copilot Credits por paso con modelos estándar. El orquestador elige herramientas por nombre y descripción: escríbelas bien."
   }
  ],
  "narration": "Un agente solo es útil si llega a los sistemas de tu empresa, así que lo primero es elegir el puente correcto. Copilot Studio te da varios: conectores de Power Platform, custom connectors, la herramienta REST API, servidores eme ce pe, Agent flows y Computer use. La pregunta que ordena todo es sencilla. ¿El sistema expone una a pe i? Entonces usa un conector o la herramienta REST API. ¿Habla el protocolo eme ce pe? Entonces conéctalo como servidor eme ce pe, y sirve también a otros clientes de inteligencia artificial. ¿Solo tiene interfaz gráfica, sin a pe i? Entonces Computer use, que opera la pantalla con visión y razonamiento. Piensa en Contoso: facturas en un programa de escritorio viejo, Computer use; inventario con especificación OpenAPI, REST API. En el examen, si el enunciado dice sin a pe i y solo pantalla, la respuesta es Computer use. Recuerda además que Computer use y eme ce pe requieren generative orchestration, y que cada paso de Computer use cuesta cinco Copilot Credits con modelos estándar.",
  "reto": {
   "text": "Abre un agente y entra a Tools, Add a tool.\nMira las categorías: conectores, MCP, REST API, Computer use.\nPara tres sistemas imaginarios de tu trabajo, anota qué puente usarías y por qué.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
 },
 {
  "id": "L02",
  "skills": [
   "1.1b"
  ],
  "title": "Identidad y autenticación",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Quién habla con tu agente",
    "body": "Authenticate with Microsoft configura Microsoft Entra ID de forma automática. En Teams el usuario ya está identificado y no ve ningún inicio de sesión. Si tus usuarios no tienen cuenta Microsoft, usas Authenticate manually con un proveedor OAuth 2 genérico.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Usuario</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Canal</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Entra ID</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">u OAuth 2</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">La identidad viaja con la conversación</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "El agente de TI de Contoso vive en Teams: Authenticate with Microsoft, sin pedir login. El portal de clientes usa cuentas propias: Authenticate manually con OAuth 2. Entonces quedan disponibles User.Id, User.DisplayName, User.AccessToken y User.IsLoggedIn.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Authentication</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams (empleados)</span><span style=\"text-align:right\">Authenticate with Microsoft</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Portal de clientes</span><span style=\"text-align:right\">Authenticate manually, OAuth 2</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Los canales Teams y Microsoft 365 solo admiten Authenticate with Microsoft. Para cuentas que no son de Microsoft se necesita Authenticate manually. La trampa: elegir No authentication por simplicidad en un agente que toca datos internos."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Microsoft: Entra ID automático. Manual: OAuth 2 genérico. Variables: User.Id, User.DisplayName, User.AccessToken, User.IsLoggedIn."
   }
  ],
  "narration": "La estrategia de identidad responde una pregunta: quién está hablando con tu agente. Copilot Studio ofrece tres caminos. Sin autenticación, cualquiera con el enlace puede chatear. Authenticate with Microsoft, que configura Microsoft Entra ID de forma automática; en Teams el usuario ya está identificado y ni siquiera ve un inicio de sesión. Y Authenticate manually, para usuarios con cuentas que no son de Microsoft, con un proveedor de O Auth dos genérico. Piensa en Contoso. El agente de soporte interno vive en Teams, así que usa Authenticate with Microsoft. El portal de clientes usa cuentas propias, así que usa autenticación manual. Con autenticación disponible tienes variables como User punto Id, User punto DisplayName, User punto AccessToken y User punto IsLoggedIn. En el examen recuerda que los canales Teams y Microsoft trescientos sesenta y cinco solo admiten la opción Microsoft, y que la trampa típica es escoger sin autenticación solo por simplicidad cuando el agente accede a datos internos.",
  "reto": {
   "text": "Abre Settings, Security, Authentication de un agente de prueba.\nCambia entre No authentication y Authenticate with Microsoft.\nAnota qué variables User aparecen al elegir autenticación.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
 },
 {
  "id": "L03",
  "skills": [
   "1.1c"
  ],
  "title": "Canales y publicación",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Publicar no es guardar",
    "body": "Cuando haces Publish se actualizan todos los canales conectados. Pero el contenido nuevo solo se aplica al iniciar una sesión nueva; en la mayoría de canales eso ocurre tras 30 minutos de inactividad.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Editar</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Publish</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Canales</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"302.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Sesión</text><text x=\"302.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">nueva</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Los cambios llegan en sesiones nuevas</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso publica su agente en Teams y en un Demo website. Cada canal tiene su propio conector en las data policies: el administrador puede bloquear los de WhatsApp y Facebook y así los makers no pueden usarlos. Direct Line channels cubre el Demo website, sitios personalizados y apps móviles.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Channels</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams</span><span style=\"text-align:right\">Publicado</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Demo website</span><span style=\"text-align:right\">Publicado</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">WhatsApp</span><span style=\"text-align:right\">Bloqueado por data policy</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Un usuario sigue viendo la versión vieja después de publicar. La respuesta: su sesión es anterior y solo una sesión nueva ve el cambio. La trampa: pensar que Publish solo actualiza un canal o que hay que republicar cada uno."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Publish actualiza todos los canales. Sesión nueva para ver cambios. Cada canal tiene su conector en data policies."
   }
  ],
  "narration": "Publicar un agente no es lo mismo que guardarlo. Cuando haces Publish, Copilot Studio actualiza todos los canales conectados a la vez. Pero ojo con un detalle que el examen adora: el contenido nuevo solo se aplica cuando empieza una sesión nueva. En la mayoría de canales eso sucede después de treinta minutos de inactividad, así que un usuario con una conversación abierta puede seguir viendo la versión anterior. Piensa en Contoso: publican el agente en Teams y en un sitio de demostración. Cada canal tiene su propio conector en las data policies, así que el administrador puede bloquear por ejemplo los de WhatsApp o Facebook, y los makers dejan de poder usarlos. El canal Direct Line cubre el sitio de demostración, los sitios personalizados y las aplicaciones móviles. En el examen, si alguien ve la versión vieja tras publicar, la respuesta es que su sesión es anterior y necesita una nueva.",
  "reto": {
   "text": "Publica tu agente de prueba en el Demo website.\nCambia un mensaje, vuelve a publicar y abre una conversación nueva.\nMira en Channels qué canales existen y cuáles requieren autenticación.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels"
 },
 {
  "id": "L04",
  "skills": [
   "1.1d"
  ],
  "title": "IA responsable y moderación",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Controla qué puede decir",
    "body": "El content moderation level se fija a nivel de agente, de generative answers node y de prompt. En ejecución prevalece el del topic. Highest aplica el filtro más estricto y genera menos respuestas; Lowest genera más.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Moderación</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Highest</span><span style=\"text-align:right\">más estricto, menos respuestas</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Lowest</span><span style=\"text-align:right\">más permisivo, más respuestas</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Quién gana</span><span style=\"text-align:right\">el del topic en ejecución</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "El agente de RR. HH. de Contoso desactiva Allow ungrounded responses: si en un turno no usó ninguna fuente ni herramienta, se bloquea la respuesta y se dispara el fallback. Además avisa en Conversation Start que habla con una IA.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Settings, Generative AI</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Content moderation</span><span style=\"text-align:right\">Highest</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Allow ungrounded responses</span><span style=\"text-align:right\">Off</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden la mejor práctica para evitar respuestas sin fundamento: desactivar Allow ungrounded responses. La trampa: creer que Highest genera más respuestas. Es al revés: Highest filtra más."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Moderación en tres niveles: agente, nodo y prompt. Highest = más estricto. Avisar que es IA en Conversation Start."
   }
  ],
  "narration": "La estrategia de inteligencia artificial responsable se traduce en ajustes concretos. El primero es el nivel de moderación de contenido, que puedes fijar en el agente, en el generative answers node y en el prompt. En ejecución prevalece el del topic. Highest aplica el filtro más estricto y genera menos respuestas; Lowest, al revés, permite más respuestas. El segundo ajuste es Allow ungrounded responses. Si lo desactivas, cuando en un turno el agente no usó ninguna fuente ni herramienta, bloquea la respuesta y dispara el fallback. Es la manera de evitar que invente. Y la buena práctica de transparencia: avisar al usuario en Conversation Start que está hablando con una inteligencia artificial. Piensa en el agente de recursos humanos de Contoso: moderación alta, respuestas sin fundamento desactivadas y un saludo que aclara que es un asistente de inteligencia artificial. La trampa del examen es creer que Highest da más respuestas: da menos.",
  "reto": {
   "text": "En un agente de prueba abre Settings, Generative AI.\nPrueba el moderation level en Highest y haz una pregunta incómoda.\nDesactiva Allow ungrounded responses y pregunta algo fuera de tus fuentes.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
 },
 {
  "id": "L05",
  "skills": [
   "1.1e"
  ],
  "title": "Seguridad y gobierno",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Dos redes de seguridad",
    "body": "El security scan avisa cuando debilitas los valores por defecto. Por ejemplo, pasar de Authenticate with Microsoft a No authentication deja chatear a cualquiera con el enlace. Aparte, el administrador gobierna con data policies (DLP).",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Maker</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Security</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">scan</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Data</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">policies</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Publicar</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Scan avisa; DLP bloquea</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "El administrador de Contoso bloquea en una data policy el conector Chat without Microsoft Entra ID authentication in Copilot Studio: nadie publica agentes sin autenticación. Cada tipo de knowledge source tiene su propio conector: documentos locales, SharePoint/OneDrive y sitios web públicos.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Data policy de Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Chat without Microsoft Entra ID authentication in Copilot Studio</span><span style=\"text-align:right\">Blocked</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge: documentos locales</span><span style=\"text-align:right\">conector propio</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge: SharePoint y OneDrive</span><span style=\"text-align:right\">conector propio</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Knowledge: sitios web públicos</span><span style=\"text-align:right\">conector propio</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden impedir agentes públicos sin autenticación: bloquear ese conector en la data policy. La trampa: creer que bloquear un conector de conocimiento afecta a los demás. Cada tipo tiene el suyo."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Security scan = avisos. Data policies = bloqueos, por conector. Un conector por tipo de fuente de conocimiento."
   }
  ],
  "narration": "Seguridad y gobierno en Copilot Studio se apoyan en dos piezas. La primera es el security scan, que avisa cuando debilitas los valores seguros por defecto; por ejemplo, cuando cambias de Authenticate with Microsoft a sin autenticación, que permite chatear a cualquiera que tenga el enlace. La segunda son las data policies, que el administrador configura en el centro de administración de Power Platform y que sí bloquean. En Contoso, el administrador bloquea el conector llamado Chat without Microsoft Entra ID authentication, y con eso ningún maker puede publicar un agente sin autenticación; solo puede elegir Authenticate with Microsoft o autenticación manual. Además, cada tipo de fuente de conocimiento tiene su propio conector: documentos locales, SharePoint y OneDrive, y sitios web públicos. Bloquear uno no afecta a los demás, porque cada conector es independiente. Para el examen, recuerda la división: el scan avisa, la política bloquea, y las políticas actúan por conector.",
  "reto": {
   "text": "Abre un agente y busca el Security scan en Settings.\nCambia la autenticación a No authentication y vuelve a ejecutar el scan.\nAnota qué advertencia aparece y cómo la corregirías.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-scan"
 },
 {
  "id": "L06",
  "skills": [
   "1.1f"
  ],
  "title": "Componentes reutilizables",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Haz una vez, usa muchas",
    "body": "Una component collection empaqueta topics, tools, knowledge, flows, entities, child agents y MCP para reutilizarlos en otros agentes. Quien la usa no puede cambiar sus componentes.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topics</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Tools</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Component</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">collection</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente A</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente B</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Un paquete, varios agentes</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso arma una colección Saludo y escalamiento con topics y tools, y la usan sus tres agentes. Si la colección es compleja (conectores, environment variables), se usan soluciones como portadoras: se agrega a una solución, se exporta y se importa en el destino.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Component collection: Saludo y escalamiento</div><span style=\"display:inline-block;border:1px solid var(--accent);color:var(--accent);border-radius:999px;padding:0 8px;font-size:12px;margin:2px 4px 2px 0\">Topic: Saludo</span><span style=\"display:inline-block;border:1px solid var(--muted);border-radius:999px;padding:0 8px;font-size:12px;margin:2px 4px 2px 0\">Topic: Escalar a humano</span><span style=\"display:inline-block;border:1px solid var(--muted);border-radius:999px;padding:0 8px;font-size:12px;margin:2px 4px 2px 0\">Tool: Crear ticket</span><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">La usan</span><span style=\"text-align:right\">Agente TI, RR. HH., Ventas</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden reutilizar piezas entre agentes sin que los autores las rompan: component collections. La trampa: copiar topics a mano o exportar solo la colección cuando incluye conectores; ahí se recomienda una solución."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Colección = topics, tools, knowledge, flows, entities, child agents, MCP. Los consumidores no editan. Complejo = solución portadora."
   }
  ],
  "narration": "Cuando tienes varios agentes, copiar y pegar topics es una mala idea. Para eso existen las component collections, que empaquetan topics, herramientas, conocimiento, flows, entidades, agentes hijos y servidores eme ce pe, para reutilizarlos. Una vez que la colección está disponible en un agente, todos los autores pueden usarla, pero no pueden cambiar sus componentes. Piensa en Contoso: crean una colección de saludo y escalamiento a un humano, y la reutilizan tres agentes. Piensa también en el mantenimiento: si mejoras la colección una vez, todos los agentes se benefician sin copiar nada. Si la colección es compleja, por ejemplo porque incluye conectores o environment variables, la recomendación es usar soluciones como portadoras: agregas la colección a una solución, la exportas y la importas en el entorno destino. En el examen te preguntarán cómo reutilizar componentes sin duplicarlos y sin que los demás los modifiquen: la respuesta es component collections. Y si hay dependencias complejas, soluciones como medio de transporte.",
  "reto": {
   "text": "En un agente abre Settings y busca Component collections.\nCrea una colección con un topic de saludo.\nAnota qué agentes de tu entorno podrían reutilizarla.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-export-import-copilot-components"
 },
 {
  "id": "L07",
  "skills": [
   "1.1g"
  ],
  "title": "Audiencia interna y externa",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Interno no es externo",
    "body": "Con Authenticate with Microsoft el usuario siempre inicia sesión y la opción Share controla quién de la organización puede chatear. Con No authentication, cualquiera con el enlace habla con el agente. Require secured access exige un secreto o token.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Audiencia</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Empleados</span><span style=\"text-align:right\">Authenticate with Microsoft + Share</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Público anónimo</span><span style=\"text-align:right\">No authentication (con cuidado)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Sitio web propio</span><span style=\"text-align:right\">Require secured access</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "La intranet de Contoso usa Authenticate with Microsoft. Su sitio web público usa Require secured access: el secreto no puede vivir en el navegador, así que tu propio servicio lo intercambia por un token y se lo entrega a la página.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Navegador</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Servidor</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Contoso</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Token</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">El secreto nunca llega al navegador</text></svg>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden proteger un agente embebido en un sitio propio: Require secured access con token generado en servidor. La trampa: poner el secreto en el código del navegador, donde cualquiera lo lee."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Microsoft: login obligatorio + Share. Sin autenticación: abierto. Secured access: secreto o token, nunca en el cliente."
   }
  ],
  "narration": "Un agente interno y uno externo se protegen distinto. Si usas Authenticate with Microsoft, el usuario siempre inicia sesión, y la opción Share controla qué personas de la organización pueden chatear. Con No authentication, cualquiera que tenga el enlace puede hablar con el agente: útil para información pública, peligroso para datos internos. Y existe una tercera capa, Require secured access, donde los canales exigen que el cliente se autentique con un secreto o con un token generado con ese secreto. Aquí está el detalle que importa: si el código corre en el navegador, el secreto no debe exponerse. Tu propio servicio lo intercambia por un token y entrega solo el token a la página. Piensa en Contoso: la intranet usa autenticación Microsoft; el sitio público de clientes usa acceso seguro con token generado en servidor. En el examen, si ves un secreto escrito en el código de la página, esa es la respuesta incorrecta.",
  "reto": {
   "text": "Abre Settings, Security y revisa Web channel security.\nActiva Require secured access y observa qué secretos se generan.\nDibuja quién emitiría el token en una página web de Contoso.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security"
 },
 {
  "id": "L08",
  "skills": [
   "1.3i"
  ],
  "title": "Variables y alcance",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Cuatro alcances",
    "body": "Topic variables viven solo en su topic. Global variables (prefijo Global.) sirven en todos los topics. System variables las crea Copilot Studio, como System.Activity.Text. Environment variables (prefijo Env.) se crean en soluciones.",
    "visual": "<svg viewBox=\"0 0 340 150\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"4\" width=\"160\" height=\"56\" rx=\"6\"/><text x=\"82\" y=\"29\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topic</text><text x=\"82\" y=\"43\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">solo este topic</text><rect x=\"178\" y=\"4\" width=\"160\" height=\"56\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"258\" y=\"29\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Global.</text><text x=\"258\" y=\"43\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">todos los topics</text><rect x=\"2\" y=\"80\" width=\"160\" height=\"56\" rx=\"6\" style=\"stroke:var(--muted)\" stroke-dasharray=\"4 3\"/><text x=\"82\" y=\"105\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">System.</text><text x=\"82\" y=\"119\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">las crea Copilot Studio</text><rect x=\"178\" y=\"80\" width=\"160\" height=\"56\" rx=\"6\"/><text x=\"258\" y=\"105\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Env.</text><text x=\"258\" y=\"119\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">por entorno, en soluciones</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Guardas el número de empleado en Global.EmpleadoId para no volver a preguntarlo en cada topic. Una variable toma su tipo con la primera asignación: si empieza como Number, asignarle un String da error. Tipos: String, Boolean, Number, Table, Record, DateTime.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Variables de Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Global.EmpleadoId</span><span style=\"text-align:right\">String, todos los topics</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">System.Activity.Text</span><span style=\"text-align:right\">lo último que escribió el usuario</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Env.ApiBaseUrl</span><span style=\"text-align:right\">valor por entorno</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden usar un dato en varios topics: cambiar el scope a global. Trampa: asignar texto a una variable que ya es Number; el tipo queda fijo y falla."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Global. para todos los topics, System. de la plataforma, Env. por entorno. El tipo se fija en la primera asignación."
   }
  ],
  "narration": "Las variables son la memoria del agente, y el examen pregunta mucho por su alcance. Hay cuatro. Las topic variables solo existen dentro del topic donde se crean. Si cambias su scope a global, se pueden usar en todos los topics y llevan el prefijo Global. Las system variables las crea Copilot Studio, por ejemplo System punto Activity punto Text con lo último que escribió el usuario. Y las environment variables se crean en soluciones y llevan el prefijo Env. Piensa en Contoso: guardas el número de empleado en una variable global para no volver a preguntarlo en cada topic. Otro detalle: una variable toma su tipo cuando le asignas un valor por primera vez. Si empieza como Number, asignarle un String produce un error. Los tipos incluyen String, Boolean, Number, Table, Record y DateTime. En el examen, si piden compartir un dato entre topics, la respuesta es cambiar el scope a global.",
  "reto": {
   "text": "Crea un topic que pregunte el nombre y lo guarde en una variable.\nCambia su scope a global y léela en otro topic.\nIntenta asignarle un tipo distinto y observa el error.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about"
 },
 {
  "id": "L09",
  "skills": [
   "1.3b"
  ],
  "title": "Respuestas con formato",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Sugerir no es obligar",
    "body": "Los quick replies sugieren respuestas, pero el usuario puede ignorarlos y escribir libre. Para obligar a elegir de una lista usas un Question de tipo multiple choice. Las message variations solo eligen una redacción al azar.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Después de una herramienta (After running)</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Send specific response</span><span style=\"text-align:right\">plantilla + variables</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Don't respond</span><span style=\"text-align:right\">el agente redacta</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Tras consultar un ticket, Contoso usa Send specific response: una plantilla con las variables de salida, incluso fórmulas Power Fx, sin que el modelo la reescriba. Con Don't respond, en cambio, el agente incorpora la salida en su propia respuesta.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Chat</div><div style=\"padding:2px 0\">Usuario: ¿Cuál es el estado de mi ticket?</div><div style=\"padding:2px 0\">Agente: Ticket 4821, estado En curso.</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Quién redactó</span><span style=\"text-align:right\">tu plantilla, no el modelo</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden una respuesta exacta y controlada tras una herramienta: Send specific response. Trampa: usar quick replies para restringir opciones; no restringen, solo sugieren."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Quick replies sugieren. Multiple choice obliga. Send specific response = texto fijo con variables, sin modelo."
   }
  ],
  "narration": "Dar formato a las respuestas es decidir quién controla lo que el usuario lee. Los quick replies, o respuestas rápidas, solo sugieren: el cliente puede ignorarlos y escribir libremente. Si necesitas que el usuario elija de una lista, usas un nodo Question de tipo multiple choice. Las message variations simplemente alternan al azar entre varias redacciones de un mismo mensaje. Cuando una herramienta devuelve datos, tienes dos opciones en After running. Send specific response te deja redactar una respuesta con plantilla y variables de salida, incluso con fórmulas de Power Fx, sin intervención del modelo. Don't respond deja que el agente incorpore la salida en su propia respuesta. Piensa en Contoso: después de consultar el estado de un ticket, quieren un texto exacto con el número y el estado, así que usan Send specific response. En el examen, la trampa clásica es creer que los quick replies restringen lo que el usuario puede escribir. No lo hacen.",
  "reto": {
   "text": "Crea un topic con un Question multiple choice de tres opciones.\nAgrega una herramienta y prueba After running en las dos opciones.\nCompara cómo cambia la respuesta en el test chat.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-send-message"
 },
 {
  "id": "L10",
  "skills": [
   "1.3g"
  ],
  "title": "Generative answers node",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Responder desde tus fuentes",
    "body": "El Generative answers node busca en tus fuentes y redacta la respuesta. Con Search only selected sources desactivado (por defecto) busca en todas las fuentes del agente. Activado, usa solo las que elijas y reemplazan a las del agente.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Pregunta</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Generative</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">answers</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Fuentes</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Respuesta</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Opción: guardar en variable</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "En el topic de políticas de RR. HH., Contoso activa Search only selected sources y elige solo el SharePoint de políticas. Quita Send a message y muestra la respuesta en una Adaptive Card: entonces debe incluir las citas en su propio renderizado.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Properties del Generative answers node</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Search only selected sources</span><span style=\"text-align:right\">On</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fuente elegida</span><span style=\"text-align:right\">SharePoint de políticas RR. HH.</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Send a message</span><span style=\"text-align:right\">Quitado: tú añades las citas</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden que un topic responda solo con ciertas fuentes: Search only selected sources. Trampa: pensar que hace fallback a las fuentes del agente. No lo hace; las seleccionadas reemplazan."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Por defecto busca en todo. Fuentes seleccionadas reemplazan, sin fallback. Sin Send a message, las citas en Teams no son automáticas."
   }
  ],
  "narration": "El Generative answers node es el nodo que busca en tus fuentes de conocimiento y redacta una respuesta. Tiene un ajuste decisivo: Search only selected sources. Desactivado, que es el valor por defecto, el nodo busca en todas las fuentes del agente. Activado, usa solo las fuentes que selecciones, y esas reemplazan a las del agente en ese nodo, sin fallback a las demás. Además puedes elegir si el nodo envía el mensaje al usuario o guarda la respuesta en una variable. Piensa en Contoso: en el topic de políticas de recursos humanos, seleccionan solo el sitio de SharePoint de políticas. Si borras el mensaje automático y muestras la respuesta en una Adaptive Card, Copilot Studio ya no añade las citas en Teams: tienes que incluirlas tú. En el examen, la trampa es creer que, al seleccionar fuentes, el nodo sigue buscando en las demás si no encuentra nada. No lo hace.",
  "reto": {
   "text": "Añade un Generative answers node a un topic.\nActiva Search only selected sources y elige una sola fuente.\nPregunta algo que solo otra fuente conoce y observa la respuesta.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node"
 },
 {
  "id": "L11",
  "skills": [
   "1.3e"
  ],
  "title": "Custom data y fuentes propias",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Tus datos, tu tabla",
    "body": "En el campo Custom data (en Classic data) del Generative answers node pasas una tabla con Content (obligatorio), ContentLocation (URL de la cita) y Title. Solo se usan los tres primeros registros, así que ordena y filtra antes.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Tabla para Custom data</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Content</span><span style=\"text-align:right\">texto del artículo (obligatorio)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">ContentLocation</span><span style=\"text-align:right\">URL de la cita</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Title</span><span style=\"text-align:right\">título</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Registros usados</span><span style=\"text-align:right\">solo los 3 primeros</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Un flow devuelve los artículos de la base de incidentes ya filtrados. Contoso los pasa a Custom data, activa Search only selected sources sin elegir ninguna fuente, y el nodo responde solo con esos datos.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Flow de</text><text x=\"35.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">incidentes</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Tabla</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">3 filas</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Custom</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">data</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Respuesta</text><text x=\"302.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">con cita</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Content, ContentLocation, Title</text></svg>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden responder únicamente con datos que tú calculas: tabla en Custom data y Search only selected sources sin fuentes. Trampa: enviar cientos de filas esperando que las use; solo cuentan las tres primeras."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Custom data = tabla: Content, ContentLocation, Title. Máximo tres registros usados. Content es el único obligatorio."
   }
  ],
  "narration": "A veces las fuentes de conocimiento del agente no bastan, y quieres dar tú mismo los datos al modelo. Para eso, el Generative answers node tiene el campo Custom data, en la sección Classic data. Ahí pasas una tabla con tres columnas: Content, que es obligatoria, ContentLocation, con la dirección de la cita, y Title. Hay una limitación importante: solo se usan los tres primeros registros para generar la respuesta, así que conviene ordenar y filtrar la tabla antes de pasarla. Para que el nodo responda solo con tus datos, pasas la tabla, activas Search only selected sources y no seleccionas ninguna fuente. Piensa en Contoso: un flow consulta la base de incidentes, devuelve los artículos más relevantes, ya ordenados y filtrados, y el nodo responde solo con ellos y cita su ubicación. En el examen, la trampa es mandar muchas filas esperando que el modelo las use todas: solo cuentan tres.",
  "reto": {
   "text": "Crea un topic con una variable tipo Table con dos filas de ejemplo.\nPásala a Custom data en un Generative answers node.\nActiva Search only selected sources sin fuentes y prueba.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-custom-data"
 },
 {
  "id": "L12",
  "skills": [
   "1.3h"
  ],
  "title": "Adaptive Cards",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Formularios dentro del chat",
    "body": "El nodo Ask with adaptive card muestra una card interactiva, exige al menos un botón submit y crea variables de salida a partir de los inputs (editables con Edit Schema). Message y Question no sirven para esto.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px\"><div style=\"font-weight:600\">Nuevo ticket</div><div style=\"border:1px solid var(--muted);border-radius:6px;padding:3px 8px;margin:6px 0;color:var(--muted)\">Título</div><div style=\"border:1px solid var(--muted);border-radius:6px;padding:3px 8px;margin:6px 0;color:var(--muted)\">Urgencia: Alta</div><div style=\"display:inline-block;border:1px solid var(--accent);color:var(--accent);border-radius:6px;padding:3px 12px\">Submit</div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "El formulario de ticket de Contoso pide título y urgencia. Al enviarlo, Copilot Studio crea una variable por cada input. Cuidado con las versiones: se admite el schema 1.6 y anteriores, pero Web Chat no soporta Action.Execute, y Teams y el live chat widget llegan hasta 1.5.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Qué versión de card se ve dónde</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Web Chat</span><span style=\"text-align:right\">1.6, sin Action.Execute</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Teams</span><span style=\"text-align:right\">1.5</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Live chat widget</span><span style=\"text-align:right\">1.5</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden recoger varios campos de una vez con botones: Ask with adaptive card. Trampa: diseñar con 1.6 y asumir que se ve igual en Teams; allí el límite es 1.5."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Mínimo un botón submit. Variables automáticas desde inputs. Teams y live chat: schema 1.5; Web Chat: 1.6 sin Action.Execute."
   }
  ],
  "narration": "Las Adaptive Cards te dejan mostrar formularios y botones dentro de la conversación. En Copilot Studio se usa el nodo Ask with adaptive card, que muestra la card interactiva, exige al menos un botón submit y crea de forma automática variables de salida a partir de los inputs de la card; puedes ajustarlas con Edit Schema. Los nodos Message y Question no sirven para cards interactivas. Piensa en Contoso: un formulario de nuevo ticket con título y urgencia, y un botón de envío. Al enviarlo, obtienes una variable por cada campo. El detalle del examen son las versiones. Copilot Studio admite schemas de la versión uno punto seis y anteriores, pero depende del host: Web Chat soporta la uno punto seis pero no Action punto Execute, y tanto el live chat widget como Teams se limitan a la uno punto cinco. La trampa típica es diseñar con la versión más nueva y asumir que se verá igual en Teams.",
  "reto": {
   "text": "Crea un nodo Ask with adaptive card con dos inputs y un submit.\nRevisa en Edit Schema las variables que se generan.\nPruébalo en el test chat y usa una de las variables en un Message.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-ask-with-adaptive-card"
 },
 {
  "id": "L13",
  "skills": [
   "1.3d"
  ],
  "title": "Prompts personalizados",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Una tarea, un turno",
    "body": "Un prompt es una herramienta de un solo turno basada en un modelo: tiene instrucciones, entradas y, si quieres, conocimiento. Se agrega como herramienta del agente o como nodo dentro de un topic.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Texto del</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">ticket</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Prompt</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(modelo)</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Salida</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">categoría</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Instrucciones + entradas = un resultado</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso crea un prompt que recibe el texto de un ticket y devuelve su categoría y urgencia. La temperatura va de 0 a 1 (0 por defecto): 0 da respuestas predecibles. En el modelo GPT-5 reasoning no está disponible y el slider se deshabilita.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Prompt: clasificar ticket</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instrucciones</span><span style=\"text-align:right\">Devuelve categoría y urgencia</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Entrada</span><span style=\"text-align:right\">Texto del ticket</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Temperatura</span><span style=\"text-align:right\">0</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden una clasificación consistente: instrucciones claras y temperatura baja. Trampa: buscar el control de temperatura con un modelo GPT-5 reasoning; está deshabilitado."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Prompt = una sola vuelta. Temperatura 0 a 1, por defecto 0. Se configura en los ajustes del prompt."
   }
  ],
  "narration": "Un prompt personalizado es una herramienta de un solo turno basada en un modelo de lenguaje. Le das instrucciones, entradas y, si quieres, conocimiento, y devuelve un resultado. Lo puedes agregar como herramienta del agente, desde Tools, New tool, Prompt, o como nodo dentro de un topic. Es ideal para tareas acotadas: clasificar, extraer datos, resumir. Piensa en Contoso: un prompt recibe el texto de un ticket y devuelve la categoría y la urgencia. Para que sea consistente, escribes instrucciones claras y usas temperatura baja. La temperatura va de cero a uno, con cero por defecto, y controla el equilibrio entre respuestas predecibles y creativas. Se configura en los ajustes del prompt. Hay una excepción que cae en el examen: con el modelo GPT cinco reasoning, la temperatura no está disponible y el control aparece deshabilitado. Y recuerda: un prompt no conversa, hace una sola tarea y devuelve el resultado.",
  "reto": {
   "text": "Crea un prompt de clasificación de tickets con tres categorías.\nPrueba con cinco textos distintos y con temperatura cero.\nAgrégalo como herramienta del agente y llámalo desde el chat.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-prompt-node"
 },
 {
  "id": "L14",
  "skills": [
   "1.3f"
  ],
  "title": "Send HTTP request",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Llama a cualquier API desde un topic",
    "body": "Send HTTP request pide URL, método, headers y body, y define el tipo de respuesta a partir de un JSON de ejemplo. Si falla, por defecto usa Raise an error: se detiene y se dispara el system topic On Error.",
    "visual": "<svg viewBox=\"0 0 340 110\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"30\" width=\"90\" height=\"46\" rx=\"6\"/><text x=\"47\" y=\"57\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topic</text><rect x=\"125\" y=\"30\" width=\"100\" height=\"46\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"175\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Send HTTP</text><text x=\"175\" y=\"64\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">request</text><line x1=\"94\" y1=\"53\" x2=\"123\" y2=\"53\"/><polygon points=\"123,53 116.6,50.3 116.6,55.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"255\" y=\"4\" width=\"83\" height=\"36\" rx=\"6\"/><text x=\"296.5\" y=\"19\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Respuesta</text><text x=\"296.5\" y=\"33\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">ok</text><rect x=\"255\" y=\"68\" width=\"83\" height=\"36\" rx=\"6\" style=\"stroke:var(--muted)\" stroke-dasharray=\"4 3\"/><text x=\"296.5\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">On Error</text><line x1=\"227\" y1=\"45\" x2=\"253\" y2=\"24\"/><polygon points=\"253,24 246.3,25.9 249.7,30.2\" fill=\"currentColor\" stroke=\"none\"/><line x1=\"227\" y1=\"61\" x2=\"253\" y2=\"84\" style=\"stroke:var(--muted)\"/><polygon points=\"253,84 250.0,77.7 246.4,81.8\" fill=\"currentColor\" stroke=\"none\"/></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso hace un GET a una API de tickets: Body queda en No Content. Con Continue on error, el código de estado y el cuerpo del error se guardan en variables, y el tipo Any se convierte con Parse value. Para un POST, el JSON content puede ser un objeto Power Fx con variables.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Send HTTP request</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Method</span><span style=\"text-align:right\">GET</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Body</span><span style=\"text-align:right\">No Content</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Error handling</span><span style=\"text-align:right\">Continue on error</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Se guarda</span><span style=\"text-align:right\">status code y error body</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden manejar el error sin cortar el topic: Continue on error. Trampa: dejar el valor por defecto y no entender por qué se dispara On Error."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Por defecto: Raise an error y On Error. Continue on error guarda status y error body. Body por defecto: No Content."
   }
  ],
  "narration": "El nodo Send HTTP request te permite llamar a cualquier servicio web desde un topic. Configuras la dirección, el método, los headers y el cuerpo, y defines el tipo de la respuesta a partir de un JSON de ejemplo. Lo más preguntado es el manejo de errores. Por defecto el nodo usa Raise an error: se detiene la operación y se dispara el system topic On Error. Si eliges Continue on error, el código de estado y el cuerpo del error se guardan en variables, y el topic continúa. El cuerpo del error es de tipo Any, y lo puedes convertir con Parse value. Piensa en Contoso: consultan la a pe i de tickets con un GET, así que el body queda en No Content, que es el valor por defecto. Para un POST, en JSON Content puedes escribir un objeto JSON o una fórmula de Power Fx que referencia variables. En el examen, si piden que el topic no se corte ante un error, la respuesta es Continue on error.",
  "reto": {
   "text": "Agrega un Send HTTP request con un GET a una API pública de prueba.\nDefine la respuesta con un JSON de ejemplo.\nCambia a Continue on error y provoca un fallo con una URL mala.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node"
 },
 {
  "id": "L15",
  "skills": [
   "1.3c"
  ],
  "title": "Herramientas dentro de un topic",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Quién decide cuándo se llama",
    "body": "En classic orchestration una herramienta solo se llama de forma explícita desde un topic. Con generative orchestration, el orquestador la elige solo, usando su nombre y su descripción. Las trigger phrases únicamente seleccionan topics.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Orquestación</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Classic</span><span style=\"text-align:right\">tú llamas la tool desde un topic</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Generative</span><span style=\"text-align:right\">el agente elige por descripción</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "La herramienta Consultar inventario de Contoso tiene Ask the end user before running (No por defecto) activado: el agente pide confirmación antes de ejecutarla. Authentication define con qué credenciales corre y After running controla cómo responde después.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Tool: Consultar inventario</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Ask the end user before running</span><span style=\"text-align:right\">Yes</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">define las credenciales</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">After running</span><span style=\"text-align:right\">define cómo responde</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden confirmación del usuario antes de una acción sensible: Ask the end user before running. Trampa: confiar en las trigger phrases para elegir tools; solo eligen topics."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Classic = llamada explícita. Generative = por nombre y descripción. Ask the end user before running = confirmación. Authentication = credenciales."
   }
  ],
  "narration": "Las herramientas, o tools, pueden usarse de dos maneras según el modo de orquestación. Con classic orchestration, una herramienta solo se llama de forma explícita desde un topic. Con generative orchestration, el orquestador la elige dinámicamente, leyendo su nombre y su descripción, por eso esas descripciones importan tanto. Las trigger phrases, en cambio, solo seleccionan topics, no herramientas. Cada herramienta tiene ajustes propios. Ask the end user before running, que por defecto está en No, hace que el agente pida confirmación al usuario antes de ejecutarla. Authentication define con qué credenciales se ejecuta, y After running controla cómo responde el agente después. Piensa en Contoso: la herramienta que consulta el inventario puede ejecutarse sin preguntar, pero la que crea un pedido de compra debería pedir confirmación porque tiene consecuencias reales. Por eso conviene revisar herramienta por herramienta. En el examen recuerda que las trigger phrases no eligen herramientas, solo topics, y que la confirmación del usuario es un ajuste de cada herramienta.",
  "reto": {
   "text": "Agrega una herramienta a un agente y abre sus ajustes.\nActiva Ask the end user before running y pruébala en el chat.\nReescribe su descripción y observa si el agente la elige distinto.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
 },
 {
  "id": "L16",
  "skills": [
   "1.3a"
  ],
  "title": "Agent flows dentro de un topic",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Flow de topic o flow del agente",
    "body": "Un flow agregado dentro de un topic solo está disponible para ese topic y se ejecuta en el punto del canvas donde lo pones, como un nodo Action. Un agent-level tool queda disponible para que el orquestador lo elija.",
    "visual": "<svg viewBox=\"0 0 340 120\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"6\" width=\"160\" height=\"44\" rx=\"6\"/><text x=\"82\" y=\"32\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topic Reportar problema</text><rect x=\"178\" y=\"6\" width=\"160\" height=\"44\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"258\" y=\"32\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente (orquestador)</text><rect x=\"2\" y=\"76\" width=\"160\" height=\"38\" rx=\"6\" style=\"stroke:var(--muted)\" stroke-dasharray=\"4 3\"/><text x=\"82\" y=\"92\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Flow CrearTicket</text><text x=\"82\" y=\"106\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">solo aquí</text><rect x=\"178\" y=\"76\" width=\"160\" height=\"38\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"258\" y=\"92\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Flow CrearTicket</text><text x=\"258\" y=\"106\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">a elección</text><line x1=\"82\" y1=\"52\" x2=\"82\" y2=\"74\" style=\"stroke:var(--muted)\"/><polygon points=\"82,74 84.7,67.6 79.3,67.6\" fill=\"currentColor\" stroke=\"none\"/><line x1=\"258\" y1=\"52\" x2=\"258\" y2=\"74\" style=\"stroke:var(--accent)\"/><polygon points=\"258,74 260.7,67.6 255.3,67.6\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "El flow CrearTicket va dentro del topic Reportar problema: se ejecuta justo después de recoger los datos. Si lo agregas como tool del agente y desactivas Allow agent to decide dynamically, solo se usa cuando un topic lo llama.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Topic: Reportar problema</div><div style=\"padding:2px 0\">Question: título</div><div style=\"padding:2px 0\">Question: urgencia</div><div style=\"padding:2px 0\">Action: CrearTicket (agent flow)</div><div style=\"padding:2px 0\">Message: número de ticket</div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden que un flow solo se ejecute en un punto exacto de la conversación: agregarlo al topic. Trampa: creer que Ask the end user before running impide la elección automática; solo pide confirmación."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Flow en topic = disponible solo ahí. Allow agent to decide dynamically apagado = solo llamada explícita."
   }
  ],
  "narration": "Cuando integras un agent flow, tienes que decidir dónde vive. Si lo agregas dentro de un topic, solo está disponible para ese topic y se ejecuta en el punto exacto del canvas donde lo coloques; aparece como un nodo Action. En cambio, un tool a nivel de agente queda disponible para que el orquestador decida cuándo llamarlo. Hay un ajuste clave: Allow agent to decide dynamically. Si lo desactivas, el agente solo usa la herramienta cuando se la llama de forma explícita desde un topic. Ojo con Ask the end user before running: solo pide confirmación, pero el orquestador aún puede elegir la herramienta por su cuenta. Piensa en Contoso: el flow que crea tickets va dentro del topic de reportar problemas, justo después de recoger los datos, con el título y la urgencia ya listos. En el examen, si dicen que debe ejecutarse solo en cierto punto del diálogo, la respuesta es dentro del topic.",
  "reto": {
   "text": "Crea un agent flow sencillo desde el Tools del agente.\nAgrégalo a un topic mediante un nodo Action.\nDesactiva Allow agent to decide dynamically y compara el comportamiento.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent"
 },
 {
  "id": "L17",
  "skills": [
   "1.2a",
   "1.2e"
  ],
  "title": "Crear un agent flow y sus parámetros",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Trigger, acciones, respuesta",
    "body": "Para que un flow sea una herramienta del agente necesita el trigger When an agent calls the flow y una acción Respond to the agent. Debe estar publicado y responder en tiempo real, dentro del límite de 100 segundos.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">When an agent</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">calls the flow</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\" style=\"stroke:var(--accent)\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"169.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Acciones</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\" style=\"stroke:var(--accent)\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Respond to</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">the agent</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Entradas arriba, salidas abajo</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "CrearTicket recibe título y urgencia como entradas y devuelve el ticketId como salida. Con generative orchestration, el agente rellena las entradas desde el contexto o hace las preguntas; si pones un Custom value, ya no pregunta. Las variables internas del flow no llegan al agente.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Agent flow: CrearTicket</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Entradas</span><span style=\"text-align:right\">titulo, urgencia</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Salida</span><span style=\"text-align:right\">ticketId</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Asynchronous response</span><span style=\"text-align:right\">Off</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden por qué un flow no aparece como tool: falta el trigger o Respond to the agent, no está publicado, o Asynchronous response sigue activo (Networking). Trampa: olvidar que solo las salidas explícitas llegan al agente."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Trigger + Respond to the agent. Publicado. Asynchronous response en Off. Máximo 100 segundos."
   }
  ],
  "narration": "Un agent flow es un flujo creado dentro de Copilot Studio para que el agente lo use como herramienta. Para que aparezca como tool necesita dos piezas: el trigger When an agent calls the flow y la acción Respond to the agent, que devuelve los valores de salida. Además debe estar publicado, responder en tiempo real, con Asynchronous response desactivado en Networking, y contestar dentro del límite de cien segundos. Los parámetros son el contrato: las entradas llegan al trigger y las salidas se definen en Respond to the agent. Con generative orchestration, el agente rellena las entradas desde el contexto o genera preguntas para pedirlas, así que no necesitas un nodo Question por cada una. Si sobrescribes una entrada con Custom value, ya no vuelve a preguntar. Las variables internas del flow no llegan al agente. Piensa en Contoso: CrearTicket recibe título y urgencia, y devuelve el identificador del ticket. En el examen, si el flow no aparece, revisa trigger, respuesta, publicación y modo asíncrono.",
  "reto": {
   "text": "Crea un agent flow con trigger When an agent calls the flow.\nAgrega dos entradas y una salida en Respond to the agent.\nPublícalo y llámalo desde el chat del agente.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-agent"
 },
 {
  "id": "L18",
  "skills": [
   "1.2c"
  ],
  "title": "Acciones, conectores y express mode",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "El catálogo de acciones",
    "body": "Las acciones de un agent flow se agrupan en AI capabilities (generar texto, procesar documentos, run a prompt, llamar a un agente, responder al agente), Human in the loop y Built-in tools (bucles, condiciones, datos), además de conectores.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Grupos de acciones</div><div style=\"padding:2px 0\">AI capabilities</div><div style=\"padding:2px 0\">Human in the loop</div><div style=\"padding:2px 0\">Built-in tools</div><div style=\"padding:2px 0\">Conectores</div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "CrearTicket usa un conector de Dataverse para insertar la fila y un Run a prompt para resumir el texto. Con express mode (preview), un flow con mucho procesamiento y poco volumen de datos termina dentro de la ventana de dos minutos.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Dataverse</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Add a row</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Run a</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">prompt</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Respond to</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">the agent</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Conector + IA + respuesta</text></svg>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden cuándo usar express mode: flows rápidos con trigger When an agent calls a flow y Respond to the agent, con un plan de Copilot Studio. Trampa: usarlo para procesos largos; esos son asíncronos."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Express mode (preview): mucho proceso, poco dato, ventana de dos minutos. Requiere trigger del agente, respuesta al agente y plan de Copilot Studio."
   }
  ],
  "narration": "Dentro de un agent flow dispones de un catálogo de acciones organizado en grupos. AI capabilities incluye generar texto, procesar documentos, ejecutar un prompt, llamar a otro agente y responder al agente. Human in the loop agrupa aprobaciones y solicitudes de información. Built-in tools reúne bucles, condiciones y operaciones de datos. Y por supuesto están los conectores, para hablar con Dataverse, SharePoint, Outlook y muchos más. Piensa en Contoso: el flow que crea tickets usa un conector de Dataverse para insertar la fila y un Run a prompt para resumir el texto del problema. Existe también el express mode, en preview, que acelera flows con mucho procesamiento y poco volumen de datos para que terminen dentro de la ventana de dos minutos. Requiere el trigger When an agent calls a flow, una acción Respond to the agent y un plan de Copilot Studio. En el examen, no lo uses para procesos largos: esos deben ser asíncronos.",
  "reto": {
   "text": "Abre un agent flow y revisa los grupos de acciones.\nAgrega una acción de un conector y un Run a prompt.\nObserva si tu flow cumple los requisitos de express mode.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-flow-express-mode"
 },
 {
  "id": "L19",
  "skills": [
   "1.2f"
  ],
  "title": "Manejo de errores en flows",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Try, Catch, Terminate",
    "body": "Agrupa acciones en scopes para el patrón try-catch. El scope Catch se ejecuta cuando el Try falla: usa run after con has failed y has timed out. Con result() y Filter array obtienes el error.",
    "visual": "<svg viewBox=\"0 0 340 110\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"20\" width=\"100\" height=\"52\" rx=\"6\"/><text x=\"52\" y=\"43\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Scope Try</text><text x=\"52\" y=\"57\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">acciones</text><rect x=\"120\" y=\"20\" width=\"100\" height=\"52\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"170\" y=\"36\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Scope Catch</text><text x=\"170\" y=\"50\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">run after: failed</text><text x=\"170\" y=\"64\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">o timed out</text><rect x=\"238\" y=\"20\" width=\"100\" height=\"52\" rx=\"6\"/><text x=\"288\" y=\"43\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Terminate</text><text x=\"288\" y=\"57\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">estado Failed</text><line x1=\"104\" y1=\"46\" x2=\"118\" y2=\"46\" style=\"stroke:var(--accent)\"/><polygon points=\"118,46 111.6,43.3 111.6,48.7\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><line x1=\"222\" y1=\"46\" x2=\"236\" y2=\"46\"/><polygon points=\"236,46 229.6,43.3 229.6,48.7\" fill=\"currentColor\" stroke=\"none\"/><text x=\"170\" y=\"100\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Catch lee result() del Try</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Si CrearTicket falla al insertar en Dataverse, Catch registra el error y avisa a TI. Para fallos transitorios usa un retry policy; los exponenciales se prefieren porque van aumentando el intervalo entre reintentos.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Agent flow con errores</div><div style=\"padding:2px 0\">Scope Try: insertar fila en Dataverse</div><div style=\"padding:2px 0\">Scope Catch (run after: has failed, has timed out)</div><div style=\"padding:2px 0\">Filter array sobre result() del Try</div><div style=\"padding:2px 0\">Terminate: Failed</div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden registrar el error de un grupo de acciones: scope Catch con run after failed y timed out, result() y Filter array. Trampa: configurar run after \"is successful\", que solo corre si todo salió bien."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Catch se configura con run after respecto al Try. Retry exponencial para fallos transitorios. Terminate Failed deja estado y mensaje."
   }
  ],
  "narration": "El manejo de errores en flows se hace con un patrón sencillo: try, catch, terminate. Agrupas las acciones en un scope llamado Try, y creas otro scope, Catch, que se ejecuta cuando el primero falla. Para eso configuras el run after del Catch con las opciones has failed y has timed out respecto al Try. Dentro del Catch, la expresión result devuelve los resultados de las acciones del scope, y con Filter array te quedas con la que falló, para registrarla o notificarla. Si quieres cortar el flow y dejar constancia, usas Terminate con estado Failed y un mensaje. Para fallos transitorios, como un servicio saturado, configuras un retry policy en los ajustes de la acción; los exponenciales se prefieren porque aumentan el intervalo entre reintentos. Piensa en Contoso: si falla la inserción del ticket, el Catch avisa al equipo de TI. Trampa del examen: is successful solo ejecuta cuando todo salió bien.",
  "reto": {
   "text": "Crea un flow con un scope Try que falle a propósito.\nAgrega un scope Catch con run after has failed.\nUsa result() y Filter array para leer el error y termina con Failed.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/power-automate/guidance/coding-guidelines/error-handling"
 },
 {
  "id": "L20",
  "skills": [
   "1.2b"
  ],
  "title": "Human-in-the-loop",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Personas dentro del flujo",
    "body": "Run a multistage approval (preview) combina etapas manuales (First to respond o Everyone must approve), etapas de IA con Approve o Reject más una justificación, y conditions entre etapas que enrutan, aprueban, rechazan u omiten.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Etapa IA</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Condition</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Etapa</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">manual</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Decisión</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Etapas manuales y de IA en secuencia</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Una compra de laptops pasa por una etapa de IA y luego una manual de gerencia. No se puede asignar el mismo aprobador a varias etapas manuales. Si solo necesitas datos, Request for information pausa el flow, pregunta por Outlook y gana la primera respuesta.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Compra de laptops</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Etapa 1, IA</span><span style=\"text-align:right\">revisa el presupuesto</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Condition</span><span style=\"text-align:right\">si Reject, rechazar</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Etapa 2, manual</span><span style=\"text-align:right\">gerencia, First to respond</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden aprobación en etapas con IA y humanos: multistage approval. Piden recoger un dato: Request for information. Trampa: pensar que advanced approvals tienen soporte ALM; hay que recrearlas tras importar."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Multistage approval (preview): manual + IA + conditions. Request for information: Outlook, mismo tenant, gana la primera respuesta."
   }
  ],
  "narration": "Human in the loop significa meter personas dentro de un flujo automático. Copilot Studio ofrece dos acciones en el conector Human review. La primera es Run a multistage approval, en preview, que combina etapas manuales, con las opciones First to respond o Everyone must approve, y etapas de inteligencia artificial, que reciben instrucciones y devuelven Approve o Reject con una justificación. Entre las etapas puedes poner conditions para enrutar, aprobar, rechazar u omitir. No puedes asignar el mismo aprobador a varias etapas manuales, y las advanced approvals no tienen soporte de ALM: hay que recrearlas tras importar. La segunda es Request for information, que pausa el flow y pide datos a una persona por Outlook, dentro del mismo tenant; gana la primera respuesta. Piensa en Contoso: una compra de laptops pasa por una etapa de IA y luego por una etapa manual de gerencia. En el examen, elige cada acción según necesites decisión o solo datos.",
  "reto": {
   "text": "Crea un flow con Run a multistage approval de dos etapas.\nAgrega una condition entre las etapas.\nPrueba también un Request for information con un campo de texto.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-advanced-approvals"
 },
 {
  "id": "L21",
  "skills": [
   "1.2d"
  ],
  "title": "Monitorear agent flows y su costo",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Dónde mirar",
    "body": "La pestaña Activity muestra el historial de ejecuciones con estado y duración, deja entrar al detalle y reenviar o cancelar varias ejecuciones. Overview solo muestra los datos del flow y las ejecuciones recientes.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Pestañas de un agent flow</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Overview</span><span style=\"text-align:right\">nombre, conexiones, dueños</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Activity</span><span style=\"text-align:right\">historial, reenviar, cancelar</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Analytics</span><span style=\"text-align:right\">resumen de métricas</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso revisa en Activity por qué falló CrearTicket y reenvía las ejecuciones fallidas. Cada acción consume capacidad: 13 Copilot Credits por cada 100 acciones. Las pruebas en el diseñador o en el test chat no consumen capacidad.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Activity de CrearTicket</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Ejecución 1</span><span style=\"text-align:right\">Succeeded</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Ejecución 2</span><span style=\"text-align:right\">Failed</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Acción</span><span style=\"text-align:right\">Resubmit</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden qué pasa al agotarse la capacidad prepagada: las nuevas ejecuciones se bloquean, las que corren terminan y el agente sigue respondiendo en otras interacciones. Trampa: pensar que el agente deja de funcionar."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Activity = historial y reenvío. 13 credits por 100 acciones. Test runs no consumen capacidad."
   }
  ],
  "narration": "Cuando un agent flow ya está en producción, necesitas monitorearlo. En la página del flow tienes tres pestañas. Overview muestra los detalles del flow, como nombre, conexiones y propietarios, junto con las ejecuciones más recientes. Analytics resume métricas. Y Activity es la importante: muestra el historial de ejecuciones con su estado y duración, te deja entrar al detalle de cada una y permite reenviar o cancelar varias ejecuciones a la vez. También hay que vigilar el costo. Los agent flows se facturan en Copilot Credits: trece credits por cada cien acciones. Las ejecuciones de prueba, ya sea en el diseñador o en el test chat, no consumen capacidad. Piensa en Contoso: usan Activity para ver por qué falló el flow que crea tickets y reenvían las ejecuciones fallidas. Y una pregunta típica del examen: si se agota la capacidad prepagada, las nuevas ejecuciones se bloquean, las que están corriendo terminan con normalidad y el agente sigue respondiendo.",
  "reto": {
   "text": "Ejecuta tu flow tres veces, una de ellas con error.\nAbre Activity y revisa estado y duración de cada ejecución.\nReenvía la ejecución fallida y compara.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-manage-monitor"
 },
 {
  "id": "L22",
  "skills": [
   "2.1a",
   "2.1b"
  ],
  "title": "Copilot connectors vs Power Platform connectors",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Indexar o consultar en vivo",
    "body": "Los Copilot connectors indexan contenido externo en Microsoft Graph, respetan las ACL del origen y dan citas: es index-then-answer. Los Power Platform connectors (real-time knowledge, preview) consultan el sistema en cada pregunta, con la identidad del usuario.",
    "visual": "<svg viewBox=\"0 0 340 130\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"6\" width=\"160\" height=\"50\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"82\" y=\"28\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Copilot connectors</text><text x=\"82\" y=\"42\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">indexan en Graph</text><rect x=\"178\" y=\"6\" width=\"160\" height=\"50\" rx=\"6\"/><text x=\"258\" y=\"28\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Power Platform</text><text x=\"258\" y=\"42\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">consulta en vivo</text><text x=\"82\" y=\"76\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Contenido estable</text><text x=\"258\" y=\"76\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Datos al minuto</text><text x=\"82\" y=\"94\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">ACL + citas</text><text x=\"258\" y=\"94\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">sin copiar datos</text><text x=\"170\" y=\"120\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Los configura el admin / el maker</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Manuales y políticas, que casi no cambian: Copilot connectors. El inventario al minuto, que no debe replicarse: Power Platform connectors. En el modo mixto se usa cada uno donde corresponde. En tiempo real solo se indexan metadatos, como nombres de tablas y columnas.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Dónde va cada tipo de conocimiento</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Manuales y políticas</span><span style=\"text-align:right\">Copilot connector</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Inventario al minuto</span><span style=\"text-align:right\">Power Platform connector, real-time</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden datos al minuto sin replicar: real-time knowledge. Piden citas e indexación semántica de contenido estable: Copilot connectors. Trampa: al publicar en canales, olvidar el scope ExternalItem.Read.All."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Copilot connectors: admin del tenant, Graph, ACL. Power Platform: token del usuario, sin movimiento de datos. Scope ExternalItem.Read.All."
   }
  ],
  "narration": "Para dar conocimiento empresarial a tu agente hay dos familias de conectores, y el examen quiere que sepas distinguirlas. Los Copilot connectors indexan contenido externo en Microsoft Graph, respetando los permisos del origen, con indexación semántica y citas. Los configura el administrador del tenant, y se reutilizan en Copilot y en Microsoft Search. Sigue el modelo index-then-answer: primero se indexa, luego se responde. Los Power Platform connectors, en su modo de conocimiento en tiempo real, que está en preview, ejecutan cada solicitud contra el sistema de origen con la identidad del usuario, sin replicar los datos; solo se indexan metadatos como nombres de tablas y columnas. Piensa en Contoso: los manuales y políticas, que cambian poco, van con Copilot connectors; el inventario al minuto va con Power Platform connectors. Hay un modo mixto que combina ambos. Y un detalle práctico: al publicar en canales, los agentes con Copilot connectors necesitan el scope ExternalItem punto Read punto All en la autenticación.",
  "reto": {
   "text": "Abre Knowledge, Add knowledge y revisa los conectores disponibles.\nAnota una fuente estable y una que cambie cada minuto en tu trabajo.\nDecide qué familia de conector usarías para cada una.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-graph-vs-power-platform-connectors"
 },
 {
  "id": "L23",
  "skills": [
   "2.1c",
   "2.4a"
  ],
  "title": "Azure AI Search como conocimiento",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Tu índice, tu agente",
    "body": "Copilot Studio admite índices vectorizados con integrated vectorization (Import and vectorize data): el mismo modelo de embeddings vectoriza la consulta en ejecución. También admite el semantic ranker, que se configura primero en Azure.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Documentos</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Índice</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">vectorial</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Knowledge</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Respuesta</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Una conexión = un índice vectorial</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso agrega Azure AI Search en Add knowledge, Featured, o desde las Properties de un Generative answers node. Autenticación: Access Key, Client Certificate Auth, Service principal o Microsoft Entra ID Integrated. Para citas, el índice incluye un campo con la URL; metadata_storage_path sirve.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Add knowledge</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Featured</span><span style=\"text-align:right\">Azure AI Search</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Autenticación</span><span style=\"text-align:right\">Service principal</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Estado</span><span style=\"text-align:right\">In progress, luego Ready</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden conectar Azure OpenAI «on your data»: no va en knowledge sources, sino en Classic data del nodo. Trampa: intentar provisionar el semantic ranker desde Copilot Studio; se configura en Azure."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Solo un vector index por conexión. Estado: In progress, luego Ready. Private endpoint requiere Virtual Network support en Power Platform."
   }
  ],
  "narration": "Azure AI Search te permite dar a tu agente un índice propio de documentos. Copilot Studio admite índices vectorizados con integrated vectorization: el mismo modelo de embeddings que vectorizó los datos vectoriza la pregunta del usuario en tiempo de ejecución. También admite el semantic ranker, pero esa característica se configura antes en Azure, no en Copilot Studio. Lo agregas desde Add knowledge, en la sección Featured, o desde las propiedades de un Generative answers node. La conexión acepta cuatro tipos de autenticación: Access Key, Client Certificate Auth, Service principal y Microsoft Entra ID Integrated. Solo se puede añadir un índice vectorial por conexión, y el estado pasa de In progress a Ready. Para obtener citas, el índice debe incluir un campo con la dirección real del documento; metadata storage path se interpreta como cita. Y si necesitas Azure OpenAI sobre tus datos, no se agrega como knowledge source: se usa la opción Classic data del nodo. Piensa en Contoso y sus manuales técnicos indexados.",
  "reto": {
   "text": "Crea un servicio Azure AI Search en el nivel gratuito.\nImporta y vectoriza un documento de prueba.\nAgrega el índice como conocimiento y verifica que llegue a Ready.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
 },
 {
  "id": "L24",
  "skills": [
   "2.2c"
  ],
  "title": "Custom connector como herramienta",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Tu API, como conector",
    "body": "Un custom connector se construye en Power Apps o Power Automate desde un archivo OpenAPI (Swagger 2.0), una colección Postman o desde cero. Soporta autenticación No auth, Basic, API key y OAuth 2.0.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">OpenAPI</text><text x=\"35.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">o Postman</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Custom</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">connector</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Connection</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Tool del</text><text x=\"302.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">agente</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Add a tool, Custom connector</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso crea el conector Inventario API desde su Swagger, crea una connection y lo agrega al agente con Add a tool, Custom connector. Usa connection references para moverlo entre entornos. Las data policies pueden clasificar conectores personalizados por patrón de URL.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Custom connector</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Nombre</span><span style=\"text-align:right\">Inventario API</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Autenticación</span><span style=\"text-align:right\">API key</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">En el agente</span><span style=\"text-align:right\">Add a tool, Custom connector</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden usar una API interna ya descrita en OpenAPI reutilizable por Power Apps y Flows: custom connector. Trampa: olvidar que las DLP también gobiernan conectores personalizados."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "OpenAPI (Swagger 2.0), Postman o blank. Policy templates y código C#. Connections + connection references. DLP por URL."
   }
  ],
  "narration": "Un custom connector es la manera de convertir cualquier a pe i en una herramienta reutilizable. Lo construyes en Power Apps o Power Automate a partir de un archivo OpenAPI, es decir Swagger dos punto cero, de una colección de Postman, o desde cero. Eliges la autenticación: sin autenticación, Basic, API key u OAuth dos punto cero. Puedes añadir policy templates y hasta código en C sostenido. Después lo agregas al agente con Add a tool, Custom connector. Funciona con connections y connection references, y esto es clave para llevarlo entre entornos con soluciones. Además, las data policies de Power Platform pueden clasificar los conectores personalizados por patrón de dirección. Piensa en Contoso: crean el conector de Inventario desde su especificación Swagger, una connection con su clave, y lo agregan al agente como herramienta. En el examen, si una a pe i interna ya se usa en Power Apps y Power Automate, el custom connector es el camino natural, y recuerda que la gobernanza también le aplica.",
  "reto": {
   "text": "Descarga o escribe un Swagger de dos operaciones.\nCrea un custom connector y pruébalo.\nAgrégalo a tu agente con Add a tool.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent"
 },
 {
  "id": "L25",
  "skills": [
   "2.2d"
  ],
  "title": "Herramienta REST API",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Sube la spec, elige operaciones",
    "body": "En New tool, REST API subes una especificación OpenAPI en JSON v2 (una v3 se traduce automáticamente a v2), mejoras la descripción y eliges una solución. Seleccionas solo las operaciones que el agente puede usar.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">New tool, REST API</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Spec</span><span style=\"text-align:right\">OpenAPI JSON v2 (v3 se traduce)</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Autenticación</span><span style=\"text-align:right\">None, API key, OAuth 2.0</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Operaciones</span><span style=\"text-align:right\">solo las que elijas</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Solución</span><span style=\"text-align:right\">elegida o creada</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso expone crear y consultar pedidos, pero no borrar: marca solo esas operaciones. Con API key defines etiqueta, nombre y ubicación (Header o Query); el usuario da la clave al ejecutar. Las descripciones de entradas y salidas son obligatorias.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Operaciones del servicio de pedidos</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Crear pedido</span><span style=\"text-align:right\">Seleccionada</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Consultar pedido</span><span style=\"text-align:right\">Seleccionada</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Borrar pedido</span><span style=\"text-align:right\">No seleccionada</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden limitar qué puede hacer el agente con una API: seleccionar operaciones. Trampa: subir una spec sin descripciones; el orquestador las usa para decidir cuándo llamar."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "OpenAPI JSON v2. v3 se traduce. Auth: None, API key, OAuth 2.0. Solo operaciones elegidas. Descripciones completas."
   }
  ],
  "narration": "La herramienta REST API es el camino rápido para exponer una a pe i al agente. En Tools, New tool, REST API, subes una especificación OpenAPI en formato JSON versión dos; si tu especificación es versión tres, se traduce automáticamente a la dos. Mejoras la descripción, porque el orquestador la usa para decidir cuándo llamar, y eliges una solución, o se crea una por ti. La autenticación puede ser ninguna, API key u OAuth dos punto cero. Con API key defines la etiqueta, el nombre y la ubicación, en header o en query, y el usuario da la clave en tiempo de ejecución. Después seleccionas solo las operaciones que quieres exponer: por ejemplo, crear y consultar, pero no borrar. A cada una le pones nombre y descripción, y las descripciones de entradas y salidas deben estar completas. Piensa en Contoso y su servicio de pedidos. En el examen, si piden limitar lo que el agente puede hacer, la respuesta es seleccionar operaciones.",
  "reto": {
   "text": "Toma una API pública con OpenAPI y crea una herramienta REST API.\nSelecciona una sola operación de lectura.\nPrueba que el agente la llama y no ofrece las demás.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api"
 },
 {
  "id": "L26",
  "skills": [
   "2.2a"
  ],
  "title": "Computer use",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "El agente maneja la pantalla",
    "body": "Computer use opera sitios web y aplicaciones de escritorio de Windows con visión y razonamiento. Requiere generative orchestration. Configuras nombre, descripción, modelo, instrucciones con URLs completas y pasos explícitos, y máquina.",
    "visual": "<svg viewBox=\"0 0 340 174\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"105\" y=\"6\" width=\"130\" height=\"38\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"170\" y=\"29\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"600\">Computer use</text><rect x=\"2\" y=\"96\" width=\"101\" height=\"46\" rx=\"6\"/><text x=\"52.5\" y=\"109\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Hosted</text><text x=\"52.5\" y=\"123\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">browser</text><text x=\"52.5\" y=\"137\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(preview)</text><line x1=\"170\" y1=\"46\" x2=\"52.5\" y2=\"94\" style=\"stroke:var(--muted)\"/><polygon points=\"52.5,94 59.5,94.1 57.4,89.0\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"119\" y=\"96\" width=\"101\" height=\"46\" rx=\"6\"/><text x=\"169.5\" y=\"109\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Cloud PC</text><text x=\"169.5\" y=\"123\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">pool</text><text x=\"169.5\" y=\"137\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(preview)</text><line x1=\"170\" y1=\"46\" x2=\"169.5\" y2=\"94\" style=\"stroke:var(--muted)\"/><polygon points=\"169.5,94 172.3,87.6 166.8,87.5\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"236\" y=\"96\" width=\"101\" height=\"46\" rx=\"6\"/><text x=\"286.5\" y=\"116\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Tu máquina</text><text x=\"286.5\" y=\"130\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(BYO)</text><line x1=\"170\" y1=\"46\" x2=\"286.5\" y2=\"94\" style=\"stroke:var(--muted)\"/><polygon points=\"286.5,94 281.6,89.0 279.5,94.1\" fill=\"currentColor\" stroke=\"none\"/><text x=\"170\" y=\"162\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Dónde corre</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso automatiza una web de facturas sin API. Credenciales: el default del maker es riesgoso si se comparte; mejor stored credentials (almacenamiento interno o Azure Key Vault) o las del usuario final. Human supervision envía un correo de Outlook a un revisor si detecta instrucciones potencialmente dañinas.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Computer use: factura web</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Modelo</span><span style=\"text-align:right\">OpenAI CUA</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Instrucciones</span><span style=\"text-align:right\">URL completa y pasos explícitos</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Credenciales</span><span style=\"text-align:right\">Stored, Azure Key Vault</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Human supervision</span><span style=\"text-align:right\">Correo de Outlook</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden costo: 5 Copilot Credits por paso con modelos estándar, 15 con premium. No está incluido en la licencia M365 Copilot USL. Trampa: elegir Hosted browser para producción; es de experimentación, sin Entra join."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Hosted browser: experimentar. Cloud PC pool: Entra-joined + Intune. BYO machine: Power Automate for desktop. Access control bloquea acciones, no la apertura."
   }
  ],
  "narration": "Computer use es la herramienta que deja al agente manejar sitios web y aplicaciones de escritorio de Windows usando visión y razonamiento, como lo haría una persona. Requiere generative orchestration. Al configurarla indicas nombre, descripción, modelo, instrucciones, que deben incluir direcciones completas y pasos explícitos, y la máquina. Puede correr en tres lugares: un hosted browser, en preview, pensado para experimentar; un Cloud PC pool, también en preview, con máquinas unidas a Entra e Intune; o tu propia máquina, con Power Automate for desktop. Para credenciales, las del maker son riesgosas si el agente se comparte; mejor las del usuario final o stored credentials, en almacenamiento interno o en Azure Key Vault. Human supervision envía un correo de Outlook a un revisor ante instrucciones potencialmente dañinas. Costo: cinco Copilot Credits por paso con modelos estándar, quince con premium. Piensa en Contoso y su web de facturas sin a pe i.",
  "reto": {
   "text": "Lee las instrucciones de ejemplo de Computer use.\nEscribe instrucciones para llenar un formulario web: URL, pasos y resultado.\nSi tienes capacidad, pruébalo con el hosted browser.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
 },
 {
  "id": "L27", "audio": "audio/L27.mp3",
  "skills": [
   "2.2b"
  ],
  "title": "MCP: servidores de herramientas",
  "premium": true,
  "screens": [
   {
    "kind": "idea",
    "heading": "Un protocolo, muchas herramientas",
    "body": "MCP es un protocolo abierto: un servidor expone herramientas y recursos, y cualquier cliente compatible los usa. Copilot Studio solo habla Streamable HTTP; SSE ya no se admite desde agosto de 2025.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Cliente MCP</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Streamable HTTP</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Servidor</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">MCP</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Tools</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">El orquestador elige la tool por descripción</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso registra su servidor con el wizard: Tools, Add a tool, New tool, Model Context Protocol. Pone nombre, descripción (la usa el orquestador) y URL. Auth: None, API key u OAuth 2.0 (Dynamic discovery, Dynamic o Manual). Luego crea la connection y pulsa Add to agent.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">New tool, Model Context Protocol</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Server name</span><span style=\"text-align:right\">nexo-tools</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Server description</span><span style=\"text-align:right\">Consulta y crea tickets</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Server URL</span><span style=\"text-align:right\">la del servidor MCP</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Authentication</span><span style=\"text-align:right\">None, API key u OAuth 2.0</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden bloquear servidores MCP no aprobados: como usan conectores de Power Platform, las data policies (DLP) los gobiernan. Trampa: usar SSE como transporte; ya no se soporta."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Streamable HTTP. Requiere generative orchestration. Alternativa al wizard: custom connector con x-ms-agentic-protocol mcp-streamable-1.0."
   }
  ],
  "narration": "Eme ce pe, Model Context Protocol, es un protocolo abierto para exponer herramientas y recursos. Un mismo servidor puede usarse desde Copilot Studio y desde otros clientes compatibles. En Copilot Studio, el transporte es Streamable HTTP; el transporte SSE ya no se admite desde agosto de dos mil veinticinco. Hay dos formas de conectar un servidor. La recomendada es el wizard: Tools, Add a tool, New tool, Model Context Protocol. Indicas nombre, descripción, que el orquestador usa para decidir cuándo llamarlo, y la dirección del servidor. La autenticación puede ser ninguna, API key u OAuth dos punto cero, con tres modos: Dynamic discovery, Dynamic o Manual. La otra forma es un custom connector con un OpenAPI que marca la operación con x-ms-agentic-protocol. Después creas la connection y eliges Add to agent. Como usa conectores de Power Platform, las data policies también gobiernan los servidores eme ce pe. Requiere generative orchestration, y las herramientas las elige el orquestador.",
  "reto": {
   "text": "Abre Tools, Add a tool, New tool, Model Context Protocol.\nConecta un servidor eme ce pe público de ejemplo o tu propio servidor local.\nPide al agente algo que obligue a usar una de sus tools.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
 },
 {
  "id": "L28", "audio": "audio/L28.mp3",
  "skills": [
   "2.3a"
  ],
  "title": "Diseño multiagente",
  "premium": true,
  "screens": [
   {
    "kind": "idea",
    "heading": "Child agent o connected agent",
    "body": "Un child agent vive dentro del agente principal: ligero, sin ajustes ni despliegue propios. Un connected agent es otro agente de Copilot Studio del mismo entorno, con su propia publicación y ciclo de vida. El orquestador del principal decide a cuál delegar.",
    "visual": "<svg viewBox=\"0 0 340 150\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"2\" width=\"226\" height=\"146\" rx=\"6\" style=\"stroke:var(--muted)\" stroke-dasharray=\"4 3\"/><text x=\"115\" y=\"79\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\"></text><text x=\"115\" y=\"18\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-weight=\"600\">Agente principal</text><rect x=\"100\" y=\"28\" width=\"100\" height=\"32\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"150\" y=\"48\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Orquestador</text><rect x=\"12\" y=\"92\" width=\"100\" height=\"42\" rx=\"6\"/><text x=\"62\" y=\"110\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Child agent</text><text x=\"62\" y=\"124\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">dentro, ligero</text><line x1=\"125\" y1=\"62\" x2=\"70\" y2=\"90\" style=\"stroke:var(--accent)\"/><polygon points=\"70,90 77.0,89.5 74.5,84.6\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><line x1=\"180\" y1=\"62\" x2=\"280\" y2=\"90\" style=\"stroke:var(--accent)\"/><polygon points=\"280,90 274.5,85.6 273.1,90.9\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><rect x=\"236\" y=\"92\" width=\"100\" height=\"42\" rx=\"6\"/><text x=\"286\" y=\"110\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Connected</text><text x=\"286\" y=\"124\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">agent (aparte)</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Licencias de software: child agent, un solo equipo y caso de uso. RR. HH.: connected agent, tiene su equipo, canales y publicación. Divide cuando la precisión baja con más de 30 a 40 opciones de tools, topics y agentes, o cuando las descripciones se parecen.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Decisión de Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Licencias</span><span style=\"text-align:right\">Child agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">RR. HH.</span><span style=\"text-align:right\">Connected agent</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Más de 30 a 40 opciones</span><span style=\"text-align:right\">considera dividir</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden elegir entre child y connected según equipos, ALM, publicación y reutilización. Trampa: ignorar el costo: más saltos de orquestación significan más latencia y más superficie de prueba y gobierno."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Child: un caso de uso, un equipo, sin publicación aparte. Connected: separado, reutilizable. Externos: A2A, Foundry, Fabric, M365 Agents SDK."
   }
  ],
  "narration": "El diseño multiagente responde una pregunta: ¿dónde pongo cada capacidad? Copilot Studio ofrece, dentro del mismo agente, los child agents: ligeros, para un solo caso de uso y un solo equipo, sin ajustes, autenticación ni despliegue propios. Y ofrece los connected agents: otros agentes de Copilot Studio del mismo entorno, con su propio ciclo de vida. Además puedes conectar agentes externos mediante A dos A, Microsoft Foundry y Fabric data agents. Empieza simple y divide cuando la precisión de selección de herramientas se degrade, como regla práctica con más de treinta o cuarenta opciones, o cuando haya varios equipos, canales de publicación distintos o necesidad de reutilizar. Cada salto cuesta latencia y amplía lo que debes probar y gobernar. Piensa en Contoso: Licencias va como child agent; Recursos humanos, con su propio equipo y publicación, va como connected agent. En el examen, justifica la elección con equipo, publicación y reutilización.",
  "reto": {
   "text": "Dibuja los agentes de un caso de Contoso y marca quién es child y quién connected.\nCrea un child agent y un connected agent en tu entorno.\nObserva cómo el orquestador elige según las descripciones.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "L29",
  "skills": [
   "2.3c"
  ],
  "title": "Connected agents en la práctica",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Delegar a otro agente",
    "body": "Puedes invocar a un connected agent desde el orquestador o hacer que un topic lo redirija: sus entradas y salidas se vuelven variables del topic. En las instrucciones, se referencia al agente escribiendo una barra diagonal.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Usuario</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">principal</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Topic</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Redirect</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"302.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente</text><text x=\"302.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">RR. HH.</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Entradas y salidas = variables del topic</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "El agente de TI de Contoso redirige a RR. HH. las preguntas de nómina. Un agente que es principal con connected agents no puede, además, ser usado como connected agent por otro principal. Los agentes hijos respetan el ajuste Use general knowledge del principal.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Instructions del agente de TI</div><div style=\"padding:2px 0\">Para preguntas de nómina, delega en /RR. HH.</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Mecanismo</span><span style=\"text-align:right\">Redirect desde un topic u orquestador</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden por qué se pierde una cita al pasar por otro agente: las citas pueden perderse al volver. Trampa: encadenar un agente principal como connected de otro; no se permite."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Mismo entorno. Redirect desde topics. No se puede ser principal y connected a la vez. Citas pueden perderse. Respeta Use general knowledge."
   }
  ],
  "narration": "Los connected agents son agentes de Copilot Studio del mismo entorno que tu agente principal puede usar como especialistas. Hay dos formas de invocarlos. El orquestador decide por sí mismo cuándo delegar, según la descripción. O bien un topic puede redirigir la conversación a ese agente, y entonces sus entradas y salidas se convierten en variables del topic. En las instrucciones, puedes referenciar un agente escribiendo una barra diagonal. Hay límites que caen en el examen. Un agente que es principal con connected agents no puede usarse además como connected agent por otro principal. Los agentes hijos y conectados respetan el ajuste Use general knowledge del agente principal. Y las citas pueden perderse al pasar de vuelta la respuesta. Piensa en Contoso: el agente de TI redirige a Recursos humanos las preguntas de nómina, y el agente de Recursos humanos las contesta con sus propias fuentes. Descripciones claras son lo que hace que la delegación funcione.",
  "reto": {
   "text": "Crea un segundo agente con una sola especialidad.\nConéctalo al principal con Add agent.\nHaz una pregunta que solo el segundo pueda contestar.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
 },
 {
  "id": "L30",
  "skills": [
   "2.3b"
  ],
  "title": "Agentes de Microsoft Foundry",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Foundry dentro de Copilot Studio",
    "body": "Un agente de Foundry (preview) se agrega en Agents, Add an agent, Connect to an external agent, Microsoft Foundry. Necesitas el Foundry project endpoint, nombre, descripción y el Agent Id. Solo funcionan agentes creados en el nuevo portal de Foundry.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Copilot</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Studio</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Foundry</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">project</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">(Agent Id)</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Requiere Activity protocol habilitado</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "El agente Analista de incidentes de Contoso vive en Foundry. Si devuelve 400 «endpoint does not support activity», hay que habilitar el Activity protocol: los agentes nuevos solo exponen Responses y A2A, y habilitarlo es posible solo por REST API o Python SDK.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Add an agent, Microsoft Foundry</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Foundry project endpoint</span><span style=\"text-align:right\">de tu proyecto</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Agent Id</span><span style=\"text-align:right\">del nuevo portal</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Activity protocol</span><span style=\"text-align:right\">habilitar por REST o Python</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden diagnosticar un error 404 Version not found: el agente se creó en el portal viejo. Trampa: buscar el Activity protocol en el portal; no aparece allí, solo Responses y A2A."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Activity protocol por REST o Python. Nuevo portal únicamente. Connection con project endpoint."
   }
  ],
  "narration": "Puedes usar agentes creados en Microsoft Foundry dentro de Copilot Studio; esta capacidad está en preview. Se agrega en Agents, Add an agent, Connect to an external agent, y eliges Microsoft Foundry. La conexión necesita el Foundry project endpoint; después indicas nombre, descripción y el Agent Id. Hay dos requisitos que el examen adora. Primero, el agente de Foundry debe tener habilitado el Activity protocol endpoint. Los agentes nuevos solo exponen Responses y A dos A por defecto, y habilitar Activity solo se puede hacer con la API REST o con el SDK de Python; el portal sigue mostrando solo Responses y A dos A. Si falta, recibes un error cuatrocientos con el mensaje de que el endpoint no soporta activity. Segundo, solo funcionan los agentes creados en el nuevo portal de Foundry; con el portal anterior recibes un error cuatrocientos cuatro, Version not found. Piensa en Contoso: su Analista de incidentes vive en Foundry y el agente de TI lo invoca.",
  "reto": {
   "text": "Crea un agente simple en el nuevo portal de Foundry.\nRevisa qué endpoints expone.\nConéctalo desde Copilot Studio y resuelve el error si aparece.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent"
 },
 {
  "id": "L31",
  "skills": [
   "2.3e"
  ],
  "title": "Agentes A2A",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Agentes que hablan entre sí",
    "body": "A2A es un estándar para que agentes de distintos frameworks colaboren, con multi-turno y metadatos ricos. En Agents, Add agent, A2A agent pegas la URL del endpoint del agente, no la del agent card.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Copilot Studio</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">A2A</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">endpoint</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">externo</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Agent card: /.well-known/agent.json</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Si hay un agent card válido, nombre y descripción se rellenan solos; si no, escribe una buena descripción. Auth: None, API key (header o query) u OAuth 2.0. Para desarrollo local, expón el agente con Dev Tunnels con el puerto público. Alcanza agentes on-premises o en VNet.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Add agent, A2A agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Endpoint</span><span style=\"text-align:right\">el del agente, no el agent card</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Autenticación</span><span style=\"text-align:right\">None, API key u OAuth 2.0</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Desarrollo local</span><span style=\"text-align:right\">Dev Tunnels, puerto público</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden cuándo A2A y cuándo otra herramienta: A2A para flujos entre agentes; connector o HTTP para APIs simples; MCP para tools y recursos; Activity Protocol para agentes del Microsoft 365 Agents SDK."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "URL del endpoint, no del agent card. Viaja el contextId y el historial de chat en metadatos. Dev Tunnels en desarrollo."
   }
  ],
  "narration": "A dos A, Agent to Agent, es un estándar para que agentes de distintos frameworks colaboren, con conversaciones de varios turnos y metadatos ricos. Para conectar uno, vas a Agents, Add agent, A dos A agent, y escribes la dirección del endpoint del agente, no la del agent card. Si existe un agent card válido en la ruta well-known, el nombre y la descripción se rellenan solos; si no, escribe tú una buena descripción. La autenticación puede ser ninguna, API key en header o query, u OAuth dos punto cero. El payload incluye un contextId, los identificadores de mensaje, el idioma y el historial completo de la conversación en los metadatos. Para desarrollo, expón tu agente local con Dev Tunnels y haz el puerto público. Como usa la infraestructura de custom connectors, puede llegar a agentes on-premises o en redes virtuales. Piensa en Contoso: un agente de logística hecho con otro framework. Y elige bien: A dos A para agentes, HTTP para a pe i simples, eme ce pe para herramientas.",
  "reto": {
   "text": "Anota qué endpoint tendría un agente A2A de ejemplo.\nAbre Add agent, A2A agent y revisa los campos.\nSi tienes un agente local, expónlo con Dev Tunnels y conéctalo.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
 },
 {
  "id": "L32",
  "skills": [
   "2.3d"
  ],
  "title": "Fabric data agents",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Pregunta a tus datos en Fabric",
    "body": "Un Fabric data agent traduce preguntas a consultas de solo lectura (NL2SQL, NL2DAX, NL2KQL) con las credenciales del usuario. Hasta 5 fuentes: warehouse, lakehouse, semantic model de Power BI, KQL, mirrored DB, ontología o Graph.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Pregunta</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Fabric</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">data agent</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">SQL / DAX</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">/ KQL</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Datos</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Solo lectura, credenciales del usuario</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso pregunta por ventas del trimestre. El agente responde con un máximo de 25 filas por 25 columnas. Requiere capacidad Fabric de pago F2 o superior (o Power BI Premium P1+ con Fabric). Se agrega como agente externo (preview).",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Fabric data agent</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Fuentes de datos</span><span style=\"text-align:right\">hasta 5</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Respuesta máxima</span><span style=\"text-align:right\">25 filas por 25 columnas</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Capacidad</span><span style=\"text-align:right\">Fabric F2 o superior</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden limitaciones: no se puede apuntar con un Redirect node ni referenciar en instrucciones; no funciona si el agente principal se despliega en Microsoft Copilot; solo inglés; no se cambia el LLM."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "F2 o superior de pago (el trial no basta). 25 x 25. Solo lectura. Agent evaluation no lo admite."
   }
  ],
  "narration": "Un Fabric data agent responde preguntas en lenguaje natural sobre tus datos de Microsoft Fabric. Traduce la pregunta a consultas de solo lectura, en SQL, DAX o KQL, y las ejecuta con las credenciales del usuario. Puede usar hasta cinco fuentes de datos, entre ellas warehouse, lakehouse, modelos semánticos de Power BI y bases KQL. Las respuestas se limitan a veinticinco filas por veinticinco columnas, funciona solo en inglés y no puedes cambiar el modelo de lenguaje. Requiere capacidad de Fabric de pago, F dos o superior, o Power BI Premium con Fabric habilitado. En Copilot Studio se agrega como agente externo, en preview. Tiene límites que se preguntan: no puede ser objetivo de un nodo Redirect, no se puede referenciar en las instrucciones, y no funciona si el agente principal se despliega en Microsoft Copilot. Piensa en Contoso: el director pregunta por las ventas del trimestre y el agente consulta el lakehouse. Y recuerda que Agent evaluation no admite Fabric data agents.",
  "reto": {
   "text": "Lee qué capacidad de Fabric necesitarías en tu organización.\nAnota tres preguntas de negocio para un Fabric data agent.\nSi tienes F2, pruébalo y pausa la capacidad después.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent"
 },
 {
  "id": "L33",
  "skills": [
   "2.4b"
  ],
  "title": "Modelos de Foundry en prompts",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Trae tu propio modelo",
    "body": "En un Prompt, abre el desplegable Model, pulsa + y elige Connect a model from Azure AI Foundry. Escribes el deployment name y el base model name exactamente como están en Foundry.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Requisitos del modelo</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Tipo</span><span style=\"text-align:right\">chat completion</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Endpoint termina en</span><span style=\"text-align:right\">/chat/completions</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">GPT-5 y posteriores</span><span style=\"text-align:right\">no admitidos</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Facturación</span><span style=\"text-align:right\">Azure, aparte</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso despliega un modelo propio en Foundry para clasificar tickets. Si usa un endpoint de Responses (/openai/v1/responses), recibe «Resource not found». Los administradores lo gobiernan con el conector Azure AI Foundry en las data policies.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Modelo en</text><text x=\"35.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Foundry</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Model:</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">+ connect</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Prompt</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Resultado</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">chat completion y chat/completions</text></svg>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden por qué falla un modelo: es de la familia GPT-5 o el endpoint no es /chat/completions. Trampa: creer que se factura en Copilot Studio; se factura por separado en Azure."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Solo chat completion. Endpoint /chat/completions. GPT-5+ no soportado en BYOM. Facturación en Azure."
   }
  ],
  "narration": "Con Bring your own model puedes usar en un prompt un modelo desplegado en Azure AI Foundry. En el prompt, abres el desplegable Model, pulsas el signo más y eliges conectar un modelo de Azure AI Foundry. Escribes el deployment name y el base model name exactamente como figuran en Foundry. Hay reglas concretas que se preguntan. Solo se admiten modelos de tipo chat completion, y el endpoint debe terminar en barra chat completions. Si usas un endpoint de Responses, el resultado es un error de Resource not found. Los modelos de la familia GPT cinco y posteriores no se admiten para estos prompts. El uso se factura por separado en Azure, fuera de las tarifas de Copilot Studio, y lo gobierna el conector Azure AI Foundry en las data policies del centro de administración de Power Platform. Piensa en Contoso: despliegan un modelo en Foundry para clasificar tickets y lo conectan a su prompt. Si falla, revisa primero el tipo de modelo y la forma del endpoint.",
  "reto": {
   "text": "Despliega un modelo de chat en Foundry.\nConéctalo en el Model de un prompt copiando los nombres exactos.\nPrueba con un endpoint equivocado para ver el error.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts"
 },
 {
  "id": "L34",
  "skills": [
   "2.4c"
  ],
  "title": "Application Insights",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Mira qué hace tu agente",
    "body": "En Settings, Advanced, Application Insights pegas el Connection string. Activas Enable logging y, si quieres más detalle, Log conversation details, Log sensitive Activity properties y Node execution events.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Agente</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Connection</text><text x=\"124.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">string</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">App</text><text x=\"213.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Insights</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">KQL</text><text x=\"302.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Workbook</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Los datos van a customEvents</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso filtra el tráfico real con customDimensions['designMode'] == \"False\": designMode es True cuando la conversación fue en el test canvas. Hay un workbook Copilot Studio Dashboard (preview) y para compartirlo se necesita rol Reader en el recurso.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">KQL en Application Insights</div><div style=\"padding:2px 0\">customEvents</div><div style=\"padding:2px 0\">| where customDimensions['designMode'] == \"False\"</div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden impedir telemetría de agentes: bloquear el conector Application Insights in Copilot Studio en una data policy. Trampa: pensar que desactivar toggles por agente es un control de administrador."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Tabla customEvents. designMode True = test canvas. Telemetría de agente = eventos; de entorno (preview) = trazas y spans."
   }
  ],
  "narration": "Application Insights te deja ver qué está pasando dentro de tu agente. En la configuración del agente, en Advanced, pegas el Connection string de tu recurso de Application Insights. Después activas Enable logging y, si necesitas más detalle, tres opciones: Log conversation details, que incluye el identificador del usuario, el nombre y el texto de los mensajes; Log sensitive Activity properties, y Node execution events, con un evento por cada nodo ejecutado. Los datos llegan a la tabla customEvents. Todos incluyen la dimensión designMode, que vale True cuando la conversación ocurrió en el test canvas. Para analizar solo tráfico real, filtras designMode igual a False en tu consulta KQL. También hay un workbook, Copilot Studio Dashboard, en preview. Para impedir la telemetría a nivel de agente, el administrador bloquea el conector Application Insights in Copilot Studio en una data policy. Piensa en Contoso y su análisis de conversaciones reales. Y recuerda que la telemetría de entorno, también en preview, usa trazas y spans.",
  "reto": {
   "text": "Crea un recurso Application Insights y copia su Connection string.\nPégalo en Settings, Advanced y activa Enable logging.\nConversa con el agente y consulta customEvents filtrando designMode.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/telemetry-overview"
 },
 {
  "id": "L35",
  "skills": [
   "3.1a"
  ],
  "title": "Crear un test set",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Casos para medir",
    "body": "Un test set tiene casos de dos tipos: single response y conversation (multi-turno). Se pueden importar de un archivo CSV o TXT con los encabezados Question y Expected response, hasta 100 preguntas y 1000 caracteres por pregunta.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Importar un test set</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Formato</span><span style=\"text-align:right\">CSV o TXT</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Encabezados</span><span style=\"text-align:right\">Question, Expected response</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Máximo</span><span style=\"text-align:right\">100 preguntas</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Largo por pregunta</span><span style=\"text-align:right\">1000 caracteres</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso genera casos de varias formas: Quick question set (10 preguntas desde la descripción del agente), desde conocimiento (texto, Word, Excel, PDF o archivos de SharePoint, máximo 5 MB, sin carpetas) o desde los temas reales de Monitor (preview).",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Archivo CSV de importación</div><div style=\"padding:2px 0\">Question,Expected response</div><div style=\"padding:2px 0\">¿Cómo reinicio mi contraseña?,Usa el portal de autoservicio</div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden qué agentes se pueden evaluar: solo con No authentication o Authenticate with Microsoft, y no Fabric data agents. Si necesita auth, se elige un user profile de prueba. Trampa: importar sin respuestas esperadas y usar Exact match."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Respuestas esperadas opcionales al importar, pero necesarias para Compare meaning, Text similarity y Exact match."
   }
  ],
  "narration": "Un test set es el conjunto de casos con el que evalúas tu agente. Hay dos tipos de caso: single response, una pregunta y una respuesta, y conversation, de varios turnos. Puedes importar un archivo CSV o TXT con las columnas Question y Expected response, hasta cien preguntas y mil caracteres por pregunta. Las respuestas esperadas son opcionales al importar, pero las necesitas para métodos como Compare meaning, Text similarity o Exact match. También puedes generar casos: Quick question set crea diez preguntas a partir de la descripción del agente; desde conocimiento, con texto, Word, Excel, PDF o archivos individuales de SharePoint, máximo cinco megabytes por archivo; o desde los temas reales de la página Monitor, en preview, con la acción Evaluate. Ojo con los requisitos: la evaluación solo admite agentes con No authentication o Authenticate with Microsoft, y no admite Fabric data agents. Piensa en Contoso: importan cuarenta preguntas reales de soporte con sus respuestas esperadas. Y la trampa del examen: usar Exact match sin respuestas esperadas.",
  "reto": {
   "text": "Escribe un CSV con cinco preguntas y respuestas esperadas.\nImpórtalo como test set en Evaluation.\nGenera además un Quick question set y compara los casos.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create"
 },
 {
  "id": "L36", "audio": "audio/L36.mp3",
  "skills": [
   "3.1b"
  ],
  "title": "Métodos de evaluación",
  "premium": true,
  "screens": [
   {
    "kind": "idea",
    "heading": "Cada método mide algo distinto",
    "body": "Con puntuación: Compare meaning (intención, pass score 50 por defecto) y Text similarity (coseno de 0 a 1). Pass o fail: Exact match, Keyword match, Tool use y Content safety. General quality es LLM-graded sobre 100 y no necesita respuesta esperada.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Qué método uso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Número o código exacto</span><span style=\"text-align:right\">Exact match</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Mismo significado</span><span style=\"text-align:right\">Compare meaning</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Usó las tools correctas</span><span style=\"text-align:right\">Tool use</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Contenido dañino</span><span style=\"text-align:right\">Content safety</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Para el código de pedido, Exact match; para una política redactada distinto, Compare meaning; para verificar que llamó a CrearTicket, Tool use. Custom define instrucciones y al menos dos labels, cada uno Pass o Fail (por ejemplo Compliant y Non-compliant).",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Métodos para Contoso</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Código de pedido</span><span style=\"text-align:right\">Exact match</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Política reescrita</span><span style=\"text-align:right\">Compare meaning</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Llamó a CrearTicket</span><span style=\"text-align:right\">Tool use</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rechazo esperado</span><span style=\"text-align:right\">Custom</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden el método para rechazos esperados: General quality puede marcar como mejorable una negativa correcta (abstention); usa Custom. Content safety: umbral de 0 (más estricto) a 7 (más permisivo). Un caso sin lo requerido da Invalid."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "General quality por defecto. Un método por tipo de contenido en Content safety. Tool use y Keyword match: pass o fail."
   }
  ],
  "narration": "Evaluar un agente es elegir bien el método. General quality lo califica un modelo de lenguaje sobre cien, midiendo relevancia, fundamento, completitud y abstención, y no necesita respuesta esperada; está activo por defecto. Compare meaning compara la intención con la respuesta esperada, con pass score de cincuenta por defecto, y tolera redacciones distintas. Text similarity mide la cercanía de redacción con coseno entre cero y uno. Exact match exige coincidencia exacta, ideal para códigos o números. Keyword match revisa palabras, Any o All. Tool use comprueba si se usaron las herramientas o topics esperados. Content safety evalúa odio, sexual, violencia y autolesiones, con umbral de severidad de cero, el más estricto, a siete. Custom permite instrucciones y al menos dos labels con Pass o Fail. Si falta lo necesario, el resultado es Invalid. Un detalle: General quality puede marcar como mejorable una negativa correcta; para rechazos esperados usa Custom. Elige siempre según lo que quieres medir.",
  "reto": {
   "text": "Elige tres casos de prueba y asigna un método a cada uno.\nCrea un Custom con labels Compliant y Non-compliant.\nEjecuta el test set y revisa si algún caso da Invalid.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
 },
 {
  "id": "L37",
  "skills": [
   "3.1c"
  ],
  "title": "Revisar resultados",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Qué significa cada resultado",
    "body": "Cada caso recibe Pass, Fail, Invalid o Error. Invalid aparece cuando falta lo que el método necesita (respuesta esperada, keywords o tools). Error es un fallo de ejecución. Un pass score alto produce Fail, no Invalid.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"35.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Pass</text><line x1=\"71\" y1=\"42\" x2=\"89\" y2=\"42\"/><polygon points=\"89,42 82.6,39.3 82.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"91\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"124.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Fail</text><line x1=\"160\" y1=\"42\" x2=\"178\" y2=\"42\"/><polygon points=\"178,42 171.6,39.3 171.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"180\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"213.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Invalid</text><line x1=\"249\" y1=\"42\" x2=\"267\" y2=\"42\"/><polygon points=\"267,42 260.6,39.3 260.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"269\" y=\"18\" width=\"67\" height=\"48\" rx=\"6\"/><text x=\"302.5\" y=\"46\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Error</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Invalid = falta algo en el caso</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Contoso corre el mismo test set antes y después de cambiar las instrucciones, y usa Compare with: flechas muestran casos que pasaron de fallar a pasar o al revés. Show activity map explica la secuencia de decisiones de un caso.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Antes y después de cambiar instrucciones</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Ejecución 1</span><span style=\"text-align:right\">7 Pass, 3 Fail</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Ejecución 2</span><span style=\"text-align:right\">9 Pass, 1 Fail</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Compare with</span><span style=\"text-align:right\">flechas de Fail a Pass</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden conservar resultados: están disponibles 89 días; para más tiempo se exportan a CSV. Trampa: pensar que un umbral exigente genera Invalid; genera Fail."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "89 días de retención y exportar a CSV. Compare with = dos ejecuciones del mismo test set."
   }
  ],
  "narration": "Después de ejecutar una evaluación, hay que leer los resultados. Cada caso recibe uno de cuatro estados: Pass, Fail, Invalid o Error. Invalid aparece cuando al caso le falta lo que el método necesita, como la respuesta esperada, las palabras clave o las herramientas esperadas. Error indica un fallo de ejecución. Un pass score muy alto produce Fail, no Invalid. Para entender por qué un caso se comportó así, usas Show activity map, que explica la secuencia de decisiones del agente. Y para medir el efecto de un cambio, usas Compare with: comparas dos ejecuciones del mismo test set, y unas flechas marcan los casos que pasaron de fallar a pasar, o al revés. Los resultados están disponibles en Copilot Studio durante ochenta y nueve días; para conservarlos más tiempo se exportan a CSV, con pregunta, respuesta esperada, método, puntuación, respuesta del agente, resultado y análisis. Piensa en Contoso: corren la evaluación antes y después de cambiar las instrucciones.",
  "reto": {
   "text": "Ejecuta un test set dos veces con un cambio de instrucciones entre medio.\nUsa Compare with y mira qué casos cambiaron.\nExporta los resultados a CSV.",
   "minutes": 15
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results"
 },
 {
  "id": "L38",
  "skills": [
   "3.2a",
   "3.2b"
  ],
  "title": "Soluciones y agentes",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Todo agente vive en una solución",
    "body": "Todo agente se crea dentro de una solución: la default solution, salvo que definas una preferred solution. Para mover agentes entre entornos, crea una solución personalizada con tu propio publisher y prefijo.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Solución</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">unmanaged</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Export</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">managed</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Entorno</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">destino</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">Se desarrolla unmanaged, se despliega managed</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "Tras agregar topics o flows nuevos, usa Advanced, Add required objects antes de exportar. Al importar, configura de nuevo la autenticación y publica. Para quitar cambios locales de un agente managed: Solution Layers, capa unmanaged, Remove unmanaged layer.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Solución NexoCore</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Publisher</span><span style=\"text-align:right\">Contoso, prefijo nexo</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Preferred solution</span><span style=\"text-align:right\">NexoCore</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Antes de exportar</span><span style=\"text-align:right\">Add required objects</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden por qué no exporta: un topic con puntos en el nombre. Trampa: cambiar el publisher de un componente en una solución managed; no es posible."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Un solo publisher. Unmanaged se desarrolla; managed se despliega. Quitar el agente no quita sus componentes."
   }
  ],
  "narration": "Todo agente en Copilot Studio se crea dentro de una solución: la default solution, salvo que hayas definido una preferred solution. Para mover agentes entre entornos conviene una solución personalizada con tu propio publisher y su prefijo, y mantener uno solo, porque no puedes cambiar el publisher de un componente en una solución managed. Las soluciones unmanaged se desarrollan; las managed se despliegan, y se generan exportando la unmanaged como managed. Los componentes que agregas después de poner el agente en la solución, como topics o flows nuevos, deben añadirse también antes de exportar, con Advanced y Add required objects. Quitar un agente de la solución no quita sus componentes. Tras importar, hay que configurar de nuevo la autenticación y publicar. Para eliminar los cambios locales de un agente managed, abres Solution Layers, seleccionas la capa unmanaged y eliges Remove unmanaged layer. Una trampa de exportación: no puedes exportar una solución con un topic cuyo nombre tenga puntos. Piensa en Contoso y su solución NexoCore.",
  "reto": {
   "text": "Crea una solución con tu propio publisher.\nEstablécela como preferred solution y crea un agente en ella.\nExporta como managed e importa en otro entorno.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-overview"
 },
 {
  "id": "L39",
  "skills": [
   "3.2c"
  ],
  "title": "Environment variables",
  "premium": false,
  "screens": [
   {
    "kind": "idea",
    "heading": "Mismo agente, valores por entorno",
    "body": "Una environment variable viaja con la solución, y su valor se da por entorno al importar o desplegar. Tipos: Decimal number, Text, JSON, Two options, Data source y Secret.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Environment variable</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Definición</span><span style=\"text-align:right\">viaja en la solución</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Default value</span><span style=\"text-align:right\">se exporta</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Current value</span><span style=\"text-align:right\">por entorno; se puede quitar antes de exportar</span></div></div>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "La URL base de la API cambia entre Dev y Test: Text. La clave es Secret: guarda solo una referencia a Azure Key Vault. Hay que registrar el resource provider Microsoft.PowerPlatform en la suscripción, y dar el rol Key Vault Secrets User.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Variables de NexoCore</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">ApiBaseUrl (Text)</span><span style=\"text-align:right\">distinto en Dev y Test</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">ApiKey (Secret)</span><span style=\"text-align:right\">referencia a Key Vault</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Rol necesario</span><span style=\"text-align:right\">Key Vault Secrets User</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "En Copilot Studio son de solo lectura y el agente publicado trae los valores del momento de publicar: republica tras un cambio, salvo Secret, que se lee en runtime. Trampa: guardar el secreto real en Dataverse."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Secret = referencia a Key Vault (mismo tenant). Solo Azure Key Vault. Quita el current value antes de exportar para no llevar el de Dev."
   }
  ],
  "narration": "Las environment variables permiten que un mismo agente use valores distintos en cada entorno. La definición de la variable viaja dentro de la solución, y el valor se proporciona por entorno durante la importación o el despliegue con Pipelines. Los tipos son Decimal number, Text, JSON, Two options, Data source y Secret. El tipo Secret guarda una referencia a un secreto de Azure Key Vault: el secreto real no vive en Dataverse ni en la solución, y solo Azure Key Vault se admite como almacén. Para usarlo, hay que registrar el resource provider de Power Platform en la suscripción y dar el rol Key Vault Secrets User a quien lo crea, con el Key Vault en el mismo tenant. Antes de exportar, puedes quitar el current value para que no se exporte el valor de desarrollo. En Copilot Studio estas variables son de solo lectura: el agente publicado incluye los valores que tenían al publicarse, así que hay que republicar tras un cambio, excepto las de tipo Secret, que se recuperan en ejecución. Piensa en Contoso: URL base y clave de la a pe i.",
  "reto": {
   "text": "Crea una environment variable de tipo Text en tu solución.\nAñade el current value solo en Dev y exporta.\nImporta en Test y observa cómo pide el valor.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables"
 },
 {
  "id": "L40", "audio": "audio/L40.mp3",
  "skills": [
   "3.2d"
  ],
  "title": "Pipelines de Power Platform",
  "premium": true,
  "screens": [
   {
    "kind": "idea",
    "heading": "De Dev a Test sin atajos",
    "body": "Las pipelines despliegan soluciones managed. Se ven y ejecutan desde una solución unmanaged en el entorno de desarrollo. El mismo artefacto managed pasa por las etapas en orden; no se puede saltar QA.",
    "visual": "<svg viewBox=\"0 0 340 108\" role=\"img\" font-size=\"11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\" style=\"stroke:var(--accent)\" stroke-width=\"2\"/><text x=\"50.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Dev</text><text x=\"50.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">unmanaged</text><line x1=\"101\" y1=\"42\" x2=\"119\" y2=\"42\" style=\"stroke:var(--accent)\"/><polygon points=\"119,42 112.6,39.3 112.6,44.7\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><rect x=\"121\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"169.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Test</text><text x=\"169.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">managed</text><line x1=\"220\" y1=\"42\" x2=\"238\" y2=\"42\" style=\"stroke:var(--accent)\"/><polygon points=\"238,42 231.6,39.3 231.6,44.7\" fill=\"currentColor\" stroke=\"none\" style=\"fill:var(--accent)\"/><rect x=\"240\" y=\"18\" width=\"97\" height=\"48\" rx=\"6\"/><text x=\"288.5\" y=\"39\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">Prod</text><text x=\"288.5\" y=\"53\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\">managed</text><text x=\"170\" y=\"90\" text-anchor=\"middle\" stroke=\"none\" style=\"fill:var(--muted)\">El host guarda artefactos y respaldo</text></svg>"
   },
   {
    "kind": "como",
    "heading": "Caso Contoso",
    "body": "La pipeline NexoCore lleva Dev a Test, con connections, connection references y environment variables validadas antes de desplegar. Se extiende con un pre-deployment step (trigger OnPreDeploymentStarted) o con delegated deployments (OnApprovalStarted) usando un service principal.",
    "visual": "<div style=\"border:1px solid var(--muted);border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.5\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:6px\">Pipeline NexoCore</div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Host</span><span style=\"text-align:right\">entorno de producción</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Etapa 1</span><span style=\"text-align:right\">Dev a Test</span></div><div style=\"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--muted);padding:4px 0\"><span style=\"color:var(--muted)\">Extensión</span><span style=\"text-align:right\">OnPreDeploymentStarted</span></div></div>"
   },
   {
    "kind": "examen",
    "heading": "Lo que preguntan",
    "body": "Piden requisitos: host de producción (no tiene que ser managed); entornos Developer no managed; todos los demás deben ser Managed Environments. Trampa: usar unmanaged, otro tenant o más de una solución por despliegue."
   },
   {
    "kind": "recuerda",
    "heading": "Recuerda",
    "body": "Pre-deployment: UpdatePreDeploymentStepStatus, 20 completar, 30 rechazar. Delegado: UpdateApprovalStatus, 20 aprobar, 30 rechazar. Importación por defecto: Upgrade."
   }
  ],
  "narration": "Pipelines en Power Platform automatizan el despliegue de soluciones entre entornos, por ejemplo de desarrollo a prueba a producción. Despliegan soluciones managed: el mismo artefacto exportado pasa por las etapas en orden, así que nadie se salta la etapa de pruebas. Se ven y ejecutan desde una solución unmanaged en el entorno de desarrollo, no desde la default solution ni desde los destinos. Requisitos: el host debe ser un entorno de producción, no necesariamente managed; los entornos Developer no necesitan ser managed; todos los demás entornos de la pipeline deben ser Managed Environments. Se despliega una solución por vez, la importación por defecto es Upgrade, y no se puede desplegar entre tenants. Las connections, connection references y environment variables se proporcionan antes y se validan. Se extiende con un pre-deployment step, o con delegated deployments que corren como service principal. Piensa en Contoso y su pipeline de NexoCore. Detalle: las acciones de estado usan veinte para completar o aprobar, y treinta para rechazar.",
  "reto": {
   "text": "Crea un host de pipelines y una pipeline de Dev a Test.\nDespliega tu solución managed con una environment variable.\nAñade un pre-deployment step que apruebe con el estado veinte.",
   "minutes": 20
  },
  "source": "https://learn.microsoft.com/en-us/power-platform/alm/pipelines"
 }
];
