import gameBoards from '../src/gameBoard.js'
import ships from '../src/ship.js'


test("get coordinate of ship placement", () => {
    console.log(ships("cruiser", 5))
    let cruiser = ships("cruiser", 5)
    let submarine = ships("submarine", 3)
    let bomber = ships("bomber", 4)
    let boat = ships("boat", 2)
    let yatch = ships("yatch", 3)
    let gameBoard = gameBoards();

    [yatch, boat, bomber, submarine, cruiser].forEach(hard => {
    gameBoard.isYaxis = false

        let random = Math.floor(Math.random()* (10 - 1 ) + 1)
        let random2 = Math.floor(Math.random()* (10 - 1 ) + 1)
        gameBoard.shipGridSpot(hard.name, hard.shipLength, random, random2)
        console.log(hard.name, hard.length)
    })
    
    expect(gameBoard.allspot).toEqual({"spot": [2,3,4,5], "y_axis": 6})
})

// test.only("attack received", () => {
//     expect(gameBoards().receiveAttack(2,8)).toEqual({x_axis:2,y_axis:8})
// })

test("attacks missed", () => {
    let cruiser = ships("cruiser", 5)
    let submarine = ships("submarine", 3)
    let bomber = ships("bomber", 4)
    let boat = ships("boat", 2)
    let yatch = ships("cruiser", 3)
    let gameBoard = gameBoards();
    [yatch, boat, bomber, submarine, cruiser].forEach(hard => {
        let random = Math.floor(Math.random()* (10 - 1 ) + 1)
        let random2 = Math.floor(Math.random()* (10 - 1 ) + 1)
        gameBoard.shipGridSpot(hard.name, hard.length, random, random2)
    })
    
    expect(gameBoard.receiveAttack(3, 2)).toBe(true)
})

test("attacks hit", () => {
    let cruiser = ships("cruiser", 5)
    let submarine = ships("submarine", 3)
    let bomber = ships("bomber", 4)
    let boat = ships("boat", 2)
    let yatch = ships("cruiser", 3)
    let gameBoard = gameBoards();
    [yatch, boat, bomber, submarine, cruiser].forEach(hard => {
        let random = Math.floor(Math.random()* (10 - 1 ) + 1)
        let random2 = Math.floor(Math.random()* (10 - 1 ) + 1)
        gameBoard.shipGridSpot(hard.name, hard.length, random, random2)
    })
    
    expect(gameBoard.receiveAttack(2, 10)).toBe(true)
})

test.only("isYaxis", () => {
    let gameBoard = gameBoards();
    gameBoard.isYaxis = false
    console.log(gameBoard.isYaxis)
    expect(gameBoard.isYaxis).toBe(true)
})