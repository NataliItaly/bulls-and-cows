import createDigitValidator from './createDigitValidator.js';

export default function isValidGuess(guess: string, length: number, base: number): boolean {
  const hasCorrectLength = guess.length === length;
  const areUnique: boolean = new Set(guess).size === guess.length;

  const isValidDigit = createDigitValidator(base);
  const basedDigits: boolean = guess.split('').every((el) => isValidDigit(el));

  return hasCorrectLength && areUnique && basedDigits;
}
