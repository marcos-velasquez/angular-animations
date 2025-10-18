import { Directive, input } from '@angular/core';
import { AnimateDirective } from './_animate.directive';

@Directive({ selector: '[animateClick]' })
export class AnimateClickDirective extends AnimateDirective {
  public override readonly animation = input.required<string>({ alias: 'animateClick' });
  public override readonly trigger = input('click' as const);
}
