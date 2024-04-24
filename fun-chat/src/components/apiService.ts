import createMessage from '../services/createMessage';
import createUsersList from '../services/createUserList';

export default async function openSocket(name: string, password: string) {
  const user = {
    id: `id_${name}`,
    type: 'USER_LOGIN',
    payload: {
      user: {
        login: name,
        password: password,
      },
    },
  };

  const usersActive = {
    id: `id_${name}`,
    type: 'USER_ACTIVE',
    payload: null,
  };

  const usersInActive = {
    id: `id_${name}`,
    type: 'USER_INACTIVE',
    payload: null,
  };

  const socket = new WebSocket('ws://127.0.0.1:4000');

  socket.addEventListener('open', function () {
    // Отправка запроса на сервер
    socket.send(JSON.stringify(user));
    socket.send(JSON.stringify(usersActive));
    socket.send(JSON.stringify(usersInActive));
    createUsersList('bot', true, true);
  });

  // Обработчик события получения сообщения от сервера
  socket.addEventListener('message', function (event) {
    const messageData = JSON.parse(event.data);

    createUsersList('bot', false, true);

    function updateUser() {
      const usersList = messageData.payload;
      // console.log(usersList);
      if (usersList.users) {
        for (let i = 0; i < usersList.users.length; i++) {
          createUsersList(
            usersList.users[i].login,
            usersList.users[i].isLogined,
          );
        }
      } else {
        createUsersList(usersList.user.login, usersList.user.isLogined);
      }
    }

    if (messageData.type === 'MSG_SEND') {
      const message = messageData.payload.message;
      createMessage(message);
    }

    if (messageData.type === 'USER_EXTERNAL_LOGIN') {
      updateUser();
    }

    if (messageData.type === 'USER_EXTERNAL_LOGOUT') {
      updateUser();
    }

    if (messageData.type === 'USER_ACTIVE') {
      updateUser();
    }

    if (messageData.type === 'USER_INACTIVE') {
      updateUser();
    }
  });

  const send = document.getElementById('button-send-message');
  const chatUser = document.getElementById('chat-user');
  const sendMessage = document.getElementById('wrap-send-message');

  send?.addEventListener('click', () => {
    if (sendMessage instanceof HTMLInputElement) {
      if (sendMessage.value !== '') {
        if (sendMessage) {
          const message = {
            id: `id_${name}`,
            type: 'MSG_SEND',
            payload: {
              message: {
                to: chatUser?.textContent,
                text: sendMessage.value,
              },
            },
          };
          socket.send(JSON.stringify(message));
          sendMessage.value = '';
        }
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    const btnSend = document.getElementById('button-send-message');

    if (
      chatUser &&
      chatUser instanceof HTMLElement &&
      chatUser.textContent !== ''
    ) {
      if (btnSend) {
        btnSend.removeAttribute('disabled');
      }
      if (sendMessage instanceof HTMLInputElement) {
        if (event.code === 'Enter' && sendMessage.value !== '') {
          if (sendMessage) {
            const message = {
              id: `id_${name}`,
              type: 'MSG_SEND',
              payload: {
                message: {
                  to: chatUser?.textContent,
                  text: sendMessage.value,
                },
              },
            };
            socket.send(JSON.stringify(message));
            sendMessage.value = '';
          }
        }
      }
    }
  });

  const exit = document.getElementById('button-main-exit');
  exit?.addEventListener('click', () => {
    sessionStorage.setItem('$$$nickname', '');
    sessionStorage.setItem('$$$password', '');

    socket.close();

    createUsersList(name, false);
  });

  const about = document.getElementById('button-main-about');

  about?.addEventListener('click', () => {
    socket.close();
  });
}
