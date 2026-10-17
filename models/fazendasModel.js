import connection from '../config/db.js';

// listar fazendas ##
export async function listarFazendas() {
    const [rows] = await connection.query(
        'SELECT id, fazenda FROM fazenda ORDER BY fazenda ASC'
    );
    return rows;
}

// busca fazenda por ID ##
export async function obterFazendaPorId(id) {
    const [rows] = await connection.query(
        'SELECT id, fazenda FROM fazenda WHERE id = ?',
        [id]
    );
    return rows[0] || null;
}

// criar fazenda ##
export async function criarFazenda({ fazenda }) {
    const [result] = await connection.query(
        'INSERT INTO fazenda (fazenda) VALUES (?)',
        [fazenda]
    );
    return result.insertId;
}

// atualizar fazenda ##
export async function atualizarFazenda(id, { fazenda }) {
    const [result] = await connection.query(
        'UPDATE fazenda SET fazenda = ? WHERE id = ?',
        [fazenda, id]
    );
    return result.affectedRows;
}

// deletar fazenda ##
export async function deletarFazenda(id) {
    const [result] = await connection.query(
        'DELETE FROM fazenda WHERE id = ?',
        [id]
    );
    return result.affectedRows;
}