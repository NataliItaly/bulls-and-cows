import { getGameState, setGameState } from '../logic/state.js';
import isValidGuess from '../logic/isValidGuess.js';
import evaluateGuess from '../logic/evaluateGuess.js';
import winnerScreen from '../ui/winnerScreen.js';
import calcDuration from './calcDuration.js';

export default function submitGameForm(el: HTMLFormElement): void {
  const gameState = getGameState();

  const formData = new FormData(el);
  const value: string = String(formData.get('game-input'));

  if (value) {
    if (isValidGuess(value, gameState.length, gameState.base)) {
      const { bulls, cows } = evaluateGuess(gameState.secret, value);

      const gameResultEl = document.querySelector('.game__result');
      if (gameResultEl) {
        gameResultEl.textContent = `Bulls: ${bulls}, Cows: ${cows}`;
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
  }
}
