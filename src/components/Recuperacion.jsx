import { LifeBuoy } from 'lucide-react'

function Recuperacion() {
  return (
    <div className="bg-white rounded-lg shadow p-8 border">
      <div className="flex items-center gap-3 mb-4">
        <LifeBuoy className="text-slate-700" />
        <h2 className="text-xl font-semibold text-slate-800">
          Mejora tecnológica y recuperación ante desastres
        </h2>
      </div>

      <h3 className="font-semibold text-slate-800 mt-4 mb-2">Mejoras tecnológicas propuestas</h3>
      <div className="space-y-3 mb-6">
        <div className="border rounded p-3">
          <p className="font-medium text-slate-800">Web Application Firewall (WAF)</p>
          <p className="text-sm text-slate-600">Bloquea patrones de inyección SQL, XSS y comandos antes de llegar a la aplicación.</p>
        </div>
        <div className="border rounded p-3">
          <p className="font-medium text-slate-800">Segmentación de red</p>
          <p className="text-sm text-slate-600">Aísla el servidor del portal de los sistemas internos de LogiCarga.</p>
        </div>
        <div className="border rounded p-3">
          <p className="font-medium text-slate-800">Autenticación de doble factor (2FA)</p>
          <p className="text-sm text-slate-600">Reduce el impacto de un robo de credenciales en las cuentas corporativas.</p>
        </div>
      </div>

      <h3 className="font-semibold text-slate-800 mt-4 mb-2">Plan de recuperación ante desastres (DR)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-slate-50 rounded p-3 text-center">
          <p className="text-2xl font-bold text-slate-800">24h</p>
          <p className="text-xs text-slate-500">Respaldo diario (RPO)</p>
        </div>
        <div className="bg-slate-50 rounded p-3 text-center">
          <p className="text-2xl font-bold text-slate-800">4h</p>
          <p className="text-xs text-slate-500">Tiempo máximo de restauración (RTO)</p>
        </div>
        <div className="bg-slate-50 rounded p-3 text-center">
          <p className="text-2xl font-bold text-slate-800">30 días</p>
          <p className="text-xs text-slate-500">Retención de respaldos</p>
        </div>
      </div>

      <p className="text-slate-600 text-sm">
        Notificación interna inmediata al equipo de TI ante un incidente, y notificación
        a las empresas clientes afectadas en plazo razonable si se expone su información,
        en línea con la Ley 19.628 sobre protección de datos de carácter personal.
      </p>
    </div>
  )
}

export default Recuperacion