import { Directive, input } from '@angular/core';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateClick]' })
export class AnimateClickDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateClick' });
  public override readonly trigger = input('click' as const);
}

@Directive({ selector: '[animateLeave]' })
export class AnimateLeaveDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateLeave' });
  public override readonly trigger = input('leave' as const);
}

@Directive({ selector: '[animateEnter]' })
export class AnimateEnterDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateEnter' });
  public override readonly trigger = input('enter' as const);
}

@Directive({ selector: '[animateLoad]' })
export class AnimateLoadDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateLoad' });
  public override readonly trigger = input('load' as const);
}
