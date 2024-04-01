import Button from '../../components/button/button';
import checkPagination from '../../utils/checkPagination';

export default function pagination() {
  const body = document.querySelector('body');
  const pageSelectWrap2 = document.createElement('div');
  pageSelectWrap2.classList.add('pagination');
  body?.appendChild(pageSelectWrap2);

  const prevButton = new Button(pageSelectWrap2);
  const nextButton = new Button(pageSelectWrap2);
  prevButton.setDisabled();

  checkPagination(nextButton, prevButton);

}
