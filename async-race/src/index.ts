import './style.css';
// import './pages/garage';
import Button from './components/button/button';
import openGarage from './pages/garage';


const body = document.querySelector('body');

const pageSelectWrap = document.createElement('div');
pageSelectWrap.classList.add('page-select-wrap');

body?.appendChild(pageSelectWrap);

const toGarage = new Button(pageSelectWrap);
toGarage.addButton('to Garage', () => {
  console.log('Open GARAGE');
  openGarage();
});

const toWinner = new Button(pageSelectWrap);
toWinner.addButton('to Winner', () => {
  console.log('Open WINNER');
});