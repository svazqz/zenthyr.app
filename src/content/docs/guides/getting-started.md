---
title: Getting Started with Zenthyr
description: Generate a new app and run it with `lein run`
---

# Getting Started

## Prerequisites

Before you begin, ensure you have the following installed:
- Java (JDK installed and on PATH)
- Node.js + npm
- Leiningen

## Create a New App

If you are developing Zenthyr locally, install the template first:

```bash
cd template
lein install
```

Generate a project (this also runs `git init` inside the generated folder):

```bash
lein new zenthyr my-app
```

Select a frontend framework:

```bash
lein new zenthyr my-react-app   +react
lein new zenthyr my-vue-app     +vue
lein new zenthyr my-svelte-app  +svelte
lein new zenthyr my-angular-app +angular
```

## Run It

```bash
cd my-app
lein run
```

What happens when you run:

- Ensures frontend dependencies (`npm install`) exist (creates `node_modules/` if needed)
- Starts Vite (`npm run dev`) on an available port
- Opens a JCEF window pointing at the Vite dev server

## Project Structure

```plaintext
my-app/
├── project.clj               # Depends on `zenthyr`
├── src/<app-namespace>/main.clj  # Your entrypoint (with `-main`)
└── src/app/                  # Vite project root (UI sources under `src/app/src/`)
```

## Next Steps

- Read [Architecture](/guides/architecture/)
- Build the [Frontend](/guides/frontend/)
- Implement the [Backend handler](/guides/backend/)
