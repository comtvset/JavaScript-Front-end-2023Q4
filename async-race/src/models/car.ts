import carModel from './carModel';

export default class Car {
  contentWrap: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.contentWrap = document.createElement('div');
    this.contentWrap.classList.add('content-wrap');
    parent.appendChild(this.contentWrap);

    const road = document.createElement('div');
    road.classList.add('dashed-line');
    parent.appendChild(road);
  }

  createContent(carName: string, color: string, id: string): HTMLDivElement {
    const controlsWrap = document.createElement('div');
    controlsWrap.classList.add('content-wrap__controls');

    const controlsButton = document.createElement('div');
    controlsButton.classList.add('controls__button');
    const selectButton = document.createElement('button');
    selectButton.textContent = 'select';
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    const carNameSpan = document.createElement('span');
    carNameSpan.classList.add('content-wrap__car-name');
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
    // carImg.alt = 'car';
    // carImg.id = id;
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
}
