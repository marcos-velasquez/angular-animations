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

  public play(): GsapHostDirective {
    this.timeline().play();
    return this;
  }

  public pause(): GsapHostDirective {
    this.timeline().pause();
    return this;
  }

  public reverse(): GsapHostDirective {
    this.timeline().reverse();
    return this;
  }

  public resume(): GsapHostDirective {
    this.timeline().resume();
    return this;
  }

  public restart(): GsapHostDirective {
    this.timeline().restart();
    return this;
  }

  public seek(time: number): GsapHostDirective {
    this.timeline().seek(time);
    return this;
  }

  public clear(): GsapHostDirective {
    this.timeline().clear();
    return this;
  }

  ngOnDestroy(): void {
    this.timeline().disconnect();
  }
}
