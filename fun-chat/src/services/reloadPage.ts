import entry from '../components/router';
import checkUser from './checkUser';

export default function reloadPage() {
  const storedNickname = sessionStorage.getItem('$$$nickname');
  const storedPassword = sessionStorage.getItem('$$$password');

  if (storedNickname && storedPassword) {
    checkUser(storedNickname, storedPassword);
  } else {
    entry('login');
  }
}
