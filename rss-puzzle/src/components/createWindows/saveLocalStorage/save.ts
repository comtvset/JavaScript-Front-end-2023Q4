export default function save(inputArr: string[]) {
  localStorage.setItem('user', JSON.stringify(inputArr));
}
