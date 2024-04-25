interface INewMessage {
  datetaime: number;
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

const userSettings: Record<string, { count: number; opacity: number }> = {};

export default function newMessage(message: INewMessage) {
  const settings = userSettings[message.from] || { count: 1, opacity: 1 };

  const userElement = document.getElementById(`id_${message.from}`);
  const newMSGElement = userElement?.nextSibling as HTMLElement | null;

  if (newMSGElement) {
    newMSGElement.textContent = `${settings.count++}`;
    newMSGElement.style.opacity = `${settings.opacity}`;
  }

  userSettings[message.from] = settings;

  const wrapMessagesElement = document.querySelector(
    '.wrap-messages',
  ) as HTMLElement | null;
  if (
    wrapMessagesElement &&
    !wrapMessagesElement.dataset.clickHandlerAttached
  ) {
    wrapMessagesElement.addEventListener('click', function () {
      for (const key in userSettings) {
        if (Object.prototype.hasOwnProperty.call(userSettings, key)) {
          userSettings[key].count = 0;
          userSettings[key].opacity = 0;
        }
      }
      for (const key in userSettings) {
        if (Object.prototype.hasOwnProperty.call(userSettings, key)) {
          const user = document.getElementById(`id_${key}`);
          const newMSG = user?.nextSibling as HTMLElement | null;
          if (newMSG) {
            newMSG.textContent = `${userSettings[key].count}`;
            newMSG.style.opacity = `${userSettings[key].opacity}`;
          }
        }
      }
    });
    wrapMessagesElement.dataset.clickHandlerAttached = 'true';
  }
}
