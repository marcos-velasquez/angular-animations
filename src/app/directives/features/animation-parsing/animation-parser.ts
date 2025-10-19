import { assert, RegexPatterns } from '../../core/utils';
import { SequenceParser, ParsedAnimation } from './sequence-parser';
import { PresetResolver } from '../preset-resolution';

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
