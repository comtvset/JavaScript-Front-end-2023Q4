export default class Form {
  form: HTMLFormElement;

  constructor(parent: HTMLDivElement) {
    this.form = document.createElement('form');
    parent.appendChild(this.form);
  }

  createInput(type: string, id: string, className: string, value?: string) {
    const label = document.createElement('label');
    this.form.appendChild(label);
    label.setAttribute('for', id);

    const input = document.createElement('input');
    this.form.appendChild(input);
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('name', id);
    input.setAttribute('required', '');
    if (value) {
      input.setAttribute('value', value);
    }
    input.classList.add(className);
  }

  addButton(buttonText: string, onClickHandler: () => void) {
    const button = document.createElement('input');
    this.form.appendChild(button);
    button.setAttribute('type', 'submit');
    button.setAttribute('value', buttonText);
    button.addEventListener('click', onClickHandler);
    this.form.setAttribute('id', buttonText.toLocaleLowerCase());
  }
}
