import { Directive, input } from '@angular/core';
import { GsapHostDirective } from './_gsap-host.directive';

@Directive({ selector: '[rotate]' })
export class RotateDirective extends GsapHostDirective {
  public readonly rotate = input.required<number>();

  public animate() {
    this.timeline.from(this.el.nativeElement, { rotate: this.rotate() });
  }
}
