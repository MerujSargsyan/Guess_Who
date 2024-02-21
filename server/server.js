const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 5555 })

let gameInstances = []
class GameInstance{
    constructor(client1, code) {
        this.client1 = client1
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
                    //game code reading is faulty
                    console.log("Player joined game " + game.code)
                    return
                }
            })
        }
    })
})
