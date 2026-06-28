# Bitácora de uso de Inteligencia Artificial — LogiCarga Transportes

## Herramienta utilizada

Usé Claude (de Anthropic) como apoyo durante todo el trabajo. Lo usé como un asistente con el que iba conversando, no como algo que me hiciera el trabajo de un golpe — le iba pidiendo cosas puntuales y revisando lo que me daba antes de usarlo.

## Registro de prompts por sección

### Resumen de la empresa

Le pedí que me ayudara a armar el contexto de LogiCarga: cómo sería el portal, qué cosas maneja (rastreo, facturación, notas de entrega) y cómo conectar eso con las tres vulnerabilidades que tenía que mostrar.

Lo que usé tal cual: la idea general del portal y cómo cada función se conectaba con un ataque.

Lo que cambié: le pedí que agregara un activo más, porque con 4 quedaba muy al límite de lo que pedía la rúbrica, y también que explicara mejor por qué LogiCarga sería un blanco atractivo para alguien que quisiera atacarlo.

### Los 3 ataques (SQLi, XSS, comandos)

Para cada uno le pedí que me explicara técnicamente por qué funcionaba en el caso de LogiCarga, que me diera las métricas para el CVSS, y que la prevención fuera algo concreto (no "actualizar el sistema" sin más), además de una mitigación con algún marco de referencia como OWASP o CIS.

Lo que usé tal cual: la explicación de cómo funciona cada ataque y los ejemplos de código vulnerable vs. seguro.

Algo que tuve que corregir yo: al copiar el payload de SQL injection, las comillas simples se cambiaron solas por comillas "curvas" (de esas que pone el computador automáticamente), y eso hacía que el payload no fuera el correcto. Lo noté y lo arreglé a mano, dejando las comillas rectas como tienen que ser para que funcione en DVWA.

### Activos, matriz, controles y recuperación

Acá le pedí que armara la matriz de riesgo cruzando probabilidad e impacto, pero que cada vulnerabilidad quedara ubicada según los activos que realmente comprometía, no al azar. También que las medidas de prevención y mitigación siguieran ese mismo orden de prioridad.

Lo que usé tal cual: el orden de prioridad (comandos > SQL > XSS) y por qué tenía sentido ese orden.

Lo que pedí cambiar: en el plan de recuperación, en vez de dejarlo genérico ("tener respaldos"), le pedí que pusiera números concretos (cada cuánto se respalda, cuánto se demora en recuperarse), para que fuera algo medible de verdad.

### Componentes React (sitio web)

Le pedí que convirtiera cada archivo de texto en un componente de React, manteniendo el contenido que ya había escrito, pero agregándole forma visual: tarjetas, tablas, y el mapa de calor con colores.

Lo que usé tal cual: la estructura de las tarjetas y cómo armó la tabla de CVSS y el mapa de calor.

Lo que tuve que arreglar yo misma (con ayuda para detectar el error, pero el error era mío): se me había olvidado instalar Tailwind, así que el sitio se veía sin estilos. También tuve un error porque no había instalado la librería de íconos antes de usarla. Los fui solucionando paso a paso hasta que funcionó.

### Inserción de capturas reales y cálculo de CVSS

Esto lo hice cuando ya tenía acceso a DVWA. Hice los 3 ataques yo misma, tomé las capturas, y pedí ayuda para saber en qué carpetas exactas tenían que ir esas imágenes dentro del proyecto, y cómo conectarlas a los componentes.

Algo que se me complicó: al copiar las imágenes a las carpetas, sin darme cuenta les quedó el nombre duplicado con la extensión repetida (algo así como `sqli_leoana.png.png`), y por eso no se veían en el sitio. Lo detecté revisando por qué no cargaban, y corregí los 6 nombres de archivo a mano.

Algo que hice completamente sola: calculé yo misma los 3 puntajes de CVSS en la calculadora oficial (la del sitio first.org), eligiendo cada valor según lo que sabía de cada vulnerabilidad. Los resultados me dieron 9.1 para SQL injection, 6.1 para XSS y 10.0 para inyección de comandos — y antes de usarlos los verifiqué para asegurarme de que tenían sentido con la gravedad de cada ataque.

## Reflexión final

Usar IA me ayudó a no quedarme trabada, a poder organizarme mejor. Pero igual tuve que tomar yo las decisiones importantes: qué activos tenía sentido que protegiera una empresa de logística, cómo priorizar los riesgos, y qué controles realmente servían para este caso y no para una empresa cualquiera. Si solo hubiera pedido "hazme un informe de seguridad" sin dar el contexto de LogiCarga, me habría salido algo genérico que no hubiera servido. Lo que más aprendí es que la calidad de lo que pides importa tanto como la herramienta misma.