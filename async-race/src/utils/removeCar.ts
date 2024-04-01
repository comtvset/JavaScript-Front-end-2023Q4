import fetchData from '../services/apiService';
import getNumberOfCars from './getNumberOfCars';

export default async function removeCar(carID: number) {
  try {
    await fetchData(`garage/${carID}`, 'DELETE');
    const garageNumber = document.querySelector('.garage-number');

    if (garageNumber instanceof HTMLSpanElement) {
      getNumberOfCars(garageNumber);
    }
  } catch (error) {
    console.error('delete error: ', error);
  }
}
