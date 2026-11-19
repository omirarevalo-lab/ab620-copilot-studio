import { q, CS, PAU } from './qlib.mjs';

/* =========================  1.1  Plan an agent solution  ========================= */

// 1.1a
q('1.1a', 2,
  'Contoso necesita que su agente registre facturas en una aplicación de escritorio heredada que solo tiene interfaz gráfica: no expone API, ni base de datos accesible, ni conector disponible. ¿Qué mecanismo de integración debes planificar?',
  'Una herramienta Computer use que opere la aplicación mediante visión y razonamiento sobre la interfaz',
  [
    'Un custom connector creado a partir de un archivo OpenAPI (Swagger 2.0) de la aplicación y compartido con toda la organización',
    'Una herramienta REST API cargando una especificación OpenAPI en JSON',
    'Un servidor MCP registrado con el asistente de incorporación (onboarding wizard)',
  ],
  'Computer use opera sitios web y aplicaciones de escritorio con interfaz gráfica mediante visión y razonamiento, sin necesidad de una API. Custom connector, REST API y MCP presuponen que el sistema expone una API o un servidor que hable ese protocolo, algo que aquí no existe. Recuerda que Computer use requiere generative orchestration y cuesta 5 Copilot Credits por paso con modelos estándar.',
  CS + 'computer-use');

q('1.1a', 2,
  'El equipo de plataforma de Contoso quiere exponer las mismas herramientas internas (consultar el estado de un servicio y buscar artículos de KB) a Copilot Studio y a otros frameworks de agentes de terceros, sin reescribirlas para cada plataforma. ¿Qué enfoque de integración eligen?',
  'Publicar un servidor MCP (Model Context Protocol) con transporte Streamable HTTP y conectarlo al agente',
  [
    'Crear un custom connector por cada plataforma y mantener una definición OpenAPI para cada una',
    'Encapsular cada herramienta en un agent flow con el trigger When an agent calls the flow',
    'Agregar un nodo Send HTTP request en cada topic que necesite la herramienta',
  ],
  'MCP es un protocolo abierto para exponer herramientas y recursos: un mismo servidor puede consumirse desde Copilot Studio y desde otros clientes compatibles. Custom connectors, agent flows y Send HTTP request son mecanismos propios de Power Platform y obligarían a duplicar el trabajo por plataforma. En Copilot Studio el transporte debe ser Streamable HTTP (SSE ya no se admite).',
  CS + 'agent-extend-action-mcp');

// 1.1b
q('1.1b', 1,
  'Publicarás un agente de soporte interno solo para empleados, disponible en Microsoft Teams y en Microsoft 365 Copilot. Los empleados no deben iniciar sesión manualmente y quieres usar User.DisplayName en los topics sin configurar un proveedor de identidad. ¿Qué opción de autenticación eliges?',
  'Authenticate with Microsoft',
  [
    'No authentication',
    'Authenticate manually con Generic OAuth 2',
    'Authenticate manually con Microsoft Entra ID V2 con certificados',
  ],
  'Authenticate with Microsoft configura Microsoft Entra ID de forma automática; en Teams el usuario ya está identificado y no se le pide iniciar sesión, y los canales Teams + Microsoft 365 solo admiten esta opción. No authentication permite que cualquiera con el enlace chatee, y las opciones manuales exigen configurar el proveedor y bloquean esos canales.',
  CS + 'configuration-end-user-authentication');

q('1.1b', 3,
  'Un agente para clientes externos se publicará en un sitio web propio. Los clientes iniciarán sesión con su cuenta de Google y el agente debe llamar a una API backend con el token del usuario (User.AccessToken). Elige dos configuraciones necesarias.',
  [
    'Seleccionar Authenticate manually',
    'Configurar Generic OAuth 2 como service provider apuntando a un proveedor compatible con OAuth 2',
  ],
  [
    'Seleccionar Authenticate with Microsoft, que expone User.AccessToken automáticamente para cualquier proveedor de identidad',
    'Dejar No authentication y enviar el token en un header fijo desde el topic',
    'Usar Microsoft Entra ID V2 con certificados, porque Google no necesita proveedor propio',
  ],
  'Los usuarios con una cuenta que no es de Microsoft requieren Authenticate manually y un proveedor OAuth 2 genérico; así quedan disponibles User.Id, User.DisplayName, User.AccessToken y User.IsLoggedIn. Authenticate with Microsoft no expone User.AccessToken y solo sirve para Teams/Microsoft 365; No authentication no identifica al usuario; las opciones de Entra ID solo sirven para identidades de Entra.',
  CS + 'configuration-end-user-authentication');

// 1.1c
q('1.1c', 2,
  'Publicaste una corrección en un topic, pero un probador con una conversación abierta en Microsoft Teams sigue viendo el comportamiento anterior. Quieres verificar el contenido nuevo de inmediato. ¿Qué haces?',
  'Escribir start over en la conversación para reiniciarla y que use el contenido más reciente publicado',
  [
    'Volver a publicar el agente una vez por cada canal conectado hasta que Teams reconozca los cambios',
    'Eliminar la app del agente en Teams y reinstalarla desde la tienda de aplicaciones después de cada cambio publicado',
    'Cambiar la autenticación a No authentication y publicar otra vez',
  ],
  'Publicar actualiza todos los canales conectados, pero el contenido nuevo solo se aplica al iniciar una sesión nueva (en la mayoría de canales tras 30 minutos de inactividad). En canales con conversaciones persistentes como Teams puedes escribir start over para forzar una sesión nueva; si no, puede tardar hasta una hora. No hace falta republicar por canal ni tocar la autenticación.',
  CS + 'publication-fundamentals-publish-channels');

