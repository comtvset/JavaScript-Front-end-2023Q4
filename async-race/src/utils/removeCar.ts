import fetchData from '../services/apiService';

export default async function removeCar(carID: number) {
  try {
    await fetchData(`garage/${carID}`, 'DELETE');
  } catch (error) {
    console.error('delete error: ', error);
  }
}
