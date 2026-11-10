import createElement from '../utils/createElement.js';
import { getGameState } from '../logic/state.js';

export default function gameScreen(): HTMLElement {
  const gameState = getGameState();

  const screen = createElement('form', { class: 'screen form form_game', id: 'game' });
  const fieldset = createElement('fieldset', { class: 'form__fieldset' });

  const legend = createElement(
    'legend',
    { class: 'form__legend' },
    `Length: ${gameState.length}, Base: ${gameState.base}`,
  );

  const label = createElement(
    'label',
    { class: 'form__label', htmlFor: 'game-input' },
    `Enter ${gameState.length} unique symbols`,
  );
  const input = createElement('input', {
    class: 'form__input',
    id: 'game-input',
    name: 'game-input',
    type: 'text',
    maxLength: String(gameState.length),
  });
  const formBtn = createElement(
    'button',
    {
      class: 'form__submit-btn',
      id: 'game-form-btn',
      type: 'submit',
    },
    'Check',
  );

  const settingsBtn = createElement(
    'button',
    {
      class: 'form__btn form__btn-settings',
      id: 'settings-btn',
      type: 'button',
    },
    'Settings',
  );

  const leaderboardBtn = createElement(
    'button',
    { class: 'leaderboard-btn', id: 'leaderboard-btn', type: 'button' },
    'Leaderboard',
  );

  fieldset.append(legend, label, input, formBtn);
  screen.append(fieldset, settingsBtn, leaderboardBtn);

  return screen;
}
