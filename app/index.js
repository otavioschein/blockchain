const express = require('express');
const cors = require('cors');
const P2pserver = require('./p2p-server.js');
const Blockchain = require('../blockchain.js');
const BodyParser = require('body-parser');
const NotaService = require('../repository/nota.js');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use(cors());
app.use(BodyParser.json());

const notaService = new NotaService()
const blockchain = new Blockchain();
const p2pserver = new P2pserver(blockchain);

// endpoint para retornar os blocos de uma rede
app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.get('/nota', async (req, res) => {
    const matricula = req.query.matricula;

    if (!matricula) {
        return res.status(400).json({ error: 'Matricula is required' });
    }

    try {
        const notas = await notaService.getNotasByMatricula(matricula);
        res.json(notas);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/mine', (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
    p2pserver.syncChain();
});

// função que expõe a api em uma porta
app.listen(HTTP_PORT, () => {
    console.log(`listening on port ${HTTP_PORT}`);
});

p2pserver.listen();