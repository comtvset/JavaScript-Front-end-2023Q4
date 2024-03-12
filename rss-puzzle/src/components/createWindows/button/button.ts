export default class Button {
  loginWindowElement: HTMLDivElement;

  button: HTMLButtonElement;

  constructor(loginWindowElement: HTMLDivElement) {
    this.loginWindowElement = loginWindowElement;
    this.button = document.createElement('button');
    this.loginWindowElement = loginWindowElement;
    this.button.classList.add('button-style');
    loginWindowElement.appendChild(this.button);
  }

  addButton(
    buttonText: string,
    onClickHandler: () => void,
  ) {
    this.button.innerHTML = buttonText;
    this.button.addEventListener('click', onClickHandler);
  }

  setAtt() {
    this.button.setAttribute('disabled', 'disabled');
  }

  removeAtt() {
    this.button.removeAttribute('disabled');
  }
}
