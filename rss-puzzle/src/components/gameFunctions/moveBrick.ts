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
  }
}
