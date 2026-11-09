export type Attributes = Record<string, string>;

export default function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes: Attributes,
  text?: string,
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  for (const [attr, value] of Object.entries(attributes)) {
    element.setAttribute(attr, value);
  }
  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}
