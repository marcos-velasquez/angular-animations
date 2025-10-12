# Angular Animations con GSAP

Biblioteca de animaciones en Angular basada en GSAP.

Incluye una colección de animaciones reutilizables para mejorar la experiencia de usuario en aplicaciones Angular. Cada animación está organizada por categoría (texto, scroll, transformación, interacción, ...), con código fuente y documentación para facilitar su integración y personalización.

## Objetivo de la Aplicación

Esta aplicación tiene como objetivo proporcionar una colección de animaciones reutilizables para proyectos en Angular, facilitando su integración y personalización en aplicaciones reales.

## Arquitectura de Directivas

Sistema de directivas Angular combinables que encapsulan animaciones GSAP con una API declarativa y intuitiva.

### 🧩 **Directivas de Animaciones Atómicas**

Bloques fundamentales que se pueden combinar entre sí:

```html
<!-- Directivas simples con valores por defecto -->
<div fadeIn>Aparece con fade (opacidad 0 → 1)</div>
<div scale>Escala al 200% por defecto</div>
<div rotate>Rota 360° por defecto</div>

<!-- Directivas personalizadas -->
<div fadeIn scale="1.5" rotate="45">Combinación múltiple</div>
<div scale="3" [duration]="2">Escala personalizada</div>
```

**Directivas disponibles:**
- `fadeIn` / `fadeOut` - Opacidad (por defecto: 0 ↔ 1)
- `scale` - Escala (por defecto: 2, personalizable: `scale="1.5"`)
- `rotate` - Rotación (por defecto: 360°, personalizable: `rotate="90"`)
- `translate` - Movimiento (personalizable: `[x]="100" [y]="50"`)

### 🎯 **Directivas de Triggers**

Controlan cuándo y cómo se ejecutan las animaciones:

```html
<!-- Triggers básicos -->
<div fadeIn trigger="scroll">Se anima al hacer scroll</div>
<div scale trigger="hover">Se anima al pasar cursor</div>
<div rotate trigger="click">Se anima al hacer click</div>

<!-- Scroll avanzado -->
<div fadeIn scale="1.2" trigger="scroll" scrub>
  Sincronizado con scroll
</div>
```

### 🔤 **Directivas de Plugins Especializados**

Funcionalidades avanzadas de GSAP:

```html
<!-- SplitText -->
<h1 splitText fadeIn stagger="0.1" trigger="scroll">
  Texto animado por palabras
</h1>

<!-- Timeline -->
<div timeline>
  <div fadeIn [delay]="0">Primero</div>
  <div scale [delay]="0.5">Segundo</div>
  <div rotate [delay]="1">Tercero</div>
</div>
```

### 🎨 **Ejemplos de Combinaciones**

```html
<!-- Entrada compleja -->
<section fadeIn scale="1.1" rotate="5" trigger="scroll" [duration]="1.5">
  <h2>Título con animación múltiple</h2>
</section>

<!-- Interacción avanzada -->
<button scale="1.1" rotate="10" trigger="hover" ease="bounce.out">
  Botón interactivo
</button>

<!-- Texto con efectos -->
<p splitText fadeIn translate [y]="20" stagger="0.05" trigger="scroll">
  Párrafo que aparece palabra por palabra
</p>
```

---
