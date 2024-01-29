import { duck } from './gameCollection.js'

const answer = document.querySelector('.game_top_left');
const clueY = document.querySelector('.game_top_right');
const clueX = document.querySelector('.game_bottom_left');
const field = document.querySelector('.game_bottom_right');

let arrY = [];
let arrX = [];
let enterY = 0;
let enterX = 0;

function createFild(arr, cellY, cellX) {
    const x = arr[0].length;
    const y = arr.length;

    console.log(x)
    console.log(y)

    const sizeCell = 22;


    const cell = x * y;
    const width = x * sizeCell;
    const height = cellY * sizeCell;
    const cellsX = sizeCell * cellX;

    field.style.width = `${width}px`;

    for (let i = 0; i < cell; i++) {
        const cell = document.createElement('div');
        field.appendChild(cell);
        cell.classList.add('cell');
    }

    const flatArr = arr.flat(Infinity);
    let cells = document.querySelectorAll('.cell');
    cells = [...cells];

    for (let i = 0; i < flatArr.length; i++) {
        if (flatArr[i] === 1) {
            cells[i].classList.add('black');
        }
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

    // console.log(rowArr)
    // console.log(columnArr)

    clueY.style.height = `${height}px`;
    answer.style.height = `${height}px`;
    clueX.style.width = `${cellsX}px`;
    clueX.style.height = `${cellsX}px`;

    for (let i = 0; i < columnArr.length; i++) {
        createClueY(columnArr[i], cellY, columnArr.length);
    }

    // console.log(arrY);

    if (cellY > 1 || cellX > 1) {
        for (let i = 0; i < cellY*cellX; i++) {
            const clue = document.createElement('div');
            answer.appendChild(clue);
            clue.classList.add('clue');
        }
    }

    for (let i = 0; i < rowArr.length; i++) {
        createClueX(rowArr[i], cellX, rowArr.length);
    }
}

function createClueY(array, cellY, test) {
    const length = test;

    // console.log(test)

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
    // console.log(arrY);

    if (enterY === length) {
        console.log(arrY)
        for (let i = 0; i < arrY.length; i++) {
            for (let j = 0; j < arrY[i].length; j++) {
                const clue = document.createElement('div');
                clueY.appendChild(clue);
                clue.classList.add('clue');
                clue.innerHTML = arrY[i][j];
            }
        }
    }
}

function createClueX(array, cellX, test) {
    const length = test;

    // console.log(array.length)

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

    // console.log(arrX)

    if (cellX > 1) {
        for (let i = 0; i < arrX.length; i++) {
            if (arrX[i].length < cellX) {
                arrX[i].unshift('');
            }
        }
    }

    // console.log(arrY);

    if (enterX === length) {
        for (let i = 0; i < arrX.length; i++) {
            for (let j = 0; j < arrX[i].length; j++) {
                const clue = document.createElement('div');
                clueX.appendChild(clue);
                clue.classList.add('clue');
                clue.innerHTML = arrX[i][j];
            }
        }
    }
}

// createFild(plane, 2, 1);
// createFild(hash, 2, 2);
// createFild(dog, 1, 2);
createFild(duck, 4, 3);
// createFild(fish, 3, 2);

// console.log(
//     `
//     Basic scope +80 points ❌
//       - layout, design, responsive UI: +20 ❌
//       - at the beginning state of the game, the frame has size 5x5. The sequence of numbers is logically arranged and help the player solve the nonogram: +20 ❌
//       - cells and clues are divided by dividers as described in Basic block: +5 ❌
//       - when user clicks on cells using mouse left-click - it should be mark as dark. When user click on dark cell - it should be mark as empty (white) cell: +15 ❌
//       - the game should end when the player reveals all black cells correctly and related message is displayed at the end of the game: +20 ❌

//     Advanced scope +90 points ❌
//       - the game should have at least 5 templates for easy level (5x5) and the player is able to choose what picture he/she wants to solve. +15 ❌
//       - a player is able to fill in a cell in the grid changing the color of the grid to crossed-cell(X) using right mouse-click. Context menu doesn't appear: +20 ❌
//       - the game can be restarted without reloading the page: +15 ❌
//       - game duration is displayed, stop-watch will start after first click on field (not on clues) and related message is displayed at the end of the game: +10 ❌
//       - sound accompaniment (on/off) for every events (see Advanced block): +15 ❌
//       - implemented saving the state of the laResult game and "Continue last game" button: +15 ❌

//     Hacker scope +80 points ❌
//       - option to choose different themes for the game board (dark/light themes): +15 ❌
//       - ability to change the size (5x5, 10x10, 15x15) is implemented and there are least 5 templates for each level: +20 ❌
//       - implemented saving the laResult 5 win results with sorting: +15 ❌
//       - "random game" button is implemented. When player clicks on button - the random template appears (both template and level must be chosen randomly by algorithm): +15 ❌
//       - "Solution" button is implemented. When player clicks on button - the field is filled in cells with right solution. Such games is not recorded into winning table: +15 ❌
//     `
// );
