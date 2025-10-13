import { Directive, ElementRef, OnDestroy, OnInit, effect, input, output, signal } from '@angular/core';
import { gsap } from 'gsap';
import { Trigger, TriggerRef, TriggerType } from './models/trigger';

@Directive({ selector: '[gsap]' })
export abstract class GsapHostDirective implements OnInit, OnDestroy {
  public readonly duration = input(2);
  public readonly delay = input(0);
  public readonly stagger = input(0);
  public readonly ease = input<gsap.EaseString>('power1.out');
  public readonly trigger = input<TriggerType>(Trigger.default);

  public readonly animateStart = output<GsapHostDirective>();
  public readonly animateComplete = output<GsapHostDirective>();

  protected readonly triggerRef = signal<TriggerRef>(Trigger.empty());
  protected readonly timeline = gsap.timeline({ paused: true });

  constructor(protected readonly el: ElementRef<HTMLElement>) {
    effect(() => this.animate());
    this.timeline.eventCallback('onStart', () => this.animateStart.emit(this));
    this.timeline.eventCallback('onComplete', () => this.animateComplete.emit(this));
  }

  ngOnInit(): void {
    this.triggerRef.set(new Trigger(this.el.nativeElement).when(this.trigger()).then(this.play.bind(this)));
  }

  public abstract animate(): void;

  public pause(): void {
    this.timeline.pause();
  }

  public play(): void {
    this.timeline.play(0);
  }

  public reverse(): void {
    this.timeline.reverse();
  }

  public resume(): void {
    this.timeline.resume();
  }

  public restart(): void {
    this.timeline.restart();
  }

  ngOnDestroy(): void {
    this.triggerRef().disconnect();
  }
}
