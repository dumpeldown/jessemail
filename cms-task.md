# Decap CMS Guide for jessemail.de

This guide explains how to manage content for the GR20 travel diary using the built-in Content Management System (Decap CMS).

## 🚀 Accessing the CMS
The CMS is available at: [jessemail.de/admin](https://jessemail.de/admin)

## 🛠 Local Development & Testing
To test the CMS interface on your computer without affecting the live site:

1.  **Modify `src/admin/config.yml`**:
    Set `local_backend: true` and `backend.name: test-repo`.
2.  **Run the Proxy Server**:
    Open a terminal and run `npx decap-server`. This allows the browser to save files to your disk.
3.  **Launch Site**:
    Run `npm start` and navigate to `http://localhost:8080/admin`.

---

## 🔐 Production Authentication (Netlify Identity)
Since this site is hosted on GitHub Pages but uses Netlify Identity for login, the following setup is active:

### 1. The Gateway
We use your Netlify site ([starlit-crepe-097817.netlify.app](https://starlit-crepe-097817.netlify.app)) as the Authentication Gateway.

### 2. The Meta Tag
In `src/admin/index.html`, we use a specific meta tag to link `jessemail.de` to the Netlify instance:
```html
<meta name="netlify-identity-site-url" content="https://starlit-crepe-097817.netlify.app">
```

### 3. Permissions
Only users invited or registered via the Netlify Identity dashboard can log in. Ensure **GitHub** is enabled as an external provider in the Netlify settings.

---

## 🧠 How It Works
1.  **Direct API Access**: When you click "Save" in the `/admin` panel, the CMS sends a request directly to the **GitHub API**.
2.  **Auto-Commit**: GitHub automatically creates a new commit in the `main` branch with your changes.
3.  **Auto-Deploy**: This commit triggers the **GitHub Action**, which rebuilds the static site and deploys it to the web within 1-2 minutes.

## 📝 Adding New Content
1.  Navigate to the `/admin` panel and log in.
2.  Select the **GR20 Journal** collection.
3.  Click **New GR20 Journal** to create a post.
4.  Fill in the title, date, and body text.
5.  Click **Publish** to send the changes to GitHub.
