import { PRESETS } from '../_presets';
import { That } from '../utils/_index';

export type Method = 'to' | 'from';
export type ParsedAnimation = { method: Method; vars: gsap.TweenVars; position: gsap.Position };

export class AnimationParser {
  public static readonly DELIMITERS = /[;,]/;
  public static readonly DEFAULT_METHOD: Method = 'from';
  public static readonly DEFAULT_POSITION = '>';
  public static readonly ANIMATION_REGEX = /^(?:(to|from):)?([^:]+):([^:]+)(?::(.+))?$/;

  private readonly sequences: string[];

  constructor(sequence: string) {
    this.sequences = new That(PRESETS[sequence]).or(sequence).split(AnimationParser.DELIMITERS);
  }

  public parse(): ParsedAnimation[] {
    return this.sequences.map((sequence) => this.create(sequence)).filter((anim) => anim);
  }

  private create(sequence: string): ParsedAnimation {
    const match = sequence.trim().match(AnimationParser.ANIMATION_REGEX);
    if (!match) return null;

    const [, method = AnimationParser.DEFAULT_METHOD, prop, value, position = AnimationParser.DEFAULT_POSITION] = match;

    return { method: method as Method, vars: { [prop]: isNaN(Number(value)) ? value : Number(value) }, position };
  }
}
