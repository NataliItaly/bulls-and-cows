import createContainer from './ui/createContainer.js';
import countPossibleSecrets from './logic/countPossibleSecrets.js';
import generateSecret from './logic/generateSecret.js';
import { setGameState } from './logic/state.js';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  const containerEl = createContainer();

  app.append(containerEl);

  containerEl.addEventListener('submit', function (e: SubmitEvent) {
    const targetEl = e.target;
    if (targetEl instanceof HTMLFormElement && targetEl.classList.contains('form')) {
      e.preventDefault();
      const formData = new FormData(targetEl);
      const length: number = Number(formData.get('length'));
      const base: number = Number(formData.get('base'));
      console.log(length, base);
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

      targetEl.remove();
    }
  });
}
