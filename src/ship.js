const ships = (id, length) => {
    let shipLength = length;
    let name = id;
    let numOfHit = 0;
    let isSunken = false;
    let shipHitPos = []


    const hitPoint = (point) => {
        if(length > 0) length --
        return point
    }

    const isSunk = () => { 
        if(length === 0){
            isSunken = true
        }
        return isSunken = true;
    }

    return{
        name, 
        shipLength,
        isSunk,
        hitPoint
}
}

export default ships

