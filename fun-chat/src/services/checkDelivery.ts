interface IDelivery {
  id: string;
  status: {
    isDelivered: boolean;
  };
}
export default function checkDelivery(message: IDelivery) {
  console.log(message.id);
  const targetMessage = document.getElementById(message.id);
  if (targetMessage) {
    const targetChild = targetMessage.children[0].children[2].children[1];
    if (targetChild && targetChild instanceof HTMLElement) {
      targetChild.style.color = 'yellow';
    }
  }
}
