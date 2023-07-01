class Game2048 {
    field = new Field(4)
    score = 0
    time = null // ?
    player = ""
    app = null // ?
    maxScore = 2048
    history = []

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

    // методы
    constructor(size) {
        // this - "внутренности" экзепляра класса. В нем методы и свойства
        this.initCells(size)
    } // return Object (=== Field ==> this)

    initCells(size){
        for(let i = 0; i < size; i++){
            const row = []
            for(let j = 0; j < size; j++){
                row.push(new Cell())
            }
            this.cells.push(row)
        }
    }

    render(app){
        for(let i = 0; i < this.cells.length; i++){
            for(let j = 0; j < this.cells[i].length; j++){
                app.appendChild(this.cells[i][j])
            }
        }
    }
}

class Cell {
    element = document.createElement("div")
    figure = null
    position = null // ?

    constructor(position, figure, className = "cell", style = {}) {
        this.position = position
        this.figure = figure

        this.element.classList.add(className)

        // this.element.style = style // error
        for(let key in style){
            this.element.style[key] = style[key] // style = {width: "100%"} ==> key = "width", style[key] = "100%"
        }

        this.element.addEventListener("click", event => this.onClick(event))
    }

    onClick(event) {}
    clear(){}
    render(){}
}

// экземпляр класса
const field = new Field("cross") // constructor(player)

const field1 = new Field("cross") // constructor(player)
const field2 = new Field("cross") // constructor(player)
const field3 = new Field("cross") // constructor(player)

field.init(document.getElementById("app"))