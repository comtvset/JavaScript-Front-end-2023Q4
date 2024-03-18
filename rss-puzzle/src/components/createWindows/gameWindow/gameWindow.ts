export default class GameWindow {
  body: HTMLBodyElement | null;

  element: HTMLDivElement;

  buttonsWrap: HTMLDivElement;

  block: HTMLDivElement;

  translate: HTMLDivElement;

  infoWrap: HTMLDivElement;

  guessWrap: HTMLDivElement;

  constructor() {
    this.body = document.querySelector('body');

    if (this.body) {
      this.element = document.createElement('div');
      this.element.classList.add('main-window');
      this.body.appendChild(this.element);

      this.infoWrap = document.createElement('div');
      this.infoWrap.classList.add('info-wrap');
      this.element.appendChild(this.infoWrap);


      this.guessWrap = document.createElement('div');
      this.guessWrap.classList.add('guess-wrap');
      this.element.appendChild(this.guessWrap);



      this.translate = document.createElement('div');
      this.translate.classList.add('translate');
      this.element.appendChild(this.translate);

      this.block = document.createElement('div');
      this.block.classList.add('guesses-block');
      this.element.appendChild(this.block);

      for (let i = 0; i < 10; i++) {
        const guess = document.createElement('div');
        guess.classList.add('guess');
        this.block.appendChild(guess);
        guess.setAttribute('id', `guess_${i + 1}`);
      }

      this.block = document.createElement('div');
      this.block.classList.add('source-block');
      this.element.appendChild(this.block);

      this.buttonsWrap = document.createElement('div');
      this.buttonsWrap.classList.add('buttons-wrap');
      this.element.appendChild(this.buttonsWrap);
    } else {
      throw new Error('Body element not found!');
    }
  }

  addWindow() {}

  getLoginWindowElement() {
    return this.element;
  }

  getButtonsWrap() {
    return this.buttonsWrap;
  }

  getInfoWrap() {
    return this.infoWrap;
  }

  getGuessWrap() {
    return this.guessWrap;
  }
}
