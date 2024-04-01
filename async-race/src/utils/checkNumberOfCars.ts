import Car from '../models/car';

let carCount: number = 0;
export default function checkNumberOfCars(car: Car, flag: boolean) {
  const curCar = car;

  if (carCount && carCount > 6 && flag) {
    curCar.addHide();
  }
  carCount++;

  if (!flag) {
    carCount -= 2;
  }

  return carCount;
}
