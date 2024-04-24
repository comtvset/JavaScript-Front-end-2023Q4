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
  const wrapMessages = document.querySelector('.wrap-messages');

  console.log('Получено сообщение:', message);
  // console.log('Получено сообщение:', message.text);

  const messageContainer = document.createElement('div');
  wrapMessages?.appendChild(messageContainer);
  messageContainer.classList.add('message-container');

  const messageWrap = document.createElement('div');
  messageContainer?.appendChild(messageWrap);
  messageWrap.classList.add('message-wrap');

  const messageInfo = document.createElement('div');
  messageWrap?.appendChild(messageInfo);
  messageInfo.classList.add('message-info');

  const messageText = document.createElement('div');
  messageWrap?.appendChild(messageText);
  messageText.classList.add('message-text');
  messageText.innerHTML = message.text;

  const messageStatus = document.createElement('div');
  messageWrap?.appendChild(messageStatus);
  messageStatus.classList.add('message-status');
}
