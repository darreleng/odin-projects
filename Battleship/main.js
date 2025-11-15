import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

const boardSize = 10;
const shipsToPlace = [
            { name: "Carrier", length: 5 },
            { name: "Battleship", length: 4 },
            { name: "Destroyer", length: 3 },
            { name: "Submarine", length: 3 },
            { name: "Patrol Boat", length: 2 }
        ];
const alphabet = "ABCDEFGHIJ";
const playerBoard = new Gameboard();
const computerBoard = new Gameboard();

function renderBoard(boardID, boardInstance) {
    const boardUI = document.getElementById(boardID);
    const cellLabel = document.querySelector(`.${boardID}-cell-label`);
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add(`grid-cell`);
            cell.dataset.x = x;
            cell.dataset.y = y;
            const coord = alphabet[y] + x;

            cell.addEventListener('mouseover', () => {
                const rect = cell.getBoundingClientRect();
                const rectContainer = boardUI.getBoundingClientRect();
                const topOffset =  rectContainer.top + rect.top - rectContainer.top;
                const leftOffset = rect.left - rectContainer.left;
                cellLabel.textContent = coord;
                cellLabel.style.top = `${topOffset}px`;
                cellLabel.style.left = `${leftOffset}px`;
                cellLabel.style.height = `${rect.height}px`;
                cellLabel.style.width = `${rect.width}px`;
                cellLabel.style.opacity = 1;
            });

            cell.addEventListener('mouseleave', () => {
                cellLabel.style.opacity = 0;
            })

            if (boardID === 'computer-board') cell.addEventListener('click', event => handleAttack(event, boardInstance));

            boardUI.append(cell);
        }
    }
}

function handleAttack(event, boardInstance) {
    if (!isPlayerTurn || checkForGameOver()) return; 

    const cell = event.target;
    const cellY = parseInt(cell.dataset.y);
    const cellX = parseInt(cell.dataset.x);
    const coord = alphabet[cellY] + cellX;
    
    if (cell.classList.contains('miss') || cell.classList.contains('hit')) return;

    boardInstance.receiveAttack(cellY, cellX);
    cell.inert = true; 
    
    updateBoardUI(boardInstance, cell, cellY, cellX, coord, 'You');
    
    if (checkForGameOver()) return; 

    isPlayerTurn = false;
    document.getElementById('computer-board').inert = true; 
    
    const displayMessage = document.createElement('p');
    displayMessageBox.append(displayMessage);
    displayMessageBox.scrollTop = displayMessageBox.scrollHeight;

    computerAttack();
}

function updateBoardUI(boardInstance, cell, cellY, cellX, coord, attacker) { 
    const displayMessage = document.createElement('p');
    let target = (attacker === 'You') ? 'enemy' : 'your';
    let msg = '';

    if (boardInstance.grid[cellY][cellX] === "M") {
        cell.classList.add('miss');
        msg = `${attacker} fired at ${coord} and missed!`;
    }
    else if (boardInstance.grid[cellY][cellX].ship.sunk) {
        cell.classList.add('hit');
        msg = `${attacker} fired at ${coord} and sunk ${target} ship!`;
    }
    else if (boardInstance.grid[cellY][cellX].ship) {
        cell.classList.add('hit');
        msg = `${attacker} fired at ${coord} and hit ${target} ship!`;
    } 
    
    displayMessage.textContent = msg;
    displayMessageBox.append(displayMessage);
    displayMessageBox.scrollTop = displayMessageBox.scrollHeight;
}

function placeShipsRandomly(boardInstance, boardID) {
    shipsToPlace.forEach(ship => {
        const newShip = new Ship(ship.name, ship.length);
        let success = false;
        while (!success) {
            let y = Math.floor(Math.random() * boardSize);
            let x = Math.floor(Math.random() * boardSize);
            let isVertical = Math.random() > 0.5;
            let result = boardInstance.placeShip(y, x, newShip, isVertical);
            if (!result.startsWith("Invalid")) {
                if (boardID === 'player-board') renderShips(newShip, boardID);
                success = true;
            }
        }
    })
}

function renderShips(ship, boardID) {
    ship.coord.forEach(coord => {
        let [y, x] = coord;
        document.querySelector(`#${boardID} [data-y="${y}"][data-x="${x}"]`).classList.add("ship-segment");
    });
}

function initialiseGame() {
    document.getElementById('player-board').innerHTML = '';
    document.getElementById('computer-board').innerHTML = '';
    displayMessageBox.innerHTML = '';
    renderBoard('player-board', playerBoard);
    renderBoard('computer-board', computerBoard);
    placeShipsRandomly(playerBoard, 'player-board');
    placeShipsRandomly(computerBoard, 'computer-board');
}

function clearBoardUI(boardID) {
    const cells = document.getElementById(boardID).querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.classList.remove('ship-segment', 'hit', 'miss');
        cell.textContent = '';
    })
}

const displayMessageBox = document.querySelector('.display-message-box');
const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {
    initialiseGame();
    startButton.disabled = true;
    randomiseButton.disabled = true;
    restartButton.disabled = false;
    displayMessageBox.innerHTML = '';
});

const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', () => {
    playerBoard.reset();
    computerBoard.reset();
    clearBoardUI('player-board');
    clearBoardUI('computer-board');
    placeShipsRandomly(playerBoard, 'player-board');
    placeShipsRandomly(computerBoard, 'computer-board');
    startButton.disabled = false;
    randomiseButton.disabled = false;
    restartButton.disabled = true;
    displayMessageBox.innerHTML = '';
})

const randomiseButton = document.getElementById('randomise-button');
randomiseButton.addEventListener('click', () => {
    playerBoard.reset();
    computerBoard.reset();
    clearBoardUI('player-board');
    clearBoardUI('computer-board');
    placeShipsRandomly(playerBoard, 'player-board');
    placeShipsRandomly(computerBoard, 'computer-board');
});

let isPlayerTurn = true; 

function computerAttack() {
    setTimeout(() => {
        let success = false;
        let cellY, cellX;
        let cell; 
        while (!success) {
            cellY = Math.floor(Math.random() * boardSize);
            cellX = Math.floor(Math.random() * boardSize);
            
            cell = document.querySelector(`#player-board [data-y="${cellY}"][data-x="${cellX}"]`);

            if (!cell.classList.contains('miss') && !cell.classList.contains('hit')) {
                success = true; 
            }
        }
        
        playerBoard.receiveAttack(cellY, cellX);
        
        const coord = alphabet[cellY] + cellX;

        updateBoardUI(playerBoard, cell, cellY, cellX, coord, 'Computer');
        
        if (!checkForGameOver()) {
            isPlayerTurn = true;
            document.getElementById('computer-board').inert = false; 
            
            const displayMessage = document.createElement('p');
            displayMessage.textContent = "Your turn. Select a target on the enemy's board.";
            displayMessageBox.append(displayMessage);
            displayMessageBox.scrollTop = displayMessageBox.scrollHeight;
        }

    }, 1);
}

function checkForGameOver() {
    let gameOver = false;
    let message = '';

    if (computerBoard.allShipsSunk) {
        gameOver = true;
        message = 'CONGRATULATIONS! All enemy ships sunk. You win!';
    } else if (playerBoard.allShipsSunk) {
        gameOver = true;
        message = 'GAME OVER. All your ships sunk. The Computer wins!';
    }

    if (gameOver) {
        const displayMessage = document.createElement('p');
        displayMessage.textContent = message;
        displayMessageBox.append(displayMessage);
              
        startButton.disabled = true;
        randomiseButton.disabled = true;
        restartButton.disabled = false;
        
        return true;
    }
    return false;
}
