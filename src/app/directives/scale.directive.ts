import { Directive, input } from '@angular/core';
import { GsapHostDirective } from './_gsap-host.directive';
import { That } from './utils/_index';

@Directive({ selector: '[scale]' })
export class ScaleDirective extends GsapHostDirective {
  public readonly scale = input(0, { transform: (_) => new That(_).or(2) });

  public animate() {
    this.from({ scale: this.scale() });
  }
}
