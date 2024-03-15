import { nextWord } from '../createWindows/createGameWindow';
import Words from './interfaceWords';

let currentGuess = 1;
let guessCount = 1;
const round = 0;
let words = 0;
export default function checkSentence(thisWords: Words) {
  const btn = document.getElementById('continue');
  const guess = document.getElementById(`guess_${currentGuess}`);
  const textExample = thisWords.textExample;
  const sentetnceArr: string[] = [];

  if (guess) {
    const bricks = guess.querySelectorAll('.brick');
    bricks.forEach((item) => {
      sentetnceArr.push(item.innerHTML);
    });
  }

  const resultSentence = sentetnceArr.join(' ');
  // console.log(resultSentence);
  // console.log(textExample);

  if (resultSentence === textExample) {
    // console.log('true');
    words += 1;
    guessCount += 1;
    currentGuess += 1;
    nextWord(round, words, `guess_${guessCount}`);
    btn?.setAttribute('disabled', 'disabled');
    return currentGuess;
  } else {
    // console.log('false');
    return currentGuess;
  }
}
