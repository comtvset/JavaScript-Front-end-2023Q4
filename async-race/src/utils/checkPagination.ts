import Button from '../components/button/button';
import fetchData from '../services/apiService';
import selectAllCars from './selectAllCars';
let curIndex = 0;
let curPage = 1;

export default function checkPagination(next?: Button, prev?: Button) {
  function updateDisplay() {
    const contentWrap = document.querySelectorAll('.content-wrap');
    const dashedLine = document.querySelectorAll('.dashed-line');
    const carsShow = 7;

    contentWrap.forEach((item) => item.classList.add('hideCar'));
    dashedLine.forEach((item) => item.classList.add('hideCar'));

    for (let i = curIndex; i < curIndex + carsShow; i++) {
      if (contentWrap[i]) {
        contentWrap[i].classList.remove('hideCar');
      }
      if (dashedLine[i]) {
        dashedLine[i].classList.remove('hideCar');
      }
    }

    const buttonPrev = document.getElementById('prev');
    const buttonNext = document.getElementById('next');
    if (curIndex <= 0) {
      buttonPrev?.setAttribute('disabled', 'disabled');
    } else {
      buttonPrev?.removeAttribute('disabled');
    }
    if (curIndex + carsShow >= contentWrap.length) {
      buttonNext?.setAttribute('disabled', 'disabled');
    } else {
      buttonNext?.removeAttribute('disabled');
    }
  }

  if (next) {
    next.addButton('next', async () => {
      const pageNumber = document.querySelector('.page-number');
      if (pageNumber) {
        curPage += 1;
        pageNumber.innerHTML = `${curPage}`;
      }

      curIndex += 7;
      updateDisplay();

      interface GarageItem {
        id: number;
      }

      const garageData = await fetchData('garage', 'GET');
      const allID = garageData.map((item: GarageItem) => {
        return item.id;
      });

      allID.forEach((id: number) => {
        const startButton = document.getElementById(`start${id}`);
        if (startButton) {
          selectAllCars(startButton, true);
        }
      });
    });
  }

  if (prev) {
    prev.addButton('prev', () => {
      const pageNumber = document.querySelector('.page-number');
      if (pageNumber) {
        curPage -= 1;
        pageNumber.innerHTML = `${curPage}`;
      }
      curIndex -= 7;
      updateDisplay();
    });
  }

  updateDisplay();
}
