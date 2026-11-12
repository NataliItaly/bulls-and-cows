import createElement from '../utils/createElement.js';
import startScreen from './startScreen.js';

export default function createContainer() {
  const containerEl = createElement('div', { class: 'container' });
  const title = createElement('h1', {}, 'Bulls and cows');
  const startScreenEl = startScreen();
  containerEl.append(title, startScreenEl);

  return containerEl;
}
