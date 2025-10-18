import { PresetResolver } from './preset-resolver';

export class SequenceResolver {
  private readonly resolver: PresetResolver;

  constructor(private readonly sequence: string) {
    this.resolver = new PresetResolver(this.sequence);
  }

  public resolve(): string {
    if (this.resolver.isPreset()) {
      return this.resolver.resolve();
    } else {
      return this.sequence;
    }
  }
}
