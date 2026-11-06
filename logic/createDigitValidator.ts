export default function createDigitValidator(base: number): (char: string) => boolean {
  const possibleDigits = '0123456789abcdefghijklmnopqrstuvwxyz';
  return (char: string): boolean => {
    const charToLowerCase = char.toLowerCase();
    const index = possibleDigits.indexOf(charToLowerCase);
    return charToLowerCase.length === 1 && index > -1 && base > index;
  };
}
