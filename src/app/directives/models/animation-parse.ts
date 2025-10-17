import { SequenceResolver } from './_resolvers/sequence-resolver';
import { VarsParser } from './_parsers/vars-parser';
import { SequenceParser, ParsedAnimation } from './_parsers/sequence-parser';
import { PropsParser } from './_parsers/props-parser';

export class AnimationParser {
  private readonly DELIMITERS = /;/;
  private readonly sequences: string[];
  private readonly vars: gsap.TweenVars;

  constructor(sequence: string) {
    sequence = sequence.trim();
    this.sequences = new SequenceResolver(sequence).resolve().split(this.DELIMITERS);
    this.vars = new VarsParser(sequence).parse();
  }

  public parse(): ParsedAnimation[] {
    return this.sequences
      .map((seq) => new SequenceParser(new PropsParser()).parse(seq))
      .filter((anim) => anim)
      .map((anim) => ({ ...anim, vars: { ...anim.vars, ...this.vars } }));
  }
}
