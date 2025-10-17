export class PropsParser {
  public parse(propsString: string): Record<string, unknown> {
    const props: Record<string, unknown> = {};
    propsString.split(',').forEach((pair) => {
      const [key, value] = pair.split('=').map((s) => s.trim());
      if (key && value !== undefined) {
        props[key] =
          value === 'true'
            ? true
            : value === 'false'
            ? false
            : !isNaN(Number(value))
            ? Number(value)
            : value.replace(/^['"]|['"]$/g, '');
      }
    });
    return props;
  }
}
