import entry from '../../components/router';
import checkUser from '../../services/checkUser';
import checkForm from '../../services/validateInput';
import LoginWindow from './LoginWindow';
import './loginPage.css';

export default function openLoginWindow() {
  const body = document.querySelector('body');
  const messageForTitle =
    'Please use English characters only and first letter have to Uppercase';

  if (body instanceof HTMLBodyElement) {
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
      'click',
      () => {
        const nickname = document.getElementById('nickname');
        const password = document.getElementById('password');
        if (
          nickname &&
          nickname instanceof HTMLInputElement &&
          password &&
          password instanceof HTMLInputElement
        ) {
          const nicknameValue = nickname.value;
          const passwordValue = password.value;
          sessionStorage.setItem('$$$nickname', nicknameValue);
          sessionStorage.setItem('$$$password', passwordValue);
          checkUser(nicknameValue, passwordValue);
        }
      },
    );
    myLoginWindow.addButton(
      'About',
      'button-login',
      'button-login-about',
      'click',
      () => entry('about'),
    );

    const entryBTN = document.getElementById('button-enter');
    if (entryBTN) {
      entryBTN.setAttribute('disabled', 'disabled');
    }

    const nicknameField = document.getElementById('nickname');
    const passwordField = document.getElementById('password');

    if (
      nicknameField instanceof HTMLInputElement &&
      passwordField instanceof HTMLInputElement
    ) {
      nicknameField.addEventListener('input', function () {
        checkForm([nicknameField, passwordField]);
      });

      passwordField.addEventListener('input', function () {
        checkForm([nicknameField, passwordField]);
      });
    }
  }
}
