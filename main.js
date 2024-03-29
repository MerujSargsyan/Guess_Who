'use strict'
const searcher = new URLSearchParams(window.location.search);
const init = JSON.parse(searcher.get('init'))
console.log(init.code)
console.log(init.player)

let rows = 3
let cols = 5
let rowSpacing = 50
let colSpacing = 50

const server = new WebSocket("ws://localhost:5555")
server.addEventListener("open", () => {
    server.send(JSON.stringify({type: "init-chosen", player: init.player, 
        chosenx: chosenx, choseny: choseny}))
})



let row1 = document.querySelector("#row1")
let row2 = document.querySelector("#row2")
let row3 = document.querySelector("#row3")

let removing = true
function setRemove(boolean) {
    if(boolean) {
        document.querySelector("html").style.cursor = "url(resources/remove.cur), auto"
    } else {
        document.querySelector("html").style.cursor = "url(resources/add.cur), auto"
    }
    removing = boolean
    finalGuessing = false
}
let removeButton = document.querySelector("#remove")

let finalGuessing = false
function setGuess(boolean) {
    console.log(`setting guess to ${boolean}`)
    finalGuessing = boolean
}

class Picture {
    constructor(posx, posy, src) {
        this.posx = posx
        this.posy = posy
        this.src = src
    }
    createPicture(special) {
        let image = document.createElement("div")
        image.classList.add("image")
        image.addEventListener("click", () => {click_mode(image, this.posx, this.posy)})
        if(special) {
            image.id = "chosen-image"
        }
        return image
    }
}

function click_mode(element, posx, posy) {
    if(removing && !finalGuessing) {
        element.style.opacity = 0.5;
    } else if(finalGuessing) {
        //add alert mode
        console.log(`Made a guess at:${posx} ${posy}`)
        server.send(JSON.stringify({type: "make-guess", code: init.code, chosenx: posx, 
            choseny: posy}))
    } else {
        element.style.opacity = 1;
    }
}

let array = Array.from({ length: rows }, () => Array(cols).fill(0))
let chosenx = Math.round(Math.random() * (cols-1))
let choseny = Math.round(Math.random() * (rows-1))
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let picture = new Picture(col, row, "")
        let currentRow;
        switch (row) {
            case 0:
                currentRow = row1
                break
            case 1:
                currentRow = row2
                break
            case 2:
                currentRow = row3
                break
            default:
                break
        }
        if(col == chosenx && row == choseny) {
            currentRow.appendChild(picture.createPicture(true));
        } else {
            currentRow.appendChild(picture.createPicture(false));
        }
        
    }
}


