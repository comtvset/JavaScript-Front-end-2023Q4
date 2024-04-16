// import openAboutWindow from '../about/aboutPage';
import goTo from '../../components/router';
import LoginWindow from './LoginWindow';
import './loginPage.css';

export default function openLoginWindow() {
  const body = document.querySelector('body') as HTMLBodyElement;
  const messageForTitle =
    'Please use English characters only and first letter have to Uppercase';

  const myLoginWindow = new LoginWindow(body, 'login-page');
  myLoginWindow.addInput(
    'nickname',
    'text',
    '',
    messageForTitle,
    'input-login',
    'Nickname',
    'label-login',
  );
  myLoginWindow.addInput(
    'password',
    'password',
    '',
    messageForTitle,
    'input-login',
    'Password',
    'label-login',
  );
  myLoginWindow.addButton(
    'Enter funChat',
    'button-login',
    'button-enter',
    // 'submit',
    'click',
    () => goTo('main'),
  );
  myLoginWindow.addButton(
    'About',
    'button-login',
    'button-login-about',
    'click',
    () => goTo('about'),
  );
}
