import Words from './interfaceWords';

export default function checkButton(
  thisWords: Words,
  guessesBlock: HTMLElement,
) {
  const currentID = guessesBlock.id;

  const guess = document.getElementById(`${currentID}`);
  const sentetnceArr: string[] = [];
  const textExample = thisWords.textExample;
  const checkLength = textExample.split(' ').length;
  const button = document.getElementById('continue');

  if (guess) {
    const bricks = guess.querySelectorAll('.brick');
    bricks.forEach((item) => {
      sentetnceArr.push(item.innerHTML);
    });
  }
  if (button) {
    if (checkLength === sentetnceArr.length) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  }
}
