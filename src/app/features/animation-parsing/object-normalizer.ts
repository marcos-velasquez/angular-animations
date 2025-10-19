import { ObjectParser } from './object-parser';
import { ObjectSerializer } from './object-serializer';

export class ObjectNormalizer {
  constructor(private readonly input: string) {}

  public normalize(): string {
    return new ObjectSerializer(new ObjectParser(this.input).parse()).serialize();
  }
}
