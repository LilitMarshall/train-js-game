import EventEmitter from './EventEmitter'
import Coord from './Coord'

export default class Block {
    /**
     * @type {Number}
     */
    size = 0

    /**
     * @type {Coord}
     */
    coords = []

    /**
     * @type {EventEmitter}
     */
    event = null

    /**
     * @type {Number}
     */
    id = 0

    /**
     * @param {Number} size 
     * @param {Number} x
     * @param {Number} y
     */
    constructor(id, size, x, y){
        this.setCoord = this.setCoord.bind(this)
        this.getBlockWidth = this.getBlockWidth.bind(this)

        this.size = size
        this.coords = new Coord(x, y)

        this.id = id
        this.event = new EventEmitter()
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     */
    setCoord(x, y){
        this.coords = new Coord(x, y)
        this.event.emit('change', this)
    }

    getBlockWidth(step){
        return ((this.size) * step)
    }
}