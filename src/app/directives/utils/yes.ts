export class Yes {
  constructor(private readonly value: boolean) {}

  public then(callback: () => void): void {
    if (this.value) {
      callback();
    }
  }

  public or<T>(fallback: T): T {
    return (this.value || fallback) as T;
  }
}
