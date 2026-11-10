import createElement from '../utils/createElement.js';
import createForm from './createForm.js';

export default function createContainer() {
  const containerEl = createElement('div', { class: 'container' });
  const formEl = createForm();
  containerEl.append(formEl);

  return containerEl;
}
