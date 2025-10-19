export class TypeSerializer {
  constructor(private readonly value: unknown, private readonly options = { quoteStrings: true }) {}

  public serialize(): string {
    return this.toString(this.value);
  }

  private toString(val: unknown, nested = false): string {
    if (this.isObject(val)) return this.serializeObject(val);
    if (Array.isArray(val)) return JSON.stringify(val);
    if (typeof val === 'string') return this.serializeString(val, nested);
    return JSON.stringify(val);
  }

  private isObject(val: unknown): val is Record<string, unknown> {
    return typeof val === 'object' && val !== null && !Array.isArray(val);
  }

  private serializeObject(obj: Record<string, unknown>): string {
    const entries = Object.entries(obj)
      .map(([k, v]) => `${k}:${this.toString(v, true)}`)
      .join(',');
    return `{${entries}}`;
  }

  private serializeString(str: string, nested = false): string {
    if (nested) return JSON.stringify(str);
    if (!this.options.quoteStrings && /^[a-zA-Z0-9._-]+$/.test(str)) return str;
    return JSON.stringify(str);
  }
}
