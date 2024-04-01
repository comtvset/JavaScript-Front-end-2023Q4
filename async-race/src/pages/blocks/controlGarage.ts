import createCar from '../../utils/createCar';
import getCar from '../../utils/getCar';

export default function addCar() {
  const body = document.querySelector('body');
  const carWrap = document.createElement('div');
  carWrap.classList.add('car-wrap');
  body?.appendChild(carWrap);

  getCar(carWrap);
  createCar();
}
