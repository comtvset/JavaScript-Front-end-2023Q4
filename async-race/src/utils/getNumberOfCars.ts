import fetchData from '../services/apiService';

export default async function getNumberOfCars(garageInfo?: HTMLHeadingElement) {
  try {
    const garageData = await fetchData('garage', 'GET');
    if (garageInfo) {
      garageInfo.innerHTML = `Garage (${garageData.length})`;
    }
  } catch (error) {
    console.error('show error: ', error);
  }
}
