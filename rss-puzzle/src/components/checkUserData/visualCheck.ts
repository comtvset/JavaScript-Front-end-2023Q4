import Words from './interfaceWords';

export function visualCheck(savedThisWords: Words, currentGuess: number) {
  const guess = document.getElementById(`guess_${currentGuess}`);
  const textExample = savedThisWords.textExample;
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
    const fieldTranslate = document.querySelector('.translate');
    if (fieldTranslate) {
      fieldTranslate.classList.remove('hide');
    }
  } else {
    guess?.classList.add('wrong');
    setTimeout(() => {
      guess?.classList.remove('wrong');
    }, 1500);
  }
}
