import { POSSIBLE_DIGITS } from './constants.js';

export default function isValidGuess(guess: string, length: number, base: number): boolean {
  const hasCorrectLength = guess.length === length;
  const areUnique: boolean = new Set(guess).size === guess.length;
  const currentDigits = POSSIBLE_DIGITS.slice(0, base);
  const basedDigits: boolean = guess
    .split('')
    .every((el) => currentDigits.includes(el.toLowerCase()));

  return hasCorrectLength && areUnique && basedDigits;
}
