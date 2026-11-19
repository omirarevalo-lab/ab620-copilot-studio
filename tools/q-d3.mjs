import { q, CS, PP, PA } from './qlib.mjs';

/* =========================  3.1  Evaluate agents  ========================= */

// 3.1a Create test set
q('3.1a', 2,
  'Vas a importar un archivo para crear un test set de respuesta única (single response). Elige dos requisitos del archivo.',
  [
    'Formato CSV o TXT con las columnas Question y Expected response, en ese orden',
    'Máximo 100 preguntas, cada una de hasta 1000 caracteres',
  ],
  [
    'Formato XLSX con una hoja por método de evaluación y una columna de pass score',
    'Hasta 500 preguntas por archivo',
    'La columna Expected response es obligatoria para poder importar',
  ],
  'El archivo debe ser CSV o TXT con los encabezados Question y Expected response, hasta 100 preguntas y 1000 caracteres por pregunta. Las respuestas esperadas son opcionales al importar, pero se necesitan para ejecutar Compare meaning, Text similarity o Exact match.',
  CS + 'analytics-agent-evaluation-create');

q('3.1a', 2,
  'Quieres evaluar tu agente con preguntas reales de usuarios sobre «facturación y pagos», agrupadas en los analytics del agente. ¿Cómo creas ese test set?',
  'En Monitor > Themes, eliges Evaluate sobre el tema para generar el test set con preguntas reales',
  [
    'Con Quick question set, que genera diez preguntas a partir de la descripción, las instrucciones y las capacidades del agente',
    'Con Use your test chat conversation, usando el último test chat',
    'Con Full question set basado en Topics',
  ],
  'Los test sets basados en themes (preview) se generan desde las preguntas reales de los usuarios agrupadas en temas de la página Monitor, con la acción Evaluate. Quick question set genera 10 preguntas desde la descripción y capacidades del agente, el test chat usa tus propias preguntas de prueba y Full question set genera desde knowledge o topics.',
  CS + 'analytics-agent-evaluation-create', true);

q('3.1a', 3,
  'Intentas generar un test set de respuesta única a partir de una carpeta de SharePoint y la generación falla. ¿Qué restricción explica el problema?',
  'Solo se admiten archivos individuales de SharePoint (no carpetas), de hasta 5 MB',
  [
    'Solo se admiten sitios completos de SharePoint',
    'Los archivos deben pesar más de 50 MB',
    'La generación solo funciona con sitios web públicos indexados por Bing',
  ],
  'Para generar casos desde conocimiento se pueden usar texto, Word, Excel, PDF y archivos individuales de SharePoint (no carpetas), con un máximo de 5 MB por archivo. La generación también falla si alguna pregunta viola la configuración de content moderation del agente.',
  CS + 'analytics-agent-evaluation-create');

q('3.1a', 3,
  'Tu agente usa Authenticate manually con Microsoft Entra ID y el equipo de QA quiere automatizarlo con agent evaluation. ¿Cuál es la restricción?',
  'Solo admiten agentes con No authentication o Authenticate with Microsoft, no con Authenticate manually',
  [
    'Solo admiten agentes con Authenticate manually y un proveedor OAuth 2 genérico configurado',
    'Requieren un test set de más de 100 casos para que los resultados sean estadísticamente válidos',
    'Solo funcionan con agentes que usan Fabric data agents',
  ],
  'Agent evaluation solo admite agentes configurados con No authentication o Authenticate with Microsoft, y tampoco admite Fabric data agents. Si el agente necesita autenticación para conocimiento o herramientas, se elige un user profile de prueba (cuenta) en Manage profile and connections.',
  CS + 'analytics-agent-evaluation-intro');

// 3.1b Choose evaluation method
q('3.1b', 2,
  'Para una pregunta sobre horarios, el agente puede responder «Abrimos de 9 a 5 de lunes a viernes» o «Nuestro horario es de lunes a viernes, de 9:00 a 17:00». Ambas son correctas y quieres que pasen. ¿Qué método usas?',
  'Compare meaning con un pass score (50 por defecto)',
  [
    'Exact match con la respuesta esperada',
    'Text similarity con un pass score alto para exigir una redacción casi idéntica',
    'Tool use con el topic de horarios como esperado',
  ],
  'Compare meaning evalúa la similitud de intención entre la respuesta y la esperada, así que tolera redacciones distintas con el mismo significado (pass score por defecto 50). Exact match exige coincidencia carácter por carácter, Text similarity mide la similitud de redacción con coseno y Tool use solo verifica qué herramientas o topics se usaron.',
  CS + 'analytics-agent-evaluation-overview');

