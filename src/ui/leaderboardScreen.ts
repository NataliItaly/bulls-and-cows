import createElement from '../utils/createElement.js';
import { getGameState, type PreviousGame } from '../logic/state.js';

export default function leaderboardScreen(): HTMLElement {
  const gameState = getGameState();
  const previousGames = gameState.previousGames;

  const screen = createElement('div', { class: 'screen leaderboard', id: 'leaderboard' });
  const title = createElement('h2', { class: 'leaderboard__title' }, 'Winners');
  const screenInner = createElement('div', { class: 'leaderboard__inner' });

  if (previousGames.length === 0) {
    screenInner.textContent = 'There is no winners yet';
  }

  previousGames.forEach((game: PreviousGame) => {
    const screenRow = createElement('div', {
      class: 'leaderboard__row',
      id: game.id,
    });
    const gameInfo: (keyof PreviousGame)[] = [
      'id',
      'secret',
      'base',
      'attempt',
      'duration',
      'completedAt',
    ];
    gameInfo.forEach((el) => {
      const screenCell = createElement(
        'span',
        {
          class: 'leaderboard__cell',
        },
        String(game[el]),
      );
      screenRow.append(screenCell);
    });
    screenInner.append(screenRow);
  });

  const settingsBtn = createElement(
    'button',
    {
      class: 'form__btn form__btn-settings',
      id: 'settings-btn',
      type: 'button',
    },
    'Start Game',
  );

  screen.append(title, screenInner, settingsBtn);

  return screen;
}
