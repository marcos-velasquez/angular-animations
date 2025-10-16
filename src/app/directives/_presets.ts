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

  public static fadeInUp({ distance = '100%', opacity = 0 } = {}): string {
    return `y:${distance}:>;opacity:${opacity}:0`;
  }

  public static fadeInDown({ distance = '-100%', opacity = 0 } = {}): string {
    return `y:${distance}:>;opacity:${opacity}:0`;
  }

  public static fadeInLeft({ distance = '-100%', opacity = 0 } = {}): string {
    return `x:${distance}:>;opacity:${opacity}:0`;
  }

  public static fadeInRight({ distance = '100%', opacity = 0 } = {}): string {
    return `x:${distance}:>;opacity:${opacity}:0`;
  }

  public static rotateInDownLeft({ degrees = -45, opacity = 0 } = {}): string {
    return `rotate:${degrees}:>;opacity:${opacity}:0`;
  }

  public static rotateInDownRight({ degrees = 45, opacity = 0 } = {}): string {
    return `rotate:${degrees}:>;opacity:${opacity}:0`;
  }

  public static flipInX({ degrees = 90, opacity = 0 } = {}): string {
    return `rotateX:${degrees}:>;opacity:${opacity}:0`;
  }

  public static bounceInDown({ distance = '-100%', opacity = 0, midScale = 1.1 } = {}): string {
    return `y:${distance}:>;opacity:${opacity}:0;to:scale:${midScale}:>;to:scale:1:>`;
  }

  public static bounceInUp({ distance = '100%', opacity = 0, midScale = 1.1 } = {}): string {
    return `y:${distance}:>;opacity:${opacity}:0;to:scale:${midScale}:>;to:scale:1:>`;
  }

  public static slideInBounce({ distance = '-100%', opacity = 0, bounce = '10px' } = {}): string {
    return `x:${distance}:>;opacity:${opacity}:0;to:x:${bounce}:>;to:x:0:>`;
  }

  public static zoomInRotate({ scale = 0, opacity = 0, degrees = 180 } = {}): string {
    return `scale:${scale}:>;opacity:${opacity}:0;rotate:${degrees}:0`;
  }

  public static fadeOutLeft({ distance = '-100%', opacity = 0 } = {}): string {
    return `to:x:${distance}:>;to:opacity:${opacity}:0`;
  }

  public static fadeOutRight({ distance = '100%', opacity = 0 } = {}): string {
    return `to:x:${distance}:>;to:opacity:${opacity}:0`;
  }

  public static slideOutLeft({ distance = '-100%' } = {}): string {
    return `to:x:${distance}:>`;
  }

  public static slideOutRight({ distance = '100%' } = {}): string {
    return `to:x:${distance}:>`;
  }

  public static slideOutUp({ distance = '-100%' } = {}): string {
    return `to:y:${distance}:>`;
  }

  public static slideOutDown({ distance = '100%' } = {}): string {
    return `to:y:${distance}:>`;
  }

  public static rotateOut({ degrees = 200, opacity = 0 } = {}): string {
    return `to:rotate:${degrees}:>;to:opacity:${opacity}:0`;
  }

  public static bounceOut({ scale1 = 1.1, scale2 = 0, opacity = 0 } = {}): string {
    return `to:scale:${scale1}:>;to:scale:${scale2}:>;to:opacity:${opacity}:0`;
  }

  public static lightSpeedOut({ distance = '100%', skew = 30, opacity = 0 } = {}): string {
    return `to:x:${distance}:>;to:skewX:${skew}:0;to:opacity:${opacity}:0`;
  }

  public static bounce({ y1 = '-30px', y2 = '-15px', y3 = '-4px' } = {}): string {
    return `to:y:${y1}:>;to:y:0:>;to:y:${y2}:>;to:y:0:>;to:y:${y3}:>;to:y:0:>`;
  }

  public static tada({ scale1 = 0.9, scale2 = 1.1, rotate1 = -3, rotate2 = 3 } = {}): string {
    return `to:scale:${scale1}:>;to:rotate:${rotate1}:0;to:scale:${scale2}:>;to:rotate:${rotate2}:0;to:scale:${scale2}:>;to:rotate:${rotate2}:0;to:scale:${scale2}:>;to:rotate:${rotate2}:0;to:scale:1:>;to:rotate:0:0`;
  }

  public static swing({ rotate1 = 15, rotate2 = -10, rotate3 = 5 } = {}): string {
    return `to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:rotate:${rotate3}:>;to:rotate:${rotate2}:>;to:rotate:0:>`;
  }

  public static headShake({ x1 = '-10px', x2 = '10px', rotate1 = -5, rotate2 = 5 } = {}): string {
    return `to:x:${x1}:>;to:rotate:${rotate1}:0;to:x:${x2}:>;to:rotate:${rotate2}:0;to:x:${x1}:>;to:rotate:${rotate1}:0;to:x:0:>;to:rotate:0:0`;
  }

  public static shakeY({ distance = 10 } = {}): string {
    return `to:y:-${distance}:>;to:y:${distance}:>;to:y:-${distance}:>;to:y:${distance}:>;to:y:0:>`;
  }

  public static rubberBand({
    scaleX1 = 1.25,
    scaleY1 = 0.75,
    scaleX2 = 0.75,
    scaleY2 = 1.25,
    scaleX3 = 1.15,
    scaleY3 = 0.85,
  } = {}): string {
    return `to:scaleX:${scaleX1}:>;to:scaleY:${scaleY1}:0;to:scaleX:${scaleX2}:>;to:scaleY:${scaleY2}:0;to:scaleX:${scaleX3}:>;to:scaleY:${scaleY3}:0;to:scaleX:1:>;to:scaleY:1:0`;
  }

  public static wiggle({ x1 = '-10px', x2 = '10px', rotate1 = -3, rotate2 = 3 } = {}): string {
    return `to:x:${x1}:>;to:rotate:${rotate1}:0;to:x:${x2}:>;to:rotate:${rotate2}:0;to:x:${x1}:>;to:rotate:${rotate1}:0;to:x:0:>;to:rotate:0:0`;
  }

  public static flip({ rotateY1 = 180, rotateY2 = 360 } = {}): string {
    return `to:rotateY:${rotateY1}:>;to:rotateY:${rotateY2}:>`;
  }

  public static spin({ degrees = 360 } = {}): string {
    return `to:rotate:${degrees}:>`;
  }

  public static glitch({ x1 = '-5px', x2 = '5px', skew1 = -10, skew2 = 10 } = {}): string {
    return `to:x:${x1}:>;to:skewX:${skew1}:0;to:x:${x2}:>;to:skewX:${skew2}:0;to:x:${x1}:>;to:skewX:${skew1}:0;to:x:0:>;to:skewX:0:0`;
  }

  public static blur({ blur1 = '10px', blur2 = '0px', opacity = 0 } = {}): string {
    return `filter:blur(${blur1}):>;opacity:${opacity}:0;to:filter:blur(${blur2}):>`;
  }

  public static kenBurns({ scale = 1.2, x = '10%', y = '10%' } = {}): string {
    return `to:scale:${scale}:>;to:x:${x}:0;to:y:${y}:0`;
  }

  public static morphing({ scale1 = 1.2, rotate = 45, scale2 = 0.8 } = {}): string {
    return `to:scale:${scale1}:>;to:rotate:${rotate}:0;to:scale:${scale2}:>;to:rotate:0:0;to:scale:1:>`;
  }

  public static blurredFadeIn({ blur1 = '20px', blur2 = '0px', opacity = 0 } = {}): string {
    return `filter:blur(${blur1}):>;opacity:${opacity}:0;to:filter:blur(${blur2}):>`;
  }

  public static jump({ y1 = '-30px', y2 = '-15px' } = {}): string {
    return `to:y:${y1}:>;to:y:0:>;to:y:${y2}:>;to:y:0:>`;
  }

  public static hang({ y = '-20px' } = {}): string {
    return `to:y:${y}:>;to:y:0:>`;
  }

  public static float({ y1 = '-20px', y2 = '-10px' } = {}): string {
    return `to:y:${y1}:>;to:y:${y2}:>;to:y:${y1}:>;to:y:${y2}:>`;
  }

  public static sink({ y = '20px' } = {}): string {
    return `to:y:${y}:>`;
  }

  public static pop({ scale1 = 0, scale2 = 1.1, scale3 = 1 } = {}): string {
    return `scale:${scale1}:>;to:scale:${scale2}:>;to:scale:${scale3}:>`;
  }

  public static blink({ opacity1 = 0, opacity2 = 1 } = {}): string {
    return `to:opacity:${opacity1}:>;to:opacity:${opacity2}:>;to:opacity:${opacity1}:>;to:opacity:${opacity2}:>;to:opacity:${opacity1}:>;to:opacity:${opacity2}:>`;
  }

  public static sway({ rotate1 = -10, rotate2 = 10 } = {}): string {
    return `to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:rotate:0:>`;
  }

  public static skew({ skewX = -10, skewY = -10 } = {}): string {
    return `to:skewX:${skewX}:>;to:skewY:${skewY}:0;to:skewX:0:>;to:skewY:0:0`;
  }

  public static skewRight({ skewX = 10 } = {}): string {
    return `to:skewX:${skewX}:>;to:skewX:0:>`;
  }

  public static tilt({ rotate1 = -10, rotate2 = 10 } = {}): string {
    return `to:rotate:${rotate1}:>;to:rotate:0:>;to:rotate:${rotate2}:>;to:rotate:0:>`;
  }

  public static squeeze({ scaleX1 = 1.3, scaleY1 = 0.7, scaleX2 = 0.7, scaleY2 = 1.3 } = {}): string {
    return `to:scaleX:${scaleX1}:>;to:scaleY:${scaleY1}:0;to:scaleX:${scaleX2}:>;to:scaleY:${scaleY2}:0;to:scaleX:1:>;to:scaleY:1:0`;
  }

  public static expandHorizontally({ scaleX = 1.5 } = {}): string {
    return `to:scaleX:${scaleX}:>`;
  }

  public static contractHorizontally({ scaleX = 0.5 } = {}): string {
    return `to:scaleX:${scaleX}:>`;
  }

  public static expandVertically({ scaleY = 1.5 } = {}): string {
    return `to:scaleY:${scaleY}:>`;
  }

  public static contractVertically({ scaleY = 0.5 } = {}): string {
    return `to:scaleY:${scaleY}:>`;
  }

  public static verticalBounce({ y1 = '-20px', y2 = '-10px', y3 = '-5px' } = {}): string {
    return `to:y:${y1}:>;to:y:0:>;to:y:${y2}:>;to:y:0:>;to:y:${y3}:>;to:y:0:>`;
  }

  public static horizontalBounce({ x1 = '20px', x2 = '10px', x3 = '5px' } = {}): string {
    return `to:x:${x1}:>;to:x:0:>;to:x:${x2}:>;to:x:0:>;to:x:${x3}:>;to:x:0:>`;
  }

  public static horizontalVibration({ x = '5px' } = {}): string {
    return `to:x:-${x}:>;to:x:${x}:>;to:x:-${x}:>;to:x:${x}:>;to:x:-${x}:>;to:x:${x}:>;to:x:0:>`;
  }

  public static rotationalWave({ rotate1 = 15, rotate2 = -15 } = {}): string {
    return `to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:rotate:0:>`;
  }

  public static slideUpFade({ y = '100%', opacity = 0 } = {}): string {
    return `y:${y}:>;opacity:${opacity}:0`;
  }

  public static bounceFadeIn({ scale1 = 0, scale2 = 1.1, scale3 = 1, opacity = 0 } = {}): string {
    return `scale:${scale1}:>;opacity:${opacity}:0;to:scale:${scale2}:>;to:scale:${scale3}:>`;
  }

  public static swingDropIn({ rotate = -45, y = '-100%', opacity = 0 } = {}): string {
    return `rotate:${rotate}:>;y:${y}:0;opacity:${opacity}:0;to:rotate:0:>`;
  }

  public static pulseFadeIn({ scale1 = 0.8, scale2 = 1, opacity = 0 } = {}): string {
    return `scale:${scale1}:>;opacity:${opacity}:0;to:scale:${scale2}:>;to:scale:${scale1}:>;to:scale:${scale2}:>`;
  }

  public static impulseRotationRight({ rotate1 = 10, rotate2 = -5 } = {}): string {
    return `to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:rotate:0:>`;
  }

  public static impulseRotationLeft({ rotate1 = -10, rotate2 = 5 } = {}): string {
    return `to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:rotate:0:>`;
  }

  public static dancing({
    rotate1 = -15,
    rotate2 = 15,
    y1 = '-10px',
    y2 = '10px',
  } = {}): string {
    return `to:rotate:${rotate1}:>;to:y:${y1}:0;to:rotate:${rotate2}:>;to:y:${y2}:0;to:rotate:${rotate1}:>;to:y:${y1}:0;to:rotate:0:>;to:y:0:0`;
  }

  public static slideRotateIn({ x = '-100%', rotate = -180, opacity = 0 } = {}): string {
    return `x:${x}:>;rotate:${rotate}:0;opacity:${opacity}:0;to:rotate:0:>`;
  }

  public static slideRotateOut({ x = '100%', rotate = 180, opacity = 0 } = {}): string {
    return `to:x:${x}:>;to:rotate:${rotate}:0;to:opacity:${opacity}:0`;
  }

  public static fadeInDownBig({ distance = '-2000px', opacity = 0 } = {}): string {
    return `y:${distance}:>;opacity:${opacity}:0`;
  }

  public static fadeInUpBig({ distance = '2000px', opacity = 0 } = {}): string {
    return `y:${distance}:>;opacity:${opacity}:0`;
  }

  public static fadeInLeftBig({ distance = '-2000px', opacity = 0 } = {}): string {
    return `x:${distance}:>;opacity:${opacity}:0`;
  }

  public static fadeInRightBig({ distance = '2000px', opacity = 0 } = {}): string {
    return `x:${distance}:>;opacity:${opacity}:0`;
  }

  public static fadeInTopLeft({ x = '-100%', y = '-100%', opacity = 0 } = {}): string {
    return `x:${x}:>;y:${y}:0;opacity:${opacity}:0`;
  }

  public static fadeInTopRight({ x = '100%', y = '-100%', opacity = 0 } = {}): string {
    return `x:${x}:>;y:${y}:0;opacity:${opacity}:0`;
  }

  public static fadeInBottomLeft({ x = '-100%', y = '100%', opacity = 0 } = {}): string {
    return `x:${x}:>;y:${y}:0;opacity:${opacity}:0`;
  }

  public static fadeInBottomRight({ x = '100%', y = '100%', opacity = 0 } = {}): string {
    return `x:${x}:>;y:${y}:0;opacity:${opacity}:0`;
  }

  public static bounceInLeft({ x = '-100%', opacity = 0, midScale = 1.1 } = {}): string {
    return `x:${x}:>;opacity:${opacity}:0;to:scale:${midScale}:>;to:scale:1:>`;
  }

  public static bounceInRight({ x = '100%', opacity = 0, midScale = 1.1 } = {}): string {
    return `x:${x}:>;opacity:${opacity}:0;to:scale:${midScale}:>;to:scale:1:>`;
  }

  public static zoomInDown({ y = '-100%', scale = 0, opacity = 0 } = {}): string {
    return `y:${y}:>;scale:${scale}:0;opacity:${opacity}:0`;
  }

  public static zoomInUp({ y = '100%', scale = 0, opacity = 0 } = {}): string {
    return `y:${y}:>;scale:${scale}:0;opacity:${opacity}:0`;
  }

  public static backInDown({ y = '-100%', scale = 0.7, opacity = 0 } = {}): string {
    return `y:${y}:>;scale:${scale}:0;opacity:${opacity}:0;to:scale:1:>`;
  }

  public static backInUp({ y = '100%', scale = 0.7, opacity = 0 } = {}): string {
    return `y:${y}:>;scale:${scale}:0;opacity:${opacity}:0;to:scale:1:>`;
  }

  public static flipInY({ rotateY = 90, opacity = 0 } = {}): string {
    return `rotateY:${rotateY}:>;opacity:${opacity}:0`;
  }

  public static flipOutY({ rotateY = 90, opacity = 0 } = {}): string {
    return `to:rotateY:${rotateY}:>;to:opacity:${opacity}:0`;
  }

  public static rotateInUpLeft({ rotate = -45, x = '-100%', y = '100%', opacity = 0 } = {}): string {
    return `rotate:${rotate}:>;x:${x}:0;y:${y}:0;opacity:${opacity}:0;to:rotate:0:>`;
  }

  public static rotateOutDownRight({ rotate = 45, x = '100%', y = '100%', opacity = 0 } = {}): string {
    return `to:rotate:${rotate}:>;to:x:${x}:0;to:y:${y}:0;to:opacity:${opacity}:0`;
  }

  public static shakeX({ distance = 10 } = {}): string {
    return `to:x:-${distance}:>;to:x:${distance}:>;to:x:-${distance}:>;to:x:${distance}:>;to:x:0:>`;
  }
}
