import openAboutWindow from '../pages/about/aboutPage';
import openLoginWindow from '../pages/login/loginPage';
import openMainWindow from '../pages/main/mainPage';

export default function goTo(str: string) {
  const body = document.querySelector('body');
  if (body) {
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
  }



  if (str === 'about') {
    openAboutWindow();
    // history.pushState({}, '', `${str}`);
  }

  if (str === 'login') {
    openLoginWindow();
    // history.pushState({}, '', `${str}`);
  }

  if (str === 'main') {
    openMainWindow();
    // history.pushState({}, '', `${str}`);
  }
}
