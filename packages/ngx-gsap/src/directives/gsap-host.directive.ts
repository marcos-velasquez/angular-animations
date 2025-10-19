import * as ng from '@angular/core';
import { Timeline, TimelineFactory } from '../models/timeline';
import { TriggerType } from '../models/trigger';

@ng.Directive({ selector: '[gsap]' })
export abstract class GsapHostDirective implements ng.OnInit, ng.OnDestroy {
  public readonly trigger = ng.input<TriggerType>('none');

  public readonly animateStart = ng.output<GsapHostDirective>();
  public readonly animateComplete = ng.output<GsapHostDirective>();
  public readonly animateUpdate = ng.output<GsapHostDirective>();
  public readonly animateRepeat = ng.output<GsapHostDirective>();
  public readonly animateReverseComplete = ng.output<GsapHostDirective>();

  public readonly injector = ng.inject(ng.Injector);

  public readonly timeline = ng.signal<Timeline>(TimelineFactory.empty());

  constructor(public readonly elementRef: ng.ElementRef<HTMLElement>) {
    ng.effect(() => {
      this.timeline().timeline.eventCallback('onStart', () => this.animateStart.emit(this));
      this.timeline().timeline.eventCallback('onComplete', () => this.animateComplete.emit(this));
      this.timeline().timeline.eventCallback('onUpdate', () => this.animateUpdate.emit(this));
      this.timeline().timeline.eventCallback('onRepeat', () => this.animateRepeat.emit(this));
      this.timeline().timeline.eventCallback('onReverseComplete', () => this.animateReverseComplete.emit(this));
    });
  }

  ngOnInit(): void {
    ng.afterNextRender(
      () => {
        this.timeline.set(new TimelineFactory(this).create());
        this.registerAnimation();
      },
      { injector: this.injector }
    );
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

  protected from(selector: string | undefined, vars: gsap.TweenVars, position: gsap.Position): void {
    this.timeline().from(selector, vars, position);
  }

  protected to(selector: string | undefined, vars: gsap.TweenVars, position: gsap.Position): void {
    this.timeline().to(selector, vars, position);
  }

  ngOnDestroy(): void {
    this.timeline().disconnect();
  }
}
