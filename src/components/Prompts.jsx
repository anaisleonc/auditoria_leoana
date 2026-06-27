import { Bot } from 'lucide-react'

function Prompts() {
  const registros = [
    {
      seccion: 'Resumen de la empresa',
      prompt: 'Definir el contexto de LogiCarga como portal de clientes corporativos con rastreo, facturación y notas de entrega, conectando cada función a una de las tres vulnerabilidades.',
      aceptado: 'La estructura general del portal y la conexión entre cada función y una vulnerabilidad.',
      corregido: 'Se reforzó agregando un quinto activo y la justificación de por qué LogiCarga es un blanco atractivo.',
    },
    {
      seccion: 'Los 3 ataques (SQLi, XSS, comandos)',
      prompt: 'Para cada vulnerabilidad: explicación técnica en el contexto de LogiCarga, métricas CVSS 3.1, prevención que ataque la causa raíz y mitigación con referencia a un marco.',
      aceptado: 'La explicación del mecanismo técnico y la estructura vulnerable-vs-seguro en código.',
      corregido: 'Se detectó que el payload de SQLi se pegó con comillas tipográficas curvas; se corrigió manualmente a comillas simples rectas.',
    },
    {
      seccion: 'Activos, matriz, controles y recuperación',
      prompt: 'Construir la matriz de riesgo cruzando probabilidad e impacto, justificando cada ubicación según los activos comprometidos, y priorizar las medidas según ese resultado.',
      aceptado: 'La lógica de priorización y su justificación basada en activos comprometidos.',
      corregido: 'Se solicitó que el plan de recuperación incluyera valores concretos de RTO/RPO en vez de quedar genérico.',
    },
    {
      seccion: 'Componentes React (sitio web)',
      prompt: 'Convertir cada archivo Markdown en un componente React con Tailwind CSS, manteniendo el contenido ya redactado y agregando elementos visuales (tablas, tarjetas, mapa de calor con colores).',
      aceptado: 'La estructura visual de tarjetas, la tabla CVSS y el mapa de calor en grilla con colores.',
      corregido: 'Se identificó y solucionó un error de Tailwind no instalado, y un error de importación de lucide-react antes de poder ver los estilos correctamente.',
    },
    {
      seccion: 'Inserción de capturas reales y cálculo de CVSS',
      prompt: 'Guiar la ubicación de las capturas en las carpetas del proyecto, su conexión a los componentes React, y el proceso de cálculo de CVSS 3.1 en la calculadora oficial de FIRST.',
      aceptado: 'La estructura de carpetas para las imágenes y el código de referencia en Markdown y componentes.',
      corregido: 'Se detectó y corrigió una duplicación accidental de extensión de archivo (.png.png) que impedía mostrar las imágenes. Los 3 puntajes CVSS (9.1, 6.1, 10.0) fueron calculados directamente por la estudiante en la calculadora oficial, no generados por la IA.',
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
        Herramienta utilizada: <strong>Claude (Anthropic)</strong>, como asistente conversacional
        para investigar las vulnerabilidades, estructurar el análisis y construir los componentes
        del sitio.
      </p>

      <div className="space-y-4">
        {registros.map((r, i) => (
          <div key={i} className="border rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-2">{r.seccion}</h3>
            <p className="text-sm text-slate-600 mb-1"><strong>Prompt:</strong> {r.prompt}</p>
            <p className="text-sm text-slate-600 mb-1"><strong>Aceptado:</strong> {r.aceptado}</p>
            <p className="text-sm text-slate-600"><strong>Corregido:</strong> {r.corregido}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded p-4 mt-6">
        <p className="text-sm text-slate-600">
          <strong>Reflexión final:</strong> usar IA permitió avanzar la documentación y el sitio
          mientras se gestionaba el acceso al entorno DVWA. La herramienta no reemplazó las
          decisiones de fondo: definir los activos, priorizar el riesgo y elegir controles
          coherentes con una empresa de logística requirió indicar explícitamente ese contexto
          en cada instrucción.
        </p>
      </div>
    </div>
  )
}

export default Prompts