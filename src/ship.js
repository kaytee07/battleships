const ships = (name, length) => {
    let isSunken = false;
    const hitPoint = (point) => {
        return point
    }
    const isSunk = () => {
        if(length > 0) length --
        if(length === 0) isSunken = true
        return {length, isSunken}
    }
    return{
        name, 
        length,
        isSunk,
        hitPoint
}
}

module.exports = ships