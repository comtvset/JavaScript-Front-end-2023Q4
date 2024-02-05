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
    resultsButton,
    resultWindow,
    resultClose,
    resultMessage,
    soundButton,
    themeButton,
} = buildHTML();
const { startTimer, resumeTimer, stopTimer, resetTimer } = timer();

const soundClickLeft = document.createElement('audio');
soundClickLeft.src = './assets/sound/click_left.mp3';
const soundClickRight = document.createElement('audio');
soundClickRight.src = './assets/sound/click_right.mp3';
const soundCellEmpty = document.createElement('audio');
soundCellEmpty.src = './assets/sound/cell_empty.mp3';
const soundWin = document.createElement('audio');
soundWin.src = './assets/sound/win.mp3';

let soundHandler = false;
let themeHandler = false;

const difficultArr = [];
for (let i = 0; i < select.length; i++) {
    difficultArr.push(select.options[i].innerHTML);
}

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
        saveButton.disabled = true;
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

            if (cell.classList.contains('black')) {
                if (soundHandler === true) {
                    soundClickLeft.play();
                } else {
                    soundClickLeft.pause();
                }
            } else {
                if (soundHandler === true) {
                    soundCellEmpty.play();
                } else {
                    soundCellEmpty.pause();
                }
            }

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

                if (soundHandler === true) {
                    soundCellEmpty.play();
                } else {
                    soundCellEmpty.pause();
                }
            } else {
                cell.innerHTML = '×';

                if (soundHandler === true) {
                    soundClickRight.play();
                } else {
                    soundClickRight.pause();
                }
            }
            startTimer();
            saveButton.disabled = false;
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

    const value = checkArrName();
    const currentTime = timeCurrent.innerHTML;

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
        modalMessage.innerHTML = `Great! You have solved the "${nameGame.charAt(0).toUpperCase() + nameGame.slice(1)}" nonogram in ${timeCurrent.innerHTML}!`;

        modalClose.addEventListener('click', () => {
            overlay.style.display = 'none';
            modalWindow.style.display = 'none';
            reset();
        });

        if (soundHandler === true) {
            soundWin.play();
        } else {
            soundWin.pause();
        }

        let difficult = '';

        for (let i = 0; i < difficultArr.length; i++) {
            if (difficultArr[i].endsWith(value)) {
                const substr = difficultArr[i].substring(
                    0,
                    difficultArr[i].indexOf(' ')
                );
                difficult = substr;
            }
        }

        let readLS = JSON.parse(localStorage.getItem('saveResult')) || [];

        const saveResult = {
            time: currentTime,
            nameGame: value,
            difficult: difficult,
        };

        readLS.push(saveResult);

        let sortResult = readLS.sort((a, b) =>
            Object.values(a)[0].localeCompare(Object.values(b)[0])
        );

        if (sortResult.length > 5) {
            sortResult = sortResult.slice(0, -1);
        }
        localStorage.setItem('saveResult', JSON.stringify(sortResult));

        topResults('win');
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
    loadGame();
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
        loadButton.disabled = false;

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
        loadGame();
    });
}

export function loadGame() {
    const checkSave = JSON.parse(localStorage.getItem('saveItems'));

    if (checkSave != null) {
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
    } else {
        loadButton.disabled = true;
    }
}

export function topResults(status) {
    let readLS = JSON.parse(localStorage.getItem('saveResult'));

    if (status === 'win') {
        const spans = document.querySelectorAll('.result-message');
        for (let i = 0; i < spans.length; i++) {
            spans[i].remove();
        }
    }

    for (const key in readLS) {
        resultMessage.innerHTML = '';

        const resultMessageCur = document.createElement('span');
        resultMessageCur.classList.add('result-message');
        resultWindow.appendChild(resultMessageCur);

        const element = readLS[key];
        resultMessageCur.innerHTML = `${element.nameGame} - ${element.difficult} - ${element.time}`;
    }

    resultsButton.addEventListener('click', () => {
        overlay.style.display = 'flex';
        resultWindow.style.display = 'flex';
    });

    resultClose.addEventListener('click', () => {
        overlay.style.display = 'none';
        resultWindow.style.display = 'none';
    });
}

export function sound() {
    soundButton.addEventListener('click', () => {
        if (soundHandler) {
            soundButton.classList.remove('press');
        } else {
            soundButton.classList.add('press');
        }
        soundHandler = !soundHandler;
    });
}


export function theme() {
    const html = document.querySelector('html');

    themeButton.addEventListener('click', () => {
        if (themeHandler) {
            console.log('white')
            html.style.backgroundColor = 'white'
            // soundButton.classList.remove('press');
        } else {
            console.log('black')
            html.style.backgroundColor = '#2b2b2b'
            // soundButton.classList.add('press');
        }
        themeHandler = !themeHandler;
    });
}