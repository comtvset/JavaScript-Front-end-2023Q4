import { buffer } from './buffer';

export default function showTranslate() {
  const { saveData, saveRound, saveWords } = buffer();
  console.log(saveData, saveRound, saveWords);

  const answer = document.querySelector('.translate');
  const textExampleTranslate = saveData.textExampleTranslate;
  if (answer) {
    answer.innerHTML = textExampleTranslate;
  }
}
