import createElement from '../utils/createElement.js';
import { getGameState } from '../logic/state.js';

export default function winnerScreen(time: string): HTMLElement {
  const screen = createElement('div', { class: 'winner', id: 'winner' });
  const screenInner = createElement('div', { class: 'winner__inner' });

  const title = createElement('h2', { class: 'winner__title' }, 'You are win!');
  const secret = createElement(
    'p',
    { class: 'winner__number' },
    `Number: ${getGameState().secret}`,
  );

  const attempts = createElement(
    'p',
    { class: 'winner__attempts' },
    `Attempts: ${getGameState().attempt}`,
  );

  const timeStr = createElement('p', { class: 'winner__time' }, `Time: ${time}`);

  const settingsBtn = createElement(
    'button',
    {
      class: 'form__btn form__btn-settings winner__btn',
      id: 'settings-btn',
      type: 'button',
    },
    'Start Game',
  );

  const leaderboardBtn = createElement(
    'button',
    { class: 'leaderboard__btn', type: 'button', id: 'leaderboard-btn' },
    'Leaderboard',
  );

  screenInner.append(title, secret, attempts, timeStr, settingsBtn, leaderboardBtn);
  screen.append(screenInner);
  return screen;
}
