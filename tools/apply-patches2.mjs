import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));

const P = {
  'q-d1.mjs': [
    ['Seleccionar Authenticate with Microsoft, que expone User.AccessToken automáticamente', 'Seleccionar Authenticate with Microsoft, que expone User.AccessToken automáticamente para cualquier proveedor de identidad'],
    ['Establecer el content moderation level en Lowest para que el agente responda a más preguntas', 'Establecer el content moderation level en Lowest para que el agente responda a más preguntas aunque aumente el riesgo de contenido dañino'],
    ['Cambiar el nombre visible del agente', 'Cambiar el nombre visible del agente y su icono en el catálogo de agentes de la organización'],
    ['Incrustar el Secret 1 en el JavaScript de la página para que el navegador se autentique', 'Incrustar el Secret 1 en el JavaScript de la página para que el navegador se autentique con cada solicitud al agente'],
    ['Estar en un entorno con licencia Power Automate Premium', 'Estar en un entorno con licencia Power Automate Premium asignada a todos los usuarios del agente'],
    ['Al importar la solución en otro entorno, el flujo de aprobación avanzada viaja con ALM sin tener que recrearlo', 'Al importar la solución en otro entorno, el flujo de aprobación avanzada viaja con ALM sin tener que recrearlo ni reconfigurar las etapas'],
    ['Debes crear un nodo Question por cada input, porque el orquestador no puede pedir datos', 'Debes crear un nodo Question por cada input, porque el orquestador no puede pedir datos al usuario cuando falta un valor del flow'],
    ['Configurar el scope Try con run after has failed', 'Configurar el scope Try con run after has failed para que se ejecute justo antes que el Catch y capture sus errores'],
    ['Agregarlo solo en la página Tools del agente como agent-level tool', 'Agregarlo solo en la página Tools del agente como agent-level tool, para que el orquestador lo llame cuando convenga'],
    ['Agregar la URL de la API como Public website knowledge source', 'Agregar la URL de la API interna como Public website knowledge source para que el nodo la consulte con Bing'],
    ['Dejar Body en No Content; las variables se añaden solas como query string', 'Dejar Body en No Content; las variables se añaden solas como query string de la URL del endpoint'],
  ],
  'q-d2.mjs': [
    ['Son la opción ideal para crear o actualizar registros (transacciones)', 'Son la opción ideal para crear o actualizar registros (transacciones) en el sistema de origen sin replicar datos'],
    ["'Basic (usuario y contraseña)',\n    'SAS token de Azure Storage',", "'Basic (usuario y contraseña enviados en el header de cada solicitud al servicio de búsqueda)',\n    'SAS token de Azure Storage',"],
    ["'Basic (usuario y contraseña)',\n    'Kerberos',", "'Basic (usuario y contraseña enviados en el header Authorization de cada solicitud)',\n    'Kerberos',"],
    ['Usar credenciales maker-provided compartidas por todos los usuarios como valor por defecto', 'Usar credenciales maker-provided compartidas por todos los usuarios como valor por defecto, para que nadie tenga que iniciar sesión en el sitio'],
    ['Definir una operación GET /sse con text/event-stream', 'Definir una operación GET /sse con content type text/event-stream para el transporte de eventos del servidor'],
    ['Puede escribir y actualizar datos del lakehouse con consultas generadas', 'Puede escribir y actualizar datos del lakehouse con consultas generadas a partir de lenguaje natural'],
    ['Desde Settings > Security > Web channel security', 'Desde Settings > Security > Web channel security, activando Require secured access'],
    ['El slider de content moderation sigue disponible para modelos de Foundry', 'El slider de content moderation sigue disponible para modelos de Foundry y para los modelos de Anthropic'],
    ['La de entorno se configura una vez por administradores y usa un modelo de trazas y spans alineado con OpenTelemetry', 'La de entorno la configuran administradores una sola vez y usa trazas y spans alineados con OpenTelemetry'],
    ['La de agente usa spans alineados con OpenTelemetry y la tabla dependencies', 'La de agente usa spans alineados con OpenTelemetry y la tabla dependencies, y la configura el administrador'],
  ],
  'q-d3.mjs': [
    ['Formato XLSX con una hoja por método de evaluación', 'Formato XLSX con una hoja por método de evaluación y una columna de pass score'],
    ['Asignar solo el rol Key Vault Reader, que ya permite leer el contenido del secreto', 'Asignar solo el rol Key Vault Reader, que ya permite leer el contenido del secreto sin más permisos'],
    ['Si cambia el valor de una variable de tipo Secret no hace falta volver a publicar el agente, porque se recupera en tiempo de ejecución', 'Cambiar el valor de una variable Secret no exige volver a publicar, porque se recupera en tiempo de ejecución'],
    ['Cualquier cambio de valor, incluido el de las variables Secret, exige volver a publicar', 'Cualquier cambio de valor, incluido el de las variables Secret, exige volver a publicar el agente en todos los canales'],
    ['Crear un flow con el trigger OnPreDeploymentStarted y, al decidir, ejecutar UpdatePreDeploymentStepStatus con 20 (completar) o 30 (rechazar)', 'Crear un flow con OnPreDeploymentStarted que ejecute UpdatePreDeploymentStepStatus con 20 (completar) o 30 (rechazar)'],
    ['Activar solo Pre-export Step Required y usar el trigger OnDeploymentRequested', 'Activar solo Pre-export Step Required y usar el trigger OnDeploymentRequested para aprobar antes de que se exporte la solución'],
    ['Pueden desplegar soluciones unmanaged en Producción', 'Pueden desplegar soluciones unmanaged en Producción, siempre que el maker sea administrador del entorno de destino'],
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
