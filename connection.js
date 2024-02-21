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
    window.location.href = 'index.html';
}

const input_code = document.querySelector("#input-section")
function connectServer() {
    ws.send(JSON.stringify({type: "connect", code: input_code.value}))
    window.location.href = "index.html"
}