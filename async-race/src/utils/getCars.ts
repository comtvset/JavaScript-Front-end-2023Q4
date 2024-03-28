import Car from '../models/car';
import fetchData from '../services/apiService';

export default async function getNumberOfCars(carWrap?: HTMLHeadingElement) {
  try {
    const garageData = await fetchData('garage');
    if (carWrap) {
      console.log(garageData);

      for (const key of garageData) {
        const car = new Car(carWrap);
        car.createContent(key.name, key.color, key.id);
      }
    }
  } catch (error) {
    console.error('show error: ', error);
  }
}
