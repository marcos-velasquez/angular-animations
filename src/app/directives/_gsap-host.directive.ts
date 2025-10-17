import * as _ from '@angular/core';
import { TriggerType, Timeline, TimelineFactory } from './models/_index';

@_.Directive({ selector: '[gsap]' })
export abstract class GsapHostDirective implements _.OnInit, _.OnDestroy {
  public readonly trigger = _.input<TriggerType>('load');

  public readonly animateStart = _.output<GsapHostDirective>();
  public readonly animateComplete = _.output<GsapHostDirective>();

  public readonly timeline = _.signal<Timeline>(TimelineFactory.empty());

  constructor(public readonly el: _.ElementRef<HTMLElement>) {
    _.effect(() => {
      this.timeline().timeline.eventCallback('onStart', () => this.animateStart.emit(this));
      this.timeline().timeline.eventCallback('onComplete', () => this.animateComplete.emit(this));
    });
  }

  ngOnInit(): void {
    this.timeline.set(new TimelineFactory(this).create());
    this.register();
  }

  public abstract register(): void;

  public get elementRef(): HTMLElement {
    return this.el.nativeElement;
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
