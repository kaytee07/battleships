const ships = (id, length) => {
    let shipLength = length;
    let name = id;
    let numOfHit = 0;
    let isSunken = false;
    let shipHitPos = []


    const hitPoint = (point) => {
        for(let hit of shipHitPos){
            if(hit.x_axis === point.x_axis && hit.y_axis === point.y_axis){
                return false
            }
            numOfHit++
            return point
        }
        shipHitPos.push(point)
        return point
    }

    const isSunk = () => {
        if(length > 0) length --
        if(length === numOfHit){
            isSunken = true
        }
        return isSunken
    }

    return{
        name, 
        shipLength,
        isSunk,
        hitPoint
}
}

export default ships

