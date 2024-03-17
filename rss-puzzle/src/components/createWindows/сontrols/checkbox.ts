export default class Checkbox {
  element: HTMLDivElement;

  checkbox: HTMLInputElement;

  constructor(element: HTMLDivElement) {
    this.element = element;
    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    element.appendChild(this.checkbox);
  }

  setLabel(text: string) {
    const label = document.createElement('label');
    label.textContent = text;
    label.appendChild(this.checkbox);
    this.element.appendChild(label);
  }

  setID(id: string) {
    this.checkbox.id = id;
  }

  setHide() {
    const test = document.querySelector('.translate');
    if (test && true) {
      test.classList.add('hide');
    }
  }

  getState() {
    return this.checkbox.checked;
  }

  onChange(callback: (checked: boolean) => void) {
    this.checkbox.addEventListener('change', () => {
      callback(this.checkbox.checked);
    });
  }
}
