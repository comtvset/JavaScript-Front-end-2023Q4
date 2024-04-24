export default function chooseUser() {
  const usersWrap = document.querySelector('.wrap-users');
  const chatUser = document.getElementById('chat-user');
  const statusUser = document.getElementById('status-user');

  if (usersWrap && statusUser && chatUser) {
    usersWrap.addEventListener('click', function (event) {
      const btnSend = document.getElementById('button-send-message');
      if (btnSend) {
        btnSend.removeAttribute('disabled');
      }
      const clickedElement = event.target;
      if (
        clickedElement &&
        clickedElement instanceof HTMLElement &&
        clickedElement.children[0] &&
        clickedElement.children[1]
      ) {
        const statusAttribute = clickedElement.children[0].attributes[1];
        const loginTextContent = clickedElement.children[1].textContent;
        if (statusAttribute && statusAttribute.value && loginTextContent) {
          const status = statusAttribute.value;
          const login = loginTextContent;

          if (status === 'background: red;') {
            statusUser.innerHTML = 'Offline';
            statusUser.style.color = 'red';
          } else {
            statusUser.innerHTML = 'Online';
            statusUser.style.color = 'green';
          }
          chatUser.innerHTML = login;
        }
      }
    });
  }
}
