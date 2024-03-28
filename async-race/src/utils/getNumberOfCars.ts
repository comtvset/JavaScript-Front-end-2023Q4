import fetchData from '../services/apiService';

export default async function getNumberOfCars(garageInfo?: HTMLHeadingElement) {
  try {
    const garageData = await fetchData('garage');
    if (garageInfo) {
      garageInfo.innerHTML = `Garage (${garageData.length})`;
    }
  } catch (error) {
    console.error('show error: ', error);
  }
}
