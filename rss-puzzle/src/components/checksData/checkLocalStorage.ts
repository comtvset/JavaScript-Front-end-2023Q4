import createGreetingWindow from '../createGreetingWindow/createGreetingWindow';
import removeGreetingWindow from '../createGreetingWindow/removeGreetingWindow';
import createLoginWindow from '../createLoginWindow/createLoginWindow';
import removeLoginWindow from '../createLoginWindow/removeLoginWindow';

export default function checkLocalStorage() {
  const keys = Object.keys(localStorage);
  let result = '';

  keys.forEach((key) => {
    if (key === 'user') {
      const value = localStorage.getItem(key);
      result += value;
    }
  });

  if (result.length > 0) {
    createGreetingWindow();
    removeLoginWindow();

    const exit = document.querySelector('.test');
    exit?.addEventListener('click', function () {
      createLoginWindow();
      removeGreetingWindow();
    });
  } else {
    createLoginWindow();
    removeGreetingWindow();
  }

  return result;
}
