import { PresetParamExtractor } from './preset-param-extractor';
import { PresetMatcher } from '../_matchers/preset-matcher';
import { ObjectParser } from '../_parsers/object-parser';

export class CustomVarsExtractor {
  private readonly matcher: PresetMatcher;

  constructor(sequence: string) {
    this.matcher = new PresetMatcher(sequence);
  }

  public extract(): gsap.TweenVars {
    if (!this.matcher.isPreset() || !this.matcher.isFunction()) return {};

    const { argsString, hasArgs } = this.matcher.toPresetMatch();
    if (!hasArgs) return {};

    const params = new ObjectParser().parse(argsString);
    return new PresetParamExtractor(this.matcher.preset, params).extract().customVars;
  }
}
