import { Directive, ElementRef, OnDestroy, OnInit, input, signal } from '@angular/core';
import { gsap } from 'gsap';
import { Trigger, TriggerRef, TriggerType } from './models/trigger';

@Directive({ selector: '[gsap]' })
export abstract class GsapHostDirective implements OnInit, OnDestroy {
  public readonly duration = input(2);
  public readonly delay = input(0);
  public readonly stagger = input(0);
  public readonly ease = input<gsap.EaseString>('power1.out');
  public readonly trigger = input<TriggerType>(Trigger.default);

  protected readonly triggerRef = signal<TriggerRef>(Trigger.empty());
  protected readonly timeline = gsap.timeline();

  constructor(protected readonly el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.triggerRef.set(new Trigger(this.el.nativeElement).when(this.trigger()).then(this.animate.bind(this)));
  }

  public abstract animate(): void;

  public pause(): void {
    this.timeline.pause();
  }

  public play(): void {
    this.timeline.play();
  }

  public reverse(): void {
    this.timeline.reverse();
  }

  ngOnDestroy(): void {
    this.triggerRef().disconnect();
  }
}
