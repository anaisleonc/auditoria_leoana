# Inyección de comandos — Portal LogiCarga (generación de reportes)

## 1. Evidencia del ataque

**Dónde se ejecutó:** Módulo "Command Injection" de DVWA (curso TI3034), como entorno controlado equivalente a una función interna del portal de LogiCarga que verifica la conectividad de un servidor o genera un reporte ejecutando una herramienta del sistema.

**Payload utilizado:** `127.0.0.1; cat /etc/passwd`

**Resultado obtenido:** [PENDIENTE — pegar aquí la captura cuando se tenga acceso a DVWA. Debe mostrarse el resultado del ping y, además, el contenido del archivo /etc/passwd expuesto.]

> Nota: la imagen debe guardarse en `docs_leoana/img_leoana/comandos_leoana.png` y además copiarse a `public/img/comandos_leoana.png` para que se muestre en el sitio React.

## 2. Por qué funciona esta vulnerabilidad

En el contexto de LogiCarga, se asume una función administrativa del portal que permite verificar el estado de un servidor (por ejemplo, comprobar si un punto de distribución está en línea) ejecutando un comando de "ping" sobre una IP. La aplicación construye este comando concatenando directamente la entrada del usuario:

```bash
# Entrada normal (IP válida)
ping -c 4 127.0.0.1   → solo ejecuta el ping

# Entrada maliciosa
ping -c 4 127.0.0.1; cat /etc/passwd   → ejecuta el ping Y además lee un archivo del servidor
```

El carácter punto y coma (`;`) le indica al sistema operativo que ejecute un comando y, a continuación, el siguiente. Como la aplicación pasa la entrada del usuario directamente al sistema operativo sin separar el dato de la instrucción, el servidor ejecuta ambos comandos: el ping esperado y el comando adicional que el atacante insertó.

La causa raíz es la misma que en las dos vulnerabilidades anteriores: la aplicación no separa los datos ingresados por el usuario de las instrucciones que ejecuta — en este caso, instrucciones del sistema operativo, no de una base de datos ni del navegador. Esto la convierte en una de las vulnerabilidades más críticas, porque permite tomar control directo del servidor (leer archivos, eliminarlos, o instalar software).

## 3. Clasificación CVSS 3.1

| Métrica | Valor |
|---|---|
| Vector de ataque (AV) | Network |
| Complejidad de ataque (AC) | Low |
| Privilegios requeridos (PR) | None |
| Interacción del usuario (UI) | None |
| Confidencialidad (C) | High |
| Integridad (I) | High |
| Disponibilidad (A) | High |

**Puntaje CVSS 3.1:** [PENDIENTE — calcular en https://www.first.org/cvss/calculator/3.1 con los valores de la tabla anterior]
**Severidad estimada:** Crítica (compromete confidencialidad, integridad y disponibilidad a la vez — es la vulnerabilidad de mayor severidad de las tres, ya que implica control sobre el servidor mismo).

## 4. Política de prevención (causa raíz)

**No transferir la entrada del usuario directamente al sistema operativo.** Siempre que sea posible, evitar invocar comandos de terminal desde la aplicación y usar en su lugar bibliotecas o APIs nativas del lenguaje de programación que cumplan la misma función sin pasar por una terminal del sistema.

Cuando ejecutar un comando del sistema sea inevitable, aplicar **listas blancas de entrada**: validar que el campo solo contenga el formato exacto esperado (por ejemplo, una dirección IP válida, mediante una expresión regular), rechazando cualquier carácter especial como `;`, `&`, `|` o `` ` ``.

```python
# Vulnerable
os.system(f"ping -c 4 {ip_ingresada}")

# Seguro (valida formato antes de ejecutar, y evita el shell)
import re, subprocess
if re.fullmatch(r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}", ip_ingresada):
    subprocess.run(["ping", "-c", "4", ip_ingresada], shell=False)
```

## 5. Control de mitigación

- **Principio de mínimo privilegio del proceso del servidor:** la cuenta del sistema operativo bajo la cual corre la aplicación del portal no debe tener permisos para leer archivos sensibles del sistema (como `/etc/passwd`) ni para ejecutar comandos administrativos.
- **Segmentación y monitoreo (referencia OWASP — A03:2021 Injection / CIS Controls):** aislar el servidor del portal en una red separada del resto de la infraestructura de LogiCarga, y registrar/alertar ante la ejecución de comandos del sistema inusuales desde el proceso de la aplicación web.

## 6. Relación con los activos de LogiCarga

Esta es la vulnerabilidad de mayor impacto potencial: al comprometer el servidor mismo, un atacante obtiene acceso indirecto a **todos los activos** del portal (datos de empresas clientes, credenciales, historial de envíos y datos de facturación), además de poder afectar la **disponibilidad del portal completo** para todos los clientes corporativos de LogiCarga.