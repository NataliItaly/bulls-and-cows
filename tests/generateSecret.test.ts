import { describe, expect, it } from 'vitest';
import generateSecret from '../src/logic/generateSecret';

const values = [0.1, 0.2, 0.3, 0.4, 0.5];
const possibleDigits = '0123456789abcdefghijklmnopqrstuvwxyz';

describe('generateSecret', () => {
  it('should return a string of length 4 if parameter length is equal to 4', () => {
    const num = generateSecret(4, 5);
    expect(num).toHaveLength(4);
  });

  it('should return a string of length 6 if parameter length is equal to 6', () => {
    const num = generateSecret(6, 16);
    expect(num).toHaveLength(6);
  });

  it('should return the number of the specified base', () => {
    const numString = generateSecret(2, 10);
    const allowedDigits = possibleDigits.slice(0, 10);
    const result = numString.split('').every((el) => allowedDigits.includes(el));
    expect(result).toBe(true);
  });

  it('all digits of string result must be unique', () => {
    const numString = generateSecret(3, 7);
    const result = numString === String(new Set(numString));
    expect(result).toBe(true);
  });

  it('should include all available digits when length equals base', () => {
    const numString = generateSecret(7, 7);
    const allowedDigits = possibleDigits.slice(0, 7);
    const result = allowedDigits.split('').every((el) => numString.includes(el));
    expect(result).toBe(true);
  });

  it('should throw error if length is more than base', () => {
    expect(() => generateSecret(4, 3)).toThrowError();
  });

  it('should use the provided random function to generate a secret', () => {
    const base = 10;
    const length = 4;
    let step = 0;
    const random = (): number => values[step++];

    const numString = generateSecret(length, base, random);
    expect(step).toBe(length);
    expect(numString).toBe('1234');
  });
});
