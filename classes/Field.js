import EventEmitter from './EventEmitter'
import Helpers from './Helpers'
import Block from './Block'

export default class Field {
    /**
     * @type {Number}
     */
    size = 0

    /**
     * @type {Array.<Block>}
     */
    blocks = []

    lastBlockId = 0

    /**
     * @type {EventEmitter}
     */
    event = null
    /**
     * @type {Number}
     */
    step = null

    constructor(size, step){
        this.genNewRow = this.genNewRow.bind(this)
        this.fillNewRow = this.fillNewRow.bind(this)
        this.genBlockSize = this.genBlockSize.bind(this)
        this.countZeroCounter = this.countZeroCounter.bind(this)
        this.addBlock = this.addBlock.bind(this)
        
        this.findBlock = this.findBlock.bind(this)
        this.findBlockByCoord = this.findBlockByCoord.bind(this)
        this.upBlocks = this.upBlocks.bind(this)

        this.checkFieldFill = this.checkFieldFill.bind(this)
        this.clearField = this.clearField.bind(this)
        this.deleteFullRow = this.deleteFullRow.bind(this)
        this.checkFullRow = this.checkFullRow.bind(this)
        this.collapse = this.collapse.bind(this)

        this.getRowArr = this.getRowArr.bind(this)
        this.getLeftWall = this.getLeftWall.bind(this)
        this.getRightWall = this.getRightWall.bind(this)

        this.size = size
        this.step = step
        this.event = new EventEmitter()
    }

    genNewRow(){
        let maxRowFill = Helpers.random(4, 7)
        let blockSum = 0
        let newRow = [0, 0, 0, 0, 0, 0, 0, 0];
        while(blockSum != maxRowFill){
            let x = Helpers.random(0,7) 
            if(newRow[x] == 0){
                let zeroCounter = this.countZeroCounter(newRow, maxRowFill, blockSum, x)
                let blockSize = this.genBlockSize(zeroCounter)
                for(let i = 0; i < blockSize; i++){
                    newRow[x + i] = blockSize
                }
                blockSum+=blockSize
            }
        }
        this.fillNewRow(newRow)
        this.event.emit('change', this)
    }
    fillNewRow(arr){
        let x = 0
        while(x < arr.length){
            if(arr[x] != 0){
                this.lastBlockId++
                let newBlock = new Block(this.lastBlockId, arr[x], x*this.step, 0)
                this.addBlock(newBlock)
                x += (arr[x] - 1)
            }
            x++
        }
    }
    /**
     * @param {Block} block 
     */
    addBlock(block){
        this.blocks.push(block)
        block.event.subscribe('change', () => {
            this.event.emit('change', this)
        })
    }
    /**
     * @param {Number} zeroCounter 
     * @returns {Number}
     */
    genBlockSize(zeroCounter) {
        if(zeroCounter > 4) {
            return (Helpers.random(3, (zeroCounter-1)))
        } else {
            return (Helpers.random(1, (zeroCounter-1)))
        }
    }
    /**
     * @param {Array} newRow
     * @param {Number} maxRowFill 
     * @param {Number} blockSum 
     * @param {Number} x 
     * @returns {Number}
     */
    countZeroCounter(newRow, maxRowFill, blockSum, x){
        let zeroCounter = 1
        for(let i = (x + 1); i <= newRow.length; i++){
            if(newRow[i] == 0){
                zeroCounter++
            } else{
                break
            }
        }    
        if(zeroCounter > 4){
            zeroCounter = 5
        }
        if((blockSum+(zeroCounter-1))>maxRowFill){
            zeroCounter = maxRowFill-blockSum
        }
        return zeroCounter
    }
    upBlocks(){
        for(let block of this.blocks){
            block.setCoord(block.coords.x, (block.coords.y+this.step))
        }
    }

    getRowArr(y){
        let arrRow = []
        let x = 0
        while(x < this.size){
            let block = this.findBlockByCoord(x*this.step, y)
            if(block){
                for(let i = 1; i <= block.size; i++){
                    arrRow.push(1)
                    x++
                }
            }else{
                arrRow.push(0)
                x++
            }
        }
        return arrRow
    }
    getLeftWall(arrRow, targetBlock){
        let xStart = targetBlock.coords.x / this.step
        let leftEmpty = 0
        let cellSize = this.step

        if(this.xStart != 0){
            let x = xStart - 1
            while(x >= 0){
                if(arrRow[x] == 0){
                    leftEmpty++
                    x--
                }else{
                    break
                }
            }
        }
        return (xStart - leftEmpty) * cellSize
    }
    getRightWall(arrRow, targetBlock){
        let cellSize = this.step
        let xStart = targetBlock.coords.x
        let xEnd = (xStart + targetBlock.getBlockWidth(cellSize))/cellSize
        let rightEmpty = 0

        if(xEnd != this.size){
            let x = xEnd
            while(x <= this.size-1){
                if(arrRow[x] == 0){
                    rightEmpty++
                    x++
                }else{
                    break
                }
            }
        }
        return xStart + (rightEmpty * cellSize)
    }
    
    
    checkFullRow(){
        for(let block of this.blocks){
            let rowArr = this.getRowArr(block.coords.y)
            let flag = true
            for(let i = 0; i< rowArr.length; i++){
                if(rowArr[i] == 0){
                    flag = false
                    break
                }
            }
            if(flag){
                this.deleteFullRow(block.coords.y, rowArr.length)
                return true
            }
        }

    }
    async deleteFullRow(y){
        this.blocks = this.blocks.filter(block => block.coords.y != y);
        this.event.emit('change', this)
        this.event.emit('rowDeleted', this)
    }
    collapse(){
        for(let block of this.blocks){
            if(block.coords.y != 0){
                let rowArr = this.getRowArr(block.coords.y - this.step)
                let x = block.coords.x / this.step
                let flag = true
                for(let i = 0; i < block.size; i++){
                    if(rowArr[x+i] != 0){
                        flag = false
                        break
                    }
                }
                if(flag){
                    block.setCoord(block.coords.x, block.coords.y - 1)
                    this.collapse()
                }
            }
        }
    }
    
    /**
     * @param {Number} i 
     * @returns {Block}
     */
    findBlock(i){
        for(let block of this.blocks){
            if(block.id == (i)){
                return block
            }
        }
    }
    findBlockByCoord(x, y){
        for(let block of this.blocks){
            if(block.coords.x == x && block.coords.y == y){
                return block
            }
        }
    }
    
    checkFieldFill(){
        for(let x = 0; x < this.size; x++){
            if(this.findBlockByCoord(x*this.step, this.size*this.step)){
                return true
            }
        }
    }
    clearField(){
        this.blocks = []
        this.lastBlockId = 0
        this.event.emit('change', this)
    }
}