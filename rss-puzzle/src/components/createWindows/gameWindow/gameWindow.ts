export default class GameWindow {
  body: HTMLBodyElement | null;

  block: HTMLDivElement;

  element: HTMLDivElement;

  constructor() {
    this.body = document.querySelector('body');

    if (this.body) {
      this.element = document.createElement('div');
      this.element.classList.add('main-window');
      this.body.appendChild(this.element);

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
    } else {
      throw new Error('Body element not found!');
    }
  }

  addWindow() {}
}
