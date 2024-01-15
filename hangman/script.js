import questionsAndAnswers from './questions.js';

const html = document.querySelector('html');

// create html from js
const body = document.querySelector('body');

const header = document.createElement('header');
body.appendChild(header);
header.classList.add('header');
header.innerHTML = '<h1>HA<p class="offset">N</p>GMAN</h1>';

const main = document.createElement('main');
body.appendChild(main);
main.classList.add('main');

const animation = document.createElement('section');
main.appendChild(animation);
animation.classList.add('animation');

const animationWrap = document.createElement('div');
animation.appendChild(animationWrap);
animationWrap.classList.add('animation-wrap');

animationWrap.innerHTML = `<img src="./assets/images/gallows_static.png" alt="img" class="gallows">
    <div class="action">
        <img src="./assets/images/head_1.png" alt="img" class="head">
        <img src="./assets/images/body_2.png" alt="img" class="body-person">
        <img src="./assets/images/left-arm_3.png" alt="img" class="left-arm">
        <img src="./assets/images/right-arm_4.png" alt="img" class="right-arm">
        <img src="./assets/images/left-leg_5.png" alt="img" class="left-leg">
        <img src="./assets/images/right-leg_6.png" alt="img" class="right-leg">
    </div>`;

const interaction = document.createElement('section');
main.appendChild(interaction);
interaction.classList.add('interaction');

const interactionWrap = document.createElement('div');
interaction.appendChild(interactionWrap);
interactionWrap.classList.add('interaction-wrap');

const answerField = document.createElement('div');
interactionWrap.appendChild(answerField);
answerField.classList.add('answer');

const questionField = document.createElement('div');
interactionWrap.appendChild(questionField);
questionField.classList.add('question');

const countField = document.createElement('div');
interactionWrap.appendChild(countField);
countField.classList.add('count');
countField.innerHTML = 'Incorrect guesses: 0 / 6';

const alphabet = document.createElement('div');
interactionWrap.appendChild(alphabet);
alphabet.classList.add('alphabet');

const modalWindow = document.createElement('div');
html.appendChild(modalWindow);
modalWindow.classList.add('modal-window');

const message = document.createElement('h2');
modalWindow.appendChild(message);
// message.classList.add('---');

const messageWord = document.createElement('h3');
modalWindow.appendChild(messageWord);
// messageWord.classList.add('---');

const refresh = document.createElement('button');
//

const entries = Object.entries(questionsAndAnswers);

function createAlphabet() {
    let alpha = Array.from({ length: 26 }, (_, index) =>
        String.fromCharCode(65 + index)
    );
    for (let i = 0; i < alpha.length; i++) {
        const letter = document.createElement('div');
        alphabet.appendChild(letter);
        letter.classList.add('letter');
        letter.innerHTML = alpha[i];
    }
}

createAlphabet();

function random() {
    const result = Math.floor(Math.random() * entries.length);
    return result;
}

let answer = '';
let length = 0;

let countNumber = ['something'];

function question(any) {
    if (countNumber.includes(any)) {
        question(random());
    } else {
        if (countNumber.length <= entries.length + 1) {
            countNumber.push(any);
            length = answer.length;

            questionField.innerHTML = entries[any][0];
            answer = entries[any][1];
        } else {
            win();
        }
    }
}

question(random());

function setSecredWord(answer) {
    const secretWord = answer.toUpperCase().split('').fill('_').join(' ');
    answerField.innerHTML = secretWord;
    console.clear()
    console.log('Ask the question: '+answer)
}
setSecredWord(answer);

const head = document.querySelector('.head');
const bodyPerson = document.querySelector('.body-person');
const leftArm = document.querySelector('.left-arm');
const rightArm = document.querySelector('.right-arm');
const leftLeg = document.querySelector('.left-leg');
const rightLeg = document.querySelector('.right-leg');

const part = [head, bodyPerson, leftArm, rightArm, leftLeg, rightLeg];

let incorrect = 0;

