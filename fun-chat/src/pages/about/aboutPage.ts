import goTo from '../../components/router';
import AboutWindow from './AboutWindow';
import './aboutPage.css';

export default function openAboutWindow() {
  const body = document.querySelector('body') as HTMLBodyElement;
  const myAboutWindow = new AboutWindow(body, 'about-page');
  myAboutWindow.addSpan('FunChat', 'about-title', 'span-about');
  myAboutWindow.addSpan(
    'Application develop for task "Fun Chat" RSSchool JS/FE 2023Q3',
    'about-info',
    'span-about',
  );
  myAboutWindow.addLink(
    'Author danArti',
    'https://github.com/comtvset',
    'link-about',
  );
  myAboutWindow.addButton(
    'Come back',
    'button-about',
    'button-about-about',
    'click',
    () => goTo('login'),
  );
}
