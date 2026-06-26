import { Code2 } from 'lucide-react'

function XSS() {
  return (
    <div className="bg-white rounded-lg shadow p-8 border">
      <div className="flex items-center gap-3 mb-4">
        <Code2 className="text-red-600" />
        <h2 className="text-xl font-semibold text-slate-800">
          XSS (Cross-Site Scripting) — Notas de entrega
        </h2>
      </div>

      <p className="text-slate-600 mb-2">
        <strong>Dónde:</strong> campo de notas/comentarios de entrega del portal de clientes de LogiCarga (equivalente al módulo XSS Reflected de DVWA).
      </p>

      <p className="text-slate-600 mb-4">
        <strong>Payload utilizado:</strong>
      </p>
      <pre className="bg-slate-100 rounded p-3 text-sm font-mono mb-4 overflow-x-auto">
        {"<script>alert('XSS')</script>"}
      </pre>

      <img
  src="/img/xss_leoana.png"
  alt="Evidencia de XSS en DVWA"
  className="rounded-lg border shadow w-full mb-4"
/>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">¿Por qué funciona?</h3>
      <p className="text-slate-600 mb-4">
        La aplicación inserta la entrada del usuario directamente en el HTML sin sanitizarla.
        El navegador no distingue entre el texto escrito por el usuario y el código de la página:
        si la entrada contiene una etiqueta <code className="bg-slate-100 px-1 rounded">{"<script>"}</code>, el navegador la ejecuta
        en lugar de mostrarla como texto, permitiendo robar la sesión de otro usuario del portal.
      </p>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">Clasificación CVSS 3.1</h3>
      <table className="w-full text-sm text-left text-slate-600 mb-4 border">
        <tbody>
          <tr className="border-b"><td className="p-2 font-medium">Vector de ataque</td><td className="p-2">Network</td></tr>
          <tr className="border-b"><td className="p-2 font-medium">Interacción del usuario</td><td className="p-2">Required</td></tr>
          <tr className="border-b"><td className="p-2 font-medium">Confidencialidad</td><td className="p-2">Low</td></tr>
          <tr><td className="p-2 font-medium">Severidad estimada</td><td className="p-2 font-semibold text-amber-600">Media</td></tr>
        </tbody>
      </table>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">Prevención</h3>
      <p className="text-slate-600 mb-4">
        Escapar la salida de todo contenido generado por el usuario antes de insertarlo en el HTML,
        evitando el uso de <code className="bg-slate-100 px-1 rounded">dangerouslySetInnerHTML</code> en React.
      </p>

      <h3 className="font-semibold text-slate-800 mt-6 mb-2">Mitigación</h3>
      <p className="text-slate-600">
        Política de seguridad de contenido (CSP) que restrinja qué scripts pueden ejecutarse,
        y validación de formato del campo de notas (OWASP Cheat Sheet — XSS Prevention).
      </p>
    </div>
  )
}

export default XSS