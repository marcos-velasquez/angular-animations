import { gsap } from 'gsap';
import { GsapHostDirective } from '../_gsap-host.directive';
import { TweenVars } from './tween-vars';

const register = new Map<HTMLElement, gsap.core.Timeline>();

export class Timeline {
  constructor(private readonly host: GsapHostDirective) {
    if (!register.has(this.host.elementRef)) {
      register.set(this.host.elementRef, this._create());
    }
  }

  private _create(): gsap.core.Timeline {
    return gsap.timeline({ paused: true, defaults: new TweenVars(this.host).create() });
  }

  public create(): gsap.core.Timeline {
    return register.get(this.host.elementRef);
  }
}
