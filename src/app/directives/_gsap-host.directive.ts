import * as _ from '@angular/core';
import { Trigger, TriggerRef, TriggerType, Timeline } from './models/_index';

@_.Directive({ selector: '[gsap]' })
export abstract class GsapHostDirective implements _.OnInit, _.OnDestroy, _.AfterViewInit {
  public readonly duration = _.input<gsap.TweenValue>(2);
  public readonly delay = _.input<gsap.TweenValue>(0);
  public readonly stagger = _.input<gsap.NumberValue>(0);
  public readonly ease = _.input<gsap.EaseString>('power1.out');
  public readonly together = _.input(false, { transform: _.booleanAttribute });
  public readonly trigger = _.input<TriggerType>(Trigger.default);

  public readonly animateStart = _.output<GsapHostDirective>();
  public readonly animateComplete = _.output<GsapHostDirective>();

  public readonly triggerRef = _.signal<TriggerRef>(Trigger.empty());
  protected readonly timeline = _.signal<gsap.core.Timeline>(Timeline.empty());

  constructor(public readonly el: _.ElementRef<HTMLElement>) {
    _.effect(() => {
      this.timeline().eventCallback('onStart', () => this.animateStart.emit(this));
      this.timeline().eventCallback('onComplete', () => this.animateComplete.emit(this));
      this.animate();
    });
  }

  ngOnInit(): void {
    this.timeline.set(new Timeline(this, { cache: !this.together() }).create());
  }

  ngAfterViewInit(): void {
    this.triggerRef.set(new Trigger(this.elementRef).when(this.trigger()).then(this.play.bind(this)));
  }

  public abstract animate(): void;

  public get elementRef(): HTMLElement {
    return this.el.nativeElement;
  }

  public play(): void {
    this.timeline().play(0);
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

  ngOnDestroy(): void {
    this.triggerRef().disconnect();
  }
}
