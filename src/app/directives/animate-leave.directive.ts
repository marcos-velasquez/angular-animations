import { Directive, input } from '@angular/core';
import { AnimateDirective } from './_animate.directive';

@Directive({ selector: '[animateLeave]' })
export class AnimateLeaveDirective extends AnimateDirective {
  public override readonly animate = input.required<string>({ alias: 'animateLeave' });
  public override readonly trigger = input('leave' as const);
}