q('3.1b', 1,
  'Quieres comprobar que, ante la pregunta por un número de factura, el agente devuelve exactamente INV-20481, sin variaciones. ¿Qué método usas?',
  'Exact match',
  [
    'Compare meaning',
    'General quality',
    'Custom con labels Compliant y Non-compliant',
  ],
  'Exact match comprueba que la respuesta coincide con la esperada carácter por carácter y palabra por palabra; es ideal para respuestas cortas y precisas como números, códigos o frases fijas. Compare meaning y General quality toleran variaciones de redacción.',
  CS + 'analytics-agent-evaluation-overview');

q('3.1b', 2,
  'Quieres validar que, ante «Necesito una licencia de Visio», el agente invoca el agent flow CrearTicket y no responde solo con conocimiento. ¿Qué método usas?',
  'Tool use con CrearTicket como herramienta esperada',
  [
    'Keyword match con Any y la palabra ticket en la respuesta esperada del agente',
    'General quality',
    'Content safety con umbral 0',
  ],
  'Tool use comprueba si el agente usó las herramientas o topics esperados (pasa/falla) y se configura por caso de prueba; un caso sin herramientas esperadas produce un resultado Invalid. Keyword match solo revisa palabras en la respuesta, General quality evalúa calidad y Content safety evalúa contenido dañino.',
  CS + 'analytics-agent-evaluation-overview');

q('3.1b', 3,
  'Tus test cases incluyen preguntas fuera de alcance en las que el agente debe negarse a responder, y General quality marca esas respuestas como mejorables. ¿Qué haces para que una negativa correcta cuente como aprobada?',
  'Agregar un método Custom con instrucciones y labels (por ejemplo, Appropriate refusal = Pass)',
  [
    'Bajar el pass score de General quality a 0 para que cualquier negativa del agente cuente como aprobada en todos los casos',
    'Usar Exact match con la frase exacta de rechazo del agente como respuesta esperada',
    'Cambiar a Content safety con severidad 7 para que las negativas siempre superen el umbral',
  ],
  'General quality incluye el criterio de abstención (si el agente intentó responder), por lo que una negativa correcta puede marcarse como mejorable. Un método Custom permite definir instrucciones y al menos dos labels con resultado Pass o Fail, por ejemplo una etiqueta de rechazo apropiado que cuente como aprobada.',
  CS + 'analytics-agent-evaluation-overview');

q('3.1b', 2,
  'Al configurar métodos para un test set de respuesta única, algunos requieren definir un pass score. Elige dos métodos que lo requieren.',
  [
    'Compare meaning',
    'Text similarity',
  ],
  [
    'Exact match',
    'Keyword match',
    'Tool use',
  ],
  'Compare meaning (similitud de significado, pass score por defecto 50) y Text similarity (similitud de redacción con coseno entre 0 y 1) se puntúan y necesitan un umbral. Exact match, Keyword match y Tool use son pass/fail, y Custom pasa o falla según los labels definidos.',
  CS + 'analytics-agent-evaluation-overview');

q('3.1b', 2,
  'Cumplimiento quiere que cualquier respuesta con contenido violento más que mínimo falle la prueba, con el umbral más estricto posible. ¿Qué configuras en Content safety?',
  'Content safety para Violence con el severity threshold en 0, el nivel más estricto',
  [
    'Un método de Content safety para Violence con el threshold en 7',
    'Un único método de Content safety que cubra a la vez los cuatro tipos de contenido dañino',
    'General quality con un pass score de 100',
  ],
  'Content safety evalúa hatefulness y unfairness, sexual content, violence y self-harm; el umbral de severidad va de 0 (el más estricto) a 7 (el más permisivo, deja pasar contenido gráfico o extremo) y hay que agregar un método separado por cada tipo de contenido. General quality no mide contenido dañino.',
  CS + 'analytics-agent-evaluation-overview');

// 3.1c Review results
q('3.1c', 2,
  'Cambiaste las instrucciones del agente y quieres ver qué casos mejoraron o empeoraron respecto a la ejecución anterior del mismo test set. ¿Qué usas?',
  'La opción Compare with en los resultados, tras ejecutar el mismo test set al menos dos veces',
  [
    'Crear un test set nuevo con otro nombre',
    'Exportar ambas ejecuciones a CSV y comparar manualmente, porque no existe una comparación integrada',
    'Show activity map de un caso individual',
  ],
  'Con Compare with se comparan dos ejecuciones del mismo test set: flechas indican los casos que pasaron de fallar a pasar o al revés, y el panel muestra la comparación directa de puntuaciones. Show activity map explica la secuencia de decisiones de un caso, pero no compara ejecuciones.',
  CS + 'analytics-agent-evaluation-results');

