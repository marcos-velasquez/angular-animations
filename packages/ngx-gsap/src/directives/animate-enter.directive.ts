import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/trigger';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateEnter]' })
export class AnimateEnterDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateEnter' });
  public override readonly trigger = input<TriggerType>('enter' as const);
}
