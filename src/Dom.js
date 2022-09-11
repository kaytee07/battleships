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
                        all.push(throughBoard(`${yAxis+i},${xAxis}`))
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
                newGame.gameBoard1.shipGridSpot(player.name, currShipLen,yAxis, xAxis, newGame.gameBoard1.isYaxis)
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
                console.log(all[0])
                console.log(all.indexOf(undefined))
                all.forEach(elem => {

                    console.log(elem.style.backGroundColor = "red")
                })
                //     if(newGame.player1.currShip < newGame.player1.playerShips.length - 1) newGame.player1.currShip++;          
                //     console.log(newGame.gameBoard1)
                //     console.log(newGame.gameBoard1.allspot)
            })
        })
    } 

    function setBoards(){
        newGame.gameBoard1 = gameBoards();
        newGame.gameBoard2 = gameBoards();    
    }

    function renderGameBoard(){
        let strtGme = document.querySelector(".start_game");
        let space = document.querySelector(".grid-box");
        let width = 10;
        let height = 10;
        
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerHTML = newGame.gameBoard1.isYaxis ? "horizontal" : "vertical";
        strtGme.innerHTML = ""      
        strtGme.append(btn)
        for (let i = 0; i < height ; i ++){
            for(let j = 0; j < width ;j ++){
               let temp = document.createElement("div")
               temp.classList.add("box")
               temp.setAttribute("point", `${i},${j}`)
                space.append(temp)
            }
        }


        
       setShipListener()
    }

    function setCompShip(){
        newGame.player2
    }

    function setPlayerShip(num){
     console.log(newGame.player1.playerShips[1])
    }

    function listeners(){
        let btnStrt = document.querySelector(".btn_start")
        let playerName = document.querySelector(".player_name");

        btnStrt.addEventListener("click", ()=> {
            setPlayers(playerName.value)
            setBoards("jake")
            renderGameBoard();
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

