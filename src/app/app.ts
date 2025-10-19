import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as _ from './ngx-gsap';

@Component({
  imports: [
    RouterModule,
    _.AnimateDirective,
    _.AnimateEnterDirective,
    _.AnimateLeaveDirective,
    _.AnimateClickDirective,
    _.AnimateLoadDirective,
  ],
  selector: 'animate-root',
  templateUrl: './app.html',
})
export class App {
  protected title = 'ngx-gsap';
}
