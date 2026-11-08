export interface BullsAndCows {
  bulls: number;
  cows: number;
}

export default function evaluateGuess(secret: string, guess: string): BullsAndCows {
  const bulls: number = secret
    .split('')
    .filter((el: string, i: number) => guess.indexOf(el) === i).length;
  const cows: number = secret
    .split('')
    .filter((el: string, i: number) => guess.includes(el) && guess.indexOf(el) !== i).length;

  return { bulls, cows };
}
