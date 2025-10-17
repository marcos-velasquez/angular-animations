import { Presets } from '../../_presets';
import { PresetParamExtractor } from './preset-param-extractor';

export class SequenceResolver {
  private readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;
  private readonly paramExtractor: PresetParamExtractor;

  constructor(private readonly sequence: string) {
    this.paramExtractor = new PresetParamExtractor();
  }

  public resolve(): string {
    const match = this.sequence.match(this.PRESET_FUNCTION_REGEX);

    if (match && Presets[match[1]]) {
      const presetName = match[1];
      const argsString = match[2].trim();

      if (argsString) {
        try {
          const params = eval(`(${argsString})`) as Record<string, unknown>;
          const { presetParams } = this.paramExtractor.extract(presetName, params);
          const paramsString =
            Object.keys(presetParams).length > 0
              ? `{ ${Object.entries(presetParams)
                  .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
                  .join(', ')} }`
              : '';
          return Presets.eval(presetName, paramsString);
        } catch {
          return Presets.eval(presetName, argsString);
        }
      }
      return Presets.eval(presetName, argsString);
    }

    if (Presets[this.sequence]) {
      return Presets[this.sequence]();
    }

    return this.sequence;
  }
}