q('3.1c', 2,
  'Tras ejecutar un test set con Compare meaning, varios casos aparecen como Invalid. ¿Cuál es la causa más probable?',
  'Esos casos no tienen una expected answer para el método seleccionado',
  [
    'El agente respondió con un error de red en esos casos',
    'El pass score está configurado en 100',
    'El test set superó el máximo de 100 casos',
  ],
  'Cada caso recibe Pass, Fail, Invalid o Error. Un caso sin las respuestas esperadas, palabras clave o herramientas que necesita el método produce Invalid para ese método; los errores de ejecución se reportan como Error y un pass score alto produce Fail, no Invalid.',
  CS + 'analytics-agent-evaluation-overview');

q('3.1c', 2,
  'Necesitas conservar los resultados de evaluación durante un año para auditoría. ¿Qué debes hacer?',
  'Exportarlos a CSV, porque los resultados están disponibles en Copilot Studio solo 89 días',
  [
    'Nada: los resultados se conservan indefinidamente y se incluyen en el respaldo del agente',
    'Compartir el agente con el rol agent viewer para que otros usuarios conserven una copia',
    'Subir el pass score de los métodos',
  ],
  'Los resultados de las evaluaciones están disponibles en Copilot Studio durante 89 días; para conservarlos más tiempo se exportan a CSV (pregunta, respuesta esperada, método, puntuación, respuesta del agente, resultado y análisis). El rol agent viewer solo permite ver y gestionar evaluaciones de otros makers y no cambia la retención de 89 días.',
  CS + 'analytics-agent-evaluation-results');

/* =========================  3.2  ALM  ========================= */

// 3.2a Create solution
q('3.2a', 2,
  'Creas un agente nuevo sin haber configurado nada y más adelante necesitarás moverlo entre entornos. ¿Dónde se creó y qué haces para que los agentes nuevos se creen en tu propia solución?',
  'En la default solution; con una preferred solution propia, los agentes nuevos se crean en ella',
  [
    'Se crea en una solución managed del tenant y no se puede cambiar',
    'Se crea sin solución y hay que agregarlo luego con Add existing',
    'Se crea en la solución del entorno de producción',
  ],
  'Todo agente se crea dentro de una solución: la default solution, salvo que se haya definido una preferred solution. Para mover agentes entre entornos conviene una solución personalizada: se crea y se marca como preferred solution, o se agrega el agente con Add existing.',
  CS + 'authoring-solutions-overview');

q('3.2a', 2,
  'Tu equipo creará la solución NexoCore con componentes que usarán el prefijo nexo. ¿Qué buena práctica sigues?',
  'Crear un publisher propio con ese prefijo antes de crear componentes y reutilizarlo en todos los entornos',
  [
    'Usar el publisher por defecto y cambiar el prefijo cuando haga falta',
    'Crear un publisher distinto en cada entorno para evitar colisiones',
    'Esperar a tener componentes creados para definir el prefijo',
  ],
  'Cada solución tiene un publisher con un prefijo que evita colisiones de nombres. Conviene crear el propio (no usar el predeterminado) y mantener uno solo de forma consistente, porque no se puede cambiar el publisher de un componente en una solución managed. El prefijo debe definirse antes de crear metadatos, ya que los nombres no se pueden cambiar después.',
  PP + 'alm/solution-concepts-alm');

q('3.2a', 3,
  'Al exportar la solución que contiene tu agente, la exportación falla. Descubres que algunos topics tienen nombres como «Estado.Ticket.v2». ¿Cuál es la causa y la solución?',
  'Los nombres de topics con puntos impiden exportar la solución; hay que renombrar los topics sin puntos',
  [
    'El agente debe ser managed para poder exportarse',
    'Los nombres de topics deben ser únicos entre todos los entornos del tenant, por lo que hay que añadir un sufijo con el entorno',
    'Hay que eliminar los comentarios de los topics antes de exportar',
  ],
  'No es posible exportar una solución que contenga un agente con puntos en el nombre de alguno de sus topics; la solución es renombrarlos sin puntos. Los comentarios a nivel de topic o nodo no se exportan, pero eso no impide la exportación, y las soluciones managed no se pueden exportar.',
  CS + 'authoring-topic-management');

