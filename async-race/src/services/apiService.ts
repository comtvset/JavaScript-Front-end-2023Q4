const BASE_URL = 'http://127.0.0.1:3000/';
// const GARAGE = 'garage';
// const WINNERS = 'winners';
// const response = await fetch(BASE_URL + GARAGE);

export default async function fetchData(
  target: string,
  method: string,
  createCar?: object,
) {
  try {
    const response = await fetch(BASE_URL + target, {
      method: method,
      body: JSON.stringify(createCar),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok!');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    if (error === 500) {
      console.error('Car has been stopped suddenly. It iss engine was broken down.');
    }
    throw error;
  }
}
