import { POSSIBLE_DIGITS } from './constants.js';

export default function createDigitValidator(base: number): (char: string) => boolean {
  return (char: string): boolean => {
    const charToLowerCase = char.toLowerCase();
    const index = POSSIBLE_DIGITS.indexOf(charToLowerCase);
    return charToLowerCase.length === 1 && index > -1 && base > index;
  };
}
