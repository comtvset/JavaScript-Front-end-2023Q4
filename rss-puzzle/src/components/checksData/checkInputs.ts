// import Button from '../createLoginWindow/button/button';

import Button from '../createWindows/button/button';

export default function checkForm(button: Button, inputValues?: string[]) {
  const formField = document.querySelectorAll('.input-login');
  let isFormValid = true,
    isFirstName = true,
    isSecondName = true;
  const regex = /^[A-Z][a-zA-Z]*(-[a-zA-Z]*)*$/;

  function check() {
    isFormValid = false;
    isFirstName = false;
    isSecondName = false;

    if (inputValues !== undefined) {
      const validateInput = (index: number, minLength: number) => {
        const value = inputValues[index];
        const isValid = value.length >= minLength && regex.test(value);
        const backgroundColor = isValid ? '#b8cfb8' : '#e0c8c8';

        formField.forEach((el, i) => {
          if (i === index && el instanceof HTMLElement) {
            el.style.backgroundColor = backgroundColor;
          }
        });

        return isValid;
      };

      isFirstName = validateInput(0, 3);
      isSecondName = validateInput(1, 4);

      if (isFirstName && isSecondName) {
        isFormValid = true;
      }
    }

    return isFormValid;
  }

  check();

  formField.forEach((item) => {
    if (isFormValid) {
      button.removeAtt();
    } else {
      button.setAtt();
    }

    if (item instanceof HTMLInputElement) {
      if (item.value === '') {
        if (item instanceof HTMLElement) {
          item.style.backgroundColor = 'white';
        }
      }
    }
  });
}
