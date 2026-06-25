import { Grid3x3 } from 'lucide-react'

function Matriz() {
  // Filas = probabilidad (5 arriba a 1 abajo), Columnas = impacto (1 a 5)
  const colorCelda = (prob, imp) => {
    const suma = prob + imp
    if (suma >= 9) return 'bg-red-500'
    if (suma >= 7) return 'bg-orange-400'
    if (suma >= 5) return 'bg-yellow-300'
    return 'bg-green-300'
  }

  const vulnerabilidades = [
    { nombre: 'Comandos', prob: 5, imp: 5, color: 'bg-red-700' },
    { nombre: 'SQLi', prob: 5, imp: 4, color: 'bg-red-700' },
    { nombre: 'XSS', prob: 4, imp: 3, color: 'bg-orange-600' },
  ]

  const probabilidades = [5, 4, 3, 2, 1]
  const impactos = [1, 2, 3, 4, 5]

  return (
    <div className="bg-white rounded-lg shadow p-8 border">
      <div className="flex items-center gap-3 mb-4">
        <Grid3x3 className="text-slate-700" />
        <h2 className="text-xl font-semibold text-slate-800">
          Matriz de riesgo — Probabilidad × Impacto
        </h2>
      </div>

      <p className="text-slate-600 mb-6">
        Cada vulnerabilidad se ubica según su probabilidad de ocurrencia y el impacto
        que tendría sobre los activos de LogiCarga (ver componente Activos).
      </p>

      <div className="overflow-x-auto mb-6">
        <div className="inline-grid grid-cols-6 gap-1 min-w-[420px]">
          <div></div>
          {impactos.map((i) => (
            <div key={i} className="text-center text-xs font-semibold text-slate-500 pb-1">
              Imp {i}
            </div>
          ))}

          {probabilidades.map((p) => (
            <>
              <div key={`label-${p}`} className="text-xs font-semibold text-slate-500 flex items-center pr-1">
                Prob {p}
              </div>
              {impactos.map((i) => {
                const v = vulnerabilidades.find((v) => v.prob === p && v.imp === i)
                return (
                  <div
                    key={`${p}-${i}`}
                    className={`h-14 rounded flex items-center justify-center text-white text-xs font-bold ${
                      v ? v.color : colorCelda(p, i)
                    }`}
                  >
                    {v ? v.nombre : ''}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </div>

      <div className="flex gap-4 text-xs text-slate-600 mb-6 flex-wrap">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-300 rounded inline-block"></span> Bajo</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-300 rounded inline-block"></span> Medio</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded inline-block"></span> Alto</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded inline-block"></span> Crítico</span>
      </div>

      <h3 className="font-semibold text-slate-800 mb-2">Priorización de atención</h3>
      <ol className="list-decimal list-inside text-slate-600 space-y-1">
        <li><strong>Inyección de comandos</strong> — riesgo crítico, compromete el servidor completo.</li>
        <li><strong>Inyección SQL</strong> — riesgo crítico, expone toda la base de clientes.</li>
        <li><strong>XSS (Reflected)</strong> — riesgo alto, impacto acotado a la sesión comprometida.</li>
      </ol>
    </div>
  )
}

export default Matriz