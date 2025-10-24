import { GsapHostDirective } from '../../directives/gsap-host.directive';
import { Timeline } from './timeline';
import { TweenVars } from './tween-vars';

const cache = new WeakMap<GsapHostDirective, Timeline>();

export class TimelineFactory {
  constructor(private readonly host: GsapHostDirective) {
    if (!cache.has(this.host)) {
      cache.set(this.host, this._create());
    }
  }

  private _create(): Timeline {
    return new Timeline(this.host.element, new TweenVars(this.host).create()).with(this.host.trigger());
  }

  public create(): Timeline {
    return cache.get(this.host) as Timeline;
  }

  public static empty(): Timeline {
    return new Timeline(null as unknown as HTMLElement, {});
  }
}
