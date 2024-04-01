import getNumberOfCars from '../../utils/getNumberOfCars';

export default function showInfo() {
  const body = document.querySelector('body');
  const garageWrap = document.createElement('div');
  garageWrap.classList.add('garage-wrap');
  body?.appendChild(garageWrap);

  const garageTitle = document.createElement('span');
  garageWrap.appendChild(garageTitle);
  garageTitle.classList.add('garage-title');
  garageTitle.innerHTML = 'Garage';
  const garageNumber = document.createElement('span');
  garageTitle.appendChild(garageNumber);
  garageNumber.classList.add('garage-number');
  garageNumber.innerHTML = '(loading...)';

  getNumberOfCars(garageNumber);

  const pageTitle = document.createElement('span');
  garageWrap.appendChild(pageTitle);
  pageTitle.classList.add('page-title');
  pageTitle.innerHTML = 'Page #';
  const pageNumber = document.createElement('span');
  pageTitle.appendChild(pageNumber);
  pageNumber.classList.add('page-number');
  pageNumber.innerHTML = '1';
}
