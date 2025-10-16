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
<!-- Example: Fade In (simple) -->
<div animateLoad="fadeIn">Simple fade in</div>

<!-- Example: Fade In from directions -->
<div animateLoad="fadeIn({ y: '100%' })">Fade in from bottom</div>
<div animateLoad="fadeIn({ y: '-100%' })">Fade in from top</div>
<div animateLoad="fadeIn({ x: '-100%' })">Fade in from left</div>
<div animateLoad="fadeIn({ x: '100%' })">Fade in from right</div>

<!-- Example: Fade In from corners -->
<div animateLoad="fadeIn({ x: '-100%', y: '-100%' })">Fade in from top-left</div>
<div animateLoad="fadeIn({ x: '100%', y: '100%' })">Fade in from bottom-right</div>

<!-- Example: Fade In Big (large distances) -->
<div animateLoad="fadeIn({ y: '2000px' })">Fade in from far bottom</div>

<!-- Example: Slide In -->
<div animateLoad="slideIn({ x: '-100%' })">Slide in from left</div>
<div animateLoad="slideIn({ y: '100%' })">Slide in from bottom</div>

<!-- Example: Zoom In with direction -->
<div animateLoad="zoomIn({ y: '-100%', scale: 0 })">Zoom in from top</div>
<div animateLoad="zoomIn({ x: '100%', scale: 0 })">Zoom in from right</div>

<!-- Example: Rotate In with direction -->
<div animateLoad="rotateIn({ y: '100%', rotate: -45 })">Rotate in from bottom</div>

<!-- Example: Back In with direction -->
<div animateLoad="backIn({ y: '-100%' })">Back in from top</div>
```

**Available:** `fadeIn`, `blurredFadeIn`, `zoomIn`, `zoomInRotate`, `slideIn`, `slideInBounce`, `slideExpandUp`, `slideUpFade`, `slideRotateIn`, `bounceIn`, `bounceFadeIn`, `rotateIn`, `flipIn`, `flipInX`, `flipInY`, `rollIn`, `lightSpeedIn`, `backIn`, `pop`, `expandUp`, `expandOpen`, `bigEntrance`, `hatch`, `swingDropIn`, `pulseFadeIn`

#### Exit Animations (17)

```html
<!-- Example: Fade Out (simple) -->
<div animateClick="fadeOut">Simple fade out</div>

<!-- Example: Fade Out with directions -->
<div animateClick="fadeOut({ y: '-100%' })">Fade out to top</div>
<div animateClick="fadeOut({ x: '100%' })">Fade out to right</div>
<div animateClick="fadeOut({ x: '-100%', y: '100%' })">Fade out to bottom-left</div>

<!-- Example: Slide Out -->
<div animateClick="slideOut({ x: '-100%' })">Slide out to left</div>
<div animateClick="slideOut({ y: '100%' })">Slide out to bottom</div>
```

**Available:** `fadeOut`, `zoomOut`, `slideOut`, `slideRotateOut`, `flipOut`, `flipOutY`, `rollOut`, `rotateOut`, `bounceOut`, `lightSpeedOut`, `backOut`, `hinge`, `sink`

#### Attention Animations (16)

```html
<!-- Example: Pulse -->
<div animateClick="pulse">Default pulse effect</div>
<div animateClick="pulse({ scale1: 1.2, scale2: 1 })">Pulse grow</div>
<div animateClick="pulse({ scale1: 0.9, scale2: 1 })">Pulse shrink</div>

<!-- Example: Shake -->
<div animateClick="shake">Horizontal shake</div>
<div animateClick="shake({ x: '15px' })">Stronger horizontal shake</div>
<div animateClick="shake({ y: '10px' })">Vertical shake</div>
<div animateClick="shake({ x: '10px', y: '10px' })">Diagonal shake</div>

<!-- Example: Bounce -->
<div animateClick="bounce">Bounces in place</div>
<div animateClick="bounce({ y1: '-40px' })">Higher bounce</div>
```

**Available:** `pulse`, `shake`, `wobble`, `wobbleSkew`, `jello`, `heartBeat`, `flash`, `bounce`, `tada`, `swing`, `swingIn`, `headShake`, `rubberBand`, `rubberBandIn`, `wiggle`, `jackInTheBox`, `jump`, `hang`, `float`, `blink`, `sway`, `tilt`, `tossing`, `pullUp`, `pullDown`, `bob`, `buzz`, `buzzOut`, `dancing`, `verticalBounce`, `horizontalBounce`, `rotationalWave`, `impulseRotationRight`, `impulseRotationLeft`

#### Special Animations (4)

```html
<!-- Example: Spin -->
<div animateClick="spin">360° rotation</div>
<div animateClick="spin({ degrees: 720 })">Double spin</div>

<!-- Example: Glitch -->
<div animateClick="glitch">Glitch effect</div>

<!-- Example: Ken Burns -->
<img animateLoad="kenBurns({ scale: 1.3 })" src="image.jpg" />
```

**Available:** `flip`, `spin`, `glitch`, `blur`, `kenBurns`, `morphing`, `skew`, `skewRight`, `squeeze`, `expand`, `glow`, `shadow`, `growShadow`, `floatShadow`

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

<!-- Button hover with tada -->
<button animateEnter="tada">Hover me</button>

<!-- Image zoom with Ken Burns effect -->
<img animateEnter="kenBurns({ scale: 1.2 })" src="image.jpg" />

<!-- Menu item wiggle -->
<a animateEnter="wiggle">Menu Item</a>

<!-- Glitch effect on hover -->
<div animateEnter="glitch">Glitch on hover</div>
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
