import { createField } from './field.js';
import { cleanClue } from './clue.js';
import { games } from './gameCollection.js';

const random5x5 = [
    () => createField(games.plane, 2, 1),
    () => createField(games.hash, 2, 2),
    () => createField(games.dog, 1, 2),
    () => createField(games.hart, 1, 2),
    () => createField(games.camel, 1, 2),
];

const randomAll = [
    () => createField(games.plane, 2, 1),
    () => createField(games.hash, 2, 2),
    () => createField(games.dog, 1, 2),
    () => createField(games.hart, 1, 2),
    () => createField(games.camel, 1, 2),

    () => createField(games.duck, 4, 3),
    () => createField(games.cat, 2, 4),
    () => createField(games.bomb, 2, 4),
    () => createField(games.yinYang, 3, 3),
    () => createField(games.train, 3, 4),

    () => createField(games.chameleon, 3, 3),
    () => createField(games.mushroom, 3, 5),
    () => createField(games.pc, 6, 7),
    () => createField(games.camera, 5, 5),
    () => createField(games.rs, 3, 4),
];

function randomNumber(random) {
    const result = Math.floor(Math.random() * random.length);
    return random[result]();
}

randomNumber(random5x5);

export function selectGame(value) {
    if (value === 'random') {
        cleanClue();
        randomNumber(randomAll);
    }
    if (value === 'plane') {
        cleanClue();
        createField(games.plane, 2, 1);
    }
    if (value === 'hash') {
        cleanClue();
        createField(games.hash, 2, 2);
    }
    if (value === 'dog') {
        cleanClue();
        createField(games.dog, 1, 2);
    }
    if (value === 'hart') {
        cleanClue();
        createField(games.hart, 1, 2);
    }
    if (value === 'camel') {
        cleanClue();
        createField(games.camel, 1, 2);
    }

    if (value === 'duck') {
        cleanClue();
        createField(games.duck, 4, 3);
    }
    if (value === 'cat') {
        cleanClue();
        createField(games.cat, 2, 4);
    }
    if (value === 'bomb') {
        cleanClue();
        createField(games.bomb, 2, 4);
    }
    if (value === 'yinYang') {
        cleanClue();
        createField(games.yinYang, 3, 3);
    }
    if (value === 'train') {
        cleanClue();
        createField(games.train, 3, 4);
    }

    if (value === 'chameleon') {
        cleanClue();
        createField(games.chameleon, 3, 3);
    }
    if (value === 'mushroom') {
        cleanClue();
        createField(games.mushroom, 3, 5);
    }
    if (value === 'pc') {
        cleanClue();
        createField(games.pc, 6, 7);
    }
    if (value === 'camera') {
        cleanClue();
        createField(games.camera, 5, 5);
    }
    if (value === 'rs') {
        cleanClue();
        createField(games.rs, 3, 4);
    }
}
