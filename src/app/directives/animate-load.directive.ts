import { Directive, input } from '@angular/core';
import { AnimateDirective } from './_animate.directive';

@Directive({ selector: '[animateLoad]' })
export class AnimateLoadDirective extends AnimateDirective {
  public override readonly animation = input.required<string>({ alias: 'animateLoad' });
  public override readonly trigger = input('load' as const);
}
