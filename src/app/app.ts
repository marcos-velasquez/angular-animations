import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FadeInDirective } from './directives';

@Component({
  imports: [RouterModule, FadeInDirective],
  selector: 'animate-root',
  templateUrl: './app.html',
})
export class App {
  protected title = 'angular-animations';
}
