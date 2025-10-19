import { TypeConverter } from '../../core/utils';

export class PropsParser {
  constructor(private readonly propsString: string) {}

  public parse(): Record<string, unknown> {
    return this.propsString.split(',').reduce((props, pair) => {
      const [key, value] = pair.split('=').map((s) => s.trim());
      if (key && value !== undefined) {
        props[key] = TypeConverter.convert(value);
      }
      return props;
    }, {} as Record<string, unknown>);
  }
}
