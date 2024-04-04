export default function selectAllCars(startButton: HTMLElement, flag?: boolean) {
  const allCars = document.querySelectorAll('.car-my-style');
  allCars.forEach((item) => {
    if (item instanceof SVGElement) {
      if (
        item &&
        item.parentNode &&
        item.parentNode.parentNode &&
        item.parentNode.parentNode.parentNode
      ) {
        const buttonReset =
          item.parentNode.parentNode.parentNode.childNodes[0].childNodes[1];
        const buttonStart =
          item.parentNode.parentNode.parentNode.childNodes[0].childNodes[1]
            .previousSibling;
        if (
          buttonReset instanceof HTMLButtonElement &&
          buttonStart instanceof HTMLButtonElement
        ) {
          if (!buttonReset.disabled && true) {
            item.style.transform = 'translateX(0px)';
            if (startButton && buttonStart) {
              buttonStart.disabled = false;
            }
          } else if ((!buttonReset.disabled && flag)) {
            item.style.transform = 'translateX(0px)';
            buttonStart.disabled = false;
          }
        }
      }
    }
  });
}