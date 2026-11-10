# DESIGN.md — Identidad visual «Pixel Explainer»

Sistema visual para todos los videos de este proyecto. Solo identidad visual: el audio queda fuera de alcance.

**Referencia analizada:** reel «Ortho Giants» de @ortho_tidbits (instagram.com/p/DfAs8sCxFQO), 720×1280, 30 fps, 104 s.
Se toma el **estilo**, no el contenido, ni el handle, ni las ilustraciones: usamos nuestro propio handle, textos y arte.

Todas las medidas están en **1080×1920**, escaladas ×1.5 desde la referencia.

---

## 1. Esencia

Explicador educativo vertical en pixel art. Un **escenario claro** presenta fichas de colores sobre una mesa. La cámara entra a cada ficha y la desarrolla sobre un **portapapeles**; arriba hay una **placa de título** fija y los datos van en **subtítulos sobre barras oscuras** con palabras clave resaltadas. Al final la cámara vuelve al escenario y el último frame coincide con el primero (loop).

Principios:

1. **Pixel art nítido.** Todo va en grilla, con bordes duros y sin antialias en el arte. No hay degradados suaves: los degradados son anillos escalonados.
2. **Un mensaje por beat.** Cada beat tiene una placa (de qué hablamos), un subtítulo (el dato) y una ilustración (la prueba visual).
3. **Chrome fijo.** La placa, los subtítulos, el footer y el portapapeles no cambian de posición entre escenas; solo cambia su contenido.
4. **El color tiene significado.** Cada capítulo tiene un color de categoría, que se repite en su ficha, en la barra de la placa y en el recap.
5. **Loop perfecto.** El último frame es igual al primero.

## 2. Formato

| Propiedad | Valor |
| --- | --- |
| Resolución | 1080×1920 (vertical 9:16) |
| FPS | 30 |
| Duración típica | 60–105 s |
| Beat | 4–5 s (120–150 frames) |
| Unidad de pixel `PX` | 6 px = 1 píxel de arte. Tamaños y posiciones del arte en múltiplos de `PX`. |
| Zona segura | Contenido clave entre y=200 y y=1600. Debajo solo van el footer y el watermark, que no son críticos (ahí está la UI de Instagram). |

## 3. Paleta (tokens)

Usar solo estos tokens; no inventar colores sueltos.

### Escenario

| Token | Hex | Uso |
| --- | --- | --- |
| `void` | `#06060C` | Fondo base y esquinas |
| `ring1`…`ring6` | `#1B2732` `#22303F` `#2C3A49` `#354352` `#3F4D5C` `#495A68` | Anillos escalonados del halo, de afuera hacia adentro (~66 px por anillo) |
| `spot` | `#425466` | Núcleo del cono de luz |
| `sparkle` | `#98B8C8` | Destellos en cruz (centro `#DCEFF8`) |
| `dust` | `#7890A4` | Partículas en el cono (40–70 % de opacidad) |
| `lamp` | `#1A2833` | Lámpara del techo (línea inferior `#C8D8E0`) |
| `tableTop` | `#D2DBDE` | Borde superior claro de la mesa |
| `table` | `#3282AB` | Panel frontal de la mesa (listones `#2A6E96`) |
| `tableEdge` | `#091220` | Canto inferior de la mesa |
| `tableLeg` | `#93919F` | Patas |

### Papel y portapapeles

| Token | Hex | Uso |
| --- | --- | --- |
| `paper` | `#F0EADE` | Hoja |
| `paperLine` | `#E0D8C8` | Renglones |
| `paperShade` | `#E4D8C6` | Sombra escalonada del 15 % inferior de la hoja |
| `paperMargin` | `#E4C6C6` | Línea de margen rosa |
| `board` | `#845430` | Marco del portapapeles (borde interior `#784E2A`) |
| `clip` | `#A2AEBA` | Clip metálico (detalles `#6C727E`, brillo `#C8D0D8`) |

### UI y texto

