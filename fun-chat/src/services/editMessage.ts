export default function editMessage() {
  const trash = document.querySelectorAll('.trash');

  trash.forEach((item) => {
    item.addEventListener('click', function () {
      const messageContainer = item.parentElement?.parentElement?.parentElement;
      const messageID = messageContainer?.id;
      messageContainer?.remove();

      const socket = new WebSocket('ws://127.0.0.1:4000');
      socket.addEventListener('open', function () {
        const deleteMessage = {
          id: 'test_delete',
          type: 'MSG_DELETE',
          payload: {
            message: {
              id: messageID,
            },
          },
        };
        socket.send(JSON.stringify(deleteMessage));
      });
    });
  });

}
