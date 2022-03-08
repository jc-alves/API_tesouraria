const db = require('../database/db')



async function payment(pag){  
  
    const conn = await db.connect();
    const sql = 'INSERT INTO financeiro (id_grupo, entrada, motivo) VALUES (?, ?, ?);'
    values = [pag.id_grupo, pag.entrada, pag.motivo]
    console.log(sql, values)
    const [rows] = await conn.query(sql, values)

    return rows
    
}
async function saldo() {
    const conn = await db.connect()
    const [rows] = await conn.query('select (sum(entrada) - sum(retirada)) as saldo from financeiro') 
    return rows
   
}


async function extract() {
    const conn = await db.connect()
    const [rows] = await conn.query('SELECT F.id, F.datapag, F.entrada, F.retirada, F.motivo, G.nome FROM financeiro F LEFT JOIN grupos G ON G.id = F.id_grupo;')  
    return rows
}

async function extractR() {
    const conn = await db.connect()
    const [rows] = await conn.query('SELECT usuario.nome, usuario.email, financeiro.retirada, financeiro.datapag FROM financeiro join usuario on usuario;')  
    return rows
}
async function buscapag(nome) {
    const conn = await db.connect()
     const sql = "select financeiro.id, financeiro.datapag, financeiro.valor_extenso, grupos.nome,   grupos.tesoureiro, financeiro.entrada, financeiro.datapag  from grupos join financeiro on grupos.id = financeiro.id_grupo where LOWER(nome) LIKE CONCAT('%' ?,  '%');"
    // const sql = 'select *  from grupos where nome = ?;'
    values = [ nome.toLowerCase() ]
    // values = [nome ]

    const [rows] = await conn.query(sql, values)
    return  rows
}

async function debit(pag){  
  
    const conn = await db.connect();
    const sql = 'INSERT INTO financeiro (id_grupo, entrada, datapag) VALUES (?, ?, ?);'
    values = [pag.id_grupo, pag.entrada, pag.datapag]
    console.log(sql, values)
    const [rows] = await conn.query(sql, values)

    return rows
    
}

async function retirada(ret){  
  
    const conn = await db.connect();
    const sql = 'INSERT INTO financeiro (retirada, motivo) VALUES (?,?);'
    values = [ret.retirada, ret.motivo]
    console.log(sql, values)
    const [rows] = await conn.query(sql, values)
    return rows
    
}

// async function newUser(user) {
    
//     const conn = await db.connect()
//     const sql = 'INSERT INTO usuario (nome, email, senha, ocupacao) VALUES (?, ?, ?, ?);'
//     values = [user.nome, user.email, user.senha, user.ocupacao]
//     console.log(sql, values)
//     const [rows] = await conn.query(sql, values)
//     return rows 

// }

// async function users() {
//     const conn = await db.connect()
//     const [rows] = await conn.query('SELECT nome, email, ocupacao FROM usuario;')
//     return rows
// }
    


//SELECT usuario.nome, usuario.email, financeiro.retirada, financeiro.datapag FROM financeiro join usuario on usuario;  mostra todas as retiradas gerais
//SELECT  *  FROM financeiro join usuario on usuario = 2; importante para fazer a busca pelo o id

module.exports = {extract, payment, buscapag, debit, extractR, saldo, retirada}