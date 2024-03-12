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
      name.innerHTML = `Hello ${fulNameUser}!`;
    }

    const spanInfo = document.createElement('span');
    wrap.appendChild(spanInfo);
    spanInfo.innerHTML =
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi atque libero repudiandae. Eveniet perferendis maiores rerum voluptas eligendi, sed ab quis architecto ad, quia aspernatur laborum repellat quas incidunt impedit.';
  }

  getThisElement() {
    return this.element;
  }
}
