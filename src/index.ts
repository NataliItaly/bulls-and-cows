import createContainer from './ui/createContainer.js';
/* import countPossibleSecrets from './logic/countPossibleSecrets.js';
import generateSecret from './logic/generateSecret.js';
import { setGameState } from './logic/state.js'; */
import submitStartForm from './utils/submitStartForm.js';

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
}
