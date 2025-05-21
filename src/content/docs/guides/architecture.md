---
title: Zenthyr Architecture
description: Understanding the architecture of Zenthyr applications
---

# Architecture

Zenthyr follows a modern architecture that combines the best of Clojure and web technologies.

## Overview

The architecture consists of three main layers:

1. **Clojure Backend**
   - Handles business logic
   - Manages application state
   - Provides REPL-driven development
   - Communicates with system resources

2. **Electron Bridge**
   - Manages IPC (Inter-Process Communication)
   - Handles window management
   - Provides native OS integration
   - Enables cross-platform compatibility

3. **React Frontend**
   - Renders the user interface
   - Manages UI state
   - Handles user interactions
   - Provides hot-reloading capability

## Communication Flow

```plaintext
[Clojure Backend] <-> [Electron IPC] <-> [React Frontend]
```

## Key Components
### Backend Layer
- Core Engine : Written in Clojure, handles main application logic
- State Management : Uses Clojure's immutable data structures
- System Integration : Direct access to system resources
### Middleware Layer
- IPC Bridge : Manages communication between frontend and backend
- Window Management : Handles application windows and lifecycle
- Resource Management : Controls system resources and permissions
### Frontend Layer
- UI Components : React-based modular components
- State Management : Local state with React hooks
- Hot Module Replacement : Instant UI updates during development
## Best Practices
1. Keep business logic in the Clojure backend
2. Use IPC for all backend-frontend communication
3. Maintain UI state in React components
4. Leverage REPL for backend development
5. Use hot-reloading for frontend development
## Next Steps
- Frontend Development
- Backend Development