q('1.1c', 3,
  'Como administrador quieres impedir que los makers publiquen agentes en WhatsApp y en Facebook, manteniendo Teams y el sitio web disponibles. Elige dos acciones en una data policy del Power Platform admin center.',
  [
    'Bloquear el conector WhatsApp channel in Copilot Studio',
    'Bloquear el conector Facebook channel in Copilot Studio',
  ],
  [
    'Bloquear el conector Direct Line channels in Copilot Studio',
    'Bloquear el conector Microsoft Teams + Microsoft 365 Channel in Copilot Studio',
    'Bloquear el conector HTTP',
  ],
  'Cada canal tiene su propio conector en las data policies, así que bloquear los de WhatsApp y Facebook los deshabilita para los makers. Direct Line channels cubre el Demo website, los sitios personalizados y las apps móviles, y el conector Teams + Microsoft 365 controla Teams: bloquearlos quitaría canales que quieres conservar. El conector HTTP gobierna los nodos Send HTTP request, no los canales.',
  CS + 'admin-data-loss-prevention');

// 1.1d
q('1.1d', 2,
  'Un topic de RR. HH. usa un Generative answers node sobre políticas internas sensibles. Cumplimiento exige el filtrado de contenido dañino más estricto posible para ese topic, aunque el agente genere menos respuestas. ¿Qué configuras?',
  'El content moderation level del Generative answers node en Highest',
  [
    'El moderation level del agente en Lowest, porque el nivel configurado en el topic se ignora',
    'Activar Allow ungrounded responses en los Generative AI settings del agente',
    'Bajar la temperature del prompt a 0 en el prompt builder',
  ],
  'La moderación puede fijarse a nivel de agente, de generative answers node y de prompt; en tiempo de ejecución prevalece la del topic. Highest aplica el filtro más estricto y genera menos respuestas, mientras que Lowest genera más respuestas con más riesgo de contenido dañino. Allow ungrounded responses y la temperatura no controlan el filtrado de contenido dañino.',
  CS + 'knowledge-copilot-studio');

q('1.1d', 3,
  'En una estrategia de IA responsable para un agente con generative orchestration quieres que las respuestas se apoyen en tus fuentes de conocimiento y que los usuarios sepan que parte de la conversación la genera IA. Elige dos acciones.',
  [
    'Desactivar Allow ungrounded responses en los Generative AI settings',
    'Agregar un mensaje en el system topic Conversation Start que avise de que algunas respuestas las genera IA',
  ],
  [
    'Establecer el content moderation level en Lowest para que el agente responda a más preguntas aunque aumente el riesgo de contenido dañino',
    'Activar Use information from the web para ampliar el origen de las respuestas',
    'Marcar todas las fuentes como Official source',
  ],
  'Con Allow ungrounded responses desactivado, el agente bloquea las respuestas de un turno en el que no usó ninguna fuente ni herramienta (se dispara el fallback). Avisar en Conversation Start es la buena práctica recomendada para informar de contenido generado por IA. Bajar la moderación aumenta el riesgo, la búsqueda web amplía el origen de las respuestas y Official source no es compatible con generative orchestration.',
  CS + 'knowledge-copilot-studio');

// 1.1e
q('1.1e', 2,
  'Antes de publicar, Copilot Studio ejecuta un security scan automático y advierte al maker cuando se modifican valores seguros por defecto. Elige tres cambios que generan esa advertencia.',
  [
    'Cambiar la autenticación del agente a No authentication',
    'Seleccionar Maker-provided credentials en Credentials to use de un conector o flow',
    'Compartir el agente con todos los usuarios de la organización',
  ],
  [
    'Activar Require users to sign in',
    'Cambiar el nombre visible del agente',
  ],
  'El scan avisa cuando se debilitan los valores por defecto: Authenticate with Microsoft pasa a No authentication (cualquiera con el enlace puede chatear), las credenciales de usuario final pasan a las del maker y el agente se comparte con toda la organización (por defecto no se comparte con nadie). Exigir inicio de sesión refuerza la seguridad y renombrar el agente no la afecta.',
  CS + 'security-scan');

q('1.1e', 3,
  'Una política exige que todo agente publicado requiera autenticación, y los makers no deben poder elegir No authentication. ¿Cómo lo aplica el administrador?',
  'Con una data policy que bloquea el conector Chat without Microsoft Entra ID authentication in Copilot Studio',
  [
    'Con una data policy que bloquea el conector Direct Line channels in Copilot Studio en todos los entornos del tenant',
    'Activando Require secured access en Web channel security de cada agente',
    'Bloqueando el conector HTTP en el entorno',
  ],
  'Bloquear Chat without Microsoft Entra ID authentication in Copilot Studio impide publicar agentes sin autenticación; los makers solo pueden elegir Authenticate with Microsoft o Authenticate manually. Bloquear Direct Line afecta a los canales web y móvil, Require secured access protege el acceso web con secretos o tokens pero no obliga a autenticar usuarios, y el conector HTTP solo controla los nodos Send HTTP request.',
  CS + 'admin-data-loss-prevention');

q('1.1e', 3,
  'Un administrador bloquea en una data policy el conector Knowledge source with documents in Copilot Studio para evitar que se suban archivos sensibles. Aun así, un maker agrega un archivo de SharePoint como knowledge source con Upload files > SharePoint. ¿Por qué ocurrió?',
  'Solo bloquea la carga de archivos locales; SharePoint y OneDrive tienen su propio conector',
  [
    'Las data policies no pueden bloquear knowledge sources, solo conectores de acciones y de canales, así que el bloqueo nunca tuvo efecto',
    'El bloqueo tarda hasta 24 horas en propagarse y después también cubrirá SharePoint',
    'SharePoint está exento de las data policies porque la identidad del usuario ya se valida con autenticación de Microsoft Entra ID',
  ],
  'Cada tipo de knowledge source tiene su propio conector: documentos locales, SharePoint/OneDrive y sitios web públicos. Bloquear uno no afecta a los otros. Para permitir o denegar endpoints concretos de SharePoint o de sitios públicos puedes usar endpoint filtering en vez de bloquear el conector completo.',
  CS + 'admin-data-loss-prevention');

