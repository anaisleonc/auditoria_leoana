# Políticas de prevención y controles de mitigación — LogiCarga Transportes

## 1. Enfoque

Este documento consolida, desde una perspectiva de gestión de riesgo, las políticas de prevención y los controles de mitigación para las tres vulnerabilidades identificadas, priorizados según el nivel de riesgo determinado en `06_matriz_leoana.md`. Cada medida ataca la **causa raíz** de la vulnerabilidad correspondiente, evitando recomendaciones genéricas no vinculadas a los hallazgos.

## 2. Políticas de prevención (atacan la causa raíz)

| Vulnerabilidad | Riesgo | Política de prevención específica |
|---|---|---|
| Inyección de comandos | 🔴 Crítico | Eliminar la invocación directa de comandos del sistema operativo desde la aplicación; donde sea indispensable, validar la entrada contra una lista blanca estricta (formato de IP mediante expresión regular) y ejecutar sin invocar un shell (`shell=False`). |
| Inyección SQL | 🔴 Crítico | Reemplazar toda consulta SQL construida por concatenación de strings por consultas parametrizadas (prepared statements), de modo que la entrada del usuario nunca se interprete como código SQL. |
| XSS (Reflected) | 🟠 Alto | Escapar automáticamente toda salida que incluya contenido ingresado por el usuario (React lo hace por defecto si no se usa `dangerouslySetInnerHTML`), y restringir el campo de notas a texto plano sin etiquetas HTML, validado tanto en frontend como en backend. |

## 3. Controles de mitigación (capa adicional, distinta de la prevención)

| Vulnerabilidad | Control de mitigación | Marco de referencia |
|---|---|---|
| Inyección de comandos | Ejecutar el proceso del portal con un usuario de sistema operativo de privilegios mínimos, sin permisos de lectura sobre archivos sensibles del sistema ni de ejecución de comandos administrativos. | CIS Controls v8 — Control 5 (Account Management) y Control 3 (Data Protection) |
| Inyección SQL | Configurar la cuenta de base de datos usada por la aplicación con permisos restringidos solo a las tablas y operaciones necesarias para el login y consulta de envíos (sin acceso a tablas de otras áreas del negocio). | OWASP Top 10 (A03:2021 — Injection) / Principio de mínimo privilegio |
| XSS (Reflected) | Implementar una cabecera Content-Security-Policy (CSP) que restrinja la ejecución de scripts no autorizados, como defensa adicional ante un posible fallo en el escape de salida. | OWASP Cheat Sheet Series — XSS Prevention |

## 4. Priorización de implementación

Siguiendo la matriz de riesgo (`06_matriz_leoana.md`), se recomienda implementar las medidas en este orden:

1. **Inyección de comandos** — prevención y mitigación inmediatas (riesgo crítico, compromete el servidor completo).
2. **Inyección SQL** — prevención y mitigación inmediatas (riesgo crítico, compromete la base completa de clientes).
3. **XSS (Reflected)** — implementación en el corto plazo (riesgo alto, impacto acotado a la sesión comprometida).

## 5. Control transversal recomendado: monitoreo centralizado

Más allá de las medidas específicas por vulnerabilidad, se recomienda a LogiCarga implementar un sistema de monitoreo centralizado de logs (alineado a CIS Control 8 — Audit Log Management) que permita detectar patrones de intentos de inyección (SQL, comandos o scripts) en tiempo real, generando alertas tempranas para el equipo de TI antes de que un ataque tenga éxito.