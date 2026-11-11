import { State, getGameState, setGameState } from '../logic/state.js';
import isValidGuess from '../logic/isValidGuess.js';
import evaluateGuess from '../logic/evaluateGuess.js';
import winnerScreen from '../ui/winnerScreen.js';
import calcDuration from './calcDuration.js';
import createElement from './createElement.js';

export default function submitGameForm(el: HTMLFormElement): void {
  const gameState = getGameState();
  const initialValue = gameState.currentValue;

  const currentAttempt = gameState.attempt + 1;
  setGameState({ attempt: currentAttempt });

  const formData = new FormData(el);
  const value: string = String(formData.get('game-input'));

  if (value) {
    if (isValidGuess(value, gameState.length, gameState.base)) {
      setGameState({ currentValue: value });
      const { bulls, cows } = evaluateGuess(gameState.secret, value);

      const numText = value;
      const results: (keyof State | 'num')[] = ['attempt', 'num', 'bulls', 'cows'];

      if (initialValue === '') {
        results.forEach((el) => {
          const resEl = document.querySelector(`.game__${el}`);
          if (resEl) {
            const text: string = el === 'num' ? numText : (gameState[el] as string);
            resEl.textContent = `${el}: ${text}`;
          }
        });
      } else {
        const resultRow = createElement('p', { class: 'game__result-row' });
        results.forEach((el) => {
          const numText = value;

          const text: string = el === 'num' ? numText : (gameState[el] as string);
          const resEl = createElement(
            'span',
            { class: `game__result-cell game__${el}` },
            `${el}: ${text}`,
          );
          resultRow.append(resEl);
        });

        const resultEl = document.querySelector('.game__result');
        if (resultEl) resultEl.prepend(resultRow);
      }

      if (bulls === gameState.length) {
        const startTime = gameState.startTime;
        const endTime = Date.now();
        const time = calcDuration(startTime as number, endTime);

        const winnerScreenEl = winnerScreen(time);
        const container = document.querySelector('.container');
        if (container) {
          container.append(winnerScreenEl);
        }
      }

      setGameState({ bulls, cows });
    }
    el.reset();
  }
}
