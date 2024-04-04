import Car from '../models/car';
import fetchData from '../services/apiService';
import updateObjToBuffer from './buffer';
import checkNumberOfCars from './checkNumberOfCars';
import checkPagination from './checkPagination';
import getNumberOfCars from './getNumberOfCars';
import removeCar from './removeCar';
import rgbToHex from './rgbToHex';
import readyRace from './startRace';

const carName = ['Opel', 'Subaru', 'Ford', 'Audi', 'BMW', 'Mercedes', 'Skoda', 'Fiat', 'Lexus', 'Volvo', 'Porsche', 'Nissan'];
const carModel = ['SuperB', 'Impreza', 'Mondeo', 'A6', 'M5', 'Spriner', 'Punto', 'RX', 'XC90', '911', 'Almera'];

function getRandomElementFromArray<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
function generateRandomId(newID: number[]): number {
  let newId: number;
  do {
    newId = Math.floor(Math.random() * 1000) + 1;
  } while (newID.includes(newId));
  return newId;
}

function generateRandomColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const hex = (x: number) => {
    const hexValue = x.toString(16);
    return hexValue.length === 1 ? '0' + hexValue : hexValue;
  };

  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

export async function generateCars(count: number) {
  try {
    const garageData = await fetchData('garage', 'GET');
    const newID: number[] = garageData.map((item: { id: number }) => item.id);

    for (let i = 1; i <= count; i++) {
      const newId = generateRandomId(newID);

      const randomCarName = getRandomElementFromArray(carName);
      const randomCarModel = getRandomElementFromArray(carModel);

      const newCar = {
        name: `${randomCarName} ${randomCarModel}`,
        color: generateRandomColor(),
        id: newId,
      };

      await fetchData('garage', 'POST', newCar);

      newID.push(newId);

      const numberOfCars = garageData.length;
      const carWrap = document.querySelector('.car-wrap');
      const garageNumber = document.querySelector('.garage-number');

      if (carWrap instanceof HTMLDivElement) {
        const car = new Car(carWrap);
        car.createContent(newCar.name, newCar.color, String(newId));

        checkNumberOfCars(car, true);
        checkPagination();
        readyRace(newId);

        const removeButtons = document.querySelectorAll('.remove');
        const curRemoveButton = removeButtons[removeButtons.length - 1];
        curRemoveButton.addEventListener('click', () => {
          car.remove();
          removeCar(newId);
          checkNumberOfCars(car, false);
          checkPagination();
        });

        const selectButtons = document.querySelectorAll('.select');
        const curSelectButton = selectButtons[selectButtons.length - 1];

        curSelectButton.addEventListener('click', () => {
          const update = document.querySelector('.update-wrap');
          update?.classList.remove('disabled');

          const contentWrapWarName = document.getElementById(`name${newId}`);
          const curCarName: string | undefined = contentWrapWarName?.innerHTML;

          const createTextInput = document.getElementById('update-text-input');
          createTextInput?.setAttribute('value', curCarName || '');

          const updateColorInput =
            document.getElementById('update-color-input');

          const wrapCar = document.getElementById(`wrap${newId}`);
          let newColorCar;
          if (wrapCar && wrapCar.childNodes[0] && !newColorCar) {
            const targetElement =
              wrapCar.childNodes[1].childNodes[1].childNodes[0].childNodes[1]
                .childNodes[3];

            if (targetElement instanceof SVGGElement) {
              newColorCar = targetElement.style.fill;
            }
          }

          const rgbColor = String(newColorCar);
          const hexColor = rgbToHex(rgbColor);

          updateColorInput?.setAttribute('value', hexColor || '');

          updateObjToBuffer(newCar.name, newCar.color, newId);
        });

        getNumberOfCars(garageNumber as HTMLSpanElement);
        if (garageNumber) {
          garageNumber.innerHTML = `${numberOfCars + 1}`;
        }
      }
    }
  } catch (error) {
    console.error('error');
  }
}
