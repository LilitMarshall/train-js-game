export default class Coord {
    /**
     * @type {Number}
     */
    x = 0

    /**
     * @type {Number}
     */
    y = 0

    constructor(x, y){
        this.x = x
        this.y = y
    }

    static calculateCoord(coord, step){
        return coord = Math.floor(coord/step)*step
    }
}