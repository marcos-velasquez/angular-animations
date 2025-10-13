import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FadeInDirective } from './directives';

@Component({
  imports: [RouterModule, FadeInDirective],
  selector: 'animate-root',
  templateUrl: './app.html',
})
export class App {
  protected title = 'angular-animations';

  public readonly show = signal(false);

  constructor() {
    setTimeout(() => this.show.set(true), 3000);
  }
}
