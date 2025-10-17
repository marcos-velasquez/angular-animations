import { Presets } from '../_presets';

export type Method = 'to' | 'from';
export type ParsedAnimation = { method: Method; vars: gsap.TweenVars; position: gsap.Position };

export class AnimationParser {
  public static readonly DELIMITERS = /;/;
  public static readonly DEFAULT_METHOD: Method = 'from';
  public static readonly DEFAULT_POSITION = '>';
  public static readonly ANIMATION_REGEX = /^(?:(to|from):)?([^:]+):([^:@;]+)(?::([^@;]+))?(?:@([^;]+))?$/;
  public static readonly PRESET_FUNCTION_REGEX = /^(\w+)\s*\((.*)\)$/;

  private readonly sequence: string[];
  private customVars: gsap.TweenVars = {};

  constructor(sequence: string) {
    const normalized = this.normalize(sequence.trim());
    this.sequence = normalized.split(AnimationParser.DELIMITERS);
  }

  public parse(): ParsedAnimation[] {
    const animations = this.sequence.map((sequence) => this.create(sequence)).filter((anim) => anim);
    // Mezclar customVars en todas las animaciones
    return animations.map(anim => ({
      ...anim,
      vars: { ...anim.vars, ...this.customVars }
    }));
  }

  private normalize(sequence: string): string {
    const match = sequence.match(AnimationParser.PRESET_FUNCTION_REGEX);
    if (match && Presets[match[1]]) {
      // Extraer las propiedades personalizadas del objeto de parámetros
      const argsString = match[2].trim();
      if (argsString) {
        try {
          // Evaluar el objeto de parámetros para extraer propiedades personalizadas
          const params = new Function(`return ${argsString}`)() as Record<string, unknown>;
          // Separar parámetros del preset vs propiedades GSAP personalizadas
          const presetParams = this.extractPresetParams(match[1], params);
          this.customVars = this.extractCustomVars(match[1], params);
          // Llamar al preset solo con sus parámetros
          return Presets.eval(match[1], JSON.stringify(presetParams).slice(1, -1));
        } catch {
          return Presets.eval(match[1], argsString);
        }
      }
      return Presets.eval(match[1], argsString);
    } else {
      return Presets[sequence] ? Presets[sequence]() : sequence;
    }
  }

  private extractPresetParams(presetName: string, params: Record<string, unknown>): Record<string, unknown> {
    // Obtener los parámetros que el preset realmente acepta
    const presetFunc = Presets[presetName];
    if (!presetFunc) return params;
    
    // Lista de propiedades que son específicas del preset (no de GSAP)
    const funcStr = presetFunc.toString();
    const paramMatch = funcStr.match(/\{([^}]+)\}/);
    if (!paramMatch) return params;
    
    const presetParamNames = paramMatch[1].split(',').map(p => p.trim().split('=')[0].trim());
    const presetParams: Record<string, unknown> = {};
    
    presetParamNames.forEach(name => {
      if (name in params) {
        presetParams[name] = params[name];
      }
    });
    
    return presetParams;
  }

  private extractCustomVars(presetName: string, params: Record<string, unknown>): gsap.TweenVars {
    // Propiedades GSAP conocidas que NO son parámetros del preset
    const gsapProps = ['duration', 'delay', 'ease', 'yoyo', 'repeat', 'repeatDelay', 'stagger', 
                       'onComplete', 'onStart', 'onUpdate', 'onRepeat', 'onReverseComplete'];
    
    const customVars: gsap.TweenVars = {};
    gsapProps.forEach(prop => {
      if (prop in params) {
        customVars[prop] = params[prop];
      }
    });
    
    return customVars;
  }

  private create(sequence: string): ParsedAnimation {
    const match = sequence.trim().match(AnimationParser.ANIMATION_REGEX);
    if (!match) return null;

    const [, method = AnimationParser.DEFAULT_METHOD, prop, value, position = AnimationParser.DEFAULT_POSITION, propsString] = match;

    const vars: gsap.TweenVars = { [prop]: isNaN(Number(value)) ? value : Number(value) };
    
    // Parsear propiedades personalizadas si existen
    if (propsString) {
      const props = this.parseProps(propsString);
      Object.assign(vars, props);
    }

    return { method: method as Method, vars, position };
  }

  private parseProps(propsString: string): Record<string, unknown> {
    const props: Record<string, unknown> = {};
    const pairs = propsString.split(',').map(p => p.trim());
    
    pairs.forEach(pair => {
      const [key, value] = pair.split('=').map(s => s.trim());
      if (key && value !== undefined) {
        // Intentar convertir a número, sino dejar como string
        // Manejar booleanos
        if (value === 'true') {
          props[key] = true;
        } else if (value === 'false') {
          props[key] = false;
        } else if (!isNaN(Number(value))) {
          props[key] = Number(value);
        } else {
          // Remover comillas si existen
          props[key] = value.replace(/^['"]|['"]$/g, '');
        }
      }
    });
    
    return props;
  }
}
