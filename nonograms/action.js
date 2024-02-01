import { buildHTML } from './buildHTML.js';
const { field } = buildHTML();

export function leftClick() {
    let cells = field.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            cell.classList.toggle('black');
            if (cell.innerHTML === 'X') {
                cell.innerHTML = '';
                cell.classList.remove('cross');
                cell.classList.add('black');
            }
            check();
        });
    });
}

export function rightClick() {
    let cells = field.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            cell.classList.toggle('cross');
            if (cell.classList.contains('black')) {
                cell.classList.remove('black');
            }
            if (cell.innerHTML === 'X') {
                cell.innerHTML = '';
            } else {
                cell.innerHTML = 'X';
            }
        });
    });
}

function check() {
    let cells = field.querySelectorAll('.cell');
    let trueCells = 0;
    let count = 0;
    cells.forEach((cell) => {
        if (cell.classList.contains('true')) {
            trueCells++;
        }
        if (
            cell.classList.contains('true') &&
            cell.classList.contains('black')
        ) {
            count++;
        }
    });

    if (trueCells === count) {
        console.log('You won!');
    }
}
