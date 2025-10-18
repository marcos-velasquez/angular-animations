import { Presets } from '../../_presets';
import { PresetMatcher } from '../_matchers/preset-matcher';
import { ObjectParser } from '../../utils/object-parser';
import { ObjectSerializer } from '../../utils/object-serializer';

export class PresetExpander {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public expand(): string {
    if (!this.presetMatcher.isFunction()) return Presets[this.presetMatcher.sequence]();

    const { presetName, argsString } = this.presetMatcher.toPresetMatch();
    const params = new ObjectParser().parse(argsString);
    return Presets.eval(presetName, new ObjectSerializer().toParamsString(params));
  }
}
