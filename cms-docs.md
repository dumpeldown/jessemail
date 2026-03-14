# CMS Documentation: Sveltia CMS for jessemail.de

This project uses **Sveltia CMS** to allow users to manage content without editing code directly.

## 🔗 Access
The administration panel is hosted at: [/admin](/admin)

---

## 🏗 Architecture: How it Works
The CMS is **Git-based**, meaning there is no database. 
1. **The Panel**: A Single Page Application (SPA) running in the browser at `/admin`.
2. **The Authentication**: Sveltia connects directly to GitHub using a **Personal Access Token (PAT)**.
3. **The Workflow**: 
   - You log in using a GitHub PAT.
   - You save a post in the CMS.
   - Sveltia commits a new `.md` file to your `main` branch on GitHub.
   - GitHub Actions (`.github/workflows/deploy.yml`) detects the commit and rebuilds the site automatically.

---

## ⚙️ GitHub Configuration
Since we no longer use Netlify for the backend, you only need to ensure the repository settings on GitHub are correct for hosting and content updates.

### 1. Personal Access Token (PAT)
*   To log in to the CMS, you will need a GitHub PAT with `repo` scope.
*   Generating a PAT: `GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)`.

### 2. GitHub Pages
*   **Location**: `Repo Settings > Pages`
*   **Build and deployment**: Ensure it's set to **GitHub Actions**.

---

## 🛠 Local Development
To test changes to the CMS configuration or UI on your machine:

1.  **Start the Local Backend Proxy**:
    In your terminal, run:
    ```bash
    npx sveltia-cms-local-backend
    ```
    This allows the CMS to write files to your local `src/` folder.
2.  **Run Eleventy**:
    In a separate terminal, run:
    ```bash
    npm start
    ```
3.  **Visit the Panel**:
    Go to `http://localhost:8080/admin`. Sveltia will automatically detect the local backend and use it.

---

## 📂 Configuration Files
*   `src/admin/index.html`: The entry point for Sveltia CMS.
*   `src/admin/config.njk`: Defines the content collections, fields, and backend settings (generates `admin/config.yml`).
*   `.eleventy.js`: Configured to include the `admin` folder in the final build.
