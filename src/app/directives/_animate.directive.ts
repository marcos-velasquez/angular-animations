import { Directive, input } from '@angular/core';
import { GsapHostDirective } from './_gsap-host.directive';

@Directive({ selector: '[animate]' })
export class AnimateDirective extends GsapHostDirective {
  public static readonly delimiters = /[;,]/;

  public readonly animate = input.required<string>();

  public register() {
    const animations = this.animate().split(AnimateDirective.delimiters);

    animations.forEach((anim) => {
      const parts = anim.trim().split(':');

      let method: 'to' | 'from' = 'from';
      let startIndex = 0;

      if (parts[0] === 'to' || parts[0] === 'from') {
        method = parts[0] as 'to' | 'from';
        startIndex = 1;
      }

      const property = parts[startIndex];
      const value = parts[startIndex + 1];
      const position = parts[startIndex + 2] || '>';

      const parsedValue = isNaN(Number(value)) ? value : Number(value);

      if (method === 'to') {
        this.to({ [property]: parsedValue }, position as gsap.Position);
      } else {
        this.from({ [property]: parsedValue }, position as gsap.Position);
      }
    });
  }
}
