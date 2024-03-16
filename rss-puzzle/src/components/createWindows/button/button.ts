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

  changeText(text: string) {
    this.button.innerText = text;
  }

  onClick(handler: () => void) {
    this.button.addEventListener('click', handler);
  }

  setAtt() {
    this.button.setAttribute('disabled', 'disabled');
  }

  removeAtt() {
    this.button.removeAttribute('disabled');
  }

  setID(id: string) {
    this.button.setAttribute('id', `${id}`);
  }

  // listener() {
  //   this.button.addEventListener('click', function () {});
  // }
}
