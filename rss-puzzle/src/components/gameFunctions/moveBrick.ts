export default function moveBrick() {
  const sourceBlock = document.querySelector('.source-block');
  const guessesBlock = document.getElementById('guess_1');

  if (sourceBlock && guessesBlock) {
    const elementsToCopy = sourceBlock.querySelectorAll('.brick');

    if (elementsToCopy) {
      elementsToCopy.forEach((item) => {
        item.addEventListener('click', function () {
          guessesBlock.appendChild(item);
        });
      });
    }

    guessesBlock.addEventListener('click', function (event) {
      const clickBrick = event.target;
      if (clickBrick instanceof HTMLElement && clickBrick.classList.contains('brick')) {
        sourceBlock.appendChild(clickBrick);
      }
    });
  }
}
