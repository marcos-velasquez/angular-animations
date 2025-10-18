import { assert } from '../../utils/assert';
import { PresetMatcher } from '../_matchers/preset-matcher';
import { ObjectParser } from '../_parsers/object-parser';

export type ExtractedParams = { presetParams: Record<string, unknown>; customVars: gsap.TweenVars };

export class PresetParamExtractor {
  constructor(private readonly sequence: string) {
    assert(!!this.sequence?.trim(), 'Sequence is required');
  }

  public extract(): ExtractedParams {
    const matcher = new PresetMatcher(this.sequence);

    if (!matcher.isPreset() || !matcher.isFunction()) {
      return { presetParams: {}, customVars: {} };
    }

    const { argsString, hasArgs } = matcher.toPresetMatch();
    if (!hasArgs) return { presetParams: {}, customVars: {} };

    const params = new ObjectParser().parse(argsString);
    const preset = matcher.preset;
    const paramMatch = preset.toString().match(/\{([^}]+)\}/);
    assert(!!paramMatch, 'Preset must have destructured parameters');

    const presetParamNames = paramMatch[1].split(',').map((p) => p.trim().split('=')[0].trim());

    return Object.keys(params).reduce(
      (acc, key) => {
        acc[presetParamNames.includes(key) ? 'presetParams' : 'customVars'][key] = params[key];
        return acc;
      },
      { presetParams: {}, customVars: {} } as ExtractedParams
    );
  }
}
