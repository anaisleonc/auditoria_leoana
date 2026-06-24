# Resumen — Auditoría de Seguridad LogiCarga Transportes

## Empresa auditada

**LogiCarga Transportes** es una empresa del rubro de logística y encomiendas, dedicada al transporte y envío de mercadería para clientes corporativos (empresas que despachan productos de forma regular a través de su red de distribución).

## El portal de clientes

LogiCarga ofrece a sus clientes corporativos un **portal web** donde cada empresa cliente puede, mediante un usuario y contraseña:

- **Rastrear sus envíos** en tiempo real, buscando por número de guía.
- **Consultar su historial de despachos**, incluyendo origen, destino y valor declarado de la mercadería.
- **Revisar su facturación**, montos y condiciones de pago.
- **Dejar notas o comentarios de entrega**, visibles para el equipo de soporte y otros usuarios autorizados de la misma cuenta corporativa.

## Por qué este portal es un activo crítico

El portal no es solo una herramienta operativa: concentra información sensible de **decenas de empresas clientes**, no solo de LogiCarga. Un incidente de seguridad en este portal no afecta únicamente a la imagen de LogiCarga, sino que expone a sus clientes corporativos a riesgos directos sobre su propia operación (mercadería, datos de contacto, información financiera).

LogiCarga es además un blanco especialmente atractivo para un atacante por tres razones: (1) mueve mercadería de valor económico real, no solo información, por lo que el riesgo no es únicamente la fuga de datos sino la posibilidad de desviar o interceptar envíos; (2) depende de la continuidad operativa del portal — si el sitio cae o queda comprometido, decenas de empresas clientes quedan sin visibilidad de sus despachos; y (3) concentra en un solo punto los datos de múltiples empresas clientes, lo que multiplica el impacto de un solo incidente.

## Activos de información que protege el portal

| Activo | Descripción |
|---|---|
| Datos de empresas clientes | Razón social, RUT, dirección, contacto |
| Credenciales de acceso | Usuario y contraseña del portal corporativo |
| Historial de envíos | Origen, destino, contenido y valor declarado |
| Datos de facturación y pago | Montos, condiciones de pago, datos bancarios |
| Infraestructura del portal y servidor | Disponibilidad del sitio y del servidor que procesa las solicitudes |

## Alcance de esta auditoría

Esta auditoría reproduce, en un ambiente controlado y autorizado (DVWA), tres vulnerabilidades equivalentes a las que podrían afectar un portal como el de LogiCarga: **inyección SQL** (sobre el formulario de acceso), **XSS** (sobre el campo de notas/comentarios) y **inyección de comandos** (sobre una función interna de generación de reportes del servidor). Para cada una se documenta evidencia, explicación técnica, severidad CVSS y medidas de prevención y mitigación específicas para el contexto de LogiCarga. 