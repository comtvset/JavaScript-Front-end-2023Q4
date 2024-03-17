import nextWord from '../checkUserData/nextWord';
import { buffer } from './buffer';
// import helpMe from './helpMe';
import Words from './interfaceWords';
import { visualCheck } from './visualCheck';

let currentGuess = 1;
let guessCount = 1;
const round = 0;
// let words = 0;
let clickHandlerAdded = false;

function handleClick(event: MouseEvent) {
  const btn = event.target as HTMLButtonElement;

  // words += 1;
  // guessCount += 1;
  // currentGuess += 1;
  let thisWords;

  nextWord(round, guessCount, `guess_${guessCount + 1}`);
  btn.setAttribute('disabled', 'disabled');
  btn.innerHTML = 'Check';
  btn.removeEventListener('click', handleClick);
  // console.log(guessCount);
  buffer(thisWords, round, guessCount);
  // console.log(guessCount);
  // helpMe();
  return currentGuess;
}

export default function checkSentence(thisWords: Words) {
  const { saveRound, saveWords } = buffer();
  if (saveWords) {
    currentGuess = saveWords + 1;
    guessCount = saveWords + 1;
  }

  console.log(`Round: ${saveRound}, Words: ${saveWords}`);


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
    if (btn && !clickHandlerAdded) {
      btn.innerHTML = 'Continue';
      visualCheck(thisWords, currentGuess);
      btn.addEventListener('click', handleClick);
    }
  } else {
    clickHandlerAdded = false;
    visualCheck(thisWords, currentGuess);
  }
}