q('3.2a', 2,
  'Desarrollas en Dev con una solución unmanaged y debes entregar a Test y Producción. ¿Cuál es la práctica recomendada?',
  'Exportar la solución unmanaged como managed, importarla en Test y Producción y conservar la unmanaged como fuente',
  [
    'Exportar la solución managed directamente desde Dev, porque las managed se exportan sin más y no requieren generarse desde una unmanaged',
    'Importar la solución unmanaged en Producción para poder editar allí',
    'Importar la managed en el mismo entorno Dev para probarla',
  ],
  'Las soluciones unmanaged se desarrollan; las managed se despliegan en entornos distintos del de desarrollo y se generan exportando la unmanaged como managed (artefacto de build). No se puede exportar una solución managed, ni importarla en el entorno que contiene su unmanaged de origen.',
  PP + 'alm/solution-concepts-alm');

// 3.2b Add existing agents to solution
q('3.2b', 3,
  'Agregaste tu agente a la solución NexoCore. Después creaste dos topics nuevos y un agent flow en Copilot Studio. Al importar en Test faltan esos componentes. ¿Qué te faltó antes de exportar?',
  'Agregar los objetos requeridos (Advanced > Add required objects) sobre el agente y los workflows',
  [
    'Publicar el agente tres veces',
    'Exportar la solución como managed y como unmanaged por separado y combinar ambos paquetes',
    'Quitar el agente de la solución y volver a agregarlo',
  ],
  'Los componentes que agregas a un agente después de ponerlo en una solución (topics, flows) deben agregarse también a la solución antes de exportar, con Advanced > Add required objects. Quitar un agente de la solución no quita sus componentes, y publicar o exportar de otra forma no incluye lo que falta.',
  CS + 'authoring-solutions-import-export');

q('3.2b', 2,
  'Importaste la solución con tu agente en el entorno Test. ¿Qué debes hacer antes de compartirlo con usuarios?',
  'Configurar de nuevo la autenticación del agente y publicarlo',
  [
    'Nada: el agente queda publicado y compartido automáticamente al importar la solución',
    'Reimportarlo como unmanaged',
    'Renombrar la solución',
  ],
  'Tras importar, hay que configurar de nuevo la autenticación del agente y publicarlo antes de poder compartirlo; además, el icono puede tardar hasta 24 horas en aparecer en todas partes. Algunas propiedades como los IDs de conversación y entorno no se transfieren.',
  CS + 'authoring-solutions-import-export');

q('3.2b', 3,
  'Un hotfix hecho directamente en Test creó una capa unmanaged sobre tu agente managed, y ahora no recibe actualizaciones de la solución. ¿Cómo la eliminas?',
  'En el agente: Advanced > See solution layers y Remove unmanaged layer',
  [
    'Eliminar la solución managed del entorno y volver a importarla',
    'Exportar el agente como unmanaged desde Test y reimportarlo sobre el managed',
    'Cambiar el publisher de la solución managed para que sustituya la capa',
  ],
  'Las capas de solución muestran managed y unmanaged apilados; en la página Solution Layers del agente se selecciona la capa unmanaged y Remove unmanaged layer. Eliminar la solución quitaría todo el agente, y exportar o cambiar publisher no modifica la capa.',
  CS + 'authoring-solutions-overview');

// 3.2c Environment variables
q('3.2c', 2,
  'Tu agente llama a una API que requiere una clave. Quieres que la clave no viaje en la solución, que cada entorno use la suya y que se guarde en Azure Key Vault. ¿Qué tipo de environment variable usas?',
  'Secret, que referencia un secreto de Azure Key Vault',
  [
    'Text con la clave como valor por defecto y el current value vacío en cada entorno',
    'Data source con una conexión de SharePoint que almacene la clave en una lista',
    'JSON con la clave cifrada',
  ],
  'Los tipos son Decimal number, Text, JSON, Two options, Data source y Secret. Secret guarda una referencia a un secreto de Azure Key Vault (el secreto real no vive en Dataverse ni en la solución) y solo Azure Key Vault se admite como almacén de secretos.',
  PA + 'environmentvariables-azure-key-vault-secrets');

