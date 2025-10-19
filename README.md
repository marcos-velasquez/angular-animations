# ngx-gsap

A lightweight Angular animation library powered by GSAP with a declarative, preset-based API.

## Installation

```bash
npm install gsap ngx-gsap
```

## Quick Start

Import the directives in your component:

```typescript

import { AnimateDirective } from 'ngx-gsap';
import { AnimateClickDirective } from 'ngx-gsap';
import { AnimateEnterDirective } from 'ngx-gsap';
import { AnimateLeaveDirective } from 'ngx-gsap';
import { AnimateLoadDirective } from 'ngx-gsap';

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
<!-- Simple animation (uses defaults) -->
<div animateClick="fadeIn">Fade in on click</div>

<!-- With custom parameters -->
<div animateClick="fadeIn({ opacity: 0.1 })">Custom fade in</div>

<!-- Using animate directive -->
<div animate="fadeIn({ opacity: 0.1 })" trigger="click">Custom fade in</div>
```

### Animation Triggers

There are **two ways** to trigger animations:

#### 1. Using Specific Directives

Use dedicated directives for each trigger type:

```html
<!-- animateLoad - Triggers on page load -->
<div animateLoad="fadeIn">Appears on page load</div>

<!-- animateClick - Triggers on click -->
<button animateClick="pulse">Pulse on click</button>

<!-- animateEnter - Triggers on mouse enter (hover) -->
<div animateEnter="fadeIn">Fades in on hover</div>

<!-- animateLeave - Triggers on mouse leave -->
<div animateLeave="fadeOut">Fades out on mouse leave</div>

<!-- Multiple triggers -->
<div animateClick="scale" animateEnter="fadeIn" animateLeave="fadeOut">Multiple triggers</div>
```

#### 2. Using `animate` Directive

Use the `animate` directive with the `trigger` input:

```html
<!-- Single trigger -->
<div animate="fadeIn" trigger="load">Appears on page load</div>
<button animate="pulse" trigger="click">Pulse on click</button>
<div animate="fadeIn" trigger="enter">Fades in on hover</div>
<div animate="fadeOut" trigger="leave">Fades out on mouse leave</div>
```

### Animation Presets

> **💡 Important:** Our animations are **highly flexible and parametrized**. Instead of having dozens of similar animations like `fadeInLeft`, `fadeInRight`, `fadeInUp`, `fadeInDown`, etc., we provide **one powerful animation** that you can customize with parameters. This gives you **infinite possibilities** while keeping the API clean and simple!

**Example:** The `fadeIn` animation can replace all these:

- `fadeIn` → Simple fade in
- `fadeIn({ x: '-100%' })` → Replaces `fadeInLeft`
- `fadeIn({ x: '100%' })` → Replaces `fadeInRight`
- `fadeIn({ y: '100%' })` → Replaces `fadeInUp`
- `fadeIn({ y: '-100%' })` → Replaces `fadeInDown`
- `fadeIn({ x: '-100%', y: '-100%' })` → Replaces `fadeInTopLeft`
- `fadeIn({ y: '2000px' })` → Replaces `fadeInUpBig`

> 📖 **Note:** You can add any valid GSAP property to customize your animations, including `duration`, `ease`, `delay`, `stagger`, `repeat`, `yoyo`, and more. See the [GSAP documentation](https://greensock.com/docs/) for all available properties.

---

### Custom Animations (Raw Syntax)

You can also use raw GSAP animation syntax:

```html
<!-- Single property -->
<div animateClick="opacity:0:>">Fade in (from opacity 0)</div>
<div animateClick="to:opacity:0:>">Fade out (to opacity 0)</div>

<!-- Multiple properties (separated by semicolon) -->
<div animateClick="opacity:0:>;scale:0.5:<">Fade and scale simultaneously</div>
<div animateClick="x:-100%:>;opacity:0:0">Slide from left with fade</div>

<!-- Sequential animations -->
<div animateClick="scale:0:>;to:scale:1.2:>;to:scale:1:>">Bounce effect</div>
```

#### Syntax Breakdown

```
[method]:[property]:[value]:[position]@[props]
```

- **method**: `from` (default) or `to`
- **property**: Any GSAP animatable property (`opacity`, `scale`, `x`, `y`, `rotate`, etc.)
- **value**: Target value
- **position**: Timeline position (`>` = sequence, `<` = simultaneous, `0` = start, numeric = absolute time) - **Optional**
- **props**: Custom GSAP properties like `duration`, `ease`, `yoyo`, etc. - **Optional**

### Combining Animations

You can combine multiple presets or mix presets with raw syntax using semicolons:

```html
<!-- Combine multiple presets -->
<div animateLoad="fadeIn;rotateIn">Fade and rotate together</div>
<div animateClick="pulse;shake">Pulse then shake</div>

<!-- Combine presets with parameters -->
<div animateLoad="fadeIn({ x: '-100%' });bounceIn">Slide from left then bounce</div>

<!-- Mix presets with raw syntax -->
<div animateClick="fadeIn;to:scale:1.2:>">Fade in then scale up</div>
<div animateLoad="slideIn({ x: '-100%' });rotate:360:>">Slide and rotate</div>

<!-- Complex combinations -->
<div animateClick="fadeIn;pulse;to:scale:1.5:>">Multiple effects</div>
```

### Dynamic Values with Component Variables

You can bind component properties to animation parameters using Angular's interpolation:

```typescript
// Component
export class MyComponent {
  public duration = 20;
}
```

```html
<!-- Use component variable in animation -->
<div animateClick="fadeIn({ duration: {{ duration }} })">Dynamic duration fade in</div>
```

### Animating Child Elements with `selector`

Use `selector` to animate child elements instead of the element itself:

```html
<!-- Animate child elements -->
<div animateLoad="fadeIn({ selector: '.card' })">
  @for (item of items; track item.id) {
  <div class="card">{{ item.name }}</div>
  }
</div>

<!-- With stagger -->
<div animateLoad="fadeIn({ selector: '.card', stagger: { amount: 1, from: 'center' } })">
  @for (item of items; track item.id) {
  <div class="card">{{ item.name }}</div>
  }
</div>
```

**Raw syntax:**

```html
<div animate="opacity:0@selector=.card,stagger={amount:1,from:center}">
  @for (item of items; track item.id) {
  <div class="card">{{ item }}</div>
  }
</div>
```

## License

MIT
