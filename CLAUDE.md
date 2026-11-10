# Remotion-Julian

Proyecto de videos con Remotion. El código vive en `my-video/` (Remotion 4, React 19, TypeScript).

## Comandos (desde `my-video/`)

- `npm run dev`: abre Remotion Studio para previsualizar.
- `npm run lint`: ESLint + `tsc`.
- `npx remotion render <id>`: solo si el usuario lo pide explícitamente.

## Diseño de los videos

Todos los videos siguen **[DESIGN.md](DESIGN.md)**, la identidad visual «Pixel Explainer». Léelo antes de crear o editar un video. Lo que no se negocia:

- Formato 1080×1920 (vertical) a 30 fps.
- Pixel art nítido: SVG con `crispEdges` o PNG con `pixelated`, en grilla `PX = 6`, sin degradados suaves ni sombras difusas.
- Fuente Departure Mono en MAYÚSCULAS (archivo local en `my-video/public/fonts/`, cargado con `@remotion/fonts`).
- Solo colores de la paleta de DESIGN.md §3, definidos en un único archivo de tema.
- Chrome fijo: placa de título arriba, subtítulos en barras oscuras con resaltado amarillo o cian, y footer chip abajo.
- Estructura escenario → push-in → portapapeles por capítulo → recap → CTA, con loop perfecto (último frame = frame 0).
- Solo identidad visual; el audio no forma parte del diseño.
- Nunca usar el handle, la serie ni las ilustraciones del referente (@ortho_tidbits): el handle es el nuestro.

## Cómo trabajar

- Usa las skills de Remotion instaladas en `.claude/skills/`; `remotion-best-practices` es el router.
- Abre Studio antes de editar y mantenlo abierto. Anima solo con `useCurrentFrame()` + `interpolate()`, nunca con transiciones CSS.
- `DancingSkeleton` (1280×720) es una demo previa y no sigue DESIGN.md.
