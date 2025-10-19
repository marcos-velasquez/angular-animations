import { ObjectParser } from './object-parser';
import { ObjectSerializer } from './object-serializer';

export class ObjectNormalizer {
  constructor(private readonly input: string) {}

  public normalize(): string {
    const params = new ObjectParser(this.input).parse();
    return new ObjectSerializer(params).serialize();
  }
}
