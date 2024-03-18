import Button from './button/button';
import createMainWindow from './createGameWindow';
import GreetingWindow from './greetingWindow/greeting';
import './greetingWindow/greetingStyle.css';
import removeGreetingWindow from './removeGreetingWindow';

export default function createGreetingWindow() {
  const img = document.createElement('img');
  img.classList.add('exit');
  document.body?.appendChild(img);

  img.src = './assets/exit.png';

  const greeting = new GreetingWindow();
  greeting.addElements();

  const button = new Button(greeting.getThisElement());
  button.addButton('Start', () => {
    removeGreetingWindow();
    createMainWindow();
  });
}
