# Activos de información y riesgos según la industria — LogiCarga Transportes

## 1. Contexto de la industria

LogiCarga Transportes opera en el rubro de **logística y encomiendas**, prestando servicios de transporte y distribución de mercadería a empresas clientes (no a consumidores finales). Esta característica define el perfil de riesgo de la compañía: no se trata de proteger datos de consumidores individuales, sino información operativa y comercial de **otras empresas**, lo que implica responsabilidad contractual y reputacional directa frente a clientes corporativos.

En logística, los tres elementos de mayor valor para un atacante son: (1) la **cadena de custodia** de la mercadería (saber qué se transporta, cuándo y por dónde, permite planificar robos o desvíos), (2) la **continuidad operativa** (un portal caído detiene la visibilidad de despachos para decenas de clientes a la vez), y (3) la **información comercial** de las empresas clientes (contratos, tarifas, volúmenes), que tiene valor para la competencia.

## 2. Identificación y clasificación de activos

| # | Activo | Tipo de activo | Descripción | Confidencialidad | Disponibilidad requerida |
|---|---|---|---|---|---|
| 1 | Base de datos de clientes corporativos | Información | Razón social, RUT, dirección, nombre de contacto, teléfono, correo de cada empresa cliente | Alta | Media |
| 2 | Credenciales de acceso al portal | Información / Acceso | Usuarios y contraseñas de las cuentas corporativas que acceden al portal | Crítica | Alta |
| 3 | Historial y detalle de envíos | Información | Origen, destino, contenido declarado y valor declarado de cada encomienda | Alta | Alta |
| 4 | Datos de facturación y pago | Información | Montos facturados, condiciones de pago, datos bancarios para cobro/transferencia | Crítica | Media |
| 5 | Servidor y aplicación del portal web | Tecnológico (infraestructura) | Servidor que aloja el portal de clientes y procesa las solicitudes de login, consulta y reportes | Media | Crítica |
| 6 | Disponibilidad del servicio de rastreo | Servicio | Capacidad del portal de mostrar el estado de los envíos en tiempo real a los clientes | Media | Crítica |

> Se identifican 6 activos (4 de información, 1 tecnológico y 1 de servicio), superando el mínimo de 4 solicitado, para reflejar que el riesgo de LogiCarga no es solo de "fuga de datos" sino también de **continuidad operativa**, propio del rubro logístico.

## 3. Vínculo entre cada vulnerabilidad y los activos que pone en riesgo

| Vulnerabilidad | Activos comprometidos | Cómo se compromete |
|---|---|---|
| Inyección SQL (formulario de acceso) | Activo 1 (clientes), Activo 2 (credenciales) | Una consulta sin protección permite extraer la tabla completa de usuarios y empresas registradas, exponiendo confidencialidad de ambos activos a la vez. |
| XSS (notas de entrega) | Activo 2 (credenciales, vía robo de sesión), Activo 3 (historial de envíos, una vez robada la sesión) | El script inyectado puede robar la sesión activa de un operador y, con esa sesión, acceder a la información de envíos visible para esa cuenta. |
| Inyección de comandos (función de reporte/servidor) | Activo 5 (servidor), y de forma transitiva, todos los demás (1, 2, 3, 4) | Al tomar control del servidor, un atacante accede directamente a los archivos y bases de datos donde residen el resto de los activos, y puede además afectar el Activo 6 (disponibilidad), por ejemplo eliminando procesos o archivos del sistema. |

## 4. Por qué estos activos son críticos para el negocio de LogiCarga (no solo técnicamente)

- **Activo 1 y 4 (datos de clientes y facturación):** su filtración expone a LogiCarga a **responsabilidad contractual** frente a sus clientes corporativos y a sanciones bajo la Ley 19.628 sobre protección de datos de carácter personal (aplicable también a datos de contacto de personas naturales que representan a las empresas).
- **Activo 3 (historial de envíos):** revela patrones operativos (qué mueve cada cliente, con qué frecuencia, hacia dónde), información que tiene valor competitivo y que, si se conoce con anticipación, facilita el robo físico de mercadería en tránsito.
- **Activo 5 y 6 (servidor y disponibilidad):** una caída del portal no es solo un problema técnico — significa que ninguna empresa cliente puede rastrear sus envíos ese día, lo que daña la confianza y puede activar cláusulas de incumplimiento en contratos de nivel de servicio (SLA).

## 5. Conclusión preliminar para la matriz de riesgo

De los tres ataques evaluados, la **inyección de comandos** es la que pone en riesgo la mayor cantidad de activos simultáneamente (al comprometer el servidor, compromete todo lo demás), seguida por la **inyección SQL** (compromete directamente dos activos de información crítica) y, en tercer lugar, el **XSS** (impacto más acotado, condicionado a que la víctima interactúe con el contenido malicioso). Esta priorización se desarrolla con mayor detalle en el archivo `06_matriz_leoana.md`.