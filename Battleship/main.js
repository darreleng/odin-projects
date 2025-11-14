import { Gameboard } from "../../gameboard";
import { Ship } from "./ship";

const boardSize = 10;
const shipsToPlace = [
            { name: "Carrier", length: 5 },
            { name: "Battleship", length: 4 },
            { name: "Destroyer", length: 3 },
            { name: "Submarine", length: 3 },
            { name: "Patrol Boat", length: 2 }
        ];

function renderBoard(boardID) {
    const board = document.getElementById(boardID);
    const boardTitle = document.getElementById(boardID + "-title");
    const cellLabel = document.querySelector('.cell-label');
    const alphabet = "ABCDEFGHIJ";
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.dataset.x = x;
            cell.dataset.y = y;

            const coord = alphabet[y] + x;

            cell.addEventListener('mouseover', () => {
                const rect = cell.getBoundingClientRect();
                const rectContainer = board.getBoundingClientRect();
                const rectTitle = boardTitle.getBoundingClientRect();
                const topOffset = rect.top - rectContainer.top + rectTitle.height;
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

            board.append(cell);
        }
    }
}

function placeShipsRandomly(boardInstance) {
    shipsToPlace.forEach(ship => {
        const newShip = new Ship(ship.name, ship.length);
        let success = false;
        while (!success) {
            let y = Math.floor(Math.random() * boardSize);
            let x = Math.floor(Math.random() * boardSize);
            let isVertical = Math.random() > 0.5;
            let result = boardInstance.placeShip(y, x, newShip, isVertical);
            if (!result.startsWith("Invalid")) {
                renderShips(newShip);
                return success = true;
            }
        }
    })
}

function renderShips(ship) {
    ship.forEach(coord => {
        let [y, x] = coord;
        document.querySelector(`[data-x=:"${x}"]`).classList.add("has-ship");
        document.querySelector(`[data-y=:"${y}"]`).classList.add("has-ship");
    });    
}

function updateBoardUI(boardInstance) {

}

function initialiseGame() {
    const playerBoard = new Gameboard();
    const computerBoard = new Gameboard();
    renderBoard('player-board');
    placeShipsRandomly('player-board');
}

window.onload = initialiseGame;