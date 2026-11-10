import createElement from '../utils/createElement.js';
import createForm from './createForm.js';

export default function createContainer() {
  const containerEl = createElement('div', { class: 'container' });
  const title = createElement('h1', {}, 'Bulls and cows');
  const formEl = createForm();
  containerEl.append(title, formEl);

  return containerEl;
}
