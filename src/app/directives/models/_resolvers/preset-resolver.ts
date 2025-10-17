import { Presets } from '../../_presets';
import { ObjectParser } from '../_parsers/object-parser';

export class PresetResolver {
  private static readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;
  private static readonly objectParser = new ObjectParser();

  constructor(private readonly sequence: string) {}

  public static isPreset(sequence: string): boolean {
    const match = sequence.match(PresetResolver.PRESET_FUNCTION_REGEX);
    if (match && Presets[match[1]]) return true;
    if (Presets[sequence]) return true;
    return false;
  }

  public resolve(): string {
    const match = this.sequence.match(PresetResolver.PRESET_FUNCTION_REGEX);

    // Preset con función: fadeOut({ x: "100%" })
    if (match && Presets[match[1]]) {
      const [, presetName, argsString] = match;
      if (!argsString.trim()) return Presets.eval(presetName, argsString);

      try {
        const params = PresetResolver.objectParser.parse(argsString);
        const paramsString =
          Object.keys(params).length > 0
            ? `{ ${Object.entries(params)
                .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
                .join(', ')} }`
            : '';
        return Presets.eval(presetName, paramsString);
      } catch {
        return Presets.eval(presetName, argsString);
      }
    }

    // Preset sin paréntesis: fadeOut
    if (Presets[this.sequence]) {
      return Presets[this.sequence]();
    }

    // Fallback (no debería llegar aquí si se usa isPreset correctamente)
    return this.sequence;
  }
}
