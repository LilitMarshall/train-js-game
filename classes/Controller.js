import ScoreView from './ScoreView'
import FieldView from './FieldView'
import Score from './Score'
import Field from './Field'
import Coord from './Coord'
import Helpers from './Helpers'

export default class Controller {
    /**
     * @type {String}
     */
    gameDom = null

    /**
     * @type {ScoreView}
     */
    scoreView = null

    /**
     * @type {FieldView}
     */
    fieldView = null

    /**
     * @type {Score}
     */
    score = null

    /**
     * @type {Field}
     */
    field = null

    /**
     * @type {Block|null}
     */
    targetBlock = null

    flag = true
    xStart = null
    yStart = null
    leftWall = 0
    rightWall = 0


    /**
     * 
     * @param {Object} domElement 
     */
    constructor(domElement){
        this.gameDom = domElement
        this.score = new Score()
        this.field = new Field(8, 55)
        this.scoreView = new ScoreView(this.gameDom, this.score)
        this.fieldView = new FieldView(this.gameDom, this.field, 55)
        this.scoreView.render()
        this.fieldView.render()
        this.field.genNewRow()
        
        this.grabBlock = this.grabBlock.bind(this)
        this.moveBlock = this.moveBlock.bind(this)
        this.restart = this.restart.bind(this)
        this.endGame = this.endGame.bind(this)
        this.absolveBlock = this.absolveBlock.bind(this)

        this.scoreView.event.subscribe('click', this.restart)
        this.fieldView.event.subscribe('mouseDown', this.grabBlock)
        this.fieldView.event.subscribe('mouseMove', this.moveBlock)
        this.fieldView.event.subscribe('mouseUp', this.absolveBlock)
        this.field.event.subscribe('rowDeleted', this.score.upValue)
    }

    grabBlock(targetBlock){
        if(this.flag){
            this.targetBlock = targetBlock
            this.flag = false 
            this.xStart = this.targetBlock.coords.x
            this.yStart = this.targetBlock.coords.y

            let arrRow = this.field.getRowArr(this.yStart)
            this.leftWall = this.field.getLeftWall(arrRow, this.targetBlock)
            this.rightWall = this.field.getRightWall(arrRow, this.targetBlock)
        }
    }

    moveBlock(offsetMouseX){
        if(this.targetBlock){
            let newTargetBlockX = this.xStart - offsetMouseX

            if(newTargetBlockX < this.leftWall){
                newTargetBlockX = this.leftWall
            }
            if(newTargetBlockX > this.rightWall){
                newTargetBlockX = this.rightWall
            }
    
            this.fieldView.targetNewX = newTargetBlockX;
            this.targetBlock.coords = new Coord(newTargetBlockX, this.yStart)
            this.fieldView.positionBlock(this.fieldView.targetBlock, newTargetBlockX, this.yStart)
        }
    }

    async absolveBlock(){
        if(!this.flag && this.targetBlock){
            let newCoord = Coord.calculateCoord(this.fieldView.targetNewX, this.field.step)
            if(this.startX != newCoord){
                this.targetBlock.coords = new Coord(newCoord, this.yStart)
                this.targetBlock = null
    
                await this.startNewStep()
            }else{
                this.targetBlock.coords = new Coord(this.startX, this.yStart)
                this.targetBlock = null
            }
            
            this.flag = true
        }
    }

    async startNewStep(){
        do{
            await Helpers.timeout(100, this.field.collapse)
            await Helpers.timeout(300, this.field.checkFullRow)
            await Helpers.timeout(100, this.field.collapse)
        }while(this.field.checkFullRow())
        if(this.field.checkFieldFill()){
            this.endGame()
        }else{
            await Helpers.timeout(500, this.field.upBlocks)
            await Helpers.timeout(450, this.field.genNewRow)
            do{
                await Helpers.timeout(100, this.field.collapse)
                await Helpers.timeout(300, this.field.checkFullRow)
                await Helpers.timeout(100, this.field.collapse)
            }while(this.field.checkFullRow())
        }
    }

    endGame(){
        alert('Ты проиграл, твой счет: ' + this.score.value)
        this.restart()
    }

    restart(){
        this.score.resetValue()
        this.field.clearField()
        this.field.genNewRow()
    }
}