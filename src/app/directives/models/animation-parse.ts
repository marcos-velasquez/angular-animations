import { assert } from '../utils/_index';
import { SequenceResolver } from './_resolvers/sequence-resolver';
import { CustomVarsExtractor } from './_extractors/custom-vars-extractor';
import { SequenceParser, ParsedAnimation } from './_parsers/sequence-parser';
import { PropsParser } from './_parsers/props-parser';

export class AnimationParser {
  private static readonly DELIMITERS = /;/;
  private readonly sequences: string[];
  private readonly customVars: gsap.TweenVars;

  constructor(sequence: string) {
    assert(!!sequence?.trim(), 'Animation sequence is required');
    sequence = sequence.trim();
    this.sequences = new SequenceResolver(sequence).resolve().split(AnimationParser.DELIMITERS);
    this.customVars = new CustomVarsExtractor(sequence).extract();
  }

  public parse(): ParsedAnimation[] {
    const sequenceParser = new SequenceParser(new PropsParser());
    return this.sequences
      .map((seq) => sequenceParser.parse(seq))
      .filter((anim): anim is ParsedAnimation => anim !== null)
      .map((anim): ParsedAnimation => ({ ...anim, vars: { ...anim.vars, ...this.customVars } }));
  }
}
