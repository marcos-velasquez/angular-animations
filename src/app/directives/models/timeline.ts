import { gsap } from 'gsap';
import { GsapHostDirective } from '../_gsap-host.directive';
import { TweenVars } from './tween-vars';
import { No } from '../utils/_index';

const cache = new Map<HTMLElement, gsap.core.Timeline>();

export class Timeline {
  constructor(private readonly host: GsapHostDirective) {
    new No(cache.has(this.host.elementRef)).then(() => cache.set(this.host.elementRef, this._create()));
  }

  private _create(): gsap.core.Timeline {
    return gsap.timeline({ paused: true, defaults: new TweenVars(this.host).create() });
  }

  public create(): gsap.core.Timeline {
    return cache.get(this.host.elementRef);
  }

  public static empty() {
    return gsap.timeline({ paused: true });
  }
}
