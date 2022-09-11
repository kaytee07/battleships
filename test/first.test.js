let ships = require('../src/ship');

test("if ship sunk", () => {
    expect(ships("cruiser", 1).isSunk()).toEqual(true)
})

test("hitpoint", () => {
    expect(ships("cruiser").hitPoint(4)).toBe(4)
})

test("hitpoint", () => {
    expect(ships("cruiser", 3).shipLength).toBe(3)
})