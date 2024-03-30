import Car from '../models/car';
import fetchData from '../services/apiService';
import getNumberOfCars from './getNumberOfCars';
import removeCar from './removeCar';

interface ICar {
  name: string;
  color: string;
  id: number;
}

export default async function createCar() {
  try {
    const garageData = await fetchData('garage', 'GET');
    const numberOfCars = garageData.length;
    const form = document.getElementById('create');

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

    form?.addEventListener('submit', async function (event) {
      event.preventDefault();

      if (form instanceof HTMLFormElement) {
        const formData = new FormData(form);
        const getTextEntry = formData.get('createTextInput');
        const getColorEntry = formData.get('createColorInput');

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
          const garageInfo = document.querySelector('h1');

          if (carWrap && carWrap instanceof HTMLDivElement) {
            const car = new Car(carWrap);
            car.createContent(newCar.name, newCar.color, String(carID));
            const removeButtons = document.querySelectorAll('.remove');
            const curButton = removeButtons[removeButtons.length - 1];
            curButton.addEventListener('click', () => {
              car.remove();
              removeCar(carID);
            });

            getNumberOfCars(garageInfo as HTMLHeadingElement);
            if (garageInfo) {
              garageInfo.innerHTML = `Garage (${numberOfCars + 1})`;
            }
          }
        } catch (error) {
          console.error('show error: ', error);
        }
      }

      const newID = createID();
      saveCarToGarage(newCar, newID);
    });
  } catch (error) {
    console.error('show error: ', error);
  }
}
