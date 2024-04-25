import formatDate from './convertDate';
import editMessage from './editMessage';

interface IMessage {
  datetime: number;
  from: string;
  id: string;
  status: {
    isDelivered: boolean;
    isEdited: boolean;
    isReaded: boolean;
  };
  text: string;
  to: string;
}
export default function createMessage(message: IMessage) {
  const chatUser = document.getElementById('chat-user');

  const wrapMessages = document.querySelector('.wrap-messages');
  const curUser = document.getElementById('cur-user');

  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');
  messageContainer.setAttribute('id', message.id);

  if (
    (chatUser?.innerHTML !== '' && message.from === chatUser?.innerHTML) ||
    message.to === chatUser?.innerHTML
  ) {
    wrapMessages?.appendChild(messageContainer);
  }

  const messageWrap = document.createElement('div');
  messageContainer?.appendChild(messageWrap);
  messageWrap.classList.add('message-wrap');

  const messageInfo = document.createElement('div');
  messageWrap?.appendChild(messageInfo);
  messageInfo.classList.add('message-info');

  const sender = document.createElement('div');
  messageInfo?.appendChild(sender);
  sender.classList.add('sender');
  sender.innerHTML = message.from;

  const time = document.createElement('div');
  messageInfo?.appendChild(time);
  time.classList.add('time');
  time.innerHTML = String(formatDate(message.datetime));

  const messageText = document.createElement('div');
  messageWrap?.appendChild(messageText);
  messageText.classList.add('message-text');
  messageText.innerHTML = message.text;

  const messageStatus = document.createElement('div');
  messageWrap?.appendChild(messageStatus);
  messageStatus.classList.add('message-status');

  if (curUser) {
    if (message.from === curUser.textContent) {
      const trash = document.createElement('div');
      messageStatus?.appendChild(trash);
      trash.classList.add('trash');
      trash.innerHTML = '🗑️';

      const messageFixed = document.createElement('div');
      messageStatus?.appendChild(messageFixed);
      messageFixed.classList.add('message-fixed');
      if (message.status.isEdited) {
        messageFixed.innerHTML = 'edited';
      }

      const messageDelivered = document.createElement('div');
      messageStatus?.appendChild(messageDelivered);
      messageDelivered.classList.add('message-delivered');
      messageDelivered.innerHTML = '✔';
      messageDelivered.style.color = 'grey';
      if (message.status.isDelivered) {
        messageDelivered.style.color = 'yellow';
      }
      if (message.status.isReaded) {
        messageDelivered.style.color = 'green';
      }

      if (curUser.textContent === message.from) {
        messageWrap.classList.add('right');
      } else {
        messageWrap.classList.add('left');
      }
    }
  }

  wrapMessages?.scrollTo(0, wrapMessages.scrollHeight);

  editMessage();
}
