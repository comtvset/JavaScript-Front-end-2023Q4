import LoginWindow from './login/login';
import Button from './button/button';
import './login/loginStyle.css';
import './button/buttonStyle.css';

export default function createLoginWindow() {
  const login = new LoginWindow();
  login.addField('First Name', 'first-name');
  login.addField('Surname', 'second-name');
  const button = new Button(login.getLoginWindowElement());
  button.addButton(login.element, 'Login', () => {});
}