q('3.2c', 3,
  'Vas a crear una environment variable Secret que referencia Azure Key Vault y fallan los permisos. Elige dos requisitos de configuración.',
  [
    'Registrar el resource provider Microsoft.PowerPlatform en la suscripción de Azure que contiene el vault',
    'Asignar el rol Key Vault Secrets User al usuario que crea la variable y a la identidad de Dataverse',
  ],
  [
    'Guardar el secreto en una tabla de Dataverse cifrada',
    'Usar un Key Vault de un tenant distinto al de Power Platform',
    'Asignar solo el rol Key Vault Reader, que ya permite leer el contenido del secreto sin más permisos',
  ],
  'Hay que registrar el resource provider Microsoft.PowerPlatform en la suscripción y dar permisos para recuperar secretos (rol Key Vault Secrets User) al usuario y a la identidad de Dataverse. El Key Vault debe estar en el mismo tenant, y el rol Key Vault Reader por sí solo no basta para leer el contenido del secreto.',
  PA + 'environmentvariables-azure-key-vault-secrets');

q('3.2c', 2,
  'La solución NexoCore usa la variable nexo_ApiBaseUrl. Dev apunta a https://dev.api.contoso.com y Test debe usar https://test.api.contoso.com sin tocar el agente. ¿Cómo lo gestionas?',
  'Quitar el current value de la variable antes de exportar y proporcionar el valor de Test al importar o desplegar',
  [
    'Cambiar la URL dentro del nodo Send HTTP request de Test después de importar',
    'Crear una variable distinta por entorno con nombres diferentes',
    'Incluir el current value de Dev: se sobrescribe sola con la URL de Test',
  ],
  'La definición de la variable viaja en la solución y su valor se proporciona por entorno durante la importación o el despliegue con Pipelines; puedes quitar el current value antes de exportar para que no se exporte el de Dev. Cambiar nodos a mano o duplicar variables vuelve a codificar valores y rompe la separación entre configuración y componentes.',
  PA + 'environmentvariables');

q('3.2c', 3,
  'Usas una environment variable Secret en un nodo Message de un topic. En el test chat aparece «Bot isn\'t allowed to use environment variable... add a tag AllowedBots». ¿Qué corriges?',
  'Agregar al secreto en Key Vault la etiqueta AllowedBots con el valor {envId}/{schemaName} del agente',
  [
    'Publicar el agente de nuevo para que el valor del secreto se incluya en la versión publicada',
    'Cambiar el tipo de la variable a Text y escribir el valor del secreto directamente en la solución',
    'Registrar un nuevo resource provider en Azure para cada agente que use secretos de Key Vault',
  ],
  'Para usar secretos en Copilot Studio, el servicio Microsoft Copilot Studio necesita el rol Key Vault Secrets User y el secreto debe llevar la etiqueta AllowedBots con {envId}/{schemaName} (varios agentes separados por comas) o AllowedEnvironments con el ID del entorno para permitir a todos los agentes del entorno. Publicar de nuevo o cambiar el tipo a Text no concede permiso al agente (y expondría el valor), y el resource provider es un requisito previo de la suscripción, no un registro por agente.',
  PA + 'environmentvariables-azure-key-vault-secrets');

q('3.2c', 3,
  'Usas environment variables en un agente de Copilot Studio. Elige dos afirmaciones correctas.',
  [
    'Son de solo lectura en Copilot Studio; los administradores cambian sus valores en Power Apps',
    'Cambiar el valor de una variable Secret no exige volver a publicar, porque se recupera en tiempo de ejecución',
  ],
  [
    'Los autores pueden modificar su valor desde el canvas de topics',
    'Cualquier cambio de valor, incluido el de las variables Secret, exige volver a publicar el agente en todos los canales',
    'Los errores de environment variables aparecen en la lista de Topics',
  ],
  'En Copilot Studio las environment variables son de solo lectura; el agente publicado incluye los valores que tenían al publicarse, por lo que hay que republicar tras un cambio, excepto para las de tipo Secret, que se recuperan en runtime. Sus errores aparecen en el test chat y al publicar, no en la lista de Topics.',
  CS + 'authoring-variables-about');

// 3.2d Pipelines
q('3.2d', 2,
  'Los makers no encuentran dónde ejecutar la pipeline Dev → Test de su solución. ¿Desde dónde pueden verla y ejecutarla?',
  'Desde una solución unmanaged en el entorno de desarrollo vinculado a la pipeline',
  [
    'Desde la default solution del entorno de desarrollo vinculado a la pipeline',
    'Desde una solución managed ya importada en el entorno de destino de la pipeline',
    'Desde el entorno host de la pipeline, abriendo la app Deployment Pipeline Configuration como maker',
  ],
  'Las pipelines se ven y se ejecutan desde una solución unmanaged en un entorno de desarrollo asociado a la pipeline; no se pueden ver ni ejecutar desde la default solution, desde soluciones managed ni desde los entornos de destino. También pueden consultarse y ejecutarse con la CLI (pac pipeline).',
  PP + 'alm/pipelines');

