import './style.css';
import './pages/garage.css';
import './pages/winners.css';
import './models/car.css';
import Button from './components/button/button';
import openGarage from './pages/garage';
import openWinners from './pages/winners';

const body = document.querySelector('body');
const pageSelectWrap = document.createElement('div');
pageSelectWrap.classList.add('page-select-wrap');
body?.appendChild(pageSelectWrap);

const toGarage = new Button(pageSelectWrap);
const toWinner = new Button(pageSelectWrap);

const tableContainer = document.createElement('div');
tableContainer.setAttribute('id', 'table-container');
body?.appendChild(tableContainer);
tableContainer?.classList.add('hidden');

openWinners();


toGarage.addButton('to Garage', () => {
  toGarage.setDisabled();
  toWinner.removeDisabled();

  const settingsWrap = document.querySelector('.settings-wrap');
  const garageWrap = document.querySelector('.garage-wrap');
  const carWrap = document.querySelector('.car-wrap');
  const createWrap = document.querySelector('.create-wrap');
  const updateWrap = document.querySelector('.update-wrap');
  const buttonsWrap = document.querySelector('.buttons-wrap');
  settingsWrap?.classList.remove('hidden');
  garageWrap?.classList.remove('hidden');
  carWrap?.classList.remove('hidden');
  createWrap?.classList.remove('hidden');
  updateWrap?.classList.remove('hidden');
  buttonsWrap?.classList.remove('hidden');
  tableContainer?.classList.add('hidden');
});

toWinner.addButton('to Winner', () => {

  toWinner.setDisabled();
  toGarage.removeDisabled();

  const settingsWrap = document.querySelector('.settings-wrap');
  const garageWrap = document.querySelector('.garage-wrap');
  const carWrap = document.querySelector('.car-wrap');
  const createWrap = document.querySelector('.create-wrap');
  const updateWrap = document.querySelector('.update-wrap');
  const buttonsWrap = document.querySelector('.buttons-wrap');
  settingsWrap?.classList.add('hidden');
  garageWrap?.classList.add('hidden');
  carWrap?.classList.add('hidden');
  createWrap?.classList.add('hidden');
  updateWrap?.classList.add('hidden');
  buttonsWrap?.classList.add('hidden');
  tableContainer?.classList.remove('hidden');
});

openGarage();
toGarage.setDisabled();
