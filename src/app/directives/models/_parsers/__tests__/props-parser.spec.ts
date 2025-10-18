import { PropsParser } from '../props-parser';

describe('PropsParser', () => {
  let parser: PropsParser;

  beforeEach(() => {
    parser = new PropsParser();
  });

  describe('parse()', () => {
    it('should parse single prop with string value', () => {
      const result = parser.parse('duration=2');

      expect(result).toEqual({ duration: 2 });
    });

    it('should parse multiple props', () => {
      const result = parser.parse('duration=2,yoyo=true');

      expect(result).toEqual({ duration: 2, yoyo: true });
    });

    it('should parse boolean true', () => {
      const result = parser.parse('yoyo=true');

      expect(result).toEqual({ yoyo: true });
    });

    it('should parse boolean false', () => {
      const result = parser.parse('repeat=false');

      expect(result).toEqual({ repeat: false });
    });

    it('should parse numeric values', () => {
      const result = parser.parse('duration=2,delay=0.5');

      expect(result).toEqual({ duration: 2, delay: 0.5 });
    });

    it('should parse string values with quotes', () => {
      const result = parser.parse('ease="power2.out"');

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should parse string values with single quotes', () => {
      const result = parser.parse("ease='power2.out'");

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should parse string values without quotes', () => {
      const result = parser.parse('ease=power2.out');

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should handle whitespace', () => {
      const result = parser.parse('duration = 2 , yoyo = true');

      expect(result).toEqual({ duration: 2, yoyo: true });
    });

    it('should return empty object for empty string', () => {
      const result = parser.parse('');

      expect(result).toEqual({});
    });

    it('should handle mixed types', () => {
      const result = parser.parse('duration=2,yoyo=true,ease="power2.out",repeat=false');

      expect(result).toEqual({
        duration: 2,
        yoyo: true,
        ease: 'power2.out',
        repeat: false,
      });
    });
  });
});
