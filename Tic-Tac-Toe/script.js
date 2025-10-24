const gameBoard = [
  '', '', '', // Row 0
  '', '', '', // Row 1
  '', '', ''  // Row 2
];

const winConditions = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];

const buttonStart = document.getElementById('button-start');
const containerStart = document.getElementById('container-start');
const cells = document.querySelectorAll('.cell');
const gameBoardContainer = document.getElementById('game-board');
const newGameDialog = document.getElementById('new-game-dialog');
const resultMessage = document.getElementById('result-message');
const closeButton = document.getElementById('close-button');
const newGameButton = document.getElementById('new-game-button');
let currentPlayer = 'X';
let gameActive = true; 

function createPlayer(name) {
    dialogCreatePlayer.showModal();
    return {name};
}

function checkWin() {
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (
            gameBoard[a] && 
            gameBoard[a] === gameBoard[b] && 
            gameBoard[a] === gameBoard[c]
        ) {
            return true;
        }
    }
    return false; 
};

function checkDraw() {
    if (!gameBoard.includes('')) return true;
};

function handleMove(clickedCell, clickedIndex) {
    // 1. Check if slot is taken or game is over
    if (gameBoard[clickedIndex] !== '' || !gameActive) {
        return; 
    }

    // 2. Update the board state and UI
    gameBoard[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    
    // 3. Check for game end
    if (checkWin()) {
        gameActive = false;
        resultMessage.textContent = `${currentPlayer} Wins!`;
        newGameDialog.showModal();
        return;
    }
    
    if (checkDraw()) {
        gameActive = false;
        resultMessage.textContent = ("It's a Draw!");
        newGameDialog.showModal();
        return;
    }

    // 4. Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// --- Event Listeners ---
cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.dataset.cellIndex);
        handleMove(e.target, clickedIndex); 
    });
});

buttonStart.addEventListener('click', () => {
    containerStart.style.display = 'none';
    gameBoardContainer.style.display = 'grid';
});

closeButton.addEventListener('click', () => newGameDialog.close());
newGameButton.addEventListener('click', () => {
    newGameDialog.close();
    gameActive = true;
    for (let i=0; i < gameBoard.length; i++) {
        gameBoard[i] = '';
    }
    cells.forEach(cell => {
        cell.textContent = '';
    });
});