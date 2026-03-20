---
title: Backend Development
description: Building the Clojure backend for Zenthyr applications
---

# Backend Development

## Overview

In a Zenthyr app, your backend runs on the JVM and owns the application lifecycle. The frontend sends JSON messages to the backend, and your backend replies with JSON responses.

## Project Structure

```plaintext
src/
└── <app-namespace>/
    └── main.clj      # Application entry point (`-main`)
```

## Key Features
### Handler-Based IPC

Your backend provides a `:handler` function to `zenthyr/start-app!`. Zenthyr calls it with the parsed JSON message (as a Clojure map with keyword keys). The handler returns a Clojure map that will be encoded back to JSON and delivered to the frontend.

```clojure
(ns my-app.main
  (:gen-class)
  (:require [zenthyr.core :as zenthyr]))

(defonce state (atom {:count 0}))

(defn handler [{:keys [type] :as message}]
  (case type
    "counter/increment"
    (let [new-state (swap! state update :count inc)]
      {:count (:count new-state)})

    "counter/get"
    {:count (:count @state)}

    {:error (str "Unknown message type: " type)
     :message message}))

(defn -main [& _args]
  (zenthyr/start-app! {:handler handler}))
```

## Development Workflow

Run the app from the project root:

```bash
lein run
```
## Best Practices
1. State Management
1. Keep the handler total and explicit (return a clear error map for unknown messages)
2. Keep messages JSON-friendly (strings, numbers, booleans, arrays, objects)
3. Keep long-running work out of the UI thread (spawn work and respond when ready)
## Next Steps
- Frontend Development
- Build the [Frontend](/guides/frontend/)
- Read [Architecture](/guides/architecture/)
