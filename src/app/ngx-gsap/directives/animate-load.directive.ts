import { Directive, input } from '@angular/core';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateLoad]' })
export class AnimateLoadDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateLoad' });
  public override readonly trigger = input('load' as const);
}
