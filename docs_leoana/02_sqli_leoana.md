# Inyección SQL — Portal LogiCarga (formulario de acceso)

## 1. Evidencia del ataque

**Dónde se ejecutó:** Módulo "SQL Injection" de DVWA (curso TI3034), como entorno controlado equivalente al formulario de inicio de sesión del portal de clientes de LogiCarga.

**Payload utilizado:** `' OR '1'='1`
**Resultado obtenido:** [PENDIENTE — pegar aquí la captura cuando se tenga acceso a DVWA. Debe mostrarse el payload ingresado en el campo "User ID" y el listado completo de usuarios devuelto por la aplicación.]
> Nota: la imagen debe guardarse en `docs_leoana/img_leoana/sqli_leoana.png` y además copiarse a `public/img/sqli_leoana.png` para que se muestre en el sitio React (ver Guía 3, sección 7b).

## 2. Por qué funciona esta vulnerabilidad

En el contexto de LogiCarga, el formulario de acceso al portal de clientes recibe un usuario y contraseña, y la aplicación construye una consulta SQL concatenando directamente esa entrada:

```sql
-- Entrada normal (usuario válido)
SELECT * FROM clientes WHERE usuario = 'empresa1' AND clave = 'clave123'

-- Entrada maliciosa
SELECT * FROM clientes WHERE usuario = '' OR '1'='1' AND clave = ''
```

La comilla simple (`'`) cierra el valor esperado por la consulta, y la condición `OR '1'='1'` se evalúa siempre como verdadera. El motor de base de datos interpreta esto como una condición cumplida para **todas** las filas de la tabla, devolviendo la información de **todas las empresas clientes registradas en el portal**, no solo la del usuario que intentó iniciar sesión.

La causa raíz es que la aplicación no separa los datos ingresados por el usuario de las instrucciones SQL: trata la entrada como parte del código de la consulta, en lugar de tratarla siempre como un dato.

## 3. Clasificación CVSS 3.1

| Métrica | Valor |
|---|---|
| Vector de ataque (AV) | Network |
| Complejidad de ataque (AC) | Low |
| Privilegios requeridos (PR) | None |
| Interacción del usuario (UI) | None |
| Confidencialidad (C) | High |
| Integridad (I) | High |
| Disponibilidad (A) | None |

**Puntaje CVSS 3.1:** 9.1 (Crítica) — Vector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N`
**Severidad estimada:** Alta / Crítica (la exposición de toda la base de clientes corporativos, incluyendo posiblemente credenciales y datos de facturación, justifica un puntaje alto en confidencialidad).

## 4. Política de prevención (causa raíz)

**Consultas parametrizadas (prepared statements):** la aplicación de LogiCarga debe construir las consultas SQL separando siempre la instrucción del dato. El dato del usuario nunca debe concatenarse directamente en el texto de la consulta.

```php
// Vulnerable
$sql = "SELECT * FROM clientes WHERE usuario = '$usuario'";

// Seguro
$stmt = $conn->prepare("SELECT * FROM clientes WHERE usuario = ?");
$stmt->bind_param("s", $usuario);
```

Complementariamente, se debe validar el formato esperado del campo usuario (por ejemplo, longitud máxima y caracteres permitidos) antes de que la entrada llegue a la consulta.

## 5. Control de mitigación

Como capa adicional (no sustituye la prevención), se recomienda:

- **Principio de mínimo privilegio en la base de datos:** la cuenta de base de datos que usa la aplicación del portal no debe tener permisos para leer tablas fuera de lo estrictamente necesario para la operación de login y consulta de envíos.
- **Monitoreo y alertas (referencia OWASP):** implementar reglas de detección de patrones de inyección SQL en los logs de acceso (alineado a OWASP Top 10 — A03:2021 Injection), de modo que intentos repetidos de este tipo generen una alerta temprana para el equipo de TI de LogiCarga.

## 6. Relación con los activos de LogiCarga

Esta vulnerabilidad compromete directamente dos activos críticos: **los datos de las empresas clientes** (RUT, contacto, dirección) y las **credenciales de acceso**, ya que una consulta sin protección puede exponer la tabla completa de usuarios y contraseñas del portal corporativo.