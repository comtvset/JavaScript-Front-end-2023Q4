import MainWindow from './mainWindow';
import './mainPage.css';
import './wrapDialog.css';
import './wrapUsers.css';
import goTo from '../../components/router';

export default function openMainWindow() {
  const body = document.querySelector('body') as HTMLBodyElement;
  const myMainWindow = new MainWindow(body, 'main-page');
  const mainPage = myMainWindow.getClass();
  const myHeader = new MainWindow(mainPage, 'header');
  myHeader.addSpan('CurrentUser', 'cur-user', 'user');
  myHeader.addSpan('FunChat', 'title-header', 'title-header');
  myHeader.addButton('About', 'button-main', 'button-main-about', 'click', () =>
    goTo('about'),
  );
  myHeader.addButton('Exit', 'button-main', 'button-main-exit', 'click', () =>
    goTo('login'),
  );

  const mainContainer = new MainWindow(mainPage, 'main-container');
  const myContainer = mainContainer.getClass();
  const wrapUsersInfo = new MainWindow(myContainer, 'wrap-users-info');

  const wrapSearch = wrapUsersInfo.getClass();
  const myWrapSearch = new MainWindow(wrapSearch, 'wrap-search');
  myWrapSearch.addInput('wrap-search', 'search', 'search...');

  const wrapUsers = wrapUsersInfo.getClass();
  const myWrapUsers = new MainWindow(wrapUsers, 'wrap-users');
  myWrapUsers.getClass();

  const wrapDialog = new MainWindow(myContainer, 'wrap-dialog');

  const wrapInfoUser = wrapDialog.getClass();
  const myInfoUser = new MainWindow(wrapInfoUser, 'wrap-info-user');
  myInfoUser.addSpan('ChatUser', 'chat-user', 'user');
  myInfoUser.addSpan('Online', 'status-user', 'user');

  const wrapMessages = wrapDialog.getClass();
  const myWrapMessages = new MainWindow(wrapMessages, 'wrap-messages');
  myWrapMessages.getClass();

  const wrapSendMessageUser = wrapDialog.getClass();
  const myWrapSendMessageUser = new MainWindow(
    wrapSendMessageUser,
    'wrap-send-message-user',
  );
  myWrapSendMessageUser.addInput('wrap-send-message', 'text', 'message...');
  myWrapSendMessageUser.addButton(
    'Send',
    'button-main',
    'button-send-message',
    'submit',
    () => console.log('Submit'),
    'submit',
  );

  const myFooter = new MainWindow(mainPage, 'footer');
  myFooter.addLink('RSSchool', 'https://rs.school/', 'footer-span');
  myFooter.addLink('danArti', 'https://github.com/comtvset', 'footer-span');
  myFooter.addSpan('2024', 'footer-year', 'footer-span');
}
