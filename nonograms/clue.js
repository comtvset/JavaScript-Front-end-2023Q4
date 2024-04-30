import { buildHTML } from './buildHTML.js';

const { clueX, clueY } = buildHTML();

let arrY = [];
let arrX = [];
let enterY = 0;
let enterX = 0;

export function cleanClue() {
    arrY = [];
    arrX = [];
    enterY = 0;
    enterX = 0;

    const removeClue = document.querySelectorAll('.clue');
    for (let i = 0; i < removeClue.length; i++) {
        removeClue[i].remove();
    }
}

export function createClueY(array, cellY, length) {
    enterY++;
    let count = 0;
    let arrResult = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i] !== 0) {
            count++;
        }
        if (array[i] === 0 || i === array.length - 1) {
            if (count === 0) {
                continue;
            } else {
                arrResult.push(count);
                count = 0;
            }
        }
    }

    arrY.push(arrResult);

    if (cellY > 1) {
        for (let i = 0; i < arrY.length; i++) {
            while (arrY[i].length < cellY) {
                arrY[i].unshift('');
            }
        }
    }

    if (enterY === length) {
        for (let i = 0; i < arrY.length; i++) {
            for (let j = 0; j < arrY[i].length; j++) {
                const clue = document.createElement('div');
                clueY.appendChild(clue);
                clue.classList.add('clue');
                clue.innerHTML = arrY[i][j];
                if (i === 5 || i === 10) {
                    clue.classList.add('lineY');
                }
            }
        }
    }
}

export function createClueX(array, cellX, length) {
    enterX++;
    let count = 0;
    let arrResult = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i] !== 0) {
            count++;
        }
        if (array[i] === 0 || i === array.length - 1) {
            if (count === 0) {
                continue;
            } else {
                arrResult.push(count);
                count = 0;
            }
        }
    }

    arrX.push(arrResult);

    if (cellX > 1) {
        for (let i = 0; i < arrX.length; i++) {
            while (arrX[i].length < cellX) {
                arrX[i].unshift('');
            }
        }
    }

    if (enterX === length) {
        for (let i = 0; i < arrX.length; i++) {
            for (let j = 0; j < arrX[i].length; j++) {
                const clue = document.createElement('div');
                clueX.appendChild(clue);
                clue.classList.add('clue');
                clue.innerHTML = arrX[i][j];
                if (i === 5 || i === 10) {
                    clue.classList.add('lineX');
                }
            }
        }
    }
}
