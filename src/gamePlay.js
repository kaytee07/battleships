const gamePlay = () => {
let isGameWon = false;

let player1;
let player2;

let gameBoard1;
let gameBoard2;

let currentPlayer = player1

function playerTurn(){
    if(currentPlayer.name === player1.name){
        currentPlayer = player2
    }
    if(currentPlayer.name === player2.name){
        currentPlayer = player1
    }
}

function attackBoard(player, x_axis, y_axis){
    if(player.name !== gameBoard1.whoseBoard){
        gameBoard1.receiveAttack(x_axis, y_axis)
        if(gameBoard1.isOver){
            isGameWon = true
            return
        }
    }
    if(player.name !== gameBoard2.whoseBoard){
        gameBoard2.receiveAttack(x_axis, y_axis)
        if(gameBoard1.isOver){
            isGameWon = true
            return
        }
    }
}

function gameWon(){
    if(isGameWon){

    }
}


return{
    player1,
    player2,
    gameBoard1,
    gameBoard2
}

}

export default gamePlay