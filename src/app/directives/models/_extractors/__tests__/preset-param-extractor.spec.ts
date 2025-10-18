import { PresetParamExtractor } from '../preset-param-extractor';

describe('PresetParamExtractor', () => {
  describe('extract()', () => {
    it('should separate preset params from custom vars', () => {
      const extractor = new PresetParamExtractor('fadeIn({ x: "100%", duration: 2 })');

      expect(extractor.extract().presetParams).toEqual({ x: '100%' });
      expect(extractor.extract().customVars).toEqual({ duration: 2 });
    });

    it('should handle only preset params', () => {
      const extractor = new PresetParamExtractor('fadeOut({ x: "100%", y: "-50%" })');

      expect(extractor.extract().presetParams).toEqual({ x: '100%', y: '-50%' });
      expect(extractor.extract().customVars).toEqual({});
    });

    it('should handle only custom vars', () => {
      const extractor = new PresetParamExtractor('fadeIn({ duration: 2, yoyo: true })');
      const result = extractor.extract();

      expect(result.presetParams).toEqual({});
      expect(result.customVars).toEqual({ duration: 2, yoyo: true });
    });

    it('should handle multiple preset params and custom vars', () => {
      const extractor = new PresetParamExtractor('fadeOut({ x: "100%", y: "-50%", duration: 3, yoyo: true, repeat: 2 })');

      expect(extractor.extract().presetParams).toEqual({ x: '100%', y: '-50%' });
      expect(extractor.extract().customVars).toEqual({ duration: 3, yoyo: true, repeat: 2 });
    });

    it('should throw error for empty sequence', () => {
      expect(() => {
        new PresetParamExtractor('');
      }).toThrow('Sequence is required');
    });

    it('should return empty for non-preset sequence', () => {
      const extractor = new PresetParamExtractor('x:100%:>');

      expect(extractor.extract().presetParams).toEqual({});
      expect(extractor.extract().customVars).toEqual({});
    });

    it('should handle preset without args', () => {
      const extractor = new PresetParamExtractor('fadeIn()');

      expect(extractor.extract().presetParams).toEqual({});
      expect(extractor.extract().customVars).toEqual({});
    });
  });
});
