import gamePlay from "./gamePlay.js";
import player from "./player.js"
import gameBoards from "./gameBoard.js";


const DOM = (() => {
    let newGame = gamePlay();
    function setPlayers(input){
        newGame.player1 = player(false, input)
        newGame.player2 = player(true);
       
    }
//push ship to board
    function throughBoard(highLIghted){
        let box = document.querySelectorAll(".box");
        for(let j = 0; j < box.length ; j++){
            if(highLIghted === box[j].getAttribute("point")) return box[j]
        }
    }

    function isSpaceOccupied(all){
        let dontAdd = false
        all.some(elem => {    
            if(elem.style.borderColor === "red") dontAdd = true
            })
            return dontAdd
    }

    function setShipListener(g){
        let box = document.querySelectorAll(".box");
        let button = document.querySelector(".btn");
        console.log(newGame.gameBoard1.isYaxis)
        button.addEventListener("click", ()=> { 
            if(newGame.gameBoard1.isYaxis){     
                console.log("me")
                newGame.gameBoard1.isYaxis = false
                button.innerHTML = 'vertical'
               return
                
            }
            if(newGame.gameBoard1.isYaxis === false){
                console.log("ma")
                newGame.gameBoard1.isYaxis = true
                button.innerHTML = 'horizontal';
                return
            }
          
        })

        // on mouse hover add highlight on area for ship
        box.forEach(elem => {
            elem.addEventListener("mouseover", () => {
                let shipNo = newGame.player1.currShip
                let currShipLen = newGame.player1.playerShips[shipNo].shipLength
                let yAxis = parseInt(elem.getAttribute("point")[0], 10);
                let xAxis = parseInt(elem.getAttribute("point")[2], 10);
                let all = []
                if(newGame.gameBoard1.isYaxis){
                    for(let i = 0 ; i < currShipLen ; i++){    
                        all.push(throughBoard(`${yAxis+i},${xAxis}`))
                    }   
                }
                if(!newGame.gameBoard1.isYaxis){
                    for(let i = 0 ; i < currShipLen ; i++){           
                        all.push(throughBoard(`${yAxis},${xAxis + i}`))
                    }  
                } 
                
                console.log(all.indexOf(undefined))
            })
        })
        // on mouse leave remove highlight on area for ship
        box.forEach(elem => {
            elem.addEventListener("mouseleave", () => {
                let shipNo = newGame.player1.currShip
                let currShipLen = newGame.player1.playerShips[shipNo].shipLength
                let yAxis = parseInt(elem.getAttribute("point")[0], 10);
                let xAxis = parseInt(elem.getAttribute("point")[2], 10);
                let all = []
                if(newGame.gameBoard1.isYaxis){
                    for(let i = 0 ; i < currShipLen ; i++){    
                        all.push(throughBoard(`${yAxis+i},${xAxis}`))        
                    }  
                }
                if(!newGame.gameBoard1.isYaxis){
                    for(let i = 0 ; i < currShipLen ; i++){    
                        all.push(throughBoard(`${yAxis+i},${xAxis}`))                      
                    }        
                }    

            })
        })
        // on mouse click add highlight on area for ship
        box.forEach(elem => {
            elem.addEventListener("click", () => {
                let player = newGame.player1
                let shipNo = newGame.player1.currShip
                let yAxis = parseInt(elem.getAttribute("point")[0], 10);
                let xAxis = parseInt(elem.getAttribute("point")[2], 10);
                let all = [];
            
                let currShipLen = newGame.player1.playerShips[shipNo].shipLength
                if(newGame.gameBoard1.isYaxis){
                    for(let i = 0 ; i < currShipLen ; i++){    
                        all.push(throughBoard(`${yAxis+i},${xAxis}`))
                    }                   
                }
                if(!newGame.gameBoard1.isYaxis){
                    for(let i = 0 ; i < currShipLen ; i++){    
                        all.push(throughBoard(`${yAxis},${xAxis + i}`))                            
                    }           
                }
                console.log(all)
                if(all.indexOf(undefined) !== -1 ) return;
                if(isSpaceOccupied(all)) return
                all.forEach(elem => {   
                    console.log(elem.getAttribute("point"))
                  newGame.gameBoard1.shipGridSpot(player.name,elem.getAttribute("point")[0], elem.getAttribute("point")[2])   
                    elem.style.borderColor = "red"
                })
                newGame.player1.currShip++;    
                    console.log(newGame.gameBoard1)
                    console.log(newGame.gameBoard1.allspot)
                    if(shipNo >= player.playerShips.length - 1){
                        renderGamePlay1();
                        renderGamePlay2();
                        return
                    }
            })
        })
    } 

    // create players and board
    function setBoards(){
        newGame.gameBoard1 = gameBoards();
        newGame.gameBoard2 = gameBoards();    
    }

    // render UIs

    function renderShipsOnBoard(){
        let strtGme = document.querySelector(".start_game");  
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerHTML = newGame.gameBoard1.isYaxis ? "horizontal" : "vertical";
        strtGme.innerHTML = ""      
        strtGme.append(btn)
         renderBoard()    
       setShipListener()
    }

   

    function getPLaceshipsP1(input){
        let box = document.querySelectorAll("div.first > .box")
        box.forEach(elem => {
            if(elem.getAttribute("point") === input){
                elem.style.backgroundColor = "green"
            }
        })
      
    }   

    function getPLaceshipsP2(input){
        let box = document.querySelectorAll("div.second > .box")
        box.forEach(elem => {
            if(elem.getAttribute("point") === input){
                elem.style.backgroundColor = "green"
            }
        })
      
    }   

    function renderGamePlay1(){
        let games = document.querySelector(".games");
        let start = document.querySelector(".start_game")
        start.innerHTML = "";
        games.innerHTML = "";
        renderBoard();
        let grid = document.querySelector(".grid-box")
        grid.classList.add('first');
        newGame.gameBoard1.allspot.forEach(elem => {
            getPLaceshipsP1(`${elem.y_axis},${elem.x_axis}`)
          
         })
    }

    function renderGamePlay2(){
        let games = document.querySelector(".games");
        renderBoard();
        games.lastElementChild.classList.add("second")
        let box = document.querySelectorAll("div.second > .box")
        newGame.gameBoard2.allspot.forEach(elem => {
            getPLaceshipsP2(`${elem.y_axis},${elem.x_axis}`)
          
         })
    }

   
    function renderBoard(){
        let width = 10;
        let height = 10;
        let games = document.querySelector(".games")
        let space = document.createElement("div");
        space.classList.add("grid-box")
        for (let i = 0; i < height ; i ++){
            for(let j = 0; j < width ;j ++){
               let temp = document.createElement("div")
               temp.classList.add("box")
               temp.setAttribute("point", `${i},${j}`)
                space.append(temp)
            }
        }
        games.append(space)
    }

    function setCompShip(num) {
    let statics = randNum(1,9)
    if(num >= newGame.player2.playerShips.length) return
    let staticLIst = statics[num];
    let bool = [true, false];
    let isYaxis = bool[Math.floor(Math.random() * 2)];
    let player = newGame.player2;
    let currShip = player.playerShips[num];
    let change = Math.floor(Math.random() * (10 - currShip.shipLength)) 
    for(let i = 0; i < currShip.shipLength; i++){
        if(isYaxis){
            newGame.gameBoard2.shipGridSpot(player.name,change + i, staticLIst) 
        }
        if(!isYaxis){
            newGame.gameBoard2.shipGridSpot(player.name,staticLIst,change + i) 
        }
     }
     num++
     setCompShip(num)
     console.log(newGame)
      
    }
    
    function randNum (){
        let randNum = []
        let pull = [1,2,3,4,5,6,7,8,9];
        function checkNo(count, length){
            let counter = count;
            let size = length;
            let rand = Math.floor(Math.random() * size);
            if(counter > 5) return
            randNum.push(pull[rand])    
            pull.splice(rand,1)
            counter++
            size--
            checkNo(counter, size)
            
        }
      checkNo(1,9)
      return randNum
    }
 

//listeners
    function listeners(){
        let btnStrt = document.querySelector(".btn_start")
        let playerName = document.querySelector(".player_name");

        btnStrt.addEventListener("click", ()=> {
            setPlayers(playerName.value)
            setBoards("jake")
            renderShipsOnBoard();
            setCompShip(0);
            console.log(newGame.gameBoard2)
        })   
    }

    function playGame(){
        
    }

    function init(){
        
        listeners()
    }


    return{
        init
    }
})()

DOM.init()

