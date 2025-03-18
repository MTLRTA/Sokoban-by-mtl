const boardSize = 9; 
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

function drawLevel() {
    board.innerHTML = ''; 
    Level.forEach((square) => {
        const sqDiv = document.createElement('div');

        switch (square) {
            case wall:
                sqDiv.classList.add('wall');
                break;
            case box:
                sqDiv.classList.add('box');
                break;
            case target:
                sqDiv.classList.add('target');
                break;
            case player:
                sqDiv.classList.add('player');
                break;
            case empty:
                sqDiv.classList.add('empty');
                break;    
        }

        board.appendChild(sqDiv);
    });
}

drawLevel();

function movePlayer(dirstep) {
    const currentPlayerIndex = Level.indexOf(player);
    let targetIndex;

    switch (dirstep) {
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
    



    if (
        Level[targetIndex] === empty || Level[targetIndex] === target
        )
        
        
    {
        Level[currentPlayerIndex] = empty; 
        Level[targetIndex] = player; 
    } 
    
    
    else if (Level[targetIndex] === box) 
    {
        const nextBoxIndex = targetIndex + (targetIndex - currentPlayerIndex); 
        
        if (
            
            Level[nextBoxIndex] === empty
            )
        
        {
            Level[nextBoxIndex] = box; 
            Level[currentPlayerIndex] = empty; 
            Level[targetIndex] = player; 
        } 
        
        else
        {
            console.log('Korobka vo chto-to uperlas!');
        }
    } 
    
    else 
    {
        console.log('Nevozmojno dvigatsa(((');
    }

    
    drawLevel(); 

}




document.addEventListener('keydown', (event) => {
    movePlayer(event.key); 
});


