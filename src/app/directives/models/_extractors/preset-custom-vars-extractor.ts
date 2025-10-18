import { assert } from '../../utils/assert';
import { PresetMatcher } from '../_matchers/preset-matcher';
import { ObjectParser } from '../../utils/object-parser';

export class PresetCustomVarsExtractor {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public extract(): gsap.TweenVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.toPresetMatch();
    if (!hasArgs) return {};

    const paramMatch = this.presetMatcher.preset.toString().match(/\{([^}]+)\}/);
    assert(!!paramMatch, 'Preset must have destructured parameters');

    const presetParamNames = paramMatch[1].split(',').map((p) => p.trim().split('=')[0].trim());

    const params = new ObjectParser(argsString).parse();
    return Object.keys(params).reduce((acc, key) => {
      if (!presetParamNames.includes(key)) acc[key] = params[key];
      return acc;
    }, {} as gsap.TweenVars);
  }
}
