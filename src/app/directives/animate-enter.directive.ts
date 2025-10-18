import { Directive, input } from '@angular/core';
import { AnimateDirective } from './_animate.directive';

@Directive({ selector: '[animateEnter]' })
export class AnimateEnterDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateEnter' });
  public override readonly trigger = input('enter' as const);
}
