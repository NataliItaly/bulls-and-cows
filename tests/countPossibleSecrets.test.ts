import { describe, expect, it } from 'vitest';
import countPossibleSecrets from '../src/logic/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it('should throw error if length or base is not integer', () => {
    expect(() => countPossibleSecrets(4.5, 10)).toThrowError();
    expect(() => countPossibleSecrets(4, 10.5)).toThrowError();
  });

  it('should throw error if length is negative', () => {
    expect(() => countPossibleSecrets(-3, 10)).toThrowError();
  });

  it('should throw error if length is more than base', () => {
    expect(() => countPossibleSecrets(12, 10)).toThrowError();
  });

  it('should throw error if base is less than 2 or more than 36', () => {
    expect(() => countPossibleSecrets(4, 1)).toThrowError();
    expect(() => countPossibleSecrets(4, 38)).toThrowError();
  });

  it('should return the number of available digits if length is 1', () => {
    const result = countPossibleSecrets(1, 10);
    expect(result).toBe(10);
  });

  it('should return the correct number of possible secrets', () => {
    const result = countPossibleSecrets(3, 4);
    expect(result).toBe(24);
  });

  it('should return the correct number of possible secrets when length equals base', () => {
    const result = countPossibleSecrets(4, 4);
    expect(result).toBe(24);
  });

  it('should include secrets starting with zero', () => {
    const result = countPossibleSecrets(2, 3);
    expect(result).toBe(6);
  });

  it('should calculate the number of possible secrets for base 16', () => {
    const result = countPossibleSecrets(2, 16);
    expect(result).toBe(240);
  });
});
