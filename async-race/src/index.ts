import './style.css';
import './pages/garage.css';
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

toGarage.addButton('to Garage', () => {
  console.log('Open GARAGE');

  openGarage();
  toGarage.setDisabled();
  toWinner.removeDisabled();
});

toWinner.addButton('to Winner', () => {
  console.log('Open WINNER');
  openWinners();
  toWinner.setDisabled();
  toGarage.removeDisabled();

  const settingsWrap = document.querySelector('.settings-wrap');
  settingsWrap?.remove();
  const garageWrap = document.querySelector('.garage-wrap');
  garageWrap?.remove();
  const carWrap = document.querySelector('.car-wrap');
  carWrap?.remove();
  const pagination = document.querySelector('.pagination');
  pagination?.remove();
});

openGarage();
toGarage.setDisabled();
