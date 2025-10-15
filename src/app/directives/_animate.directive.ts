import { Directive, input } from '@angular/core';
import { GsapHostDirective } from './_gsap-host.directive';
import { AnimationParser } from './models/_index';

@Directive({ selector: '[animate]' })
export class AnimateDirective extends GsapHostDirective {
  public readonly animate = input.required<string>();

  public register() {
    new AnimationParser(this.animate()).parse().forEach((animation) => {
      this[animation.method](animation.vars, animation.position);
    });
  }
}
