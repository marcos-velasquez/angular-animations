import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'animate-root',
  templateUrl: './app.html',
})
export class App {
  protected title = 'angular-animations';
}
