import { assert } from '../../utils/assert';
import { PresetMatcher } from '../_matchers/preset-matcher';
import { ObjectParser } from '../_parsers/object-parser';

export class CustomVarsExtractor {
  private readonly presetMatcher: PresetMatcher;

  constructor(private readonly sequence: string) {
    this.presetMatcher = new PresetMatcher(sequence);
  }

  public extract(): gsap.TweenVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.toPresetMatch();
    if (!hasArgs) return {};

    const params = new ObjectParser().parse(argsString);
    const preset = this.presetMatcher.preset;
    const paramMatch = preset.toString().match(/\{([^}]+)\}/);
    assert(!!paramMatch, 'Preset must have destructured parameters');

    const presetParamNames = paramMatch[1].split(',').map((p) => p.trim().split('=')[0].trim());

    return Object.keys(params).reduce((acc, key) => {
      if (!presetParamNames.includes(key)) acc[key] = params[key];
      return acc;
    }, {} as gsap.TweenVars);
  }
}