// 1.1f
q('1.1f', 2,
  'Dos equipos mantienen agentes distintos en el mismo entorno y quieren compartir los mismos topics y un agent flow, gestionados desde un único lugar. Los autores de los agentes consumidores deben poder usarlos pero no modificarlos. ¿Qué usas?',
  'Una component collection conectada a ambos agentes',
  [
    'Copiar y pegar los topics y el flow en cada agente',
    'Un child agent dentro de cada agente',
    'Exportar un agente completo e importarlo con otro nombre',
  ],
  'Las component collections empaquetan topics, tools, knowledge, flows, entities, child agents y MCP para reutilizarlos. Una vez disponible en un agente, todos los autores pueden usarla pero no cambiar sus componentes: solo el creador o un system customizer/admin la edita. Copiar y pegar duplica y desincroniza, un child agent no se comparte entre agentes y exportar un agente completo es excesivo.',
  CS + 'authoring-export-import-copilot-components');

q('1.1f', 3,
  'Tu component collection incluye un custom connector y environment variables, y debes moverla de Dev a Producción conservando sus dependencias. ¿Cuál es el enfoque recomendado?',
  'Agregar la colección a una solución (Add existing > Agent > Component collection) y exportar e importar esa solución',
  [
    'Usar el botón Export de la propia colección, que siempre incluye conectores y variables de entorno',
    'Recrear manualmente el conector y las variables en Producción e importar solo la colección',
    'Exportar únicamente el agente principal, porque las colecciones viajan automáticamente con él',
  ],
  'Para colecciones complejas (por ejemplo con conectores o environment variables) se recomienda usar soluciones como portadoras: se agrega la colección a una solución, se exporta y se importa en el destino. El export directo de una colección la empaqueta como managed y está pensado para casos más simples. Exportar solo el agente no garantiza que viajen los componentes de la colección.',
  CS + 'authoring-export-import-copilot-components');

// 1.1g
q('1.1g', 3,
  'Publicarás un agente en un sitio web propio para clientes externos. Por defecto, cualquiera que conozca el ID del agente puede usar los canales Demo website y Custom website, y el código del cliente web es visible para los clientes. Elige dos medidas para asegurar el acceso.',
  [
    'Activar Require secured access en Web channel security',
    'Intercambiar el secreto por un token en el código de tu servicio y entregar solo el token al navegador',
  ],
  [
    'Incrustar el Secret 1 en el JavaScript de la página para que el navegador se autentique con cada solicitud al agente',
    'Mantener No authentication, porque el ID del agente funciona como una contraseña',
    'Elegir Authenticate with Microsoft para que los clientes externos inicien sesión en el sitio',
  ],
  'Con Require secured access los canales exigen que el cliente se autentique con un secreto o con un token generado con ese secreto. Si el código corre en el navegador, el secreto no debe exponerse: tu servicio lo intercambia por un token (válido para una sola conversación y que caduca si no se refresca) y solo entrega el token. Incrustar el secreto lo compromete, y No authentication deja el acceso abierto a quien conozca el ID.',
  CS + 'configure-web-security');

q('1.1g', 2,
  'Cumplimiento requiere que solo los miembros de un grupo de seguridad interno puedan chatear con el agente, y que ese control se haga con la opción Share del agente. ¿Qué configuración de autenticación lo permite?',
  'Authenticate with Microsoft: el usuario siempre está autenticado y Share controla quién puede chatear',
  [
    'No authentication: quien tenga el enlace puede chatear, pero lo limitas con Share',
    'Authenticate manually con Generic OAuth 2 y Require users to sign in desactivado',
    'Authenticate manually con Generic OAuth 2: Share controla qué usuarios de la organización pueden chatear',
  ],
  'Con Authenticate with Microsoft el usuario siempre inicia sesión (Require users to sign in queda activo) y la opción Share controla quién de la organización puede chatear. Con No authentication cualquiera con el enlace puede hablar con el agente, y con Generic OAuth 2 no puedes controlar con Share qué usuarios concretos de tu organización chatean con él.',
  CS + 'configuration-end-user-authentication');

/* =========================  1.2  Agent flows  ========================= */

// 1.2a
q('1.2a', 1,
  'Quieres que un agent flow pueda agregarse como herramienta de un agente. ¿Qué trigger y qué acción de respuesta debe tener?',
  'El trigger When an agent calls the flow y la acción Respond to the agent',
  [
    'El trigger Manually trigger a flow y la acción Respond to a PowerApp or flow',
    'El trigger When an HTTP request is received y la acción Response',
    'Un trigger Recurrence y la acción Send an email (V2)',
  ],
  'Para que un flow aparezca como tool del agente debe tener el trigger When an agent calls the flow y una acción Respond to the agent. Además debe estar publicado y responder en tiempo real (Asynchronous response en Off) dentro del límite de acción de 100 segundos. Los otros triggers y respuestas pertenecen a otros escenarios (Power Apps, webhooks, programaciones).',
  CS + 'flow-agent');

