import './css/style.css';

import createContainer from './ui/createContainer.js';
import submitStartForm from './utils/submitStartForm.js';
import startScreen from './ui/startScreen.js';
import leaderboardScreen from './ui/leaderboardScreen.js';

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
  });
}
