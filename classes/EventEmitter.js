export default class EventEmitter {

    events = {}

    constructor(){
        this.subscribe = this.subscribe.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.emit = this.emit.bind(this)
    }

    /**
     * @param {string} eventName 
     * @param {Function} callback 
     */
    subscribe(eventName, callback){
        if(!this.events[eventName]){
            this.events[eventName] = []
        }
        this.events[eventName].push(callback)
    }

    /**
     * @param {string} eventName 
     * @param {Function} callback 
     */
    unsubscribe(eventName, callback){
        this.event[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback)
    }

    /**
     * @param {string} eventName 
     * @param {any} args 
     */
    emit(eventName, args){
        const event = this.events[eventName]
        if(event){
            event.forEach(callback => callback(args))
        }
    }
}