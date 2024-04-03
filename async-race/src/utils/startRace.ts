import fetchData from '../services/apiService';

interface CarInfo {
  animationFrameId: number | null;
  positionX: number;
}

const cars: { [key: number]: CarInfo } = {};

async function animate(
  velocityDistance: { velocity: number; distance: number },
  id: number,
) {
  const carID = document.getElementById(`car${id}`);
  const car = carID?.parentElement;
  const velocity = velocityDistance.velocity;
  const distance = velocityDistance.distance;

  if (velocity !== 0 && velocity !== undefined && distance !== undefined) {
    const screenWidth = window.innerWidth;

    const screenWidthCoefficient = screenWidth / 1257;
    cars[id].positionX += (velocity * screenWidthCoefficient) / 28;

    if (car) {
      if (screenWidth - 250 >= cars[id].positionX) {
        car.style.transform = `translateX(${cars[id].positionX}px)`;
        cars[id].animationFrameId = requestAnimationFrame(() =>
          animate({ velocity, distance }, id),
        );
      }
    }
  } else {
    const animationFrameId = cars[id].animationFrameId;
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
    return;
  }
}

export default async function readyRace(id: number) {
  const startButton = document.getElementById(`start${id}`);
  const resetButton = document.getElementById(`reset${id}`);
  const reset = document.getElementById('Reset');
  const allCars = document.querySelectorAll('.car-my-style');
  if (reset) {
    reset.addEventListener('click', async () => {
      allCars.forEach((item) => {
        if (item instanceof SVGElement) {
          item.style.transform = 'translateX(0px)';
          if (startButton) {
            startButton.removeAttribute('disabled');
          }
        }
      });
    });
  }
  if (resetButton && startButton) {
    resetButton.addEventListener('click', async () => {
      const carID = document.getElementById(`car${id}`);
      const car = carID?.parentElement;
      if (car) {
        car.style.transform = 'translateX(0px)';
        startButton.removeAttribute('disabled');
      }
    });
  }
  if (startButton) {
    startButton.addEventListener('click', async () => {
      startButton.setAttribute('disabled', 'disabled');
      const clickedId = id;
      if (!isNaN(clickedId)) {
        cars[clickedId] = {
          animationFrameId: null,
          positionX: 0,
        };

        try {
          const velocityDistanceData = await fetchData(
            `engine?id=${clickedId}&status=started`,
            'PATCH',
          );
          animate(velocityDistanceData, clickedId);

          await fetchData(`engine?id=${clickedId}&status=drive`, 'PATCH');

          // const drive = await fetchData(
          //   `engine?id=${clickedId}&status=drive`,
          //   'PATCH',
          // );
          // console.log(drive);
          animate(velocityDistanceData, clickedId);
        } catch (error) {
          // const drive = { success: false };
          // console.log(drive);
          animate({ velocity: 0, distance: 500000 }, clickedId);
        }
      }
    });
  }
}

// import fetchData from '../services/apiService';

// let animationFrameId: number | null;
// let positionX = 0;

// async function animate(
//   velocityDistance: { velocity: number; distance: number },
//   id: number,
// ) {
//   const carID = document.getElementById(`car${id}`);
//   const car = carID?.parentElement;

//   const velocity = velocityDistance.velocity;
//   const distance = velocityDistance.distance;

//   if (velocity && distance) {
//     const screenWidth = window.innerWidth;

//     positionX += velocity / 30;

//     if (car) {
//       if (screenWidth - 250 >= positionX) {
//         car.style.transform = `translateX(${positionX}px)`;
//         animationFrameId = requestAnimationFrame(() =>
//           animate({ velocity, distance }, id),
//         );
//       }
//     }
//   } else {
//     if (animationFrameId !== null) {
//       cancelAnimationFrame(animationFrameId);
//     }
//     return;
//   }
// }

// export default async function readyRace(id: number) {
//   try {
//     const startButton = document.getElementById(`start${id}`);
//     if (startButton) {
//       startButton.addEventListener('click', async function () {
//         positionX = 0;
//         const velocityDistanceData = await fetchData(
//           `engine?id=${id}&status=started`,
//           'PATCH',
//         );
//         animate(velocityDistanceData, id);
//         try {
//           const drive = await fetchData(
//             `engine?id=${id}&status=drive`,
//             'PATCH',
//           );
//           console.log(drive);
//           animate(velocityDistanceData, id);
//         } catch (error) {

//           const drive = { success: false };
//           console.log(drive);
//           animate({ velocity: 0, distance: 500000 }, id);
//         }
//       });
//     }
//   } catch (error) {
//     console.error('error :');
//   }
// }
