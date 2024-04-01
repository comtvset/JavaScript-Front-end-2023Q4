export default class Button {

  button: HTMLButtonElement;

  constructor(parent: HTMLDivElement) {
    this.button = document.createElement('button');
    this.button.classList.add('button-style');
    parent.appendChild(this.button);
  }

  addButton(buttonText: string, onClickHandler: () => void) {
    this.button.innerHTML = buttonText;
    this.button.addEventListener('click', onClickHandler);
    this.button.setAttribute('id', `${buttonText}`);
  }

  setDisabled() {
    this.button.setAttribute('disabled', 'disabled');
  }

  removeDisabled() {
    this.button.removeAttribute('disabled');
  }

  setID(id: string) {
    this.button.setAttribute('id', `${id}`);
  }
}
