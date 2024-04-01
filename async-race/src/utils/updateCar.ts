import fetchData from '../services/apiService';

export default async function updateCar(
  carID: number,
  newName: string,
  newColor: string,
) {
  try {
    const requestData = {
      name: newName,
      color: newColor,
    };
    // console.log(requestData);
    await fetchData(`garage/${carID}`, 'PUT', requestData);
  } catch (error) {
    console.error('put error: ', error);
  }
}

// export function
