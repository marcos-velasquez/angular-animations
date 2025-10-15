import { AnimationParser } from '../animation-parse';

describe('AnimationParser', () => {
  describe('parse() method', () => {
    it('should parse single animation with from (default)', () => {
      const result = new AnimationParser('opacity:0:>').parse();

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({
        method: 'from',
        vars: { opacity: AnimationParser.DEFAULT_METHOD },
        position: AnimationParser.DEFAULT_POSITION,
      });
    });

    it('should parse multiple animations', () => {
      const result = new AnimationParser('opacity:0:>;to:scale:2:>').parse();

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(result[1]).toEqual({ method: 'to', vars: { scale: 2 }, position: '>' });
    });

    it('should handle to method', () => {
      const result = new AnimationParser('to:opacity:1:>').parse();

      expect(result[0].method).toBe('to');
      expect(result[0].vars).toEqual({ opacity: 1 });
    });

    it('should resolve presets', () => {
      const result = new AnimationParser('fadeIn').parse();

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
    });

    it('should filter out invalid animations', () => {
      const result = new AnimationParser('opacity:0:>;invalid;scale:2:>').parse();

      expect(result.length).toBe(2);
      expect(result[0].vars).toEqual({ opacity: 0 });
      expect(result[1].vars).toEqual({ scale: 2 });
    });

    it('should handle whitespace correctly', () => {
      const result = new AnimationParser('  opacity : 0 : > ; scale : 2 : >  ').parse();

      expect(result.length).toBe(2);
      expect(result[0].vars).toHaveProperty('opacity ');
      expect(result[1].vars).toHaveProperty('scale ');
    });
  });

  describe('Delimiters', () => {
    it('should parse multiple animations with semicolon delimiter', () => {
      const result = new AnimationParser('opacity:0:>;scale:2:>').parse();

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(result[1]).toEqual({ method: 'from', vars: { scale: 2 }, position: '>' });
    });

    it('should parse multiple animations with comma delimiter', () => {
      const result = new AnimationParser('opacity:0:>,scale:2:>').parse();

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(result[1]).toEqual({ method: 'from', vars: { scale: 2 }, position: '>' });
    });

    it('should parse multiple animations with mixed delimiters', () => {
      const result = new AnimationParser('opacity:0:>;scale:2:>,rotate:360:<').parse();

      expect(result.length).toBe(3);
      expect(result[0].position).toBe('>');
      expect(result[1].position).toBe('>');
      expect(result[2].position).toBe('<');
    });
  });

  describe('Value parsing', () => {
    it('should parse numeric values correctly', () => {
      const result = new AnimationParser('rotate:360:>;scale:2.5:>').parse();

      expect(result[0].vars).toEqual({ rotate: 360 });
      expect(result[1].vars).toEqual({ scale: 2.5 });
    });

    it('should parse string values correctly', () => {
      const result = new AnimationParser('x:100%:>;y:-50px:>').parse();

      expect(result[0].vars).toEqual({ x: '100%' });
      expect(result[1].vars).toEqual({ y: '-50px' });
    });

    it('should handle negative numbers', () => {
      const result = new AnimationParser('x:-100:>;y:-50.5:>').parse();

      expect(result[0].vars).toEqual({ x: -100 });
      expect(result[1].vars).toEqual({ y: -50.5 });
    });
  });

  describe('Positions', () => {
    it('should respect custom positions', () => {
      const result = new AnimationParser('opacity:0:<;scale:2:+=1;rotate:360:-=0.5').parse();

      expect(result[0].position).toBe('<');
      expect(result[1].position).toBe('+=1');
      expect(result[2].position).toBe('-=0.5');
    });

    it('should handle numeric positions', () => {
      const result = new AnimationParser('x:200:0.5').parse();

      expect(result[0].position).toBe('0.5');
    });
  });

  describe('Methods (to/from)', () => {
    it('should mix from and to methods', () => {
      const result = new AnimationParser('opacity:0:>;to:scale:2:>').parse();

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(result[1]).toEqual({ method: 'to', vars: { scale: 2 }, position: '>' });
    });

    it('should handle explicit from method', () => {
      const result = new AnimationParser('from:opacity:0:>').parse();

      expect(result[0].method).toBe('from');
      expect(result[0].vars).toEqual({ opacity: 0 });
    });

    it('should handle multiple to methods', () => {
      const result = new AnimationParser('to:width:500:<;to:opacity:1:>').parse();

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'to', vars: { width: 500 }, position: '<' });
      expect(result[1]).toEqual({ method: 'to', vars: { opacity: 1 }, position: '>' });
    });
  });

  describe('Presets', () => {
    it('should resolve fadeIn preset', () => {
      const result = new AnimationParser('fadeIn').parse();

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
    });

    it('should resolve preset with multiple animations', () => {
      const result = new AnimationParser('slideInLeft').parse();

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'from', vars: { x: '-100%' }, position: '>' });
      expect(result[1]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '<' });
    });

    it('should use sequence as-is if preset does not exist', () => {
      const result = new AnimationParser('customAnimation:1:>').parse();

      expect(result.length).toBe(1);
      expect(result[0].vars).toEqual({ customAnimation: 1 });
    });
  });
});