function check(result) {
    const word = answer.toUpperCase().split('');
    let field = answerField.innerHTML.split(' ');


    if (word.includes(result.innerHTML)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === result.innerHTML) {
                field[i] = result.innerHTML;
                length = length - 1;
                result.classList.add('disable');
            }
        }
    } else {
        incorrect++;

        result.classList.add('wrong');
        countField.innerHTML = `Incorrect guesses: ${incorrect} / 6`;

        part[incorrect - 1].style.display = 'block';

        if (incorrect === 6) {
            gameOver();
        }
    }
    answerField.innerHTML = field.join(' ');

    if (!field.includes('_')) {
        if (countNumber.length - 1 >= entries.length) {
            win();
        } else {
            nextQuestion();
        }
    }
}
const letters = document.querySelectorAll('.letter');

function pressLetter(callback) {
    letters.forEach((item) => {
        item.addEventListener('click', function () {
            const result = item;
            callback(result);
        });
    });
}

pressLetter(check);

function win() {
    console.clear();
    console.log('Win');

    letters.forEach((item) => {
        item.classList.add('allDisable');
    });

    modalWindow.style.display = 'flex';
    message.innerHTML = 'You Win!';
    messageWord.innerHTML = `Secret word: ${answer}`;

    modalWindow.appendChild(refresh);
    refresh.classList.add('button');
    refresh.innerHTML = 'Restart';
}

function gameOver() {
    console.clear();
    console.log('Game Over');

    letters.forEach((item) => {
        item.classList.add('allDisable');
    });

    modalWindow.style.display = 'flex';

    message.innerHTML = 'You Loose:(';
    messageWord.innerHTML = `Secret word: ${answer}`;

    modalWindow.appendChild(refresh);
    refresh.classList.add('button');
    refresh.innerHTML = 'Try again';
}

document.addEventListener('keyup', function (event) {
    const key = event.key.toUpperCase();

    letters.forEach((item) => {
        if (item.innerHTML === key) {
            if (item.classList.length > 1) {
                true;
            } else {
                const result = item;
                check(result);
            }
        }
    });
});

function nextQuestion() {
    question(random());
    setSecredWord(answer);
    length = answer.length;

    letters.forEach((item) => {
        item.classList.remove('disable');
        item.classList.remove('wrong');
        item.classList.remove('allDisable');
    });
}

refresh.addEventListener('click', () => {
    countNumber = ['something'];
    question(random());
    setSecredWord(answer);
    length = answer.length;
    incorrect = 0;

    letters.forEach((item) => {
        item.classList.remove('disable');
        item.classList.remove('wrong');
        item.classList.remove('allDisable');
    });

    head.style.display = 'none';
    bodyPerson.style.display = 'none';
    leftArm.style.display = 'none';
    rightArm.style.display = 'none';
    leftLeg.style.display = 'none';
    rightLeg.style.display = 'none';

    countField.innerHTML = `Incorrect guesses: ${incorrect} / 6`;
    modalWindow.style.display = 'none';
});


// console.log(
//     `
//     1. Responsive/adaptive UI from 1440px to 360px viewport: +10 ✅
//     2. The generation of DOM elements is implemented. body in the index.html is empty (can contain only script tag). This requirement can be checked by pressing Ctrl+U (Windows) or Option(⌥)+Command(⌘)+U (Mac): +20 ✅
//     3. The game starts with the correct default view (empty gallows, underscores for secret word, etc.) and a random question: +5 ✅
//     4. The user can play the game by using the virtual keyboard: +20 ✅
//     5. The user can play the game by using the physical keyboard: +20 ✅
//     6. When the letter is correct, it appears instead of the corresponding underscore. If the letter repeats in the word, all corresponding underscores must be replaced by it: +15 ✅
//     7. When the letter is incorrect:
//       - the incorrect guesses counter is updated: +5 ✅
//       - a body part is added to the gallows: +10 ✅
//     8. The clicked/pressed letter is disabled: +5 ✅
//     9. The body parts appear on the gallows in the logical order (head, body, left arm, right arm, left leg, right leg): +5 ✅
//     10. When the user runs out of 6 attempts or wins the game, the modal window appears: +10 ✅
//     11. The modal window includes the message about the game's outcome (winning or losing), the secret word and the 'play again' button: +10 ✅
//     12. When the user clicks the 'play again' button, the game starts over by showing a new question and resetting the gallows, the incorrect guesses counter and the underscores for the secret word: ✅
//     `
// );
