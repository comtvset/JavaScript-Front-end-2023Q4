import Words from './interfaceWords';
let saveData: Words | Record<string, never> = {};
let saveRound: number | undefined;
let saveWords: number | undefined;

export function buffer(
  thisWords?: Words,
  round?: number,
  words?: number,
): {
    saveData: Words | Record<string, never>;
    saveRound: number | undefined;
    saveWords: number | undefined;
  } {
  if (thisWords) {
    saveData = thisWords;
    saveRound = round;
    saveWords = words;
  }


  // console.log(saveRound, saveWords);
  return { saveData, saveRound, saveWords };
}
