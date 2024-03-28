import getNumberOfCars from '../../utils/getNumberOfCars';

export default function showInfo() {
  const body = document.querySelector('body');
  const garageWrap = document.createElement('div');
  garageWrap.classList.add('garage-wrap');
  body?.appendChild(garageWrap);

  const garageInfo = document.createElement('h1');
  garageWrap.appendChild(garageInfo);
  garageInfo.innerHTML = 'Garage (loading...)';

  getNumberOfCars(garageInfo);

  const page = document.createElement('h2');
  garageWrap.appendChild(page);
  page.innerHTML = 'Page #1';
}
