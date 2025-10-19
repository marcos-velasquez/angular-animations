# Animation Parsing

Converts animation syntax strings into GSAP-compatible objects.

## Responsibility

Parse custom animation syntax into structured animation data.

**Input:** `"x:100%:>@duration=2"`  
**Output:** `{ method: 'from', vars: { x: '100%', duration: 2 }, position: '>' }`

## Public API

### `AnimationParser`
Main parser that orchestrates the parsing process.

```typescript
import { AnimationParser } from '@app/features/animation-parsing';

const parser = new AnimationParser('x:100%:>@duration=2');
const animations = parser.parse();
```

## Internal Components

- `SequenceParser` - Parses individual animation sequences
- `PropsParser` - Parses property strings (e.g., `duration=2,ease=power2.out`)
- `ObjectParser` - Parses object-like strings
- `ObjectSerializer` - Serializes objects to strings
- `ObjectNormalizer` - Normalizes object formats

## Syntax

```
[method:]property:value[:position][@props]

Examples:
- "x:100%"                    → from x to 100%
- "to:opacity:0"              → to opacity 0
- "scale:2:>"                 → from scale 2 at position >
- "x:100%@duration=2"         → from x to 100% with duration 2
- "x:100%;to:y:50%"           → multiple animations
```
