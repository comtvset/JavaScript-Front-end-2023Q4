import LoginWindow from './login/login';
import Button from './button/button';
import './login/loginStyle.css';
import './button/buttonStyle.css';
import checkForm from './login/check';

export default function createLoginWindow() {
  const login = new LoginWindow();
  login.addField('First Name', 'first-name');
  login.addField('Surname', 'second-name');
  const button = new Button(login.getLoginWindowElement());
  button.addButton('Login', () => {});
  checkForm(button);

  const formField = document.querySelectorAll('.input-login');
  formField.forEach((input) => {
    input.addEventListener('input', () => {
      const inputValues = Array.from(formField).map((item) => {
        if (item instanceof HTMLInputElement) {
          return item.value;
        }
        return '';
      });
      checkForm(button, inputValues);
    });
  });
}
