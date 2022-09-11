 import ship from "./ship.js"
 const gameBoards = (name) => {
    let whoseBoard = name
    let ships = [];
    let allspot = [];
    let isYaxis = true;
    let hitAttack = [];
    let missedAttack = []
    let sunk = 17;

    const toggleAxis = () => {
        isYaxis ? false : true
    }
    const shipGridSpot = (type ,y , x) => {      
        let curr = []
        allspot.push({name:type,y_axis:y,x_axis:x })
        return curr
    }
    
    function isOver(){
        if(sunk === 0){
            return true
        }
    }

    const receiveAttack = (y_axis, x_axis, opps) => {  
          missedAttack.forEach(point => {
            if (point.toString() === `${y_axis},${x_axis}`){
                return "already attacked"
            }
          })
          hitAttack.forEach(point => {
            if (point.toString() === `${y_axis},${x_axis}`){
                return "already attacked"
            }
          })

          allspot.forEach(coords => {
            if(coords.y_axis === y_axis && coords.x_axis === x_axis){
                sunk --
                hitAttack.push({y_axis,x_axis});
            }else{    
               missedAttack.push({y_axis,x_axis})
            }
        })

      
    }

  

    return {
        toggleAxis,
        shipGridSpot,
        allspot,
        receiveAttack,
        ships,
        whoseBoard,
        isOver,
        isYaxis
    }
}

export default gameBoards
