import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as _ from './directives/_index';

@Component({
  imports: [RouterModule, _.FadeInDirective, _.RotateDirective, _.ScaleDirective],
  selector: 'animate-root',
  templateUrl: './app.html',
})
export class App {
  protected title = 'angular-animations';
}
