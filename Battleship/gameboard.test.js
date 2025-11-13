import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const name = "Submarine";
const length = 3;
const ship = new Ship(name, length);
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
        gameboard.receiveAttack(x, y);
        const actual = gameboard.receiveAttack(x, y);
        expect(actual).toBe("Already fired.");
    })

    test("Should record a miss", () => {
        const actual = gameboard.receiveAttack(x, y);
        expect(actual).toBe("Miss.");
        expect(gameboard.grid[x][y]).toBe("M");
    })

    test("Should be able to target coordinates with a ship", () => {
        gameboard.placeShip(x, y, ship, true);
        const actual = gameboard.receiveAttack(x, y);
        expect(actual).toBe("Hit!");
        expect(gameboard.grid[x][y].hit).toBe(true);
    })

    test("Should be able to sink ships when the last segment is hit", () => {
        gameboard.placeShip(x, y, ship, true);
        gameboard.receiveAttack(x, y);
        gameboard.receiveAttack(x, y + 1);
        const actual = gameboard.receiveAttack(x, y + 2);
        expect(actual).toBe("Hit and Sunk!");
    })  

    test("Should be able to check if all ships on the board have been sunk", () => {
        gameboard.placeShip(x, y, ship, true);
        gameboard.receiveAttack(x, y);
        gameboard.receiveAttack(x, y + 1); 
        gameboard.receiveAttack(x, y + 2); 
        const actual = gameboard.checkAllShipsSunk();
        expect(actual).toBe(true);
    })
})