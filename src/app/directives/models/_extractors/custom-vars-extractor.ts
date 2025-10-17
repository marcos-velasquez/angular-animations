import { Presets } from '../../_presets';
import { PresetParamExtractor } from './preset-param-extractor';
import { ObjectParser } from '../_parsers/object-parser';

export class CustomVarsExtractor {
  private static readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;
  private static readonly paramExtractor = new PresetParamExtractor();
  private static readonly objectParser = new ObjectParser();

  constructor(private readonly sequence: string) {}

  public extract(): gsap.TweenVars {
    const match = this.sequence.match(CustomVarsExtractor.PRESET_FUNCTION_REGEX);

    if (match && Presets[match[1]]) {
      const presetName = match[1];
      const argsString = match[2].trim();

      if (argsString) {
        try {
          const params = CustomVarsExtractor.objectParser.parse(argsString);
          const { customVars } = CustomVarsExtractor.paramExtractor.extract(presetName, params);
          return customVars;
        } catch {
          return {};
        }
      }
    }

    return {};
  }
}
