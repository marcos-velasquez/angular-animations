# Angular GSAP Animations

A lightweight Angular animation library powered by GSAP with a declarative, preset-based API.

## Installation

```bash
npm install gsap
```

## Quick Start

Import the directives in your component:

```typescript
import { AnimateDirective } from './directives/animate.directive';
import { AnimateClickDirective } from './directives/animate-click.directive';
import { AnimateEnterDirective } from './directives/animate-enter.directive';
import { AnimateLeaveDirective } from './directives/animate-leave.directive';
import { AnimateLoadDirective } from './directives/animate-load.directive';

@Component({
  imports: [
    AnimateDirective,
    AnimateClickDirective,
    AnimateEnterDirective,
    AnimateLeaveDirective,
    AnimateLoadDirective
  ],
  template: `
    <div animateClick="pulse">Click me!</div>
    <div animateEnter="fadeIn">Hover over me!</div>
    <div animateLeave="fadeOut">Mouse leave</div>
    <div animateLoad="slideInLeft">Animates on page load</div>
    <div animate="scale" trigger="enter|leave|click|load">Hover card</div>
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

Triggers animation on mouse over (hover):

```html
<!-- Basic usage -->
<div animateEnter="fadeIn">Fades in on hover</div>

<!-- With custom parameters -->
<div animateEnter="scale({ scale: 1.1 })">Scales up on hover</div>
```

#### animateLeave

Triggers animation on mouse leave:

```html
<!-- Basic usage -->
<div animateLeave="fadeOut">Fades out on mouse leave</div>

<!-- With custom parameters -->
<div animateLeave="slideOutRight({ distance: '100%' })">Slides out on leave</div>
```

#### animateLoad

Triggers animation when page loads:

```html
<!-- Basic usage -->
<div animateLoad="fadeIn">Appears on page load</div>

<!-- With custom parameters -->
<div animateLoad="slideInLeft({ distance: '-200%' })">Slides from far left on load</div>
```

### Animation Presets

#### Entrance Animations (12)

```html
<!-- Example: Fade In -->
<div animateLoad="fadeIn">Uses default opacity: 0</div>
<div animateLoad="fadeIn({ opacity: 0.2 })">Custom starting opacity</div>

<!-- Example: Slide In Left -->
<div animateLoad="slideInLeft">Uses default distance: -100%</div>
<div animateLoad="slideInLeft({ distance: '-300%', opacity: 0 })">Custom distance and opacity</div>

<!-- Example: Bounce In -->
<div animateLoad="bounceIn">Uses default bounce values</div>
<div animateLoad="bounceIn({ startScale: 0, midScale: 1.5, endScale: 1 })">Custom bounce effect</div>
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

### Page Load Animations (animateLoad)

```html
<!-- Hero section -->
<section animateLoad="fadeIn({ opacity: 0 })">
  <h1>Welcome to our site</h1>
</section>

<!-- Cards appearing -->
<div animateLoad="slideInUp">
  <div class="card">Card 1</div>
</div>

<!-- Image reveal -->
<img animateLoad="zoomIn({ scale: 0.8 })" src="hero.jpg" />

<!-- Text entrance -->
<p animateLoad="slideInLeft({ distance: '-100%' })">Animated paragraph</p>
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

### Hover Effects (animateEnter / animateLeave)

```html
<!-- Card hover -->
<div animateEnter="scale({ scale: 1.05 })" animateLeave="scale({ scale: 1 })">Hover card</div>

<!-- Button hover -->
<button animateEnter="pulse" animateLeave="fadeIn">Hover me</button>

<!-- Image zoom -->
<img animateEnter="zoomIn({ scale: 1.1 })" animateLeave="zoomOut({ scale: 1 })" src="image.jpg" />

<!-- Menu item -->
<a animateEnter="slideInRight({ distance: '10px' })">Menu Item</a>
```

### Common UI Patterns

```html
<!-- Modal entrance -->
<div animateLoad="zoomIn({ scale: 0.8, opacity: 0 })">
  <div class="modal">
    <h2>Modal Title</h2>
  </div>
</div>

<!-- Notification toast -->
<div animateLoad="slideInRight">New message received</div>

<!-- Success checkmark -->
<svg animateLoad="bounceIn({ startScale: 0, midScale: 1.2, endScale: 1 })">
  <!-- checkmark icon -->
</svg>

<!-- Loading indicator -->
<div animateLoad="pulse">Loading...</div>

<!-- Alert dismissal -->
<button animateClick="fadeOutUp">
  <span>Dismiss</span>
</button>

<!-- Card with hover effect -->
<div animateEnter="scale({ scale: 1.05 })" animateLeave="scale({ scale: 1 })">Hover card</div>
```

### Combining Triggers

```html
<!-- Card that appears on load and scales on hover -->
<div animateLoad="fadeIn" animateEnter="scale({ scale: 1.05 })">Interactive card</div>

<!-- Button that slides in and shakes on click -->
<button animateLoad="slideInUp" animateClick="shake">Submit</button>

<!-- Image that loads with zoom and has hover effect -->
<img
  animateLoad="zoomIn({ scale: 0.8 })"
  animateEnter="scale({ scale: 1.1 })"
  animateLeave="scale({ scale: 1 })"
  src="image.jpg"
/>
```

## License

MIT
