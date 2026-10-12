# Identidad visual — hoja corta

Fuente de verdad completa: `brand/frame.md` (leerlo solo si esta hoja no basta). Recursos: `brand/backgrounds/`, `brand/fonts/`, `brand/logo/`, muestra `brand/brand-board.png`.

## Esencial
- **Fondos** (pantalla completa, sin recolorear): `fondo-azul.jpg` → portadas, cierres, frases (texto blanco) · `fondo-claro.jpg` → contenido, listas (texto ink, acento azul).
- **Colores**: blue `#2563EB` · navy `#0B2A63` · cyan `#0EA5C9` · ink `#0F1117` · white · text-muted `#6B7280`. Nada fuera de la paleta; sin negro puro de fondo.
- **Tipografía**: Inter 600 en sentence case (nunca todo mayúsculas); Geist Mono solo en eyebrows cortos.
- **Composición**: un mensaje por pieza, título ≥3× la bajada, 40–50 % vacío, margen 7cqw, esquinas redondeadas, un solo acento por frame (una palabra clave en azul sobre claro).
- **Iconos**: lineales, trazo 2 px. Sin fotos ni imágenes generadas por IA en posts.

## Logo (regla confirmada por el usuario, 2026-10-12)
Wordmark de texto como en lrc-solutions.com, **sin cuadrado con "L"**. **LRC siempre en azul `#2563EB`**; "IT Solutions" cambia según el fondo:
- **Fondo claro** → LRC azul + IT Solutions negro (`ink`).
- **Fondo azul de marca** (`fondo-azul.jpg`, azul medio) → sobre una **pastilla blanca**: LRC azul + IT Solutions negro. (El azul sobre ese fondo sin pastilla no se lee.)
- **Fondo negro o azul oscuro** → sin pastilla: LRC azul + IT Solutions blanco.

> Los reels aprobados anteriores (`bot-receptionist-reel`) usan la versión previa (LRC negro + IT Solutions blanco sobre azul) hasta que se pida actualizarlos y re-renderizar.
> Pendiente: `brand/frame.md` aún describe el logo como cuadrado + "L". No se modificó sin autorización.

## Formatos
- Post Instagram: **1080×1350** (también 1080×1080). Se genera con `marketing/tools/post.mjs`.
- Reel: **1080×1920**, zonas seguras 14 % arriba y abajo. Se hace en `videos/<slug>/` con HyperFrames.
