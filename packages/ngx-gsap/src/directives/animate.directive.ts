import { Directive, input } from '@angular/core';
import { AnimationParser } from '../models/animation-parsing/animation-parser';
import { GsapHostDirective } from './gsap-host.directive';

@Directive({ selector: '[animate]', exportAs: 'animate' })
export class AnimateDirective extends GsapHostDirective {
  public readonly sequence = input.required<string>({ alias: 'animate' });

  public registerAnimation() {
    new AnimationParser(this.sequence()).parse().forEach((animation) => {
      this[animation.method](animation.selector, animation.vars, animation.position);
    });
  }
}
