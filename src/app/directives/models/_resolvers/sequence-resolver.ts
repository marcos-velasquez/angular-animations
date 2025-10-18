import { PresetResolver } from './preset-resolver';

export class SequenceResolver {
  private readonly presetResolver: PresetResolver;

  constructor(private readonly sequence: string) {
    this.presetResolver = new PresetResolver(this.sequence);
  }

  public resolve(): string {
    return this.presetResolver.isPreset() ? this.presetResolver.resolve() : this.sequence;
  }
}
