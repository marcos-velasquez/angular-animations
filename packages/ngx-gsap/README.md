# ngx-gsap

Powerful GSAP animations for Angular with **69+ preset animations** - highly customizable and easy to use.

## ✨ Features

- 🎨 **69 preset animations** categorized in: Entrance (25), Exit (12), Attention (25), and Special (25)
- 🎯 **Highly customizable** - each animation accepts parameters
- 🚀 **Easy to use** - simple directive-based API
- 📦 **Lightweight** - tree-shakeable and optimized
- 🔧 **TypeScript** - full type safety
- ⚡ **Powered by GSAP** - industry-leading animation library

## 📦 Installation

```bash
npm install ngx-gsap gsap
```

## 🚀 Quick Start

### 1. Import the directives

```typescript
import { Component } from '@angular/core';
import { AnimateDirective, AnimateClickDirective } from 'ngx-gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AnimateDirective, AnimateClickDirective],
  template: `
    <div animate="fadeIn">Fades in on load</div>
    <button animateClick="bounce">Click me!</button>
  `
})
export class AppComponent {}
```

### 2. Use the animations

```html
<!-- Simple animations -->
<div animate="fadeIn">Fade in</div>
<div animate="slideIn({ x: '-100%' })">Slide from left</div>
<div animate="zoomIn">Zoom in</div>

<!-- With triggers -->
<div animateLoad="bounceIn">On page load</div>
<div animateEnter="fadeIn">On element enter viewport</div>
<button animateClick="pulse">On click</button>
<div animateLeave="fadeOut">On element leave viewport</div>

<!-- Custom parameters -->
<div animate="fadeIn({ x: '-100%', y: '100%', opacity: 0 })">
  Fade from bottom-left
</div>
```

## 📚 Available Animations

### Entrance Animations (25)
`fadeIn`, `slideIn`, `zoomIn`, `bounceIn`, `rotateIn`, `flipIn`, `flipInX`, `flipInY`, `rollIn`, `lightSpeedIn`, `backIn`, `blurredFadeIn`, `pop`, `bounceFadeIn`, `slideUpFade`, `slideInBounce`, `zoomInRotate`, `slideRotateIn`, `swingDropIn`, `pulseFadeIn`, `slideExpandUp`, `expandUp`, `expandOpen`, `bigEntrance`, `hatch`

### Exit Animations (12)
`fadeOut`, `slideOut`, `zoomOut`, `flipOut`, `flipOutY`, `rollOut`, `backOut`, `hinge`, `bounceOut`, `rotateOut`, `lightSpeedOut`, `slideRotateOut`

### Attention Animations (25)
`pulse`, `shake`, `wobble`, `jello`, `heartBeat`, `flash`, `swingIn`, `rubberBandIn`, `rubberBand`, `jackInTheBox`, `tada`, `bounce`, `swing`, `headShake`, `wiggle`, `jump`, `float`, `blink`, `sway`, `tilt`, `dancing`, `hang`, `sink`, `skewRight`, `kenBurns`

### Special Animations (25)
`spin`, `flip`, `glitch`, `morphing`, `squeeze`, `skew`, `expand`, `blur`, `verticalBounce`, `horizontalBounce`, `rotationalWave`, `impulseRotationRight`, `impulseRotationLeft`, `tossing`, `pullUp`, `pullDown`, `glow`, `shadow`, `growShadow`, `floatShadow`, `bob`, `buzz`, `buzzOut`, `wobbleSkew`, `kenBurns`

## 🎯 Directives

### `animate`
Triggers animation on page load.

```html
<div animate="fadeIn">Content</div>
```

### `animateLoad`
Alias for `animate` - triggers on page load.

```html
<div animateLoad="slideIn({ x: '-100%' })">Content</div>
```

### `animateClick`
Triggers animation on click.

```html
<button animateClick="bounce">Click me</button>
```

### `animateEnter`
Triggers animation when element enters viewport.

```html
<div animateEnter="fadeIn">Appears when scrolled into view</div>
```

### `animateLeave`
Triggers animation when element leaves viewport.

```html
<div animateLeave="fadeOut">Fades when scrolling away</div>
```

## 🎨 Customization

All animations accept parameters for full customization:

```html
<!-- Fade in from left -->
<div animate="fadeIn({ x: '-100%' })">Content</div>

<!-- Fade in from bottom-right -->
<div animate="fadeIn({ x: '100%', y: '100%' })">Content</div>

<!-- Custom duration and easing -->
<div animate="fadeIn({ duration: 2, ease: 'power2.out' })">Content</div>

<!-- Combine parameters -->
<div animate="slideIn({ x: '-100%', duration: 1.5, ease: 'elastic.out' })">
  Content
</div>
```

### Common Parameters

- `x`, `y` - Position (e.g., `'-100%'`, `'50px'`)
- `scale` - Scale value (e.g., `0`, `1.5`)
- `rotate` - Rotation in degrees (e.g., `180`, `-45`)
- `opacity` - Opacity value (e.g., `0`, `1`)
- `duration` - Animation duration in seconds
- `ease` - GSAP easing function
- `delay` - Delay before animation starts
- `repeat` - Number of times to repeat (-1 for infinite)
- `yoyo` - Reverse animation on repeat

## 🔧 Advanced Usage

### Event Callbacks

```typescript
import { GsapHostDirective } from 'ngx-gsap';

@Component({
  template: `
    <div 
      animate="fadeIn"
      (animateStart)="onStart($event)"
      (animateComplete)="onComplete($event)"
      (animateUpdate)="onUpdate($event)"
    >
      Content
    </div>
  `
})
export class MyComponent {
  onStart(directive: GsapHostDirective) {
    console.log('Animation started');
  }
  
  onComplete(directive: GsapHostDirective) {
    console.log('Animation completed');
  }
  
  onUpdate(directive: GsapHostDirective) {
    console.log('Animation updating');
  }
}
```

### Programmatic Control

```typescript
import { ViewChild } from '@angular/core';
import { AnimateDirective } from 'ngx-gsap';

@Component({
  template: `
    <div #animated animate="fadeIn">Content</div>
    <button (click)="play()">Play</button>
    <button (click)="pause()">Pause</button>
    <button (click)="reverse()">Reverse</button>
  `
})
export class MyComponent {
  @ViewChild('animated', { read: AnimateDirective }) 
  animated!: AnimateDirective;
  
  play() { this.animated.play(); }
  pause() { this.animated.pause(); }
  reverse() { this.animated.reverse(); }
  restart() { this.animated.restart(); }
  resume() { this.animated.resume(); }
}
```

## 📖 Examples

Check out the [live demo](https://your-demo-url.com) to see all 69 animations in action!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Marcos Velasquez

## 🙏 Credits

Built with [GSAP](https://greensock.com/gsap/) - the industry-leading animation library.
