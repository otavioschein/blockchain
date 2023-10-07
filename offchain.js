async function insertOffchain(data) {
    const { Pool } = require('pg');

    const pool = new Pool({
        user: 'blockchain',
        host: 'localhost',
        database: 'offchain',
        password: 'blockchain',
        port: 5432,
    });

    let matricula = data.matricula;
    let aluno = data.aluno;
    let mediaG1 = data.mediaG1;
    let mediaG2 = data.mediaG2;
    let mediaFinal = data.mediaFinal;
    let disciplina = data.disciplina;

    const query = 'INSERT INTO notas (matricula, aluno, mediaG1, mediaG2, mediaFinal, disciplina) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    
    try {
        await pool.query(query, [matricula, aluno, mediaG1, mediaG2, mediaFinal, disciplina]);
        await pool.end();
        console.log('Inserted offchain.');
    } catch(error) {
        console.error('Error: ', error.message);
        await pool.end();
    }
}

module.exports = insertOffchain;