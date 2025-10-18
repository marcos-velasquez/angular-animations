import { ObjectParser } from '../object-parser';

describe('ObjectParser', () => {
  let parser: ObjectParser;

  beforeEach(() => {
    parser = new ObjectParser();
  });

  describe('parse()', () => {
    it('should parse simple object', () => {
      const result = parser.parse('{ x: "100%" }');

      expect(result).toEqual({ x: '100%' });
    });

    it('should parse object with multiple properties', () => {
      const result = parser.parse('{ x: "100%", y: "-50%", duration: 2 }');

      expect(result).toEqual({ x: '100%', y: '-50%', duration: 2 });
    });

    it('should parse boolean values', () => {
      const result = parser.parse('{ yoyo: true, repeat: false }');

      expect(result).toEqual({ yoyo: true, repeat: false });
    });

    it('should parse numeric values', () => {
      const result = parser.parse('{ duration: 2, delay: 0.5 }');

      expect(result).toEqual({ duration: 2, delay: 0.5 });
    });

    it('should parse negative numbers', () => {
      const result = parser.parse('{ x: -100, y: -50 }');

      expect(result).toEqual({ x: -100, y: -50 });
    });

    it('should parse null and undefined', () => {
      const result = parser.parse('{ a: null, b: undefined }');

      expect(result).toEqual({ a: null, b: undefined });
    });

    it('should parse strings with single quotes', () => {
      const result = parser.parse("{ ease: 'power2.out' }");

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should parse strings with double quotes', () => {
      const result = parser.parse('{ ease: "power2.out" }');

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should parse strings without quotes', () => {
      const result = parser.parse('{ ease: power2.out }');

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should handle whitespace', () => {
      const result = parser.parse('{  x:  "100%"  ,  y:  "-50%"  }');

      expect(result).toEqual({ x: '100%', y: '-50%' });
    });

    it('should parse nested objects', () => {
      const result = parser.parse('{ transform: { x: 100, y: 50 } }');

      expect(result).toEqual({ transform: { x: 100, y: 50 } });
    });

    it('should parse arrays', () => {
      const result = parser.parse('{ values: [1, 2, 3] }');

      expect(result).toEqual({ values: [1, 2, 3] });
    });

    it('should return empty object for empty input', () => {
      const result = parser.parse('{}');

      expect(result).toEqual({});
    });

    it('should return empty object for empty string', () => {
      const result = parser.parse('');

      expect(result).toEqual({});
    });

    it('should return empty object for invalid syntax', () => {
      const result = parser.parse('{ invalid }');

      expect(result).toEqual({});
    });

    it('should handle mixed types', () => {
      const result = parser.parse('{ x: "100%", duration: 2, yoyo: true, ease: power2.out }');

      expect(result).toEqual({
        x: '100%',
        duration: 2,
        yoyo: true,
        ease: 'power2.out',
      });
    });
  });
});
