import { PresetResolver } from '../preset-resolver';

describe('PresetResolver', () => {
  describe('isPreset()', () => {
    it('should return true for preset with function syntax', () => {
      expect(new PresetResolver('fadeIn()').isPreset()).toBe(true);
      expect(new PresetResolver('fadeOut({ x: "100%" })').isPreset()).toBe(true);
    });

    it('should return true for preset without parentheses', () => {
      expect(new PresetResolver('fadeIn').isPreset()).toBe(true);
    });

    it('should return false for non-preset sequences', () => {
      expect(new PresetResolver('x:100%:>').isPreset()).toBe(false);
      expect(new PresetResolver('opacity:0:<').isPreset()).toBe(false);
    });

    it('should return false for unknown presets', () => {
      expect(new PresetResolver('unknownPreset()').isPreset()).toBe(false);
    });
  });

  describe('resolve()', () => {
    it('should expand preset with parameters', () => {
      const resolver = new PresetResolver('fadeIn({ x: "-100%" })');
      const result = resolver.resolve();

      expect(result).toContain('x:-100%');
      expect(result).toContain('opacity:0');
    });

    it('should expand preset without parameters', () => {
      const resolver = new PresetResolver('fadeIn()');
      const result = resolver.resolve();

      expect(result).toContain('x:0');
      expect(result).toContain('opacity:0');
    });

    it('should expand preset without parentheses', () => {
      const resolver = new PresetResolver('fadeIn');
      const result = resolver.resolve();

      expect(result).toContain('x:0');
      expect(result).toContain('opacity:0');
    });

    it('should handle preset with multiple parameters', () => {
      const resolver = new PresetResolver('fadeOut({ x: "100%", y: "-50%" })');
      const result = resolver.resolve();

      expect(result).toContain('x:100%');
      expect(result).toContain('y:-50%');
    });
  });
});
