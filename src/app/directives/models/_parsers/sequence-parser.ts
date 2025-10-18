import { PropsParser } from './props-parser';

export type Method = 'to' | 'from';
export type ParsedAnimation = { method: Method; vars: gsap.TweenVars; position: gsap.Position };

export class SequenceParser {
  private readonly ANIMATION_REGEX = /^(?:(to|from):)?([^:]+):([^:@;]+)(?::([^@;]+))?(?:@([^;]+))?$/;

  constructor(private readonly sequence: string) {}

  public parse(): ParsedAnimation | null {
    const match = this.sequence.trim().match(this.ANIMATION_REGEX);
    if (!match) return null;

    const [, method = 'from', prop, value, position = '>', propsString] = match;
    const vars: gsap.TweenVars = { [prop]: isNaN(Number(value)) ? value : Number(value) };
    if (propsString) Object.assign(vars, new PropsParser().parse(propsString));

    return { method: method as Method, vars, position };
  }
}
