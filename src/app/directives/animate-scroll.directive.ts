import { Directive, input } from '@angular/core';
import { AnimateDirective } from './_animate.directive';

@Directive({ selector: '[animateScroll]' })
export class AnimateScrollDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateScroll' });
  public override readonly trigger = input('scroll' as const);
}
