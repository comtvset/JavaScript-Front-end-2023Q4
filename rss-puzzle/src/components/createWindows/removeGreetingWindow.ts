export default function removeGreetingWindow(logout = false) {
  const exit = document.querySelector('.exit');
  const greetingWindow = document.querySelector('.greeting-window');
  if (exit) {
    if (logout) {
      exit.remove();
      greetingWindow?.remove();
      localStorage.removeItem('user');
    } else {
      greetingWindow?.remove();
    }
  }

}
