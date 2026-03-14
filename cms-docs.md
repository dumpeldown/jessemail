# CMS Documentation: Decap CMS for jessemail.de

This project uses **Decap CMS** (formerly Netlify CMS) to allow non-technical users to manage the GR20 travel diary without editing code directly.

## 🔗 Access
The administration panel is hosted at: [jessemail.de/admin](https://jessemail.de/admin)

---

## 🏗 Architecture: How it Works
The CMS is **Git-based**, meaning there is no database. 
1. **The Panel**: A Single Page Application (SPA) running in the browser at `/admin`.
2. **The Bridge (Git Gateway)**: Netlify acts as a secure bridge between the browser and your GitHub repository.
3. **The Workflow**: 
   - You log in via Netlify Identity.
   - You save a post in the CMS.
   - Netlify commits a new `.md` file to your `main` branch on GitHub.
   - GitHub Actions detects the commit and rebuilds the site automatically.

---

## ⚙️ Mandatory Netlify Configuration
To keep the CMS functional, the following settings must remain active in your Netlify site ([starlit-crepe-097817.netlify.app](https://starlit-crepe-097817.netlify.app)):

### 1. Netlify Identity
*   **Location**: `Site Settings > Identity`
*   **Status**: Must be **Enabled**.
*   **External Providers**: **GitHub** must be added to allow "Continue with GitHub" login.

### 2. Git Gateway
*   **Location**: `Site Settings > Identity > Services`
*   **Status**: Must be **Enabled** and connected to the `dumpeldown/jessemail` repository. This is what allows the CMS to write files to GitHub.

### 3. Identity Registration
*   **Registration Preferences**: Can be set to **Invite only** for maximum security.

---

## 🛠 Local Development
To test changes to the CMS configuration or UI on your machine:

1.  **Configure Local Backend**:
    In `src/admin/config.yml`, temporarily set:
    ```yaml
    backend:
      name: test-repo
    ```
2.  **Start the File Proxy**:
    Run `npx decap-server` in your terminal. This allows the browser to write files to your local `src/` folder.
3.  **Run Eleventy**:
    Run `npm start` and visit `http://localhost:8080/admin`.

---

## 📂 Configuration Files
*   `src/admin/index.html`: The entry point and Netlify Identity widget initialization.
*   `src/admin/config.yml`: Defines the content collections, fields, and backend settings.
*   `.eleventy.js`: Configured to include the `admin` folder in the final build.
