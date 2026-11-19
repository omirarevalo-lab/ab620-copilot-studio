// Muestra para desarrollo de la interfaz (esquema COURSE-SCHEMA.md). El curso real vive en course-m0.js, course-m1-3.js y course-m4-7.js.
window.AB620_MODULES = window.AB620_MODULES || [
  { n: 0, title: 'Fundamentos' }, { n: 1, title: 'Planificar la solución' }, { n: 2, title: 'Topics avanzados' }, { n: 3, title: 'Agent flows' },
  { n: 4, title: 'Conocimiento y herramientas' }, { n: 5, title: 'MCP y multiagente' }, { n: 6, title: 'Azure y monitoreo' }, { n: 7, title: 'Evaluación y ALM' }];
window.AB620_COURSE = window.AB620_COURSE || [];
(function () {
  var boxes = function (labels) {
    var w = labels.length > 3 ? 78 : 100, gap = labels.length > 3 ? 14 : 22, x = 6;
    var out = '<svg viewBox="0 0 360 120" role="img" aria-label="' + labels.join(', ') + '">';
    labels.forEach(function (t, i) {
      out += '<rect x="' + x + '" y="34" width="' + w + '" height="52" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="' + (x + w / 2) + '" y="65" text-anchor="middle" font-size="13" fill="currentColor">' + t + '</text>';
      if (i < labels.length - 1) out += '<path d="M' + (x + w) + ' 60h' + gap + '" stroke="var(--accent)" stroke-width="2"/>';
      x += w + gap;
    });
    return out + '</svg>';
  };
  window.AB620_COURSE.push(
    {
      id: 'F01', module: 0, title: 'Qué es Copilot Studio y para qué sirve', level: 'básico', minutes: 8, skills: [],
      theory: {
        intro: 'Copilot Studio es la herramienta de Microsoft para crear agentes: asistentes que conversan contigo y hacen tareas. Piensa en un empleado nuevo al que tú le explicas qué hacer.',
        sections: [
          { heading: 'Un agente, en palabras simples', body: 'Un agente es un programa que entiende lo que le escribes y responde o actúa.\n\nPuede contestar preguntas con tus documentos, ejecutar acciones en otras aplicaciones o seguir una conversación guiada.', visual: boxes(['Persona', 'Agente', 'Sistemas']) },
          { heading: 'Qué puedes hacer sin programar', body: 'Copilot Studio se maneja con pantallas y formularios. Escribes instrucciones en español, conectas fuentes de conocimiento y agregas herramientas.\n\nLuego lo pruebas en un panel de chat y lo publicas en canales como Teams.' }
        ],
        steps: ['Abre Copilot Studio e inicia sesión con tu cuenta de trabajo.', 'Elige Crear y escribe qué debe hacer tu agente.', 'Revisa las Instructions que se generaron.', 'Prueba el agente en el panel de prueba.'],
        example: 'Contoso tiene un agente de mesa de ayuda. Un empleado escribe "no puedo entrar a mi correo"; el agente busca en la base de conocimiento, propone pasos y, si no funciona, crea un ticket.',
        examTips: ['El examen asume que ya sabes qué es un agente: concéntrate en elegir el componente correcto.'],
        glossary: [{ term: 'Agente', def: 'Asistente que conversa y ejecuta tareas siguiendo instrucciones.' }, { term: 'Canal', def: 'Lugar donde los usuarios hablan con el agente, como Teams o un sitio web.' }]
      },
      scenes: [
        { title: 'Qué es un agente', visual: boxes(['Persona', 'Agente', 'Sistemas']), caption: 'Un agente conversa contigo y hace tareas por ti.', say: 'Un agente es como un empleado nuevo. Tú le dices qué hacer, y él conversa con las personas y realiza tareas. En Copilot Studio puedes crear uno sin escribir código, solo con pantallas y formularios.' },
        { title: 'Qué necesita', visual: boxes(['Instructions', 'Knowledge', 'Tools']), caption: 'Instrucciones, conocimiento y herramientas.', say: 'Para funcionar, un agente necesita tres cosas. Instrucciones, que le dicen cómo comportarse. Conocimiento, que es de dónde saca respuestas. Y herramientas, que le permiten hacer acciones.' },
        { title: 'Dónde vive', visual: boxes(['Teams', 'Web', 'Móvil']), caption: 'Lo publicas en canales como Teams o tu sitio web.', say: 'Cuando el agente está listo lo publicas en un canal. Un canal es el lugar donde los usuarios hablan con él, por ejemplo Microsoft Teams o una página web.' }
      ],
      check: [
        { stem: '¿Qué es un agente en Copilot Studio?', options: ['Una base de datos', 'Un asistente que conversa y ejecuta tareas', 'Un tipo de licencia', 'Un informe de Power BI'], answer: 1, explanation: 'Un agente conversa con los usuarios y puede responder o actuar según sus instrucciones.' },
        { stem: '¿Qué es un canal?', options: ['El lugar donde los usuarios hablan con el agente', 'Una fuente de conocimiento', 'Un tipo de topic', 'Un entorno de pruebas'], answer: 0, explanation: 'Los canales, como Teams o un sitio web, son donde se publica el agente.' },
        { stem: '¿Necesitas programar para crear un agente?', options: ['Siempre', 'Solo para publicarlo', 'No, se configura con pantallas', 'Solo en Teams'], answer: 2, explanation: 'Copilot Studio es de bajo código: se configura con formularios y lenguaje natural.' }
      ],
      reto: { text: 'Crea un agente de prueba.\nEscríbele una instrucción de una frase.\nHazle tres preguntas en el panel de prueba.', minutes: 15 },
      source: 'https://learn.microsoft.com/microsoft-copilot-studio/fundamentals-what-is-copilot-studio'
    },
    {
      id: 'L01', module: 1, title: 'Topics y disparadores', level: 'intermedio', minutes: 12, skills: ['1.3a', '1.3b'],
      theory: {
        intro: 'Un topic es una conversación guiada para resolver una intención concreta. Como una receta: el disparador dice cuándo cocinarla y los nodos son los pasos.',
        sections: [
          { heading: 'Qué es un topic', body: 'Un topic agrupa lo que el agente dice y hace para una intención, por ejemplo "restablecer contraseña".\n\nTiene un disparador y una secuencia de nodos: mensajes, preguntas, condiciones y acciones.', visual: boxes(['Disparador', 'Pregunta', 'Mensaje', 'Acción']) },
          { heading: 'Cuándo se activa', body: 'El disparador más común son las frases de activación: ejemplos de lo que diría el usuario.\n\nCon orquestación generativa, el agente puede elegir el topic por su descripción, sin depender solo de las frases.' }
        ],
        steps: ['Abre tu agente y entra a Topics.', 'Elige Agregar un topic y Desde cero.', 'Escribe el nombre y las frases de activación.', 'Agrega un nodo de Pregunta y otro de Mensaje.', 'Guarda y prueba en el panel de prueba.'],
        example: 'Contoso crea el topic "Restablecer contraseña" con las frases "olvidé mi clave" y "no puedo entrar". Pregunta el correo, y envía un mensaje con el enlace de restablecimiento.',
        examTips: ['Suelen dar un escenario y pedir el disparador correcto.', 'Trampa: confundir frases de activación con orquestación generativa.'],
        glossary: [{ term: 'Topic', def: 'Conversación guiada para una intención concreta del usuario.' }, { term: 'Disparador', def: 'Condición que activa un topic, como una frase del usuario.' }, { term: 'Nodo', def: 'Paso individual dentro de un topic: mensaje, pregunta, condición o acción.' }]
      },
      scenes: [
        { title: 'Un topic es una receta', visual: boxes(['Disparador', 'Pregunta', 'Mensaje', 'Acción']), caption: 'Un topic = una intención, con un disparador y varios pasos.', say: 'Un topic es una conversación guiada para resolver una sola intención, como restablecer una contraseña. Funciona como una receta: el disparador dice cuándo empezar y los nodos son los pasos.' },
        { title: 'Frases de activación', visual: boxes(['olvidé mi clave', 'Topic']), caption: 'Ejemplos de lo que diría el usuario activan el topic.', say: 'El disparador más común son las frases de activación. Son ejemplos de lo que el usuario podría escribir, como olvidé mi clave. Cuando el mensaje se parece, el topic se activa.' },
        { title: 'Nodos', visual: boxes(['Mensaje', 'Pregunta', 'Condición']), caption: 'Cada nodo es un paso: mensaje, pregunta, condición o acción.', say: 'Dentro del topic agregas nodos. Un nodo de mensaje dice algo. Uno de pregunta pide un dato. Uno de condición decide por qué camino seguir. Así armas la conversación paso a paso.' },
        { title: 'En el examen', caption: 'Elige el disparador correcto según el escenario.', say: 'En el examen te darán un escenario y deberás elegir el tipo de disparador correcto. Ten cuidado de no confundir las frases de activación con la orquestación generativa.' },
        { title: 'Resumen', caption: 'Un topic, una intención.', say: 'Recuerda: un topic resuelve una intención, el disparador lo activa y los nodos definen el flujo de la conversación.' }
      ],
      check: [
        { stem: '¿Qué agrupa un topic?', options: ['Una intención concreta del usuario', 'Todos los conectores', 'Los entornos', 'Las licencias'], answer: 0, explanation: 'Un topic es una conversación guiada para una intención.' },
        { stem: '¿Qué activa un topic?', options: ['Un nodo de mensaje', 'Un disparador', 'Un entorno', 'Un glosario'], answer: 1, explanation: 'El disparador, por ejemplo frases de activación, decide cuándo empezar.' },
        { stem: '¿Qué es un nodo?', options: ['Un canal', 'Un paso dentro del topic', 'Una licencia', 'Un modelo'], answer: 1, explanation: 'Los nodos son mensajes, preguntas, condiciones y acciones.' }
      ],
      reto: { text: 'Crea un topic "Saludo".\nAgrega dos frases de activación.\nPruébalo en el panel.', minutes: 15 },
      source: 'https://learn.microsoft.com/microsoft-copilot-studio/authoring-create-edit-topics'
    },
    {
      id: 'L27', module: 5, title: 'Model Context Protocol (MCP)', level: 'examen', minutes: 10, skills: ['2.2b'], audio: 'audio/L27.mp3',
      theory: {
        intro: 'MCP es un estándar abierto para que un agente use herramientas externas. Es como un enchufe universal: un solo tipo de conexión para muchos aparatos.',
        sections: [
          { heading: 'Qué resuelve MCP', body: 'Antes, cada herramienta necesitaba su propia integración. Con MCP, un servidor expone sus herramientas con un formato común.\n\nEl agente las descubre y las usa sin código especial para cada una.', visual: boxes(['Agente', 'MCP', 'Servidor']) },
          { heading: 'Cómo lo usas', body: 'En Copilot Studio agregas un servidor MCP como herramienta del agente. Las acciones que expone aparecen listas para usarse.' }
        ],
        steps: ['Abre tu agente y entra a Tools.', 'Elige Agregar una herramienta y Model Context Protocol.', 'Selecciona o crea la conexión al servidor.', 'Revisa las herramientas que expone y guárdalas.'],
        example: 'Contoso tiene un servidor MCP del sistema de inventario. El agente de compras lo agrega y puede consultar existencias sin una integración a medida.',
        examTips: ['MCP estandariza la conexión a herramientas: no sustituye a Knowledge.'],
        glossary: [{ term: 'MCP', def: 'Model Context Protocol: estándar abierto para conectar agentes con herramientas.' }, { term: 'Servidor MCP', def: 'Servicio que expone herramientas a los agentes con un formato común.' }]
      },
      scenes: [
        { title: 'El enchufe universal', visual: boxes(['Agente', 'MCP', 'Servidor']), caption: 'MCP es un estándar común para conectar herramientas.', say: 'MCP significa Model Context Protocol. Es un estándar abierto, como un enchufe universal, que permite a un agente usar herramientas de distintos servidores con la misma forma de conexión.' },
        { title: 'Cómo se agrega', caption: 'Tools, Agregar herramienta, Model Context Protocol.', say: 'En Copilot Studio entras a Tools, eliges agregar una herramienta y seleccionas Model Context Protocol. Luego eliges la conexión al servidor y revisas las acciones que expone.' },
        { title: 'En el examen', caption: 'MCP conecta herramientas; no reemplaza el conocimiento.', say: 'En el examen recuerda que MCP sirve para conectar herramientas de forma estándar. No reemplaza a las fuentes de conocimiento, que son otra cosa.' }
      ],
      check: [
        { stem: '¿Qué es MCP?', options: ['Un estándar abierto para conectar agentes con herramientas', 'Un tipo de licencia', 'Un canal', 'Un modelo de lenguaje'], answer: 0, explanation: 'Model Context Protocol estandariza la conexión a herramientas.' },
        { stem: '¿Dónde agregas un servidor MCP?', options: ['En Tools', 'En Analytics', 'En Canales', 'En Entornos'], answer: 0, explanation: 'Se agrega como herramienta del agente.' },
        { stem: '¿MCP reemplaza a Knowledge?', options: ['Sí', 'No, son cosas distintas', 'Solo en Teams', 'Solo en Azure'], answer: 1, explanation: 'MCP conecta herramientas; Knowledge aporta información.' }
      ],
      source: 'https://learn.microsoft.com/microsoft-copilot-studio/agent-extend-action-mcp'
    }
  );
})();
