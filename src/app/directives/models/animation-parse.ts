import { Presets } from '../_presets';

export type Method = 'to' | 'from';
export type ParsedAnimation = { method: Method; vars: gsap.TweenVars; position: gsap.Position };

export class AnimationParser {
  public static readonly DELIMITERS = /[;,]/;
  public static readonly DEFAULT_METHOD: Method = 'from';
  public static readonly DEFAULT_POSITION = '>';
  public static readonly ANIMATION_REGEX = /^(?:(to|from):)?([^:]+):([^:]+)(?::(.+))?$/;
  public static readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;

  private readonly sequences: string[];

  constructor(sequence: string) {
    this.sequences = this.resolvePreset(sequence).split(AnimationParser.DELIMITERS);
  }

  public parse(): ParsedAnimation[] {
    return this.sequences.map((sequence) => this.create(sequence)).filter((anim) => anim);
  }

  private resolvePreset(sequence: string): string {
    const functionMatch = sequence.trim().match(AnimationParser.PRESET_FUNCTION_REGEX);

    if (functionMatch) {
      const [, presetName, argsString] = functionMatch;

      try {
        const fn = new Function('Presets', `return Presets.${presetName}(${argsString.trim()})`);
        const result = fn(Presets);
        return result;
      } catch (error) {
        return sequence;
      }
    }

    const trimmedSequence = sequence.trim();
    if (Presets[trimmedSequence] && typeof Presets[trimmedSequence] === 'function') {
      return Presets[trimmedSequence]();
    }

    return sequence;
  }

  private create(sequence: string): ParsedAnimation {
    const match = sequence.trim().match(AnimationParser.ANIMATION_REGEX);
    if (!match) return null;

    const [, method = AnimationParser.DEFAULT_METHOD, prop, value, position = AnimationParser.DEFAULT_POSITION] = match;

    return { method: method as Method, vars: { [prop]: isNaN(Number(value)) ? value : Number(value) }, position };
  }
}
