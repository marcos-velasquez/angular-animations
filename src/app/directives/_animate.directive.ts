import { Directive, input } from '@angular/core';
import { GsapHostDirective } from './_gsap-host.directive';
import { parseAnimationSequence, ANIMATION_DELIMITERS } from './utils/_index';

@Directive({ selector: '[animate]' })
export class AnimateDirective extends GsapHostDirective {
  public static readonly delimiters = ANIMATION_DELIMITERS;

  public readonly animate = input.required<string>();

  public register() {
    parseAnimationSequence(this.animate()).forEach((animation) => {
      this[animation.method](animation.vars, animation.position);
    });
  }
}
