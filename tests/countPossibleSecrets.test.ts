import { describe, expect, it } from 'vitest';
import countPossibleSecrets from '../src/logic/countPossibleSecrets';

describe('countPossibleSecrets', () => {
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
