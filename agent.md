# Agent Project Guide (jessemail.de)

This document is for AI agents and technical developers working on this project.

## Project Stack
- **Static Site Generator:** [Eleventy (11ty)](https://www.11ty.dev/) v3.
- **CMS:** [Decap CMS](https://decapcms.org/) (Client-side, dynamic config).
- **Templates:** Nunjucks (`.njk`).
- **Styling:** Vanilla CSS.
- **Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).

## Core Architecture
- **Source Files:** `src/`.
- **Output Directory:** `_site/`.
- **CMS Configuration:** `src/admin/config.njk`.
  - Dynamically generates `admin/config.yml`.
  - Switches `backend` to `test-repo` when `eleventy.env.runMode == "serve"`.
  - Uses `git-gateway` (Netlify Identity/GitHub) for production.
- **Custom Filters:** `.eleventy.js` contains a `dateDisplay` filter for German formatting.

## Key Workflows
- **Local Dev:** `npm start` (Runs Eleventy in serve mode).
- **Build:** `npm run build` (Generates production site).
- **Admin Access:** `/admin/` (Or the 🔒 link in the footer).
- **Content:** Markdown files in `src/cafe`, `src/gr20`, etc.

## Guidelines for Agents
1. **Maintain Privacy:** No external CDNs or trackers. All assets must be local in `src/assets/`.
2. **Dynamic CMS Config:** Do not edit `src/admin/config.yml` directly; it is generated from `src/admin/config.njk`.
3. **German Support:** Use the `dateDisplay` filter for any date strings shown to users.
4. **Layouts:** Most pages use `layouts/base.njk`.
