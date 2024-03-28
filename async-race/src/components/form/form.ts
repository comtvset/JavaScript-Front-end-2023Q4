export default class Form {
  form: HTMLFormElement;

  constructor(parent: HTMLDivElement) {
    this.form = document.createElement('form');
    // this.form.classList.add('form-style');
    parent.appendChild(this.form);
  }

  createInput(type: string, id: string, className: string, value?: string) {
    const label = document.createElement('label');
    this.form.appendChild(label);
    label.setAttribute('for', id);

    const input = document.createElement('input');
    this.form.appendChild(input);
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('name', id);
    if (value) {
      input.setAttribute('value', value);
    }
    input.classList.add(className);
  }

  addButton(buttonText: string, onClickHandler: () => void) {
    const button = document.createElement('input');
    this.form.appendChild(button);
    button.setAttribute('type', 'button');
    button.setAttribute('value', buttonText);
    button.addEventListener('click', onClickHandler);
  }
}

// <form id="create***">
//     <label for="createTextInput***"></label>
//     <input type="text" id="createTextInput***" name="createTextInput***" class="textInput">

//     <label for="createColorInput***"></label>
//     <input type="color" id="createColorInput***" name="createColorInput***" class="colorInput" value="#ffffff">

//     <input type="button" class="buttonInput" value="Create***" onclick="action()***">
//</form>
