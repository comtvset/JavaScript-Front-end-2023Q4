export default class LoginWindow {
  body: HTMLBodyElement | null;

  element: HTMLDivElement;

  constructor() {
    this.body = document.querySelector('body');
    if (this.body) {
      this.element = document.createElement('div');
      this.element.classList.add('login-window');
      this.body.appendChild(this.element);
    } else {
      throw new Error('Body element not found!');
    }
  }

  addField(labelText: string, inputId: string) {
    const label = document.createElement('label');
    label.innerHTML = labelText;
    label.setAttribute('for', inputId);
    label.classList.add('label-login');
    const input = document.createElement('input');
    input.setAttribute('id', inputId);
    input.setAttribute('name', inputId);
    input.setAttribute('title', 'Please use English characters only and first letter have to Uppercase');
    input.classList.add('input-login');
    input.minLength = 3;
    input.required = true;
    this.element.appendChild(label);
    this.element.appendChild(input);
  }

  getLoginWindowElement() {
    return this.element;
  }
}
