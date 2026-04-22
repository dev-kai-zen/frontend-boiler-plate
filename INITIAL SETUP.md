# Initial setup (local development)

Run these steps from the project root (the folder that contains `package.json`).

## Prerequisites

- **Node.js** — LTS version recommended (e.g. 20.x or 22.x). [Download](https://nodejs.org/) or use a version manager such as [nvm](https://github.com/nvm-sh/nvm).
- **npm** — Installed with Node. Check with `node -v` and `npm -v`.

## Steps

### 1. Install dependencies

```bash
npm install
```

This creates `node_modules` and matches the versions from `package-lock.json` (if present).

### 2. Environment variables

This app reads config from a **`.env`** file in the project root. That file is **not** committed to git (see `.gitignore`).

**Create your local file from the template:**

- Copy the file named **`.env copy`** in the project root.
- Rename the copy to **`.env`** (exact name: `.env`, no extra words).

**What to edit in `.env` (typical Vite + API setup):**

| Variable                | Purpose                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `VITE_API_URL`          | Base URL of your backend API (e.g. `http://localhost:3000` for local)              |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID (from Google Cloud Console), if the app uses Google sign-in |

After changing `.env`, restart the dev server so Vite picks up the new values.

### 3. Start the dev server

```bash
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`). Open it in the browser.

## Other useful commands

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run build`   | Production build to `dist/`                   |
| `npm run preview` | Serve the production build locally to test it |
| `npm run lint`    | Run ESLint on the project                     |

## Troubleshooting

- **`npm: command not found`** — Install Node.js or add it to your `PATH`.
- **Blank page or API errors** — Confirm `.env` exists, variable names start with `VITE_`, and the API is running if you use a local `VITE_API_URL`.
- **Port already in use** — Another process is using the port; stop it or run Vite on another port (see [Vite server options](https://vitejs.dev/config/server-options.html)).
