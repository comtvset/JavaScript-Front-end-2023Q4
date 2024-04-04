import fetchData from '../services/apiService';
import selectAllCars from './selectAllCars';

interface CarInfo {
  animationFrameId: number | null;
  positionX: number;
}

const cars: { [key: number]: CarInfo } = {};

let statusAllCars: (void | object | undefined)[] = [];
const winner: number[] = [];

async function checkFinish(status?: void | object) {
  const btnReset = document.querySelectorAll('.btn-reset');
  const reset = document.getElementById('reset');
  const allCars = document.querySelector('.garage-number');
  const hideCars = document.querySelectorAll('.hideCar');

  const numberOfAllCars = Number(allCars?.innerHTML);
  const numberOfHideCars = Array.from(hideCars).reduce((acc) => acc + 1, 0);

  let countCurOnPage: number;

  if (numberOfHideCars) {
    countCurOnPage = numberOfAllCars - numberOfHideCars / 2;
  } else {
    countCurOnPage = numberOfAllCars;
  }

  statusAllCars.push(status);

  btnReset.forEach((item: Element) => {
    reset?.setAttribute('disabled', 'disabled');
    if (item instanceof HTMLButtonElement) {
      if (reset && statusAllCars.length >= countCurOnPage) {
        reset?.removeAttribute('disabled');
      } else {
        reset?.setAttribute('disabled', 'disabled');
      }
    }
  });
}

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

export default async function readyRace(id: number, letsgo = false) {
  const startButton = document.getElementById(`start${id}`);
  const resetButton = document.getElementById(`reset${id}`);
  const race = document.getElementById('race');
  const reset = document.getElementById('reset');

  if (race && reset) {
    race.addEventListener('click', async () => {
      race.setAttribute('disabled', 'disabled');
      reset.setAttribute('disabled', 'disabled');
    });
  }

  if (reset) {
    reset.addEventListener('click', async () => {
      if (startButton && race) {
        selectAllCars(startButton);
        race.removeAttribute('disabled');
      }
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

  async function runCar(currentStartButton: HTMLElement) {
    console.clear();
    statusAllCars = [];
    currentStartButton.setAttribute('disabled', 'disabled');
    resetButton?.setAttribute('disabled', 'disabled');
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

        const drive = await fetchData(
          `engine?id=${clickedId}&status=drive`,
          'PATCH',
        );
        resetButton?.removeAttribute('disabled');
        await checkFinish(drive);
        winner.push(clickedId);
        console.log(winner[0]);

        animate(velocityDistanceData, clickedId);
      } catch (error) {
        animate({ velocity: 0, distance: 500000 }, clickedId);
        resetButton?.removeAttribute('disabled');
        checkFinish({ success: false });
      }
    }
  }

  if (startButton) {
    startButton.addEventListener('click', async () => {
      runCar(startButton);
      for (let i = 0; i < 7; i++) {
        checkFinish({ success: false });
      }
    });
  }

  if (letsgo && startButton) {
    runCar(startButton);
  }
}
