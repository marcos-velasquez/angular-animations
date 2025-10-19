import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/trigger';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateClick]' })
export class AnimateClickDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateClick' });
  public override readonly trigger = input<TriggerType>('click' as const);
}
