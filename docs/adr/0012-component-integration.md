---
author: Adrian
created: 2025-01-01 23:55
status: approved
---

# ADR 0012: Component Integration

- How to integrate different component collections
- Component Collections expose web components
- Web Components can be used inside the markup at compile time
  - are loaded at runtime
==> Architecture
- styles are injected
  - each project uses tailwind
  - global tailwind theme injection
- common functions are defined as code
  - each project includes a copy of the needed functions
  - alternative: bundle as namespaced functions --> external dependency?
  - what about type definitions?
- web components are compiled separately
  - included in markup and loaded at runtime


## Update

- Components can be integrated through dataview js
- register components as functions on the window object
- user can feed the component with data themselves
