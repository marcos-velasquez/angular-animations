export class CustomVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(customVars: gsap.TweenVars): string {
    if (Object.keys(customVars).length === 0) return this.sequence;

    const customVarsString = Object.entries(customVars)
      .map(([key, value]) => `${key}=${typeof value === 'string' ? value : JSON.stringify(value)}`)
      .join(',');

    return this.sequence
      .split(';')
      .map((seq) => `${seq}@${customVarsString}`)
      .join(';');
  }
}
