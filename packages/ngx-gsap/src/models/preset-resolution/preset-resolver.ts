import { PresetMatcher } from './preset-matcher';
import { PresetExpander } from './preset-expander';
import { CustomVarsExtractor } from './custom-vars-extractor';
import { CustomVarsAppender } from './custom-vars-appender';

export class PresetResolver {
  private readonly presetMatcher: PresetMatcher;
  private readonly presetExpander: PresetExpander;
  private readonly presetCustomVarsExtractor: CustomVarsExtractor;

  constructor(private readonly sequence: string) {
    this.presetMatcher = new PresetMatcher(sequence);
    this.presetExpander = new PresetExpander(this.presetMatcher);
    this.presetCustomVarsExtractor = new CustomVarsExtractor(this.presetMatcher);
  }

  public isPreset(): boolean {
    return this.presetMatcher.isPreset();
  }

  public resolve(): string {
    if (!this.isPreset()) return this.sequence;

    const sequence = this.presetExpander.expand();
    const customVars = this.presetCustomVarsExtractor.extract();
    return new CustomVarsAppender(sequence).append(customVars);
  }
}
