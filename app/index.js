const express = require('express');
const P2pserver = require('./p2p-server.js');
const Blockchain = require('../blockchain.js');
const BodyParser = require('body-parser')

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

app.use(BodyParser.json());

const blockchain = new Blockchain();

const p2pserver = new P2pserver(blockchain);

// endpoint para retornar os blocos de uma rede
app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

//endpoint que minera um novo bloco
app.post('/mine', (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
    p2pserver.syncChain();
});

// função que expõe a api em uma porta
app.listen(HTTP_PORT, () => {
    console.log(`listening on port ${HTTP_PORT}`);
})

p2pserver.listen();