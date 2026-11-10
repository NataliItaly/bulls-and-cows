import './css/style.css';

import createContainer from './ui/createContainer.js';
import submitStartForm from './utils/submitStartForm.js';
import startScreen from './ui/startScreen.js';
import leaderboardScreen from './ui/leaderboardScreen.js';
import { getGameState, setGameState } from './logic/state.js';
//import generateSecret from './logic/generateSecret.js';
import countPossibleSecrets from './logic/countPossibleSecrets.js';
import { BASES } from './logic/getBase.js';
import setErrorMessage from './utils/setErrorMessage.js';
import isNumberSystem from './utils/isNumberSystem.js';
import setPossibleInfo from './utils/setPossibleInfo.js';
import isValidSymbol from './logic/isValidSymbol.js';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  const containerEl = createContainer();

  app.append(containerEl);

  containerEl.addEventListener('submit', function (e: SubmitEvent) {
    const targetEl = e.target;
    if (targetEl instanceof HTMLFormElement && targetEl.classList.contains('form')) {
      e.preventDefault();
      submitStartForm(targetEl);
    }
  });

  containerEl.addEventListener('input', function (e: InputEvent): void {
    const targetEl = e.target;
    if (targetEl instanceof HTMLInputElement && targetEl.classList.contains('form__input')) {
      if (targetEl.name === 'length') {
        const length = Number(targetEl.value);
        const base = getGameState().base;

        if (base) {
          const possibleSecrets = countPossibleSecrets(length, base);
          setPossibleInfo(possibleSecrets);
          setGameState({ possibleSecrets });
        }
        setGameState({ length: length });
      }

      if (targetEl.name === 'base') {
        const base = Number(targetEl.value);
        const length = getGameState().length;

        const baseValues = Object.values(BASES);
        const baseBtns = document.querySelectorAll('.form__row-btn');
        if (baseBtns) {
          baseBtns.forEach((btn) => btn.classList.remove('form__row-btn_active'));
        }
        if (baseValues.includes(Number(targetEl.value))) {
          const index = baseValues.indexOf(Number(targetEl.value));
          baseBtns[index].classList.add('form__row-btn_active');
        }

        if (length) {
          const possibleSecrets = countPossibleSecrets(length, base);
          setGameState({ possibleSecrets });
          setPossibleInfo(possibleSecrets);
        }
        setGameState({ base: base });
      }

      setErrorMessage('');
    }
    if (targetEl instanceof HTMLInputElement && targetEl.id === 'game-input') {
      const gameState = getGameState();
      const value = targetEl.value;
      const validValue = value
        .split('')
        .filter((char) => isValidSymbol(char, gameState.base))
        .join('');
      targetEl.value = validValue;
    }
  });

  containerEl.addEventListener('click', function (e: MouseEvent) {
    const targetEl = e.target;
    if (targetEl instanceof HTMLButtonElement && targetEl.id === 'settings-btn') {
      const gameScreen = document.getElementById('game');
      if (gameScreen) gameScreen.remove();

      const leaderboardScreen = document.getElementById('leaderboard');
      if (leaderboardScreen) leaderboardScreen.remove();

      const startScreenEl = startScreen();
      containerEl.append(startScreenEl);
    }

    if (targetEl instanceof HTMLButtonElement && targetEl.id === 'leaderboard-btn') {
      const leaderboardEl = leaderboardScreen();
      const startScreen = document.getElementById('start');
      if (startScreen) startScreen.remove();

      const gameScreen = document.getElementById('game');
      if (gameScreen) gameScreen.remove();

      containerEl.append(leaderboardEl);
    }

    if (e.target instanceof HTMLButtonElement && e.target.classList.contains('form__row-btn')) {
      const baseBtns = document.querySelectorAll('.form__row-btn');
      baseBtns.forEach((btn) => btn.classList.remove('form__row-btn_active'));

      e.target.classList.add('form__row-btn_active');
      const baseSystem = e.target.id;

      if (isNumberSystem(baseSystem)) {
        const base = BASES[baseSystem];

        const baseInput = document.getElementById('base');
        if (baseInput instanceof HTMLInputElement) {
          baseInput.value = String(base);
          setGameState({ base });
        }

        const lengthInput = document.getElementById('length');
        if (lengthInput instanceof HTMLInputElement) {
          if (Number(lengthInput.value) > base) {
            lengthInput.value = String(base);
          }

          const length = Number(lengthInput.value);
          const possibleSecrets = countPossibleSecrets(length, base);
          setGameState({ length, possibleSecrets });
          setPossibleInfo(possibleSecrets);
        }
      }
    }
  });
}
