import { Presets } from '../../_presets';
import { PresetParamExtractor } from './preset-param-extractor';

export class CustomVarsExtractor {
  private readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;
  private readonly paramExtractor: PresetParamExtractor;

  constructor(private readonly sequence: string) {
    this.paramExtractor = new PresetParamExtractor();
  }

  public extract(): gsap.TweenVars {
    const match = this.sequence.match(this.PRESET_FUNCTION_REGEX);

    if (match && Presets[match[1]]) {
      const presetName = match[1];
      const argsString = match[2].trim();

      if (argsString) {
        try {
          const params = eval(`(${argsString})`) as Record<string, unknown>;
          const { customVars } = this.paramExtractor.extract(presetName, params);
          return customVars;
        } catch {
          return {};
        }
      }
    }

    return {};
  }
}
