import { generateCars } from '../utils/generateCars';
import addCar from './blocks/controlGarage';
import showInfo from './blocks/infoGarage';
import pagination from './blocks/pagination';
import showSettings from './blocks/settingsGarage';

export default function openGarage() {
  showSettings();
  showInfo();
  addCar();
  pagination();

  const generate = document.getElementById('generatecars');
  generate?.addEventListener('click', async function (event) {
    event.preventDefault();
    generateCars(100);
  });
}
