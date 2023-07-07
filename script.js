class Game2048 {
    field = new Field(document.getElementById("app"), 4, [2, 2, 2, 4, 8]) // TODO
    score = 0
    time = null // ?
    player = ""
    app = null // ?
    maxScore = 2048
    history = []
    startNumbers = [2, 2, 2, 4] // TODO ?

    constructor(appId, player){
        this.app = document.getElementById(appId)
        this.player = player
    }

    init(){
        this.render()
    }
    render(){
        this.showField()
        this.showScore()
        this.showTime()
    }

    gameOver(){}
    checkWin(){}
    restartGame(){}

    stepBack(){}
    move(){}
    
    showScore(){}
    showField(){
        this.field.render(this.app)
    }
    showTime(){}

    saveResult(){}
}


class Field {
    // свойства
    cells = []
    field = null // ?

    // методы
    constructor(field, size, startNumbers = []) {
        // this - "внутренности" экзепляра класса. В нем методы и свойства
        this.field = field
        this.field.style.width = size * 100 + "px"
        this.initCells(size, startNumbers)
    } // return Object (=== Field ==> this)

    initCells(size, startNumbers){
        const border = "1px solid rgba(0, 0, 0, 0.4)"
        for(let i = 0; i < size; i++){
            const row = []
            for(let j = 0; j < size; j++){
                const style = {}
                if(j < size - 1){
                    style.borderRight = border
                }
                if(i < size - 1){
                    style.borderBottom = border
                }

                let num = null

                const n = Math.round(Math.random() * 100 + 1)

                // console.log(i, j, n)

                const isNeedAdd = n % 8 > 3 // 4, 5, 6, 7 => true

                if(startNumbers.length > 0 && isNeedAdd){
                    const index = Math.round(Math.random() * (startNumbers.length - 1))
                    // console.log(startNumbers.length, index)
                    num = startNumbers.splice(index, 1)[0]
                }

                row.push(
                    new Cell(new Position(i, j), num, "cell", style)
                )
            }
            this.cells.push(row)
        }
    }

    render(app){
        for(let i = 0; i < this.cells.length; i++){
            for(let j = 0; j < this.cells[i].length; j++){
                // this.cells[i][j] => new Cell() <- initCells()
                // const cell = this.cells[i][j]
                // cell.element
                app.appendChild(this.cells[i][j].element) // 0-1 0-2 0-3 .... 1-0 1-1 ...
            }
        }
    }
}

class Cell {
    element = document.createElement("div")
    number = 2
    position = new Position()

    constructor(position, number = 2, className = "cell", style = {}) {
        this.position = position
        this.number = number

        this.element.classList.add(className)

        // this.element.style = style // error
        for(let key in style){
            this.element.style[key] = style[key] // style = {width: "100%"} ==> key = "width", style[key] = "100%"
        }

        if(this.number){
            this.element.innerText = this.number
            this.element.style.color = this.getColor()
        }

        this.element.addEventListener("click", event => this.onClick(event))
    }

    onClick(event) {}
    clear(){}
    render(){}

    getColor(){
        const num = Math.log2(this.number) // 1..11
        const step = 255 / 10
        const middleStep = 255 / 2 / 10

        // rgb(255, (255 / 4), 0) -> rgb(0, (255 / 4 * 3), 255)

        const red = step * (11 - num),
              green = (255 / 4) + (middleStep * (num - 1)),
              blue = step * (num - 1)


        // this.number = 2
        // num = 1
        // red = 25.5 * 10 = 255
        // green = 63.75 + 12.75 * 0 = 63.75
        // blue = 25.5 * 0 = 0
    

        // console.log('with ;')
        // for(let i = 0; i < 10; console.log(i++));
        // console.log(100)

        // console.log('without ;')
        // for(let i = 0; i < 10; console.log(i++))
        // console.log(100)

        return `rgb(${red}, ${green}, ${blue})`
    }
}

class Position {
    x = 0
    y = 0

    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
}

const game = new Game2048("app", "player")
game.init()