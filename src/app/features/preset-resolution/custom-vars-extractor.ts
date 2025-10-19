import { PresetMatcher } from './preset-matcher';
import { ObjectParser } from '../animation-parsing/object-parser';

export class CustomVarsExtractor {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public extract(): gsap.TweenVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.toPresetMatch();
    if (!hasArgs) return {};

    const presetParamNames = this.presetMatcher.paramNames();
    const params = new ObjectParser(argsString).parse();

    return Object.keys(params).reduce((acc, key) => {
      if (!presetParamNames.includes(key)) acc[key] = params[key];
      return acc;
    }, {} as gsap.TweenVars);
  }
}
