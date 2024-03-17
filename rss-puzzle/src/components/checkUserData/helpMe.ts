import sizeBrick from '../gameFunctions/calculateSizeBrick';
import { buffer } from './buffer';
import nextWord from './nextWord';
// let guess = 1;
let currentWords;
let currentRound;

export default function helpMe() {
  const { saveData, saveRound, saveWords } = buffer();
  currentWords = saveWords;
  currentRound = saveRound;

  const btn = document.getElementById('continue');
  if (btn) {
    btn.setAttribute('disabled', 'disabled');
  }

  const sourceBlock = document.querySelector('.source-block');
  if (currentWords !== undefined) {
    const guessesBlock = document.getElementById(`guess_${currentWords + 1}`);

    const childNodesArray = Array.from(guessesBlock?.childNodes || []);
    childNodesArray.forEach((child) => {
      guessesBlock?.removeChild(child);
    });

    const childNodesArray1 = Array.from(sourceBlock?.childNodes || []);
    childNodesArray1.forEach((child) => {
      sourceBlock?.removeChild(child);
    });

    if (saveData) {
      const textExample = saveData.textExample;
      const sentenceCut = textExample.split(' ');

      for (let i = 0; i < sentenceCut.length; i++) {
        const brick = document.createElement('div');
        brick.classList.add('brick');

        if (guessesBlock) {
          guessesBlock.appendChild(brick);
          brick.innerHTML = sentenceCut[i];
          brick.style.width = `${sizeBrick(sentenceCut)}px`;
        }
      }
    }

    // guess += 1;

    if (currentWords !== undefined && currentRound !== undefined) {
      // console.log(currentRound, currentWords);
      currentWords += 1;
      nextWord(currentRound, currentWords, `guess_${currentWords + 1}`);
    }
  }
  // console.log(currentRound, currentWords);
}
