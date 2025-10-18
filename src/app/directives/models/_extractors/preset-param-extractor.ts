import { Preset } from '../../_presets';
import { assert } from '../../utils/assert';

export type ExtractedParams = { presetParams: Record<string, unknown>; customVars: gsap.TweenVars };

export class PresetParamExtractor {
  constructor(private readonly preset: Preset, private readonly params: Record<string, unknown>) {
    assert(!!this.preset, 'Preset is required');
    assert(!!this.params, 'Params are required');
  }

  public extract(): ExtractedParams {
    const paramMatch = this.preset.toString().match(/\{([^}]+)\}/);
    assert(!!paramMatch, 'Preset must have destructured parameters');

    const presetParamNames = paramMatch[1].split(',').map((p) => p.trim().split('=')[0].trim());

    return Object.keys(this.params).reduce(
      (acc, key) => {
        acc[presetParamNames.includes(key) ? 'presetParams' : 'customVars'][key] = this.params[key];
        return acc;
      },
      { presetParams: {}, customVars: {} } as ExtractedParams
    );
  }
}
