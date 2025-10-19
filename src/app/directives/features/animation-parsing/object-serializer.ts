export class ObjectSerializer {
  constructor(private readonly params: Record<string, unknown>) {}

  public serialize(): string {
    if (Object.keys(this.params).length === 0) return '';

    const entries = Object.entries(this.params)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join(', ');

    return `{ ${entries} }`;
  }
}
