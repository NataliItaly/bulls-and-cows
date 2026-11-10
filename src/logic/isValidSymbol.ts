import { POSSIBLE_DIGITS } from './constants.js';

export default function isValidSymbol(char: string, base: number): boolean {
  return POSSIBLE_DIGITS.slice(0, base).includes(char);
}
