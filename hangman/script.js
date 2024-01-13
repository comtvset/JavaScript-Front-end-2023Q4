import questionsAndAnswers from './questions.js';

const refresh = document.querySelector('button');
const alphabet = document.querySelector('.alphabet');

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
    const result = Math.floor(Math.random() * 24) + 1;
    console.log(result)
    return result
}

const answerField = document.querySelector('.answer');
const questionField = document.querySelector('.question');

let answer = '';
let length = 0;

function question(any) {
    length = answer.length;
    let entries = Object.entries(questionsAndAnswers);
    questionField.innerHTML = entries[any][0];
    answer = entries[any][1];
}

question(random());

function setSecredWord(answer) {
    const secretWord = answer.toUpperCase().split('').fill('_').join(' ');
    answerField.innerHTML = secretWord;
}
setSecredWord(answer);

function check(result) {
    length;

    const word = answer.toUpperCase().split('');
    let field = answerField.innerHTML.split(' ');
    // console.log(word)
    // console.log(field);

    if (word.includes(result.innerHTML)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === result.innerHTML) {
                field[i] = result.innerHTML;
                length = length - 1;
                result.classList.add('disable');
            }
        }
    } else {
        console.log('Incorrect');
    }
    answerField.innerHTML = field.join(' ');
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

refresh.addEventListener('click', () => {
    question(random());
    setSecredWord(answer);
    length = answer.length;

    letters.forEach((item) => {
        item.classList.remove('disable');
    });
});
