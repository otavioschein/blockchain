const Block = require('./block.js')

// classe responsável pela blockchain
class Blockchain {
    constructor(){
        this.chain = [Block.genesis()];
    }
  
    // função que adiciona um bloco na rede
    addBlock(secretKey, data){
        const block = Block.mineBlock(this.chain[this.chain.length-1], secretKey, data);
        this.chain.push(block);
        
        return block;
    }

    // função para encontrar um bloco pelo hash
    getBlock(hash) {
        // Percorrer cada bloco na cadeia
        for (const block of this.chain) {
            // Verificar se o hash do bloco corresponde ao hash fornecido
            if (block.hash === hash) {
                // Retornar o bloco encontrado
                return block;
            }
        }
        // Retornar null se nenhum bloco com o hash fornecido for encontrado
        return null;
    }

    // função que retorna os dados descriptografados para um bloco específico
    getData(block, secretKey) {
        console.log(block);
        if (block === null) {
            return 'bloco nulo';
        }
        return Block.decrypt(block, secretKey);
    }

    // função que valida a blockchain atual
    // utilizada para o consenso da rede
    isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false;
    
        for(let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i-1];
            if((block.lastHash !== lastBlock.hash) || (block.hash !== Block.blockHash(block)))
                return false;
        }
        return true;
    }

    // função que substitui a rede antiga pela atual, após adicionar um novo bloco
    replaceChain(newChain) {
        if(newChain.length <= this.chain.length) {
            console.log("Recieved chain is not longer than the current chain");
            return;
        } else if (!this.isValidChain(newChain)) {
            console.log("Recieved chain is valid.");
            return;
        }

        console.log("Replacing the current chain with new chain.")
        this.chain = newChain;
    }
}

module.exports = Blockchain;