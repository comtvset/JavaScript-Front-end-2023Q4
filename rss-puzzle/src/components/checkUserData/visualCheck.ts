import Words from './interfaceWords';

export function visualCheck(savedThisWords: Words, currentGuess: number) {
  const guess = document.getElementById(`guess_${currentGuess}`);
  const textExample = savedThisWords.textExample;
  const sentetnceArr: string[] = [];

  // console.log(guess);

  if (guess) {
    const bricks = guess.querySelectorAll('.brick');
    bricks.forEach((item) => {
      sentetnceArr.push(item.innerHTML);
    });
  }

  const resultSentence = sentetnceArr.join(' ');

  console.log(resultSentence);
  console.log(textExample);

  if (resultSentence === '' && resultSentence !== textExample) {
    if (guess instanceof HTMLElement) {
      const firstChild = guess.parentNode?.childNodes[currentGuess - 2];
      if (firstChild instanceof HTMLElement) {
        firstChild.classList.add('correct');
        setTimeout(() => {
          firstChild.classList.remove('correct');
        }, 1500);
      }
    }
  } else {
    guess?.classList.add('wrong');
    setTimeout(() => {
      guess?.classList.remove('wrong');
    }, 1500);
  }
}
