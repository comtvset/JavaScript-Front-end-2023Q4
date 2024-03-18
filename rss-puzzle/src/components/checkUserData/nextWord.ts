import Button from '../createWindows/button/button';
import cutSentence from '../gameFunctions/cutSentence';
import moveBrick from '../gameFunctions/moveBrick';
import { buffer } from './buffer';
import checkSentence from './checkSentence';
import Words from './interfaceWords';
import playAudio from './playAudio';
import showTranslate from './showTranslate';

let savedThisWords: Words;
export default function nextWord(
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



  buffer(thisWords, round, words);
  showTranslate();

  const checkShowTranslate = document.getElementById(
    'show-translate',
  ) as HTMLInputElement;
  const fieldTranslate = document.querySelector('.translate');
  if (fieldTranslate && checkShowTranslate) {
    fieldTranslate.classList.add('hide');
    checkShowTranslate.checked = false;
  }

  const checkShowAudio = document.getElementById(
    'show-audio',
  ) as HTMLInputElement;
  const fieldAudio = document.querySelector('.audio');
  if (fieldAudio && fieldAudio.firstChild) {
    fieldAudio?.removeChild(fieldAudio.firstChild);
    fieldAudio.classList.add('hide');
    checkShowAudio.checked = false;
  }

  playAudio();
}
