import GameWindow from './gameWindow/gameWindow';
import './gameWindow/gameStyle.css';
import cutSentence from '../gameFunctions/cutSentence';
import moveBrick from '../gameFunctions/moveBrick';
export default function createMainWindow() {
  const game = new GameWindow();
  game.addWindow();

  cutSentence(0, 0);
  moveBrick();

}
