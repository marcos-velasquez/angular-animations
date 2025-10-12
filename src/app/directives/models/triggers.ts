export type TriggerRef = { remove: () => void };

export class Trigger {
  constructor(private readonly el: HTMLElement) {}

  public mouseEnter(callback: () => void): TriggerRef {
    this.el.addEventListener('mouseenter', callback);
    return {
      remove: () => this.el.removeEventListener('mouseenter', callback),
    };
  }

  public mouseLeave(callback: () => void): TriggerRef {
    this.el.addEventListener('mouseleave', callback);
    return {
      remove: () => this.el.removeEventListener('mouseleave', callback),
    };
  }

  public click(callback: () => void): TriggerRef {
    this.el.addEventListener('click', callback);
    return {
      remove: () => this.el.removeEventListener('click', callback),
    };
  }
}
