export default function removeGreetingWindow() {
  const exit = document.querySelector('.exit');
  const greetingWindow = document.querySelector('.greeting-window');
  if (exit) {
    exit.remove();
    greetingWindow?.remove();
  }
  localStorage.removeItem('user');
}
