import { parseAnimationSequence, ANIMATION_DELIMITERS } from '../parse-animation';

describe('parseAnimationSequence', () => {
  describe('Basic parsing', () => {
    it('should parse single animation with from (default)', () => {
      const result = parseAnimationSequence('opacity:0:>');

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({
        method: 'from',
        vars: { opacity: 0 },
        position: '>',
      });
    });

    it('should parse single animation with to method', () => {
      const result = parseAnimationSequence('to:opacity:1:>');

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({
        method: 'to',
        vars: { opacity: 1 },
        position: '>',
      });
    });

    it('should use default position when not specified', () => {
      const result = parseAnimationSequence('opacity:0');

      expect(result[0].position).toBe('>');
    });
  });

  describe('Delimiters', () => {
    it('should parse multiple animations with semicolon delimiter', () => {
      const result = parseAnimationSequence('opacity:0:>;scale:2:>');

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(result[1]).toEqual({ method: 'from', vars: { scale: 2 }, position: '>' });
    });

    it('should parse multiple animations with comma delimiter', () => {
      const result = parseAnimationSequence('opacity:0:>,scale:2:>');

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(result[1]).toEqual({ method: 'from', vars: { scale: 2 }, position: '>' });
    });

    it('should parse multiple animations with mixed delimiters', () => {
      const result = parseAnimationSequence('opacity:0:>;scale:2:>,rotate:360:<');

      expect(result.length).toBe(3);
      expect(result[0].position).toBe('>');
      expect(result[1].position).toBe('>');
      expect(result[2].position).toBe('<');
    });
  });

  describe('Value parsing', () => {
    it('should parse numeric values correctly', () => {
      const result = parseAnimationSequence('rotate:360:>;scale:2.5:>');

      expect(result[0].vars).toEqual({ rotate: 360 });
      expect(result[1].vars).toEqual({ scale: 2.5 });
    });

    it('should parse string values correctly', () => {
      const result = parseAnimationSequence('x:100%:>;y:-50px:>');

      expect(result[0].vars).toEqual({ x: '100%' });
      expect(result[1].vars).toEqual({ y: '-50px' });
    });

    it('should handle negative numbers', () => {
      const result = parseAnimationSequence('x:-100:>;y:-50.5:>');

      expect(result[0].vars).toEqual({ x: -100 });
      expect(result[1].vars).toEqual({ y: -50.5 });
    });
  });

  describe('Positions', () => {
    it('should respect custom positions', () => {
      const result = parseAnimationSequence('opacity:0:<;scale:2:+=1;rotate:360:-=0.5');

      expect(result[0].position).toBe('<');
      expect(result[1].position).toBe('+=1');
      expect(result[2].position).toBe('-=0.5');
    });

    it('should handle numeric positions', () => {
      const result = parseAnimationSequence('x:200:0.5');

      expect(result[0].position).toBe('0.5');
    });
  });

  describe('Methods (to/from)', () => {
    it('should mix from and to methods', () => {
      const result = parseAnimationSequence('opacity:0:>;to:scale:2:>');

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(result[1]).toEqual({ method: 'to', vars: { scale: 2 }, position: '>' });
    });

    it('should handle explicit from method', () => {
      const result = parseAnimationSequence('from:opacity:0:>');

      expect(result[0].method).toBe('from');
      expect(result[0].vars).toEqual({ opacity: 0 });
    });

    it('should handle multiple to methods', () => {
      const result = parseAnimationSequence('to:width:500:<;to:opacity:1:>');

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'to', vars: { width: 500 }, position: '<' });
      expect(result[1]).toEqual({ method: 'to', vars: { opacity: 1 }, position: '>' });
    });
  });

  describe('Presets', () => {
    it('should resolve fadeIn preset', () => {
      const result = parseAnimationSequence('fadeIn');

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
    });

    it('should resolve preset with multiple animations', () => {
      const result = parseAnimationSequence('slideInLeft');

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ method: 'from', vars: { x: '-100%' }, position: '>' });
      expect(result[1]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '<' });
    });

    it('should use sequence as-is if preset does not exist', () => {
      const result = parseAnimationSequence('customAnimation:1:>');

      expect(result.length).toBe(1);
      expect(result[0].vars).toEqual({ customAnimation: 1 });
    });
  });

  describe('Complex scenarios', () => {
    it('should handle complex animation with multiple properties and methods', () => {
      const result = parseAnimationSequence('opacity:0.5:>;x:100:<;to:scale:2:+=1;from:y:-50:>');

      expect(result.length).toBe(4);
      expect(result[0]).toEqual({ method: 'from', vars: { opacity: 0.5 }, position: '>' });
      expect(result[1]).toEqual({ method: 'from', vars: { x: 100 }, position: '<' });
      expect(result[2]).toEqual({ method: 'to', vars: { scale: 2 }, position: '+=1' });
      expect(result[3]).toEqual({ method: 'from', vars: { y: -50 }, position: '>' });
    });

    it('should handle whitespace correctly', () => {
      const result = parseAnimationSequence('  opacity : 0 : > ; scale : 2 : >  ');

      expect(result.length).toBe(2);
      // Note: trim() is called on the animation string, but not on individual parts
      // So whitespace in property names will be preserved
      expect(result[0].vars).toHaveProperty('opacity ');
      expect(result[1].vars).toHaveProperty('scale ');
    });
  });

  describe('ANIMATION_DELIMITERS constant', () => {
    it('should match semicolon and comma', () => {
      expect(ANIMATION_DELIMITERS.test(';')).toBe(true);
      expect(ANIMATION_DELIMITERS.test(',')).toBe(true);
      expect(ANIMATION_DELIMITERS.test(':')).toBe(false);
      expect(ANIMATION_DELIMITERS.test('a')).toBe(false);
    });
  });
});
