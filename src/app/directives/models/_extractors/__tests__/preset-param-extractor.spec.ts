import { PresetParamExtractor } from '../preset-param-extractor';
import { Presets } from '../../../_presets';

describe('PresetParamExtractor', () => {
  describe('extract()', () => {
    it('should separate preset params from custom vars', () => {
      const extractor = new PresetParamExtractor();
      const result = extractor.extract(Presets.fadeIn, { x: '100%', duration: 2 });

      expect(result.presetParams).toEqual({ x: '100%' });
      expect(result.customVars).toEqual({ duration: 2 });
    });

    it('should handle only preset params', () => {
      const extractor = new PresetParamExtractor();
      const result = extractor.extract(Presets.fadeOut, { x: '100%', y: '-50%' });

      expect(result.presetParams).toEqual({ x: '100%', y: '-50%' });
      expect(result.customVars).toEqual({});
    });

    it('should handle only custom vars', () => {
      const extractor = new PresetParamExtractor();
      const result = extractor.extract(Presets.fadeIn, { duration: 2, yoyo: true });

      expect(result.presetParams).toEqual({});
      expect(result.customVars).toEqual({ duration: 2, yoyo: true });
    });

    it('should handle multiple preset params and custom vars', () => {
      const extractor = new PresetParamExtractor();
      const result = extractor.extract(Presets.fadeOut, {
        x: '100%',
        y: '-50%',
        duration: 3,
        yoyo: true,
        repeat: 2,
      });

      expect(result.presetParams).toEqual({ x: '100%', y: '-50%' });
      expect(result.customVars).toEqual({ duration: 3, yoyo: true, repeat: 2 });
    });

    it('should return all params as presetParams for null preset', () => {
      const extractor = new PresetParamExtractor();
      const result = extractor.extract(null as any, { x: '100%', duration: 2 });

      expect(result.presetParams).toEqual({ x: '100%', duration: 2 });
      expect(result.customVars).toEqual({});
    });

    it('should handle empty params', () => {
      const extractor = new PresetParamExtractor();
      const result = extractor.extract(Presets.fadeIn, {});

      expect(result.presetParams).toEqual({});
      expect(result.customVars).toEqual({});
    });
  });
});
