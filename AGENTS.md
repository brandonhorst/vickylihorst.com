# Repository Guidelines

## Project Structure & Module Organization

- Source is a static site in `site/`.
  - Pages: `site/index.html`, per‑section dirs like `site/about/index.html`.
  - Assets: images in `site/img/`, fonts in `site/fonts/`.
  - Styles: `site/style.css`; icons CSS `site/lineicons.css`.
  - Scripts: `site/script.js`.
- GitHub Pages deploys `site/` via `.github/workflows/static.yml`.

## Build, Test, and Development Commands

- Serve locally: `cd site && python3 -m http.server`
  - Opens at `http://localhost:8000`.
- Quick link check (manual): open the console and verify 404s in Network tab.
- Deploy: push to `main`; Actions will publish `site/`.

## Coding Style & Naming Conventions

- HTML/CSS/JS only; keep it lightweight and dependency‑free.
- Indentation: 2 spaces; include semicolons in JS; prefer double quotes.
- Filenames: kebab‑case (e.g., `success.html`, `style.css`); pages live in a
  folder with `index.html` (e.g., `newsletter/index.html`).
- CSS: prefer custom properties; keep selectors short; reuse existing variables
  in `:root`.
- Keep image sizes optimized; place under `site/img/`.

## Testing Guidelines

- Manual QA on desktop and mobile widths; verify layout and focus order.
- Test carousel behavior in `site/script.js` (buttons, wrap‑around, no console
  errors).
- Validate critical pages load without 404: `/`, `/about/`, `/schedule/`,
  `/newsletter/`.

## Commit & Pull Request Guidelines

- Commits: one logical change per commit; imperative subject (e.g., "Update
  index.html", "Tweak hero spacing").
- Branching: create feature branches; PRs into `main` trigger deploy after
  merge.
- PRs should include:
  - Summary of changes and rationale.
  - Screenshots or before/after GIFs for visible changes.
  - Paths touched (e.g., `site/style.css:1`, `site/index.html:42`).

## Security & Configuration Tips

- Do not commit secrets; site is public and served as static content.
- Keep the workflow target directory as `site/` unless the pipeline is updated.
- Avoid third‑party scripts unless necessary; prefer local, audited assets.

## Agent‑Specific Notes

- Keep changes scoped to `site/` and `.github/` as needed.
- Do not introduce build tooling without explicit approval; this repo optimizes
  for simplicity.
