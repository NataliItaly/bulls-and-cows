export default function setErrorMessage(message: string): void {
  const errorEl = document.getElementById('error-message');
  if (errorEl) errorEl.textContent = message;
}
