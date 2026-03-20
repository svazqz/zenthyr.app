---
title: Zenthyr Architecture
description: Understanding the architecture of Zenthyr applications
---

# Architecture

Zenthyr runs your backend and UI in the same JVM process, with the UI rendered by JCEF (Chromium). During development, the UI is served by Vite, and the backend communicates with the UI via JCEF’s message router (`cefQuery`).

## Overview

At a high level, the moving parts are:

1. **Clojure backend (JVM)**
   - Owns app lifecycle and native integration
   - Starts/stops the frontend dev server during development

2. **JCEF (Chromium) window**
   - Renders your web UI inside the desktop app window
   - Hosts the IPC bridge used by the frontend

3. **Vite frontend (React/Vue/Svelte/Angular)**
   - Served from `http://localhost:<port>` during development
   - Hot reload updates the UI while the JVM stays running

## Communication Flow

```plaintext
[Frontend UI] -- window.cefQuery(JSON) --> [Clojure handler]
[Clojure handler] -- JSON response --> [Frontend UI]

[Vite dev server] -- http://localhost:<port> --> [JCEF window] -- loads --> [Frontend UI]
```

## IPC (Frontend ↔ Backend)

Zenthyr injects a small bridge into the page, exposing:

- `window.zenthyr.invoke(message)` → returns a Promise resolving to a JSON response
- `window.zenthyr.emit(message)` → fire-and-forget style message

On the backend, you provide a `:handler` function to `zenthyr/start-app!` which receives the parsed JSON message and returns a Clojure map that will be encoded back to JSON.

## Window/Process Lifecycle (macOS)

Zenthyr aims to behave like a native macOS app:

- Window close button hides the window but keeps the process alive (dock icon stays)
- Dock icon click reopens the window
- Quit (Cmd+Q or Dock menu Quit) exits the JVM and shuts down child processes (including Vite)

## Next Steps

- Build the [Frontend](/guides/frontend/)
- Implement the [Backend handler](/guides/backend/)
