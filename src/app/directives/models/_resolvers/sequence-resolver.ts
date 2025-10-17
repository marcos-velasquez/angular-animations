import { PresetResolver } from './preset-resolver';

export class SequenceResolver {
  constructor(private readonly sequence: string) {}

  public resolve(): string {
    if (PresetResolver.isPreset(this.sequence)) {
      return new PresetResolver(this.sequence).resolve();
    } else {
      return this.sequence;
    }
  }
}
