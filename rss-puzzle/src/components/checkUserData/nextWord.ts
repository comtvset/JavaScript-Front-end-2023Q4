import Button from '../createWindows/button/button';
import cutSentence from '../gameFunctions/cutSentence';
import moveBrick from '../gameFunctions/moveBrick';
import { buffer } from './buffer';
import checkSentence from './checkSentence';
import Words from './interfaceWords';

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
  // buffer2(round, words);
}
