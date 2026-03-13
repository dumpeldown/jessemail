# jessemail.de - Eleventy Site

Modern, minimal, and mobile-friendly static webapp for jessemail.de, built with [Eleventy (11ty)](https://www.11ty.dev/).

## 🚀 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Local Testing
To run a local development server with hot-reloading:
```bash
npm start
```
The site will be available at `http://localhost:8080`.

### Production Build
To generate the static files in the `_site` directory:
```bash
npm run build
```

---

## 🏗 Project Structure & Best Practices

This project follows a clean, Markdown-first architecture.

### Directory Overview
- `src/`: All source files.
  - `_includes/`: Templates and components.
    - `layouts/`: Base HTML structures (Nunjucks).
  - `assets/`: Static files like CSS and images.
  - `cafe/`: Subpath for the Café section.
  - `gr20/`: Subpath for the Travel Journal.
  - `legal/`: Impressum and Privacy Policy.
- `_site/`: The generated static website (do not edit directly).
- `.eleventy.js`: Configuration for the build process.

### Adding New Content
1. **Create a Markdown file**: Add a `.md` file in the appropriate folder under `src/`.
2. **Frontmatter**: Every page should start with a YAML block:
   ```yaml
   ---
   layout: layouts/base.njk
   title: Your Page Title
   ---
   ```
3. **HTML in Markdown**: You can mix HTML tags with Markdown content if you need more layout control.

### Design Principles
- **Minimalist CSS**: We use Vanilla CSS in `src/assets/css/style.css`. Avoid adding heavy frameworks.
- **Privacy First**: No external CDNs, trackers, or cookies. All assets (fonts, images) should be stored locally in `src/assets/`.
- **Mobile-First**: Design for small screens first, then use media queries for larger displays.

---

## 🚢 Deployment
Deployment is automated via **GitHub Actions**. Every push to the `main` branch triggers a build and deploys the content to the `gh-pages` branch, which serves `jessemail.de`.
