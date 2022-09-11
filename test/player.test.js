import player from "../src/player"


test("test if human", ()=> {
    let player1 = player(false,"skylar")
    expect(player1.name).toBe("skylar")
})

test("test if random", ()=> {
    let player2 = player(true)
    expect(player2.isComputer).toBe(true)
})