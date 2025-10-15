import { Directive, input } from '@angular/core';
import { GsapHostDirective } from './_gsap-host.directive';
import { That } from './utils/_index';

@Directive({ selector: '[translateX]' })
export class TranslateXDirective extends GsapHostDirective {
  public readonly translateX = input('', { transform: (value) => new That(value).or('100%') });

  public animate() {
    this.from({ x: this.translateX() });
  }
}
