import createContainer from './ui/createContainer.js';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  const containerEl = createContainer();

  app.append(containerEl);
}
