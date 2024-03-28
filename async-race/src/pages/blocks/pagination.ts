import Button from '../../components/button/button';

export default function pagination() {
  const body = document.querySelector('body');
  const pageSelectWrap2 = document.createElement('div');
  pageSelectWrap2.classList.add('pagination');
  body?.appendChild(pageSelectWrap2);

  const prev = new Button(pageSelectWrap2);
  const next = new Button(pageSelectWrap2);

  prev.addButton('prev', () => {
    console.log('prev');
  });

  next.addButton('next', () => {
    console.log('next');
  });
}
