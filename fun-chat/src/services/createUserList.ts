export default function createUsersList(login: string, isLogined: boolean, bot?: boolean) {
  const usersWrap = document.querySelector('.wrap-users');
  const findUser = document.querySelectorAll('.wrap-user');
  const curUser = document.getElementById('cur-user');

  const onlineColor = 'rgb(78 255 78)';
  const offlineColor = 'rgb(147 53 53)';

  for (let i = 0; i < findUser.length; i++) {
    const user = findUser[i];
    if (curUser && user.textContent === curUser.textContent) {
      user.remove();
    }
    if (user.textContent?.includes(login)) {
      user.remove();
    }
  }

  const userWrap = document.createElement('div');
  const status = document.createElement('div');
  const user = document.createElement('span');
  const newMessage = document.createElement('div');

  userWrap?.appendChild(status);
  userWrap?.appendChild(user);
  userWrap.appendChild(newMessage);
  if (bot) {
    userWrap.classList.add('hide-bot');
  }
  userWrap.classList.add('wrap-user');
  status.classList.add('list-status');
  newMessage.classList.add('new-message');
  user.setAttribute('id', `id_${login}`);

  if (isLogined) {
    status.style.background = onlineColor;
  } else {
    status.style.background = offlineColor;
  }
  user.innerHTML = login;

  if (usersWrap && usersWrap.firstChild && isLogined) {
    usersWrap.insertBefore(userWrap, usersWrap.firstChild);
  } else {
    usersWrap?.appendChild(userWrap);
  }
}
