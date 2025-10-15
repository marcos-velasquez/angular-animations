import { No } from '../utils/_index';
import { GsapHostDirective } from '../_gsap-host.directive';
import { Timeline } from './timeline';
import { TweenVars } from './tween-vars';

const cache = new Map<GsapHostDirective, Timeline>();

export class TimelineFactory {
  constructor(private readonly host: GsapHostDirective) {
    new No(cache.has(this.host)).then(() => cache.set(this.host, this._create()));
  }

  private _create(): Timeline {
    return new Timeline(this.host.elementRef, new TweenVars(this.host).create()).with(this.host.trigger());
  }

  public create(): Timeline {
    return cache.get(this.host);
  }

  public static empty(): Timeline {
    return new Timeline(null, {});
  }
}
