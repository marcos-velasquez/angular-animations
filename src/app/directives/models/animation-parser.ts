import { assert } from '../utils/_index';
import { SequenceResolver } from './_resolvers/sequence-resolver';
import { SequenceParser, ParsedAnimation } from './_parsers/sequence-parser';

export class AnimationParser {
  private static readonly DELIMITERS = /;/;
  private readonly sequences: string[];

  constructor(sequence: string) {
    assert(!!sequence?.trim(), 'Sequence is required');

    sequence = sequence.trim();
    this.sequences = new SequenceResolver(sequence).resolve().split(AnimationParser.DELIMITERS);
  }

  public parse(): ParsedAnimation[] {
    return this.sequences.map((sequence) => new SequenceParser(sequence).parse()).filter((anim) => anim !== null);
  }
}
