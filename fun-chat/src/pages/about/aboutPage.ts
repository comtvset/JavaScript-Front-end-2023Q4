import reloadPage from '../../services/reloadPage';
import AboutWindow from './AboutWindow';
import './aboutPage.css';

export default function openAboutWindow() {
  const body = document.querySelector('body');
  if (body instanceof HTMLBodyElement) {
    const myAboutWindow = new AboutWindow(body, 'about-page');
    myAboutWindow.addSpan('FunChat', 'about-title', 'span-about');
    myAboutWindow.addSpan(
      'The application was developed as a training project to learn about WebSocket usage, as part of the RSSchool JS/FE 2023Q3 course',
      'about-info',
      'span-about',
    );
    myAboutWindow.addLink(
      'Author: danArti',
      'https://github.com/comtvset',
      'link-about',
    );
    myAboutWindow.addLink(
      'Mentor: ekaterina1994',
      'https://github.com/ekaterina1994',
      'link-about',
    );
    myAboutWindow.addButton(
      'Come back',
      'button-about',
      'button-about-about',
      'click',
      () => reloadPage(),
    );
  }
}
