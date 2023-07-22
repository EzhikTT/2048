class Game2048 {
    field = null
    score = 2
    #time = null // ? // ES2019
    player = ""
    app = null // ?
    history = []
    #startNumbers = [2, 2, 2, 4, 8, 16]
    #scoreElement = document.createElement("div")
    #fieldElement = document.createElement("div")
    #popup = null
    #maxScore = 2048

    get time() {
        return this.#time
    }

    set time(val) {
        this.#time = val
    }

    constructor(appId, player, popup = null) {
        this.app = document.getElementById(appId)
        this.player = player

        if (popup) {
            this.#popup = popup
        }

        this.#fieldElement.classList.add('field')
        this.field = new Field(this.#fieldElement, 4, this.#startNumbers)

        this.app.appendChild(this.#scoreElement)
        this.app.appendChild(this.#fieldElement)

        document.body.addEventListener("keyup", (event) => this.#move(event))
    }

    init() {
        this.#render()
    }
    #render() { // ES2019
        this.showField()
        this.showScore()
        this.showTime()
    }

    gameOver() {
        if (this.#popup) {
            this.#popup.addContentToBody(`
                <div style="text-align: center; font-weight: 800">You are LOSER</div>
                <div style="text-align: center">Your score are ${this.score}</div>
            `)
            this.#popup.show()
            this.restartGame()
            setTimeout(
                () => this.#popup.hide(),
                500
            )
        }
    }
    checkWin() {
        if (this.#popup) {
            if(this.score >= this.#maxScore){
                this.#popup.addContentToBody(`
                    <div style="text-align: center; font-weight: 800">You are WINNER</div>
                    <div style="text-align: center">Your score are ${this.score}</div>
                `)
                this.#popup.show()
                this.restartGame()
                setTimeout(
                    () => this.#popup.hide(),
                    500
                )
            }
            else if (!this.#isCanStep()){
                this.gameOver()
            }
        }
    }
    restartGame() {
        this.field.refreshCells([2, 2, 2, 4, 8, 16])
    }

    stepBack() { }
    #move(event) {
        switch (event.code) {
            case "KeyW":
                this.#moveTop()
                this.field.addNewNumber()
                break
            case "KeyS":
                this.#moveBottom()
                this.field.addNewNumber()
                break
            case "KeyD":
                this.#moveRight()
                this.field.addNewNumber()
                break
            case "KeyA":
                this.#moveLeft()
                this.field.addNewNumber()
                break
        }

        this.showScore()

        this.checkWin()
    }

    #isCanStep(){
        let res = false

        for (let i = this.field.cells.length - 1; i > 0 && !res; i--) {
            for (let j = 0; j < this.field.cells[i].length && !res; j++) {
                if (
                    this.field.cells[i][j].number === null ||
                    this.field.cells[i - 1][j].number !== null &&
                    this.field.cells[i][j].number === this.field.cells[i - 1][j].number
                ) {
                    res = true
                }
            }
        }
        for (let i = 0; i < this.field.cells.length - 1 && !res; i++) {
            for (let j = 0; j < this.field.cells[i].length && !res; j++) {
                if (this.field.cells[i + 1][j].number !== null &&
                    this.field.cells[i][j].number === this.field.cells[i + 1][j].number
                ) {
                    res = true
                }
            }
        }
        for (let j = 0; j < this.field.cells[0].length - 1 && !res; j++) {
            for (let i = 0; i < this.field.cells.length && !res; i++) {
                if (this.field.cells[i][j + 1].number !== null &&
                    this.field.cells[i][j].number === this.field.cells[i][j + 1].number
                ) {
                    res = true
                }
            }
        }
        for (let j = this.field.cells[0].length - 1; j > 0 && !res; j--) {
            for (let i = 0; i < this.field.cells.length && !res; i++) {
                if (this.field.cells[i][j - 1].number !== null &&
                    this.field.cells[i][j].number === this.field.cells[i][j - 1].number
                ) {
                    res = true
                }
            }
        }

        return res
    }

    #moveTop() {
        for (let i = this.field.cells.length - 1; i > 0; i--) {
            for (let j = 0; j < this.field.cells[i].length; j++) {
                if (this.field.cells[i][j].number !== null) {
                    if (this.field.cells[i - 1][j].number !== null &&
                        this.field.cells[i][j].number === this.field.cells[i - 1][j].number
                    ) {
                        this.field.cells[i - 1][j].number *= 2
                        this.field.cells[i][j].number = null
                    }
                    else if (this.field.cells[i - 1][j].number === null) {
                        this.field.cells[i - 1][j].number = this.field.cells[i][j].number
                        this.field.cells[i][j].number = null
                    }
                }
            }
        }
    }

    #moveBottom() {
        for (let i = 0; i < this.field.cells.length - 1; i++) {
            for (let j = 0; j < this.field.cells[i].length; j++) {
                if (this.field.cells[i][j].number !== null) {
                    if (this.field.cells[i + 1][j].number !== null &&
                        this.field.cells[i][j].number === this.field.cells[i + 1][j].number
                    ) {
                        this.field.cells[i + 1][j].number *= 2
                        this.field.cells[i][j].number = null
                    }
                    else if (this.field.cells[i + 1][j].number === null) {
                        this.field.cells[i + 1][j].number = this.field.cells[i][j].number
                        this.field.cells[i][j].number = null
                    }
                }
            }
        }
    }

    #moveRight() {
        for (let j = 0; j < this.field.cells[0].length - 1; j++) { // i = 0
            for (let i = 0; i < this.field.cells.length; i++) {
                if (this.field.cells[i][j].number !== null) {
                    if (this.field.cells[i][j + 1].number !== null &&
                        this.field.cells[i][j].number === this.field.cells[i][j + 1].number
                    ) {
                        this.field.cells[i][j + 1].number *= 2
                        this.field.cells[i][j].number = null
                    }
                    else if (this.field.cells[i][j + 1].number === null) {
                        this.field.cells[i][j + 1].number = this.field.cells[i][j].number
                        this.field.cells[i][j].number = null
                    }
                }
            }
        }
    }

    #moveLeft() {
        for (let j = this.field.cells[0].length - 1; j > 0; j--) {
            for (let i = 0; i < this.field.cells.length; i++) {
                if (this.field.cells[i][j].number !== null) {
                    if (this.field.cells[i][j - 1].number !== null &&
                        this.field.cells[i][j].number === this.field.cells[i][j - 1].number
                    ) {
                        this.field.cells[i][j - 1].number *= 2
                        this.field.cells[i][j].number = null
                    }
                    else if (this.field.cells[i][j - 1].number === null) {
                        this.field.cells[i][j - 1].number = this.field.cells[i][j].number
                        this.field.cells[i][j].number = null
                    }
                }
            }
        }
    }

    showScore() {
        let max = 2
        for (let i = 0; i < this.field.cells.length; i++) {
            for (let j = 0; j < this.field.cells[i].length; j++) {
                if (this.field.cells[i][j].number !== null && this.field.cells[i][j].number > max) {
                    max = this.field.cells[i][j].number
                }
            }
        }
        this.score = max

        this.#scoreElement.innerText = `Score: ${this.score}`
    }
    showField() {
        this.field.render(this.#fieldElement)
    }
    showTime() { }

    saveResult() { }
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

    initCells(size, startNumbers) {
        const border = "1px solid rgba(0, 0, 0, 0.4)"
        for (let i = 0; i < size; i++) {
            const row = []
            for (let j = 0; j < size; j++) {
                const style = {}
                if (j < size - 1) {
                    style.borderRight = border
                }
                if (i < size - 1) {
                    style.borderBottom = border
                }

                let num = null

                const n = Math.round(Math.random() * 100 + 1)

                // console.log(i, j, n)

                const isNeedAdd = n % 8 > 3 // 4, 5, 6, 7 => true

                if (startNumbers.length > 0 && isNeedAdd) {
                    const index = Math.round(Math.random() * (startNumbers.length - 1))
                    num = startNumbers.splice(index, 1)[0]
                }

                let cell

                // if(n % 3 === 0){
                cell = new Cell(new Position(i, j), num, "cell", style)
                // }
                // else if(n % 3 === 1){
                //     cell = new OtherColorCell(new Position(i, j), num, "cell", style)
                // }
                // else {
                //     cell = new BlackCell(new Position(i, j), num, "cell", style)
                // }

                row.push(cell)
            }
            this.cells.push(row)
        }

        // this.addNewNumber()

        // setInterval(
        //     () => this.addNewNumber(),
        //     500
        // )

        // console.log(this.cells)

    }

    refreshCells(startNumbers = []){
        for(let row of this.cells){
            for(let cell of row){
                let num = null

                const n = Math.round(Math.random() * 100 + 1)
                const isNeedAdd = n % 8 > 3

                if (startNumbers.length > 0 && isNeedAdd) {
                    const index = Math.round(Math.random() * (startNumbers.length - 1))
                    num = startNumbers.splice(index, 1)[0]
                }

                cell.number = num
            }
        }
    }

    addNewNumber() {
        const emptyCells = this.cells.flat().filter(cell => cell.number === null)
        const index = Math.round(Math.random() * (emptyCells.length - 1))
        // console.log(index)

        if (index >= 0 && emptyCells[index]) {
            // cell.number === null
            emptyCells[index].number = 2 // set number(num) => num = 3 // .number(3)
            // cell.number === 3

            // emptyCells[index].element.style.color = "black"

            return true
        }
        // else {
        //     return false
        // }

        return false
    }

    render(app) {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
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
    #number = 2
    position = new Position()

    get number() {
        return this.#number
    }

    set number(number) {
        this.#number = number
        this.element.innerText = this.#number
        this.element.style.color = this.getColor()
    }

    constructor(position, number = 2, className = "cell", style = {}) {
        this.position = position
        this.#number = number

        this.element.classList.add(className)

        // this.element.style = style // error
        for (let key in style) {
            this.element.style[key] = style[key] // style = {width: "100%"} ==> key = "width", style[key] = "100%"
        }

        if (this.#number) {
            this.element.innerText = this.#number
            this.element.style.color = this.getColor()
        }

        this.element.addEventListener("click", event => this.onClick(event))
    }

    onClick(event) { }
    clear() { }
    render() { }

    getColor() {
        const num = Math.log2(this.#number) // 1..11
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

class BlackCell extends Cell {
    constructor(position, number = 2, className = "cell", style = {}) {
        super(position, number, className, style)

        this.element.style.backgroundColor = "rgba(0,0,0,.4)"
    }
}

class OtherColorCell extends Cell {
    getColor() {
        const num = Math.log2(this.number) // 1..11
        const step = 255 / 10
        const middleStep = step / 2

        // rgb((255 / 4), 0, 255) -> rgba((255 / 4 * 3), 255, 0)

        const blue = step * (11 - num),
            red = (255 / 4) + (middleStep * (num - 1)),
            green = step * (num - 1)

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

/*
<div class="wrapper-popup"> // wrapper
    <div> // content
        <div class="popup-body"></div> // body
        <div></div>.... // buttons
    </div>
</div>
*/
class Popup {
    #wrapper = document.createElement("div")
    #body = document.createElement("div")

    constructor(actions = {}) {
        // Создаем всю структуру элемента, как раньше делали в html
        this.#wrapper.classList.add("wrapper-popup")
        this.#body.classList.add("popup-body")

        const popupContent = document.createElement("div")

        popupContent.appendChild(this.#body)

        // Добавляем обработчики на закрытие
        // Привязка действий к кнопкам
        if (Object.keys(actions).length > 0) {
            for (let key in actions) {
                // actions = {key: {label?, action}}
                // actions = {
                //    save: { label: 'сохранить', action: (event) => {...} }, 
                //    delete: { action: () => {...} }
                //    ...
                // }
                const action = actions[key]
                if (action.action) {
                    const button = document.createElement("div")

                    button.classList.add('button')
                    button.innerText = action.label || key // action.label !== undefined ? action.label : key
                    button.addEventListener('click', (event) => action.action(event))

                    popupContent.appendChild(button)
                }
            }
        }
        this.#wrapper.appendChild(popupContent)

        document.body.appendChild(this.#wrapper)
    }

    show() {
        this.#wrapper.style.display = "flex"
    }
    hide() {
        this.#wrapper.style.display = "none"
    }

    addContentToBody(content) {
        this.#body.innerHTML = content
    }
}

const popup = new Popup()

const game = new Game2048("app", "player", popup)
game.init()

// game.#time // Error -> private
// game.field // OK -> public
// game.#render() // Error -> private

// game.time // OK -> get time()
// game.time = "some time" // OK -> set time(val) -> val = "some time"