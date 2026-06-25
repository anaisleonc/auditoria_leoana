import { Boxes } from 'lucide-react'

function Activos() {
  const activos = [
    { nombre: 'Datos de empresas clientes', desc: 'Razón social, RUT, dirección, contacto', conf: 'Alta' },
    { nombre: 'Credenciales de acceso', desc: 'Usuario y contraseña del portal corporativo', conf: 'Crítica' },
    { nombre: 'Historial de envíos', desc: 'Origen, destino, contenido y valor declarado', conf: 'Alta' },
    { nombre: 'Datos de facturación y pago', desc: 'Montos, condiciones de pago, datos bancarios', conf: 'Crítica' },
    { nombre: 'Servidor y aplicación del portal', desc: 'Infraestructura que aloja y procesa las solicitudes', conf: 'Media' },
    { nombre: 'Disponibilidad del rastreo', desc: 'Capacidad de mostrar estado de envíos en tiempo real', conf: 'Media' },
  ]

  const colorConf = {
    'Crítica': 'text-red-700 bg-red-50',
    'Alta': 'text-amber-700 bg-amber-50',
    'Media': 'text-blue-700 bg-blue-50',
  }

  return (
    <div className="bg-white rounded-lg shadow p-8 border">
      <div className="flex items-center gap-3 mb-4">
        <Boxes className="text-slate-700" />
        <h2 className="text-xl font-semibold text-slate-800">
          Activos de información — LogiCarga
        </h2>
      </div>

      <p className="text-slate-600 mb-6">
        LogiCarga opera en logística y encomiendas, por lo que sus activos críticos
        no son solo datos: incluyen también la continuidad operativa del servicio de
        rastreo y la infraestructura que lo sostiene.
      </p>

      <div className="space-y-3">
        {activos.map((a, i) => (
          <div key={i} className="flex justify-between items-start border rounded p-3">
            <div>
              <p className="font-medium text-slate-800">{a.nombre}</p>
              <p className="text-sm text-slate-500">{a.desc}</p>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${colorConf[a.conf]}`}>
              {a.conf}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activos