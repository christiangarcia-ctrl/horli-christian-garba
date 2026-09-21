# QA — HORLI: relación y reciprocidad

Fecha: 2026-09-21. Intervención sobre la V2 existente.

## Resultado local

PASS en Chromium: 390×844, 430×932, 768×1024, 1440×900 y 1920×1080.
PASS en WebKit: 390×844 y 430×932, emulación táctil DPR 2 y movimiento normal.

- Ocho escenas revisadas en capturas completas, móvil y desktop. Tablet revisada para trayectoria y logos.
- Recorrido 01/08 → 08/08; última escena sin loop; reinicio explícito. Flechas visibles, teclado y scroll nativo conservados.
- Enlace directo `#conectar` carga en 08/08 en Chromium y WebKit.
- Familia/Retiro/Patrimonio y Objetivo/Conexión/Oportunidad funcionan con JavaScript y sin él.
- Tres conversaciones recíprocas verificadas por tap en Chromium y WebKit; todas usan el WhatsApp canónico y no envían mensajes automáticamente.
- Cinco frases conservadas, navegables; detalle opcional de cine abre/cierra correctamente.
- Sin overflow horizontal ni elementos fuera de los límites de escena en los cinco tamaños. Sin overflow al reducir 150 px el alto móvil.
- Fotos y logos sin deformación; familia con cuatro rostros visibles. Proporciones de logos verificadas también por geometría en ambos motores.
- Logo GarBa idéntico byte a byte al original. Fotos, favicon y preview social conservados. Fuentes de nuevos logos en `assets/SOURCES.md`.
- Reduced motion desactiva animación y desplazamiento suave; foco visible, controles nativos y enlaces externos seguros.
- Sin errores JavaScript ni requests fallidos durante los recorridos HTTP locales.
- HTML/CSS/JS + todos los assets visuales: 590532 bytes (aprox. 577 KiB), incremento de unos 27 KB. Sin dependencias de producción ni fuentes externas.

Evidencia: `results.json`, `browser-results.json`; capturas locales en `screenshots/`, excluidas de Git. Evaluación de las cinco preguntas narrativas en `HORLI.md`.

## Límites

WebKit móvil emulado no sustituye una prueba en iPhone físico ni en cada navegador embebido. La barra dinámica se aproxima con cambios de alto; no se controla la barra real de Safari. El recorrido 60–90 s es un objetivo editorial, no una medición con usuarios. Las cuentas sociales pueden requerir inicio de sesión. No se enviaron mensajes ni se iniciaron sesiones en ellas.

La evidencia de publicación anterior en `live-results.json` se actualizará al terminar el despliegue de esta revisión.
