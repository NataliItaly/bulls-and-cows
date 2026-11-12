import createElement from '../utils/createElement.js';
import { constants } from '../logic/state.js';
import countPossibleSecrets from '../logic/countPossibleSecrets.js';

export default function startScreen(): HTMLFormElement {
  const form: HTMLFormElement = createElement('form', { class: 'screen form', id: 'start' });
  const fieldset1 = createElement('fieldset', { class: 'form__fieldset' });
  const fieldsetTitle1 = createElement(
    'h3',
    { class: 'form__fieldset-title' },
    "Choose number's length and base",
  );
  fieldset1.append(fieldsetTitle1);

  ['length', 'base'].forEach((el) => {
    const formRow = createElement('div', { class: 'form__row' });
    const label = createElement(
      'label',
      { class: 'form__label', id: `${el}-label`, htmlFor: el },
      el,
    );
    const min = '2';
    const max = el === 'length' ? '6' : '36';
    const value = el === 'length' ? String(constants.defaultLength) : String(constants.defaultBase);
    const input = createElement('input', {
      class: 'form__input',
      id: el,
      name: el,
      type: 'number',
      min,
      max,
      value,
    });

    formRow.append(label, input);
    fieldset1.append(formRow);
  });
  const errorMessage = createElement('p', { class: 'form__error', id: 'error-message' });
  fieldset1.append(errorMessage);

  const fieldset2 = createElement('fieldset', { class: 'form__fieldset' });
  const fieldsetTitle2 = createElement(
    'h3',
    { class: 'form__fieldset-title' },
    'Or use quick settings',
  );
  fieldset2.append(fieldsetTitle2);

  const formRow = createElement('div', { class: 'form__row form__btn-row' });
  ['bin', 'oct', 'dec', 'hex'].forEach((el) => {
    const className = el === 'dec' ? 'form__row-btn form__row-btn_active' : 'form__row-btn';
    const button = createElement(
      'button',
      {
        class: className,
        id: el,
        type: 'button',
      },
      el,
    );

    formRow.append(button);
  });
  fieldset2.append(formRow);

  const formBtn = createElement(
    'button',
    {
      class: 'form__submit-btn',
      id: 'form-btn',
      type: 'submit',
    },
    'Play',
  );

  const possibleSecretsNum = countPossibleSecrets(constants.defaultLength, constants.defaultBase);
  const info = createElement(
    'div',
    { class: 'form__info' },
    `Possible secrets ${possibleSecretsNum}`,
  );

  const leaderboardBtn = createElement(
    'button',
    { class: 'leaderboard__btn', type: 'button', id: 'leaderboard-btn' },
    'Leaderboard',
  );

  form.append(fieldset1, fieldset2, info, formBtn, leaderboardBtn);

  return form;
}
