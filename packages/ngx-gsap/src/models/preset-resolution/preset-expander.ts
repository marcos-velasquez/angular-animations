import { Presets } from './presets';
import { PresetMatcher } from './preset-matcher';
import { ObjectNormalizer } from '../animation-parsing/object-normalizer';

export class PresetExpander {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public expand(): string {
    if (!this.presetMatcher.isFunction()) return (Presets as any)[this.presetMatcher.sequence]();

    const { presetName, argsString } = this.presetMatcher.toPresetMatch();
    return Presets.eval(presetName, new ObjectNormalizer(argsString).normalize());
  }
}
