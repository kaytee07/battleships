import gamePlay from "./gamePlay.js";
import player from "./player.js"
import gameBoards from "./gameBoard.js";


const DOM = (() => {
    let newGame = gamePlay();
    function setPlayers(input){
        newGame.player1 = player(false, input)
        newGame.player2 = player(true);
       
    }
//!push ship to board
    function throughBoard(highLIghted){
        let box = document.querySelectorAll(".box");
        for(let j = 0; j < box.length ; j++){
            if(highLIghted === box[j].getAttribute("point")) return box[j]
        }
    }

    function isSpaceOccupied(all){
        let dontAdd = false
        all.some(elem => {    
            if(elem.style.backgroundColor === "#a4c3b2") dontAdd = true
            })
            return dontAdd
    }

 
    // create players and board
    function setBoards(){
        newGame.gameBoard1 = gameBoards();
        newGame.gameBoard2 = gameBoards();    
    }

    //! render UIs
    //!render places ship UI
    function renderShipsOnBoard(){
        let strtGme = document.querySelector(".start_game");  
        let btn = document.createElement("button");
        let header = document.createElement("h3");
        strtGme.classList.add("reduceheight");
        header.classList.add("placeship");
        btn.classList.add("btn");
        header.innerHTML = "Place your ships"
        btn.innerHTML = newGame.gameBoard1.isYaxis ? "horizontal" : "vertical";
        strtGme.innerHTML = ""    ;
        strtGme.append(header)  
        strtGme.append(btn)
         renderBoard()    
       setShipListener()
    }

   

    function getPLaceshipsP1(input){
        let box = document.querySelectorAll("div.first > .box")
        box.forEach(elem => {
            if(elem.getAttribute("point") === input){
                elem.style.backgroundColor = "gray"
            }
        })
    }   

   //! remove comment to view comnputer ship positions
    // function getPLaceshipsP2(input){
    //     let box = document.querySelectorAll("div.second > .box")
    //     box.forEach(elem => {
    //         if(elem.getAttribute("point") === input){
    //             elem.style.backgroundColor = "green"
    //         }
    //     })
      
    // }   

    function renderGamePlay1(){
        let games = document.querySelector(".games");
        let start = document.querySelector(".start_game")
        start.innerHTML = "";
        games.innerHTML = ""
        renderBoard();
        start.classList.remove("reduceheight")
        start.classList.add("noheight")
        start.style.height = "0px !important"
        let grid = document.querySelector(".grid-box")
        grid.classList.add('first');
        newGame.gameBoard1.allspot.forEach(elem => {
            getPLaceshipsP1(`${elem.point}`)
          
         })
        
    }

    function renderGamePlay2(){
        let games = document.querySelector(".games");
        renderBoard();
        games.lastElementChild.classList.add("second")
        let box = document.querySelectorAll("div.second > .box")
        // newGame.gameBoard2.allspot.forEach(elem => {
        //     getPLaceshipsP2(`${elem.point}`)
          
        //  })
         board1Listener();
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

    function setCompShip() {
    let random = randNum()
    function recur(num){
        if(num >= newGame.player2.playerShips.length) return
        let staticLIst = random[num];
        let bool = [true, false];
        let isYaxis = bool[Math.floor(Math.random() * 1)];
        let player = newGame.player2;
        let currShip = player.playerShips[num];
        let incrementNum = Math.floor(Math.random() * 10) 
        let change = incrementNum + currShip.shipLength >= 9 ? incrementNum - currShip.shipLength : incrementNum;
        for(let i = 0; i < currShip.shipLength; i++){
            if(isYaxis){
                newGame.gameBoard2.shipGridSpot(currShip.name,parseInt(change, 10) + i, staticLIst) 
            }
            if(!isYaxis){
                newGame.gameBoard2.shipGridSpot(currShip.name,staticLIst,parseInt(change, 10) + i) 
            }
         }
         num++
         recur(num)
    }
    recur(0);
   
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
 
  
//!listeners

function endListener(){
    let start = document.querySelector(".start");
    start.addEventListener("click", () => {
        location.reload()
    })
}

function setShipListener(g){
    let box = document.querySelectorAll(".box");
    let button = document.querySelector(".btn");
    button.addEventListener("click", ()=> { 
        if(newGame.gameBoard1.isYaxis){     
            newGame.gameBoard1.isYaxis = false
            button.innerHTML = 'vertical'
           return
            
        }
        if(newGame.gameBoard1.isYaxis === false){
            newGame.gameBoard1.isYaxis = true
            button.innerHTML = 'horizontal';
            return
        }
      
    })

    //! on mouse hover add highlight on area for ship
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
            
            all.forEach(elem => {
                if(elem) elem.classList.add("addgray")
                return
            })

        })
    })
    //! on mouse leave remove highlight on area for ship
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
                    all.push(throughBoard(`${yAxis},${xAxis + i}`))                      
                }        
            }    
            
            all.forEach(elem => {
                if(elem) elem.classList.remove("addgray")
                return
            })

        })
    })
    //! on mouse click add highlight on area for ship
    box.forEach(elem => {
        elem.addEventListener("click", () => {
            let player = newGame.player1
            let shipNo = newGame.player1.currShip
            let yAxis = parseInt(elem.getAttribute("point")[0], 10);
            let xAxis = parseInt(elem.getAttribute("point")[2], 10);
            let all = [];
            let currType = newGame.player1.playerShips[shipNo].name
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
            if(all.indexOf(undefined) !== -1 ) return;
            if(isSpaceOccupied(all)) return
            all.forEach(elem => {   
              newGame.gameBoard1.shipGridSpot(currType,elem.getAttribute("point")[0], elem.getAttribute("point")[2])   
                elem.style.background = "gray"
            })
            newGame.player1.currShip++;    
                if(shipNo >= player.playerShips.length - 1){
                    renderGamePlay1();
                    renderGamePlay2();
                    return
                }
        })
    })
} 

    function board1Listener(){
        let tab = document.querySelectorAll(".second > .box");
        tab.forEach(elem => {
            elem.addEventListener("click", () => {
                let hit = newGame.gameBoard2.receiveAttack(elem.getAttribute("point"))
                newGame.player2.playerShips.forEach(elem => {
                    if(!hit.name) return
                    if(elem.name === hit.name){
                        elem.hitPoint(hit.point)
                        elem.shipHitPos.forEach(elem => {
                            hitSpot(elem).style.backgroundColor = '#d62828'
                        })
                    }
                })
               newGame.gameBoard2.missedAttack.forEach(elem => {
                missSpot(elem).style.backgroundColor = '#f77f00'
               })
               isGameOver(newGame.player1.name, newGame.gameBoard2)
               setTimeout(() => {
                playP2()
               }, 500);
              
            })

          
        })
    } 

    //!function needed
    function hitSpot(pain){
        let box = document.querySelectorAll(".second > .box ");
        for(let j = 0; j < box.length ; j++){
            if(pain === box[j].getAttribute("point")) return box[j]
        }
    }

    function newHitSpot(pain){
        let box = document.querySelectorAll(".first > .box ");
        for(let j = 0; j < box.length ; j++){
            if(pain === box[j].getAttribute("point")) return box[j]
        }
    }

    function missSpot(pain){
        let box = document.querySelectorAll(".second > .box ");
        for(let j = 0; j < box.length ; j++){
            if(pain === box[j].getAttribute("point")) return box[j]
        }
    }

    function newMissSpot(pain){
        let box = document.querySelectorAll(".first > .box ");
        for(let j = 0; j < box.length ; j++){
            if(pain === box[j].getAttribute("point")) return box[j]
        }
    }

    function isGameOver(player, gameboard){
        const cover = document.querySelector(".cover");
        const game = document.querySelector(".endgame");
        const whoWOn = document.querySelector(".whowon");
        if(gameboard.isOver()){
            cover.style.display = "block";
            game.style.display = "flex";
            whoWOn.innerHTML = `${player} won!!`
        }
        endListener()
    }


    
    //!player two turn in playing 
    function playP2(){
        let box = document.querySelectorAll(".first > .box");
        let select = box[Math.floor(Math.random() * box.length)];
        let alrExstInMis = newGame.gameBoard1.missedAttack.indexOf(select.getAttribute("point"))
        let alrExstInHit = newGame.gameBoard1.hitAttack.indexOf(select.getAttribute("point"))
        if(alrExstInHit >= 0 || alrExstInMis >= 0) playP2();
        let hit = newGame.gameBoard1.receiveAttack(select.getAttribute("point"));
        newGame.player1.playerShips.forEach( find => {
            if(find.name === hit.name){
                find.hitPoint(hit.point)
                find.shipHitPos.forEach(elem => {
                    newHitSpot(elem).style.backgroundColor = '#d62828'
                })
            }else{
                return
            }
        })

        newGame.gameBoard1.missedAttack.forEach(elem => {
            newMissSpot(elem).style.backgroundColor = '#f77f00'
           })
           isGameOver(newGame.player2.name, newGame.gameBoard1)
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

