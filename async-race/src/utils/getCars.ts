import Car from '../models/car';
import fetchData from '../services/apiService';
import removeCar from './removeCar';

export default async function getCars(carWrap?: HTMLHeadingElement) {
  try {
    const garageData = await fetchData('garage', 'GET');
    if (carWrap) {
      for (const key of garageData) {
        const car = new Car(carWrap);
        car.createContent(key.name, key.color, key.id);

        const removeButtons = document.querySelectorAll('.remove');
        const curButton = removeButtons[removeButtons.length - 1];
        curButton.addEventListener('click', () => {
          car.remove();
          removeCar(key.id);
        });
      }
    }
  } catch (error) {
    console.error('show error: ', error);
  }
}