q('1.2a', 3,
  'Tu agent flow ya tiene el trigger When an agent calls the flow y una acción Respond to the agent, pero no aparece en la lista Flow al hacer Add a tool. Elige tres condiciones adicionales que debe cumplir.',
  [
    'Estar publicado',
    'Tener Asynchronous response en Off (respuesta en tiempo real) en la acción Respond to the agent',
    'Responder al agente dentro del límite de acción de 100 segundos',
  ],
  [
    'Estar en un entorno con licencia Power Automate Premium',
    'Tener activado Express mode obligatoriamente',
  ],
  'Un flow se puede agregar como herramienta si tiene trigger y acción de respuesta, está publicado, responde en tiempo real (Asynchronous response desactivado, bajo Networking) y contesta dentro del límite de 100 segundos. Los agent flows consumen capacidad de Copilot Studio, no licencias premium de Power Automate, y Express mode es opcional (preview).',
  CS + 'flow-agent');

// 1.2b
q('1.2b', 2,
  'Contoso quiere que las solicitudes de hardware pasen primero por una revisión automática con IA que rechace pedidos de más de 1500 USD o sin justificación, y después por la aprobación manual del gerente, todo dentro de una sola acción del flow. ¿Qué usas?',
  'La acción Run a multistage approval del conector Human review, con una AI stage seguida de una manual stage',
  [
    'La acción Request for information del conector Human review, enviando el monto y la justificación al gerente por Outlook',
    'Start and wait for an approval con el tipo Everyone must approve',
    'Una condición del flow que compare el monto con 1500 y envíe un correo al gerente para que responda manualmente',
  ],
  'Run a multistage approval (preview) combina etapas manuales (First to respond o Everyone must approve) y etapas de IA (instrucciones y entradas; devuelven Approve/Reject con una justificación), con condiciones entre etapas. Request for information solo recopila datos por Outlook, una aprobación básica no tiene etapa de IA y una condición con correo no es una aprobación formal.',
  CS + 'flows-advanced-approvals', true);

q('1.2b', 2,
  'Durante un flow necesitas que un compañero de TI, del mismo tenant, indique el asset tag de un equipo antes de continuar. Respondería desde su correo. ¿Qué acción es la adecuada?',
  'Request for information (Human review), que pausa el flow y envía la solicitud por Outlook',
  [
    'Run a multistage approval con una manual stage en la que el compañero escribe el asset tag como comentario',
    'Run a multistage approval con una AI stage',
    'Send an email (V2) al compañero y una acción Delay hasta que respondan, leyendo luego su correo de respuesta',
  ],
  'Request for information pausa el flow y pide datos (texto, sí/no, correo, número, fecha u opciones) a uno o varios asignados por Outlook, dentro del mismo tenant; gana la primera respuesta y las salidas quedan como contenido dinámico. Las aprobaciones devuelven decisiones Approve/Reject, no datos libres, y un Delay con correo no recibe la respuesta de forma estructurada.',
  CS + 'flows-request-for-information');

q('1.2b', 3,
  'Diseñas un flujo con Run a multistage approval. Elige dos afirmaciones correctas.',
  [
    'Entre etapas puedes usar conditions para enrutar, aprobar, rechazar u omitir etapas',
    'Una AI stage recibe instrucciones y entradas (texto, documentos, imágenes o knowledge) y devuelve Approve o Reject con una justificación',
  ],
  [
    'Puedes asignar al mismo aprobador a varias manual stages para acelerar el proceso',
    'Al importar la solución en otro entorno, el flujo de aprobación avanzada viaja con ALM sin tener que recrearlo ni reconfigurar las etapas',
    'Los archivos se envían directamente como adjuntos al aprobador',
  ],
  'Las conditions entre etapas permiten enrutar, aprobar, rechazar u omitir, y las AI stages devuelven una decisión con rationale. No se puede asignar el mismo aprobador a varias etapas manuales, las advanced approvals no tienen soporte ALM (hay que recrearlas tras importar), no se pueden compartir y no incluyen archivos adjuntos.',
  CS + 'flows-advanced-approvals', true);

// 1.2c
q('1.2c', 3,
  'Un agent flow con la acción Respond to the agent hace mucho procesamiento lógico (cálculos y transformaciones), mueve poca información de los conectores y a veces supera los dos minutos, por lo que el agente recibe un timeout. El agente necesita el resultado en el mismo turno. ¿Qué activas?',
  'Express mode en el flow',
  [
    'Asynchronous response, que devuelve el resultado mediante un callback posterior y no en el mismo turno',
    'Convertir el agent flow en un cloud flow de Power Automate con trigger manual',
    'Un Scope Try con retry policy exponencial en cada acción',
  ],
  'Express mode (preview) acelera flows con mucho procesamiento y poco volumen de datos para que completen dentro de la ventana de dos minutos; requiere el trigger When an agent calls a flow, una acción Respond to the agent y un plan de Copilot Studio. Asynchronous response permite superar los dos minutos pero entrega el resultado como callback posterior; un cloud flow o un retry policy no resuelven el tiempo de ejecución.',
  CS + 'agent-flow-express-mode', true);

q('1.2c', 2,
  'En un agent flow quieres enviar un texto a un modelo con instrucciones propias y entradas tipadas, y usar la respuesta en pasos posteriores. ¿Qué categoría y acción agregas?',
  'AI capabilities > Run a prompt',
  [
    'Human in the loop > Request for information',
    'Built-in tools > Parse JSON',
    'Connectors > HTTP',
  ],
  'Las acciones de un agent flow se agrupan en AI capabilities (generar texto, procesar documentos, run a prompt, llamar a un agente, responder al agente), Human in the loop (aprobaciones o información), Built-in tools (bucles, condiciones, operaciones de datos, fechas, child flows) y Connectors. Run a prompt está en AI capabilities.',
  CS + 'flows-overview');

