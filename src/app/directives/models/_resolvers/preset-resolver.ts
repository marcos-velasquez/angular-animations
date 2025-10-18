import { assert } from '../../utils/_index';
import { PresetMatcher } from '../_matchers/_index';
import { PresetExpander } from '../_expanders/_index';
import { PresetCustomVarsExtractor } from '../_extractors/_index';
import { CustomVarsAppender } from '../_appenders/_index';

export class PresetResolver {
  private readonly presetMatcher: PresetMatcher;
  private readonly presetExpander: PresetExpander;
  private readonly presetCustomVarsExtractor: PresetCustomVarsExtractor;

  constructor(sequence: string) {
    this.presetMatcher = new PresetMatcher(sequence);
    this.presetExpander = new PresetExpander(this.presetMatcher);
    this.presetCustomVarsExtractor = new PresetCustomVarsExtractor(this.presetMatcher);
  }

  public isPreset(): boolean {
    return this.presetMatcher.isPreset();
  }

  public resolve(): string {
    assert(this.isPreset(), 'Sequence is not a preset');

    const sequence = this.presetExpander.expand();
    const customVars = this.presetCustomVarsExtractor.extract();
    return new CustomVarsAppender(sequence).append(customVars);
  }
}
