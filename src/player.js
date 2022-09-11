import ships from "./ship.js";
const player = (computer,id) => {
    let name = id || "computer"
    let isComputer = computer;
    let currShip = 0;
    let playerShips = [ships("cruiser", 5), ships("bomber", 4), ships("battle", 3), ships("sub", 3), ships("boat", 2)]
 

    return{
        name,
        isComputer,
        playerShips,
        currShip
    }
}

export default player