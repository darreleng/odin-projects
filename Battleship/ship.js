class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = new Array(length).fill(false);
        this.sunk = false;
        this.coord = [];
    }

    hit(segmentIndex) {
        this.hits[segmentIndex] = true;
        this.isSunk();
    }
    
    isSunk() {
        this.sunk = this.hits.every(segment => segment === true);
        return this.sunk;
    }
}

export {Ship};
