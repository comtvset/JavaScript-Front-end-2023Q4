const BASE_URL = 'http://127.0.0.1:3000/';
// const GARAGE = 'garage';
// const WINNERS = 'winners';

// export default async function fetchGarage() {
//   try {
//     const response = await fetch(BASE_URL + GARAGE);
//     if (!response.ok) {
//       throw new Error('Network response was not ok!');
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// export async function fetchWinners() {
//   try {
//     const response = await fetch(BASE_URL + WINNERS);
//     if (!response.ok) {
//       throw new Error('Network response was not ok!');
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

export default async function fetchData(target: string) {
  try {
    const response = await fetch(BASE_URL + target);
    if (!response.ok) {
      throw new Error('Network response was not ok!');
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error('show error:', error);
  }
}
