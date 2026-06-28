import { Bot } from 'lucide-react'

function Prompts() {
  const registros = [
    {
      seccion: 'Resumen de la empresa',
      prompt: 'Le pedí ayuda para armar el contexto de LogiCarga: cómo sería el portal, qué maneja (rastreo, facturación, notas de entrega) y cómo conectar eso con las tres vulnerabilidades.',
      aceptado: 'La idea general del portal y cómo cada función se conectaba con un ataque.',
      corregido: 'Le pedí agregar un activo más porque con 4 quedaba muy al límite, y que explicara mejor por qué LogiCarga sería un blanco atractivo.',
    },
    {
      seccion: 'Los 3 ataques (SQLi, XSS, comandos)',
      prompt: 'Para cada uno pedí la explicación técnica de por qué funciona en LogiCarga, las métricas para el CVSS, y una prevención concreta (no genérica) más una mitigación con algún marco de referencia.',
      aceptado: 'La explicación de cómo funciona cada ataque y los ejemplos de código vulnerable vs. seguro.',
      corregido: 'Al copiar el payload de SQL injection, las comillas simples se cambiaron solas por comillas curvas. Lo noté y lo arreglé a mano.',
    },
    {
      seccion: 'Activos, matriz, controles y recuperación',
      prompt: 'Pedí armar la matriz cruzando probabilidad e impacto, pero que cada vulnerabilidad quedara ubicada según los activos que realmente comprometía, no al azar.',
      aceptado: 'El orden de prioridad (comandos > SQL > XSS) y por qué tenía sentido.',
      corregido: 'En el plan de recuperación pedí cambiar lo genérico ("tener respaldos") por números concretos y medibles.',
    },
    {
      seccion: 'Componentes React (sitio web)',
      prompt: 'Pedí convertir cada archivo de texto en un componente de React, manteniendo el contenido que ya había escrito, agregándole tarjetas, tablas y el mapa de calor con colores.',
      aceptado: 'La estructura de las tarjetas y cómo armó la tabla de CVSS y el mapa de calor.',
      corregido: 'Se me había olvidado instalar Tailwind y la librería de íconos, así que el sitio no se veía bien al principio. Fui solucionando cada error hasta que funcionó.',
    },
    {
      seccion: 'Inserción de capturas reales y cálculo de CVSS',
      prompt: 'Ya con acceso a DVWA, hice los 3 ataques yo misma y pedí ayuda para saber en qué carpetas iban las capturas dentro del proyecto y cómo conectarlas a los componentes.',
      aceptado: 'La estructura de carpetas para las imágenes y cómo referenciarlas en el código.',
      corregido: 'Al copiar las imágenes, el nombre quedó duplicado con la extensión repetida y por eso no cargaban. Detecté el problema y corregí los 6 archivos a mano. Los 3 puntajes CVSS (9.1, 6.1, 10.0) los calculé yo misma en la calculadora oficial de first.org, no los generó la IA.',
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow p-8 border">
      <div className="flex items-center gap-3 mb-4">
        <Bot className="text-slate-700" />
        <h2 className="text-xl font-semibold text-slate-800">
          Bitácora de uso de Inteligencia Artificial
        </h2>
      </div>

      <p className="text-slate-600 mb-6">
        Usé <strong>Claude (Anthropic)</strong> como apoyo durante todo el trabajo, conversando
        con él para investigar las vulnerabilidades, ordenar el análisis y construir el sitio.
      </p>

      <div className="space-y-4">
        {registros.map((r, i) => (
          <div key={i} className="border rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-2">{r.seccion}</h3>
            <p className="text-sm text-slate-600 mb-1"><strong>Le pedí:</strong> {r.prompt}</p>
            <p className="text-sm text-slate-600 mb-1"><strong>Usé tal cual:</strong> {r.aceptado}</p>
            <p className="text-sm text-slate-600"><strong>Corregí:</strong> {r.corregido}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded p-4 mt-6">
        <p className="text-sm text-slate-600">
          <strong>Reflexión final:</strong> usar IA me ayudó a no quedarme trabada, a poder organizarme mejor. Pero igual tuve que tomar yo
          las decisiones importantes: qué activos tenía sentido proteger, cómo priorizar los
          riesgos y qué controles servían para una empresa de logística y no para cualquier otra.
          Lo que más aprendí es que la calidad de lo que pides importa tanto como la herramienta.
        </p>
      </div>
    </div>
  )
}

export default Prompts