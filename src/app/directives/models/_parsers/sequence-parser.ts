import { PropsParser } from './props-parser';

export type Method = 'to' | 'from';
export type ParsedAnimation = { method: Method; vars: gsap.TweenVars; position: gsap.Position };

export class SequenceParser {
  private readonly DEFAULT_METHOD: Method = 'from';
  private readonly DEFAULT_POSITION = '>';
  private readonly ANIMATION_REGEX = /^(?:(to|from):)?([^:]+):([^:@;]+)(?::([^@;]+))?(?:@([^;]+))?$/;

  constructor(private readonly propsParser: PropsParser) {}

  public parse(sequence: string): ParsedAnimation | null {
    const match = sequence.trim().match(this.ANIMATION_REGEX);
    if (!match) return null;

    const [, method = this.DEFAULT_METHOD, prop, value, position = this.DEFAULT_POSITION, propsString] = match;
    const vars: gsap.TweenVars = { [prop]: isNaN(Number(value)) ? value : Number(value) };

    if (propsString) Object.assign(vars, this.propsParser.parse(propsString));

    return { method: method as Method, vars, position };
  }
}
