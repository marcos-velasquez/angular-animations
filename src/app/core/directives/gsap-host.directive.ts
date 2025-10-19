import * as ng from '@angular/core';
import { Timeline, TimelineFactory } from '../engine/timeline';
import { TriggerType } from '../engine/trigger';

@ng.Directive({ selector: '[gsap]' })
export abstract class GsapHostDirective implements ng.OnInit, ng.OnDestroy {
  public readonly trigger = ng.input<TriggerType>('load');

  public readonly animateStart = ng.output<GsapHostDirective>();
  public readonly animateComplete = ng.output<GsapHostDirective>();

  public readonly timeline = ng.signal<Timeline>(TimelineFactory.empty());

  constructor(public readonly elementRef: ng.ElementRef<HTMLElement>) {
    ng.effect(() => {
      this.timeline().timeline.eventCallback('onStart', () => this.animateStart.emit(this));
      this.timeline().timeline.eventCallback('onComplete', () => this.animateComplete.emit(this));
    });
  }

  ngOnInit(): void {
    this.timeline.set(new TimelineFactory(this).create());
    this.registerAnimation();
  }

  public abstract registerAnimation(): void;

  public get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public play(): void {
    this.timeline().play();
  }

  public pause(): void {
    this.timeline().pause();
  }

  public reverse(): void {
    this.timeline().reverse();
  }

  public resume(): void {
    this.timeline().resume();
  }

  public restart(): void {
    this.timeline().restart();
  }

  protected from(vars: gsap.TweenVars, position: gsap.Position): void {
    this.timeline().from(vars, position);
  }

  protected to(vars: gsap.TweenVars, position: gsap.Position): void {
    this.timeline().to(vars, position);
  }

  ngOnDestroy(): void {
    this.timeline().disconnect();
  }
}
