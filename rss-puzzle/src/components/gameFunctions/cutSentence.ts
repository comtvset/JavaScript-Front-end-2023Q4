import data from '../../data/wordCollectionLevel1.json';
import sizeBrick from './calculateSizeBrick';
import shuffleArray from './shuffleArray';

export default function cutSentence(round: number, words: number) {
  const thisRound = data.rounds[round];
  const thisWords = thisRound.words[words];
  const textExample = thisWords.textExample;
  const sentenceCut = textExample.split(' ');

  const mixArray = shuffleArray(sentenceCut);

  const sourceBlock = document.querySelector('.source-block');

  for (let i = 0; i < mixArray.length; i++) {
    const brick = document.createElement('div');
    brick.classList.add('brick');

    if (sourceBlock) {
      sourceBlock.appendChild(brick);
      brick.innerHTML = mixArray[i];
      brick.style.width = `${sizeBrick(mixArray)}px`;
    }
  }

  return thisWords;
}
