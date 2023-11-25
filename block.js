const SHA256 = require('crypto-js/sha256.js');
const CryptoJS = require('crypto-js');

// classe de funções de um bloco
class Block{
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    // toString(){
    //     return `Block - 
    //     Timestamp : ${this.timestamp}
    //     Last Hash : ${this.lastHash.substring(0,10)}
    //     Hash      : ${this.hash.substring(0,10)}
    //     Data      : ${this.data}`;
    // }

    // gera um bloco genesis
    static genesis() {
        return new this('Genesis time','----','genesis-hash',[]);
    }

    // cria um hash com os parametros de data, o ultimo hash do bloco e os dados recebidos
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    // função que criptografa os dados
    static encrypt(data, secretKey) {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    }

    // função que descriptografa os dados
    static decrypt(encryptedData, secretKey) {
        const bytes = CryptoJS.AES.decrypt(encryptedData.data, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    }

    // função que minera um bloco de forma simples
    static mineBlock(lastBlock, secretKey, data) {
        let hash;
        let timestamp = Date.now();
        const lastHash = lastBlock.hash;
        hash = Block.hash(timestamp, lastHash, data);
        let dataEncrypted = this.encrypt(JSON.stringify(data), secretKey);
        return new this(timestamp, lastHash, hash, dataEncrypted);
    }

    // gera um hash para o bloco
    static blockHash(block) {
        const {timestamp, lastHash, data} = block;
        return Block.hash(timestamp, lastHash, data);
    }

}

module.exports = Block;