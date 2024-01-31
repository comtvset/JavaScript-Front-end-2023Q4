const body = document.querySelector('body');

const container = document.createElement('div');
container.classList.add('container');

const game = document.createElement('div');
game.classList.add('game');

const gameTop = document.createElement('div');
gameTop.classList.add('game_top');

const answer = document.createElement('div');
answer.classList.add('game_top_left');

const clueY = document.createElement('div');
clueY.classList.add('game_top_right');

const gameBottom = document.createElement('div');
gameBottom.classList.add('game_bottom');

const clueX = document.createElement('div');
clueX.classList.add('game_bottom_left');

const field = document.createElement('div');
field.classList.add('game_bottom_right');

const control = document.createElement('div');
control.classList.add('control');

const select = document.createElement('select');
select.classList.add('select');

const gameDefault = document.createElement('option');
gameDefault.value = '';
gameDefault.text = 'Select game';

gameDefault.selected = true;
select.insertBefore(gameDefault, select.firstChild);

const gameRandom = document.createElement('option');
gameRandom.setAttribute('value', 'random');

const gamePlane = document.createElement('option');
gamePlane.setAttribute('value', 'plane');

const gameHash = document.createElement('option');
gameHash.setAttribute('value', 'hash');

const gameDog = document.createElement('option');
gameDog.setAttribute('value', 'dog');

const gameHart = document.createElement('option');
gameHart.setAttribute('value', 'hart');

const gameCamel = document.createElement('option');
gameCamel.setAttribute('value', 'camel');

const gameDuck = document.createElement('option');
gameDuck.setAttribute('value', 'duck');

const gameCat = document.createElement('option');
gameCat.setAttribute('value', 'cat');

const gameBomb = document.createElement('option');
gameBomb.setAttribute('value', 'bomb');

const gameYinYang = document.createElement('option');
gameYinYang.setAttribute('value', 'yinYang');

const gameTrain = document.createElement('option');
gameTrain.setAttribute('value', 'train');

const gameChameleon = document.createElement('option');
gameChameleon.setAttribute('value', 'chameleon');

const gameMushroom = document.createElement('option');
gameMushroom.setAttribute('value', 'mushroom');

const gamePC = document.createElement('option');
gamePC.setAttribute('value', 'pc');

const gameCamera = document.createElement('option');
gameCamera.setAttribute('value', 'camera');

const gameRS = document.createElement('option');
gameRS.setAttribute('value', 'rs');

const button = document.createElement('button');
button.setAttribute('id', 'test-button');
button.innerHTML = 'start';

body.appendChild(container);

gameTop.appendChild(answer);
gameTop.appendChild(clueY);

gameBottom.appendChild(clueX);
gameBottom.appendChild(field);

game.appendChild(gameTop);
game.appendChild(gameBottom);

container.appendChild(game);
container.appendChild(control);
control.appendChild(select);
control.appendChild(button);

select.appendChild(gameRandom);
select.appendChild(gamePlane);
select.appendChild(gameHash);
select.appendChild(gameDog);
select.appendChild(gameHart);
select.appendChild(gameCamel);

select.appendChild(gameDuck);
select.appendChild(gameCat);
select.appendChild(gameBomb);
select.appendChild(gameYinYang);
select.appendChild(gameTrain);

select.appendChild(gameChameleon);
select.appendChild(gameMushroom);
select.appendChild(gamePC);
select.appendChild(gameCamera);
select.appendChild(gameRS);

gameRandom.innerHTML = 'random';
gamePlane.innerHTML = '5x5 plane';
gameHash.innerHTML = '5x5 hash';
gameDog.innerHTML = '5x5 dog';
gameHart.innerHTML = '5x5 hart';
gameCamel.innerHTML = '5x5 camel';

gameDuck.innerHTML = '10x10 duck';
gameCat.innerHTML = '10x10 cat';
gameBomb.innerHTML = '10x10 bomb';
gameYinYang.innerHTML = '10x10 yinYang';
gameTrain.innerHTML = '10x10 train';

gameChameleon.innerHTML = '15x15 chameleon';
gameMushroom.innerHTML = '15x15 mushroom';
gamePC.innerHTML = '15x15 pc';
gameCamera.innerHTML = '15x15 camera';
gameRS.innerHTML = '15x15 rs';

export function exp_select() {
    return {
        select,
    };
}

document.body.appendChild(container);

export function buildHTML() {
    return {
        clueX,
        clueY,
        field,
        answer,
    };
}
