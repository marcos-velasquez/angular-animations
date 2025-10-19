import { TypeConverter } from '../../core/utils';

export class ObjectParser {
  private content = '';
  private index = 0;
  private inString = false;
  private stringChar = '';
  private depth = 0;

  constructor(private readonly input: string) {}

  public parse(): Record<string, unknown> {
    try {
      this.content = this.unwrap(this.input.trim());
      if (!this.content) return {};

      const result: Record<string, unknown> = {};
      let currentKey = '';
      let currentValue = '';

      while (this.index < this.content.length) {
        const char = this.current();

        if (this.isStringDelimiter(char)) {
          this.toggleString(char);
          currentValue += char;
          this.next();
          continue;
        }

        if (this.inString) {
          currentValue += char;
          this.next();
          continue;
        }

        if (this.isOpenBracket(char)) {
          this.depth++;
          currentValue += char;
          this.next();
          continue;
        }

        if (this.isCloseBracket(char)) {
          this.depth--;
          currentValue += char;
          this.next();
          continue;
        }

        if (this.isKeySeparator(char, currentKey)) {
          currentKey = currentValue.trim();
          currentValue = '';
          this.next();
          continue;
        }

        if (this.isPairSeparator(char)) {
          if (currentKey && currentValue) {
            result[currentKey] = this.parseValue(currentValue.trim());
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
        result[currentKey] = this.parseValue(currentValue.trim());
      }

      return result;
    } catch {
      return {};
    }
  }

  private unwrap(str: string): string {
    return str.startsWith('{') && str.endsWith('}') ? str.slice(1, -1).trim() : str;
  }

  private current(): string {
    return this.content[this.index];
  }

  private next(): void {
    this.index++;
  }

  private isStringDelimiter(char: string): boolean {
    return (char === '"' || char === "'") && (this.index === 0 || this.content[this.index - 1] !== '\\');
  }

  private toggleString(char: string): void {
    if (!this.inString) {
      this.inString = true;
      this.stringChar = char;
    } else if (char === this.stringChar) {
      this.inString = false;
      this.stringChar = '';
    }
  }

  private isOpenBracket(char: string): boolean {
    return char === '{' || char === '[';
  }

  private isCloseBracket(char: string): boolean {
    return char === '}' || char === ']';
  }

  private isKeySeparator(char: string, currentKey: string): boolean {
    return char === ':' && this.depth === 0 && !currentKey;
  }

  private isPairSeparator(char: string): boolean {
    return char === ',' && this.depth === 0;
  }

  private parseValue(value: string): unknown {
    if (this.isArray(value)) return this.parseArray(value);
    if (this.isObject(value)) return new ObjectParser(value).parse();
    if (this.isQuotedString(value)) return value.slice(1, -1);
    return new TypeConverter(value).convert();
  }

  private isArray(value: string): boolean {
    return value.startsWith('[') && value.endsWith(']');
  }

  private isObject(value: string): boolean {
    return value.startsWith('{') && value.endsWith('}');
  }

  private isQuotedString(value: string): boolean {
    return (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"));
  }

  private parseArray(value: string): unknown {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
}
