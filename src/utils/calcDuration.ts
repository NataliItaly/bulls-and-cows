export default function calcDuration(start: number, end: number): string {
  const minutes = String(Math.floor((end - start) / 1000 / 60));
  const seconds = String(Math.floor((end - start) / 1000) % 60);
  return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}
