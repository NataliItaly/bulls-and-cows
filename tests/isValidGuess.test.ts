import { describe, expect, it } from 'vitest';
import isValidGuess from '../src/logic/isValidGuess';

describe('isValidGuess', () => {
  it('should return false if guess number length is not equal to length', () => {
    const result = isValidGuess('123456', 4, 10);
    expect(result).toBe(false);
  });

  it('should return false if guess does not contain unique digits', () => {
    const result = isValidGuess('1224', 4, 10);
    expect(result).toBe(false);
  });

  it('should return false if guess does not contain unique letters', () => {
    const result = isValidGuess('a1ff', 4, 16);
    expect(result).toBe(false);
  });

  it('should return false if guess contains digits outside the specified base', () => {
    const result = isValidGuess('1345', 4, 4);
    expect(result).toBe(false);
  });

  it('should return false if guess contains letters outside the specified base', () => {
    const result = isValidGuess('123456e', 7, 10);
    expect(result).toBe(false);
  });

  it('should return false if guess is empty string', () => {
    const result = isValidGuess('', 3, 10);
    expect(result).toBe(false);
  });

  it('should return true if guess has unique digits, length and base', () => {
    const result = isValidGuess('1234', 4, 10);
    expect(result).toBe(true);
  });

  it('should return correct result with leading zero', () => {
    const result = isValidGuess('01234', 5, 10);
    expect(result).toBe(true);
  });

  it('should return correct result if guess contains letters in the specified base', () => {
    const result = isValidGuess('a12f', 4, 16);
    expect(result).toBe(true);
  });

  it('should return correct result if guess contains letters in upper case', () => {
    const result = isValidGuess('A12F', 4, 16);
    expect(result).toBe(true);
  });
});
