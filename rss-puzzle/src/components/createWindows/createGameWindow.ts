import GameWindow from './gameWindow/gameWindow';
import './gameWindow/gameStyle.css';
import cutSentence from '../gameFunctions/cutSentence';
import moveBrick from '../gameFunctions/moveBrick';
import Button from './button/button';
import checkSentence from '../checkUserData/checkSentence';
import Words from '../checkUserData/interfaceWords';

let savedThisWords: Words;
export function nextWord(
  round: number,
  words: number,
  guess: string,
  button?: Button,
) {
  const thisWords = cutSentence(round, words);
  savedThisWords = thisWords;
  moveBrick(thisWords, guess);
  if (button) {
    button.addButton('Check', () => {
      checkSentence(savedThisWords);
    });
  }
}

export default function createMainWindow() {
  const game = new GameWindow();
  game.addWindow();

  const button = new Button(game.getLoginWindowElement());
  button.setAtt();
  button.setID('continue');

  nextWord(0, 0, 'guess_1', button);
}
