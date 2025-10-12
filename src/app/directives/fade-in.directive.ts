import { Directive, ElementRef, OnDestroy, OnInit, input, signal } from '@angular/core';
import { gsap } from 'gsap';
import { Trigger, TriggerRef } from './models/triggers';

@Directive({ selector: '[fadeIn]' })
export class FadeInDirective implements OnInit, OnDestroy {
  public readonly duration = input(2);
  public readonly delay = input(0);
  public readonly stagger = input(0);
  public readonly ease = input<gsap.EaseString>('power1.out');
  public readonly trigger = input<'load' | 'scroll' | 'enter' | 'leave' | 'click'>('load');

  private readonly triggerRef = signal<TriggerRef | null>(null);

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const trigger = new Trigger(this.el.nativeElement);
    switch (this.trigger()) {
      case 'enter':
        this.triggerRef.set(trigger.mouseEnter(() => this.animate()));
      case 'leave':
        this.triggerRef.set(trigger.mouseLeave(() => this.animate()));
        break;
      case 'click':
        this.triggerRef.set(trigger.click(() => this.animate()));
        break;
      default:
        this.animate();
        break;
    }
  }

  public animate() {
    gsap.from(this.el.nativeElement, {
      opacity: 0,
      duration: this.duration(),
      delay: this.delay(),
      ease: this.ease(),
      stagger: this.stagger(),
    });
  }

  ngOnDestroy(): void {
    this.triggerRef()?.remove();
  }
}
