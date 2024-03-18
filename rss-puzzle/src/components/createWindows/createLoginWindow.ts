import LoginWindow from './loginWindow/login/login';
import Button from './button/button';
import './loginWindow/login/loginStyle.css';
import './button/buttonStyle.css';
import checkForm from '../checkUserData/checkInputs';
import save from './saveLocalStorage/save';
import checkLocalStorage from '../checkUserData/checkLocalStorage';

export default function createLoginWindow() {
  const inputArr: string[] = [];
  const login = new LoginWindow();
  login.addField('First Name', 'first-name');
  login.addField('Surname', 'second-name');
  const button = new Button(login.getLoginWindowElement());
  button.addButton('Login', () => {
    save(inputArr.slice(-2));
    checkLocalStorage();
  });
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
      inputArr.push(...inputValues);
      checkForm(button, inputValues);
    });
  });
}
