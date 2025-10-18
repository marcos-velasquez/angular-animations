import { ObjectParser } from './object-parser';
import { ObjectSerializer } from '../../utils/object-serializer';

export class PresetArgumentsParser {
  public parse(argsString: string): string {
    try {
      const params = new ObjectParser().parse(argsString);
      return new ObjectSerializer().toParamsString(params);
    } catch {
      return argsString;
    }
  }
}
