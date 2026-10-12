---
workflow: general-video
flow: automation
storyboard: no
message: "Non perdere più clienti: il tuo receptionist virtuale risponde su WhatsApp 24/7"
destination: instagram-reels
aspect: 1080x1920
language: it
length: 20s
voice: heygen-it
---

## Intent

Reel promocional del bot receptionist de WhatsApp de LRC IT Solutions, para Instagram Reels.
Todo en italiano (voz, textos y subtítulos). Ritmo rápido, cercano, con chats simulados estilo
WhatsApp. Muchos lo ven sin sonido: subtítulos grandes dentro de las zonas seguras de Reels.

Guion:

- 0–3s Gancho (fondo azul) — Voz: "Perdi clienti perché non rispondi su WhatsApp?" — chat con
  mensajes sin leer acumulándose.
- 3–6s Solución (fondo azul) — Voz: "Il tuo receptionist virtuale su WhatsApp. 24/7." — logo LRC +
  "Receptionist virtuale" + badge 24/7.
- 6–16s Funciones (fondo claro), una cada ~2,5s con texto grande + chat:
  📅 Prenota appuntamenti · 💬 Risponde alle domande · 📄 Invia preventivi · 🔔 Manda promemoria
- 16–20s Cierre (fondo azul) — Voz: "Provalo. Scrivici in privato." — "Scrivici in privato" + logo.

## Assets

- frame.md — marca LRC (copia de brand/frame.md), fuente de verdad visual.
- assets/brand/ — fondos, logo, fuentes Inter / Geist Mono.

## Customizations

- Voz en off HeyGen en italiano, natural y cercana.
- Música con ritmo, moderna, del catálogo de HeyGen, bajada debajo de la voz.
- Subtítulos grandes y legibles.

## Notes

- No inventar cifras, nombres de clientes ni números de teléfono.
- Chats simulados estilo WhatsApp con mensajes genéricos en italiano.
- Al terminar: `npx hyperframes check`, preview en Studio y pedir aprobación antes de renderizar.
- Render en `renders/`, luego commit + push.
