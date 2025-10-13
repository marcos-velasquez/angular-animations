import { Directive, input } from '@angular/core';
import { GsapHostDirective } from './_gsap-host.directive';
import { That } from './utils/_index';

@Directive({ selector: '[translateY]' })
export class TranslateYDirective extends GsapHostDirective {
  public readonly translateY = input('', { transform: (value) => new That(value).or('100%') });

  public animate() {
    this.timeline().from(this.el.nativeElement, { y: this.translateY() });
  }
}
