const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 5555 })

let gameInstances = []
class GameInstance{
    constructor(client1, code) {
        this.client1 = client1
        this.client1Chosen = null
        this.client2 = null
        this.client2Chosen = null
        this.code = code
    }
    addClient(client2) {
        this.client2 = client2
        console.log("Game started")
    }
}

server.on("connection", (client) => {
    client.on("message", (message) => {
        let input = JSON.parse(message)
        if(input.type == "create") {
            let game = new GameInstance(client, input.code)
            gameInstances.push(game)
            console.log("Game started " + game.code)
        } else if(input.type == "connect") {
            console.log(input.code)
            gameInstances.forEach((game) => {
                if(game.code == input.code) {
                    game.addClient(client)
                    console.log("Player joined game " + game.code)
                    return
                }
            })
        } else if(input.type == "init-chosen") {
            // I need a way to explicity assign player one and twos
            // Perhaps use the web passing thing to pass the player position
            gameInstances.forEach((game) => {
                if(game.code == input.code) {
                    if(input.player == 1) {
                        game.client1 = client
                        game.client1Chosen = {x: input.chosenx, y: input.choseny}
                    } else {
                        game.client2 = client
                        game.client2Chosen = {x: input.chosex, y: input.choseny}
                    }
                }
            })
        } else if(input.type == "make-guess") {
            gameInstances.forEach((game) => {
                if(game.code == input.code) {
                    if(input.chosenx == game.client2Chosen.x && 
                        input.choseny == game.client2Chosen.y) 
                    {
                        console.log("Player wins")
                    }
                } else {
                    console.log("Player loses")
                }
            })
        }
    })
})
