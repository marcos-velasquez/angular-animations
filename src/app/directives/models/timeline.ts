import { gsap } from 'gsap';
import { GsapHostDirective } from '../_gsap-host.directive';
import { TweenVars } from './tween-vars';

const cache = new Map<HTMLElement, gsap.core.Timeline>();

export class Timeline {
  constructor(private readonly host: GsapHostDirective, private readonly options: { cache: boolean }) {
    if (this.options.cache && !cache.has(this.host.elementRef)) {
      cache.set(this.host.elementRef, this._create());
    }
  }

  private _create(): gsap.core.Timeline {
    return gsap.timeline({ paused: true, defaults: new TweenVars(this.host).create() });
  }

  public create(): gsap.core.Timeline {
    return this.options.cache ? cache.get(this.host.elementRef) : this._create();
  }
}
