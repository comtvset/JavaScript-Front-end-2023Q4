import { buffer } from './buffer';

export default function playAudio() {
  const { saveData } = buffer();
  // console.log(saveData, saveRound, saveWords);

  const audio = document.querySelector('.audio');
  const sound = document.createElement('img');
  sound.src = './assets/sound.png';
  audio?.appendChild(sound);
  sound.classList.add('sound-img');

  const audioExample = saveData.audioExample;
  if (audio) {
    // console.log(audioExample);

    sound.addEventListener('click', () => {
      sound.classList.add('disabled');
      sound.style.backgroundColor = 'grey';
      const audioPlayer = new Audio(`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioExample}`);
      audioPlayer.play();
      audioPlayer.addEventListener('ended', () => {
        sound.classList.remove('disabled');
        sound.style.backgroundColor = '';
      });
    });



  }
}
