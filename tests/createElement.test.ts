import { describe, expect, it } from 'vitest';
import createElement from '../src/utils/createElement';

describe('createElement', () => {
  it('should return HTML element', () => {
    const result = createElement('div', { class: 'container' });
    expect(result).toBeInstanceOf(HTMLElement);
  });

  it('should create an element with the passed tag', () => {
    const result = createElement('div', { class: 'container' });
    expect(result.tagName).toBe('DIV');
  });

  it('should set the passed class attribute', () => {
    const result = createElement('div', { class: 'container' });
    expect(result.classList.contains('container')).toBe(true);
  });

  it('should set the passed id attribute', () => {
    const result = createElement('div', { id: 'container' });
    expect(result.id).toBe('container');
  });

  it('should set the passed text', () => {
    const result = createElement('div', { id: 'container' }, 'Hello');
    expect(result.textContent).toBe('Hello');
  });

  it('should create an element with empty textContent when text is omitted', () => {
    const result = createElement('div', { id: 'container' });
    expect(result.textContent).toBe('');
  });

  it('should return element with empty string', () => {
    const result = createElement('div', { id: 'container' }, '');
    expect(result.textContent).toBe('');
  });

  it('should return element without attributes', () => {
    const result = createElement('div', {});
    expect(result.attributes).toHaveLength(0);
  });
});
