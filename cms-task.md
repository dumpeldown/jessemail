# Task: Add Content Management UI (Decap CMS)

Goal: Allow users to add new GR20 travel diary entries directly from the website via a secure `/admin` dashboard.

## 1. Create the Admin Folder
Create a new directory `src/admin/`.

## 2. Add the Admin Entry Point
Create `src/admin/index.html`:
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Decap CMS -->
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

## 3. Configure the CMS
Create `src/admin/config.yml`. This defines how the travel diary entries are structured:
```yaml
backend:
  name: github
  repo: dumpeldown/jessemail
  branch: main

media_folder: "src/assets/img/uploads"
public_folder: "/assets/img/uploads"

collections:
  - name: "gr20"
    label: "GR20 Journal"
    folder: "src/gr20"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Layout", name: "layout", widget: "hidden", default: "layouts/base.njk"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Body", name: "body", widget: "markdown"}
```

## 4. Update Eleventy Configuration
In `.eleventy.js`, add the admin folder to the passthrough copy:
```javascript
eleventyConfig.addPassthroughCopy("src/admin");
```

## 5. Setup Authentication

### Option A: Local Testing (No Password Needed)
To test the CMS interface on your computer without setting up any accounts:
1. In `config.yml`, set the backend to `local`:
   ```yaml
   local_backend: true
   backend:
     name: test-repo
   ```
2. Run your local dev server: `npm start`.
3. Go to `http://localhost:8080/admin`. You can now edit and "save" posts, and the `.md` files will be created directly on your hard drive.

### Option B: Simplified Auth for Site Owner (Personal Access Token)
If you just want a "password-like" experience for yourself on the live site:
1. In `config.yml`, use the `github` backend.
2. When you visit `/admin` on the live site, instead of clicking "Login with GitHub", you can manually provide a **Personal Access Token** (PAT) that you generate in your GitHub settings. This acts as your "long password".

### Note on "Simple Passwords" for Multiple Users
GitHub Pages is **purely static**, meaning there is no server to "check" if a password is correct.
- If you want a traditional "Login + Password" form for other people, you must use a small external **OAuth Gateway** (like a free Vercel or Netlify function) that acts as the "checker" between the website and GitHub.
- For a true "Simple Password" site without any Git knowledge, a platform like **Netlify** or **Cloudflare Pages** (which has built-in password protection) is often easier than GitHub Pages.

## 6. How It Works (The Magic behind the /admin Endpoint)

Users often wonder: "If there is no database, where does the text go?"

1. **Direct Communication:** The `/admin` page is a "Single Page Application" (SPA) that runs entirely in the user's browser. It uses the **GitHub REST API** to talk directly to your repository.
2. **Authentication:** When a user logs in (via OAuth or PAT), the browser receives a "Secret Token." This token allows the browser to act as a "mini-Git client."
3. **The Save Process:** 
   - When the user clicks **"Save"**, the CMS converts the editor content into a Markdown string.
   - It sends this string to GitHub via an `HTTP PUT` request to the repository's content endpoint.
   - **GitHub itself** performs the "Git Commit" and "Git Push" on the server side.
4. **Triggering the Build:** As soon as GitHub finishes that commit, it detects a change on the `main` branch. This automatically kicks off your **GitHub Action** (from `.github/workflows/deploy.yml`), which builds the new HTML and updates the live site.

**The result:** You get the experience of a dynamic CMS (like WordPress) while maintaining the security, speed, and cost-efficiency of a static site.

## 7. Verification
1. Navigate to `jessemail.de/admin`.
2. Log in with your GitHub account.
3. Create a "New GR20 Journal" entry.
4. Verify that a new `.md` file appears in your `src/gr20/` folder on GitHub.
