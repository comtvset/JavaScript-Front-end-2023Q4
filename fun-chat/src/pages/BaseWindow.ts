export default class Page {
  element: HTMLDivElement;

  constructor(parent: HTMLBodyElement | HTMLDivElement, divClass: string) {
    if (parent) {
      this.element = document.createElement('div');
      this.element.classList.add(divClass);
      parent.appendChild(this.element);
    } else {
      throw new Error('Body element not found!');
    }
  }

  addSpan(spanText: string, spanId: string, spanClass: string) {
    const span = document.createElement('span');
    span.innerHTML = spanText;
    span.classList.add(spanClass);
    span.setAttribute('id', spanId);
    this.element.appendChild(span);
  }

  addButton(
    buttonText: string,
    buttonClass: string,
    buttonId: string,
    event: string,
    onClickHandler: () => void,
    typeButton?: string,
  ) {
    const button = document.createElement('button');
    button.innerHTML = buttonText;
    button.setAttribute('id', buttonId);
    button.classList.add(buttonClass);
    if (typeButton) {
      button.setAttribute('type', typeButton);
    }
    this.element.appendChild(button);
    button.addEventListener(event, onClickHandler);
  }

  addInput(
    inputId: string,
    inputType: string,
    inputPlaceholder?: string,
    inputTitle?: string,
    inputClass?: string,
    labelText?: string,
    labelClass?: string,
  ) {
    const label = document.createElement('label');
    if (labelText && labelClass) {
      label.innerHTML = labelText;
      label.classList.add(labelClass);
    }
    label.setAttribute('for', inputId);
    const input = document.createElement('input');
    input.setAttribute('id', inputId);
    input.setAttribute('name', inputId);
    input.setAttribute('type', inputType);
    if (inputPlaceholder) {
      input.setAttribute('placeholder', inputPlaceholder);
    }
    if (inputTitle && inputClass) {
      input.setAttribute('title', inputTitle);
      input.classList.add(inputClass);
      input.minLength = 3;
      input.required = true;
    }

    this.element.appendChild(label);
    this.element.appendChild(input);
  }

  addLink(linkText: string, link: string, linkClass: string) {
    const a = document.createElement('a');
    a.innerHTML = linkText;
    a.classList.add(linkClass);
    a.setAttribute('href', link);
    this.element.appendChild(a);
  }

  getClass() {
    return this.element;
  }
}
