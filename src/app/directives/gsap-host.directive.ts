export type GsapAnimationProps = {
  duration?: number;
  delay?: number;
  ease?: string;
  trigger?: 'load' | 'scroll' | 'hover' | 'click';
  once?: boolean;
  [key: string]: unknown;
};

// Minimal host directive placeholder - real shared logic can go here later
export {};
