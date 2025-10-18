import { assert } from '../utils/_index';
import { SequenceResolver } from './_resolvers/sequence-resolver';
import { SequenceParser, ParsedAnimation } from './_parsers/sequence-parser';
import { PropsParser } from './_parsers/props-parser';

export class AnimationParser {
  private static readonly DELIMITERS = /;/;
  private readonly sequenceParser: SequenceParser;
  private readonly sequences: string[];

  constructor(sequence: string) {
    assert(!!sequence?.trim(), 'Sequence is required');

    sequence = sequence.trim();
    this.sequenceParser = new SequenceParser(new PropsParser());
    this.sequences = new SequenceResolver(sequence).resolve().split(AnimationParser.DELIMITERS);
  }

  public parse(): ParsedAnimation[] {
    return this.sequences.map((seq) => this.sequenceParser.parse(seq)).filter((anim) => anim !== null);
  }
}
