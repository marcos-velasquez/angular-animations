import { ObjectParser } from './object-parser';
import { ObjectSerializer } from '../../utils/object-serializer';

export class PresetArgumentsParser {
  constructor(private readonly argsString: string) {}

  public parse(): string {
    const params = new ObjectParser().parse(this.argsString);
    return new ObjectSerializer().toParamsString(params);
  }
}
