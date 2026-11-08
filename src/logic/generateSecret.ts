export default function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string {
  if (length > base) {
    throw new Error('Length must be less or equal than base');
  }

  let result: string = '';
  const possibleDigits: string = '0123456789abcdefghijklmnopqrstuvwxyz';
  let basePossibleDigits: string = possibleDigits.slice(0, base);

  for (let i = 0; i < length; i++) {
    const currentIndex: number = Math.floor(random() * basePossibleDigits.length);

    result += basePossibleDigits[currentIndex];

    const temp: string = basePossibleDigits
      .slice(0, currentIndex)
      .concat(basePossibleDigits.slice(currentIndex + 1));

    basePossibleDigits = temp;
  }
  return result;
}
