import carModel from './carModel';

export default class Car {
  contentWrap: HTMLDivElement;

  road: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.contentWrap = document.createElement('div');
    this.contentWrap.classList.add('content-wrap');
    parent.appendChild(this.contentWrap);

    this.road = document.createElement('div');
    this.road.classList.add('dashed-line');
    parent.appendChild(this.road);
  }

  createContent(carName: string, color: string, id: string): HTMLDivElement {
    const controlsWrap = document.createElement('div');
    controlsWrap.classList.add('content-wrap__controls');
    controlsWrap.setAttribute('id', `wrap${id}`);

    const controlsButton = document.createElement('div');
    controlsButton.classList.add('controls__button');
    const selectButton = document.createElement('button');
    selectButton.classList.add('select');
    selectButton.setAttribute('id', `select${id}`);
    selectButton.textContent = 'select';
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'remove';
    const carNameSpan = document.createElement('span');
    carNameSpan.classList.add('content-wrap__car-name');
    carNameSpan.setAttribute('id', `name${id}`);
    carNameSpan.textContent = carName;
    controlsButton.appendChild(selectButton);
    controlsButton.appendChild(removeButton);
    controlsButton.appendChild(carNameSpan);

    const controlsWrapInner = document.createElement('div');
    controlsWrapInner.classList.add('controls__wrap');

    const accelerator = document.createElement('div');
    accelerator.classList.add('accelerator');
    const buttonA = document.createElement('button');
    buttonA.textContent = 'A';
    const buttonB = document.createElement('button');
    buttonB.textContent = 'B';
    accelerator.appendChild(buttonA);
    accelerator.appendChild(buttonB);

    const car = document.createElement('div');
    car.classList.add('car');
    const carImg = document.createElement('div');
    const svgContent = carModel(id);
    carImg.innerHTML = svgContent;
    carImg.classList.add('car-img');
    car.appendChild(carImg);

    controlsWrapInner.appendChild(accelerator);
    controlsWrapInner.appendChild(car);

    const flagWrap = document.createElement('div');
    flagWrap.classList.add('content-wrap__flag');
    const flagImg = document.createElement('img');
    flagImg.src = './assets/flag.png';
    flagImg.alt = 'flag';
    flagImg.classList.add('flag-img');
    flagWrap.appendChild(flagImg);

    controlsWrap.appendChild(controlsButton);
    controlsWrap.appendChild(controlsWrapInner);
    this.contentWrap.appendChild(controlsWrap);
    this.contentWrap.appendChild(flagWrap);

    const carTest = document.getElementById(`car${id}`);
    if (carTest) {
      carTest.style.fill = color;
    }

    return this.contentWrap;
  }

  remove() {
    while (this.contentWrap.firstChild) {
      this.contentWrap.removeChild(this.contentWrap.firstChild);
    }
    this.contentWrap.remove();
    this.road.remove();
  }

  addHide() {
    this.contentWrap.classList.add('hideCar');
    this.road.classList.add('hideCar');
  }

  removeHide() {
    this.contentWrap.classList.remove('hideCar');
    this.road.classList.remove('hideCar');
  }
}
