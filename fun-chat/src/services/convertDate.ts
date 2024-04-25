export default function formatDate(date: number) {
  const currentDate = new Date(date);
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let period = 'AM';

  if (hours > 12) {
    hours -= 12;
    period = 'PM';
  }

  if (hours === 12) {
    period = 'PM';
  }

  if (minutes < 10) {
    minutes = parseInt(`0${minutes}`);
  }

  if (seconds < 10) {
    seconds = parseInt(`0${seconds}`);
  }

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${period}`;
}