import connection from '../config/db.js';

//  listar animais ##
export async function listarAnimais() {
    const [rows] = await connection.query(`
        SELECT 
            animal.id          AS id,
            animal.sisbov,
            animal.raca,
            animal.faixa_etaria,
            animal.peso_atual,
            animal.dataEntrega,
            animal.horaEntrega,
            animal.id_fazenda,
            fazenda.fazenda    AS fazenda
        FROM animal
        INNER JOIN fazenda ON fazenda.id = animal.id_fazenda
        ORDER BY animal.id DESC
    `);
    return rows;
}

//  lista fazendas ##
export async function listarFazendas() {
    const [rows] = await connection.query(
        'SELECT id, fazenda FROM fazenda ORDER BY fazenda ASC'
    );
    return rows;
}

//  busca animais ##
export async function obterAnimalPorId(id) {
    const [rows] = await connection.query(`
        SELECT 
            animal.id          AS id,
            animal.sisbov,
            animal.raca,
            animal.faixa_etaria,
            animal.peso_atual,
            animal.dataEntrega,
            animal.horaEntrega,
            animal.id_fazenda,
            fazenda.fazenda    AS fazenda
        FROM animal
        INNER JOIN fazenda ON fazenda.id = animal.id_fazenda
        WHERE animal.id = ?
    `, [id]);
    return rows[0] || null;
}

//  cria animais ##
export async function criarAnimal({ 
    sisbov, raca, faixa_etaria, 
    id_fazenda, peso_atual, 
    dataEntrega, horaEntrega 
}) {
    const [result] = await connection.query(`
        INSERT INTO animal 
            (sisbov, raca, faixa_etaria, id_fazenda, peso_atual, dataEntrega, horaEntrega) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
        sisbov, raca, faixa_etaria, id_fazenda,
        peso_atual  || 0,
        dataEntrega,
        horaEntrega || '00:00:00'
    ]);
    return result.insertId;
}

//  atualizar animais ##
export async function atualizarAnimal(id, { 
    sisbov, raca, faixa_etaria, 
    id_fazenda, peso_atual, 
    dataEntrega, horaEntrega 
}) {
    const [result] = await connection.query(`
        UPDATE animal SET
            sisbov       = ?,
            raca         = ?,
            faixa_etaria = ?,
            id_fazenda   = ?,
            peso_atual   = ?,
            dataEntrega  = ?,
            horaEntrega  = ?
        WHERE id = ?
    `, [
        sisbov, raca, faixa_etaria, id_fazenda,
        peso_atual  || 0,
        dataEntrega,
        horaEntrega || '00:00:00',
        id
    ]);
    return result.affectedRows;
}

//  deletar animais ##
export async function deletarAnimal(id) {
    const [result] = await connection.query(
        'DELETE FROM animal WHERE id = ?',
        [id]
    );
    return result.affectedRows;
}