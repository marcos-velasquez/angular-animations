export class Presets {
  public static fadeIn({ opacity = 0 } = {}): string {
    return `opacity:${opacity}:>`;
  }

  public static fadeOut({ opacity = 0 } = {}): string {
    return `to:opacity:${opacity}:`;
  }

  public static zoomIn({ scale = 0, opacity = 0 } = {}): string {
    return `scale:${scale}:>;opacity:${opacity}:<`;
  }

  public static slideInLeft({ distance = '-100%', opacity = 0 } = {}): string {
    return `x:${distance}:>;opacity:${opacity}:<`;
  }

  public static slideInRight({ distance = '100%', opacity = 0 } = {}): string {
    return `x:${distance}:>;opacity:${opacity}:<`;
  }

  public static slideInUp({ distance = '100%', opacity = 0 } = {}): string {
    return `y:${distance}:>;opacity:${opacity}:<`;
  }

  public static slideInDown({ distance = '-100%', opacity = 0 } = {}): string {
    return `y:${distance}:>;opacity:${opacity}:<`;
  }

  public static bounceIn({ startScale = 0, midScale = 1.2, endScale = 1 } = {}): string {
    return `scale:${startScale}:>;to:scale:${midScale}:>;to:scale:${endScale}:>`;
  }

  public static rotateIn({ degrees = -180, opacity = 0 } = {}): string {
    return `rotate:${degrees}:>;opacity:${opacity}:<`;
  }
}
