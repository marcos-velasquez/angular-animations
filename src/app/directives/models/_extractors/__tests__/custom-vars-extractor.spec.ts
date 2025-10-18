import { CustomVarsExtractor } from '../custom-vars-extractor';

describe('CustomVarsExtractor', () => {
  describe('extract()', () => {
    it('should extract duration from preset with custom vars', () => {
      const extractor = new CustomVarsExtractor('fadeIn({ duration: 2 })');
      const result = extractor.extract();

      expect(result.duration).toBe(2);
    });

    it('should extract multiple custom vars', () => {
      const extractor = new CustomVarsExtractor('fadeOut({ duration: 3, yoyo: true, repeat: 2 })');
      const result = extractor.extract();

      expect(result.duration).toBe(3);
      expect(result.yoyo).toBe(true);
      expect(result.repeat).toBe(2);
    });

    it('should return empty object for preset without custom vars', () => {
      const extractor = new CustomVarsExtractor('fadeIn({ x: "100%" })');
      const result = extractor.extract();

      expect(result).toEqual({});
    });

    it('should return empty object for preset without args', () => {
      const extractor = new CustomVarsExtractor('fadeIn()');
      const result = extractor.extract();

      expect(result).toEqual({});
    });

    it('should return empty object for preset without parentheses', () => {
      const extractor = new CustomVarsExtractor('fadeIn');
      const result = extractor.extract();

      expect(result).toEqual({});
    });

    it('should return empty object for non-preset sequences', () => {
      const extractor = new CustomVarsExtractor('x:100%:>;opacity:0:0');
      const result = extractor.extract();

      expect(result).toEqual({});
    });

    it('should return empty object for unknown presets', () => {
      const extractor = new CustomVarsExtractor('unknownPreset({ duration: 2 })');
      const result = extractor.extract();

      expect(result).toEqual({});
    });

    it('should handle invalid args gracefully', () => {
      const extractor = new CustomVarsExtractor('fadeIn({ invalid syntax })');
      const result = extractor.extract();

      expect(result).toEqual({});
    });

    it('should extract ease as custom var', () => {
      const extractor = new CustomVarsExtractor('fadeIn({ ease: "power2.out" })');
      const result = extractor.extract();

      expect(result.ease).toBe('power2.out');
    });

    it('should mix preset params with custom vars', () => {
      const extractor = new CustomVarsExtractor('fadeOut({ x: "100%", duration: 2, yoyo: true })');
      const result = extractor.extract();

      expect(result.duration).toBe(2);
      expect(result.yoyo).toBe(true);
      expect(result.x).toBeUndefined();
    });
  });
});
