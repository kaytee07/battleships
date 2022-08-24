 const ship = require('../src/ship')
 const gameBoards = () => {
    let isYaxis = true;

    const toggleAxis = () => {
        isYaxis ? false : true
    }
    const gridSpot = (shipLength, x , y) => {
        let allspot = []
        for(let i = 0; i < shipLength ; i++){
            if(isYaxis){
                allspot.push({x_axis:x,y_axis:y + i})
             }
            
            if(!isYaxis){  
                allspot.push({x_axis:x + i, y_axis:y})
            }
        }
        return allspot
    }
    
    const positionShip = (length, x_axis, y_axis) => {
        let spot = gridSpot(length, x_axis, y_axis)
        return spot
    }


    const receiveAttack = (x_axis, y_axis) => {

    }

    return {
        toggleAxis,
        positionShip,
    }
}

module.exports = gameBoards;
