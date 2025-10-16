export class Presets {
  public static eval(presetName: string, argsString: string): string {
    return new Function('Presets', `return Presets.${presetName}(${argsString})`)(Presets);
  }

  public static fadeIn({ opacity = 0 } = {}): string {
    return `opacity:${opacity}:>`;
  }

  public static fadeOut({ opacity = 0 } = {}): string {
    return `to:opacity:${opacity}:>`;
  }

  public static zoomIn({ scale = 0, opacity = 0 } = {}): string {
    return `scale:${scale}:>;opacity:${opacity}:0`;
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

  public static flipIn({ degrees = 180, opacity = 0 } = {}): string {
    return `rotateY:${degrees}:>;opacity:${opacity}:<`;
  }

  public static rollIn({ degrees = -360, distance = '-100%', opacity = 0 } = {}): string {
    return `rotate:${degrees}:>;x:${distance}:0;opacity:${opacity}:0`;
  }

  public static lightSpeedIn({ distance = '100%', skew = -30, opacity = 0 } = {}): string {
    return `x:${distance}:>;skewX:${skew}:0;opacity:${opacity}:0`;
  }

  public static swingIn({ start = 15, mid1 = -10, mid2 = 5, end = 0 } = {}): string {
    return `rotate:${start}:>;to:rotate:${mid1}:>;to:rotate:${mid2}:>;to:rotate:${end}:>`;
  }

  public static rubberBandIn({ scale1 = 1.25, scale2 = 0.75, scale3 = 1.15, scale4 = 1 } = {}): string {
    return `scaleX:${scale1}:>;to:scaleX:${scale2}:>;to:scaleX:${scale3}:>;to:scaleX:${scale4}:>`;
  }

  public static fadeOutUp({ distance = '-100%', opacity = 0 } = {}): string {
    return `to:y:${distance}:>;to:opacity:${opacity}:0`;
  }

  public static fadeOutDown({ distance = '100%', opacity = 0 } = {}): string {
    return `to:y:${distance}:>;to:opacity:${opacity}:0`;
  }

  public static zoomOut({ scale = 0, opacity = 0 } = {}): string {
    return `to:scale:${scale}:>;to:opacity:${opacity}:0`;
  }

  public static flipOut({ degrees = 90, opacity = 0 } = {}): string {
    return `to:rotateY:${degrees}:>;to:opacity:${opacity}:0`;
  }

  public static rollOut({ degrees = 360, distance = '100%', opacity = 0 } = {}): string {
    return `to:rotate:${degrees}:>;to:x:${distance}:0;to:opacity:${opacity}:0`;
  }

  public static pulse({ scale1 = 1.05, scale2 = 1 } = {}): string {
    return `to:scale:${scale1}:>;to:scale:${scale2}:>`;
  }

  public static shake({ distance = 10 } = {}): string {
    return `to:x:-${distance}:>;to:x:${distance}:>;to:x:-${distance}:>;to:x:${distance}:>;to:x:0:>`;
  }

  public static wobble({ rotate1 = -5, x1 = '-25%', rotate2 = 3, x2 = '20%' } = {}): string {
    return `to:rotate:${rotate1}:>;to:x:${x1}:0;to:rotate:${rotate2}:>;to:x:${x2}:0;to:rotate:0:>;to:x:0:0`;
  }

  public static jello({ skew1 = -12.5, skew2 = 6.25 } = {}): string {
    return `to:skewX:${skew1}:>;to:skewY:${skew1}:0;to:skewX:${skew2}:>;to:skewY:${skew2}:0;to:skewX:0:>;to:skewY:0:0`;
  }

  public static heartBeat({ scale1 = 1.3, scale2 = 1 } = {}): string {
    return `to:scale:${scale1}:>;to:scale:${scale2}:>;to:scale:${scale1}:>;to:scale:${scale2}:>`;
  }

  public static hinge({ rotate1 = 80, rotate2 = 60, distance = '100%', opacity = 0 } = {}): string {
    return `to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:y:${distance}:>;to:opacity:${opacity}:0`;
  }

  public static jackInTheBox({ rotate1 = 30, scale = 0.1, opacity = 0, rotate2 = -10, rotate3 = 3 } = {}): string {
    return `rotate:${rotate1}:>;scale:${scale}:0;opacity:${opacity}:0;to:rotate:${rotate2}:>;to:rotate:${rotate3}:>;to:rotate:0:>`;
  }

  public static backIn({ scale1 = 0.7, opacity = 0, scale2 = 1.1, scale3 = 1 } = {}): string {
    return `scale:${scale1}:>;opacity:${opacity}:0;to:scale:${scale2}:>;to:scale:${scale3}:>`;
  }

  public static backOut({ scale1 = 1.1, scale2 = 0.7, opacity = 0 } = {}): string {
    return `to:scale:${scale1}:>;to:scale:${scale2}:>;to:opacity:${opacity}:0`;
  }

  public static flash({ opacity1 = 0, opacity2 = 1 } = {}): string {
    return `to:opacity:${opacity1}:>;to:opacity:${opacity2}:>;to:opacity:${opacity1}:>;to:opacity:${opacity2}:>`;
  }
}
