# Hostería Chaltu — sitio web

Landing page de una sola página para Hostería Chaltu (Villa Gesell Norte). HTML/CSS/JS sin frameworks ni build step, con selector de idioma ES/EN/PT, galería con lightbox y botón flotante de WhatsApp.

## Estructura

- `web/` — el sitio en sí. Es lo único que hace falta para subir a cualquier hosting.
- `scripts/` — herramientas de soporte (no las necesita el sitio para funcionar):
  - `optimize-images.js` — redimensiona y comprime fotos nuevas hacia `web/assets/img/`
  - `static-server.js` — servidor local simple para previsualizar (`npm run serve`)
- `Manual/` — spec de contenido y manual de marca originales, como referencia.

## Ver el sitio local

```
npm install
npm run serve
```

Después abrir `http://localhost:5173`.

## Publicación

Cada push a `main` despliega automáticamente `web/` a GitHub Pages vía GitHub Actions.
