export default function createUsersList(login: string, isLogined: boolean, bot?: boolean) {
  const usersWrap = document.querySelector('.wrap-users');

  const findUser = document.querySelectorAll('.wrap-user');
  const curUser = document.getElementById('cur-user');

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

  userWrap?.appendChild(status);
  userWrap?.appendChild(user);
  if (bot) {
    userWrap.classList.add('hide-bot');
  }
  userWrap.classList.add('wrap-user');
  status.classList.add('list-status');

  if (isLogined) {
    status.style.background = 'green';
  } else {
    status.style.background = 'red';
  }
  user.innerHTML = login;

  if (usersWrap && usersWrap.firstChild && isLogined) {
    usersWrap.insertBefore(userWrap, usersWrap.firstChild);
  } else {
    usersWrap?.appendChild(userWrap);
  }
}
