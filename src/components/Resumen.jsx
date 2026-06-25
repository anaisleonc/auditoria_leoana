import { FileText } from 'lucide-react'

function Resumen() {
  return (
    <div className="bg-white rounded-lg shadow p-8 border">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="text-slate-700" />
        <h2 className="text-xl font-semibold text-slate-800">
          Resumen — LogiCarga Transportes
        </h2>
      </div>

      <p className="text-slate-600 leading-relaxed mb-4">
        <strong>LogiCarga Transportes</strong> es una empresa del rubro de logística
        y encomiendas, dedicada al transporte y envío de mercadería para clientes
        corporativos. Ofrece a sus clientes un portal web donde cada empresa puede
        rastrear envíos, consultar su historial de despachos, revisar su facturación
        y dejar notas de entrega.
      </p>

      <p className="text-slate-600 leading-relaxed mb-4">
        El portal concentra información sensible de decenas de empresas clientes,
        por lo que un incidente de seguridad no afecta solo a LogiCarga, sino a la
        operación de sus clientes corporativos.
      </p>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">
        Activos de información protegidos
      </h3>
      <ul className="list-disc list-inside text-slate-600 space-y-1">
        <li>Datos de empresas clientes (RUT, dirección, contacto)</li>
        <li>Credenciales de acceso al portal</li>
        <li>Historial de envíos (origen, destino, valor declarado)</li>
        <li>Datos de facturación y pago</li>
        <li>Infraestructura del portal y servidor</li>
      </ul>
    </div>
  )
}

export default Resumen