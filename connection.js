'use strict'
const ws = new WebSocket("ws://localhost:5555")

let codes = []
for(let i = 0; i < 10; i++) {
    codes[i] = "" + generateCode()
}

function generateCode() {
    let output = ""
    for(let i = 0; i < 8; i++) {
        output += Math.round((Math.random() * 8) + 1)
    }
    return output
}

const code_section = document.querySelector("#connection-code-area")
let pos = Math.floor(Math.random() * codes.length)
code_section.innerHTML = "Send Code: " + codes[pos]


function createServer() {
    ws.send(JSON.stringify({type: "create", code: codes[pos]}))
    window.location.href = `index.html?init=${JSON.stringify({player: 1, 
        code: (codes[pos])})}`
}

const input_code = document.querySelector("#code-input")
function connectServer() {
    console.log(input_code.value)
    ws.send(JSON.stringify({type: "connect", code: input_code.value}))
    window.location.href = `index.html?init=${JSON.stringify({player: 2, 
        code: input_code.value})}`
}