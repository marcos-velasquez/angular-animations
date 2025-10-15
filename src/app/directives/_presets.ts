export const PRESETS: Record<string, string> = {
  fadeIn: 'opacity:0:>',
  fadeOut: 'to:opacity:0:',
  slideInLeft: 'x:-100%:>;opacity:0:<',
  slideInRight: 'x:100%:>;opacity:0:<',
  slideInUp: 'y:100%:>;opacity:0:<',
  slideInDown: 'y:-100%:>;opacity:0:<',
  bounceIn: 'scale:0:>;to:scale:1.2:>;to:scale:1:>',
  zoomIn: 'scale:0:>;opacity:0:<',
  rotateIn: 'rotate:-180:>;opacity:0:<',
};
