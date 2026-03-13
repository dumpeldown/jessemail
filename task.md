# Goal
Build a modern, minimal, and mobile-friendly static webapp for jessemail.de using Eleventy (11ty), hosted on GitHub Pages.

# Success Criteria
1. **Core Architecture**:
   - Use Eleventy (11ty) as the Static Site Generator.
   - Root path (`/`): Minimal navigation to subpaths.
   - Subpath 1 (`/cafe`): Homepage for a family-run cafe with a contact section (mailto:familie@jessemail.de).
   - Subpath 2 (`/gr20`): Travel journal for the GR20 hike in Corsica.
2. **Content Management**:
   - Set up a Markdown-based system where new pages/posts are added via `.md` files in a structured `src` folder.
3. **Design**:
   - Theme: Light, warm colors, minimalist, and modern.
   - Mobile-first responsive design using Vanilla CSS.
   - Assets: Use accessible placeholder SVGs/patterns for easy replacement.
   - Favicon: Use the ⛵ (sailboat) emoji.
4. **Legal & Metadata**:
   - Include a German-compliant Impressum and Privacy Policy (Datenschutz) page.
   - Metadata: SEO description "Immer unterwegs".
5. **Deployment**:
   - Configure a GitHub Action to automatically build and deploy the site from the `main` branch to the `gh-pages` branch.
   - Ensure `jessemail.de` DNS is verified and HTTPS is active.

# Constraints
- Minimize JavaScript usage.
- Comply with German GDPR (DSGVO) — no external trackers or cookies without consent (keep it cookie-free if possible).
- Use local assets (no external CDNs).

# Completion Promise
"SITE IS FULLY FUNCTIONAL AND DEPLOYED"
