import { GsapHostDirective } from '../_gsap-host.directive';

export class GsapHostTweenVarsBuilder {
  constructor(private readonly gsapHostDirective: GsapHostDirective) {}

  public build(): gsap.TweenVars {
    return {
      duration: this.gsapHostDirective.duration(),
      delay: this.gsapHostDirective.delay(),
      ease: this.gsapHostDirective.ease(),
      stagger: this.gsapHostDirective.stagger(),
      onStart: () => this.gsapHostDirective.triggerRef().disconnect(),
      onComplete: () => this.gsapHostDirective.triggerRef().connect(),
    };
  }
}
