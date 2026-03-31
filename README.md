# Trackit 🎯

A lightweight VS Code extension that scans your entire workspace for `TODO`, `FIXME`, and `HACK` comments and displays them in a clean, clickable sidebar panel — so nothing gets lost in your codebase.

## Features

- 🔍 **Scans your entire workspace** for TODO, FIXME, and HACK comments
- 📁 **Supports multiple file types** — `.ts`, `.js`, `.tsx`, `.jsx`, `.py`, `.java`, `.cpp`, `.c`, `.cs`, `.go`, `.rb`, `.rs`, `.html`, `.css`, `.vue`, `.svelte`
- 🖱️ **Click to jump** — click any item in the sidebar to instantly navigate to that exact line
- 🔄 **Refresh button** — rescan your workspace anytime with one click
- 🏷️ **Tag icons** — each comment type has its own icon:
  - `TODO` → ○ circle
  - `FIXME` → 🐛 bug
  - `HACK` → ⚠️ warning
- ⚡ **Auto-scans on startup** — results are ready as soon as you open VS Code

## How to Use

1. Open any project folder in VS Code
2. Click the **Trackit icon** in the Activity Bar (left sidebar)
3. All your `TODO`, `FIXME`, and `HACK` comments will appear in the panel
4. Click any item to jump directly to that line in the file
5. Use the **↻ refresh button** to rescan after making changes

## Supported Comment Styles

Trackit detects comments across different languages:
```js
// TODO: Add authentication
// FIXME: Fix the broken layout
// HACK: Temporary workaround
```
```html
<!-- TODO: Add navbar -->
<!-- FIXME: Fix mobile layout -->
```
```css
/* TODO: Refactor this section */
/* HACK: Override third-party styles */
```
```python
# TODO: Add error handling
# FIXME: Fix the API call
```

## Tags Supported

| Tag | Icon | Purpose |
|-----|------|---------|
| `TODO` | ○ | Something to be done later |
| `FIXME` | 🐛 | Something that is broken and needs fixing |
| `HACK` | ⚠️ | A workaround that needs a proper solution |

## Why Trackit?

Ever written a `// TODO` comment and completely forgotten about it? Trackit makes sure every pending task, bug, and workaround in your codebase is visible and accessible — right inside VS Code, with no extra tools needed.

## Requirements

- VS Code `v1.80.0` or higher

## Release Notes

### 0.0.1
- Initial release
- Workspace scanning for TODO, FIXME, HACK comments
- Sidebar tree view with clickable items
- Auto-scan on startup
- Refresh button

---

**Made with love by SAHIL BAJAJ using TypeScript**