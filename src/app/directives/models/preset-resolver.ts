import { Presets } from '../_presets';
import { PresetParamExtractor } from './preset-param-extractor';

export type ResolvedPreset = { expandedSequence: string; customVars: gsap.TweenVars };

export class PresetResolver {
  private static readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;

  public static resolve(sequence: string): ResolvedPreset {
    const match = sequence.match(PresetResolver.PRESET_FUNCTION_REGEX);

    if (match && Presets[match[1]]) {
      const presetName = match[1];
      const argsString = match[2].trim();

      if (argsString) {
        try {
          const params = eval(`(${argsString})`) as Record<string, unknown>;
          const { presetParams, customVars } = PresetParamExtractor.extract(presetName, params);
          const paramsString =
            Object.keys(presetParams).length > 0
              ? `{ ${Object.entries(presetParams)
                  .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
                  .join(', ')} }`
              : '';
          const expandedSequence = Presets.eval(presetName, paramsString);
          return { expandedSequence, customVars };
        } catch {
          return { expandedSequence: Presets.eval(presetName, argsString), customVars: {} };
        }
      }
      return { expandedSequence: Presets.eval(presetName, argsString), customVars: {} };
    }

    if (Presets[sequence]) {
      return { expandedSequence: Presets[sequence](), customVars: {} };
    }

    return { expandedSequence: sequence, customVars: {} };
  }
}
