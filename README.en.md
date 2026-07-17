# NTDESWEB FX

The official catalog of free web effects built with HTML, CSS and Vanilla JavaScript.

**Website:** https://fx.ntdesweb.dev/

NTDESWEB FX connects every live demo with its independent repository. Effect source code is not copied into this project.

## Browse the collection

- Search by name, category or description.
- Select a category to narrow the gallery.
- Open **Live demo** to try an effect.
- Open **GitHub** to inspect its source and documentation.

## Architecture

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

The catalog is generated entirely from `effects.json`. Adding an effect does not require editing `index.html`.

## Add or suggest an effect

1. Create an SVG preview inside `assets/`.
2. Add an object to `effects.json` with `name`, `category`, `description`, `demo`, `github`, `preview` and `previewAlt`.
3. Confirm that the demo and repository are public and use HTTPS.
4. Run a local static server and verify search, filters and responsive behavior.
5. Open an issue or pull request at https://github.com/NachoTorresRD/ntdesweb-fx.

Example:

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

## Local development

The browser must load `effects.json` over HTTP. From the project directory, use any static server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Official links

- NTDESWEB: https://www.ntdesweb.dev
- GitHub: https://github.com/NachoTorresRD
- WHABOT: https://whabot.pro
- POSENT: https://posentrd.com

## License

[MIT](LICENSE) © 2026 Nacho Torres.
