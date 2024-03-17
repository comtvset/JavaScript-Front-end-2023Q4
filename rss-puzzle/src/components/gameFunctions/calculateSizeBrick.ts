export default function sizeBrick(sentence: string[]) {
  const sourceBlock = document.querySelector('.source-block');

  const sentenceLength = sentence.length;
  const boxModelSize = 30; //puddings, margins and etc..

  if (sourceBlock) {
    const width = sourceBlock.clientWidth;

    const result = (width - boxModelSize) / sentenceLength;
    return result;
  }
}
