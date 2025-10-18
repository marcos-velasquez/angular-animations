import { PresetResolver } from './preset-resolver';

export class SequenceResolver {
  private readonly presetResolver: PresetResolver;

  constructor(private readonly sequence: string) {
    this.presetResolver = new PresetResolver(this.sequence);
  }

  public resolve(): string {
    if (this.presetResolver.isPreset()) {
      return this.presetResolver.resolve();
    } else {
      return this.sequence;
    }
  }
}
