class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.grid = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
        this.ships = [];
        this.allShipsSunk = false;
    }

    placeShip(startY, startX, ship, isVertical) {
        if (isVertical) {
            if (startX + ship.length > this.size) return "Invalid placement: out of vertical bounds.";
            for (let i = 0; i < ship.length; i++) if (this.grid[startY][startX + i] !== null) return "Invalid placement: overlaps with one or more ships.";
        } else {
            if (startY + ship.length > this.size) return "Invalid placement: out of horizontal bounds.";
            for (let i = 0; i < ship.length; i++) if (this.grid[startY + i][startX] !== null) return "Invalid placement: overlaps with one or more ships.";
        }
    
        for (let i = 0; i < ship.length; i++) {
            let y = startY + (isVertical ? 0: i);
            let x = startX + (isVertical ? i : 0);
            ship.coord.push([y, x]);
            this.grid[y][x] = {ship: ship, segmentIndex: i};
        }

        this.ships.push(ship);
        return `${ship.name} placed.`;
    }

    receiveAttack(y, x) {
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) return "Target out of bounds."

        const cell = this.grid[y][x];

        if (cell === "M" || (cell && cell.hit)) return "Already fired."
        else if (cell === null) {
            this.grid[y][x] = "M";
            return "Miss.";
        } else {
            cell.ship.hit(cell.segmentIndex);
            this.grid[y][x] = {...cell, hit: true};

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

    reset() {
        this.grid = Array(this.size).fill(null).map(() => Array(this.size).fill(null))
        this.ships = [];
    }
}

export {Gameboard};
