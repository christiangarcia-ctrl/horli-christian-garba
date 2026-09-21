# Christian García · HORLI V2

Una historia web de siete escenas para conocer a Christian, recordar su enfoque y reconocer cuándo presentarle a alguien. Proyecto independiente. HTML, CSS y JavaScript nativos; sin dependencias de producción, servicios externos, tracking ni compilación.

URL prevista: https://christiangarcia-ctrl.github.io/horli-christian-garba/

## Ver y editar

Abrir `index.html` directamente o servir esta carpeta con `python3 -m http.server 8000`.

- `index.html`: historia, opciones interactivas, contactos y metadatos.
- `style.css`: dirección editorial, responsive y reduced motion.
- `story.js`: indicadores, flechas de escena y controles de frases.
- `assets/`: fotografías WebP responsivas, logo original y preview social.

El scroll vertical, los enlaces, el carrusel horizontal y las opciones Familia/Retiro/Patrimonio funcionan sin JavaScript. No hay avance automático ni loop. Las flechas izquierda/derecha recorren las escenas; dentro de opciones y frases conservan la navegación propia del control. Reiniciar es una acción explícita.

Se usa `100svh` con fallback `100vh` para mantener estable la composición al aparecer/desaparecer la barra de Safari. Las escenas pueden crecer si el contenido lo requiere. La barra de navegación respeta safe areas. Fuentes de sistema: Georgia y Arial; sin descargas externas.

## Dirección

Se exploraron tres rutas: una secuencia de manifiestos tipográficos; un documental centrado en fotos; y una conversación interactiva basada en frases de referencia. Se eligió combinar una historia fotográfica editorial con la interacción de escucha: muestra quién es Christian y deja una señal fácil de recordar.

Arco: negocios → personas → lo que estás construyendo → escuchar una necesidad → conectar relaciones. Los fondos cálidos rompen el ritmo del navy; la familia tiene un momento de fotografía dominante; las frases se descubren una a una. El visitante controla la duración, con un recorrido principal pensado para 60–90 segundos y exploración opcional.

## Recursos originales

- Retrato: `IMG-20241230-WA0020.jpg`, banco fotográfico original de Christian. Se optimizó a WebP; no se generó ni retocó la identidad.
- Foto familiar: imagen de 1066 × 1600 incrustada en el HTML HORLI aportado por Christian. Jessica, Ivanna y Mateo están identificados por el material y el brief.
- Foto de trabajo: `IMG-20241230-WA0018.jpg`, mismo banco original.
- Logo: `marca/logo/logo-horizontal-fondo-oscuro.png`, copiado sin alterar. Favicon: isotipo original.
- Open Graph: composición de 1200 × 630 con el retrato y logo originales. Sin fotografías sintéticas.

No se incorporaron el PDF privado, registros de clientes ni otros datos de terceros del documento fuente.

WhatsApp validado contra la fuente canónica del proyecto al 2026-09-21: `https://wa.me/526623072573`. Redes según el brief.

## QA reproducible

Con Playwright disponible: `node qa/check.cjs`. Si está instalado fuera de esta carpeta, indicar `PLAYWRIGHT_MODULE` con la ruta del módulo. Instalar los navegadores Chromium y WebKit en ese entorno. Se puede indicar `BASE_URL` para probar la publicación.

Resultados: `qa/results.json`. Capturas locales: `qa/screenshots/` (excluidas de Git). Ver `qa/QA.md` para evidencia y límites.

## Publicación

GitHub Pages, rama `main`, carpeta raíz. `.nojekyll` conserva el sitio estático. Las rutas de assets son relativas; los metadatos canónicos y Open Graph apuntan a la URL pública prevista. La caché de WhatsApp puede tardar en reflejar cambios de preview.
