export default function calcDuration(time: number): string {
  console.log('calc duration', time);
  const minutes = String(Math.floor(time / 1000 / 60));
  const seconds = String(Math.floor((time / 1000) % 60));
  console.log(minutes, seconds);
  return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}
