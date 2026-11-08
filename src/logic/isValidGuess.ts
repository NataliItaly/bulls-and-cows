export default function isValidGuess(guess: string, length: number, base: number): boolean {
  const areUnique: boolean = new Set(guess).size === length;
  const possibleDigits: string = '0123456789abcdefghijklmnopqrstuvwxyz';
  const currentDigits = possibleDigits.slice(0, base);
  const basedDigits: boolean = guess.split('').every((el) => currentDigits.includes(el));

  return areUnique && basedDigits;
}
