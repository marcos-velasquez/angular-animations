import { PresetResolver, ResolvedPreset } from './preset-resolver';
import { SequenceParser, ParsedAnimation } from './sequence-parser';

export class AnimationParser {
  private static readonly DELIMITERS = /;/;
  private readonly sequences: string[];
  private customVars: gsap.TweenVars = {};

  constructor(sequence: string) {
    const { expandedSequence, customVars }: ResolvedPreset = PresetResolver.resolve(sequence.trim());
    this.customVars = customVars;
    this.sequences = expandedSequence.split(AnimationParser.DELIMITERS);
  }

  public parse(): ParsedAnimation[] {
    const animations = this.sequences.map((seq) => SequenceParser.parse(seq)).filter((anim) => anim);
    return animations.map((anim) => ({ ...anim, vars: { ...anim.vars, ...this.customVars } }));
  }
}
