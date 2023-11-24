const pool = require('./utils/dbConfig');

// função responsável pela off-chain
// recebe os dados e insere em um banco de dados externo
async function insertOffchain(data) {

    let matricula = data.matricula;
    let aluno = data.aluno;
    let mediaG1 = data.mediaG1;
    let mediaG2 = data.mediaG2;
    let mediaFinal = data.mediaFinal;
    let disciplina = data.disciplina;

    const query = 'INSERT INTO notas (matricula, aluno, mediaG1, mediaG2, mediaFinal, disciplina) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

    try {
        await pool.query(query, [matricula, aluno, mediaG1, mediaG2, mediaFinal, disciplina]);
        console.log('Inserted offchain.');
    } catch(error) {
        console.error('Error: ', error.message);
    }
}

module.exports = insertOffchain;