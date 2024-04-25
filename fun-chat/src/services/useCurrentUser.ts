export default function chooseUser() {
  const usersWrap = document.querySelector('.wrap-users');
  const chatUser = document.getElementById('chat-user');
  const statusUser = document.getElementById('status-user');

  const onlineColor = 'rgb(78 255 78)';
  const offlineColor = 'rgb(147 53 53)';

  if (usersWrap && statusUser && chatUser) {
    usersWrap.addEventListener('click', function (event) {
      const btnSend = document.getElementById('button-send-message');
      if (btnSend) {
        btnSend.removeAttribute('disabled');
      }

      const clickedElement = event.target as HTMLElement;
      if (clickedElement) {
        const loginTextContent = clickedElement.innerText;

        const login = loginTextContent.split('\n')[0];
        chatUser.innerHTML = login;

        const socket = new WebSocket('ws://127.0.0.1:4000');

        socket.addEventListener('open', function () {
          const usersActive = {
            id: `id_${login.split('\n')[0]}`,
            type: 'USER_ACTIVE',
            payload: null,
          };
          socket.send(JSON.stringify(usersActive));
        });

        socket.addEventListener('message', function (e) {
          const messageData = JSON.parse(e.data);
          if (messageData.type === 'USER_ACTIVE') {
            const activeUser = messageData.payload.users;
            const isUserActive = activeUser.some(
              (user: { login: string }) => user.login === login,
            );
            if (isUserActive) {
              statusUser.innerHTML = 'Online';
              statusUser.style.color = onlineColor;
            } else {
              statusUser.innerHTML = 'Offline';
              statusUser.style.color = offlineColor;
            }
            socket.close();
          }
        });
      }
    });
  }
}
