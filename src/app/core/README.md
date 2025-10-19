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

**Callbacks:**

All directives that extend `GsapHostDirective` support the following Angular output events:

```html
<div 
  animate="fadeIn()"
  (animateStart)="onStart($event)"
  (animateComplete)="onComplete($event)"
  (animateUpdate)="onUpdate($event)"
  (animateRepeat)="onRepeat($event)"
  (animateReverseComplete)="onReverseComplete($event)"
></div>
```

- `animateStart` - Fires when animation starts
- `animateComplete` - Fires when animation completes
- `animateUpdate` - Fires on every frame during animation
- `animateRepeat` - Fires each time animation repeats
- `animateReverseComplete` - Fires when reversed animation completes

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
