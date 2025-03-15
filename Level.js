const boardSize = 5;

const wall = 1;   // стена
const box = 2;    // коробка
const target = 3; // цель
const player = 4; // игрок
const empty = 0;  // пустая клетка

const Level = [
    wall, wall, wall, wall, wall, empty, empty, empty, empty,
    wall, empty, empty, empty, wall, empty, empty, empty, empty,
    wall, empty, box, empty, wall, empty, wall, wall, wall,
    wall, empty, box, empty, wall, empty, wall, target, wall,
    wall, wall, wall, empty, wall, wall, wall, empty, wall,
    wall, player, empty, empty, empty, empty, empty, empty, wall,
    wall, player, empty, empty, empty, empty, wall, empty, wall,
    wall, empty, empty, empty, empty, empty, wall, wall, wall,
    wall, wall, wall, wall, wall, wall, wall, wall, wall,
];

console.log(Level);

const board = document.getElementById('gamelevel');

const elements = {


}