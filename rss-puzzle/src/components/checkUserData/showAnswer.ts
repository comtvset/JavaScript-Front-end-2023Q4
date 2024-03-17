import { buffer } from './buffer';

export default function showAnswer() {
  const { saveData, saveRound, saveWords } = buffer();
  console.log(saveData, saveRound, saveWords);

  const answer = document.querySelector('.answer');
  const textExampleTranslate = saveData.textExampleTranslate;
  if (answer) {
    answer.innerHTML = textExampleTranslate;
  }
}
