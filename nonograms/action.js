import { buildHTML } from './buildHTML.js';
import { timer } from './timer.js';
import { selectGame } from './select.js';
import { sendArr } from './field.js';
import { games } from './gameCollection.js';

const timeFinish = document.getElementById('time-finish');

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
    clueX,
    clueY,
} = buildHTML();
const { startTimer, stopTimer, resetTimer, updateTime } = timer();

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

function check() {
    let cells = field.querySelectorAll('.cell');
    let trueCells = 0;
    let count = 0;
    let emptyCells = 0;

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

    if (trueCells === count && emptyCells === 0) {
        const nameGame = checkArrName();
        stopTimer();
        overlay.style.display = 'flex';
        modalWindow.style.display = 'flex';
        modalMessage.innerHTML = `Great! You have solved the "${nameGame.charAt(0).toUpperCase() + nameGame.slice(1)}" nonogram in ${timeFinish.innerHTML}!`;

        modalClose.addEventListener('click', () => {
            overlay.style.display = 'none';
            modalWindow.style.display = 'none';
            reset();
        });
    }
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
    });
}
