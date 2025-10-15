import * as _ from '@angular/core';
import { TriggerType, Timeline, TimelineFactory } from './models/_index';

@_.Directive({ selector: '[gsap]' })
export abstract class GsapHostDirective implements _.OnInit, _.OnDestroy {
  public readonly duration = _.input<gsap.TweenValue>(2);
  public readonly delay = _.input<gsap.TweenValue>(0);
  public readonly stagger = _.input<gsap.NumberValue>(0);
  public readonly ease = _.input<gsap.EaseString>('power1.out');
  public readonly position = _.input<'>' | '<'>('>');
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
    this.timeline.set(new TimelineFactory(this).create(this.trigger()));
    this.animate();
  }

  public abstract animate(): void;

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

  protected from(vars: gsap.TweenVars): void {
    this.timeline().from(vars);
  }

  protected to(vars: gsap.TweenVars): void {
    this.timeline().to(vars);
  }

  ngOnDestroy(): void {
    this.timeline().disconnect();
  }
}
