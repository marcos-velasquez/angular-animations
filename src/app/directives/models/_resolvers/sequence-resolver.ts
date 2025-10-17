import { Presets } from '../../_presets';
import { PresetParamExtractor } from '../_extractors/preset-param-extractor';
import { ObjectParser } from '../_parsers/object-parser';

export class SequenceResolver {
  private static readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;
  private static readonly paramExtractor = new PresetParamExtractor();
  private static readonly objectParser = new ObjectParser();

  constructor(private readonly sequence: string) {}

  public resolve(): string {
    const match = this.sequence.match(SequenceResolver.PRESET_FUNCTION_REGEX);

    if (match && Presets[match[1]]) {
      const [, presetName, argsString] = match;
      if (!argsString.trim()) return Presets.eval(presetName, argsString);

      try {
        const params = SequenceResolver.objectParser.parse(argsString);
        const { presetParams } = SequenceResolver.paramExtractor.extract(presetName, params);
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

    return Presets[this.sequence]?.() ?? this.sequence;
  }
}
