# Animations Data

## How to Add New Animations

To add a new animation to the showcase, simply add a new object to the `animations` array in `animations.data.ts`.

### Animation Object Structure

```typescript
{
  name: string;           // Display name (e.g., "Fade In")
  category: 'entrance' | 'exit' | 'attention' | 'special';
  value: string;          // Animation directive value (e.g., "fadeIn" or "fadeIn({ x: '-100%' })")
  description: string;    // Short description of the animation
  examples: string[];     // Array of usage examples
  gradient: string;       // Tailwind gradient classes (e.g., "from-orange-400 to-teal-600")
  content?: string;       // Optional HTML content to display inside the animation box
}
```

### Example

```typescript
{
  name: 'My New Animation',
  category: 'entrance',
  value: 'myAnimation',
  description: 'A cool new animation effect.',
  examples: [
    'myAnimation',
    'myAnimation({ scale: 1.5, rotate: 180 })'
  ],
  gradient: 'from-blue-400 to-purple-600',
  content: '<div class="w-24 h-24 bg-white rounded-full"></div>'
}
```

### Categories

- **entrance**: Animations for elements appearing on screen
- **exit**: Animations for elements leaving the screen
- **attention**: Animations to draw attention to elements (loops, pulses, etc.)
- **special**: Special effects and unique animations

### Tips

1. **Gradient**: Use Tailwind's gradient classes. Check existing animations for inspiration.
2. **Content**: Optional HTML to display inside the animation box. Use Tailwind classes for styling.
3. **Examples**: Provide at least 2 examples - one simple and one with parameters.
4. **Value**: Should match the actual animation name from your GSAP library.

### After Adding

The animation will automatically appear in:

- The animations grid
- Search results (searchable by name, description, and value)
- Category filters
- The total count will update automatically

No other files need to be modified! 🎉
