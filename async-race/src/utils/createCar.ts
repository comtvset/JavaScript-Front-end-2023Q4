import Car from '../models/car';
import fetchData from '../services/apiService';
import updateObjToBuffer, { getCarFormBuffer } from './buffer';
import checkNumberOfCars from './checkNumberOfCars';
import checkPagination from './checkPagination';
import getNumberOfCars from './getNumberOfCars';
import removeCar from './removeCar';
import rgbToHex from './rgbToHex';
// import testRRR from './test404';
import updateCar from './updateCar';

interface ICar {
  name: string;
  color: string;
  id: number;
}

export default async function createCar() {
  try {
    const garageData = await fetchData('garage', 'GET');
    const numberOfCars = garageData.length;
    const formCreate = document.getElementById('create');
    const formUpdate = document.getElementById('update') as HTMLFormElement;

    let newCar: ICar = {
      name: 'test',
      color: 'test',
      id: 404,
    };

    const arrayID: number[] = [];

    for (const key of garageData) {
      arrayID.push(key.id);
    }

    const createID = function () {
      let newID = 1;
      for (let i = 0; i < arrayID.length; i++) {
        if (arrayID.includes(newID)) {
          newID += 1;
        }
      }
      arrayID.push(newID);
      return newID;
    };

    formCreate?.addEventListener('submit', async function (event) {
      event.preventDefault();
      checkPagination();
      if (formCreate instanceof HTMLFormElement) {
        const formData = new FormData(formCreate);
        const getTextEntry = formData.get('create-text-input');
        const getColorEntry = formData.get('create-color-input');

        let getText: string | null = null;
        let getColor: string | null = null;

        if (typeof getTextEntry === 'string') {
          getText = getTextEntry;
        }

        if (typeof getColorEntry === 'string') {
          getColor = getColorEntry;
        }

        if (getText !== null && getColor !== null) {
          newCar = {
            name: getText,
            color: getColor,
            id: 404,
          };
        }
      }

      async function saveCarToGarage(thisCar: ICar, carID: number) {
        thisCar.id = carID;

        try {
          await fetchData('garage', 'POST', thisCar);

          const carWrap = document.querySelector('.car-wrap');
          const garageNumber = document.querySelector('.garage-number');

          if (carWrap && carWrap instanceof HTMLDivElement) {
            const car = new Car(carWrap);

            car.createContent(newCar.name, newCar.color, String(carID));


            checkNumberOfCars(car, true);
            checkPagination();
            const removeButtons = document.querySelectorAll('.remove');
            const curRemoveButton = removeButtons[removeButtons.length - 1];
            curRemoveButton.addEventListener('click', () => {
              car.remove();
              removeCar(carID);
              // testRRR();
              checkNumberOfCars(car, false);
              checkPagination();
            });

            const selectButtons = document.querySelectorAll('.select');
            const curSelectButton = selectButtons[selectButtons.length - 1];

            curSelectButton.addEventListener('click', () => {
              const contentWrapWarName = document.getElementById(
                `name${carID}`,
              );
              const curCarName: string | undefined =
                contentWrapWarName?.innerHTML;

              const createTextInput =
                document.getElementById('update-text-input');
              createTextInput?.setAttribute('value', curCarName || '');

              const updateColorInput =
                document.getElementById('update-color-input');

              const wrapCar = document.getElementById(`wrap${carID}`);
              let newColorCar;
              if (wrapCar && wrapCar.childNodes[0] && !newColorCar) {
                const targetElement =
                  wrapCar.childNodes[1].childNodes[1].childNodes[0]
                    .childNodes[1].childNodes[3];

                if (targetElement instanceof SVGGElement) {
                  newColorCar = targetElement.style.fill;
                }
              }

              const rgbColor = String(newColorCar);
              const hexColor = rgbToHex(rgbColor);

              updateColorInput?.setAttribute('value', hexColor || '');

              updateObjToBuffer(newCar.name, newCar.color, carID);
            });

            getNumberOfCars(garageNumber as HTMLSpanElement);
            if (garageNumber) {
              garageNumber.innerHTML = `${numberOfCars + 1}`;
            }
          }
        } catch (error) {
          console.error('show error: ', error);
        }
      }

      const newID = createID();
      saveCarToGarage(newCar, newID);
    });

    formUpdate?.addEventListener('submit', async function (event) {
      event.preventDefault();
      const createTextInput = document.getElementById('update-text-input');
      const updateColorInput = document.getElementById('update-color-input');

      const curCar = getCarFormBuffer();

      let newNameCar;
      let newColorCar;

      if (formUpdate instanceof HTMLFormElement) {
        const formElements = formUpdate.elements;
        if (formElements[0] instanceof HTMLInputElement) {
          newNameCar = formElements[0].value;
        }
        if (formElements[1] instanceof HTMLInputElement) {
          newColorCar = formElements[1].value;
        }
      }

      const wrapCar = document.getElementById(`wrap${curCar.id}`);

      if (wrapCar && wrapCar.childNodes[0] && newNameCar) {
        wrapCar.childNodes[0].childNodes[2].textContent = newNameCar;
      }

      if (wrapCar && wrapCar.childNodes[0] && newColorCar) {
        const targetElement =
          wrapCar.childNodes[1].childNodes[1].childNodes[0].childNodes[1]
            .childNodes[3];

        if (targetElement instanceof SVGGElement) {
          targetElement.style.fill = newColorCar;
          targetElement.attributes[3].value = newColorCar;
        }
      }

      if (newNameCar && newColorCar) {
        createTextInput?.setAttribute('value', newNameCar);
        updateColorInput?.setAttribute('value', newColorCar);

        updateCar(curCar.id, newNameCar, newColorCar);
        updateObjToBuffer(newNameCar, newColorCar, curCar.id);
      }

      formUpdate.reset();
    });
  } catch (error) {
    console.error('show error: ', error);
  }
}
