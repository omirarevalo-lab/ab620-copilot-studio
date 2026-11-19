import fs from 'node:fs';
function patch(file, pairs){ let s=fs.readFileSync(file,'utf8'); for(const [o,n] of pairs){ const c=s.split(o).length-1; if(c!==1) throw new Error(file+': '+c+'x '+o.slice(0,70)); s=s.replace(o,()=>n);} fs.writeFileSync(file,s); }
patch('q-d1.mjs',[
 ['Una Adaptive Card informativa mostrada en un nodo Message con tres botones de respuesta','Una Adaptive Card con tres botones mostrada dentro de un nodo Message'],
]);
patch('q-d2.mjs',[
 ['Cambiar la autenticación del agente a No authentication para que el agente use las credenciales del maker','Cambiar la autenticación del agente a No authentication para que no se pidan credenciales'],
 ['Conectar un índice de Azure AI Search como knowledge para que el agente vea la pantalla','Seleccionar un modelo de Anthropic en lugar del de OpenAI en la configuración de la herramienta'],
 [' Ser child agent o publicarse en Teams no cambia esa restricción, así que para reutilizarlo conviene ofrecerle a ese otro equipo un agente especializado sin connected agents propios.',' Ser child agent o publicarse en Teams no cambia esa restricción.'],
]);
patch('q-d3.mjs',[
 ['debe ejecutarse con la conexión del service principal configurado (que debe ser propietario de la aplicación empresarial y tener rol Deployment Pipeline Administrator en el host y System Administrator en los destinos). Así los makers no necesitan acceso al destino.','debe ejecutarse con la conexión del service principal configurado. Quien lo configura debe ser propietario de la aplicación empresarial en Microsoft Entra ID, y el service principal necesita el rol Deployment Pipeline Administrator en el host y System Administrator en los destinos; así los makers no necesitan acceso al destino.'],
]);
console.log('ok');
