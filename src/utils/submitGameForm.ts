import { State, PreviousGame, getGameState, setGameState } from '../logic/state.js';
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
  const value: string = String(formData.get('game-input')).toLowerCase();

  if (value) {
    if (isValidGuess(value, gameState.length, gameState.base)) {
      if (gameState.currentAttempts.includes(value)) {
        el.reset();
        return;
      }
      //setGameState({ currentValue: value, currentAttempts: [...gameState.currentAttempts, value] });
      const { bulls, cows } = evaluateGuess(gameState.secret, value);
      setGameState({
        currentValue: value,
        currentAttempts: [...gameState.currentAttempts, value],
        bulls,
        cows,
      });

      const numText = value;
      const results: (keyof State | 'num')[] = ['attempt', 'num', 'bulls', 'cows'];
      const newGameState = getGameState();

      if (initialValue === '') {
        results.forEach((el) => {
          const resEl = document.querySelector(`.game__${el}`);
          if (resEl) {
            const text: string = el === 'num' ? numText : (newGameState[el] as string);
            resEl.textContent = `${el}: ${text}`;
          }
        });
      } else {
        const resultRow = createElement('p', { class: 'game__result-row' });
        results.forEach((el) => {
          const numText = value;

          const text: string = el === 'num' ? numText : (newGameState[el] as string);
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
        const startTime = newGameState.startTime;
        const endTime = Date.now();
        const duration = endTime - Number(startTime);
        const durationStr = calcDuration(duration);

        const winnerScreenEl = winnerScreen(durationStr);
        const container = document.querySelector('.container');
        if (container) {
          container.append(winnerScreenEl);
        }

        const { id, secret, length, base, attempt } = newGameState;
        const currentGame: PreviousGame = {
          id,
          secret,
          length,
          base,
          attempt,
          duration,
          completedAt: endTime,
        };
        setGameState({ previousGames: [...newGameState.previousGames, currentGame] });
      }
      // set bulls and cows too late
      //setGameState({ bulls, cows });
    }
    el.reset();
  }
}
