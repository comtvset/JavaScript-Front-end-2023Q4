export default class Button {
  loginWindowElement: HTMLDivElement;

  constructor(loginWindowElement: HTMLDivElement) {
    this.loginWindowElement = loginWindowElement;
  }

  addButton(
    loginWindowElement: HTMLElement,
    buttonText: string,
    onClickHandler: () => void,
  ) {
    const button = document.createElement('button');
    button.innerHTML = buttonText;
    button.addEventListener('click', onClickHandler);
    button.classList.add('button-style');
    loginWindowElement.appendChild(button);
  }
}
