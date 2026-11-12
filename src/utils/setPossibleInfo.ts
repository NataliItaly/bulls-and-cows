export default function setPossibleInfo(count: number): void {
  const infoEl = document.querySelector('.form__info');
  if (infoEl) {
    infoEl.textContent = `Possible secrets ${count}`;
  }
}
