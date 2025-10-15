import { gsap } from 'gsap';
import { PRESETS } from '../_presets';

export type ParsedAnimation = { method: 'to' | 'from'; vars: gsap.TweenVars; position: gsap.Position };

export const ANIMATION_DELIMITERS = /[;,]/;

/**
 * Parsea una secuencia de animación y retorna un array de animaciones procesadas
 * @param sequence - La secuencia de animación (puede ser un preset o una secuencia custom)
 * @returns Array de animaciones parseadas con método, vars y posición
 *
 * @example
 * parseAnimationSequence('opacity:0:>')
 * // => [{ method: 'from', vars: { opacity: 0 }, position: '>' }]
 *
 * @example
 * parseAnimationSequence('to:scale:2:>;opacity:1:<')
 * // => [
 * //   { method: 'to', vars: { scale: 2 }, position: '>' },
 * //   { method: 'from', vars: { opacity: 1 }, position: '<' }
 * // ]
 */
export function parseAnimationSequence(sequence: string): ParsedAnimation[] {
  const result: ParsedAnimation[] = [];

  // Resolver preset si existe
  const resolvedSequence = PRESETS[sequence] || sequence;

  // Dividir por delimitadores (;,)
  const animations = resolvedSequence.split(ANIMATION_DELIMITERS);

  animations.forEach((anim) => {
    const parts = anim.trim().split(':');

    let method: 'to' | 'from' = 'from';
    let startIndex = 0;

    // Detectar si se especifica método explícitamente
    if (parts[0] === 'to' || parts[0] === 'from') {
      method = parts[0] as 'to' | 'from';
      startIndex = 1;
    }

    const property = parts[startIndex];
    const value = parts[startIndex + 1];
    const position = (parts[startIndex + 2] || '>') as gsap.Position;

    // Parsear valor: convertir a número si es posible, sino mantener como string
    const parsedValue = isNaN(Number(value)) ? value : Number(value);

    result.push({
      method,
      vars: { [property]: parsedValue },
      position,
    });
  });

  return result;
}
