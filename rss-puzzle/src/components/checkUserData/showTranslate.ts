import { buffer } from './buffer';

export default function showTranslate() {
  const { saveData } = buffer();

  const fieldTranslate = document.querySelector('.translate');
  const textExampleTranslate = saveData.textExampleTranslate;
  if (fieldTranslate) {
    fieldTranslate.innerHTML = textExampleTranslate;
  }
}
