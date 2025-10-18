import { SequenceParser } from '../sequence-parser';
import { PropsParser } from '../props-parser';

describe('SequenceParser', () => {
  let parser: SequenceParser;

  beforeEach(() => {
    parser = new SequenceParser(new PropsParser());
  });

  describe('parse()', () => {
    it('should parse basic animation', () => {
      const result = parser.parse('x:100%:>');

      expect(result).toEqual({
        method: 'from',
        vars: { x: '100%' },
        position: '>',
      });
    });

    it('should parse animation with numeric value', () => {
      const result = parser.parse('opacity:0:<');

      expect(result).toEqual({
        method: 'from',
        vars: { opacity: 0 },
        position: '<',
      });
    });

    it('should parse animation with to method', () => {
      const result = parser.parse('to:x:100%:>');

      expect(result).toEqual({
        method: 'to',
        vars: { x: '100%' },
        position: '>',
      });
    });

    it('should parse animation with from method', () => {
      const result = parser.parse('from:y:-50%:0');

      expect(result).toEqual({
        method: 'from',
        vars: { y: '-50%' },
        position: '0',
      });
    });

    it('should parse animation with props syntax', () => {
      const result = parser.parse('x:100%:>@duration:2');

      expect(result?.method).toBe('from');
      expect(result?.vars.x).toBe('100%');
      expect(result?.position).toBe('>');
    });

    it('should use default method when not specified', () => {
      const result = parser.parse('x:100%:>');

      expect(result?.method).toBe('from');
    });

    it('should use default position when not specified', () => {
      const result = parser.parse('x:100%');

      expect(result?.position).toBe('>');
    });

    it('should return null for invalid sequence', () => {
      const result = parser.parse('invalid');

      expect(result).toBeNull();
    });

    it('should handle whitespace', () => {
      const result = parser.parse('  x:100%:>  ');

      expect(result).toEqual({
        method: 'from',
        vars: { x: '100%' },
        position: '>',
      });
    });

    it('should parse negative numbers', () => {
      const result = parser.parse('y:-100:>');

      expect(result).toEqual({
        method: 'from',
        vars: { y: -100 },
        position: '>',
      });
    });
  });
});
