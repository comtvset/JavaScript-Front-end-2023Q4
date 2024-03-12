export default function removeGreetingWindow() {
  const exit = document.querySelector('.test');
  if (exit) {
    exit.remove();
  }
  localStorage.removeItem('user');
}
