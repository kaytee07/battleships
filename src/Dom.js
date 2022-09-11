import gamePlay from "./gamePlay.js";
import player from "./player.js"
import gameBoards from "./gameBoard.js";


const DOM = (() => {
    let newGame = gamePlay();
    function setPlayers(input){
        newGame.player1 = player(false, input)
        newGame.player2 = player(true);
       
    }

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
                let currShipLen = newGame.player1.playerShips[shipNo].shipLength
                let yAxis = parseInt(elem.getAttribute("point")[0], 10);
                let xAxis = parseInt(elem.getAttribute("point")[2], 10);
                let all = [];
                if(shipNo > player.playerShips.length - 1){
                    return
                }
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
                if(all.indexOf(undefined) !== -1 ) return;
                if(isSpaceOccupied(all)) return
                all.forEach(elem => {   
                  newGame.gameBoard1.shipGridSpot(player.name, currShipLen,elem.getAttribute("point")[0], elem.getAttribute("point")[2], newGame.gameBoard1.isYaxis)   
                    elem.style.borderColor = "red"
                })
                newGame.player1.currShip++;    
                    console.log(newGame.gameBoard1)
                    console.log(newGame.gameBoard1.allspot)
                 //   if(shipNo)
            })
        })
    } 

    function setBoards(){
        newGame.gameBoard1 = gameBoards();
        newGame.gameBoard2 = gameBoards();    
    }

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

    function renderGamePlay(){
        document.querySelector
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

    function setCompShip(shipno) {
        let t_f =[true, false]
        let player = newGame.player2;
        let shipNo = shipno;
        if(shipNo > player.playerShips.length - 1) return;
        let currShip = newGame.player2.playerShips[shipNo];
        let StaticRand = Math.floor(Math.random() * 10 );
        let useStaticRand = Math.floor(Math.random() * (10 - currShip.shipLength))
        newGame.gameBoard2.isYaxis = t_f[Math.floor(Math.random()*2)];
        if(newGame.gameBoard2.isYaxis){
            for(let i = 0; i < currShip.shipLength; i++){ 
                newGame.gameBoard2.shipGridSpot(currShip.name, useStaticRand + i, StaticRand)
            }
        }
        if(!newGame.gameBoard2.isYaxis){
            for(let i = 0; i < currShip.shipLength; i++){ 
                newGame.gameBoard2.shipGridSpot(currShip.name,  StaticRand, useStaticRand + i)
            }
        }
        shipNo++
        setCompShip(shipNo)
    }



    function listeners(){
        let btnStrt = document.querySelector(".btn_start")
        let playerName = document.querySelector(".player_name");

        btnStrt.addEventListener("click", ()=> {
            setPlayers(playerName.value)
            setBoards("jake")
            renderShipsOnBoard();
            setCompShip(0);
        })   
    }

    function init(){
        
        listeners()
    }


    return{
        init
    }
})()

DOM.init()

