import { describe, expect, it } from 'vitest';
import createDigitValidator from '../logic/createDigitValidator';

describe('createDigitValidator', () => {
  it('should eccept valid decimal digit', () => {
    const isValidDigit = createDigitValidator(10);
    expect(isValidDigit('5')).toBe(true);
  });
  it('should reject invalid decimal digits', () => {
    const isValidDigit = createDigitValidator(10);

    expect(isValidDigit('A')).toBe(false);
  });

  it('should accept hexadecimal letters', () => {
    const isValidDigit = createDigitValidator(16);

    expect(isValidDigit('A')).toBe(true);
  });

  it('should be case-insensitive for hexadecimal digits', () => {
    const isValidDigit = createDigitValidator(16);

    expect(isValidDigit('a')).toBe(true);
    expect(isValidDigit('A')).toBe(true);
  });
});