| Token | Hex | Uso |
| --- | --- | --- |
| `plaque` | `#F6F0E4` | Cuerpo de la placa de título |
| `ink` | `#202028` | Texto de la placa y contornos de ilustración |
| `inkGold` | `#A07008` | Palabra destacada en la placa («GIANTS», «RECAP») |
| `captionBg` | `#060612` | Barras de subtítulo (opacidad 92 %) |
| `captionText` | `#F8F8F8` | Texto de subtítulo |
| `hlYellow` | `#F8D040` | Resaltado principal: protagonista, año, nombre, dato clave |
| `hlCyan` | `#58D8F0` | Resaltado secundario: término técnico, segundo concepto |
| `chipBg` | `#423C36` | Fondo de chips de etiqueta (texto en `#F0D050` o `#68E0F8`) |
| `tape` | `#E4D8A8` | Cinta washi (texto `#A0B0B8`) |
| `footerBg` | `#000006` | Chip del footer |
| `footerText` | `#A8B0B8` | Texto gris del footer (la etiqueta de serie va en `hlCyan`) |
| `outline` | `#080810` | Contorno de sprites y fichas |
| `cardBody` | `#F0F0F6` | Cuerpo de la ficha (sombra lateral `#D8DCE4`) |
| `watermark` | `#2A3C4E` | Handle en el escenario (`#3C4650` sobre fondo desenfocado) |

### Colores de categoría (uno por capítulo, en este orden)

| Token | Hex |
| --- | --- |
| `cat1` | `#FCB400` amarillo (también la barra por defecto de la placa) |
| `cat2` | `#3684E4` azul |
| `cat3` | `#EA2A36` rojo |
| `cat4` | `#FC6C18` naranja |
| `cat5` | `#1E4EC0` azul profundo |

## 4. Tipografía

