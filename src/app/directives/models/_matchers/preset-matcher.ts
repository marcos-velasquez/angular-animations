import { assert } from '../../utils/_index';
import { Presets, Preset } from '../../_presets';

export type PresetMatch = { presetName: string; argsString: string; hasArgs: boolean };

export class PresetMatcher {
  private static readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;

  private readonly match: RegExpMatchArray | null;

  constructor(public readonly sequence: string) {
    this.match = sequence.match(PresetMatcher.PRESET_FUNCTION_REGEX);
  }

  public get presetName(): string {
    return this.isFunction() ? this.match[1] : this.sequence;
  }

  public get argsString(): string {
    return this.match[2];
  }

  public get preset(): Preset {
    return Presets[this.presetName];
  }

  public isFunction(): boolean {
    return !!this.match;
  }

  public isPreset(): boolean {
    return !!Presets[this.presetName];
  }

  public toPresetMatch(): PresetMatch {
    assert(this.isFunction(), 'Sequence does not have function syntax');

    return { presetName: this.presetName, argsString: this.argsString, hasArgs: !!this.argsString.trim() };
  }
}
