import Car from '../models/car';
import fetchData from '../services/apiService';
import updateObjToBuffer from './buffer';
import checkNumberOfCars from './checkNumberOfCars';
import checkPagination from './checkPagination';
import removeCar from './removeCar';
import rgbToHex from './rgbToHex';
// import testRRR from './test404';

export default async function getCar(carWrap?: HTMLHeadingElement) {
  try {
    const garageData = await fetchData('garage', 'GET');
    if (carWrap) {
      for (const key of garageData) {
        const car = new Car(carWrap);

        car.createContent(key.name, key.color, key.id);

        checkNumberOfCars(car, true);
        checkPagination();

        const removeButtons = document.querySelectorAll('.remove');
        const curRemoveButton = removeButtons[removeButtons.length - 1];
        curRemoveButton.addEventListener('click', () => {
          car.remove();
          removeCar(key.id);
          // testRRR();
          checkNumberOfCars(car, false);
          checkPagination();
        });

        const selectButtons = document.querySelectorAll('.select');
        const curSelectButton = selectButtons[selectButtons.length - 1];

        curSelectButton.addEventListener('click', () => {
          const createTextInput = document.getElementById('update-text-input');
          const contentWrapWarName = document.getElementById(`name${key.id}`);
          const curCarName: string | undefined = contentWrapWarName?.innerHTML;

          createTextInput?.setAttribute('value', curCarName || '');

          const updateColorInput =
            document.getElementById('update-color-input');

          const wrapCar = document.getElementById(`wrap${key.id}`);
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

          updateObjToBuffer(key.name, key.color, key.id);
        });
      }
    }
  } catch (error) {
    console.error('show error: ', error);
  }
}
