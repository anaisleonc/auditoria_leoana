import { Database } from 'lucide-react'

function InyeccionSQL() {
  return (
    <div className="bg-white rounded-lg shadow p-8 border">
      <div className="flex items-center gap-3 mb-4">
        <Database className="text-red-600" />
        <h2 className="text-xl font-semibold text-slate-800">
          Inyección SQL — Formulario de acceso
        </h2>
      </div>

      <p className="text-slate-600 mb-2">
        <strong>Dónde:</strong> formulario de inicio de sesión del portal de clientes de LogiCarga (equivalente al módulo SQL Injection de DVWA).
      </p>

      <p className="text-slate-600 mb-4">
        <strong>Payload utilizado:</strong>
      </p>
      <pre className="bg-slate-100 rounded p-3 text-sm font-mono mb-4 overflow-x-auto">
        ' OR '1'='1
      </pre>

      <div className="bg-amber-50 border border-amber-300 rounded p-4 mb-4 text-amber-800 text-sm">
        Captura pendiente — se agregará al obtener acceso al entorno DVWA.
      </div>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">¿Por qué funciona?</h3>
      <p className="text-slate-600 mb-4">
        La aplicación concatena la entrada del usuario directamente en la consulta SQL.
        La comilla simple cierra el valor esperado, y la condición <code className="bg-slate-100 px-1 rounded">OR '1'='1'</code> se
        evalúa siempre como verdadera, devolviendo todos los registros de la tabla de clientes
        en vez de solo el usuario correspondiente.
      </p>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">Clasificación CVSS 3.1</h3>
      <table className="w-full text-sm text-left text-slate-600 mb-4 border">
        <tbody>
          <tr className="border-b"><td className="p-2 font-medium">Vector de ataque</td><td className="p-2">Network</td></tr>
          <tr className="border-b"><td className="p-2 font-medium">Complejidad</td><td className="p-2">Low</td></tr>
          <tr className="border-b"><td className="p-2 font-medium">Confidencialidad</td><td className="p-2">High</td></tr>
          <tr><td className="p-2 font-medium">Severidad estimada</td><td className="p-2 font-semibold text-red-600">Alta / Crítica</td></tr>
        </tbody>
      </table>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">Prevención</h3>
      <p className="text-slate-600 mb-4">
        Uso de consultas parametrizadas (prepared statements), de modo que el dato del usuario
        nunca se interprete como parte del código SQL.
      </p>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">Mitigación</h3>
      <p className="text-slate-600">
        Principio de mínimo privilegio en la cuenta de base de datos, y monitoreo de patrones
        de inyección en los logs de acceso (OWASP Top 10 — A03:2021).
      </p>
    </div>
  )
}

export default InyeccionSQL