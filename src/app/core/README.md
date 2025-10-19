# Core

Core infrastructure for the Angular Animations library.

## Structure

```
core/
├── directives/         # Angular directives layer
├── engine/             # Animation engine
└── utils/              # Core utilities
```

## Directives

### `GsapHostDirective`

Base directive that provides GSAP timeline functionality.

### `AnimateDirective`

Main directive for declarative animations.

**Usage:**

```html
<div animate="x:100%:>@duration=2"></div>
```

## Engine

### Timeline

Manages GSAP timeline creation, default vars, caching, and lifecycle.

### Trigger

Defines trigger types for animations.

## Utils

Shared utilities:

- `TypeConverter` - Type conversion
- `RegexPatterns` - Centralized regex patterns
- `assert`, `sleep`, `that` - Helper functions
