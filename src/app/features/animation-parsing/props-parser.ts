import { TypeConverter } from '../../core/utils';
import { ObjectParser } from './object-parser';

export class PropsParser {
  private index = 0;
  private depth = 0;

  constructor(private readonly propsString: string) {}

  public parse(): Record<string, unknown> {
    const props: Record<string, unknown> = {};
    let currentKey = '';
    let currentValue = '';

    while (this.index < this.propsString.length) {
      const char = this.current();

      if (this.isOpenBrace(char)) {
        this.depth++;
        currentValue += char;
        this.next();
        continue;
      }

      if (this.isCloseBrace(char)) {
        this.depth--;
        currentValue += char;
        this.next();
        continue;
      }

      if (this.isAssignment(char, currentKey)) {
        currentKey = currentValue.trim();
        currentValue = '';
        this.next();
        continue;
      }

      if (this.isSeparator(char)) {
        if (currentKey && currentValue) {
          props[currentKey] = this.parseValue(currentValue.trim());
          currentKey = '';
          currentValue = '';
        }
        this.next();
        continue;
      }

      currentValue += char;
      this.next();
    }

    if (currentKey && currentValue) {
      props[currentKey] = this.parseValue(currentValue.trim());
    }

    return props;
  }

  private current(): string {
    return this.propsString[this.index];
  }

  private next(): void {
    this.index++;
  }

  private isOpenBrace(char: string): boolean {
    return char === '{';
  }

  private isCloseBrace(char: string): boolean {
    return char === '}';
  }

  private isAssignment(char: string, currentKey: string): boolean {
    return char === '=' && this.depth === 0 && !currentKey;
  }

  private isSeparator(char: string): boolean {
    return char === ',' && this.depth === 0;
  }

  private parseValue(value: string): unknown {
    return this.isObject(value) ? new ObjectParser(value).parse() : new TypeConverter(value).convert();
  }

  private isObject(value: string): boolean {
    return value.startsWith('{') && value.endsWith('}');
  }
}
