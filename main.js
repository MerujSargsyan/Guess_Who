'use strict'
const ws = new WebSocket("ws://localhost:5555")
let username

ws.addEventListener("open", () => {
    console.log("we are connected");
})
ws.addEventListener("message", (name) => {
    console.log(name.data)
    username = name.data
    ws.send({chosen: {x: chosenx, y:choseny}, name: username})
})

let rows = 3
let cols = 5
let rowSpacing = 50
let colSpacing = 50

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
}

let removeButton = document.querySelector("#remove")

class Picture {
    constructor(posx, posy, src) {
        this.posx = posx
        this.posy = posy
        this.src = src
    }
    createPicture(special) {
        let image = document.createElement("div")
        image.classList.add("image")
        image.addEventListener("click", () => {removed_mode(image)})
        if(special) {
            image.id = "chosen-image"
        }
        return image
    }
}

function removed_mode(element) {
    if(removing) {
        element.style.opacity = 0.5;
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

