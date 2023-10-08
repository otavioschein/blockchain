const WebSocket = require("ws")

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

// classe que cria uma rede p2p
class P2pserver {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    // função que cria conexões entre os peers da rede
    listen() {
        const server = new WebSocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));
        this.connectToPeers();
        console.log(`Listening for peer to peer connection on port: ${P2P_PORT}`);
    }

    // função que conecta os sockets
    connectSocket(socket) {
        this.sockets.push(socket);
        console.log("Socket connected.");
        // registra um evento de mensagem para o socket
        this.messageHandler(socket);
        // em uma nova conexão envia a blockchain para o peer
        socket.send(JSON.stringify(this.blockchain));
    }

    // função que cria conexões entre os sockets
    connectToPeers() {
        peers.forEach(peer => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        });
    }

    // imprime em um socket específico a mensagem com os dados
    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            console.log("data : ", data);
            this.blockchain.replaceChain(data);
        })

    }

    // função que envia a blockchain para um socket específico
    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    // função que sincroniza a rede em todos os nodos conectados na rede
    syncChain() {
        this.sockets.forEach(socket => {
            this.sendChain(socket);
        })
    }
}

module.exports = P2pserver;