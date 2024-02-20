const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 5555 })

class User{
    constructor(name, x, y) {
        this.name = name
        this.x = x
        this.y = y
    }
}

let clientCount = 0
let player1
let player2

server.on("connection", (client) => {
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
        data = JSON.parse(message)
        if(data.guessing) {
            if(data.name == "player1") {
                player1 = new User(data.name, data.x, data.y)
            } else if(data.name == "player2") {
                player2 = new User(data.name, data.chosen)
            } else {
                console.log("ERROR " + data.name)
            }
        } else {
            if(data.name == "player1") {
                if(data.x == player2.x && data.y == player2.y) {
                    console.log("Player 1 won game")
                } else {
                    console.log("Player 2 won game")
                }
            } else if(data.name == "player2") {
                if(data.x == player1.x && data.y == player1.y) {
                    console.log("Player 2 won game")
                } else {
                    console.log("Player 1 won game")
                }
            }
        }
    })

    client.on("close", () => {clientCount--})
})
