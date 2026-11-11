import createElement from '../utils/createElement.js';
import { getGameState, type PreviousGame } from '../logic/state.js';
import calcDuration from '../utils/calcDuration.js';
import calcCompletedAt from '../utils/calcCompletedAt.js';

export default function leaderboardScreen(): HTMLElement {
  const gameState = getGameState();
  const previousGames = gameState.previousGames;

  const screen = createElement('div', { class: 'screen leaderboard', id: 'leaderboard' });
  const title = createElement('h2', { class: 'leaderboard__title' }, 'Winners');
  const screenInner = createElement('div', { class: 'leaderboard__inner' });

  if (previousGames.length === 0) {
    screenInner.textContent = 'There is no winners yet';
  }

  const gameInfo: (keyof PreviousGame)[] = ['secret', 'base', 'attempt', 'duration', 'completedAt'];
  const headerRow = createElement('div', {
    class: 'leaderboard__row leaderboard__header-row',
  });
  gameInfo.forEach((el) => {
    const text = el === 'completedAt' ? 'date' : el;
    const screenCell = createElement(
      'span',
      {
        class: 'leaderboard__header-cell',
      },
      text,
    );
    headerRow.append(screenCell);
  });
  screenInner.append(headerRow);

  previousGames.forEach((game: PreviousGame) => {
    const screenRow = createElement('div', {
      class: 'leaderboard__row',
      id: game.id,
    });

    gameInfo.forEach((el) => {
      const text =
        el === 'duration'
          ? calcDuration(game.duration)
          : el === 'completedAt'
            ? calcCompletedAt(game.completedAt)
            : String(game[el]);
      const screenCell = createElement(
        'span',
        {
          class: 'leaderboard__cell',
        },
        text,
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
