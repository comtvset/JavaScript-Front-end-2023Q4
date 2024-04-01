export default function testRRR() {
  const contentWrap = document.querySelectorAll('.content-wrap');
  const dashedLine = document.querySelectorAll('.dashed-line');

  for (let i = 0; i < 7; i++) {
    if (contentWrap[i]) {
      contentWrap[i].classList.remove('hideCar');
      dashedLine[i].classList.remove('hideCar');
    }
  }
}