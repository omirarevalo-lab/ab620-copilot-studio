// Muestra mínima para pruebas de la interfaz. La lección real vive en data/lessons.js.
window.AB620_LESSONS = [
  {
    id: 'L01', skills: ['1.3a', '1.3b'], title: 'Topics y disparadores', premium: false,
    screens: [
      { kind: 'idea', heading: 'Un topic es una conversación guiada', body: 'Un topic agrupa lo que el agente dice y hace para resolver una intención concreta. Un disparador decide cuándo se activa.',
        visual: '<svg viewBox="0 0 320 90" role="img" aria-label="Disparador, mensaje y acción"><rect x="4" y="25" width="80" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="44" y="50" text-anchor="middle" font-size="13" fill="currentColor">Disparador</text><path d="M84 45h40" stroke="currentColor" stroke-width="2"/><rect x="124" y="25" width="80" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="164" y="50" text-anchor="middle" font-size="13" fill="currentColor">Mensaje</text><path d="M204 45h40" stroke="currentColor" stroke-width="2"/><rect x="244" y="25" width="72" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="280" y="50" text-anchor="middle" font-size="13" fill="currentColor">Acción</text></svg>' },
      { kind: 'como', heading: 'Cómo se ve en Copilot Studio', body: 'Creas el topic "Restablecer contraseña", escribes frases de activación como "olvidé mi clave" y añades un nodo de pregunta y otro de mensaje.' },
      { kind: 'examen', heading: 'Qué te preguntan', body: 'Suelen dar un escenario y pedir qué tipo de disparador usar. La trampa: confundir frases de activación con orquestación generativa.' },
      { kind: 'recuerda', heading: 'Recuerda', body: 'Un topic = una intención. El disparador lo activa. Los nodos definen el flujo. Prueba siempre en el panel de test.' }
    ],
    narration: 'Un topic es una conversación guiada que resuelve una intención concreta. Un disparador decide cuándo se activa. En Copilot Studio creas el topic, escribes frases de activación y añades nodos de pregunta y mensaje. En el examen te dan un escenario y te piden elegir el disparador correcto. Recuerda: un topic, una intención.',
    reto: { text: 'Crea un topic llamado "Horario de oficina".\nAñade tres frases de activación y un mensaje.\nPruébalo en el panel de test.', minutes: 15 },
    source: 'muestra'
  },
  {
    id: 'L02', skills: ['2.2a', '2.2b'], title: 'Tools y conectores', premium: true,
    screens: [
      { kind: 'idea', heading: 'Las tools dan manos al agente', body: 'Una tool permite al agente actuar: llamar una API, ejecutar un flujo o usar un servidor MCP.' },
      { kind: 'como', heading: 'Cómo se ve', body: 'En la pestaña Tools pulsas Añadir, eliges un conector como Outlook y defines qué entradas rellena el agente.' },
      { kind: 'recuerda', heading: 'Recuerda', body: 'Describe bien cada tool: el agente la elige por su descripción.' }
    ],
    narration: 'Las tools dan manos al agente. Con ellas llama APIs, ejecuta flujos o usa servidores MCP. Describe bien cada tool, porque el agente la elige por su descripción.',
    reto: { text: 'Añade la tool de Outlook a tu agente.\nPide que envíe un correo de prueba.', minutes: 15 },
    source: 'muestra'
  }
];
