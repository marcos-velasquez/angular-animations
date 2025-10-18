import { assert } from '../../utils/_index';
import { PresetMatcher } from '../_matchers/_index';
import { PresetExpander } from '../_expanders/_index';
import { CustomVarsExtractor } from '../_extractors/_index';
import { CustomVarsAppender } from '../_appenders/_index';

export class PresetResolver {
  private readonly presetMatcher: PresetMatcher;
  private readonly presetExpander: PresetExpander;
  private readonly customVarsExtractor: CustomVarsExtractor;
  private readonly customVarsAppender: CustomVarsAppender;

  constructor(sequence: string) {
    this.presetMatcher = new PresetMatcher(sequence);
    this.presetExpander = new PresetExpander(sequence);
    this.customVarsExtractor = new CustomVarsExtractor(sequence);
    this.customVarsAppender = new CustomVarsAppender();
  }

  public isPreset(): boolean {
    return this.presetMatcher.isPreset();
  }

  public resolve(): string {
    assert(this.isPreset(), 'Sequence is not a preset');

    const sequence = this.presetExpander.expand();
    const customVars = this.customVarsExtractor.extract();
    return this.customVarsAppender.append(sequence, customVars);
  }
}
