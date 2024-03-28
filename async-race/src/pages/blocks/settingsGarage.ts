import Button from '../../components/button/button';
import Form from '../../components/form/form';

export default function showSettings() {
  const body = document.querySelector('body');

  const settingsWrap = document.createElement('div');
  settingsWrap.classList.add('settings-wrap');
  body?.appendChild(settingsWrap);

  const createWrap = document.createElement('div');
  createWrap.classList.add('create-wrap');
  settingsWrap?.appendChild(createWrap);

  const updateWrap = document.createElement('div');
  updateWrap.classList.add('update-wrap');
  settingsWrap?.appendChild(updateWrap);

  const buttonsWrap = document.createElement('div');
  buttonsWrap.classList.add('buttons-wrap');
  settingsWrap?.appendChild(buttonsWrap);

  const create = new Form(createWrap);
  create.createInput('text', 'createTextInput', 'textInput');
  create.createInput('color', 'createColorInput', 'colorInput', '#ffffff');
  create.addButton('Create', () => {});

  const update = new Form(updateWrap);
  update.createInput('text', 'createTextInput', 'textInput');
  update.createInput('color', 'createColorInput', 'colorInput', '#ffffff');
  update.addButton('Update', () => {});

  const race = new Button(buttonsWrap);
  const reset = new Button(buttonsWrap);
  const generate = new Button(buttonsWrap);

  race.addButton('Race', () => {
    console.log('Run race');
  });

  reset.addButton('Reset', () => {
    console.log('Click reset');
  });

  generate.addButton('Generate Cars', () => {
    console.log('Generate Cars');
  });
}
