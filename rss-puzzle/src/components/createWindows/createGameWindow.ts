import GameWindow from './gameWindow/gameWindow';
import './gameWindow/gameStyle.css';
import Button from './button/button';
import nextWord from '../checkUserData/nextWord';
import helpMe from '../checkUserData/helpMe';
// import buffer from '../checkUserData/buffer';
// import helpMe from '../checkUserData/helpMe';

export default function createMainWindow() {
  const game = new GameWindow();
  game.addWindow();

  const buttonsWrap = game.getButtonsWrap();

  const buttonHelp = new Button(buttonsWrap);
  buttonHelp.setID('guess');
  buttonHelp.addButton('Answer', () => {
    helpMe();
  });

  const button = new Button(buttonsWrap);
  button.setAtt();
  button.setID('continue');

  nextWord(0, 0, 'guess_1', button);
}
