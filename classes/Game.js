import Controller from './Controller'

export default class Game {
    /**
     * @type {Object}
     */
    gameDom = null

    /**
     * @type {Controller}
     */
    controller = null

    /**
     * @param {Object} mainDom 
     */
    constructor(mainDom){
        this.gameDom = document.createElement('div')
        this.gameDom.classList.add('game')
        mainDom.append(this.gameDom)
        
        this.controller = new Controller(this.gameDom)
    }
}