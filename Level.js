const boardSize = 9; // высота доски
const wall = 1;
const box = 2;
const finish = 3;
const boxFinished = 5; // новое значение для коробки на финише
const player = 4;
const empty = 0; // обозначения всех элементов

const Level = [
    wall, wall, wall, wall, wall, empty, empty, empty, empty,
    wall, empty, empty, empty, wall, empty, empty, empty, empty,
    wall, empty, box, empty, wall, empty, wall, wall, wall,
    wall, empty, box, empty, wall, empty, wall, player, wall,
    wall, wall, wall, empty, wall, wall, wall, empty, wall,
    wall, finish, empty, empty, empty, empty, empty, empty, wall,
    wall, finish, empty, empty, empty, empty, wall, empty, wall,
    wall, empty, empty, empty, empty, empty, wall, wall, wall,
    wall, wall, wall, wall, wall, wall, wall, wall, wall,
];  // сам уровень

const Level2 = [
    wall, wall, wall, wall, wall, wall, wall, wall, wall,
    wall, player, empty, empty, wall, empty, empty, finish, wall,
    wall, empty, empty, empty, wall, empty, empty, empty, wall,
    wall, empty, wall, empty, wall, empty, wall, box, wall,
    wall, empty, wall, empty, empty, empty, empty, empty, wall,
    wall, empty, wall, box, wall, wall, finish, wall, wall,
    wall, empty, empty, empty, empty, empty, empty, empty, wall,
    wall, wall, wall, empty, empty, empty, empty, wall, wall,
    wall, wall, wall, wall, wall, wall, wall, wall, wall,
];  

const board = document.getElementById('gamelevel'); // получение элемента gamelevel из html документа

function drawSquare(index) { // функция для построения сетки уровня
    const sqDiv = document.createElement('div');
    switch (Level[index]) {
        case wall:
            sqDiv.classList.add('wall');
            break;
        case box:
            sqDiv.classList.add('box');
            break;
        case boxFinished:
            sqDiv.classList.add('boxFinished'); 
            break;
        case finish:
            sqDiv.classList.add('finish');
            break;
        case player:
            sqDiv.classList.add('player');
            break;
        case empty:
            sqDiv.classList.add('empty');
            break;    
    }
    return sqDiv;
}

function drawLevel() { // функция отрисовки уровня
    board.innerHTML = ''; // очистка уровня
    for (let i = 0; i < Level.length; i++) {
        board.appendChild(drawSquare(i));
    }
}

drawLevel();

function updateSquare(index) { // Функция для обновления ячеек
    const currentSquare = board.childNodes[index];
    currentSquare.replaceWith(drawSquare(index));
}

let finishedBoxesCount = 0; // Счетчик для коробок, достигнувших финиша

function movePlayer(step) { // движение игрока
    const currentPlayerIndex = Level.indexOf(player);
    let targetIndex;

    switch (step) {
        case 'ArrowUp':
            targetIndex = currentPlayerIndex - boardSize; 
            break;
        case 'ArrowDown':
            targetIndex = currentPlayerIndex + boardSize; 
            break;
        case 'ArrowLeft':
            targetIndex = currentPlayerIndex - 1; 
            break;
        case 'ArrowRight':
            targetIndex = currentPlayerIndex + 1; 
            break;
        default:
            console.log('Nepravilnaya klavisha! Ispolsuy strelochki.');
            return;
    }

    const targetCell = Level[targetIndex];
    const nextBoxIndex = targetIndex + (targetIndex - currentPlayerIndex);

    const actions = {
        [empty]: () => {
            Level[currentPlayerIndex] = empty; 
            Level[targetIndex] = player; 
            updateSquare(currentPlayerIndex);
            updateSquare(targetIndex);
        },
        [box]: () => {
            if (Level[nextBoxIndex] === empty || Level[nextBoxIndex] === finish) {
                Level[currentPlayerIndex] = empty; 
                Level[targetIndex] = player; 

                if (Level[nextBoxIndex] === finish) {
                    Level[nextBoxIndex] = boxFinished; 
                    finishedBoxesCount++; // Увеличивается счетчик коробок на финише
                    console.log('Korobka dostigla finisha!');
                } else {
                    Level[nextBoxIndex] = box;
                }

                updateSquare(currentPlayerIndex);
                updateSquare(targetIndex);
                updateSquare(nextBoxIndex);

                checkLevelCompletion(); 
            } else {
                console.log('Korobka vo chto-to uperlas!');
            }
        },
        [finish]: () => {
            console.log('Nelza zanat` etu oblast!');
        },
        [boxFinished]: () => {
            console.log('Korobka uje na finisha i ne mozhno dvigat` ee!');
        }
    };

    if (actions[targetCell]) {
        actions[targetCell]();
    } else {
        console.log('Nevozmojno dvigatsa(((');
    }
}

function checkLevelCompletion() {
    if (finishedBoxesCount === 2) { // Если обе коробки на финише
        CompleteMsg();
    }
}

function CompleteMsg() {//Вывод сообщения
    const message = document.createElement('div');
    message.textContent = 'Level Complete!';
    message.classList.add('level-complete');
    const button = document.createElement('button');
    button.textContent = 'Next Level'; // Текст на кнопке
    button.classList.add('levels-button');
    document.body.appendChild(message); 
    document.body.appendChild(button);


    button.addEventListener('click', () => {
        
        message.remove();
        button.remove();
        Level.length = 0; 
        Level.push(...Level2); 
        finishedBoxesCount = 0; 
        drawLevel();
        count = 0; 
        counter.textContent = count;
        resetTimer();
        startTimer();     

    });



}

document.addEventListener('keydown', (event) => {
    movePlayer(event.key);
    scounter(event);
});

let count = 0;
const counter = document.getElementById('steps');

function scounter(){
    if (event.key.startsWith('Arrow')){
        count++;
        counter.textContent = count;
    }
}