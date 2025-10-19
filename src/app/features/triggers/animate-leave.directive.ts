import { Directive, input } from '@angular/core';
import { AnimateDirective } from '../../core/directives/animate.directive';

@Directive({ selector: '[animateLeave]' })
export class AnimateLeaveDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateLeave' });
  public override readonly trigger = input('leave' as const);
}
