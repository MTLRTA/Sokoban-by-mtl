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

const board = document.getElementById('gamelevel'); // получение элемента gamelevel из html документа

function drawSquare(index) { // функция для построения сетки уровня
    const sqDiv = document.createElement('div'); // создает div и на основе элемента в массива, ставит в div соответствующий элемент
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

function drawLevel() { // callback функция отрисовки уровня
    board.innerHTML = ''; // очистка уровня
    for (let i = 0; i < Level.length; i++) {
        board.appendChild(drawSquare(i));
    }
}

drawLevel();

function updateSquare(index) { // Функция для обновления ячеек
    const currentSquare = board.childNodes[index]; // получение состояния по индексу ячейки
    currentSquare.replaceWith(drawSquare(index)); // её замена 
}

function movePlayer(step) { // движение игрока
    const currentPlayerIndex = Level.indexOf(player); // получение актуального индекса
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


    const targetCell = Level[targetIndex]; // определение целевой ячейки
    const nextBoxIndex = targetIndex + (targetIndex - currentPlayerIndex); // вычисление индекса ячейки, в которую будет перемещена коробка

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
                    Level[nextBoxIndex] = boxFinished; // клетка куда будет перемещена коробка заменяется на boxFinished
                    console.log('Korobka dostigla finisha!');
                } else {
                    Level[nextBoxIndex] = box; // просто перемещаем коробку
                }

                updateSquare(currentPlayerIndex);
                updateSquare(targetIndex);
                updateSquare(nextBoxIndex);
            } else {
                console.log('Korobka vo chto-to uperlas!');
            }
        },
        [finish]: () => {
            console.log('nelza zanat` etu oblast!');
        },
        [boxFinished]: () => {
            console.log('Korobka uje na finisha i ne mozhno dvigat` ee!');
        }
    };

    if (actions[targetCell]) { // проверка, существует ли действие targetCell
        actions[targetCell]();
    } else {
        console.log('Nevozmojno dvigatsa(((');
    }
}


document.addEventListener('keydown', (event) => {
    movePlayer(event.key);
    scounter(event);
     // Передаем весь объект event
});





let count = 0;
const counter = document.getElementById('steps');

function scounter(){
    count++;

    counter.textContent = count;

};


