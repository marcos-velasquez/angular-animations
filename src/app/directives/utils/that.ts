export class That {
  constructor(private readonly value: unknown) {}

  public or<T>(fallback: T): T {
    return (this.value || fallback) as T;
  }
}
