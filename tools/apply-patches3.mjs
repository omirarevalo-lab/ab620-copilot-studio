// Re-balance: revert a subset of lengthened distractors so the correct option is longest ~25% of the time.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));

const P = {
  'q-d1.mjs': [
    ['Las citas se desactivan automáticamente porque el content moderation level del nodo está en High y filtra los enlaces a fuentes', 'Las citas se desactivan porque el content moderation level es High'],
    ['ContentLocation debe contener una ruta de archivo local de la tabla, no una URL pública', 'ContentLocation debe ser una ruta de archivo local, no una URL'],
    ['Publicar de nuevo el agente: el test chat y los canales solo muestran la versión 1.6 después de publicar el agente', 'Publicar de nuevo el agente: el canvas solo muestra la versión 1.6 tras publicar'],
  ],
  'q-d2.mjs': [
    ['Sí, pero solo si la especificación es OpenAPI 3.1 en YAML y se convierte previamente a Postman', 'Sí, pero solo si la especificación es OpenAPI 3.1 en YAML'],
    ['La autenticación, cambiándola a OAuth 2.0 Manual con client ID, secret y scopes del proveedor', 'La autenticación, cambiándola a OAuth 2.0 Manual'],
    ['Sí, siempre que Mesa de ayuda esté publicada en Microsoft Teams y compartida con el otro equipo', 'Sí, siempre que Mesa de ayuda se publique en Microsoft Teams'],
    ['El project endpoint debe terminar en /chat/completions, igual que en los modelos BYOM de los prompts', 'El project endpoint debe terminar en /chat/completions'],
    ['El Agent Id tiene espacios al final y por eso Foundry no encuentra la versión del agente publicada', 'El Agent Id lleva espacios al final'],
    ['Con where timestamp > ago(14d) y summarize por usuario en intervalos de un día', 'Con where timestamp > ago(14d)'],
    ['Se copian las filas de las tablas seleccionadas a Dataverse y se indexan cada noche para responder más rápido', 'Se copian las filas de las tablas seleccionadas a Dataverse y se indexan cada noche'],
    ['Un segundo índice vectorial solo para las citas, agregado como otra fuente de conocimiento del mismo agente', 'Un segundo índice vectorial solo para las citas'],
    ['Una Adaptive Card con botones Action.Submit cuyo identificador coincide con el nombre del agente de destino', 'Una Adaptive Card con el nombre del agente como acción'],
    ['Funciona si usas el endpoint Responses de Foundry en lugar del de chat completions', 'Funciona si usas el endpoint Responses en lugar de chat completions'],
  ],
  'q-d3.mjs': [
    ['Quitar el agente de la solución y volver a agregarlo con Add existing para sincronizar sus topics', 'Quitar el agente de la solución y volver a agregarlo'],
    ['Se crea en una solución managed del tenant y no se puede cambiar el destino de los agentes nuevos', 'Se crea en una solución managed del tenant y no se puede cambiar'],
    ['Solo se admiten sitios completos de SharePoint con permisos de lectura para el maker', 'Solo se admiten sitios completos de SharePoint'],
    ['Los archivos deben pesar más de 50 MB para que el servicio los divida en fragmentos', 'Los archivos deben pesar más de 50 MB'],
    ['Usar el publisher por defecto y cambiar el prefijo cuando algún componente lo requiera, sin impacto posterior', 'Usar el publisher por defecto y cambiar el prefijo cuando haga falta'],
    ['Cambiar la URL dentro del nodo Send HTTP request del agente en Test después de importar y publicar de nuevo cada vez', 'Cambiar la URL dentro del nodo Send HTTP request de Test después de importar'],
    ['Solo funcionan con agentes cuyo conocimiento proviene de Fabric data agents publicados en Microsoft Copilot', 'Solo funcionan con agentes que usan Fabric data agents'],
    ['El agente respondió con un error de red o de conexión en esos casos concretos', 'El agente respondió con un error de red en esos casos'],
    ['Solo el host, porque administra las pipelines y los demás entornos son de desarrollo', 'Solo el host'],
    ['Todos los entornos, incluidos el host y los Developer, sin excepciones de licencia', 'Todos, incluidos el host y los Developer'],
  ],
};

let failures = 0;
for (const [file, patches] of Object.entries(P)) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, 'utf8');
  for (const [oldS, newS] of patches) {
    const count = src.split(oldS).length - 1;
    if (count !== 1) {
      console.log(`!! ${file}: found ${count}x -> ${oldS.slice(0, 90)}`);
      failures++;
      continue;
    }
    src = src.replace(oldS, () => newS);
  }
  fs.writeFileSync(fp, src, 'utf8');
}
console.log('done, failures:', failures);