- **Fuente:** [Departure Mono](https://departuremono.com) (pixel, monoespaciada, licencia SIL OFL). Incluye tildes, Ñ y ¿¡. No está en Google Fonts: va como archivo local en `my-video/public/fonts/` y se carga con `@remotion/fonts` (`loadFont` + `staticFile`).
- **Peso:** la referencia es más gruesa. Para engrosarla, usar `WebkitTextStroke: '0.035em currentColor'` y `paintOrder: 'stroke fill'`.
- **Proporción:** la fuente de la referencia tiene letras más altas (alto/ancho ≈ 1.4; Departure Mono ≈ 1.14). Se acepta esa diferencia y no se estira el texto, porque deformaría los píxeles.
- **Caja:** todo en MAYÚSCULAS salvo el watermark, que va en minúsculas.
- **Escala:**

| Rol | font-size | Notas |
| --- | --- | --- |
| Placa de título | 84 px | Mínimo de titular. 1–2 palabras, máx. ~14 caracteres. |
| Subtítulo | 42 px | Máx. 2 líneas, ~24 caracteres por línea |
| CTA, línea 2 | 42 px | En `hlCyan` |
| CTA, línea 1 | 30 px | En `#C8D0D8` |
| Chips y cinta | 27 px | |
| Footer | 27 px | |
| Handle en la barra de la placa | 16 px | Alineado a la derecha, en `#F8F8B0` |
| Watermark | 22 px | Bajo contraste |

**Reglas de copy visual:**
- Usar «+» en lugar de «y».
- Usar «AÑO: dato» con dos puntos.
- Máximo 2 resaltados por subtítulo: amarillo para el protagonista o dato, cian para el término técnico.

## 5. Layout (coordenadas en 1080×1920)

### Chrome fijo (en todas las escenas)

- **Placa de título:** centrada, top y=202.
  - Barra superior de 20 px en el color del capítulo, con el handle del canal a la derecha.
  - Cuerpo `plaque` de 156 px de alto, con el texto centrado.
  - El ancho se ajusta al texto con 80 px de padding por lado (mín. ~450, máx. ~710).
  - Línea punteada `#D8D0C0` (guion 6 / hueco 6) a 12 px del borde inferior.
  - Sombra dura sin blur: 6 px abajo y a la derecha, negro al 50 %.
- **Subtítulos:** cada línea lleva su propia barra `captionBg`, ajustada al texto con 18 px de padding lateral.
  - Línea 1 en y 432–498; línea 2 en y 507–573.
  - Ambas centradas.
- **Footer:** chip centrado en y 1773–1812, con padding de 9 px.
  - Texto: `ETIQUETA DE SERIE · DISCLAIMER`, por ejemplo «HISTORIAS DE EMPRESAS · NO PATROCINADO».
  - La etiqueta va en cian y el resto en gris.
- **Watermark:** nuestro handle en minúsculas.
  - En el escenario: abajo a la izquierda (x 150, y 1575).
  - En el portapapeles: abajo a la derecha, alineado a x 868, y 1660.

### Escena «escenario» (intro, overview, outro)

- **Fondo:** `void` con halo de anillos concéntricos `ring1`→`ring6` centrado en (540, 1050).
- **Lámpara:** x 474–606, y 0–27.
- **Cono de luz:** de la lámpara hacia abajo hasta el ancho de la mesa. Son 3–4 haces superpuestos de blanco al 4–8 % de opacidad.
- **Destellos:** ~25 cruces de 4 puntas (brazos de 9 px, grosor 3 px), repartidos al azar con semilla fija.
- **Mesa:**
  - Borde `tableTop` en y 1242–1254, x 24–1056.
  - Panel `table` en y 1254–1340, con listones verticales cada ~36 px.
  - Canto inferior `tableEdge` de 6 px.
  - Patas de 12 px de ancho en x≈72 y x≈990, hasta y 1458.
- **Sombra de piso:** elipse centrada en (540, 1560), rx 380, ry 60, `#0A121A` al 70 %. Lleva una línea de reflejo `#5C7A90` en y 1532, x 240–840.
- **Fichas sobre la mesa:** 5 fichas de 171×210.
  - x inicial 69, paso de 192, base apoyada en y 1242.
  - Franja superior de 36 px en `catN`.
  - Contorno `outline` de 6 px.
  - Columna de sombra de 15 px a la derecha.
  - Ícono pixel centrado en la zona blanca.
- **Elemento central bajo la placa (y 480–640):** puede ser la cinta washi con el tema (ancho ~285, extremos en zigzag), el hook en subtítulos o el panel CTA.

### Escena «portapapeles» (detalle de cada capítulo)

- **Fondo:** el escenario desenfocado como profundidad de campo: `filter: blur(16px) brightness(0.55)`, `scale: 1.15`. Las fichas de la mesa quedan como manchas de color a los lados.
- **Portapapeles:**
  - Marco `board` en x 165–915, y 578–1587, de 24 px de grosor.
  - Hoja `paper` en x 189–891, y 602–1563.
  - Renglones `paperLine` de 3 px cada 42 px.
  - Margen rosa vertical de 3 px en x≈248.
  - Sombra escalonada en el 15 % inferior de la hoja.
- **Clip:** centrado en x 438–642, y 558–627, montado sobre el borde superior. Lleva dos remaches y una pestaña superior clara.
- **Área de contenido:** x 230–860, y 640–1530.
  - Beat de ficha: la ficha ampliada ocupa x 270–810, y 655–1300, con el chip «EST. AÑO» en y≈1440.
  - Beat de ilustración: un chip de etiqueta arriba (y 678–714) y la ilustración centrada debajo.

## 6. Componentes

| Componente | Descripción |
| --- | --- |
| `Stage` | Fondo con anillos, lámpara, cono, destellos, polvo, mesa y sombra. Acepta `blurred` para usarlo detrás del portapapeles. |
| `TitlePlaque` | `title`, `accent` (token `catN`) y una palabra opcional en `inkGold`. |
| `CaptionBars` | 1–2 líneas con segmentos resaltados en amarillo o cian. |
| `Clipboard` | Marco, clip y hoja rayada; los `children` son la ilustración. |
| `TopicCard` | La ficha: cuerpo blanco, franja `catN`, contorno, sombra lateral e ícono pixel. Se usa pequeña (en la mesa), grande (en el portapapeles) y mini (en el recap). |
| `LabelChip` | Chip `chipBg` con texto amarillo o cian. |
| `TapeTag` | Cinta washi con extremos en zigzag. |
| `FooterChip` | Etiqueta de serie y disclaimer. |
| `CtaPanel` | Fondo `void`, borde `hlCyan` de 6 px, ícono de flecha de «enviar» en cian y dos líneas de texto. |
| `RecapList` | Lista numerada de chips (`1. NOMBRE: DATO`) que alterna amarillo y cian. Las mini fichas se alinean en la base de la hoja. |

**Estilo de las ilustraciones:**
- Pixel art plano sobre el papel, con contorno `ink` de 1 `PX`.
- 1–2 tonos de sombra por material.
- Texturas con dithering o punteado (huesos, arena, tejido).
- Nada de fotos ni vectores suaves.
- Los mecanismos (brazos robot, engranajes) tienen articulaciones que se mueven.

## 7. Estructura visual (plantilla de escenas)

| # | Bloque | Duración | Qué se ve |
| --- | --- | --- | --- |
| 1 | Intro | 0–0.4 s | Escenario vacío, placa con el nombre de la serie y cinta con el tema |
| 2 | Fichas | 0.4–2.8 s | Las 5 fichas caen a la mesa una por una |
| 3 | Hook | ~4.5 s | La cinta se reemplaza por una pregunta en subtítulos |
| 4 | Push-in | ~0.9 s | La cámara entra a la ficha 1 y aparece el portapapeles |
| 5 | Capítulo ×N | ~13–14 s c/u | Beat A: ficha grande + chip «EST. AÑO». Beats B y C: ilustración + dato. La placa cambia al nombre y color del capítulo. |
| 6 | Contexto | ~13 s | Capítulo de cierre temático con la misma estructura (placa con palabra en `inkGold`) |
| 7 | Recap | ~8 s | Placa «RECAP» en `inkGold`; ítems numerados y mini fichas aparecen uno a uno |
| 8 | Push-out + CTA | ~4 s | Vuelta al escenario con el panel CTA («ENVÍA ESTO A ALGUIEN QUE…») |
| 9 | Cierre en loop | ~2 s | Las fichas se retiran en orden inverso, el CTA se apaga y vuelve la cinta: último frame = frame 0 |

## 8. Movimiento (en frames a 30 fps)

Todo se anima con `useCurrentFrame()` + `interpolate()`/`Easing`; nunca con CSS `transition`/`animation`.

| Animación | Timing | Detalle |
| --- | --- | --- |
| Caída de ficha a la mesa | Una cada 14 f; caída de 6 f | Sale de −90 px con opacidad 0.3→1 y `Easing.out(Easing.cubic)`, sin rebote |
| Push-in a una ficha | 27 f en total | Zoom 1→3 anclado en la ficha durante 15 f (`Easing.in(Easing.cubic)`). En paralelo, un flash `#DDE6EE` sube de 0→1 entre los frames 8–15, se mantiene 3 f y baja 1→0 en 9 f mientras aparece el portapapeles. |
| Push-out (outro) | 27 f | El push-in invertido |
| Cambio de capítulo | Salida 9 f, entrada 5 f | Fade de la ilustración y el subtítulo. La placa cambia de texto y de color de barra en el corte. |
| Cambio de beat | Crossfade de ~6 f | Subtítulo e ilustración |
| Entrada de objetos | 8–12 f | Deslizan (ease-out) o crecen desde 0.9 |
| Chips | 10–15 f después del objeto | Fade-in |
| Recap | Un ítem cada ~36 f | Chip + mini ficha |
| Retiro de fichas (outro) | Una cada ~10 f | Fade + sube 30 px |
| Destellos | Ciclos de 40–90 f desfasados | Parpadeo on/off, sin escalado suave |
| Polvo | ≤ 0.5 px/f | Deriva lenta dentro del cono |

Los sprites se mueven en píxeles enteros: redondear las posiciones con `Math.round(v / PX) * PX`. Solo el zoom de cámara y los fades pueden ser continuos.

## 9. Reglas de pixel art en Remotion

- Usar SVG con `shapeRendering="crispEdges"`, coordenadas en múltiplos de `PX` y sprites hechos de `<rect>`; los mapas de píxeles se pueden definir como arrays de strings.
- Los PNG de sprites van a tamaño 1× y se escalan con `imageRendering: 'pixelated'`.
- Sin `border-radius`, sin sombras difusas y sin degradados suaves. La única excepción es el desenfoque del escenario detrás del portapapeles.
- Las sombras son siempre duras, desplazadas y sin blur.
- Los tokens de §3 viven en un solo archivo de tema; ningún componente lleva hex sueltos.

## 10. Qué NO hacer

- Usar fuentes que no sean pixel, mezclar fuentes o poner texto en minúsculas (salvo el watermark).
- Mover la placa, los subtítulos o el footer entre escenas.
- Poner más de 2 resaltados por subtítulo o más de 2 líneas.
- Usar colores fuera de la paleta.
- Usar el handle, el nombre de la serie o las ilustraciones de @ortho_tidbits.
- Terminar en un frame distinto del frame 0.

## 11. Checklist antes de entregar

- [ ] 1080×1920 a 30 fps.
- [ ] Placa, subtítulos y footer en las posiciones de §5 durante todo el video.
- [ ] Cada capítulo usa su `catN` en la ficha, la barra de la placa y el recap.
- [ ] Subtítulos de máx. 2 líneas, ≤ ~24 caracteres por línea, con ≤ 2 resaltados.
- [ ] Arte nítido (sin antialias ni blur), salvo el fondo desenfocado.
- [ ] El último frame coincide con el frame 0.
- [ ] Revisado en Remotion Studio con frames sueltos de cada bloque de §7.
