# Preset Resolution

Expands preset shortcuts into full animation sequences.

## Responsibility

Resolve preset names and parameters into complete animation syntax.

**Input:** `"fadeIn({ x: 100 })"`  
**Output:** `"x:100%;opacity:0:0"`

## Public API

### `PresetResolver`
Resolves preset strings into animation sequences.

```typescript
import { PresetResolver } from '@app/features/preset-resolution';

const resolver = new PresetResolver('fadeIn({ x: 100 })');
const sequence = resolver.resolve();
```

### `Presets`
Collection of predefined animation presets.

```typescript
import { Presets } from '@app/features/preset-resolution';

// Available presets
Presets.fadeIn({ x: '100%' });
Presets.fadeOut({ duration: 2 });
Presets.slideIn({ x: '-100%' });
```

## Internal Components

- `PresetMatcher` - Matches preset syntax
- `PresetExpander` - Expands presets to sequences
- `PresetCustomVarsExtractor` - Extracts custom variables
- `CustomVarsAppender` - Appends custom vars to sequences

## Creating Custom Presets

```typescript
// In presets.ts
export const Presets = {
  myCustom: ({ x = '0%', duration = 1 }) => 
    `x:${x}@duration=${duration}`,
};
```

## Usage

```html
<!-- Using presets -->
<div animate="fadeIn({ x: '100%' })"></div>
<div animate="slideIn({ duration: 2 })"></div>
```
