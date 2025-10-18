import { Presets } from '../../_presets';
import { PresetMatcher } from '../_matchers/preset-matcher';
import { ObjectNormalizer } from '../../utils/object-normalizer';

export class PresetExpander {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public expand(): string {
    if (!this.presetMatcher.isFunction()) return Presets[this.presetMatcher.sequence]();

    const { presetName, argsString } = this.presetMatcher.toPresetMatch();
    return Presets.eval(presetName, new ObjectNormalizer(argsString).normalize());
  }
}
