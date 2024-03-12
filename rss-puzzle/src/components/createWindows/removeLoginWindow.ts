export default function removeLoginWindow() {
  const loginWindow = document.querySelector('.login-window');
  if (loginWindow) {
    loginWindow.remove();
  }
}
