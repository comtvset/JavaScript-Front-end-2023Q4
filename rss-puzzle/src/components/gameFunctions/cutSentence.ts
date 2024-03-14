import data from '../../data/wordCollectionLevel1.json';
import shuffleArray from './shuffleArray';

export default function cutSentence(round: number, words: number) {
  const thisRound = data.rounds[round];
  const thisWords = thisRound.words[words];
  const textExample = thisWords.textExample;
  const sentenceCut = textExample.split(' ');

  console.log(sentenceCut);
  const sortedArray = shuffleArray(sentenceCut);
  console.log(sortedArray);

  const block = document.querySelector('.source-block');

  for (let i = 0; i < sentenceCut.length; i++) {
    const brick = document.createElement('div');
    brick.classList.add('brick');

    if (block) {
      block.appendChild(brick);
      brick.innerHTML = sentenceCut[i];
    }
  }
}
