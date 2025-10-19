import { Directive, input } from '@angular/core';
import { GsapHostDirective } from './gsap-host.directive';
import { AnimationParser } from '../../features/animation-parsing';

@Directive({ selector: '[animate]' })
export class AnimateDirective extends GsapHostDirective {
  public readonly sequence = input.required<string>({ alias: 'animate' });

  public registerAnimation() {
    new AnimationParser(this.sequence()).parse().forEach((animation) => {
      this[animation.method](animation.selector, animation.vars, animation.position);
    });
  }
}
