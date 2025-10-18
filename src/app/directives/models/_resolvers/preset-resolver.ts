import { assert } from '../../utils/_index';
import { Presets } from '../../_presets';
import { PresetMatcher } from '../_matchers/_index';
import { PresetArgumentsParser } from '../_parsers/_index';

export class PresetResolver {
  private readonly presetMatcher: PresetMatcher;

  constructor(private readonly sequence: string) {
    this.presetMatcher = new PresetMatcher(sequence);
  }

  public isPreset(): boolean {
    return this.presetMatcher.isPreset();
  }

  public resolve(): string {
    assert(this.isPreset(), 'Sequence is not a preset');

    if (!this.presetMatcher.isFunction()) return Presets[this.sequence]();

    const { presetName, argsString, hasArgs } = this.presetMatcher.toPresetMatch();
    if (hasArgs) {
      return Presets.eval(presetName, new PresetArgumentsParser(argsString).parse());
    } else {
      return Presets.eval(presetName);
    }
  }
}
