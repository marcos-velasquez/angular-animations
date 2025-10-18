import { assert, RegexPatterns } from '../utils/_index';
import { SequenceParser, ParsedAnimation } from './_parsers/sequence-parser';
import { PresetResolver } from './_index';

export class AnimationParser {
  private readonly sequences: string[];

  constructor(sequence: string) {
    assert(!!sequence?.trim(), 'Sequence is required');
    this.sequences = new PresetResolver(sequence.trim()).resolve().split(RegexPatterns.SEQUENCE_DELIMITER);
  }

  public parse(): ParsedAnimation[] {
    return this.sequences.map((sequence) => new SequenceParser(sequence).parse()).filter((anim) => anim !== null);
  }
}
