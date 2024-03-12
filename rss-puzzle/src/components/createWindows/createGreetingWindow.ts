import GreetingWindow from './greetingWindow/greeting';
import './greetingWindow/greetingStyle.css';

export default function createGreetingWindow() {
  const img = document.createElement('img');
  img.classList.add('exit');
  document.body?.appendChild(img);

  img.src = './assets/exit.png';

  const greeting = new GreetingWindow();
  greeting.addElements();
}
