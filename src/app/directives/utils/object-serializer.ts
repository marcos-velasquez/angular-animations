export class ObjectSerializer {
  public toParamsString(params: Record<string, unknown>): string {
    if (Object.keys(params).length === 0) return '';

    const entries = Object.entries(params)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join(', ');

    return `{ ${entries} }`;
  }
}
