---
title: Introduction to Zenthyr
description: Learn about Zenthyr, a Clojure library and Leiningen template for desktop apps
---

# Introduction

Zenthyr is a Clojure library (plus a Leiningen template) for building desktop applications with a JVM backend and a modern web UI rendered inside a JCEF (Chromium) window.

The focus is a tight dev loop: generate a project, run `lein run`, and iterate with Vite hot reload while your Clojure backend stays in control.

## Why Zenthyr?

- **Library-first**: depend on `zenthyr` from your `project.clj`, keep APIs small and explicit
- **Modern UI**: build your UI with Vite templates (React, Vue, Svelte, Angular)
- **Chromium rendering**: JCEF window embeds a full-featured browser engine
- **Fast iteration**: backend orchestrates Vite and opens a window to the dev server

## Key Features

- IPC uses JCEF’s `cefQuery` (CefMessageRouter), not WebSockets
- Frontend bridge: `window.zenthyr.invoke(message)` and `window.zenthyr.emit(message)`
- macOS-first window/process lifecycle (dock + close behavior implemented and validated on macOS)
