class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.grid = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
        this.ships = [];
        this.allShipsSunk = false;
    }

    placeShip(startX, startY, ship, isVertical) {
        if (isVertical) {
            if (startY + ship.length > this.size) return "Invalid placement: out of vertical bounds.";
            else if (this.grid[startX].slice(startY, startY + ship.length).every(cell => cell !== null)) return "Invalid placement: overlaps with one or more ships.";
        } else {
            if (startX + ship.length > this.size) return "Invalid placement: out of horizontal bounds.";
            else if (this.grid.slice(startX, startX + ship.length).every(row => row[startY] === null)) return "Invalid placement: overlaps with one or more ships.";
        }
    
        for (let i = 0; i < ship.length; i++) {
            let x = startX + (isVertical ? 0 : i);
            let y = startY + (isVertical ? i: 0);
            this.grid[x][y] = {ship: ship, segmentIndex: i};
        }

        this.ships.push(ship);
        return `${ship.name} placed.`;
    }

    receiveAttack(x, y) {
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) return "Target out of bounds."

        const cell = this.grid[x][y];

        if (cell === "M" || (cell && cell.hit)) return "Already fired."
        else if (cell === null) {
            this.grid[x][y] = "M";
            return "Miss.";
        } else {
            cell.ship.hit(cell.segmentIndex);
            this.grid[x][y] = {...cell, hit: true};

            if (cell.ship.isSunk()) {
                this.checkAllShipsSunk();
            return 'Hit and Sunk!';
        }
        return 'Hit!';
        }
    }

    checkAllShipsSunk() {
        this.allShipsSunk = this.ships.every(ship => ship.sunk === true);
        return this.allShipsSunk;
    }
}

export {Gameboard};
