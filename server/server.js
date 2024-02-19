const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 5555 })

class User{
    constructor(name, correctValue) {
        this.name = name;
        this.correctValue = correctValue;
    }
}

let clientCount = 0
let player1
let player2

server.on("connection", (client) => {
    console.log(clientCount + 1)
    if(clientCount == 0) {
        client.send("player1")
    } else if(clientCount == 1) {
        client.send("player2")
    } else {
        client.close()
        console.log("Max users reached")
        return
    }
    clientCount++

    
    client.on("message", (message) => {
        let user = message
        console.log(user)
        if(user.name == "player1") {
            player1 = new User(message.name, message.chosen)
        } else if(user.name == "player2") {
            player2 = new User(message.name, message.chosen)
        } else {
            console.log("ERROR")
        }
        console.log(user.chosen)
    })

    client.on("close", () => {clientCount--})
})
