const express = require('express');
const cors = require('cors');
const P2pserver = require('./p2p-server.js');
const Blockchain = require('../blockchain.js');
const Block = require('../block.js');
const BodyParser = require('body-parser');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use(cors());
app.use(BodyParser.json());

const blockchain = new Blockchain();
const p2pserver = new P2pserver(blockchain);

// endpoint para retornar os blocos de uma rede
app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

// endpoint para retornar os dados de um bloco, descriptografando os dados
app.get('/nota/:hash/:secretKey', async (req, res) => {
    const { hash, secretKey } = req.params;
    const block = blockchain.getBlock(hash);
    console.log('block: ' + block);
    const data = blockchain.getData(block, secretKey);
    res.json(data);
});

// endpoint para minerar um novo bloco, criptografa os dados
app.post('/mine/:secretKey', (req, res) => {
    const { secretKey } = req.params;
    const block = blockchain.addBlock(secretKey, req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
    p2pserver.syncChain();
});

// função que expõe a api em uma porta
app.listen(HTTP_PORT, () => {
    console.log(`listening on port ${HTTP_PORT}`);
});

p2pserver.listen();