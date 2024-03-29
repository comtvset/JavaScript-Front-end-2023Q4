import Car from '../models/car';
import fetchData from '../services/apiService';
import getNumberOfCars from './getNumberOfCars';
import removeCar from './removeCar';

export default async function createCar() {
  try {
    const garageData = await fetchData('garage', 'GET');
    let numberOfCars = garageData.length;
    const form = document.getElementById('create');

    let newCar = {
      name: 'test',
      color: 'test',
      id: 100,
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
            id: (numberOfCars += 1),
          };
        }
      }

      async function saveCarToGarage(thisCar: object) {
        try {
          await fetchData('garage', 'POST', thisCar);

          const carWrap = document.querySelector('.car-wrap');
          const garageInfo = document.querySelector('h1');

          if (carWrap && carWrap instanceof HTMLDivElement) {
            const car = new Car(carWrap);
            car.createContent(newCar.name, newCar.color, numberOfCars);
            getNumberOfCars(garageInfo as HTMLHeadingElement);
            if (garageInfo) {
              garageInfo.innerHTML = `Garage (${numberOfCars})`;
            }
          }
        } catch (error) {
          console.error('show error: ', error);
        }
      }

      saveCarToGarage(newCar);
      removeCar();
    });
  } catch (error) {
    console.error('show error: ', error);
  }
}
