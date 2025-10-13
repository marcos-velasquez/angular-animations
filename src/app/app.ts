import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as _ from './directives';

@Component({
  imports: [RouterModule, _.FadeInDirective, _.RotateDirective],
  selector: 'animate-root',
  templateUrl: './app.html',
})
export class App {
  protected title = 'angular-animations';
}
