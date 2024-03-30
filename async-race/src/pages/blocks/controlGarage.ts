import createCar from '../../utils/createCar';
import getCars from '../../utils/getCars';

export default function addCar() {
  const body = document.querySelector('body');
  const carWrap = document.createElement('div');
  carWrap.classList.add('car-wrap');
  body?.appendChild(carWrap);

  getCars(carWrap);
  createCar();
}
