 import ship from "./ship.js"
 const gameBoards = () => {
    let allspot = [];
    let isYaxis = true;
    let hitAttack = [];
    let missedAttack = [];
    let hitShip ;
    let sunk = 17;

    const toggleAxis = () => {
        isYaxis ? false : true
    }
    const shipGridSpot = (name, y , x) => {      
        let curr = []
        allspot.push({
            name,
            point:`${y},${x}`
        })
        return curr
    }
    
    function isOver(){
        if(sunk === 0){
            return true
        }
    }

    const receiveAttack = (point) => {  
        let miss = ""
        if(missedAttack.indexOf(point) !== -1) return;
        if(hitAttack.indexOf(point) !== -1) return;

        const itAmiss = (elem) => point !== elem.point
        if(allspot.every(itAmiss)){
            missedAttack.push(point)
        }
        allspot.some((elem, index) => {
            if(point === elem.point){
                hitAttack.push({
                    name: elem.name,
                    point
                })
               
                hitShip = {
                    name: elem.name,
                    point
                }
            }
        })

      
    }

  

    return {
        toggleAxis,
        shipGridSpot,
        allspot,
        receiveAttack,
        isOver,
        isYaxis,
        missedAttack,
        hitAttack,
        hitShip
    }
}

export default gameBoards
