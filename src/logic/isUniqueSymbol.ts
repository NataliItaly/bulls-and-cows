export default function isUniqueSymbol(char: string, value: string): boolean {
  return !value.includes(char);
}
