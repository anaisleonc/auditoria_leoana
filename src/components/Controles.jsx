import { ShieldCheck } from 'lucide-react'

function Controles() {
  const items = [
    {
      vuln: 'Inyección de comandos',
      riesgo: 'Crítico',
      colorRiesgo: 'bg-red-100 text-red-700',
      prevencion: 'Evitar invocar comandos del sistema operativo; validar entrada contra lista blanca (formato IP) y ejecutar sin shell.',
      mitigacion: 'Privilegios mínimos del proceso del servidor; segmentación de red.',
      marco: 'CIS Controls v8',
    },
    {
      vuln: 'Inyección SQL',
      riesgo: 'Crítico',
      colorRiesgo: 'bg-red-100 text-red-700',
      prevencion: 'Consultas parametrizadas (prepared statements) en lugar de concatenación de strings.',
      mitigacion: 'Cuenta de base de datos con permisos restringidos solo a tablas necesarias.',
      marco: 'OWASP Top 10 — A03:2021',
    },
    {
      vuln: 'XSS (Reflected)',
      riesgo: 'Alto',
      colorRiesgo: 'bg-orange-100 text-orange-700',
      prevencion: 'Escapar automáticamente la salida; restringir el campo de notas a texto plano.',
      mitigacion: 'Cabecera Content-Security-Policy (CSP) como defensa adicional.',
      marco: 'OWASP Cheat Sheet Series',
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow p-8 border">
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="text-slate-700" />
        <h2 className="text-xl font-semibold text-slate-800">
          Políticas de prevención y controles de mitigación
        </h2>
      </div>

      <p className="text-slate-600 mb-6">
        Medidas priorizadas según el nivel de riesgo definido en la matriz, atacando
        la causa raíz de cada vulnerabilidad.
      </p>

      <div className="space-y-4">
        {items.map((it, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-slate-800">{it.vuln}</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${it.colorRiesgo}`}>
                {it.riesgo}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-1">
              <strong>Prevención:</strong> {it.prevencion}
            </p>
            <p className="text-sm text-slate-600 mb-1">
              <strong>Mitigación:</strong> {it.mitigacion}
            </p>
            <p className="text-xs text-slate-400 mt-2">Marco de referencia: {it.marco}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Controles