import fetchData from '../services/apiService';

export default async function getNumberOfCars(garageNumber?: HTMLSpanElement) {
  try {
    const garageData = await fetchData('garage', 'GET');
    if (garageNumber) {
      garageNumber.innerHTML = `${garageData.length}`;
    }
  } catch (error) {
    console.error('show error: ', error);
  }
}
