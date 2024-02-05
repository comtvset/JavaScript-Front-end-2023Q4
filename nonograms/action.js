import { buildHTML } from './buildHTML.js';
import { timer } from './timer.js';
import { selectGame } from './select.js';
import { sendArr } from './field.js';
import { games } from './gameCollection.js';

const timeCurrent = document.getElementById('time-current');

const {
    field,
    restartButton,
    solutionButton,
    select,
    randomButton,
    overlay,
    modalWindow,
    modalMessage,
    modalClose,
    saveButton,
    loadButton,
    clueX,
    clueY,
} = buildHTML();
const { startTimer, resumeTimer, stopTimer, resetTimer } = timer();

function checkArrName() {
    const currentArr = sendArr();

    for (const key in games) {
        if (Object.hasOwnProperty.call(games, key)) {
            if (games[key] === currentArr) {
                return key;
            }
        }
    }
}

export function selectClick() {
    saveButton.disabled = true;
    select.addEventListener('change', () => {
        if (select.value === 'random') {
            select.value = '';
            selectGame('random');
            leftClick();
            rightClick();
            resetTimer();
        } else {
            selectGame(select.value);
            leftClick();
            rightClick();
            resetTimer();
        }
        checkArrName();
        reset();
    });
}

export function randomGame() {
    randomButton.addEventListener('click', () => {
        selectGame('random');
        resetTimer();
        leftClick();
        rightClick();
        checkArrName();
        reset();
        select.selectedIndex = 0;
        saveButton.disabled = true;
    });
}

export function leftClick() {
    let cells = field.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            cell.classList.toggle('black');
            if (cell.innerHTML === '×') {
                cell.innerHTML = '';
                cell.classList.remove('cross');
                cell.classList.add('black');
            }
            startTimer();
            check();
            saveButton.disabled = false;
        });
    });

    let x = clueX.querySelectorAll('.clue');

    x.forEach((cell) => {
        cell.addEventListener('click', () => {
            if (cell.innerHTML !== '') {
                cell.classList.toggle('cross-for-clue');
            }
        });
    });

    let y = clueY.querySelectorAll('.clue');

    y.forEach((cell) => {
        cell.addEventListener('click', () => {
            if (cell.innerHTML !== '') {
                cell.classList.toggle('cross-for-clue');
            }
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
            if (cell.innerHTML === '×') {
                cell.innerHTML = '';
            } else {
                cell.innerHTML = '×';
            }
            startTimer();
        });
    });

    let x = clueX.querySelectorAll('.clue');

    x.forEach((cell) => {
        cell.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            if (cell.innerHTML !== '') {
                cell.classList.toggle('cross-for-clue');
            }
        });
    });

    let y = clueY.querySelectorAll('.clue');

    y.forEach((cell) => {
        cell.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            if (cell.innerHTML !== '') {
                cell.classList.toggle('cross-for-clue');
            }
        });
    });
}

function check(trueCells, count, emptyCells) {
    let cells = field.querySelectorAll('.cell');
    trueCells = 0;
    count = 0;
    emptyCells = 0;

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
        if (
            cell.classList.contains('false') &&
            cell.classList.contains('black')
        ) {
            emptyCells++;
        }
    });
    // console.log('true: ' + trueCells);
    // console.log('count: ' + count);
    // console.log('empty: ' + emptyCells);

    if (trueCells === count && emptyCells === 0) {
        const nameGame = checkArrName();
        stopTimer();
        overlay.style.display = 'flex';
        modalWindow.style.display = 'flex';
        modalMessage.innerHTML = `Great! You have solved the "${nameGame.charAt(0).toUpperCase() + nameGame.slice(1)}" nonogram in ${timeCurrent.innerHTML}!`;

        modalClose.addEventListener('click', () => {
            overlay.style.display = 'none';
            modalWindow.style.display = 'none';
            reset();
        });
    }
    return { cells, trueCells, count, emptyCells };
}

function reset() {
    resetTimer();

    let cells = field.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.classList.remove('cross');
        cell.classList.remove('black');
        cell.innerHTML = '';

        cell.classList.remove('solution-image');
    });

    saveButton.disabled = false;
    solutionButton.disabled = false;
    loadButton.disabled = false;

    field.classList.remove('pointer');
    clueY.classList.remove('pointer');
    clueX.classList.remove('pointer');

    let x = clueX.querySelectorAll('.clue');
    x.forEach((cell) => {
        cell.classList.remove('cross-for-clue');
    });

    let y = clueY.querySelectorAll('.clue');
    y.forEach((cell) => {
        cell.classList.remove('cross-for-clue');
    });
}

