import { nextWord } from '../createWindows/createGameWindow';
import Words from './interfaceWords';
let guessCount = 1;
const round = 0;
let words = 0;
export default function checkSentence(thisWords: Words, currentGuess?: string) {
  const guess = document.getElementById(`${currentGuess}`);
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

  // nextWord(0, 2);

  if (resultSentence === textExample) {
    console.log('true');
    words += 1;
    guessCount += 1;

    nextWord(round, words, `guess_${guessCount}`);
    return true;
  } else {
    console.log('false');
    return false;
  }
}
