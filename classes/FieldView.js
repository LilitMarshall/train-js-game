import EventEmitter from './EventEmitter'

export default class FieldView {
    /**
     * @type {Object}
     */
    gameDom = null

    /**
     * @type {Array}
     */
    blocks = []

    /**
     * @type {Field}
     */
    field = null

    /**
     * @type {Number}
     */
    cellsize = 0

    /**
     * @type {EventEmitter}
     */
    event = null

    /**
     * @type {Block|null}
     */
    targetBlock = null

    targetStartMouseX = null
    targetNewX = null

    /**
     * @param {Object} domElement 
     * @param {Field} field
     * @param {Number} cellSize
     */
    constructor(domElement, field, cellSize){
        this.render = this.render.bind(this)
        this.findBlock = this.findBlock.bind(this)
        this.renderBlock = this.renderBlock.bind(this)
        this.positionBlock = this.positionBlock.bind(this)
        // this.onDragStart = this.onDragStart.bind(this)

        this.onmousedown = this.onmousedown.bind(this)
        this.mouseup = this.mouseup.bind(this)

        this.gameDom = domElement
        this.field = field
        this.cellsize = cellSize
        this.event = new EventEmitter()

        this.field.event.subscribe('change', this.render)

        document.addEventListener('mousemove',(e) => {
            this.mouseMove(e)
        })
        document.addEventListener('mouseup', this.mouseup)
    }
    onmousedown(e, targetBlockDom){
        this.targetBlock = targetBlockDom
        this.targetStartMouseX = e.pageX

        this.event.emit('mouseDown', (this.field.findBlock(targetBlockDom.dataset.id)))
    }
    
    mouseMove(e){
        if(this.targetBlock){
            let offsetMouseX = this.targetStartMouseX - e.pageX
            if(offsetMouseX != 0){
                this.event.emit('mouseMove', offsetMouseX)
            }
        }
    }
    
    mouseup(){
        if(this.targetBlock){
            this.event.emit('mouseUp', '')
        }
        this.targetBlock = null
    }

    render(){
        let fieldBackground = this.gameDom.querySelector('.field-back')
        if(!fieldBackground){
            fieldBackground = document.createElement('div')
            fieldBackground.classList.add('field-back')
            this.gameDom.append(fieldBackground)
        }

        let fieldDom = this.gameDom.querySelector('.field')
        if(!fieldDom){
            fieldDom = document.createElement('div')
            fieldDom.classList.add('field')
            fieldBackground.append(fieldDom)
        }
        if(this.field.blocks.length>0){
            for(let block of this.field.blocks){
                this.renderBlock(block, fieldDom)
            }
            let blocksDom = fieldDom.querySelectorAll('.block')
            for(let blockDom of blocksDom){
                let targetId = blockDom.dataset.id
                if(!this.field.findBlock(targetId)){
                    blockDom.remove()
                }
            }
        } else{
            fieldDom.innerHTML = ''
        }
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Object}
     */
    findBlock(id){
        return this.gameDom.querySelector('.block[data-id = "' + id)
    }

    /**
     * @param {Block} block 
     * @param {Object} fieldDom 
     */
    renderBlock(block, fieldDom){
        let targetDom = this.findBlock(block.id)
        if(!targetDom){
            targetDom = document.createElement('div')
            targetDom.classList.add('block', 'block-'+block.size)
            targetDom.dataset.id = block.id
            
            targetDom.addEventListener('mousedown', (e) => {
                this.onmousedown(e, targetDom)
            })
            // targetDom.addEventListener('dragstart', this.onDragStart)

            fieldDom.append(targetDom)
        }
        this.positionBlock(targetDom, block.coords.x, block.coords.y)
    }

    // onDragStart(){
    //     return false;
    // }

    /**
     * @param {Object} targetDom 
     * @param {Number} x 
     * @param {Number} y 
     */
    positionBlock(targetDom, x, y){
        targetDom.style.left = x + 'px'
        targetDom.style.bottom = y + 'px'
    }
}