---
title: Frontend Development
description: Building a Vite-based web UI inside a JCEF window
---

# Frontend Development

## Overview

Zenthyr apps use a standard Vite project for the UI. During development, Zenthyr starts Vite and opens a JCEF (Chromium) window pointing at the dev server.

## Project Structure

```plaintext
src/app/                 # Vite project root
├── package.json
└── src/                 # UI sources (framework-specific)
    └── main.(ts|tsx)    # Vite entry point
```

## Key Features
### Framework Choice

Zenthyr provides Vite templates for:

- React (default)
- Vue
- Svelte
- Angular

### Hot Module Replacement

Vite hot reload updates your UI while the JVM backend stays running.

### IPC Communication

Zenthyr injects a small bridge into the page:

- `window.zenthyr.invoke(message)` → Promise with a JSON response
- `window.zenthyr.emit(message)` → fire-and-forget message

```typescript
type BackendResponse<T> = { data: T };

async function increment() {
  const response = (await window.zenthyr.invoke({ type: "counter/increment" })) as BackendResponse<{ count: number }>;
  console.log("New count:", response.data.count);
}

function logSelection(id: string) {
  window.zenthyr.emit({ type: "selection/changed", id });
}
```

## Development Workflow

Start the app from the project root:

```bash
lein run
```

This starts Vite (if needed), then opens a JCEF window pointed at the Vite dev server.

## Best Practices
1. Use `invoke` for request/response interactions and `emit` for telemetry-style events
2. Keep message payloads JSON-serializable
3. Treat the backend `:handler` as the single source of truth for app state

## Next Steps
- Read [Architecture](/guides/architecture/)
- Implement the [Backend handler](/guides/backend/)
