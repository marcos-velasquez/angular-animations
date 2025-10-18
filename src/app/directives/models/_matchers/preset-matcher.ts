import { assert } from '../../utils/_index';

export type PresetMatch = { presetName: string; argsString: string; hasArgs: boolean };

export class PresetMatcher {
  private static readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;
  private readonly match: RegExpMatchArray | null;

  constructor(sequence: string) {
    this.match = sequence.match(PresetMatcher.PRESET_FUNCTION_REGEX);
  }

  public get presetName(): string {
    return this.match[1];
  }

  public get argsString(): string {
    return this.match[2];
  }

  public isFunction(): boolean {
    return !!this.match;
  }

  public toPresetMatch(): PresetMatch {
    assert(this.isFunction(), 'Sequence does not have function syntax');

    return { presetName: this.presetName, argsString: this.argsString, hasArgs: !!this.argsString.trim() };
  }
}
