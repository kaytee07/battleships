let gameBoards = require("../src/gameBoard");
let ships = require('../src/ship');

test("get coordinate of ship placement", () => {
    expect(gameBoards().positionShip(ships("sub", 3).length, 2, 6)).toEqual({"spot": [6,7,8], "x_axis": 2})
})

test("get coordinate of ship placement", () => {
    expect(gameBoards().positionShip(ships("sub", 4).length, 2, 6)).toEqual({"spot": [2,3,4,5], "y_axis": 6})
})