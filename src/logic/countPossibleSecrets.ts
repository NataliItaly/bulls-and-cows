const cache = new Map<string, number>();

export default function countPossibleSecrets(length: number, base: number): number {
  if (!Number.isInteger(length) || !Number.isInteger(base)) {
    throw new Error('Length and base must be integers');
  }
  if (length < 0) {
    throw new Error('Length must be non negative integer');
  }
  if (length > base) {
    throw new Error('Length must be less or equal to base');
  }
  if (base < 2 || base > 36) {
    throw new Error('Base must be between 2 and 36');
  }

  if (length === 0) {
    return 1;
  }
  if (length === 1) {
    return base;
  }

  const key = `${length}:${base}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const result = base * countPossibleSecrets(length - 1, base - 1);
  cache.set(key, result);
  return result;
}
