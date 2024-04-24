import openSocket from '../components/apiService';
import entry from '../components/router';

interface IUser {
  nick: string;
  password: string;
}

function saveUser(nicknameValue: string, passwordValue: string) {
  const storedUserString = localStorage.getItem('$$$users');

  let users: { [key: string]: IUser } = {};

  if (storedUserString) {
    users = JSON.parse(storedUserString);
  }

  const newUser: IUser = {
    nick: nicknameValue,
    password: passwordValue,
  };

  users[newUser.nick] = newUser;

  localStorage.setItem('$$$users', JSON.stringify(users));
}

export default function checkUser(
  nicknameValue: string,
  passwordValue: string,
) {
  const storedUserString = localStorage.getItem('$$$users');

  const socket = new WebSocket('ws://127.0.0.1:4000');

  const test = {
    id: 'test',
    type: 'USER_ACTIVE',
    payload: null,
  };

  socket.addEventListener('open', function () {
    socket.send(JSON.stringify(test));
  });

  let flag = false;

  socket.addEventListener('message', function (event) {
    const messageData = JSON.parse(event.data);
    const usersList = messageData.payload;
    const activeUser = usersList.users;
    for (let i = 0; i < activeUser.length; i++) {
      if (activeUser[i].login === nicknameValue) {

        sessionStorage.setItem('$$$nickname', '');
        sessionStorage.setItem('$$$password', '');
        alert('A user with this login is already authorized');
        flag = true;
        socket.close();
      }
    }

    if (flag) {
      return;
    } else {
      if (storedUserString !== null) {
        const storedUser = JSON.parse(storedUserString);

        if (nicknameValue in storedUser) {
          if (storedUser[nicknameValue].password === passwordValue) {
            entry('main', nicknameValue);
            openSocket(nicknameValue, passwordValue);
            socket.close();
            //****запустить чат
          } else {
            alert('Password is wrong');
            sessionStorage.setItem('$$$nickname', '');
            sessionStorage.setItem('$$$password', '');
          }
        } else {
          saveUser(nicknameValue, passwordValue);
          entry('main', nicknameValue);
          openSocket(nicknameValue, passwordValue);
          socket.close();
          //****запустить чат
        }
      } else {
        saveUser(nicknameValue, passwordValue);
        entry('main', nicknameValue);
        openSocket(nicknameValue, passwordValue);
        socket.close();
        //****запустить чат
      }
    }
  });
}