// 1.2d
q('1.2d', 1,
  'Un agent flow falló varias veces hoy. ¿Dónde ves en Copilot Studio el historial de ejecuciones con su estado y duración, y puedes reenviar (resubmit) las que fallaron?',
  'En la pestaña Activity del flow',
  [
    'En la pestaña Designer',
    'En la pestaña Analytics, que lista cada ejecución con un botón Resubmit',
    'En la pestaña Overview, que conserva el historial completo de ejecuciones',
  ],
  'Activity muestra el historial de ejecuciones con estado y duración, permite entrar al detalle y reenviar o cancelar varias ejecuciones. Overview solo muestra detalles del flow (nombre, conexiones, propietarios) y las ejecuciones más recientes; Analytics resume la actividad (número de ejecuciones, tasa de errores y tendencias) y puede tardar hasta 30 minutos en reflejarlas.',
  CS + 'flow-manage-monitor');

q('1.2d', 2,
  'La capacidad prepagada de Copilot Studio de un entorno se agotó por completo. Elige dos afirmaciones correctas sobre lo que ocurre con los agent flows.',
  [
    'Las nuevas ejecuciones se bloquean hasta que haya capacidad, pero las que ya están en curso terminan con normalidad',
    'Los test runs (diseñador o test chat) y los usuarios con licencia Microsoft 365 Copilot no se ven afectados',
  ],
  [
    'Todas las ejecuciones en curso se cancelan de inmediato y el agente deja de responder por completo hasta el siguiente ciclo de facturación',
    'Los flows siguen ejecutándose y se facturan automáticamente como pay-as-you-go sin ninguna configuración',
    'Solo se bloquean los flows con conectores premium; el resto continúa normalmente',
  ],
  'Cada acción de un agent flow consume capacidad (13 Copilot Credits por cada 100 acciones). Al agotarse la capacidad prepagada, las nuevas ejecuciones se bloquean, las que están corriendo terminan con normalidad y el agente sigue respondiendo en interacciones sin flow. Los test runs (diseñador o test chat) y los usuarios con licencia M365 Copilot no se bloquean; para evitar interrupciones se puede vincular pay-as-you-go.',
  CS + 'flows-overview');

// 1.2e
q('1.2e', 2,
  'El flow CrearTicket debe devolver al agente el número de ticket generado para que un topic se lo muestre al usuario. ¿Cómo lo implementas?',
  'Definir un parámetro de salida en Respond to the agent y usarlo como variable en el nodo de la herramienta',
  [
    'Guardarlo con Set variable dentro del flow y leerlo después desde el topic como Global.Ticket, sin definir salidas',
    'Terminar el flow con Terminate y enviar el número en el campo Message',
    'Agregar un segundo trigger When an agent calls the flow con el número como input',
  ],
  'La acción Respond to the agent devuelve al agente los valores de salida del flow; esas salidas aparecen como variables en el nodo de herramienta del topic (o las usa el orquestador para redactar la respuesta). Las variables internas del flow no llegan al agente, Terminate detiene el flow y un segundo trigger no devuelve datos.',
  CS + 'flow-agent');

q('1.2e', 2,
  'Agregas un agent flow como herramienta de un agente con generative orchestration. Elige dos afirmaciones correctas sobre sus parámetros de entrada.',
  [
    'Por defecto cada input usa Dynamically fill with AI: el agente lo extrae del contexto o genera una pregunta al usuario',
    'Puedes fijar un valor con Fill using > Custom value (literal, variable o fórmula Power Fx), y entonces el agente no pregunta al usuario',
  ],
  [
    'Debes crear un nodo Question por cada input, porque el orquestador no puede pedir datos al usuario cuando falta un valor del flow',
    'Si fijas Custom value, el agente igualmente pregunta al usuario para confirmar el valor',
    'Los inputs solo se llenan automáticamente en classic orchestration',
  ],
  'Con generative orchestration el agente rellena las entradas de una herramienta desde el contexto o genera preguntas para pedirlas, por lo que no necesitas nodos Question para cada input. Si sobrescribes un input con Custom value, el agente no vuelve a preguntar. La recolección automática es una característica de generative orchestration, no de classic.',
  CS + 'add-tools-custom-agent');

// 1.2f
q('1.2f', 2,
  'Un flow ejecuta varias acciones y quieres capturar cualquier fallo del grupo en un único lugar para registrarlo y avisar al propietario. ¿Qué patrón aplicas?',
  'Agrupar las acciones en un Scope Try y crear un Scope Catch con Configure run after en has failed y has timed out',
  [
    'Configurar run after is successful en cada acción y comprobar manualmente el resultado de la anterior para detectar el error',
    'Poner una acción Terminate con estado Succeeded después de cada acción',
    'Aumentar el retry policy de todas las acciones a 10 reintentos',
  ],
  'Agrupar acciones en scopes permite un patrón try-catch: el scope Catch se ejecuta cuando el Try falla (run after has failed o has timed out) y con result() y Filter array obtienes el error para registrarlo o notificarlo. is successful solo ejecuta cuando todo salió bien, Terminate Succeeded oculta errores y los reintentos solo ayudan con fallos transitorios.',
  PAU + 'guidance/coding-guidelines/error-handling');

q('1.2f', 2,
  'Una acción HTTP de un flow falla de forma intermitente por problemas transitorios de red del servicio externo. ¿Qué configuración recomienda Microsoft?',
  'Un retry policy de tipo exponencial, con intervalo inicial y número máximo de reintentos',
  [
    'Un Scope Catch que elimine el flow cuando falle',
    'Una acción Terminate con estado Failed tras el primer error para que el propietario reciba el aviso',
    'Un retry policy none para no sobrecargar el servicio externo',
  ],
  'Un retry policy ayuda a recuperarse de fallos transitorios; los exponenciales se prefieren porque aumentan el intervalo entre reintentos y dan más tiempo a que el problema se resuelva. Se configuran en los ajustes de la acción (intervalo inicial y máximo de reintentos). Terminate y eliminar el flow no resuelven un fallo transitorio, y none no reintenta.',
  PAU + 'guidance/coding-guidelines/error-handling');

