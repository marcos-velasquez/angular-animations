export class Sleep {
  constructor(private readonly ms: number) {}

  public then(callback: () => void): void {
    setTimeout(callback, this.ms);
  }
}
