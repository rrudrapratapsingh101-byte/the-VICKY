# RUDRA PRATAP SINGH // VICKY — WEBSITE + RUDRA CITY

This is the single-file-structure GitHub Pages build of the RUDRA website and RUDRA CITY game.

## Only 4 project files

- `index.html` — complete website + embedded RUDRA CITY markup/template
- `style.css` — website styles + RUDRA CITY styles
- `script.js` — website logic + complete RUDRA CITY game engine
- `README.md` — project documentation

There is intentionally **no `rudra-city/` folder**, no separate game HTML, no separate game CSS, and no separate game JS.

## RUDRA CITY

RUDRA CITY is embedded directly into the website's Game Zone. Clicking **PLAY RUDRA CITY** creates the game interface from the embedded HTML template and starts the merged game engine from `script.js`.

Build: **36.1 Physics Stable**.

The game is client-side and uses WebGL/HTML/CSS/JavaScript. GitHub Pages can publish these static files directly.

## GitHub Pages

Keep `index.html` at the repository root and publish the repository root from the `main` branch.
