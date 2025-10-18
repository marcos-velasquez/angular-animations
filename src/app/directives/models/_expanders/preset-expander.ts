import { Presets } from '../../_presets';
import { PresetMatcher } from '../_matchers/preset-matcher';
import { PresetArgumentsParser } from '../_parsers/preset-arguments-parser';

export class PresetExpander {
  private readonly presetMatcher: PresetMatcher;

  constructor(private readonly sequence: string) {
    this.presetMatcher = new PresetMatcher(sequence);
  }

  public expand(): string {
    if (!this.presetMatcher.isFunction()) return Presets[this.sequence]();

    const { presetName, argsString } = this.presetMatcher.toPresetMatch();
    return Presets.eval(presetName, new PresetArgumentsParser(argsString).parse());
  }
}
