import GameWindow from './gameWindow/gameWindow';
import './gameWindow/gameStyle.css';
import Button from './button/button';
import nextWord from '../checkUserData/nextWord';
import helpMe from '../checkUserData/helpMe';
import Checkbox from './сontrols/checkbox';

export default function createMainWindow() {
  const game = new GameWindow();
  game.addWindow();


  const checkboxWrap = game.getGuessWrap();

  const checkShowTranslate = new Checkbox(checkboxWrap);
  checkShowTranslate.setLabel('show translate');
  checkShowTranslate.setID('show-translate');
  checkShowTranslate.setHide('translate');
  checkShowTranslate.onChange(() => {
    const state = checkShowTranslate.getState();
    const fieldTranslate = document.querySelector('.translate');
    if (fieldTranslate && state) {
      fieldTranslate.classList.remove('hide');
    } else {
      checkShowTranslate.setHide('translate');
    }
  });

  const checkShowAudio = new Checkbox(checkboxWrap);
  checkShowAudio.setLabel('show audio');
  checkShowAudio.setID('show-audio');
  checkShowAudio.setHide('audio');
  checkShowAudio.onChange(() => {
    const state = checkShowAudio.getState();
    const fieldAudio = document.querySelector('.audio');
    if (fieldAudio && state) {
      fieldAudio.classList.remove('hide');
    } else {
      checkShowAudio.setHide('audio');
    }
  });



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
