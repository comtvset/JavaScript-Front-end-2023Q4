// import Car from '../../models/car';
import getCars from '../../utils/getCars';

export default function addCar() {
  const body = document.querySelector('body');
  const carWrap = document.createElement('div');
  carWrap.classList.add('car-wrap');
  body?.appendChild(carWrap);

  // const car1 = new Car(carWrap);
  // car1.createContent('Tesla', '1');
  // const car2 = new Car(carWrap);
  // car2.createContent('Ford', '2');
  // const car3 = new Car(carWrap);
  // car3.createContent('Mercedes', '3');

  getCars(carWrap);
}
