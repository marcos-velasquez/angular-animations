import { Presets } from '../_presets';

export type Method = 'to' | 'from';
export type ParsedAnimation = { method: Method; vars: gsap.TweenVars; position: gsap.Position };

export class AnimationParser {
  public static readonly DELIMITERS = /[;,]/;
  public static readonly DEFAULT_METHOD: Method = 'from';
  public static readonly DEFAULT_POSITION = '>';
  public static readonly ANIMATION_REGEX = /^(?:(to|from):)?([^:]+):([^:]+)(?::(.+))?$/;
  public static readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;

  private readonly sequence: string[];

  constructor(sequence: string) {
    this.sequence = this.normalize(sequence.trim()).split(AnimationParser.DELIMITERS);
  }

  public parse(): ParsedAnimation[] {
    return this.sequence.map((sequence) => this.create(sequence)).filter((anim) => anim);
  }

  private normalize(sequence: string): string {
    const match = sequence.match(AnimationParser.PRESET_FUNCTION_REGEX);
    if (match && Presets[match[1]]) {
      return Presets.eval(match[1], match[2].trim());
    } else {
      return Presets[sequence] ? Presets[sequence]() : sequence;
    }
  }

  private create(sequence: string): ParsedAnimation {
    const match = sequence.trim().match(AnimationParser.ANIMATION_REGEX);
    if (!match) return null;

    const [, method = AnimationParser.DEFAULT_METHOD, prop, value, position = AnimationParser.DEFAULT_POSITION] = match;

    return { method: method as Method, vars: { [prop]: isNaN(Number(value)) ? value : Number(value) }, position };
  }
}
