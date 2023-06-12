import EventEmitter from './EventEmitter'


export default class Score {
    /**
     * @type {Number}
     */
    value = 0
    /**
     * @type {EventEmitter}
     */
    event = null

    constructor(){
        this.upValue = this.upValue.bind(this)
        this.resetValue = this.resetValue.bind(this)

        this.value = 0
        this.event = new EventEmitter()
    }

    upValue(){
        this.value += 50
        this.event.emit('change', this)
    }

    resetValue(){
        this.value = 0
        this.event.emit('change', this)
    }
}