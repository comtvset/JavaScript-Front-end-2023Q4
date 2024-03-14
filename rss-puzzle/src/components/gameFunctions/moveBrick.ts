import checkButton from '../checkUserData/checkButton';
import Words from '../checkUserData/interfaceWords';


export default function moveBrick(thisWords: Words, guess: string) {
  console.log(guess);
  const sourceBlock = document.querySelector('.source-block');
  const guessesBlock = document.getElementById(`${guess}`);

  if (sourceBlock && guessesBlock) {
    const elementsToCopy = sourceBlock.querySelectorAll('.brick');

    if (elementsToCopy) {
      elementsToCopy.forEach((item) => {
        item.addEventListener('click', function () {
          guessesBlock.appendChild(item);

          checkButton(thisWords, guessesBlock);
        });
      });
    }

    guessesBlock.addEventListener('click', function (event) {
      const clickBrick = event.target;
      if (
        clickBrick instanceof HTMLElement &&
        clickBrick.classList.contains('brick')
      ) {
        sourceBlock.appendChild(clickBrick);
        checkButton(thisWords, guessesBlock);
      }
    });
  }
}
