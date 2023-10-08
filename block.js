const SHA256 = require('crypto-js/sha256.js');
const insertOffchain = require('./offchain');

// classe de funções de um bloco
class Block{
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString(){
        return `Block - 
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lastHash.substring(0,10)}
        Hash      : ${this.hash.substring(0,10)}
        Data      : ${this.data}`;
    }

    // gera um bloco genesis
    static genesis() {
        return new this('Genesis time','----','genesis-hash',[]);
    }

    // cria um hash com os parametros de data, o ultimo hash do bloco e os dados recebidos
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    // função que minera um bloco de forma simples
    static mineBlock(lastBlock, data) {
        let hash;
        let timestamp = Date.now();
        const lastHash = lastBlock.hash;
        hash = Block.hash(timestamp, lastHash, data);
        let dataHashed = this.offchainData(data);
        return new this(timestamp, lastHash, hash, dataHashed);
    }

    // função com a estratégia de off-chain
    // insere os dados recebidos em um banco de dados externo e retorna esses dados em hash
    static offchainData(data) {
        insertOffchain(data);
        let hashedData = this.hash(Date.now(), '', data);
        return hashedData;
    }

    // gera um hash para o bloco
    static blockHash(block) {
        const {timestamp, lastHash, data} = block;
        return Block.hash(timestamp, lastHash, data);
    }

}

module.exports = Block;