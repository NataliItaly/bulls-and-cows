export default function calcCompletedAt(time: number): string {
  const date = new Date(time);
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}`;
}