q('1.2f', 3,
  'En el Scope Catch de tu flow quieres identificar qué acción del Try falló y detener el flow marcándolo como fallido. Elige dos acciones.',
  [
    'Usar la expresión result() sobre el scope Try y filtrar el resultado con Filter array para obtener el error',
    'Agregar una acción Terminate con estado Failed y un mensaje que explique la causa',
  ],
  [
    'Configurar el scope Try con run after has failed para que se ejecute justo antes que el Catch y capture sus errores',
    'Configurar el scope Catch con run after is successful',
    'Eliminar el scope Try para que el error no se propague',
  ],
  'result() devuelve los resultados de las acciones del scope y Filter array permite quedarse con la que falló; Terminate con estado Failed detiene el flow y deja estado y mensaje para diagnóstico. El run after que debe configurarse es el del Catch respecto al Try (has failed o has timed out), no al revés; con is successful el Catch solo correría cuando no hay error.',
  PAU + 'guidance/coding-guidelines/error-handling');

/* =========================  1.3  Topics  ========================= */

// 1.3a
q('1.3a', 2,
  'Un topic debe llamar al agent flow BuscarEmpleado en un paso exacto de su conversación (después de preguntar el correo), y el flow no debe estar disponible en otros topics. ¿Qué haces?',
  'Agregarlo dentro del topic con Add node > Add a tool (topic-level tool), lo que crea un nodo Action',
  [
    'Agregarlo solo en la página Tools del agente como agent-level tool',
    'Llamarlo con un nodo Redirect hacia otro topic',
    'Convertirlo en una component collection compartida',
  ],
  'Un flow agregado a un topic solo está disponible para ese topic y se ejecuta en el punto del canvas donde lo coloques, creando un nodo Action. Un agent-level tool, en cambio, queda disponible para que el orquestador lo elija; Redirect solo transfiere la conversación a otro topic y una component collection sirve para compartir componentes entre agentes, no para limitar su uso a un topic.',
  CS + 'flow-agent');

q('1.3a', 3,
  'El agent flow Cancelar pedido es destructivo. Quieres que se ejecute solo cuando el topic de confirmación lo invoque explícitamente y que el orquestador nunca lo elija por su cuenta. ¿Qué configuras?',
  'Llamarlo desde el topic con Add a tool y desactivar Allow agent to decide dynamically when to use this tool',
  [
    'Activar Ask the end user before running y mantener activada la selección dinámica para que el usuario confirme cada llamada',
    'Cambiar Authentication a Maker-provided credentials',
    'Poner el toggle Enabled de la herramienta en Off',
  ],
  'Con Allow agent to decide dynamically desactivado, el agente solo usa la herramienta cuando se la llama de forma explícita desde un topic. Ask the end user before running solo pide confirmación pero el orquestador aún puede elegirla; cambiar a credenciales del maker no limita quién la llama; y poner Enabled en Off bloquea que el agente use la herramienta en cualquier caso.',
  CS + 'add-tools-custom-agent');

// 1.3b
q('1.3b', 1,
  'Quieres que el usuario elija obligatoriamente una de tres prioridades (Alta, Media o Baja) y que no pueda responder con texto libre. ¿Qué usas?',
  'Un nodo Question de opción múltiple (multiple choice)',
  [
    'Quick replies en un nodo Message',
    'Un nodo Message con tres message variations',
    'Una Adaptive Card con tres botones mostrada dentro de un nodo Message',
  ],
  'Los quick replies sugieren respuestas, pero el cliente puede ignorarlos y escribir libremente; para exigir que elija de una lista se usa un Question multiple choice. Las message variations solo eligen una redacción al azar y una Adaptive Card dentro de Message es informativa, no interactiva.',
  CS + 'authoring-send-message');

q('1.3b', 2,
  'Una herramienta devuelve variables (número de ticket, estado y SLA). Quieres un texto exacto, con formato y esos valores insertados, sin que el modelo reescriba la respuesta. ¿Qué opción de After running eliges?',
  'Send specific response, insertando las variables de salida',
  [
    'Don\'t respond (valor por defecto)',
    'Write the response with generative AI',
    'Desactivar Allow agent to decide dynamically when to use this tool',
  ],
  'Send specific response permite redactar una respuesta con plantilla y variables de salida (incluso con fórmulas Power Fx), sin intervención del modelo. Don\'t respond deja que el agente incorpore la salida en su propia respuesta, y Write the response with generative AI hace que la IA redacte la respuesta; ninguna garantiza el texto exacto.',
  CS + 'add-tools-custom-agent');

// 1.3c
q('1.3c', 2,
  'Tu agente usa classic orchestration (generative orchestration desactivada) y quieres que consulte una herramienta de Dataverse. ¿Cómo puede usarse la herramienta?',
  'Solo llamándola explícitamente desde un topic con un nodo Add a tool',
  [
    'El agente la elegirá automáticamente según su descripción',
    'Agregándola en la página Tools: classic orchestration la ejecuta según las trigger phrases',
    'No puede usarse: classic orchestration no admite herramientas',
  ],
  'En classic orchestration las herramientas solo pueden llamarse de forma explícita desde un topic; el orquestador generativo es el que las elige dinámicamente por nombre y descripción. Por eso las trigger phrases solo seleccionan topics, no herramientas, y sí puedes usar herramientas dentro de los topics.',
  CS + 'add-tools-custom-agent');

