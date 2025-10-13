export type TriggerType = 'enter' | 'leave' | 'click' | 'scroll' | 'load';
export type TriggerRef = { connect: () => void; disconnect: () => void };

export class Trigger {
  public static readonly default = 'load';

  constructor(private readonly el: HTMLElement) {}

  public onEnter(callback: () => void): TriggerRef {
    this.el.addEventListener('mouseenter', callback);
    return {
      connect: () => this.onEnter(callback),
      disconnect: () => this.el.removeEventListener('mouseenter', callback),
    };
  }

  public onLeave(callback: () => void): TriggerRef {
    this.el.addEventListener('mouseleave', callback);
    return {
      connect: () => this.onLeave(callback),
      disconnect: () => this.el.removeEventListener('mouseleave', callback),
    };
  }

  public onClick(callback: () => void): TriggerRef {
    this.el.addEventListener('click', callback);
    return {
      connect: () => this.onClick(callback),
      disconnect: () => this.el.removeEventListener('click', callback),
    };
  }

  public onLoad(callback: () => void): TriggerRef {
    callback();
    return Trigger.empty();
  }

  public when(triggerType: TriggerType): { then: (VoidFunction) => TriggerRef } {
    return {
      then: (callback: () => void) => {
        switch (triggerType) {
          case 'enter':
            return this.onEnter(callback);
          case 'leave':
            return this.onLeave(callback);
          case 'click':
            return this.onClick(callback);
          default:
            return this.onLoad(callback);
        }
      },
    };
  }

  public static empty(): TriggerRef {
    return { connect: () => '/* no-op */', disconnect: () => '/* no-op */' };
  }
}
