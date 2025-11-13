import { Ship } from "./ship";

const name = "Submarine";
const length = 3;
let actual;
beforeEach(() => actual = new Ship(name, length));

describe('Ship initialisation', () => {

    test('Correct name and length', () => {
        expect(actual.name).toBe(name);
        expect(actual.length).toBe(length);
    })

    test('All segments not hit', () => {
        expect(actual.hits).toEqual(new Array(length).fill(false));
    })

    test('Sunk status should be set to false', () => {
        expect(actual.sunk).toBe(false);
    })

})

describe('Ship .hit method', () => {

    test('Should only mark the specified segment as hit', () => {
        actual.hit(1);
        expect(actual.hits[1]).toBe(true);
        expect(actual.hits).toEqual([false, true, false]);
    })
})

describe('Ship .isSunk method', () => {

    test('Should return true when all segments are hit', () => {
        for (let i=0; i<length; i++) actual.hit(i);
        expect(actual.sunk).toBe(true);
    })

    test('Should not return true when not all segments are hit', () => {
        actual.hit(0);
        actual.hit(2);
        expect(actual.sunk).toBe(false);
    })
})