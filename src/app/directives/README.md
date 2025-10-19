# Angular Animations - Vertical Slicing Architecture

This project uses **Vertical Slicing** to organize code by feature rather than by technical layer.

## 📁 Structure

```
src/app/directives/
├── core/                           # Shared infrastructure
│   ├── gsap-host.directive.ts      # Base directive for GSAP
│   ├── animate.directive.ts        # Main animation directive
│   ├── timeline/                   # Timeline management
│   │   ├── timeline.ts
│   │   ├── timeline-factory.ts
│   │   └── index.ts
│   ├── trigger/                    # Trigger types
│   │   ├── trigger.ts
│   │   ├── tween-vars.ts
│   │   └── index.ts
│   └── utils/                      # Shared utilities
│       ├── type-converter.ts
│       ├── regex-patterns.ts
│       ├── assert.ts
│       ├── sleep.ts
│       ├── that.ts
│       └── index.ts
│
├── features/                       # Business features
│   ├── animation-parsing/          # Feature: Parse animation syntax
│   │   ├── animation-parser.ts     # Public API
│   │   ├── sequence-parser.ts      # Internal
│   │   ├── props-parser.ts         # Internal
│   │   ├── object-parser.ts        # Internal
│   │   ├── object-serializer.ts    # Internal
│   │   ├── object-normalizer.ts    # Internal
│   │   ├── __tests__/              # Feature tests
│   │   └── index.ts                # Public exports
│   │
│   ├── preset-resolution/          # Feature: Resolve presets
│   │   ├── preset-resolver.ts      # Public API
│   │   ├── presets.ts              # Public API
│   │   ├── preset-matcher.ts       # Internal
│   │   ├── preset-expander.ts      # Internal
│   │   ├── preset-custom-vars-extractor.ts  # Internal
│   │   ├── custom-vars-appender.ts # Internal
│   │   ├── __tests__/              # Feature tests
│   │   └── index.ts                # Public exports
│   │
│   ├── triggers/                   # Feature: Animation triggers
│   │   ├── animate-click.directive.ts
│   │   ├── animate-enter.directive.ts
│   │   ├── animate-leave.directive.ts
│   │   ├── animate-load.directive.ts
│   │   ├── animate-scroll.directive.ts
│   │   └── index.ts                # Public exports
│   │
│   └── index.ts                    # All features public API
│
└── index.ts                        # Main entry point
```

## 🎯 Features

### 1. **Animation Parsing**
**Responsibility:** Convert animation syntax strings into GSAP-compatible objects.

**Input:** `"x:100%:>@duration=2"`  
**Output:** `{ method: 'from', vars: { x: '100%', duration: 2 }, position: '>' }`

**Public API:**
- `AnimationParser`

**Internal:**
- `SequenceParser`, `PropsParser`, `ObjectParser`, `ObjectSerializer`, `ObjectNormalizer`

---

### 2. **Preset Resolution**
**Responsibility:** Expand preset shortcuts into full animation sequences.

**Input:** `"fadeIn({ x: 100 })"`  
**Output:** `"x:100%;opacity:0:0"`

**Public API:**
- `PresetResolver`
- `Presets`

**Internal:**
- `PresetMatcher`, `PresetExpander`, `PresetCustomVarsExtractor`, `CustomVarsAppender`

---

### 3. **Triggers**
**Responsibility:** Activate animations based on DOM events.

**Public API:**
- `AnimateClickDirective`
- `AnimateEnterDirective`
- `AnimateLeaveDirective`
- `AnimateLoadDirective`
- `AnimateScrollDirective`

---

## 🔧 Core Infrastructure

### Timeline
Manages GSAP timeline creation and caching.

### Trigger
Defines trigger types and tween variables.

### Utils
Shared utilities:
- `TypeConverter` - Type conversion (string → boolean, number, etc.)
- `RegexPatterns` - Centralized regex patterns
- `assert`, `sleep`, `that` - Helper functions

---

## 📦 Usage

### Import from features
```typescript
// Import animation parsing
import { AnimationParser } from '@app/directives/features/animation-parsing';

// Import preset resolution
import { PresetResolver, Presets } from '@app/directives/features/preset-resolution';

// Import triggers
import { AnimateLoadDirective } from '@app/directives/features/triggers';
```

### Import from main entry
```typescript
// Import everything
import { 
  AnimationParser, 
  PresetResolver, 
  Presets,
  AnimateLoadDirective 
} from '@app/directives';
```

---

## ✅ Benefits of Vertical Slicing

### 1. **High Cohesion**
All code related to a feature is in one place.

### 2. **Low Coupling**
Features are independent and can evolve separately.

### 3. **Easy Testing**
```bash
# Test a specific feature
npm test features/animation-parsing
npm test features/preset-resolution
```

### 4. **Clear Ownership**
Each feature can be owned by a different team.

### 5. **Scalability**
Add new features without touching existing ones:
```
features/
├── animation-parsing/
├── preset-resolution/
├── triggers/
├── transitions/          # New feature
└── effects/              # New feature
```

---

## 🧪 Testing

Tests are colocated with their features in `__tests__/` directories.

```bash
# Run all tests
npm test

# Run tests for a specific feature
npm test animation-parsing
npm test preset-resolution
```

---

## 📝 Adding a New Feature

1. Create feature directory:
```bash
mkdir -p src/app/directives/features/my-feature/__tests__
```

2. Implement feature files:
```typescript
// my-feature/my-feature.ts
export class MyFeature {
  // Implementation
}
```

3. Create public API:
```typescript
// my-feature/index.ts
export { MyFeature } from './my-feature';
```

4. Add to features index:
```typescript
// features/index.ts
export * from './my-feature';
```

5. Add tests:
```typescript
// my-feature/__tests__/my-feature.spec.ts
import { MyFeature } from '../my-feature';
```

---

## 🎓 Architecture Principles

### Vertical Slicing
- ✅ Organize by **what it does** (feature)
- ❌ Not by **how it's built** (technical layer)

### Public vs Internal
- **Public API** - Exported in `index.ts`
- **Internal** - Not exported, implementation details

### Dependencies
- Features can depend on `core/`
- Features can depend on other features (sparingly)
- `core/` should not depend on features

---

## 📊 Migration from Horizontal Slicing

### Before (Horizontal)
```
models/
├── _parsers/
├── _resolvers/
├── _matchers/
└── ...
utils/
```

### After (Vertical)
```
features/
├── animation-parsing/
├── preset-resolution/
└── triggers/
```

**Result:** 140 tests passing ✅
