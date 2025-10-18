import { PresetParamExtractor } from '../preset-param-extractor';
import { Presets } from '../../../_presets';

describe('PresetParamExtractor', () => {
  describe('extract()', () => {
    it('should separate preset params from custom vars', () => {
      const extractor = new PresetParamExtractor(Presets.fadeIn, { x: '100%', duration: 2 });

      expect(extractor.extract().presetParams).toEqual({ x: '100%' });
      expect(extractor.extract().customVars).toEqual({ duration: 2 });
    });

    it('should handle only preset params', () => {
      const extractor = new PresetParamExtractor(Presets.fadeOut, { x: '100%', y: '-50%' });

      expect(extractor.extract().presetParams).toEqual({ x: '100%', y: '-50%' });
      expect(extractor.extract().customVars).toEqual({});
    });

    it('should handle only custom vars', () => {
      const extractor = new PresetParamExtractor(Presets.fadeIn, { duration: 2, yoyo: true });
      const result = extractor.extract();

      expect(result.presetParams).toEqual({});
      expect(result.customVars).toEqual({ duration: 2, yoyo: true });
    });

    it('should handle multiple preset params and custom vars', () => {
      const extractor = new PresetParamExtractor(Presets.fadeOut, {
        x: '100%',
        y: '-50%',
        duration: 3,
        yoyo: true,
        repeat: 2,
      });

      expect(extractor.extract().presetParams).toEqual({ x: '100%', y: '-50%' });
      expect(extractor.extract().customVars).toEqual({ duration: 3, yoyo: true, repeat: 2 });
    });

    it('should throw error for null preset', () => {
      expect(() => {
        new PresetParamExtractor(null as any, { x: '100%', duration: 2 });
      }).toThrow('Preset is required');
    });

    it('should throw error for null params', () => {
      expect(() => {
        new PresetParamExtractor(Presets.fadeIn, null as any);
      }).toThrow('Params are required');
    });

    it('should handle empty params', () => {
      const extractor = new PresetParamExtractor(Presets.fadeIn, {});

      expect(extractor.extract().presetParams).toEqual({});
      expect(extractor.extract().customVars).toEqual({});
    });

    it('should throw error for preset without destructured parameters', () => {
      const presetWithoutDestructuring = (() => 'x:0:>') as any;
      const extractor = new PresetParamExtractor(presetWithoutDestructuring, { duration: 2 });

      expect(() => {
        extractor.extract();
      }).toThrow('Preset must have destructured parameters');
    });
  });
});
