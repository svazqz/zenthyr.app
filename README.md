# zenthyr.app

Marketing site + docs for [Zenthyr](https://github.com/svazqz/zenthyr).

This site is built with Astro + Starlight and deployed via GitHub Pages.

## Project Structure

- `src/pages/` — marketing pages (homepage, etc.)
- `src/components/` — marketing components used by pages
- `src/content/docs/` — documentation content (Markdown/MDX)
- `public/` — static assets (favicon, logos, etc.)
- `astro.config.mjs` — Starlight configuration (sidebar, GitHub link, base path)

## Commands

All commands are run from the root of this project:

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Deployment Notes

- `astro.config.mjs` reads `BASE_PATH` to set the `base` for GitHub Pages deployments.
- The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes the `dist/` output.
