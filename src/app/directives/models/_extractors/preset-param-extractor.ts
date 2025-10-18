import { Preset } from '../../_presets';

export type ExtractedParams = { presetParams: Record<string, unknown>; customVars: gsap.TweenVars };

export class PresetParamExtractor {
  public extract(preset: Preset, params: Record<string, unknown>): ExtractedParams {
    if (!preset) return { presetParams: params, customVars: {} };

    const paramMatch = preset.toString().match(/\{([^}]+)\}/);
    if (!paramMatch) return { presetParams: params, customVars: {} };

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
