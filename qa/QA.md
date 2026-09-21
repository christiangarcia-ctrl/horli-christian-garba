# QA — HORLI V2

Fecha: 2026-09-21.

## Resultado local

PASS en Chromium: 390×844, 430×932, 768×1024, 1440×900 y 1920×1080.
PASS en WebKit: 390×844 y 430×932 con emulación táctil, DPR 2 y movimiento normal.

- Siete escenas completas. Flechas visibles, teclado, enlaces y scroll nativo.
- Última escena permanece en 07; volver al principio requiere el enlace explícito.
- Tres opciones Familia/Retiro/Patrimonio correctas; también sin JavaScript.
- Cinco frases accesibles con scroll horizontal, flechas y teclado; sin loop.
- Sin overflow horizontal en las cinco dimensiones, ni tras reducir 150 px la altura del viewport móvil.
- Fotos cargadas, con proporciones conservadas y recortes revisados en capturas. Cuatro rostros visibles en la escena familiar.
- Capturas revisadas por escena en móvil y desktop y composición familiar en tablet.
- Reduced motion desactiva animaciones y desplazamiento suave.
- Sin excepciones JavaScript ni solicitudes fallidas en el recorrido HTTP local.
- Redes y WhatsApp conservan exactamente los destinos autorizados; enlaces externos con `noopener noreferrer`.
- Logo original sin alteración. Imagen social 1200×630 revisada.
- Sitio estático completo (HTML/CSS/JS + todos los assets): aproximadamente 550 KiB. No hay librerías ni fuentes remotas. Fotos WebP con `srcset`; hero prioritario, resto lazy.

Evidencia: `results.json` y `browser-results.json`. Las capturas se guardan localmente en `screenshots/` y no se publican en Git.

## Límites

WebKit de escritorio con emulación móvil no equivale a una prueba en un iPhone físico ni en cada navegador embebido de WhatsApp. Los cambios de alto se simularon; no se controló la barra real de Safari. La duración 60–90 s es un objetivo editorial, no una medición con usuarios. El tiempo de carga local no representa una red móvil real. Las cuentas sociales pueden pedir inicio de sesión; no se enviaron mensajes ni se iniciaron sesiones en ellas.
