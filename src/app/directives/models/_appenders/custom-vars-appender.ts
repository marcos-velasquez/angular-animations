export class CustomVarsAppender {
  public append(sequence: string, customVars: gsap.TweenVars): string {
    if (Object.keys(customVars).length === 0) return sequence;

    const customVarsString = Object.entries(customVars)
      .map(([key, value]) => `${key}=${typeof value === 'string' ? value : JSON.stringify(value)}`)
      .join(',');

    return sequence.split(';').map((seq) => `${seq}@${customVarsString}`).join(';');
  }
}
