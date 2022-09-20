const ships = (id, length) => {
    let shipLength = length;
    let name = id;
   
    let shipHitPos = []


    const hitPoint = (point) => {
        length > 0 ? length -- : "";
        shipHitPos.push(point)
    }

    const isSunk = () => { 
        let isSunken = false;
        if(length === shipHitPos.length) isSunken = true;
        return isSunken
    }

    return{
        name, 
        shipLength,
        isSunk,
        hitPoint,
        shipHitPos
    }
}

export default ships

