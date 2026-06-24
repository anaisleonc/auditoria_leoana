# Bitácora de uso de Inteligencia Artificial — LogiCarga Transportes

## Herramienta utilizada

Claude (Anthropic), usado como asistente conversacional externo para investigar las vulnerabilidades, estructurar el análisis técnico y redactar la documentación del informe, dado que el acceso a DVWA aún estaba pendiente de confirmación por parte del docente al momento de iniciar el trabajo.

## Registro de prompts por sección

### Sección: Resumen de la empresa (01_resumen)

**Prompt utilizado:** Definir el contexto de LogiCarga Transportes (empresa de logística asignada, tema E12) como un portal de clientes corporativos con funciones de rastreo de envíos, facturación y notas de entrega, identificando qué datos maneja y por qué es un blanco atractivo para un atacante.

**Qué acepté:** La estructura general del portal (rastreo, facturación, notas) y la conexión directa entre cada función y una de las tres vulnerabilidades a demostrar.

**Qué corregí/amplié:** Solicité reforzar el resumen agregando un quinto activo (infraestructura del portal) y una explicación explícita de por qué LogiCarga es un blanco atractivo, ya que la primera versión cumplía el mínimo pero quedaba justa frente al criterio de la rúbrica que pide ≥4 activos con margen.

### Sección: Inyección SQL, XSS e inyección de comandos (02, 03, 04)

**Prompt utilizado:** Para cada vulnerabilidad, solicité una explicación técnica de por qué funciona en el contexto específico del formulario de acceso, el campo de notas y la función de verificación de servidor de LogiCarga respectivamente, junto con la clasificación de métricas CVSS 3.1 y una política de prevención que atacara la causa raíz (no genérica), más un control de mitigación con referencia a un marco (OWASP/CIS).

**Qué acepté:** La explicación técnica del mecanismo de cada vulnerabilidad (uso de comillas en SQL, etiquetas script en XSS, el carácter `;` en comandos) y la estructura de vulnerable-vs-seguro en código.

**Qué corregí:** Detecté que, al copiar el payload de inyección SQL hacia el editor, las comillas simples se habían transformado en comillas tipográficas curvas (`"..."`), lo que invalidaba el payload real. Corregí manualmente reemplazándolas por comillas simples rectas (`'`), verificando que coincidiera exactamente con lo que se debe escribir en DVWA.

**Pendiente:** Las capturas de pantalla reales y el puntaje CVSS numérico exacto quedan marcados como [PENDIENTE] en los tres archivos, ya que requieren acceso al entorno DVWA (aún no otorgado por el docente al momento de redactar esta bitácora).

### Sección: Activos, matriz de riesgo, controles y recuperación (05, 06, 07, 08)

**Prompt utilizado:** Solicité construir la matriz de riesgo cruzando probabilidad e impacto para las tres vulnerabilidades, justificando cada ubicación en función de los activos comprometidos definidos previamente, y priorizando las medidas de prevención y mitigación según ese resultado, en vez de tratarlas como secciones independientes sin relación entre sí.

**Qué acepté:** La lógica de priorización (inyección de comandos > SQL > XSS) y su justificación basada en cuántos activos compromete cada una.

**Qué corregí/amplié:** Pedí que el plan de recuperación incluyera valores concretos de RTO y RPO, en lugar de mencionar "tener respaldos" de forma genérica, para que la propuesta fuera medible y no solo declarativa.

## Reflexión final sobre el uso de la herramienta

Usar IA como apoyo permitió avanzar la documentación técnica mientras se gestionaba en paralelo el acceso al entorno DVWA, que tomó más tiempo de lo esperado en ser otorgado por el docente. Sin embargo, la herramienta no reemplazó las decisiones de fondo: la elección de qué activos define LogiCarga, cómo priorizar el riesgo y qué controles tienen sentido para una empresa de logística (y no para cualquier empresa genérica) requirió indicar explícitamente el contexto de negocio en cada prompt. La principal lección fue que un prompt que menciona la empresa, la vulnerabilidad concreta y el resultado esperado produce contenido directamente utilizable, mientras que una instrucción genérica habría requerido reescribir el contenido desde cero.