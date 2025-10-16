# Angular GSAP Animations

A lightweight Angular animation library powered by GSAP with a declarative, preset-based API.

## Installation

```bash
npm install gsap
```

## Quick Start

Import the directives in your component:

```typescript
import { AnimateClickDirective } from './directives/animate-click.directive';
import { AnimateEnterDirective } from './directives/animate-enter.directive';

@Component({
  imports: [AnimateClickDirective, AnimateEnterDirective],
  template: `
    <div animateClick="fadeIn()">Click me!</div>
    <div animateEnter="slideInLeft()">Animates on page load</div>
  `
})
```

## Usage

### Basic Syntax

```html
<!-- Without parentheses (uses defaults) -->
<div animateClick="fadeIn">Fade in on click</div>

<!-- With custom parameters -->
<div animateClick="fadeIn({ opacity: 0.1 })">Custom fade in</div>
```

### Animation Triggers

#### animateClick

Triggers animation on click event:

```html
<!-- Basic usage -->
<button animateClick="pulse">Pulse on click</button>

<!-- With parameters -->
<button animateClick="shake({ distance: 20 })">Shake on click</button>
```

#### animateEnter

Triggers animation when element enters the viewport or on page load:

```html
<!-- Animates on page load -->
<div animateEnter="fadeIn">Appears on load</div>

<!-- With custom parameters -->
<div animateEnter="slideInLeft({ distance: '-200%' })">Slides from far left</div>
```

### Animation Presets

#### Entrance Animations (12)

```html
<!-- Example: Fade In -->
<div animateEnter="fadeIn">Uses default opacity: 0</div>
<div animateEnter="fadeIn({ opacity: 0.2 })">Custom starting opacity</div>

<!-- Example: Slide In Left -->
<div animateEnter="slideInLeft">Uses default distance: -100%</div>
<div animateEnter="slideInLeft({ distance: '-300%', opacity: 0 })">Custom distance and opacity</div>

<!-- Example: Bounce In -->
<div animateEnter="bounceIn">Uses default bounce values</div>
<div animateEnter="bounceIn({ startScale: 0, midScale: 1.5, endScale: 1 })">Custom bounce effect</div>
```

**Available:** `fadeIn`, `zoomIn`, `slideInLeft`, `slideInRight`, `slideInUp`, `slideInDown`, `bounceIn`, `rotateIn`, `flipIn`, `rollIn`, `lightSpeedIn`, `backIn`

#### Exit Animations (8)

```html
<!-- Example: Fade Out -->
<div animateClick="fadeOut">Fades to transparent</div>
<div animateClick="fadeOut({ opacity: 0.3 })">Fades to 30% opacity</div>

<!-- Example: Zoom Out -->
<div animateClick="zoomOut">Shrinks to nothing</div>
<div animateClick="zoomOut({ scale: 0.5, opacity: 0.2 })">Custom scale and opacity</div>
```

**Available:** `fadeOut`, `zoomOut`, `fadeOutUp`, `fadeOutDown`, `flipOut`, `rollOut`, `backOut`, `hinge`

#### Attention Animations (9)

```html
<!-- Example: Pulse -->
<div animateClick="pulse">Default pulse effect</div>
<div animateClick="pulse({ scale1: 1.2, scale2: 1 })">Custom pulse intensity</div>

<!-- Example: Shake -->
<div animateClick="shake">Default shake</div>
<div animateClick="shake({ distance: 25 })">Stronger shake</div>
```

**Available:** `pulse`, `shake`, `wobble`, `jello`, `heartBeat`, `flash`, `swingIn`, `rubberBandIn`, `jackInTheBox`

### Custom Animations

You can also use raw GSAP animation syntax:

```html
<!-- Single property -->
<div animateClick="opacity:0:>">Fade in (from opacity 0)</div>
<div animateClick="to:opacity:0:>">Fade out (to opacity 0)</div>

<!-- Multiple properties (separated by semicolon or comma) -->
<div animateClick="opacity:0:>;scale:0.5:<">Fade and scale simultaneously</div>
<div animateClick="x:-100%:>;opacity:0:0">Slide from left with fade</div>

<!-- Sequential animations -->
<div animateClick="scale:0:>;to:scale:1.2:>;to:scale:1:>">Bounce effect</div>
```

### Syntax Breakdown

```
[method]:[property]:[value]:[position]
```

- **method**: `from` (default) or `to`
- **property**: Any GSAP animatable property (`opacity`, `scale`, `x`, `y`, `rotate`, etc.)
- **value**: Target value
- **position**: Timeline position (`>` = sequence, `<` = simultaneous, `0` = start, numeric = absolute time)

## Real-World Examples

### Page Load Animations (animateEnter)

```html
<!-- Hero section -->
<section animateEnter="fadeIn({ opacity: 0 })">
  <h1>Welcome to our site</h1>
</section>

<!-- Cards appearing -->
<div animateEnter="slideInUp">
  <div class="card">Card 1</div>
</div>

<!-- Image reveal -->
<img animateEnter="zoomIn({ scale: 0.8 })" src="hero.jpg" />

<!-- Text entrance -->
<p animateEnter="slideInLeft({ distance: '-100%' })">Animated paragraph</p>
```

### Interactive Elements (animateClick)

```html
<!-- Button feedback -->
<button animateClick="pulse">Click me!</button>
<button animateClick="pulse({ scale1: 1.15 })">Custom pulse</button>

<!-- Error feedback -->
<input animateClick="shake({ distance: 15 })" />

<!-- Delete action -->
<button animateClick="fadeOut">Delete</button>

<!-- Expand/collapse -->
<div animateClick="zoomIn({ scale: 0 })">Expandable content</div>
```

### Common UI Patterns

```html
<!-- Modal entrance -->
<div animateEnter="zoomIn({ scale: 0.8, opacity: 0 })">
  <div class="modal">
    <h2>Modal Title</h2>
  </div>
</div>

<!-- Notification toast -->
<div animateEnter="slideInRight">New message received</div>

<!-- Success checkmark -->
<svg animateEnter="bounceIn({ startScale: 0, midScale: 1.2, endScale: 1 })">
  <!-- checkmark icon -->
</svg>

<!-- Loading indicator -->
<div animateEnter="pulse">Loading...</div>

<!-- Alert dismissal -->
<button animateClick="fadeOutUp">
  <span>Dismiss</span>
</button>

<!-- Menu item hover effect -->
<a animateClick="wobble">Menu Item</a>
```

### Combining Triggers

```html
<!-- Card that appears on load and pulses on click -->
<div animateEnter="fadeIn" animateClick="pulse">Interactive card</div>

<!-- Button that slides in and shakes on error -->
<button animateEnter="slideInUp" animateClick="shake">Submit</button>
```

## License

MIT
