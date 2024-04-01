import addCar from './blocks/controlGarage';
import showInfo from './blocks/infoGarage';
import pagination from './blocks/pagination';
import showSettings from './blocks/settingsGarage';

export default function openGarage() {
  showSettings();
  showInfo();
  addCar();
  pagination();
}
