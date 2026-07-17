# NTDESWEB FX

Catálogo oficial de efectos y experiencias web creados con HTML, CSS, JavaScript Vanilla y WebGL.

**Sitio:** https://fx.ntdesweb.dev/

NTDESWEB FX conecta cada demostración en vivo con su repositorio independiente. El código de los efectos no se copia dentro de este proyecto.

## Experiencias destacadas

- Device Breakdown Experience: https://device.ntdesweb.dev/ — https://github.com/NachoTorresRD/device-breakdown-experience
- Interactive Digital Universe: https://universe.ntdesweb.dev/ — https://github.com/NachoTorresRD/interactive-digital-universe
- Interactive Product Showcase: https://product.ntdesweb.dev/ — https://github.com/NachoTorresRD/interactive-product-showcase

La colección contiene **13 proyectos independientes**: tres experiencias WebGL y diez efectos de interfaz.

## Navegar por la colección

- Usa el buscador para filtrar por nombre, categoría o descripción.
- Selecciona una categoría para reducir la galería.
- Abre **Live demo** para probar un efecto.
- Abre **GitHub** para revisar su código fuente y documentación.

## Arquitectura

```text
/
├── index.html
├── effects.json
├── style.css
├── script.js
├── assets/
├── README.md
├── README.en.md
├── LICENSE
├── robots.txt
├── sitemap.xml
├── favicon.svg
└── og-image.svg
```

El catálogo se genera completamente desde `effects.json`. Para añadir un efecto no es necesario modificar `index.html`.

## Añadir o sugerir un efecto

1. Crea un SVG de preview dentro de `assets/`.
2. Añade un objeto a `effects.json` con `name`, `category`, `description`, `demo`, `github`, `preview` y `previewAlt`.
3. Comprueba que la demo y el repositorio sean públicos y usen HTTPS.
4. Ejecuta un servidor estático local y verifica el buscador, los filtros y el responsive.
5. Abre un issue o pull request en https://github.com/NachoTorresRD/ntdesweb-fx.

Ejemplo:

```json
{
  "name": "Hacker Text Effect",
  "category": "Text",
  "description": "Accessible scramble and decoder text effect.",
  "demo": "https://hacker.ntdesweb.dev/",
  "github": "https://github.com/NachoTorresRD/hacker-text-effect",
  "preview": "assets/hacker-text-effect.svg",
  "previewAlt": "Preview of the Hacker Text Effect"
}
```

## Desarrollo local

El navegador debe cargar `effects.json` mediante HTTP. Desde la carpeta del proyecto puedes usar cualquier servidor estático, por ejemplo:

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000`.

## Enlaces oficiales

- NTDESWEB: https://www.ntdesweb.dev
- GitHub: https://github.com/NachoTorresRD
- WHABOT: https://whabot.pro
- POSENT: https://posentrd.com

## Licencia

[MIT](LICENSE) © 2026 Nacho Torres.
