import { GsapHostDirective } from '../_gsap-host.directive';

export class HostTweenVarsBuilder {
  constructor(private readonly host: GsapHostDirective) {}

  public build(): gsap.TweenVars {
    return {
      duration: this.host.duration(),
      delay: this.host.delay(),
      ease: this.host.ease(),
      stagger: this.host.stagger(),
      onStart: () => this.host.triggerRef().disconnect(),
      onComplete: () => this.host.triggerRef().connect(),
    };
  }
}
