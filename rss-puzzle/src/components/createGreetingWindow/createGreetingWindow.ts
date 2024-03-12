export default function createGreetingWindow() {
  const img = document.createElement('img');
  img.classList.add('test');
  document.body?.appendChild(img);

  img.src = './assets/exit.png';
}
