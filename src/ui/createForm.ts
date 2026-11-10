import createElement from '../utils/createElement.js';

export default function createForm(): HTMLFormElement {
  const form: HTMLFormElement = createElement('form', { class: 'form' });
  const fieldset1 = createElement('fieldset', { class: 'fieldset' });
  const fieldsetTitle1 = createElement(
    'h3',
    { class: 'form__fieldset-title' },
    "Choose number's length and base",
  );
  fieldset1.append(fieldsetTitle1);

  ['length', 'system'].forEach((el) => {
    const formRow = createElement('div', { class: 'form__row' });
    const label = createElement(
      'label',
      { class: 'form__label', id: `${el}-label`, htmlFor: el },
      el,
    );
    const min = '2';
    const max = el === 'length' ? '6' : '36';
    const value = el === 'length' ? '4' : '10';
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
    form.append(fieldset1);
  });

  const fieldset2 = createElement('fieldset', { class: 'fieldset' });
  const fieldsetTitle2 = createElement(
    'h3',
    { class: 'form__fieldset-title' },
    'Or use quick settings',
  );
  fieldset2.append(fieldsetTitle2);

  ['bin', 'oct', 'dec', 'hex'].forEach((el) => {
    const formRow = createElement('div', { class: 'form__row' });
    const label = createElement(
      'label',
      { class: 'form__label', id: `${el}-label`, htmlFor: el },
      el,
    );
    const className = el === 'dec' ? 'form__row-btn, form__row-btn_active' : 'form__row-btn';
    const button = createElement(
      'button',
      {
        class: className,
        id: el,
        type: 'button',
      },
      el,
    );

    formRow.append(label, button);
    fieldset1.append(formRow);
    form.append(fieldset1);
  });

  const formButton = createElement(
    'button',
    {
      class: 'form__btn',
      id: 'form-btn',
      type: 'submit',
    },
    'Start Game',
  );

  form.append(formButton);

  return form;
}
