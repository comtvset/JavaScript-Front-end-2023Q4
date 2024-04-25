import openAboutWindow from '../pages/about/aboutPage';
import openLoginWindow from '../pages/login/loginPage';
import openMainWindow from '../pages/main/mainPage';

export default function entry(str: string, nickname?: string) {
  const body = document.querySelector('body');
  if (body) {
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
  }

  if (str === 'about') {
    openAboutWindow();
  }

  if (str === 'login') {
    openLoginWindow();
  }

  if (str === 'main') {
    if (nickname) {
      openMainWindow(nickname);
    }
  }
}
