const pool = require('../utils/dbConfig');

class NotaService {
    async getNotasByMatricula(matricula) {
        const query = 'SELECT * FROM notas WHERE matricula = $1';

        try {
            const result = await pool.query(query, [matricula]);
            return result.rows;
        } catch(error) {
            console.error('Error: ', error.message);
            throw error;
        }
    }
}

module.exports = NotaService;