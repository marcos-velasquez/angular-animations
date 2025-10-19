import { gsap } from 'gsap';
import { Trigger, TriggerRef, TriggerType } from './trigger';

export class Timeline {
  private readonly gsapTimeline: gsap.core.Timeline;
  private triggerRef: TriggerRef;

  constructor(private readonly element: HTMLElement, defaults: gsap.TweenVars) {
    this.gsapTimeline = gsap.timeline({ paused: true, defaults });
  }

  public get timeline(): gsap.core.Timeline {
    return this.gsapTimeline;
  }

  public with(triggerType: TriggerType): Timeline {
    this.triggerRef = new Trigger(this.element).when(triggerType).then(() => this.play());
    return this;
  }

  public from(vars: gsap.TweenVars, position?: gsap.Position): Timeline {
    this.gsapTimeline.from(this.element, vars, position);
    return this;
  }

  public to(vars: gsap.TweenVars, position?: gsap.Position): Timeline {
    this.gsapTimeline.to(this.element, vars, position);
    return this;
  }

  public play(): Timeline {
    this.gsapTimeline.play(0);
    return this;
  }

  public pause(): Timeline {
    this.gsapTimeline.pause();
    return this;
  }

  public reverse(): Timeline {
    this.gsapTimeline.reverse();
    return this;
  }

  public resume(): Timeline {
    this.gsapTimeline.resume();
    return this;
  }

  public restart(): Timeline {
    this.gsapTimeline.restart();
    return this;
  }

  public disconnect(): Timeline {
    this.triggerRef.disconnect();
    return this;
  }

  public connect(): Timeline {
    this.triggerRef.connect();
    return this;
  }
}
