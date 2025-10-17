import { GsapHostDirective } from '../_gsap-host.directive';

export class TweenVars {
  constructor(private readonly host: GsapHostDirective) {}

  public create(): gsap.TweenVars {
    return {
      immediateRender: false,
      onStart: () => this.host.timeline().disconnect(),
      onComplete: () => this.host.timeline().connect(),
    };
  }
}
