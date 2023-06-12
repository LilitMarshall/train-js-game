import EventEmitter from './EventEmitter'

export default class ScoreView {
    /**
     * @type {Object}
     */
    gameDom = null

    /**
     * @type {Score}
     */
    score = null

    /**
     * @type {EventEmitter}
     */
    event = null
    /**
     * @param {Object} domElement
     * @param {Score} score 
     */
    constructor(domElement, score){
        this.render = this.render.bind(this)

        this.gameDom = domElement
        this.score = score
        this.event = new EventEmitter()

        this.score.event.subscribe('change', () => {
            this.render()
        })
    }

    render(){
        let infoPanel = this.gameDom.querySelector('.info-panel')
        if(!infoPanel){
            infoPanel = document.createElement('div')
            infoPanel.classList.add('info-panel')
            this.gameDom.append(infoPanel)
        }

        let restartButton = infoPanel.querySelector('.button')
        if(!restartButton){
            restartButton = document.createElement('div')
            restartButton.classList.add('button')
            infoPanel.append(restartButton)
            restartButton.addEventListener('click', () => {this.event.emit('click', this)})
        }

        let scoreContainer = infoPanel.querySelector('.scoreContainer')
        if(!scoreContainer){
            scoreContainer = document.createElement('div')
            scoreContainer.classList.add('scoreContainer')
            infoPanel.append(scoreContainer)
        }

        let scoreText = scoreContainer.querySelector('.scoreText')
        if(!scoreText){
            scoreText = document.createElement('div')
            scoreText.classList.add('scoreText')
            scoreContainer.append(scoreText)
            scoreText.textContent = 'Счёт'
        }

        let scoreCounter = scoreContainer.querySelector('.scoreCounter')
        if(!scoreCounter){
            scoreCounter = document.createElement('div')
            scoreCounter.classList.add('scoreCounter')
            scoreContainer.append(scoreCounter)
        }
        scoreCounter.textContent = this.score.value
    }
}