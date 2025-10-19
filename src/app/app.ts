import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationList } from './models/animations';
import { Animations, Docs } from './components';

@Component({
  imports: [CommonModule, Animations, Docs],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  public readonly animationsLength = new AnimationList().length;
  public readonly activeTab = signal<'animations' | 'docs'>('animations');

  public setTab(tab: 'animations' | 'docs') {
    this.activeTab.set(tab);
  }
}
