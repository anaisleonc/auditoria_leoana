# Matriz de riesgo — LogiCarga Transportes

## 1. Metodología

La matriz de riesgo cruza dos dimensiones para cada vulnerabilidad detectada:

- **Probabilidad de ocurrencia:** qué tan fácil es que un atacante explote la vulnerabilidad, considerando la complejidad técnica requerida y la exposición del portal (público, accesible desde internet).
- **Impacto en el negocio:** qué tan grave es la consecuencia para LogiCarga y sus clientes corporativos si la vulnerabilidad es explotada, considerando los activos comprometidos (ver `05_activos_leoana.md`).

Ambas dimensiones se califican en escala de 1 a 5 (1 = muy bajo, 5 = muy alto), y su cruce determina el nivel de riesgo según el siguiente mapa de calor.

## 2. Mapa de calor (probabilidad × impacto)

| Probabilidad ↓ / Impacto → | 1 (Muy bajo) | 2 (Bajo) | 3 (Medio) | 4 (Alto) | 5 (Muy alto) |
|---|---|---|---|---|---|
| **5 (Muy alta)** | 🟡 | 🟠 | 🔴 | 🔴 | 🔴 |
| **4 (Alta)** | 🟡 | 🟡 | 🟠 | 🔴 | 🔴 |
| **3 (Media)** | 🟢 | 🟡 | 🟠 | 🟠 | 🔴 |
| **2 (Baja)** | 🟢 | 🟢 | 🟡 | 🟠 | 🟠 |
| **1 (Muy baja)** | 🟢 | 🟢 | 🟢 | 🟡 | 🟠 |

**Leyenda:** 🟢 Riesgo bajo (aceptable, monitorear) · 🟡 Riesgo medio (gestionar en plazo razonable) · 🟠 Riesgo alto (atender pronto) · 🔴 Riesgo crítico (atender de inmediato)

## 3. Ubicación de las 3 vulnerabilidades en la matriz

| Vulnerabilidad | Probabilidad | Justificación de probabilidad | Impacto | Justificación de impacto | Nivel de riesgo |
|---|---|---|---|---|---|
| Inyección de comandos | 5 (Muy alta) | Explotación trivial (un solo carácter `;`), no requiere autenticación ni conocimientos avanzados; el campo está expuesto en una función accesible del portal. | 5 (Muy alto) | Compromete el servidor completo: confidencialidad, integridad y disponibilidad de **todos** los activos a la vez (ver activo 5 y 6). | 🔴 Crítico |
| Inyección SQL | 5 (Muy alta) | Explotación trivial (`' OR '1'='1`), no requiere autenticación previa; el formulario de login es público. | 4 (Alto) | Expone la base completa de clientes corporativos y posiblemente credenciales, pero no compromete el servidor ni la disponibilidad del servicio. | 🔴 Crítico |
| XSS (Reflected) | 4 (Alta) | Explotación sencilla, pero requiere que la víctima (otro usuario del portal) interactúe con el contenido inyectado para activarse. | 3 (Medio) | El impacto depende de qué cuenta sea robada; afecta confidencialidad de forma acotada a la sesión comprometida, sin afectar el servidor ni la base completa. | 🟠 Alto |

## 4. Priorización de atención

1. **Inyección de comandos** — atención inmediata. Es la única de las tres que compromete simultáneamente confidencialidad, integridad y disponibilidad, afectando el servidor del cual dependen todos los demás activos.
2. **Inyección SQL** — atención inmediata. Aunque no compromete el servidor, expone de forma directa y sin necesidad de interacción de un tercero la totalidad de los datos de clientes corporativos, el activo de mayor volumen.
3. **XSS (Reflected)** — atención en el corto plazo. Su explotación depende de que un usuario interactúe con el contenido malicioso, lo que reduce (sin eliminar) la probabilidad efectiva de un incidente exitoso a gran escala.

Esta priorización es coherente con la clasificación CVSS de cada vulnerabilidad (ver `02_sqli_leoana.md`, `03_xss_leoana.md`, `04_comandos_leoana.md`): inyección de comandos y SQL fueron clasificadas como Crítica/Alta, mientras que XSS fue clasificada como Media.

## 5. Representación visual en el sitio

Esta matriz se representa también como un componente visual (mapa de calor con colores) en `src/components/Matriz.jsx`, donde cada vulnerabilidad se ubica como un punto o celda destacada dentro de la grilla 5×5, facilitando la lectura rápida del nivel de riesgo por parte de la gerencia de LogiCarga.