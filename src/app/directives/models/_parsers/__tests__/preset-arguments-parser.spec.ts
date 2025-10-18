import { PresetArgumentsParser } from '../preset-arguments-parser';

describe('PresetArgumentsParser', () => {
  let parser: PresetArgumentsParser;

  beforeEach(() => {
    parser = new PresetArgumentsParser();
  });

  describe('parse()', () => {
    it('should parse and normalize object string', () => {
      const result = parser.parse('{ x: "100%" }');

      expect(result).toBe('{ x: "100%" }');
    });

    it('should parse object with multiple properties', () => {
      const result = parser.parse('{ x: "100%", duration: 2 }');

      expect(result).toContain('x: "100%"');
      expect(result).toContain('duration: 2');
    });

    it('should normalize single quotes to double quotes', () => {
      const result = parser.parse("{ x: '100%' }");

      expect(result).toContain('"100%"');
    });

    it('should handle numeric values', () => {
      const result = parser.parse('{ duration: 2, delay: 0.5 }');

      expect(result).toContain('duration: 2');
      expect(result).toContain('delay: 0.5');
    });

    it('should handle boolean values', () => {
      const result = parser.parse('{ yoyo: true, repeat: false }');

      expect(result).toContain('yoyo: true');
      expect(result).toContain('repeat: false');
    });

    it('should return empty string for empty object', () => {
      const result = parser.parse('{}');

      expect(result).toBe('');
    });

    it('should return empty string for invalid syntax', () => {
      const result = parser.parse('{ invalid syntax }');

      expect(result).toBe('');
    });

    it('should handle whitespace', () => {
      const result = parser.parse('{  x:  "100%"  }');

      expect(result).toContain('x: "100%"');
    });
  });
});
