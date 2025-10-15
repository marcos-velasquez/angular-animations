import { Directive, input } from '@angular/core';
import { GsapHostDirective } from './_gsap-host.directive';
import { That } from './utils/_index';

@Directive({ selector: '[rotate]' })
export class RotateDirective extends GsapHostDirective {
  public readonly rotate = input(0, { transform: (_) => new That(_).or(360) });

  public animate() {
    this.from({ rotate: this.rotate() });
  }
}
