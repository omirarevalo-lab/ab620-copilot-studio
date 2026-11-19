import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const P = {
 'q-d1.mjs': [
  ['Cambiar el nombre visible del agente y su icono en el catálogo de agentes de la organización','Cambiar el nombre visible del agente'],
  ['Estar en un entorno con licencia Power Automate Premium asignada a todos los usuarios del agente','Estar en un entorno con licencia Power Automate Premium'],
  ['Agregarlo solo en la página Tools del agente como agent-level tool, para que el orquestador lo llame cuando convenga','Agregarlo solo en la página Tools del agente como agent-level tool'],
  ['Agregar la URL de la API interna como Public website knowledge source para que el nodo la consulte con Bing','Agregar la URL de la API como Public website knowledge source'],
 ],
 'q-d2.mjs': [
  ['Son la opción ideal para crear o actualizar registros (transacciones) en el sistema de origen sin replicar datos','Son la opción ideal para crear o actualizar registros (transacciones)'],
  ['Definir una operación GET /sse con content type text/event-stream para el transporte de eventos del servidor','Definir una operación GET /sse con text/event-stream'],
  ["'Basic (usuario y contraseña enviados en el header Authorization de cada solicitud)',\n    'Kerberos',","'Basic (usuario y contraseña)',\n    'Kerberos',"],
  ["'Basic (usuario y contraseña enviados en el header de cada solicitud al servicio de búsqueda)',\n    'SAS token de Azure Storage',","'Basic (usuario y contraseña)',\n    'SAS token de Azure Storage',"],
 ],
 'q-d3.mjs': [
  ['Pueden desplegar soluciones unmanaged en Producción, siempre que el maker sea administrador del entorno de destino','Pueden desplegar soluciones unmanaged en Producción'],
 ],
};
let f=0;
for (const [file, patches] of Object.entries(P)) {
  const fp = path.join(dir, file); let src = fs.readFileSync(fp,'utf8');
  for (const [o,n] of patches){ const c=src.split(o).length-1; if(c!==1){console.log('!!',file,c,o.slice(0,80));f++;continue;} src=src.replace(o,()=>n);} 
  fs.writeFileSync(fp,src,'utf8');
}
console.log('failures',f);