export function restartGame() {
    restartButton.addEventListener('click', () => {
        reset();
        saveButton.disabled = true;
    });
}

export function showSolution() {
    solutionButton.addEventListener('click', () => {
        stopTimer();

        let cells = field.querySelectorAll('.cell');
        cells.forEach((cell) => {
            if (cell.classList.contains('true')) {
                cell.classList.add('solution-image');
            }

            cell.classList.remove('cross');
            cell.classList.remove('black');
            cell.innerHTML = '';
        });

        let x = clueX.querySelectorAll('.clue');
        x.forEach((cell) => {
            cell.classList.remove('cross-for-clue');
        });

        let y = clueY.querySelectorAll('.clue');
        y.forEach((cell) => {
            cell.classList.remove('cross-for-clue');
        });

        field.classList.add('pointer');
        clueY.classList.add('pointer');
        clueX.classList.add('pointer');
        resetTimer();
        saveButton.disabled = true;
        solutionButton.disabled = true;
        loadButton.disabled = true;
    });
}

export function saveGame() {
    saveButton.addEventListener('click', () => {
        const { trueCells, count, emptyCells } = check();
        const value = checkArrName();
        const currentTime = timeCurrent.innerHTML;

        const childrenY = Array.from(clueY.children);
        const childrenDataY = childrenY.map((child) => {
            return {
                className: child.className,
            };
        });
        localStorage.setItem('saveGlueY', JSON.stringify(childrenDataY));

        const childrenX = Array.from(clueX.children);
        const childrenDataX = childrenX.map((child) => {
            return {
                className: child.className,
            };
        });
        localStorage.setItem('saveGlueX', JSON.stringify(childrenDataX));

        const saveItems = {
            trueCells: trueCells,
            count: count,
            emptyCells: emptyCells,
            nameGame: value,
            time: currentTime,
        };
        localStorage.setItem('saveItems', JSON.stringify(saveItems));

        const childrenField = Array.from(field.children);
        const childrenDataField = childrenField.map((child) => {
            return {
                className: child.className,
            };
        });
        localStorage.setItem('saveField', JSON.stringify(childrenDataField));
    });
}

export function loadGame() {
    loadButton.addEventListener('click', () => {
        saveButton.disabled = false;
        const saveItems = JSON.parse(localStorage.getItem('saveItems'));

        const time = saveItems.time;
        const trueCells = saveItems.trueCells;
        const count = saveItems.count;
        const emptyCells = saveItems.emptyCells;
        const value = saveItems.nameGame;

        select.selectedIndex = 0;

        timeCurrent.innerHTML = time;

        stopTimer();
        resumeTimer(time);

        selectGame(value);
        leftClick();
        rightClick();

        check(trueCells, count, emptyCells);

        const saveGlueY = JSON.parse(localStorage.getItem('saveGlueY'));

        const currentGlueY = clueY.children;
        for (let i = 0; i < currentGlueY.length; i++) {
            if (saveGlueY[i].className === 'clue cross-for-clue') {
                currentGlueY[i].classList.add('cross-for-clue');
            }
            if (saveGlueY[i].className === 'clue lineY cross-for-clue') {
                currentGlueY[i].classList.add('cross-for-clue');
            }
        }

        const saveGlueX = JSON.parse(localStorage.getItem('saveGlueX'));

        const currentGlueX = clueX.children;
        for (let i = 0; i < currentGlueX.length; i++) {
            if (saveGlueX[i].className === 'clue cross-for-clue') {
                currentGlueX[i].classList.add('cross-for-clue');
            }
            if (saveGlueX[i].className === 'clue lineX cross-for-clue') {
                currentGlueX[i].classList.add('cross-for-clue');
            }
        }

        const saveField = JSON.parse(localStorage.getItem('saveField'));

        const currentField = field.children;

        for (let i = 0; i < currentField.length; i++) {
            const classList = saveField[i].className.split(' ');

            if (classList.includes('black')) {
                currentField[i].classList.add('black');
            }

            if (classList.includes('cross')) {
                currentField[i].classList.add('cross');
                currentField[i].innerHTML = '×';
            }
        }
    });
}