q('1.3c', 1,
  'Una herramienta elimina registros en Dataverse. Quieres que el usuario final confirme antes de que el agente la ejecute. ¿Qué ajuste de Additional details configuras?',
  'Ask the end user before running en Yes',
  [
    'Authentication en Maker-provided credentials',
    'After running en Don\'t respond',
    'Fill using en Custom value',
  ],
  'Ask the end user before running (No por defecto) hace que el agente pida confirmación al usuario antes de ejecutar la herramienta. Authentication define con qué credenciales corre, After running controla cómo responde después y Fill using define cómo se llenan sus entradas.',
  CS + 'add-tools-custom-agent');

// 1.3d
q('1.3d', 1,
  'Necesitas una instrucción de una sola vuelta que reciba el texto de un ticket, lo clasifique con un modelo de lenguaje y devuelva el resultado, y que puedas usar en un topic o como herramienta del agente. ¿Qué tipo de herramienta creas?',
  'Un Prompt (custom prompt) creado con el prompt builder',
  [
    'Un child agent',
    'Un Generative answers node sobre un sitio web público',
    'Una herramienta REST API',
  ],
  'Un prompt es una herramienta de un solo turno basada en un modelo, con instrucciones, entradas y opcionalmente conocimiento; puede agregarse como herramienta del agente (Tools > New tool > Prompt), como nodo en un topic (Add a tool > New prompt) o como acción Run a prompt en un agent flow. Un child agent es más pesado, un generative answers node responde sobre conocimiento y REST API llama a una API.',
  CS + 'nlu-prompt-node');

q('1.3d', 3,
  'Al abrir el prompt builder, el slider de Temperature aparece deshabilitado. ¿Cuál es la causa más probable?',
  'Seleccionaste el modelo GPT-5 reasoning, que no admite el ajuste de temperatura',
  [
    'El agente usa Authenticate manually',
    'La temperatura solo puede cambiarse en los Generative AI settings del agente, no en el prompt builder',
    'El content moderation level del prompt está en High',
  ],
  'La temperatura (de 0 a 1; 0 por defecto) controla el equilibrio entre respuestas predecibles y creativas, y no está disponible para el modelo GPT-5 reasoning, por lo que el slider se deshabilita. Se configura en los ajustes del prompt, no del agente, y no depende de la autenticación ni del nivel de moderación.',
  CS + 'prompt-model-settings');

// 1.3e
q('1.3e', 3,
  'Los datos de inventario están solo en una API interna que ninguna knowledge source soportada cubre. Quieres que un Generative answers node responda únicamente con la respuesta de esa API. Elige tres configuraciones.',
  [
    'Convertir la respuesta de Send HTTP request en una Table y pasarla al campo Custom data (Classic data)',
    'Activar Search only selected sources y no seleccionar ninguna knowledge source',
    'Mantener desactivados Web search y Allow the AI to use its own general knowledge',
  ],
  [
    'Agregar la URL de la API como Public website knowledge source',
    'Subir cada hora la respuesta JSON como documento en Dataverse',
  ],
  'Para responder solo con datos propios se pasa una tabla al campo Custom data (en Classic data), se activa Search only selected sources sin seleccionar fuentes para que el nodo no busque en knowledge sources, y se dejan desactivadas la búsqueda web y el conocimiento general de la IA. Una API privada no es un sitio web público, y subir archivos periódicamente es innecesario.',
  CS + 'nlu-boost-node');

q('1.3e', 3,
  'Pasas al campo Custom data una tabla con 10 registros (Content, ContentLocation y Title), pero las respuestas parecen basarse siempre en los mismos pocos registros. ¿Cuál es la razón?',
  'Solo se usan los tres primeros registros de la tabla para generar la respuesta',
  [
    'Title es obligatorio y los registros sin Title se descartan',
    'ContentLocation debe ser una ruta de archivo local, no una URL',
    'Custom data solo admite un registro por llamada',
  ],
  'Custom data recibe una tabla con Content (obligatorio), ContentLocation (URL de la cita, opcional) y Title (opcional), pero solo se usan los tres primeros registros para generar la respuesta. Por eso conviene ordenar y filtrar la tabla antes de pasarla al nodo.',
  CS + 'nlu-generative-answers-custom-data');

// 1.3f
q('1.3f', 2,
  'Tu nodo Send HTTP request a veces devuelve 404. Quieres que el topic continúe, lea el código de estado y le explique al usuario qué pasó, en vez de disparar el mensaje de error del sistema. ¿Qué configuras?',
  'En Error handling elegir Continue on error y asignar variables al status code y al error response body',
  [
    'Subir el Request timeout a 120 segundos',
    'Marcar el nodo con Allow switching to another topic',
    'Dejar Raise an error y capturar el error en el system topic On Error para continuar el topic original con el código de estado',
  ],
  'Por defecto el nodo usa Raise an error: se detiene la operación y se dispara el system topic On Error. Con Continue on error se guardan el código de estado y el cuerpo del error (tipo Any, que puedes convertir con Parse value) y el topic sigue. El timeout (30 segundos por defecto) no resuelve un 404 y On Error no devuelve el control al topic original.',
  CS + 'authoring-http-node');

q('1.3f', 2,
  'Necesitas enviar un POST cuyo cuerpo incluya valores de variables del topic (por ejemplo Topic.Titulo y Topic.Prioridad). Elige dos pasos.',
  [
    'En Headers and body > Body, elegir JSON Content',
    'Usar Edit JSON > Formula y escribir un objeto Power Fx que referencie las variables',
  ],
  [
    'Dejar Body en No Content; las variables se añaden solas como query string de la URL del endpoint',
    'Elegir Raw content, que no admite variables',
    'Cambiar el método a GET para que acepte un cuerpo dinámico',
  ],
  'En JSON Content puedes escribir un objeto JSON o, con Edit JSON > Formula, un objeto Power Fx que referencia variables y que se convierte a JSON al hacer la solicitud. Body es No Content por defecto (típico en GET); Raw content también se escribe con fórmula Power Fx, por lo que sí admite variables.',
  CS + 'authoring-http-node');

