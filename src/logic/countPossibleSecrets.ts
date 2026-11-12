import setErrorMessage from '../utils/setErrorMessage.js';

const cache = new Map<string, number>();

function countInner(length: number, base: number): number {
  if (length === 0) {
    return 1;
  }
  if (length === 1) {
    return base;
  }

  const key = `${length}:${base}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const result = base * countInner(length - 1, base - 1);
  cache.set(key, result);
  return result;
}

export default function countPossibleSecrets(length: number, base: number): number {
  if (!Number.isInteger(length) || !Number.isInteger(base)) {
    setErrorMessage('Length and base must be integers');
    throw new Error('Length and base must be integers');
  }
  if (length < 0) {
    setErrorMessage('Length must be non negative integer');
    throw new Error('Length must be non negative integer');
  }
  if (length > base) {
    setErrorMessage('Length must be less or equal to base');
    throw new Error('Length must be less or equal to base');
  }
  if (base < 2 || base > 36) {
    setErrorMessage('Base must be between 2 and 36');
    throw new Error('Base must be between 2 and 36');
  }

  setErrorMessage('');
  return countInner(length, base);
}
