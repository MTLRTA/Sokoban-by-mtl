const boardSize = 5;

const wall = 1;   
const box = 2;    
const target = 3; 
const player = 4; 
const empty = 0;  

const Level = [
    wall, wall, wall, wall, wall, empty, empty, empty, empty,
    wall, empty, empty, empty, wall, empty, empty, empty, empty,
    wall, empty, box, empty, wall, empty, wall, wall, wall,
    wall, empty, box, empty, wall, empty, wall, player, wall,
    wall, wall, wall, empty, wall, wall, wall, empty, wall,
    wall, target, empty, empty, empty, empty, empty, empty, wall,
    wall, target, empty, empty, empty, empty, wall, empty, wall,
    wall, empty, empty, empty, empty, empty, wall, wall, wall,
    wall, wall, wall, wall, wall, wall, wall, wall, wall,
];

const board = document.getElementById('gamelevel');

function drawLevel() {/* Метод для построения сетки уровня путем перебора каждого элемента*/
    Level.forEach((cell) => {
        const cellDiv = document.createElement('div');

        switch (cell) {
            case wall:
                cellDiv.classList.add('wall');
                break;
            case box:
                cellDiv.classList.add('box');
                break;
            case target:
                cellDiv.classList.add('target');
                break;
            case player:
                cellDiv.classList.add('player');
                break;
            case empty:
                cellDiv.classList.add('empty');
                break;    
        }

        board.appendChild(cellDiv);
    });
}

drawLevel();//вызов отрисовки уровня

