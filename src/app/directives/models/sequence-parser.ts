import { PropsParser } from './props-parser';

export type Method = 'to' | 'from';
export type ParsedAnimation = { method: Method; vars: gsap.TweenVars; position: gsap.Position };

export class SequenceParser {
  private static readonly DEFAULT_METHOD: Method = 'from';
  private static readonly DEFAULT_POSITION = '>';
  private static readonly ANIMATION_REGEX = /^(?:(to|from):)?([^:]+):([^:@;]+)(?::([^@;]+))?(?:@([^;]+))?$/;

  public static parse(sequence: string): ParsedAnimation | null {
    const match = sequence.trim().match(SequenceParser.ANIMATION_REGEX);
    if (!match) return null;

    const [
      ,
      method = SequenceParser.DEFAULT_METHOD,
      prop,
      value,
      position = SequenceParser.DEFAULT_POSITION,
      propsString,
    ] = match;
    const vars: gsap.TweenVars = { [prop]: isNaN(Number(value)) ? value : Number(value) };

    if (propsString) Object.assign(vars, PropsParser.parse(propsString));

    return { method: method as Method, vars, position };
  }
}
