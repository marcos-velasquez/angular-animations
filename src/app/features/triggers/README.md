# Triggers

Animation trigger directives that activate animations based on DOM events.

## Responsibility

Provide declarative directives for triggering animations on specific events.

## Available Directives

### `AnimateClickDirective`
Triggers animation on click event.

```html
<button animateClick="scale:1.2:>">Click me</button>
```

### `AnimateEnterDirective`
Triggers animation when element enters viewport.

```html
<div animateEnter="fadeIn({ x: '100%' })">Appears on scroll</div>
```

### `AnimateLeaveDirective`
Triggers animation when element leaves viewport.

```html
<div animateLeave="fadeOut()">Disappears on scroll</div>
```

### `AnimateLoadDirective`
Triggers animation on component load.

```html
<div animateLoad="slideIn({ x: '-100%' })">Animates on load</div>
```

## Usage

All trigger directives extend `AnimateDirective` and accept the same animation syntax.

```html
<!-- Simple animation -->
<div animateClick="x:100%"></div>

<!-- With presets -->
<div animateEnter="fadeIn({ duration: 2 })"></div>

<!-- Multiple animations -->
<div animateLoad="x:100%;opacity:0:0"></div>
```

## Custom Triggers

To add a new trigger:

```typescript
import { Directive, input } from '@angular/core';
import { AnimateDirective } from '../../core/directives/animate.directive';

@Directive({ selector: '[animateHover]' })
export class AnimateHoverDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ 
    alias: 'animateHover' 
  });
  public override readonly trigger = input('hover' as const);
}
```
