import { setGameState } from '../logic/state.js';
import generateSecret from '../logic/generateSecret.js';
import countPossibleSecrets from '../logic/countPossibleSecrets.js';
import gameScreen from '../ui/gameScreen.js';

export default function submitStartForm(el: HTMLFormElement) {
  const formData = new FormData(el);
  const length: number = Number(formData.get('length'));
  const base: number = Number(formData.get('base'));

  const errorEl = document.getElementById('error-message');
  if (length > base) {
    if (errorEl) {
      errorEl.textContent = 'Length must be less or equal to base';
      return;
    }
  }
  if (length < 2 || length > 6) {
    if (errorEl) {
      errorEl.textContent = 'Length must have range from 2 to 6';
      return;
    }
  }
  if (base < 2 || base > 36) {
    if (errorEl) {
      errorEl.textContent = 'Base must be more than 1 and less than 37';
      return;
    }
  }
  const secret: string = generateSecret(length, base);
  const possibleSecrets: number = countPossibleSecrets(length, base);
  const id: string = crypto.randomUUID();
  const startTime: number = Date.now();

  setGameState({ id, secret, length, base, possibleSecrets, startTime });

  el.remove();

  const gameScreenEl = gameScreen();
  const container = document.querySelector('.container');
  if (container) container.append(gameScreenEl);
}
