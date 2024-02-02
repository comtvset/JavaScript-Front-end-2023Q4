import { createClueX, createClueY } from './clue.js';
import { buildHTML } from './buildHTML.js';

const { clueX, clueY, field, answer } = buildHTML();

let currentArr = [];

export function createField(arr, cellY, cellX) {
    currentArr = arr;
    const x = arr[0].length;
    const y = arr.length;

    const sizeCell = 22;

    const cell = x * y;
    const width = x * sizeCell;
    const height = cellY * sizeCell;
    const cellsX = sizeCell * cellX;

    field.style.width = `${width}px`;

    const removeCells = document.querySelectorAll('.cell');
    for (let i = 0; i < removeCells.length; i++) {
        removeCells[i].remove();
    }

    for (let i = 0; i < cell; i++) {
        const cell = document.createElement('div');
        field.appendChild(cell);
        cell.classList.add('cell');

        if (width === 220) {
            field.style.width = `${width+1}px`
            if (i >= 50 && i <= 59) {
                cell.classList.add('lineX');
            }
            if (i % 10 === 5 && i <= 95) {
                cell.classList.add('lineY');
            } else {
                cell.classList.add('cell');
            }
        } else {
            cell.classList.add('cell');
        }

        if (width+0 === 330) {
            field.style.width = `${width+2}px`
            if ((i >= 75 && i <= 89) || (i >= 150 && i <= 164)) {
                cell.classList.add('lineX');
            }
            if (
                [
                    5, 10, 20, 25, 35, 40, 50, 55, 65, 70, 80, 85, 95, 100, 110,
                    115, 125, 130, 140, 145, 155, 160, 170, 175, 185, 190, 200,
                    205, 215, 220,
                ].includes(i)
            ) {
                cell.classList.add('lineY');
            } else {
                cell.classList.add('cell');
            }
        } else {
            cell.classList.add('cell');
        }
    }

    const flatArr = arr.flat(Infinity);
    let cells = document.querySelectorAll('.cell');
    cells = [...cells];

    for (let i = 0; i < flatArr.length; i++) {
        if (flatArr[i] === 1) {
            cells[i].classList.add('true');
        } else {cells[i].classList.add('false');}
    }

    let columnArr = [];
    let rowArr = arr;

    for (let i = 0; i < arr[0].length; i++) {
        let newArr = [];
        for (let j = 0; j < arr.length; j++) {
            newArr.push(arr[j][i]);
        }
        columnArr.push(newArr);
    }

    clueY.style.height = `${height}px`;
    answer.style.height = `${height}px`;
    clueX.style.width = `${cellsX}px`;
    clueX.style.height = `${sizeCell * x}px`;

    for (let i = 0; i < columnArr.length; i++) {
        createClueY(columnArr[i], cellY, columnArr.length);
    }

    if (cellY > 1 || cellX > 1) {
        for (let i = 0; i < cellY * cellX; i++) {
            const clue = document.createElement('div');
            answer.appendChild(clue);
            clue.classList.add('clue');
        }
    }

    for (let i = 0; i < rowArr.length; i++) {
        createClueX(rowArr[i], cellX, rowArr.length);
    }
}

export function sendArr() {
    return currentArr;
}
