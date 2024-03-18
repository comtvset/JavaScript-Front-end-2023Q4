export default class GreetingWindow {
  body: HTMLBodyElement | null;

  element: HTMLDivElement;

  constructor() {
    this.body = document.querySelector('body');
    if (this.body) {
      this.element = document.createElement('div');
      this.element.classList.add('greeting-window');
      this.body.appendChild(this.element);
    } else {
      throw new Error('Body element not found!');
    }
  }

  addElements() {
    const userDataString = localStorage.getItem('user');
    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    this.element.appendChild(wrap);

    const name = document.createElement('h2');
    wrap.appendChild(name);

    if (userDataString) {
      const userDataArray = JSON.parse(userDataString);
      const fulNameUser = userDataArray.join(' ');
      name.innerHTML = `Welcome ${fulNameUser} to Puzzle-Game!`;
    }

    const spanInfo = document.createElement('span');
    wrap.appendChild(spanInfo);
    spanInfo.innerHTML =
      'Get ready for an exciting challenge of your English language skills! In this game, your task is to assemble a sentence using the provided English words. Show off your language proficiency by crafting correct and interesting sentences. Good luck!';
  }

  getThisElement() {
    return this.element;
  }
}
