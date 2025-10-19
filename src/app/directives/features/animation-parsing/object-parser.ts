import { TypeConverter } from '../../core/utils';

export class ObjectParser {
  constructor(private readonly input: string) {}

  public parse(): Record<string, unknown> {
    try {
      let content = this.input.trim();
      if (content.startsWith('{') && content.endsWith('}')) {
        content = content.slice(1, -1).trim();
      }
      if (!content) return {};

      const result: Record<string, unknown> = {};
      let currentKey = '';
      let currentValue = '';
      let inString = false;
      let stringChar = '';
      let depth = 0;
      let i = 0;

      while (i < content.length) {
        const char = content[i];

        if ((char === '"' || char === "'") && (i === 0 || content[i - 1] !== '\\')) {
          if (!inString) {
            inString = true;
            stringChar = char;
          } else if (char === stringChar) {
            inString = false;
            stringChar = '';
          }
          currentValue += char;
          i++;
          continue;
        }

        if (inString) {
          currentValue += char;
          i++;
          continue;
        }

        if (char === '{' || char === '[') {
          depth++;
          currentValue += char;
          i++;
          continue;
        }

        if (char === '}' || char === ']') {
          depth--;
          currentValue += char;
          i++;
          continue;
        }

        if (char === ':' && depth === 0 && !currentKey) {
          currentKey = currentValue.trim();
          currentValue = '';
          i++;
          continue;
        }

        if (char === ',' && depth === 0) {
          if (currentKey && currentValue) {
            result[currentKey] = this.parseValue(currentValue.trim());
            currentKey = '';
            currentValue = '';
          }
          i++;
          continue;
        }

        currentValue += char;
        i++;
      }

      if (currentKey && currentValue) {
        result[currentKey] = this.parseValue(currentValue.trim());
      }

      return result;
    } catch {
      return {};
    }
  }

  private parseValue(value: string): unknown {
    const trimmed = value.trim();

    // Handle arrays
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed;
      }
    }

    // Handle nested objects
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      return new ObjectParser(trimmed).parse();
    }

    // Handle quoted strings
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }

    // Use TypeConverter for basic types (boolean, null, undefined, number, string)
    return TypeConverter.convert(trimmed);
  }
}
