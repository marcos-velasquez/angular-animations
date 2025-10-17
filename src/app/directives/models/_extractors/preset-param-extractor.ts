import { Presets } from '../../_presets';

export type ExtractedParams = { presetParams: Record<string, unknown>; customVars: gsap.TweenVars };

export class PresetParamExtractor {
  public extract(presetName: string, params: Record<string, unknown>): ExtractedParams {
    const presetFunc = Presets[presetName];
    if (!presetFunc) return { presetParams: params, customVars: {} };

    const funcStr = presetFunc.toString();
    const paramMatch = funcStr.match(/\{([^}]+)\}/);
    if (!paramMatch) return { presetParams: params, customVars: {} };

    const presetParamNames = paramMatch[1].split(',').map((p) => p.trim().split('=')[0].trim());
    const presetParams: Record<string, unknown> = {};
    const customVars: gsap.TweenVars = {};

    Object.keys(params).forEach((key) => {
      if (presetParamNames.includes(key)) {
        presetParams[key] = params[key];
      } else {
        customVars[key] = params[key];
      }
    });

    return { presetParams, customVars };
  }
}
