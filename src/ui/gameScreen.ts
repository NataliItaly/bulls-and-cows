import createElement from '../utils/createElement.js';
import { State, getGameState } from '../logic/state.js';

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

  const isDisabled: string = String(gameState.currentValue.length !== gameState.length);
  const formBtn = createElement(
    'button',
    {
      class: 'form__submit-btn',
      id: 'game-form-btn',
      type: 'submit',
      disabled: isDisabled,
    },
    'Check',
  );

  const resultEl = createElement('div', { class: 'game__result' });
  const resultRow = createElement('p', { class: 'game__result-row' });

  const results: (keyof State | 'num')[] = ['attempt', 'num', 'bulls', 'cows'];
  results.forEach((el) => {
    const numText =
      gameState.currentValue !== ''
        ? gameState.currentValue
        : Array.from({ length: gameState.length }, () => '-').join('');

    const text: string = el === 'num' ? numText : (gameState[el] as string);
    const resEl = createElement(
      'span',
      { class: `game__result-cell game__${el}` },
      `${el}: ${text}`,
    );
    resultRow.append(resEl);
  });
  resultEl.append(resultRow);

  const settingsBtn = createElement(
    'button',
    {
      class: 'form__btn form__btn-settings',
      id: 'settings-btn',
      type: 'button',
    },
    'Settings',
  );

  fieldset.append(legend, label, input, formBtn);
  screen.append(fieldset, resultEl, settingsBtn);

  return screen;
}
