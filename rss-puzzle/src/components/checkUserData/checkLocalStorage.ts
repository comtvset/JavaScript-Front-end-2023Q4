// import createGreetingWindow from '../createLoginWindow/createGreetingWindow';
// import removeGreetingWindow from '../createLoginWindow/removeGreetingWindow';
// import createLoginWindow from '../createLoginWindow/createLoginWindow';
// import removeLoginWindow from '../createLoginWindow/removeLoginWindow';

import createGreetingWindow from '../createWindows/createGreetingWindow';
import createLoginWindow from '../createWindows/createLoginWindow';
import removeGreetingWindow from '../createWindows/removeGreetingWindow';
import removeLoginWindow from '../createWindows/removeLoginWindow';
import removeGameWindow from '../createWindows/removeGameWindow';

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

    const exit = document.querySelector('.exit');
    exit?.addEventListener('click', function () {
      createLoginWindow();
      removeGreetingWindow(true);
      removeGameWindow();
    });
  } else {
    createLoginWindow();
    removeGreetingWindow();
  }

  return result;
}
