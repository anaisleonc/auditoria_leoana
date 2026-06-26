import { Terminal } from 'lucide-react'

function Comandos() {
  return (
    <div className="bg-white rounded-lg shadow p-8 border">
      <div className="flex items-center gap-3 mb-4">
        <Terminal className="text-red-600" />
        <h2 className="text-xl font-semibold text-slate-800">
          Inyección de comandos — Verificación de servidor
        </h2>
      </div>

      <p className="text-slate-600 mb-2">
        <strong>Dónde:</strong> función interna del portal de LogiCarga que verifica la conectividad de un servidor (equivalente al módulo Command Injection de DVWA).
      </p>

      <p className="text-slate-600 mb-4">
        <strong>Payload utilizado:</strong>
      </p>
      <pre className="bg-slate-100 rounded p-3 text-sm font-mono mb-4 overflow-x-auto">
        127.0.0.1; cat /etc/passwd
      </pre>

      <img
  src="/img/comandos_leoana.png"
  alt="Evidencia de inyección de comandos en DVWA"
  className="rounded-lg border shadow w-full mb-4"
/>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">¿Por qué funciona?</h3>
      <p className="text-slate-600 mb-4">
        La aplicación pasa la entrada del usuario directamente al sistema operativo sin
        separar el dato de la instrucción. El carácter <code className="bg-slate-100 px-1 rounded">;</code> permite
        encadenar un segundo comando, de modo que el servidor ejecuta el ping esperado y,
        además, el comando adicional insertado por el atacante.
      </p>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">Clasificación CVSS 3.1</h3>
      <table className="w-full text-sm text-left text-slate-600 mb-4 border">
        <tbody>
          <tr className="border-b"><td className="p-2 font-medium">Vector de ataque</td><td className="p-2">Network</td></tr>
          <tr className="border-b"><td className="p-2 font-medium">Confidencialidad</td><td className="p-2">High</td></tr>
          <tr className="border-b"><td className="p-2 font-medium">Integridad</td><td className="p-2">High</td></tr>
          <tr className="border-b"><td className="p-2 font-medium">Disponibilidad</td><td className="p-2">High</td></tr>
          <tr><td className="p-2 font-medium">Puntaje CVSS 3.1</td><td className="p-2 font-semibold text-red-700">10.0 — Crítica</td></tr>
        </tbody>
      </table>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">Prevención</h3>
      <p className="text-slate-600 mb-4">
        Evitar invocar comandos del sistema operativo desde la aplicación; cuando sea
        inevitable, validar la entrada contra una lista blanca (formato de IP) y ejecutar
        sin invocar un shell.
      </p>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">Mitigación</h3>
      <p className="text-slate-600">
        Ejecutar el proceso del servidor con privilegios mínimos, sin acceso a archivos
        sensibles del sistema, y segmentar la red del portal respecto a sistemas internos
        (referencia CIS Controls / OWASP A03:2021).
      </p>
    </div>
  )
}

export default Comandos