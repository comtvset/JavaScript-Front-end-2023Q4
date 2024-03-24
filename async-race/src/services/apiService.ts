const BASE_URL = 'http://127.0.0.1:3000/';
const GARAGE = 'garage';

export default async function fetchGarage() {
  try {
    const response = await fetch(BASE_URL + GARAGE);
    if (!response.ok) {
      throw new Error('Network response was not ok!');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}