// 1.3g
q('1.3g', 2,
  'Un topic sensible debe responder usando solo un sitio de SharePoint aprobado y sin mezclar resultados de las otras knowledge sources del agente. Elige dos configuraciones del Generative answers node.',
  [
    'Activar Search only selected sources',
    'Seleccionar únicamente ese sitio de SharePoint en la lista de fuentes',
  ],
  [
    'Dejar Search only selected sources desactivado (valor por defecto) y confiar en que el nodo prioriza SharePoint',
    'Activar Search only selected sources sin seleccionar ninguna fuente',
    'Desactivar todas las fuentes a nivel de agente',
  ],
  'Con Search only selected sources activado, las fuentes que selecciones reemplazan a las del agente para ese nodo (sin fallback a ellas). Desactivado (por defecto) el nodo busca en todas las fuentes del agente, y sin seleccionar ninguna el nodo no busca en knowledge sources (útil solo con custom data). Desactivar las del agente afectaría al resto de topics.',
  CS + 'nlu-boost-node');

q('1.3g', 3,
  'En un Generative answers node desmarcaste Send a message y guardaste la respuesta en una variable global para mostrarla en una Adaptive Card. En Teams los usuarios ya no ven los enlaces de las citas. ¿Por qué?',
  'En Teams las citas automáticas solo se devuelven en respuestas sin personalizar; en las personalizadas debes renderizarlas tú',
  [
    'Teams no admite citas en ningún caso, solo texto sin enlaces ni referencias',
    'Las citas se desactivan porque el content moderation level es High',
    'Las Adaptive Cards eliminan siempre las citas; hay que usar un nodo Message',
  ],
  'Al borrar Send a message y mostrar la respuesta personalizada (por ejemplo en una Adaptive Card), Copilot Studio ya no añade las citas automáticamente en Teams; debes incluir su renderizado en tu respuesta. Teams sí admite citas y la moderación no las elimina.',
  CS + 'nlu-boost-node');

// 1.3h
q('1.3h', 2,
  'Necesitas un formulario con Input.Text para la descripción, Input.ChoiceSet para la prioridad y un botón Submit, y que los valores queden en variables del topic. ¿Qué nodo usas?',
  'Ask with adaptive card, con una card que incluya al menos un Action.Submit',
  [
    'Un nodo Message con una Adaptive Card agregada desde Add > Adaptive card y un botón Action.Submit',
    'Un nodo Question de tipo Boolean',
    'Un nodo Send an event',
  ],
  'El nodo Adaptive Card (Ask with adaptive card) es para cards interactivas: muestra la card, exige al menos un botón submit y crea automáticamente variables de salida a partir de los inputs (editables con Edit Schema). Message y Question muestran cards informativas no interactivas.',
  CS + 'authoring-ask-with-adaptive-card');

q('1.3h', 3,
  'Tu Adaptive Card usa elementos de versión 1.6 y una acción Action.Execute. Se ve bien en el test chat, pero falla al entregarla en Teams y en el web chat. ¿Qué haces?',
  'Rediseñarla con schema 1.5 y Action.Submit: Teams está limitado a 1.5 y Web Chat no admite Action.Execute',
  [
    'Publicar de nuevo el agente: el canvas solo muestra la versión 1.6 tras publicar',
    'Cambiar la autenticación a Authenticate manually',
    'Subir el schema a 1.7, que es el que soportan Teams y Web Chat',
  ],
  'Copilot Studio admite schemas 1.6 y anteriores, pero depende del host: Web Chat soporta 1.6 pero no Action.Execute, y tanto el live chat widget como Teams se limitan a 1.5. El test chat renderiza cards 1.6 (el canvas no), por eso allí se ve bien. Publicar o cambiar la autenticación no cambia el soporte del host.',
  CS + 'adaptive-cards-overview');

// 1.3i
q('1.3i', 1,
  'Un valor capturado en el topic A debe estar disponible en cualquier otro topic durante la misma conversación. ¿Qué haces?',
  'Cambiar el scope de la variable a global (prefijo Global.)',
  [
    'Dejarla como topic variable, que es visible en todos los topics',
    'Convertirla en una environment variable',
    'Guardarla en una system variable',
  ],
  'Las topic variables solo existen en el topic donde se crean (scope por defecto); al cambiar el scope a global se pueden usar en todos los topics. Las system variables las crea Copilot Studio y las environment variables se crean en Power Platform y son de solo lectura en Copilot Studio.',
  CS + 'authoring-variables-about');

q('1.3i', 2,
  'Creaste una variable asignándole el valor inicial 1. Más tarde intentas asignarle la cadena apples y recibes un error. ¿Por qué?',
  'El tipo de la variable queda fijado en la primera asignación (Number) y no admite valores de otro tipo',
  [
    'Las topic variables solo admiten números',
    'Las cadenas solo pueden asignarse a variables globales',
    'Hay que declarar el tipo previamente en Variable properties antes de asignar valores',
  ],
  'Una variable toma su tipo base cuando se le asigna un valor por primera vez (aquí Number); después el tipo es fijo y asignar un String genera un error. Los tipos disponibles incluyen String, Boolean, Number, Table, Record, DateTime, Choice y Blank.',
  CS + 'authoring-variables-about');
