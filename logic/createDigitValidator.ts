export default function createDigitValidator(base: number): (char: string) => boolean {
  return (char: string): boolean => char.length === base;
}
