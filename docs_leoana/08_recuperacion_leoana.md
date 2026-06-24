# Mejora tecnológica y plan de recuperación ante desastres — LogiCarga Transportes

## 1. Mejoras tecnológicas propuestas

Más allá de corregir el código vulnerable (ver `07_controles_leoana.md`), se proponen mejoras de infraestructura que reducen el riesgo de forma transversal a las tres vulnerabilidades:

### 1.1 Web Application Firewall (WAF)

Implementar un WAF entre internet y el servidor del portal de LogiCarga. Un WAF analiza el tráfico HTTP en tiempo real y puede bloquear patrones característicos de inyección SQL, XSS e inyección de comandos (por ejemplo, secuencias como `' OR '1'='1`, etiquetas `<script>`, o caracteres `;` `|` en campos que no los esperan) **antes** de que lleguen a la aplicación. Actúa como una capa de defensa adicional, incluso si una vulnerabilidad en el código pasara inadvertida.

### 1.2 Segmentación de red

Separar el servidor del portal de clientes de los sistemas internos de LogiCarga (por ejemplo, el sistema de planificación de rutas o el sistema contable interno), mediante subredes distintas y reglas de firewall. Así, si el servidor del portal es comprometido (como en el escenario de inyección de comandos), el atacante no obtiene automáticamente acceso a sistemas internos críticos de la operación logística.

### 1.3 Autenticación de doble factor (2FA) para cuentas corporativas

Dado que las credenciales de acceso son uno de los activos más críticos (ver `05_activos_leoana.md`), se recomienda exigir un segundo factor de autenticación (código temporal vía aplicación o SMS) para las cuentas corporativas que acceden al portal, reduciendo el impacto de un robo de credenciales mediante inyección SQL o XSS.

## 2. Plan de recuperación ante desastres (DR)

### 2.1 Respaldo (backup)

- **Qué respaldar:** la base de datos de clientes, historial de envíos y facturación (activos 1, 3 y 4).
- **Frecuencia:** respaldo automático diario, con retención de al menos 30 días.
- **Ubicación:** respaldo almacenado en una ubicación distinta al servidor de producción (idealmente en otra región o proveedor cloud), para que un incidente sobre el servidor principal no afecte también al respaldo.

### 2.2 Restauración

- **Objetivo de tiempo de recuperación (RTO):** definir un máximo de 4 horas para restaurar el portal a un estado operativo tras un incidente, dado que cada hora de caída afecta la visibilidad de envíos de todos los clientes corporativos activos.
- **Objetivo de punto de recuperación (RPO):** máximo 24 horas de datos perdidos (equivalente a la frecuencia de respaldo diario), priorizando ajustar este valor a un respaldo más frecuente si el volumen de envíos diarios de LogiCarga lo justifica.
- **Procedimiento:** mantener un entorno de respaldo (servidor secundario o snapshot de infraestructura) listo para ser activado, de modo que la restauración no dependa de reconstruir el servidor desde cero.

### 2.3 Notificación

- **Interna:** notificación inmediata al equipo de TI y a la gerencia de LogiCarga ante la detección de un incidente (idealmente automatizada, mediante las alertas de monitoreo propuestas en `07_controles_leoana.md`).
- **Externa:** notificación a las empresas clientes afectadas dentro de un plazo razonable, especialmente si el incidente involucró exposición de sus datos (activo 1) o de su información de facturación (activo 4), en línea con las obligaciones de la Ley 19.628 sobre protección de datos de carácter personal.

## 3. Síntesis

La combinación de mejoras tecnológicas (WAF, segmentación, 2FA) reduce la **probabilidad** de que las vulnerabilidades sean explotadas con éxito, mientras que el plan de recuperación ante desastres reduce el **impacto** de un incidente que sí logre concretarse, acotando el tiempo de indisponibilidad del portal y la pérdida de información para LogiCarga y sus clientes corporativos.