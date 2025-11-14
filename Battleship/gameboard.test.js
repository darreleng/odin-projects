import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const ship = new Ship("Submarine", 3);
let gameboard;
beforeEach(() => gameboard = new Gameboard);

describe('placeShip method', () => {
    test("Should be unable to have any parts of a ship placed out of gameboard's X boundaries", () => {
        const actual = gameboard.placeShip(8, 5, ship, false);
        expect(actual).toBe("Invalid placement: out of horizontal bounds.");
    })

    test("Should be unable to have any parts of a ship placed out of gameboard's Y boundaries", () => {
        const actual = gameboard.placeShip(3, 9, ship, true);
        expect(actual).toBe("Invalid placement: out of vertical bounds.");
    })

    test("Should be unable to have overlapping ships", () => {
        gameboard.placeShip(2, 4, ship, false);
        const actual = gameboard.placeShip(2, 4, ship, false);
        expect(actual).toBe("Invalid placement: overlaps with one or more ships.");
    })

    test("Should be able to place on empty cells", () => {
        const actual = gameboard.placeShip(3, 3, ship, false);
        expect(actual).toBe(`${ship.name} placed.`);
    })
    
    test("Placed ships should contain an array of coordinates", () => {
        const ship = new Ship("Submarine", 3);
        gameboard.placeShip(4, 5, ship, false);
        const actual = ship.coord;
        expect(actual).toEqual([[4, 5], [5, 5], [6, 5]]);
    })
})

describe("receiveAttack method", () => {
    test("Should be unable to target coordinates beyond the horizontal size of the gameboard", () => {
        const actual = gameboard.receiveAttack(12, 9);
        expect(actual).toBe("Target out of bounds.");
    })

    test("Should be unable to target coordinates beyond the vertical size of the gameboard", () => {
        const actual = gameboard.receiveAttack(9, 12);
        expect(actual).toBe("Target out of bounds.");
    })

    let x = 5;
    let y = 5;

    test("Should be unable to target coordinates that have already been fired at", () => {
        gameboard.receiveAttack(y, x);
        const actual = gameboard.receiveAttack(y, x);
        expect(actual).toBe("Already fired.");
    })

    test("Should record a miss", () => {
        const actual = gameboard.receiveAttack(y, x);
        expect(actual).toBe("Miss.");
        expect(gameboard.grid[y][x]).toBe("M");
    })

    test("Should be able to target coordinates with a ship", () => {
        gameboard.placeShip(y, x, ship, true);
        const actual = gameboard.receiveAttack(y, x);
        expect(actual).toBe("Hit!");
        expect(gameboard.grid[y][x].hit).toBe(true);
    })

    test("Should be able to sink ships when the last segment is hit", () => {
        gameboard.placeShip(y, x, ship, true);
        gameboard.receiveAttack(y, x);
        gameboard.receiveAttack(y, x + 1);
        const actual = gameboard.receiveAttack(y, x + 2);
        expect(actual).toBe("Hit and Sunk!");
    })  

    test("Should be able to check if all ships on the board have been sunk", () => {
        gameboard.placeShip(y, x, ship, true);
        gameboard.receiveAttack(y, x);
        gameboard.receiveAttack(y, x + 1); 
        gameboard.receiveAttack(y, x + 2); 
        const actual = gameboard.checkAllShipsSunk();
        expect(actual).toBe(true);
    })
})