q('3.2d', 3,
  'Configuras pipelines con estos entornos: Host (Production), Dev (Developer), QA (Developer) y Prod (Production). ¿Qué entornos deben ser Managed Environments, con licencias premium?',
  'Solo Prod: el host no necesita ser managed y los entornos Developer tampoco',
  [
    'Todos, incluidos el host y los Developer',
    'Solo el host',
    'Dev y QA, pero no Prod, porque Producción solo recibe soluciones managed',
  ],
  'El host debe ser un entorno de producción pero no tiene que ser managed; los entornos Developer no tienen que ser managed; todos los demás entornos usados en la pipeline deben ser Managed Environments, con licencias que concedan derechos premium. Además, desde octubre de 2026 se advierte a los administradores de los despliegues a destinos no managed.',
  PP + 'alm/pipelines');

q('3.2d', 3,
  'Quieres que cada despliegue a Producción requiera una aprobación final mediante un cloud flow en el host de pipelines, después de que el despliegue haya sido aprobado. Elige dos pasos.',
  [
    'Activar la gated extension Pre-deployment Step Required en la etapa',
    'Crear un flow con OnPreDeploymentStarted que ejecute UpdatePreDeploymentStepStatus con 20 (completar) o 30 (rechazar)',
  ],
  [
    'Activar solo Pre-export Step Required y usar el trigger OnDeploymentRequested para aprobar antes de que se exporte la solución',
    'Usar el trigger OnDeploymentCompleted para bloquear el despliegue',
    'Enviar el estado 10 desde el flow para aprobar el paso',
  ],
  'Pre-deployment Step Required inserta un paso personalizado después de que se aprueba el despliegue; su trigger es OnPreDeploymentStarted y se cierra con Perform an unbound action UpdatePreDeploymentStepStatus (20 completar, 30 rechazar). El estado 10 es el pendiente del sistema, Pre-export valida al enviar la solicitud y OnDeploymentCompleted ocurre cuando el despliegue ya terminó.',
  PP + 'alm/extend-pipelines');

q('3.2d', 3,
  'Quieres que los despliegues a Producción los ejecute un service principal, que los makers no necesiten acceso a Producción y que un flow de aprobación decida. ¿Qué configuras?',
  'Is delegated deployment (Service Principal) en la etapa y un flow con OnApprovalStarted que llame a UpdateApprovalStatus con la conexión del service principal',
  [
    'Activar Pre-export Step Required en la etapa y llamar a UpdatePreExportStepStatus con la conexión del maker que envía el despliegue, aprobando desde su propia cuenta',
    'Dar el rol System Administrator a cada maker en Producción y que ellos aprueben sus propios despliegues',
    'Usar el trigger OnDeploymentCompleted con la conexión del propietario del flow para aprobar y notificar',
  ],
  'En un despliegue delegado el trigger es OnApprovalStarted y la acción UpdateApprovalStatus (20 aprobar, 30 rechazar) debe ejecutarse con la conexión del service principal configurado. Quien lo configura debe ser propietario de la aplicación empresarial en Microsoft Entra ID, y el service principal necesita el rol Deployment Pipeline Administrator en el host y System Administrator en los destinos; así los makers no necesitan acceso al destino.',
  PP + 'alm/delegated-deployments-setup');

q('3.2d', 3,
  'Sobre cómo funcionan las pipelines de Power Platform, elige dos afirmaciones correctas.',
  [
    'El mismo artefacto managed exportado pasa por las etapas en orden, de modo que no se puede omitir QA',
    'El comportamiento de importación por defecto es Upgrade sin Overwrite customizations',
  ],
  [
    'Pueden desplegar soluciones unmanaged en Producción',
    'Pueden desplegar entre tenants distintos',
    'Cada despliegue admite varias soluciones a la vez',
  ],
  'La solución se exporta cuando se envía la solicitud de despliegue y el mismo artefacto managed pasa por las etapas en orden; la importación por defecto es Upgrade sin Overwrite customizations. No se despliegan soluciones unmanaged (se guardan como respaldo), no hay despliegue entre tenants (se recomienda Azure DevOps o GitHub) y cada despliegue lleva una sola solución.',
  PP + 'alm/pipelines');
