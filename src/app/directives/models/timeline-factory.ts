import { No } from '../utils/_index';
import { GsapHostDirective } from '../_gsap-host.directive';
import { Timeline } from './timeline';
import { TriggerType } from './trigger';
import { TweenVars } from './tween-vars';

const cache = new Map<HTMLElement, Timeline>();

export class TimelineFactory {
  constructor(private readonly host: GsapHostDirective) {
    new No(cache.has(this.host.elementRef)).then(() => cache.set(this.host.elementRef, this._create()));
  }

  private _create(): Timeline {
    return new Timeline(this.host.elementRef, new TweenVars(this.host).create());
  }

  public create(triggerType: TriggerType): Timeline {
    return cache.get(this.host.elementRef).with(triggerType);
  }

  public static empty(): Timeline {
    return new Timeline(null, {});
  }
}
