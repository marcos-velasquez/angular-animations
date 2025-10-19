import { RegexPatterns } from './regex-patterns';

export class TypeConverter {
  public static convert(value: string): unknown {
    const trimmed = value.trim();

    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    if (trimmed === 'null') return null;
    if (trimmed === 'undefined') return undefined;
    if (!isNaN(Number(trimmed))) return Number(trimmed);

    return trimmed.replace(RegexPatterns.QUOTED_STRING, '');
  }
}
