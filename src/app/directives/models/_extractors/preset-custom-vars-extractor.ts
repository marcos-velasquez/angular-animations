import { PresetMatcher } from '../_matchers/preset-matcher';
import { ObjectParser } from '../../utils/object-parser';

export class PresetCustomVarsExtractor {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public extract(): gsap.TweenVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.toPresetMatch();
    if (!hasArgs) return {};

    const presetParamNames = this.presetMatcher.getParamNames();
    const params = new ObjectParser(argsString).parse();

    return Object.keys(params).reduce((acc, key) => {
      if (!presetParamNames.includes(key)) acc[key] = params[key];
      return acc;
    }, {} as gsap.TweenVars);
  }
}
