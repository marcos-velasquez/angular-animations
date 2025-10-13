import { Directive, ElementRef, OnDestroy, OnInit, input, signal } from '@angular/core';
import { gsap } from 'gsap';
import { Trigger, TriggerRef, TriggerType } from './models/trigger';

@Directive({ selector: '[fadeIn]' })
export class FadeInDirective implements OnInit, OnDestroy {
  public readonly duration = input(2);
  public readonly delay = input(0);
  public readonly stagger = input(0);
  public readonly ease = input<gsap.EaseString>('power1.out');
  public readonly trigger = input<TriggerType>(Trigger.default);

  private readonly triggerRef = signal<TriggerRef>(Trigger.empty());
  private readonly timeline = gsap.timeline();

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const trigger = new Trigger(this.el.nativeElement);
    switch (this.trigger()) {
      case 'enter':
        this.triggerRef.set(trigger.onEnter(this.animate.bind(this)));
        break;
      case 'leave':
        this.triggerRef.set(trigger.onLeave(this.animate.bind(this)));
        break;
      case 'click':
        this.triggerRef.set(trigger.onClick(this.animate.bind(this)));
        break;
      default:
        this.triggerRef.set(trigger.onLoad(this.animate.bind(this)));
        break;
    }
  }

  public animate() {
    this.timeline.from(this.el.nativeElement, {
      opacity: 0,
      duration: this.duration(),
      delay: this.delay(),
      ease: this.ease(),
      stagger: this.stagger(),
      onStart: () => this.triggerRef().disconnect(),
      onComplete: () => this.triggerRef().connect(),
    });
  }

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
