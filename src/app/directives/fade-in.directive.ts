import { Directive } from '@angular/core';
import { GsapHostDirective } from './_gsap-host.directive';

@Directive({ selector: '[fadeIn]' })
export class FadeInDirective extends GsapHostDirective {
  public animate() {
    this.timeline().from(this.elementRef, { opacity: 0 });
  }
}
