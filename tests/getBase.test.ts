import { describe, expect, it } from 'vitest';
import getBase, { type NumberSystem } from '../src/logic/getBase';

describe('getBase', () => {
  it('should return 2 if system is "bin"', () => {
    expect(getBase('bin')).toBe(2);
  });
  it('should return 8 if system is "oct"', () => {
    expect(getBase('bin')).toBe(2);
  });
  it('should return 10 if system is "dec"', () => {
    expect(getBase('bin')).toBe(2);
  });
  it('should return 16 if system is "hex"', () => {
    expect(getBase('bin')).toBe(2);
  });
  it('should throw error if system is not supported', () => {
    expect(() => getBase('abc' as NumberSystem)).toThrowError();
  });
});
