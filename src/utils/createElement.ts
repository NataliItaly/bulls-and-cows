export type Attributes = Record<string, string>;

export default function createElement(
  tag: string,
  attributes: Attributes,
  text?: string,
): HTMLElement {
  const element: HTMLElement = document.createElement(tag);
  for (const [attr, value] of Object.entries(attributes)) {
    element.setAttribute(attr, value);
  }
  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}
