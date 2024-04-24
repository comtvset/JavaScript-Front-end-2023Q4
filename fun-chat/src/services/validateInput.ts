function validateInput(value: string, minLength: number) {
  const regex = /^[A-Z][a-zA-Z]*(-[a-zA-Z]*)*$/;
  return value.length >= minLength && regex.test(value);
}

function applyStyle(inputField: HTMLInputElement, isValid: boolean) {
  const backgroundColor = isValid ? '#b8cfb8' : '#e0c8c8';
  inputField.style.backgroundColor = backgroundColor;
}

export default function checkForm(inputValues: HTMLInputElement[]) {
  const entryBTN = document.getElementById('button-enter');

  const loginField = inputValues[0];
  const isLoginValid = validateInput(loginField.value, 3);
  applyStyle(loginField, isLoginValid);

  const passwordField = inputValues[1];
  const isPasswordValid = validateInput(passwordField.value, 3);
  applyStyle(passwordField, isPasswordValid);

  if (isLoginValid && isPasswordValid && entryBTN) {
    entryBTN.removeAttribute('disabled');
  } else if (entryBTN) {
    entryBTN.setAttribute('disabled', 'disabled');
  }
}

